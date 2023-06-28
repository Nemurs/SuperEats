import { useEffect, useState } from "react";
import OrderIndexItem from "../OrderIndexItem";

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
                return (
                    <OrderIndexItem key={order.id} order={order} business={businesses[order.businessId]} isMostRecent={false} cartId={cartId} reviewProp={activeReviews.find(rev => rev.cartId == cartId)} />
                )
            })}
        </div>
    )
}

export default OrderIndex;
