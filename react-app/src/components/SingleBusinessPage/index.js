import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadOneBusinessThunk } from "../../store/business";
import BusinessIndexItem from "../BusinessIndexItem";
import ItemIndex from "../ItemIndex";
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
    let categorized_items = {};
    for (let item of items) {
        if (!(item.category in categorized_items)) {
            categorized_items[item.category] = [item]
        } else {
            categorized_items[item.category].push(item)
        }
    }
    const categories = Object.keys(categorized_items);

    console.log(categorized_items)

    return (
        <div className="SingleBusiness-wrapper">
            <BusinessIndexItem
                business={business}
                interactive={false}
            />
            <div className="SingleBusiness-bottom-wrapper">
                <div className="SingleBusiness-bottom-left-wrapper">
                    {categories.map((category)=> (
                        <p key={category + String(businessId)+'label'}>{category}</p>
                    ))}
                </div>
                <div className="SingleBusiness-bottom-right-wrapper">
                    <h2>
                        Items
                    </h2>
                    {categories.map((category) => (
                        <div key={category + String(businessId)} className='category-wrapper'>
                            <h3 className="">{category}</h3>
                            <ItemIndex
                                items={categorized_items[category]}
                            />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default SingleBusinessPage;