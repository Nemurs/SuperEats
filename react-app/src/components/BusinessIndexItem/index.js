import { Link } from "react-router-dom"
import './BusinessIndexItem.css'

const BusinessIndexItem = ({ business, interactive = true , imgUrl}) => {
    if (!business) return (<></>)
    const previewImage = imgUrl ? imgUrl : business?.images?.filter(img => img.preview === true)[0].url

    if (interactive) {
        return (
            <div className="business-item hoverable">
                <Link to={`/business/${business.id}`}>
                    <img src={previewImage} alt={business.name} />
                    <p className="business-name">{business.name}</p>
                </Link>
            </div>
        )
    }

    return (
        <div className="business-item wide">
            <img className="wide" src={previewImage} alt={business.name} />
            <h1 className="business-name large">{business.name}</h1>
        </div>
    )
}

export default BusinessIndexItem
