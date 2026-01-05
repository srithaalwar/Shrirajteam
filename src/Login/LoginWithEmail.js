import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import shrirajlogo from "./../Images/shrirajlogo.png";
import googleicon from "./../Images/googleicon.png";
import "./LoginWithEmail.css";

const LoginWithEmail = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


    return (
        <div className="login-bg">
            <span className="close-icon">✕</span>

            <Container className="login-container">
                <Card className="login-card">
                    <Card.Body>

                        {/* Logo + Brand */}
                        <div className="brand-row">
                            <img src={shrirajlogo} alt="Shriraj Logo" className="login-logo" />
                            <span className="brand-name">Shriraj</span>
                        </div>

                        {/* Title */}
                        <div className="login-title">Log in or Sign up</div>

                        {/* Email */}
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="email"
                                placeholder="Enter Email Id or Phone Number"
                                className="login-input"
                            />
                        </Form.Group>

                        {/* Password */}
                        <Form.Group className="mb-2">
                            <InputGroup>
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="login-input"
                                />
                                <InputGroup.Text
                                    className="eye-icon"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeSlash /> : <Eye />}
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        {/* Links */}
                        <div className="login-links">
                            <span
                                className="forgot-password"
                                onClick={() => navigate("/forgotpassword")}
                            >
                                Forgot password?
                            </span>
{/* 
                            <span
                                className="phone-login"
                                onClick={() => navigate("/login")}
                            >
                                Login with phone
                            </span> */}

                        </div>

                        {/* Sign in */}
                        <Button className="signin-btn">Sign in</Button>

                        {/* Divider */}
                        <div className="divider">
                            <span>or sign in with</span>
                        </div>

                        {/* Google */}
                        <Button className="google-btn" variant="light">
                            <img src={googleicon} alt="Google" className="google-icon" />
                            <span>Sign in with Google</span>
                        </Button>

                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default LoginWithEmail;
