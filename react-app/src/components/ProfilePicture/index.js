import OpenModalButton from "../OpenModalButton";
import UpdateProfilePictureModal from "../UpdateProfilePictureModal";
import "./ProfilePicture.css";

const ProfilePicture = ({imgUrl,imgId, userId}) => {

    return (
        <div className="profile-pic-wrapper">
            <img src={imgUrl} alt="profile picture" className="profile-pic-img"/>
            {userId > 9 ? (<OpenModalButton
                buttonIconClass={"fas fa-camera"}
                buttonClass={"black-button-round small-padding"}
                modalComponent={<UpdateProfilePictureModal {...{imgUrl, imgId,userId}}/>}
                modalClass={"center-small"}
            />) : (<></>)}
        </div>
    )
}

export default ProfilePicture;
