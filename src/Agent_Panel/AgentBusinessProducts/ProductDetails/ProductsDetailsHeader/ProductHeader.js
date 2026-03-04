// import React from "react";
// import "./ProductHeader.css";
// import { FaStar, FaTruck, FaStore } from "react-icons/fa";
// import { MdLocationOn } from "react-icons/md";

// const ShopHeader = ({ activeTab, onTabChange }) => {
//   return (
//     <div className="shop-header bg-white border-bottom">
//       <div className="container py-4">
//         <div className="d-flex align-items-center gap-4">

//           {/* Logo */}
//           <div className="shop-logo">
//             <img src="/logo.png" alt="Shop Logo" />
//           </div>

//           {/* Info */}
//           <div className="flex-grow-1">
//             <h3 className="fw-bold mb-1">Series Enterprises</h3>

//             <div className="text-muted d-flex align-items-center gap-1 mb-2">
//               <MdLocationOn />
//               Mumbai, Maharashtra
//             </div>

//             <div className="d-flex align-items-center gap-4 flex-wrap">
//               <div>
//                 <small className="text-muted">Ratings</small>
//                 <div className="text-warning">
//                   <FaStar /><FaStar /><FaStar /><FaStar />
//                   <FaStar className="text-secondary" />
//                 </div>
//               </div>

//               <div className="border-start ps-3">
//                 <small className="text-muted">Availability</small>
//                 <div className="text-success">
//                   <FaTruck /> Deliverable
//                 </div>
//               </div>

//               <div className="border-start ps-3">
//                 <small className="text-muted">Status</small>
//                 <div className="text-success">
//                   <FaStore /> Open
//                 </div>
//               </div>

//               <div className="border-start ps-3">
//                 <small className="text-muted">Shipping</small>
//                 <div className="text-success">
//                   <FaTruck /> Free Shipping
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

      
//       </div>
//     </div>
//   );
// };

// export default ShopHeader;




// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./ProductHeader.css";
// import { FaStar, FaTruck, FaStore } from "react-icons/fa";
// import { MdLocationOn } from "react-icons/md";
// import { baseurl } from "../../../../BaseURL/BaseURL";
// import {
//   ArrowLeft
// } from "lucide-react";

// const ShopHeader = ({ businessId }) => {
//   const [business, setBusiness] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!businessId) {
//       setLoading(false);
//       return;
//     }

//     const apiUrl = `${baseurl}/business/${businessId}/`;
//     console.log("🏪 Fetching Business:", apiUrl);

//     fetch(apiUrl)
//       .then(res => res.json())
//       .then(data => {
//         console.log("✅ Business API Response:", data);
//         setBusiness(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("❌ Business fetch error:", err);
//         setLoading(false);
//       });
//   }, [businessId]);

//   if (loading || !business) return null;

//   return (
//     <div className="shop-header bg-white border-bottom">
//       <div className="container py-4">
//         <div className="d-flex align-items-center gap-4">
//           <button
//           className="btn btn-outline-secondary mb-3 d-flex align-items-center gap-2"
//           onClick={() => navigate(-1)}
//         >
//           <ArrowLeft size={16} /> Back
//         </button>

//           {/* LOGO */}
//           <div className="shop-logo">
//             <img
//               src={
//                 business.logo
//                   ? `${baseurl}${business.logo}`
//                   : "/logo.png"
//               }
//               alt={business.business_name}
//             />
//           </div>

//           {/* INFO */}
//           <div className="flex-grow-1">
//             <h3 className="fw-bold mb-1">
//               {business.business_name}
//             </h3>

//             <div className="text-muted d-flex align-items-center gap-1 mb-2">
//               <MdLocationOn />
//               {business.city}, {business.state}
//             </div>

//             <div className="d-flex align-items-center gap-4 flex-wrap">

//               {/* RATINGS */}
//               <div>
//                 <small className="text-muted">Ratings</small>
//                 <div className="text-warning">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <FaStar
//                       key={i}
//                       className={
//                         i < Math.round(business.rating || 0)
//                           ? ""
//                           : "text-secondary"
//                       }
//                     />
//                   ))}
//                 </div>
//               </div>

//               {/* AVAILABILITY */}
//               <div className="border-start ps-3">
//                 <small className="text-muted">Availability</small>
//                 <div className="text-success">
//                   <FaTruck /> Deliverable
//                 </div>
//               </div>

//               {/* STATUS */}
//               <div className="border-start ps-3">
//                 <small className="text-muted">Status</small>
//                 <div className="text-success">
//                   <FaStore /> {business.is_active ? "Open" : "Closed"}
//                 </div>
//               </div>

//               {/* SHIPPING */}
//               <div className="border-start ps-3">
//                 <small className="text-muted">Shipping</small>
//                 <div className="text-success">
//                   <FaTruck /> Free Shipping
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopHeader;




// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./ProductHeader.css";
// import { FaStar, FaTruck, FaStore, FaChevronDown, FaChevronUp, FaClock } from "react-icons/fa";
// import { MdLocationOn } from "react-icons/md";
// import { baseurl } from "../../../../BaseURL/BaseURL";
// import {
//   ArrowLeft
// } from "lucide-react";

// const ShopHeader = ({ businessId }) => {
//   const [business, setBusiness] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showHours, setShowHours] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!businessId) {
//       setLoading(false);
//       return;
//     }

//     const apiUrl = `${baseurl}/business/${businessId}/`;
//     console.log("🏪 Fetching Business:", apiUrl);

