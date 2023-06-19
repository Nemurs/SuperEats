import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import SingleBusinessPage from "./components/SingleBusinessPage";
import OrderPageTimer from "./components/OrderPageTimer";
import SearchIndex from "./components/SearchIndex";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className={location.pathname === "/" ? "site-wrapper splash-page" : "site-wrapper"}>
      <div className={location.pathname === "/" ? "nav-wrapper splash-page" : "nav-wrapper"}>
        <Navigation isLoaded={isLoaded} />
      </div>
      <div className="main-content-wrapper">
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <SplashPage />
            </Route>
            <Route exact path="/home">
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            </Route>
            <Route exact path="/profile">
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            </Route>
            <Route exact path="/login" >
              <LoginFormPage />
            </Route>
            <Route exact path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/orders">
              <ProtectedRoute>
                <OrderPageTimer />
              </ProtectedRoute>
            </Route>
            <Route exact path="/search">
              <ProtectedRoute>
                <SearchIndex />
              </ProtectedRoute>
            </Route>
            <Route path="/business/:businessId">
              <ProtectedRoute>
                <SingleBusinessPage />
              </ProtectedRoute>
            </Route>
          </Switch>
        )}
      </div>
    </div>
  );
}

export default App;
