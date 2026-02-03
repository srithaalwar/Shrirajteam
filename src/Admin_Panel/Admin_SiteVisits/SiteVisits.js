// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL';
// import "./SiteVisits.css";

// const SiteVisits = () => {
//   const [siteVisits, setSiteVisits] = useState([]);
//   const [filteredVisits, setFilteredVisits] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [imageDialogOpen, setImageDialogOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const navigate = useNavigate();

//   const rowsPerPage = 5;

//   // Fetch site visits
//   const fetchData = async () => {
//     try {
//       const visitsRes = await axios.get(`${baseurl}/site-visits/`);
//       const visitsData = visitsRes.data.results || visitsRes.data;
//       setSiteVisits(visitsData);
//       setFilteredVisits(visitsData);
//     } catch (error) {
//       console.error("Error fetching site visits:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Search filter
//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     if (!query.trim()) {
//       setFilteredVisits(siteVisits);
//       setCurrentPage(1);
//       return;
//     }

//     const filtered = siteVisits.filter((visit) => {
//       return (
//         (visit.date || "").toLowerCase().includes(query) ||
//         (visit.time || "").toLowerCase().includes(query) ||
//         (visit.site_name || "").toLowerCase().includes(query) ||
//         (visit.site_owner_name || "").toLowerCase().includes(query) ||
//         (visit.site_owner_mobile_number || "").toLowerCase().includes(query) ||
//         (visit.site_owner_email || "").toLowerCase().includes(query) ||
//         (visit.site_location || "").toLowerCase().includes(query) ||
//         (visit.customer_name || "").toLowerCase().includes(query) ||
//         (visit.customer_mobile_number || "").toLowerCase().includes(query) ||
//         (visit.remarks || "").toLowerCase().includes(query)
//       );
//     });

//     setFilteredVisits(filtered);
//     setCurrentPage(1);
//   };

//   // Pagination calculations
//   const indexOfLastRecord = currentPage * rowsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;
//   const currentRecords = filteredVisits.slice(indexOfFirstRecord, indexOfLastRecord);
//   const totalPages = Math.ceil(filteredVisits.length / rowsPerPage);

//   // Image preview
//   const handleImageClick = (imgUrl) => {
//     if (!imgUrl) return;
    
//     // Check if it's already a full URL
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

//   // Edit handler - navigates to /a-admiteditsite/:id
//   const handleEdit = (id) => {
//     navigate(`/admin-admiteditsite/${id}`);
//   };

//   // Delete handler
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this site visit? This action cannot be undone."
//     );

//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`${baseurl}/site-visits/${id}/`);

//       // Remove from local state
//       const updatedVisits = siteVisits.filter((visit) => visit.id !== id);
//       setSiteVisits(updatedVisits);

//       // Update filtered list
//       const updatedFiltered = updatedVisits.filter((visit) =>
//         Object.values(visit)
//           .join(" ")
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase())
//       );
//       setFilteredVisits(updatedFiltered);

//       alert("✅ Site visit deleted successfully!");
//     } catch (error) {
//       console.error("Delete failed:", error);
//       alert("❌ Failed to delete site visit. Please try again.");
//     }
//   };

//   // Pagination controls
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
//   const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

//   return (
//     <>
//       <AdminNavbar />
//       <div className="container site-visits-container">
//         <div className="row mb-4">
//           <div className="col-12 text-center">
//             <h1 className="page-title">All Site Visits</h1>
//           </div>
//         </div>

//         {/* Search Bar */}
//         <div className="row mb-4">
//           <div className="col-md-6">
//             <div className="input-group">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search Site Visits..."
//                 value={searchQuery}
//                 onChange={handleSearch}
//               />
//               <span className="input-group-text">
//                 <i className="fas fa-search"></i>
//               </span>
//             </div>
//           </div>
//           <div className="col-md-6 text-md-end mt-2 mt-md-0">
//             <div className="d-flex justify-content-between align-items-center">
//               <div className="records-count">
//                 Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, filteredVisits.length)} of {filteredVisits.length} records
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="table-responsive">
//           <table className="table table-bordered table-hover">
//             <thead className="table-dark">
//               <tr>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Site Name</th>
//                 <th>Site Owner Name</th>
//                 <th>Owner Mobile</th>
//                 <th>Owner Email</th>
//                 <th>Location</th>
//                 <th>Customer Name</th>
//                 <th>Customer Mobile</th>
//                 <th>Remarks</th>
//                 <th>Photo</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="12" className="text-center py-5">
//                     <div className="spinner-border text-primary" role="status">
//                       <span className="visually-hidden">Loading...</span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : currentRecords.length > 0 ? (
//                 currentRecords.map((visit) => (
//                   <tr key={visit.id}>
//                     <td>{visit.date || "-"}</td>
//                     <td>{visit.time || "-"}</td>
//                     <td>{visit.site_name || "-"}</td>
//                     <td>{visit.site_owner_name || "-"}</td>
//                     <td>{visit.site_owner_mobile_number || "-"}</td>
//                     <td>{visit.site_owner_email || "-"}</td>
//                     <td>{visit.site_location || "-"}</td>
//                     <td>{visit.customer_name || "-"}</td>
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
//                         />
//                       ) : (
//                         <span className="text-muted">No Image</span>
//                       )}
//                     </td>
//                     <td>
//                       <div className="action-buttons">
//                         <button
//                           className="btn btn-sm btn-outline-primary me-2"
//                           onClick={() => handleEdit(visit.id)}
//                           title="Edit"
//                         >
//                           <i className="fas fa-edit"></i>
//                         </button>
//                         <button
//                           className="btn btn-sm btn-outline-danger"
//                           onClick={() => handleDelete(visit.id)}
//                           title="Delete"
//                         >
//                           <i className="fas fa-trash"></i>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="12" className="text-center py-4">
//                     <div className="no-data-message">
//                       <i className="fas fa-inbox fa-2x mb-3"></i>
//                       <p className="mb-0">No Site Visits Found</p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {filteredVisits.length > rowsPerPage && (
//           <div className="row mt-4">
//             <div className="col-12">
//               <nav aria-label="Site visits pagination">
//                 <ul className="pagination justify-content-center">
//                   <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//                     <button className="page-link" onClick={prevPage}>
//                       <i className="fas fa-chevron-left"></i>
//                     </button>
//                   </li>
                  
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
//                     <li key={pageNum} className={`page-item ${currentPage === pageNum ? "active" : ""}`}>
//                       <button className="page-link" onClick={() => paginate(pageNum)}>
//                         {pageNum}
//                       </button>
//                     </li>
//                   ))}
                  
