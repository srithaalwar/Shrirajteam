// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL';
// import Swal from "sweetalert2";

// function AdminPropertyBookings() {

//     const [transactions, setTransactions] = useState([]);
//     const [filteredTransactions, setFilteredTransactions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [error, setError] = useState(null);
//     const [updatingCOD, setUpdatingCOD] = useState(null);
    
//     // Payment Modal States
//     const [showPaymentModal, setShowPaymentModal] = useState(false);
//     const [selectedTransaction, setSelectedTransaction] = useState(null);
//     const [paymentLoading, setPaymentLoading] = useState(false);
//     const [paymentFile, setPaymentFile] = useState(null);
//     const [paymentFormData, setPaymentFormData] = useState({
//         property_name: '',
//         amount: '',
//         remaining_amount: '',
//         payment_mode: '',
//         payment_method: '',
//         order_id: '',
//         transaction_id: '',
//         payment_date: new Date().toISOString().split('T')[0]
//     });
    
//     // Pagination states
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(10);
//     const [totalItems, setTotalItems] = useState(0);
//     const [totalPages, setTotalPages] = useState(1);
    
//     // Payment mode options
//     const PAYMENT_MODES = [
//         { value: 'UPI', label: 'UPI' },
//         { value: 'Card', label: 'Card' },
//         { value: 'Net Banking', label: 'Net Banking' },
//         { value: 'Cash', label: 'Cash' },
//         { value: 'Bank Transfer', label: 'Bank Transfer' }
//     ];
    
//     const PAYMENT_METHODS = [
//         { value: 'Online', label: 'Online' },
//         { value: 'Offline', label: 'Offline' },
//         { value: 'COD', label: 'COD' }
//     ];

//     // Format date for display
//     const formatDateForDisplay = (dateTimeString) => {
//         if (!dateTimeString) return "";
//         try {
//             const [datePart, timePart] = dateTimeString.split(' ');
//             if (datePart && datePart.includes('-')) {
//                 const [day, month, year] = datePart.split('-');
//                 const time = timePart ? timePart.substring(0, 5) : '';
//                 return `${day}/${month}/${year} ${time}`;
//             }
            
//             const date = new Date(dateTimeString);
//             if (isNaN(date.getTime())) return dateTimeString;
            
//             const day = String(date.getDate()).padStart(2, '0');
//             const month = String(date.getMonth() + 1).padStart(2, '0');
//             const year = date.getFullYear();
//             const hours = String(date.getHours()).padStart(2, '0');
//             const minutes = String(date.getMinutes()).padStart(2, '0');
//             return `${day}/${month}/${year} ${hours}:${minutes}`;
//         } catch (error) {
//             console.error("Error formatting date:", error);
//             return dateTimeString;
//         }
//     };

//     // Map payment_mode to more readable values
//     const mapPaymentMode = (paymentMode, paymentMethod) => {
//         if (paymentMethod === 'COD') {
//             return 'COD';
//         }
        
//         const map = {
//             'UPI_COLLECT': 'UPI',
//             'UPI_QR': 'UPI QR',
//             'CARD': 'Card',
//             'NET_BANKING': 'Net Banking',
//             'CREDIT_CARD': 'Credit Card',
//             'DEBIT_CARD': 'Debit Card',
//             'upi': 'UPI',
//             'netbanking': 'Net Banking',
//             'card': 'Card'
//         };
//         return map[paymentMode] || paymentMode || 'N/A';
//     };

//     // Get status badge color based on backend status
//     const getStatusColor = (status) => {
//         switch(status?.toLowerCase()) {
//             case 'success': return '#10b981';
//             case 'pending': return '#f59e0b';
//             case 'failed': return '#ef4444';
//             case 'partial': return '#8b5cf6';
//             default: return '#6b7280';
//         }
//     };

//     // Check if transaction is COD
//     const isCOD = (transaction) => {
//         return transaction.payment_method === 'COD' || transaction.payment_mode === 'COD';
//     };

//     // Handle COD status update
//     const handleCODStatusUpdate = async (orderId, transaction, newStatus) => {
//         if (!orderId) {
//             Swal.fire({
//                 icon: "error",
//                 title: "Error",
//                 text: "Order ID is missing for this transaction",
//             });
//             return;
//         }

//         if (newStatus !== 'success') {
//             Swal.fire({
//                 icon: "info",
//                 title: "Info",
//                 text: "COD payments can only be marked as success",
//             });
//             return;
//         }

//         setUpdatingCOD(transaction.transaction_id);

//         try {
//             const response = await axios.post(`${baseurl}/orders/${orderId}/confirm-cod/`);
            
//             Swal.fire({
//                 icon: "success",
//                 title: "Success",
//                 text: response.data.message || "COD payment confirmed successfully",
//                 timer: 2000,
//                 showConfirmButton: false
//             });
            
//             await fetchTransactions();
            
//         } catch (error) {
//             console.error('Error confirming COD payment:', error);
//             Swal.fire({
//                 icon: "error",
//                 title: "Error",
//                 text: `Failed to confirm COD payment: ${error.response?.data?.message || error.message}`,
//                 confirmButtonColor: "#6C63FF",
//             });
//         } finally {
//             setUpdatingCOD(null);
//         }
//     };

//     // Handle make full payment button click
//     const handleMakeFullPayment = (transaction) => {
//         setSelectedTransaction(transaction);
//         setPaymentFormData({
//             property_name: transaction.property_name,
//             amount: transaction.paid_amount,
//             remaining_amount: transaction.remaining_amount || transaction.paid_amount, // Use remaining_amount from API or fallback to paid_amount
//             payment_mode: '',
//             payment_method: '',
//             order_id: transaction.order || '',
//             transaction_id: transaction.transaction_id,
//             payment_date: new Date().toISOString().split('T')[0]
//         });
//         setPaymentFile(null);
//         setShowPaymentModal(true);
//     };

//     // Handle payment form input change
//     const handlePaymentFormChange = (e) => {
//         const { name, value } = e.target;
//         setPaymentFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     // Handle payment file change
//     const handlePaymentFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             // Check file type
//             const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
//             if (!validTypes.includes(file.type)) {
//                 Swal.fire({
//                     icon: "error",
//                     title: "Invalid File Type",
//                     text: "Please upload PDF, JPG, or PNG files only",
//                 });
//                 return;
//             }

//             // Check file size (max 5MB)
//             if (file.size > 5 * 1024 * 1024) {
//                 Swal.fire({
//                     icon: "error",
//                     title: "File Too Large",
//                     text: "File size should be less than 5MB",
//                 });
//                 return;
//             }

//             setPaymentFile(file);
//         }
//     };

//     // Handle payment submission
//     const handleSubmitPayment = async () => {
//         // Validate form
//         if (!paymentFormData.payment_mode) {
//             Swal.fire({
//                 icon: "error",
//                 title: "Validation Error",
//                 text: "Please select payment mode",
//             });
//             return;
//         }
        
//         if (!paymentFormData.payment_method) {
//             Swal.fire({
//                 icon: "error",
//                 title: "Validation Error",
//                 text: "Please select payment method",
//             });
//             return;
//         }

//         setPaymentLoading(true);

//         try {
//             const formData = new FormData();
//             formData.append('transaction_id', paymentFormData.transaction_id);
//             formData.append('order_id', paymentFormData.order_id);
//             formData.append('payment_mode', paymentFormData.payment_mode);
//             formData.append('payment_method', paymentFormData.payment_method);
//             formData.append('payment_date', paymentFormData.payment_date);
//             formData.append('paid_amount', paymentFormData.remaining_amount); // Send remaining_amount instead of original amount
            
