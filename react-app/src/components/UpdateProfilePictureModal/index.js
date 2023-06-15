import { useState } from "react";
import "./UpdateProfilePictureModal.css";
import CloseModalButton from "../CloseModalButton";

const UpdateProfilePictureModal = ({ imgUrl, user }) => {
    const defUrl = "/default-profile-picture.png"
    const isDefPic = imgUrl === defUrl;
    const [picUrl, setPicUrl] = useState(!isDefPic ? imgUrl : "");

    if (!user) return (<></>);

    const checkUrl = (str) => {
        return str.endsWith(".jpg") || str.endsWith(".jpeg") || str.endsWith(".png") || str.endsWith(".gif") || str.endsWith(".webp")
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <div className="profile-pic-update-wrapper">
            <CloseModalButton/>
            <h1>Edit Profile Picture</h1>
            <img src={isDefPic && !checkUrl(picUrl) ? defUrl : picUrl} alt="profile picture" className="profile-pic-preview" />
            <form onSubmit={handleSubmit} className="profile-pic-update-form">
                <input
                    type="text"
                    value={picUrl }
                    onChange={(e) => setPicUrl(e.target.value)}
                    placeholder="Enter new profile picture url"
                    required
                />
                <button type="submit" className="black-button-square background-green">Continue</button>
            </form>
        </div>
    )
}

export default UpdateProfilePictureModal;
