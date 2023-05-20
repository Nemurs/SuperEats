import CartIndexItem from "../CartIndexItem";
import './CartItemIndex.css';

const CartItemIndex = ({items}) =>  {
    if (!items) return (<></>)

    return (
        <div className="cartIndex">
            {items.map((item) => (
                <CartIndexItem
                    key={item.id} item={item}
                />
            ))}
        </div>
    )
}

export default CartItemIndex
