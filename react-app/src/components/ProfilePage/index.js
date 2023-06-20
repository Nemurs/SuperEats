import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import ProfilePicture from "../ProfilePicture";
import ConfirmDeleteAccountModal from "./ConfirmDeleteAccountModal";
import Loader from "../Loader";
import "./ProfilePage.css";

const ProfilePage = () => {
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();

    const editAccount = (e) => {
        e.preventDefault();
        history.push("/signup", {isEdit: true})
        return;
    }

    if (!user) return (<Loader/>)

    const pfp = user.images[0]?.preview ? user.images[0].url : process.env.PUBLIC_URL + "/default-profile-picture.png";
    const pfpId = user.images[0]?.id
    const userId = user.id;

    return (
        <div className="profile-page-wrapper" >
            <div className="account-info-wrapper">
                <h1 >Account Info</h1>
                <ProfilePicture imgUrl={pfp} imgId={pfpId} userId={userId}/>
                <div className="basic-info-wrapper">
                    <h3>Name</h3>
                    <p>{`${user.firstName} ${user.lastName}`}</p>
                    <h3>Phone Number</h3>
                    <p>{`${user.phoneNumber}`}</p>
                    <h3>Email</h3>
                    <p>{`${user.email}`}</p>
                </div>
                {userId > 9 ? (<div className="account-info-button-wrapper">
                    <button className="black-button-square background-orange" onClick={editAccount}>Edit Account Info</button>
                    <OpenModalButton
                        buttonText={"Delete Account"}
                        buttonClass={"black-button-square background-red"}
                        modalComponent={<ConfirmDeleteAccountModal userId={user.id} />}
                        modalClass={"center-small"}
                    />
                </div>) : (<></>)}

            </div>

        </div>
    )
}

export default ProfilePage;
