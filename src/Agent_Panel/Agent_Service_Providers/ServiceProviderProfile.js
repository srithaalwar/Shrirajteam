// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './ServiceProviderProfile.css';
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";

// const ServiceProviderProfile = () => {
//   const [providersData, setProvidersData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const apiUrl = 'https://test.shrirajteam.com:85/service-providers/';
    
//     fetch(apiUrl)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('API Response:', data);
//         // Display ALL results without any filtering
//         if (data.results && data.results.length > 0) {
//           setProvidersData(data.results);
//         } else {
//           setError('No service provider data found');
//         }
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Fetch error:', err);
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   // Helper function to render star rating
//   const renderStars = (rating = 5.0) => {
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;
//     const stars = [];
    
//     for (let i = 1; i <= 5; i++) {
//       if (i <= fullStars) {
//         stars.push(<span key={i} className="star filled">★</span>);
//       } else if (hasHalfStar && i === fullStars + 1) {
//         stars.push(<span key={i} className="star half">★</span>);
//       } else {
//         stars.push(<span key={i} className="star">☆</span>);
//       }
//     }
//     return stars;
//   };

//   if (loading) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="alert alert-danger m-5" role="alert">
//           <strong>Error:</strong> {error}
//         </div>
//       </>
//     );
//   }

//   if (providersData.length === 0) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="alert alert-warning m-5" role="alert">
//           No service providers available
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <AgentNavbar />
//       <div className="container py-4 mt-2">
//         <div className="mb-4">
//           <h2 className="fw-bold" style={{ color: '#2c3e50' }}>Service Providers</h2>
//           <p className="text-secondary">Showing {providersData.length} provider(s)</p>
//         </div>
        
//         <div className="row g-4">
//           {providersData.map((provider) => (
//             <div key={provider.provider_id} className="col-12">
//               <div className="card shadow-lg border-0 rounded-4 overflow-hidden provider-card">
//                 <div className="card-body p-4 p-lg-5">
                  
//                   {/* Header Section with Business Name and Rating */}
//                   <div className="d-flex flex-wrap justify-content-between align-items-start mb-4">
//                     <div className="flex-grow-1">
//                       <h3 className="mb-2 fw-bold" style={{ color: '#2c3e50' }}>
//                         {provider.business_name || 'Service Provider'}
//                       </h3>
//                       <div className="d-flex align-items-center flex-wrap gap-3 mb-2">
//                         <div className="d-flex align-items-center gap-1 rating-stars">
//                           {renderStars(5.0)}
//                         </div>
//                         <span className="fw-semibold fs-5 text-dark">5.0</span>
//                         <span className="text-secondary">★ 154 Ratings</span>
//                         <span className="badge bg-success text-white px-3 py-2 rounded-pill fw-normal">
//                           <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-check-circle-fill me-1" viewBox="0 0 16 16">
//                             <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
//                           </svg>
//                           Verified
//                         </span>
//                         <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-normal">
//                           ⭐ Top Rated
//                         </span>
//                       </div>
//                     </div>
                    
//                     {/* Profile photo if available */}
//                     {provider.photo && (
//                       <img 
//                         src={`https://test.shrirajteam.com:85${provider.photo}`} 
//                         alt={provider.business_name} 
//                         className="rounded-circle border shadow-sm"
//                         style={{ width: '80px', height: '80px', objectFit: 'cover' }}
//                         onError={(e) => { e.target.style.display = 'none'; }}
//                       />
//                     )}
//                   </div>

//                   {/* Location Section */}
//                   <div className="mb-3 d-flex align-items-center gap-2 text-secondary">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#dc3545" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
//                       <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
//                     </svg>
//                     <span>{provider.address}, {provider.city} - {provider.pin_code}</span>
//                   </div>
                  
//                   <div className="mb-4 d-flex align-items-center gap-2 text-secondary">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6c757d" className="bi bi-briefcase-fill" viewBox="0 0 16 16">
//                       <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3h-4v-.5a.5.5 0 0 1 .5-.5"/>
//                       <path d="M0 7.616v6.884A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V7.616l-7.614 2.03a1.5 1.5 0 0 1-.772 0z"/>
//                     </svg>
//                     <span>Service Area: {provider.service_area}</span>
//                   </div>

