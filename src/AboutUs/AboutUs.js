// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faFlag, faUserCheck } from "@fortawesome/free-solid-svg-icons";
// import "./AboutUs.css";

// const AboutUs = () => {
//   return (
//     <div className="about-us-container">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-12">
            
//             {/* Main Title */}
//             <h1 className="about-us-title">
//               How It Works – Investing with Shriraj
//             </h1>
            
//             {/* Description */}
//             <div className="about-us-description">
//               ShriRaj Team Business Community is a group where entrepreneurs, business
//               owners, and professionals connect with each other, share experiences, expand
//               their network, and create growth opportunities together.
//             </div>

//             {/* Vision, Mission, Values Section */}
//             <div className="values-section">
//               <div className="row justify-content-center">
                
//                 {/* Our Vision */}
//                 <div className="col-12 col-lg-4 mb-4">
//                   <div className="value-card">
//                     <FontAwesomeIcon 
//                       icon={faEye} 
//                       className="value-icon" 
//                       style={{ color: "#007bff" }}
//                     />
//                     <h3 className="value-title">Our Vision</h3>
                    
//                     <p className="value-text">
//                       "Where businesses grow together."
//                     </p>
//                     <p className="value-text">
//                       "Stronger connections, endless opportunities."
//                     </p>
//                     <p className="value-text">
//                       "Learn, connect, grow."
//                     </p>
//                     <p className="value-text">
//                       "Your network, your progress."
//                     </p>
//                     <p className="value-text">
//                       "Support for entrepreneurs, a path to success."
//                     </p>
//                   </div>
//                 </div>

//                 {/* Our Mission */}
//                 <div className="col-12 col-lg-4 mb-4">
//                   <div className="value-card">
//                     <FontAwesomeIcon 
//                       icon={faFlag} 
//                       className="value-icon" 
//                       style={{ color: "#6c757d" }}
//                     />
//                     <h3 className="value-title">Our Mission</h3>
                    
//                     <p className="value-text mb-3">
//                       Join the ShriRaj Team Business Community! Entrepreneurs, startups and professionals come together to learn, build
//                       networks, and gain new opportunities.
//                     </p>

//                     <div className="value-list">
//                       <div className="value-list-item">Networking</div>
//                       <div className="value-list-item">Experience Sharing</div>
//                       <div className="value-list-item">Business Guidance</div>
//                       <div className="value-list-item">Growth Events</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Our Values */}
//                 <div className="col-12 col-lg-4 mb-4">
//                   <div className="value-card">
//                     <FontAwesomeIcon 
//                       icon={faUserCheck} 
//                       className="value-icon" 
//                       style={{ color: "#28a745" }}
//                     />
//                     <h3 className="value-title">Our Values</h3>
                    
//                     <p className="value-text">
//                       We uphold integrity, transparency, and trust to support strong and reliable business growth.
//                     </p>
//                     <p className="value-text">
//                       We believe in collaboration over competition, fostering an environment where every member can thrive.
//                     </p>
//                     <p className="value-text">
//                       Innovation and continuous learning are at the heart of our community's growth.
//                     </p>
//                   </div>
//                 </div>

//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;


import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFlag, faUserCheck, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./AboutUs.css";

const AboutUs = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="about-us-container">
      {/* Hero Section - Matching Contact Page */}
      <section className="about-hero">
        <div className="decorative-circle circle-1"></div>
        <div className="decorative-circle circle-2"></div>
        <div className="container text-center position-relative" style={{ zIndex: 2 }}>
          <h1 className="about-us-title">
            How It Works – Investing with Shriraj
          </h1>
          
          <div className="about-us-description">
            ShriRaj Team Business Community is a group where entrepreneurs, business
            owners, and professionals connect with each other, share experiences, expand
            their network, and create growth opportunities together.
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Core Principles</h2>
            <p className="section-subtitle">
              Building success through vision, mission, and shared values
            </p>
          </div>

          <div className="row justify-content-center g-4">
            {/* Our Vision */}
            <div className="col-12 col-lg-4">
              <div className="value-card vision-card">
                <div className="value-icon-wrapper">
                  <FontAwesomeIcon 
                    icon={faEye} 
                    className="value-icon"
                  />
                </div>
                <h3 className="value-title">Our Vision</h3>
                
                <p className="value-text">
                  "Where businesses grow together."
                </p>
                <p className="value-text">
                  "Stronger connections, endless opportunities."
                </p>
                <p className="value-text">
                  "Learn, connect, grow."
                </p>
                <p className="value-text">
                  "Your network, your progress."
                </p>
                <p className="value-text">
                  "Support for entrepreneurs, a path to success."
                </p>
              </div>
            </div>

            {/* Our Mission */}
            <div className="col-12 col-lg-4">
              <div className="value-card mission-card">
                <div className="value-icon-wrapper">
                  <FontAwesomeIcon 
                    icon={faFlag} 
                    className="value-icon"
                  />
                </div>
                <h3 className="value-title">Our Mission</h3>
                
                <p className="value-text mb-4">
                  Join the ShriRaj Team Business Community! Entrepreneurs, startups and professionals come together to learn, build
                  networks, and gain new opportunities.
                </p>

                <div className="value-list">
                  <div className="value-list-item">Networking Opportunities</div>
                  <div className="value-list-item">Experience Sharing Sessions</div>
                  <div className="value-list-item">Expert Business Guidance</div>
                  <div className="value-list-item">Growth Events & Workshops</div>
                </div>
              </div>
            </div>

            {/* Our Values */}
            <div className="col-12 col-lg-4">
              <div className="value-card values-card">
                <div className="value-icon-wrapper">
                  <FontAwesomeIcon 
                    icon={faUserCheck} 
                    className="value-icon"
                  />
                </div>
                <h3 className="value-title">Our Values</h3>
                
                <p className="value-text">
                  We uphold integrity, transparency, and trust to support strong and reliable business growth.
                </p>
                <p className="value-text">
                  We believe in collaboration over competition, fostering an environment where every member can thrive.
                </p>
                <p className="value-text">
                  Innovation and continuous learning are at the heart of our community's growth.
                </p>
                <p className="value-text">
                  Respect for diverse perspectives and commitment to ethical practices.
                </p>
                <p className="value-text">
                  Excellence in everything we do for our community members.
                </p>
              </div>
            </div>
          </div>

          <div className="section-divider"></div>

          {/* Additional Info Section */}
          <div className="row justify-content-center mt-5">
            <div className="col-12 col-md-10 col-lg-8 text-center">
              <h3 className="h2 fw-bold mb-4" style={{ color: '#2e166d' }}>
                Why Choose ShriRaj Team?
              </h3>
              <div className="row g-4">
                <div className="col-12 col-md-4">
                  <div className="p-3">
                    <div className="h4 mb-3" style={{ color: '#3d1e9e' }}>500+</div>
                    <p className="text-muted">Successful Members</p>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="p-3">
                    <div className="h4 mb-3" style={{ color: '#3d1e9e' }}>50+</div>
                    <p className="text-muted">Business Events</p>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="p-3">
                    <div className="h4 mb-3" style={{ color: '#3d1e9e' }}>24/7</div>
                    <p className="text-muted">Community Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <button 
        className="back-to-top"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
};

export default AboutUs;