import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp, login } from "../../store/session";
import './SignupForm.css';
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import isLength from "validator/lib/isLength";
import isNumeric from "validator/lib/isNumeric";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const history = useHistory();
  const isEdit = history.location.state?.isEdit;
  if (sessionUser && !isEdit) return <Redirect to="/home" />;

  const checkErrors = (email, phoneNumber, state, password) => {
    const stateAbbreviations = [
      'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];
    let error_list = [];

    if (!isEmail(email)) {
      error_list.push("Please enter a valid email")
    }

    if (!isNumeric(phoneNumber, { no_symbols: true }) ||!isLength(phoneNumber, { min: 10, max: 10 }) || !isMobilePhone(phoneNumber, "en-US", { strictMode: false })) {
      error_list.push("Please enter a valid 10-digit US phone number (only numbers)")
    }

    if (!isLength(state, { min: 2, max: 2 }) || !stateAbbreviations.includes(state.toUpperCase())) {
      error_list.push("Please enter a valid 2 letter state abbreviation")
    }

    if (!isLength(password, { min: 4, max: 255 })) {
      error_list.push("Please enter a password with 4 or more characters")
    }

    return error_list;
  }

  const handleSubmit = async (e, demo = false) => {
    e.preventDefault();
    let data;
    if (demo) {
      data = await dispatch(login("demo@aa.io", "password"));
    }
    let err = checkErrors(email, phoneNumber, state, password);
    if (err.length){
      return setErrors(err)
    } else if (password === confirmPassword) {
      data = await dispatch(signUp(email, phoneNumber, firstName, lastName, address, city, state, password));
    } else {
      return setErrors(["Password and Confirm Password must match"])
    }

    if (data) {
      setErrors(data)
    }
  };

  return (
    <div className="signup-form-wrapper">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1 className="signup-form-text">Sign Up</h1>
        {errors.length ? (<ul className="errors-list">
          {errors.map((error, idx) => (
            <li key={idx} className="error-list-item">{error}</li>
          ))}
        </ul>) : <></>}
        <div className="firstName-lastName-fields">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
            required
            className="firstName-input"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
            required
            className="lastName-input"
          />
        </div>

        <label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter street address"
            required
          />
        </label>
        <div className="city-state-fields">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            required
            className="city-input"
          />
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Enter State"
            required
            className="state-input"
          />
        </div>
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
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter 10-digit phone number"
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
        <label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter password again"
            required
          />
        </label>
        <button type="submit" className="black-button-square background-green">Continue</button>
        <button className="black-button-square background-gold" onClick={(e) => handleSubmit(e, true)}>Log in as Demo User</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
