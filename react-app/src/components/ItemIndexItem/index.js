import { Link } from "react-router-dom"
import './ItemIndexItem.css'

const ItemIndexItem = ({ item }) => {
    if (!item) return (<></>)
    const previewImage = item?.images?.filter(img => img.preview === true)[0].url

    return (
        <div className="item-item">
            <div className="item-img-wrapper">
                <img className="small" src={previewImage} alt={item.name} />
                <button className="black-button-round">+</button>
            </div>
            <div className="item-text">
                <p className="item-name ">{item.name}</p>
                <p className="item-price ">${item.price}</p>
            </div>
        </div>
    )
}

export default ItemIndexItem