//             if (paymentFile) {
//                 formData.append('payment_proof', paymentFile);
//             }

//             const response = await axios.post(`${baseurl}/transactions/make-full-payment/`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 }
//             });

//             Swal.fire({
//                 icon: "success",
//                 title: "Success",
//                 text: response.data.message || "Full payment processed successfully",
//                 confirmButtonColor: "#6C63FF",
//             });

//             setShowPaymentModal(false);
//             setSelectedTransaction(null);
//             setPaymentFile(null);
//             await fetchTransactions();

//         } catch (error) {
//             console.error('Error processing payment:', error);
//             Swal.fire({
//                 icon: "error",
//                 title: "Payment Failed",
//                 text: error.response?.data?.message || "Failed to process payment",
//                 confirmButtonColor: "#6C63FF",
//             });
//         } finally {
//             setPaymentLoading(false);
//         }
//     };

//     // Fetch transactions from API - Only property related and success status
//     const fetchTransactions = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             let url = `${baseurl}/transactions/`; 
//             const params = new URLSearchParams();
            
//             // Filter only property-related transactions
//             params.append('transaction_for', 'property');
            
//             // Filter only success transactions
//             params.append('status', 'success');
            
//             if (searchQuery.trim()) {
//                 params.append('search', searchQuery.trim());
//             }
            
//             params.append('page', currentPage);
//             params.append('page_size', itemsPerPage);
            
//             const queryString = params.toString();
//             if (queryString) {
//                 url += `?${queryString}`;
//             }
            
//             console.log("Fetching from URL:", url);
            
//             const response = await axios.get(url);
//             console.log('API Response:', response.data);
            
//             let data = [];
//             let count = 0;
            
//             if (response.data && response.data.results) {
//                 data = response.data.results;
//                 count = response.data.count || data.length;
//             } else if (Array.isArray(response.data)) {
//                 data = response.data;
//                 count = response.data.length;
//             } else {
//                 data = [];
//                 count = 0;
//             }
            
//             // Fetch all users to get role information
//             const allUsersResponse = await axios.get(`${baseurl}/users/`);
//             let usersList = [];
//             if (allUsersResponse.data && allUsersResponse.data.results) {
//                 usersList = allUsersResponse.data.results;
//             } else if (Array.isArray(allUsersResponse.data)) {
//                 usersList = allUsersResponse.data;
//             }
            
//             const userRolesMap = new Map();
//             usersList.forEach(user => {
//                 let userRole = 'User';
//                 if (user.roles && user.roles.length > 0) {
//                     userRole = user.roles[0].role_name;
//                 }
//                 userRolesMap.set(user.user_id, userRole);
//             });
            
//             const transformedData = data.map((item) => ({
//                 transaction_id: item.transaction_id,
//                 transaction_date: item.transaction_date,
//                 property_name: item.property_name || 'N/A',
//                 plan_name: item.plan_name || 'N/A',
//                 payment_type: item.payment_type || 'N/A',
//                 transaction_for: item.transaction_for,
//                 paid_amount: item.paid_amount,
//                 remaining_amount: item.remaining_amount || item.paid_amount, // Add remaining amount
//                 payment_mode: mapPaymentMode(item.payment_mode, item.payment_method),
//                 payment_method: item.payment_method || 'N/A',
//                 role: userRolesMap.get(item.user_id) || 'User',
//                 username: item.username || `user_${item.user_id}`,
//                 user_id: item.user_id,
//                 phone_pe_merchant_order_id: item.phone_pe_merchant_order_id,
//                 phone_pe_order_id: item.phone_pe_order_id,
//                 phone_pe_transaction_id: item.phone_pe_transaction_id,
//                 document_file: item.document_file,
//                 document_number: item.document_number,
//                 status: item.status,
//                 order: item.order,
//                 displayDate: formatDateForDisplay(item.transaction_date || ""),
//                 api_data: item
//             }));
            
//             console.log("Transformed Data with Roles:", transformedData);
            
//             setTransactions(transformedData);
//             setFilteredTransactions(transformedData);
//             setTotalItems(count);
            
//             const calculatedPages = Math.ceil(count / itemsPerPage);
//             setTotalPages(calculatedPages || 1);
            
//         } catch (error) {
//             console.error('Error fetching transactions:', error);
//             setError(`Failed to fetch transactions: ${error.message}`);
//             Swal.fire({
//                 icon: "error",
//                 title: "Error",
//                 text: `Failed to load transactions: ${error.response?.data?.message || error.message}`,
//                 confirmButtonColor: "#6C63FF",
//             });
//             setTransactions([]);
//             setFilteredTransactions([]);
//             setTotalItems(0);
//             setTotalPages(1);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Fetch data when filters or pagination changes
//     useEffect(() => {
//         fetchTransactions();
//     }, [currentPage, itemsPerPage, searchQuery]);

//     // Generate page numbers
//     const getPageNumbers = () => {
//         const pageNumbers = [];
//         const maxVisiblePages = 5;
        
//         if (totalPages <= maxVisiblePages) {
//             for (let i = 1; i <= totalPages; i++) {
//                 pageNumbers.push(i);
//             }
//         } else {
//             let startPage = Math.max(1, currentPage - 2);
//             let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            
//             if (endPage - startPage + 1 < maxVisiblePages) {
//                 startPage = Math.max(1, endPage - maxVisiblePages + 1);
//             }
            
//             for (let i = startPage; i <= endPage; i++) {
//                 pageNumbers.push(i);
//             }
//         }
        
//         return pageNumbers;
//     };

//     // Handle page change
//     const handlePageChange = (pageNumber) => {
//         if (pageNumber >= 1 && pageNumber <= totalPages) {
//             setCurrentPage(pageNumber);
//         }
//     };

//     // Handle items per page change
//     const handleItemsPerPageChange = (e) => {
//         const value = parseInt(e.target.value);
//         setItemsPerPage(value);
//         setCurrentPage(1);
//     };

//     // Export to Excel
//     const exportToExcel = () => {
//         if (filteredTransactions.length === 0) {
//             Swal.fire({
//                 icon: "warning",
//                 title: "No Data",
//                 text: "There is no data to export.",
//             });
//             return;
//         }

//         const headers = [
//             "S.No", "Transaction ID", "Order ID", "Transaction Date", "Property Name",
//             "Plan Name", "Payment Type", "Paid Amount", "Remaining Amount", "Payment Mode",
//             "Payment Method", "Role", "User ID", "Status"
//         ];

//         const csvContent = [
//             headers.join(","),
//             ...filteredTransactions.map((item, index) =>
//                 [
//                     index + 1,
//                     item.transaction_id,
//                     item.order || '',
//                     `"${item.displayDate}"`,
//                     `"${item.property_name}"`,
//                     `"${item.plan_name}"`,
//                     `"${item.payment_type}"`,
//                     `"${parseFloat(item.paid_amount).toLocaleString('en-IN')}"`,
//                     `"${parseFloat(item.remaining_amount).toLocaleString('en-IN')}"`,
//                     `"${item.payment_mode}"`,
//                     `"${item.payment_method}"`,
//                     `"${item.role}"`,
//                     `"${item.user_id}"`,
//                     `"${item.status}"`
//                 ].join(",")
//             )
//         ].join("\n");

