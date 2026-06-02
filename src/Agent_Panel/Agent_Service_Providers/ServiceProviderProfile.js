


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL';

// const ServiceProviders = () => {
//   const navigate = useNavigate();
//   const [providers, setProviders] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
  
//   // Booking Modal States
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProvider, setSelectedProvider] = useState(null);
//   const [bookingData, setBookingData] = useState({
//     user: localStorage.getItem('user_id') || 1,
//     service_provider: null,
//     service_start_date: '',
//     service_end_date: '',
//     number_of_hours: '',
//     number_of_days: '',
//     address: '',
//     booking_notes: '',
//     payment_status: 'Pending',
//     booking_status: 'Pending'
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [bookingError, setBookingError] = useState('');

//   // Admin phone number constant
//   const ADMIN_PHONE_NUMBER = '9074307248';

//   useEffect(() => {
//     // Fetch both service providers and service categories
//     const fetchData = async () => {
//       try {
//         const [providersResponse, categoriesResponse] = await Promise.all([
//           fetch(`${baseurl}/service-providers/`),
//           fetch(`${baseurl}/service-categories/`)
//         ]);

//         if (!providersResponse.ok || !categoriesResponse.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const providersData = await providersResponse.json();
//         const categoriesData = await categoriesResponse.json();

//         setProviders(providersData.results || []);
//         setCategories(categoriesData.results || []);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to get service name by category ID
//   const getServiceName = (categoryId) => {
//     const category = categories.find(cat => cat.category_id === categoryId);
//     return category ? category.category_name : 'Unknown Service';
//   };

//   // Format currency
//   const formatCurrency = (amount) => {
//     if (!amount) return 'N/A';
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 2
//     }).format(amount);
//   };

//   // Function to get verification status badge color
//   const getVerificationStatusBadge = (verificationStatus) => {
//     switch(verificationStatus?.toLowerCase()) {
//       case 'verified':
//         return { class: 'bg-success', text: 'Verified' };
//       case 'pending':
//         return { class: 'bg-warning text-dark', text: 'Pending' };
//       case 'rejected':
//         return { class: 'bg-danger', text: 'Rejected' };
//       case 'suspended':
//         return { class: 'bg-secondary', text: 'Suspended' };
//       default:
//         return { class: 'bg-info', text: verificationStatus || 'Unknown' };
//     }
//   };

//   // Filter providers based on search term
//   const filteredProviders = providers.filter(provider => {
//     const searchTermLower = searchTerm.toLowerCase();
//     return (
//       provider.full_name?.toLowerCase().includes(searchTermLower) ||
//       provider.business_name?.toLowerCase().includes(searchTermLower) ||
//       getServiceName(provider.service_category)?.toLowerCase().includes(searchTermLower) ||
//       provider.service_area?.toLowerCase().includes(searchTermLower) ||
//       provider.city?.toLowerCase().includes(searchTermLower) ||
//       provider.email?.toLowerCase().includes(searchTermLower) ||
//       provider.verification_status?.toLowerCase().includes(searchTermLower)
//     );
//   });

//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   // Function to handle reach out button click - opens dialer with admin number
//   const handleReachOutClick = () => {
//     const cleanPhoneNumber = ADMIN_PHONE_NUMBER.replace(/[^\d+]/g, '');
//     window.location.href = `tel:${cleanPhoneNumber}`;
//   };

//   const handleBookNow = (provider) => {
//     // Only allow booking if verification_status is 'verified'
//     if (provider.verification_status?.toLowerCase() !== 'verified') {
//       setBookingError(`Cannot book: Provider verification status is ${provider.verification_status}`);
//       return;
//     }
    
//     setSelectedProvider(provider);
//     setBookingData({
//       ...bookingData,
//       service_provider: provider.provider_id,
//       service_start_date: '',
//       service_end_date: '',
//       number_of_hours: '',
//       number_of_days: '',
//       address: '',
//       booking_notes: '',
//     });
//     setBookingError('');
//     setShowModal(true);
//   };

//   const handleBookingInputChange = (e) => {
//     const { name, value } = e.target;
//     setBookingData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Auto-calculate end date for contract bookings
//     if (name === 'number_of_days' && selectedProvider?.service_charge_type === 'Contract') {
//       const startDate = bookingData.service_start_date;
//       if (startDate && value) {
//         const start = new Date(startDate);
//         const end = new Date(start);
//         end.setDate(start.getDate() + parseInt(value));
//         const endDateStr = end.toISOString().split('T')[0];
//         setBookingData(prev => ({
//           ...prev,
//           service_end_date: endDateStr
//         }));
//       }
//     }
    
//     // For Per Day, set end date based on number of days
//     if (name === 'number_of_days' && selectedProvider?.service_charge_type === 'Per Day') {
//       const startDate = bookingData.service_start_date;
//       if (startDate && value) {
//         const start = new Date(startDate);
//         const end = new Date(start);
//         end.setDate(start.getDate() + parseInt(value) - 1);
//         const endDateStr = end.toISOString().split('T')[0];
//         setBookingData(prev => ({
//           ...prev,
//           service_end_date: endDateStr
//         }));
//       }
//     }
    
//     // For Per Hour, set end date same as start date
//     if (name === 'service_start_date' && selectedProvider?.service_charge_type === 'Per Hour') {
//       setBookingData(prev => ({
//         ...prev,
//         service_end_date: value
//       }));
//     }
//   };

//   const validateBookingForm = () => {
//     if (!bookingData.service_start_date) {
//       setBookingError('Please select start date');
//       return false;
//     }
    
//     if (!bookingData.address.trim()) {
//       setBookingError('Please enter address');
//       return false;
//     }
    
//     if (selectedProvider?.service_charge_type === 'Per Hour') {
//       if (!bookingData.number_of_hours || bookingData.number_of_hours <= 0) {
//         setBookingError('Please enter valid number of hours');
//         return false;
//       }
//     } else if (selectedProvider?.service_charge_type === 'Per Day' || selectedProvider?.service_charge_type === 'Contract') {
//       if (!bookingData.number_of_days || bookingData.number_of_days <= 0) {
//         setBookingError('Please enter valid number of days');
//         return false;
//       }
//     }
    
//     return true;
//   };

//   const handleSubmitBooking = async () => {
//     if (!validateBookingForm()) {
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       let payload = {};
//       const providerType = selectedProvider?.service_charge_type;
      
//       if (providerType === 'Per Hour') {
//         payload = {
//           user: parseInt(bookingData.user),
//           service_provider: bookingData.service_provider,
//           service_start_date: bookingData.service_start_date,
//           service_end_date: bookingData.service_end_date || bookingData.service_start_date,
//           number_of_hours: parseInt(bookingData.number_of_hours),
//           address: bookingData.address,
//           booking_notes: bookingData.booking_notes,
//           payment_status: bookingData.payment_status,
//           booking_status: bookingData.booking_status
//         };
//       } else if (providerType === 'Per Day') {
//         payload = {
//           user: parseInt(bookingData.user),
//           service_provider: bookingData.service_provider,
//           service_start_date: bookingData.service_start_date,
//           service_end_date: bookingData.service_end_date,
//           number_of_days: parseInt(bookingData.number_of_days),
//           address: bookingData.address,
//           booking_notes: bookingData.booking_notes,
//           payment_status: bookingData.payment_status,
//           booking_status: bookingData.booking_status
//         };
//       } else if (providerType === 'Contract') {
//         payload = {
//           user: parseInt(bookingData.user),
//           service_provider: bookingData.service_provider,
//           service_start_date: bookingData.service_start_date,
//           service_end_date: bookingData.service_end_date,
//           number_of_days: parseInt(bookingData.number_of_days),
//           address: bookingData.address,
//           booking_notes: bookingData.booking_notes,
//           payment_status: bookingData.payment_status,
//           booking_status: bookingData.booking_status
//         };
//       }
      
//       const response = await fetch(`${baseurl}/service-bookings/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Booking failed');
//       }
      
//       const result = await response.json();
      
//       // Close modal and show success message
//       setShowModal(false);
//       alert('Booking created successfully!');
      
//       // Reset form
//       setBookingData({
//         user: localStorage.getItem('user_id') || 1,
//         service_provider: null,
//         service_start_date: '',
//         service_end_date: '',
//         number_of_hours: '',
//         number_of_days: '',
//         address: '',
//         booking_notes: '',
//         payment_status: 'Pending',
//         booking_status: 'Pending'
//       });
//       setSelectedProvider(null);
      
//     } catch (error) {
//       console.error('Booking error:', error);
//       setBookingError(error.message || 'Failed to create booking. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedProvider(null);
//     setBookingError('');
//   };

//   // Calculate total price based on service charge type
//   const calculateTotalPrice = () => {
//     if (!selectedProvider) return 0;
//     const rate = parseFloat(selectedProvider.service_charges) || 0;
    
//     if (selectedProvider.service_charge_type === 'Per Hour') {
//       const hours = parseInt(bookingData.number_of_hours) || 0;
//       return rate * hours;
//     } else if (selectedProvider.service_charge_type === 'Per Day') {
//       const days = parseInt(bookingData.number_of_days) || 0;
//       return rate * days;
//     } else if (selectedProvider.service_charge_type === 'Contract') {
//       const days = parseInt(bookingData.number_of_days) || 0;
//       return rate * days;
//     }
//     return 0;
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center min-vh-100">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mt-5">
//         <div className="alert alert-danger" role="alert">
//           Error loading data: {error}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <AgentNavbar />
//       <div className="container py-4">
//         {/* Back Button and Search Bar Row */}
//         <div className="row mb-4 align-items-center">
//           <div className="col-12 col-md-4 mb-3 mb-md-0">
//             <button 
//               onClick={handleGoBack}
//               className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
//               style={{ borderRadius: '6px', padding: '8px 20px' }}
//             >
//               <i className="bi bi-arrow-left"></i>
//               Back
//             </button>
//           </div>
//           <div className="col-12 col-md-8">
//             <div className="input-group" style={{ maxWidth: '500px', marginLeft: 'auto' }}>
//               <span className="input-group-text bg-white">
//                 <i className="bi bi-search"></i>
//               </span>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search by name, business, service, area, city, email, or verification status..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={{ borderRadius: '0 6px 6px 0' }}
//               />
//               {searchTerm && (
//                 <button
//                   className="btn btn-outline-secondary"
//                   type="button"
//                   onClick={() => setSearchTerm('')}
//                 >
//                   <i className="bi bi-x-lg"></i>
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         <h1 className="text-center mb-4 display-6 fw-bold">Service Providers</h1>
        
//         {/* Search Results Count */}
//         {searchTerm && (
//           <div className="text-center mb-3">
//             <p className="text-muted">
//               Found {filteredProviders.length} result{filteredProviders.length !== 1 ? 's' : ''}
//             </p>
//           </div>
//         )}

//         {/* No Results Message */}
//         {filteredProviders.length === 0 && (
//           <div className="text-center py-5">
//             <i className="bi bi-search display-1 text-muted"></i>
//             <h3 className="mt-3">No service providers found</h3>
//             <p className="text-muted">Try adjusting your search criteria</p>
//             <button 
//               className="btn btn-primary mt-2"
//               onClick={() => setSearchTerm('')}
//             >
//               Clear Search
//             </button>
//           </div>
//         )}

//         {/* Grid Layout - 4 cards per row on desktop */}
//         <div className="row g-4">
//           {filteredProviders.map((provider) => {
//             const verificationBadge = getVerificationStatusBadge(provider.verification_status);
//             return (
//               <div key={provider.provider_id} className="col-12 col-sm-6 col-lg-3">
//                 <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-card">
//                   {/* Verification Status Badge - Top Right Corner */}
//                   <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
//                     <span className={`badge ${verificationBadge.class} px-3 py-2 rounded-pill fs-6`}>
//                       {verificationBadge.text}
//                     </span>
//                   </div>

