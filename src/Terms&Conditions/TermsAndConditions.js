// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Terms&Conditions.css';
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import Footer from "../Footer/Footer";
// const TermsAndConditions = () => {
//     const navigate = useNavigate();

//     return (
//         <>
//       <WebsiteNavbar />


//             <div className="terms-container">
//                 <div className="terms-card">
//                     {/* Fixed Header */}
//                     <div className="terms-header">
//                         <h5 className="terms-title">Terms and Conditions</h5>
//                     </div>

//                     {/* Scrollable Content */}
//                     <div className="terms-content">
//                         <h6 className="section-title">1. Acceptance of Terms</h6>
//                         <p className="section-text">
//                             By accessing our website (www.shrirajteam.com) or using our mobile application (collectively referred to as the "Platform"), you agree to the terms laid out by Shriraj Property Solutions Pvt. Ltd. and its affiliated companies.
//                         </p>

//                         <h6 className="section-title">2. Non-Refundable Payments</h6>
//                         <p className="section-text">
//                             The user agrees that the service fee and registration fee deposited through our Platform will not be refunded under any circumstances.
//                         </p>

//                         <h6 className="section-title">3. Communication Consent</h6>
//                         <p className="section-text">
//                             We (or our service providers/partners) may communicate with you via voice calls, SMS, emails, or Platform notifications regarding transactions or promotional content. You may opt out of promotional communications by contacting our grievance officer. Non-promotional messages may still be sent.
//                         </p>

//                         <h6 className="section-title">4. Accuracy of Property Information</h6>
//                         <p className="section-text">
//                             Users must enter correct and clear property details on the Platform. The Company will not be responsible for any incorrect entries made by users.
//                         </p>

//                         <h6 className="section-title">5. Third-Party Links</h6>
//                         <p className="section-text">
//                             Our Platform may display ads or contain links to third-party websites that may collect personal data. These sites are not governed by our terms, and the Company is not responsible for their practices. Users are advised to review the terms and policies of each linked third-party site.
//                         </p>

//                         <h6 className="section-title">6. Modifications to Terms</h6>
//                         <p className="section-text">
//                             The Platform reserves the right to update, change, or modify these Terms and Conditions at any time. Continued use of the Platform indicates acceptance of such updates.
//                         </p>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="terms-actions">
//                         <button
//                             className="btn btn-outline-secondary"
//                             onClick={() => navigate('/login')}
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             className="btn btn-primary"
//                             onClick={() => navigate('/login')}
//                         >
//                             I have read and accept the terms of service
//                         </button>
//                     </div>
//                 </div>
//             </div>
//   <Footer/>

//         </>
//     );
// };

// export default TermsAndConditions;






// import React from 'react';

// const TermsConditions = () => {
//   return (
//     <>
//       {/* Hero Section */}
//       <section className="bg-light py-5">
//         <div className="container">
//           <h1 className="display-4 fw-bold text-dark mb-3">Terms & Conditions</h1>
//           <p className="text-muted fs-5">Last updated: January 7, 2025</p>
//         </div>
//       </section>

//       {/* Content Section */}
//       <section className="py-5 bg-white">
//         <div className="container" style={{ maxWidth: '800px' }}>
//           {/* Acceptance */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">1. Acceptance of Terms</h2>
//             <p className="text-muted lh-lg">
//               By accessing and using PropEstate's website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services. These terms apply to all visitors, users, and others who access or use our platform.
//             </p>
//           </div>

//           {/* Services Description */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">2. Description of Services</h2>
//             <p className="text-muted lh-lg">
//               PropEstate provides an online platform for real estate listings, property searches, and connecting buyers, sellers, and renters with real estate professionals. Our services include property listings, market information, mortgage calculators, and agent matching services.
//             </p>
//           </div>