//     fetch(apiUrl)
//       .then(res => res.json())
//       .then(data => {
//         console.log("✅ Business API Response:", data);
//         setBusiness(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("❌ Business fetch error:", err);
//         setLoading(false);
//       });
//   }, [businessId]);

//   // Function to format time from "11:00:00" to "11:00 AM"
//   const formatTime = (timeString) => {
//     if (!timeString) return "Closed";
    
//     // Extract hours and minutes
//     const [hours, minutes] = timeString.split(':');
//     const hour = parseInt(hours, 10);
//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     const hour12 = hour % 12 || 12;
    
//     return `${hour12}:${minutes} ${ampm}`;
//   };

//   // Function to format working hours for display
//   const formatWorkingHours = (hours) => {
//     if (!hours || hours.length === 0) return "Hours not available";
    
//     // Sort days in correct order
//     const dayOrder = {
//       'monday': 1,
//       'tuesday': 2,
//       'wednesday': 3,
//       'thursday': 4,
//       'friday': 5,
//       'saturday': 6,
//       'sunday': 7
//     };
    
//     const sortedHours = [...hours].sort((a, b) => dayOrder[a.day] - dayOrder[b.day]);
    
//     return sortedHours.map(hour => {
//       const dayName = hour.day.charAt(0).toUpperCase() + hour.day.slice(1);
      
//       if (hour.is_closed) {
//         return (
//           <div key={hour.id} className="d-flex justify-content-between py-1">
//             <span className="fw-medium">{dayName}</span>
//             <span className="text-danger">Closed</span>
//           </div>
//         );
//       } else {
//         return (
//           <div key={hour.id} className="d-flex justify-content-between py-1">
//             <span className="fw-medium">{dayName}</span>
//             <span className="text-success">
//               {formatTime(hour.opens_at)} - {formatTime(hour.closes_at)}
//             </span>
//           </div>
//         );
//       }
//     });
//   };

//   // Get today's status
//   const getTodayStatus = () => {
//     if (!business || !business.working_hours) return "Hours not available";
    
//     const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
//     const today = days[new Date().getDay()];
    
//     const todayHours = business.working_hours.find(h => h.day === today);
    
//     if (!todayHours) return "Hours not available";
//     if (todayHours.is_closed) return "Closed Today";
    
//     const openTime = formatTime(todayHours.opens_at);
//     const closeTime = formatTime(todayHours.closes_at);
//     return `Open Today: ${openTime} - ${closeTime}`;
//   };

//   if (loading || !business) return null;

//   return (
//     <div className="shop-header bg-white border-bottom">
//       <div className="container py-4">
//         <div className="d-flex align-items-center gap-4">
//           <button
//             className="btn btn-outline-secondary mb-3 d-flex align-items-center gap-2"
//             onClick={() => navigate(-1)}
//           >
//             <ArrowLeft size={16} /> Back
//           </button>

//           {/* LOGO */}
//           <div className="shop-logo">
//             <img
//               src={
//                 business.logo
//                   ? `${baseurl}${business.logo}`
//                   : "/logo.png"
//               }
//               alt={business.business_name}
//             />
//           </div>

//           {/* INFO */}
//           <div className="flex-grow-1">
//             <h3 className="fw-bold mb-1">
//               {business.business_name}
//             </h3>

//             <div className="text-muted d-flex align-items-center gap-1 mb-2">
//               <MdLocationOn />
//               {business.city}, {business.state}
//             </div>

//             <div className="d-flex align-items-center gap-4 flex-wrap">

//               {/* RATINGS */}
//               <div>
//                 <small className="text-muted">Ratings</small>
//                 <div className="text-warning">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <FaStar
//                       key={i}
//                       className={
//                         i < Math.round(business.rating || 0)
//                           ? "text-warning"
//                           : "text-secondary"
//                       }
//                     />
//                   ))}
//                 </div>
//               </div>

//               {/* AVAILABILITY */}
//               <div className="border-start ps-3">
//                 <small className="text-muted">Availability</small>
//                 <div className="text-success">
//                   <FaTruck /> Deliverable
//                 </div>
//               </div>

//               {/* STATUS WITH DROPDOWN */}
//               <div className="border-start ps-3 position-relative">
//                 <small className="text-muted">Status</small>
//                 <div 
//                   className="d-flex align-items-center gap-2 cursor-pointer"
//                   style={{ cursor: 'pointer' }}
//                   onClick={() => setShowHours(!showHours)}
//                 >
//                   <span className={business.is_active ? "text-success" : "text-danger"}>
//                     <FaStore className="me-1" />
//                     {business.is_active ? "Open" : "Closed"}
//                   </span>
//                   {business.working_hours && business.working_hours.length > 0 && (
//                     showHours ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />
//                   )}
//                 </div>

//                 {/* WORKING HOURS DROPDOWN */}
//                 {showHours && business.working_hours && business.working_hours.length > 0 && (
//                   <div 
//                     className="position-absolute bg-white shadow-lg rounded p-3"
//                     style={{
//                       top: '100%',
//                       left: '-100px',
//                       minWidth: '280px',
//                       zIndex: 1000,
//                       marginTop: '8px',
//                       border: '1px solid #e0e0e0'
//                     }}
//                   >
//                     <div className="d-flex align-items-center gap-2 mb-2 pb-2 border-bottom">
//                       <FaClock className="text-primary" />
//                       <span className="fw-bold">Working Hours</span>
//                     </div>
//                     <div className="working-hours-list">
//                       {formatWorkingHours(business.working_hours)}
//                     </div>
//                     <div className="mt-2 pt-2 border-top small text-muted">
//                       {getTodayStatus()}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* SHIPPING */}
//               <div className="border-start ps-3">
//                 <small className="text-muted">Shipping</small>
//                 <div className="text-success">
//                   <FaTruck /> Free Shipping
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopHeader;




// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./ProductHeader.css";
// import { FaStar, FaTruck, FaStore, FaChevronDown, FaChevronUp, FaClock } from "react-icons/fa";
// import { MdLocationOn } from "react-icons/md";
// import { baseurl } from "../../../../BaseURL/BaseURL";
// import {
//   ArrowLeft
// } from "lucide-react";

// const ShopHeader = ({ businessId }) => {
//   const [business, setBusiness] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showHours, setShowHours] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!businessId) {
//       setLoading(false);
//       return;
//     }

//     const apiUrl = `${baseurl}/business/${businessId}/`;
//     console.log("🏪 Fetching Business:", apiUrl);

//     fetch(apiUrl)
//       .then(res => res.json())
//       .then(data => {
//         console.log("✅ Business API Response:", data);
//         setBusiness(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("❌ Business fetch error:", err);
//         setLoading(false);
//       });
//   }, [businessId]);

//   // Function to format time from "11:00:00" to "11:00 AM"
//   const formatTime = (timeString) => {
//     if (!timeString) return "Closed";
    
//     // Extract hours and minutes
//     const [hours, minutes] = timeString.split(':');
//     const hour = parseInt(hours, 10);
//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     const hour12 = hour % 12 || 12;
    
//     return `${hour12}:${minutes} ${ampm}`;
//   };

//   // Function to format working hours for display
//   const formatWorkingHours = (hours) => {
//     if (!hours || hours.length === 0) return "Hours not available";
    
//     // Sort days in correct order
//     const dayOrder = {
//       'monday': 1,
//       'tuesday': 2,
//       'wednesday': 3,
//       'thursday': 4,
//       'friday': 5,
//       'saturday': 6,
//       'sunday': 7
//     };
    
//     const sortedHours = [...hours].sort((a, b) => dayOrder[a.day] - dayOrder[b.day]);
    
//     return sortedHours.map(hour => {
//       const dayName = hour.day.charAt(0).toUpperCase() + hour.day.slice(1);
      
//       if (hour.is_closed) {
//         return (
//           <div key={hour.id} className="d-flex justify-content-between py-1">
//             <span className="fw-medium">{dayName}</span>
//             <span className="text-danger">Closed</span>
//           </div>
//         );
//       } else {
//         return (
//           <div key={hour.id} className="d-flex justify-content-between py-1">
//             <span className="fw-medium">{dayName}</span>
//             <span className="text-success">
//               {formatTime(hour.opens_at)} - {formatTime(hour.closes_at)}
//             </span>
//           </div>
//         );
//       }
//     });
//   };

//   // Get today's status
//   const getTodayStatus = () => {
//     if (!business || !business.working_hours) return "Hours not available";
    
//     const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
//     const today = days[new Date().getDay()];
    
//     const todayHours = business.working_hours.find(h => h.day === today);
    
//     if (!todayHours) return "Hours not available";
//     if (todayHours.is_closed) return "Closed Today";
    
//     const openTime = formatTime(todayHours.opens_at);
//     const closeTime = formatTime(todayHours.closes_at);
//     return `Open Today: ${openTime} - ${closeTime}`;
//   };

//   if (loading || !business) return null;

//   return (
//     <div className="shop-header bg-white border-bottom">
//       <div className="container py-4">
//         {/* Header Row with Back Button and Logo */}
//         <div className="header-row mb-3">
//           <button
//             className="btn btn-outline-secondary back-button"
//             onClick={() => navigate(-1)}
//           >
//             <ArrowLeft size={16} /> Back
//           </button>

//           {/* LOGO */}
//           <div className="shop-logo">
//             <img
//               src={
//                 business.logo
//                   ? `${baseurl}${business.logo}`
//                   : "/logo.png"
//               }
//               alt={business.business_name}
//             />
//           </div>
//         </div>

//         {/* Business Info - Below Header Row on Mobile */}
//         <div className="business-info">
//           <h3 className="fw-bold mb-1">
//             {business.business_name}
//           </h3>

//           <div className="text-muted d-flex align-items-center gap-1 mb-2">
//             <MdLocationOn />
//             {business.city}, {business.state}
//           </div>

//           <div className="d-flex align-items-center gap-4 flex-wrap">
//             {/* RATINGS */}
//             <div>
//               <small className="text-muted">Ratings</small>
//               <div className="text-warning">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <FaStar
//                     key={i}
//                     className={
//                       i < Math.round(business.rating || 0)
//                         ? "text-warning"
//                         : "text-secondary"
//                     }
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* AVAILABILITY */}
//             <div className="border-start ps-3">
//               <small className="text-muted">Availability</small>
//               <div className="text-success">
//                 <FaTruck /> Deliverable
//               </div>
//             </div>

//             {/* STATUS WITH DROPDOWN */}
//             <div className="border-start ps-3 position-relative">
//               <small className="text-muted">Status</small>
//               <div 
//                 className="d-flex align-items-center gap-2 cursor-pointer"
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => setShowHours(!showHours)}
//               >
//                 <span className={business.is_active ? "text-success" : "text-danger"}>
//                   <FaStore className="me-1" />
//                   {business.is_active ? "Open" : "Closed"}
//                 </span>
//                 {business.working_hours && business.working_hours.length > 0 && (
//                   showHours ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />
//                 )}
//               </div>

