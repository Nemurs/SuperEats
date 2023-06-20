import React, { useState } from "react";
import BusinessIndex from "../BusinessIndex";
import "./BusinessCarousel.css"

const BusinessCarousel = ({ businesses, title, tileCount }) => {
    const TILECOUNT = tileCount ? tileCount : 4;
    const [businessIndex, setBusinessIndex] = useState(0);

    if (!businesses || !title) return (<></>)

    const nextBusiness = () => {
        setBusinessIndex((prevIndex) => (prevIndex + TILECOUNT) % businesses.length);
    };

    const prevBusiness = () => {
        setBusinessIndex((prevIndex) => (prevIndex - TILECOUNT + businesses.length) % businesses.length);
    };

    return (
        <div className="carousel-wrapper">
            <div className="carousel-top-wrapper" >
                <div className="carousel-text-wrapper">
                    <h2 className="carousel-text">{title}</h2>
                </div>
                <div className="carousel-button-wrapper">
                    <button className="gray-button-round background-green" onClick={prevBusiness}>
                        <i className="fas fa-angle-left"></i>
                    </button>
                    <button className="gray-button-round background-green" onClick={nextBusiness}>
                        <i className="fas fa-angle-right"></i>
                    </button>
                </div>
            </div>
            <div className="carousel">
                <BusinessIndex businesses={businesses.slice(businessIndex, businessIndex + TILECOUNT)} />
            </div>
        </div>
    )

}

export default BusinessCarousel;
