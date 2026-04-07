import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";
import axios from "axios";
// import "./Login.css";
import { baseurl } from "../BaseURL/BaseURL";
import Swal from "sweetalert2";

const RegisterVerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Get phone number from location state or localStorage
  const phoneNumber = location.state?.phoneNumber || localStorage.getItem("temp_phone_number") || "";

  useEffect(() => {
    // Start countdown timer
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    // Focus on first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
      
      // Auto-submit when all digits are filled
      if (index === 5 && value) {
        const completeOtp = [...newOtp];
        if (completeOtp.every(digit => digit !== "")) {
          setTimeout(() => {
            handleVerifyOTP();
          }, 100);
        }
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    
    if (e.key === "Enter" && otp.join("").length === 6) {
      handleVerifyOTP();
    }
  };

  // Function to sync cart after successful registration
  const syncCartAfterRegistration = async (userId) => {
    try {
      const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
      
      if (guestCart.length > 0) {
        const cartPayload = guestCart.map(item => ({
          user: parseInt(userId),
          variant: item.variant_id,
          quantity: item.quantity
        }));

        console.log("Syncing cart after registration:", cartPayload);

        const response = await fetch(`${baseurl}/cart/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartPayload)
        });

        if (response.ok) {
          localStorage.removeItem("website_guest_cart");
          console.log("Cart synced successfully after registration");
          return true;
        } else {
          console.error("Failed to sync cart with backend");
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error("Error syncing cart after registration:", error);
      return false;
    }
  };

  // Function to navigate user based on role
  const navigateToDashboard = (role, userData) => {
    // Store user data in localStorage
    if (userData) {
      localStorage.setItem("user_id", userData.user_id?.toString() || "");
      localStorage.setItem("email", userData.email || "");
      localStorage.setItem("phone_number", userData.phone_number || "");
      localStorage.setItem("referral_id", userData.referral_id || "");
      localStorage.setItem("referred_by", userData.referred_by || "");
      localStorage.setItem("first_name", userData.first_name || "");
      localStorage.setItem("last_name", userData.last_name || "");
      localStorage.setItem("user_name", `${userData.first_name || ""} ${userData.last_name || ""}`.trim());
      
      // Store role information
      if (userData.roles && userData.roles.length > 0) {
        const roleNames = userData.roles.map(r => r.role_name);
        localStorage.setItem("userRoles", JSON.stringify(roleNames));
        localStorage.setItem("user_role", roleNames[0]);
      }
    }

    // Check if redirected from cart
    const redirectedFromCart = localStorage.getItem('redirect_from_cart') === 'true';
    const hasCartItems = JSON.parse(localStorage.getItem("website_guest_cart") || "[]").length > 0;
    
    // Clear redirect flag
    localStorage.removeItem('redirect_from_cart');

    // Navigate based on role
    if (role === "Admin" || role === "Super Admin") {
      navigate("/admin-dashboard", { replace: true });
    } else if (role === "Agent") {
      if (redirectedFromCart && hasCartItems) {
        navigate("/agent-add-to-cart", { replace: true });
      } else {
        navigate("/agent-dashboard", { replace: true });
      }
    } else if (role === "Client") {
      if (redirectedFromCart && hasCartItems) {
        navigate("/client-add-to-cart", { replace: true });
      } else {
        navigate("/Client-dashboard", { replace: true });
      }
    } else {
      navigate("/", { replace: true });
    }
  };

  // Function to handle role selection for multi-role users
  const selectUserRole = async (roles, userData) => {
    const roleOptions = {};
    roles.forEach(role => {
      roleOptions[role.role_name] = role.role_name;
    });
    
    const { value: selectedRole } = await Swal.fire({
      title: "Select Your Role",
      text: "You have multiple roles. Please select one to continue.",
      input: "select",
      inputOptions: roleOptions,
      inputPlaceholder: "Choose your role",
      showCancelButton: true,
      confirmButtonText: "Proceed",
      cancelButtonText: "Cancel",
    });
    
    if (selectedRole) {
      navigateToDashboard(selectedRole, userData);
    } else {
      navigate("/login");
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Verifying OTP for phone number:", phoneNumber);
      console.log("OTP:", otpString);
      
      // Step 2: Verify OTP - POST to /users/ with phone_number and otp
      const response = await axios.post(
        `${baseurl}/users/`,
        {
          phone_number: phoneNumber,
          otp: otpString
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("OTP Verification Response:", response.data);

      // Check if verification was successful
      if (response.data && response.data.user_id) {
        const userData = response.data;
        
        // Clear temporary data
        localStorage.removeItem("temp_phone_number");
        localStorage.removeItem("temp_user_data");
        
        // Sync cart if there are items
        if (userData.user_id) {
          await syncCartAfterRegistration(userData.user_id);
        }
        
        // Show success message
        await Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "Your account has been successfully created.",
          confirmButtonColor: "#3085d6",
          timer: 2000,
          showConfirmButton: false
        });
        
        // Handle user roles from response
        const userRoles = userData.roles || [];
        
        if (userRoles.length > 1) {
          // Multiple roles - show selection dialog
          selectUserRole(userRoles, userData);
        } else if (userRoles.length === 1) {
          // Single role - navigate directly
          navigateToDashboard(userRoles[0].role_name, userData);
        } else {
          // No roles in response, try to determine from referral_id
          const referralId = userData.referral_id || "";
          if (referralId.toUpperCase().startsWith("SRP")) {
            navigateToDashboard("Agent", userData);
          } else if (referralId.toUpperCase().startsWith("SRT")) {
            navigateToDashboard("Client", userData);
          } else {
            navigate("/", { replace: true });
          }
        }
      } else {
        setError(response.data.message || "Invalid OTP or verification failed");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      
      if (error.response) {
        const errorData = error.response.data;
        setError(
          errorData.message || 
          errorData.error || 
          `Verification failed. Please try again.`
        );
        
        // If OTP is invalid, clear OTP inputs
        if (errorData.message === "Invalid OTP" || errorData.message?.includes("Invalid")) {
          setOtp(["", "", "", "", "", ""]);
          if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
          }
        }
      } else if (error.request) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!phoneNumber || !canResend) return;

    setLoading(true);
    setError("");

    try {
      // Get the temporary user data for resend
      const tempUserData = JSON.parse(localStorage.getItem("temp_user_data") || "{}");
      
      // Resend OTP by making the registration request again
      const response = await axios.post(
        `${baseurl}/users/`,
        {
          first_name: tempUserData.first_name || "temp",
          last_name: tempUserData.last_name || "temp",
          email: tempUserData.email || "",
          phone_number: phoneNumber,
          password: "temp123", // Temporary password
          role_ids: tempUserData.role_ids || [1]
        }
      );

      console.log("Resend OTP Response:", response.data);

      if (response.data && response.data.message === "OTP sent successfully") {
        setTimer(30);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
        setError("");
        
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
        
        Swal.fire({
          icon: "success",
          title: "OTP Resent",
          text: "A new OTP has been sent to your mobile number",
          confirmButtonColor: "#3085d6",
          timer: 2000
        });
      } else {
        setError(response.data?.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shr-login-wrapper">
      <div className="shr-login-close" onClick={() => navigate("/register")}>
        ✕
      </div>

      <div className="shr-login-card">
        <h5 className="shr-login-title">Verify OTP</h5>
        <p className="shr-login-subtitle">
          Enter OTP sent to +91 {phoneNumber}
        </p>

        {error && (
          <Alert variant="danger" className="shr-alert">
            {error}
          </Alert>
        )}

        <div className="shr-otp-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              className="shr-otp-input"
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={loading}
            />
          ))}
        </div>

        <button
          className="shr-login-otp-btn shr-login-otp-active"
          onClick={handleVerifyOTP}
          disabled={loading || otp.join("").length !== 6}
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
              Verifying...
            </>
          ) : (
            "Verify OTP"
          )}
        </button>

        <div className="shr-resend-otp">
          {canResend ? (
            <button 
              onClick={handleResendOTP} 
              className="shr-resend-link btn btn-link p-0"
              disabled={loading}
            >
              Resend OTP
            </button>
          ) : (
            <span className="shr-timer">
              Resend OTP in {timer}s
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterVerifyOTP;