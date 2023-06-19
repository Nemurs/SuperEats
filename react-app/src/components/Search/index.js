import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loadSomeBusinessesThunk } from "../../store/business";
import "./Search.css"

const Search = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch  = useDispatch();
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.length) {
            if (location.search.slice(1) !== query){
                dispatch(loadSomeBusinessesThunk(query))
            }
            history.push(`/search?${query}`)
            document.activeElement.blur();
        }
        return
    }

    return (
        <div className="search">
            <form method="post" onSubmit={handleSubmit}>
                <button className="search-button" type="submit"><i className="fas fa-search" onClick={handleSubmit}/></button>
                <input
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

            </form>
        </div>
    )
}

export default Search;
