
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";

// const ReferralReport = () => {
//   const navigate = useNavigate();
//   const [referrals, setReferrals] = useState([]);
//   const [filteredReferrals, setFilteredReferrals] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [processingPayments, setProcessingPayments] = useState({});
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [totalItems, setTotalItems] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);

//   // Fetch UPI ID for a specific user
//   const fetchUserUPI = async (userId) => {
//     try {
//       const url = `${baseurl}/users/${userId}/`;
//       const response = await axios.get(url);
//       return response.data.upi_id || null;
//     } catch (error) {
//       console.error(`Error fetching UPI for user ${userId}:`, error);
//       return null;
//     }
//   };

//   // Fetch all UPI IDs for users in the referral list
//   const fetchAllUPIIds = async (referralList) => {
//     const upiPromises = referralList.map(async (referral) => {
//       const upiId = await fetchUserUPI(referral.user_id);
//       return { user_id: referral.user_id, upi_id: upiId };
//     });
    
//     const upiResults = await Promise.all(upiPromises);
//     const upiMap = {};
//     upiResults.forEach(result => {
//       upiMap[result.user_id] = result.upi_id;
//     });
    
//     return upiMap;
//   };

//   // Fetch referral data from API using baseurl
//   const fetchReferrals = async () => {
//     setLoading(true);
//     try {
//       const url = `${baseurl}/referral-report/`;
      
//       console.log("Fetching from URL:", url);
      
//       const res = await axios.get(url);
      
//       let data = [];
      
//       if (res.data && res.data.results) {
//         data = res.data.results || [];
//       } else if (Array.isArray(res.data)) {
//         data = res.data;
//       } else {
//         data = [];
//       }
      
//       console.log("API Response Data:", data);
      
//       // First transform the data without UPI IDs
//       const transformedWithoutUPI = data.map((referral, index) => ({
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
//         upi_id: null, // Will be filled later
//         status: referral.total_referrals > 0 ? "Active" : "Inactive",
//         formatted_amount: `₹${(referral.total_referral_amount_or_wallet_amount || 0).toFixed(2)}`,
//         formatted_paid: `₹${(referral.total_referral_amount_or_wallet_amount_paid || 0).toFixed(2)}`,
//         formatted_pending: `₹${((referral.total_referral_amount_or_wallet_amount || 0) - (referral.total_referral_amount_or_wallet_amount_paid || 0)).toFixed(2)}`
//       }));
      
//       // Fetch UPI IDs for all users
//       const upiMap = await fetchAllUPIIds(transformedWithoutUPI);
      
//       // Add UPI IDs to the transformed data
//       const transformed = transformedWithoutUPI.map(item => ({
//         ...item,
//         upi_id: upiMap[item.user_id] || null
//       }));
      
//       console.log("Transformed Data with UPI:", transformed);
      
//       setReferrals(transformed);
//       setFilteredReferrals(transformed);
//       setTotalItems(transformed.length);
      
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

//   // Handle payment for a user
//   const handlePayment = async (user) => {
//     // Check if UPI ID exists
//     if (!user.upi_id || user.upi_id === null || user.upi_id === "") {
//       Swal.fire({
//         icon: "error",
//         title: "Payment Failed",
//         text: `UPI ID is not set for user ${user.name}. Please ask them to update their UPI ID first.`,
//         confirmButtonColor: "#6C63FF",
//       });
//       return;
//     }

//     // Check if wallet amount is greater than 0
//     if (user.total_referral_amount <= 0) {
//       Swal.fire({
//         icon: "warning",
//         title: "No Payment Due",
//         text: `No wallet amount available for ${user.name}. The wallet amount is ₹0.00.`,
//         confirmButtonColor: "#6C63FF",
//       });
//       return;
//     }

//     // Show payment confirmation dialog with amount input (no default value)
//     const { value: formValues } = await Swal.fire({
//       title: `Pay to ${user.name}`,
//       html: `
//         <div style="text-align: left;">
//           <p><strong>User ID:</strong> ${user.user_id}</p>
//           <p><strong>Name:</strong> ${user.name}</p>
//           <p><strong>Total Wallet Amount:</strong> ₹${user.total_referral_amount.toFixed(2)}</p>
//           <p><strong>Already Paid:</strong> ₹${user.total_referral_amount_paid.toFixed(2)}</p>
//           <p><strong>Pending Amount:</strong> ₹${user.pending_amount.toFixed(2)}</p>
//           <p><strong>UPI ID:</strong> ${user.upi_id}</p>
//           <hr />
//           <label for="amount" style="display: block; margin-bottom: 8px; font-weight: bold;">Enter Amount to Pay (₹):</label>
//           <input id="amount" class="swal2-input" placeholder="Enter amount" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
//           <small style="color: #666;">Maximum amount: ₹${user.pending_amount.toFixed(2)}</small>
//         </div>
//       `,
//       focusConfirm: false,
//       showCancelButton: true,
//       confirmButtonText: "Process Payment",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#4caf50",
//       cancelButtonColor: "#d33",
//       preConfirm: () => {
//         const amount = document.getElementById("amount").value;
//         const amountNum = parseFloat(amount);
        
//         // Check if amount is empty
//         if (!amount || amount.trim() === "") {
//           Swal.showValidationMessage("Please enter an amount");
//           return false;
//         }
        
//         // Check if amount is a valid number
//         if (isNaN(amountNum)) {
//           Swal.showValidationMessage("Please enter a valid number");
//           return false;
//         }
        
//         // Check if amount is greater than 0
//         if (amountNum <= 0) {
//           Swal.showValidationMessage("Please enter an amount greater than 0");
//           return false;
//         }
        
//         // Check if amount exceeds pending amount (wallet amount)
//         if (amountNum > user.pending_amount) {
//           Swal.showValidationMessage(`Amount cannot exceed pending amount of ₹${user.pending_amount.toFixed(2)}`);
//           return false;
//         }
        
//         return { amount: amountNum };
//       }
//     });

//     if (formValues) {
//       setProcessingPayments(prev => ({ ...prev, [user.user_id]: true }));
      
//       try {
//         const payload = {
//           user_id: user.user_id,
//           amount: formValues.amount
//         };
        
//         console.log("Sending payment request:", payload);
        
//         const response = await axios.post(`${baseurl}/referral-payout/`, payload, {
//           headers: {
//             'Content-Type': 'application/json',
//           }
//         });
        
//         console.log("Payment response:", response.data);
        
//         Swal.fire({
//           icon: "success",
//           title: "Payment Successful",
//           text: `Successfully paid ₹${formValues.amount.toFixed(2)} to ${user.name}`,
//           confirmButtonColor: "#6C63FF",
//         });
        
//         await fetchReferrals();
        
//       } catch (error) {
//         console.error("Payment error:", error);
        
//         let errorMessage = "Failed to process payment. Please try again.";
        
//         if (error.response) {
//           errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
//           console.log("Error response data:", error.response.data);
//         } else if (error.request) {
//           errorMessage = "No response from server. Please check your connection.";
//         } else {
//           errorMessage = error.message;
//         }
        
//         Swal.fire({
//           icon: "error",
//           title: "Payment Failed",
//           text: errorMessage,
//           confirmButtonColor: "#6C63FF",
//         });
//       } finally {
//         setProcessingPayments(prev => ({ ...prev, [user.user_id]: false }));
//       }
//     }
//   };

//   // Handle referral ID click - navigate to team view
//   const handleReferralClick = (referral) => {
//     localStorage.setItem("referral_id", referral.referral_id);
//     localStorage.setItem("agent_name", referral.name);
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
//       "Status",
//       "UPI ID"
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
//         `"${referral.status}"`,
//         `"${referral.upi_id || 'Not Set'}"`
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

//         {/* Toolbar */}
//         <div className="staff-toolbar">
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
//                 <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>Status</th>
//                 <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'center' }}>Actions</th>
//               </tr>
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
//                     <td style={{ padding: '12px', textAlign: 'center' }}>
//                       <button
//                         onClick={() => handlePayment(referral)}
//                         disabled={processingPayments[referral.user_id] || referral.total_referral_amount <= 0}
//                         style={{
//                           backgroundColor: referral.total_referral_amount > 0 ? '#4caf50' : '#9e9e9e',
//                           color: 'white',
//                           border: 'none',
//                           padding: '6px 16px',
//                           borderRadius: '4px',
//                           cursor: referral.total_referral_amount > 0 ? 'pointer' : 'not-allowed',
//                           fontSize: '12px',
//                           fontWeight: '500',
//                           transition: 'all 0.2s',
//                           opacity: processingPayments[referral.user_id] ? 0.6 : 1
//                         }}
//                         onMouseEnter={(e) => {
//                           if (referral.total_referral_amount > 0) {
//                             e.target.style.backgroundColor = '#45a049';
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           if (referral.total_referral_amount > 0) {
//                             e.target.style.backgroundColor = '#4caf50';
//                           }
//                         }}
//                       >
//                         {processingPayments[referral.user_id] ? 'Processing...' : 'Pay'}
//                       </button>
//                       {!referral.upi_id && referral.total_referral_amount > 0 && (
//                         <div style={{
//                           fontSize: '10px',
//                           color: '#f44336',
//                           marginTop: '4px'
//                         }}>
//                           No UPI ID
//                         </div>
//                       )}
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
            
//             <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";

// const ReferralReport = () => {
//   const navigate = useNavigate();
//   const [referrals, setReferrals] = useState([]);
//   const [filteredReferrals, setFilteredReferrals] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [processingPayments, setProcessingPayments] = useState({});
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [totalItems, setTotalItems] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);

//   // Fetch UPI ID for a specific user
//   const fetchUserUPI = async (userId) => {
//     try {
//       const url = `${baseurl}/users/${userId}/`;
//       const response = await axios.get(url);
//       return response.data.upi_id || null;
//     } catch (error) {
//       console.error(`Error fetching UPI for user ${userId}:`, error);
//       return null;
//     }
//   };

//   // Fetch all UPI IDs for users in the referral list
//   const fetchAllUPIIds = async (referralList) => {
//     const upiPromises = referralList.map(async (referral) => {
//       const upiId = await fetchUserUPI(referral.user_id);
//       return { user_id: referral.user_id, upi_id: upiId };
//     });
    
//     const upiResults = await Promise.all(upiPromises);
//     const upiMap = {};
//     upiResults.forEach(result => {
//       upiMap[result.user_id] = result.upi_id;
//     });
    
//     return upiMap;
//   };

//   // Fetch referral data from API using baseurl
//   const fetchReferrals = async () => {
//     setLoading(true);
//     try {
//       const url = `${baseurl}/referral-report/`;
      
//       console.log("Fetching from URL:", url);
      
//       const res = await axios.get(url);
      
//       let data = [];
      
//       if (res.data && res.data.results) {
//         data = res.data.results || [];
//       } else if (Array.isArray(res.data)) {
//         data = res.data;
//       } else {
//         data = [];
//       }
      
//       console.log("API Response Data:", data);
      
//       // First transform the data without UPI IDs
//       const transformedWithoutUPI = data.map((referral, index) => ({
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
//         upi_id: null, // Will be filled later
//         status: referral.total_referrals > 0 ? "Active" : "Inactive",
//         formatted_amount: `₹${(referral.total_referral_amount_or_wallet_amount || 0).toFixed(2)}`,
//         formatted_paid: `₹${(referral.total_referral_amount_or_wallet_amount_paid || 0).toFixed(2)}`,
//         formatted_pending: `₹${((referral.total_referral_amount_or_wallet_amount || 0) - (referral.total_referral_amount_or_wallet_amount_paid || 0)).toFixed(2)}`
//       }));
      
//       // Fetch UPI IDs for all users
//       const upiMap = await fetchAllUPIIds(transformedWithoutUPI);
      
//       // Add UPI IDs to the transformed data
//       const transformed = transformedWithoutUPI.map(item => ({
//         ...item,
//         upi_id: upiMap[item.user_id] || null
//       }));
      
//       console.log("Transformed Data with UPI:", transformed);
      
//       setReferrals(transformed);
//       setFilteredReferrals(transformed);
//       setTotalItems(transformed.length);
      
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

//   // Handle payment for a user
//   const handlePayment = async (user) => {
//     // Check if UPI ID exists
//     if (!user.upi_id || user.upi_id === null || user.upi_id === "") {
//       Swal.fire({
//         icon: "error",
//         title: "Payment Failed",
//         text: `UPI ID is not set for user ${user.name}. Please ask them to update their UPI ID first.`,
//         confirmButtonColor: "#6C63FF",
//       });
//       return;
//     }

//     // Check if wallet amount is greater than 0
//     if (user.total_referral_amount <= 0) {
//       Swal.fire({
//         icon: "warning",
//         title: "No Payment Due",
//         text: `No wallet amount available for ${user.name}. The wallet amount is ₹0.00.`,
//         confirmButtonColor: "#6C63FF",
//       });
//       return;
//     }

//     // Calculate maximum allowed amount (total wallet amount, not pending)
//     const maxAllowedAmount = user.total_referral_amount;
    
//     // Show payment confirmation dialog with amount input
//     const { value: formValues } = await Swal.fire({
//       title: `Pay to ${user.name}`,
//       html: `
//         <div style="text-align: left;">
//           <p><strong>User ID:</strong> ${user.user_id}</p>
//           <p><strong>Name:</strong> ${user.name}</p>
//           <p><strong>Total Wallet Amount:</strong> ₹${user.total_referral_amount.toFixed(2)}</p>
//           <p><strong>Already Paid:</strong> ₹${user.total_referral_amount_paid.toFixed(2)}</p>
//           <p><strong>Pending Amount:</strong> ₹${user.pending_amount.toFixed(2)}</p>
//           <p><strong>UPI ID:</strong> ${user.upi_id}</p>
//           <hr />
//           <label for="amount" style="display: block; margin-bottom: 8px; font-weight: bold;">Enter Amount to Pay (₹):</label>
//           <input id="amount" class="swal2-input" placeholder="Enter amount" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
//           <small style="color: #666;">Maximum amount: ₹${maxAllowedAmount.toFixed(2)}</small>
//         </div>
//       `,
//       focusConfirm: false,
//       showCancelButton: true,
//       confirmButtonText: "Process Payment",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#4caf50",
//       cancelButtonColor: "#d33",
//       preConfirm: () => {
//         const amount = document.getElementById("amount").value;
//         const amountNum = parseFloat(amount);
        
//         // Check if amount is empty
//         if (!amount || amount.trim() === "") {
//           Swal.showValidationMessage("Please enter an amount");
//           return false;
//         }
        
//         // Check if amount is a valid number
//         if (isNaN(amountNum)) {
//           Swal.showValidationMessage("Please enter a valid number");
//           return false;
//         }
        
//         // Check if amount is greater than 0
//         if (amountNum <= 0) {
//           Swal.showValidationMessage("Please enter an amount greater than 0");
//           return false;
//         }
        