//               {/* WORKING HOURS DROPDOWN */}
//               {showHours && business.working_hours && business.working_hours.length > 0 && (
//                 <div 
//                   className="position-absolute bg-white shadow-lg rounded p-3 working-hours-dropdown status-dropdown-main"
                
//                 >
//                   <div className="d-flex align-items-center gap-2 mb-2 pb-2 border-bottom">
//                     <FaClock className="text-primary" />
//                     <span className="fw-bold">Working Hours</span>
//                   </div>
//                   <div className="working-hours-list">
//                     {formatWorkingHours(business.working_hours)}
//                   </div>
//                   <div className="mt-2 pt-2 border-top small text-muted">
//                     {getTodayStatus()}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* SHIPPING */}
//             <div className="border-start ps-3">
//               <small className="text-muted">Shipping</small>
//               <div className="text-success">
//                 <FaTruck /> Free Shipping
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopHeader;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./ProductHeader.css";
// import { FaStar, FaTruck, FaStore, FaChevronDown, FaChevronUp, FaClock } from "react-icons/fa";
// import { MdLocationOn } from "react-icons/md";
// import { baseurl } from "../../../../BaseURL/BaseURL";
// import {
//   ArrowLeft
// } from "lucide-react";

// const ShopHeader = ({ businessId }) => {
//   const [business, setBusiness] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showHours, setShowHours] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!businessId) {
//       setLoading(false);
//       return;
//     }

//     const apiUrl = `${baseurl}/business/${businessId}/`;
//     console.log("🏪 Fetching Business:", apiUrl);

//     fetch(apiUrl)
//       .then(res => res.json())
//       .then(data => {
//         console.log("✅ Business API Response:", data);
//         setBusiness(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("❌ Business fetch error:", err);
//         setLoading(false);
//       });
//   }, [businessId]);

//   // Function to format time from "11:00:00" to "11:00 AM"
//   const formatTime = (timeString) => {
//     if (!timeString) return "Closed";
    
//     // Extract hours and minutes
//     const [hours, minutes] = timeString.split(':');
//     const hour = parseInt(hours, 10);
//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     const hour12 = hour % 12 || 12;
    
//     return `${hour12}:${minutes} ${ampm}`;
//   };

//   // Function to format working hours for display
//   const formatWorkingHours = (hours) => {
//     if (!hours || hours.length === 0) return "Hours not available";
    
//     // Sort days in correct order
//     const dayOrder = {
//       'monday': 1,
//       'tuesday': 2,
//       'wednesday': 3,
//       'thursday': 4,
//       'friday': 5,
//       'saturday': 6,
//       'sunday': 7
//     };
    
//     const sortedHours = [...hours].sort((a, b) => dayOrder[a.day] - dayOrder[b.day]);
    
//     return sortedHours.map(hour => {
//       const dayName = hour.day.charAt(0).toUpperCase() + hour.day.slice(1);
      
//       if (hour.is_closed) {
//         return (
//           <div key={hour.id} className="d-flex justify-content-between py-1">
//             <span className="fw-medium">{dayName}</span>
//             <span className="text-danger">Closed</span>
//           </div>
//         );
//       } else {
//         return (
//           <div key={hour.id} className="d-flex justify-content-between py-1">
//             <span className="fw-medium">{dayName}</span>
//             <span className="text-success">
//               {formatTime(hour.opens_at)} - {formatTime(hour.closes_at)}
//             </span>
//           </div>
//         );
//       }
//     });
//   };

//   // Get today's status
//   const getTodayStatus = () => {
//     if (!business || !business.working_hours) return "Hours not available";
    
//     const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
//     const today = days[new Date().getDay()];
    
//     const todayHours = business.working_hours.find(h => h.day === today);
    
//     if (!todayHours) return "Hours not available";
//     if (todayHours.is_closed) return "Closed Today";
    
//     const openTime = formatTime(todayHours.opens_at);
//     const closeTime = formatTime(todayHours.closes_at);
//     return `Open Today: ${openTime} - ${closeTime}`;
//   };

//   // Calculate average rating - FIXED: Handle different data types
//   const calculateAverageRating = () => {
//     if (!business) return 0;
    
//     // If ratings array exists
//     if (business.ratings && business.ratings.length > 0) {
//       const sum = business.ratings.reduce((acc, curr) => {
//         const ratingValue = typeof curr.rating === 'string' ? parseFloat(curr.rating) : curr.rating;
//         return acc + (ratingValue || 0);
//       }, 0);
//       return sum / business.ratings.length;
//     }
    
//     // If rating is a number or string
//     if (business.rating) {
//       return typeof business.rating === 'string' ? parseFloat(business.rating) : business.rating;
//     }
    
//     // Default rating
//     return 4.5;
//   };

//   // Get total ratings count
//   const getTotalRatings = () => {
//     if (!business) return 0;
    
//     if (business.ratings && business.ratings.length > 0) {
//       return business.ratings.length;
//     }
    
//     if (business.total_ratings) {
//       return business.total_ratings;
//     }
    
//     return 128; // Default value
//   };

//   const averageRating = calculateAverageRating();
//   const totalRatings = getTotalRatings();

//   if (loading) {
//     return (
//       <div className="shop-header bg-white border-bottom">
//         <div className="container py-4">
//           <div className="text-center py-3">Loading business details...</div>
//         </div>
//       </div>
//     );
//   }

//   if (!business) return null;