//           {/* User Accounts */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">3. User Accounts</h2>
//             <p className="text-muted lh-lg mb-3">
//               When you create an account with us, you must provide accurate and complete information. You are responsible for:
//             </p>
//             <ul className="text-muted">
//               <li className="mb-2">Maintaining the confidentiality of your account credentials</li>
//               <li className="mb-2">All activities that occur under your account</li>
//               <li className="mb-2">Notifying us immediately of any unauthorized use</li>
//               <li className="mb-2">Ensuring your contact information is current</li>
//             </ul>
//           </div>

//           {/* Property Listings */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">4. Property Listings</h2>
//             <p className="text-muted lh-lg mb-3">
//               Property information displayed on our platform is provided by third-party sources including real estate agents, brokers, and property owners. While we strive for accuracy:
//             </p>
//             <ul className="text-muted">
//               <li className="mb-2">We do not guarantee the accuracy, completeness, or reliability of listings</li>
//               <li className="mb-2">Prices, availability, and property details may change without notice</li>
//               <li className="mb-2">Users should verify all information independently before making decisions</li>
//               <li className="mb-2">Photos may not reflect current property conditions</li>
//             </ul>
//           </div>

//           {/* User Conduct */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">5. User Conduct</h2>
//             <p className="text-muted lh-lg mb-3">You agree not to:</p>
//             <ul className="text-muted">
//               <li className="mb-2">Use our services for any unlawful purpose</li>
//               <li className="mb-2">Post false, misleading, or fraudulent content</li>
//               <li className="mb-2">Harass, abuse, or harm other users or agents</li>
//               <li className="mb-2">Attempt to gain unauthorized access to our systems</li>
//               <li className="mb-2">Use automated systems to access our platform without permission</li>
//               <li className="mb-2">Interfere with the proper functioning of our services</li>
//               <li className="mb-2">Copy, modify, or distribute our content without authorization</li>
//             </ul>
//           </div>

//           {/* Intellectual Property */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">6. Intellectual Property</h2>
//             <p className="text-muted lh-lg">
//               All content on PropEstate, including text, graphics, logos, images, and software, is the property of PropEstate or its content suppliers and is protected by copyright and intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written consent.
//             </p>
//           </div>

//           {/* Third-Party Services */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">7. Third-Party Services</h2>
//             <p className="text-muted lh-lg">
//               Our platform may contain links to third-party websites and services. We are not responsible for the content, privacy policies, or practices of any third-party sites. Your use of third-party services is at your own risk, and we encourage you to read their terms and conditions.
//             </p>
//           </div>

//           {/* Disclaimers */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">8. Disclaimers</h2>
//             <p className="text-muted lh-lg mb-3">
//               Our services are provided "as is" and "as available" without warranties of any kind. We disclaim all warranties, including:
//             </p>
//             <ul className="text-muted">
//               <li className="mb-2">Merchantability and fitness for a particular purpose</li>
//               <li className="mb-2">Accuracy or reliability of any information provided</li>
//               <li className="mb-2">Uninterrupted or error-free service</li>
//               <li className="mb-2">Security of data transmitted through our platform</li>
//             </ul>
//           </div>

//           {/* Limitation of Liability */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">9. Limitation of Liability</h2>
//             <p className="text-muted lh-lg">
//               To the maximum extent permitted by law, PropEstate shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services, including but not limited to loss of profits, data, or goodwill, even if we have been advised of the possibility of such damages.
//             </p>
//           </div>

//           {/* Indemnification */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">10. Indemnification</h2>
//             <p className="text-muted lh-lg">
//               You agree to indemnify and hold harmless PropEstate, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses arising from your use of our services, your violation of these terms, or your violation of any rights of another.
//             </p>
//           </div>

//           {/* Governing Law */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">11. Governing Law</h2>
//             <p className="text-muted lh-lg">
//               These Terms and Conditions shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in New York County.
//             </p>
//           </div>

//           {/* Changes */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">12. Changes to Terms</h2>
//             <p className="text-muted lh-lg">
//               We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after any changes constitutes acceptance of the new terms.
//             </p>
//           </div>

