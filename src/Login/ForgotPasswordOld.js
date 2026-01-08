import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import "./ForgotPassword.css";

const ForgotPassword = () => {
    const navigate = useNavigate();
  return (
    <div className="forgot-wrapper">
      {/* Close Icon */}
      <div className="close-btn">×</div>

      <Container className="d-flex justify-content-center align-items-center h-100">
        <Card className="forgot-card">
          <Card.Body>
            <h4 className="text-center mb-4">Recover Password</h4>

            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  className="email-input"
                />
              </Form.Group>

              <Button className="reset-btn" type="submit">
                Send Reset Link
              </Button>
            </Form>

            <div className="text-center mt-3">
              <span className="back-login"
              onClick={() => navigate("/login")}
              >
                Back to Login!</span>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ForgotPassword;