//                   {/* Image Section - Fixed Size */}
//                   <div className="card-img-top p-3 bg-light d-flex align-items-center justify-content-center">
//                     <div 
//                       style={{ 
//                         width: '100%', 
//                         height: '200px',
//                         maxWidth: '300px',
//                         margin: '0 auto'
//                       }}
//                     >
//                       {provider.photo ? (
//                         <img
//                           src={`${baseurl}${provider.photo}`}
//                           alt={provider.full_name}
//                           style={{ 
//                             width: '100%', 
//                             height: '100%', 
//                             objectFit: 'cover',
//                             borderRadius: '8px'
//                           }}
//                           onError={(e) => {
//                             e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
//                           }}
//                         />
//                       ) : (
//                         <div 
//                           className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-25"
//                           style={{ 
//                             width: '100%', 
//                             height: '100%', 
//                             borderRadius: '8px'
//                           }}
//                         >
//                           <span className="text-muted">No Image</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Content Section */}
//                   <div className="card-body p-3">
//                     {/* Full Name */}
//                     <div className="mb-2 d-flex align-items-start gap-2">
//                       <i className="bi bi-person-fill text-primary fs-6 mt-1 flex-shrink-0"></i>
//                       <div className="small">
//                         <strong>Name:</strong> {provider.full_name}
//                       </div>
//                     </div>
                    
//                     {/* Business Name */}
//                     {provider.business_name && (
//                       <div className="mb-2 d-flex align-items-start gap-2">
//                         <i className="bi bi-building-fill text-secondary fs-6 mt-1 flex-shrink-0"></i>
//                         <div className="small">
//                           <strong>Business:</strong> {provider.business_name}
//                         </div>
//                       </div>
//                     )}
                    
//                     {/* Service Name */}
//                     <div className="mb-2 d-flex align-items-start gap-2">
//                       <i className="bi bi-briefcase-fill text-danger fs-6 mt-1 flex-shrink-0"></i>
//                       <div className="small">
//                         <strong>Service:</strong> {getServiceName(provider.service_category)}
//                       </div>
//                     </div>

//                     {/* Service Area */}
//                     {provider.service_area && (
//                       <div className="mb-2 d-flex align-items-start gap-2">
//                         <i className="bi bi-geo-alt-fill text-primary fs-6 mt-1 flex-shrink-0"></i>
//                         <div className="small">
//                           <strong>Area:</strong> {provider.service_area}
//                         </div>
//                       </div>
//                     )}

//                     {/* City */}
//                     {provider.city && (
//                       <div className="mb-2 d-flex align-items-start gap-2">
//                         <i className="bi bi-geo-fill text-success fs-6 mt-1 flex-shrink-0"></i>
//                         <div className="small">
//                           <strong>City:</strong> {provider.city}
//                         </div>
//                       </div>
//                     )}

//                     {/* Address - Truncated */}
//                     {provider.address && (
//                       <div className="mb-2 d-flex align-items-start gap-2">
//                         <i className="bi bi-house-door-fill text-info fs-6 mt-1 flex-shrink-0"></i>
//                         <div className="small text-truncate" title={provider.address}>
//                           <strong>Address:</strong> {provider.address}
//                         </div>
//                       </div>
//                     )}

//                     {/* Email - Truncated */}
//                     <div className="mb-2 d-flex align-items-start gap-2">
//                       <i className="bi bi-envelope-fill text-warning fs-6 mt-1 flex-shrink-0"></i>
//                       <div className="small text-truncate" title={provider.email}>
//                         <strong>Email:</strong> {provider.email || 'N/A'}
//                       </div>
//                     </div>

//                     {/* Service Charge Type */}
//                     {provider.service_charge_type && (
//                       <div className="mb-2 d-flex align-items-start gap-2">
//                         <i className="bi bi-clock-fill text-info fs-6 mt-1 flex-shrink-0"></i>
//                         <div className="small">
//                           <strong>Service Charge Type:</strong> {provider.service_charge_type}
//                         </div>
//                       </div>
//                     )}
                    
//                     {/* Service Charges */}
//                     {provider.service_charges && (
//                       <div className="mb-2 d-flex align-items-start gap-2">
//                         <i className="bi bi-currency-rupee text-success fs-6 mt-1 flex-shrink-0"></i>
//                         <div className="small">
//                           <strong>Charges:</strong> {formatCurrency(provider.service_charges)} per {
//                             provider.service_charge_type === 'Per Hour' ? 'hour' : 
//                             provider.service_charge_type === 'Per Day' ? 'day' : 'contract'
//                           }
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Footer with Buttons - Side by side on desktop, stacked on mobile */}
//                   <div className="card-footer bg-white border-0 pb-3 pt-0">
//                     {/* Button Container - Responsive layout */}
//                     <div className="d-flex flex-column flex-sm-row gap-2 mt-2">
//                       {/* Reach Out Button */}
//                       <button
//                         onClick={handleReachOutClick}
//                         className="btn btn-success flex-fill d-flex align-items-center justify-content-center gap-2"
//                         style={{
//                           padding: '8px 12px',
//                           borderRadius: '8px',
//                           fontSize: '14px',
//                           fontWeight: '500',
//                           transition: 'all 0.3s ease'
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.transform = 'translateY(-2px)';
//                           e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.transform = 'translateY(0)';
//                           e.currentTarget.style.boxShadow = 'none';
//                         }}
//                       >
//                         <i className="bi bi-telephone-fill" style={{ fontSize: '14px' }}></i>
//                         <span>Reach Out</span>
//                       </button>
                      
//                       {/* Book Now Button */}
//                       <button
//                         className="btn btn-primary flex-fill d-flex align-items-center justify-content-center gap-2"
//                         onClick={() => handleBookNow(provider)}
//                         style={{ 
//                           backgroundColor: provider.verification_status?.toLowerCase() === 'verified' ? '#273c75' : '#6c757d', 
//                           borderColor: provider.verification_status?.toLowerCase() === 'verified' ? '#273c75' : '#6c757d',
//                           cursor: provider.verification_status?.toLowerCase() === 'verified' ? 'pointer' : 'not-allowed',
//                           padding: '8px 12px',
//                           borderRadius: '8px',
//                           fontSize: '14px',
//                           fontWeight: '500',
//                           transition: 'all 0.3s ease'
//                         }}
//                         disabled={provider.verification_status?.toLowerCase() !== 'verified'}
//                         title={provider.verification_status?.toLowerCase() !== 'verified' ? `Cannot book: Provider verification status is ${provider.verification_status}` : 'Book this service'}
//                         onMouseEnter={(e) => {
//                           if (provider.verification_status?.toLowerCase() === 'verified') {
//                             e.currentTarget.style.transform = 'translateY(-2px)';
//                             e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.transform = 'translateY(0)';
//                           e.currentTarget.style.boxShadow = 'none';
//                         }}
//                       >
//                         <i className="bi bi-calendar-check me-1"></i>
//                         Book Now
//                       </button>
//                     </div>
                    
//                     {/* Warning message for unverified providers */}
//                     {provider.verification_status?.toLowerCase() !== 'verified' && (
//                       <small className="text-muted d-block text-center mt-2">
//                         <i className="bi bi-info-circle me-1"></i>
//                         Booking available for verified providers only
//                       </small>
//                     )}
                    
//                     {/* Available 24/7 text for Reach Out */}
//                     {/* <small className="text-muted d-block text-center mt-2">
//                       <i className="bi bi-clock-history me-1"></i>
//                       Available 24/7 for calls
//                     </small> */}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Booking Modal */}
//         {showModal && selectedProvider && (
//           <div 
//             className="modal show d-block" 
//             tabIndex="-1" 
//             style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
//             onClick={closeModal}
//           >
//             <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
//               <div className="modal-content">
//                 <div className="modal-header" style={{ backgroundColor: '#273c75', color: 'white' }}>
//                   <h5 className="modal-title">
//                     <i className="bi bi-calendar-check me-2"></i>
//                     Book Service - {selectedProvider.full_name}
//                   </h5>
//                   <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
//                 </div>
//                 <div className="modal-body">
//                   {bookingError && (
//                     <div className="alert alert-danger alert-dismissible fade show" role="alert">
//                       {bookingError}
//                       <button type="button" className="btn-close" onClick={() => setBookingError('')}></button>
//                     </div>
//                   )}
                  
//                   {/* Provider Details Summary */}
//                   <div className="row mb-4">
//                     <div className="col-md-12">
//                       <div className="card bg-light">
//                         <div className="card-body">
//                           <h6 className="card-title mb-3">Service Provider Details</h6>
//                           <div className="row">
//                             <div className="col-md-6">
//                               <p className="mb-1"><strong>Name:</strong> {selectedProvider.full_name}</p>
//                               <p className="mb-1"><strong>Service:</strong> {getServiceName(selectedProvider.service_category)}</p>
//                               <p className="mb-1"><strong>Charge Type:</strong> {selectedProvider.service_charge_type}</p>
//                             </div>
//                             <div className="col-md-6">
//                               <p className="mb-1"><strong>Rate:</strong> {formatCurrency(selectedProvider.service_charges)}</p>
//                               <p className="mb-1">
//                                 <strong>Verification Status:</strong>{' '}
//                                 <span className={`badge ${getVerificationStatusBadge(selectedProvider.verification_status).class}`}>
//                                   {getVerificationStatusBadge(selectedProvider.verification_status).text}
//                                 </span>
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <form>
//                     <div className="row">
//                       {/* Service Start Date */}
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label fw-bold">Service Start Date *</label>
//                         <input
//                           type="date"
//                           name="service_start_date"
//                           value={bookingData.service_start_date}
//                           onChange={handleBookingInputChange}
//                           className="form-control"
//                           min={new Date().toISOString().split('T')[0]}
//                           required
//                         />
//                       </div>
                      
//                       {/* Duration based on charge type */}
//                       {selectedProvider.service_charge_type === 'Per Hour' && (
//                         <>
//                           <div className="col-md-6 mb-3">
//                             <label className="form-label fw-bold">Number of Hours *</label>
//                             <input
//                               type="number"
//                               name="number_of_hours"
//                               value={bookingData.number_of_hours}
//                               onChange={handleBookingInputChange}
//                               className="form-control"
//                               placeholder="Enter hours"
//                               min="1"
//                               step="1"
//                               required
//                             />
//                           </div>
//                           <div className="col-md-6 mb-3">
//                             <label className="form-label fw-bold">Service End Date</label>
//                             <input
//                               type="date"
//                               className="form-control"
//                               value={bookingData.service_start_date}
//                               disabled
//                             />
//                             <small className="text-muted">Same as start date for hourly booking</small>
//                           </div>
//                         </>
//                       )}
                      
//                       {(selectedProvider.service_charge_type === 'Per Day' || selectedProvider.service_charge_type === 'Contract') && (
//                         <>
//                           <div className="col-md-6 mb-3">
//                             <label className="form-label fw-bold">Number of Days *</label>
//                             <input
//                               type="number"
//                               name="number_of_days"
//                               value={bookingData.number_of_days}
//                               onChange={handleBookingInputChange}
//                               className="form-control"
//                               placeholder="Enter days"
//                               min="1"
//                               step="1"
//                               required
//                             />
//                           </div>
//                           <div className="col-md-6 mb-3">
//                             <label className="form-label fw-bold">Service End Date</label>
//                             <input
//                               type="date"
//                               name="service_end_date"
//                               value={bookingData.service_end_date}
//                               onChange={handleBookingInputChange}
//                               className="form-control"
//                               min={bookingData.service_start_date}
//                               required
//                             />
//                             <small className="text-muted">Automatically calculated based on days</small>
//                           </div>
//                         </>
//                       )}
                      
//                       {/* Address */}
//                       <div className="col-12 mb-3">
//                         <label className="form-label fw-bold">Service Address *</label>
//                         <textarea
//                           name="address"
//                           value={bookingData.address}
//                           onChange={handleBookingInputChange}
//                           className="form-control"
//                           rows="3"
//                           placeholder="Enter full service address"
//                           required
//                         ></textarea>
//                       </div>
                      
//                       {/* Booking Notes */}
//                       <div className="col-12 mb-3">
//                         <label className="form-label fw-bold">Additional Notes (Optional)</label>
//                         <textarea
//                           name="booking_notes"
//                           value={bookingData.booking_notes}
//                           onChange={handleBookingInputChange}
//                           className="form-control"
//                           rows="2"
//                           placeholder="Any special requirements or instructions"
//                         ></textarea>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//                 <div className="modal-footer">
//                   <button type="button" className="btn btn-secondary" onClick={closeModal}>
//                     Cancel
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-primary"
//                     onClick={handleSubmitBooking}
//                     disabled={isSubmitting}
//                     style={{ backgroundColor: '#273c75', borderColor: '#273c75' }}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2"></span>
//                         Processing...
//                       </>
//                     ) : (
//                       <>
//                         <i className="bi bi-check-circle me-2"></i>
//                         Confirm Booking
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Bootstrap Icons CDN */}
//         <link 
//           rel="stylesheet" 
//           href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
//         />
//       </div>

//       {/* Custom CSS for hover effects and responsive image */}
//       <style jsx>{`
//         .hover-card {
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//           position: relative;
//         }
//         .hover-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
//         }
        
//         /* Ensure image container maintains fixed size on all devices */
//         .card-img-top {
//           min-height: 200px;
//           max-height: 200px;
//         }
        
//         /* Responsive adjustments */
//         @media (max-width: 768px) {
//           .card-img-top div {
//             width: 100% !important;
//             height: 200px !important;
//           }
//         }
        
//         .modal {
//           z-index: 1050;
//         }
//       `}</style>
//     </>
//   );
// };

// export default ServiceProviders;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL';

// const ServiceProviders = () => {
//   const navigate = useNavigate();
//   const [providers, setProviders] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
  
//   // Booking Modal States
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProvider, setSelectedProvider] = useState(null);
//   const [bookingData, setBookingData] = useState({
//     user: localStorage.getItem('user_id') || 1,
//     service_provider: null,
//     service_start_date: '',
//     service_end_date: '',
//     number_of_hours: '',
//     number_of_days: '',
//     address: '',
//     booking_notes: '',
//     payment_status: 'Pending',
//     booking_status: 'Pending'
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [bookingError, setBookingError] = useState('');

//   // Admin phone number constant
//   const ADMIN_PHONE_NUMBER = '9074307248';

//   useEffect(() => {
//     // Fetch both service providers and service categories
//     const fetchData = async () => {
//       try {
//         const [providersResponse, categoriesResponse] = await Promise.all([
//           fetch(`${baseurl}/service-providers/`),
//           fetch(`${baseurl}/service-categories/`)
//         ]);

//         if (!providersResponse.ok || !categoriesResponse.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const providersData = await providersResponse.json();
//         const categoriesData = await categoriesResponse.json();

//         // Filter only verified providers
//         let allProviders = providersData.results || [];
//         const verifiedProviders = allProviders.filter(
//           provider => provider.verification_status?.toLowerCase() === 'verified'
//         );

//         setProviders(verifiedProviders);
//         setCategories(categoriesData.results || []);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to get service name by category ID
//   const getServiceName = (categoryId) => {
//     const category = categories.find(cat => cat.category_id === categoryId);
//     return category ? category.category_name : 'Unknown Service';
//   };

//   // Format currency
//   const formatCurrency = (amount) => {
//     if (!amount) return 'N/A';
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 2
//     }).format(amount);
//   };

//   // Function to get verification status badge color
//   const getVerificationStatusBadge = (verificationStatus) => {
//     switch(verificationStatus?.toLowerCase()) {
//       case 'verified':
//         return { class: 'bg-success', text: 'Verified' };
//       case 'pending':
//         return { class: 'bg-warning text-dark', text: 'Pending' };
//       case 'rejected':
//         return { class: 'bg-danger', text: 'Rejected' };
//       case 'suspended':
//         return { class: 'bg-secondary', text: 'Suspended' };
//       default:
//         return { class: 'bg-info', text: verificationStatus || 'Unknown' };
//     }
//   };

//   // Filter providers based on search term (only among verified providers)
//   const filteredProviders = providers.filter(provider => {
//     const searchTermLower = searchTerm.toLowerCase();
//     return (
//       provider.full_name?.toLowerCase().includes(searchTermLower) ||
//       provider.business_name?.toLowerCase().includes(searchTermLower) ||
//       getServiceName(provider.service_category)?.toLowerCase().includes(searchTermLower) ||
//       provider.service_area?.toLowerCase().includes(searchTermLower) ||
//       provider.city?.toLowerCase().includes(searchTermLower) ||
//       provider.email?.toLowerCase().includes(searchTermLower)
//     );
//   });

//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   // Function to handle reach out button click - opens dialer with admin number
//   const handleReachOutClick = () => {
//     const cleanPhoneNumber = ADMIN_PHONE_NUMBER.replace(/[^\d+]/g, '');
//     window.location.href = `tel:${cleanPhoneNumber}`;
//   };

//   const handleBookNow = (provider) => {
//     // Provider is already verified, so no need to check again
//     setSelectedProvider(provider);
//     setBookingData({
//       ...bookingData,
//       service_provider: provider.provider_id,
//       service_start_date: '',
//       service_end_date: '',
//       number_of_hours: '',
//       number_of_days: '',
//       address: '',
//       booking_notes: '',
//     });
//     setBookingError('');
//     setShowModal(true);
//   };

//   const handleBookingInputChange = (e) => {
//     const { name, value } = e.target;
//     setBookingData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Auto-calculate end date for contract bookings
//     if (name === 'number_of_days' && selectedProvider?.service_charge_type === 'Contract') {
//       const startDate = bookingData.service_start_date;
//       if (startDate && value) {
//         const start = new Date(startDate);
//         const end = new Date(start);
//         end.setDate(start.getDate() + parseInt(value));
//         const endDateStr = end.toISOString().split('T')[0];
//         setBookingData(prev => ({
//           ...prev,
//           service_end_date: endDateStr
//         }));
//       }
//     }
    
//     // For Per Day, set end date based on number of days
//     if (name === 'number_of_days' && selectedProvider?.service_charge_type === 'Per Day') {
//       const startDate = bookingData.service_start_date;
//       if (startDate && value) {
//         const start = new Date(startDate);
//         const end = new Date(start);
//         end.setDate(start.getDate() + parseInt(value) - 1);
//         const endDateStr = end.toISOString().split('T')[0];
//         setBookingData(prev => ({
//           ...prev,
//           service_end_date: endDateStr
//         }));
//       }
//     }
    
//     // For Per Hour, set end date same as start date
//     if (name === 'service_start_date' && selectedProvider?.service_charge_type === 'Per Hour') {
//       setBookingData(prev => ({
//         ...prev,
//         service_end_date: value
//       }));
//     }
//   };

//   const validateBookingForm = () => {
//     if (!bookingData.service_start_date) {
//       setBookingError('Please select start date');
//       return false;
//     }
    
//     if (!bookingData.address.trim()) {
//       setBookingError('Please enter address');
//       return false;
//     }
    
//     if (selectedProvider?.service_charge_type === 'Per Hour') {
//       if (!bookingData.number_of_hours || bookingData.number_of_hours <= 0) {
//         setBookingError('Please enter valid number of hours');
//         return false;
//       }
//     } else if (selectedProvider?.service_charge_type === 'Per Day' || selectedProvider?.service_charge_type === 'Contract') {
//       if (!bookingData.number_of_days || bookingData.number_of_days <= 0) {
//         setBookingError('Please enter valid number of days');
//         return false;
//       }
//     }
    
//     return true;
//   };

//   const handleSubmitBooking = async () => {
//     if (!validateBookingForm()) {
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       let payload = {};
//       const providerType = selectedProvider?.service_charge_type;
      
//       if (providerType === 'Per Hour') {
//         payload = {
//           user: parseInt(bookingData.user),
//           service_provider: bookingData.service_provider,
//           service_start_date: bookingData.service_start_date,
//           service_end_date: bookingData.service_end_date || bookingData.service_start_date,
//           number_of_hours: parseInt(bookingData.number_of_hours),
//           address: bookingData.address,
//           booking_notes: bookingData.booking_notes,
//           payment_status: bookingData.payment_status,
//           booking_status: bookingData.booking_status
//         };
//       } else if (providerType === 'Per Day') {
//         payload = {
//           user: parseInt(bookingData.user),
//           service_provider: bookingData.service_provider,
//           service_start_date: bookingData.service_start_date,
//           service_end_date: bookingData.service_end_date,
//           number_of_days: parseInt(bookingData.number_of_days),
//           address: bookingData.address,
//           booking_notes: bookingData.booking_notes,
//           payment_status: bookingData.payment_status,
//           booking_status: bookingData.booking_status
//         };
//       } else if (providerType === 'Contract') {
//         payload = {
//           user: parseInt(bookingData.user),
//           service_provider: bookingData.service_provider,
//           service_start_date: bookingData.service_start_date,
//           service_end_date: bookingData.service_end_date,
//           number_of_days: parseInt(bookingData.number_of_days),
//           address: bookingData.address,
//           booking_notes: bookingData.booking_notes,
//           payment_status: bookingData.payment_status,
//           booking_status: bookingData.booking_status
//         };
//       }
      
//       const response = await fetch(`${baseurl}/service-bookings/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Booking failed');
//       }
      
//       const result = await response.json();
      
//       // Close modal and show success message
//       setShowModal(false);
//       alert('Booking created successfully!');
      
//       // Reset form
//       setBookingData({
//         user: localStorage.getItem('user_id') || 1,
//         service_provider: null,
//         service_start_date: '',
//         service_end_date: '',
//         number_of_hours: '',
//         number_of_days: '',
//         address: '',
//         booking_notes: '',
//         payment_status: 'Pending',
//         booking_status: 'Pending'
//       });
//       setSelectedProvider(null);
      
//     } catch (error) {
//       console.error('Booking error:', error);
//       setBookingError(error.message || 'Failed to create booking. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedProvider(null);
//     setBookingError('');
//   };

//   // Calculate total price based on service charge type
//   const calculateTotalPrice = () => {
//     if (!selectedProvider) return 0;
//     const rate = parseFloat(selectedProvider.service_charges) || 0;
    
//     if (selectedProvider.service_charge_type === 'Per Hour') {
//       const hours = parseInt(bookingData.number_of_hours) || 0;
//       return rate * hours;
//     } else if (selectedProvider.service_charge_type === 'Per Day') {
//       const days = parseInt(bookingData.number_of_days) || 0;
//       return rate * days;
//     } else if (selectedProvider.service_charge_type === 'Contract') {
//       const days = parseInt(bookingData.number_of_days) || 0;
//       return rate * days;
//     }
//     return 0;
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center min-vh-100">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mt-5">
//         <div className="alert alert-danger" role="alert">
//           Error loading data: {error}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <AgentNavbar />
//       <div className="container py-4">
//         {/* Back Button and Search Bar Row */}
//         <div className="row mb-4 align-items-center">
//           <div className="col-12 col-md-4 mb-3 mb-md-0">
//             <button 
//               onClick={handleGoBack}
//               className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
//               style={{ borderRadius: '6px', padding: '8px 20px' }}
//             >
//               <i className="bi bi-arrow-left"></i>
//               Back
//             </button>
//           </div>
//           <div className="col-12 col-md-8">
//             <div className="input-group" style={{ maxWidth: '500px', marginLeft: 'auto' }}>
//               <span className="input-group-text bg-white">
//                 <i className="bi bi-search"></i>
//               </span>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search by name, business, service, area, city, or email..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={{ borderRadius: '0 6px 6px 0' }}
//               />
//               {searchTerm && (
//                 <button
//                   className="btn btn-outline-secondary"
//                   type="button"
//                   onClick={() => setSearchTerm('')}
//                 >
//                   <i className="bi bi-x-lg"></i>
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         <h1 className="text-center mb-4 display-6 fw-bold"> Service Providers</h1>
        
//         {/* Search Results Count */}
//         {searchTerm && (
//           <div className="text-center mb-3">
//             <p className="text-muted">
//               Found {filteredProviders.length} verified provider{filteredProviders.length !== 1 ? 's' : ''}
//             </p>
//           </div>
//         )}

//         {/* No Results Message */}
//         {filteredProviders.length === 0 && (
//           <div className="text-center py-5">
//             <i className="bi bi-search display-1 text-muted"></i>
//             <h3 className="mt-3">No verified service providers found</h3>
//             <p className="text-muted">Try adjusting your search criteria</p>
//             {searchTerm && (
//               <button 
//                 className="btn btn-primary mt-2"
//                 onClick={() => setSearchTerm('')}
//               >
//                 Clear Search
//               </button>
//             )}
//           </div>
//         )}

//         {/* Grid Layout - 4 cards per row on desktop */}
//         <div className="row g-4">
//           {filteredProviders.map((provider) => {
//             const verificationBadge = getVerificationStatusBadge(provider.verification_status);
//             return (
//               <div key={provider.provider_id} className="col-12 col-sm-6 col-lg-3">
//                 <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-card">
//                   {/* Verification Status Badge - Top Right Corner */}
//                   <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
//                     <span className={`badge ${verificationBadge.class} px-3 py-2 rounded-pill fs-6`}>
//                       {verificationBadge.text}
//                     </span>
//                   </div>

//                   {/* Image Section - Fixed Size */}
//                   <div className="card-img-top p-3 bg-light d-flex align-items-center justify-content-center">
//                     <div 
//                       style={{ 
//                         width: '100%', 
//                         height: '200px',
//                         maxWidth: '300px',
//                         margin: '0 auto'
//                       }}
//                     >
//                       {provider.photo ? (
//                         <img
//                           src={`${baseurl}${provider.photo}`}
//                           alt={provider.full_name}
//                           style={{ 
//                             width: '100%', 
//                             height: '100%', 
//                             objectFit: 'cover',
//                             borderRadius: '8px'
//                           }}
//                           onError={(e) => {
//                             e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
//                           }}
//                         />
//                       ) : (
//                         <div 
//                           className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-25"
//                           style={{ 
//                             width: '100%', 
//                             height: '100%', 
//                             borderRadius: '8px'
//                           }}
//                         >
//                           <span className="text-muted">No Image</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Content Section */}
//                   <div className="card-body p-3">
//                     {/* Full Name */}
//                     <div className="mb-2 d-flex align-items-start gap-2">
//                       <i className="bi bi-person-fill text-primary fs-6 mt-1 flex-shrink-0"></i>
//                       <div className="small">
//                         <strong>Name:</strong> {provider.full_name}
//                       </div>
//                     </div>
                    
//                     {/* Business Name */}
//                     {provider.business_name && (
//                       <div className="mb-2 d-flex align-items-start gap-2">
//                         <i className="bi bi-building-fill text-secondary fs-6 mt-1 flex-shrink-0"></i>
//                         <div className="small">
//                           <strong>Business:</strong> {provider.business_name}
//                         </div>
//                       </div>
//                     )}
                    
//                     {/* Service Name */}
//                     <div className="mb-2 d-flex align-items-start gap-2">
//                       <i className="bi bi-briefcase-fill text-danger fs-6 mt-1 flex-shrink-0"></i>
//                       <div className="small">
//                         <strong>Service:</strong> {getServiceName(provider.service_category)}
//                       </div>
//                     </div>

//                     {/* Service Area */}
//                     {provider.service_area && (
//                       <div className="mb-2 d-flex align-items-start gap-2">
//                         <i className="bi bi-geo-alt-fill text-primary fs-6 mt-1 flex-shrink-0"></i>
//                         <div className="small">
//                           <strong>Area:</strong> {provider.service_area}
//                         </div>
//                       </div>
//                     )}

//                     {/* City */}
//                     {provider.city && (
//                       <div className="mb-2 d-flex align-items-start gap-2">
//                         <i className="bi bi-geo-fill text-success fs-6 mt-1 flex-shrink-0"></i>
//                         <div className="small">
//                           <strong>City:</strong> {provider.city}
//                         </div>
//                       </div>
//                     )}

//                     {/* Address - Truncated */}
//                     {provider.address && (
//                       <div className="mb-2 d-flex align-items-start gap-2">
//                         <i className="bi bi-house-door-fill text-info fs-6 mt-1 flex-shrink-0"></i>
//                         <div className="small text-truncate" title={provider.address}>
//                           <strong>Address:</strong> {provider.address}
//                         </div>
//                       </div>
//                     )}

//                     {/* Email - Truncated */}
//                     <div className="mb-2 d-flex align-items-start gap-2">
//                       <i className="bi bi-envelope-fill text-warning fs-6 mt-1 flex-shrink-0"></i>
//                       <div className="small text-truncate" title={provider.email}>
//                         <strong>Email:</strong> {provider.email || 'N/A'}
//                       </div>
//                     </div>

//                     {/* Service Charge Type */}
//                     {provider.service_charge_type && (
//                       <div className="mb-2 d-flex align-items-start gap-2">
//                         <i className="bi bi-clock-fill text-info fs-6 mt-1 flex-shrink-0"></i>
//                         <div className="small">
//                           <strong>Service Charge Type:</strong> {provider.service_charge_type}
//                         </div>
//                       </div>
//                     )}
                    
//                     {/* Service Charges */}
//                     {provider.service_charges && (
//                       <div className="mb-2 d-flex align-items-start gap-2">
//                         <i className="bi bi-currency-rupee text-success fs-6 mt-1 flex-shrink-0"></i>
//                         <div className="small">
//                           <strong>Charges:</strong> {formatCurrency(provider.service_charges)} per {
//                             provider.service_charge_type === 'Per Hour' ? 'hour' : 
//                             provider.service_charge_type === 'Per Day' ? 'day' : 'contract'
//                           }
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Footer with Buttons - Side by side on desktop, stacked on mobile */}
//                   <div className="card-footer bg-white border-0 pb-3 pt-0">
//                     {/* Button Container - Responsive layout */}
//                     <div className="d-flex flex-column flex-sm-row gap-2 mt-2">
//                       {/* Reach Out Button */}
//                       <button
//                         onClick={handleReachOutClick}
//                         className="btn btn-success flex-fill d-flex align-items-center justify-content-center gap-2"
//                         style={{
//                           padding: '8px 12px',
//                           borderRadius: '8px',
//                           fontSize: '14px',
//                           fontWeight: '500',
//                           transition: 'all 0.3s ease'
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.transform = 'translateY(-2px)';
//                           e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.transform = 'translateY(0)';
//                           e.currentTarget.style.boxShadow = 'none';
//                         }}
//                       >
//                         <i className="bi bi-telephone-fill" style={{ fontSize: '14px' }}></i>
//                         <span>Reach Out</span>
//                       </button>
                      
//                       {/* Book Now Button */}
//                       <button
//                         className="btn btn-primary flex-fill d-flex align-items-center justify-content-center gap-2"
//                         onClick={() => handleBookNow(provider)}
//                         style={{ 
//                           backgroundColor: '#273c75',
//                           borderColor: '#273c75',
//                           padding: '8px 12px',
//                           borderRadius: '8px',
//                           fontSize: '14px',
//                           fontWeight: '500',
//                           transition: 'all 0.3s ease'
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.transform = 'translateY(-2px)';
//                           e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.transform = 'translateY(0)';
//                           e.currentTarget.style.boxShadow = 'none';
//                         }}
//                       >
//                         <i className="bi bi-calendar-check me-1"></i>
//                         Book Now
//                       </button>
//                     </div>
                    
                  
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Booking Modal */}
//         {showModal && selectedProvider && (
//           <div 
//             className="modal show d-block" 
//             tabIndex="-1" 
//             style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
//             onClick={closeModal}
//           >
//             <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
//               <div className="modal-content">
//                 <div className="modal-header" style={{ backgroundColor: '#273c75', color: 'white' }}>
//                   <h5 className="modal-title">
//                     <i className="bi bi-calendar-check me-2"></i>
//                     Book Service - {selectedProvider.full_name}
//                   </h5>
//                   <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
//                 </div>
//                 <div className="modal-body">
//                   {bookingError && (
//                     <div className="alert alert-danger alert-dismissible fade show" role="alert">
//                       {bookingError}
//                       <button type="button" className="btn-close" onClick={() => setBookingError('')}></button>
//                     </div>
//                   )}
                  
//                   {/* Provider Details Summary */}
//                   <div className="row mb-4">
//                     <div className="col-md-12">
//                       <div className="card bg-light">
//                         <div className="card-body">
//                           <h6 className="card-title mb-3">Service Provider Details</h6>
//                           <div className="row">
//                             <div className="col-md-6">
//                               <p className="mb-1"><strong>Name:</strong> {selectedProvider.full_name}</p>
//                               <p className="mb-1"><strong>Service:</strong> {getServiceName(selectedProvider.service_category)}</p>
//                               <p className="mb-1"><strong>Charge Type:</strong> {selectedProvider.service_charge_type}</p>
//                             </div>
//                             <div className="col-md-6">
//                               <p className="mb-1"><strong>Rate:</strong> {formatCurrency(selectedProvider.service_charges)}</p>
//                               <p className="mb-1">
//                                 <strong>Verification Status:</strong>{' '}
//                                 <span className={`badge ${getVerificationStatusBadge(selectedProvider.verification_status).class}`}>
//                                   {getVerificationStatusBadge(selectedProvider.verification_status).text}
//                                 </span>
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <form>
//                     <div className="row">
//                       {/* Service Start Date */}
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label fw-bold">Service Start Date *</label>
//                         <input
//                           type="date"
//                           name="service_start_date"
//                           value={bookingData.service_start_date}
//                           onChange={handleBookingInputChange}
//                           className="form-control"
//                           min={new Date().toISOString().split('T')[0]}
//                           required
//                         />
//                       </div>
                      
//                       {/* Duration based on charge type */}
//                       {selectedProvider.service_charge_type === 'Per Hour' && (
//                         <>
//                           <div className="col-md-6 mb-3">
//                             <label className="form-label fw-bold">Number of Hours *</label>
//                             <input
//                               type="number"
//                               name="number_of_hours"
//                               value={bookingData.number_of_hours}
//                               onChange={handleBookingInputChange}
//                               className="form-control"
//                               placeholder="Enter hours"
//                               min="1"
//                               step="1"
//                               required
//                             />
//                           </div>
//                           <div className="col-md-6 mb-3">
//                             <label className="form-label fw-bold">Service End Date</label>
//                             <input
//                               type="date"
//                               className="form-control"
//                               value={bookingData.service_start_date}
//                               disabled
//                             />
//                             <small className="text-muted">Same as start date for hourly booking</small>
//                           </div>
//                         </>
//                       )}
                      
//                       {(selectedProvider.service_charge_type === 'Per Day' || selectedProvider.service_charge_type === 'Contract') && (
//                         <>
//                           <div className="col-md-6 mb-3">
//                             <label className="form-label fw-bold">Number of Days *</label>
//                             <input
//                               type="number"
//                               name="number_of_days"
//                               value={bookingData.number_of_days}
//                               onChange={handleBookingInputChange}
//                               className="form-control"
//                               placeholder="Enter days"
//                               min="1"
//                               step="1"
//                               required
//                             />
//                           </div>
//                           <div className="col-md-6 mb-3">
//                             <label className="form-label fw-bold">Service End Date</label>
//                             <input
//                               type="date"
//                               name="service_end_date"
//                               value={bookingData.service_end_date}
//                               onChange={handleBookingInputChange}
//                               className="form-control"
//                               min={bookingData.service_start_date}
//                               required
//                             />
//                             <small className="text-muted">Automatically calculated based on days</small>
//                           </div>
//                         </>
//                       )}
                      
//                       {/* Address */}
//                       <div className="col-12 mb-3">
//                         <label className="form-label fw-bold">Service Address *</label>
//                         <textarea
//                           name="address"
//                           value={bookingData.address}
//                           onChange={handleBookingInputChange}
//                           className="form-control"
//                           rows="3"
//                           placeholder="Enter full service address"
//                           required
//                         ></textarea>
//                       </div>
                      
