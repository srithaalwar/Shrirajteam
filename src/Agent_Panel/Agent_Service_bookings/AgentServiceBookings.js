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
//   const [categories, setCategories] = useState({}); // Store categories mapping
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [totalItems, setTotalItems] = useState(0);
  
//   // Get logged-in user ID from localStorage
//   const [userId, setUserId] = useState(null);
  
//   const navigate = useNavigate();

//   // Booking status options from backend model
//   const BOOKING_STATUS_OPTIONS = [
//     'Pending',
//     'Accepted',
//     'Rejected',
//     'Completed',
//     'Cancelled'
//   ];

//   // Payment status options from backend model
//   const PAYMENT_STATUS_OPTIONS = [
//     'Pending',
//     'Paid',
//     'Failed',
//     'Refunded'
//   ];

//   /* ================= FETCH CATEGORIES ================= */
//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${baseurl}/service-categories/`);
      
//       // Create a mapping of category_id to category_name
//       const categoryMap = {};
      
//       if (res.data.results) {
//         res.data.results.forEach(category => {
//           categoryMap[category.category_id] = category.category_name;
//         });
//       } else if (Array.isArray(res.data)) {
//         res.data.forEach(category => {
//           categoryMap[category.category_id] = category.category_name;
//         });
//       }
      
//       setCategories(categoryMap);
//       return categoryMap;
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       return {};
//     }
//   };

//   /* ================= FORMATTING FUNCTIONS ================= */
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
//     } else if (statusLower === 'accepted') {
//       return { backgroundColor: '#d4edda', color: '#155724', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//     } else if (statusLower === 'rejected') {
//       return { backgroundColor: '#f8d7da', color: '#721c24', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
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
//     } else if (statusLower === 'paid') {
//       return { backgroundColor: '#d4edda', color: '#155724', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//     } else if (statusLower === 'failed') {
//       return { backgroundColor: '#f8d7da', color: '#721c24', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//     } else if (statusLower === 'refunded') {
//       return { backgroundColor: '#e2e3e5', color: '#383d41', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//     }
//     return { backgroundColor: '#e2e3e5', color: '#383d41', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'inline-block' };
//   };

//   const getServiceChargeTypeLabel = (type) => {
//     if (!type) return '-';
//     if (type === 'Per Hour') return 'Per Hour';
//     if (type === 'Per Day') return 'Per Day';
//     if (type === 'Contract') return 'Contract';
//     return type;
//   };

//   /* ================= GET LOGGED-IN USER ID ================= */
//   useEffect(() => {
//     // Try multiple ways to get user ID from localStorage
//     let userIdFromStorage = null;
    
//     // Method 1: Check for 'user_id' directly
//     const directUserId = localStorage.getItem('user_id');
//     if (directUserId) {
//       userIdFromStorage = parseInt(directUserId);
//       console.log('Found user_id directly:', userIdFromStorage);
//     }
    
//     // Method 2: Check for 'user' object
//     if (!userIdFromStorage) {
//       const storedUser = localStorage.getItem('user');
//       console.log('Stored user from localStorage:', storedUser);
      
//       if (storedUser) {
//         try {
//           const userData = JSON.parse(storedUser);
//           // Try different possible field names
//           userIdFromStorage = userData.id || userData.user_id || userData.pk;
//           console.log('Extracted user ID from user object:', userIdFromStorage);
//         } catch (error) {
//           console.error("Error parsing user data:", error);
//         }
//       }
//     }
    
//     // Method 3: Check for 'userId' key
//     if (!userIdFromStorage) {
//       const userIdKey = localStorage.getItem('userId');
//       if (userIdKey) {
//         userIdFromStorage = parseInt(userIdKey);
//         console.log('Found userId from separate key:', userIdFromStorage);
//       }
//     }
    
//     // Method 4: Check for 'userData' object
//     if (!userIdFromStorage) {
//       const userDataStr = localStorage.getItem('userData');
//       if (userDataStr) {
//         try {
//           const userData = JSON.parse(userDataStr);
//           userIdFromStorage = userData.id || userData.user_id;
//           console.log('Extracted user ID from userData:', userIdFromStorage);
//         } catch (error) {
//           console.error("Error parsing userData:", error);
//         }
//       }
//     }
    
