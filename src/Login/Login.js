// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import shrirajlogo from "./../Images/shrirajlogo.png";
// import "./Login.css";
// import googleicon from "./../Images/googleicon.png";
// import {Button} from "react-bootstrap";
// const Login = () => {
//   const navigate = useNavigate();
//   const [phone, setPhone] = useState("");

//   const isPhoneValid = phone.length === 10;

//   return (
//     <div className="shr-login-wrapper">
//       <div className="shr-login-close">✕</div>

//       <div className="shr-login-card">
//         {/* Brand */}
//         <div className="shr-login-brand-row">
//           <img src={shrirajlogo} alt="Shriraj Logo" className="shr-login-logo" />
//           <span className="shr-login-brand-name">Shriraj</span>
//         </div>

//         <h5 className="shr-login-title">Log in or Sign up</h5>

//         {/* Phone input */}
//         <div className="shr-login-phone-box">
//           <div className="shr-login-country-code">
//             🇮🇳 <span>+91</span>
//           </div>
//           <input
//             type="tel"
//             maxLength="10"
//             value={phone}
//             placeholder="Enter Phone"
//             className="shr-login-phone-input"
//             onChange={(e) =>
//               setPhone(e.target.value.replace(/\D/g, ""))
//             }
//           />
//         </div>

//         {/* Email login */}
//         <div
//           className="shr-login-email-link"
//           onClick={() => navigate("/loginwithemail")}
//         >
//           Login with email
//         </div>

//         {/* OTP button */}
//         <button
//           className={`shr-login-otp-btn ${
//             isPhoneValid ? "shr-login-otp-active" : ""
//           }`}
//           disabled={!isPhoneValid}
//         >
//           Send OTP
//         </button>

//         {/* Divider */}
//         <div className="shr-login-divider">
//           <span className="shr-login-divider-line"></span>
//           <p className="shr-login-divider-text">or sign in with</p>
//           <span className="shr-login-divider-line"></span>
//         </div>

//         {/* Google */}
//         <Button className="google-btn" variant="light">
//               <img src={googleicon} alt="Google" className="google-icon" />
//               <span>Sign in with Google</span>
//             </Button>
//       </div>
//     </div>
//   );
// };

// export default Login;




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import shrirajlogo from "./../Images/shrirajlogo.png";
// import "./Login.css";
// import googleicon from "./../Images/googleicon.png";
// import { Button, Alert, Spinner } from "react-bootstrap";
// import axios from "axios";

// const Login = () => {
//   const navigate = useNavigate();
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const isPhoneValid = phone.length === 10;

//   const handleClose = () => {
//     navigate("/");
//   };

//   const handleSendOTP = async () => {
//     if (!isPhoneValid) return;

//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const response = await axios.post(
//         "https://shrirajteam.com:81/login1/",
//         {
//           phone_number: phone
//         },
//         {
//           headers: {
//             "Content-Type": "application/json"
//           }
//         }
//       );

//       if (response.data && response.data.message === "OTP sent successfully") {
//         setSuccess("OTP sent successfully!");
//         // Navigate to OTP verification page
//         navigate("/verify-otp", { state: { phoneNumber: phone } });
//       } else {
//         setError(response.data?.message || "Failed to send OTP");
//       }
//     } catch (error) {
//       console.error("OTP sending error:", error);
//       setError(
//         error.response?.data?.message || 
//         "Network error. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = () => {
//     // For now, redirect to email login
//     navigate("/loginwithemail");
//   };

//   return (
//     <div className="shr-login-wrapper">
//       <div className="shr-login-close" onClick={handleClose}>
//         ✕
//       </div>

//       <div className="shr-login-card">
//         {/* Brand */}
//         <div className="shr-login-brand-row">
//           <img src={shrirajlogo} alt="Shriraj Logo" className="shr-login-logo" />
//           <span className="shr-login-brand-name">Shriraj</span>
//         </div>

