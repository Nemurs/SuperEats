import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadAllBusinessesThunk } from "../../store/business";
import { useLocation } from "react-router-dom";
import BusinessIndex from "../BusinessIndex";
import Loader from "../Loader";
import "./HomePage.css";
import BusinessCarousel from "../BusinessCarousel";

const TILECOUNT = 4;

function HomePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const businesses = useSelector(state => state?.business?.allBusinesses ? Object.values(state.business.allBusinesses) : null);

  useEffect(() => {
    dispatch(loadAllBusinessesThunk());
  }, [dispatch]);

  if (!businesses || businesses.length !== 12) return (<Loader />)

  let likedBusinesses = businesses.slice()
  likedBusinesses.sort((a,b)=> b.businessRating - a.businessRating)

  let popularBusinesses = businesses.slice()
  popularBusinesses.sort((a,b)=> Object.values(b.carts).length - Object.values(a.carts).length)

  return (
    <>
      <BusinessCarousel
        businesses={likedBusinesses.slice(0,8)}
        title={"Highly Rated"}
        tileCount={TILECOUNT}
      />
      <BusinessCarousel
        businesses={popularBusinesses.slice(0,8)}
        title={"Most Popular"}
        tileCount={TILECOUNT}
      />
      <BusinessCarousel
        businesses={businesses}
        title={"All Businesses"}
        tileCount={TILECOUNT}
      />
    </>
  );
}

export default HomePage;