//     if (userIdFromStorage) {
//       setUserId(userIdFromStorage);
//     } else {
//       console.warn('No user ID found in localStorage');
//       setLoading(false); // Stop loading even if no user ID
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
      
//       console.log('Fetching bookings for user:', userId);
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
      
//       // Add category name to each booking
//       const dataWithCategoryNames = data.map(booking => ({
//         ...booking,
//         category_name: categories[booking.service_category] || 'Unknown Category'
//       }));
      
//       console.log('Processed data with categories:', dataWithCategoryNames);
      
//       // Sort by booking_id in descending order (newest first)
//       const sorted = dataWithCategoryNames.sort((a, b) => b.booking_id - a.booking_id);
//       setBookings(sorted);
//       setFilteredBookings(sorted);
//       setTotalItems(count);
//     } catch (error) {
//       console.error("Error fetching agent service bookings:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error.response?.data?.message || 'Failed to load your service bookings',
//         confirmButtonColor: '#273c75'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= INITIAL LOAD ================= */
//   useEffect(() => {
//     const loadData = async () => {
//       if (userId) {
//         await fetchCategories();
//       }
//     };
//     loadData();
//   }, [userId]);

//   useEffect(() => { 
//     if (userId && Object.keys(categories).length > 0) {
//       fetchBookings();
//     }
//   }, [currentPage, itemsPerPage, searchQuery, userId, categories]);

//   /* ================= SEARCH ================= */
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1);
//   };

//   /* ================= UPDATE BOOKING STATUS ================= */
//   const handleUpdateBookingStatus = async (bookingId, newStatus) => {
//     try {
//       const response = await axios.patch(`${baseurl}/service-bookings/${bookingId}/`, {
//         booking_status: newStatus
//       });
      
//       if (response.status === 200 || response.status === 202) {
//         // Update local state
//         setBookings(prevBookings => 
//           prevBookings.map(booking => 
//             booking.booking_id === bookingId 
//               ? { ...booking, booking_status: newStatus }
//               : booking
//           )
//         );
//         setFilteredBookings(prevFiltered => 
//           prevFiltered.map(booking => 
//             booking.booking_id === bookingId 
//               ? { ...booking, booking_status: newStatus }
//               : booking
//           )
//         );
        
//         Swal.fire({
//           icon: 'success',
//           title: 'Updated!',
//           text: `Booking status updated to ${newStatus}`,
//           confirmButtonColor: '#273c75',
//           timer: 2000,
//           showConfirmButton: false
//         });
//       }
//     } catch (error) {
//       console.error("Error updating booking status:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: error.response?.data?.message || 'Could not update booking status. Please try again.',
//         confirmButtonColor: '#273c75'
//       });
//     }
//   };

//   /* ================= UPDATE PAYMENT STATUS ================= */
//   const handleUpdatePaymentStatus = async (bookingId, newStatus) => {
//     try {
//       const response = await axios.patch(`${baseurl}/service-bookings/${bookingId}/`, {
//         payment_status: newStatus
//       });
      
//       if (response.status === 200 || response.status === 202) {
//         // Update local state
//         setBookings(prevBookings => 
//           prevBookings.map(booking => 
//             booking.booking_id === bookingId 
//               ? { ...booking, payment_status: newStatus }
//               : booking
//           )
//         );
//         setFilteredBookings(prevFiltered => 
//           prevFiltered.map(booking => 
//             booking.booking_id === bookingId 
//               ? { ...booking, payment_status: newStatus }
//               : booking
//           )
//         );
        
//         Swal.fire({
//           icon: 'success',
//           title: 'Updated!',
//           text: `Payment status updated to ${newStatus}`,
//           confirmButtonColor: '#273c75',
//           timer: 2000,
//           showConfirmButton: false
//         });
//       }
//     } catch (error) {
//       console.error("Error updating payment status:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: error.response?.data?.message || 'Could not update payment status. Please try again.',
//         confirmButtonColor: '#273c75'
//       });
//     }
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

//   // Show loading state while fetching userId or bookings
//   if (loading && !userId) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="page-container" style={{ textAlign: 'center', padding: '50px' }}>
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p className="mt-3">Loading user information...</p>
//         </div>
//       </>
//     );
//   }