//         const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//         const link = document.createElement("a");
//         const url = URL.createObjectURL(blob);
//         const timestamp = new Date().toISOString().split("T")[0];

//         link.setAttribute("href", url);
//         link.setAttribute("download", `property_transactions_${timestamp}.csv`);
//         link.style.visibility = "hidden";
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);

//         Swal.fire({
//             icon: "success",
//             title: "Export Successful",
//             text: `Exported ${filteredTransactions.length} property transactions to CSV file.`,
//             timer: 2000,
//             showConfirmButton: false
//         });
//     };

//     // Handle search change
//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//         setCurrentPage(1);
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === 'Enter') {
//             fetchTransactions();
//         }
//     };

//     const handleRefresh = () => {
//         fetchTransactions();
//     };

//     const searchPlaceholder = "Search by ID, order ID, property, plan, payment type, amount, status, payment mode...";

//     // Format payment type for display
//     const formatPaymentType = (paymentType) => {
//         if (!paymentType || paymentType === 'null' || paymentType === 'N/A') {
//             return <span className="text-muted">-</span>;
//         }
//         return (
//             <span className="payment-type-badge">
//                 {paymentType.charAt(0).toUpperCase() + paymentType.slice(1)}
//             </span>
//         );
//     };

//     // Render status cell with dropdown for COD transactions
//     const renderStatusCell = (transaction) => {
//         return (
//             <span 
//                 className="status-badge"
//                 style={{ 
//                     backgroundColor: `${getStatusColor(transaction.status)}20`,
//                     color: getStatusColor(transaction.status),
//                     padding: '4px 8px',
//                     borderRadius: '4px',
//                     fontSize: '12px',
//                     fontWeight: '500',
//                     display: 'inline-block',
//                     textTransform: 'capitalize'
//                 }}
//             >
//                 {transaction.status}
//             </span>
//         );
//     };

//     // Render actions cell with make payment button for success transactions
//     const renderActionsCell = (transaction) => {
//         // Show Make Payment button for success transactions
//         if (transaction.status === 'success') {
//             return (
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     <button
//                         onClick={() => handleMakeFullPayment(transaction)}
//                         style={{
//                             padding: '6px 12px',
//                             backgroundColor: '#10b981',
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '4px',
//                             fontSize: '12px',
//                             cursor: 'pointer',
//                             fontWeight: '500',
//                             whiteSpace: 'nowrap'
//                         }}
//                     >
//                         💰 Make Full Payment
//                     </button>
//                 </div>
//             );
//         }
//         return <span style={{ color: '#999' }}>-</span>;
//     };

//     return (
//         <>
//             <AdminNavbar />

//             <div className="staff-page">
//                 {/* Header */}
//                 <div className="staff-header">
//                     <h2>Property Bookings</h2>
//                     <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
//                         Total Successful Property Bookings: {totalItems}
//                     </div>
//                     <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
//                         <button 
//                             className="btn btn-primary btn-sm"
//                             onClick={handleRefresh}
//                             style={{ 
//                                 backgroundColor: '#273c75',
//                                 borderColor: '#273c75'
//                             }}
//                         >
//                             Refresh
//                         </button>
//                     </div>
//                 </div>

//                 {/* Error Message */}
//                 {error && (
//                     <div className="alert alert-danger" role="alert" style={{ margin: '16px' }}>
//                         {error}
//                         <button 
//                             type="button" 
//                             className="btn btn-link" 
//                             onClick={handleRefresh}
//                             style={{ marginLeft: '10px', padding: 0 }}
//                         >
//                             Try Again
//                         </button>
//                     </div>
//                 )}

//                 {/* Toolbar */}
//                 <div className="staff-toolbar">
//                     <div className="toolbar-left">
//                         {/* Search Box */}
//                         <div className="search-box" style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
//                             <input
//                                 type="text"
//                                 placeholder={searchPlaceholder}
//                                 value={searchQuery}
//                                 onChange={handleSearchChange}
//                                 onKeyPress={handleKeyPress}
//                                 style={{
//                                     padding: '8px 12px 8px 40px',
//                                     border: '1px solid #ddd',
//                                     borderRadius: '4px',
//                                     fontSize: '14px',
//                                     width: '100%',
//                                 }}
//                             />
//                             <span style={{
//                                 position: 'absolute',
//                                 left: '12px',
//                                 top: '50%',
//                                 transform: 'translateY(-50%)',
//                                 color: '#666',
//                                 fontSize: '16px'
//                             }}>
//                                 🔍
//                             </span>
//                             {searchQuery && (
//                                 <button 
//                                     className="clear-search"
//                                     onClick={() => setSearchQuery("")}
//                                     style={{
//                                         position: 'absolute',
//                                         right: '12px',
//                                         top: '50%',
//                                         transform: 'translateY(-50%)',
//                                         background: 'transparent',
//                                         border: 'none',
//                                         cursor: 'pointer',
//                                         color: '#666',
//                                         fontSize: '16px'
//                                     }}
//                                     title="Clear search"
//                                 >
//                                     ✕
//                                 </button>
//                             )}
//                         </div>
//                     </div>

//                     <div className="toolbar-right">
//                         <button 
//                             className="export-btn"
//                             style={{
//                                 backgroundColor: '#273c75',
//                                 color: 'white',
//                                 padding: '8px 16px',
//                                 borderRadius: '4px',
//                                 fontSize: '14px',
//                                 cursor: 'pointer',
//                                 fontWeight: '500',
//                                 border: 'none'
//                             }}
//                             onClick={exportToExcel}
//                             disabled={loading || filteredTransactions.length === 0}
//                         >
//                             {loading ? 'Loading...' : 'Export Excel'}
//                         </button>
//                     </div>
//                 </div>

//                 {/* Table */}
//                 <div className="staff-table-wrapper">
//                     <table className="staff-table">
//                         <thead>
//                             <tr>
//                                 <th>S.No.</th>
//                                 <th>TRANSACTION ID</th>
//                                 <th>ORDER ID</th>
//                                 <th>DATE & TIME</th>
//                                 <th>PROPERTY NAME</th>
//                                 <th>PLAN NAME</th>
//                                 <th>PAYMENT TYPE</th>
//                                 <th>PAID AMOUNT</th>
//                                 <th>REMAINING AMOUNT</th>
//                                 <th>PAYMENT MODE</th>
//                                 <th>PAYMENT METHOD</th>
//                                 <th>ROLE</th>
//                                 <th>USER ID</th>
//                                 <th>STATUS</th>
//                                 <th>RECEIPT</th>
//                                 <th>DOCUMENT NO.</th>
//                                 <th>ACTIONS</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {loading ? (
//                                 <tr>
//                                     <td colSpan="17" className="no-data">
//                                         <div className="text-center py-4">
//                                             <div className="spinner-border text-primary" role="status">
//                                                 <span className="visually-hidden">Loading...</span>
//                                             </div>
//                                             <p className="mt-2">Loading property bookings...</p>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ) : filteredTransactions.length > 0 ? (
//                                 filteredTransactions.map((transaction, index) => (
//                                     <tr key={transaction.transaction_id}>
//                                         <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
//                                         <td className="transaction-id">
//                                             <strong>{transaction.transaction_id}</strong>
//                                         </td>
//                                         <td>
//                                             {transaction.order ? (
//                                                 <span className="order-badge">{transaction.order}</span>
//                                             ) : (
//                                                 <span className="text-muted">-</span>
//                                             )}
//                                         </td>
//                                         <td>{transaction.displayDate}</td>
//                                         <td className="property-cell">
//                                             <div className="property-name">{transaction.property_name}</div>
//                                         </td>
//                                         <td>
//                                             <span className="plan-badge">{transaction.plan_name}</span>
//                                         </td>
//                                         <td className="payment-type-cell">
//                                             {formatPaymentType(transaction.payment_type)}
//                                         </td>
//                                         <td className="amount-cell">
//                                             <strong>₹{parseFloat(transaction.paid_amount).toLocaleString('en-IN')}</strong>
//                                         </td>
//                                         <td className="amount-cell">
//                                             <strong style={{ color: '#f59e0b' }}>₹{parseFloat(transaction.remaining_amount).toLocaleString('en-IN')}</strong>
//                                         </td>
//                                         <td>
//                                             <span className="mode-badge">{transaction.payment_mode}</span>
//                                         </td>
//                                         <td>
//                                             <span className={`method-badge ${transaction.payment_method === 'COD' ? 'cod' : 'online'}`}>
//                                                 {transaction.payment_method}
//                                             </span>
//                                         </td>
//                                         <td>
//                                             <span className="role-badge">{transaction.role}</span>
//                                         </td>
//                                         <td className="username-cell">{transaction.user_id}</td>
//                                         <td>
//                                             {renderStatusCell(transaction)}
//                                         </td>
//                                         <td className="receipt-cell">
//                                             {transaction.document_file ? (
//                                                 <a
//                                                     href={`${baseurl}${transaction.document_file}`}
//                                                     target="_blank"
//                                                     rel="noopener noreferrer"
//                                                     className="receipt-link"
//                                                 >
//                                                     📄 View
//                                                 </a>
//                                             ) : (
//                                                 <span className="no-receipt">-</span>
//                                             )}
//                                         </td>
//                                         <td className="document-cell">
//                                             {transaction.document_number || '-'}
//                                         </td>
//                                         <td className="actions-cell">
//                                             {renderActionsCell(transaction)}
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="17" className="no-data">
//                                         {error ? (
//                                             <div className="text-center py-4">
//                                                 <p className="text-danger">{error}</p>
//                                                 <button 
//                                                     className="btn btn-primary btn-sm mt-2"
//                                                     onClick={fetchTransactions}
//                                                 >
//                                                     Retry
//                                                 </button>
//                                             </div>
//                                         ) : (
//                                             "No successful property bookings found"
//                                         )}
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Pagination */}
//                 {totalItems > 0 && !loading && (
//                     <div className="pagination-container" style={{
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                         padding: '16px',
//                         borderTop: '1px solid #eee',
//                         backgroundColor: '#f8f9fa'
//                     }}>
//                         <div className="items-per-page" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                             <span style={{ fontSize: '14px', color: '#666' }}>Show:</span>
//                             <select 
//                                 value={itemsPerPage} 
//                                 onChange={handleItemsPerPageChange}
//                                 style={{
//                                     padding: '6px 12px',
//                                     border: '1px solid #ddd',
//                                     borderRadius: '4px',
//                                     fontSize: '14px'
//                                 }}
//                             >
//                                 <option value="5">5</option>
//                                 <option value="10">10</option>
//                                 <option value="20">20</option>
//                                 <option value="50">50</option>
//                                 <option value="100">100</option>
//                             </select>
//                             <span style={{ fontSize: '14px', color: '#666' }}>
//                                 Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
//                             </span>
//                         </div>
                        
