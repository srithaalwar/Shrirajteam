// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { baseurl } from "../../BaseURL/BaseURL";
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import "./Site_Visits.css"; // Create this CSS file

// const Sitevisit = () => {
//   const [siteVisits, setSiteVisits] = useState([]);
//   const [filteredVisits, setFilteredVisits] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [imageDialogOpen, setImageDialogOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("user_id");

//   const rowsPerPage = 5;

//   const fetchSiteVisits = async () => {
//     try {
//       const response = await axios.get(`${baseurl}/site-visits/user-id/${userId}/`);
      
//       const visits = Array.isArray(response.data)
//         ? response.data
//         : response.data.visits || response.data.results || [];

//       setSiteVisits(visits);
//       setFilteredVisits(visits);
//     } catch (error) {
//       console.error("Error fetching site visits:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSiteVisits();
//   }, []);

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

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
//     setPage(1);
//   };

//   const paginatedData = filteredVisits.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   const pageCount = Math.ceil(filteredVisits.length / rowsPerPage);

//   const handleImageClick = (imgUrl) => {
//     const fullUrl = imgUrl.startsWith("http") ? imgUrl : `${baseurl}/${imgUrl}`;
//     setSelectedImage(fullUrl);
//     setImageDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setImageDialogOpen(false);
//     setSelectedImage(null);
//   };

//   const handleEdit = (id) => {
//     navigate(`/agent-editsitevisit/${id}`);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this site visit?")) {
//       try {
//         await axios.delete(`${baseurl}/site-visits/${id}/`);
//         fetchSiteVisits();
//       } catch (error) {
//         console.error("Delete failed:", error);
//       }
//     }
//   };

//   return (
//     <>
//       <AgentNavbar />
//       <div className="container mt-5">
//         <div className="text-center mb-4">
//           <h1 className="fw-bold text-primary">Site Visits</h1>
//         </div>

//         <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
//           <div className="search-container">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search Site Visits..."
//               value={searchQuery}
//               onChange={handleSearch}
//               style={{ width: "300px" }}
//             />
//           </div>
//           <button
//             className="btn btn-primary"
//             onClick={() => navigate("/agent-addsitevisit")}
//           >
//             <i className="fas fa-plus me-2"></i>Add Site Visit
//           </button>
//         </div>

//         <div className="table-responsive">
//           <table className="table table-bordered table-striped table-hover">
//             <thead className="table-dark">
//               <tr>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Site Name</th>
//                 <th>Owner Name</th>
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
//                   <td colSpan="12" className="text-center py-4">
//                     <div className="spinner-border text-primary" role="status">
//                       <span className="visually-hidden">Loading...</span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : paginatedData.length > 0 ? (
//                 paginatedData.map((visit, index) => (
//                   <tr key={index}>
//                     <td>{visit.date}</td>
//                     <td>{visit.time}</td>
//                     <td>{visit.site_name}</td>
//                     <td>{visit.site_owner_name}</td>
//                     <td>{visit.site_owner_mobile_number}</td>
//                     <td>{visit.site_owner_email}</td>
//                     <td>{visit.site_location}</td>
//                     <td>{visit.customer_name}</td>
//                     <td>{visit.customer_mobile_number}</td>
//                     <td className="remarks-cell">{visit.remarks}</td>
//                     <td>
//                       {visit.site_photo ? (
//                         <img
//                           src={visit.site_photo.startsWith("http") ? visit.site_photo : `${baseurl}/${visit.site_photo}`}
//                           alt="Site"
//                           className="site-photo-thumbnail"
//                           onClick={() => handleImageClick(visit.site_photo)}
//                         />
//                       ) : (
//                         <span className="text-muted">No Image</span>
//                       )}
//                     </td>
//                     <td>
//                       <div className="btn-group">
//                         <button
//                           className="btn btn-sm btn-outline-primary"
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
//                     <div className="alert alert-info mb-0">
//                       No Site Visits Found
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {pageCount > 1 && (
//           <nav aria-label="Page navigation">
//             <ul className="pagination justify-content-center">
//               <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
//                 <button
//                   className="page-link"
//                   onClick={() => setPage(page - 1)}
//                   disabled={page === 1}
//                 >
//                   Previous
//                 </button>
//               </li>
              
//               {[...Array(pageCount)].map((_, index) => (
//                 <li
//                   key={index}
//                   className={`page-item ${page === index + 1 ? "active" : ""}`}
//                 >
//                   <button
//                     className="page-link"
//                     onClick={() => setPage(index + 1)}
//                   >
//                     {index + 1}
//                   </button>
//                 </li>
//               ))}
              
//               <li className={`page-item ${page === pageCount ? "disabled" : ""}`}>
//                 <button
//                   className="page-link"
//                   onClick={() => setPage(page + 1)}
//                   disabled={page === pageCount}
//                 >
//                   Next
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         )}

