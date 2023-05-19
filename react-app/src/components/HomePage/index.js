import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadAllBusinessesThunk } from "../../store/business";
import { useLocation } from "react-router-dom";
import BusinessIndex from "../BusinessIndex";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const businesses = useSelector(state =>  Object.values(state.business))

  useEffect(() => {
    if(location.pathname === "/home"){
      dispatch(loadAllBusinessesThunk());
    }
  }, [dispatch, location.pathname]);

  return (
    <div className="home-wrapper">
        <div className="home-text-wrapper">
            <h1 className="home-greeting-text">All Businesses</h1>
            <BusinessIndex businesses={businesses}/>
        </div>
    </div>
  );
}

export default HomePage;
