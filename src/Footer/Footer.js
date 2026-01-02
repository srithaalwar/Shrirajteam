import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faYoutube, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-custom">
      <Container>
        <Row className="footer-content">
          {/* Logo and Description */}
          <Col lg={4} md={6} className="mb-4 mb-md-4">
            <div className="footer-brand">
              {/* Uncomment when you have the logo */}
              {/* <img
                src={Logo}
                alt="Shriraj Logo"
                className="footer-logo"
              /> */}
              <p className="footer-description mt-3">
                ShriRaj Team Business Community is a group where entrepreneurs, 
                business owners, and professionals connect with each other, 
                share experiences, expand their network, and create growth 
                opportunities together.
              </p>
              <div className="social-links mt-4">
                <a href="https://www.facebook.com/shrirajteam/" aria-label="Facebook">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="https://x.com/shrirajteam" aria-label="Twitter">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="https://www.youtube.com/@Shrirajteam" aria-label="YouTube">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a href="https://www.instagram.com/shrirajteam?igsh=YzhjcjVuMGIxZzJq" aria-label="Instagram">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6} className="mb-4 mb-md-4">
            <div className="footer-links">
              <h5 className="footer-title">Quick Links</h5>
              <ul className="footer-list">
                <li><a href="/">Home</a></li>
                <li><a href="/why-shriraj">Why Shriraj</a></li>
                <li><a href="/aboutus">About Us</a></li>
                <li><a href="/contactus">Contact</a></li>
              </ul>
            </div>
          </Col>

          {/* Properties */}
          <Col lg={2} md={6} className="mb-4 mb-md-4">
            <div className="footer-links">
              <h5 className="footer-title">Properties</h5>
              <ul className="footer-list">
                <li><a href="/properties/residential">Residential</a></li>
                <li><a href="/properties/commercial">Commercial</a></li>
              </ul>
            </div>
          </Col>

          {/* Why Choose Us */}
          <Col lg={4} md={6} className="mb-4 mb-md-4">
            <div className="footer-links">
              <h5 className="footer-title">Why Choose Us</h5>
              <p className="footer-description">
                Trusted by thousands, we offer verified listings, expert advice, 
                and end-to-end property solutions.
              </p>
            </div>
          </Col>
        </Row>

        {/* Divider - Using HR instead of Divider component */}
        <hr className="footer-divider" />

        {/* Copyright and Policies */}
        <Row className="footer-bottom">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="copyright-text">
              &copy; {currentYear} SHRIRAJ TEAM PRIVATE LIMITED. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div className="policy-links">
              <a href="/privacypolicy" className="policy-link">Privacy Policy</a>
              <a href="/termsandconditions" className="policy-link">Terms & Conditions</a>
              <a href="/refundpolicy" className="policy-link">Refund Policy</a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;