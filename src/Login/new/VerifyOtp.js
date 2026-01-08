import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import "./VerifyOTP.css"; // We'll update this CSS file
import { baseurl } from "../BaseURL/BaseURL";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [spinnerTarget, setSpinnerTarget] = useState("");

  const navigateToDashboard = (role) => {
    if (role === "Admin") navigate("/a-asset");
    else if (role === "Agent") navigate("/p-assets");
    else if (role === "Client") navigate("/i-asset");
    else if (role === "Super Admin") navigate("/s-dashboard");
    else setError("Invalid role assigned. Please contact support.");
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSpinnerTarget("verify");
    
    if (!otp) {
      setError("OTP is required");
      setSpinnerTarget("");
      return;
    }

    try {
      const response = await fetch(`${baseurl}/verify-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: otp }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("email", data.email);
        localStorage.setItem("username", data.username);
        localStorage.setItem("phone_number", data.phone_number);
        localStorage.setItem("referral_id", data.referral_id);
        localStorage.setItem("referred_by", data.referred_by);
        localStorage.setItem("user_name", data.first_name);
        localStorage.setItem("roles", JSON.stringify(data.roles));

        const userRoles = data.roles || [];
        
        if (userRoles.length > 1) {
          // If multiple roles, let user select
          const { value: selectedRole } = await Swal.fire({
            title: "Select Your Role",
            input: "select",
            inputOptions: userRoles.reduce((acc, role) => ({ ...acc, [role]: role }), {}),
            inputPlaceholder: "Choose your role",
            showCancelButton: true,
            confirmButtonText: "Proceed",
            cancelButtonText: "Cancel",
          });
          
          if (selectedRole) {
            navigateToDashboard(selectedRole);
          }
        } else if (userRoles.length === 1) {
          navigateToDashboard(userRoles[0]);
        } else {
          setError("No roles assigned. Please contact support.");
        }
      } else {
        setError(data.error || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSpinnerTarget("");
    }
  };

  return (
    <div className="verify-otp-container">
      <div className="verify-otp-wrapper">
        <div className="verify-otp-card">
          <div className="verify-otp-form-container">
            <h3 className="text-center mb-3">Verify OTP</h3>

            <p className="text-center text-muted mb-4">
              Enter the OTP sent to your registered mobile number
            </p>

            <form onSubmit={handleVerifyOTP}>
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">OTP</label>
                <input
                  type="text"
                  className={`form-control ${error && error.includes("OTP") ? 'is-invalid' : ''}`}
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength="6"
                  placeholder="Enter 6-digit OTP"
                />
              </div>

              {error && (
                <div className={`alert ${error.includes("Invalid OTP") || error.includes("OTP is required") ? 'alert-danger' : 'alert-warning'} py-2 mb-3`} role="alert">
                  <small>{error}</small>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100 verify-otp-btn"
                disabled={spinnerTarget === "verify"}
              >
                {spinnerTarget === "verify" ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </button>

              <div className="text-center mt-4">
                <small className="me-2">Back to</small>
                <RouterLink to="/login" className="btn btn-link p-0">
                  Login
                </RouterLink>
              </div>
            </form>
          </div>
        </div>

        <div className="verify-otp-footer text-center mt-4">
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
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;