//   return (
//     <div className="shop-header bg-white border-bottom">
//       <div className="container py-4">
//         {/* Header Row with Back Button and Logo */}
//         <div className="header-row mb-3 d-flex align-items-center justify-content-between">
//           <button
//             className="btn btn-outline-secondary back-button d-flex align-items-center gap-2"
//             onClick={() => navigate(-1)}
//           >
//             <ArrowLeft size={16} /> Back
//           </button>

          
//         </div>

//         <div className="d-flex">

//           {/* LOGO */}
//           <div className="shop-logo">
//             <img
//               src={
//                 business.logo
//                   ? `${baseurl}${business.logo}`
//                   : "https://via.placeholder.com/80"
//               }
//               alt={business.business_name}
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = "https://via.placeholder.com/80";
//               }}
//             />
//           </div>

//         {/* Business Info - Below Header Row */}
//         <div className="business-info">

          
//           <h3 className="fw-bold mb-1">
//             {business.business_name || "Toughees Telecom"}
//           </h3>

//           <div className="text-muted d-flex align-items-center gap-1 mb-3">
//             <MdLocationOn />
//             {business.city || "Delhi"}, {business.state || "Delhi"}
//           </div>

//           <div className="d-flex align-items-center gap-4 flex-wrap">
//             {/* RATINGS */}
//             <div className="info-item">
//               <small className="text-muted d-block">Ratings</small>
//               <div className="d-flex align-items-center gap-2">
//                 <div className="text-warning d-flex">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <FaStar
//                       key={i}
//                       className={
//                         i < Math.round(averageRating)
//                           ? "text-warning"
//                           : "text-secondary"
//                       }
//                       size={16}
//                     />
//                   ))}
//                 </div>
//                 <span className="fw-medium">{averageRating.toFixed(1)}</span>
//                 <span className="text-muted">({totalRatings})</span>
//               </div>
//             </div>

//             {/* AVAILABILITY */}
//             <div className="info-item border-start ps-3">
//               <small className="text-muted d-block">Availability</small>
//               <div className="text-success d-flex align-items-center gap-1">
//                 <FaTruck size={14} />
//                 <span className="fw-medium">Deliverable</span>
//               </div>
//             </div>

//             {/* STATUS WITH DROPDOWN */}
//             <div className="info-item border-start ps-3 position-relative">
//               <small className="text-muted d-block">Status</small>
//               <div 
//                 className="d-flex align-items-center gap-2 cursor-pointer status-container"
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => setShowHours(!showHours)}
//               >
//                 <span className={business.is_active ? "text-success" : "text-danger"}>
//                   <FaStore className="me-1" size={14} />
//                   {business.is_active ? "Open" : "Closed"}
//                 </span>
//                 {business.working_hours && business.working_hours.length > 0 && (
//                   showHours ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />
//                 )}
//               </div>

//               {/* WORKING HOURS DROPDOWN */}
//               {showHours && business.working_hours && business.working_hours.length > 0 && (
//                 <div className="position-absolute bg-white shadow-lg rounded p-3 working-hours-dropdown status-dropdown-main">
//                   <div className="d-flex align-items-center gap-2 mb-2 pb-2 border-bottom">
//                     <FaClock className="text-primary" />
//                     <span className="fw-bold">Working Hours</span>
//                   </div>
//                   <div className="working-hours-list">
//                     {formatWorkingHours(business.working_hours)}
//                   </div>
//                   <div className="mt-2 pt-2 border-top small text-muted">
//                     {getTodayStatus()}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* SHIPPING */}
//             <div className="info-item border-start ps-3">
//               <small className="text-muted d-block">Shipping</small>
//               <div className="text-success d-flex align-items-center gap-1">
//                 <FaTruck size={14} />
//                 <span className="fw-medium">Free Shipping</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         </div>

        
//       </div>
//     </div>
//   );
// };

// export default ShopHeader;






// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./ProductHeader.css";
// import { FaStar, FaTruck, FaStore, FaChevronDown, FaChevronUp, FaClock } from "react-icons/fa";
// import { MdLocationOn } from "react-icons/md";
// import { baseurl } from "../../../../BaseURL/BaseURL";
// import {
//   ArrowLeft
// } from "lucide-react";

// const ShopHeader = ({ businessId }) => {
//   const [business, setBusiness] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showHours, setShowHours] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!businessId) {
//       setLoading(false);
//       return;
//     }

//     const apiUrl = `${baseurl}/business/${businessId}/`;
//     console.log("🏪 Fetching Business:", apiUrl);

//     fetch(apiUrl)
//       .then(res => res.json())
//       .then(data => {
//         console.log("✅ Business API Response:", data);
//         setBusiness(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("❌ Business fetch error:", err);
//         setLoading(false);
//       });
//   }, [businessId]);

//   // Function to format time from "11:00:00" to "11:00 AM"
//   const formatTime = (timeString) => {
//     if (!timeString) return "Closed";
    
//     // Extract hours and minutes
//     const [hours, minutes] = timeString.split(':');
//     const hour = parseInt(hours, 10);
//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     const hour12 = hour % 12 || 12;
    
//     return `${hour12}:${minutes} ${ampm}`;
//   };

//   // Function to format working hours for display
//   const formatWorkingHours = (hours) => {
//     if (!hours || hours.length === 0) return "Hours not available";
    
//     // Sort days in correct order
//     const dayOrder = {
//       'monday': 1,
//       'tuesday': 2,
//       'wednesday': 3,
//       'thursday': 4,
//       'friday': 5,
//       'saturday': 6,
//       'sunday': 7
//     };
    
