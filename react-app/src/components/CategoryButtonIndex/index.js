import { Link } from "react-router-dom";
import "./CategoryButtonIndex.css";

const CategoryButtonIndex = () => {
    const categories = [
        'alcohol',
        'baby',
        'bubble tea',
        'burger',
        'chinese',
        'convenience',
        'fast food',
        'flowers',
        'grocery',
        'healthy',
        'mexican',
        'pet supplies',
        'pharmacy',
        'pizza',
        'retail',
        'specialty foods',
        'sushi',
        'top eats',
    ]
    return (
        <div className="category-button-index-wrapper">
            {categories.map(text => (
                <div className="category-button-wrapper">
                    <Link to={`/search?${text}`}>
                        <img src={process.env.PUBLIC_URL + `/home-page-icons/${text.replace(" ", "-")}.png`}/>
                    </Link>
                    <p>{text[0].toUpperCase() + text.slice(1).toLowerCase()}</p>
                </div>
            ))}
        </div>
    )
}

export default CategoryButtonIndex;
