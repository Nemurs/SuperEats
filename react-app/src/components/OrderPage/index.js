import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllBusinessesThunk } from "../../store/business";
import CartIndexItem from "../CartIndexItem";
import "./OrderPage.css";
import OrderIndexItem from "../OrderIndexItem";
import OrderIndex from "../OrderIndex";
import { authenticate } from "../../store/session";
import { isTimestampOld } from "../../utils";
import { useLocation } from "react-router-dom";

const OrderPage = () => {
    const dispatch = useDispatch();
    const userOrders = useSelector(state => (state?.session?.user ? Object.values(state.session.user.userOrders) : null));
    const userReviews = useSelector(state => (state?.session?.user ? Object.values(state.session.user.userReviews) : null));
    const businesses = useSelector(state => state.business);

    useEffect(() => {
        dispatch(authenticate())
        dispatch(loadAllBusinessesThunk());
    }, [dispatch])

    if (!userOrders || !businesses) return (<></>)

    //Format orders by cartId
    let categorized_items = {};
    for (let order of userOrders) {
        // console.log("OG ORDER-->", order)
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
        if (!isTimestampOld(order.timeCreated, 5) || (order.timeUpdated && !isTimestampOld(order.timeUpdated, 5))) {
            console.log(order)
            console.log(pastOrders)
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
    return (
        <div className="order-page-wrapper">
            <div className="current-order-wrapper">
                <h2>Current Order</h2>

                {timestampCheck ?
                    mostRecentOrders.map((kvp) => {
                        let recentId = kvp[0];
                        let mostRecentOrder = kvp[1];
                        return (
                            <OrderIndexItem key={recentId} order={mostRecentOrder} cartId={recentId} business={businesses[mostRecentOrder.businessId]} isMostRecent={true} />
                        )
                    })
                    : <p> All orders complete after 5 minutes</p>}
            </div>
            <div className="past-orders-wrapper">
                <h2>Past Orders</h2>
                <OrderIndex orders={pastOrders} businesses={businesses} reviews={userReviews}/>
            </div>
        </div>
    )
}

export default OrderPage;
