import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { loadSomeBusinessesThunk } from "../../store/business";
import "./Search.css"

const Search = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");

    useEffect(()=>{
        setQuery(location.search.slice(1))
    },[location.search])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.length) {
            if (location.search.slice(1) !== query) {
                dispatch(loadSomeBusinessesThunk(query))
            }
            history.push(`/search?${query}`)
            document.activeElement.blur();
        }
        return
    }

    const clearSearch = (e) => {
        e.preventDefault();
        setQuery("");
    }

    return (
        <div className="search">
            <form method="post" onSubmit={handleSubmit}>
                <button className="search-button" type="submit"><i className="fas fa-search" onClick={handleSubmit} /></button>
                <input
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={`${query && query.length ? "smaller-search-input" : "search-input"}`}
                />
            </form>
            <button className={`transparent-button-square clear-search-button ${query && query.length ? "" : "hidden"}`} ><i className="fas fa-times" onClick={clearSearch} /></button>

        </div>
    )
}

export default Search;