//         // Check if amount exceeds total wallet amount (not pending amount)
//         if (amountNum > maxAllowedAmount) {
//           Swal.showValidationMessage(`Amount cannot exceed total wallet amount of ₹${maxAllowedAmount.toFixed(2)}`);
//           return false;
//         }
        
//         return { amount: amountNum };
//       }
//     });

//     if (formValues) {
//       setProcessingPayments(prev => ({ ...prev, [user.user_id]: true }));
      
//       try {
//         const payload = {
//           user_id: user.user_id,
//           amount: formValues.amount
//         };
        
//         console.log("Sending payment request:", payload);
        
//         const response = await axios.post(`${baseurl}/referral-payout/`, payload, {
//           headers: {
//             'Content-Type': 'application/json',
//           }
//         });
        
//         console.log("Payment response:", response.data);
        
//         Swal.fire({
//           icon: "success",
//           title: "Payment Successful",
//           text: `Successfully paid ₹${formValues.amount.toFixed(2)} to ${user.name}`,
//           confirmButtonColor: "#6C63FF",
//         });
        
//         await fetchReferrals();
        
//       } catch (error) {
//         console.error("Payment error:", error);
        
//         let errorMessage = "Failed to process payment. Please try again.";
        
//         if (error.response) {
//           errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
//           console.log("Error response data:", error.response.data);
//         } else if (error.request) {
//           errorMessage = "No response from server. Please check your connection.";
//         } else {
//           errorMessage = error.message;
//         }
        
//         Swal.fire({
//           icon: "error",
//           title: "Payment Failed",
//           text: errorMessage,
//           confirmButtonColor: "#6C63FF",
//         });
//       } finally {
//         setProcessingPayments(prev => ({ ...prev, [user.user_id]: false }));
//       }
//     }
//   };

//   // Handle referral ID click - navigate to team view
//   const handleReferralClick = (referral) => {
//     localStorage.setItem("referral_id", referral.referral_id);
//     localStorage.setItem("agent_name", referral.name);
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
//       "Status",
//       "UPI ID"
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
//         `"${referral.status}"`,
//         `"${referral.upi_id || 'Not Set'}"`
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

//         {/* Toolbar */}
//         <div className="staff-toolbar">
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
//                 {/* <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'right' }}>Wallet Amount (₹)</th>
//                 <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'right' }}>Wallet Amount Paid (₹)</th> */}
//                 <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>Status</th>
//                 <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'center' }}>Actions</th>
//               </tr>
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
//                     <td style={{ padding: '12px', textAlign: 'center' }}>
//                       <button
//                         onClick={() => handlePayment(referral)}
//                         disabled={processingPayments[referral.user_id] || referral.total_referral_amount <= 0}
//                         style={{
//                           backgroundColor: referral.total_referral_amount > 0 ? '#4caf50' : '#9e9e9e',
//                           color: 'white',
//                           border: 'none',
//                           padding: '6px 16px',
//                           borderRadius: '4px',
//                           cursor: referral.total_referral_amount > 0 ? 'pointer' : 'not-allowed',
//                           fontSize: '12px',
//                           fontWeight: '500',
//                           transition: 'all 0.2s',
//                           opacity: processingPayments[referral.user_id] ? 0.6 : 1
//                         }}
//                         onMouseEnter={(e) => {
//                           if (referral.total_referral_amount > 0) {
//                             e.target.style.backgroundColor = '#45a049';
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           if (referral.total_referral_amount > 0) {
//                             e.target.style.backgroundColor = '#4caf50';
//                           }
//                         }}
//                       >
//                         {processingPayments[referral.user_id] ? 'Processing...' : 'Pay'}
//                       </button>
//                       {!referral.upi_id && referral.total_referral_amount > 0 && (
//                         <div style={{
//                           fontSize: '10px',
//                           color: '#f44336',
//                           marginTop: '4px'
//                         }}>
//                           No UPI ID
//                         </div>
//                       )}
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
            
//             <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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


//============================================================



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";

// const ReferralReport = () => {
//   const navigate = useNavigate();
//   const [referrals, setReferrals] = useState([]);
//   const [filteredReferrals, setFilteredReferrals] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [processingDistributions, setProcessingDistributions] = useState({});
//   const [distributedStatus, setDistributedStatus] = useState({}); // Track distributed commissions
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [totalItems, setTotalItems] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);

//   // Fetch UPI ID for a specific user
//   const fetchUserUPI = async (userId) => {
//     try {
//       const url = `${baseurl}/users/${userId}/`;
//       const response = await axios.get(url);
//       return response.data.upi_id || null;
//     } catch (error) {
//       console.error(`Error fetching UPI for user ${userId}:`, error);
//       return null;
//     }
//   };

//   // Fetch all UPI IDs for users in the referral list
//   const fetchAllUPIIds = async (referralList) => {
//     const upiPromises = referralList.map(async (referral) => {
//       const upiId = await fetchUserUPI(referral.user_id);
//       return { user_id: referral.user_id, upi_id: upiId };
//     });
    
//     const upiResults = await Promise.all(upiPromises);
//     const upiMap = {};
//     upiResults.forEach(result => {
//       upiMap[result.user_id] = result.upi_id;
//     });
    
//     return upiMap;
//   };

