import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { createProfilePicThunk, deleteProfilePicThunk } from "./profilePicThunks";
import { useDispatch } from "react-redux";
import { FileUploader } from "react-drag-drop-files";
import Loader from "../Loader";
import CloseModalButton from "../CloseModalButton";
import "./UpdateProfilePictureModal.css";

const FILETYPES = ["JPG","PNG", "JPEG"]

const UpdateProfilePictureModal = ({ imgUrl, imgId, userId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const defUrl = "/default-profile-picture.png"
    const isDefPic = imgUrl === defUrl;
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
                <FileUploader handleChange={(file) => setImage(file)} types={FILETYPES} minSize={0.01} maxSize={10} onSizeError={file=>alert("File cannot be larger than 10MB!")}/>
                {(imageLoading) && <Loader color={"#ff7b00"}/>}
                <button type="submit" className="black-button-square background-green">Update Picture</button>
                <button className="black-button-square background-red" onClick={(e) => handleSubmit(e, true)}>Delete Picture</button>
            </form>
        </div>
    )
}

export default UpdateProfilePictureModal;
