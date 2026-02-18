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




import React, { useEffect, useState } from "react";
import "./ProductHeader.css";
import { FaStar, FaTruck, FaStore, FaChevronDown, FaChevronUp, FaClock } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { baseurl } from "../../BaseURL/BaseURL";

const WebShopHeader = ({ businessId }) => {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showHours, setShowHours] = useState(false);

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

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showHours && !event.target.closest('.status-dropdown-container')) {
        setShowHours(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
      } else if (hour.opens_at && hour.closes_at) {
        return (
          <div key={hour.id} className="d-flex justify-content-between py-1">
            <span className="fw-medium">{dayName}</span>
            <span className="text-success">
              {formatTime(hour.opens_at)} - {formatTime(hour.closes_at)}
            </span>
          </div>
        );
      } else {
        return (
          <div key={hour.id} className="d-flex justify-content-between py-1">
            <span className="fw-medium">{dayName}</span>
            <span className="text-muted">Hours not set</span>
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

  if (loading || !business) return null;

  return (
    <div className="shop-header bg-white border-bottom">
      <div className="container py-4">
        <div className="d-flex align-items-center gap-4">

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
              <div className="border-start ps-3 status-dropdown-container position-relative">
                <small className="text-muted">Status</small>
                <div 
                  className="d-flex align-items-center gap-2 cursor-pointer"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowHours(!showHours)}
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
                    <div className="working-hours-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
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
      </div>
    </div>
  );
};

export default WebShopHeader;