//                   {/* Open until timing */}
//                   <div className="mb-4 p-3 bg-light rounded-3 d-flex align-items-center gap-2">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#198754" className="bi bi-clock-history" viewBox="0 0 16 16">
//                       <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.868a7.5 7.5 0 0 1 .47.306zm1.09 1.07a7 7 0 0 0-.519-.458l.634-.772a7.5 7.5 0 0 1 .547.475zM14 3.658a7 7 0 0 0-.391-.476l.75-.661a7.5 7.5 0 0 1 .416.506zM14.5 5.5a7 7 0 0 0-.126-.613l.979-.206q.078.397.12.806zM15 7.5q0-.382-.032-.755l1 .067Q16 7 16 7.5z"/>
//                       <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
//                       <path d="M8 4.466V8a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 1 0 .6-.8L9 7.666V4.466a.5.5 0 0 0-1 0"/>
//                     </svg>
//                     <span className="fw-semibold fs-5 text-success">Open until 12:30 am</span>
//                     <span className="text-muted ms-auto">⭐ Available for service</span>
//                   </div>

//                   {/* Contact & Action Buttons */}
//                   <div className="row g-3 mb-5">
//                     <div className="col-md-3 col-sm-6">
//                       <a href={`tel:${provider.mobile_number}`} className="btn btn-outline-primary w-100 py-3 rounded-pill d-flex align-items-center justify-content-center gap-2 fw-semibold">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
//                           <path d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.61l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.01c-.363-1.03-.038-2.137.702-2.877z"/>
//                         </svg>
//                         Call Now
//                       </a>
//                     </div>
//                     <div className="col-md-3 col-sm-6">
//                       <a href={`https://wa.me/${provider.mobile_number}`} target="_blank" rel="noopener noreferrer" className="btn btn-success w-100 py-3 rounded-pill d-flex align-items-center justify-content-center gap-2 fw-semibold">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
//                           <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.644-.182-.065-.315-.099-.445.099-.133.197-.513.644-.628.775-.114.133-.232.148-.43.05-.197-.1-.834-.308-1.588-.983a5.98 5.98 0 0 1-1.102-1.367c-.115-.165-.012-.253.087-.335s.197-.165.296-.264c.1-.099.133-.165.198-.276s.033-.207-.017-.29c-.05-.083-.445-1.075-.61-1.472-.16-.39-.323-.337-.445-.343a9 9 0 0 0-.38-.008.73.73 0 0 0-.528.248c-.182.198-.694.678-.694 1.654s.71 1.916.81 2.049c.099.133 1.394 2.132 3.383 2.992.472.204.84.326 1.129.417.474.15.905.128 1.246.078.38-.056 1.17-.478 1.335-.94.165-.462.165-.858.116-.94-.05-.082-.182-.133-.38-.232"/>
//                         </svg>
//                         WhatsApp
//                       </a>
//                     </div>
//                     <div className="col-md-3 col-sm-6">
//                       <a href={`mailto:${provider.email}`} className="btn btn-outline-secondary w-100 py-3 rounded-pill d-flex align-items-center justify-content-center gap-2 fw-semibold">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
//                           <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
//                         </svg>
//                         Send Enquiry
//                       </a>
//                     </div>
//                     <div className="col-md-3 col-sm-6">
//                       <div className="btn btn-info text-white w-100 py-3 rounded-pill d-flex align-items-center justify-content-center gap-2 fw-semibold" style={{ cursor: 'default', opacity: 0.9 }}>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-chat-dots-fill" viewBox="0 0 16 16">
//                           <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
//                         </svg>
//                         Responds in 30 Mins
//                       </div>
//                     </div>
//                   </div>

//                   {/* Additional Details from API */}
//                   <div className="row g-4 mt-2 pt-3 border-top">
//                     <div className="col-md-6">
//                       <div className="p-3 bg-light rounded-3 h-100">
//                         <h5 className="fw-bold mb-3" style={{ color: '#2c3e50' }}>
//                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-badge me-2" viewBox="0 0 16 16">
//                             <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
//                             <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z"/>
//                           </svg>
//                           Service Provider Details
//                         </h5>
//                         <ul className="list-unstyled mb-0">
//                           <li className="mb-3 d-flex justify-content-between">
//                             <strong className="text-secondary">Full Name:</strong>
//                             <span>{provider.full_name}</span>
//                           </li>
//                           <li className="mb-3 d-flex justify-content-between">
//                             <strong className="text-secondary">Experience:</strong>
//                             <span>{provider.experience_years} years</span>
//                           </li>
//                           <li className="mb-3 d-flex justify-content-between">
//                             <strong className="text-secondary">Skills:</strong>
//                             <span>{provider.skills || 'Not specified'}</span>
//                           </li>
//                           <li className="mb-3 d-flex justify-content-between">
//                             <strong className="text-secondary">Service Charges:</strong>
//                             <span className="fw-bold text-success">₹{provider.service_charges}</span>
//                           </li>
//                           <li className="mb-3 d-flex justify-content-between">
//                             <strong className="text-secondary">GST Number:</strong>
//                             <span>{provider.gst_number || 'Not available'}</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
                    
//                     <div className="col-md-6">
//                       <div className="p-3 bg-light rounded-3 h-100">
//                         <h5 className="fw-bold mb-3" style={{ color: '#2c3e50' }}>
//                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-bank2 me-2" viewBox="0 0 16 16">
//                             <path d="M8 0a6 6 0 0 0-6 6v6h12V6a6 6 0 0 0-6-6m2 8v1c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V8H4v6h8V8z"/>
//                             <path d="M15.5 13h-15a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1"/>
//                           </svg>
//                           Bank & Payment Details
//                         </h5>
//                         <ul className="list-unstyled mb-0">
//                           <li className="mb-3 d-flex justify-content-between">
//                             <strong className="text-secondary">Bank Name:</strong>
//                             <span>{provider.bank_name || 'Not provided'}</span>
//                           </li>
//                           <li className="mb-3 d-flex justify-content-between">
//                             <strong className="text-secondary">Account Holder:</strong>
//                             <span>{provider.account_holder_name || 'Not provided'}</span>
//                           </li>
//                           <li className="mb-3 d-flex justify-content-between">
//                             <strong className="text-secondary">UPI ID:</strong>
//                             <span>{provider.upi_id || 'Not provided'}</span>
//                           </li>
//                           <li className="mb-3 d-flex justify-content-between">
//                             <strong className="text-secondary">IFSC Code:</strong>
//                             <span>{provider.ifsc_code || 'Not provided'}</span>
//                           </li>
//                           <li className="mb-3 d-flex justify-content-between">
//                             <strong className="text-secondary">Account Number:</strong>
//                             <span>{provider.account_number ? '****' + provider.account_number.slice(-4) : 'Not provided'}</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Status Badge and Footer */}
//                   <div className="mt-4 pt-3 d-flex justify-content-between align-items-center border-top">
//                     <div>
//                       <small className="text-muted">Provider ID: {provider.provider_id}</small>
//                       <br />
//                       <small className="text-muted">Member since: {provider.created_at?.split(' ')[0]}</small>
//                     </div>
//                     <div>
//                       <span className={`badge ${provider.status === 'Pending' ? 'bg-warning text-dark' : 'bg-success'} px-4 py-2 rounded-pill fs-6`}>
//                         {provider.status === 'Pending' ? '⏳ Pending Verification' : '✓ Verified'}
//                       </span>
//                     </div>
//                   </div>
                  
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ServiceProviderProfile;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft } from 'lucide-react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './ServiceProviderProfile.css';
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";

// const ServiceProviderProfile = () => {
//   const navigate = useNavigate();
//   const [providersData, setProvidersData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to go back to previous page
//   const handleGoBack = () => {
//     navigate(-1); // This goes back to the previous page in history
//   };

//   useEffect(() => {
//     const apiUrl = 'https://test.shrirajteam.com:85/service-providers/';
    