//                       {/* Booking Notes */}
//                       <div className="col-12 mb-3">
//                         <label className="form-label fw-bold">Additional Notes (Optional)</label>
//                         <textarea
//                           name="booking_notes"
//                           value={bookingData.booking_notes}
//                           onChange={handleBookingInputChange}
//                           className="form-control"
//                           rows="2"
//                           placeholder="Any special requirements or instructions"
//                         ></textarea>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//                 <div className="modal-footer">
//                   <button type="button" className="btn btn-secondary" onClick={closeModal}>
//                     Cancel
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-primary"
//                     onClick={handleSubmitBooking}
//                     disabled={isSubmitting}
//                     style={{ backgroundColor: '#273c75', borderColor: '#273c75' }}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2"></span>
//                         Processing...
//                       </>
//                     ) : (
//                       <>
//                         <i className="bi bi-check-circle me-2"></i>
//                         Confirm Booking
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Bootstrap Icons CDN */}
//         <link 
//           rel="stylesheet" 
//           href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
//         />
//       </div>

//       {/* Custom CSS for hover effects and responsive image */}
//       <style jsx>{`
//         .hover-card {
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//           position: relative;
//         }
//         .hover-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
//         }
        
//         /* Ensure image container maintains fixed size on all devices */
//         .card-img-top {
//           min-height: 200px;
//           max-height: 200px;
//         }
        
//         /* Responsive adjustments */
//         @media (max-width: 768px) {
//           .card-img-top div {
//             width: 100% !important;
//             height: 200px !important;
//           }
//         }
        
//         .modal {
//           z-index: 1050;
//         }
//       `}</style>
//     </>
//   );
// };

// export default ServiceProviders;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL';
// import Swal from 'sweetalert2';
// const ServiceProviders = () => {
//   const navigate = useNavigate();
//   const [providers, setProviders] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
  
//   // Get user_id from localStorage - no default fallback
//   const [currentUserId, setCurrentUserId] = useState(null);
  
//   // Booking Modal States
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProvider, setSelectedProvider] = useState(null);
//   const [bookingData, setBookingData] = useState({
//     user: null, // Will be set after user_id is available
//     service_provider: null,
//     service_start_date: '',
//     service_end_date: '',
//     number_of_hours: '',
//     number_of_days: '',
//     address: '',
//     booking_notes: '',
//     payment_status: 'Pending',
//     booking_status: 'Pending'
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [bookingError, setBookingError] = useState('');

//   // Admin phone number constant
//   const ADMIN_PHONE_NUMBER = '9074307248';

//   // Get user_id from localStorage on component mount
//   useEffect(() => {
//     const userId = localStorage.getItem('user_id');
//     if (!userId) {
//       setError('User not logged in. Please login to continue.');
//       setLoading(false);
//       return;
//     }
//     setCurrentUserId(userId);
//     // Update booking data with user_id
//     setBookingData(prev => ({
//       ...prev,
//       user: parseInt(userId)
//     }));
//   }, []);

//   useEffect(() => {
//     // Fetch both service providers and service categories only if user_id exists
//     const fetchData = async () => {
//       // Don't fetch if no user_id
//       if (!currentUserId) return;
      
//       try {
//         // Fetch providers with exclude_user_id parameter
//         const providersResponse = await fetch(`${baseurl}/service-providers/?exclude_user_id=${currentUserId}`);
//         const categoriesResponse = await fetch(`${baseurl}/service-categories/`);

//         if (!providersResponse.ok || !categoriesResponse.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const providersData = await providersResponse.json();
//         const categoriesData = await categoriesResponse.json();

//         // Filter only verified providers
//         let allProviders = providersData.results || providersData || [];
//         const verifiedProviders = allProviders.filter(
//           provider => provider.verification_status?.toLowerCase() === 'verified'
//         );

//         setProviders(verifiedProviders);
//         setCategories(categoriesData.results || []);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [currentUserId]); // Re-fetch when user_id changes

//   // Function to get service name by category ID
//   const getServiceName = (categoryId) => {
//     const category = categories.find(cat => cat.category_id === categoryId);
//     return category ? category.category_name : 'Unknown Service';
//   };

//   // Format currency
//   const formatCurrency = (amount) => {
//     if (!amount) return 'N/A';
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 2
//     }).format(amount);
//   };

//   // Function to get verification status badge color
//   const getVerificationStatusBadge = (verificationStatus) => {
//     switch(verificationStatus?.toLowerCase()) {
//       case 'verified':
//         return { class: 'bg-success', text: 'Verified' };
//       case 'pending':
//         return { class: 'bg-warning text-dark', text: 'Pending' };
//       case 'rejected':
//         return { class: 'bg-danger', text: 'Rejected' };
//       case 'suspended':
//         return { class: 'bg-secondary', text: 'Suspended' };
//       default:
//         return { class: 'bg-info', text: verificationStatus || 'Unknown' };
//     }
//   };

//   // Filter providers based on search term (only among verified providers)
//   const filteredProviders = providers.filter(provider => {
//     const searchTermLower = searchTerm.toLowerCase();
//     return (
//       provider.full_name?.toLowerCase().includes(searchTermLower) ||
//       provider.business_name?.toLowerCase().includes(searchTermLower) ||
//       getServiceName(provider.service_category)?.toLowerCase().includes(searchTermLower) ||
//       provider.service_area?.toLowerCase().includes(searchTermLower) ||
//       provider.city?.toLowerCase().includes(searchTermLower) ||
//       provider.email?.toLowerCase().includes(searchTermLower)
//     );
//   });

//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   // Function to handle reach out button click - opens dialer with admin number
//   const handleReachOutClick = () => {
//     const cleanPhoneNumber = ADMIN_PHONE_NUMBER.replace(/[^\d+]/g, '');
//     window.location.href = `tel:${cleanPhoneNumber}`;
//   };

//   const handleBookNow = (provider) => {
//     // Check if user is logged in
//     if (!currentUserId) {
//       setError('Please login to book a service');
//       return;
//     }
    
//     // Provider is already verified, so no need to check again
//     setSelectedProvider(provider);
//     setBookingData(prev => ({
//       ...prev,
//       service_provider: provider.provider_id,
//       user: parseInt(currentUserId),
//       service_start_date: '',
//       service_end_date: '',
//       number_of_hours: '',
//       number_of_days: '',
//       address: '',
//       booking_notes: '',
//     }));
//     setBookingError('');
//     setShowModal(true);
//   };

//   const handleBookingInputChange = (e) => {
//     const { name, value } = e.target;
//     setBookingData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Auto-calculate end date for contract bookings
//     if (name === 'number_of_days' && selectedProvider?.service_charge_type === 'Contract') {
//       const startDate = bookingData.service_start_date;
//       if (startDate && value) {
//         const start = new Date(startDate);
//         const end = new Date(start);
//         end.setDate(start.getDate() + parseInt(value));
//         const endDateStr = end.toISOString().split('T')[0];
//         setBookingData(prev => ({
//           ...prev,
//           service_end_date: endDateStr
//         }));
//       }
//     }
    
//     // For Per Day, set end date based on number of days
//     if (name === 'number_of_days' && selectedProvider?.service_charge_type === 'Per Day') {
//       const startDate = bookingData.service_start_date;
//       if (startDate && value) {
//         const start = new Date(startDate);
//         const end = new Date(start);
//         end.setDate(start.getDate() + parseInt(value) - 1);
//         const endDateStr = end.toISOString().split('T')[0];
//         setBookingData(prev => ({
//           ...prev,
//           service_end_date: endDateStr
//         }));
//       }
//     }
    
//     // For Per Hour, set end date same as start date
//     if (name === 'service_start_date' && selectedProvider?.service_charge_type === 'Per Hour') {
//       setBookingData(prev => ({
//         ...prev,
//         service_end_date: value
//       }));
//     }
//   };

//   const validateBookingForm = () => {
//     if (!bookingData.service_start_date) {
//       setBookingError('Please select start date');
//       return false;
//     }
    
//     if (!bookingData.address.trim()) {
//       setBookingError('Please enter address');
//       return false;
//     }
    
//     if (selectedProvider?.service_charge_type === 'Per Hour') {
//       if (!bookingData.number_of_hours || bookingData.number_of_hours <= 0) {
//         setBookingError('Please enter valid number of hours');
//         return false;
//       }
//     } else if (selectedProvider?.service_charge_type === 'Per Day' || selectedProvider?.service_charge_type === 'Contract') {
//       if (!bookingData.number_of_days || bookingData.number_of_days <= 0) {
//         setBookingError('Please enter valid number of days');
//         return false;
//       }
//     }
    
//     return true;
//   };

//   const handleSubmitBooking = async () => {
//     if (!validateBookingForm()) {
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       let payload = {};
//       const providerType = selectedProvider?.service_charge_type;
      
//       if (providerType === 'Per Hour') {
//         payload = {
//           user: parseInt(bookingData.user),
//           service_provider: bookingData.service_provider,
//           service_start_date: bookingData.service_start_date,
//           service_end_date: bookingData.service_end_date || bookingData.service_start_date,
//           number_of_hours: parseInt(bookingData.number_of_hours),
//           address: bookingData.address,
//           booking_notes: bookingData.booking_notes,
//           payment_status: bookingData.payment_status,
//           booking_status: bookingData.booking_status
//         };
//       } else if (providerType === 'Per Day') {
//         payload = {
//           user: parseInt(bookingData.user),
//           service_provider: bookingData.service_provider,
//           service_start_date: bookingData.service_start_date,
//           service_end_date: bookingData.service_end_date,
//           number_of_days: parseInt(bookingData.number_of_days),
//           address: bookingData.address,
//           booking_notes: bookingData.booking_notes,
//           payment_status: bookingData.payment_status,
//           booking_status: bookingData.booking_status
//         };
//       } else if (providerType === 'Contract') {
//         payload = {
//           user: parseInt(bookingData.user),
//           service_provider: bookingData.service_provider,
//           service_start_date: bookingData.service_start_date,
//           service_end_date: bookingData.service_end_date,
//           number_of_days: parseInt(bookingData.number_of_days),
//           address: bookingData.address,
//           booking_notes: bookingData.booking_notes,
//           payment_status: bookingData.payment_status,
//           booking_status: bookingData.booking_status
//         };
//       }
      
//       const response = await fetch(`${baseurl}/service-bookings/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Booking failed');
//       }
      
//       const result = await response.json();
      
//       // Close modal and show success message
//       setShowModal(false);
//       Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: 'Booking created successfully!',
//         confirmButtonColor: '#273c75'
//       });
      
//       // Reset form
//       setBookingData({
//         user: parseInt(currentUserId),
//         service_provider: null,
//         service_start_date: '',
//         service_end_date: '',
//         number_of_hours: '',
//         number_of_days: '',
//         address: '',
//         booking_notes: '',
//         payment_status: 'Pending',
//         booking_status: 'Pending'
//       });
//       setSelectedProvider(null);
      
//     } catch (error) {
//       console.error('Booking error:', error);
//       setBookingError(error.message || 'Failed to create booking. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedProvider(null);
//     setBookingError('');
//   };

//   // Calculate total price based on service charge type
//   const calculateTotalPrice = () => {
//     if (!selectedProvider) return 0;
//     const rate = parseFloat(selectedProvider.service_charges) || 0;
    