//   if (!userId && !loading) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="page-container" style={{ textAlign: 'center', padding: '50px' }}>
//           <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '48px', color: '#ffc107' }}></i>
//           <h3 className="mt-3">Unable to load user information</h3>
//           <p className="text-muted">Please log in again to access your bookings.</p>
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
//     <div>
//       <AgentNavbar />

//       <div className="page-container">
//         {/* Header */}
//         <div className="page-header">
//           <h2>Service Bookings</h2>
//           <p className="text-muted">User ID: {userId}</p>
//         </div>

//         {/* Toolbar */}
//         <div className="page-toolbar">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Search by Booking ID, Category, Address or Notes..."
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
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Service Category</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Charge Type</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Booking Date</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Service Start</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Service End</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Duration</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Total Amount</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Address</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Notes</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Booking Status</th>
//                 <th style={{ padding: '12px', textAlign: 'left' }}>Payment Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="13" style={{ textAlign: 'center', padding: '40px' }}>
//                     <div className="spinner-border text-primary" role="status">
//                       <span className="visually-hidden">Loading...</span>
//                     </div>
//                     <p className="mt-2">Loading bookings...</p>
//                   </td>
//                 </tr>
//               ) : filteredBookings.length ? (
//                 filteredBookings.map((booking, index) => (
//                   <tr key={booking.booking_id} style={{
//                     borderBottom: '1px solid #dee2e6'
//                   }}>
//                     <td style={{ padding: '12px' }}>{startIndex + index}</td>
//                     <td style={{ padding: '12px' }}>#{booking.booking_id}</td>
//                     <td style={{ padding: '12px' }}>
//                       <span style={{
//                         backgroundColor: '#e8f4f8',
//                         color: '#0c5460',
//                         padding: '4px 8px',
//                         borderRadius: '4px',
//                         fontSize: '12px',
//                         fontWeight: '500'
//                       }}>
//                         {booking.category_name}
//                       </span>
//                     </td>
//                     <td style={{ padding: '12px' }}>
//                       <span style={{
//                         backgroundColor: '#fff3cd',
//                         color: '#856404',
//                         padding: '4px 8px',
//                         borderRadius: '4px',
//                         fontSize: '12px'
//                       }}>
//                         {getServiceChargeTypeLabel(booking.service_charge_type)}
//                       </span>
//                     </td>
//                     <td style={{ padding: '12px' }}>{formatDateTime(booking.booking_date)}</td>
//                     <td style={{ padding: '12px' }}>{formatDateOnly(booking.service_start_date)}</td>
//                     <td style={{ padding: '12px' }}>{formatDateOnly(booking.service_end_date)}</td>
//                     <td style={{ padding: '12px' }}>
//                       {booking.number_of_hours ? `${booking.number_of_hours} hour(s)` : 
//                        booking.number_of_days ? `${booking.number_of_days} day(s)` : '-'}
//                     </td>
//                     <td style={{ padding: '12px', fontWeight: 'bold', color: '#28a745' }}>
//                       {formatCurrency(booking.total_amount)}
//                     </td>
//                     <td style={{ padding: '12px', maxWidth: '150px', wordBreak: 'break-word' }}>
//                       {booking.address || '-'}
//                     </td>
//                     <td style={{ padding: '12px', maxWidth: '150px', wordBreak: 'break-word' }}>
//                       {booking.booking_notes || '-'}
//                     </td>
//                     <td style={{ padding: '12px' }}>
//                       <select
//                         value={booking.booking_status || 'Pending'}
//                         onChange={(e) => handleUpdateBookingStatus(booking.booking_id, e.target.value)}
//                         style={{
//                           padding: '6px 10px',
//                           borderRadius: '4px',
//                           border: `1px solid ${getStatusBadgeStyle(booking.booking_status).backgroundColor}`,
//                           backgroundColor: getStatusBadgeStyle(booking.booking_status).backgroundColor,
//                           color: getStatusBadgeStyle(booking.booking_status).color,
//                           fontSize: '12px',
//                           fontWeight: '500',
//                           cursor: 'pointer',
//                           outline: 'none'
//                         }}
//                       >
//                         {BOOKING_STATUS_OPTIONS.map(status => (
//                           <option key={status} value={status} style={{ backgroundColor: 'white', color: '#333' }}>
//                             {status}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td style={{ padding: '12px' }}>
//                       <select
//                         value={booking.payment_status || 'Pending'}
//                         onChange={(e) => handleUpdatePaymentStatus(booking.booking_id, e.target.value)}
//                         style={{
//                           padding: '6px 10px',
//                           borderRadius: '4px',
//                           border: `1px solid ${getPaymentBadgeStyle(booking.payment_status).backgroundColor}`,
//                           backgroundColor: getPaymentBadgeStyle(booking.payment_status).backgroundColor,
//                           color: getPaymentBadgeStyle(booking.payment_status).color,
//                           fontSize: '12px',
//                           fontWeight: '500',
//                           cursor: 'pointer',
//                           outline: 'none'
//                         }}
//                       >
//                         {PAYMENT_STATUS_OPTIONS.map(status => (
//                           <option key={status} value={status} style={{ backgroundColor: 'white', color: '#333' }}>
//                             {status}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="13" style={{ textAlign: 'center', padding: '40px' }}>
//                     <i className="bi bi-calendar-x" style={{ fontSize: '48px', color: '#ccc' }}></i>
//                     <p className="mt-2">No service bookings found</p>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//            </table>
          
