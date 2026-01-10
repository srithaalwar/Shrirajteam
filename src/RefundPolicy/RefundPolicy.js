// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './RefundPolicy.css';
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import Footer from "../Footer/Footer";
// const RefundPolicy = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//       <WebsiteNavbar />
//       <div className="refund-policy-container">
//         <div className="refund-policy-card">
//           {/* Fixed Header */}
//           <div className="refund-policy-header">
//             <h5 className="refund-policy-title">Refund Policy</h5>
//           </div>

//           {/* Scrollable Content */}
//           <div className="refund-policy-content">
//             <h6 className="section-title">1. Overview</h6>
//             <p className="section-text">
//               At Shriraj, we strive to provide excellent service and ensure customer satisfaction. This Refund Policy outlines the terms under which refunds may be issued.
//             </p>

//             <h6 className="section-title">2. Eligibility for Refunds</h6>
//             <ul>
//               <li>Refunds may be considered only for payments made for premium services, promotions, or listing fees.</li>
//               <li>Requests must be submitted within 30 days from the date of payment.</li>
//               <li>Refunds are not provided for transactions related to property purchases, rentals, or leases facilitated through the platform.</li>
//             </ul>

//             <h6 className="section-title">3. Process for Requesting Refunds</h6>
//             <p className="section-text">
//               To request a refund, please contact our customer support team with your payment details and reason for the refund.
//               We reserve the right to verify the claim and request additional information.
//             </p>

//             <h6 className="section-title">4. Refund Approval and Processing</h6>
//             <ul>
//               <li>The approval usually takes one or two days and once approved refund will be credited within 7-10 business days.</li>
//               <li>Refunds will be credited to the original mode of payment wherever possible.</li>
//               <li>In cases where original payment method refund is not feasible, alternate arrangements will be communicated.</li>
//             </ul>

//             <h6 className="section-title">5. Non-Refundable Items</h6>
//             <ul>
//               <li>Any payments related to third-party services, including payment gateway fees.</li>
//               <li>Fees paid to agents, brokers, or external vendors.</li>
//               <li>Any penalties, fines, or government charges.</li>
//             </ul>

//             <h6 className="section-title">6. Cancellation Policy</h6>
//             <p className="section-text">
//               Users may cancel paid services before they are rendered. Cancellation requests must be submitted in writing. Refund eligibility will be evaluated as per this policy.
//             </p>

//             <h6 className="section-title">7. Changes to Refund Policy</h6>
//             <p className="section-text">
//               Shriraj reserves the right to update this Refund Policy at any time. Changes will be communicated via email or platform notifications.
//             </p>

//             <h6 className="section-title">8. Contact Information</h6>
//             <p className="section-text">
//               For questions or concerns regarding refunds, please contact our support team through the app or email.
//             </p>
//           </div>

//           {/* Action Buttons */}
//           <div className="refund-policy-actions">
//             <button
//               className="btn btn-outline-secondary"
//               onClick={() => navigate('/login')}
//             >
//               Cancel
//             </button>
//             <button
//               className="btn btn-primary"
//               onClick={() => navigate('/login')}
//             >
//               I have read and accept the terms of service
//             </button>
//           </div>
//         </div>
//       </div>
//       <Footer/>
//     </>
//   );
// };

// export default RefundPolicy;








// import React from 'react';

// const RefundPolicy = () => {
//   return (
//     <>
//       {/* Hero Section */}
//       <section className="bg-light py-5">
//         <div className="container">
//           <h1 className="display-4 fw-bold text-dark mb-3">Refund Policy</h1>
//           <p className="text-muted fs-5">Last updated: January 7, 2025</p>
//         </div>
//       </section>

//       {/* Content Section */}
//       <section className="py-5 bg-white">
//         <div className="container" style={{ maxWidth: '800px' }}>
//           {/* Overview */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">1. Overview</h2>
//             <p className="text-muted lh-lg">
//               At PropEstate, we are committed to providing exceptional real estate services. This Refund Policy outlines the terms and conditions regarding refunds for our paid services. Please read this policy carefully before making any payment.
//             </p>
//           </div>

//           {/* Services Covered */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">2. Services Covered</h2>
//             <p className="text-muted lh-lg mb-3">This refund policy applies to the following paid services:</p>
//             <ul className="text-muted">
//               <li className="mb-2">Premium property listing packages</li>
//               <li className="mb-2">Featured listing promotions</li>
//               <li className="mb-2">Professional photography and virtual tour services</li>
//               <li className="mb-2">Market analysis reports</li>
//               <li className="mb-2">Consultation and advisory services</li>
//               <li className="mb-2">Subscription-based premium memberships</li>
//             </ul>
//           </div>

