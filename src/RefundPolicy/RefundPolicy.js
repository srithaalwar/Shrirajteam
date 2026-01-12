import React from 'react';
import './RefundPolicy.css';
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
      <section className="bg text-white py-5">
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

