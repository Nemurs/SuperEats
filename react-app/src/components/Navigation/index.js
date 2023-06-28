import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../store/session";
import { clearItems } from '../../store/cart';
import OpenModalButton from "../OpenModalButton";
import CartModal from '../CartModal';
import UserMenu from '../UserMenu';
import Search from '../Search';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const carts = useSelector(state => Object.values(state.cart))
	const [itemCount, setItemCount] = useState(0);

	useEffect(() => {
		let cartItems = 0;
		for (let cart of Object.values(carts)){
			cartItems += Object.values(cart).length
		}
		setItemCount(cartItems)
	}, [carts])

	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const clickToRedirect = async (e, newPath) => {
		e.preventDefault();
		if (sessionUser) {
			await dispatch(logout());
			await dispatch(clearItems());
		}
		history.push(newPath);
		return;
	}

	if (location.pathname === "/login" || location.pathname === "/signup") {
		return (
			<ul className={'nav-list dark-background'}>
				<div className='home-sidebar-wrapper dark-background'>
					<li className='nav-list-item'>
						<button className='home-button dark-background'>
							<NavLink exact to="/">Super<span className='bold'>Eats</span></NavLink>
						</button>
					</li>
				</div>
			</ul>
		);
	}

	return (
		<ul className='nav-list'>
			<div className='home-sidebar-wrapper'>
				{sessionUser && (<li className='nav-list-item'>
					<OpenModalButton
						modalComponent={<UserMenu sessionUser={sessionUser} />}
						buttonText={<i className="fas fa-bars" style={{ color: "#000000" }} />}
						buttonClass={"transparent-button-square"}
						modalClass={"left"}
					/>
				</li>)}
				<li className='nav-list-item'>
					<button className='home-button'>
						<NavLink exact to="/">Super<span className='bold'>Eats</span></NavLink>
					</button>
				</li>
			</div>


			{isLoaded && !sessionUser ? (
				<div className='login-signup-wrapper'>
					<li className='nav-list-item'>
						<button className="white-button-round background-green" onClick={(e) => clickToRedirect(e, "/login")}>
							Log in
						</button>
					</li>
					<li >
						<button className="black-button-round background-orange" onClick={(e) => clickToRedirect(e, "/signup")}>
							Sign Up
						</button>
					</li>
				</div>
			) : (
				<>
					<div className="search-bar-wrapper">
						<Search />
					</div>
					<div className='cart-modal-button-wrapper'>
						<li className='nav-list-item'>
							<div className='cart-icon-wrapper'>
								{itemCount > 0 && <p className='cart-icon-count'>{String(itemCount)}</p>}
								<OpenModalButton
									buttonText={<><i className="fas fa-shopping-cart" style={{ color: "white" }} />   Cart</>}
									modalComponent={<CartModal carts={carts} sessionUser={sessionUser} />}
									buttonClass={"black-button-round"}
									modalClass={"right"}
								/>
							</div>
						</li>
					</div>
				</>
			)}
		</ul>
	);
}

export default Navigation;