//           {/* Contact */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">13. Contact Information</h2>
//             <p className="text-muted lh-lg">For questions about these Terms and Conditions, please contact us at:</p>
//             <div className="bg-light rounded p-4 mt-3">
//               <p className="fw-semibold text-dark mb-1">PropEstate Legal Department</p>
//               <p className="text-muted mb-1">123 Real Estate Blvd, Suite 100</p>
//               <p className="text-muted mb-1">New York, NY 10001</p>
//               <p className="text-muted mb-1">Email: legal@propestate.com</p>
//               <p className="text-muted mb-0">Phone: (555) 123-4567</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default TermsConditions;


import React from 'react';
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import Footer from "../Footer/Footer";

const TermsConditions = () => {
  const terms = [
    {
      id: 1,
      title: "Acceptance of Terms",
      icon: "bi-check-circle",
      content: "By accessing our website (www.shrirajteam.com) or using our mobile application (collectively referred to as the \"Platform\"), you agree to the terms laid out by Shriraj Property Solutions Pvt. Ltd. and its affiliated companies."
    },
    {
      id: 2,
      title: "Non-Refundable Payments",
      icon: "bi-cash-stack",
      content: "The user agrees that the service fee and registration fee deposited through our Platform will not be refunded under any circumstances."
    },
    {
      id: 3,
      title: "Communication Consent",
      icon: "bi-chat-left-text",
      content: "We (or our service providers/partners) may communicate with you via voice calls, SMS, emails, or Platform notifications regarding transactions or promotional content. You may opt out of promotional communications by contacting our grievance officer. Non-promotional messages may still be sent."
    },
    {
      id: 4,
      title: "Accuracy of Property Information",
      icon: "bi-building",
      content: "Users must enter correct and clear property details on the Platform. The Company will not be responsible for any incorrect entries made by users."
    },
    {
      id: 5,
      title: "Third-Party Links",
      icon: "bi-link-45deg",
      content: "Our Platform may display ads or contain links to third-party websites that may collect personal data. These sites are not governed by our terms, and the Company is not responsible for their practices. Users are advised to review the terms and policies of each linked third-party site."
    },
    {
      id: 6,
      title: "Modifications to Terms",
      icon: "bi-pencil-square",
      content: "The Platform reserves the right to update, change, or modify these Terms and Conditions at any time. Continued use of the Platform indicates acceptance of such updates."
    }
  ];

  return (
    <div className="terms-conditions-page">
      <WebsiteNavbar />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">Terms & Conditions</h1>
              
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              
              {/* Introduction Card */}
              {/* <div className="card shadow-sm border-0 mb-4">
                <div className="card-body p-4">
                  <p className="text-muted mb-0">
                    Please read these Terms and Conditions carefully before using our Platform. By accessing or using our services, you agree to be bound by these terms.
                  </p>
                </div>
              </div> */}

              {/* Terms List */}
              {terms.map((term) => (
                <div key={term.id} className="card shadow-sm border-0 mb-4">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-start">
                      {/* <div className="flex-shrink-0">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-3">
                          <i className={`bi ${term.icon} text-primary fs-4`}></i>
                        </div>
                      </div> */}
                      <div className="flex-grow-1 ms-4">
                        <h3 className="h5 fw-bold text-dark mb-3">
                          {term.id}. {term.title}
                        </h3>
                        <p className="text-muted mb-0">{term.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Contact Card */}
              {/* <div className="card shadow-sm border-0 bg-light">
                <div className="card-body p-4 text-center">
                  <h4 className="fw-bold text-dark mb-3">Questions About Our Terms?</h4>
                  <p className="text-muted mb-3">
                    If you have any questions regarding these Terms and Conditions, please contact us.
                  </p>
                  <p className="mb-0">
                    <strong>Email:</strong> <a href="mailto:shrirajteam@gmail.com">shrirajteam@gmail.com</a><br />
                    <strong>Website:</strong> <a href="https://www.shrirajteam.com" target="_blank" rel="noopener noreferrer">www.shrirajteam.com</a>
                  </p>
                </div>
              </div> */}

            </div>
          </div>
        </div>
      </section>

      <Footer/>


    </div>
  );
};

export default TermsConditions;

