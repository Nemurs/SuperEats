import OrderIndexItem from "../OrderIndexItem";

const OrderIndex = ({orders, businesses, reviews}) => {
    if (!orders.length || !businesses) return (<></>)

    // console.log(businesses[orders[0].businessId])

    //Normalize reviews obj
    let normalized_reviews = {};
    for (let rev of reviews){
        normalized_reviews[rev.cartId] = rev
    }

    return (
        <div className="OrderIndex">
            {orders.map((kvp)=>{
                let cartId = kvp[0];
                let order = kvp[1];
                return(
                    <OrderIndexItem key={order.id} order={order} business={businesses[order.businessId]} isMostRecent={false} cartId={cartId} review={normalized_reviews[cartId]}/>
                )
            })}
        </div>
    )
}

export default OrderIndex;