//         <h5 className="shr-login-title">Log in or Sign up</h5>

//         {/* Error/Success Messages */}
//         {error && (
//           <Alert variant="danger" className="shr-alert">
//             {error}
//           </Alert>
//         )}
//         {success && (
//           <Alert variant="success" className="shr-alert">
//             {success}
//           </Alert>
//         )}

//         {/* Phone input */}
//         <div className="shr-login-phone-box">
//           <div className="shr-login-country-code">
//             🇮🇳 <span>+91</span>
//           </div>
//           <input
//             type="tel"
//             maxLength="10"
//             value={phone}
//             placeholder="Enter Phone Number"
//             className="shr-login-phone-input"
//             onChange={(e) => {
//               const value = e.target.value.replace(/\D/g, "").slice(0, 10);
//               setPhone(value);
//               setError("");
//             }}
//             disabled={loading}
//           />
//         </div>

//         {/* Email login */}
//         <div
//           className="shr-login-email-link"
//           onClick={() => !loading && navigate("/loginwithemail")}
//         >
//           Login with email
//         </div>

//         {/* Forgot Password */}
//         <div
//           className="shr-login-forgot-link"
//           onClick={() => !loading && navigate("/forgotpassword")}
//         >
//           Forgot Password?
//         </div>

//         {/* OTP button */}
//         <button
//           className={`shr-login-otp-btn ${
//             isPhoneValid ? "shr-login-otp-active" : ""
//           }`}
//           disabled={!isPhoneValid || loading}
//           onClick={handleSendOTP}
//         >
//           {loading ? (
//             <>
//               <Spinner
//                 as="span"
//                 animation="border"
//                 size="sm"
//                 role="status"
//                 aria-hidden="true"
//                 className="me-2"
//               />
//               Sending OTP...
//             </>
//           ) : (
//             "Send OTP"
//           )}
//         </button>

//         {/* Divider */}
//         <div className="shr-login-divider">
//           <span className="shr-login-divider-line"></span>
//           <p className="shr-login-divider-text">or sign in with</p>
//           <span className="shr-login-divider-line"></span>
//         </div>

//         {/* Google */}
//         <Button 
//           className="google-btn" 
//           variant="light"
//           onClick={handleGoogleLogin}
//           disabled={loading}
//         >
//           <img src={googleicon} alt="Google" className="google-icon" />
//           <span>Sign in with Google</span>
//         </Button>

