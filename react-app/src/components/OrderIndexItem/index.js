import { useHistory } from "react-router-dom";
import CartIndexItem from "../CartIndexItem";
import "./OrderIndexItem.css";

const OrderIndexItem = ({ order, business, isMostRecent }) => {
    const history = useHistory();

    if (!order || !business) return (<></>)

    const redirectToStore = async (e) => {
        e.preventDefault();
        history.push(`/business/${order.businessId}`);
        return;
    }

    return (
        <div className="order-wrapper">
            <div className="order-wrapper-left">
                <img className="small" src={business.images[0].url} alt={order.businessName} />
                <div className="order-wrapper-left-text">
                    <h3>{order.businessName}</h3>
                    <div className="cartIndex-vertical">
                        {order.items.map((item) => (
                            <CartIndexItem
                                key={item.id} item={item} includeImg={false}
                            />
                        ))}
                        <h4>Total: ${order.prices.reduce((acc, curr) => acc + curr, 0).toFixed(2)}</h4>
                    </div>
                </div>
            </div>
            <div className="order-wrapper-right">
                {isMostRecent ?
                    (<>
                    <button className="black-button-square background-orange" >Update Order</button>
                    <button className="black-button-square background-red" >Cancel Order</button>
                    </>
                    )
                    : (<button className="black-button-square" onClick={redirectToStore}>Visit Store</button>)}
            </div>
        </div>
    )
}

export default OrderIndexItem;
