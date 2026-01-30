// import React, { useEffect, useState } from "react";
// import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
//  import "./Leads.css";



// const Leads = () => {
//   const [leads, setLeads] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//      fetch(`${baseurl}/leads/`)
//       .then((res) => res.json())
//       .then((data) => setLeads(data.results || []))
//       .catch((err) => console.error(err));
//   }, []);

//   const filteredLeads = leads.filter((item) => {
//     const value = `${item.first_name} ${item.last_name} ${item.email} ${item.phone_number}`.toLowerCase();
//     return value.includes(search.toLowerCase());
//   });

//   return (
//     <>
//     <WebsiteNavbar />
//     <div className="page-container">
//       {/* Header */}
//       <div className="page-header">
//         <h2>Leads</h2>
//         <span className="welcome-text">Welcome back, Admin User</span>
//       </div>

//       {/* Toolbar */}
//       <div className="page-toolbar">
//         <div className="search-box">
//           <input
//             type="text"
//             placeholder="Search by name, email, or mobile"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <span className="search-icon">🔍</span>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="table-card">
//         <table className="data-table table-responsive">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>NAME</th>
//               <th>EMAIL</th>
//               <th>MOBILE</th>
//               <th>MESSAGE</th>
//               <th>CREATED AT</th>
//               <th>ACTIONS</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredLeads.map((lead, index) => (
//               <tr key={lead.id}>
//                 <td>{index + 1}</td>
//                 <td className="name-cell">
//                   {lead.first_name} {lead.last_name}
//                 </td>
//                 <td className="muted-text">{lead.email}</td>
//                 <td>{lead.phone_number}</td>
//                 <td>{lead.message}</td>
//                 <td>{lead.created_at}</td>
//                 <td className="actions">
//                   <button className="delete-btn">🗑️</button>
//                 </td>
//               </tr>
//             ))}

//             {filteredLeads.length === 0 && (
//               <tr>
//                 <td colSpan="7" className="no-data">
//                   No leads found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//     </>
//   );
// };

// export default Leads;




// import React, { useEffect, useState } from "react";
// import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import "./Leads.css";

// const Leads = () => {
//   const [leads, setLeads] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetch(`${baseurl}/leads/`)
//       .then((res) => res.json())
//       .then((data) => setLeads(data.results || []))
//       .catch((err) => console.error(err));
//   }, []);

//   const filteredLeads = leads.filter((item) => {
//     const value = `${item.first_name} ${item.last_name} ${item.email} ${item.phone_number}`.toLowerCase();
//     return value.includes(search.toLowerCase());
//   });

//   return (
//     <>
//       <WebsiteNavbar />

//       <div className="page-container">
//         {/* Header */}
//         <div className="page-header">
//           <h2>Leads</h2>
//         </div>

//         {/* Toolbar */}
//         <div className="page-toolbar">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Search by name, email, or mobile"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <span className="search-icon">🔍</span>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="table-card">
//           <table className="data-table">
//             <thead>
//               <tr>
//                 <th>S.No.</th>
//                 <th>NAME</th>
//                 <th>EMAIL</th>
//                 <th>MOBILE</th>
//                 <th>MESSAGE</th>
//                 <th>CREATED AT</th>
//                 <th>ACTIONS</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredLeads.map((lead, index) => (
//                 <tr key={lead.id}>
//                   <td>{index + 1}</td>
//                   <td className="name-cell">
//                     {lead.first_name} {lead.last_name}
//                   </td>
//                   <td className="muted-text">{lead.email}</td>
//                   <td>{lead.phone_number}</td>
//                   <td className="message-cell">{lead.message}</td>
//                   <td>{lead.created_at}</td>
//                   <td className="actions">
//                     <button className="delete-btn">🗑️</button>
//                   </td>
//                 </tr>
//               ))}

//               {filteredLeads.length === 0 && (
//                 <tr>
//                   <td colSpan="7" className="no-data">
//                     No leads found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Leads;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import "./Leads.css";

// const Leads = () => {
//   const [leads, setLeads] = useState([]);
//   const [filteredLeads, setFilteredLeads] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const rowsPerPage = 10;

//   useEffect(() => {
//     fetchLeads();
//   }, []);

