// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// // import "./Users.css";

// // ✅ Format date for display (dd/mm/yyyy)
// const formatDateForDisplay = (dateTimeString) => {
//   if (!dateTimeString) return "";
//   try {
//     const date = new Date(dateTimeString);
//     if (isNaN(date.getTime())) return dateTimeString;
    
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   } catch (error) {
//     console.error("Error formatting date:", error);
//     return dateTimeString;
//   }
// };

// const ReferralReport = () => {
//   const navigate = useNavigate();
//   const [referrals, setReferrals] = useState([]);
//   const [filteredReferrals, setFilteredReferrals] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [totalItems, setTotalItems] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);

//   // Fetch referral data from API using baseurl
//   const fetchReferrals = async () => {
//     setLoading(true);
//     try {
//       // Using baseurl from your configuration
//       const url = `${baseurl}/referral-report/`;
      
//       console.log("Fetching from URL:", url);
      
//       const res = await axios.get(url);
      
//       // Handle API response
//       let data = [];
//       let count = 0;
      
//       if (res.data && res.data.results) {
//         data = res.data.results || [];
//         count = res.data.count || data.length;
//       } else if (Array.isArray(res.data)) {
//         data = res.data;
//         count = res.data.length;
//       } else {
//         data = [];
//         count = 0;
//       }
      
//       console.log("API Response Data:", data);
      
//       // Transform data for display
//       const transformed = data.map((referral, index) => ({
//         id: index + 1,
//         user_id: referral.user_id,
//         first_name: referral.first_name || "",
//         last_name: referral.last_name || "",
//         name: `${referral.first_name || ''} ${referral.last_name || ''}`.trim(),
//         referral_id: referral.referral_id || "N/A",
//         total_referrals: referral.total_referrals || 0,
//         total_referral_amount: referral.total_referral_amount_or_wallet_amount || 0,
//         total_referral_amount_paid: referral.total_referral_amount_or_wallet_amount_paid || 0,
//         pending_amount: (referral.total_referral_amount_or_wallet_amount || 0) - (referral.total_referral_amount_or_wallet_amount_paid || 0),
//         // Additional fields for display
//         status: referral.total_referrals > 0 ? "Active" : "Inactive",
//         formatted_amount: `₹${(referral.total_referral_amount_or_wallet_amount || 0).toFixed(2)}`,
//         formatted_paid: `₹${(referral.total_referral_amount_or_wallet_amount_paid || 0).toFixed(2)}`,
//         formatted_pending: `₹${((referral.total_referral_amount_or_wallet_amount || 0) - (referral.total_referral_amount_or_wallet_amount_paid || 0)).toFixed(2)}`
//       }));
      
//       console.log("Transformed Data:", transformed);
      
//       setReferrals(transformed);
//       setFilteredReferrals(transformed);
//       setTotalItems(transformed.length);
      
//       // Calculate total pages
//       const calculatedPages = Math.ceil(transformed.length / itemsPerPage);
//       setTotalPages(calculatedPages || 1);
      
//     } catch (err) {
//       console.error("Error fetching referral data:", err.response || err.message || err);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: `Failed to load referral data: ${err.response?.data?.message || err.message}`,
//         confirmButtonColor: "#6C63FF",
//       });
//       setReferrals([]);
//       setFilteredReferrals([]);
//       setTotalItems(0);
//       setTotalPages(1);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle referral ID click - navigate to team view
//   const handleReferralClick = (referral) => {
//     // Store the referral ID and name in localStorage for the team page
//     localStorage.setItem("referral_id", referral.referral_id);
//     localStorage.setItem("agent_name", referral.name);
    
//     // Navigate to the team page
//     navigate("/admin-my-team");
//   };

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchReferrals();
//   }, []);

//   // Filter referrals based on search query
//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setFilteredReferrals(referrals);
//       setTotalItems(referrals.length);
//       const calculatedPages = Math.ceil(referrals.length / itemsPerPage);
//       setTotalPages(calculatedPages || 1);
//       setCurrentPage(1);
//       return;
//     }

//     const query = searchQuery.toLowerCase().trim();
//     const filtered = referrals.filter(referral => 
//       referral.name.toLowerCase().includes(query) ||
//       referral.user_id.toString().includes(query) ||
//       referral.referral_id.toLowerCase().includes(query) ||
//       referral.total_referrals.toString().includes(query) ||
//       referral.status.toLowerCase().includes(query)
//     );
    
//     setFilteredReferrals(filtered);
//     setTotalItems(filtered.length);
//     const calculatedPages = Math.ceil(filtered.length / itemsPerPage);
//     setTotalPages(calculatedPages || 1);
//     setCurrentPage(1);
//   }, [searchQuery, referrals, itemsPerPage]);

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
//     setCurrentPage(1);
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

//   // Export to Excel (CSV)
//   const exportToExcel = () => {
//     if (filteredReferrals.length === 0) {
//       Swal.fire({
//         icon: "warning",
//         title: "No Data",
//         text: "There is no data to export.",
//       });
//       return;
//     }

//     const headers = [
//       "S.No",
//       "User ID",
//       "Name",
//       "Referral ID",
//       "Total Referrals",
//       "Total Amount (₹)",
//       "Amount Paid (₹)",
//       "Pending Amount (₹)",
//       "Status"
//     ];

//     const csvContent = [
//       headers.join(","),
//       ...filteredReferrals.map((referral, index) => [
//         (currentPage - 1) * itemsPerPage + index + 1,
//         referral.user_id,
//         `"${referral.name}"`,
//         `"${referral.referral_id}"`,
//         referral.total_referrals,
//         referral.total_referral_amount,
//         referral.total_referral_amount_paid,
//         referral.pending_amount,
//         `"${referral.status}"`
//       ].join(","))
//     ].join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     const url = URL.createObjectURL(blob);
//     const timestamp = new Date().toISOString().split("T")[0];

//     link.setAttribute("href", url);
//     link.setAttribute("download", `referral_report_${timestamp}.csv`);
//     link.style.visibility = "hidden";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     Swal.fire({
//       icon: "success",
//       title: "Export Successful",
//       text: `Exported ${filteredReferrals.length} referral records to CSV file.`,
//       timer: 2000,
//       showConfirmButton: false
//     });
//   };

//   // Handle search change
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Handle clear search
//   const clearSearch = () => {
//     setSearchQuery("");
//   };

//   // Calculate start index for serial numbers
//   const startIndex = (currentPage - 1) * itemsPerPage;
  
//   // Get current page items
//   const currentItems = filteredReferrals.slice(startIndex, startIndex + itemsPerPage);

//   // Calculate summary statistics
//   const totalReferralsCount = referrals.reduce((sum, r) => sum + r.total_referrals, 0);
//   const totalAmount = referrals.reduce((sum, r) => sum + r.total_referral_amount, 0);
//   const totalPaid = referrals.reduce((sum, r) => sum + r.total_referral_amount_paid, 0);
//   const totalPending = totalAmount - totalPaid;

//   return (
//     <>
//       <WebsiteNavbar />

//       <div className="staff-page">
//         {/* Header */}
//         <div className="staff-header">
//           <h2>Referral Report</h2>
//           <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
//             Total Users with Referrals: {referrals.length}
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//           gap: '16px',
//           marginBottom: '20px'
//         }}>
//           <div style={{
//             backgroundColor: '#e3f2fd',
//             padding: '16px',
//             borderRadius: '8px',
//             borderLeft: '4px solid #2196f3'
//           }}>
//             <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Total Referrals</div>
//             <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>{totalReferralsCount}</div>
//           </div>
          
//           <div style={{
//             backgroundColor: '#e8f5e9',
//             padding: '16px',
//             borderRadius: '8px',
//             borderLeft: '4px solid #4caf50'
//           }}>
//             <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Total Amount</div>
//             <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#388e3c' }}>₹{totalAmount.toFixed(2)}</div>
//           </div>
          
//           <div style={{
//             backgroundColor: '#fff3e0',
//             padding: '16px',
//             borderRadius: '8px',
//             borderLeft: '4px solid #ff9800'
//           }}>
//             <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Amount Paid</div>
//             <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f57c00' }}>₹{totalPaid.toFixed(2)}</div>
//           </div>
          
//           <div style={{
//             backgroundColor: '#ffebee',
//             padding: '16px',
//             borderRadius: '8px',
//             borderLeft: '4px solid #f44336'
//           }}>
//             <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Pending Amount</div>
//             <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#d32f2f' }}>₹{totalPending.toFixed(2)}</div>
//           </div>
//         </div>

//         {/* Toolbar */}
//         <div className="staff-toolbar">
//           {/* Left Side: Search */}
//           <div className="toolbar-left">
//             <div className="search-box" style={{ position: 'relative', flex: 1 }}>
//               <input
//                 type="text"
//                 placeholder="Search by name, user ID, referral ID, or status..."
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 style={{
//                   padding: '8px 12px 8px 40px',
//                   border: '1px solid #ddd',
//                   borderRadius: '4px',
//                   fontSize: '14px',
//                   width: '100%',
//                   minWidth: '300px'
//                 }}
//               />
//               <span style={{
//                 position: 'absolute',
//                 left: '12px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 color: '#666',
//                 fontSize: '16px'
//               }}>
//                 🔍
//               </span>
//               {searchQuery && (
//                 <button 
//                   onClick={clearSearch}
//                   style={{
//                     position: 'absolute',
//                     right: '12px',
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     background: 'transparent',
//                     border: 'none',
//                     cursor: 'pointer',
//                     color: '#666',
//                     fontSize: '16px'
//                   }}
//                   title="Clear search"
//                 >
//                   ✕
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Right Side: Export Button */}
//           <div className="toolbar-right">
//             <button 
//               className="export-btn"
//               style={{
//                 backgroundColor: '#273c75',
//                 color: 'white',
//                 padding: '8px 16px',
//                 borderRadius: '4px',
//                 fontSize: '14px',
//                 cursor: 'pointer',
//                 fontWeight: '500',
//                 border: 'none'
//               }}
//               onClick={exportToExcel}
//               disabled={filteredReferrals.length === 0}
//             >
//               Export Excel
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="staff-table-wrapper">
//           <table className="staff-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
//             <thead>
//               <tr style={{ backgroundColor: '#f8f9fa' }}>
//                 <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>S.No.</th>
//                 <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>User ID</th>
//                 <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>Name</th>
//                 <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>Referral ID</th>
//                 <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'center' }}>Total Referrals</th>
//                 <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'right' }}>Wallet Amount (₹)</th>
//                 <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'right' }}>Wallet Amount Paid (₹)</th>
//                 {/* <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'right' }}>Pending Amount (₹)</th> */}
//                 <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>Status</th>
//                </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="9" style={{ padding: '40px', textAlign: 'center' }}>
//                     <div style={{ fontSize: '16px', color: '#666' }}>
//                       Loading referral data...
//                     </div>
//                   </td>
//                 </tr>
//               ) : currentItems.length > 0 ? (
//                 currentItems.map((referral, index) => (
//                   <tr key={referral.user_id} style={{ borderBottom: '1px solid #eee' }}>
//                     <td style={{ padding: '12px' }}>{startIndex + index + 1}</td>
//                     <td style={{ padding: '12px' }}>{referral.user_id}</td>
//                     <td style={{ padding: '12px', fontWeight: '500' }}>{referral.name}</td>
//                     <td style={{ padding: '12px' }}>
//                       <span 
//                         onClick={() => handleReferralClick(referral)}
//                         style={{
//                           fontFamily: 'monospace',
//                           backgroundColor: '#f5f5f5',
//                           padding: '2px 6px',
//                           borderRadius: '4px',
//                           fontSize: '12px',
//                           cursor: 'pointer',
//                           color: '#273c75',
//                           textDecoration: 'underline',
//                           transition: 'all 0.2s'
//                         }}
//                         onMouseEnter={(e) => {
//                           e.target.style.backgroundColor = '#e3f2fd';
//                           e.target.style.transform = 'scale(1.05)';
//                         }}
//                         onMouseLeave={(e) => {
//                           e.target.style.backgroundColor = '#f5f5f5';
//                           e.target.style.transform = 'scale(1)';
//                         }}
//                       >
//                         {referral.referral_id}
//                       </span>
//                     </td>
//                     <td style={{ padding: '12px', textAlign: 'center' }}>
//                       <span style={{
//                         display: 'inline-block',
//                         padding: '4px 8px',
//                         borderRadius: '12px',
//                         fontSize: '14px',
//                         fontWeight: 'bold',
//                         backgroundColor: referral.total_referrals > 0 ? '#e8f5e9' : '#f5f5f5',
//                         color: referral.total_referrals > 0 ? '#2e7d32' : '#757575'
//                       }}>
//                         {referral.total_referrals}
//                       </span>
//                     </td>
//                     <td style={{ padding: '12px', textAlign: 'right', fontWeight: '500' }}>
//                       ₹{referral.total_referral_amount.toFixed(2)}
//                     </td>
//                     <td style={{ padding: '12px', textAlign: 'right', color: '#4caf50' }}>
//                       ₹{referral.total_referral_amount_paid.toFixed(2)}
//                     </td>
//                     {/* <td style={{ padding: '12px', textAlign: 'right', color: referral.pending_amount > 0 ? '#f44336' : '#4caf50' }}>
//                       ₹{referral.pending_amount.toFixed(2)}
//                     </td> */}
//                     <td style={{ padding: '12px' }}>
//                       <span style={{
//                         display: 'inline-block',
//                         padding: '4px 12px',
//                         borderRadius: '12px',
//                         fontSize: '12px',
//                         fontWeight: '500',
//                         backgroundColor: referral.total_referrals > 0 ? '#e8f5e9' : '#ffebee',
//                         color: referral.total_referrals > 0 ? '#2e7d32' : '#c62828'
//                       }}>
//                         {referral.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="9" style={{ padding: '40px', textAlign: 'center' }}>
//                     <div style={{ fontSize: '16px', color: '#666' }}>
//                       {searchQuery ? 
//                         "No referral records found matching your search" : 
//                         "No referral records found"}
//                     </div>
//                     {searchQuery && (
//                       <button
//                         onClick={clearSearch}
//                         style={{
//                           marginTop: '12px',
//                           padding: '8px 16px',
//                           backgroundColor: '#273c75',
//                           color: 'white',
//                           border: 'none',
//                           borderRadius: '4px',
//                           cursor: 'pointer'
//                         }}
//                       >
//                         Clear Search
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination Controls */}
//         {filteredReferrals.length > 0 && totalPages > 1 && (
//           <div className="pagination-container" style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             padding: '16px',
//             borderTop: '1px solid #eee',
//             backgroundColor: '#f8f9fa'
//           }}>
//             {/* Items per page selector */}
//             <div className="items-per-page" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//               <span style={{ fontSize: '14px', color: '#666' }}>Show:</span>
//               <select 
//                 value={itemsPerPage} 
//                 onChange={handleItemsPerPageChange}
//                 style={{
//                   padding: '6px 12px',
//                   border: '1px solid #ddd',
//                   borderRadius: '4px',
//                   fontSize: '14px'
//                 }}
//               >
//                 <option value="5">5</option>
//                 <option value="10">10</option>
//                 <option value="20">20</option>
//                 <option value="50">50</option>
//               </select>
//               <span style={{ fontSize: '14px', color: '#666' }}>
//                 Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} items
//               </span>
//             </div>
            
//             {/* Page navigation */}
//             <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//               {/* First Page */}
//               <button
//                 onClick={() => handlePageChange(1)}
//                 disabled={currentPage === 1}
//                 style={{
//                   padding: '6px 12px',
//                   border: '1px solid #ddd',
//                   borderRadius: '4px',
//                   background: currentPage === 1 ? '#f8f9fa' : 'white',
//                   color: currentPage === 1 ? '#ccc' : '#333',
//                   cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//                   fontSize: '14px'
//                 }}
//               >
//                 ««
//               </button>
              
//               {/* Previous Page */}
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 style={{
//                   padding: '6px 12px',
//                   border: '1px solid #ddd',
//                   borderRadius: '4px',
//                   background: currentPage === 1 ? '#f8f9fa' : 'white',
//                   color: currentPage === 1 ? '#ccc' : '#333',
//                   cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//                   fontSize: '14px'
//                 }}
//               >
//                 «
//               </button>
              
//               {/* Page Numbers */}
//               {getPageNumbers().map(page => (
//                 <button
//                   key={page}
//                   onClick={() => handlePageChange(page)}
//                   style={{
//                     padding: '6px 12px',
//                     border: '1px solid #ddd',
//                     borderRadius: '4px',
//                     background: currentPage === page ? '#273c75' : 'white',
//                     color: currentPage === page ? 'white' : '#333',
//                     cursor: 'pointer',
//                     fontSize: '14px',
//                     fontWeight: currentPage === page ? 'bold' : 'normal'
//                   }}
//                 >
//                   {page}
//                 </button>
//               ))}
              
//               {/* Next Page */}
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 style={{
//                   padding: '6px 12px',
//                   border: '1px solid #ddd',
//                   borderRadius: '4px',
//                   background: currentPage === totalPages ? '#f8f9fa' : 'white',
//                   color: currentPage === totalPages ? '#ccc' : '#333',
//                   cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
//                   fontSize: '14px'
//                 }}
//               >
//                 »
//               </button>
              
//               {/* Last Page */}
//               <button
//                 onClick={() => handlePageChange(totalPages)}
//                 disabled={currentPage === totalPages}
//                 style={{
//                   padding: '6px 12px',
//                   border: '1px solid #ddd',
//                   borderRadius: '4px',
//                   background: currentPage === totalPages ? '#f8f9fa' : 'white',
//                   color: currentPage === totalPages ? '#ccc' : '#333',
//                   cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
//                   fontSize: '14px'
//                 }}
//               >
//                 »»
//               </button>
//             </div>
            
//             {/* Current page info */}
//             <div className="page-info" style={{ fontSize: '14px', color: '#666' }}>
//               Page {currentPage} of {totalPages}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ReferralReport;




import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";

const ReferralReport = () => {
  const navigate = useNavigate();
  const [referrals, setReferrals] = useState([]);
  const [filteredReferrals, setFilteredReferrals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [processingPayments, setProcessingPayments] = useState({});
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch UPI ID for a specific user
  const fetchUserUPI = async (userId) => {
    try {
      const url = `${baseurl}/users/${userId}/`;
      const response = await axios.get(url);
      return response.data.upi_id || null;
    } catch (error) {
      console.error(`Error fetching UPI for user ${userId}:`, error);
      return null;
    }
  };

  // Fetch all UPI IDs for users in the referral list
  const fetchAllUPIIds = async (referralList) => {
    const upiPromises = referralList.map(async (referral) => {
      const upiId = await fetchUserUPI(referral.user_id);
      return { user_id: referral.user_id, upi_id: upiId };
    });
    
    const upiResults = await Promise.all(upiPromises);
    const upiMap = {};
    upiResults.forEach(result => {
      upiMap[result.user_id] = result.upi_id;
    });
    
    return upiMap;
  };

  // Fetch referral data from API using baseurl
  const fetchReferrals = async () => {
    setLoading(true);
    try {
      const url = `${baseurl}/referral-report/`;
      
      console.log("Fetching from URL:", url);
      
      const res = await axios.get(url);
      
      let data = [];
      
      if (res.data && res.data.results) {
        data = res.data.results || [];
      } else if (Array.isArray(res.data)) {
        data = res.data;
      } else {
        data = [];
      }
      
      console.log("API Response Data:", data);
      
      // First transform the data without UPI IDs
      const transformedWithoutUPI = data.map((referral, index) => ({
        id: index + 1,
        user_id: referral.user_id,
        first_name: referral.first_name || "",
        last_name: referral.last_name || "",
        name: `${referral.first_name || ''} ${referral.last_name || ''}`.trim(),
        referral_id: referral.referral_id || "N/A",
        total_referrals: referral.total_referrals || 0,
        total_referral_amount: referral.total_referral_amount_or_wallet_amount || 0,
        total_referral_amount_paid: referral.total_referral_amount_or_wallet_amount_paid || 0,
        pending_amount: (referral.total_referral_amount_or_wallet_amount || 0) - (referral.total_referral_amount_or_wallet_amount_paid || 0),
        upi_id: null, // Will be filled later
        status: referral.total_referrals > 0 ? "Active" : "Inactive",
        formatted_amount: `₹${(referral.total_referral_amount_or_wallet_amount || 0).toFixed(2)}`,
        formatted_paid: `₹${(referral.total_referral_amount_or_wallet_amount_paid || 0).toFixed(2)}`,
        formatted_pending: `₹${((referral.total_referral_amount_or_wallet_amount || 0) - (referral.total_referral_amount_or_wallet_amount_paid || 0)).toFixed(2)}`
      }));
      
      // Fetch UPI IDs for all users
      const upiMap = await fetchAllUPIIds(transformedWithoutUPI);
      
      // Add UPI IDs to the transformed data
      const transformed = transformedWithoutUPI.map(item => ({
        ...item,
        upi_id: upiMap[item.user_id] || null
      }));
      
      console.log("Transformed Data with UPI:", transformed);
      
      setReferrals(transformed);
      setFilteredReferrals(transformed);
      setTotalItems(transformed.length);
      
      const calculatedPages = Math.ceil(transformed.length / itemsPerPage);
      setTotalPages(calculatedPages || 1);
      
    } catch (err) {
      console.error("Error fetching referral data:", err.response || err.message || err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to load referral data: ${err.response?.data?.message || err.message}`,
        confirmButtonColor: "#6C63FF",
      });
      setReferrals([]);
      setFilteredReferrals([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Handle payment for a user
  const handlePayment = async (user) => {
    // Check if UPI ID exists
    if (!user.upi_id || user.upi_id === null || user.upi_id === "") {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: `UPI ID is not set for user ${user.name}. Please ask them to update their UPI ID first.`,
        confirmButtonColor: "#6C63FF",
      });
      return;
    }

    // Check if pending amount is greater than 0
    if (user.pending_amount <= 0) {
      Swal.fire({
        icon: "warning",
        title: "No Payment Due",
        text: `No pending amount for ${user.name}. The wallet amount is already fully paid.`,
        confirmButtonColor: "#6C63FF",
      });
      return;
    }

    // Show payment confirmation dialog with amount input
    const { value: formValues } = await Swal.fire({
      title: `Pay to ${user.name}`,
      html: `
        <div style="text-align: left;">
          <p><strong>User ID:</strong> ${user.user_id}</p>
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Total Wallet Amount:</strong> ₹${user.total_referral_amount.toFixed(2)}</p>
          <p><strong>Already Paid:</strong> ₹${user.total_referral_amount_paid.toFixed(2)}</p>
          <p><strong>Pending Amount:</strong> ₹${user.pending_amount.toFixed(2)}</p>
          <p><strong>UPI ID:</strong> ${user.upi_id}</p>
          <hr />
          <label for="amount" style="display: block; margin-bottom: 8px; font-weight: bold;">Enter Amount to Pay (₹):</label>
          <input id="amount" class="swal2-input" placeholder="Enter amount" value="${user.pending_amount}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
          <small style="color: #666;">Maximum amount: ₹${user.pending_amount.toFixed(2)}</small>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Process Payment",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#4caf50",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        const amount = document.getElementById("amount").value;
        const amountNum = parseFloat(amount);
        
        if (!amount || isNaN(amountNum) || amountNum <= 0) {
          Swal.showValidationMessage("Please enter a valid amount greater than 0");
          return false;
        }
        
        if (amountNum > user.pending_amount) {
          Swal.showValidationMessage(`Amount cannot exceed pending amount of ₹${user.pending_amount.toFixed(2)}`);
          return false;
        }
        
        return { amount: amountNum };
      }
    });

    if (formValues) {
      setProcessingPayments(prev => ({ ...prev, [user.user_id]: true }));
      
      try {
        const payload = {
          user_id: user.user_id,
          amount: formValues.amount
        };
        
        console.log("Sending payment request:", payload);
        
        const response = await axios.post(`${baseurl}/referral-payout/`, payload, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        console.log("Payment response:", response.data);
        
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: `Successfully paid ₹${formValues.amount.toFixed(2)} to ${user.name}`,
          confirmButtonColor: "#6C63FF",
        });
        
        await fetchReferrals();
        
      } catch (error) {
        console.error("Payment error:", error);
        
        let errorMessage = "Failed to process payment. Please try again.";
        
        if (error.response) {
          errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
          console.log("Error response data:", error.response.data);
        } else if (error.request) {
          errorMessage = "No response from server. Please check your connection.";
        } else {
          errorMessage = error.message;
        }
        
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: errorMessage,
          confirmButtonColor: "#6C63FF",
        });
      } finally {
        setProcessingPayments(prev => ({ ...prev, [user.user_id]: false }));
      }
    }
  };

  // Handle referral ID click - navigate to team view
  const handleReferralClick = (referral) => {
    localStorage.setItem("referral_id", referral.referral_id);
    localStorage.setItem("agent_name", referral.name);
    navigate("/admin-my-team");
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchReferrals();
  }, []);

  // Filter referrals based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredReferrals(referrals);
      setTotalItems(referrals.length);
      const calculatedPages = Math.ceil(referrals.length / itemsPerPage);
      setTotalPages(calculatedPages || 1);
      setCurrentPage(1);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered = referrals.filter(referral => 
      referral.name.toLowerCase().includes(query) ||
      referral.user_id.toString().includes(query) ||
      referral.referral_id.toLowerCase().includes(query) ||
      referral.total_referrals.toString().includes(query) ||
      referral.status.toLowerCase().includes(query)
    );
    
    setFilteredReferrals(filtered);
    setTotalItems(filtered.length);
    const calculatedPages = Math.ceil(filtered.length / itemsPerPage);
    setTotalPages(calculatedPages || 1);
    setCurrentPage(1);
  }, [searchQuery, referrals, itemsPerPage]);

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
    setCurrentPage(1);
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

  // Export to Excel (CSV)
  const exportToExcel = () => {
    if (filteredReferrals.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Data",
        text: "There is no data to export.",
      });
      return;
    }

    const headers = [
      "S.No",
      "User ID",
      "Name",
      "Referral ID",
      "Total Referrals",
      "Total Amount (₹)",
      "Amount Paid (₹)",
      "Pending Amount (₹)",
      "Status",
      "UPI ID"
    ];

    const csvContent = [
      headers.join(","),
      ...filteredReferrals.map((referral, index) => [
        (currentPage - 1) * itemsPerPage + index + 1,
        referral.user_id,
        `"${referral.name}"`,
        `"${referral.referral_id}"`,
        referral.total_referrals,
        referral.total_referral_amount,
        referral.total_referral_amount_paid,
        referral.pending_amount,
        `"${referral.status}"`,
        `"${referral.upi_id || 'Not Set'}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().split("T")[0];

    link.setAttribute("href", url);
    link.setAttribute("download", `referral_report_${timestamp}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Swal.fire({
      icon: "success",
      title: "Export Successful",
      text: `Exported ${filteredReferrals.length} referral records to CSV file.`,
      timer: 2000,
      showConfirmButton: false
    });
  };

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle clear search
  const clearSearch = () => {
    setSearchQuery("");
  };

  // Calculate start index for serial numbers
  const startIndex = (currentPage - 1) * itemsPerPage;
  
  // Get current page items
  const currentItems = filteredReferrals.slice(startIndex, startIndex + itemsPerPage);

  // Calculate summary statistics
  const totalReferralsCount = referrals.reduce((sum, r) => sum + r.total_referrals, 0);
  const totalAmount = referrals.reduce((sum, r) => sum + r.total_referral_amount, 0);
  const totalPaid = referrals.reduce((sum, r) => sum + r.total_referral_amount_paid, 0);
  const totalPending = totalAmount - totalPaid;

  return (
    <>
      <WebsiteNavbar />

      <div className="staff-page">
        {/* Header */}
        <div className="staff-header">
          <h2>Referral Report</h2>
          <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
            Total Users with Referrals: {referrals.length}
          </div>
        </div>

        {/* Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div style={{
            backgroundColor: '#e3f2fd',
            padding: '16px',
            borderRadius: '8px',
            borderLeft: '4px solid #2196f3'
          }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Total Referrals</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>{totalReferralsCount}</div>
          </div>
          
          <div style={{
            backgroundColor: '#e8f5e9',
            padding: '16px',
            borderRadius: '8px',
            borderLeft: '4px solid #4caf50'
          }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Total Amount</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#388e3c' }}>₹{totalAmount.toFixed(2)}</div>
          </div>
          
          <div style={{
            backgroundColor: '#fff3e0',
            padding: '16px',
            borderRadius: '8px',
            borderLeft: '4px solid #ff9800'
          }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Amount Paid</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f57c00' }}>₹{totalPaid.toFixed(2)}</div>
          </div>
          
          <div style={{
            backgroundColor: '#ffebee',
            padding: '16px',
            borderRadius: '8px',
            borderLeft: '4px solid #f44336'
          }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Pending Amount</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#d32f2f' }}>₹{totalPending.toFixed(2)}</div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="staff-toolbar">
          <div className="toolbar-left">
            <div className="search-box" style={{ position: 'relative', flex: 1 }}>
              <input
                type="text"
                placeholder="Search by name, user ID, referral ID, or status..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  padding: '8px 12px 8px 40px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  width: '100%',
                  minWidth: '300px'
                }}
              />
              <span style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#666',
                fontSize: '16px'
              }}>
                🔍
              </span>
              {searchQuery && (
                <button 
                  onClick={clearSearch}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#666',
                    fontSize: '16px'
                  }}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="toolbar-right">
            <button 
              className="export-btn"
              style={{
                backgroundColor: '#273c75',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: '500',
                border: 'none'
              }}
              onClick={exportToExcel}
              disabled={filteredReferrals.length === 0}
            >
              Export Excel
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="staff-table-wrapper">
          <table className="staff-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>S.No.</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>User ID</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>Referral ID</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'center' }}>Total Referrals</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'right' }}>Wallet Amount (₹)</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'right' }}>Wallet Amount Paid (₹)</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'center' }}>Actions</th>
               </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" style={{ padding: '40px', textAlign: 'center' }}>
                    <div style={{ fontSize: '16px', color: '#666' }}>
                      Loading referral data...
                    </div>
                  </td>
                </tr>
              ) : currentItems.length > 0 ? (
                currentItems.map((referral, index) => (
                  <tr key={referral.user_id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>{startIndex + index + 1}</td>
                    <td style={{ padding: '12px' }}>{referral.user_id}</td>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{referral.name}</td>
                    <td style={{ padding: '12px' }}>
                      <span 
                        onClick={() => handleReferralClick(referral)}
                        style={{
                          fontFamily: 'monospace',
                          backgroundColor: '#f5f5f5',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          color: '#273c75',
                          textDecoration: 'underline',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#e3f2fd';
                          e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#f5f5f5';
                          e.target.style.transform = 'scale(1)';
                        }}
                      >
                        {referral.referral_id}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        backgroundColor: referral.total_referrals > 0 ? '#e8f5e9' : '#f5f5f5',
                        color: referral.total_referrals > 0 ? '#2e7d32' : '#757575'
                      }}>
                        {referral.total_referrals}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: '500' }}>
                      ₹{referral.total_referral_amount.toFixed(2)}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#4caf50' }}>
                      ₹{referral.total_referral_amount_paid.toFixed(2)}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: referral.total_referrals > 0 ? '#e8f5e9' : '#ffebee',
                        color: referral.total_referrals > 0 ? '#2e7d32' : '#c62828'
                      }}>
                        {referral.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button
                        onClick={() => handlePayment(referral)}
                        disabled={processingPayments[referral.user_id] || referral.pending_amount <= 0}
                        style={{
                          backgroundColor: referral.pending_amount > 0 ? '#4caf50' : '#9e9e9e',
                          color: 'white',
                          border: 'none',
                          padding: '6px 16px',
                          borderRadius: '4px',
                          cursor: referral.pending_amount > 0 ? 'pointer' : 'not-allowed',
                          fontSize: '12px',
                          fontWeight: '500',
                          transition: 'all 0.2s',
                          opacity: processingPayments[referral.user_id] ? 0.6 : 1
                        }}
                        onMouseEnter={(e) => {
                          if (referral.pending_amount > 0) {
                            e.target.style.backgroundColor = '#45a049';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (referral.pending_amount > 0) {
                            e.target.style.backgroundColor = '#4caf50';
                          }
                        }}
                      >
                        {processingPayments[referral.user_id] ? 'Processing...' : 'Pay'}
                      </button>
                      {!referral.upi_id && referral.pending_amount > 0 && (
                        <div style={{
                          fontSize: '10px',
                          color: '#f44336',
                          marginTop: '4px'
                        }}>
                          No UPI ID
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ padding: '40px', textAlign: 'center' }}>
                    <div style={{ fontSize: '16px', color: '#666' }}>
                      {searchQuery ? 
                        "No referral records found matching your search" : 
                        "No referral records found"}
                    </div>
                    {searchQuery && (
                      <button
                        onClick={clearSearch}
                        style={{
                          marginTop: '12px',
                          padding: '8px 16px',
                          backgroundColor: '#273c75',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Clear Search
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {filteredReferrals.length > 0 && totalPages > 1 && (
          <div className="pagination-container" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
            borderTop: '1px solid #eee',
            backgroundColor: '#f8f9fa'
          }}>
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
              </select>
              <span style={{ fontSize: '14px', color: '#666' }}>
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} items
              </span>
            </div>
            
            <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
            
            <div className="page-info" style={{ fontSize: '14px', color: '#666' }}>
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ReferralReport;