import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = async (e, demo=false) => {
    e.preventDefault();

    if (!isEmail(email)) return setErrors(prev => prev.includes("Please enter a valid email") ? prev : ["Please enter a valid email", ...prev ])
    else {
      setErrors(prev => prev.splice(prev.indexOf("Please enter a valid email"), 1))
    }

    if (!isLength(password, { min: 4, max: 255 })) return setErrors(prev => prev.includes("Please enter a valid password (min: 4 characters)") ? prev : ["Please enter a valid password (min: 4 characters)", ...prev ])
    else {
      setErrors(prev => prev.splice(prev.indexOf("Please enter a valid password (min: 4 characters)"), 1))
    }


    let data;
    if (demo) {
      data = await dispatch(login("demo@aa.io", "password"));
    } else {
      data = await dispatch(login(email, password));
    }
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className="login-form-wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="login-form-text">Login</h1>
        {errors.length ? (<ul className="errors-list">
          {errors.map((error, idx) => (
            <li key={idx} className="error-list-item">{error}</li>
          ))}
        </ul>) : <></>}
        <label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            required
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </label>
        <button type="submit" className="black-button-square">Continue</button>
        <button className="black-button-square" onClick={(e) => handleSubmit(e, true)}>Log in as Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormPage;