//     if (selectedProvider.service_charge_type === 'Per Hour') {
//       const hours = parseInt(bookingData.number_of_hours) || 0;
//       return rate * hours;
//     } else if (selectedProvider.service_charge_type === 'Per Day') {
//       const days = parseInt(bookingData.number_of_days) || 0;
//       return rate * days;
//     } else if (selectedProvider.service_charge_type === 'Contract') {
//       const days = parseInt(bookingData.number_of_days) || 0;
//       return rate * days;
//     }
//     return 0;
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center min-vh-100">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="container mt-5">
//           <div className="alert alert-danger" role="alert">
//             <i className="bi bi-exclamation-triangle-fill me-2"></i>
//             Error: {error}
//             {error.includes('not logged in') && (
//               <div className="mt-3">
//                 <button 
//                   className="btn btn-primary"
//                   onClick={() => navigate('/login')}
//                 >
//                   Go to Login
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <AgentNavbar />
//       <div className="container py-4">
//         {/* Back Button and Search Bar Row */}
//         <div className="row mb-4 align-items-center">
//           <div className="col-12 col-md-4 mb-3 mb-md-0">
//             <button 
//               onClick={handleGoBack}
//               className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
//               style={{ borderRadius: '6px', padding: '8px 20px' }}
//             >
//               <i className="bi bi-arrow-left"></i>
//               Back
//             </button>
//           </div>
//           <div className="col-12 col-md-8">
//             <div className="input-group" style={{ maxWidth: '500px', marginLeft: 'auto' }}>
//               <span className="input-group-text bg-white">
//                 <i className="bi bi-search"></i>
//               </span>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search by name, business, service, area, city, or email..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={{ borderRadius: '0 6px 6px 0' }}
//               />
//               {searchTerm && (
//                 <button
//                   className="btn btn-outline-secondary"
//                   type="button"
//                   onClick={() => setSearchTerm('')}
//                 >
//                   <i className="bi bi-x-lg"></i>
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         <h1 className="text-center mb-4 display-6 fw-bold"> Service Providers</h1>
        
//         {/* Search Results Count */}
//         {searchTerm && (
//           <div className="text-center mb-3">
//             <p className="text-muted">
//               Found {filteredProviders.length} verified provider{filteredProviders.length !== 1 ? 's' : ''}
//             </p>
//           </div>
//         )}

//         {/* No Results Message */}
//         {filteredProviders.length === 0 && (
//           <div className="text-center py-5">
//             <i className="bi bi-search display-1 text-muted"></i>
//             <h3 className="mt-3">No verified service providers found</h3>
//             <p className="text-muted">Try adjusting your search criteria</p>
//             {searchTerm && (
//               <button 
//                 className="btn btn-primary mt-2"
//                 onClick={() => setSearchTerm('')}
//               >
//                 Clear Search
//               </button>
//             )}
//           </div>
//         )}

//         {/* Grid Layout - 4 cards per row on desktop */}
//         <div className="row g-4">
//           {filteredProviders.map((provider) => {
//             const verificationBadge = getVerificationStatusBadge(provider.verification_status);
//             return (
//               <div key={provider.provider_id} className="col-12 col-sm-6 col-lg-3">
//                 <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-card">
//                   {/* Verification Status Badge - Top Right Corner */}
//                   <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
//                     <span className={`badge ${verificationBadge.class} px-3 py-2 rounded-pill fs-6`}>
//                       {verificationBadge.text}
//                     </span>
//                   </div>

//                   {/* Image Section - Fixed Size */}
//                   <div className="card-img-top p-3 bg-light d-flex align-items-center justify-content-center">
//                     <div 
//                       style={{ 
//                         width: '100%', 
//                         height: '200px',
//                         maxWidth: '300px',
//                         margin: '0 auto'
//                       }}
//                     >
//                       {provider.photo ? (
//                         <img
//                           src={`${baseurl}${provider.photo}`}
//                           alt={provider.full_name}
//                           style={{ 
//                             width: '100%', 
//                             height: '100%', 
//                             objectFit: 'cover',
//                             borderRadius: '8px'
//                           }}
//                           onError={(e) => {
//                             e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
//                           }}
//                         />
//                       ) : (
//                         <div 
//                           className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-25"
//                           style={{ 
//                             width: '100%', 
//                             height: '100%', 
//                             borderRadius: '8px'
//                           }}
//                         >
//                           <span className="text-muted">No Image</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Content Section */}
//                   <div className="card-body p-3">
//                     {/* Full Name */}
//                     <div className="mb-2 d-flex align-items-start gap-2">
//                       <i className="bi bi-person-fill text-primary fs-6 mt-1 flex-shrink-0"></i>
//                       <div className="small">
//                         <strong>Name:</strong> {provider.full_name}
//                       </div>
//                     </div>
                    
//                     {/* Business Name */}
//                     {provider.business_name && (
//                       <div className="mb-2 d-flex align-items-start gap-2">
//                         <i className="bi bi-building-fill text-secondary fs-6 mt-1 flex-shrink-0"></i>
//                         <div className="small">
//                           <strong>Business:</strong> {provider.business_name}
//                         </div>
//                       </div>
//                     )}
                    
//                     {/* Service Name */}
//                     <div className="mb-2 d-flex align-items-start gap-2">
//                       <i className="bi bi-briefcase-fill text-danger fs-6 mt-1 flex-shrink-0"></i>
//                       <div className="small">
//                         <strong>Service:</strong> {getServiceName(provider.service_category)}
//                       </div>
//                     </div>

//                     {/* Service Area */}
//                     {provider.service_area && (
//                       <div className="mb-2 d-flex align-items-start gap-2">
//                         <i className="bi bi-geo-alt-fill text-primary fs-6 mt-1 flex-shrink-0"></i>
//                         <div className="small">
//                           <strong>Area:</strong> {provider.service_area}
//                         </div>
//                       </div>
//                     )}

//                     {/* City */}
//                     {provider.city && (
//                       <div className="mb-2 d-flex align-items-start gap-2">
//                         <i className="bi bi-geo-fill text-success fs-6 mt-1 flex-shrink-0"></i>
//                         <div className="small">
//                           <strong>City:</strong> {provider.city}
//                         </div>
//                       </div>
//                     )}

//                     {/* Address - Truncated */}
//                     {provider.address && (
//                       <div className="mb-2 d-flex align-items-start gap-2">
//                         <i className="bi bi-house-door-fill text-info fs-6 mt-1 flex-shrink-0"></i>
//                         <div className="small text-truncate" title={provider.address}>
//                           <strong>Address:</strong> {provider.address}
//                         </div>
//                       </div>
//                     )}

//                     {/* Email - Truncated */}
//                     <div className="mb-2 d-flex align-items-start gap-2">
//                       <i className="bi bi-envelope-fill text-warning fs-6 mt-1 flex-shrink-0"></i>
//                       <div className="small text-truncate" title={provider.email}>
//                         <strong>Email:</strong> {provider.email || 'N/A'}
//                       </div>
//                     </div>

//                     {/* Service Charge Type */}
//                     {provider.service_charge_type && (
//                       <div className="mb-2 d-flex align-items-start gap-2">
//                         <i className="bi bi-clock-fill text-info fs-6 mt-1 flex-shrink-0"></i>
//                         <div className="small">
//                           <strong>Service Charge Type:</strong> {provider.service_charge_type}
//                         </div>
//                       </div>
//                     )}
                    
//                     {/* Service Charges */}
//                     {provider.service_charges && (
//                       <div className="mb-2 d-flex align-items-start gap-2">
//                         <i className="bi bi-currency-rupee text-success fs-6 mt-1 flex-shrink-0"></i>
//                         <div className="small">
//                           <strong>Charges:</strong> {formatCurrency(provider.service_charges)} per {
//                             provider.service_charge_type === 'Per Hour' ? 'hour' : 
//                             provider.service_charge_type === 'Per Day' ? 'day' : 'contract'
//                           }
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Footer with Buttons - Side by side on desktop, stacked on mobile */}
//                   <div className="card-footer bg-white border-0 pb-3 pt-0">
//                     {/* Button Container - Responsive layout */}
//                     <div className="d-flex flex-column flex-sm-row gap-2 mt-2">
//                       {/* Reach Out Button */}
//                       <button
//                         onClick={handleReachOutClick}
//                         className="btn btn-success flex-fill d-flex align-items-center justify-content-center gap-2"
//                         style={{
//                           padding: '8px 12px',
//                           borderRadius: '8px',
//                           fontSize: '14px',
//                           fontWeight: '500',
//                           transition: 'all 0.3s ease'
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.transform = 'translateY(-2px)';
//                           e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.transform = 'translateY(0)';
//                           e.currentTarget.style.boxShadow = 'none';
//                         }}
//                       >
//                         <i className="bi bi-telephone-fill" style={{ fontSize: '14px' }}></i>
//                         <span>Reach Out</span>
//                       </button>
                      
//                       {/* Book Now Button */}
//                       <button
//                         className="btn btn-primary flex-fill d-flex align-items-center justify-content-center gap-2"
//                         onClick={() => handleBookNow(provider)}
//                         style={{ 
//                           backgroundColor: '#273c75',
//                           borderColor: '#273c75',
//                           padding: '8px 12px',
//                           borderRadius: '8px',
//                           fontSize: '14px',
//                           fontWeight: '500',
//                           transition: 'all 0.3s ease'
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.transform = 'translateY(-2px)';
//                           e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.transform = 'translateY(0)';
//                           e.currentTarget.style.boxShadow = 'none';
//                         }}
//                       >
//                         <i className="bi bi-calendar-check me-1"></i>
//                         Book Now
//                       </button>
//                     </div>
                    
                  
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Booking Modal */}
//         {showModal && selectedProvider && (
//           <div 
//             className="modal show d-block" 
//             tabIndex="-1" 
//             style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
//             onClick={closeModal}
//           >
//             <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
//               <div className="modal-content">
//                 <div className="modal-header" style={{ backgroundColor: '#273c75', color: 'white' }}>
//                   <h5 className="modal-title">
//                     <i className="bi bi-calendar-check me-2"></i>
//                     Book Service - {selectedProvider.full_name}
//                   </h5>
//                   <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
//                 </div>
//                 <div className="modal-body">
//                   {bookingError && (
//                     <div className="alert alert-danger alert-dismissible fade show" role="alert">
//                       {bookingError}
//                       <button type="button" className="btn-close" onClick={() => setBookingError('')}></button>
//                     </div>
//                   )}
                  
//                   {/* Provider Details Summary */}
//                   <div className="row mb-4">
//                     <div className="col-md-12">
//                       <div className="card bg-light">
//                         <div className="card-body">
//                           <h6 className="card-title mb-3">Service Provider Details</h6>
//                           <div className="row">
//                             <div className="col-md-6">
//                               <p className="mb-1"><strong>Name:</strong> {selectedProvider.full_name}</p>
//                               <p className="mb-1"><strong>Service:</strong> {getServiceName(selectedProvider.service_category)}</p>
//                               <p className="mb-1"><strong>Charge Type:</strong> {selectedProvider.service_charge_type}</p>
//                             </div>
//                             <div className="col-md-6">
//                               <p className="mb-1"><strong>Rate:</strong> {formatCurrency(selectedProvider.service_charges)}</p>
//                               <p className="mb-1">
//                                 <strong>Verification Status:</strong>{' '}
//                                 <span className={`badge ${getVerificationStatusBadge(selectedProvider.verification_status).class}`}>
//                                   {getVerificationStatusBadge(selectedProvider.verification_status).text}
//                                 </span>
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <form>
//                     <div className="row">
//                       {/* Service Start Date */}
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label fw-bold">Service Start Date *</label>
//                         <input
//                           type="date"
//                           name="service_start_date"
//                           value={bookingData.service_start_date}
//                           onChange={handleBookingInputChange}
//                           className="form-control"
//                           min={new Date().toISOString().split('T')[0]}
//                           required
//                         />
//                       </div>
                      
//                       {/* Duration based on charge type */}
//                       {selectedProvider.service_charge_type === 'Per Hour' && (
//                         <>
//                           <div className="col-md-6 mb-3">
//                             <label className="form-label fw-bold">Number of Hours *</label>
//                             <input
//                               type="number"
//                               name="number_of_hours"
//                               value={bookingData.number_of_hours}
//                               onChange={handleBookingInputChange}
//                               className="form-control"
//                               placeholder="Enter hours"
//                               min="1"
//                               step="1"
//                               required
//                             />
//                           </div>
//                           <div className="col-md-6 mb-3">
//                             <label className="form-label fw-bold">Service End Date</label>
//                             <input
//                               type="date"
//                               className="form-control"
//                               value={bookingData.service_start_date}
//                               disabled
//                             />
//                             <small className="text-muted">Same as start date for hourly booking</small>
//                           </div>
//                         </>
//                       )}
                      
