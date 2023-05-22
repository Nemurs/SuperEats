import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../../store/cart";
import { authenticate } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import UpateOrderModal from "../UpdateOrderModal"
import CartIndexItem from "../CartIndexItem";
import "./OrderIndexItem.css";

const OrderIndexItem = ({ order, business, isMostRecent, cartId, review }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    if (!order || !business) return (<></>)

    const redirectToStore = async (e) => {
        e.preventDefault();
        history.push(`/business/${order.businessId}`);
        return;
    }

    const cancelOrder = async (e) => {
        e.preventDefault();
        await dispatch(deleteOrder(cartId));
        await dispatch(authenticate());
        // history.push(`/orders`);
        return;
    }

    console.log(review)

    return (
        <div className="order-wrapper">
            <div className="order-wrapper-left">
                <img className="small" src={business.images[0].url} alt={order.businessName} />
                <div className="order-wrapper-left-text">
                    <div className="order-wrapper-left-top-text">
                        <h3>{order.businessName}</h3>
                        <p>{review && review.rating ? review.rating : <></>}</p>
                    </div>
                    <div className="cartIndex-vertical">
                        {order.items.map((item) => (
                            <CartIndexItem
                                key={item.id} item={item} includeImg={false}
                            />
                        ))}
                        <h4 >Total: ${order.prices.reduce((acc, curr) => acc + curr, 0).toFixed(2)}</h4>
                    </div>
                </div>
            </div>
            <div className="order-wrapper-right">
                {isMostRecent ?
                    (<>
                    <OpenModalButton
                        buttonText={"Update Order"}
                        buttonClass={"black-button-square background-orange"}
                        modalComponent={<UpateOrderModal order={order} business={business} cartId={cartId}/>}
                    />
                    <button className="black-button-square background-red" onClick={cancelOrder}>Cancel Order</button>
                    </>
                    )
                    : (<button className="black-button-square" onClick={redirectToStore}>Visit Store</button>)}
            </div>
        </div>
    )
}

export default OrderIndexItem;
