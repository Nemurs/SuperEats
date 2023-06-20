import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadSomeBusinessesThunk } from "../../store/business";
import BusinessIndex from "../BusinessIndex";
import Loader from "../Loader";
import "./SearchIndex.css"

const SearchIndex = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const businesses = useSelector(state => state?.business?.allBusinesses ? Object.values(state.business.allBusinesses) : null)

    const searchTerms = location.search.slice(1);

    useEffect(() => {
        dispatch(loadSomeBusinessesThunk(searchTerms))
    }, [dispatch])

    useEffect(() => {
        dispatch(loadSomeBusinessesThunk(searchTerms))
    }, [searchTerms])

    if (!searchTerms) return (<Loader/>)

    return (
        <div className="search-index">
            {searchTerms &&
                (
                    <>
                        <h1>Search Results</h1>
                        {businesses && businesses.length ? (<BusinessIndex businesses={businesses} />) : (<p>Sorry that search had no results. Try again using a different word or phrase.</p>)}
                    </>
                )}

        </div>
    )
}

export default SearchIndex;