//                       {(selectedProvider.service_charge_type === 'Per Day' || selectedProvider.service_charge_type === 'Contract') && (
//                         <>
//                           <div className="col-md-6 mb-3">
//                             <label className="form-label fw-bold">Number of Days *</label>
//                             <input
//                               type="number"
//                               name="number_of_days"
//                               value={bookingData.number_of_days}
//                               onChange={handleBookingInputChange}
//                               className="form-control"
//                               placeholder="Enter days"
//                               min="1"
//                               step="1"
//                               required
//                             />
//                           </div>
//                           <div className="col-md-6 mb-3">
//                             <label className="form-label fw-bold">Service End Date</label>
//                             <input
//                               type="date"
//                               name="service_end_date"
//                               value={bookingData.service_end_date}
//                               onChange={handleBookingInputChange}
//                               className="form-control"
//                               min={bookingData.service_start_date}
//                               required
//                             />
//                             <small className="text-muted">Automatically calculated based on days</small>
//                           </div>
//                         </>
//                       )}
                      
//                       {/* Address */}
//                       <div className="col-12 mb-3">
//                         <label className="form-label fw-bold">Service Address *</label>
//                         <textarea
//                           name="address"
//                           value={bookingData.address}
//                           onChange={handleBookingInputChange}
//                           className="form-control"
//                           rows="3"
//                           placeholder="Enter full service address"
//                           required
//                         ></textarea>
//                       </div>
                      
//                       {/* Booking Notes */}
//                       <div className="col-12 mb-3">
//                         <label className="form-label fw-bold">Additional Notes (Optional)</label>
//                         <textarea
//                           name="booking_notes"
//                           value={bookingData.booking_notes}
//                           onChange={handleBookingInputChange}
//                           className="form-control"
//                           rows="2"
//                           placeholder="Any special requirements or instructions"
//                         ></textarea>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//                 <div className="modal-footer">
//                   <button type="button" className="btn btn-secondary" onClick={closeModal}>
//                     Cancel
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-primary"
//                     onClick={handleSubmitBooking}
//                     disabled={isSubmitting}
//                     style={{ backgroundColor: '#273c75', borderColor: '#273c75' }}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2"></span>
//                         Processing...
//                       </>
//                     ) : (
//                       <>
//                         <i className="bi bi-check-circle me-2"></i>
//                         Confirm Booking
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Bootstrap Icons CDN */}
//         <link 
//           rel="stylesheet" 
//           href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
//         />
//       </div>

//       {/* Custom CSS for hover effects and responsive image */}
//       <style jsx>{`
//         .hover-card {
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//           position: relative;
//         }
//         .hover-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
//         }
        
//         /* Ensure image container maintains fixed size on all devices */
//         .card-img-top {
//           min-height: 200px;
//           max-height: 200px;
//         }
        
//         /* Responsive adjustments */
//         @media (max-width: 768px) {
//           .card-img-top div {
//             width: 100% !important;
//             height: 200px !important;
//           }
//         }
        
//         .modal {
//           z-index: 1050;
//         }
//       `}</style>
//     </>
//   );
// };

// export default ServiceProviders;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import { baseurl } from '../../BaseURL/BaseURL';
import Swal from 'sweetalert2';