//   // Fetch leads from API
//   const fetchLeads = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseurl}/leads/`);
//       const data = res.data.results || res.data || [];
//       // Sort by newest first
//       const sortedLeads = data.sort((a, b) => b.id - a.id);
//       setLeads(sortedLeads);
//       setFilteredLeads(sortedLeads);
//     } catch (err) {
//       console.error("Error fetching leads:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to load leads data",
//         confirmButtonColor: "#6C63FF",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filter leads based on search
//   useEffect(() => {
//     if (!search.trim()) {
//       setFilteredLeads([...leads].sort((a, b) => b.id - a.id));
//       return;
//     }

//     const query = search.toLowerCase();
//     const filtered = leads.filter((item) => {
//       const searchableFields = [
//         item.id?.toString() || "",
//         item.first_name?.toLowerCase() || "",
//         item.last_name?.toLowerCase() || "",
//         item.email?.toLowerCase() || "",
//         item.phone_number?.toString() || "",
//         item.message?.toLowerCase() || "",
//         item.created_at?.toLowerCase() || ""
//       ];
      
//       const searchableText = searchableFields.join(" ");
//       return searchableText.includes(query);
//     });

//     setFilteredLeads(filtered.sort((a, b) => b.id - a.id));
//     setPage(1); // Reset to first page on search
//   }, [search, leads]);

//   // Pagination
//   const startIndex = (page - 1) * rowsPerPage;
//   const paginatedData = filteredLeads.slice(startIndex, startIndex + rowsPerPage);
//   const pageCount = Math.ceil(filteredLeads.length / rowsPerPage);

//   const getSerialNumber = (index) => startIndex + index + 1;

//   // Delete lead function
//   const handleDelete = async (leadId, leadName) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: `You are about to delete lead: ${leadName}`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//       reverseButtons: true,
//     });

//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`${baseurl}/leads/${leadId}/`);
        
//         // Remove lead from state
//         setLeads(prev => prev.filter(lead => lead.id !== leadId));
//         setFilteredLeads(prev => prev.filter(lead => lead.id !== leadId));
        
//         Swal.fire({
//           title: "Deleted!",
//           text: "Lead deleted successfully.",
//           icon: "success",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       } catch (err) {
//         console.error("Error deleting lead:", err);
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: err.response?.data?.detail || "Failed to delete lead",
//           confirmButtonColor: "#6C63FF",
//         });
//       }
//     }
//   };

