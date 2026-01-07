// import React from "react";
// import { Container, Row, Col } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faFacebookF, 
//   faTwitter, 
//   faYoutube, 
//   faInstagram 
// } from '@fortawesome/free-brands-svg-icons';
// import './Footer.css';

// function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="footer-custom">
//       <Container>
//         <Row className="footer-content">
//           {/* Logo and Description */}
//           <Col lg={4} md={6} className="mb-4 mb-md-4">
//             <div className="footer-brand">
//               {/* Uncomment when you have the logo */}
//               {/* <img
//                 src={Logo}
//                 alt="Shriraj Logo"
//                 className="footer-logo"
//               /> */}
//               <p className="footer-description mt-3">
//                 ShriRaj Team Business Community is a group where entrepreneurs, 
//                 business owners, and professionals connect with each other, 
//                 share experiences, expand their network, and create growth 
//                 opportunities together.
//               </p>
//               <div className="social-links mt-4">
//                 <a href="https://www.facebook.com/shrirajteam/" aria-label="Facebook">
//                   <FontAwesomeIcon icon={faFacebookF} />
//                 </a>
//                 <a href="https://x.com/shrirajteam" aria-label="Twitter">
//                   <FontAwesomeIcon icon={faTwitter} />
//                 </a>
//                 <a href="https://www.youtube.com/@Shrirajteam" aria-label="YouTube">
//                   <FontAwesomeIcon icon={faYoutube} />
//                 </a>
//                 <a href="https://www.instagram.com/shrirajteam?igsh=YzhjcjVuMGIxZzJq" aria-label="Instagram">
//                   <FontAwesomeIcon icon={faInstagram} />
//                 </a>
//               </div>
//             </div>
//           </Col>

//           {/* Quick Links */}
//           <Col lg={2} md={6} className="mb-4 mb-md-4">
//             <div className="footer-links">
//               <h5 className="footer-title">Quick Links</h5>
//               <ul className="footer-list">
//                 <li><a href="/">Home</a></li>
//                 <li><a href="/why-shriraj">Why Shriraj</a></li>
//                 <li><a href="/aboutus">About Us</a></li>
//                 <li><a href="/contactus">Contact</a></li>
//               </ul>
//             </div>
//           </Col>

//           {/* Properties */}
//           <Col lg={2} md={6} className="mb-4 mb-md-4">
//             <div className="footer-links">
//               <h5 className="footer-title">Properties</h5>
//               <ul className="footer-list">
//                 <li><a href="/properties/residential">Residential</a></li>
//                 <li><a href="/properties/commercial">Commercial</a></li>
//               </ul>
//             </div>
//           </Col>

//           {/* Why Choose Us */}
//           <Col lg={4} md={6} className="mb-4 mb-md-4">
//             <div className="footer-links">
//               <h5 className="footer-title">Why Choose Us</h5>
//               <p className="footer-description">
//                 Trusted by thousands, we offer verified listings, expert advice, 
//                 and end-to-end property solutions.
//               </p>
//             </div>
//           </Col>
//         </Row>

//         {/* Divider - Using HR instead of Divider component */}
//         <hr className="footer-divider" />

//         {/* Copyright and Policies */}
//         <Row className="footer-bottom">
//           <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
//             <p className="copyright-text">
//               &copy; {currentYear} SHRIRAJ TEAM PRIVATE LIMITED. All rights reserved.
//             </p>
//           </Col>
//           <Col md={6} className="text-center text-md-end">
//             <div className="policy-links">
//               <a href="/privacypolicy" className="policy-link">Privacy Policy</a>
//               <a href="/termsandconditions" className="policy-link">Terms & Conditions</a>
//               <a href="/refundpolicy" className="policy-link">Refund Policy</a>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// }

// export default Footer;



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

// Import all 3 images
import Logo from '../Logos/logo1.png'; // Your main logo
import GooglePlayBadge from '../Logos/1.png'; // Google Play image
import AppStoreBadge from '../Logos/2.png'; // App Store image



function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-custom">
      <Container>
        <Row className="footer-content">
          {/* Logo and Description */}
          <Col lg={4} md={6} className="mb-4 mb-md-4">
            <div className="footer-brand">
              {/* Logo */}
              <img
                src={Logo}
                alt="Shriraj Logo"
                className="footer-logo"
              />
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

          {/* App Store Badges */}
          <Col lg={4} md={6} className="mb-4 mb-md-4">
            <div className="footer-links">
              <h5 className="footer-title">Download Our App</h5>
              <p className="footer-description">
                Get the Shriraj app for a better property search experience.
              </p>
              
              <div className="app-badges">
                <a 
                  href="https://play.google.com/store/apps/details?id=com.shrirajteam" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="app-badge-link"
                >
                  <img 
                    src={GooglePlayBadge} 
                    alt="Get it on Google Play" 
                    className="app-badge"
                  />
                </a>
                <a 
                  href="https://apps.apple.com/in/app/shriraj/id6754551709" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="app-badge-link"
                >
                  <img 
                    src={AppStoreBadge} 
                    alt="Download on the App Store" 
                    className="app-badge"
                  />
                </a>
              </div>
            </div>
          </Col>
        </Row>

        {/* Divider */}
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