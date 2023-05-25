import { useDispatch } from 'react-redux'
import { insertOneItem } from '../../store/cart'
import './ItemIndexItem.css'
import { useState } from 'react';

const ItemIndexItem = ({ item }) => {
    const dispatch = useDispatch();
    const [addItemAnimation, setAddItemAnimation] = useState(0)
    if (!item) return (<></>)
    const previewImage = item?.images?.filter(img => img.preview === true)[0].url

    const  addItemToCart = (e) => {
        e.preventDefault()
        setAddItemAnimation(1)
        dispatch(insertOneItem(item))
        return
    }

    return (
        <div className="item-item">
            <div className="item-img-wrapper" onAnimationEnd={()=>setAddItemAnimation(0)} addItemAnimation={addItemAnimation}>
                <img className="small" src={previewImage} alt={item.name} />
                <button className="black-button-round add-to-cart-button" onClick={addItemToCart} >+</button>
            </div>
            <div className="item-text">
                <p className="item-name ">{item.name}</p>
                <p className="item-price ">${item.price}</p>
            </div>
        </div>
    )
}

export default ItemIndexItem