//           {/* Premium Listings */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">3. Premium Listing Refunds</h2>
//             <p className="text-muted lh-lg mb-3">For premium listing packages:</p>
//             <ul className="text-muted">
//               <li className="mb-2"><strong>Before publication:</strong> Full refund available within 24 hours of purchase</li>
//               <li className="mb-2"><strong>Within first 7 days:</strong> 75% refund if listing has not received significant engagement</li>
//               <li className="mb-2"><strong>After 7 days:</strong> No refund available as the service has been substantially delivered</li>
//               <li className="mb-2"><strong>Early termination:</strong> Prorated refund may be available for annual packages</li>
//             </ul>
//           </div>

//           {/* Photography Services */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">4. Photography & Virtual Tour Services</h2>
//             <p className="text-muted lh-lg mb-3">For professional photography and virtual tour services:</p>
//             <ul className="text-muted">
//               <li className="mb-2"><strong>Cancellation 48+ hours before:</strong> Full refund</li>
//               <li className="mb-2"><strong>Cancellation 24-48 hours before:</strong> 50% refund</li>
//               <li className="mb-2"><strong>Cancellation less than 24 hours:</strong> No refund (service provider has been scheduled)</li>
//               <li className="mb-2"><strong>After service completion:</strong> No refund unless quality issues are documented</li>
//             </ul>
//             <p className="text-muted lh-lg mt-3">
//               If you are dissatisfied with the quality of photos or virtual tours, please contact us within 48 hours of delivery. We will review your concerns and may offer a re-shoot or partial refund at our discretion.
//             </p>
//           </div>

//           {/* Subscriptions */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">5. Premium Membership Subscriptions</h2>
//             <p className="text-muted lh-lg mb-3">For subscription-based premium memberships:</p>
//             <ul className="text-muted">
//               <li className="mb-2"><strong>Monthly subscriptions:</strong> Cancel anytime; no refund for current billing period</li>
//               <li className="mb-2"><strong>Annual subscriptions:</strong> Prorated refund available within first 30 days</li>
//               <li className="mb-2"><strong>After 30 days:</strong> No refund; subscription remains active until end of billing period</li>
//               <li className="mb-2"><strong>Auto-renewal:</strong> Cancel at least 24 hours before renewal to avoid charges</li>
//             </ul>
//           </div>

//           {/* Consultation */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">6. Consultation & Advisory Services</h2>
//             <p className="text-muted lh-lg mb-3">For paid consultation and advisory services:</p>
//             <ul className="text-muted">
//               <li className="mb-2"><strong>Rescheduling:</strong> Free rescheduling up to 24 hours before appointment</li>
//               <li className="mb-2"><strong>Cancellation 24+ hours before:</strong> Full refund minus administrative fee ($25)</li>
//               <li className="mb-2"><strong>Cancellation less than 24 hours:</strong> 50% refund</li>
//               <li className="mb-2"><strong>No-show:</strong> No refund</li>
//               <li className="mb-2"><strong>Post-consultation:</strong> No refund once consultation has been completed</li>
//             </ul>
//           </div>

//           {/* Market Reports */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">7. Market Analysis Reports</h2>
//             <p className="text-muted lh-lg">
//               Market analysis reports are digital products delivered electronically. Due to the nature of digital products, refunds are only available if the report was not delivered or contains significant errors. Please contact us within 48 hours of purchase if you experience any issues.
//             </p>
//           </div>

//           {/* Non-Refundable */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">8. Non-Refundable Services</h2>
//             <p className="text-muted lh-lg mb-3">The following are generally non-refundable:</p>
//             <ul className="text-muted">
//               <li className="mb-2">Services that have been fully rendered</li>
//               <li className="mb-2">Digital products after download or access</li>
//               <li className="mb-2">Custom or personalized services</li>
//               <li className="mb-2">Third-party services arranged on your behalf</li>
//               <li className="mb-2">Promotional or discounted services</li>
//             </ul>
//           </div>

//           {/* How to Request */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">9. How to Request a Refund</h2>
//             <p className="text-muted lh-lg mb-3">To request a refund, please follow these steps:</p>
//             <ol className="text-muted">
//               <li className="mb-2">Email our support team at refunds@propestate.com</li>
//               <li className="mb-2">Include your order number and date of purchase</li>
//               <li className="mb-2">Provide a detailed explanation of your refund request</li>
//               <li className="mb-2">Attach any relevant documentation or screenshots</li>
//               <li className="mb-2">Allow 3-5 business days for our team to review your request</li>
//             </ol>
//           </div>

//           {/* Processing */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">10. Refund Processing</h2>
//             <p className="text-muted lh-lg mb-3">Once a refund is approved:</p>
//             <ul className="text-muted">
//               <li className="mb-2">Refunds will be processed to the original payment method</li>
//               <li className="mb-2">Credit card refunds: 5-10 business days</li>
//               <li className="mb-2">Bank transfers: 7-14 business days</li>
//               <li className="mb-2">PayPal/digital wallets: 3-5 business days</li>
//               <li className="mb-2">You will receive email confirmation when the refund is processed</li>
//             </ul>
//           </div>

//           {/* Disputes */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">11. Disputes and Chargebacks</h2>
//             <p className="text-muted lh-lg">
//               We encourage you to contact us directly before initiating a chargeback with your payment provider. Chargebacks may result in additional fees and suspension of your account. We are committed to resolving disputes fairly and promptly.
//             </p>
//           </div>