//     const sortedHours = [...hours].sort((a, b) => dayOrder[a.day] - dayOrder[b.day]);
    
//     return sortedHours.map(hour => {
//       const dayName = hour.day.charAt(0).toUpperCase() + hour.day.slice(1);
      
//       if (hour.is_closed) {
//         return (
//           <div key={hour.id} className="d-flex justify-content-between py-1">
//             <span className="fw-medium">{dayName}</span>
//             <span className="text-danger">Closed</span>
//           </div>
//         );
//       } else {
//         return (
//           <div key={hour.id} className="d-flex justify-content-between py-1">
//             <span className="fw-medium">{dayName}</span>
//             <span className="text-success">
//               {formatTime(hour.opens_at)} - {formatTime(hour.closes_at)}
//             </span>
//           </div>
//         );
//       }
//     });
//   };

//   // Get today's status
//   const getTodayStatus = () => {
//     if (!business || !business.working_hours) return "Hours not available";
    
//     const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
//     const today = days[new Date().getDay()];
    
//     const todayHours = business.working_hours.find(h => h.day === today);
    
//     if (!todayHours) return "Hours not available";
//     if (todayHours.is_closed) return "Closed Today";
    
//     const openTime = formatTime(todayHours.opens_at);
//     const closeTime = formatTime(todayHours.closes_at);
//     return `Open Today: ${openTime} - ${closeTime}`;
//   };

//   if (loading || !business) return null;

//   return (
//     <div className="shop-header bg-white border-bottom">
//       <div className="container py-4">
//         <button
//           className="btn btn-outline-secondary mb-3 d-flex align-items-center gap-2"
//           onClick={() => navigate(-1)}
//         >
//           <ArrowLeft size={16} /> Back
//         </button>

//         {/* Main Content - Desktop layout unchanged */}
//         <div className="desktop-layout d-none d-md-flex align-items-center gap-4">
//           {/* LOGO */}
//           <div className="shop-logo">
//             <img
//               src={
//                 business.logo
//                   ? `${baseurl}${business.logo}`
//                   : "/logo.png"
//               }
//               alt={business.business_name}
//             />
//           </div>

//           {/* INFO */}
//           <div className="flex-grow-1">
//             <h3 className="fw-bold mb-1">
//               {business.business_name}
//             </h3>

//             <div className="text-muted d-flex align-items-center gap-1 mb-2">
//               <MdLocationOn />
//               {business.city}, {business.state}
//             </div>

//             <div className="d-flex align-items-center gap-4 flex-wrap">
//               {/* RATINGS */}
//               <div>
//                 <small className="text-muted">Ratings</small>
//                 <div className="text-warning">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <FaStar
//                       key={i}
//                       className={
//                         i < Math.round(business.rating || 0)
//                           ? "text-warning"
//                           : "text-secondary"
//                       }
//                     />
//                   ))}
//                 </div>
//               </div>

//               {/* AVAILABILITY */}
//               <div className="border-start ps-3">
//                 <small className="text-muted">Availability</small>
//                 <div className="text-success">
//                   <FaTruck /> Deliverable
//                 </div>
//               </div>

//               {/* STATUS WITH DROPDOWN */}
//               <div className="border-start ps-3 position-relative">
//                 <small className="text-muted">Status</small>
//                 <div 
//                   className="d-flex align-items-center gap-2 cursor-pointer"
//                   style={{ cursor: 'pointer' }}
//                   onClick={() => setShowHours(!showHours)}
//                 >
//                   <span className={business.is_active ? "text-success" : "text-danger"}>
//                     <FaStore className="me-1" />
//                     {business.is_active ? "Open" : "Closed"}
//                   </span>
//                   {business.working_hours && business.working_hours.length > 0 && (
//                     showHours ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />
//                   )}
//                 </div>

//                 {/* WORKING HOURS DROPDOWN */}
//                 {showHours && business.working_hours && business.working_hours.length > 0 && (
//                   <div 
//                     className="position-absolute bg-white shadow-lg rounded p-3"
//                     style={{
//                       top: '100%',
//                       left: '0',
//                       minWidth: '280px',
//                       zIndex: 1000,
//                       marginTop: '8px',
//                       border: '1px solid #e0e0e0'
//                     }}
//                   >
//                     <div className="d-flex align-items-center gap-2 mb-2 pb-2 border-bottom">
//                       <FaClock className="text-primary" />
//                       <span className="fw-bold">Working Hours</span>
//                     </div>
//                     <div className="working-hours-list">
//                       {formatWorkingHours(business.working_hours)}
//                     </div>
//                     <div className="mt-2 pt-2 border-top small text-muted">
//                       {getTodayStatus()}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* SHIPPING */}
//               <div className="border-start ps-3">
//                 <small className="text-muted">Shipping</small>
//                 <div className="text-success">
//                   <FaTruck /> Free Shipping
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Layout - Only shown on mobile */}
//         <div className="mobile-layout d-md-none">
//           {/* Logo and Basic Info */}
//           <div className="d-flex flex-column align-items-center mb-3">
//             <div className="shop-logo mb-2">
//               <img
//                 src={
//                   business.logo
//                     ? `${baseurl}${business.logo}`
//                     : "/logo.png"
//                 }
//                 alt={business.business_name}
//               />
//             </div>
//             <h3 className="fw-bold mb-1 text-center">
//               {business.business_name}
//             </h3>
//             <div className="text-muted d-flex align-items-center gap-1">
//               <MdLocationOn />
//               {business.city}, {business.state}
//             </div>
//           </div>

