// import React, { useEffect, useState } from 'react';
// // import "./AgentServiceBookings.css"; 
// import AgentNavbar from "./../Agent_Navbar/Agent_Navbar"; 
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { baseurl } from './../../BaseURL/BaseURL';
// import Swal from 'sweetalert2';

// function AgentServiceBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [totalItems, setTotalItems] = useState(0);
  
//   // Get logged-in user ID from localStorage or context
//   const [userId, setUserId] = useState(null);
  
//   const navigate = useNavigate();

//   /* ================= GET LOGGED-IN USER ID ================= */
//   useEffect(() => {
//     // Get user ID from localStorage (adjust based on your auth implementation)
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       try {
//         const userData = JSON.parse(storedUser);
//         setUserId(userData.id || userData.user_id);
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//       }
//     }
//   }, []);

//   /* ================= FETCH BOOKINGS FOR SPECIFIC USER ================= */
//   const fetchBookings = async () => {
//     if (!userId) return; // Wait until userId is available
    
//     setLoading(true);
//     try {
//       // Build query parameters with user filter
//       const params = new URLSearchParams({
//         user: userId,
//         page: currentPage,
//         page_size: itemsPerPage,
//       });
      
//       if (searchQuery.trim()) {
//         params.append('search', searchQuery.trim());
//       }
      
//       const res = await axios.get(`${baseurl}/service-bookings/?${params.toString()}`);
      
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
      
//       // Sort by booking_id in descending order (newest first)
//       const sorted = data.sort((a, b) => b.booking_id - a.booking_id);
//       setBookings(sorted);
//       setFilteredBookings(sorted);
//       setTotalItems(count);
//     } catch (error) {
//       console.error("Error fetching agent service bookings:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to load your service bookings',
//         confirmButtonColor: '#273c75'
//       });
//     }
//     setLoading(false);
//   };

//   useEffect(() => { 
//     if (userId) {
//       fetchBookings();
//     }
//   }, [currentPage, itemsPerPage, searchQuery, userId]);

//   /* ================= SEARCH ================= */
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1); // Reset to first page when searching
//   };

//   /* ================= UPDATE BOOKING STATUS ================= */
//   const handleUpdateStatus = async (bookingId, newStatus) => {
//     try {
//       const response = await axios.patch(`${baseurl}/service-bookings/${bookingId}/`, {
//         booking_status: newStatus
//       });
      
//       if (response.status === 200 || response.status === 202) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Updated!',
//           text: `Booking status updated to ${newStatus}`,
//           confirmButtonColor: '#273c75',
//           timer: 2000
//         });
//         fetchBookings(); // Refresh the list
//       }
//     } catch (error) {
//       console.error("Error updating booking status:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: 'Could not update booking status. Please try again.',
//         confirmButtonColor: '#273c75'
//       });
//     }
//   };

//   /* ================= CANCEL BOOKING ================= */
//   const handleCancelBooking = (bookingId) => {
//     Swal.fire({
//       title: 'Cancel Booking?',
//       text: "Are you sure you want to cancel this booking? This action cannot be undone.",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#273c75',
//       confirmButtonText: 'Yes, Cancel Booking',
//       cancelButtonText: 'No, Keep It'
//     }).then(result => {
//       if (result.isConfirmed) {
//         handleUpdateStatus(bookingId, 'Cancelled');
//       }
//     });
//   };

//   /* ================= CONFIRM BOOKING ================= */
//   const handleConfirmBooking = (bookingId) => {
//     Swal.fire({
//       title: 'Confirm Booking?',
//       text: "Are you sure you want to confirm this booking?",
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#28a745',
//       cancelButtonColor: '#273c75',
//       confirmButtonText: 'Yes, Confirm',
//       cancelButtonText: 'No'
//     }).then(result => {
//       if (result.isConfirmed) {
//         handleUpdateStatus(bookingId, 'Confirmed');
//       }
//     });
//   };

//   /* ================= COMPLETE BOOKING ================= */
//   const handleCompleteBooking = (bookingId) => {
//     Swal.fire({
//       title: 'Complete Booking?',
//       text: "Mark this booking as completed?",
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#28a745',
//       cancelButtonColor: '#273c75',
//       confirmButtonText: 'Yes, Complete',
//       cancelButtonText: 'No'
//     }).then(result => {
//       if (result.isConfirmed) {
//         handleUpdateStatus(bookingId, 'Completed');
//       }
//     });
//   };

//   /* ================= PAGINATION HANDLERS ================= */
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage + 1;
  
//   const handlePageChange = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   const handleItemsPerPageChange = (e) => {
//     const value = parseInt(e.target.value);
//     setItemsPerPage(value);
//     setCurrentPage(1);
//   };

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