//           {/* Pagination Controls */}
//           {totalItems > 0 && (
//             <div className="pagination-container" style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               padding: '16px',
//               borderTop: '1px solid #eee',
//               backgroundColor: '#f8f9fa',
//               flexWrap: 'wrap',
//               gap: '10px'
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
              
//               <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
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
//     </div>
//   );
// }

// export default AgentServiceBookings;


import React, { useEffect, useState } from 'react';
import "./AgentServiceBookings.css"; 
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
  const [categories, setCategories] = useState({}); // Store categories mapping
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  
  // Get logged-in user ID from localStorage (this will be the provider ID)
  const [providerId, setProviderId] = useState(null);
  
  const navigate = useNavigate();

  // Booking status options from backend model
  const BOOKING_STATUS_OPTIONS = [
    'Pending',
    'Accepted',
    'Rejected',
    'Completed',
    'Cancelled'
  ];

  // Payment status options from backend model
  const PAYMENT_STATUS_OPTIONS = [
    'Pending',
    'Paid',
    'Failed',
    'Refunded'
  ];

  /* ================= FETCH CATEGORIES ================= */
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${baseurl}/service-categories/`);
      
      // Create a mapping of category_id to category_name
      const categoryMap = {};
      
      if (res.data.results) {
        res.data.results.forEach(category => {
          categoryMap[category.category_id] = category.category_name;
        });
      } else if (Array.isArray(res.data)) {
        res.data.forEach(category => {
          categoryMap[category.category_id] = category.category_name;
        });
      }
      
      setCategories(categoryMap);
      return categoryMap;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return {};
    }
  };

  /* ================= FORMATTING FUNCTIONS ================= */
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
      return { backgroundColor: '#fff3cd', color: '#856404' };
    } else if (statusLower === 'accepted') {
      return { backgroundColor: '#d4edda', color: '#155724' };
    } else if (statusLower === 'rejected') {
      return { backgroundColor: '#f8d7da', color: '#721c24' };
    } else if (statusLower === 'completed') {
      return { backgroundColor: '#cce5ff', color: '#004085' };
    } else if (statusLower === 'cancelled') {
      return { backgroundColor: '#f8d7da', color: '#721c24' };
    }
    return { backgroundColor: '#e2e3e5', color: '#383d41' };
  };

  const getPaymentBadgeStyle = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === 'pending') {
      return { backgroundColor: '#fff3cd', color: '#856404' };
    } else if (statusLower === 'paid') {
      return { backgroundColor: '#d4edda', color: '#155724' };
    } else if (statusLower === 'failed') {
      return { backgroundColor: '#f8d7da', color: '#721c24' };
    } else if (statusLower === 'refunded') {
      return { backgroundColor: '#e2e3e5', color: '#383d41' };
    }
    return { backgroundColor: '#e2e3e5', color: '#383d41' };
  };

  const getServiceChargeTypeLabel = (type) => {
    if (!type) return '-';
    if (type === 'Per Hour') return 'Per Hour';
    if (type === 'Per Day') return 'Per Day';
    if (type === 'Contract') return 'Contract';
    return type;
  };

  /* ================= GET LOGGED-IN PROVIDER ID ================= */
  useEffect(() => {
    // Try multiple ways to get provider ID from localStorage
    let providerIdFromStorage = null;
    
    // Method 1: Check for 'provider_user_id' directly
    const directProviderId = localStorage.getItem('provider_user_id');
    if (directProviderId) {
      providerIdFromStorage = parseInt(directProviderId);
      console.log('Found provider_user_id directly:', providerIdFromStorage);
    }
    
    // Method 2: Check for 'user_id' (if provider is logged in as user)
    if (!providerIdFromStorage) {
      const directUserId = localStorage.getItem('user_id');
      if (directUserId) {
        providerIdFromStorage = parseInt(directUserId);
        console.log('Found user_id as provider ID:', providerIdFromStorage);
      }
    }
    
    // Method 3: Check for 'provider' object
    if (!providerIdFromStorage) {
      const storedProvider = localStorage.getItem('provider');
      console.log('Stored provider from localStorage:', storedProvider);
      
      if (storedProvider) {
        try {
          const providerData = JSON.parse(storedProvider);
          // Try different possible field names
          providerIdFromStorage = providerData.id || providerData.provider_id || providerData.user_id || providerData.pk;
          console.log('Extracted provider ID from provider object:', providerIdFromStorage);
        } catch (error) {
          console.error("Error parsing provider data:", error);
        }
      }
    }
    
    // Method 4: Check for 'user' object (if provider is stored as user)
    if (!providerIdFromStorage) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          providerIdFromStorage = userData.id || userData.user_id || userData.pk;
          console.log('Extracted provider ID from user object:', providerIdFromStorage);
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
    
    // Method 5: Check for 'userId' key
    if (!providerIdFromStorage) {
      const userIdKey = localStorage.getItem('userId');
      if (userIdKey) {
        providerIdFromStorage = parseInt(userIdKey);
        console.log('Found userId from separate key:', providerIdFromStorage);
      }
    }
    
    // Method 6: Check for 'userData' object
    if (!providerIdFromStorage) {
      const userDataStr = localStorage.getItem('userData');
      if (userDataStr) {
        try {
          const userData = JSON.parse(userDataStr);
          providerIdFromStorage = userData.id || userData.user_id;
          console.log('Extracted provider ID from userData:', providerIdFromStorage);
        } catch (error) {
          console.error("Error parsing userData:", error);
        }
      }
    }
    
    if (providerIdFromStorage) {
      setProviderId(providerIdFromStorage);
    } else {
      console.warn('No provider ID found in localStorage');
      setLoading(false); // Stop loading even if no provider ID
    }
  }, []);

  /* ================= FETCH BOOKINGS FOR SPECIFIC PROVIDER ================= */
  const fetchBookings = async () => {
    if (!providerId) {
      console.log('No providerId available, skipping fetch');
      return;
    }
    
    setLoading(true);
    try {
      // Build query parameters with provider_user_id filter
      const params = new URLSearchParams({
        provider_user_id: providerId,
        page: currentPage,
        page_size: itemsPerPage,
      });
      
      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }
      
      console.log('Fetching bookings for provider ID:', providerId);
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
      
      // Add category name to each booking
      const dataWithCategoryNames = data.map(booking => ({
        ...booking,
        category_name: categories[booking.service_category] || 'Unknown Category'
      }));
      
      console.log('Processed data with categories:', dataWithCategoryNames);
      
      // Sort by booking_id in descending order (newest first)
      const sorted = dataWithCategoryNames.sort((a, b) => b.booking_id - a.booking_id);
      setBookings(sorted);
      setFilteredBookings(sorted);
      setTotalItems(count);
    } catch (error) {
      console.error("Error fetching provider service bookings:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to load service bookings',
        confirmButtonColor: '#273c75'
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    const loadData = async () => {
      if (providerId) {
        await fetchCategories();
      }
    };
    loadData();
  }, [providerId]);

  useEffect(() => { 
    if (providerId && Object.keys(categories).length > 0) {
      fetchBookings();
    }
  }, [currentPage, itemsPerPage, searchQuery, providerId, categories]);

  /* ================= SEARCH ================= */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  /* ================= UPDATE BOOKING STATUS ================= */
  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      const response = await axios.patch(`${baseurl}/service-bookings/${bookingId}/`, {
        booking_status: newStatus
      });
      
      if (response.status === 200 || response.status === 202) {
        // Update local state
        setBookings(prevBookings => 
          prevBookings.map(booking => 
            booking.booking_id === bookingId 
              ? { ...booking, booking_status: newStatus }
              : booking
          )
        );
        setFilteredBookings(prevFiltered => 
          prevFiltered.map(booking => 
            booking.booking_id === bookingId 
              ? { ...booking, booking_status: newStatus }
              : booking
          )
        );
        
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: `Booking status updated to ${newStatus}`,
          confirmButtonColor: '#273c75',
          timer: 2000,
          showConfirmButton: false
        });
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

  /* ================= UPDATE PAYMENT STATUS ================= */
  const handleUpdatePaymentStatus = async (bookingId, newStatus) => {
    try {
      const response = await axios.patch(`${baseurl}/service-bookings/${bookingId}/`, {
        payment_status: newStatus
      });
      
      if (response.status === 200 || response.status === 202) {
        // Update local state
        setBookings(prevBookings => 
          prevBookings.map(booking => 
            booking.booking_id === bookingId 
              ? { ...booking, payment_status: newStatus }
              : booking
          )
        );
        setFilteredBookings(prevFiltered => 
          prevFiltered.map(booking => 
            booking.booking_id === bookingId 
              ? { ...booking, payment_status: newStatus }
              : booking
          )
        );
        
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: `Payment status updated to ${newStatus}`,
          confirmButtonColor: '#273c75',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Could not update payment status. Please try again.',
        confirmButtonColor: '#273c75'
      });
    }
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

  // Show loading state while fetching providerId or bookings
  if (loading && !providerId) {
    return (
      <>
        <AgentNavbar />
        <div className="page-container" style={{ textAlign: 'center', padding: '50px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading provider information...</p>
        </div>
      </>
    );
  }

  if (!providerId && !loading) {
    return (
      <>
        <AgentNavbar />
        <div className="page-container" style={{ textAlign: 'center', padding: '50px' }}>
          <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '48px', color: '#ffc107' }}></i>
          <h3 className="mt-3">Unable to load provider information</h3>
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
    <div>
      <AgentNavbar />

      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <h2>Service Bookings</h2>
          <p className="text-muted">Provider ID: {providerId}</p>
        </div>

        {/* Toolbar */}
        <div className="page-toolbar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by Booking ID, Category, Address or Notes..."
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

        {/* Scrollable Table Container - FIXED */}
        <div className="table-card" style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflowX: 'auto',
          overflowY: 'auto',
          maxWidth: '100%',
          position: 'relative'
        }}>
          <table className="data-table" style={{
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: '1400px', // Ensures horizontal scroll on smaller screens
            tableLayout: 'auto'
          }}>
            <thead>
              <tr style={{
                backgroundColor: '#f8f9fa',
                borderBottom: '2px solid #dee2e6'
              }}>
                <th style={{ padding: '12px', textAlign: 'left', whiteSpace: 'nowrap' }}>S.No.</th>
                <th style={{ padding: '12px', textAlign: 'left', whiteSpace: 'nowrap' }}>Booking ID</th>
                <th style={{ padding: '12px', textAlign: 'left', whiteSpace: 'nowrap' }}>Customer Name</th>
                <th style={{ padding: '12px', textAlign: 'left', whiteSpace: 'nowrap' }}>Service Category</th>
                <th style={{ padding: '12px', textAlign: 'left', whiteSpace: 'nowrap' }}>Charge Type</th>
                <th style={{ padding: '12px', textAlign: 'left', whiteSpace: 'nowrap' }}>Booking Date</th>
                <th style={{ padding: '12px', textAlign: 'left', whiteSpace: 'nowrap' }}>Service Start</th>
                <th style={{ padding: '12px', textAlign: 'left', whiteSpace: 'nowrap' }}>Service End</th>
                <th style={{ padding: '12px', textAlign: 'left', whiteSpace: 'nowrap' }}>Duration</th>
                <th style={{ padding: '12px', textAlign: 'left', whiteSpace: 'nowrap' }}>Total Amount</th>
                <th style={{ padding: '12px', textAlign: 'left', whiteSpace: 'nowrap' }}>Address</th>
                <th style={{ padding: '12px', textAlign: 'left', whiteSpace: 'nowrap' }}>Notes</th>
                <th style={{ padding: '12px', textAlign: 'left', whiteSpace: 'nowrap' }}>Booking Status</th>
                <th style={{ padding: '12px', textAlign: 'left', whiteSpace: 'nowrap' }}>Payment Status</th>
               </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="14" style={{ textAlign: 'center', padding: '40px' }}>
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
                    <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>{startIndex + index}</td>
                    <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>#{booking.booking_id}</td>
                    <td style={{ padding: '12px', minWidth: '120px', wordBreak: 'break-word' }}>
                      {booking.user?.username || booking.user?.email || `User ID: ${booking.user}` || '-'}
                    </td>
                    <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>
                      <span style={{
                        backgroundColor: '#e8f4f8',
                        color: '#0c5460',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500',
                        whiteSpace: 'nowrap'
                      }}>
                        {booking.category_name}
                      </span>
                    </td>
                    <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>
                      <span style={{
                        backgroundColor: '#fff3cd',
                        color: '#856404',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        whiteSpace: 'nowrap'
                      }}>
                        {getServiceChargeTypeLabel(booking.service_charge_type)}
                      </span>
                    </td>
                    <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>{formatDateTime(booking.booking_date)}</td>
                    <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>{formatDateOnly(booking.service_start_date)}</td>
                    <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>{formatDateOnly(booking.service_end_date)}</td>
                    <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>
                      {booking.number_of_hours ? `${booking.number_of_hours} hour(s)` : 
                       booking.number_of_days ? `${booking.number_of_days} day(s)` : '-'}
                    </td>
                    <td style={{ padding: '12px', whiteSpace: 'nowrap', fontWeight: 'bold', color: '#28a745' }}>
                      {formatCurrency(booking.total_amount)}
                    </td>
                    <td style={{ padding: '12px', minWidth: '200px', maxWidth: '250px', wordBreak: 'break-word' }}>
                      {booking.address || '-'}
                    </td>
                   <td style={{ 
  padding: '12px', 
  minWidth: '150px', 
  maxWidth: '200px', 
  wordBreak: 'break-word',
  whiteSpace: 'normal',
  overflowWrap: 'break-word'
}}>
  <div style={{ 
    maxHeight: '80px', 
    overflowY: 'auto',
    wordBreak: 'break-word',
    whiteSpace: 'normal'
  }}>
    {booking.booking_notes || '-'}
  </div>
</td>
                    <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>
                      <select
                        value={booking.booking_status || 'Pending'}
                        onChange={(e) => handleUpdateBookingStatus(booking.booking_id, e.target.value)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '4px',
                          border: `1px solid ${getStatusBadgeStyle(booking.booking_status).backgroundColor}`,
                          backgroundColor: getStatusBadgeStyle(booking.booking_status).backgroundColor,
                          color: getStatusBadgeStyle(booking.booking_status).color,
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          outline: 'none',
                          width: '110px'
                        }}
                      >
                        {BOOKING_STATUS_OPTIONS.map(status => (
                          <option key={status} value={status} style={{ backgroundColor: 'white', color: '#333' }}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>
                      <select
                        value={booking.payment_status || 'Pending'}
                        onChange={(e) => handleUpdatePaymentStatus(booking.booking_id, e.target.value)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '4px',
                          border: `1px solid ${getPaymentBadgeStyle(booking.payment_status).backgroundColor}`,
                          backgroundColor: getPaymentBadgeStyle(booking.payment_status).backgroundColor,
                          color: getPaymentBadgeStyle(booking.payment_status).color,
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          outline: 'none',
                          width: '100px'
                        }}
                      >
                        {PAYMENT_STATUS_OPTIONS.map(status => (
                          <option key={status} value={status} style={{ backgroundColor: 'white', color: '#333' }}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                   </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="14" style={{ textAlign: 'center', padding: '40px' }}>
                    <i className="bi bi-calendar-x" style={{ fontSize: '48px', color: '#ccc' }}></i>
                    <p className="mt-2">No service bookings found</p>
                    <p className="text-muted small">No bookings have been made for your services yet.</p>
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
              backgroundColor: '#f8f9fa',
              flexWrap: 'wrap',
              gap: '10px'
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
              
              <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
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
    </div>
  );
}

export default AgentServiceBookings;