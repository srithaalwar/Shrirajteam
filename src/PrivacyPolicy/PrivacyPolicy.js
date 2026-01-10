// import React from 'react';
// import './PrivacyPolicy.css';
// import { useNavigate } from 'react-router-dom';
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import Footer from "../Footer/Footer";
// const PrivacyPolicy = () => {
//   const navigate = useNavigate();

//   return (
//           <>
//       <WebsiteNavbar />
//     <div className="privacy-policy-container">
//       <div className="container-fluid">
//         <div className="row justify-content-center">
//           <div className="col-12 col-lg-10 col-xl-8">
//             <div className="privacy-card shadow-lg">
//               {/* Header */}
//               <div className="privacy-header sticky-top">
//                 <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
//                   <h1 className="h4 mb-0 fw-bold text-dark">Privacy Policy</h1>
//                   <span className="text-muted small">Last Updated: January 7, 2025</span>
//                 </div>
//               </div>

//               {/* Scrollable Content */}
//               <div className="privacy-content p-4">
//                 {/* Breadcrumb */}
//                 <nav aria-label="breadcrumb" className="mb-4">
//                   <ol className="breadcrumb">
//                     <li className="breadcrumb-item">
//                       <a href="#" className="text-decoration-none text-muted">Home</a>
//                     </li>
//                     <li className="breadcrumb-item active" aria-current="page">Privacy Policy</li>
//                   </ol>
//                 </nav>

//                 {/* Introduction Section */}
//                 <div className="section">
//                   <h2 className="h3 fw-bold mb-3">Introduction</h2>
//                   <p className="lead mb-4">
//                     Welcome to Shriraj Property Solutions!
//                   </p>
//                   <p>
//                     Shriraj Property Solutions collects e-mail addresses and other contact details of people who register at our website and send us an e-mail. The information we collect is not shared with or sold to others except under the certain circumstances and which your use of the Service is deemed to provide to us a valid consent to disclose the following:
//                   </p>
//                   <ul className="styled-list">
//                     <li>In order to investigate, prevent, or take action regarding illegal activities</li>
//                     <li>Suspected fraud</li>
//                     <li>Situations involving potential threats to the physical safety of any person</li>
//                     <li>Violations of Shriraj Property Solutions's terms of use</li>
//                     <li>As otherwise required by law</li>
//                   </ul>
//                 </div>

//                 {/* Information Sharing Section */}
//                 <div className="section">
//                   <h3 className="h5 fw-bold mt-4 mb-3">Information Sharing</h3>
//                   <p>
//                     We share information about our Members with third parties, such as advertisers or partners, for marketing and promotional purposes. However, except as otherwise Shriraj Property Solutions does not rent, sell, or share personal information about you with other companies!
//                   </p>
//                 </div>

//                 {/* How We Use Information Section */}
//                 <div className="section">
//                   <h3 className="h5 fw-bold mt-4 mb-3">How We Use Your Information</h3>
//                   <p>
//                     Shriraj Property Solutions uses your information on a cumulative basis to help operate our websites and enhance our websites design, improve our content, our services and usability. We may also use the information we collect to occasionally notify you about important functionality changes to the website, new Services, and special offers.
//                   </p>
//                   <div className="alert alert-warning mt-3">
//                     <i className="bi bi-exclamation-triangle me-2"></i>
//                     We always use a secure connection when collecting personal financial information from you. However, no data transmission over the Internet can be guaranteed to be 100% secure.
//                   </div>
//                 </div>

//                 {/* Account Security Section */}
//                 <div className="section">
//                   <h3 className="h5 fw-bold mt-4 mb-3">Account Security</h3>
//                   <p>
//                     Your Shriraj Property Solutions account is password-protected and you are free to create further users and user groups to whom you shall assign Usernames and Passwords, so only you and those you designate can access it and view the member information relevant to your account. Ultimately, you are responsible for maintaining the secrecy of your passwords and any account information.
//                   </p>
//                 </div>

//                 {/* Agreement Section */}
//                 <div className="section">
//                   <h3 className="h5 fw-bold mt-4 mb-3">Agreement to Terms</h3>
//                   <p>
//                     By using any of Shriraj Property Solutions's Services, or by dealing with a merchant using Shriraj Property Solutions's Services, you are agreeing to the terms of this Privacy Policy and, as applicable, the Shriraj Property Solutions Terms of Service.
//                   </p>
//                 </div>

