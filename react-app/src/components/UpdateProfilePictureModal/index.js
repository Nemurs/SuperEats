import { useState } from "react";
import { useModal } from "../../context/Modal";
import { createProfilePicThunk, deleteProfilePicThunk } from "./profilePicThunks";
import CloseModalButton from "../CloseModalButton";
import "./UpdateProfilePictureModal.css";
import { useDispatch } from "react-redux";

const UpdateProfilePictureModal = ({ imgUrl, imgId, userId }) => {
    const {closeModal} = useModal();
    const dispatch = useDispatch();

    const defUrl = "/default-profile-picture.png"
    const isDefPic = imgUrl === defUrl;
    const [picUrl, setPicUrl] = useState(!isDefPic ? imgUrl : "");

    if (!userId) return (<></>);

    const checkUrl = (str) => {
        return str.endsWith(".jpg") || str.endsWith(".jpeg") || str.endsWith(".png") || str.endsWith(".gif") || str.endsWith(".webp")
    }

    const handleSubmit = async (e, rmPic = false) => {
        e.preventDefault();
        if(rmPic){
            if (!isDefPic){
                await dispatch(deleteProfilePicThunk(userId, imgId))
            } else return;
        } else {
            if (imgUrl === picUrl) return;
            await dispatch(createProfilePicThunk(userId, picUrl))
        }
        closeModal();
        return;
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
                <button type="submit" className="black-button-square background-green">Update Picture</button>
                <button className="black-button-square background-red" onClick={(e) => handleSubmit(e, true)}>Delete Picture</button>
            </form>
        </div>
    )
}

export default UpdateProfilePictureModal;