//     fetch(apiUrl)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('API Response:', data);
//         if (data.results && data.results.length > 0) {
//           setProvidersData(data.results);
//         } else {
//           setError('No service provider data found');
//         }
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Fetch error:', err);
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   // Helper function to render star rating
//   const renderStars = (rating = 5.0) => {
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;
//     const stars = [];
    
//     for (let i = 1; i <= 5; i++) {
//       if (i <= fullStars) {
//         stars.push(<span key={i} className="star filled">★</span>);
//       } else if (hasHalfStar && i === fullStars + 1) {
//         stars.push(<span key={i} className="star half">★</span>);
//       } else {
//         stars.push(<span key={i} className="star">☆</span>);
//       }
//     }
//     return stars;
//   };

//   if (loading) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="abpc-main-header">
//           <button className="abpc-back-desktop" onClick={handleGoBack}>
//             <ArrowLeft size={17} /><span>Go Back</span>
//           </button>
//         </div>
//         <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="abpc-main-header">
//           <button className="abpc-back-desktop" onClick={handleGoBack}>
//             <ArrowLeft size={17} /><span>Go Back</span>
//           </button>
//         </div>
//         <div className="alert alert-danger m-5" role="alert">
//           <strong>Error:</strong> {error}
//         </div>
//       </>
//     );
//   }

//   if (providersData.length === 0) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="abpc-main-header">
//           <button className="abpc-back-desktop" onClick={handleGoBack}>
//             <ArrowLeft size={17} /><span>Go Back</span>
//           </button>
//         </div>
//         <div className="alert alert-warning m-5" role="alert">
//           No service providers available
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <AgentNavbar />
//       <div className="container py-4 mt-2">
//         {/* Back Button Header */}
//         <div className="abpc-main-header mb-4">
//           <button className="abpc-back-desktop" onClick={handleGoBack}>
//             <ArrowLeft size={17} /><span>Go Back</span>
//           </button>
//         </div>
        
//         <div className="mb-4">
//           <h2 className="fw-bold" style={{ color: '#2c3e50' }}>Service Providers</h2>
//           <p className="text-secondary">Showing {providersData.length} provider(s)</p>
//         </div>
        
//         <div className="row g-4">
//           {providersData.map((provider) => (
//             <div key={provider.provider_id} className="col-12">
//               <div className="card shadow-lg border-0 rounded-4 overflow-hidden provider-card">
//                 <div className="card-body p-4 p-lg-5">
                  
//                   {/* Header Section with Business Name and Rating */}
//                   <div className="d-flex flex-wrap justify-content-between align-items-start mb-4">
//                     <div className="flex-grow-1">
//                       <h3 className="mb-2 fw-bold" style={{ color: '#2c3e50' }}>
//                         {provider.business_name || 'Service Provider'}
//                       </h3>
//                       <div className="d-flex align-items-center flex-wrap gap-3 mb-2">
//                         <div className="d-flex align-items-center gap-1 rating-stars">
//                           {renderStars(5.0)}
//                         </div>
//                         <span className="fw-semibold fs-5 text-dark">5.0</span>
//                         <span className="text-secondary">★ 154 Ratings</span>
//                         <span className="badge bg-success text-white px-3 py-2 rounded-pill fw-normal">
//                           <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-check-circle-fill me-1" viewBox="0 0 16 16">
//                             <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
//                           </svg>
//                           Verified
//                         </span>
//                         <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-normal">
//                           ⭐ Top Rated
//                         </span>
//                       </div>
//                     </div>
                    
//                     {/* Profile photo if available */}
//                     {provider.photo && (
//                       <img 
//                         src={`https://test.shrirajteam.com:85${provider.photo}`} 
//                         alt={provider.business_name} 
//                         className="rounded-circle border shadow-sm"
//                         style={{ width: '80px', height: '80px', objectFit: 'cover' }}
//                         onError={(e) => { e.target.style.display = 'none'; }}
//                       />
//                     )}
//                   </div>

//                   {/* Location Section */}
//                   <div className="mb-3 d-flex align-items-center gap-2 text-secondary">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#dc3545" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
//                       <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
//                     </svg>
//                     <span>{provider.address}, {provider.city} - {provider.pin_code}</span>
//                   </div>
                  