//           {/* Exceptions */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">12. Exceptions</h2>
//             <p className="text-muted lh-lg">
//               We reserve the right to make exceptions to this policy on a case-by-case basis. Factors we may consider include the nature of the issue, your account history, and the specific circumstances of your request. All exceptions are made at our sole discretion.
//             </p>
//           </div>

//           {/* Contact */}
//           <div className="mb-5">
//             <h2 className="h4 fw-bold text-dark mb-3">13. Contact Us</h2>
//             <p className="text-muted lh-lg">
//               If you have any questions about our Refund Policy or need assistance with a refund request, please contact us:
//             </p>
//             <div className="bg-light rounded p-4 mt-3">
//               <p className="fw-semibold text-dark mb-1">PropEstate Customer Support</p>
//               <p className="text-muted mb-1">123 Real Estate Blvd, Suite 100</p>
//               <p className="text-muted mb-1">New York, NY 10001</p>
//               <p className="text-muted mb-1">Email: refunds@propestate.com</p>
//               <p className="text-muted mb-1">Phone: (555) 123-4567</p>
//               <p className="text-muted mb-0">Support Hours: Monday - Friday, 9am - 6pm EST</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default RefundPolicy;


import React from 'react';
// import './RefundPolicy.css';
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import Footer from "../Footer/Footer";

const RefundPolicy = () => {
  const sections = [
    {
      id: 1,
      title: "Overview",
      icon: "bi-info-circle",
      content: "At Shriraj, we strive to provide excellent service and ensure customer satisfaction. This Refund Policy outlines the terms under which refunds may be issued."
    },
    {
      id: 2,
      title: "Eligibility for Refunds",
      icon: "bi-check2-circle",
      content: null,
      list: [
        "Refunds may be considered only for payments made for premium services, promotions, or listing fees.",
        "Requests must be submitted within 30 days from the date of payment.",
        "Refunds are not provided for transactions related to property purchases, rentals, or leases facilitated through the platform."
      ]
    },
    {
      id: 3,
      title: "Process for Requesting Refunds",
      icon: "bi-arrow-repeat",
      content: "To request a refund, please contact our customer support team with your payment details and reason for the refund. We reserve the right to verify the claim and request additional information."
    },
    {
      id: 4,
      title: "Refund Approval and Processing",
      icon: "bi-clock-history",
      content: null,
      list: [
        "The approval usually takes one or two days and once approved refund will be credited within 7-10 business days.",
        "Refunds will be credited to the original mode of payment wherever possible.",
        "In cases where original payment method refund is not feasible, alternate arrangements will be communicated."
      ]
    },
    {
      id: 5,
      title: "Non-Refundable Items",
      icon: "bi-x-circle",
      content: null,
      list: [
        "Any payments related to third-party services, including payment gateway fees.",
        "Fees paid to agents, brokers, or external vendors.",
        "Any penalties, fines, or government charges."
      ]
    },
    {
      id: 6,
      title: "Cancellation Policy",
      icon: "bi-calendar-x",
      content: "Users may cancel paid services before they are rendered. Cancellation requests must be submitted in writing. Refund eligibility will be evaluated as per this policy."
    },
    {
      id: 7,
      title: "Changes to Refund Policy",
      icon: "bi-pencil",
      content: "Shriraj reserves the right to update this Refund Policy at any time. Changes will be communicated via email or platform notifications."
    },
    {
      id: 8,
      title: "Contact Information",
      icon: "bi-envelope",
      content: "For questions or concerns regarding refunds, please contact our support team through the app or email at shrirajteam@gmail.com."
    }
  ];

  return (
    <div className="refund-policy-page">
      <WebsiteNavbar />
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">Refund Policy</h1>
              
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              
              

              {/* Sections */}
              <div className="row">
                {sections.map((section) => (
                  <div key={section.id} className="col-12 mb-4">
                    <div className="card shadow-sm border-0 h-100">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-start">
                          <div className="flex-shrink-0">
                            {/* <div className="bg-primary bg-opacity-10 rounded-circle p-3">
                              <i className={`bi ${section.icon} text-primary fs-4`}></i>
                            </div> */}
                          </div>
                          <div className="flex-grow-1 ms-4">
                            <h3 className="h5 fw-bold text-dark mb-3">
                              {section.id}. {section.title}
                            </h3>
                            {section.content && (
                              <p className="text-muted mb-0">{section.content}</p>
                            )}
                            {section.list && (
                              <ul className="text-muted mb-0">
                                {section.list.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Card */}
              {/* <div className="card shadow-sm border-0 bg-light mt-4">
                <div className="card-body p-4 text-center">
                  <h4 className="fw-bold text-dark mb-3">Need Help with Refunds?</h4>
                  <p className="text-muted mb-3">
                    Our support team is here to assist you with any refund-related queries.
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

export default RefundPolicy;