//           {/* Mobile Info Grid */}
//           <div className="mobile-info-grid">
//             {/* RATINGS */}
//             <div className="mobile-info-item">
//               <small className="text-muted d-block">Ratings</small>
//               <div className="text-warning d-flex">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <FaStar
//                     key={i}
//                     className={
//                       i < Math.round(business.rating || 0)
//                         ? "text-warning"
//                         : "text-secondary"
//                     }
//                     size={14}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* AVAILABILITY */}
//             <div className="mobile-info-item">
//               <small className="text-muted d-block">Availability</small>
//               <div className="text-success d-flex align-items-center gap-1">
//                 <FaTruck size={14} /> Deliverable
//               </div>
//             </div>

//             {/* STATUS WITH DROPDOWN */}
//             <div className="mobile-info-item position-relative">
//               <small className="text-muted d-block">Status</small>
//               <div 
//                 className="d-flex align-items-center gap-2 cursor-pointer"
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => setShowHours(!showHours)}
//               >
//                 <span className={`d-flex align-items-center gap-1 ${business.is_active ? "text-success" : "text-danger"}`}>
//                   <FaStore size={14} />
//                   {business.is_active ? "Open" : "Closed"}
//                 </span>
//                 {business.working_hours && business.working_hours.length > 0 && (
//                   showHours ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />
//                 )}
//               </div>

//               {/* WORKING HOURS DROPDOWN - Mobile version */}
//               {showHours && business.working_hours && business.working_hours.length > 0 && (
//                 <div className="mobile-hours-dropdown">
//                   <div className="d-flex align-items-center gap-2 mb-2 pb-2 border-bottom">
//                     <FaClock className="text-primary" />
//                     <span className="fw-bold">Working Hours</span>
//                   </div>
//                   <div className="working-hours-list">
//                     {formatWorkingHours(business.working_hours)}
//                   </div>
//                   <div className="mt-2 pt-2 border-top small text-muted">
//                     {getTodayStatus()}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* SHIPPING */}
//             <div className="mobile-info-item">
//               <small className="text-muted d-block">Shipping</small>
//               <div className="text-success d-flex align-items-center gap-1">
//                 <FaTruck size={14} /> Free
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopHeader;




import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductHeader.css";
import { FaStar, FaTruck, FaStore, FaChevronDown, FaChevronUp, FaClock } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { baseurl } from "../../../../BaseURL/BaseURL";
import {
  ArrowLeft
} from "lucide-react";

