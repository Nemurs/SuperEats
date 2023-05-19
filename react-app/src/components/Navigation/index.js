import React from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { logout } from "../../store/session";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const clickToRedirect = async (e, newPath) => {
		e.preventDefault();
		await dispatch(logout());
		history.push(newPath);
		console.log("Successfully logged out");
		return;
	}

	if (location.pathname === "/login" || location.pathname === "/signup" ){
		return (
			<ul className={'nav-list dark-background'}>
				<div className='home-sidebar-wrapper'>
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
					<button className='black-button-round' onClick={(e) => clickToRedirect(e, "/")}>
						Logout
					</button>
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
						<button className="white-button-round" onClick={(e) => clickToRedirect(e, "/login")}>
							Log in
						</button>
					</li>
					<li >
						<button className="black-button-round" onClick={(e) => clickToRedirect(e, "/signup")}>
							Sign Up
						</button>
					</li>
				</div>
			) : (
				<div className='cart-wrapper'>
					<li className='nav-list-item'>
						<button className="black-button-round">Cart</button>
					</li>
				</div>
			)}
		</ul>
	);
}

export default Navigation;
