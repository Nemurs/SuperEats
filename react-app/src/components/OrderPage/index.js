import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllBusinessesThunk } from "../../store/business";
import CartIndexItem from "../CartIndexItem";
import "./OrderPage.css";
import OrderIndexItem from "../OrderIndexItem";
import OrderIndex from "../OrderIndex";
import { authenticate } from "../../store/session";
import { isTimestampOld } from "../../utils";

const OrderPage = () => {
    const dispatch = useDispatch();
    const userOrders = useSelector(state => (state?.session?.user ? Object.values(state.session.user.userOrders) : null));
    const businesses = useSelector(state => state.business);

    useEffect(() => {
        dispatch(authenticate())
        dispatch(loadAllBusinessesThunk());
    }, [dispatch])

    if (!userOrders || !businesses) return (<></>)

    //Format orders by cartId
    let categorized_items = {};
    for (let order of userOrders) {
        if (!(order.cartId in categorized_items)) {
            categorized_items[order.cartId] = { "items": [order.item], "prices": [order.item.price], "businessName": order.cartInfo.businessName, "businessId": order.cartInfo.businessId, "timeCreated": order.cartInfo.timeCreated, "timeUpdated": order.cartInfo.timeUpdated}
        } else {
            categorized_items[order.cartId].items.push(order.item)
            categorized_items[order.cartId].prices.push(order.item.price)
        }
    }
    let categories = Object.keys(categorized_items);

    const mostRecentCartId = Math.max(...Object.keys(categorized_items))
    const mostRecentOrder = categorized_items[mostRecentCartId] //largest cart id is most recent order

    let pastOrders = { ...categorized_items }

    let timestampCheck = false;
    if (!isTimestampOld(mostRecentOrder.timeCreated, 5) || (mostRecentOrder.timeUpdated && !isTimestampOld(mostRecentOrder.timeUpdated, 5))){
        delete pastOrders[mostRecentCartId]
        delete categories[mostRecentCartId]
        timestampCheck = true;
    }

    pastOrders = Object.values(pastOrders);
    pastOrders.reverse()
    return (
        <div className="order-page-wrapper">
            <div className="current-order-wrapper">
                <h2>Current Order</h2>
                {timestampCheck ? <OrderIndexItem order={mostRecentOrder} cartId={mostRecentCartId} business={businesses[mostRecentOrder.businessId]} isMostRecent={true}/> : <p> All orders complete after 5 minutes</p>}
            </div>
            <div className="past-orders-wrapper">
                <h2>Past Orders</h2>
                <OrderIndex orders={pastOrders} businesses={businesses}/>
            </div>
        </div>
    )
}

export default OrderPage;
