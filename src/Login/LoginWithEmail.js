import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import "./Login.css";
import { baseurl } from "../BaseURL/BaseURL";

const LoginWithEmail = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email_or_phonenumber: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!formData.email_or_phonenumber || !formData.password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
   const response = await axios.post(
  `${baseurl}/login/`,
  formData
);

      // if (response.data && response.data.token) {
      //   // Store token
      //   localStorage.setItem("authToken", response.data.token);
        
      //   // Redirect based on user role or to dashboard
      //   navigate("/dashboard");
      // }
      
         if (response.data ) {
        // Store token
        localStorage.setItem("authToken", response.data);
        
        // Redirect based on user role or to dashboard
        navigate("/a-dashboard");
      }
      else {
        setError("Login failed. Please check credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message || 
        "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shr-login-wrapper">
      <div className="shr-login-close" onClick={() => navigate("/login")}>
        ✕
      </div>

      <div className="shr-login-card">
        <h5 className="shr-login-title">Login with Email</h5>

        {error && (
          <Alert variant="danger" className="shr-alert">
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <div className="shr-input-group">
            <input
              type="text"
              name="email_or_phonenumber"
              placeholder="Email or Phone Number"
              className="shr-login-input"
              value={formData.email_or_phonenumber}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="shr-input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="shr-login-input"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="shr-login-otp-btn shr-login-otp-active"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="shr-login-signup">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginWithEmail;