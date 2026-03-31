// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { baseurl } from '../../BaseURL/BaseURL';
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import { 
//   FaBuilding, 
//   FaUser, 
//   FaEnvelope, 
//   FaPhone, 
//   FaGlobe, 
//   FaMapMarkerAlt, 
//   FaCity, 
//   FaFlag, 
//   FaCode, 
//   FaUniversity, 
//   FaCreditCard, 
//   FaMoneyBillWave, 
//   FaClock, 
//   FaCheckCircle, 
//   FaTimesCircle,
//   FaImage,
//   FaArrowLeft,
//   FaEdit,
//   FaTrash,
//   FaBoxes,
//   FaPercent,
//   FaCalendarAlt
// } from 'react-icons/fa';

// const ViewBusiness = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [business, setBusiness] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [categories, setCategories] = useState([]);
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);

//   const userId = localStorage.getItem('user_id');
//   const token = localStorage.getItem('token');

//   // Business type mapping
//   const BUSINESS_TYPES = {
//     'individual': 'Individual',
//     'proprietor': 'Proprietor',
//     'partnership': 'Partnership',
//     'private_limited': 'Private Limited',
//     'llp': 'LLP'
//   };

//   // Day mapping for working hours
//   const DAYS_MAP = {
//     'monday': 'Monday',
//     'tuesday': 'Tuesday',
//     'wednesday': 'Wednesday',
//     'thursday': 'Thursday',
//     'friday': 'Friday',
//     'saturday': 'Saturday',
//     'sunday': 'Sunday'
//   };

//   useEffect(() => {
//     fetchBusinessDetails();
//     fetchCategories();
//   }, [id]);

//   const fetchBusinessDetails = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${baseurl}/business/${id}/?user_id=${userId}`, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       setBusiness(response.data);
//     } catch (error) {
//       console.error('Error fetching business details:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to load business details',
//         confirmButtonColor: '#d33',
//       }).then(() => {
//         navigate('/agent-my-business');
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`${baseurl}/categories/`, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       const businessCategories = Array.isArray(response.data)
//         ? response.data.filter(cat => cat.level === 'business')
//         : response.data.results?.filter(cat => cat.level === 'business') || [];
//       setCategories(businessCategories);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   // Load countries for display
//   useEffect(() => {
//     const { Country, State } = require('country-state-city');
//     const allCountries = Country.getAllCountries();
//     setCountries(allCountries);
    
//     if (business?.state) {
//       const statesOfCountry = State.getStatesOfCountry(business.country || 'IN');
//       setStates(statesOfCountry);
//     }
//   }, [business?.country, business?.state]);

//   const getCategoryNames = () => {
//     if (!business?.categories || !categories.length) return 'No categories';
//     return business.categories
//       .map(catId => {
//         const category = categories.find(c => c.category_id === parseInt(catId));
//         return category ? category.name : '';
//       })
//       .filter(name => name)
//       .join(', ');
//   };

//   const getCountryName = () => {
//     if (!business?.country) return 'N/A';
//     const country = countries.find(c => c.isoCode === business.country);
//     return country ? country.name : business.country;
//   };

//   const getStateName = () => {
//     if (!business?.state) return 'N/A';
//     const state = states.find(s => s.isoCode === business.state);
//     return state ? state.name : business.state;
//   };

//   const getVerificationStatusBadge = () => {
//     const status = business?.verification_status;
//     const config = {
//       'pending': { label: 'Pending', class: 'badge-warning', icon: <FaClock /> },
//       'verified': { label: 'Verified', class: 'badge-success', icon: <FaCheckCircle /> },
//       'rejected': { label: 'Rejected', class: 'badge-danger', icon: <FaTimesCircle /> },
//       'suspended': { label: 'Suspended', class: 'badge-secondary', icon: <FaTimesCircle /> }
//     };
//     const current = config[status] || { label: status, class: 'badge-info', icon: null };
//     return (
//       <span className={`verification-badge ${current.class}`}>
//         {current.icon} {current.label}
//       </span>
//     );
//   };

//   const getActiveBadge = () => {
//     if (!business?.is_active) {
//       return <span className="badge bg-danger active-badge"><FaTimesCircle /> Inactive</span>;
//     }
//     return <span className="badge bg-success active-badge"><FaCheckCircle /> Active</span>;
//   };

//   const formatTime = (time) => {
//     if (!time) return 'Closed';
//     const [hours, minutes] = time.split(':');
//     const hour = parseInt(hours, 10);
//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     const hour12 = hour % 12 || 12;
//     return `${hour12}:${minutes} ${ampm}`;
//   };

//   const formatCurrency = (amount) => {
//     if (!amount) return '₹0.00';
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 2
//     }).format(amount);
//   };

//   const handleDelete = async () => {
//     const result = await Swal.fire({
//       title: 'Delete Business?',
//       text: `Are you sure you want to delete "${business?.business_name}"?`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     });

//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`${baseurl}/business/${id}/?user_id=${userId}`, {
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         });

//         Swal.fire({
//           icon: 'success',
//           title: 'Deleted!',
//           text: 'Business has been deleted.',
//           confirmButtonColor: '#3085d6',
//         }).then(() => {
//           navigate('/agent-my-business');
//         });
//       } catch (error) {
//         console.error('Error deleting business:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Failed to delete business',
//           confirmButtonColor: '#d33',
//         });
//       }
//     }
//   };

//   const handleViewProducts = () => {
//     navigate(`/my-products?business=${business?.business_id}`);
//   };

//   const InfoRow = ({ icon, label, value, colSize = 6 }) => (
//     <div className={`col-md-${colSize} mb-3`}>
//       <div className="info-card">
//         <div className="info-icon">
//           {icon}
//         </div>
//         <div className="info-content">
//           <div className="info-label">{label}</div>
//           <div className="info-value">{value || 'N/A'}</div>
//         </div>
//       </div>
//     </div>
//   );

//   const SectionCard = ({ title, icon, children }) => (
//     <div className="section-card">
//       <div className="section-header">
//         <div className="section-title">
//           {icon}
//           <h3>{title}</h3>
//         </div>
//       </div>
//       <div className="section-content">
//         {children}
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="view-business-container">
//           <div className="loading-container">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-3">Loading business details...</p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   if (!business) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="view-business-container">
//           <div className="error-container">
//             <h3>Business not found</h3>
//             <button className="btn btn-primary" onClick={() => navigate('/agent-my-business')}>
//               Back to Businesses
//             </button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <AgentNavbar />
//       <div className="view-business-container">
//         <div className="container-fluid">
//           {/* Header Section */}
//           <div className="business-header">
//             <div className="header-actions">
//               <button 
//                 className="btn btn-outline-secondary"
//                 onClick={() => navigate('/agent-my-business')}
//               >
//                 <FaArrowLeft /> Back to List
//               </button>
//               <div className="action-buttons">
//                 <button 
//                   className="btn btn-primary"
//                   onClick={handleViewProducts}
//                 >
//                   <FaBoxes /> View Products
//                 </button>
//                 <button 
//                   className="btn btn-warning"
//                   onClick={() => navigate(`/edit-business/${id}`)}
//                 >
//                   <FaEdit /> Edit
//                 </button>
//                 <button 
//                   className="btn btn-danger"
//                   onClick={handleDelete}
//                 >
//                   <FaTrash /> Delete
//                 </button>
//               </div>
//             </div>

//             <div className="business-title-section">
//               <div className="business-logo-wrapper">
//                 {business.logo ? (
//                   <img 
//                     src={`${baseurl}${business.logo}`} 
//                     alt={business.business_name}
//                     className="business-logo-large"
//                     onError={(e) => {
//                       e.target.src = 'https://via.placeholder.com/120x120/273c75/ffffff?text=Logo';
//                     }}
//                   />
//                 ) : (
//                   <div className="business-logo-placeholder">
//                     <FaBuilding size={48} />
//                   </div>
//                 )}
//               </div>
//               <div className="business-title-info">
//                 <h1>{business.business_name}</h1>
//                 <div className="business-meta">
//                   {getVerificationStatusBadge()}
//                   {getActiveBadge()}
//                   {business.is_featured && (
//                     <span className="badge bg-warning featured-badge">
//                       <FaStar /> Featured
//                     </span>
//                   )}
//                 </div>
//                 {business.legal_name && (
//                   <p className="legal-name">Legal Name: {business.legal_name}</p>
//                 )}
//               </div>
//             </div>

