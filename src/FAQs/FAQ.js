import React, { useState } from "react";
import "./FAQ.css";
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import Footer from "../Footer/Footer";

const faqs = [
 
  {
    question: "What is Tokenised ownership?",
    answer: "Tokenised ownership in real estate describes an investment process wherein a number of investors join together to invest in a real estate asset so that all of them can benefit from a share of the income that the asset generates and any appreciation in the value of the property."
  },
  {
    question: "What is OneShrirajrealtech app?",
    answer: "Think of OneShrirajrealtech like Binance, but for real-world assets. While it's different from crypto, it uses the same trusted blockchain technology for transparency and security. Instead of crypto tokens, OneShrirajrealtech lets you invest in tokens that represent real assets. In simple terms, OneShrirajrealtech is a tokenization platform that allows fractional ownership of top rental properties starting at just ₹ 43,894."
  },
  {
    question: "Is OneShrirajrealtech regulated?",
    answer: "OneShrirajrealtech is regulated under Qatar Digital Assets regulations and operates with full compliance to ensure transparency, security, and trust in all tokenized real estate investments."
  },
  {
    question: "How do I sign up for an account on OneShrirajrealtech?",
    answer: "To sign up for OneShrirajrealtech, you'll need to provide personal information and documents like your passport and proof of address. This ensures compliance with KYC regulations under Qatar Digital Assets guidelines."
  },
  {
    question: "What is the minimum amount I can invest in OneShrirajrealtech?",
    answer: "The minimum investment amount is ₹ 43,894. This allows investors to own fractional shares in top rental properties."
  },
  {
    question: "How does OneShrirajrealtech work?",
    answer: "OneShrirajrealtech lets you invest in real-world assets like rental properties by owning tokens representing fractional ownership. You can invest from as low as ₹ 43,894."
  }
];

const FAQAccordion = () => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <>
      <WebsiteNavbar />
      
      <div className="faq-section">
        <div className="faq-header">
          <h1 className="faq-main-title">FAQs</h1>
         
        </div>
        
        <div className="faqs-container container">
          <div className="accordion" id="faqAccordion">
            {faqs.map((faq, index) => (
              <div key={index} className="faqs-accordion accordion-item">
                <h3 className="accordion-header">
                  <button
                    className={`accordion-button ${expanded === index ? '' : 'collapsed'}`}
                    type="button"
                    onClick={() => handleChange(index)}
                    aria-expanded={expanded === index}
                    aria-controls={`collapse${index}`}
                  >
                    <span className="faqs-question">
                      {faq.question}
                    </span>
                    <span className="accordion-icon">
                      {expanded === index ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 13H5V11H19V13Z" fill="currentColor"/>
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
                        </svg>
                      )}
                    </span>
                  </button>
                </h3>
                <div
                  id={`collapse${index}`}
                  className={`accordion-collapse collapse ${expanded === index ? 'show' : ''}`}
                >
                  <div className="accordion-body">
                    <p className="faqs-answer mb-0">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default FAQAccordion;