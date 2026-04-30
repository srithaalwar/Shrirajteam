

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL';
// import Swal from "sweetalert2";
// import "./SiteVisits.css";

// const SiteVisits = () => {
//   const [siteVisits, setSiteVisits] = useState([]);
//   const [filteredVisits, setFilteredVisits] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [imageDialogOpen, setImageDialogOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [totalItems, setTotalItems] = useState(0);
  
//   const navigate = useNavigate();

//   // Fetch site visits
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       // Build query parameters
//       const params = new URLSearchParams({
//         page: currentPage,
//         page_size: itemsPerPage,
//       });
      
//       if (searchQuery.trim()) {
//         params.append('search', searchQuery.trim());
//       }
      
//       const res = await axios.get(`${baseurl}/site-visits/?${params.toString()}`);
      
//       // Handle different response formats
//       let data = [];
//       let count = 0;
      
//       if (Array.isArray(res.data)) {
//         data = res.data;
//         count = res.data.length;
//       } else if (res.data.results) {
//         data = res.data.results || [];
//         count = res.data.count || data.length;
//       } else {
//         data = res.data;
//         count = res.data.length || 0;
//       }
      
//       const sorted = data.sort((a, b) => b.id - a.id);
//       setSiteVisits(sorted);
//       setFilteredVisits(sorted);
//       setTotalItems(count);
//     } catch (error) {
//       console.error("Error fetching site visits:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to load site visits',
//         confirmButtonColor: '#273c75'
//       });
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchData();
//   }, [currentPage, itemsPerPage, searchQuery]);

//   /* ================= PAGINATION FUNCTIONS ================= */
//   // Calculate pagination values
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage + 1;
  
//   // Handle page change
//   const handlePageChange = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   // Handle items per page change
//   const handleItemsPerPageChange = (e) => {
//     const value = parseInt(e.target.value);
//     setItemsPerPage(value);
//     setCurrentPage(1); // Reset to first page when changing items per page
//   };

//   // Generate page numbers for pagination
//   const getPageNumbers = () => {
//     const pageNumbers = [];
//     const maxVisiblePages = 5;
    
//     if (totalPages <= maxVisiblePages) {
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       let startPage = Math.max(1, currentPage - 2);
//       let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
//       if (endPage - startPage + 1 < maxVisiblePages) {
//         startPage = Math.max(1, endPage - maxVisiblePages + 1);
//       }
      
//       for (let i = startPage; i <= endPage; i++) {
//         pageNumbers.push(i);
//       }
//     }
    
//     return pageNumbers;
//   };

//   // Image preview
//   const handleImageClick = (imgUrl) => {
//     if (!imgUrl) return;
    
//     const fullUrl = imgUrl.startsWith("http") 
//       ? imgUrl 
//       : imgUrl.startsWith("/media/")
//       ? `${baseurl}${imgUrl}`
//       : `${baseurl}/media/${imgUrl}`;
    
//     setSelectedImage(fullUrl);
//     setImageDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setImageDialogOpen(false);
//     setSelectedImage(null);
//   };

//   // Edit handler
//   const handleEdit = (id) => {
//     navigate(`/admin-admiteditsite/${id}`);
//   };

//   // Delete handler
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios.delete(`${baseurl}/site-visits/${id}/`)
//           .then(() => {
//             Swal.fire('Deleted!', 'Site visit deleted successfully.', 'success');
//             fetchData(); // Refetch data after deletion
//           })
//           .catch(() => Swal.fire('Error', 'Delete failed', 'error'));
//       }
//     });
//   };

//   // Handle search change
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1); // Reset to first page when searching
//   };

//   return (
//     <>
//       <AdminNavbar />

//       <div className="page-container">
//         {/* Header */}
//         <div className="page-header">
//           <h2>Site Visits</h2>
//         </div>

//         {/* Toolbar */}
//         <div className="page-toolbar">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Search site visits..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//             />
//             {/* <span className="search-icon">🔍</span> */}
//           </div>
          
