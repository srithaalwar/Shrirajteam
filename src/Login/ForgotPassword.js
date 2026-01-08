// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Container, Form, Button, Card } from "react-bootstrap";
// import "./ForgotPassword.css";

// const ForgotPassword = () => {
//     const navigate = useNavigate();
//   return (
//     <div className="forgot-wrapper">
//       {/* Close Icon */}
//       <div className="close-btn">×</div>

//       <Container className="d-flex justify-content-center align-items-center h-100">
//         <Card className="forgot-card">
//           <Card.Body>
//             <h4 className="text-center mb-4">Recover Password</h4>

//             <Form>
//               <Form.Group className="mb-3">
//                 <Form.Control
//                   type="email"
//                   placeholder="Email address"
//                   className="email-input"
//                 />
//               </Form.Group>

//               <Button className="reset-btn" type="submit">
//                 Send OTP
//               </Button>
//             </Form>

//             <div className="text-center mt-3">
//               <span className="back-login"
//               onClick={() => navigate("/login")}
//               >
//                 Back to Login!</span>
//             </div>
//           </Card.Body>
//         </Card>
//       </Container>
//     </div>
//   );
// };

// export default ForgotPassword;




import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Alert, Spinner, Modal } from "react-bootstrap";
import axios from "axios";
import "./ForgotPassword.css";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1); // 1: Enter email, 2: Enter OTP & new password
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const otpRefs = useRef([]);

    useEffect(() => {
        // Focus first OTP input when step changes to 2
        if (step === 2 && otpRefs.current[0]) {
            setTimeout(() => {
                otpRefs.current[0]?.focus();
            }, 100);
        }
    }, [step]);

    const handleSendOTP = async (e) => {
        e.preventDefault();
        
        if (!email) {
            setError("Please enter your email address");
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post(
                "https://shrirajteam.com:81/send-otp/",
                {
                    email: email
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Send OTP Response:", response.data);

            if (response.data && response.data.message === "OTP sent successfully") {
                setSuccess("OTP sent to your email! Please enter it below.");
                setStep(2);
            } else {
                setError(response.data?.message || "Failed to send OTP");
            }
        } catch (error) {
            console.error("Send OTP error:", error);
            
            if (error.response) {
                const errorData = error.response.data;
                // Check if it's actually a success
                if (errorData.message?.includes("OTP sent") || 
                    errorData.message?.includes("sent successfully")) {
                    setSuccess("OTP sent to your email! Please enter it below.");
                    setStep(2);
                } else {
                    setError(errorData.message || "Error sending OTP");
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

    const handleOTPChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-focus next input
            if (value && index < 3) {
                setTimeout(() => {
                    otpRefs.current[index + 1]?.focus();
                }, 10);
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            setTimeout(() => {
                otpRefs.current[index - 1]?.focus();
            }, 10);
        }
        
        // Submit on Enter key when all OTP digits are entered
        if (e.key === "Enter" && otp.join("").length === 4) {
            // Check if all OTP fields are filled
            if (newPassword && confirmPassword) {
                handleResetPassword(e);
            }
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        
        const otpString = otp.join("");
        if (otpString.length !== 4) {
            setError("Please enter 4-digit OTP");
            otpRefs.current[0]?.focus();
            return;
        }

        if (!newPassword) {
            setError("Please enter new password");
            return;
        }

        if (!confirmPassword) {
            setError("Please confirm your password");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post(
                "https://shrirajteam.com:81/verify-otp-reset-password/",
                {
                    email: email,
                    otp: otpString,
                    new_password: newPassword
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Reset Password Response:", response.data);

            if (response.data && (
                response.data.message === "Password reset successful" ||
                response.data.message === "Password updated successfully" ||
                response.data.message === "OTP verified and password reset" ||
                response.data.success === true ||
                response.data.status === "success"
            )) {
                // Show success modal
                setShowSuccessModal(true);
                
                // Clear form
                setOtp(["", "", "", ""]);
                setNewPassword("");
                setConfirmPassword("");
                
            } else {
                setError(response.data?.message || "Failed to reset password");
            }
        } catch (error) {
            console.error("Reset password error:", error);
            
            if (error.response) {
                const errorData = error.response.data;
                setError(errorData.message || "Invalid OTP or error resetting password");
            } else if (error.request) {
                setError("Network error. Please check your connection.");
            } else {
                setError("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        // Navigate to login page
        navigate("/login");
    };

    const resendOTP = async () => {
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post(
                "https://shrirajteam.com:81/send-otp/",
                {
                    email: email
                }
            );

            if (response.data && (
                response.data.message === "OTP sent successfully" ||
                response.data.message?.includes("sent successfully")
            )) {
                setSuccess("New OTP sent to your email!");
                setOtp(["", "", "", ""]);
                // Focus first OTP input
                setTimeout(() => {
                    otpRefs.current[0]?.focus();
                }, 100);
            } else {
                setError("Failed to resend OTP");
            }
        } catch (error) {
            setError("Failed to resend OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        navigate("/login");
    };

    const goBackToEmail = () => {
        setStep(1);
        setError("");
        setSuccess("");
        setOtp(["", "", "", ""]);
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <>
            <div className="forgot-wrapper">
                {/* Close Icon */}
                <div className="close-btn" onClick={handleClose}>×</div>

                <Container className="d-flex justify-content-center align-items-center h-100">
                    <Card className="forgot-card">
                        <Card.Body>
                            <h4 className="text-center mb-4">
                                {step === 1 ? "Recover Password" : "Reset Password"}
                            </h4>

                            {error && (
                                <Alert variant="danger" className="shr-alert">
                                    {error}
                                </Alert>
                            )}

                            {success && !showSuccessModal && (
                                <Alert variant="success" className="shr-alert">
                                    {success}
                                </Alert>
                            )}

                            {step === 1 ? (
                                <Form onSubmit={handleSendOTP}>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="form-label">Email Address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your registered email"
                                            className="email-input"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setError("");
                                            }}
                                            disabled={loading}
                                            required
                                            autoFocus
                                        />
                                    </Form.Group>

                                    <Button 
                                        className="reset-btn" 
                                        type="submit"
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
                                                Sending OTP...
                                            </>
                                        ) : (
                                            "Send OTP"
                                        )}
                                    </Button>
                                </Form>
                            ) : (
                                <Form onSubmit={handleResetPassword}>
                                    <div className="text-center mb-4">
                                        <p className="mb-2">Enter the 4-digit OTP sent to:</p>
                                        <strong className="email-display">{email}</strong>
                                    </div>

                                    <div className="otp-container mb-4">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => (otpRefs.current[index] = el)}
                                                type="text"
                                                maxLength="1"
                                                value={digit}
                                                className="otp-input"
                                                onChange={(e) => handleOTPChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                onFocus={(e) => e.target.select()}
                                                disabled={loading}
                                                id={`otp-${index}`}
                                            />
                                        ))}
                                    </div>

                                    <div className="text-center mb-4">
                                        <button 
                                            type="button" 
                                            className="resend-otp-btn"
                                            onClick={resendOTP}
                                            disabled={loading}
                                        >
                                            {loading ? "Sending..." : "Resend OTP"}
                                        </button>
                                    </div>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="form-label">New Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter new password (min. 6 characters)"
                                            className="password-input"
                                            value={newPassword}
                                            onChange={(e) => {
                                                setNewPassword(e.target.value);
                                                setError("");
                                            }}
                                            disabled={loading}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label className="form-label">Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm new password"
                                            className="password-input"
                                            value={confirmPassword}
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value);
                                                setError("");
                                            }}
                                            disabled={loading}
                                            required
                                        />
                                    </Form.Group>

                                    <div className="d-grid gap-2">
                                        <Button 
                                            className="reset-btn" 
                                            type="submit"
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
                                                    Resetting Password...
                                                </>
                                            ) : (
                                                "Reset Password"
                                            )}
                                        </Button>
                                        
                                        <Button 
                                            variant="outline-secondary" 
                                            onClick={goBackToEmail}
                                            disabled={loading}
                                        >
                                            Change Email
                                        </Button>
                                    </div>
                                </Form>
                            )}

                            <div className="text-center mt-4">
                                <span 
                                    className="back-login"
                                    onClick={handleClose}
                                >
                                    Back to Login
                                </span>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </div>

            {/* Success Modal */}
            <Modal 
                show={showSuccessModal} 
                onHide={handleSuccessModalClose}
                centered
                backdrop="static"
                keyboard={false}
                size="sm"
            >
                <Modal.Body className="text-center p-4">
                    <div className="success-icon mb-3">
                        <div className="success-checkmark">
                            <span className="checkmark">✓</span>
                        </div>
                    </div>
                    <h5 className="mb-3" style={{ color: "#155724" }}>Success!</h5>
                    <p className="mb-4">
                        Your password has been reset successfully.
                    </p>
                    <p className="text-muted small mb-4">
                        You can now login with your new password.
                    </p>
                    
                    <Button 
                        variant="success" 
                        onClick={handleSuccessModalClose}
                        className="w-100"
                    >
                        Go to Login
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ForgotPassword;