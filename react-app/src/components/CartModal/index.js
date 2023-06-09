import React from "react";
import CloseModalButton from "../CloseModalButton";
import CartItemIndex from "../CartItemIndex";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { clearItems, clearCart, orderItems } from "../../store/cart";
import "./CartModal.css";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/session";

function CartModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const carts = useSelector(state => Object.values(state.cart))
  const sessionUser = useSelector(state => state.session.user)

  //Empty Cart
  const clickToRedirect = async (e, newPath) => {
    e.preventDefault();
    closeModal();
    history.push(newPath);
    return;
  }

  if (!Object.values(carts).length) return (
    <div className="cart-wrapper no-items">
        <CloseModalButton />
      <div className="empty-cart-wrapper">
        <img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/a023a017672c2488.svg" alt="empty shopping cart icon" />
        <h4>Add items to start a cart</h4>
        <p>Once you add items from a restaurant or store, your cart will appear here.</p>
        <button className="black-button-round" onClick={(e) => clickToRedirect(e, "/home")}>Start Shopping</button>
      </div>
    </div>
  )

  //Organize cart items by their respective businesses
  let allCartItems = [];

  for (let cart of Object.values(carts)) {
    for (let item of Object.values(cart)) {
      allCartItems.push(item)
    }
  }
  let categorized_items = {};
  for (let item of allCartItems) {
    if (!(item.business.name in categorized_items)) {
      categorized_items[item.business.name] = {"businessId": item.business.id, "items": [item], "prices": [item.price] }
    } else {
      categorized_items[item.business.name].items.push(item)
      categorized_items[item.business.name].prices.push(item.price)
    }
  }
  const categories = Object.keys(categorized_items);

  //Handle button clicks
  const clickClearAllCarts = async (e) => {
    e.preventDefault();
    await dispatch(clearItems());
    closeModal();
    return;
  }

  const clickClearOneCart = async (e, businessId) => {
    e.preventDefault();
    if(Object.values(carts).length === 1) closeModal();
    await dispatch(clearCart(businessId));
    return;
  }

  const clickOrderOneCart = async (e, businessId, items) => {
    e.preventDefault();
    await dispatch(orderItems(sessionUser.id, businessId, items.map(item => item.id)));
    await dispatch(authenticate());
    closeModal();
    history.push("/orders");
    return;
  }

  const clickOrderManyCarts = async (e, carts) => {
    e.preventDefault();
    closeModal();
    for (let cart of Object.values(carts)) {
      await dispatch(orderItems(sessionUser.id, cart["businessId"], cart["items"].map(item => item.id)))
    }
    await dispatch(authenticate());
    history.push("/orders");
  }

  return (
    <div className="cart-wrapper">
      <CloseModalButton />
      <div className="categories">
        {categories.map((category, index) => (
          <div key={category + String(carts[index])} className='category-wrapper'>
            <div className="category-label-delete">
              <h3>{category}</h3>
              <button className="close-button-x background-red" onClick={(e) => clickClearOneCart(e, categorized_items[category].items[0].business.id)}>✖</button>
            </div>
            <CartItemIndex
              items={categorized_items[category].items}
            />
            <div className="category-price-submit">
              <h4>Total: ${categorized_items[category].prices.reduce((acc, curr) => acc + curr, 0).toFixed(2)}</h4>
              <button className="black-button-square background-green" onClick={(e) => clickOrderOneCart(e, categorized_items[category].items[0].business.id, categorized_items[category].items)}>Order</button>
            </div>
          </div>
        ))}
        <div className="cart-button-wrapper">
          <button className="black-button-square background-green" onClick={(e)=>clickOrderManyCarts(e, categorized_items)}>Order all carts</button>
          <button className="black-button-square background-red" onClick={clickClearAllCarts}>Delete all carts</button>
        </div>
      </div>
    </div>
  );
}

export default CartModal;
