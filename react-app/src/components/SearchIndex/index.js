import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadSomeBusinessesThunk } from "../../store/business";
import BusinessIndex from "../BusinessIndex";

const SearchIndex = () => {
    const location = useLocation();
    const dispatch  = useDispatch();

    const businesses = useSelector(state => state?.business?.allBusinesses ? Object.values(state.business.allBusinesses) : null)

    const searchTerms = location.search.slice(1);

    useEffect(()=> {
        dispatch(loadSomeBusinessesThunk(searchTerms))
    }, [dispatch])

    useEffect(()=> {
        dispatch(loadSomeBusinessesThunk(searchTerms))
    }, [searchTerms])

    return (
        <div style={{"margin-left": "15px", "margin-top": "15px"}} className="search-index">

            {searchTerms &&
            (
                <div>
                    <p>You searched for: {searchTerms}</p>
                    { businesses ? (<BusinessIndex businesses={businesses}/>): (<h1>Loading...</h1>)}
                </div>
            )}

        </div>
    )
}

export default SearchIndex;