//             {business.banner && (
//               <div className="business-banner">
//                 <img 
//                   src={`${baseurl}${business.banner}`} 
//                   alt="Business Banner"
//                   onError={(e) => {
//                     e.target.style.display = 'none';
//                   }}
//                 />
//               </div>
//             )}
//           </div>

//           {/* Main Content */}
//           <div className="business-content">
//             {/* Basic Information */}
//             <SectionCard title="Basic Information" icon={<FaBuilding />}>
//               <div className="row">
//                 <InfoRow 
//                   icon={<FaBuilding />}
//                   label="Business Name"
//                   value={business.business_name}
//                 />
//                 <InfoRow 
//                   icon={<FaUser />}
//                   label="Legal Name"
//                   value={business.legal_name}
//                 />
//                 <InfoRow 
//                   icon={<FaBuilding />}
//                   label="Business Type"
//                   value={BUSINESS_TYPES[business.business_type] || business.business_type}
//                 />
//                 <InfoRow 
//                   icon={<FaCheckCircle />}
//                   label="Verification Status"
//                   value={getVerificationStatusBadge()}
//                 />
//                 <div className="col-12 mb-3">
//                   <div className="info-card full-width">
//                     <div className="info-icon">
//                       <FaBuilding />
//                     </div>
//                     <div className="info-content">
//                       <div className="info-label">Description</div>
//                       <div className="info-value description-text">
//                         {business.description || 'No description provided'}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </SectionCard>

//             {/* Contact Information */}
//             <SectionCard title="Contact Information" icon={<FaEnvelope />}>
//               <div className="row">
//                 <InfoRow 
//                   icon={<FaEnvelope />}
//                   label="Support Email"
//                   value={business.support_email}
//                 />
//                 <InfoRow 
//                   icon={<FaPhone />}
//                   label="Support Phone"
//                   value={business.support_phone}
//                 />
//                 <InfoRow 
//                   icon={<FaGlobe />}
//                   label="Website"
//                   value={business.website ? (
//                     <a href={business.website} target="_blank" rel="noopener noreferrer">
//                       {business.website}
//                     </a>
//                   ) : 'N/A'}
//                 />
//                 <InfoRow 
//                   icon={<FaBuilding />}
//                   label="Categories"
//                   value={getCategoryNames()}
//                 />
//               </div>
//             </SectionCard>

//             {/* Address Information */}
//             <SectionCard title="Address Information" icon={<FaMapMarkerAlt />}>
//               <div className="row">
//                 <div className="col-12 mb-3">
//                   <div className="info-card full-width">
//                     <div className="info-icon">
//                       <FaMapMarkerAlt />
//                     </div>
//                     <div className="info-content">
//                       <div className="info-label">Full Address</div>
//                       <div className="info-value">
//                         {business.address_line1}
//                         {business.address_line2 && <>, {business.address_line2}</>}
//                         <br />
//                         {business.city}, {getStateName()} - {business.pincode}
//                         <br />
//                         {getCountryName()}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </SectionCard>

//             {/* Bank & Compliance */}
//             <SectionCard title="Bank & Compliance" icon={<FaUniversity />}>
//               <div className="row">
//                 <InfoRow 
//                   icon={<FaUser />}
//                   label="Account Holder Name"
//                   value={business.bank_account_name}
//                 />
//                 <InfoRow 
//                   icon={<FaCreditCard />}
//                   label="Account Number"
//                   value={business.bank_account_number}
//                 />
//                 <InfoRow 
//                   icon={<FaCode />}
//                   label="IFSC Code"
//                   value={business.bank_ifsc}
//                 />
//                 <InfoRow 
//                   icon={<FaUniversity />}
//                   label="Bank Name"
//                   value={business.bank_name}
//                 />
//                 <InfoRow 
//                   icon={<FaCode />}
//                   label="GST Number"
//                   value={business.gst_number}
//                 />
//                 <InfoRow 
//                   icon={<FaCode />}
//                   label="PAN Number"
//                   value={business.pan_number}
//                 />
//               </div>
//             </SectionCard>