//                         <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                             <button
//                                 onClick={() => handlePageChange(1)}
//                                 disabled={currentPage === 1}
//                                 style={{
//                                     padding: '6px 12px',
//                                     border: '1px solid #ddd',
//                                     borderRadius: '4px',
//                                     background: currentPage === 1 ? '#f8f9fa' : 'white',
//                                     color: currentPage === 1 ? '#ccc' : '#333',
//                                     cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//                                     fontSize: '14px'
//                                 }}
//                             >
//                                 ««
//                             </button>
                            
//                             <button
//                                 onClick={() => handlePageChange(currentPage - 1)}
//                                 disabled={currentPage === 1}
//                                 style={{
//                                     padding: '6px 12px',
//                                     border: '1px solid #ddd',
//                                     borderRadius: '4px',
//                                     background: currentPage === 1 ? '#f8f9fa' : 'white',
//                                     color: currentPage === 1 ? '#ccc' : '#333',
//                                     cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//                                     fontSize: '14px'
//                                 }}
//                             >
//                                 «
//                             </button>
                            
//                             {getPageNumbers().map(page => (
//                                 <button
//                                     key={page}
//                                     onClick={() => handlePageChange(page)}
//                                     style={{
//                                         padding: '6px 12px',
//                                         border: '1px solid #ddd',
//                                         borderRadius: '4px',
//                                         background: currentPage === page ? '#273c75' : 'white',
//                                         color: currentPage === page ? 'white' : '#333',
//                                         cursor: 'pointer',
//                                         fontSize: '14px',
//                                         fontWeight: currentPage === page ? 'bold' : 'normal'
//                                     }}
//                                 >
//                                     {page}
//                                 </button>
//                             ))}
                            
//                             <button
//                                 onClick={() => handlePageChange(currentPage + 1)}
//                                 disabled={currentPage === totalPages}
//                                 style={{
//                                     padding: '6px 12px',
//                                     border: '1px solid #ddd',
//                                     borderRadius: '4px',
//                                     background: currentPage === totalPages ? '#f8f9fa' : 'white',
//                                     color: currentPage === totalPages ? '#ccc' : '#333',
//                                     cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
//                                     fontSize: '14px'
//                                 }}
//                             >
//                                 »
//                             </button>
                            
//                             <button
//                                 onClick={() => handlePageChange(totalPages)}
//                                 disabled={currentPage === totalPages}
//                                 style={{
//                                     padding: '6px 12px',
//                                     border: '1px solid #ddd',
//                                     borderRadius: '4px',
//                                     background: currentPage === totalPages ? '#f8f9fa' : 'white',
//                                     color: currentPage === totalPages ? '#ccc' : '#333',
//                                     cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
//                                     fontSize: '14px'
//                                 }}
//                             >
//                                 »»
//                             </button>
//                         </div>
                        
//                         <div className="page-info" style={{ fontSize: '14px', color: '#666' }}>
//                             Page {currentPage} of {totalPages}
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* Payment Modal - Updated with Remaining Amount */}
//             {showPaymentModal && (
//                 <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
//                     <div className="modal-dialog modal-lg">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Make Full Payment</h5>
//                                 <button
//                                     type="button"
//                                     className="btn-close"
//                                     onClick={() => {
//                                         setShowPaymentModal(false);
//                                         setSelectedTransaction(null);
//                                         setPaymentFile(null);
//                                     }}
//                                 ></button>
//                             </div>
//                             <div className="modal-body">
//                                 <form>
//                                     {/* Property Name - Readonly */}
//                                     <div className="mb-3">
//                                         <label className="form-label">Property Name</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             value={paymentFormData.property_name}
//                                             readOnly
//                                             style={{ backgroundColor: '#f8f9fa' }}
//                                         />
//                                     </div>

