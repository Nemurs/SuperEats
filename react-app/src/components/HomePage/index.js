import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadAllBusinessesThunk } from "../../store/business";
import { useLocation } from "react-router-dom";
import BusinessIndex from "../BusinessIndex";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const businesses = useSelector(state => state?.business?.allBusinesses ? Object.values(state.business.allBusinesses) : null)

  useEffect(() => {
    if(!businesses || !businesses.length){
      dispatch(loadAllBusinessesThunk());
    }
  }, [dispatch, businesses]);



  if (!businesses || !businesses.length) return (<></>)

  return (
    <div className="home-wrapper">
        <div className="home-text-wrapper">
            <h1 className="home-greeting-text">All Businesses</h1>
            { businesses ? (<BusinessIndex businesses={businesses}/>): (<h1>Loading...</h1>)}
        </div>
    </div>
  );
}

export default HomePage;