//   /* ================= FORMATTING FUNCTIONS ================= */
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const formatCurrency = (amount) => {
//     if (!amount || amount === '0.00') return '₹0.00';
//     return `₹${parseFloat(amount).toLocaleString('en-IN')}`;
//   };

//   const getStatusBadgeStyle = (status) => {
//     const statusLower = status?.toLowerCase();
//     if (statusLower === 'pending') {
//       return { backgroundColor: '#fff3cd', color: '#856404', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//     } else if (statusLower === 'confirmed') {
//       return { backgroundColor: '#d4edda', color: '#155724', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//     } else if (statusLower === 'completed') {
//       return { backgroundColor: '#cce5ff', color: '#004085', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//     } else if (statusLower === 'cancelled') {
//       return { backgroundColor: '#f8d7da', color: '#721c24', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//     }
//     return { backgroundColor: '#e2e3e5', color: '#383d41', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//   };

//   const getPaymentBadgeStyle = (status) => {
//     const statusLower = status?.toLowerCase();
//     if (statusLower === 'pending') {
//       return { backgroundColor: '#fff3cd', color: '#856404', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//     } else if (statusLower === 'paid' || statusLower === 'completed') {
//       return { backgroundColor: '#d4edda', color: '#155724', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//     } else if (statusLower === 'failed') {
//       return { backgroundColor: '#f8d7da', color: '#721c24', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//     }
//     return { backgroundColor: '#e2e3e5', color: '#383d41', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//   };

//   // Get action buttons based on booking status
//   const getActionButtons = (booking) => {
//     const status = booking.booking_status?.toLowerCase();
    
//     if (status === 'pending') {
//       return (
//         <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
//           <button 
//             className="confirm-btn"
//             onClick={() => handleConfirmBooking(booking.booking_id)}
//             style={{
//               padding: '6px 12px',
//               backgroundColor: '#28a745',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               fontSize: '12px'
//             }}
//           >
//             Confirm
//           </button>
//           <button 
//             className="cancel-btn"
//             onClick={() => handleCancelBooking(booking.booking_id)}
//             style={{
//               padding: '6px 12px',
//               backgroundColor: '#dc3545',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               fontSize: '12px'
//             }}
//           >
//             Cancel
//           </button>
//         </div>
//       );
//     } else if (status === 'confirmed') {
//       return (
//         <div style={{ display: 'flex', gap: '8px' }}>
//           <button 
//             className="complete-btn"
//             onClick={() => handleCompleteBooking(booking.booking_id)}
//             style={{
//               padding: '6px 12px',
//               backgroundColor: '#17a2b8',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               fontSize: '12px'
//             }}
//           >
//             Mark Complete
//           </button>
//           <button 
//             className="cancel-btn"
//             onClick={() => handleCancelBooking(booking.booking_id)}
//             style={{
//               padding: '6px 12px',
//               backgroundColor: '#dc3545',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               fontSize: '12px'
//             }}
//           >
//             Cancel
//           </button>
//         </div>
//       );
//     } else if (status === 'completed') {
//       return (
//         <span style={{ color: '#28a745', fontSize: '12px', fontWeight: '500' }}>
//           ✓ Completed
//         </span>
//       );
//     } else if (status === 'cancelled') {
//       return (
//         <span style={{ color: '#dc3545', fontSize: '12px', fontWeight: '500' }}>
//           ✗ Cancelled
//         </span>
//       );
//     }
//     return null;
//   };

//   return (
//     <>
//       <AgentNavbar />

//       <div className="page-container">
//         {/* Header */}
//         <div className="page-header">
//           <h2>My Service Bookings</h2>
//           {/* <p style={{ color: '#666', marginTop: '8px' }}>
//             View and manage all your service bookings
//           </p> */}
//         </div>

//         {/* Toolbar */}
//         <div className="page-toolbar">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Search by Booking ID, Address or Notes..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//               style={{
//                 padding: '10px',
//                 width: '300px',
//                 border: '1px solid #ddd',
//                 borderRadius: '4px',
//                 fontSize: '14px'
//               }}
//             />
//           </div>
// {/*           
//           <button 
//             className="primary-btn"
//             style={{
//               backgroundColor: '#273c75',
//               borderColor: '#273c75',
//               color: 'white',
//               padding: '10px 20px',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               border: 'none'
//             }}
//             onClick={() => navigate('/agent-add-service-booking')}
//           >
//             + New Booking
//           </button> */}
//         </div>

     

//         {/* Table */}
//         <div className="table-card" style={{
//           backgroundColor: 'white',
//           borderRadius: '8px',
//           boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//           overflow: 'auto'
//         }}>
//           <table className="data-table" style={{
//             width: '100%',
//             borderCollapse: 'collapse'
//           }}>
//             <thead>
//               <tr style={{
//                 backgroundColor: '#f8f9fa',
//                 borderBottom: '2px solid #dee2e6'
//               }}>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>S.No.</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Booking ID</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Booking Date</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Service Start</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Service End</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Hours</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Total Amount</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Address</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Notes</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Booking Status</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Payment Status</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="12" style={{ textAlign: 'center', padding: '40px' }}>
//                     Loading...
//                   </td>
//                 </tr>
//               ) : filteredBookings.length ? (
//                 filteredBookings.map((booking, index) => (
//                   <tr key={booking.booking_id} style={{
//                     borderBottom: '1px solid #dee2e6'
//                   }}>
//                     <td style={{ padding: '12px' }}>{startIndex + index}</td>
//                     <td style={{ padding: '12px' }}>#{booking.booking_id}</td>
//                     <td style={{ padding: '12px' }}>{formatDate(booking.booking_date)}</td>
//                     <td style={{ padding: '12px' }}>{formatDate(booking.service_start_date)}</td>
//                     <td style={{ padding: '12px' }}>{formatDate(booking.service_end_date)}</td>
//                     <td style={{ padding: '12px' }}>{booking.number_of_hours || '-'}</td>
//                     <td style={{ padding: '12px', fontWeight: 'bold' }}>{formatCurrency(booking.total_amount)}</td>
//                     <td style={{ padding: '12px' }}>{booking.address || '-'}</td>
//                     <td style={{ padding: '12px', maxWidth: '200px', wordBreak: 'break-word' }}>
//                       {booking.booking_notes || '-'}
//                     </td>
//                     <td style={{ padding: '12px' }}>
//                       <span style={getStatusBadgeStyle(booking.booking_status)}>
//                         {booking.booking_status || 'N/A'}
//                       </span>
//                     </td>
//                     <td style={{ padding: '12px' }}>
//                       <span style={getPaymentBadgeStyle(booking.payment_status)}>
//                         {booking.payment_status || 'N/A'}
//                       </span>
//                     </td>
//                     <td style={{ padding: '12px' }}>
//                       {getActionButtons(booking)}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="12" style={{ textAlign: 'center', padding: '40px' }}>
//                     No service bookings found
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
//                 </select>
//                 <span style={{ fontSize: '14px', color: '#666' }}>
//                   of {totalItems} items
//                 </span>
//               </div>
              
//               <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
              
//               <div className="page-info" style={{ fontSize: '14px', color: '#666' }}>
//                 Page {currentPage} of {totalPages}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default AgentServiceBookings;



// import React, { useEffect, useState } from 'react';
// // import "./AgentServiceBookings.css"; 
// import AgentNavbar from "./../Agent_Navbar/Agent_Navbar"; 
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { baseurl } from './../../BaseURL/BaseURL';
// import Swal from 'sweetalert2';

// function AgentServiceBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [totalItems, setTotalItems] = useState(0);
  
//   // Get logged-in user ID from localStorage or context
//   const [userId, setUserId] = useState(null);
  
//   const navigate = useNavigate();

//   /* ================= FORMATTING FUNCTIONS (MUST BE DEFINED FIRST) ================= */
//   // Format only date (without time)
//   const formatDateOnly = (dateString) => {
//     if (!dateString) return 'N/A';
    
//     if (dateString.match(/^\d{2}-\d{2}-\d{4}/)) {
//       const parts = dateString.split(/[- :]/);
//       const day = parts[0];
//       const month = parts[1];
//       const year = parts[2];
//       return `${day}/${month}/${year}`;
//     }
    
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return dateString;
    
//     return date.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     });
//   };

//   // Format date with time
//   const formatDateTime = (dateString) => {
//     if (!dateString) return 'N/A';
    
//     if (dateString.match(/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}/)) {
//       const parts = dateString.split(/[- :]/);
//       const day = parts[0];
//       const month = parts[1];
//       const year = parts[2];
//       const hour = parts[3];
//       const minute = parts[4];
//       return `${day}/${month}/${year} ${hour}:${minute}`;
//     }
    
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return dateString;
    
//     return date.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const formatCurrency = (amount) => {
//     if (!amount || amount === '0.00') return '₹0.00';
//     return `₹${parseFloat(amount).toLocaleString('en-IN')}`;
//   };

//   const getStatusBadgeStyle = (status) => {
//     const statusLower = status?.toLowerCase();
//     if (statusLower === 'pending') {
//       return { backgroundColor: '#fff3cd', color: '#856404', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//     } else if (statusLower === 'confirmed') {
//       return { backgroundColor: '#d4edda', color: '#155724', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//     } else if (statusLower === 'completed') {
//       return { backgroundColor: '#cce5ff', color: '#004085', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//     } else if (statusLower === 'cancelled') {
//       return { backgroundColor: '#f8d7da', color: '#721c24', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//     }
//     return { backgroundColor: '#e2e3e5', color: '#383d41', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//   };

//   const getPaymentBadgeStyle = (status) => {
//     const statusLower = status?.toLowerCase();
//     if (statusLower === 'pending') {
//       return { backgroundColor: '#fff3cd', color: '#856404', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//     } else if (statusLower === 'paid' || statusLower === 'completed') {
//       return { backgroundColor: '#d4edda', color: '#155724', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//     } else if (statusLower === 'failed') {
//       return { backgroundColor: '#f8d7da', color: '#721c24', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//     }
//     return { backgroundColor: '#e2e3e5', color: '#383d41', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//   };

//   /* ================= GET LOGGED-IN USER ID ================= */
//   useEffect(() => {
//     // Get user ID from localStorage
//     const storedUser = localStorage.getItem('user');
//     console.log('Stored user from localStorage:', storedUser);
    
//     if (storedUser) {
//       try {
//         const userData = JSON.parse(storedUser);
//         // Try different possible field names
//         const id = userData.id || userData.user_id || userData.pk;
//         console.log('Extracted user ID:', id);
//         setUserId(id);
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//       }
//     } else {
//       // Try to get from other possible storage keys
//       const email = localStorage.getItem('email');
//       const phone = localStorage.getItem('phone_number');
//       console.log('No user object found, checking other keys - Email:', email, 'Phone:', phone);
      
//       // If you have user ID stored separately
//       const userIdFromStorage = localStorage.getItem('userId');
//       if (userIdFromStorage) {
//         console.log('Found userId in separate storage:', userIdFromStorage);
//         setUserId(parseInt(userIdFromStorage));
//       }
//     }
//   }, []);

//   /* ================= FETCH BOOKINGS FOR SPECIFIC USER ================= */
//   const fetchBookings = async () => {
//     if (!userId) {
//       console.log('No userId available, skipping fetch');
//       return;
//     }
    
//     setLoading(true);
//     try {
//       // Build query parameters with user filter
//       const params = new URLSearchParams({
//         user: userId,
//         page: currentPage,
//         page_size: itemsPerPage,
//       });
      
//       if (searchQuery.trim()) {
//         params.append('search', searchQuery.trim());
//       }
      
//       console.log('Fetching bookings with params:', params.toString());
//       const res = await axios.get(`${baseurl}/service-bookings/?${params.toString()}`);
//       console.log('API Response:', res.data);
      
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
      
//       console.log('Processed data:', data);
      
//       // Sort by booking_id in descending order (newest first)
//       const sorted = data.sort((a, b) => b.booking_id - a.booking_id);
//       setBookings(sorted);
//       setFilteredBookings(sorted);
//       setTotalItems(count);
//     } catch (error) {
//       console.error("Error fetching agent service bookings:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to load your service bookings',
//         confirmButtonColor: '#273c75'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { 
//     if (userId) {
//       fetchBookings();
//     }
//   }, [currentPage, itemsPerPage, searchQuery, userId]);

//   /* ================= SEARCH ================= */
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1);
//   };