//   // Fetch referral data from API using baseurl
//   const fetchReferrals = async () => {
//     setLoading(true);
//     try {
//       const url = `${baseurl}/referral-report/`;
      
//       console.log("Fetching from URL:", url);
      
//       const res = await axios.get(url);
      
//       let data = [];
      
//       if (res.data && res.data.results) {
//         data = res.data.results || [];
//       } else if (Array.isArray(res.data)) {
//         data = res.data;
//       } else {
//         data = [];
//       }
      
//       console.log("API Response Data:", data);
      
//       // First transform the data without UPI IDs
//       const transformedWithoutUPI = data.map((referral, index) => ({
//         id: index + 1,
//         user_id: referral.user_id,
//         first_name: referral.first_name || "",
//         last_name: referral.last_name || "",
//         name: `${referral.first_name || ''} ${referral.last_name || ''}`.trim(),
//         referral_id: referral.referral_id || "N/A",
//         total_referrals: referral.total_referrals || 0,
//         status: referral.total_referrals > 0 ? "Active" : "Inactive",
//         upi_id: null, // Will be filled later
//       }));
      
//       // Fetch UPI IDs for all users
//       const upiMap = await fetchAllUPIIds(transformedWithoutUPI);
      
//       // Add UPI IDs to the transformed data
//       const transformed = transformedWithoutUPI.map(item => ({
//         ...item,
//         upi_id: upiMap[item.user_id] || null
//       }));
      
//       console.log("Transformed Data with UPI:", transformed);
      
//       setReferrals(transformed);
//       setFilteredReferrals(transformed);
//       setTotalItems(transformed.length);
      
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

//   // Check if commission is already distributed for a user
//   const checkCommissionDistributed = async (userId) => {
//     try {
//       // You can add an API endpoint to check distribution status
//       // For now, we'll check on the fly when clicking distribute
//       return distributedStatus[userId] || false;
//     } catch (error) {
//       console.error("Error checking commission status:", error);
//       return false;
//     }
//   };

//   // Handle commission distribution for a user
//   const handleDistributeCommission = async (user) => {
//     // Check if already distributed
//     if (distributedStatus[user.user_id]) {
//       Swal.fire({
//         icon: "warning",
//         title: "Already Distributed",
//         text: `Commission has already been distributed for user ${user.name}.`,
//         confirmButtonColor: "#6C63FF",
//       });
//       return;
//     }

//     // Show confirmation dialog
//     const result = await Swal.fire({
//       title: `Distribute Commission?`,
//       html: `
//         <div style="text-align: left;">
//           <p><strong>User ID:</strong> ${user.user_id}</p>
//           <p><strong>Name:</strong> ${user.name}</p>
//           <p><strong>Referral ID:</strong> ${user.referral_id}</p>
//           <p><strong>Total Referrals:</strong> ${user.total_referrals}</p>
//           <hr />
//           <p style="color: #4caf50;">This will distribute referral commission to all upline users based on the configured percentage levels.</p>
//         </div>
//       `,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Distribute",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#4caf50",
//       cancelButtonColor: "#d33"
//     });

//     if (result.isConfirmed) {
//       setProcessingDistributions(prev => ({ ...prev, [user.user_id]: true }));
      
//       try {
//         const payload = {
//           user_id: user.user_id
//         };
        
//         console.log("Sending distribute commission request:", payload);
        
//         const response = await axios.post(`${baseurl}/referral-distribute-commission/`, payload, {
//           headers: {
//             'Content-Type': 'application/json',
//           }
//         });
        
//         console.log("Distribute commission response:", response.data);
        
//         // Check if the response indicates already distributed
//         if (response.data.message === "Referral commission already distributed") {
//           setDistributedStatus(prev => ({ ...prev, [user.user_id]: true }));
//           Swal.fire({
//             icon: "info",
//             title: "Already Distributed",
//             text: `Commission has already been distributed for user ${user.name}.`,
//             confirmButtonColor: "#6C63FF",
//           });
//         } else {
//           // Mark as distributed
//           setDistributedStatus(prev => ({ ...prev, [user.user_id]: true }));
          
//           // Show success message with distribution details
//           let successMessage = `Commission distributed successfully for ${user.name}.`;
//           if (response.data.data && response.data.data.length > 0) {
//             successMessage += `\n\nDistribution Details:\n`;
//             response.data.data.forEach(item => {
//               successMessage += `\nLevel ${item.level}: ₹${item.amount} to User ID ${item.user_id}`;
//             });
//           }
          
//           Swal.fire({
//             icon: "success",
//             title: "Commission Distributed",
//             text: successMessage,
//             confirmButtonColor: "#6C63FF",
//           });
//         }
        
//         // Refresh the data to update any changes
//         await fetchReferrals();
        
//       } catch (error) {
//         console.error("Distribute commission error:", error);
        
//         let errorMessage = "Failed to distribute commission. Please try again.";
        
//         if (error.response) {
//           // Handle specific error messages from API
//           const apiError = error.response.data?.error || error.response.data?.message;
//           if (apiError) {
//             errorMessage = apiError;
//           } else {
//             errorMessage = error.response.data?.message || errorMessage;
//           }
//           console.log("Error response data:", error.response.data);
//         } else if (error.request) {
//           errorMessage = "No response from server. Please check your connection.";
//         } else {
//           errorMessage = error.message;
//         }
        