//           {/* <button 
//             className="primary-btn"
//             style={{
//               backgroundColor: '#273c75',
//               borderColor: '#273c75',
//               color: 'white'
//             }}
//             onClick={() => navigate('/admin-sitevisit-add')}
//           >
//             Add Site Visit
//           </button> */}
//         </div>

//         {/* Table */}
//         <div className="table-card">
//           <table className="data-table">
//             <thead>
//               <tr>
//                 <th>S.No.</th>
//                 <th>DATE</th>
//                 <th>TIME</th>
//                 <th>SITE NAME</th>
//                 <th>SITE OWNER</th>
//                 <th>OWNER MOBILE</th>
//                 <th>LOCATION</th>
//                 <th>CUSTOMER NAME</th>
//                 <th>SALES EXECUTIVE NAME</th>
//                 <th>CUSTOMER MOBILE</th>
//                 <th>REMARKS</th>
//                 <th>PHOTO</th>
//                 <th>ACTIONS</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="12" className="no-data">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : filteredVisits.length ? (
//                 filteredVisits.map((visit, index) => (
//                   <tr key={visit.id}>
//                     <td>{startIndex + index}</td>
//                     <td>{visit.date || "-"}</td>
//                     <td>{visit.time || "-"}</td>
//                     <td>{visit.site_name || "-"}</td>
//                     <td>{visit.site_owner_name || "-"}</td>
//                     <td>{visit.site_owner_mobile_number || "-"}</td>
//                     <td>{visit.site_location || "-"}</td>
//                     <td>{visit.customer_name || "-"}</td>
//                      <td>{visit.sales_executive_name || "-"}</td>
//                     <td>{visit.customer_mobile_number || "-"}</td>
//                     <td className="remarks-cell">{visit.remarks || "-"}</td>
//                     <td>
//                       {visit.site_photo ? (
//                         <img
//                           src={
//                             visit.site_photo.startsWith("http")
//                               ? visit.site_photo
//                               : visit.site_photo.startsWith("/media/")
//                               ? `${baseurl}${visit.site_photo}`
//                               : `${baseurl}/media/${visit.site_photo}`
//                           }
//                           alt="Site"
//                           className="site-photo-thumbnail"
//                           onClick={() => handleImageClick(visit.site_photo)}
//                           style={{ cursor: 'pointer' }}
//                         />
//                       ) : (
//                         <span className="text-muted">No Image</span>
//                       )}
//                     </td>
//                     <td className="actions">
//                       <button 
//                         className="edit-btn"
//                         onClick={() => handleEdit(visit.id)}
//                         title="Edit"
//                       >
//                         ✏️
//                       </button>
//                       <button 
//                         className="delete-btn"
//                         onClick={() => handleDelete(visit.id)}
//                         title="Delete"
//                       >
//                         🗑️
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="12" className="no-data">
//                     No site visits found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
          
//           {/* Pagination Controls */}
//           {totalItems > 0 && (
//             <div className="pagination-container" style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               padding: '16px',
//               borderTop: '1px solid #eee',
//               backgroundColor: '#f8f9fa'
//             }}>
//               {/* Items per page selector */}
//               <div className="items-per-page" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                 <span style={{ fontSize: '14px', color: '#666' }}>Show:</span>
//                 <select 
//                   value={itemsPerPage} 
//                   onChange={handleItemsPerPageChange}
//                   style={{
//                     padding: '6px 12px',
//                     border: '1px solid #ddd',
//                     borderRadius: '4px',
//                     fontSize: '14px'
//                   }}
//                 >
//                   <option value="5">5</option>
//                   <option value="10">10</option>
//                   <option value="20">20</option>
//                   <option value="50">50</option>
//                   <option value="100">100</option>
//                 </select>
//                 <span style={{ fontSize: '14px', color: '#666' }}>
//                   of {totalItems} items
//                 </span>
//               </div>
              
//               {/* Page navigation */}
//               <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                 {/* First Page */}
//                 <button
//                   onClick={() => handlePageChange(1)}
//                   disabled={currentPage === 1}
//                   style={{
//                     padding: '6px 12px',
//                     border: '1px solid #ddd',
//                     borderRadius: '4px',
//                     background: currentPage === 1 ? '#f8f9fa' : 'white',
//                     color: currentPage === 1 ? '#ccc' : '#333',
//                     cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//                     fontSize: '14px'
//                   }}
//                 >
//                   ««
//                 </button>
                
