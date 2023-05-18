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

    const items = business.items;
    console.log(items)

    return (
        <div className="SingleBusiness-wrapper">
            <BusinessIndexItem
                business={business}
                interactive={false}
            />
            <h2>
                Items
            </h2>

        </div>
    );
}

export default SingleBusinessPage;