//                   <div className="mb-4 d-flex align-items-center gap-2 text-secondary">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6c757d" className="bi bi-briefcase-fill" viewBox="0 0 16 16">
//                       <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3h-4v-.5a.5.5 0 0 1 .5-.5"/>
//                       <path d="M0 7.616v6.884A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V7.616l-7.614 2.03a1.5 1.5 0 0 1-.772 0z"/>
//                     </svg>
//                     <span>Service Area: {provider.service_area}</span>
//                   </div>

//                   {/* Open until timing */}
//                   <div className="mb-4 p-3 bg-light rounded-3 d-flex align-items-center gap-2">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#198754" className="bi bi-clock-history" viewBox="0 0 16 16">
//                       <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.868a7.5 7.5 0 0 1 .47.306zm1.09 1.07a7 7 0 0 0-.519-.458l.634-.772a7.5 7.5 0 0 1 .547.475zM14 3.658a7 7 0 0 0-.391-.476l.75-.661a7.5 7.5 0 0 1 .416.506zM14.5 5.5a7 7 0 0 0-.126-.613l.979-.206q.078.397.12.806zM15 7.5q0-.382-.032-.755l1 .067Q16 7 16 7.5z"/>
//                       <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
//                       <path d="M8 4.466V8a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 1 0 .6-.8L9 7.666V4.466a.5.5 0 0 0-1 0"/>
//                     </svg>
//                     <span className="fw-semibold fs-5 text-success">Open until 12:30 am</span>
//                     <span className="text-muted ms-auto">⭐ Available for service</span>
//                   </div>

//                   {/* Contact & Action Buttons */}
//                   <div className="row g-3 mb-5">
//                     <div className="col-md-3 col-sm-6">
//                       <a href={`tel:${provider.mobile_number}`} className="btn btn-outline-primary w-100 py-3 rounded-pill d-flex align-items-center justify-content-center gap-2 fw-semibold">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
//                           <path d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.61l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.01c-.363-1.03-.038-2.137.702-2.877z"/>
//                         </svg>
//                         Call Now
//                       </a>
//                     </div>
//                     <div className="col-md-3 col-sm-6">
//                       <a href={`https://wa.me/${provider.mobile_number}`} target="_blank" rel="noopener noreferrer" className="btn btn-success w-100 py-3 rounded-pill d-flex align-items-center justify-content-center gap-2 fw-semibold">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
//                           <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.644-.182-.065-.315-.099-.445.099-.133.197-.513.644-.628.775-.114.133-.232.148-.43.05-.197-.1-.834-.308-1.588-.983a5.98 5.98 0 0 1-1.102-1.367c-.115-.165-.012-.253.087-.335s.197-.165.296-.264c.1-.099.133-.165.198-.276s.033-.207-.017-.29c-.05-.083-.445-1.075-.61-1.472-.16-.39-.323-.337-.445-.343a9 9 0 0 0-.38-.008.73.73 0 0 0-.528.248c-.182.198-.694.678-.694 1.654s.71 1.916.81 2.049c.099.133 1.394 2.132 3.383 2.992.472.204.84.326 1.129.417.474.15.905.128 1.246.078.38-.056 1.17-.478 1.335-.94.165-.462.165-.858.116-.94-.05-.082-.182-.133-.38-.232"/>
//                         </svg>
//                         WhatsApp
//                       </a>
//                     </div>
//                     <div className="col-md-3 col-sm-6">
//                       <a href={`mailto:${provider.email}`} className="btn btn-outline-secondary w-100 py-3 rounded-pill d-flex align-items-center justify-content-center gap-2 fw-semibold">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
//                           <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
//                         </svg>
//                         Send Enquiry
//                       </a>
//                     </div>
//                     <div className="col-md-3 col-sm-6">
//                       <div className="btn btn-info text-white w-100 py-3 rounded-pill d-flex align-items-center justify-content-center gap-2 fw-semibold" style={{ cursor: 'default', opacity: 0.9 }}>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-chat-dots-fill" viewBox="0 0 16 16">
//                           <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
//                         </svg>
//                         Responds in 30 Mins
//                       </div>
//                     </div>
//                   </div>

