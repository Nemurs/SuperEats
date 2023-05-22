import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteOrder, deleteItem } from "../../store/cart";
import { authenticate } from "../../store/session";
import CartIndexItem from "../CartIndexItem";
import CloseModalButton from "../CloseModalButton";
import "./UpdateOrderModal.css";

const UpdateOrderModal = ({ order, business, cartId }) => {
    const [deleteIds, setDeleteIds] = useState([]);
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    if (!order || !business) return (<></>)
    console.log(order)

    let items = order.items;
    let business_items = {};
    for (let item of business.items) {
        business_items[item.id] = item;
    }

    items = items.map(item => ({ ...item, ...{ "images": business_items[item.id].images } }))

    const removeItem = (e, orderId) =>{
        e.preventDefault()
        setDeleteIds(prev => [...prev, orderId])
        console.log(deleteIds)
        return;
    }

    const cancelOrder = async (e) => {
        e.preventDefault();
        await dispatch(deleteOrder(cartId));
        await dispatch(authenticate());
        closeModal();
        return;
    }

    const handleSubmit = async (e) => {
        console.log("ids to be deleted:", deleteIds)
        for(let id of deleteIds){
            await dispatch(deleteItem(id));
        }
        await dispatch(authenticate());
        closeModal()
    }

    return (
        <div className="update-order-wrapper">
            <CloseModalButton />
            <div className='update-order-order-wrapper'>
                <div className="update-order-business">
                    <h3>{business.name}</h3>
                    <img className="small" src={business.images[0].url} alt={order.businessName} />
                </div>
                <div className="cartIndex">
                    {items.map((item) => !deleteIds.includes(item.orderId) ? (
                        <>
                            <CartIndexItem
                                key={item.id} item={item} includeImg={true}
                            />
                            <button className="close-button-x background-red" onClick={(e)=>removeItem(e, item.orderId)}>✖</button>
                        </>
                    ) : <></>)}
                </div>
                <div className="update-order-order-price">
                    <h4>Total: ${order.prices.reduce((acc, curr) => acc + curr, 0).toFixed(2)}</h4>
                </div>
            </div>
            <div className="cart-button-wrapper">
                <button className="black-button-square background-green" onClick={handleSubmit}>Submit Changes</button>
                <button className="black-button-square background-red" onClick={cancelOrder}>Cancel Order</button>
            </div>
        </div>

    )
}

export default UpdateOrderModal;
