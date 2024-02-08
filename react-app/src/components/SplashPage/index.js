import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./SplashPage.css";

function SplashPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) return <Redirect to="/home" />;

  const handleClick = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"))
  }

  return (
    <div className="splash-wrapper">
        <div className="splash-text-wrapper">
            <h1 className="splash-greeting-text">Order food to your door</h1>
            <button className="white-button-round background-gold" onClick={handleClick}>
              Try for free!
            </button>
        </div>
    </div>
  );
}

export default SplashPage;
