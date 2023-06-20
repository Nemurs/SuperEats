import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../../store/cart";
import { authenticate } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import UpateOrderModal from "../UpdateOrderModal"
import CartIndexItem from "../CartIndexItem";
import StarRatingInput from "../StarRatingInput";
import ReviewModal from "../ReviewModal";
import "./OrderIndexItem.css";
import { useEffect, useState } from "react";

const OrderIndexItem = ({ order, business, isMostRecent, cartId, reviewProp }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [review, setReview] = useState(reviewProp ? reviewProp : null);

    useEffect(() => {
        setReview(reviewProp)
    }, [reviewProp])

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

    // console.log(review)

    return (
        <div className="order-wrapper">
            <div className="order-wrapper-left">
                <img className="tall" src={business.images[0].url} alt={order.businessName} />
                <div className="order-wrapper-left-text">
                    <div className="order-wrapper-left-top-text">
                        <h3>{order.businessName}</h3>
                        {/* {console.log(review)} */}
                        {review ? (<StarRatingInput rating={review.rating} disabled={true} />) : (<StarRatingInput rating={0} disabled={true} />)}

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
                            modalComponent={<UpateOrderModal order={order} business={business} cartId={cartId} />}
                            modalClass={"center-small"}
                        />
                        <button className="black-button-square background-red" onClick={cancelOrder}>Cancel Order</button>
                    </>) : (
                        <>
                            {review && review.rating ? (<OpenModalButton
                                buttonText={"Edit Review"}
                                buttonClass={"black-button-square background-gold"}
                                modalComponent={<ReviewModal order={order} businessId={business.id} cartId={cartId} isEdit={true} review={review} />}
                                modalClass={"center-small"}
                            />) : (<OpenModalButton
                                buttonText={"Add Review"}
                                buttonClass={"black-button-square background-gold"}
                                modalComponent={<ReviewModal order={order} businessId={business.id} cartId={cartId} isEdit={false}/>}
                                modalClass={"center-small"}
                                />)}
                            <button className="gray-button-square" onClick={redirectToStore}>Visit Store</button>
                        </>)}
            </div>
        </div>
    )
}

export default OrderIndexItem;
