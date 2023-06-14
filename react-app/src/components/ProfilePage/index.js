import { useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import ConfirmDeleteAccountModal from "./ConfirmDeleteAccountModal";
import "./ProfilePage.css";


const ProfilePage = () => {
    const user = useSelector(state => state.session.user);
    const history = useHistory();

    const editProfile = (e) => {
        e.preventDefault();
        return (
            <Redirect
                to={{
                    pathname: "/sigunp",
                    state: { isEdit: true }
                }}
            />
        )
    }

    const deletePRofile = (e) => {
        e.preventDefault();
        return (
            <Redirect
                to={{
                    pathname: "/sigunp",
                    state: { isEdit: true }
                }}
            />
        )
    }

    return (
        <div className="profile-page-wrapper" >
            <h1 >Account Info</h1>
            <img src={process.env.PUBLIC_URL + "/default-profile-picture.png"} alt="default profile picture" />
            <div className="basic-info-wrapper">
                <h3>Name</h3>
                <p>{`${user.firstName} ${user.lastName}`}</p>
                <h3>Phone Number</h3>
                <p>{`${user.phoneNumber}`}</p>
                <h3>Email</h3>
                <p>{`${user.email}`}</p>
            </div>
            <div className="profile-page-button-wrapper">
                <button className="black-button-square background-orange">Edit Account Details</button>
                <OpenModalButton
                    buttonText={"Delete Account"}
                    buttonClass={"black-button-square background-red"}
                    modalComponent={<ConfirmDeleteAccountModal/>}
                    modalClass={"center-small"}
                />
            </div>
        </div>
    )
}

export default ProfilePage;
