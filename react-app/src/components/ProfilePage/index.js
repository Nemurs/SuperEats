import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import ProfilePicture from "../ProfilePicture";
import ConfirmDeleteAccountModal from "./ConfirmDeleteAccountModal";
import BusinessIndexItem from "../BusinessIndexItem";
import ItemIndexItem from "../ItemIndexItem";
import "./ProfilePage.css";

const ProfilePage = () => {
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const [favBus, setFavBus] = useState(null);
    const [favItem, setFavItem] = useState(null)

    useEffect(()=> {
        //fetch favorites from backend
        fetch(`/api/users/current/favorite_business`).then(
            response => response.ok ? response.json() : ["An error occurred. Please try again."]
        ).then(
            data => {
                setFavBus(()=>data.favoriteBusiness)
            }
        ).catch(console.error)

        fetch(`/api/users/current/favorite_item`).then(
            response => response.ok ? response.json() : ["An error occurred. Please try again."]
        ).then(
            data => {
                setFavItem(()=>data.favoriteItem)
            }
        ).catch(console.error)

    },[])

    const editAccount = (e) => {
        e.preventDefault();
        history.push("/signup", {isEdit: true})
        return;
    }

    if (!user) return (<h1>Loading...</h1>)

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
            <div className="account-stats-wrapper" >
                <h1>Your Stats</h1>
                {favBus ?
                (<>
                    <h3>Your Most Popular Business</h3>
                    <BusinessIndexItem business={favBus} imgUrl={favBus.imgUrl} />
                </>): (<></>)}
                {favItem ?
                (<>
                    <h3>Your Most Popular Item</h3>
                    <ItemIndexItem item={favItem} hoverable={true} orderable={false} imgUrl={favItem.imgUrl} />
                </>): (<></>)}
                <div className="basic-account-stats-wrapper">
                    <div className="basic-account-stats-orders">
                        <h3>Orders</h3>
                        <p>{user.userCarts.length}</p>
                    </div>
                    <div className="basic-account-stats-reviews">
                        <h3>Reviews</h3>
                        <p>{user.userReviews.length}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;