//         {/* Sign up link */}
//         <div className="shr-login-signup">
//           Don't have an account?{" "}
//           <span onClick={() => !loading && navigate("/register")}>
//             Sign up
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import shrirajlogo from "./../Images/shrirajlogo.png";
import "./Login.css";
import googleicon from "./../Images/googleicon.png";
import { Button, Alert, Spinner, Modal } from "react-bootstrap";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastDigits, setLastDigits] = useState("");

  const isPhoneValid = phone.length === 10;

  const handleClose = () => {
    navigate("/");
  };

  const handleSendOTP = async () => {
    if (!isPhoneValid) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "https://shrirajteam.com:81/login1/",
        {
          phone_number: phone
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("OTP Response:", response.data); // Debug log

      // Check for success message in different possible formats
      const responseData = response.data;
      
      // Check if OTP was sent successfully
      if (
        responseData.message && 
        responseData.message.includes("OTP sent successfully") ||
        responseData.message.includes("sent successfully")
      ) {
        // Extract last 4 digits of phone number for display
        const last4Digits = phone.slice(-4);
        setLastDigits(last4Digits);
        
        // Show success message in modal
        setShowSuccessModal(true);
        setSuccess("OTP sent successfully!");
        
        // Automatically navigate to OTP verification after 2 seconds
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate("/verify-otp", { 
            state: { 
              phoneNumber: phone,
              lastDigits: last4Digits
            } 
          });
        }, 2000);
        
      } else {
        setError(responseData?.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP sending error:", error);
      
      // Handle different error response formats
      if (error.response) {
        // Server responded with error status
        const errorData = error.response.data;
        setError(
          errorData?.message || 
          errorData?.detail || 
          errorData?.error || 
          `Error: ${error.response.status}`
        );
      } else if (error.request) {
        // Request was made but no response
        setError("Network error. Please check your connection.");
      } else {
        // Something else happened
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    navigate("/loginwithemail");
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // Navigate immediately when modal is closed
    navigate("/verify-otp", { 
      state: { 
        phoneNumber: phone,
        lastDigits: phone.slice(-4)
      } 
    });
  };

  return (
    <>
      <div className="shr-login-wrapper">
        <div className="shr-login-close" onClick={handleClose}>
          ✕
        </div>

        <div className="shr-login-card">
          {/* Brand */}
          <div className="shr-login-brand-row">
            <img src={shrirajlogo} alt="Shriraj Logo" className="shr-login-logo" />
            <span className="shr-login-brand-name">Shriraj</span>
          </div>

          <h5 className="shr-login-title">Log in or Sign up</h5>

          {/* Error Message */}
          {error && (
            <Alert variant="danger" className="shr-alert">
              {error}
            </Alert>
          )}

          {/* Success Message (only shown briefly before redirect) */}
          {success && !showSuccessModal && (
            <Alert variant="success" className="shr-alert">
              {success}
            </Alert>
          )}

          {/* Phone input */}
          <div className="shr-login-phone-box">
            <div className="shr-login-country-code">
              🇮🇳 <span>+91</span>
            </div>
            <input
              type="tel"
              maxLength="10"
              value={phone}
              placeholder="Enter Phone Number"
              className="shr-login-phone-input"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                setPhone(value);
                setError("");
              }}
              disabled={loading}
            />
          </div>

          {/* Email login */}
          <div
            className="shr-login-email-link"
            onClick={() => !loading && navigate("/loginwithemail")}
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
          >
            Login with email
          </div>

          {/* Forgot Password */}
          <div
            className="shr-login-forgot-link"
            onClick={() => !loading && navigate("/forgotpassword")}
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
          >
            Forgot Password?
          </div>

          {/* OTP button */}
          <button
            className={`shr-login-otp-btn ${
              isPhoneValid ? "shr-login-otp-active" : ""
            }`}
            disabled={!isPhoneValid || loading}
            onClick={handleSendOTP}
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
                Sending OTP...
              </>
            ) : (
              "Send OTP"
            )}
          </button>

          {/* Divider */}
          {/* <div className="shr-login-divider">
            <span className="shr-login-divider-line"></span>
            <p className="shr-login-divider-text">or sign in with</p>
            <span className="shr-login-divider-line"></span>
          </div> */}

          {/* Google */}
          {/* <Button 
            className="google-btn" 
            variant="light"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <img src={googleicon} alt="Google" className="google-icon" />
            <span>Sign in with Google</span>
          </Button> */}

          {/* Sign up link */}
          <div className="shr-login-signup">
            Don't have an account?{" "}
            <span 
              onClick={() => !loading && navigate("/register")}
              style={{ cursor: loading ? "not-allowed" : "pointer" }}
            >
              Sign up
            </span>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal 
        show={showSuccessModal} 
        onHide={handleCloseModal}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className="text-center p-4">
          <div className="success-icon mb-3">
            <div style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#d4edda",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto"
            }}>
              <span style={{ fontSize: "30px", color: "#155724" }}>✓</span>
            </div>
          </div>
          <h5 className="mb-3" style={{ color: "#155724" }}>OTP Sent Successfully!</h5>
          <p className="mb-4">
            OTP sent successfully to your registered mobile number ending with <strong>{lastDigits}</strong>
          </p>
          <p className="text-muted small mb-0">
            Redirecting to OTP verification...
          </p>
          <div className="mt-3">
            <Spinner animation="border" size="sm" variant="success" />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;