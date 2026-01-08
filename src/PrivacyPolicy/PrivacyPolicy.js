import React from 'react';
import './PrivacyPolicy.css';
import { useNavigate } from 'react-router-dom';
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import Footer from "../Footer/Footer";
const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
          <>
      <WebsiteNavbar />
    <div className="privacy-policy-container">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="privacy-card shadow-lg">
              {/* Header */}
              <div className="privacy-header sticky-top">
                <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                  <h1 className="h4 mb-0 fw-bold text-dark">Privacy Policy</h1>
                  <span className="text-muted small">Last Updated: January 7, 2025</span>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="privacy-content p-4">
                {/* Breadcrumb */}
                <nav aria-label="breadcrumb" className="mb-4">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#" className="text-decoration-none text-muted">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Privacy Policy</li>
                  </ol>
                </nav>

                {/* Introduction Section */}
                <div className="section">
                  <h2 className="h3 fw-bold mb-3">Introduction</h2>
                  <p className="lead mb-4">
                    Welcome to Shriraj Property Solutions!
                  </p>
                  <p>
                    Shriraj Property Solutions collects e-mail addresses and other contact details of people who register at our website and send us an e-mail. The information we collect is not shared with or sold to others except under the certain circumstances and which your use of the Service is deemed to provide to us a valid consent to disclose the following:
                  </p>
                  <ul className="styled-list">
                    <li>In order to investigate, prevent, or take action regarding illegal activities</li>
                    <li>Suspected fraud</li>
                    <li>Situations involving potential threats to the physical safety of any person</li>
                    <li>Violations of Shriraj Property Solutions's terms of use</li>
                    <li>As otherwise required by law</li>
                  </ul>
                </div>

                {/* Information Sharing Section */}
                <div className="section">
                  <h3 className="h5 fw-bold mt-4 mb-3">Information Sharing</h3>
                  <p>
                    We share information about our Members with third parties, such as advertisers or partners, for marketing and promotional purposes. However, except as otherwise Shriraj Property Solutions does not rent, sell, or share personal information about you with other companies!
                  </p>
                </div>

                {/* How We Use Information Section */}
                <div className="section">
                  <h3 className="h5 fw-bold mt-4 mb-3">How We Use Your Information</h3>
                  <p>
                    Shriraj Property Solutions uses your information on a cumulative basis to help operate our websites and enhance our websites design, improve our content, our services and usability. We may also use the information we collect to occasionally notify you about important functionality changes to the website, new Services, and special offers.
                  </p>
                  <div className="alert alert-warning mt-3">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    We always use a secure connection when collecting personal financial information from you. However, no data transmission over the Internet can be guaranteed to be 100% secure.
                  </div>
                </div>

                {/* Account Security Section */}
                <div className="section">
                  <h3 className="h5 fw-bold mt-4 mb-3">Account Security</h3>
                  <p>
                    Your Shriraj Property Solutions account is password-protected and you are free to create further users and user groups to whom you shall assign Usernames and Passwords, so only you and those you designate can access it and view the member information relevant to your account. Ultimately, you are responsible for maintaining the secrecy of your passwords and any account information.
                  </p>
                </div>

                {/* Agreement Section */}
                <div className="section">
                  <h3 className="h5 fw-bold mt-4 mb-3">Agreement to Terms</h3>
                  <p>
                    By using any of Shriraj Property Solutions's Services, or by dealing with a merchant using Shriraj Property Solutions's Services, you are agreeing to the terms of this Privacy Policy and, as applicable, the Shriraj Property Solutions Terms of Service.
                  </p>
                </div>

                {/* Policy Updates Section */}
                <div className="section">
                  <h3 className="h5 fw-bold mt-4 mb-3">Policy Updates</h3>
                  <p>
                    We may update this Privacy Policy from time to time in order to reflect, for example, changes to our privacy practices or for other operational, legal, or regulatory reasons. If we make material changes to this Privacy Policy, we will give you notice of such changes by posting the revised policy on this Website, and where appropriate, by other means. By continuing to use this Website or the Support Service after these changes are posted, you agree to the revised policy.
                  </p>
                </div>

                {/* Information from Merchants Section */}
                <div className="section highlight-box">
                  <h3 className="h5 fw-bold mt-4 mb-3">Information from Merchants</h3>
                  <p>
                    <strong>Privacy matters!</strong> If you are a merchant, your customers need to understand how you (and how Shriraj Property Solutions) collects and processes their personal information. Accordingly, if you use the Services, you agree to post an up-to-date and accurate privacy policy on your storefront that complies with the laws applicable to your business.
                  </p>
                  <p className="mt-2">
                    You also agree to obtain consent from your customers for the use and access to their personal information by Shriraj Property Solutions and other third parties. Additionally, if you are collecting any sensitive personal information from your customers (including information relating to medical or health conditions, racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership or sexuality), you agree to obtain affirmative, express consent from your customers for the use and access of sensitive personal information by Shriraj Property Solutions and other third parties.
                  </p>
                </div>

                {/* Additional Sections from Original Code */}
                <div className="section highlight-box">
                  <p className="mb-2">
                    <strong>Data Access & Correction:</strong> If you wish to access, verify, correct, complete, update or erase any of your Personal Data collected through the Platforms or Services, you may write to us at <a href="mailto:shrirajteam@gmail.com" className="text-primary">shrirajteam@gmail.com</a>.
                  </p>
                </div>

                <div className="section highlight-box">
                  <p>
                    <strong>Consent Withdrawal:</strong> You may withdraw your consent for any or all processing of your Personal Data by contacting <a href="mailto:shrirajteam@gmail.com" className="text-primary">shrirajteam@gmail.com</a>. Do note however, that the Company reserves the right to refuse to provide you access to the Platform and Services in circumstances where such Personal Data is essential to the provision of the Platform and Services.
                  </p>
                </div>

                <div className="section">
                  <h3 className="h5 fw-bold mt-4 mb-3">Communications</h3>
                  <p>
                    We (or our service providers or partners) may communicate with you through voice calls, text messages, emails, Platform notifications, or other means. The communication may relate to:
                  </p>
                  <ul className="styled-list">
                    <li>Your purchases, payments, or other messages related to your use of the Platform</li>
                    <li>Offers or promotions about our Platform, new features or Services</li>
                  </ul>
                  <p className="mt-2">
                    You may opt out of receiving promotional offers by writing to our grievance officer. We may still need to send you non-promotional communication (information about the Platforms and Services).
                  </p>
                </div>

                <div className="section warning-box">
                  <h3 className="h5 fw-bold mb-3">Third-Party Links & Advertisements</h3>
                  <p>
                    Please note that the Platform sometimes displays advertisements or contains links to third-party websites that may collect personal data, and those are not governed by this Policy. The Company will not be responsible for the privacy practices of such websites. The Company recommends that you review the privacy policy of each third-party site linked from the Platform to determine their use of your Personal Data.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="privacy-footer sticky-bottom p-3 border-top bg-white">
                <div className="d-flex justify-content-between align-items-center">
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/login')}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/login')}
                  >
                    <i className="bi bi-check-circle me-2"></i>
                    I have read and accept the Privacy Policy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <Footer/>

        </>
  );
};

export default PrivacyPolicy;