import { Link } from "react-router-dom"
import './BusinessIndexItem.css'

const BusinessIndexItem = ({business}) =>  {
    if (!business) return (<></>)
    const previewImage = business.images.filter(img => img.preview === true)[0].url

    return (
        <div className="business-item">
            <Link to={`/business/${business.id}`}>
                <img src={previewImage} alt={business.name}/>
                <p>{business.name}</p>
            </Link>
        </div>
    )
}

export default BusinessIndexItem
