import { useSelector } from "react-redux";
import "./ProfilePage.css";


const ProfilePage = () => {
    const user = useSelector(state => state.session.user)

    return (
        <div className="profile-page-wrapper" >
            <h1 >Account Info</h1>
            <img src={process.env.PUBLIC_URL + "/default-profile-picture.png"} alt="default profile picture"/>
            <div className="basic-info-wrapper">
                <h3>Name</h3>
                <p>{`${user.firstName} ${user.lastName}`}</p>
                <h3>Phone Number</h3>
                <p>{`${user.phoneNumber}`}</p>
                <h3>Email</h3>
                <p>{`${user.email}`}</p>
            </div>
        </div>
    )
}

export default ProfilePage;
