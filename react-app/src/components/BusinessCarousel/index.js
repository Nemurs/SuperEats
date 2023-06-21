import React, { useState } from "react";
import BusinessIndex from "../BusinessIndex";
import "./BusinessCarousel.css"

const BusinessCarousel = ({ businesses, title, tileCount, small }) => {
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
                    <button className="black-button-round background-gold" onClick={prevBusiness}>
                        <i className="fas fa-angle-left"></i>
                    </button>
                    <button className="black-button-round background-green" onClick={nextBusiness}>
                        <i className="fas fa-angle-right"></i>
                    </button>
                </div>
            </div>
            <div className="carousel">
                <BusinessIndex businesses={businesses.slice(businessIndex, businessIndex + TILECOUNT)} small={small} />
            </div>
        </div>
    )

}

export default BusinessCarousel;