//                 {/* Previous Page */}
//                 <button
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   style={{
//                     padding: '6px 12px',
//                     border: '1px solid #ddd',
//                     borderRadius: '4px',
//                     background: currentPage === 1 ? '#f8f9fa' : 'white',
//                     color: currentPage === 1 ? '#ccc' : '#333',
//                     cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//                     fontSize: '14px'
//                   }}
//                 >
//                   «
//                 </button>
                
//                 {/* Page Numbers */}
//                 {getPageNumbers().map(page => (
//                   <button
//                     key={page}
//                     onClick={() => handlePageChange(page)}
//                     style={{
//                       padding: '6px 12px',
//                       border: '1px solid #ddd',
//                       borderRadius: '4px',
//                       background: currentPage === page ? '#273c75' : 'white',
//                       color: currentPage === page ? 'white' : '#333',
//                       cursor: 'pointer',
//                       fontSize: '14px',
//                       fontWeight: currentPage === page ? 'bold' : 'normal'
//                     }}
//                   >
//                     {page}
//                   </button>
//                 ))}
                
//                 {/* Next Page */}
//                 <button
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   style={{
//                     padding: '6px 12px',
//                     border: '1px solid #ddd',
//                     borderRadius: '4px',
//                     background: currentPage === totalPages ? '#f8f9fa' : 'white',
//                     color: currentPage === totalPages ? '#ccc' : '#333',
//                     cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
//                     fontSize: '14px'
//                   }}
//                 >
//                   »
//                 </button>
                
//                 {/* Last Page */}
//                 <button
//                   onClick={() => handlePageChange(totalPages)}
//                   disabled={currentPage === totalPages}
//                   style={{
//                     padding: '6px 12px',
//                     border: '1px solid #ddd',
//                     borderRadius: '4px',
//                     background: currentPage === totalPages ? '#f8f9fa' : 'white',
//                     color: currentPage === totalPages ? '#ccc' : '#333',
//                     cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
//                     fontSize: '14px'
//                   }}
//                 >
//                   »»
//                 </button>
//               </div>
              
//               {/* Current page info */}
//               <div className="page-info" style={{ fontSize: '14px', color: '#666' }}>
//                 Page {currentPage} of {totalPages}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Image Preview Modal */}
//         {imageDialogOpen && (
//           <div className="modal-backdrop show" onClick={handleCloseDialog}>
//             <div className="modal d-block" tabIndex="-1" onClick={(e) => e.stopPropagation()}>
//               <div className="modal-dialog modal-dialog-centered modal-lg">
//                 <div className="modal-content">
//                   <div className="modal-header">
//                     <h5 className="modal-title">Site Photo</h5>
//                     <button
//                       type="button"
//                       className="btn-close"
//                       onClick={handleCloseDialog}
//                     ></button>
//                   </div>
//                   <div className="modal-body text-center p-0">
//                     {selectedImage && (
//                       <img
//                         src={selectedImage}
//                         alt="Site Large"
//                         className="img-fluid"
//                         style={{ maxHeight: '70vh', objectFit: 'contain' }}
//                       />
//                     )}
//                   </div>
//                   <div className="modal-footer">
//                     <button
//                       type="button"
//                       className="btn btn-secondary"
//                       onClick={handleCloseDialog}
//                     >
//                       Close
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SiteVisits;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import { baseurl } from '../../BaseURL/BaseURL';
import Swal from "sweetalert2";
import "./SiteVisits.css";

const SiteVisits = () => {
  const [siteVisits, setSiteVisits] = useState([]);
  const [filteredVisits, setFilteredVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userDetailsMap, setUserDetailsMap] = useState({}); // Store user details by user_id
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  
  const navigate = useNavigate();

  // Helper function to get full name from user data
  const getUserFullName = (userDetails) => {
    if (!userDetails) return "-";
    
    // Priority 1: Use full_name if available
    if (userDetails.full_name && userDetails.full_name.trim()) {
      return userDetails.full_name;
    }
    
    // Priority 2: Combine first_name and last_name
    if (userDetails.first_name || userDetails.last_name) {
      const firstName = userDetails.first_name || "";
      const lastName = userDetails.last_name || "";
      const fullName = `${firstName} ${lastName}`.trim();
      return fullName || "-";
    }
    
    return "-";
  };

  // Fetch user details by user_id
  const fetchUserDetails = async (userId) => {
    if (!userId || userDetailsMap[userId]) return;
    
    try {
      const res = await axios.get(`${baseurl}/users/${userId}/`);
      setUserDetailsMap(prev => ({
        ...prev,
        [userId]: res.data
      }));
    } catch (error) {
      console.error(`Error fetching user details for ID ${userId}:`, error);
    }
  };

  // Fetch site visits
  const fetchData = async () => {
    setLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams({
        page: currentPage,
        page_size: itemsPerPage,
      });
      
      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }
      
      const res = await axios.get(`${baseurl}/site-visits/?${params.toString()}`);
      
      // Handle different response formats
      let data = [];
      let count = 0;
      
      if (Array.isArray(res.data)) {
        data = res.data;
        count = res.data.length;
      } else if (res.data.results) {
        data = res.data.results || [];
        count = res.data.count || data.length;
      } else {
        data = res.data;
        count = res.data.length || 0;
      }
      
      const sorted = data.sort((a, b) => b.id - a.id);
      setSiteVisits(sorted);
      setFilteredVisits(sorted);
      setTotalItems(count);
      
      // Fetch user details for each site visit
      for (const visit of sorted) {
        if (visit.user_id) {
          await fetchUserDetails(visit.user_id);
        }
      }
    } catch (error) {
      console.error("Error fetching site visits:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load site visits',
        confirmButtonColor: '#273c75'
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, searchQuery]);

  /* ================= PAGINATION FUNCTIONS ================= */
  // Calculate pagination values
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  // Image preview
  const handleImageClick = (imgUrl) => {
    if (!imgUrl) return;
    
    const fullUrl = imgUrl.startsWith("http") 
      ? imgUrl 
      : imgUrl.startsWith("/media/")
      ? `${baseurl}${imgUrl}`
      : `${baseurl}/media/${imgUrl}`;
    
    setSelectedImage(fullUrl);
    setImageDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setImageDialogOpen(false);
    setSelectedImage(null);
  };

  // Edit handler
  const handleEdit = (id) => {
    navigate(`/admin-admiteditsite/${id}`);
  };

  // Delete handler
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${baseurl}/site-visits/${id}/`)
          .then(() => {
            Swal.fire('Deleted!', 'Site visit deleted successfully.', 'success');
            fetchData(); // Refetch data after deletion
          })
          .catch(() => Swal.fire('Error', 'Delete failed', 'error'));
      }
    });
  };

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <>
      <AdminNavbar />

      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <h2>Site Visits</h2>
        </div>

        {/* Toolbar */}
        <div className="page-toolbar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search site visits..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Table */}
        <div className="table-card">
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>DATE</th>
                  <th>TIME</th>
                    <th> FULL NAME</th>
                  <th>REFERRAL ID</th>
                  <th>PHONE NUMBER</th>
                  <th>SITE NAME</th>
                  <th>SITE OWNER</th>
                  <th>OWNER MOBILE</th>
                  <th>LOCATION</th>
                  <th>CUSTOMER NAME</th>
                  <th>SALES EXECUTIVE NAME</th>
                  <th>CUSTOMER MOBILE</th>
                  <th>REMARKS</th>
                  <th>PHOTO</th>
                
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="16" className="no-data">
                      Loading...
                    </td>
                  </tr>
                ) : filteredVisits.length ? (
                  filteredVisits.map((visit, index) => {
                    const userDetails = userDetailsMap[visit.user_id];
                    const userFullName = getUserFullName(userDetails);
                    
                    return (
                      <tr key={visit.id}>
                        <td>{startIndex + index}</td>
                        <td>{visit.date || "-"}</td>
                        <td>{visit.time || "-"}</td>
                         <td>{userFullName}</td>
                        <td>{userDetails?.referral_id || "-"}</td>
                        <td>{userDetails?.phone_number || "-"}</td>
                        <td>{visit.site_name || "-"}</td>
                        <td>{visit.site_owner_name || "-"}</td>
                        <td>{visit.site_owner_mobile_number || "-"}</td>
                        <td>{visit.site_location || "-"}</td>
                        <td>{visit.customer_name || "-"}</td>
                        <td>{visit.sales_executive_name || "-"}</td>
                        <td>{visit.customer_mobile_number || "-"}</td>
                        <td className="remarks-cell">{visit.remarks || "-"}</td>
                        <td>
                          {visit.site_photo ? (
                            <img
                              src={
                                visit.site_photo.startsWith("http")
                                  ? visit.site_photo
                                  : visit.site_photo.startsWith("/media/")
                                  ? `${baseurl}${visit.site_photo}`
                                  : `${baseurl}/media/${visit.site_photo}`
                              }
                              alt="Site"
                              className="site-photo-thumbnail"
                              onClick={() => handleImageClick(visit.site_photo)}
                              style={{ cursor: 'pointer' }}
                            />
                          ) : (
                            <span className="text-muted">No Image</span>
                          )}
                        </td>
                       
                        <td className="actions">
                          <button 
                            className="edit-btn"
                            onClick={() => handleEdit(visit.id)}
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={() => handleDelete(visit.id)}
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="16" className="no-data">
                      No site visits found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Controls */}
          {totalItems > 0 && (
            <div className="pagination-container" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              borderTop: '1px solid #eee',
              backgroundColor: '#f8f9fa',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              {/* Items per page selector */}
              <div className="items-per-page" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#666' }}>Show:</span>
                <select 
                  value={itemsPerPage} 
                  onChange={handleItemsPerPageChange}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span style={{ fontSize: '14px', color: '#666' }}>
                  of {totalItems} items
                </span>
              </div>
              
              {/* Page navigation */}
              <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {/* First Page */}
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    background: currentPage === 1 ? '#f8f9fa' : 'white',
                    color: currentPage === 1 ? '#ccc' : '#333',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontSize: '14px'
                  }}
                >
                  ««
                </button>
                
                {/* Previous Page */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    background: currentPage === 1 ? '#f8f9fa' : 'white',
                    color: currentPage === 1 ? '#ccc' : '#333',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontSize: '14px'
                  }}
                >
                  «
                </button>
                
                {/* Page Numbers */}
                {getPageNumbers().map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      background: currentPage === page ? '#273c75' : 'white',
                      color: currentPage === page ? 'white' : '#333',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: currentPage === page ? 'bold' : 'normal'
                    }}
                  >
                    {page}
                  </button>
                ))}
                
                {/* Next Page */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    background: currentPage === totalPages ? '#f8f9fa' : 'white',
                    color: currentPage === totalPages ? '#ccc' : '#333',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontSize: '14px'
                  }}
                >
                  »
                </button>
                
                {/* Last Page */}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    background: currentPage === totalPages ? '#f8f9fa' : 'white',
                    color: currentPage === totalPages ? '#ccc' : '#333',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontSize: '14px'
                  }}
                >
                  »»
                </button>
              </div>
              
              {/* Current page info */}
              <div className="page-info" style={{ fontSize: '14px', color: '#666' }}>
                Page {currentPage} of {totalPages}
              </div>
            </div>
          )}
        </div>

        {/* Image Preview Modal */}
        {imageDialogOpen && (
          <div className="modal-backdrop show" onClick={handleCloseDialog}>
            <div className="modal d-block" tabIndex="-1" onClick={(e) => e.stopPropagation()}>
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Site Photo</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={handleCloseDialog}
                    ></button>
                  </div>
                  <div className="modal-body text-center p-0">
                    {selectedImage && (
                      <img
                        src={selectedImage}
                        alt="Site Large"
                        className="img-fluid"
                        style={{ maxHeight: '70vh', objectFit: 'contain' }}
                      />
                    )}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseDialog}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SiteVisits;