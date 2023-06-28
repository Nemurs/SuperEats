import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { shuffle } from "../../utils";
import { loadAllBusinessesThunk, loadSomeBusinessesThunk } from "../../store/business";
import BusinessIndex from "../BusinessIndex";
import Loader from "../Loader";
import "./SearchIndex.css"



const SearchIndex = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [sortbyOption, setSortbyOption] = useState(location.state?.sortBucket ? location.state.sortBucket : 'Default')
    const [priceOption, setPriceOption] = useState(location.state?.priceBucket ? location.state.priceBucket : 0)
    const [modifiedBusinesses, setModifiedBusinesses] = useState(null)

    const businesses = useSelector(state => state?.business?.allBusinesses ? Object.values(state.business.allBusinesses) : null)

    const searchTerms = location.search.slice(1);

    useEffect(() => {
        if (!searchTerms) {
            dispatch(loadAllBusinessesThunk())
            return;
        }
        dispatch(loadSomeBusinessesThunk(searchTerms))
    }, [dispatch])

    useEffect(() => {
        dispatch(loadSomeBusinessesThunk(searchTerms))
        if (modifiedBusinesses){
            setModifiedBusinesses(null)
            setPriceOption(0)
            setSortbyOption('Default')
        }
    }, [searchTerms])

    useEffect(() => {
        if (!businesses) return;

        let busses = businesses.slice()
        switch (sortbyOption) {
            case 'Default':
                setModifiedBusinesses(null);
                break;
            case 'Popularity':
                setModifiedBusinesses(prev => {
                    if (prev) {
                        return prev.toSorted((a, b) => Object.values(b.carts).length - Object.values(a.carts).length)
                    }else return busses.toSorted((a, b) => Object.values(b.carts).length - Object.values(a.carts).length)
                })
                break;
            case 'Rating':
                setModifiedBusinesses(prev => {
                    if (prev) {
                        return prev.toSorted((a, b) => b.businessRating - a.businessRating)
                    } else return busses.toSorted((a, b) => b.businessRating - a.businessRating)
                })
                break;
            case 'Random':
                setModifiedBusinesses(prev => prev ? shuffle(prev) : shuffle(busses));
                break;
        }
    }, [sortbyOption])

    useEffect(() => {
        if (priceOption > 0){
            switch (priceOption) {
                case 1:
                    setModifiedBusinesses(prev => prev ? prev.filter(bus => bus.avgItemPrice < 10) : businesses.filter(bus => bus.avgItemPrice < 10))
                    break;
                case 2:
                    setModifiedBusinesses(prev => prev ? prev.filter(bus => bus.avgItemPrice > 10 && bus.avgItemPrice < 15) : businesses.filter(bus => bus.avgItemPrice > 10 && bus.avgItemPrice < 15))
                    break;
                case 3:
                    setModifiedBusinesses(prev => prev ? prev.filter(bus => bus.avgItemPrice > 15 && bus.avgItemPrice < 25) : businesses.filter(bus => bus.avgItemPrice > 15 && bus.avgItemPrice < 25))
                    break;
                case 4:
                    setModifiedBusinesses(prev => prev ? prev.filter(bus => bus.avgItemPrice > 25) : businesses.filter(bus => bus.avgItemPrice > 25))
                    break;
            }
        } else {
            setModifiedBusinesses(null)
        }

    }, [priceOption])

    if (!searchTerms && !location.state.priceBucket && !location.state.sortBucket) return (<Loader />)

    const handlePriceButtonClick = (e, buttonNumber) => {
        e.preventDefault()
        if (buttonNumber === 1){
            setModifiedBusinesses(null)
            setPriceOption(prev => prev === 1 ? 0 : 1)
        } else if (buttonNumber === 2){
            setModifiedBusinesses(null)
            setPriceOption(prev => prev === 2 ? 0 : 2)
        } else if (buttonNumber === 3){
            setModifiedBusinesses(null)
            setPriceOption(prev => prev === 3 ? 0 : 3)
        } else if (buttonNumber === 4){
            setModifiedBusinesses(null)
            setPriceOption(prev => prev === 4 ? 0 : 4)
        }
    }
    const storeCount = modifiedBusinesses && modifiedBusinesses.length ? modifiedBusinesses.length : businesses.length
    return (
        <div className="search-page-wrapper">
            <h1>{storeCount} Store{`${storeCount === 1 ? "": "s"}`}</h1>
            <div className="search-wrapper">
                <div className="search-options">
                    <div>
                        <h3>Sort By</h3>
                        <form className="sortby-form">
                            <label>
                                <input
                                    type="radio"
                                    value={'Default'}
                                    checked={sortbyOption === 'Default'}
                                    onChange={(e) => setSortbyOption(e.target.value)}
                                />
                                Default
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value={'Popularity'}
                                    checked={sortbyOption === 'Popularity'}
                                    onChange={(e) => setSortbyOption(e.target.value)}
                                />
                                Popularity
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value={'Rating'}
                                    checked={sortbyOption === 'Rating'}
                                    onChange={(e) => setSortbyOption(e.target.value)}
                                />
                                Rating
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value={'Random'}
                                    checked={sortbyOption === 'Random'}
                                    onChange={(e) => setSortbyOption(e.target.value)}
                                />
                                Random
                            </label>
                        </form>
                    </div>
                    <div>
                        <h3>Price Range</h3>
                        <div className="price-button-wrapper">
                            <button className={`small-padding ${priceOption === 1 ? "price-button-active" : "gray-button-round"}`} onClick={(e) => handlePriceButtonClick(e,1)}>$</button>
                            <button className={`small-padding ${priceOption === 2 ? "price-button-active" : "gray-button-round"}`} onClick={(e) => handlePriceButtonClick(e,2)}>$$</button>
                            <button className={`small-padding ${priceOption === 3 ? "price-button-active" : "gray-button-round"}`} onClick={(e) => handlePriceButtonClick(e,3)}>$$$</button>
                            <button className={`small-padding ${priceOption === 4 ? "price-button-active" : "gray-button-round"}`} onClick={(e) => handlePriceButtonClick(e,4)}>$$$$</button>
                        </div>
                    </div>
                </div>
                <div className="search-index">
                    {(searchTerms || location.state.priceBucket || location.state.sortBucket) &&
                        (
                            <>

                                {businesses && businesses.length ? (<BusinessIndex businesses={modifiedBusinesses ? modifiedBusinesses : businesses} />) : (<p>Sorry that search had no results. Try again using a different word or phrase.</p>)}
                                {modifiedBusinesses && !modifiedBusinesses.length && (<p>Sorry that search filter had no results.</p>)}
                            </>
                        )}
                </div>
            </div>

        </div>
    )
}

export default SearchIndex;
