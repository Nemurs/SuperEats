import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadOneBusinessThunk } from "../../store/business";
import BusinessIndexItem from "../BusinessIndexItem";
import "./SingleBusinessPage.css";
import { useParams, useLocation } from "react-router-dom";

function SingleBusinessPage() {
    const dispatch = useDispatch();
    const { businessId } = useParams();
    const location = useLocation();
    const business = useSelector(state => Object.values(state.business)[0])

    useEffect(() => {
        if (location.pathname.startsWith("/business/") && businessId) {
            dispatch(loadOneBusinessThunk(businessId));
        }
    }, [dispatch, location.pathname, businessId]);

    if (!business || business.length > 1) return (<></>)

    console.log(business)

    return (
        <div className="SingleBusiness-wrapper">
            <div className="SingleBusiness-text-wrapper">
                <BusinessIndexItem
                    business={business}
                    interactive={false}
                />
                {/* <h1 className="SingleBusiness-greeting-text">Business #{businessId}</h1> */}
                {/* <BusinessIndex businesses={businesses}/> */}
            </div>
        </div>
    );
}

export default SingleBusinessPage;
