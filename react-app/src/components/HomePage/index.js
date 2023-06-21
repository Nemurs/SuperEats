import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadAllBusinessesThunk } from "../../store/business";
import { useHistory } from "react-router-dom";
import BusinessCarousel from "../BusinessCarousel";
import CategoryButtonIndex from "../CategoryButtonIndex";
import Loader from "../Loader";
import "./HomePage.css";

const TILECOUNT = 4;

function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const businesses = useSelector(state => state?.business?.allBusinesses ? Object.values(state.business.allBusinesses) : null);

  useEffect(() => {
    dispatch(loadAllBusinessesThunk());
  }, [dispatch]);

  if (!businesses || businesses.length !== 12) return (<Loader />)

  let likedBusinesses = businesses.slice()
  likedBusinesses.sort((a,b)=> b.businessRating - a.businessRating)

  let popularBusinesses = businesses.slice()
  popularBusinesses.sort((a,b)=> Object.values(b.carts).length - Object.values(a.carts).length)

  const priceRedirect = (e, priceBucket) => {
    e.preventDefault()
    history.push('search', {priceBucket})
  }

  return (
    <>
      <div className="home-page-wrapper">
        <CategoryButtonIndex/>
        <div className="home-page-wrapper-bottom">
          <div className="home-page-wrapper-bottom-left">
            <h3>Sort</h3>
            <div>
              <h3>Price Range</h3>
              <div className="price-button-wrapper">
                <button className="gray-button-round small-padding" onClick={(e)=>priceRedirect(e, 1)}>$</button>
                <button className="gray-button-round small-padding" onClick={(e)=>priceRedirect(e, 2)}>$$</button>
                <button className="gray-button-round small-padding" onClick={(e)=>priceRedirect(e, 3)}>$$$</button>
                <button className="gray-button-round small-padding" onClick={(e)=>priceRedirect(e, 4)}>$$$$</button>
              </div>
            </div>
          </div>
          <div className="home-page-wrapper-bottom-right">
            <BusinessCarousel
              businesses={likedBusinesses.slice(0,8)}
              title={"Highly Rated"}
              tileCount={TILECOUNT}
              small={true}
            />
            <BusinessCarousel
              businesses={popularBusinesses.slice(0,8)}
              title={"Most Popular"}
              tileCount={TILECOUNT}
              small={true}
            />
            <BusinessCarousel
              businesses={businesses}
              title={"All Businesses"}
              tileCount={TILECOUNT}
              small={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