//   // Format date for better display
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     try {
//       // If date is in format "YYYY-MM-DD HH:MM:SS"
//       if (dateString.includes(" ")) {
//         const [datePart, timePart] = dateString.split(" ");
//         const [year, month, day] = datePart.split("-");
//         return `${day}/${month}/${year} ${timePart}`;
//       }
//       // If date is in format "YYYY-MM-DD"
//       const [year, month, day] = dateString.split("-");
//       return `${day}/${month}/${year}`;
//     } catch (error) {
//       console.error("Error formatting date:", error);
//       return dateString;
//     }
//   };

//   return (
//     <>
//       <WebsiteNavbar />

//       <div className="page-container">
//         {/* Header */}
//         <div className="page-header">
//           <h2>Leads</h2>
//           <div className="total-count">
//             Total Leads: {filteredLeads.length}
//           </div>
//         </div>

//         {/* Toolbar */}
//         <div className="page-toolbar">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Search by name, email, mobile, or message"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <span className="search-icon">🔍</span>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="table-card">
//           <table className="data-table">
//             <thead>
//               <tr>
//                 <th>S.No.</th>
//                 <th>ID</th>
//                 <th>NAME</th>
//                 <th>EMAIL</th>
//                 <th>MOBILE</th>
//                 <th>MESSAGE</th>
//                 <th>CREATED AT</th>
//                 <th>ACTIONS</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="8" className="no-data">
//                     Loading leads...
//                   </td>
//                 </tr>
//               ) : paginatedData.length > 0 ? (
//                 paginatedData.map((lead, index) => (
//                   <tr key={lead.id}>
//                     <td>{getSerialNumber(index)}</td>
//                     <td>{lead.id}</td>
//                     <td className="name-cell">
//                       {lead.first_name} {lead.last_name}
//                     </td>
//                     <td className="muted-text">{lead.email}</td>
//                     <td>{lead.phone_number}</td>
//                     <td className="message-cell" title={lead.message}>
//                       {lead.message || "-"}
//                     </td>
//                     <td>{formatDate(lead.created_at)}</td>
//                     <td className="actions">
//                       <button 
//                         className="delete-btn"
//                         onClick={() => handleDelete(lead.id, `${lead.first_name} ${lead.last_name}`)}
//                         title="Delete Lead"
//                       >
//                         🗑️
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="no-data">
//                     No leads found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {pageCount > 1 && (
//           <div className="pagination-container">
//             <button
//               className="pagination-btn"
//               disabled={page === 1}
//               onClick={() => setPage(page - 1)}
//             >
//               ← Previous
//             </button>
            
//             <div className="page-numbers">
//               {[...Array(pageCount)].map((_, i) => {
//                 const pageNum = i + 1;
//                 if (pageNum === page || pageNum === page - 1 || pageNum === page + 1) {
//                   return (
//                     <button
//                       key={pageNum}
//                       className={`page-btn ${page === pageNum ? 'active' : ''}`}
//                       onClick={() => setPage(pageNum)}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 }
//                 return null;
//               })}
//             </div>
            
//             <button
//               className="pagination-btn"
//               disabled={page === pageCount}
//               onClick={() => setPage(page + 1)}
//             >
//               Next →
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Leads;




import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import "./Leads.css";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchLeads();
  }, [currentPage, itemsPerPage, search]);

  // Fetch leads from API with pagination
  const fetchLeads = async () => {
    setLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams({
        page: currentPage,
        page_size: itemsPerPage,
      });
      
      if (search.trim()) {
        params.append('search', search.trim());
      }
      
      const res = await axios.get(`${baseurl}/leads/?${params.toString()}`);
      
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
      
      // Sort by newest first
      const sortedLeads = data.sort((a, b) => b.id - a.id);
      setLeads(sortedLeads);
      setFilteredLeads(sortedLeads);
      setTotalItems(count);
    } catch (err) {
      console.error("Error fetching leads:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load leads data",
        confirmButtonColor: "#6C63FF",
      });
      setLeads([]);
      setFilteredLeads([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

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

  /* ================= DELETE LEAD ================= */
  const handleDelete = async (leadId, leadName) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete lead: ${leadName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${baseurl}/leads/${leadId}/`);
        
        // Refetch data after deletion
        fetchLeads();
        
        Swal.fire({
          title: "Deleted!",
          text: "Lead deleted successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error("Error deleting lead:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.detail || "Failed to delete lead",
          confirmButtonColor: "#6C63FF",
        });
      }
    }
  };

  /* ================= HANDLE SEARCH ================= */
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Format date for better display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      // If date is in format "YYYY-MM-DD HH:MM:SS"
      if (dateString.includes(" ")) {
        const [datePart, timePart] = dateString.split(" ");
        const [year, month, day] = datePart.split("-");
        return `${day}/${month}/${year} ${timePart}`;
      }
      // If date is in format "YYYY-MM-DD"
      const [year, month, day] = dateString.split("-");
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  return (
    <>
      <WebsiteNavbar />

      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <h2>Leads</h2>
          <div className="total-count">
            Total Leads: {totalItems}
          </div>
        </div>

        {/* Toolbar */}
        <div className="page-toolbar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name, email, mobile, or message"
              value={search}
              onChange={handleSearchChange}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {/* Table */}
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>MOBILE</th>
                <th>MESSAGE</th>
                <th>CREATED AT</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="no-data">
                    Loading leads...
                  </td>
                </tr>
              ) : leads.length > 0 ? (
                leads.map((lead, index) => (
                  <tr key={lead.id}>
                    <td>{startIndex + index}</td>
                    <td>{lead.id}</td>
                    <td className="name-cell">
                      {lead.first_name} {lead.last_name}
                    </td>
                    <td className="muted-text">{lead.email}</td>
                    <td>{lead.phone_number}</td>
                    <td className="message-cell" title={lead.message}>
                      {lead.message || "-"}
                    </td>
                    <td>{formatDate(lead.created_at)}</td>
                    <td className="actions">
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(lead.id, `${lead.first_name} ${lead.last_name}`)}
                        title="Delete Lead"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">
                    No leads found
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
      </div>
    </>
  );
};

export default Leads;