import './CartIndexItem.css'

const CartIndexItem = ({ item, includeImg }) => {

    if (!item) return (<></>)
    let previewImage;
    if (includeImg){
        previewImage = item?.images?.filter(img => img.preview === true)[0].url
    }
    return (
        <div className="cart-item-item">
            {includeImg ? (<img className="smallest" src={previewImage} alt={item.name} />) : (<></>)}
            <div className="cart-item-text">
                <p className="cart-item-name ">{item.name}</p>
                <p className="cart-item-price ">${item.price}</p>
            </div>
        </div>
    )
}

export default CartIndexItem
