// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { baseurl } from '../../BaseURL/BaseURL';
// import './MyBusiness.css';
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";

// const BusinessList = () => {
//   const [businesses, setBusinesses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(12);
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

// //   const token = localStorage.getItem('token');
//     const userId = localStorage.getItem('user_id');

//   useEffect(() => {
//     fetchBusinesses();
//     fetchCategories();
//   }, []);

// //   const fetchBusinesses = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await axios.get(`${baseurl}/business/?user_id={${userId}`, {
// //         headers: {
// //           'Authorization': `Bearer ${userId}`,
// //           'Content-Type': 'application/json'
// //         }
// //       });
// //       setBusinesses(response.data.results || response.data);
// //     } catch (error) {
// //       console.error('Error fetching businesses:', error);
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Error',
// //         text: 'Failed to load businesses',
// //         confirmButtonColor: '#d33',
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };



// const fetchBusinesses = async () => {
//   try {
//     console.log("📡 Fetching businesses...");
//     console.log("➡️ User ID:", userId);
//     console.log("➡️ API URL:", `${baseurl}/business/?user_id=${userId}`);

//     setLoading(true);

//     const response = await axios.get(
//       `${baseurl}/business/?user_id=${userId}`,
//       {
//         headers: {
//           'Authorization': `Bearer ${userId}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     console.log("✅ Businesses API response:", response);
//     console.log("📦 Businesses data:", response.data);

//     setBusinesses(response.data.results || response.data);

//   } catch (error) {
//     console.error("❌ Error fetching businesses");
//     console.error("🔴 Error object:", error);
//     console.error("🔴 Error response:", error.response);
//     console.error("🔴 Error message:", error.message);

//     Swal.fire({
//       icon: 'error',
//       title: 'Error',
//       text: 'Failed to load businesses',
//       confirmButtonColor: '#d33',
//     });
//   } finally {
//     console.log("⏹️ Finished fetching businesses");
//     setLoading(false);
//   }
// };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`${baseurl}/api/categories/`, {
//         headers: {
//           'Authorization': `Bearer ${userId}`,
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

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };

//   const getCategoryNames = (categoryIds) => {
//     if (!Array.isArray(categoryIds) || !categories.length) return 'No categories';
//     return categoryIds
//       .map(id => {
//         const category = categories.find(cat => cat.category_id === id);
//         return category ? category.name : '';
//       })
//       .filter(name => name)
//       .join(', ');
//   };

//   const getBusinessTypeLabel = (type) => {
//     const types = {
//       'individual': 'Individual',
//       'proprietor': 'Proprietor',
//       'partnership': 'Partnership',
//       'private_limited': 'Private Limited',
//       'llp': 'LLP'
//     };
//     return types[type] || type;
//   };

//   const getVerificationStatusBadge = (status) => {
//     const statusConfig = {
//       'pending': { label: 'Pending', class: 'badge-warning' },
//       'verified': { label: 'Verified', class: 'badge-success' },
//       'rejected': { label: 'Rejected', class: 'badge-danger' },
//       'suspended': { label: 'Suspended', class: 'badge-secondary' }
//     };
//     const config = statusConfig[status] || { label: status, class: 'badge-info' };
//     return (
//       <span className={`badge ${config.class} verification-badge`}>
//         {config.label}
//       </span>
//     );
//   };

//   const formatTime = (time) => {
//     if (!time) return 'Closed';
//     const [hours, minutes] = time.split(':');
//     const hour = parseInt(hours, 10);
//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     const hour12 = hour % 12 || 12;
//     return `${hour12}:${minutes} ${ampm}`;
//   };

//   const getWorkingHoursSummary = (workingHours) => {
//     if (!workingHours || !workingHours.length) return 'No hours set';
    
//     const openDays = workingHours.filter(day => !day.is_closed && day.opens_at && day.closes_at);
//     if (openDays.length === 0) return 'Closed all week';
    
//     const firstDay = openDays[0];
//     const lastDay = openDays[openDays.length - 1];
    
//     if (openDays.length === 7) {
//       return `Everyday ${formatTime(firstDay.opens_at)} - ${formatTime(firstDay.closes_at)}`;
//     }
    
//     return `${openDays.length} days/week • ${formatTime(firstDay.opens_at)} - ${formatTime(firstDay.closes_at)}`;
//   };

//   const getFeaturedBadge = (isFeatured) => {
//     if (!isFeatured) return null;
//     return <span className="badge bg-warning featured-badge">Featured</span>;
//   };

//   const getActiveBadge = (isActive) => {
//     if (!isActive) return <span className="badge bg-danger active-badge">Inactive</span>;
//     return <span className="badge bg-success active-badge">Active</span>;
//   };

//   // Filter businesses based on search and filters
//   const filteredBusinesses = businesses.filter(business => {
//     const matchesSearch = searchTerm === '' || 
//       business.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       business.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       business.city?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesType = filterType === 'all' || business.business_type === filterType;
//     const matchesStatus = filterStatus === 'all' || business.verification_status === filterStatus;
    
//     return matchesSearch && matchesType && matchesStatus;
//   });

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentBusinesses = filteredBusinesses.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);

//   const handleDelete = async (businessId, businessName) => {
//     const result = await Swal.fire({
//       title: 'Delete Business?',
//       text: `Are you sure you want to delete "${businessName}"?`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     });

//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`${baseurl}/business/${businessId}/`, {
//           headers: {
//             'Authorization': `Bearer ${userId}`,
//             'Content-Type': 'application/json'
//           }
//         });
        
//         Swal.fire({
//           icon: 'success',
//           title: 'Deleted!',
//           text: 'Business has been deleted.',
//           confirmButtonColor: '#3085d6',
//         });
        
//         fetchBusinesses(); // Refresh list
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

//   const handleEdit = (businessId) => {
//     navigate(`/edit-business/${businessId}`);
//   };

//   const handleView = (businessId) => {
//     navigate(`/view-business/${businessId}`);
//   };

//   const handleAddNew = () => {
//     navigate('/agent-add-business-form');
//   };

