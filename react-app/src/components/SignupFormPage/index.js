import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

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

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(email, phoneNumber, firstName, lastName, address, city, state, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <div className="signup-form-wrapper">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1 className="signup-form-text">Sign Up</h1>
        {errors.length ? (<ul>
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
        <button type="submit" className="black-button-square">Continue</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