//             {/* Marketplace Settings */}
//             <SectionCard title="Marketplace Settings" icon={<FaMoneyBillWave />}>
//               <div className="row">
//                 <InfoRow 
//                   icon={<FaPercent />}
//                   label="Commission Percent"
//                   value={`${business.commission_percent || 5}%`}
//                 />
//                 <InfoRow 
//                   icon={<FaCalendarAlt />}
//                   label="Settlement Cycle"
//                   value={`${business.settlement_cycle_days || 3} days`}
//                 />
//                 <InfoRow 
//                   icon={<FaMoneyBillWave />}
//                   label="Minimum Order Value"
//                   value={formatCurrency(business.min_order_value)}
//                 />
//               </div>
//             </SectionCard>

//             {/* Working Hours */}
//             {business.working_hours && business.working_hours.length > 0 && (
//               <SectionCard title="Working Hours" icon={<FaClock />}>
//                 <div className="working-hours-table">
//                   <table className="table">
//                     <thead>
//                       <tr>
//                         <th>Day</th>
//                         <th>Status</th>
//                         <th>Opening Time</th>
//                         <th>Closing Time</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {business.working_hours.map((hour) => (
//                         <tr key={hour.day}>
//                           <td className="day-cell">{DAYS_MAP[hour.day]}</td>
//                           <td>
//                             {hour.is_closed ? (
//                               <span className="badge bg-danger">Closed</span>
//                             ) : (
//                               <span className="badge bg-success">Open</span>
//                             )}
//                           </td>
//                           <td>{hour.is_closed ? '-' : formatTime(hour.opens_at)}</td>
//                           <td>{hour.is_closed ? '-' : formatTime(hour.closes_at)}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </SectionCard>
//             )}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .view-business-container {
//           background: #f5f7fb;
//           min-height: 100vh;
//           padding: 20px;
//         }

//         .business-header {
//           background: white;
//           border-radius: 15px;
//           padding: 30px;
//           margin-bottom: 30px;
//           box-shadow: 0 2px 10px rgba(0,0,0,0.05);
//         }

//         .header-actions {
//           display: flex;
//           justify-content: space-between;
//           margin-bottom: 30px;
//         }

//         .action-buttons {
//           display: flex;
//           gap: 10px;
//         }

//         .business-title-section {
//           display: flex;
//           gap: 30px;
//           align-items: center;
//           margin-bottom: 30px;
//         }

//         .business-logo-wrapper {
//           flex-shrink: 0;
//         }

//         .business-logo-large {
//           width: 120px;
//           height: 120px;
//           object-fit: cover;
//           border-radius: 15px;
//           box-shadow: 0 4px 10px rgba(0,0,0,0.1);
//         }

//         .business-logo-placeholder {
//           width: 120px;
//           height: 120px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border-radius: 15px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: white;
//         }

//         .business-title-info h1 {
//           margin: 0 0 10px 0;
//           font-size: 32px;
//           color: #2c3e50;
//         }

//         .business-meta {
//           display: flex;
//           gap: 10px;
//           margin-bottom: 10px;
//         }

//         .legal-name {
//           color: #7f8c8d;
//           margin: 0;
//           font-size: 14px;
//         }

//         .business-banner {
//           margin-top: 20px;
//           border-radius: 10px;
//           overflow: hidden;
//         }

//         .business-banner img {
//           width: 100%;
//           max-height: 300px;
//           object-fit: cover;
//         }

//         .business-content {
//           display: flex;
//           flex-direction: column;
//           gap: 30px;
//         }

//         .section-card {
//           background: white;
//           border-radius: 15px;
//           overflow: hidden;
//           box-shadow: 0 2px 10px rgba(0,0,0,0.05);
//         }

//         .section-header {
//           background: linear-gradient(135deg, #273c75 0%, #1a2a5c 100%);
//           padding: 20px 30px;
//         }

//         .section-title {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           color: white;
//         }

//         .section-title svg {
//           font-size: 24px;
//         }

//         .section-title h3 {
//           margin: 0;
//           font-size: 20px;
//           font-weight: 600;
//         }

//         .section-content {
//           padding: 30px;
//         }

//         .info-card {
//           display: flex;
//           align-items: center;
//           gap: 15px;
//           padding: 15px;
//           background: #f8f9fa;
//           border-radius: 10px;
//           transition: all 0.3s ease;
//         }

//         .info-card.full-width {
//           width: 100%;
//         }

//         .info-icon {
//           width: 45px;
//           height: 45px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border-radius: 10px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: white;
//           font-size: 20px;
//         }

//         .info-content {
//           flex: 1;
//         }

//         .info-label {
//           font-size: 12px;
//           color: #7f8c8d;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           margin-bottom: 5px;
//         }

//         .info-value {
//           font-size: 16px;
//           font-weight: 500;
//           color: #2c3e50;
//         }

//         .info-value a {
//           color: #273c75;
//           text-decoration: none;
//         }

//         .info-value a:hover {
//           text-decoration: underline;
//         }

//         .description-text {
//           line-height: 1.6;
//         }

//         .working-hours-table {
//           overflow-x: auto;
//         }

//         .working-hours-table table {
//           width: 100%;
//           border-collapse: collapse;
//         }

//         .working-hours-table th,
//         .working-hours-table td {
//           padding: 12px;
//           text-align: left;
//           border-bottom: 1px solid #e0e0e0;
//         }

//         .working-hours-table th {
//           background: #f8f9fa;
//           font-weight: 600;
//           color: #2c3e50;
//         }

//         .day-cell {
//           font-weight: 600;
//           color: #2c3e50;
//         }

//         .verification-badge,
//         .active-badge,
//         .featured-badge {
//           padding: 6px 12px;
//           border-radius: 20px;
//           font-size: 12px;
//           display: inline-flex;
//           align-items: center;
//           gap: 5px;
//         }

//         .badge-warning {
//           background: #ffc107;
//           color: #856404;
//         }

//         .badge-success {
//           background: #28a745;
//           color: white;
//         }

//         .badge-danger {
//           background: #dc3545;
//           color: white;
//         }

//         .badge-secondary {
//           background: #6c757d;
//           color: white;
//         }

//         .loading-container,
//         .error-container {
//           text-align: center;
//           padding: 100px 20px;
//         }

//         @media (max-width: 768px) {
//           .business-title-section {
//             flex-direction: column;
//             text-align: center;
//           }

//           .header-actions {
//             flex-direction: column;
//             gap: 15px;
//           }

//           .action-buttons {
//             justify-content: center;
//           }

//           .section-content {
//             padding: 20px;
//           }

//           .info-card {
//             flex-direction: column;
//             text-align: center;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default ViewBusiness;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { baseurl } from '../../BaseURL/BaseURL';
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import './ViewBusiness.css';

