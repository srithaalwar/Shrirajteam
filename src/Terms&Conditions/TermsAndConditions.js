import React from 'react';
import './Terms&Conditions.css';
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
      <section className="bg text-white py-5">
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

