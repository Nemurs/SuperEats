import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import BusinessIndexItem from "../BusinessIndexItem";
import ProfilePicture from "../ProfilePicture";
import ItemIndexItem from "../ItemIndexItem";
import Loader from "../Loader";
import "./AccountStats.css";

const AccountStats = () => {
    const user = useSelector(state => state.session.user);

    const [favBus, setFavBus] = useState(null);
    const [favItem, setFavItem] = useState(null)

    useEffect(()=> {
        //fetch favorites from backend
        fetch(`/api/users/current/favorite_business`).then(
            response => response.ok ? response.json() : ["An error occurred. Please try again."]
        ).then(
            data => {
                setFavBus(()=>data.favoriteBusiness)
            }).catch()

        fetch(`/api/users/current/favorite_item`).then(
            response => response.ok ? response.json() : ["An error occurred. Please try again."]
        ).then(
            data => {
                setFavItem(()=>data.favoriteItem)
            }).catch()

    },[])

    if (!user) return (<Loader/>)

    const pfp = user.images[0]?.preview ? user.images[0].url : process.env.PUBLIC_URL + "/default-profile-picture.png";
    const pfpId = user.images[0]?.id
    const userId = user.id;

    return (
        <div className="account-stats-wrapper" >
                <h1>About You</h1>
                <div className="account-stats">
                    <div className="basic-account-stats-wrapper">
                        <ProfilePicture imgUrl={pfp} imgId={pfpId} userId={userId}/>
                        <div className="basic-account-stats">
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
                    <div className="adv-account-stats">
                        <div className="adv-account-stats-popular-business">
                            <h3>Your Most Popular Business</h3>
                            {favBus && <BusinessIndexItem business={favBus} imgUrl={favBus.imgUrl} />}
                        </div>
                        <div className="adv-account-stats-popular-item">
                            <h3>Your Most Ordered Item</h3>
                            {favItem && <ItemIndexItem item={favItem} hoverable={true} orderable={false} imgUrl={favItem.imgUrl} />}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default AccountStats;