// Load Razorpay script dynamically
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const ServiceProviders = () => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  
  // Get user_id from localStorage
  const [currentUserId, setCurrentUserId] = useState(null);
  
  // Booking Modal States
  const [showModal, setShowModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [bookingData, setBookingData] = useState({
    user: null,
    service_provider: null,
    service_start_date: '',
    service_end_date: '',
    number_of_hours: '',
    number_of_days: '',
    address: '',
    booking_notes: '',
    payment_status: 'Pending',
    booking_status: 'Pending'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState('');

  // Admin phone number constant
  const ADMIN_PHONE_NUMBER = '9074307248';

  // Load Razorpay script on component mount
  useEffect(() => {
    const initRazorpay = async () => {
      const loaded = await loadRazorpayScript();
      setRazorpayLoaded(loaded);
      if (!loaded) {
        console.error('Failed to load Razorpay script');
      }
    };
    initRazorpay();
  }, []);

  // Get user_id from localStorage on component mount
  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      setError('User not logged in. Please login to continue.');
      setLoading(false);
      return;
    }
    setCurrentUserId(userId);
    setBookingData(prev => ({
      ...prev,
      user: parseInt(userId)
    }));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUserId) return;
      
      try {
        const providersResponse = await fetch(`${baseurl}/service-providers/?exclude_user_id=${currentUserId}`);
        const categoriesResponse = await fetch(`${baseurl}/service-categories/`);

        if (!providersResponse.ok || !categoriesResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const providersData = await providersResponse.json();
        const categoriesData = await categoriesResponse.json();

        let allProviders = providersData.results || providersData || [];
        const verifiedProviders = allProviders.filter(
          provider => provider.verification_status?.toLowerCase() === 'verified'
        );

        setProviders(verifiedProviders);
        setCategories(categoriesData.results || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUserId]);

  const getServiceName = (categoryId) => {
    const category = categories.find(cat => cat.category_id === categoryId);
    return category ? category.category_name : 'Unknown Service';
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getVerificationStatusBadge = (verificationStatus) => {
    switch(verificationStatus?.toLowerCase()) {
      case 'verified':
        return { class: 'bg-success', text: 'Verified' };
      case 'pending':
        return { class: 'bg-warning text-dark', text: 'Pending' };
      case 'rejected':
        return { class: 'bg-danger', text: 'Rejected' };
      case 'suspended':
        return { class: 'bg-secondary', text: 'Suspended' };
      default:
        return { class: 'bg-info', text: verificationStatus || 'Unknown' };
    }
  };

  const filteredProviders = providers.filter(provider => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      provider.full_name?.toLowerCase().includes(searchTermLower) ||
      provider.business_name?.toLowerCase().includes(searchTermLower) ||
      getServiceName(provider.service_category)?.toLowerCase().includes(searchTermLower) ||
      provider.service_area?.toLowerCase().includes(searchTermLower) ||
      provider.city?.toLowerCase().includes(searchTermLower) ||
      provider.email?.toLowerCase().includes(searchTermLower)
    );
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleReachOutClick = () => {
    const cleanPhoneNumber = ADMIN_PHONE_NUMBER.replace(/[^\d+]/g, '');
    window.location.href = `tel:${cleanPhoneNumber}`;
  };

  const handleBookNow = (provider) => {
    if (!currentUserId) {
      setError('Please login to book a service');
      return;
    }
    
    setSelectedProvider(provider);
    setBookingData(prev => ({
      ...prev,
      service_provider: provider.provider_id,
      user: parseInt(currentUserId),
      service_start_date: '',
      service_end_date: '',
      number_of_hours: '',
      number_of_days: '',
      address: '',
      booking_notes: '',
    }));
    setBookingError('');
    setShowModal(true);
  };

  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'number_of_days' && selectedProvider?.service_charge_type === 'Contract') {
      const startDate = bookingData.service_start_date;
      if (startDate && value) {
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + parseInt(value));
        const endDateStr = end.toISOString().split('T')[0];
        setBookingData(prev => ({
          ...prev,
          service_end_date: endDateStr
        }));
      }
    }
    
    if (name === 'number_of_days' && selectedProvider?.service_charge_type === 'Per Day') {
      const startDate = bookingData.service_start_date;
      if (startDate && value) {
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + parseInt(value) - 1);
        const endDateStr = end.toISOString().split('T')[0];
        setBookingData(prev => ({
          ...prev,
          service_end_date: endDateStr
        }));
      }
    }
    
    if (name === 'service_start_date' && selectedProvider?.service_charge_type === 'Per Hour') {
      setBookingData(prev => ({
        ...prev,
        service_end_date: value
      }));
    }
  };

  const validateBookingForm = () => {
    if (!bookingData.service_start_date) {
      setBookingError('Please select start date');
      return false;
    }
    
    if (!bookingData.address.trim()) {
      setBookingError('Please enter address');
      return false;
    }
    
    if (selectedProvider?.service_charge_type === 'Per Hour') {
      if (!bookingData.number_of_hours || bookingData.number_of_hours <= 0) {
        setBookingError('Please enter valid number of hours');
        return false;
      }
    } else if (selectedProvider?.service_charge_type === 'Per Day' || selectedProvider?.service_charge_type === 'Contract') {
      if (!bookingData.number_of_days || bookingData.number_of_days <= 0) {
        setBookingError('Please enter valid number of days');
        return false;
      }
    }
    
    return true;
  };

  // Open Razorpay checkout
  const openRazorpayCheckout = (orderData) => {
    const options = {
      key: orderData.razorpay_key,
      amount: orderData.amount * 100, // Amount in paise
      currency: 'INR',
      name: selectedProvider.business_name || selectedProvider.full_name,
      description: `Booking for ${getServiceName(selectedProvider.service_category)}`,
      order_id: orderData.razorpay_order_id,
      handler: async (response) => {
        // Verify payment
        await verifyPayment(response, orderData);
      },
      prefill: {
        name: localStorage.getItem('user_name') || '',
        email: localStorage.getItem('user_email') || '',
      },
      theme: {
        color: '#273c75'
      },
      modal: {
        ondismiss: () => {
          Swal.fire({
            icon: 'warning',
            title: 'Payment Incomplete',
            text: 'Your booking was created but payment is pending. You can complete payment later.',
            confirmButtonColor: '#273c75'
          });
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  // Verify payment with backend
  const verifyPayment = async (paymentResponse, orderData) => {
    try {
      const verifyResponse = await fetch(`${baseurl}/service-bookings/verify-payment/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_signature: paymentResponse.razorpay_signature
        })
      });

      const result = await verifyResponse.json();

      if (result.success) {
        Swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          text: 'Your booking has been confirmed successfully.',
          confirmButtonColor: '#273c75'
        });
        
        // Reset and close modal
        setShowModal(false);
        setSelectedProvider(null);
        setBookingData({
          user: parseInt(currentUserId),
          service_provider: null,
          service_start_date: '',
          service_end_date: '',
          number_of_hours: '',
          number_of_days: '',
          address: '',
          booking_notes: '',
          payment_status: 'Pending',
          booking_status: 'Pending'
        });
      } else {
        throw new Error(result.message || 'Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Payment Verification Failed',
        text: error.message || 'Please contact support for assistance.',
        confirmButtonColor: '#273c75'
      });
    }
  };

  const handleSubmitBooking = async () => {
    if (!validateBookingForm()) {
      return;
    }
    
    if (!razorpayLoaded) {
      setBookingError('Payment system is loading. Please try again.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let payload = {};
      const providerType = selectedProvider?.service_charge_type;
      
      if (providerType === 'Per Hour') {
        payload = {
          user: parseInt(bookingData.user),
          service_provider: bookingData.service_provider,
          service_start_date: bookingData.service_start_date,
          service_end_date: bookingData.service_end_date || bookingData.service_start_date,
          number_of_hours: parseInt(bookingData.number_of_hours),
          address: bookingData.address,
          booking_notes: bookingData.booking_notes,
          payment_status: 'Pending',
          booking_status: 'Pending'
        };
      } else if (providerType === 'Per Day') {
        payload = {
          user: parseInt(bookingData.user),
          service_provider: bookingData.service_provider,
          service_start_date: bookingData.service_start_date,
          service_end_date: bookingData.service_end_date,
          number_of_days: parseInt(bookingData.number_of_days),
          address: bookingData.address,
          booking_notes: bookingData.booking_notes,
          payment_status: 'Pending',
          booking_status: 'Pending'
        };
      } else if (providerType === 'Contract') {
        payload = {
          user: parseInt(bookingData.user),
          service_provider: bookingData.service_provider,
          service_start_date: bookingData.service_start_date,
          service_end_date: bookingData.service_end_date,
          number_of_days: parseInt(bookingData.number_of_days),
          address: bookingData.address,
          booking_notes: bookingData.booking_notes,
          payment_status: 'Pending',
          booking_status: 'Pending'
        };
      }
      
      // Step 1: Create booking and get Razorpay order
      const response = await fetch(`${baseurl}/service-bookings/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.detail || 'Booking creation failed');
      }
      
      const result = await response.json();
      
      if (result.success && result.razorpay_order_id) {
        // Step 2: Open Razorpay checkout
        openRazorpayCheckout({
          razorpay_key: result.razorpay_key,
          razorpay_order_id: result.razorpay_order_id,
          amount: result.amount
        });
        
        // Don't close modal yet - let Razorpay handle it
        setBookingError('');
      } else {
        throw new Error('Failed to create payment order');
      }
      
    } catch (error) {
      console.error('Booking error:', error);
      setBookingError(error.message || 'Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProvider(null);
    setBookingError('');
  };

  const calculateTotalPrice = () => {
    if (!selectedProvider) return 0;
    const rate = parseFloat(selectedProvider.service_charges) || 0;
    
    if (selectedProvider.service_charge_type === 'Per Hour') {
      const hours = parseInt(bookingData.number_of_hours) || 0;
      return rate * hours;
    } else if (selectedProvider.service_charge_type === 'Per Day') {
      const days = parseInt(bookingData.number_of_days) || 0;
      return rate * days;
    } else if (selectedProvider.service_charge_type === 'Contract') {
      const days = parseInt(bookingData.number_of_days) || 0;
      return rate * days;
    }
    return 0;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <AgentNavbar />
        <div className="container mt-5">
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            Error: {error}
            {error.includes('not logged in') && (
              <div className="mt-3">
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/login')}
                >
                  Go to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AgentNavbar />
      <div className="container py-4">
        {/* Back Button and Search Bar Row */}
        <div className="row mb-4 align-items-center">
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <button 
              onClick={handleGoBack}
              className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
              style={{ borderRadius: '6px', padding: '8px 20px' }}
            >
              <i className="bi bi-arrow-left"></i>
              Back
            </button>
          </div>
          <div className="col-12 col-md-8">
            <div className="input-group" style={{ maxWidth: '500px', marginLeft: 'auto' }}>
              <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, business, service, area, city, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderRadius: '0 6px 6px 0' }}
              />
              {searchTerm && (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setSearchTerm('')}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>
          </div>
        </div>

        <h1 className="text-center mb-4 display-6 fw-bold"> Service Providers</h1>
        
        {searchTerm && (
          <div className="text-center mb-3">
            <p className="text-muted">
              Found {filteredProviders.length} verified provider{filteredProviders.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {filteredProviders.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-search display-1 text-muted"></i>
            <h3 className="mt-3">No verified service providers found</h3>
            <p className="text-muted">Try adjusting your search criteria</p>
            {searchTerm && (
              <button 
                className="btn btn-primary mt-2"
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Grid Layout - 4 cards per row on desktop */}
        <div className="row g-4">
          {filteredProviders.map((provider) => {
            const verificationBadge = getVerificationStatusBadge(provider.verification_status);
            return (
              <div key={provider.provider_id} className="col-12 col-sm-6 col-lg-3">
                <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-card">
                  <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
                    <span className={`badge ${verificationBadge.class} px-3 py-2 rounded-pill fs-6`}>
                      {verificationBadge.text}
                    </span>
                  </div>

                  <div className="card-img-top p-3 bg-light d-flex align-items-center justify-content-center">
                    <div style={{ width: '100%', height: '200px', maxWidth: '300px', margin: '0 auto' }}>
                      {provider.photo ? (
                        <img
                          src={`${baseurl}${provider.photo}`}
                          alt={provider.full_name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                          }}
                        />
                      ) : (
                        <div className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-25" style={{ width: '100%', height: '100%', borderRadius: '8px' }}>
                          <span className="text-muted">No Image</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="card-body p-3">
                    <div className="mb-2 d-flex align-items-start gap-2">
                      <i className="bi bi-person-fill text-primary fs-6 mt-1 flex-shrink-0"></i>
                      <div className="small"><strong>Name:</strong> {provider.full_name}</div>
                    </div>
                    
                    {provider.business_name && (
                      <div className="mb-2 d-flex align-items-start gap-2">
                        <i className="bi bi-building-fill text-secondary fs-6 mt-1 flex-shrink-0"></i>
                        <div className="small"><strong>Business:</strong> {provider.business_name}</div>
                      </div>
                    )}
                    
                    <div className="mb-2 d-flex align-items-start gap-2">
                      <i className="bi bi-briefcase-fill text-danger fs-6 mt-1 flex-shrink-0"></i>
                      <div className="small"><strong>Service:</strong> {getServiceName(provider.service_category)}</div>
                    </div>

                    {provider.service_area && (
                      <div className="mb-2 d-flex align-items-start gap-2">
                        <i className="bi bi-geo-alt-fill text-primary fs-6 mt-1 flex-shrink-0"></i>
                        <div className="small"><strong>Area:</strong> {provider.service_area}</div>
                      </div>
                    )}

                    {provider.city && (
                      <div className="mb-2 d-flex align-items-start gap-2">
                        <i className="bi bi-geo-fill text-success fs-6 mt-1 flex-shrink-0"></i>
                        <div className="small"><strong>City:</strong> {provider.city}</div>
                      </div>
                    )}

                    {provider.address && (
                      <div className="mb-2 d-flex align-items-start gap-2">
                        <i className="bi bi-house-door-fill text-info fs-6 mt-1 flex-shrink-0"></i>
                        <div className="small text-truncate" title={provider.address}>
                          <strong>Address:</strong> {provider.address}
                        </div>
                      </div>
                    )}

                    <div className="mb-2 d-flex align-items-start gap-2">
                      <i className="bi bi-envelope-fill text-warning fs-6 mt-1 flex-shrink-0"></i>
                      <div className="small text-truncate" title={provider.email}>
                        <strong>Email:</strong> {provider.email || 'N/A'}
                      </div>
                    </div>

                    {provider.service_charge_type && (
                      <div className="mb-2 d-flex align-items-start gap-2">
                        <i className="bi bi-clock-fill text-info fs-6 mt-1 flex-shrink-0"></i>
                        <div className="small"><strong>Service Charge Type:</strong> {provider.service_charge_type}</div>
                      </div>
                    )}
                    
                    {provider.service_charges && (
                      <div className="mb-2 d-flex align-items-start gap-2">
                        <i className="bi bi-currency-rupee text-success fs-6 mt-1 flex-shrink-0"></i>
                        <div className="small">
                          <strong>Charges:</strong> {formatCurrency(provider.service_charges)} per {
                            provider.service_charge_type === 'Per Hour' ? 'hour' : 
                            provider.service_charge_type === 'Per Day' ? 'day' : 'contract'
                          }
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="card-footer bg-white border-0 pb-3 pt-0">
                    <div className="d-flex flex-column flex-sm-row gap-2 mt-2">
                      <button
                        onClick={handleReachOutClick}
                        className="btn btn-success flex-fill d-flex align-items-center justify-content-center gap-2"
                        style={{ padding: '8px 12px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', transition: 'all 0.3s ease' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <i className="bi bi-telephone-fill" style={{ fontSize: '14px' }}></i>
                        <span>Reach Out</span>
                      </button>
                      
                      <button
                        className="btn btn-primary flex-fill d-flex align-items-center justify-content-center gap-2"
                        onClick={() => handleBookNow(provider)}
                        style={{ 
                          backgroundColor: '#273c75',
                          borderColor: '#273c75',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '500',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <i className="bi bi-calendar-check me-1"></i>
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Booking Modal */}
        {showModal && selectedProvider && (
          <div 
            className="modal show d-block" 
            tabIndex="-1" 
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={closeModal}
          >
            <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header" style={{ backgroundColor: '#273c75', color: 'white' }}>
                  <h5 className="modal-title">
                    <i className="bi bi-calendar-check me-2"></i>
                    Book Service - {selectedProvider.full_name}
                  </h5>
                  <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  {bookingError && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      {bookingError}
                      <button type="button" className="btn-close" onClick={() => setBookingError('')}></button>
                    </div>
                  )}
                  
                  {/* Provider Details Summary */}
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <div className="card bg-light">
                        <div className="card-body">
                          <h6 className="card-title mb-3">Service Provider Details</h6>
                          <div className="row">
                            <div className="col-md-6">
                              <p className="mb-1"><strong>Name:</strong> {selectedProvider.full_name}</p>
                              <p className="mb-1"><strong>Service:</strong> {getServiceName(selectedProvider.service_category)}</p>
                              <p className="mb-1"><strong>Charge Type:</strong> {selectedProvider.service_charge_type}</p>
                            </div>
                            <div className="col-md-6">
                              <p className="mb-1"><strong>Rate:</strong> {formatCurrency(selectedProvider.service_charges)}</p>
                              <p className="mb-1">
                                <strong>Verification Status:</strong>{' '}
                                <span className={`badge ${getVerificationStatusBadge(selectedProvider.verification_status).class}`}>
                                  {getVerificationStatusBadge(selectedProvider.verification_status).text}
                                </span>
                              </p>
                              <p className="mb-1">
                                <strong>Total Amount:</strong>{' '}
                                <span className="fw-bold text-success">{formatCurrency(calculateTotalPrice())}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <form>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Service Start Date *</label>
                        <input
                          type="date"
                          name="service_start_date"
                          value={bookingData.service_start_date}
                          onChange={handleBookingInputChange}
                          className="form-control"
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                      
                      {selectedProvider.service_charge_type === 'Per Hour' && (
                        <>
                          <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Number of Hours *</label>
                            <input
                              type="number"
                              name="number_of_hours"
                              value={bookingData.number_of_hours}
                              onChange={handleBookingInputChange}
                              className="form-control"
                              placeholder="Enter hours"
                              min="1"
                              step="1"
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Service End Date</label>
                            <input
                              type="date"
                              className="form-control"
                              value={bookingData.service_start_date}
                              disabled
                            />
                            <small className="text-muted">Same as start date for hourly booking</small>
                          </div>
                        </>
                      )}
                      
                      {(selectedProvider.service_charge_type === 'Per Day' || selectedProvider.service_charge_type === 'Contract') && (
                        <>
                          <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Number of Days *</label>
                            <input
                              type="number"
                              name="number_of_days"
                              value={bookingData.number_of_days}
                              onChange={handleBookingInputChange}
                              className="form-control"
                              placeholder="Enter days"
                              min="1"
                              step="1"
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Service End Date</label>
                            <input
                              type="date"
                              name="service_end_date"
                              value={bookingData.service_end_date}
                              onChange={handleBookingInputChange}
                              className="form-control"
                              min={bookingData.service_start_date}
                              required
                            />
                            <small className="text-muted">Automatically calculated based on days</small>
                          </div>
                        </>
                      )}
                      
                      <div className="col-12 mb-3">
                        <label className="form-label fw-bold">Service Address *</label>
                        <textarea
                          name="address"
                          value={bookingData.address}
                          onChange={handleBookingInputChange}
                          className="form-control"
                          rows="3"
                          placeholder="Enter full service address"
                          required
                        ></textarea>
                      </div>
                      
                      <div className="col-12 mb-3">
                        <label className="form-label fw-bold">Additional Notes (Optional)</label>
                        <textarea
                          name="booking_notes"
                          value={bookingData.booking_notes}
                          onChange={handleBookingInputChange}
                          className="form-control"
                          rows="2"
                          placeholder="Any special requirements or instructions"
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmitBooking}
                    disabled={isSubmitting || !razorpayLoaded}
                    style={{ backgroundColor: '#273c75', borderColor: '#273c75' }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-credit-card me-2"></i>
                        Proceed to Pay {calculateTotalPrice() > 0 && formatCurrency(calculateTotalPrice())}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </div>

      <style jsx>{`
        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        
        .card-img-top {
          min-height: 200px;
          max-height: 200px;
        }
        
        @media (max-width: 768px) {
          .card-img-top div {
            width: 100% !important;
            height: 200px !important;
          }
        }
        
        .modal {
          z-index: 1050;
        }
      `}</style>
    </>
  );
};

export default ServiceProviders;