//                   {/* Additional Details from API */}
//                   <div className="row g-4 mt-2 pt-3 border-top">
//                     <div className="col-md-6">
//                       <div className="p-3 bg-light rounded-3 h-100">
//                         <h5 className="fw-bold mb-3" style={{ color: '#2c3e50' }}>
//                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-badge me-2" viewBox="0 0 16 16">
//                             <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
//                             <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z"/>
//                           </svg>
//                           Service Provider Details
//                         </h5>
//                         <ul className="list-unstyled mb-0">
//                           <li className="mb-3 d-flex justify-content-between">
//                             <strong className="text-secondary">Full Name:</strong>
//                             <span>{provider.full_name}</span>
//                           </li>
//                           <li className="mb-3 d-flex justify-content-between">
//                             <strong className="text-secondary">Experience:</strong>
//                             <span>{provider.experience_years} years</span>
//                           </li>
//                           <li className="mb-3 d-flex justify-content-between">
//                             <strong className="text-secondary">Skills:</strong>
//                             <span>{provider.skills || 'Not specified'}</span>
//                           </li>
//                           <li className="mb-3 d-flex justify-content-between">
//                             <strong className="text-secondary">Service Charges:</strong>
//                             <span className="fw-bold text-success">₹{provider.service_charges}</span>
//                           </li>
//                           <li className="mb-3 d-flex justify-content-between">
//                             <strong className="text-secondary">GST Number:</strong>
//                             <span>{provider.gst_number || 'Not available'}</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
                    
//                     <div className="col-md-6">
//                       <div className="p-3 bg-light rounded-3 h-100">
//                         <h5 className="fw-bold mb-3" style={{ color: '#2c3e50' }}>
//                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-bank2 me-2" viewBox="0 0 16 16">
//                             <path d="M8 0a6 6 0 0 0-6 6v6h12V6a6 6 0 0 0-6-6m2 8v1c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V8H4v6h8V8z"/>
//                             <path d="M15.5 13h-15a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1"/>
//                           </svg>
//                           Bank & Payment Details
//                         </h5>
//                         <ul className="list-unstyled mb-0">
//                           <li className="mb-3 d-flex justify-content-between">
//                             <strong className="text-secondary">Bank Name:</strong>
//                             <span>{provider.bank_name || 'Not provided'}</span>
//                           </li>
//                           <li className="mb-3 d-flex justify-content-between">
//                             <strong className="text-secondary">Account Holder:</strong>
//                             <span>{provider.account_holder_name || 'Not provided'}</span>
//                           </li>
//                           <li className="mb-3 d-flex justify-content-between">
//                             <strong className="text-secondary">UPI ID:</strong>
//                             <span>{provider.upi_id || 'Not provided'}</span>
//                           </li>
//                           <li className="mb-3 d-flex justify-content-between">
//                             <strong className="text-secondary">IFSC Code:</strong>
//                             <span>{provider.ifsc_code || 'Not provided'}</span>
//                           </li>
//                           <li className="mb-3 d-flex justify-content-between">
//                             <strong className="text-secondary">Account Number:</strong>
//                             <span>{provider.account_number ? '****' + provider.account_number.slice(-4) : 'Not provided'}</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Status Badge and Footer */}
//                   <div className="mt-4 pt-3 d-flex justify-content-between align-items-center border-top">
//                     <div>
//                       <small className="text-muted">Provider ID: {provider.provider_id}</small>
//                       <br />
//                       <small className="text-muted">Member since: {provider.created_at?.split(' ')[0]}</small>
//                     </div>
//                     <div>
//                       <span className={`badge ${provider.status === 'Pending' ? 'bg-warning text-dark' : 'bg-success'} px-4 py-2 rounded-pill fs-6`}>
//                         {provider.status === 'Pending' ? '⏳ Pending Verification' : '✓ Verified'}
//                       </span>
//                     </div>
//                   </div>
                  
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ServiceProviderProfile;





import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ServiceProviderProfile.css';
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";