//   /* ================= UPDATE BOOKING STATUS ================= */
//   const handleUpdateStatus = async (bookingId, newStatus) => {
//     try {
//       const response = await axios.patch(`${baseurl}/service-bookings/${bookingId}/`, {
//         booking_status: newStatus
//       });
      
//       if (response.status === 200 || response.status === 202) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Updated!',
//           text: `Booking status updated to ${newStatus}`,
//           confirmButtonColor: '#273c75',
//           timer: 2000
//         });
//         fetchBookings();
//       }
//     } catch (error) {
//       console.error("Error updating booking status:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: 'Could not update booking status. Please try again.',
//         confirmButtonColor: '#273c75'
//       });
//     }
//   };

//   /* ================= CANCEL BOOKING ================= */
//   const handleCancelBooking = (bookingId) => {
//     Swal.fire({
//       title: 'Cancel Booking?',
//       text: "Are you sure you want to cancel this booking? This action cannot be undone.",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#273c75',
//       confirmButtonText: 'Yes, Cancel Booking',
//       cancelButtonText: 'No, Keep It'
//     }).then(result => {
//       if (result.isConfirmed) {
//         handleUpdateStatus(bookingId, 'Cancelled');
//       }
//     });
//   };

//   /* ================= CONFIRM BOOKING ================= */
//   const handleConfirmBooking = (bookingId) => {
//     Swal.fire({
//       title: 'Confirm Booking?',
//       text: "Are you sure you want to confirm this booking?",
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#28a745',
//       cancelButtonColor: '#273c75',
//       confirmButtonText: 'Yes, Confirm',
//       cancelButtonText: 'No'
//     }).then(result => {
//       if (result.isConfirmed) {
//         handleUpdateStatus(bookingId, 'Confirmed');
//       }
//     });
//   };

