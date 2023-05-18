import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadAllBusinessesThunk } from "../../store/business";
import BusinessIndex from "../BusinessIndex";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const businesses = useSelector(state =>  Object.values(state.business))

  useEffect(() => {
    dispatch(loadAllBusinessesThunk());
  }, [dispatch]);

  return (
    <div className="home-wrapper">
        <div className="home-text-wrapper">
            <h1 className="home-greeting-text">All Business</h1>
            <BusinessIndex businesses={businesses}/>
        </div>
    </div>
  );
}

export default HomePage;