//         // Check if it's the "already distributed" error
//         if (errorMessage.includes("already distributed")) {
//           setDistributedStatus(prev => ({ ...prev, [user.user_id]: true }));
//           Swal.fire({
//             icon: "info",
//             title: "Already Distributed",
//             text: errorMessage,
//             confirmButtonColor: "#6C63FF",
//           });
//         } else {
//           Swal.fire({
//             icon: "error",
//             title: "Distribution Failed",
//             text: errorMessage,
//             confirmButtonColor: "#6C63FF",
//           });
//         }
//       } finally {
//         setProcessingDistributions(prev => ({ ...prev, [user.user_id]: false }));
//       }
//     }
//   };

//   // Handle referral ID click - navigate to team view
//   const handleReferralClick = (referral) => {
//     localStorage.setItem("referral_id", referral.referral_id);
//     localStorage.setItem("agent_name", referral.name);
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
//       "Status",
//       "UPI ID",
//       "Commission Distributed"
//     ];

//     const csvContent = [
//       headers.join(","),
//       ...filteredReferrals.map((referral, index) => [
//         (currentPage - 1) * itemsPerPage + index + 1,
//         referral.user_id,
//         `"${referral.name}"`,
//         `"${referral.referral_id}"`,
//         referral.total_referrals,
//         `"${referral.status}"`,
//         `"${referral.upi_id || 'Not Set'}"`,
//         distributedStatus[referral.user_id] ? "Yes" : "No"
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

//   return (
//     <>
//       <WebsiteNavbar />

//       <div className="staff-page">
//         {/* Header */}
//         <div className="staff-header">
//           <h2>Referral Report</h2>
//           <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
//             Total Users with Referrals: {referrals.length} | Total Referrals: {totalReferralsCount}
//           </div>
//         </div>