//   /* ================= COMPLETE BOOKING ================= */
//   const handleCompleteBooking = (bookingId) => {
//     Swal.fire({
//       title: 'Complete Booking?',
//       text: "Mark this booking as completed?",
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#28a745',
//       cancelButtonColor: '#273c75',
//       confirmButtonText: 'Yes, Complete',
//       cancelButtonText: 'No'
//     }).then(result => {
//       if (result.isConfirmed) {
//         handleUpdateStatus(bookingId, 'Completed');
//       }
//     });
//   };

//   /* ================= PAGINATION HANDLERS ================= */
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage + 1;
  
//   const handlePageChange = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   const handleItemsPerPageChange = (e) => {
//     const value = parseInt(e.target.value);
//     setItemsPerPage(value);
//     setCurrentPage(1);
//   };

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

//   // Get action buttons based on booking status
//   const getActionButtons = (booking) => {
//     const status = booking.booking_status?.toLowerCase();
    
//     if (status === 'pending') {
//       return (
//         <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
//           <button 
//             className="confirm-btn"
//             onClick={() => handleConfirmBooking(booking.booking_id)}
//             style={{
//               padding: '6px 12px',
//               backgroundColor: '#28a745',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               fontSize: '12px'
//             }}
//           >
//             Confirm
//           </button>
//           <button 
//             className="cancel-btn"
//             onClick={() => handleCancelBooking(booking.booking_id)}
//             style={{
//               padding: '6px 12px',
//               backgroundColor: '#dc3545',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               fontSize: '12px'
//             }}
//           >
//             Cancel
//           </button>
//         </div>
//       );
//     } else if (status === 'confirmed') {
//       return (
//         <div style={{ display: 'flex', gap: '8px' }}>
//           <button 
//             className="complete-btn"
//             onClick={() => handleCompleteBooking(booking.booking_id)}
//             style={{
//               padding: '6px 12px',
//               backgroundColor: '#17a2b8',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               fontSize: '12px'
//             }}
//           >
//             Mark Complete
//           </button>
//           <button 
//             className="cancel-btn"
//             onClick={() => handleCancelBooking(booking.booking_id)}
//             style={{
//               padding: '6px 12px',
//               backgroundColor: '#dc3545',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               fontSize: '12px'
//             }}
//           >
//             Cancel
//           </button>
//         </div>
//       );
//     } else if (status === 'completed') {
//       return (
//         <span style={{ color: '#28a745', fontSize: '12px', fontWeight: '500' }}>
//           ✓ Completed
//         </span>
//       );
//     } else if (status === 'cancelled') {
//       return (
//         <span style={{ color: '#dc3545', fontSize: '12px', fontWeight: '500' }}>
//           ✗ Cancelled
//         </span>
//       );
//     }
//     return null;
//   };

