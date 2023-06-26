import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { createProfilePicThunk, deleteProfilePicThunk } from "./profilePicThunks";
import CloseModalButton from "../CloseModalButton";
import "./UpdateProfilePictureModal.css";
import { useDispatch } from "react-redux";
import Loader from "../Loader";

const UpdateProfilePictureModal = ({ imgUrl, imgId, userId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const defUrl = "/default-profile-picture.png"
    const isDefPic = imgUrl === defUrl;
    // const [picUrl, setPicUrl] = useState(!isDefPic ? imgUrl : "");
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [preview, setPreview] = useState(null)

    useEffect(() => {
        if (!image) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(image)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [image])

    if (!userId) return (<></>);

    // const checkUrl = (str) => {
    //     return str.endsWith(".jpg") || str.endsWith(".jpeg") || str.endsWith(".png") || str.endsWith(".gif") || str.endsWith(".webp")
    // }

    const handleSubmit = async (e, rmPic = false) => {
        e.preventDefault();
        if(!image && !rmPic) return;
        const formData = new FormData();
        formData.append("image", image);
        formData.append("preview", true);
        formData.append("user_id", userId)
        setImageLoading(true)
        if (rmPic) {
            if (!isDefPic) {
                await dispatch(deleteProfilePicThunk(userId, imgId))
            } else return;
        } else {
            // if (imgUrl === picUrl) return;
            await dispatch(createProfilePicThunk(formData))
        }
        setImageLoading(false)
        closeModal();
        return;
    }

    return (
        <div className="profile-pic-update-wrapper">
            <CloseModalButton />
            <h1>Edit Profile Picture</h1>
            <img src={isDefPic && !imgUrl ? defUrl : image ? preview: imgUrl} alt="profile picture" className="profile-pic-preview" />
            <form onSubmit={handleSubmit} className="profile-pic-update-form" encType="multipart/form-data">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                {(imageLoading) && <Loader color={"#ff7b00"}/>}
                <button type="submit" className="black-button-square background-green">Update Picture</button>
                <button className="black-button-square background-red" onClick={(e) => handleSubmit(e, true)}>Delete Picture</button>
            </form>
        </div>
    )
}

export default UpdateProfilePictureModal;
