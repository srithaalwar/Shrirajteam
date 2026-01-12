import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import "./Login.css"; // We'll update this CSS file
import { baseurl } from "../../BaseURL/BaseURL";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from '../../Images/shrirajlogo.png'
const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [spinnerTarget, setSpinnerTarget] = useState("");

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
    setError("");
    setEmailError("");
    setMobileError("");
    setEmail("");
    setPassword("");
    setMobile("");
  };

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleForgotEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) setEmailError("Email is required");
    else if (!emailRegex.test(value)) setEmailError("Enter a valid email address");
    else setEmailError("");
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!value) {
      setEmailError("Email or Mobile Number is required");
    } else if (!emailRegex.test(value) && !mobileRegex.test(value)) {
      setEmailError("Enter a valid Email or Mobile Number");
    } else {
      setEmailError("");
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobile(value);
    const mobileRegex = /^[0-9]{10}$/;
    if (!value) setMobileError("Mobile number is required");
    else if (!mobileRegex.test(value)) setMobileError("Enter a valid 10-digit mobile number");
    else setMobileError("");
  };

  const handleNormalLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSpinnerTarget("login");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!email) {
      setEmailError("Email or Mobile Number is required");
      setSpinnerTarget("");
      return;
    } else if (!emailRegex.test(email) && !mobileRegex.test(email)) {
      setEmailError("Enter a valid Email or Mobile Number");
      setSpinnerTarget("");
      return;
    } else {
      setEmailError("");
    }

    if (!password) {
      setError("Password is required");
      setSpinnerTarget("");
      return;
    }

    try {
      const response = await fetch(`${baseurl}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email_or_phonenumber: email,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("email", data.email);
        localStorage.setItem("username", data.username);
        localStorage.setItem("phone_number", data.phone_number);
        localStorage.setItem("referral_id", data.referral_id);
        localStorage.setItem("referred_by", data.referred_by);
        localStorage.setItem("user_name", data.first_name);

        const userRoles = data.roles || [];
        if (userRoles.length > 1) {
          selectUserRole(userRoles);
        } else if (userRoles.length === 1) {
          navigateToDashboard(userRoles[0]);
        } else {
          setError("No roles assigned. Please contact support.");
        }
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSpinnerTarget("");
    }
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSpinnerTarget("login");
    
    if (!mobile) {
      setMobileError("Mobile number is required");
      setSpinnerTarget("");
      return;
    } else if (mobileError) {
      setSpinnerTarget("");
      return;
    }

    try {
      const response = await fetch(`${baseurl}/login1/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: mobile }),
      });

      const data = await response.json();
      if (response.ok) {   
        Swal.fire("Success", "OTP sent to your registered mobile number", "success");
        navigate("/verify-otp");
      } else {
        setError(data.error || "Invalid mobile number");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSpinnerTarget("");
    }
  };

  const selectUserRole = async (roles) => {
    const { value: selectedRole } = await Swal.fire({
      title: "Select Your Role",
      input: "select",
      inputOptions: roles.reduce((acc, role) => ({ ...acc, [role]: role }), {}),
      inputPlaceholder: "Choose your role",
      showCancelButton: true,
      confirmButtonText: "Proceed",
      cancelButtonText: "Cancel",
    });
    if (selectedRole) navigateToDashboard(selectedRole);
  };

  const navigateToDashboard = (role) => {
    if (role === "Admin") navigate("/a-dashboard");
    else if (role === "Agent") navigate("/agent-dashboard");
    else if (role === "Client") navigate("/Client-dashboard");
    else if (role === "Super Admin") navigate("/s-dashboard");
    else setError("Invalid role assigned. Please contact support.");
  };

  const handleSendOTP = async () => {
    if (!email || emailError) {
      setEmailError("Enter a valid email address");
      return;
    }
    setSpinnerTarget("forgot");
    try {
      const response = await fetch(`${baseurl}/send-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        Swal.fire("Success", "OTP sent successfully. Check your email.", "success");
        setShowForgotPassword(false);
        setShowResetPassword(true);
      } else {
        Swal.fire("Error", data.error || "Failed to send OTP", "error");
      }
    } catch {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    } finally {
      setSpinnerTarget("");
    }
  };

  const handleResetPassword = async () => {
    if (!otp || !newPassword) {
      Swal.fire("Error", "OTP and New Password are required", "error");
      return;
    }
    try {
      const response = await fetch(`${baseurl}/verify-otp-reset-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, new_password: newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        Swal.fire("Success", "Password reset successfully.", "success").then(() =>
          setShowResetPassword(false)
        );
      } else {
        Swal.fire("Error", data.error || "Failed to reset password", "error");
      }
    } catch {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-form-container">
            {showForgotPassword ? (
              <div className="forgot-password-form">
<div className="login-heading">
  <img src={logo} alt="Logo" className="login-logo" />
  <h3 className="mb-0">Forgot Password</h3>
</div>                
                {emailError && (
                  <div className="alert alert-danger py-1 mb-2" role="alert">
                    <small>{emailError}</small>
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="forgotEmail" className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${emailError ? 'is-invalid' : ''}`}
                    id="forgotEmail"
                    value={email}
                    onChange={handleForgotEmailChange}
                  />
                </div>

                <div className="d-grid gap-2 d-md-flex mt-4">
                  <button
                    className="btn btn-outline-primary flex-fill me-md-2"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setEmail("");
                      setEmailError("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-success flex-fill"
                    onClick={handleSendOTP}
                    disabled={spinnerTarget === "forgot"}
                  >
                    {spinnerTarget === "forgot" ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending...
                      </>
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                </div>
              </div>
            ) : showResetPassword ? (
              <div className="reset-password-form">
<div className="login-heading">
  <img src={logo} alt="Logo" className="login-logo" />
  <h3 className="mb-0">Reset Password</h3>
</div>                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">OTP</label>
                  <input
                    type="text"
                    className="form-control"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-success w-100 mt-3"
                  onClick={handleResetPassword}
                >
                  Reset Password
                </button>
              </div>
            ) : (
              <div className="login-form">
<div className="login-heading">
  <img src={logo} alt="Logo" className="login-logo" />
  {/* <h3 className="mb-0">Login</h3> */}
</div>

                <ul className="nav nav-tabs mb-4 justify-content-center">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 0 ? 'active' : ''}`}
                      onClick={() => handleTabChange(0)}
                    >
                      Normal Login
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 1 ? 'active' : ''}`}
                      onClick={() => handleTabChange(1)}
                    >
                      OTP Login
                    </button>
                  </li>
                </ul>

                {activeTab === 0 ? (
                  <form onSubmit={handleNormalLogin}>
                    {emailError && (
                      <div className="alert alert-danger py-1 mb-2" role="alert">
                        <small>{emailError}</small>
                      </div>
                    )}

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email/Mobile Number</label>
                      <input
                        type="text"
                        className={`form-control ${emailError ? 'is-invalid' : ''}`}
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`form-control ${!password && error === "Password is required" ? 'is-invalid' : ''}`}
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={handleTogglePassword}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {!password && error === "Password is required" && (
                        <div className="invalid-feedback d-block">
                          Password is required
                        </div>
                      )}
                    </div>

                    <div className="mb-3 text-center">
                      <small className="me-2">Forgot Password?</small>
                      <button
                        type="button"
                        className="btn btn-link p-0"
                        onClick={() => {
                          setSpinnerTarget("forgot");
                          setShowForgotPassword(true);
                          setTimeout(() => setSpinnerTarget(""), 500);
                        }}
                      >
                        {spinnerTarget === "forgot" && (
                          <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                        )}
                        Reset Here
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 login-btn"
                      disabled={spinnerTarget === "login"}
                    >
                      {spinnerTarget === "login" ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Logging In...
                        </>
                      ) : (
                        "Login"
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleOtpLogin}>
                    {mobileError && (
                      <div className="alert alert-danger py-1 mb-2" role="alert">
                        <small>{mobileError}</small>
                      </div>
                    )}

                    <div className="mb-3">
                      <label htmlFor="mobile" className="form-label">Mobile Number</label>
                      <input
                        type="tel"
                        className={`form-control ${mobileError ? 'is-invalid' : ''}`}
                        id="mobile"
                        value={mobile}
                        onChange={handleMobileChange}
                        maxLength="10"
                        placeholder="Enter 10-digit mobile number"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 login-btn"
                      disabled={spinnerTarget === "login"}
                    >
                      {spinnerTarget === "login" ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Sending OTP...
                        </>
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  </form>
                )}

                <div className="text-center mt-4">
                  <small className="me-2">Don't have an account?</small>
                  <RouterLink
                    to="/register"
                    className="btn btn-link p-0"
                    onClick={() => {
                      setSpinnerTarget("register");
                      setTimeout(() => setSpinnerTarget(""), 1000);
                    }}
                  >
                    {spinnerTarget === "register" && (
                      <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    )}
                    Register Here
                  </RouterLink>
                </div>

                {error && (
                  <div className="alert alert-danger mt-3 py-2" role="alert">
                    <small>{error}</small>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* <div className="login-footer text-center mt-4">
          <small className="text-white opacity-75">
            © {new Date().getFullYear()} SHRIRAJ. All rights reserved. <br />
            <RouterLink to="/termsandconditions" className="text-white text-decoration-underline mx-2">
              Terms & Conditions
            </RouterLink>
            |
            <RouterLink to="/privacypolicy" className="text-white text-decoration-underline mx-2">
              Privacy Policy
            </RouterLink>
            |
            <RouterLink to="/refundpolicy" className="text-white text-decoration-underline mx-2">
              Refund Policy
            </RouterLink>
          </small>
        </div> */}
      </div>
    </div>
  );
};

export default Login;