//                   <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
//                     <button className="page-link" onClick={nextPage}>
//                       <i className="fas fa-chevron-right"></i>
//                     </button>
//                   </li>
//                 </ul>
//               </nav>
//             </div>
//           </div>
//         )}

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
//   const navigate = useNavigate();

//   // Fetch site visits
//   const fetchData = () => {
//     setLoading(true);
//     axios.get(`${baseurl}/site-visits/`)
//       .then(res => {
//         const visitsData = res.data.results || res.data;
//         const sorted = visitsData.sort((a, b) => b.id - a.id);
//         setSiteVisits(sorted);
//         setFilteredVisits(sorted);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Search filter
//   const safeToString = (v) => v ? v.toString().toLowerCase() : '';

//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setFilteredVisits([...siteVisits].sort((a, b) => b.id - a.id));
//       return;
//     }

//     const q = searchQuery.toLowerCase();
//     const filtered = siteVisits.filter((visit) => {
//       return (
//         safeToString(visit.date).includes(q) ||
//         safeToString(visit.time).includes(q) ||
//         safeToString(visit.site_name).includes(q) ||
//         safeToString(visit.site_owner_name).includes(q) ||
//         safeToString(visit.site_owner_mobile_number).includes(q) ||
//         safeToString(visit.site_owner_email).includes(q) ||
//         safeToString(visit.site_location).includes(q) ||
//         safeToString(visit.customer_name).includes(q) ||
//         safeToString(visit.customer_mobile_number).includes(q) ||
//         safeToString(visit.remarks).includes(q)
//       );
//     });

//     setFilteredVisits(filtered.sort((a, b) => b.id - a.id));
//   }, [searchQuery, siteVisits]);

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
//             fetchData();
//           })
//           .catch(() => Swal.fire('Error', 'Delete failed', 'error'));
//       }
//     });
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
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <span className="search-icon">🔍</span>
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
//                     <td>{index + 1}</td>
//                     <td>{visit.date || "-"}</td>
//                     <td>{visit.time || "-"}</td>
//                     <td>{visit.site_name || "-"}</td>
//                     <td>{visit.site_owner_name || "-"}</td>
//                     <td>{visit.site_owner_mobile_number || "-"}</td>
//                     <td>{visit.site_location || "-"}</td>
//                     <td>{visit.customer_name || "-"}</td>
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
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  
  const navigate = useNavigate();

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
            {/* <span className="search-icon">🔍</span> */}
          </div>
          
          {/* <button 
            className="primary-btn"
            style={{
              backgroundColor: '#273c75',
              borderColor: '#273c75',
              color: 'white'
            }}
            onClick={() => navigate('/admin-sitevisit-add')}
          >
            Add Site Visit
          </button> */}
        </div>

        {/* Table */}
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>DATE</th>
                <th>TIME</th>
                <th>SITE NAME</th>
                <th>SITE OWNER</th>
                <th>OWNER MOBILE</th>
                <th>LOCATION</th>
                <th>CUSTOMER NAME</th>
                <th>CUSTOMER MOBILE</th>
                <th>REMARKS</th>
                <th>PHOTO</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="12" className="no-data">
                    Loading...
                  </td>
                </tr>
              ) : filteredVisits.length ? (
                filteredVisits.map((visit, index) => (
                  <tr key={visit.id}>
                    <td>{startIndex + index}</td>
                    <td>{visit.date || "-"}</td>
                    <td>{visit.time || "-"}</td>
                    <td>{visit.site_name || "-"}</td>
                    <td>{visit.site_owner_name || "-"}</td>
                    <td>{visit.site_owner_mobile_number || "-"}</td>
                    <td>{visit.site_location || "-"}</td>
                    <td>{visit.customer_name || "-"}</td>
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
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="no-data">
                    No site visits found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {/* Pagination Controls */}
          {totalItems > 0 && (
            <div className="pagination-container" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              borderTop: '1px solid #eee',
              backgroundColor: '#f8f9fa'
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
              <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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