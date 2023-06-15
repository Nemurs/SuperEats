import OpenModalButton from "../OpenModalButton";
import "./ProfilePicture.css";

const ProfilePicture = ({imgUrl}) => {



    return (
        <div className="profile-pic-wrapper">
            <img src={imgUrl} alt="profile picture" className="profile-pic-img"/>
            <OpenModalButton
                buttonIconClass={"fas fa-camera"}
                buttonClass={"black-button-round small-padding"}
                modalComponent={<h1>Hi</h1>}
                modalClass={"center-small"}
            />

        </div>
    )
}

export default ProfilePicture;
