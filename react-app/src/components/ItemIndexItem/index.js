import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { insertOneItem } from '../../store/cart'
import './ItemIndexItem.css'
import { useState } from 'react';

const ItemIndexItem = ({ item, hoverable = false, orderable = true , imgUrl }) => {
    const dispatch = useDispatch();
    const [addItemAnimation, setAddItemAnimation] = useState(0)
    if (!item) return (<></>)
    const previewImage = imgUrl ? imgUrl : item?.images?.filter(img => img.preview === true)[0].url

    const  addItemToCart = (e) => {
        e.preventDefault()
        setAddItemAnimation(1)
        dispatch(insertOneItem(item))
        return
    }

    if (hoverable) return (
        <div className="item-item hoverable">
            <Link  to={`/business/${item.business_id}`}>
                <div className="item-img-wrapper" onAnimationEnd={()=>setAddItemAnimation(0)} addItemAnimation={addItemAnimation}>
                    <img className="small" src={previewImage} alt={item.name} />
                    {orderable ? (<button className="black-button-round add-to-cart-button" onClick={addItemToCart} >+</button>):(<></>)}
                </div>
                <div className="item-text">
                    <p className="item-name ">{item.name}</p>
                    {orderable ? (<p className="item-price ">${item.price}</p>) : (<></>)}
                </div>
            </Link>
        </div>
    )
    else return (
        <div className="item-item">
                <div className="item-img-wrapper" onAnimationEnd={()=>setAddItemAnimation(0)} addItemAnimation={addItemAnimation}>
                    <img className="small" src={previewImage} alt={item.name} />
                    {orderable ? (<button className="black-button-round add-to-cart-button" onClick={addItemToCart} >+</button>):(<></>)}
                </div>
                <div className="item-text">
                    <p className="item-name ">{item.name}</p>
                    {orderable ? (<p className="item-price ">${item.price}</p>) : (<></>)}
                </div>
        </div>
    )
}

export default ItemIndexItem
