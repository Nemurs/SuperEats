import OrderIndexItem from "../OrderIndexItem";
import { useEffect, useState } from "react";

const OrderIndex = ({ orders, businesses, reviews }) => {
    const [activeReviews, setActiveReviews] = useState(reviews);

    useEffect(() => {
        setActiveReviews(reviews)
    }, [reviews])

    if (!orders.length || !businesses) return (<></>)


    return (
        <div className="OrderIndex">
            {orders.map((kvp) => {
                let cartId = kvp[0];
                let order = kvp[1];
                // console.log(activeReviews.find(rev => rev.cartId == cartId))
                return (
                    <OrderIndexItem key={order.id} order={order} business={businesses[order.businessId]} isMostRecent={false} cartId={cartId} reviewProp={activeReviews.find(rev => rev.cartId == cartId)} />
                )
            })}
        </div>
    )
}

export default OrderIndex;