const AgentViewBusiness = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const userId = localStorage.getItem('user_id');

  // Business types mapping
  const BUSINESS_TYPES = {
    'individual': 'Individual',
    'proprietor': 'Proprietor',
    'partnership': 'Partnership',
    'private_limited': 'Private Limited',
    'llp': 'LLP'
  };

  // Days of week mapping
  const DAYS_MAP = {
    'monday': 'Monday',
    'tuesday': 'Tuesday',
    'wednesday': 'Wednesday',
    'thursday': 'Thursday',
    'friday': 'Friday',
    'saturday': 'Saturday',
    'sunday': 'Sunday'
  };

  useEffect(() => {
    fetchBusinessDetails();
    fetchCategories();
  }, [id]);

  const fetchBusinessDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}/business/${id}/?user_id=${userId}`);
      setBusiness(response.data);
    } catch (error) {
      console.error('Error fetching business details:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load business details',
        confirmButtonColor: '#d33',
      }).then(() => {
        navigate('/agent-my-business');
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseurl}/categories/`);
      const businessCategories = response.data.results?.filter(cat => cat.level === 'business') || [];
      setCategories(businessCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getCategoryNames = () => {
    if (!business?.categories?.length) return 'No categories';
    return business.categories
      .map(catId => {
        const category = categories.find(c => c.category_id === parseInt(catId));
        return category ? category.name : '';
      })
      .filter(name => name)
      .join(', ');
  };

  const getVerificationStatusBadge = () => {
    const status = business?.verification_status;
    const statusConfig = {
      'pending': { label: 'Pending', class: 'badge-warning' },
      'verified': { label: 'Verified', class: 'badge-success' },
      'rejected': { label: 'Rejected', class: 'badge-danger' },
      'suspended': { label: 'Suspended', class: 'badge-secondary' }
    };
    const config = statusConfig[status] || { label: status, class: 'badge-info' };
    return (
      <span className={`badge ${config.class} verification-badge`}>
        {config.label}
      </span>
    );
  };

  const formatTime = (time) => {
    if (!time) return 'Closed';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Delete Business?',
      text: `Are you sure you want to delete "${business?.business_name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${baseurl}/business/${id}/?user_id=${userId}`);
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Business has been deleted.',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          navigate('/agent-my-business');
        });
      } catch (error) {
        console.error('Error deleting business:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete business',
          confirmButtonColor: '#d33',
        });
      }
    }
  };

  const handleViewProducts = () => {
    navigate(`/my-products?business=${business?.business_id}`);
  };

  const InfoField = ({ label, value }) => {
    return (
      <div className="info-field">
        <span className="info-label">{label}:</span>
        <span className="info-value">{value || 'N/A'}</span>
      </div>
    );
  };

  const SectionTitle = ({ title }) => {
    return (
      <div className="section-title">
        <h3>{title}</h3>
      </div>
    );
  };

  if (loading) {
    return (
      <>
        <AgentNavbar />
        <div className="agent-view-business-container">
          <div className="loading-container">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading business details...</p>
          </div>
        </div>
      </>
    );
  }

  if (!business) {
    return (
      <>
        <AgentNavbar />
        <div className="agent-view-business-container">
          <div className="error-container">
            <i className="bi bi-exclamation-triangle-fill display-1 text-warning"></i>
            <h3 className="mt-3">Business Not Found</h3>
            <p>The business you're looking for doesn't exist or has been removed.</p>
            <button className="btn btn-primary mt-3" onClick={() => navigate('/agent-my-business')}>
              Back to Businesses
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AgentNavbar />
      <div className="agent-view-business-container">
        {/* Header with Back Button and Title */}
        <div className="view-header">
          <button className="btn-back" onClick={() => navigate('/agent-my-business')}>
            <i className="bi bi-arrow-left"></i> Back
          </button>
          <h1 className="business-title">{business.business_name}</h1>
          <div className="header-actions">
            <button className="btn-products" onClick={handleViewProducts}>
              <i className="bi bi-box-seam"></i> Products
            </button>
            <button className="btn-edit" onClick={() => navigate(`/edit-business/${id}`)}>
              <i className="bi bi-pencil"></i> Edit
            </button>
            <button className="btn-delete" onClick={handleDelete}>
              <i className="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>

        {/* Logo and Banner Section */}
        <div className="media-section">
          <div className="logo-container">
            {business.logo ? (
              <img 
                src={`${baseurl}${business.logo}`} 
                alt={`${business.business_name} logo`}
                className="business-logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/100x100/6c757d/ffffff?text=Logo';
                }}
              />
            ) : (
              <div className="logo-placeholder">
                <i className="bi bi-building"></i>
              </div>
            )}
          </div>
          <div className="banner-container">
            {business.banner ? (
              <img 
                src={`${baseurl}${business.banner}`} 
                alt={`${business.business_name} banner`}
                className="business-banner"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/800x200/6c757d/ffffff?text=No+Banner';
                }}
              />
            ) : (
              <div className="banner-placeholder">
                <i className="bi bi-image"></i>
                <span>No Banner</span>
              </div>
            )}
          </div>
        </div>

        {/* Status Section (Read-only for agents) */}
        <div className="status-section">
          <div className="status-row">
            <span className="status-label">Verification Status:</span>
            {getVerificationStatusBadge()}
            {business.is_featured && (
              <span className="featured-badge">Featured</span>
            )}
            {/* {business.is_active ? (
              <span className="active-badge active">Active</span>
            ) : (
              <span className="active-badge inactive">Inactive</span>
            )} */}
          </div>
        </div>

        {/* Basic Information */}
        <div className="info-section">
          <SectionTitle title="Basic Information" />
          <div className="info-grid">
            <InfoField label="Business Name" value={business.business_name} />
            <InfoField label="Legal Name" value={business.legal_name} />
            <InfoField label="Business Type" value={BUSINESS_TYPES[business.business_type] || business.business_type} />
            <InfoField label="Categories" value={getCategoryNames()} />
          </div>
          <div className="description-field">
            <InfoField label="Description" value={business.description} />
          </div>
        </div>

        {/* Contact Information */}
        <div className="info-section">
          <SectionTitle title="Contact Information" />
          <div className="info-grid">
            <InfoField label="Support Email" value={business.support_email} />
            <InfoField label="Support Phone" value={business.support_phone} />
            <InfoField label="Website" value={business.website} />
          </div>
        </div>

        {/* Address Information */}
        <div className="info-section">
          <SectionTitle title="Address" />
          <div className="info-grid">
            <InfoField label="Address Line 1" value={business.address_line1} />
            <InfoField label="Address Line 2" value={business.address_line2} />
          </div>
          <div className="info-grid">
            <InfoField label="City" value={business.city} />
            <InfoField label="State" value={business.state} />
          </div>
          <div className="info-grid">
            <InfoField label="Country" value={business.country} />
            <InfoField label="Pincode" value={business.pincode} />
          </div>
        </div>

        {/* Bank & Compliance */}
        <div className="info-section">
          <SectionTitle title="Bank & Compliance" />
          <div className="info-grid">
            <InfoField label="Account Holder Name" value={business.bank_account_name} />
            <InfoField label="Account Number" value={business.bank_account_number} />
            <InfoField label="IFSC Code" value={business.bank_ifsc} />
          </div>
          <div className="info-grid">
            <InfoField label="Bank Name" value={business.bank_name} />
            <InfoField label="GST Number" value={business.gst_number} />
            <InfoField label="PAN Number" value={business.pan_number} />
          </div>
        </div>

        {/* Marketplace Settings */}
        <div className="info-section">
          <SectionTitle title="Marketplace Settings" />
          <div className="info-grid">
            <InfoField label="Commission Percentage" value={`${business.commission_percent}%`} />
            <InfoField label="Settlement Cycle" value={`${business.settlement_cycle_days} days`} />
            <InfoField label="Minimum Order Value" value={`₹${business.min_order_value}`} />
          </div>
        </div>

        {/* Working Hours */}
        <div className="info-section">
          <SectionTitle title="Working Hours" />
          <div className="working-hours-table-container">
            <table className="working-hours-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Opening Time</th>
                  <th>Closing Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {business.working_hours && business.working_hours.length > 0 ? (
                  business.working_hours.map((hour) => (
                    <tr key={hour.day}>
                      <td className="day-cell">{DAYS_MAP[hour.day] || hour.day}</td>
                      <td>{!hour.is_closed && hour.opens_at ? formatTime(hour.opens_at) : '—'}</td>
                      <td>{!hour.is_closed && hour.closes_at ? formatTime(hour.closes_at) : '—'}</td>
                      <td>
                        {hour.is_closed ? (
                          <span className="closed-badge">Closed</span>
                        ) : (
                          <span className="open-badge">Open</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No working hours set</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="admin-action-buttons">
          <button className="btn btn-secondary" onClick={() => navigate('/agent-my-business')}>
            <i className="bi bi-arrow-left"></i> Back to List
          </button>
          <button className="btn btn-primary" onClick={() => navigate(`/edit-business/${id}`)}>
            <i className="bi bi-pencil"></i> Edit Business
          </button>
        </div>
      </div>
    </>
  );
};

export default AgentViewBusiness;