//   if (loading) {
//     return (
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-12 text-center py-5">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-3">Loading businesses...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (

//            <>
//               <AgentNavbar/>
//     <div className="container-fluid business-list-container">
//       {/* Header */}
//       <div className="row mb-4">
//         <div className="col-md-8">
//           <h1 className="business-list-title">Business Directory</h1>
//           <p className="business-list-subtitle">Manage your businesses and view details</p>
//         </div>
//         <div className="col-md-4 text-end">
//           <button 
//             className="btn btn-primary btn-add-business"
//             onClick={handleAddNew}
//           >
//             <i className="bi bi-plus-circle me-2"></i>
//             Add New Business
//           </button>
//         </div>
//       </div>

//       {/* Filters and Search */}
//       <div className="row mb-4">
//         <div className="col-md-6">
//           <div className="input-group search-box">
//             <span className="input-group-text">
//               <i className="bi bi-search"></i>
//             </span>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search by name, description, or city..."
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//           </div>
//         </div>
//         <div className="col-md-3">
//           <select 
//             className="form-select filter-select"
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//           >
//             <option value="all">All Business Types</option>
//             <option value="individual">Individual</option>
//             <option value="proprietor">Proprietor</option>
//             <option value="partnership">Partnership</option>
//             <option value="private_limited">Private Limited</option>
//             <option value="llp">LLP</option>
//           </select>
//         </div>
//         <div className="col-md-3">
//           <select 
//             className="form-select filter-select"
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//           >
//             <option value="all">All Status</option>
//             <option value="pending">Pending</option>
//             <option value="verified">Verified</option>
//             <option value="rejected">Rejected</option>
//             <option value="suspended">Suspended</option>
//           </select>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="row mb-4">
//         <div className="col-12">
//           <div className="business-stats">
//             <div className="stat-card">
//               <div className="stat-number">{businesses.length}</div>
//               <div className="stat-label">Total Businesses</div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-number">
//                 {businesses.filter(b => b.verification_status === 'verified').length}
//               </div>
//               <div className="stat-label">Verified</div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-number">
//                 {businesses.filter(b => b.is_featured).length}
//               </div>
//               <div className="stat-label">Featured</div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-number">
//                 {businesses.filter(b => b.is_active).length}
//               </div>
//               <div className="stat-label">Active</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Business Cards */}
//       {currentBusinesses.length === 0 ? (
//         <div className="row">
//           <div className="col-12">
//             <div className="no-results text-center py-5">
//               <i className="bi bi-buildings-fill display-1 text-muted"></i>
//               <h3 className="mt-3">No businesses found</h3>
//               <p className="text-muted">
//                 {searchTerm || filterType !== 'all' || filterStatus !== 'all' 
//                   ? 'Try adjusting your search or filters'
//                   : 'Start by adding your first business'}
//               </p>
//               {(!searchTerm && filterType === 'all' && filterStatus === 'all') && (
//                 <button 
//                   className="btn btn-primary mt-3"
//                   onClick={handleAddNew}
//                 >
//                   Add Your First Business
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <>
//           <div className="row">
//             {currentBusinesses.map((business) => (
//               <div key={business.business_id} className="col-xl-3 col-lg-4 col-md-6 mb-4">
//                 <div className="business-card">
//                   {/* Card Header */}
//                   <div className="business-card-header">
//                     <div className="business-name-container">
//                       <h3 className="business-name">{business.business_name}</h3>
//                       {getFeaturedBadge(business.is_featured)}
//                     </div>
//                     <div className="business-status">
//                       {getVerificationStatusBadge(business.verification_status)}
//                       {getActiveBadge(business.is_active)}
//                     </div>
//                   </div>

//                   {/* Card Body */}
//                   <div className="business-card-body">
//                     {/* Banner/Logo */}
//                     <div className="business-image-container">
//                       {business.banner ? (
//                         <img 
//                           src={`${baseurl}${business.banner}`} 
//                           alt={business.business_name}
//                           className="business-banner"
//                           onError={(e) => {
//                             e.target.src = 'https://via.placeholder.com/400x200/6c757d/ffffff?text=No+Banner';
//                           }}
//                         />
//                       ) : (
//                         <div className="business-banner-placeholder">
//                           <i className="bi bi-buildings display-4"></i>
//                           <p>No Banner</p>
//                         </div>
//                       )}
//                       {business.logo && (
//                         <div className="business-logo-container">
//                           <img 
//                             src={`${baseurl}${business.logo}`} 
//                             alt="Logo"
//                             className="business-logo"
//                             onError={(e) => {
//                               e.target.style.display = 'none';
//                             }}
//                           />
//                         </div>
//                       )}
//                     </div>

//                     {/* Business Details */}
//                     <div className="business-details">
//                       <div className="business-info-item">
//                         <i className="bi bi-building me-2"></i>
//                         <span className="info-label">Type:</span>
//                         <span className="info-value">{getBusinessTypeLabel(business.business_type)}</span>
//                       </div>
                      
//                       <div className="business-info-item">
//                         <i className="bi bi-geo-alt me-2"></i>
//                         <span className="info-label">Location:</span>
//                         <span className="info-value">{business.city}, {business.state}</span>
//                       </div>
                      
//                       <div className="business-info-item">
//                         <i className="bi bi-tags me-2"></i>
//                         <span className="info-label">Categories:</span>
//                         <span className="info-value categories-value">
//                           {getCategoryNames(business.categories) || 'No categories'}
//                         </span>
//                       </div>
                      
//                       <div className="business-info-item">
//                         <i className="bi bi-clock me-2"></i>
//                         <span className="info-label">Hours:</span>
//                         <span className="info-value">
//                           {getWorkingHoursSummary(business.working_hours)}
//                         </span>
//                       </div>
                      
//                       <div className="business-info-item">
//                         <i className="bi bi-percent me-2"></i>
//                         <span className="info-label">Commission:</span>
//                         <span className="info-value">{business.commission_percent}%</span>
//                       </div>
                      
//                       <div className="business-description">
//                         <p className="description-text">
//                           {business.description?.substring(0, 100) || 'No description available'}
//                           {business.description && business.description.length > 100 && '...'}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Card Footer */}
//                   <div className="business-card-footer">
//                     <div className="business-actions">
//                       <button 
//                         className="btn btn-sm btn-outline-primary"
//                         onClick={() => handleView(business.business_id)}
//                       >
//                         <i className="bi bi-eye me-1"></i> View
//                       </button>
//                       <button 
//                         className="btn btn-sm btn-outline-secondary"
//                         onClick={() => handleEdit(business.business_id)}
//                       >
//                         <i className="bi bi-pencil me-1"></i> Edit
//                       </button>
//                       <button 
//                         className="btn btn-sm btn-outline-danger"
//                         onClick={() => handleDelete(business.business_id, business.business_name)}
//                       >
//                         <i className="bi bi-trash me-1"></i> Delete
//                       </button>
//                     </div>
//                     <div className="business-meta">
//                       <small className="text-muted">
//                         <i className="bi bi-calendar me-1"></i>
//                         Created: {business.created_at}
//                       </small>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="row">
//               <div className="col-12">
//                 <nav className="business-pagination">
//                   <ul className="pagination justify-content-center">
//                     <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                       <button 
//                         className="page-link"
//                         onClick={() => setCurrentPage(currentPage - 1)}
//                         disabled={currentPage === 1}
//                       >
//                         <i className="bi bi-chevron-left"></i> Previous
//                       </button>
//                     </li>
                    
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                       <li 
//                         key={page} 
//                         className={`page-item ${currentPage === page ? 'active' : ''}`}
//                       >
//                         <button 
//                           className="page-link"
//                           onClick={() => setCurrentPage(page)}
//                         >
//                           {page}
//                         </button>
//                       </li>
//                     ))}
                    
//                     <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//                       <button 
//                         className="page-link"
//                         onClick={() => setCurrentPage(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                       >
//                         Next <i className="bi bi-chevron-right"></i>
//                       </button>
//                     </li>
//                   </ul>
//                 </nav>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//     </>
//   );
// };

// export default BusinessList;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { baseurl } from '../../BaseURL/BaseURL';
import './MyBusiness.css';
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    fetchBusinesses();
    fetchCategories();
  }, []);

  const fetchBusinesses = async () => {
    try {
      console.log("📡 Fetching businesses...");
      console.log("➡️ User ID:", userId);
      console.log("➡️ API URL:", `${baseurl}/business/?user_id=${userId}`);

      setLoading(true);

      const response = await axios.get(
        `${baseurl}/business/?user_id=${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${userId}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("✅ Businesses API response:", response);
      console.log("📦 Businesses data:", response.data);

      setBusinesses(response.data.results || response.data);

    } catch (error) {
      console.error("❌ Error fetching businesses");
      console.error("🔴 Error object:", error);
      console.error("🔴 Error response:", error.response);
      console.error("🔴 Error message:", error.message);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load businesses',
        confirmButtonColor: '#d33',
      });
    } finally {
      console.log("⏹️ Finished fetching businesses");
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseurl}/api/categories/`, {
        headers: {
          'Authorization': `Bearer ${userId}`,
          'Content-Type': 'application/json'
        }
      });
      const businessCategories = Array.isArray(response.data) 
        ? response.data.filter(cat => cat.level === 'business')
        : response.data.results?.filter(cat => cat.level === 'business') || [];
      setCategories(businessCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const getCategoryNames = (categoryIds) => {
    if (!Array.isArray(categoryIds) || !categories.length) return 'No categories';
    return categoryIds
      .map(id => {
        const category = categories.find(cat => cat.category_id === id);
        return category ? category.name : '';
      })
      .filter(name => name)
      .join(', ');
  };

  const getBusinessTypeLabel = (type) => {
    const types = {
      'individual': 'Individual',
      'proprietor': 'Proprietor',
      'partnership': 'Partnership',
      'private_limited': 'Private Limited',
      'llp': 'LLP'
    };
    return types[type] || type;
  };

  const getVerificationStatusBadge = (status) => {
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

  const getWorkingHoursSummary = (workingHours) => {
    if (!workingHours || !workingHours.length) return 'No hours set';
    
    const openDays = workingHours.filter(day => !day.is_closed && day.opens_at && day.closes_at);
    if (openDays.length === 0) return 'Closed all week';
    
    const firstDay = openDays[0];
    const lastDay = openDays[openDays.length - 1];
    
    if (openDays.length === 7) {
      return `Everyday ${formatTime(firstDay.opens_at)} - ${formatTime(firstDay.closes_at)}`;
    }
    
    return `${openDays.length} days/week • ${formatTime(firstDay.opens_at)} - ${formatTime(firstDay.closes_at)}`;
  };

  const getFeaturedBadge = (isFeatured) => {
    if (!isFeatured) return null;
    return <span className="badge bg-warning featured-badge">Featured</span>;
  };

  const getActiveBadge = (isActive) => {
    if (!isActive) return <span className="badge bg-danger active-badge">Inactive</span>;
    return <span className="badge bg-success active-badge">Active</span>;
  };

  // Filter businesses based on search and filters
  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = searchTerm === '' || 
      business.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.city?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || business.business_type === filterType;
    const matchesStatus = filterStatus === 'all' || business.verification_status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBusinesses = filteredBusinesses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);

  const handleDelete = async (businessId, businessName) => {
    const result = await Swal.fire({
      title: 'Delete Business?',
      text: `Are you sure you want to delete "${businessName}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${baseurl}/business/${businessId}/`, {
          headers: {
            'Authorization': `Bearer ${userId}`,
            'Content-Type': 'application/json'
          }
        });
        
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Business has been deleted.',
          confirmButtonColor: '#3085d6',
        });
        
        fetchBusinesses(); // Refresh list
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

  const handleEdit = (businessId) => {
    navigate(`/edit-business/${businessId}`);
  };

  const handleView = (businessId) => {
    navigate(`/view-business/${businessId}`);
  };

  // New function to handle View Products navigation
  const handleViewProducts = (businessId) => {
    navigate(`/my-products?business=${businessId}`);
  };


  
  const handleAddNew = () => {
    navigate('/agent-add-business-form');
  };

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading businesses...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <AgentNavbar/>
      <div className="container-fluid business-list-container">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-md-8">
            <h1 className="business-list-title">Business Directory</h1>
            <p className="business-list-subtitle">Manage your businesses and view details</p>
          </div>
          <div className="col-md-4 text-end">
            <button 
              className="btn btn-primary btn-add-business"
              onClick={handleAddNew}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Add New Business
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="input-group search-box">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, description, or city..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="col-md-3">
            <select 
              className="form-select filter-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Business Types</option>
              <option value="individual">Individual</option>
              <option value="proprietor">Proprietor</option>
              <option value="partnership">Partnership</option>
              <option value="private_limited">Private Limited</option>
              <option value="llp">LLP</option>
            </select>
          </div>
          <div className="col-md-3">
            <select 
              className="form-select filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="business-stats">
              <div className="stat-card">
                <div className="stat-number">{businesses.length}</div>
                <div className="stat-label">Total Businesses</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {businesses.filter(b => b.verification_status === 'verified').length}
                </div>
                <div className="stat-label">Verified</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {businesses.filter(b => b.is_featured).length}
                </div>
                <div className="stat-label">Featured</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {businesses.filter(b => b.is_active).length}
                </div>
                <div className="stat-label">Active</div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Cards */}
        {currentBusinesses.length === 0 ? (
          <div className="row">
            <div className="col-12">
              <div className="no-results text-center py-5">
                <i className="bi bi-buildings-fill display-1 text-muted"></i>
                <h3 className="mt-3">No businesses found</h3>
                <p className="text-muted">
                  {searchTerm || filterType !== 'all' || filterStatus !== 'all' 
                    ? 'Try adjusting your search or filters'
                    : 'Start by adding your first business'}
                </p>
                {(!searchTerm && filterType === 'all' && filterStatus === 'all') && (
                  <button 
                    className="btn btn-primary mt-3"
                    onClick={handleAddNew}
                  >
                    Add Your First Business
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="row">
              {currentBusinesses.map((business) => (
                <div key={business.business_id} className="col-xl-3 col-lg-4 col-md-6 mb-4">
                  <div className="business-card">
                    {/* Card Header */}
                    <div className="business-card-header">
                      <div className="business-name-container">
                        <h3 className="business-name">{business.business_name}</h3>
                        {getFeaturedBadge(business.is_featured)}
                      </div>
                      <div className="business-status">
                        {getVerificationStatusBadge(business.verification_status)}
                        {getActiveBadge(business.is_active)}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="business-card-body">
                      {/* Banner/Logo */}
                      <div className="business-image-container">
                        {business.banner ? (
                          <img 
                            src={`${baseurl}${business.banner}`} 
                            alt={business.business_name}
                            className="business-banner"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/400x200/6c757d/ffffff?text=No+Banner';
                            }}
                          />
                        ) : (
                          <div className="business-banner-placeholder">
                            <i className="bi bi-buildings display-4"></i>
                            <p>No Banner</p>
                          </div>
                        )}
                        {business.logo && (
                          <div className="business-logo-container">
                            <img 
                              src={`${baseurl}${business.logo}`} 
                              alt="Logo"
                              className="business-logo"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Business Details */}
                      <div className="business-details">
                        <div className="business-info-item">
                          <i className="bi bi-building me-2"></i>
                          <span className="info-label">Type:</span>
                          <span className="info-value">{getBusinessTypeLabel(business.business_type)}</span>
                        </div>
                        
                        <div className="business-info-item">
                          <i className="bi bi-geo-alt me-2"></i>
                          <span className="info-label">Location:</span>
                          <span className="info-value">{business.city}, {business.state}</span>
                        </div>
                        
                        <div className="business-info-item">
                          <i className="bi bi-tags me-2"></i>
                          <span className="info-label">Categories:</span>
                          <span className="info-value categories-value">
                            {getCategoryNames(business.categories) || 'No categories'}
                          </span>
                        </div>
                        
                        <div className="business-info-item">
                          <i className="bi bi-clock me-2"></i>
                          <span className="info-label">Hours:</span>
                          <span className="info-value">
                            {getWorkingHoursSummary(business.working_hours)}
                          </span>
                        </div>
                        
                        <div className="business-info-item">
                          <i className="bi bi-percent me-2"></i>
                          <span className="info-label">Commission:</span>
                          <span className="info-value">{business.commission_percent}%</span>
                        </div>
                        
                        <div className="business-description">
                          <p className="description-text">
                            {business.description?.substring(0, 100) || 'No description available'}
                            {business.description && business.description.length > 100 && '...'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="business-card-footer">
                      {/* View Products Button */}
                      <div className="view-products-section mb-3">
                        <button 
                          className="btn btn-primary btn-sm w-100 d-flex align-items-center justify-content-center"
                          onClick={() => handleViewProducts(business.business_id)}
                          style={{
                            backgroundColor: '#273c75',
                            borderColor: '#273c75',
                            fontSize: '0.9rem',
                            padding: '0.5rem'
                          }}
                        >
                          <i className="bi bi-box-seam me-2"></i>
                          View Products
                        </button>
                      </div>

                      {/* Action Buttons */}
                      <div className="business-actions mb-2">
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleView(business.business_id)}
                        >
                          <i className="bi bi-eye me-1"></i> View
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleEdit(business.business_id)}
                        >
                          <i className="bi bi-pencil me-1"></i> Edit
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(business.business_id, business.business_name)}
                        >
                          <i className="bi bi-trash me-1"></i> Delete
                        </button>
                      </div>
                      <div className="business-meta">
                        <small className="text-muted">
                          <i className="bi bi-calendar me-1"></i>
                          Created: {business.created_at}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="row">
                <div className="col-12">
                  <nav className="business-pagination">
                    <ul className="pagination justify-content-center">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button 
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <i className="bi bi-chevron-left"></i> Previous
                        </button>
                      </li>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <li 
                          key={page} 
                          className={`page-item ${currentPage === page ? 'active' : ''}`}
                        >
                          <button 
                            className="page-link"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        </li>
                      ))}
                      
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button 
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next <i className="bi bi-chevron-right"></i>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default BusinessList;