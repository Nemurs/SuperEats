import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadAllBusinessesThunk } from "../../store/business";
import { useLocation } from "react-router-dom";
import BusinessIndex from "../BusinessIndex";
import Loader from "../Loader";
import "./HomePage.css";
import BusinessCarousel from "../BusinessCarousel";

function HomePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const businesses = useSelector(state => state?.business?.allBusinesses ? Object.values(state.business.allBusinesses) : null);

  useEffect(() => {
    dispatch(loadAllBusinessesThunk());
  }, [dispatch]);

  if (!businesses || businesses.length !== 12) return (<Loader />)

  return (
    <>
      <BusinessCarousel
        businesses={businesses}
        title={"All Businesses"}
        tileCount={3}
      />
      <BusinessCarousel
      businesses={businesses.filter(bus => bus.category === 'Chinese')}
      title={"Chinese"}
      tileCount={3}
    />
    </>

    // <div className="home-wrapper">
    //   <div className="home-text-wrapper">
    //     <h1 className="home-greeting-text">All Businesses</h1>
    //   </div>
    //   <div className="carousel">
    //     <button className="black-button-square" onClick={prevBusiness}>
    //       <i className="fas fa-angle-left"></i>
    //     </button>
    //     <BusinessIndex businesses={businesses.slice(businessIndex, businessIndex + 4)} />
    //     <button className="black-button-square" onClick={nextBusiness}>
    //       <i className="fas fa-angle-right"></i>
    //     </button>
    //   </div>
    // </div>
  );
}

export default HomePage;
