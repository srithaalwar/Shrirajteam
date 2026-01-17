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
import { FaStar, FaTruck, FaStore } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { baseurl } from "../../BaseURL/BaseURL";

const ShopHeader = ({ businessId }) => {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

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
                          ? ""
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

              {/* STATUS */}
              <div className="border-start ps-3">
                <small className="text-muted">Status</small>
                <div className="text-success">
                  <FaStore /> {business.is_active ? "Open" : "Closed"}
                </div>
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

export default ShopHeader;
