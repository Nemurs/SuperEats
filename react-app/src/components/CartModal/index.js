import React from "react";
import CloseModalButton from "../CloseModalButton";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./CartModal.css";

function CartModal({ carts }) {
  const history = useHistory();
  const { closeModal } = useModal();

  const clickToRedirect = async (e, newPath) => {
		e.preventDefault();
    closeModal();
		history.push(newPath);
		return;
	}

  if (!carts.length) return (
    <div className="cart-wrapper">
      <CloseModalButton />
      <div className="empty-cart-wrapper">
        <img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/a023a017672c2488.svg" alt="empty shopping cart icon" />
        <h4>Add items to start a cart</h4>
        <p>Once you add items from a restaurant or store, your cart will appear here.</p>
        <button className="black-button-round" onClick={(e) => clickToRedirect(e, "/home")}>Start Shopping</button>
      </div>
    </div>
  )

  return (
    <div className="cart-wrapper">
      <CloseModalButton />
      <div className="cart-text-wrapper">
        <p>test</p>
        {/* <h1 className="cart-greeting-text">All Businesses</h1> */}
        {/* <BusinessIndex businesses={businesses}/> */}
      </div>
    </div>
  );
}

export default CartModal;
