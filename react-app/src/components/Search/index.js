import { useHistory } from "react-router-dom";
import { useState } from "react";
import "./Search.css"

const Search = () => {
    const history = useHistory();
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.length) {
            setQuery("")
            history.push(`/search?${query}`)
        }
        return
    }

    return (
        <div className="search">
            <form method="post" onSubmit={handleSubmit}>
                <button className="search-button" type="submit"><i className="fas fa-search" style={{ paddingRight:"5px", color: "black" }}/></button>
                <input
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ backgroundColor: "transparent", border: "none", color: "black" }}
                />

            </form>
        </div>
    )
}

export default Search;
