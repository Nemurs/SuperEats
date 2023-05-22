import OrderIndexItem from "../OrderIndexItem";

const OrderIndex = ({orders, businesses}) => {
    if (!orders || !businesses) return (<></>)

    // console.log(businesses[orders[0].businessId])

    return (
        <div className="OrderIndex">
            {orders.map((order)=>(
                <OrderIndexItem key={order.id} order={order} business={businesses[order.businessId]} isMostRecent={false}/>
            ))}
        </div>
    )
}

export default OrderIndex;
