import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isTimestampOld } from "../../utils";
import { authenticate } from "../../store/session";
import { loadAllBusinessesThunk } from "../../store/business";
import OrderIndex from "../OrderIndex";
import OrderIndexItem from "../OrderIndexItem";
import "./OrderPage.css";

const OrderPage = ({ shouldRefresh, timer }) => {
    const dispatch = useDispatch();
    const userOrders = useSelector(state => (state?.session?.user ? (state.session.user.userOrders) : null));
    const userReviews = useSelector(state => (state?.session?.user ? (state.session.user.userReviews) : null));
    const businesses = useSelector(state => state?.business?.allBusinesses ? (state.business.allBusinesses) : null)

    const [mostRecentOrdersActive, setMostRecentOrdersActive] = useState({})
    const [pastOrdersActive, setPastOrdersActive] = useState({})
    const [timestampCheckActive, setTimestampCheckActive] = useState(false)

    useEffect(() => {
        dispatch(authenticate())
        dispatch(loadAllBusinessesThunk());
    }, [dispatch])

    useEffect(() => {
        if (!userOrders || !businesses) return (<></>)

        //Format orders by cartId
        let categorized_items = {};
        for (let order of Object.values(userOrders)) {
            let new_item = { ...order.item, ...{ orderId: order.id } }
            if (!(order.cartId in categorized_items)) {
                categorized_items[order.cartId] = { "items": [new_item], "prices": [new_item.price], "businessName": order.cartInfo.businessName, "businessId": order.cartInfo.businessId, "timeCreated": order.cartInfo.timeCreated, "timeUpdated": order.cartInfo.timeUpdated }
            } else {
                categorized_items[order.cartId].items.push(new_item)
                categorized_items[order.cartId].prices.push(new_item.price)
            }
        }
        let categories = Object.keys(categorized_items);

        let timestampCheck = false;
        let pastOrders = { ...categorized_items }
        let mostRecentOrders = {};
        for (let [cartId, order] of Object.entries(categorized_items)) {
            if (!isTimestampOld(order.timeCreated, 0.9) || (order.timeUpdated && !isTimestampOld(order.timeUpdated, 0.9))) {
                delete pastOrders[cartId]
                delete categories[cartId]
                mostRecentOrders[cartId] = order
                timestampCheck = true;
            }
        }

        mostRecentOrders = Object.entries(mostRecentOrders);
        mostRecentOrders.reverse()

        pastOrders = Object.entries(pastOrders);
        pastOrders.reverse()

        setMostRecentOrdersActive(mostRecentOrders)
        setPastOrdersActive(pastOrders)
        setTimestampCheckActive(timestampCheck)
    }, [userOrders, userReviews, businesses])

    useEffect(() => {
        if (shouldRefresh) {
            setPastOrdersActive(prev => ([...mostRecentOrdersActive, ...prev]))
            setMostRecentOrdersActive([])
            setTimestampCheckActive(true)
        }
    }, [shouldRefresh]);

    return (
        <div className="order-page-wrapper">
            <div className="current-order-wrapper">
                <h2>Current Order{mostRecentOrdersActive.length == 1 ? "" : "s"}</h2>
                {mostRecentOrdersActive.length >= 1 ?
                    <>
                        <p>Timer: {timer} seconds</p>
                        {mostRecentOrdersActive.map((kvp) => {
                            let recentId = kvp[0];
                            let mostRecentOrder = kvp[1];
                            return (
                                <OrderIndexItem key={recentId} order={mostRecentOrder} cartId={recentId} business={businesses[mostRecentOrder.businessId]} isMostRecent={true} />
                            )
                        })}</>
                    : <p>
                        All orders complete after 1 minute.
                    </p>}
            </div>
            <div className="past-orders-wrapper">
                <h2>Past Orders</h2>
                {pastOrdersActive.length ? (
                    <OrderIndex orders={pastOrdersActive} businesses={businesses} reviews={userReviews} />
                ) : (<p>Place an order to see it here!</p>)}
            </div>
        </div>
    )
}

export default OrderPage;
