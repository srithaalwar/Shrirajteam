// import React, { useState } from "react";
// import "./FAQ.css";
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import Footer from "../Footer/Footer";

// const faqs = [
 
//   {
//     question: "What is Tokenised ownership?",
//     answer: "Tokenised ownership in real estate describes an investment process wherein a number of investors join together to invest in a real estate asset so that all of them can benefit from a share of the income that the asset generates and any appreciation in the value of the property."
//   },
//   {
//     question: "What is OneShrirajrealtech app?",
//     answer: "Think of OneShrirajrealtech like Binance, but for real-world assets. While it's different from crypto, it uses the same trusted blockchain technology for transparency and security. Instead of crypto tokens, OneShrirajrealtech lets you invest in tokens that represent real assets. In simple terms, OneShrirajrealtech is a tokenization platform that allows fractional ownership of top rental properties starting at just ₹ 43,894."
//   },
//   {
//     question: "Is OneShrirajrealtech regulated?",
//     answer: "OneShrirajrealtech is regulated under Qatar Digital Assets regulations and operates with full compliance to ensure transparency, security, and trust in all tokenized real estate investments."
//   },
//   {
//     question: "How do I sign up for an account on OneShrirajrealtech?",
//     answer: "To sign up for OneShrirajrealtech, you'll need to provide personal information and documents like your passport and proof of address. This ensures compliance with KYC regulations under Qatar Digital Assets guidelines."
//   },
//   {
//     question: "What is the minimum amount I can invest in OneShrirajrealtech?",
//     answer: "The minimum investment amount is ₹ 43,894. This allows investors to own fractional shares in top rental properties."
//   },
//   {
//     question: "How does OneShrirajrealtech work?",
//     answer: "OneShrirajrealtech lets you invest in real-world assets like rental properties by owning tokens representing fractional ownership. You can invest from as low as ₹ 43,894."
//   }
// ];

// const FAQAccordion = () => {
//   const [expanded, setExpanded] = useState(null);

//   const handleChange = (index) => {
//     setExpanded(expanded === index ? null : index);
//   };

//   return (
//     <>
//       <WebsiteNavbar />
      
//       <div className="faq-section">
//         <div className="faq-header">
//           <h1 className="faq-main-title">FAQs</h1>
         
//         </div>
        
//         <div className="faqs-container container">
//           <div className="accordion" id="faqAccordion">
//             {faqs.map((faq, index) => (
//               <div key={index} className="faqs-accordion accordion-item">
//                 <h3 className="accordion-header">
//                   <button
//                     className={`accordion-button ${expanded === index ? '' : 'collapsed'}`}
//                     type="button"
//                     onClick={() => handleChange(index)}
//                     aria-expanded={expanded === index}
//                     aria-controls={`collapse${index}`}
//                   >
//                     <span className="faqs-question">
//                       {faq.question}
//                     </span>
//                     <span className="accordion-icon">
//                       {expanded === index ? (
//                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M19 13H5V11H19V13Z" fill="currentColor"/>
//                         </svg>
//                       ) : (
//                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
//                         </svg>
//                       )}
//                     </span>
//                   </button>
//                 </h3>
//                 <div
//                   id={`collapse${index}`}
//                   className={`accordion-collapse collapse ${expanded === index ? 'show' : ''}`}
//                 >
//                   <div className="accordion-body">
//                     <p className="faqs-answer mb-0">
//                       {faq.answer}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
      
//       <Footer />
//     </>
//   );
// };

// export default FAQAccordion;



// // FAQs.js - React with Bootstrap CSS
// import { useState } from "react";
// import { Link } from "react-router-dom";
// // import "./FAQ.css";
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import Footer from "../Footer/Footer";


// const faqCategories = [
//   { id: "buying", name: "Buying a Property" },
//   { id: "selling", name: "Selling a Property" },
//   { id: "renting", name: "Renting" },
//   { id: "financing", name: "Financing & Mortgages" },
//   { id: "general", name: "General Questions" },
// ];

