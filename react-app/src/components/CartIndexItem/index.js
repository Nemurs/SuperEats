import { useDispatch } from 'react-redux'
import './CartIndexItem.css'

const CartIndexItem = ({ item }) => {
    const dispatch = useDispatch();
    if (!item) return (<></>)
    const previewImage = item?.images?.filter(img => img.preview === true)[0].url
    return (
        <div className="cart-item-item">
            <img className="smallest" src={previewImage} alt={item.name} />
            <div className="cart-item-text">
                <p className="cart-item-name ">{item.name}</p>
                <p className="cart-item-price ">${item.price}</p>
            </div>
        </div>
    )
}

export default CartIndexItem