//                                     {/* Paid Amount - Readonly */}
//                                     <div className="mb-3">
//                                         <label className="form-label">Paid Amount (₹)</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             value={`₹${parseFloat(paymentFormData.amount).toLocaleString('en-IN')}`}
//                                             readOnly
//                                             style={{ backgroundColor: '#f8f9fa' }}
//                                         />
//                                     </div>

//                                     {/* Remaining Amount - Readonly */}
//                                     <div className="mb-3">
//                                         <label className="form-label">Remaining Amount (₹)</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             value={`₹${parseFloat(paymentFormData.remaining_amount).toLocaleString('en-IN')}`}
//                                             readOnly
//                                             style={{ backgroundColor: '#fef3c7', color: '#d97706', fontWeight: 'bold' }}
//                                         />
//                                         <small className="text-muted">This is the amount to be paid</small>
//                                     </div>

//                                     <div className="row">
//                                         {/* Payment Mode */}
//                                         <div className="col-md-6 mb-3">
//                                             <label className="form-label">Payment Mode *</label>
//                                             <select
//                                                 name="payment_mode"
//                                                 className="form-control"
//                                                 value={paymentFormData.payment_mode}
//                                                 onChange={handlePaymentFormChange}
//                                                 required
//                                             >
//                                                 <option value="">Select Payment Mode</option>
//                                                 {PAYMENT_MODES.map(mode => (
//                                                     <option key={mode.value} value={mode.value}>
//                                                         {mode.label}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                         </div>

//                                         {/* Payment Method */}
//                                         <div className="col-md-6 mb-3">
//                                             <label className="form-label">Payment Method *</label>
//                                             <select
//                                                 name="payment_method"
//                                                 className="form-control"
//                                                 value={paymentFormData.payment_method}
//                                                 onChange={handlePaymentFormChange}
//                                                 required
//                                             >
//                                                 <option value="">Select Payment Method</option>
//                                                 {PAYMENT_METHODS.map(method => (
//                                                     <option key={method.value} value={method.value}>
//                                                         {method.label}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                         </div>
//                                     </div>

//                                     {/* Payment Date */}
//                                     <div className="mb-3">
//                                         <label className="form-label">Payment Date</label>
//                                         <input
//                                             type="date"
//                                             name="payment_date"
//                                             className="form-control"
//                                             value={paymentFormData.payment_date}
//                                             onChange={handlePaymentFormChange}
//                                         />
//                                     </div>

//                                     {/* Upload Files */}
//                                     <div className="mb-3">
//                                         <label className="form-label">Upload Payment Proof</label>
//                                         <input
//                                             type="file"
//                                             className="form-control"
//                                             onChange={handlePaymentFileChange}
//                                             accept=".pdf,.jpg,.jpeg,.png"
//                                         />
//                                         <small className="text-muted">Supported formats: PDF, JPG, PNG (Max 5MB)</small>
//                                         {paymentFile && (
//                                             <div className="mt-2">
//                                                 <span className="badge bg-success">File selected: {paymentFile.name}</span>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </form>
//                             </div>
//                             <div className="modal-footer">
//                                 <button
//                                     type="button"
//                                     className="btn btn-secondary"
//                                     onClick={() => {
//                                         setShowPaymentModal(false);
//                                         setSelectedTransaction(null);
//                                         setPaymentFile(null);
//                                     }}
//                                     disabled={paymentLoading}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className="btn btn-success"
//                                     onClick={handleSubmitPayment}
//                                     disabled={paymentLoading}
//                                 >
//                                     {paymentLoading ? (
//                                         <>
//                                             <span className="spinner-border spinner-border-sm me-2"></span>
//                                             Processing...
//                                         </>
//                                     ) : (
//                                         'Confirm Payment'
//                                     )}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <style jsx>{`
//                 .method-badge {
//                     padding: 4px 8px;
//                     border-radius: 4px;
//                     font-size: 12px;
//                     font-weight: 500;
//                 }
//                 .method-badge.cod {
//                     background-color: #fef3c7;
//                     color: #d97706;
//                 }
//                 .method-badge.online {
//                     background-color: #e0f2fe;
//                     color: #0284c7;
//                 }
//                 .payment-type-badge {
//                     padding: 4px 8px;
//                     border-radius: 4px;
//                     font-size: 12px;
//                     font-weight: 500;
//                     background-color: #e0e7ff;
//                     color: #4338ca;
//                     display: inline-block;
//                 }
//                 .order-badge {
//                     background-color: #f3f4f6;
//                     color: #374151;
//                     padding: 4px 8px;
//                     border-radius: 4px;
//                     font-size: 12px;
//                     font-weight: 500;
//                 }
//                 .status-badge {
//                     padding: 4px 8px;
//                     border-radius: 4px;
//                     font-size: 12px;
//                     font-weight: 500;
//                     display: inline-block;
//                 }
//                 .role-badge {
//                     padding: 4px 8px;
//                     border-radius: 4px;
//                     font-size: 12px;
//                     font-weight: 500;
//                     background-color: #e0e7ff;
//                     color: #4338ca;
//                 }
//                 .staff-table-wrapper {
//                     overflow-x: auto;
//                     padding: 0 20px;
//                 }
//                 .staff-table {
//                     width: 100%;
//                     border-collapse: collapse;
//                 }
//                 .staff-table th,
//                 .staff-table td {
//                     padding: 12px;
//                     text-align: left;
//                     border-bottom: 1px solid #eee;
//                 }
//                 .staff-table th {
//                     background-color: #f8f9fa;
//                     font-weight: 600;
//                     font-size: 12px;
//                     text-transform: uppercase;
//                     color: #666;
//                 }
//                 .staff-header {
//                     padding: 20px;
//                     border-bottom: 1px solid #eee;
//                 }
//                 .staff-toolbar {
//                     display: flex;
//                     justify-content: space-between;
//                     padding: 20px;
//                     gap: 20px;
//                 }
//                 .toolbar-left {
//                     flex: 1;
//                 }
//                 .modal {
//                     position: fixed;
//                     top: 0;
//                     left: 0;
//                     width: 100%;
//                     height: 100%;
//                     overflow: auto;
//                 }
//                 .text-muted {
//                     color: #999;
//                 }
//             `}</style>
//         </>
//     );
// }

// export default AdminPropertyBookings;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
import { baseurl } from '../../BaseURL/BaseURL';
import Swal from "sweetalert2";

