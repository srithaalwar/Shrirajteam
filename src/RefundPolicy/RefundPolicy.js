import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RefundPolicy.css';
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import Footer from "../Footer/Footer";
const RefundPolicy = () => {
  const navigate = useNavigate();

  return (
    <>
      <WebsiteNavbar />
      <div className="refund-policy-container">
        <div className="refund-policy-card">
          {/* Fixed Header */}
          <div className="refund-policy-header">
            <h5 className="refund-policy-title">Refund Policy</h5>
          </div>

          {/* Scrollable Content */}
          <div className="refund-policy-content">
            <h6 className="section-title">1. Overview</h6>
            <p className="section-text">
              At Shriraj, we strive to provide excellent service and ensure customer satisfaction. This Refund Policy outlines the terms under which refunds may be issued.
            </p>

            <h6 className="section-title">2. Eligibility for Refunds</h6>
            <ul>
              <li>Refunds may be considered only for payments made for premium services, promotions, or listing fees.</li>
              <li>Requests must be submitted within 30 days from the date of payment.</li>
              <li>Refunds are not provided for transactions related to property purchases, rentals, or leases facilitated through the platform.</li>
            </ul>

            <h6 className="section-title">3. Process for Requesting Refunds</h6>
            <p className="section-text">
              To request a refund, please contact our customer support team with your payment details and reason for the refund.
              We reserve the right to verify the claim and request additional information.
            </p>

            <h6 className="section-title">4. Refund Approval and Processing</h6>
            <ul>
              <li>The approval usually takes one or two days and once approved refund will be credited within 7-10 business days.</li>
              <li>Refunds will be credited to the original mode of payment wherever possible.</li>
              <li>In cases where original payment method refund is not feasible, alternate arrangements will be communicated.</li>
            </ul>

            <h6 className="section-title">5. Non-Refundable Items</h6>
            <ul>
              <li>Any payments related to third-party services, including payment gateway fees.</li>
              <li>Fees paid to agents, brokers, or external vendors.</li>
              <li>Any penalties, fines, or government charges.</li>
            </ul>

            <h6 className="section-title">6. Cancellation Policy</h6>
            <p className="section-text">
              Users may cancel paid services before they are rendered. Cancellation requests must be submitted in writing. Refund eligibility will be evaluated as per this policy.
            </p>

            <h6 className="section-title">7. Changes to Refund Policy</h6>
            <p className="section-text">
              Shriraj reserves the right to update this Refund Policy at any time. Changes will be communicated via email or platform notifications.
            </p>

            <h6 className="section-title">8. Contact Information</h6>
            <p className="section-text">
              For questions or concerns regarding refunds, please contact our support team through the app or email.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="refund-policy-actions">
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

export default RefundPolicy;