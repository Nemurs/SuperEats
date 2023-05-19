import { useDispatch } from 'react-redux'
import { insertOneItem } from '../../store/cart'
import './ItemIndexItem.css'

const ItemIndexItem = ({ item }) => {
    const dispatch = useDispatch();
    if (!item) return (<></>)
    const previewImage = item?.images?.filter(img => img.preview === true)[0].url

    const  addItemToCart = (e) => {
        e.preventDefault()
        dispatch(insertOneItem(item))
        return
    }

    return (
        <div className="item-item">
            <div className="item-img-wrapper">
                <img className="small" src={previewImage} alt={item.name} />
                <button className="black-button-round" onClick={addItemToCart}>+</button>
            </div>
            <div className="item-text">
                <p className="item-name ">{item.name}</p>
                <p className="item-price ">${item.price}</p>
            </div>
        </div>
    )
}

export default ItemIndexItem
