import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='nav-list'>
			<div className='home-sidebar-wrapper'>
				<li className='nav-list-item'>
					<NavLink exact to="/">Home</NavLink>
				</li>
			</div>
			{isLoaded && (
				<div className='login-signup-wrapper'>
					<li className='nav-list-item'>
						<OpenModalButton
							buttonText="Log In"
							modalComponent={<LoginFormModal />}
							buttonClass={"white-button-round"}
						/>
					</li>
					<li className='nav-list-item'>
						<OpenModalButton
							buttonText="Sign Up"
							modalComponent={<SignupFormModal />}
							buttonClass={"black-button-round"}
						/>
					</li>
				</div>
			)}
		</ul>
	);
}

export default Navigation;