//         {/* Image Modal */}
//         {imageDialogOpen && (
//           <div className="modal fade show" style={{ display: "block" }} role="dialog">
//             <div className="modal-dialog modal-lg modal-dialog-centered">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Site Photo</h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     onClick={handleCloseDialog}
//                   ></button>
//                 </div>
//                 <div className="modal-body text-center">
//                   {selectedImage && (
//                     <img
//                       src={selectedImage}
//                       alt="Site Large"
//                       className="img-fluid rounded"
//                     />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Sitevisit;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../BaseURL/BaseURL";
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import Swal from "sweetalert2";
import "./Site_Visits.css";

const Sitevisit = () => {
  const [siteVisits, setSiteVisits] = useState([]);
  const [filteredVisits, setFilteredVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  const rowsPerPage = 5;

  const fetchSiteVisits = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseurl}/site-visits/user-id/${userId}/`);
      
      const visits = Array.isArray(response.data)
        ? response.data
        : response.data.visits || response.data.results || [];

      // Transform data to match table structure
      const transformedVisits = visits.map((visit, index) => ({
        id: visit.id || index,
        date: visit.date || "",
        time: visit.time || "",
        site_name: visit.site_name || "",
        site_owner_name: visit.site_owner_name || "",
        site_owner_mobile: visit.site_owner_mobile_number || "",
        site_owner_email: visit.site_owner_email || "",
        site_location: visit.site_location || "",
        customer_name: visit.customer_name || "",
        customer_mobile: visit.customer_mobile_number || "",
        remarks: visit.remarks || "",
        photo: visit.site_photo || "",
        displayDate: visit.date ? formatDateForDisplay(visit.date) : "",
        searchDate: visit.date ? formatDateForSearch(visit.date) : "",
        fullData: visit
      }));

      setSiteVisits(transformedVisits);
      setFilteredVisits(transformedVisits);
    } catch (error) {
      console.error("Error fetching site visits:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load site visits data",
        confirmButtonColor: "#6C63FF",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Format date for display (dd/mm/yyyy)
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    try {
      const datePart = dateString.split(" ")[0];
      const [day, month, year] = datePart.split("-");
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  // ✅ Format date for search (convert to dd-mm-yyyy for searching)
  const formatDateForSearch = (dateString) => {
    if (!dateString) return "";
    try {
      const datePart = dateString.split(" ")[0];
      const [day, month, year] = datePart.split("-");
      return `${day}-${month}-${year}`;
    } catch (error) {
      console.error("Error formatting date for search:", error);
      return dateString;
    }
  };

  // ✅ Normalize search query to handle different date formats
  const normalizeSearchQuery = (query) => {
    if (!query) return "";
    
    // Convert dd/mm/yyyy to dd-mm-yyyy for searching
    const datePattern1 = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const datePattern2 = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
    
    if (datePattern1.test(query)) {
      return query.replace(/\//g, '-');
    } else if (datePattern2.test(query)) {
      return query;
    }
    
    return query;
  };

  useEffect(() => {
    fetchSiteVisits();
  }, []);

  // Apply search filter
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredVisits([...siteVisits]);
      return;
    }

    const normalizedQuery = normalizeSearchQuery(searchQuery.toLowerCase());
    
    const filtered = siteVisits.filter((visit) => {
      const searchableFields = [
        visit.id?.toString() || "",
        visit.date?.toLowerCase() || "",
        visit.time?.toLowerCase() || "",
        visit.site_name?.toLowerCase() || "",
        visit.site_owner_name?.toLowerCase() || "",
        visit.site_owner_mobile?.toLowerCase() || "",
        visit.site_owner_email?.toLowerCase() || "",
        visit.site_location?.toLowerCase() || "",
        visit.customer_name?.toLowerCase() || "",
        visit.customer_mobile?.toLowerCase() || "",
        visit.remarks?.toLowerCase() || "",
        visit.displayDate?.toLowerCase() || "",
        visit.searchDate?.toLowerCase() || ""
      ];
      
      const searchableText = searchableFields.join(" ");
      return searchableText.includes(normalizedQuery);
    });

    // Sort by ID (newest first)
    const sorted = filtered.sort((a, b) => b.id - a.id);
    setFilteredVisits(sorted);
    setPage(1);
  }, [siteVisits, searchQuery]);

  const paginatedData = filteredVisits.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const pageCount = Math.ceil(filteredVisits.length / rowsPerPage);

  const getSerialNumber = (index) => (page - 1) * rowsPerPage + index + 1;

  const handleImageClick = (imgUrl) => {
    const fullUrl = imgUrl.startsWith("http") ? imgUrl : `${baseurl}/${imgUrl}`;
    setSelectedImage(fullUrl);
    setImageDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setImageDialogOpen(false);
    setSelectedImage(null);
  };

  const handleEdit = (visit) => {
    navigate(`/agent-editsitevisit/${visit.id}`, { state: { visit: visit.fullData } });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this site visit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${baseurl}/site-visits/${id}/`);
          
          // Update local state
          setSiteVisits(prev => prev.filter(visit => visit.id !== id));
          setFilteredVisits(prev => prev.filter(visit => visit.id !== id));
          
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Site visit has been deleted.",
            timer: 2000,
            showConfirmButton: false
          });
        } catch (error) {
          console.error("Delete failed:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete site visit. Please try again."
          });
        }
      }
    });
  };

  const handleAddNew = () => {
    navigate("/agent-addsitevisit");
  };

  const exportToExcel = () => {
    if (filteredVisits.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Data",
        text: "There is no data to export.",
      });
      return;
    }

    const headers = [
      "S.No",
      "Date",
      "Time",
      "Site Name",
      "Owner Name",
      "Owner Mobile",
      "Owner Email",
      "Location",
      "Customer Name",
      "Customer Mobile",
      "Remarks"
    ];

    const csvContent = [
      headers.join(","),
      ...filteredVisits.map((visit, index) =>
        [
          index + 1,
          `"${visit.date}"`,
          `"${visit.time}"`,
          `"${visit.site_name}"`,
          `"${visit.site_owner_name}"`,
          `"${visit.site_owner_mobile}"`,
          `"${visit.site_owner_email}"`,
          `"${visit.site_location}"`,
          `"${visit.customer_name}"`,
          `"${visit.customer_mobile}"`,
          `"${visit.remarks}"`
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().split("T")[0];

    link.setAttribute("href", url);
    link.setAttribute("download", `site_visits_${timestamp}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Swal.fire({
      icon: "success",
      title: "Export Successful",
      text: `Exported ${filteredVisits.length} site visits to CSV file.`,
      timer: 2000,
      showConfirmButton: false
    });
  };

  return (
    <>
      <AgentNavbar />

      <div className="staff-page">
        {/* Header */}
        <div className="staff-header">
          <h2>Site Visits</h2>
        </div>

        {/* Toolbar - Fixed layout: left=search/filter, right=buttons */}
        <div className="staff-toolbar">
          {/* Left Side: Search */}
          <div className="toolbar-left">
            {/* Search Box */}
            <div className="search-box">
              <input
                type="text"
                placeholder="Search site visits by name, mobile, location, date..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          {/* Right Side: Buttons */}
          <div className="toolbar-right">
            {/* <button 
              className="export-btn"
              onClick={exportToExcel}
            >
              Export Excel
            </button> */}
            <button 
              className="add-btn"
              style={{
    backgroundColor: '#273c75',
    borderColor: '#273c75',
    color: 'white'
  }}
              onClick={handleAddNew}
            >
              Add Site Visit
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="staff-table-wrapper">
          <table className="staff-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>DATE</th>
                <th>TIME</th>
                <th>SITE NAME</th>
                <th>OWNER NAME</th>
                <th>OWNER MOBILE</th>
                <th>OWNER EMAIL</th>
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
                  <td colSpan="13" className="no-data">
                    Loading...
                  </td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((visit, index) => (
                  <tr key={visit.id}>
                    <td>{getSerialNumber(index)}</td>
                    <td>{visit.date}</td>
                    <td>{visit.time}</td>
                    <td className="name-cell">{visit.site_name}</td>
                    <td>{visit.site_owner_name}</td>
                    <td>{visit.site_owner_mobile}</td>
                    <td className="email-cell">{visit.site_owner_email}</td>
                    <td>{visit.site_location}</td>
                    <td>{visit.customer_name}</td>
                    <td>{visit.customer_mobile}</td>
                    <td className="remarks-cell" title={visit.remarks}>
                      {visit.remarks.length > 50 ? `${visit.remarks.substring(0, 50)}...` : visit.remarks}
                    </td>
                    <td>
                      {visit.photo ? (
                        <img
                          src={visit.photo.startsWith("http") ? visit.photo : `${baseurl}/${visit.photo}`}
                          alt="Site"
                          className="site-photo-thumbnail"
                          onClick={() => handleImageClick(visit.photo)}
                        />
                      ) : (
                        <span className="no-image-text">No Image</span>
                      )}
                    </td>
                    <td className="actions">
                      <button 
                        className="edit-btn action-btn"
                        onClick={() => handleEdit(visit)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button 
                        className="delete-btn action-btn"
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
                  <td colSpan="13" className="no-data">
                    No site visits found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="pagination-container">
            <button
              className="pagination-btn"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              ← Previous
            </button>
            
            <div className="page-numbers">
              {[...Array(pageCount)].map((_, i) => {
                const pageNum = i + 1;
                if (pageNum === page || pageNum === page - 1 || pageNum === page + 1) {
                  return (
                    <button
                      key={pageNum}
                      className={`page-btn ${page === pageNum ? 'active' : ''}`}
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                }
                return null;
              })}
            </div>
            
            <button
              className="pagination-btn"
              disabled={page === pageCount}
              onClick={() => setPage(page + 1)}
            >
              Next →
            </button>
          </div>
        )}

        {/* Image Modal */}
        {imageDialogOpen && (
          <div className="image-modal-overlay" onClick={handleCloseDialog}>
            <div className="image-modal" onClick={(e) => e.stopPropagation()}>
              <div className="image-modal-header">
                <h5>Site Photo</h5>
                <button 
                  className="image-modal-close" 
                  onClick={handleCloseDialog}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="image-modal-body">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Site Large"
                    className="image-modal-img"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sitevisit;