import { logout } from "../../store/session";
import { clearItems } from '../../store/cart';
import { useModal } from "../../context/Modal";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import "./UserMenu.css";

const UserMenu = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const clickToRedirect = async (e, newPath, islogout = false) => {
        e.preventDefault();
        if (sessionUser && islogout) {
            await dispatch(logout());
            await dispatch(clearItems());
        }
        closeModal()
        history.push(newPath);
        return;
    }

    if (!sessionUser) return <></>

    return (
        <div className="user-menu-wrapper">
            <div className="profile-tile-wrapper">
                <i className="fa fa-portrait" style={{ color: "#000000" }}></i>
                <div className="profile-tile-wrapper-left">
                    <h2>{sessionUser.firstName}</h2>
                    <button className='transparent-button-square' style={{ color: "#2dbe64" }} onClick={(e) => clickToRedirect(e, "/profile")}>
                        Manage Account
                    </button>
                </div>
            </div>
            <div className="profile-links-wrapper">
                <ul className="profile-links-list">
                    <li className="profile-link">
                        <button className='transparent-button-square' onClick={(e) => clickToRedirect(e, "/orders")}>
                            <i className="fa fa-drumstick-bite" style={{ color: "#000000" }} />
                            <h3>Orders</h3>
                        </button>
                    </li>
                </ul>
            </div>

            <button className='black-button-round' onClick={(e) => clickToRedirect(e, "/", true)}>
                Logout
            </button>
        </div>
    )
}

export default UserMenu;