const ShopHeader = ({ businessId }) => {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showHours, setShowHours] = useState(false);
  const navigate = useNavigate();
  
  // Create refs for dropdown and trigger button
  const statusRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!businessId) {
      setLoading(false);
      return;
    }

    const apiUrl = `${baseurl}/business/${businessId}/`;
    console.log("🏪 Fetching Business:", apiUrl);

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log("✅ Business API Response:", data);
        setBusiness(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Business fetch error:", err);
        setLoading(false);
      });
  }, [businessId]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside both the status button and dropdown
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        statusRef.current && 
        !statusRef.current.contains(event.target)
      ) {
        setShowHours(false);
      }
    };

    // Add event listener when dropdown is open
    if (showHours) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showHours]);

  // Function to format time from "11:00:00" to "11:00 AM"
  const formatTime = (timeString) => {
    if (!timeString) return "Closed";
    
    // Extract hours and minutes
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Function to format working hours for display
  const formatWorkingHours = (hours) => {
    if (!hours || hours.length === 0) return "Hours not available";
    
    // Sort days in correct order
    const dayOrder = {
      'monday': 1,
      'tuesday': 2,
      'wednesday': 3,
      'thursday': 4,
      'friday': 5,
      'saturday': 6,
      'sunday': 7
    };
    
    const sortedHours = [...hours].sort((a, b) => dayOrder[a.day] - dayOrder[b.day]);
    
    return sortedHours.map(hour => {
      const dayName = hour.day.charAt(0).toUpperCase() + hour.day.slice(1);
      
      if (hour.is_closed) {
        return (
          <div key={hour.id} className="d-flex justify-content-between py-1">
            <span className="fw-medium">{dayName}</span>
            <span className="text-danger">Closed</span>
          </div>
        );
      } else {
        return (
          <div key={hour.id} className="d-flex justify-content-between py-1">
            <span className="fw-medium">{dayName}</span>
            <span className="text-success">
              {formatTime(hour.opens_at)} - {formatTime(hour.closes_at)}
            </span>
          </div>
        );
      }
    });
  };

  // Get today's status
  const getTodayStatus = () => {
    if (!business || !business.working_hours) return "Hours not available";
    
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()];
    
    const todayHours = business.working_hours.find(h => h.day === today);
    
    if (!todayHours) return "Hours not available";
    if (todayHours.is_closed) return "Closed Today";
    
    const openTime = formatTime(todayHours.opens_at);
    const closeTime = formatTime(todayHours.closes_at);
    return `Open Today: ${openTime} - ${closeTime}`;
  };

  // Toggle dropdown function
  const toggleHours = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setShowHours(!showHours);
  };

  if (loading || !business) return null;

  return (
    <div className="shop-header bg-white border-bottom">
      <div className="container py-4">
        

        {/* Main Content - Desktop layout unchanged */}
        <div className="desktop-layout d-none d-md-flex align-items-center gap-4">

          <button
          className="btn btn-outline-secondary mb-3 d-flex align-items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} /> Back
        </button>
          {/* LOGO */}
          <div className="shop-logo">
            <img
              src={
                business.logo
                  ? `${baseurl}${business.logo}`
                  : "/logo.png"
              }
              alt={business.business_name}
            />
          </div>

          {/* INFO */}
          <div className="flex-grow-1">
            <h3 className="fw-bold mb-1">
              {business.business_name}
            </h3>

            <div className="text-muted d-flex align-items-center gap-1 mb-2">
              <MdLocationOn />
              {business.city}, {business.state}
            </div>

            <div className="d-flex align-items-center gap-4 flex-wrap">
              {/* RATINGS */}
              <div>
                <small className="text-muted">Ratings</small>
                <div className="text-warning">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.round(business.rating || 0)
                          ? "text-warning"
                          : "text-secondary"
                      }
                    />
                  ))}
                </div>
              </div>

              {/* AVAILABILITY */}
              <div className="border-start ps-3">
                <small className="text-muted">Availability</small>
                <div className="text-success">
                  <FaTruck /> Deliverable
                </div>
              </div>

              {/* STATUS WITH DROPDOWN */}
              <div className="border-start ps-3 position-relative">
                <small className="text-muted">Status</small>
                <div 
                  ref={statusRef}
                  className="d-flex align-items-center gap-2 cursor-pointer"
                  style={{ cursor: 'pointer' }}
                  onClick={toggleHours}
                >
                  <span className={business.is_active ? "text-success" : "text-danger"}>
                    <FaStore className="me-1" />
                    {business.is_active ? "Open" : "Closed"}
                  </span>
                  {business.working_hours && business.working_hours.length > 0 && (
                    showHours ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />
                  )}
                </div>

                {/* WORKING HOURS DROPDOWN */}
                {showHours && business.working_hours && business.working_hours.length > 0 && (
                  <div 
                    ref={dropdownRef}
                    className="position-absolute bg-white shadow-lg rounded p-3"
                    style={{
                      top: '100%',
                      left: '0',
                      minWidth: '280px',
                      zIndex: 1000,
                      marginTop: '8px',
                      border: '1px solid #e0e0e0'
                    }}
                  >
                    <div className="d-flex align-items-center gap-2 mb-2 pb-2 border-bottom">
                      <FaClock className="text-primary" />
                      <span className="fw-bold">Working Hours</span>
                    </div>
                    <div className="working-hours-list">
                      {formatWorkingHours(business.working_hours)}
                    </div>
                    <div className="mt-2 pt-2 border-top small text-muted">
                      {getTodayStatus()}
                    </div>
                  </div>
                )}
              </div>

              {/* SHIPPING */}
              <div className="border-start ps-3">
                <small className="text-muted">Shipping</small>
                <div className="text-success">
                  <FaTruck /> Free Shipping
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Only shown on mobile */}
        <div className="mobile-layout d-md-none">
          {/* Logo and Basic Info */}
          <div className="d-flex flex-column align-items-center mb-3">
            <div className="shop-logo mb-2">
              <img
                src={
                  business.logo
                    ? `${baseurl}${business.logo}`
                    : "/logo.png"
                }
                alt={business.business_name}
              />
            </div>
            <h3 className="fw-bold mb-1 text-center">
              {business.business_name}
            </h3>
            <div className="text-muted d-flex align-items-center gap-1">
              <MdLocationOn />
              {business.city}, {business.state}
            </div>
          </div>

          {/* Mobile Info Grid */}
          <div className="mobile-info-grid">
            {/* RATINGS */}
            <div className="mobile-info-item">
              <small className="text-muted d-block">Ratings</small>
              <div className="text-warning d-flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.round(business.rating || 0)
                        ? "text-warning"
                        : "text-secondary"
                    }
                    size={14}
                  />
                ))}
              </div>
            </div>

            {/* AVAILABILITY */}
            <div className="mobile-info-item">
              <small className="text-muted d-block">Availability</small>
              <div className="text-success d-flex align-items-center gap-1">
                <FaTruck size={14} /> Deliverable
              </div>
            </div>

            {/* STATUS WITH DROPDOWN */}
            <div className="mobile-info-item position-relative">
              <small className="text-muted d-block">Status</small>
              <div 
                ref={statusRef}
                className="d-flex align-items-center gap-2 cursor-pointer"
                style={{ cursor: 'pointer' }}
                onClick={toggleHours}
              >
                <span className={`d-flex align-items-center gap-1 ${business.is_active ? "text-success" : "text-danger"}`}>
                  <FaStore size={14} />
                  {business.is_active ? "Open" : "Closed"}
                </span>
                {business.working_hours && business.working_hours.length > 0 && (
                  showHours ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />
                )}
              </div>

              {/* WORKING HOURS DROPDOWN - Mobile version */}
              {showHours && business.working_hours && business.working_hours.length > 0 && (
                <div 
                  ref={dropdownRef}
                  className="mobile-hours-dropdown"
                >
                  <div className="d-flex align-items-center gap-2 mb-2 pb-2 border-bottom">
                    <FaClock className="text-primary" />
                    <span className="fw-bold">Working Hours</span>
                  </div>
                  <div className="working-hours-list">
                    {formatWorkingHours(business.working_hours)}
                  </div>
                  <div className="mt-2 pt-2 border-top small text-muted">
                    {getTodayStatus()}
                  </div>
                </div>
              )}
            </div>

            {/* SHIPPING */}
            <div className="mobile-info-item">
              <small className="text-muted d-block">Shipping</small>
              <div className="text-success d-flex align-items-center gap-1">
                <FaTruck size={14} /> Free
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHeader;