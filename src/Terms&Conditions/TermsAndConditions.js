import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Terms&Conditions.css';
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import Footer from "../Footer/Footer";
const TermsAndConditions = () => {
    const navigate = useNavigate();

    return (
        <>
      <WebsiteNavbar />


            <div className="terms-container">
                <div className="terms-card">
                    {/* Fixed Header */}
                    <div className="terms-header">
                        <h5 className="terms-title">Terms and Conditions</h5>
                    </div>

                    {/* Scrollable Content */}
                    <div className="terms-content">
                        <h6 className="section-title">1. Acceptance of Terms</h6>
                        <p className="section-text">
                            By accessing our website (www.shrirajteam.com) or using our mobile application (collectively referred to as the "Platform"), you agree to the terms laid out by Shriraj Property Solutions Pvt. Ltd. and its affiliated companies.
                        </p>

                        <h6 className="section-title">2. Non-Refundable Payments</h6>
                        <p className="section-text">
                            The user agrees that the service fee and registration fee deposited through our Platform will not be refunded under any circumstances.
                        </p>

                        <h6 className="section-title">3. Communication Consent</h6>
                        <p className="section-text">
                            We (or our service providers/partners) may communicate with you via voice calls, SMS, emails, or Platform notifications regarding transactions or promotional content. You may opt out of promotional communications by contacting our grievance officer. Non-promotional messages may still be sent.
                        </p>

                        <h6 className="section-title">4. Accuracy of Property Information</h6>
                        <p className="section-text">
                            Users must enter correct and clear property details on the Platform. The Company will not be responsible for any incorrect entries made by users.
                        </p>

                        <h6 className="section-title">5. Third-Party Links</h6>
                        <p className="section-text">
                            Our Platform may display ads or contain links to third-party websites that may collect personal data. These sites are not governed by our terms, and the Company is not responsible for their practices. Users are advised to review the terms and policies of each linked third-party site.
                        </p>

                        <h6 className="section-title">6. Modifications to Terms</h6>
                        <p className="section-text">
                            The Platform reserves the right to update, change, or modify these Terms and Conditions at any time. Continued use of the Platform indicates acceptance of such updates.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="terms-actions">
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
                            I have read and accept the terms of service
                        </button>
                    </div>
                </div>
            </div>
  <Footer/>

        </>
    );
};

export default TermsAndConditions;