//         {/* Toolbar */}
//         <div className="staff-toolbar">
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
//                 <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>Status</th>
//                 <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'center' }}>Actions</th>
//                </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="7" style={{ padding: '40px', textAlign: 'center' }}>
//                     <div style={{ fontSize: '16px', color: '#666' }}>
//                       Loading referral data...
//                     </div>
//                    </td>
//                  </tr>
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
//                     <td style={{ padding: '12px', textAlign: 'center' }}>
//                       <button
//                         onClick={() => handleDistributeCommission(referral)}
//                         disabled={processingDistributions[referral.user_id] || distributedStatus[referral.user_id] || referral.total_referrals === 0}
//                         style={{
//                           backgroundColor: distributedStatus[referral.user_id] 
//                             ? '#9e9e9e' 
//                             : (referral.total_referrals > 0 ? '#4caf50' : '#9e9e9e'),
//                           color: 'white',
//                           border: 'none',
//                           padding: '6px 16px',
//                           borderRadius: '4px',
//                           cursor: (distributedStatus[referral.user_id] || referral.total_referrals === 0) ? 'not-allowed' : 'pointer',
//                           fontSize: '12px',
//                           fontWeight: '500',
//                           transition: 'all 0.2s',
//                           opacity: processingDistributions[referral.user_id] ? 0.6 : 1
//                         }}
//                         onMouseEnter={(e) => {
//                           if (!distributedStatus[referral.user_id] && referral.total_referrals > 0) {
//                             e.target.style.backgroundColor = '#45a049';
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           if (!distributedStatus[referral.user_id] && referral.total_referrals > 0) {
//                             e.target.style.backgroundColor = '#4caf50';
//                           }
//                         }}
//                       >
//                         {processingDistributions[referral.user_id] 
//                           ? 'Processing...' 
//                           : (distributedStatus[referral.user_id] ? 'Distributed' : 'Distribute Commission')}
//                       </button>
//                       {distributedStatus[referral.user_id] && (
//                         <div style={{
//                           fontSize: '10px',
//                           color: '#4caf50',
//                           marginTop: '4px'
//                         }}>
//                           Commission Distributed
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" style={{ padding: '40px', textAlign: 'center' }}>
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
            
//             <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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


//====================================


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
  const [processingDistributions, setProcessingDistributions] = useState({});
  const [distributedStatus, setDistributedStatus] = useState({});
  const [selectedPreviewData, setSelectedPreviewData] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Fixed: added = sign
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Helper function to get user's full name from API data
  const getUserFullName = (user) => {
    // First priority: full_name if exists and not null
    if (user.full_name && user.full_name.trim() !== "") {
      return user.full_name;
    }
    // Second priority: combine first_name and last_name
    if (user.first_name && user.first_name.trim() !== "") {
      const lastName = user.last_name && user.last_name.trim() !== "" ? user.last_name : "";
      return `${user.first_name} ${lastName}`.trim();
    }
    // Third priority: last_name only
    if (user.last_name && user.last_name.trim() !== "") {
      return user.last_name;
    }
    // Default fallback
    return "N/A";
  };

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
      
      // Transform data with commission preview and proper name handling
      const transformedWithoutUPI = data.map((referral, index) => {
        // Get the proper display name
        const displayName = getUserFullName(referral);
        
        return {
          id: index + 1,
          user_id: referral.user_id,
          first_name: referral.first_name || "",
          last_name: referral.last_name || "",
          full_name: referral.full_name || "",
          name: displayName, // This will be used for display
          referral_id: referral.referral_id || "N/A",
          total_referrals: referral.total_referrals || 0,
          total_referral_commission: referral.total_referral_commission || "0.00",
          referral_commission_preview: referral.referral_commission_preview || [],
          status: referral.total_referrals > 0 ? "Active" : "Inactive",
          upi_id: null,
        };
      });
      
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

  // Handle preview button click
  const handlePreviewCommission = (referral) => {
    setSelectedPreviewData({
      name: referral.name,
      referral_id: referral.referral_id,
      total_referral_commission: referral.total_referral_commission,
      commission_preview: referral.referral_commission_preview
    });
    setShowPreviewModal(true);
  };

  // Close preview modal
  const closePreviewModal = () => {
    setShowPreviewModal(false);
    setSelectedPreviewData(null);
  };

  // Handle commission distribution for a user
  const handleDistributeCommission = async (user) => {
    if (distributedStatus[user.user_id]) {
      Swal.fire({
        icon: "warning",
        title: "Already Distributed",
        text: `Commission has already been distributed for user ${user.name}.`,
        confirmButtonColor: "#6C63FF",
      });
      return;
    }

    const result = await Swal.fire({
      title: `Distribute Commission?`,
      html: `
        <div style="text-align: left;">
          <p><strong>User ID:</strong> ${user.user_id}</p>
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Referral ID:</strong> ${user.referral_id}</p>
          <p><strong>Total Referrals:</strong> ${user.total_referrals}</p>
          <p><strong>Total Commission:</strong> ₹${user.total_referral_commission}</p>
          <hr />
          <p style="color: #4caf50;">This will distribute referral commission to all upline users based on the configured percentage levels.</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Distribute",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#4caf50",
      cancelButtonColor: "#d33"
    });

    if (result.isConfirmed) {
      setProcessingDistributions(prev => ({ ...prev, [user.user_id]: true }));
      
      try {
        const payload = {
          user_id: user.user_id
        };
        
        console.log("Sending distribute commission request:", payload);
        
        const response = await axios.post(`${baseurl}/referral-distribute-commission/`, payload, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        console.log("Distribute commission response:", response.data);
        
        if (response.data.message === "Referral commission already distributed") {
          setDistributedStatus(prev => ({ ...prev, [user.user_id]: true }));
          Swal.fire({
            icon: "info",
            title: "Already Distributed",
            text: `Commission has already been distributed for user ${user.name}.`,
            confirmButtonColor: "#6C63FF",
          });
        } else {
          setDistributedStatus(prev => ({ ...prev, [user.user_id]: true }));
          
          let successMessage = `Commission distributed successfully for ${user.name}.`;
          if (response.data.data && response.data.data.length > 0) {
            successMessage += `\n\nDistribution Details:\n`;
            response.data.data.forEach(item => {
              successMessage += `\nLevel ${item.level}: ₹${item.amount} to User ID ${item.user_id}`;
            });
          }
          
          Swal.fire({
            icon: "success",
            title: "Commission Distributed",
            text: successMessage,
            confirmButtonColor: "#6C63FF",
          });
        }
        
        await fetchReferrals();
        
      } catch (error) {
        console.error("Distribute commission error:", error);
        
        let errorMessage = "Failed to distribute commission. Please try again.";
        
        if (error.response) {
          const apiError = error.response.data?.error || error.response.data?.message;
          if (apiError) {
            errorMessage = apiError;
          } else {
            errorMessage = error.response.data?.message || errorMessage;
          }
          console.log("Error response data:", error.response.data);
        } else if (error.request) {
          errorMessage = "No response from server. Please check your connection.";
        } else {
          errorMessage = error.message;
        }
        
        if (errorMessage.includes("already distributed")) {
          setDistributedStatus(prev => ({ ...prev, [user.user_id]: true }));
          Swal.fire({
            icon: "info",
            title: "Already Distributed",
            text: errorMessage,
            confirmButtonColor: "#6C63FF",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Distribution Failed",
            text: errorMessage,
            confirmButtonColor: "#6C63FF",
          });
        }
      } finally {
        setProcessingDistributions(prev => ({ ...prev, [user.user_id]: false }));
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
      referral.total_referral_commission.toString().includes(query) ||
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
      "Total Commission (₹)",
      "Status",
      "UPI ID",
      "Commission Distributed"
    ];

    const csvContent = [
      headers.join(","),
      ...filteredReferrals.map((referral, index) => [
        (currentPage - 1) * itemsPerPage + index + 1,
        referral.user_id,
        `"${referral.name}"`,
        `"${referral.referral_id}"`,
        referral.total_referrals,
        referral.total_referral_commission,
        `"${referral.status}"`,
        `"${referral.upi_id || 'Not Set'}"`,
        distributedStatus[referral.user_id] ? "Yes" : "No"
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
  const totalCommissionSum = referrals.reduce((sum, r) => sum + parseFloat(r.total_referral_commission || 0), 0);

  // Preview Modal Component
  const PreviewModal = () => {
    if (!showPreviewModal || !selectedPreviewData) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }} onClick={closePreviewModal}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          width: '90%',
          maxWidth: '500px',
          maxHeight: '80vh',
          overflow: 'auto',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }} onClick={(e) => e.stopPropagation()}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            borderBottom: '2px solid #f0f0f0',
            paddingBottom: '12px'
          }}>
            <h3 style={{ margin: 0, color: '#273c75' }}>Commission Preview</h3>
            <button
              onClick={closePreviewModal}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ×
            </button>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <p><strong>Name:</strong> {selectedPreviewData.name}</p>
            <p><strong>Referral ID:</strong> {selectedPreviewData.referral_id}</p>
            <p><strong>Total Commission:</strong> <span style={{ color: '#4caf50', fontWeight: 'bold' }}>₹{selectedPreviewData.total_referral_commission}</span></p>
          </div>
          
          <h4 style={{ marginBottom: '12px', color: '#555' }}>Commission Breakdown:</h4>
          
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#273c75', color: 'white' }}>
                <th style={{ padding: '10px', textAlign: 'center' }}>Level</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Percentage</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {selectedPreviewData.commission_preview.map((item, index) => (
                <tr key={item.level} style={{
                  borderBottom: index < selectedPreviewData.commission_preview.length - 1 ? '1px solid #e0e0e0' : 'none'
                }}>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{item.level}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{item.percentage}%</td>
                  <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#4caf50' }}>
                    ₹{item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
                <td colSpan="2" style={{ padding: '10px', textAlign: 'right' }}>Total:</td>
                <td style={{ padding: '10px', textAlign: 'center', color: '#4caf50' }}>
                  ₹{selectedPreviewData.total_referral_commission}
                </td>
              </tr>
            </tfoot>
           </table>
          
          <div style={{
            marginTop: '20px',
            padding: '12px',
            backgroundColor: '#e3f2fd',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#1565c0'
          }}>
            <strong>ℹ️ Note:</strong> This commission will be distributed to upline users when you click "Distribute Commission".
          </div>
          
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
              onClick={closePreviewModal}
              style={{
                padding: '8px 24px',
                backgroundColor: '#273c75',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <WebsiteNavbar />
      
      <PreviewModal />

      <div className="staff-page">
        {/* Header */}
        <div className="staff-header">
          <h2>Referral Report</h2>
          <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
            Total Users: {referrals.length} | Total Referrals: {totalReferralsCount} | Total Commission: ₹{totalCommissionSum.toFixed(2)}
          </div>
        </div>

        {/* Toolbar */}
        <div className="staff-toolbar">
          <div className="toolbar-left">
            <div className="search-box" style={{ position: 'relative', flex: 1 }}>
              <input
                type="text"
                placeholder="Search by name, user ID, referral ID, commission, or status..."
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
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'center' }}>Total Commission (₹)</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'center' }}>Actions</th>
               </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ padding: '40px', textAlign: 'center' }}>
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
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        backgroundColor: '#fff3e0',
                        color: '#e65100'
                      }}>
                        ₹{referral.total_referral_commission}
                      </span>
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
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button
                          onClick={() => handlePreviewCommission(referral)}
                          style={{
                            backgroundColor: '#2196f3',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '500',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#1976d2';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#2196f3';
                          }}
                        >
                          Preview
                        </button>
                        <button
                          onClick={() => handleDistributeCommission(referral)}
                          disabled={processingDistributions[referral.user_id] || distributedStatus[referral.user_id] || referral.total_referrals === 0}
                          style={{
                            backgroundColor: distributedStatus[referral.user_id] 
                              ? '#9e9e9e' 
                              : (referral.total_referrals > 0 ? '#4caf50' : '#9e9e9e'),
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            cursor: (distributedStatus[referral.user_id] || referral.total_referrals === 0) ? 'not-allowed' : 'pointer',
                            fontSize: '12px',
                            fontWeight: '500',
                            transition: 'all 0.2s',
                            opacity: processingDistributions[referral.user_id] ? 0.6 : 1
                          }}
                          onMouseEnter={(e) => {
                            if (!distributedStatus[referral.user_id] && referral.total_referrals > 0) {
                              e.target.style.backgroundColor = '#45a049';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!distributedStatus[referral.user_id] && referral.total_referrals > 0) {
                              e.target.style.backgroundColor = '#4caf50';
                            }
                          }}
                        >
                          {processingDistributions[referral.user_id] 
                            ? 'Processing...' 
                            : (distributedStatus[referral.user_id] ? 'Distributed' : 'Distribute')}
                        </button>
                      </div>
                      {distributedStatus[referral.user_id] && (
                        <div style={{
                          fontSize: '10px',
                          color: '#4caf50',
                          marginTop: '4px'
                        }}>
                          ✓ Commission Distributed
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ padding: '40px', textAlign: 'center' }}>
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