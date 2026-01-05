import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import shrirajlogo from "./../Images/shrirajlogo.png";
import "./Login.css";
import googleicon from "./../Images/googleicon.png";
import {Button} from "react-bootstrap";
const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  const isPhoneValid = phone.length === 10;

  return (
    <div className="shr-login-wrapper">
      <div className="shr-login-close">✕</div>

      <div className="shr-login-card">
        {/* Brand */}
        <div className="shr-login-brand-row">
          <img src={shrirajlogo} alt="Shriraj Logo" className="shr-login-logo" />
          <span className="shr-login-brand-name">Shriraj</span>
        </div>

        <h5 className="shr-login-title">Log in or Sign up</h5>

        {/* Phone input */}
        <div className="shr-login-phone-box">
          <div className="shr-login-country-code">
            🇮🇳 <span>+91</span>
          </div>
          <input
            type="tel"
            maxLength="10"
            value={phone}
            placeholder="Enter Phone"
            className="shr-login-phone-input"
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, ""))
            }
          />
        </div>

        {/* Email login */}
        <div
          className="shr-login-email-link"
          onClick={() => navigate("/loginwithemail")}
        >
          Login with email
        </div>

        {/* OTP button */}
        <button
          className={`shr-login-otp-btn ${
            isPhoneValid ? "shr-login-otp-active" : ""
          }`}
          disabled={!isPhoneValid}
        >
          Send OTP
        </button>

        {/* Divider */}
        <div className="shr-login-divider">
          <span className="shr-login-divider-line"></span>
          <p className="shr-login-divider-text">or sign in with</p>
          <span className="shr-login-divider-line"></span>
        </div>

        {/* Google */}
        <Button className="google-btn" variant="light">
              <img src={googleicon} alt="Google" className="google-icon" />
              <span>Sign in with Google</span>
            </Button>
      </div>
    </div>
  );
};

export default Login;