// const faqs = [
//   {
//     category: "buying",
//     question: "How do I start the home buying process?",
//     answer: "The home buying process typically starts with getting pre-approved for a mortgage, which helps you understand your budget. Then, you can work with one of our agents to search for properties that meet your criteria.",
//   },
//   {
//     category: "buying",
//     question: "What costs should I expect when buying a home?",
//     answer: "Beyond the purchase price, buyers should budget for closing costs (typically 2-5% of the loan amount), home inspection fees ($300-500), appraisal fees ($300-600), and moving expenses.",
//   },
//   {
//     category: "buying",
//     question: "How long does it take to buy a house?",
//     answer: "The timeline varies, but on average, the process takes 30-60 days from when your offer is accepted to closing.",
//   },
//   {
//     category: "selling",
//     question: "How do I determine the right price for my home?",
//     answer: "Our agents conduct a comprehensive market analysis (CMA) that compares your home to similar properties that have recently sold in your area.",
//   },
//   {
//     category: "selling",
//     question: "What should I do to prepare my home for sale?",
//     answer: "Start with decluttering and deep cleaning. Consider minor repairs and fresh paint in neutral colors. Curb appeal matters, so maintain your landscaping.",
//   },
//   {
//     category: "renting",
//     question: "What documents do I need to rent a property?",
//     answer: "Typically, you'll need proof of income, photo ID, credit report authorization, references from previous landlords, and a completed rental application.",
//   },
//   {
//     category: "financing",
//     question: "What credit score do I need to buy a house?",
//     answer: "A credit score of 620 or higher is typically needed for conventional loans. FHA loans may accept scores as low as 580.",
//   },
//   {
//     category: "general",
//     question: "Do you offer virtual tours?",
//     answer: "Yes! We offer comprehensive virtual tours for all our listed properties including 3D walkthroughs and live virtual showings.",
//   },
// ];

// const FAQs = () => {
//   const [activeCategory, setActiveCategory] = useState("buying");
//   const [openQuestion, setOpenQuestion] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredFAQs = faqs.filter(
//     (faq) =>
//       (activeCategory === "all" || faq.category === activeCategory) &&
//       (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   return (
//     <div>
//     <WebsiteNavbar />
//       {/* Hero Section */}
//       <section className="bg-primary text-white py-5">
//         <div className="container text-center">
//           <h1 className="display-4 fw-bold mb-3">Frequently Asked Questions</h1>
          
//         </div>
//       </section>

//       {/* FAQ Content */}
//       <section className="py-5">
//         <div className="container">
//           <div className="row">
//             {/* Category Sidebar */}
//             <div className="col-lg-3 mb-4">
//               <h5 className="fw-bold mb-3">Categories</h5>
//               <div className="list-group">
//                 {faqCategories.map((category) => (
//                   <button
//                     key={category.id}
//                     onClick={() => setActiveCategory(category.id)}
//                     className={`list-group-item list-group-item-action ${
//                       activeCategory === category.id ? "active" : ""
//                     }`}
//                   >
//                     {category.name}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* FAQ List */}
//             <div className="col-lg-9">
//               {filteredFAQs.length === 0 ? (
//                 <div className="text-center py-5">
//                   <i className="bi bi-chat-dots display-1 text-muted"></i>
//                   <h4 className="mt-3">No results found</h4>
//                   <p className="text-muted">
//                     Try adjusting your search or browse a different category.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="accordion" id="faqAccordion">
//                   {filteredFAQs.map((faq, index) => (
//                     <div className="accordion-item" key={index}>
//                       <h2 className="accordion-header">
//                         <button
//                           className={`accordion-button ${
//                             openQuestion === faq.question ? "" : "collapsed"
//                           }`}
//                           type="button"
//                           onClick={() =>
//                             setOpenQuestion(
//                               openQuestion === faq.question ? null : faq.question
//                             )
//                           }
//                         >
//                           {faq.question}
//                         </button>
//                       </h2>
//                       <div
//                         className={`accordion-collapse collapse ${
//                           openQuestion === faq.question ? "show" : ""
//                         }`}
//                       >
//                         <div className="accordion-body text-muted">
//                           {faq.answer}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

      
//       <Footer />
//     </div>
//   );
// };

// export default FAQs;








import { useState } from "react";
import { Link } from "react-router-dom";
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import Footer from "../Footer/Footer";
import "./FAQ.css";

const faqCategories = [
  { id: "buying", name: "Buying a Property" },
  { id: "selling", name: "Selling a Property" },
  { id: "renting", name: "Renting" },
  { id: "financing", name: "Financing & Mortgages" },
  { id: "general", name: "General Questions" },
];