//                 {/* Policy Updates Section */}
//                 <div className="section">
//                   <h3 className="h5 fw-bold mt-4 mb-3">Policy Updates</h3>
//                   <p>
//                     We may update this Privacy Policy from time to time in order to reflect, for example, changes to our privacy practices or for other operational, legal, or regulatory reasons. If we make material changes to this Privacy Policy, we will give you notice of such changes by posting the revised policy on this Website, and where appropriate, by other means. By continuing to use this Website or the Support Service after these changes are posted, you agree to the revised policy.
//                   </p>
//                 </div>

//                 {/* Information from Merchants Section */}
//                 <div className="section highlight-box">
//                   <h3 className="h5 fw-bold mt-4 mb-3">Information from Merchants</h3>
//                   <p>
//                     <strong>Privacy matters!</strong> If you are a merchant, your customers need to understand how you (and how Shriraj Property Solutions) collects and processes their personal information. Accordingly, if you use the Services, you agree to post an up-to-date and accurate privacy policy on your storefront that complies with the laws applicable to your business.
//                   </p>
//                   <p className="mt-2">
//                     You also agree to obtain consent from your customers for the use and access to their personal information by Shriraj Property Solutions and other third parties. Additionally, if you are collecting any sensitive personal information from your customers (including information relating to medical or health conditions, racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership or sexuality), you agree to obtain affirmative, express consent from your customers for the use and access of sensitive personal information by Shriraj Property Solutions and other third parties.
//                   </p>
//                 </div>

//                 {/* Additional Sections from Original Code */}
//                 <div className="section highlight-box">
//                   <p className="mb-2">
//                     <strong>Data Access & Correction:</strong> If you wish to access, verify, correct, complete, update or erase any of your Personal Data collected through the Platforms or Services, you may write to us at <a href="mailto:shrirajteam@gmail.com" className="text-primary">shrirajteam@gmail.com</a>.
//                   </p>
//                 </div>

//                 <div className="section highlight-box">
//                   <p>
//                     <strong>Consent Withdrawal:</strong> You may withdraw your consent for any or all processing of your Personal Data by contacting <a href="mailto:shrirajteam@gmail.com" className="text-primary">shrirajteam@gmail.com</a>. Do note however, that the Company reserves the right to refuse to provide you access to the Platform and Services in circumstances where such Personal Data is essential to the provision of the Platform and Services.
//                   </p>
//                 </div>

//                 <div className="section">
//                   <h3 className="h5 fw-bold mt-4 mb-3">Communications</h3>
//                   <p>
//                     We (or our service providers or partners) may communicate with you through voice calls, text messages, emails, Platform notifications, or other means. The communication may relate to:
//                   </p>
//                   <ul className="styled-list">
//                     <li>Your purchases, payments, or other messages related to your use of the Platform</li>
//                     <li>Offers or promotions about our Platform, new features or Services</li>
//                   </ul>
//                   <p className="mt-2">
//                     You may opt out of receiving promotional offers by writing to our grievance officer. We may still need to send you non-promotional communication (information about the Platforms and Services).
//                   </p>
//                 </div>

//                 <div className="section warning-box">
//                   <h3 className="h5 fw-bold mb-3">Third-Party Links & Advertisements</h3>
//                   <p>
//                     Please note that the Platform sometimes displays advertisements or contains links to third-party websites that may collect personal data, and those are not governed by this Policy. The Company will not be responsible for the privacy practices of such websites. The Company recommends that you review the privacy policy of each third-party site linked from the Platform to determine their use of your Personal Data.
//                   </p>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="privacy-footer sticky-bottom p-3 border-top bg-white">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <button 
//                     className="btn btn-outline-secondary"
//                     onClick={() => navigate('/login')}
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     className="btn btn-primary"
//                     onClick={() => navigate('/login')}
//                   >
//                     <i className="bi bi-check-circle me-2"></i>
//                     I have read and accept the Privacy Policy
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//       <Footer/>

//         </>
//   );
// };

// export default PrivacyPolicy;





// import React from 'react';

// const PrivacyPolicy = () => {
//   return (
//     <>
//       {/* Hero Section */}
//       <section className="bg-light py-5">
//         <div className="container">
//           <h1 className="display-4 fw-bold text-dark mb-3">Privacy Policy</h1>
//           <p className="text-muted fs-5">Last updated: January 7, 2025</p>
//         </div>
//       </section>

//       {/* Content Section */}
//       <section className="py-5 bg-white">
//         <div className="container" style={{ maxWidth: '800px' }}>
//           {/* Introduction */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">1. Introduction</h2>
//             <p className="text-muted lh-lg">
//               Welcome to PropEstate. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
//             </p>
//           </div>

//           {/* Information We Collect */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">2. Information We Collect</h2>
//             <p className="text-muted lh-lg mb-3">We may collect the following types of information:</p>
//             <ul className="text-muted">
//               <li className="mb-2">Personal identification information (name, email, phone number)</li>
//               <li className="mb-2">Property search preferences and saved listings</li>
//               <li className="mb-2">Communication history with our agents</li>
//               <li className="mb-2">Financial information for mortgage pre-approval</li>
//               <li className="mb-2">Device and browser information</li>
//               <li className="mb-2">Location data when using property search features</li>
//             </ul>
//           </div>

//           {/* How We Use Information */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">3. How We Use Your Information</h2>
//             <p className="text-muted lh-lg mb-3">We use the collected information for various purposes:</p>
//             <ul className="text-muted">
//               <li className="mb-2">To provide and maintain our services</li>
//               <li className="mb-2">To match you with suitable properties</li>
//               <li className="mb-2">To connect you with real estate professionals</li>
//               <li className="mb-2">To send you property alerts and market updates</li>
//               <li className="mb-2">To improve our website and services</li>
//               <li className="mb-2">To comply with legal obligations</li>
//             </ul>
//           </div>

//           {/* Information Sharing */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">4. Information Sharing</h2>
//             <p className="text-muted lh-lg mb-3">We may share your information with:</p>
//             <ul className="text-muted">
//               <li className="mb-2">Real estate agents and brokers you choose to contact</li>
//               <li className="mb-2">Mortgage lenders for pre-approval services</li>
//               <li className="mb-2">Service providers who assist in our operations</li>
//               <li className="mb-2">Legal authorities when required by law</li>
//             </ul>
//             <p className="text-muted lh-lg mt-3">
//               We do not sell your personal information to third parties for marketing purposes.
//             </p>
//           </div>

//           {/* Data Security */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">5. Data Security</h2>
//             <p className="text-muted lh-lg">
//               We implement appropriate security measures to protect your personal information. This includes encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
//             </p>
//           </div>

//           {/* Cookies */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">6. Cookies and Tracking</h2>
//             <p className="text-muted lh-lg mb-3">We use cookies and similar technologies to:</p>
//             <ul className="text-muted">
//               <li className="mb-2">Remember your preferences and settings</li>
//               <li className="mb-2">Analyze website traffic and usage patterns</li>
//               <li className="mb-2">Personalize content and property recommendations</li>
//               <li className="mb-2">Enable social media features</li>
//             </ul>
//             <p className="text-muted lh-lg mt-3">
//               You can control cookies through your browser settings, but disabling them may affect your experience.
//             </p>
//           </div>

//           {/* Your Rights */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">7. Your Rights</h2>
//             <p className="text-muted lh-lg mb-3">You have the right to:</p>
//             <ul className="text-muted">
//               <li className="mb-2">Access your personal data we hold</li>
//               <li className="mb-2">Request correction of inaccurate data</li>
//               <li className="mb-2">Request deletion of your data</li>
//               <li className="mb-2">Opt-out of marketing communications</li>
//               <li className="mb-2">Data portability</li>
//               <li className="mb-2">Withdraw consent at any time</li>
//             </ul>
//           </div>

//           {/* Children's Privacy */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">8. Children's Privacy</h2>
//             <p className="text-muted lh-lg">
//               Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a minor, please contact us immediately.
//             </p>
//           </div>

