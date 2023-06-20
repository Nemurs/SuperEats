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

    const pfp = sessionUser.images[0]?.preview ? sessionUser.images[0].url : process.env.PUBLIC_URL + "/default-profile-picture.png";

    return (
        <div className="user-menu-wrapper">
            <div className="user-menu-top-wrapper">
                <div className="profile-tile-wrapper">
                    <img src={pfp} alt="profile picture" />
                    <div className="profile-tile-wrapper-right">
                        <h2>{sessionUser.firstName}</h2>
                        <button className='transparent-button-square' style={{ color: "#2dbe64" }} onClick={(e) => clickToRedirect(e, "/profile")}>
                            Account Security
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
                            <button className='transparent-button-square' onClick={(e) => clickToRedirect(e, "/account_stats")}>
                                <i className="fas fa-address-card" style={{ color: "#000000" }} />
                                <h3>Account Stats</h3>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <button className='black-button-square background-green' onClick={(e) => clickToRedirect(e, "/", true)}>
                Logout
            </button>
        </div>
    )
}

export default UserMenu;