//   // Show loading state while fetching userId or bookings
//   if (!userId && !loading) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="page-container" style={{ textAlign: 'center', padding: '50px' }}>
//           <h3>Unable to load user information</h3>
//           <p>Please log in again to access your bookings.</p>
//           <button 
//             onClick={() => navigate('/login')}
//             style={{
//               padding: '10px 20px',
//               backgroundColor: '#273c75',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer'
//             }}
//           >
//             Go to Login
//           </button>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <AgentNavbar />

//       <div className="page-container">
//         {/* Header */}
//         <div className="page-header">
//           <h2>My Service Bookings</h2>
//         </div>

//         {/* Toolbar */}
//         <div className="page-toolbar">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Search by Booking ID, Address or Notes..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//               style={{
//                 padding: '10px',
//                 width: '300px',
//                 border: '1px solid #ddd',
//                 borderRadius: '4px',
//                 fontSize: '14px'
//               }}
//             />
//           </div>
//         </div>

//         {/* Table */}
//         <div className="table-card" style={{
//           backgroundColor: 'white',
//           borderRadius: '8px',
//           boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//           overflow: 'auto'
//         }}>
//           <table className="data-table" style={{
//             width: '100%',
//             borderCollapse: 'collapse'
//           }}>
//             <thead>
//               <tr style={{
//                 backgroundColor: '#f8f9fa',
//                 borderBottom: '2px solid #dee2e6'
//               }}>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>S.No.</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Booking ID</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Booking Date</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Service Start</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Service End</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Hours</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Total Amount</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Address</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Notes</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Booking Status</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Payment Status</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="12" style={{ textAlign: 'center', padding: '40px' }}>
//                     Loading...
//                   </td>
//                 </tr>
//               ) : filteredBookings.length ? (
//                 filteredBookings.map((booking, index) => (
//                   <tr key={booking.booking_id} style={{
//                     borderBottom: '1px solid #dee2e6'
//                   }}>
//                     <td style={{ padding: '12px' }}>{startIndex + index}</td>
//                     <td style={{ padding: '12px' }}>#{booking.booking_id}</td>
//                     <td style={{ padding: '12px' }}>{formatDateTime(booking.booking_date)}</td>
//                     <td style={{ padding: '12px' }}>{formatDateOnly(booking.service_start_date)}</td>
//                     <td style={{ padding: '12px' }}>{formatDateOnly(booking.service_end_date)}</td>
//                     <td style={{ padding: '12px' }}>{booking.number_of_hours || '-'}</td>
//                     <td style={{ padding: '12px', fontWeight: 'bold' }}>{formatCurrency(booking.total_amount)}</td>
//                     <td style={{ padding: '12px' }}>{booking.address || '-'}</td>
//                     <td style={{ padding: '12px', maxWidth: '200px', wordBreak: 'break-word' }}>
//                       {booking.booking_notes || '-'}
//                     </td>
//                     <td style={{ padding: '12px' }}>
//                       <span style={getStatusBadgeStyle(booking.booking_status)}>
//                         {booking.booking_status || 'N/A'}
//                       </span>
//                     </td>
//                     <td style={{ padding: '12px' }}>
//                       <span style={getPaymentBadgeStyle(booking.payment_status)}>
//                         {booking.payment_status || 'N/A'}
//                       </span>
//                     </td>
//                     <td style={{ padding: '12px' }}>
//                       {getActionButtons(booking)}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="12" style={{ textAlign: 'center', padding: '40px' }}>
//                     No service bookings found
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
//                 </select>
//                 <span style={{ fontSize: '14px', color: '#666' }}>
//                   of {totalItems} items
//                 </span>
//               </div>
              
