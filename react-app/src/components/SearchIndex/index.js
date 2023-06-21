import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadSomeBusinessesThunk } from "../../store/business";
import BusinessIndex from "../BusinessIndex";
import Loader from "../Loader";
import "./SearchIndex.css"

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

function shuffle(arr) {
    let out = [];
    let visited = new Set([]);
    let max = arr.length;
    while(out.length < max){
        let idx = getRandomInt(0, max)
        if (!visited.has(idx)){
            visited.add(idx)
            out.push(arr[idx])
        }
    }
    return out;
}

const SearchIndex = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [sortbyOption, setSortbyOption] = useState('Default')
    const [modifiedBusinesses, setModifiedBusinesses] = useState(null)

    const businesses = useSelector(state => state?.business?.allBusinesses ? Object.values(state.business.allBusinesses) : null)

    const searchTerms = location.search.slice(1);

    useEffect(() => {
        dispatch(loadSomeBusinessesThunk(searchTerms))
    }, [dispatch])

    useEffect(() => {
        dispatch(loadSomeBusinessesThunk(searchTerms))
    }, [searchTerms])

    useEffect(() => {
        console.log("we are in the use effect")
        if(!businesses) return;
        let busses = businesses.slice()
        switch (sortbyOption) {
            case 'Default':
                setModifiedBusinesses(null);
                break;
            case 'Popularity':
                setModifiedBusinesses(prev => {
                    if (prev){
                        return prev.toSorted((a,b)=> Object.values(b.carts).length - Object.values(a.carts).length)
                    }
                    return busses.toSorted((a,b)=> Object.values(b.carts).length - Object.values(a.carts).length)
                })
                break;
            case 'Rating':
                setModifiedBusinesses(prev => {
                    console.log(prev)
                    if (prev){
                        let test = prev.toSorted((a,b)=> b.businessRating - a.businessRating)
                        console.log("after sorting>>>>>", test)
                        return test
                    }
                    return busses.toSorted((a,b)=> b.businessRating - a.businessRating)
                })
                // busses.sort((a,b)=> b.businessRating - a.businessRating)
                // setModifiedBusinesses(busses);
                break;
            case 'Random':
                setModifiedBusinesses(prev => prev ? shuffle(prev) : shuffle(busses));
                break;
        }
    }, [sortbyOption, searchTerms])

    useEffect(()=>{
        if(!businesses) return;
        switch (location.state.priceBucket) {
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
    }, [location.state.priceBucket])

    if (!searchTerms && !location.state.priceBucket) return (<Loader />)

    return (
        <div>
            <div>
                <h3>Sort By</h3>
                <div className="sortby-button-wrapper">
                    <form>

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
            </div>
            <div>
                <h3>Price Range</h3>
                <div className="price-button-wrapper">
                    <button className="gray-button-round small-padding">$</button>
                    <button className="gray-button-round small-padding">$$</button>
                    <button className="gray-button-round small-padding">$$$</button>
                    <button className="gray-button-round small-padding">$$$$</button>
                </div>
            </div>
            <div className="search-index">
                {(searchTerms || location.state.priceBucket) &&
                    (
                        <>
                            <h1>Search Results</h1>
                            {businesses && businesses.length ? (<BusinessIndex businesses={modifiedBusinesses ? modifiedBusinesses : businesses} />) : (<p>Sorry that search had no results. Try again using a different word or phrase.</p>)}
                        </>
                    )}
            </div>

        </div>
    )
}

export default SearchIndex;
