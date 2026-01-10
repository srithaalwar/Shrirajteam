// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Alert, Spinner } from "react-bootstrap";
// import axios from "axios";
// import "./Login.css";

// const VerifyOTP = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [timer, setTimer] = useState(30);
//   const [canResend, setCanResend] = useState(false);
//   const inputRefs = useRef([]);

//   const phoneNumber = location.state?.phoneNumber || "";

//   useEffect(() => {
//     const countdown = setInterval(() => {
//       setTimer((prev) => {
//         if (prev <= 1) {
//           clearInterval(countdown);
//           setCanResend(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(countdown);
//   }, []);

//   useEffect(() => {
//     if (inputRefs.current[0]) {
//       inputRefs.current[0].focus();
//     }
//   }, []);

//   const handleChange = (index, value) => {
//     if (value.length <= 1 && /^\d*$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       // Auto-focus next input
//       if (value && index < 5) {
//         inputRefs.current[index + 1].focus();
//       }
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handleVerifyOTP = async () => {
//     const otpString = otp.join("");
//     if (otpString.length !== 6) {
//       setError("Please enter 6-digit OTP");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.post(
//         "https://shrirajteam.com:81/verify-otp/",
//         {
//           otp: otpString
//         }
//       );

//       if (response.data && response.data.message === "OTP verified successfully") {
//         // Store token if returned
//         if (response.data.token) {
//           localStorage.setItem("authToken", response.data.token);
//         }
        
//         // Redirect to dashboard/home
//         navigate("/dashboard");
//       } else {
//         setError(response.data?.message || "Invalid OTP");
//       }
//     } catch (error) {
//       console.error("OTP verification error:", error);
//       setError(error.response?.data?.message || "Invalid OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     if (!phoneNumber || !canResend) return;

//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.post(
//         "https://shrirajteam.com:81/login1/",
//         {
//           phone_number: phoneNumber
//         }
//       );

//       if (response.data && response.data.message === "OTP sent successfully") {
//         setTimer(30);
//         setCanResend(false);
//         setOtp(["", "", "", "", "", ""]);
//         inputRefs.current[0].focus();
//       } else {
//         setError("Failed to resend OTP");
//       }
//     } catch (error) {
//       setError("Network error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="shr-login-wrapper">
//       <div className="shr-login-close" onClick={() => navigate("/login")}>
//         ✕
//       </div>

//       <div className="shr-login-card">
//         <h5 className="shr-login-title">Verify OTP</h5>
//         <p className="shr-login-subtitle">
//           Enter OTP sent to +91 {phoneNumber}
//         </p>

//         {error && (
//           <Alert variant="danger" className="shr-alert">
//             {error}
//           </Alert>
//         )}

//         <div className="shr-otp-container">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               ref={(el) => (inputRefs.current[index] = el)}
//               type="text"
//               maxLength="1"
//               value={digit}
//               className="shr-otp-input"
//               onChange={(e) => handleChange(index, e.target.value)}
//               onKeyDown={(e) => handleKeyDown(index, e)}
//               disabled={loading}
//             />
//           ))}
//         </div>

//         <button
//           className="shr-login-otp-btn shr-login-otp-active"
//           onClick={handleVerifyOTP}
//           disabled={loading || otp.join("").length !== 6}
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
//               Verifying...
//             </>
//           ) : (
//             "Verify OTP"
//           )}
//         </button>

//         <div className="shr-resend-otp">
//           {canResend ? (
//             <span onClick={handleResendOTP} className="shr-resend-link">
//               Resend OTP
//             </span>
//           ) : (
//             <span className="shr-timer">
//               Resend OTP in {timer}s
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerifyOTP;



import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Alert, Spinner, Modal } from "react-bootstrap";
import axios from "axios";
import "./Login.css";
import { baseurl } from "../BaseURL/BaseURL";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const inputRefs = useRef([]);

  const phoneNumber = location.state?.phoneNumber || "";

  useEffect(() => {
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
      
      // Auto-submit when all digits are entered
      if (index === 5 && value) {
        const completeOtp = [...newOtp];
        if (completeOtp.every(digit => digit !== "")) {
          // Small delay to let user see the last digit
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
    
    // Submit on Enter key
    if (e.key === "Enter" && otp.join("").length === 6) {
      handleVerifyOTP();
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
      console.log("Verifying OTP:", otpString);
      
     const response = await axios.post(
  `${baseurl}/verify-otp/`,
  {
          otp: otpString
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("OTP Verification Response:", response.data);

      // Check for success in different possible formats
      if (response.data) {
        const responseData = response.data;
        
        // Check for success message
        if (
          responseData.message === "OTP verified successfully" ||
          responseData.message === "Login successful" ||
          responseData.message === "OTP verified" ||
          responseData.status === "success" ||
          responseData.success === true
        ) {
          // Store token if returned
          if (responseData.token || responseData.access_token) {
            const token = responseData.token || responseData.access_token;
            localStorage.setItem("authToken", token);
            console.log("Token stored:", token);
          }
          
          // Store user data if available
          if (responseData.user) {
            localStorage.setItem("userData", JSON.stringify(responseData.user));
          }
          
          // Show success modal and redirect
          setShowSuccessModal(true);
          
          // Redirect after 2 seconds
          setTimeout(() => {
            setShowSuccessModal(false);
            navigate("/", { replace: true }); // Or navigate to your dashboard
          }, 2000);
          
        } else {
          setError(responseData.message || "Invalid OTP");
        }
      } else {
        setError("Invalid response from server");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      
      // Handle different error formats
      if (error.response) {
        const errorData = error.response.data;
        
        // Check if error response actually contains success
        if (errorData.message?.includes("success") || errorData.message?.includes("verified")) {
          // It's actually a success
          if (errorData.token) {
            localStorage.setItem("authToken", errorData.token);
          }
          setShowSuccessModal(true);
          setTimeout(() => {
            setShowSuccessModal(false);
            navigate("/", { replace: true });
          }, 2000);
        } else {
          setError(
            errorData.message || 
            errorData.error || 
            `Error: ${error.response.status}`
          );
        }
      } else if (error.request) {
        setError("Network error. Please check your connection.");
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
      const response = await axios.post(
        "https://shrirajteam.com:81/login1/",
        {
          phone_number: phoneNumber
        }
      );

      if (response.data && (
        response.data.message === "OTP sent successfully" ||
        response.data.message?.includes("sent successfully")
      )) {
        setTimer(30);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      } else {
        setError(response.data?.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="shr-login-wrapper">
        <div className="shr-login-close" onClick={() => navigate("/login")}>
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

      {/* Success Modal */}
      <Modal 
        show={showSuccessModal} 
        onHide={handleCloseSuccessModal}
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
          <h5 className="mb-3" style={{ color: "#155724" }}>Login Successful!</h5>
          <p className="mb-4">
            You have successfully logged in.
          </p>
          <p className="text-muted small mb-0">
            Redirecting to dashboard...
          </p>
          <div className="mt-3">
            <Spinner animation="border" size="sm" variant="success" />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VerifyOTP;