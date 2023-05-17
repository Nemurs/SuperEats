import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import {logout} from "../../store/session";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	const dispatch = useDispatch();
	const history = useHistory();

	const logoutClick = async (e) => {
		e.preventDefault();
		await dispatch(logout());
		history.push("/");
		return;
	}

	return (
		<ul className='nav-list'>
			<div className='home-sidebar-wrapper'>
				{sessionUser && (<li className='nav-list-item'>
					<button className='white-button-round' onClick={logoutClick}>
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
						<OpenModalButton
							buttonText="Log In"
							modalComponent={<LoginFormModal />}
							buttonClass={"white-button-round"}
						/>
					</li>
					<li >
						<OpenModalButton
							buttonText="Sign Up"
							modalComponent={<SignupFormModal />}
							buttonClass={"black-button-round"}
						/>
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
