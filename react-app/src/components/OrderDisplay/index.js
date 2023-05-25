import { useState, useEffect } from "react";
import OrderIndexItem from "../OrderIndexItem";
import OrderIndex from "../OrderIndex";
import "./OrderDisplay.css";

const OrderDisplay = ({ mostRecentOrders, pastOrders, timestampCheck, businesses, userReviews, shouldRerender, countdown, useTimer }) => {

    const [mostRecentOrdersActive, setMostRecentOrdersActive] = useState(mostRecentOrders)
    const [pastOrdersActive, setPastOrdersActive] = useState(pastOrders)
    const [timestampCheckActive, setTimestampCheckActive] = useState(timestampCheck)
    const [businessesActive, setBusinessesActive] = useState(businesses)
    const [userReviewsActive, setUserReviewsActive] = useState(userReviews)

    console.log(pastOrders)
    useEffect(()=>{
        console.log("something changed", pastOrders)

        setMostRecentOrdersActive(mostRecentOrders)
        setPastOrdersActive(pastOrders)
        setTimestampCheckActive(timestampCheck)
        setBusinessesActive(businesses)
        setUserReviewsActive(userReviews)

    }, [mostRecentOrders, pastOrders,timestampCheck,businesses,userReviews])

    return (
        <>
            <div className="current-order-wrapper">
                <h2>Current Order{mostRecentOrdersActive.length == 1 ? "" : "s"}</h2>
                {useTimer && (
                    <p>Order{mostRecentOrdersActive.length == 1 ? "" : "s"} will complete in: {countdown} seconds</p>
                )}
                {timestampCheckActive ?
                    mostRecentOrdersActive.map((kvp) => {
                        let recentId = kvp[0];
                        let mostRecentOrder = kvp[1];
                        return (
                            <OrderIndexItem key={recentId} order={mostRecentOrder} cartId={recentId} business={businessesActive[mostRecentOrder.businessId]} isMostRecent={true} />
                        )
                    })
                    : <p> All orders complete after 1 minute.</p>}
            </div>
            <div className="past-orders-wrapper">
                <h2>Past Orders</h2>
                {pastOrdersActive.length ? (
                    <OrderIndex orders={pastOrdersActive} businesses={businessesActive} reviews={userReviewsActive} />
                ) : (<p>Place an order to see it here!</p>)}
            </div>
        </>
    )
}

export default OrderDisplay;