function AdminPropertyBookings() {

    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
    const [updatingCOD, setUpdatingCOD] = useState(null);
    
    // Payment Modal States
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentFile, setPaymentFile] = useState(null);
    const [paymentFormData, setPaymentFormData] = useState({
        property_name: '',
        property_id: '',
        user_id: '',
        paid_amount: '',
        remaining_amount: '',
        payment_type: 'Full-Amount', // Default to Full-Amount
        payment_mode: '',
        payment_method: '',
        cash_reference: '',
        payment_date: new Date().toISOString().split('T')[0]
    });
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    
    // Payment mode options
    const PAYMENT_MODES = [
        { value: 'CASH', label: 'Cash' },
        { value: 'BANK_TRANSFER', label: 'Bank Transfer' },
        { value: 'CHEQUE', label: 'Cheque' }
    ];
    
    const PAYMENT_METHODS = [
        { value: 'Cash', label: 'Cash' },
        { value: 'Offline', label: 'Offline' }
    ];

    // Format date for display
    const formatDateForDisplay = (dateTimeString) => {
        if (!dateTimeString) return "";
        try {
            const [datePart, timePart] = dateTimeString.split(' ');
            if (datePart && datePart.includes('-')) {
                const [day, month, year] = datePart.split('-');
                const time = timePart ? timePart.substring(0, 5) : '';
                return `${day}/${month}/${year} ${time}`;
            }
            
            const date = new Date(dateTimeString);
            if (isNaN(date.getTime())) return dateTimeString;
            
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${day}/${month}/${year} ${hours}:${minutes}`;
        } catch (error) {
            console.error("Error formatting date:", error);
            return dateTimeString;
        }
    };

    // Map payment_mode to more readable values
    const mapPaymentMode = (paymentMode, paymentMethod) => {
        if (paymentMethod === 'COD') {
            return 'COD';
        }
        
        const map = {
            'UPI_COLLECT': 'UPI',
            'UPI_QR': 'UPI QR',
            'CARD': 'Card',
            'NET_BANKING': 'Net Banking',
            'CREDIT_CARD': 'Credit Card',
            'DEBIT_CARD': 'Debit Card',
            'ONLINE': 'Online',
            'CASH': 'Cash',
            'BANK_TRANSFER': 'Bank Transfer',
            'CHEQUE': 'Cheque',
            'upi': 'UPI',
            'netbanking': 'Net Banking',
            'card': 'Card'
        };
        return map[paymentMode] || paymentMode || 'N/A';
    };

    // Get status badge color based on backend status
    const getStatusColor = (status) => {
        switch(status?.toLowerCase()) {
            case 'success': return '#10b981';
            case 'pending': return '#f59e0b';
            case 'failed': return '#ef4444';
            case 'partial': return '#8b5cf6';
            default: return '#6b7280';
        }
    };

    // Check if transaction is COD
    const isCOD = (transaction) => {
        return transaction.payment_method === 'COD' || transaction.payment_mode === 'COD';
    };

    // Handle COD status update
    const handleCODStatusUpdate = async (orderId, transaction, newStatus) => {
        if (!orderId) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Order ID is missing for this transaction",
            });
            return;
        }

        if (newStatus !== 'success') {
            Swal.fire({
                icon: "info",
                title: "Info",
                text: "COD payments can only be marked as success",
            });
            return;
        }

        setUpdatingCOD(transaction.transaction_id);

        try {
            const response = await axios.post(`${baseurl}/orders/${orderId}/confirm-cod/`);
            
            Swal.fire({
                icon: "success",
                title: "Success",
                text: response.data.message || "COD payment confirmed successfully",
                timer: 2000,
                showConfirmButton: false
            });
            
            await fetchTransactions();
            
        } catch (error) {
            console.error('Error confirming COD payment:', error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `Failed to confirm COD payment: ${error.response?.data?.message || error.message}`,
                confirmButtonColor: "#6C63FF",
            });
        } finally {
            setUpdatingCOD(null);
        }
    };

    // Handle make full payment button click
    const handleMakeFullPayment = (transaction) => {
        setSelectedTransaction(transaction);
        setPaymentFormData({
            property_name: transaction.property_name,
            property_id: transaction.property_id || '',
            user_id: transaction.user_id,
            paid_amount: transaction.paid_amount,
            remaining_amount: transaction.remaining_amount || transaction.paid_amount,
            payment_type: 'Full-Amount',
            payment_mode: '',
            payment_method: 'Cash',
            cash_reference: '',
            payment_date: new Date().toISOString().split('T')[0]
        });
        setPaymentFile(null);
        setShowPaymentModal(true);
    };

    // Handle payment form input change
    const handlePaymentFormChange = (e) => {
        const { name, value } = e.target;
        setPaymentFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle payment file change
    const handlePaymentFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file type
            const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                Swal.fire({
                    icon: "error",
                    title: "Invalid File Type",
                    text: "Please upload PDF, JPG, or PNG files only",
                });
                return;
            }

            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                Swal.fire({
                    icon: "error",
                    title: "File Too Large",
                    text: "File size should be less than 5MB",
                });
                return;
            }

            setPaymentFile(file);
        }
    };

    // Handle payment submission - Using PropertyConfirmPaymentAPIView
    const handleSubmitPayment = async () => {
        // Validate form
        if (!paymentFormData.payment_method) {
            Swal.fire({
                icon: "error",
                title: "Validation Error",
                text: "Please select payment method",
            });
            return;
        }

        if (!paymentFormData.user_id || !paymentFormData.property_id) {
            Swal.fire({
                icon: "error",
                title: "Validation Error",
                text: "Missing user or property information",
            });
            return;
        }

        setPaymentLoading(true);

        try {
            const formData = new FormData();
            formData.append('user_id', paymentFormData.user_id);
            formData.append('property_id', paymentFormData.property_id);
            formData.append('payment_type', 'Full-Amount');
            formData.append('cash_reference', paymentFormData.cash_reference || `REF_${Date.now()}`);
            
            if (paymentFile) {
                formData.append('cash_receipt', paymentFile);
            }

            // Call the confirm payment API for full cash payment
            const response = await axios.post(`${baseurl}/property/confirm-payment/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            Swal.fire({
                icon: "success",
                title: "Success",
                text: response.data.message || "Full payment processed successfully",
                confirmButtonColor: "#6C63FF",
            });

            setShowPaymentModal(false);
            setSelectedTransaction(null);
            setPaymentFile(null);
            await fetchTransactions();

        } catch (error) {
            console.error('Error processing payment:', error);
            Swal.fire({
                icon: "error",
                title: "Payment Failed",
                text: error.response?.data?.error || error.response?.data?.message || "Failed to process payment",
                confirmButtonColor: "#6C63FF",
            });
        } finally {
            setPaymentLoading(false);
        }
    };

    // Fetch transactions from API - Only property related and success status
    const fetchTransactions = async () => {
        setLoading(true);
        setError(null);
        try {
            let url = `${baseurl}/transactions/`; 
            const params = new URLSearchParams();
            
            // Filter only property-related transactions
            params.append('transaction_for', 'property');
            
            // Filter only success transactions
            params.append('status', 'success');
            
            if (searchQuery.trim()) {
                params.append('search', searchQuery.trim());
            }
            
            params.append('page', currentPage);
            params.append('page_size', itemsPerPage);
            
            const queryString = params.toString();
            if (queryString) {
                url += `?${queryString}`;
            }
            
            console.log("Fetching from URL:", url);
            
            const response = await axios.get(url);
            console.log('API Response:', response.data);
            
            let data = [];
            let count = 0;
            
            if (response.data && response.data.results) {
                data = response.data.results;
                count = response.data.count || data.length;
            } else if (Array.isArray(response.data)) {
                data = response.data;
                count = response.data.length;
            } else {
                data = [];
                count = 0;
            }
            
            // Fetch all users to get role information
            const allUsersResponse = await axios.get(`${baseurl}/users/`);
            let usersList = [];
            if (allUsersResponse.data && allUsersResponse.data.results) {
                usersList = allUsersResponse.data.results;
            } else if (Array.isArray(allUsersResponse.data)) {
                usersList = allUsersResponse.data;
            }
            
            const userRolesMap = new Map();
            usersList.forEach(user => {
                let userRole = 'User';
                if (user.roles && user.roles.length > 0) {
                    userRole = user.roles[0].role_name;
                }
                userRolesMap.set(user.user_id, userRole);
            });
            
            const transformedData = data.map((item) => ({
                transaction_id: item.transaction_id,
                transaction_date: item.transaction_date,
                property_name: item.property_name || 'N/A',
                property_id: item.property_id,
                plan_name: item.plan_name || 'N/A',
                payment_type: item.payment_type || 'N/A',
                transaction_for: item.transaction_for,
                paid_amount: item.paid_amount,
                remaining_amount: item.remaining_amount || item.paid_amount,
                payment_mode: mapPaymentMode(item.payment_mode, item.payment_method),
                payment_method: item.payment_method || 'N/A',
                role: userRolesMap.get(item.user_id) || 'User',
                username: item.username || `user_${item.user_id}`,
                user_id: item.user_id,
                phone_pe_merchant_order_id: item.phone_pe_merchant_order_id,
                phone_pe_order_id: item.phone_pe_order_id,
                phone_pe_transaction_id: item.phone_pe_transaction_id,
                document_file: item.document_file,
                document_number: item.document_number,
                status: item.status,
                order: item.order,
                displayDate: formatDateForDisplay(item.transaction_date || ""),
                api_data: item
            }));
            
            console.log("Transformed Data with Roles:", transformedData);
            
            setTransactions(transformedData);
            setFilteredTransactions(transformedData);
            setTotalItems(count);
            
            const calculatedPages = Math.ceil(count / itemsPerPage);
            setTotalPages(calculatedPages || 1);
            
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setError(`Failed to fetch transactions: ${error.message}`);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `Failed to load transactions: ${error.response?.data?.message || error.message}`,
                confirmButtonColor: "#6C63FF",
            });
            setTransactions([]);
            setFilteredTransactions([]);
            setTotalItems(0);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data when filters or pagination changes
    useEffect(() => {
        fetchTransactions();
    }, [currentPage, itemsPerPage, searchQuery]);

    // Generate page numbers
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

    // Export to Excel
    const exportToExcel = () => {
        if (filteredTransactions.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "No Data",
                text: "There is no data to export.",
            });
            return;
        }

        const headers = [
            "S.No", "Transaction ID", "Order ID", "Transaction Date", "Property Name",
            "Plan Name", "Payment Type", "Paid Amount", "Remaining Amount", "Payment Mode",
            "Payment Method", "Role", "User ID", "Status"
        ];

        const csvContent = [
            headers.join(","),
            ...filteredTransactions.map((item, index) =>
                [
                    index + 1,
                    item.transaction_id,
                    item.order || '',
                    `"${item.displayDate}"`,
                    `"${item.property_name}"`,
                    `"${item.plan_name}"`,
                    `"${item.payment_type}"`,
                    `"${parseFloat(item.paid_amount).toLocaleString('en-IN')}"`,
                    `"${parseFloat(item.remaining_amount).toLocaleString('en-IN')}"`,
                    `"${item.payment_mode}"`,
                    `"${item.payment_method}"`,
                    `"${item.role}"`,
                    `"${item.user_id}"`,
                    `"${item.status}"`
                ].join(",")
            )
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        const timestamp = new Date().toISOString().split("T")[0];

        link.setAttribute("href", url);
        link.setAttribute("download", `property_transactions_${timestamp}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        Swal.fire({
            icon: "success",
            title: "Export Successful",
            text: `Exported ${filteredTransactions.length} property transactions to CSV file.`,
            timer: 2000,
            showConfirmButton: false
        });
    };

    // Handle search change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchTransactions();
        }
    };

    const handleRefresh = () => {
        fetchTransactions();
    };

    const searchPlaceholder = "Search by ID, order ID, property, plan, payment type, amount, status, payment mode...";

    // Format payment type for display
    const formatPaymentType = (paymentType) => {
        if (!paymentType || paymentType === 'null' || paymentType === 'N/A') {
            return <span className="text-muted">-</span>;
        }
        return (
            <span className="payment-type-badge">
                {paymentType}
            </span>
        );
    };

    // Render status cell with dropdown for COD transactions
    const renderStatusCell = (transaction) => {
        return (
            <span 
                className="status-badge"
                style={{ 
                    backgroundColor: `${getStatusColor(transaction.status)}20`,
                    color: getStatusColor(transaction.status),
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500',
                    display: 'inline-block',
                    textTransform: 'capitalize'
                }}
            >
                {transaction.status}
            </span>
        );
    };

    // Render actions cell with make payment button for success transactions
    const renderActionsCell = (transaction) => {
        // Show Make Payment button for success transactions
        if (transaction.status === 'success') {
            return (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                        onClick={() => handleMakeFullPayment(transaction)}
                        style={{
                            padding: '6px 12px',
                            backgroundColor: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        💰 Make Full Payment
                    </button>
                </div>
            );
        }
        return <span style={{ color: '#999' }}>-</span>;
    };

    return (
        <>
            <AdminNavbar />

            <div className="staff-page">
                {/* Header */}
                <div className="staff-header">
                    <h2>Property Bookings</h2>
                    <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                        Total Successful Property Bookings: {totalItems}
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                        <button 
                            className="btn btn-primary btn-sm"
                            onClick={handleRefresh}
                            style={{ 
                                backgroundColor: '#273c75',
                                borderColor: '#273c75'
                            }}
                        >
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="alert alert-danger" role="alert" style={{ margin: '16px' }}>
                        {error}
                        <button 
                            type="button" 
                            className="btn btn-link" 
                            onClick={handleRefresh}
                            style={{ marginLeft: '10px', padding: 0 }}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Toolbar */}
                <div className="staff-toolbar">
                    <div className="toolbar-left">
                        {/* Search Box */}
                        <div className="search-box" style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyPress={handleKeyPress}
                                style={{
                                    padding: '8px 12px 8px 40px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    width: '100%',
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
                                    className="clear-search"
                                    onClick={() => setSearchQuery("")}
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
                            disabled={loading || filteredTransactions.length === 0}
                        >
                            {loading ? 'Loading...' : 'Export Excel'}
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="staff-table-wrapper">
                    <table className="staff-table">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>TRANSACTION ID</th>
                                <th>ORDER ID</th>
                                <th>DATE & TIME</th>
                                <th>PROPERTY NAME</th>
                                <th>PLAN NAME</th>
                                <th>PAYMENT TYPE</th>
                                <th>PAID AMOUNT</th>
                                <th>REMAINING AMOUNT</th>
                                <th>PAYMENT MODE</th>
                                <th>PAYMENT METHOD</th>
                                <th>ROLE</th>
                                <th>USER ID</th>
                                <th>STATUS</th>
                                <th>RECEIPT</th>
                                <th>DOCUMENT NO.</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="17" className="no-data">
                                        <div className="text-center py-4">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <p className="mt-2">Loading property bookings...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredTransactions.length > 0 ? (
                                filteredTransactions.map((transaction, index) => (
                                    <tr key={transaction.transaction_id}>
                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td className="transaction-id">
                                            <strong>{transaction.transaction_id}</strong>
                                        </td>
                                        <td>
                                            {transaction.order ? (
                                                <span className="order-badge">{transaction.order}</span>
                                            ) : (
                                                <span className="text-muted">-</span>
                                            )}
                                        </td>
                                        <td>{transaction.displayDate}</td>
                                        <td className="property-cell">
                                            <div className="property-name">{transaction.property_name}</div>
                                        </td>
                                        <td>
                                            <span className="plan-badge">{transaction.plan_name}</span>
                                        </td>
                                        <td className="payment-type-cell">
                                            {formatPaymentType(transaction.payment_type)}
                                        </td>
                                        <td className="amount-cell">
                                            <strong>₹{parseFloat(transaction.paid_amount).toLocaleString('en-IN')}</strong>
                                        </td>
                                        <td className="amount-cell">
                                            <strong style={{ color: '#f59e0b' }}>₹{parseFloat(transaction.remaining_amount).toLocaleString('en-IN')}</strong>
                                        </td>
                                        <td>
                                            <span className="mode-badge">{transaction.payment_mode}</span>
                                        </td>
                                        <td>
                                            <span className={`method-badge ${transaction.payment_method === 'COD' ? 'cod' : 'online'}`}>
                                                {transaction.payment_method}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="role-badge">{transaction.role}</span>
                                        </td>
                                        <td className="username-cell">{transaction.user_id}</td>
                                        <td>
                                            {renderStatusCell(transaction)}
                                        </td>
                                        <td className="receipt-cell">
                                            {transaction.document_file ? (
                                                <a
                                                    href={`${baseurl}${transaction.document_file}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="receipt-link"
                                                >
                                                    📄 View
                                                </a>
                                            ) : (
                                                <span className="no-receipt">-</span>
                                            )}
                                        </td>
                                        <td className="document-cell">
                                            {transaction.document_number || '-'}
                                        </td>
                                        <td className="actions-cell">
                                            {renderActionsCell(transaction)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="17" className="no-data">
                                        {error ? (
                                            <div className="text-center py-4">
                                                <p className="text-danger">{error}</p>
                                                <button 
                                                    className="btn btn-primary btn-sm mt-2"
                                                    onClick={fetchTransactions}
                                                >
                                                    Retry
                                                </button>
                                            </div>
                                        ) : (
                                            "No successful property bookings found"
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalItems > 0 && !loading && (
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
                                <option value="100">100</option>
                            </select>
                            <span style={{ fontSize: '14px', color: '#666' }}>
                                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
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

            {/* Payment Modal - Updated to match backend API */}
            {showPaymentModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Make Full Payment - Property Booking</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                        setShowPaymentModal(false);
                                        setSelectedTransaction(null);
                                        setPaymentFile(null);
                                    }}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    {/* Property Name - Readonly */}
                                    <div className="mb-3">
                                        <label className="form-label">Property Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={paymentFormData.property_name}
                                            readOnly
                                            style={{ backgroundColor: '#f8f9fa' }}
                                        />
                                    </div>

                                    {/* User ID - Readonly */}
                                    <div className="mb-3">
                                        <label className="form-label">User ID</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={paymentFormData.user_id}
                                            readOnly
                                            style={{ backgroundColor: '#f8f9fa' }}
                                        />
                                    </div>

                                    {/* Paid Amount - Readonly */}
                                    <div className="mb-3">
                                        <label className="form-label">Already Paid Amount (₹)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={`₹${parseFloat(paymentFormData.paid_amount).toLocaleString('en-IN')}`}
                                            readOnly
                                            style={{ backgroundColor: '#f8f9fa' }}
                                        />
                                    </div>

                                    {/* Remaining Amount - Readonly */}
                                    <div className="mb-3">
                                        <label className="form-label">Remaining Amount to Pay (₹)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={`₹${parseFloat(paymentFormData.remaining_amount).toLocaleString('en-IN')}`}
                                            readOnly
                                            style={{ backgroundColor: '#fef3c7', color: '#d97706', fontWeight: 'bold', fontSize: '18px' }}
                                        />
                                        <small className="text-muted">This is the amount to be paid now</small>
                                    </div>

                                    {/* Payment Type - Readonly */}
                                    <div className="mb-3">
                                        <label className="form-label">Payment Type</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value="Full-Amount"
                                            readOnly
                                            style={{ backgroundColor: '#f8f9fa' }}
                                        />
                                    </div>

                                    {/* Payment Method */}
                                    <div className="mb-3">
                                        <label className="form-label">Payment Method *</label>
                                        <select
                                            name="payment_method"
                                            className="form-control"
                                            value={paymentFormData.payment_method}
                                            onChange={handlePaymentFormChange}
                                            required
                                        >
                                            <option value="Cash">Cash</option>
                                            <option value="Offline">Offline</option>
                                        </select>
                                    </div>

                                    {/* Cash Reference */}
                                    <div className="mb-3">
                                        <label className="form-label">Cash Reference / Transaction ID</label>
                                        <input
                                            type="text"
                                            name="cash_reference"
                                            className="form-control"
                                            value={paymentFormData.cash_reference}
                                            onChange={handlePaymentFormChange}
                                            placeholder="Enter cash receipt number or transaction reference"
                                        />
                                        <small className="text-muted">Optional: Reference number for the cash payment</small>
                                    </div>

                                    {/* Payment Date */}
                                    <div className="mb-3">
                                        <label className="form-label">Payment Date</label>
                                        <input
                                            type="date"
                                            name="payment_date"
                                            className="form-control"
                                            value={paymentFormData.payment_date}
                                            onChange={handlePaymentFormChange}
                                        />
                                    </div>

                                    {/* Upload Cash Receipt */}
                                    <div className="mb-3">
                                        <label className="form-label">Upload Cash Receipt / Payment Proof</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={handlePaymentFileChange}
                                            accept=".pdf,.jpg,.jpeg,.png"
                                        />
                                        <small className="text-muted">Supported formats: PDF, JPG, PNG (Max 5MB)</small>
                                        {paymentFile && (
                                            <div className="mt-2">
                                                <span className="badge bg-success">File selected: {paymentFile.name}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="alert alert-info mt-3">
                                        <strong>Note:</strong> This will process the full payment for this property booking. 
                                        The property status will be updated to "purchased" and an invoice will be generated.
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setShowPaymentModal(false);
                                        setSelectedTransaction(null);
                                        setPaymentFile(null);
                                    }}
                                    disabled={paymentLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleSubmitPayment}
                                    disabled={paymentLoading}
                                >
                                    {paymentLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Processing Payment...
                                        </>
                                    ) : (
                                        'Confirm Full Payment'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .method-badge {
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 500;
                }
                .method-badge.cod {
                    background-color: #fef3c7;
                    color: #d97706;
                }
                .method-badge.online {
                    background-color: #e0f2fe;
                    color: #0284c7;
                }
                .payment-type-badge {
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 500;
                    background-color: #e0e7ff;
                    color: #4338ca;
                    display: inline-block;
                }
                .order-badge {
                    background-color: #f3f4f6;
                    color: #374151;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 500;
                }
                .status-badge {
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 500;
                    display: inline-block;
                }
                .role-badge {
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 500;
                    background-color: #e0e7ff;
                    color: #4338ca;
                }
                .staff-table-wrapper {
                    overflow-x: auto;
                    padding: 0 20px;
                }
                .staff-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .staff-table th,
                .staff-table td {
                    padding: 12px;
                    text-align: left;
                    border-bottom: 1px solid #eee;
                }
                .staff-table th {
                    background-color: #f8f9fa;
                    font-weight: 600;
                    font-size: 12px;
                    text-transform: uppercase;
                    color: #666;
                }
                .staff-header {
                    padding: 20px;
                    border-bottom: 1px solid #eee;
                }
                .staff-toolbar {
                    display: flex;
                    justify-content: space-between;
                    padding: 20px;
                    gap: 20px;
                }
                .toolbar-left {
                    flex: 1;
                }
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                }
                .text-muted {
                    color: #999;
                }
            `}</style>
        </>
    );
}

export default AdminPropertyBookings;