const faqs = [
  {
    category: "buying",
    question: "How do I start the home buying process?",
    answer: "The home buying process typically starts with getting pre-approved for a mortgage, which helps you understand your budget. Then, you can work with one of our agents to search for properties that meet your criteria. Once you find a home you love, we'll help you make an offer, negotiate terms, and guide you through closing.",
  },
  {
    category: "buying",
    question: "What costs should I expect when buying a home?",
    answer: "Beyond the purchase price, buyers should budget for closing costs (typically 2-5% of the loan amount), home inspection fees ($300-500), appraisal fees ($300-600), and moving expenses. Property taxes and homeowner's insurance will also be ongoing costs to consider.",
  },
  {
    category: "buying",
    question: "How long does it take to buy a house?",
    answer: "The timeline varies, but on average, the process takes 30-60 days from when your offer is accepted to closing. This includes time for inspections, appraisals, and mortgage processing. The home search itself can take anywhere from a few weeks to several months depending on market conditions and your criteria.",
  },
  {
    category: "selling",
    question: "How do I determine the right price for my home?",
    answer: "Our agents conduct a comprehensive market analysis (CMA) that compares your home to similar properties that have recently sold in your area. We consider factors like location, size, condition, and current market trends to recommend an optimal listing price that attracts buyers while maximizing your return.",
  },
  {
    category: "selling",
    question: "What should I do to prepare my home for sale?",
    answer: "Start with decluttering and deep cleaning. Consider minor repairs and fresh paint in neutral colors. Curb appeal matters, so maintain your landscaping. Our agents can provide a customized checklist and recommend staging options to make your home more appealing to buyers.",
  },
  {
    category: "selling",
    question: "How much commission do real estate agents charge?",
    answer: "Real estate commissions are negotiable and typically range from 5-6% of the sale price, split between the buyer's and seller's agents. Our transparent fee structure is discussed upfront, and we work hard to ensure you receive maximum value for our services.",
  },
  {
    category: "renting",
    question: "What documents do I need to rent a property?",
    answer: "Typically, you'll need proof of income (pay stubs or employment letter), photo ID, credit report authorization, references from previous landlords, and a completed rental application. Some landlords may also require bank statements or a co-signer.",
  },
  {
    category: "renting",
    question: "How much rent can I afford?",
    answer: "A general rule is that your monthly rent should not exceed 30% of your gross monthly income. However, this can vary based on your other expenses and financial obligations. We can help you find properties within your comfortable budget range.",
  },
  {
    category: "financing",
    question: "What credit score do I need to buy a house?",
    answer: "While requirements vary by lender and loan type, a credit score of 620 or higher is typically needed for conventional loans. FHA loans may accept scores as low as 580. Higher scores generally qualify you for better interest rates and loan terms.",
  },
  {
    category: "financing",
    question: "How much down payment do I need?",
    answer: "Down payment requirements vary by loan type. Conventional loans typically require 3-20%, FHA loans require 3.5%, and VA/USDA loans may offer 0% down options for qualified buyers. A larger down payment can reduce your monthly payments and eliminate private mortgage insurance (PMI).",
  },
  {
    category: "general",
    question: "Do you offer virtual tours?",
    answer: "Yes! We offer comprehensive virtual tours for all our listed properties. These include 3D walkthroughs, high-quality video tours, and live virtual showings with our agents. This allows you to explore properties from anywhere at any time.",
  },
  {
    category: "general",
    question: "How do I schedule a property viewing?",
    answer: "You can schedule a viewing by clicking the 'Schedule Tour' button on any property listing, calling us directly, or filling out the contact form. Our agents are available seven days a week to accommodate your schedule.",
  },
];

const FAQs = () => {
  const [activeCategory, setActiveCategory] = useState("buying");
  const [openQuestion, setOpenQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = faqs.filter(
    (faq) =>
      (activeCategory === "all" || faq.category === activeCategory) &&
      (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
    <WebsiteNavbar />
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center py-5">
          <h1 className="display-4 fw-bold mb-3">Frequently Asked Questions</h1>
          
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {/* Category Sidebar */}
            <div className="col-lg-3">
              <div className="sticky-top" style={{ top: "100px" }}>
                <h5 className="fw-semibold mb-3">Categories</h5>
                <div className="list-group">
                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`list-group-item list-group-item-action ${
                        activeCategory === category.id ? "active" : ""
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ List */}
            <div className="col-lg-9">
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-chat-dots display-4 text-muted mb-3 d-block"></i>
                  <h5 className="fw-semibold mb-2">No results found</h5>
                  <p className="text-muted">
                    Try adjusting your search or browse a different category.
                  </p>
                </div>
              ) : (
                <div className="accordion" id="faqAccordion">
                  {filteredFAQs.map((faq, index) => (
                    <div className="accordion-item border rounded mb-3" key={index}>
                      <h2 className="accordion-header">
                        <button
                          className={`accordion-button ${openQuestion === faq.question ? "" : "collapsed"}`}
                          type="button"
                          onClick={() =>
                            setOpenQuestion(openQuestion === faq.question ? null : faq.question)
                          }
                        >
                          <span className="fw-semibold">{faq.question}</span>
                        </button>
                      </h2>
                      <div
                        className={`accordion-collapse collapse ${openQuestion === faq.question ? "show" : ""}`}
                      >
                        <div className="accordion-body text-muted">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default FAQs;