//               <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
              
//               <div className="page-info" style={{ fontSize: '14px', color: '#666' }}>
//                 Page {currentPage} of {totalPages}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default AgentServiceBookings;



import React, { useEffect, useState } from 'react';
// import "./AgentServiceBookings.css"; 
import AgentNavbar from "./../Agent_Navbar/Agent_Navbar"; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseurl } from './../../BaseURL/BaseURL';
import Swal from 'sweetalert2';

function AgentServiceBookings() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  
  // Get logged-in user ID from localStorage
  const [userId, setUserId] = useState(null);
  
  const navigate = useNavigate();

  /* ================= FORMATTING FUNCTIONS (MUST BE DEFINED FIRST) ================= */
  // Format only date (without time)
  const formatDateOnly = (dateString) => {
    if (!dateString) return 'N/A';
    
    if (dateString.match(/^\d{2}-\d{2}-\d{4}/)) {
      const parts = dateString.split(/[- :]/);
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      return `${day}/${month}/${year}`;
    }
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Format date with time
  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    
    if (dateString.match(/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}/)) {
      const parts = dateString.split(/[- :]/);
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      const hour = parts[3];
      const minute = parts[4];
      return `${day}/${month}/${year} ${hour}:${minute}`;
    }
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    if (!amount || amount === '0.00') return '₹0.00';
    return `₹${parseFloat(amount).toLocaleString('en-IN')}`;
  };

  const getStatusBadgeStyle = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === 'pending') {
      return { backgroundColor: '#fff3cd', color: '#856404', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
    } else if (statusLower === 'confirmed') {
      return { backgroundColor: '#d4edda', color: '#155724', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
    } else if (statusLower === 'completed') {
      return { backgroundColor: '#cce5ff', color: '#004085', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
    } else if (statusLower === 'cancelled') {
      return { backgroundColor: '#f8d7da', color: '#721c24', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
    }
    return { backgroundColor: '#e2e3e5', color: '#383d41', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
  };

  const getPaymentBadgeStyle = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === 'pending') {
      return { backgroundColor: '#fff3cd', color: '#856404', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
    } else if (statusLower === 'paid' || statusLower === 'completed') {
      return { backgroundColor: '#d4edda', color: '#155724', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
    } else if (statusLower === 'failed') {
      return { backgroundColor: '#f8d7da', color: '#721c24', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
    }
    return { backgroundColor: '#e2e3e5', color: '#383d41', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
  };

  /* ================= GET LOGGED-IN USER ID ================= */
  useEffect(() => {
    // Try multiple ways to get user ID from localStorage
    let userIdFromStorage = null;
    
    // Method 1: Check for 'user_id' directly
    const directUserId = localStorage.getItem('user_id');
    if (directUserId) {
      userIdFromStorage = parseInt(directUserId);
      console.log('Found user_id directly:', userIdFromStorage);
    }
    
    // Method 2: Check for 'user' object
    if (!userIdFromStorage) {
      const storedUser = localStorage.getItem('user');
      console.log('Stored user from localStorage:', storedUser);
      
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          // Try different possible field names
          userIdFromStorage = userData.id || userData.user_id || userData.pk;
          console.log('Extracted user ID from user object:', userIdFromStorage);
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
    
    // Method 3: Check for 'userId' key
    if (!userIdFromStorage) {
      const userIdKey = localStorage.getItem('userId');
      if (userIdKey) {
        userIdFromStorage = parseInt(userIdKey);
        console.log('Found userId from separate key:', userIdFromStorage);
      }
    }
    
    // Method 4: Check for 'userData' object
    if (!userIdFromStorage) {
      const userDataStr = localStorage.getItem('userData');
      if (userDataStr) {
        try {
          const userData = JSON.parse(userDataStr);
          userIdFromStorage = userData.id || userData.user_id;
          console.log('Extracted user ID from userData:', userIdFromStorage);
        } catch (error) {
          console.error("Error parsing userData:", error);
        }
      }
    }
    
    if (userIdFromStorage) {
      setUserId(userIdFromStorage);
      setLoading(false); // Set loading to false after getting user ID
    } else {
      console.warn('No user ID found in localStorage');
      setLoading(false); // Stop loading even if no user ID
    }
  }, []);

  /* ================= FETCH BOOKINGS FOR SPECIFIC USER ================= */
  const fetchBookings = async () => {
    if (!userId) {
      console.log('No userId available, skipping fetch');
      return;
    }
    
    setLoading(true);
    try {
      // Build query parameters with user filter
      const params = new URLSearchParams({
        user: userId,
        page: currentPage,
        page_size: itemsPerPage,
      });
      
      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }
      
      console.log('Fetching bookings for user:', userId);
      console.log('Fetching bookings with params:', params.toString());
      
      const res = await axios.get(`${baseurl}/service-bookings/?${params.toString()}`);
      console.log('API Response:', res.data);
      
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
      
      console.log('Processed data:', data);
      
      // Sort by booking_id in descending order (newest first)
      const sorted = data.sort((a, b) => b.booking_id - a.booking_id);
      setBookings(sorted);
      setFilteredBookings(sorted);
      setTotalItems(count);
    } catch (error) {
      console.error("Error fetching agent service bookings:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to load your service bookings',
        confirmButtonColor: '#273c75'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    if (userId) {
      fetchBookings();
    }
  }, [currentPage, itemsPerPage, searchQuery, userId]);

  /* ================= SEARCH ================= */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  /* ================= UPDATE BOOKING STATUS ================= */
  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      const response = await axios.patch(`${baseurl}/service-bookings/${bookingId}/`, {
        booking_status: newStatus
      });
      
      if (response.status === 200 || response.status === 202) {
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: `Booking status updated to ${newStatus}`,
          confirmButtonColor: '#273c75',
          timer: 2000
        });
        fetchBookings();
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Could not update booking status. Please try again.',
        confirmButtonColor: '#273c75'
      });
    }
  };

  /* ================= CANCEL BOOKING ================= */
  const handleCancelBooking = (bookingId) => {
    Swal.fire({
      title: 'Cancel Booking?',
      text: "Are you sure you want to cancel this booking? This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#273c75',
      confirmButtonText: 'Yes, Cancel Booking',
      cancelButtonText: 'No, Keep It'
    }).then(result => {
      if (result.isConfirmed) {
        handleUpdateStatus(bookingId, 'Cancelled');
      }
    });
  };

  /* ================= CONFIRM BOOKING ================= */
  const handleConfirmBooking = (bookingId) => {
    Swal.fire({
      title: 'Confirm Booking?',
      text: "Are you sure you want to confirm this booking?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#273c75',
      confirmButtonText: 'Yes, Confirm',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        handleUpdateStatus(bookingId, 'Confirmed');
      }
    });
  };

  /* ================= COMPLETE BOOKING ================= */
  const handleCompleteBooking = (bookingId) => {
    Swal.fire({
      title: 'Complete Booking?',
      text: "Mark this booking as completed?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#273c75',
      confirmButtonText: 'Yes, Complete',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        handleUpdateStatus(bookingId, 'Completed');
      }
    });
  };

  /* ================= PAGINATION HANDLERS ================= */
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(1);
  };

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

  // Get action buttons based on booking status
  const getActionButtons = (booking) => {
    const status = booking.booking_status?.toLowerCase();
    
    if (status === 'pending') {
      return (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button 
            className="confirm-btn"
            onClick={() => handleConfirmBooking(booking.booking_id)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Confirm
          </button>
          <button 
            className="cancel-btn"
            onClick={() => handleCancelBooking(booking.booking_id)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Cancel
          </button>
        </div>
      );
    } else if (status === 'confirmed') {
      return (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="complete-btn"
            onClick={() => handleCompleteBooking(booking.booking_id)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Mark Complete
          </button>
          <button 
            className="cancel-btn"
            onClick={() => handleCancelBooking(booking.booking_id)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Cancel
          </button>
        </div>
      );
    } else if (status === 'completed') {
      return (
        <span style={{ color: '#28a745', fontSize: '12px', fontWeight: '500' }}>
          ✓ Completed
        </span>
      );
    } else if (status === 'cancelled') {
      return (
        <span style={{ color: '#dc3545', fontSize: '12px', fontWeight: '500' }}>
          ✗ Cancelled
        </span>
      );
    }
    return null;
  };

  // Show loading state while fetching userId or bookings
  if (loading && !userId) {
    return (
      <>
        <AgentNavbar />
        <div className="page-container" style={{ textAlign: 'center', padding: '50px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading user information...</p>
        </div>
      </>
    );
  }

  if (!userId && !loading) {
    return (
      <>
        <AgentNavbar />
        <div className="page-container" style={{ textAlign: 'center', padding: '50px' }}>
          <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '48px', color: '#ffc107' }}></i>
          <h3 className="mt-3">Unable to load user information</h3>
          <p className="text-muted">Please log in again to access your bookings.</p>
          <button 
            onClick={() => navigate('/login')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#273c75',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Go to Login
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <AgentNavbar />

      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <h2>My Service Bookings</h2>
          <p className="text-muted">User ID: {userId}</p>
        </div>

        {/* Toolbar */}
        <div className="page-toolbar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by Booking ID, Address or Notes..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                padding: '10px',
                width: '300px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="table-card" style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'auto'
        }}>
          <table className="data-table" style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{
                backgroundColor: '#f8f9fa',
                borderBottom: '2px solid #dee2e6'
              }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>S.No.</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Booking ID</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Booking Date</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Service Start</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Service End</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Hours/Days</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Total Amount</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Address</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Notes</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Booking Status</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Payment Status</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="12" style={{ textAlign: 'center', padding: '40px' }}>
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading bookings...</p>
                  </td>
                </tr>
              ) : filteredBookings.length ? (
                filteredBookings.map((booking, index) => (
                  <tr key={booking.booking_id} style={{
                    borderBottom: '1px solid #dee2e6'
                  }}>
                    <td style={{ padding: '12px' }}>{startIndex + index}</td>
                    <td style={{ padding: '12px' }}>#{booking.booking_id}</td>
                    <td style={{ padding: '12px' }}>{formatDateTime(booking.booking_date)}</td>
                    <td style={{ padding: '12px' }}>{formatDateOnly(booking.service_start_date)}</td>
                    <td style={{ padding: '12px' }}>{formatDateOnly(booking.service_end_date)}</td>
                    <td style={{ padding: '12px' }}>
                      {booking.number_of_hours ? `${booking.number_of_hours} hrs` : 
                       booking.number_of_days ? `${booking.number_of_days} days` : '-'}
                    </td>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{formatCurrency(booking.total_amount)}</td>
                    <td style={{ padding: '12px' }}>{booking.address || '-'}</td>
                    <td style={{ padding: '12px', maxWidth: '200px', wordBreak: 'break-word' }}>
                      {booking.booking_notes || '-'}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={getStatusBadgeStyle(booking.booking_status)}>
                        {booking.booking_status || 'N/A'}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={getPaymentBadgeStyle(booking.payment_status)}>
                        {booking.payment_status || 'N/A'}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      {getActionButtons(booking)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" style={{ textAlign: 'center', padding: '40px' }}>
                    <i className="bi bi-calendar-x" style={{ fontSize: '48px', color: '#ccc' }}></i>
                    <p className="mt-2">No service bookings found</p>
                    <p className="text-muted small">You haven't made any bookings yet.</p>
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
                  of {totalItems} items
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
      </div>
    </>
  );
}

export default AgentServiceBookings;