const ServiceProviderProfile = () => {
  const navigate = useNavigate();
  const [providersData, setProvidersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to go back to previous page
  const handleGoBack = () => {
    navigate(-1); // This goes back to the previous page in history
  };

  useEffect(() => {
    const apiUrl = 'https://test.shrirajteam.com:85/service-providers/';
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('API Response:', data);
        if (data.results && data.results.length > 0) {
          setProvidersData(data.results);
        } else {
          setError('No service provider data found');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Helper function to render star rating
  const renderStars = (rating = 5.0) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (hasHalfStar && i === fullStars + 1) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star">☆</span>);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <>
        <AgentNavbar />
        <div className="abpc-main-header">
          <button className="abpc-back-desktop" onClick={handleGoBack}>
            <ArrowLeft size={17} /><span>Go Back</span>
          </button>
        </div>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AgentNavbar />
        <div className="abpc-main-header">
          <button className="abpc-back-desktop" onClick={handleGoBack}>
            <ArrowLeft size={17} /><span>Go Back</span>
          </button>
        </div>
        <div className="alert alert-danger m-5" role="alert">
          <strong>Error:</strong> {error}
        </div>
      </>
    );
  }

  if (providersData.length === 0) {
    return (
      <>
        <AgentNavbar />
        <div className="abpc-main-header">
          <button className="abpc-back-desktop" onClick={handleGoBack}>
            <ArrowLeft size={17} /><span>Go Back</span>
          </button>
        </div>
        <div className="alert alert-warning m-5" role="alert">
          No service providers available
        </div>
      </>
    );
  }

  return (
    <>
      <AgentNavbar />
      <div className="container py-4 mt-2">
        {/* Back Button Header */}
        <div className="abpc-main-header mb-4">
          <button className="abpc-back-desktop" onClick={handleGoBack}>
            <ArrowLeft size={17} /><span>Go Back</span>
          </button>
        </div>
        
        <div className="mb-4">
          <h2 className="fw-bold" style={{ color: '#2c3e50' }}>Service Providers</h2>
          <p className="text-secondary">Showing {providersData.length} provider(s)</p>
        </div>
        
        <div className="row g-4">
          {providersData.map((provider) => (
            <div key={provider.provider_id} className="col-12">
              <div className="card shadow-lg border-0 rounded-4 overflow-hidden provider-card">
                <div className="card-body p-4 p-lg-5">
                  
                  {/* Header Section with Business Name and Rating */}
                  <div className="d-flex flex-wrap justify-content-between align-items-start mb-4">
                    <div className="flex-grow-1">
                      <h3 className="mb-2 fw-bold" style={{ color: '#2c3e50' }}>
                        {provider.business_name || 'Service Provider'}
                      </h3>
                      <div className="d-flex align-items-center flex-wrap gap-3 mb-2">
                        <div className="d-flex align-items-center gap-1 rating-stars">
                          {renderStars(5.0)}
                        </div>
                        <span className="fw-semibold fs-5 text-dark">5.0</span>
                        <span className="text-secondary">★ 154 Ratings</span>
                        <span className="badge bg-success text-white px-3 py-2 rounded-pill fw-normal">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-check-circle-fill me-1" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                          </svg>
                          Verified
                        </span>
                        <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-normal">
                          ⭐ Top Rated
                        </span>
                      </div>
                    </div>
                    
                    {/* Profile photo if available */}
                    {provider.photo && (
                      <img 
                        src={`https://test.shrirajteam.com:85${provider.photo}`} 
                        alt={provider.business_name} 
                        className="rounded-circle border shadow-sm"
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    )}
                  </div>

                  {/* Location Section */}
                  <div className="mb-3 d-flex align-items-center gap-2 text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#dc3545" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                    </svg>
                    <span>{provider.address}, {provider.city} - {provider.pin_code}</span>
                  </div>
                  
                  <div className="mb-4 d-flex align-items-center gap-2 text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6c757d" className="bi bi-briefcase-fill" viewBox="0 0 16 16">
                      <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3h-4v-.5a.5.5 0 0 1 .5-.5"/>
                      <path d="M0 7.616v6.884A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V7.616l-7.614 2.03a1.5 1.5 0 0 1-.772 0z"/>
                    </svg>
                    <span>Service Area: {provider.service_area}</span>
                  </div>

                  {/* Open until timing */}
                  <div className="mb-4 p-3 bg-light rounded-3 d-flex align-items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#198754" className="bi bi-clock-history" viewBox="0 0 16 16">
                      <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.868a7.5 7.5 0 0 1 .47.306zm1.09 1.07a7 7 0 0 0-.519-.458l.634-.772a7.5 7.5 0 0 1 .547.475zM14 3.658a7 7 0 0 0-.391-.476l.75-.661a7.5 7.5 0 0 1 .416.506zM14.5 5.5a7 7 0 0 0-.126-.613l.979-.206q.078.397.12.806zM15 7.5q0-.382-.032-.755l1 .067Q16 7 16 7.5z"/>
                      <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                      <path d="M8 4.466V8a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 1 0 .6-.8L9 7.666V4.466a.5.5 0 0 0-1 0"/>
                    </svg>
                    <span className="fw-semibold fs-5 text-success">Open until 12:30 am</span>
                    <span className="text-muted ms-auto">⭐ Available for service</span>
                  </div>

                  {/* Contact & Action Buttons */}
                  <div className="row g-3 mb-5">
                    <div className="col-md-3 col-sm-6">
                      <a href={`tel:${provider.mobile_number}`} className="btn btn-outline-primary w-100 py-3 rounded-pill d-flex align-items-center justify-content-center gap-2 fw-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                          <path d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.61l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.01c-.363-1.03-.038-2.137.702-2.877z"/>
                        </svg>
                        Call Now
                      </a>
                    </div>
                    <div className="col-md-3 col-sm-6">
                      <a href={`https://wa.me/${provider.mobile_number}`} target="_blank" rel="noopener noreferrer" className="btn btn-success w-100 py-3 rounded-pill d-flex align-items-center justify-content-center gap-2 fw-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.644-.182-.065-.315-.099-.445.099-.133.197-.513.644-.628.775-.114.133-.232.148-.43.05-.197-.1-.834-.308-1.588-.983a5.98 5.98 0 0 1-1.102-1.367c-.115-.165-.012-.253.087-.335s.197-.165.296-.264c.1-.099.133-.165.198-.276s.033-.207-.017-.29c-.05-.083-.445-1.075-.61-1.472-.16-.39-.323-.337-.445-.343a9 9 0 0 0-.38-.008.73.73 0 0 0-.528.248c-.182.198-.694.678-.694 1.654s.71 1.916.81 2.049c.099.133 1.394 2.132 3.383 2.992.472.204.84.326 1.129.417.474.15.905.128 1.246.078.38-.056 1.17-.478 1.335-.94.165-.462.165-.858.116-.94-.05-.082-.182-.133-.38-.232"/>
                        </svg>
                        WhatsApp
                      </a>
                    </div>
                    <div className="col-md-3 col-sm-6">
                      <a href={`mailto:${provider.email}`} className="btn btn-outline-secondary w-100 py-3 rounded-pill d-flex align-items-center justify-content-center gap-2 fw-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                          <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                        </svg>
                        Send Enquiry
                      </a>
                    </div>
                    <div className="col-md-3 col-sm-6">
                      <div className="btn btn-info text-white w-100 py-3 rounded-pill d-flex align-items-center justify-content-center gap-2 fw-semibold" style={{ cursor: 'default', opacity: 0.9 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-chat-dots-fill" viewBox="0 0 16 16">
                          <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                        </svg>
                        Responds in 30 Mins
                      </div>
                    </div>
                  </div>

                  {/* Status Badge and Footer - without extra details */}
                  <div className="mt-4 pt-3 d-flex justify-content-between align-items-center border-top">
                    <div>
                      <small className="text-muted">Provider ID: {provider.provider_id}</small>
                      <br />
                      <small className="text-muted">Member since: {provider.created_at?.split(' ')[0]}</small>
                    </div>
                    <div>
                      <span className={`badge ${provider.status === 'Pending' ? 'bg-warning text-dark' : 'bg-success'} px-4 py-2 rounded-pill fs-6`}>
                        {provider.status === 'Pending' ? '⏳ Pending Verification' : '✓ Verified'}
                      </span>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServiceProviderProfile;