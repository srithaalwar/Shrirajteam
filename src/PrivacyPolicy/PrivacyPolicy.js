import React from 'react';
import './PrivacyPolicy.css';
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import Footer from "../Footer/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <WebsiteNavbar />
      {/* Hero Section */}
      <section className="bg text-white py-5">
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