//           {/* Changes */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">9. Changes to This Policy</h2>
//             <p className="text-muted lh-lg">
//               We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
//             </p>
//           </div>

//           {/* Contact */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">10. Contact Us</h2>
//             <p className="text-muted lh-lg">
//               If you have questions about this privacy policy or our data practices, please contact us:
//             </p>
//             <div className="bg-light rounded p-4 mt-3">
//               <p className="fw-semibold text-dark mb-1">PropEstate Privacy Team</p>
//               <p className="text-muted mb-1">123 Real Estate Blvd, Suite 100</p>
//               <p className="text-muted mb-1">New York, NY 10001</p>
//               <p className="text-muted mb-1">Email: privacy@propestate.com</p>
//               <p className="text-muted mb-0">Phone: (555) 123-4567</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default PrivacyPolicy;



import React from 'react';
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import Footer from "../Footer/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <WebsiteNavbar />
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">Privacy Policy</h1>
              
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4 p-lg-5">
                  
                  {/* Introduction */}
                  <div className="mb-5">
                    <p className="text-muted">
                      This Privacy Policy applies to the Shriraj Property Solutions Pvt. Ltd. mobile application and the website <a href="https://www.shrirajteam.com" target="_blank" rel="noopener noreferrer">www.shrirajteam.com</a>, operated by Shriraj Property Solutions Pvt. Ltd.
                    </p>
                    <p className="text-muted">
                      We, Shriraj Property Solutions Pvt. Ltd. and our affiliated companies worldwide, are committed to respecting your online privacy and recognize your need for appropriate protection and management of any personally identifiable information you share with us.
                    </p>
                    <p className="text-muted">
                      This Privacy Policy ("Policy") governs our website available at <a href="https://www.shrirajteam.com" target="_blank" rel="noopener noreferrer">www.shrirajteam.com</a> and our mobile application (collectively, the "Platform"). The Policy describes how Shriraj Property Solutions Pvt. Ltd. (hereinafter referred to as the "Company") collects, uses, discloses and transfers personal data of users while browsing the Platform or availing specific services therein (the "Services").
                    </p>
                    <p className="text-muted">
                      This Policy describes how we process personal data of all users of our Platform or Services, including buyers, renters, owners, dealers, brokers, and website visitors.
                    </p>
                  </div>

                  {/* Access & Correction */}
                  <div className="mb-5">
                    <h2 className="h4 fw-bold text-dark mb-3">
                      <i className="bi bi-pencil-square text-primary me-2"></i>
                      Access & Correction
                    </h2>
                    <p className="text-muted">
                      If you wish to access, verify, correct, complete, update or erase any of your Personal Data collected through the Platforms or Services, you may write to us at <a href="mailto:shrirajteam@gmail.com">shrirajteam@gmail.com</a>.
                    </p>
                    <p className="text-muted">
                      You may withdraw your consent for any or all processing of your Personal Data by contacting <a href="mailto:shrirajteam@gmail.com">shrirajteam@gmail.com</a>. Do note however, that the Company reserves the right to refuse to provide you access to the Platform and Services in circumstances where such Personal Data is essential to the provision of the Platform and Services.
                    </p>
                  </div>

                  {/* Communications */}
                  <div className="mb-5">
                    <h2 className="h4 fw-bold text-dark mb-3">
                      <i className="bi bi-chat-dots text-primary me-2"></i>
                      Communications
                    </h2>
                    <p className="text-muted">We (or our service providers or partners) may communicate with you through voice calls, text messages, emails, Platform notifications, or other means. The communication may relate to:</p>
                    <ul className="text-muted">
                      <li>Your purchases, payments, or other messages related to your use of the Platform</li>
                      <li>Offers or promotions about our Platform, new features or Services</li>
                    </ul>
                    <p className="text-muted">
                      You may opt out of receiving promotional offers by writing to our grievance officer. We may still need to send you non-promotional communication (information about the Platforms and Services).
                    </p>
                  </div>

                  {/* Third-Party Links */}
                  <div className="mb-5">
                    <h2 className="h4 fw-bold text-dark mb-3">
                      <i className="bi bi-link-45deg text-primary me-2"></i>
                      Third-Party Links
                    </h2>
                    <p className="text-muted">
                      Please note that the Platform sometimes displays advertisements or contains links to third-party websites that may collect personal data, and those are not governed by this Policy. The Company will not be responsible for the privacy practices of such websites. The Company recommends that you review the privacy policy of each third-party site linked from the Platform to determine their use of your Personal Data.
                    </p>
                  </div>

                  {/* Policy Updates */}
                  <div className="mb-5">
                    <h2 className="h4 fw-bold text-dark mb-3">
                      <i className="bi bi-arrow-repeat text-primary me-2"></i>
                      Policy Updates
                    </h2>
                    <p className="text-muted">
                      The Platform reserves the right to update, change or modify this Policy at any time. The Policy shall come into effect from the date of such update, change or modification.
                    </p>
                  </div>

                  {/* Information We Collect */}
                  <div className="mb-5">
                    <h2 className="h4 fw-bold text-dark mb-3">
                      <i className="bi bi-collection text-primary me-2"></i>
                      Information We Collect
                    </h2>
                    <p className="text-muted">We may collect and process the following categories of personal information when you use our Platform:</p>
                    <ul className="text-muted">
                      <li>Personal information such as name, email address, phone number</li>
                      <li>Location information such as city, area, and property location</li>
                      <li>Property-related information including property details, images, pricing, and descriptions submitted by users</li>
                      <li>Account information such as login credentials</li>
                      <li>Communications shared with us via email, phone, or in-app support</li>
                      <li>Technical information such as device information and log data for improving app performance</li>
                    </ul>
                  </div>

                  {/* How We Use Your Information */}
                  <div className="mb-5">
                    <h2 className="h4 fw-bold text-dark mb-3">
                      <i className="bi bi-gear text-primary me-2"></i>
                      How We Use Your Information
                    </h2>
                    <p className="text-muted">We use the collected information to:</p>
                    <ul className="text-muted">
                      <li>Provide and operate our property buy, sell, and rent services</li>
                      <li>Enable users to post, manage, and view property listings</li>
                      <li>Facilitate communication between buyers, sellers, renters, and agents</li>
                      <li>Improve our Platform, features, and user experience</li>
                      <li>Respond to user queries, support requests, and complaints</li>
                      <li>Send service-related notifications and important updates</li>
                    </ul>
                  </div>

                  {/* Data Security */}
                  <div className="mb-5">
                    <h2 className="h4 fw-bold text-dark mb-3">
                      <i className="bi bi-shield-lock text-primary me-2"></i>
                      Data Security
                    </h2>
                    <p className="text-muted">
                      We implement reasonable security practices and procedures, including the use of secure servers and encryption in transit, to protect personal data from unauthorized access, disclosure, alteration, or destruction.
                    </p>
                  </div>

                  {/* Account Deletion */}
                  <div className="mb-5">
                    <h2 className="h4 fw-bold text-dark mb-3">
                      <i className="bi bi-trash text-primary me-2"></i>
                      Account Deletion and Data Removal
                    </h2>
                    <p className="text-muted">
                      Users may request deletion of their account and associated personal data at any time by emailing us at <a href="mailto:shrirajteam@gmail.com">shrirajteam@gmail.com</a> with the subject line "Account Deletion Request".
                    </p>
                    <p className="text-muted">
                      Upon receiving a valid request, we will delete or anonymize the user's personal data, including profile information and property listings, within a reasonable timeframe, unless retention is required by applicable law.
                    </p>
                  </div>

                  {/* Contact */}
                  {/* <div className="bg-light rounded-3 p-4">
                    <h2 className="h5 fw-bold text-dark mb-3">
                      <i className="bi bi-envelope text-primary me-2"></i>
                      Contact Us
                    </h2>
                    <p className="text-muted mb-2">
                      For any questions or concerns regarding this Privacy Policy, please contact us at:
                    </p>
                    <p className="mb-0">
                      <strong>Email:</strong> <a href="mailto:shrirajteam@gmail.com">shrirajteam@gmail.com</a><br />
                      <strong>Website:</strong> <a href="https://www.shrirajteam.com" target="_blank" rel="noopener noreferrer">www.shrirajteam.com</a>
                    </p>
                  </div> */}

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default PrivacyPolicy;

