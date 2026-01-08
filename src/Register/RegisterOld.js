import React, { useState } from "react";
import { Container, Card, Form, Button, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import shrirajlogo from "./../Images/shrirajlogo.png";
import "./Register.css";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="register-bg">
      <span className="register-close">✕</span>

      <Container className="register-container">
        <Card className="register-card">
          <Card.Body>

            {/* Logo + Brand */}
            <div className="register-brand-row">
              <img src={shrirajlogo} alt="Shriraj Logo" className="register-logo" />
              <span className="register-brand-name">Shriraj</span>
            </div>

            {/* Title */}
            <div className="register-title">Registration</div>

            {/* First & Last Name */}
            <div className="register-two-col">
              <Form.Control
                type="text"
                placeholder="First Name"
                className="register-input"
              />
              <Form.Control
                type="text"
                placeholder="Last Name"
                className="register-input"
              />
            </div>

            {/* Email & Password */}
            <div className="register-two-col">
              <Form.Control
                type="email"
                placeholder="Email"
                className="register-input"
              />

              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="register-input"
                />
                <InputGroup.Text
                  className="register-eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeSlash /> : <Eye />}
                </InputGroup.Text>
              </InputGroup>
            </div>

            {/* Phone & Role */}
            <div className="register-two-col">
              <Form.Control
                type="tel"
                placeholder="Phone Number"
                className="register-input"
              />

              <Form.Select className="register-input">
                <option value="">Role *</option>
                <option>Investor</option>
                <option>Partner</option>
                <option>Agent</option>
              </Form.Select>
            </div>

            {/* Terms */}
            <Form.Check
              type="checkbox"
              className="register-terms"
              checked={agree}
              onChange={() => setAgree(!agree)}
              label={
                <>
                  I agree to the{" "}
                  <span className="register-link">Terms & Conditions</span> and{" "}
                  <span className="register-link">Privacy Policy</span>
                </>
              }
            />

            {/* Helpline */}
            <div className="register-helpline">
              Helpline Number: <strong>9399492809</strong>
            </div>

            {/* Register Button */}
            <Button className="register-btn" disabled={!agree}>
              Register
            </Button>

            {/* Login link */}
            <div className="register-footer">
              Already registered?{" "}
              <span
                className="register-link"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </div>

          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
