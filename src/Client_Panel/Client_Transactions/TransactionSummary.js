
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './TransactionSummary.css';
// import AgentNavbar from "./../Client_Navbar/Client_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL';
// function ClientTransactionSummary() {
//     const [transactions, setTransactions] = useState([]);
//     const [filteredTransactions, setFilteredTransactions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [filter, setFilter] = useState('all');
//     const [searchQuery, setSearchQuery] = useState('');
    
//     // Pagination states
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(10);

//     // API base URL

//     // Format date from API response (DD-MM-YYYY HH:MM:SS)
//     const formatDateTime = (dateString) => {
//         if (!dateString) return 'N/A';
        
//         try {
//             // Assuming format: "05-02-2026 15:57:05"
//             const [datePart, timePart] = dateString.split(' ');
//             const [day, month, year] = datePart.split('-');
//             const time = timePart.substring(0, 5); // Remove seconds
            
//             // Format: DD/MM/YYYY HH:MM
//             return `${day}/${month}/${year} ${time}`;
//         } catch (error) {
//             console.error('Error parsing date:', dateString, error);
//             return 'Invalid Date';
//         }
//     };

//     // Get status badge color
//     const getStatusColor = (status) => {
//         if (!status) return '#6b7280';
        
//         switch(status.toLowerCase()) {
//             case 'success': return '#10b981';
//             case 'pending': return '#f59e0b';
//             case 'failed': return '#ef4444';
//             case 'completed': return '#10b981';
//             default: return '#6b7280';
//         }
//     };

//     // Format status text
//     const formatStatus = (status) => {
//         if (!status) return 'Unknown';
//         return status.charAt(0).toUpperCase() + status.slice(1);
//     };

//     // Map transaction_for to readable format
//     const mapTransactionFor = (transactionFor) => {
//         if (!transactionFor) return 'N/A';
//         return transactionFor.charAt(0).toUpperCase() + transactionFor.slice(1);
//     };

//     // Get user_id from localStorage
//     const getUserIdFromLocalStorage = () => {
//         try {
//             const userData = localStorage.getItem('userData');
//             if (userData) {
//                 const parsedUserData = JSON.parse(userData);
//                 return parsedUserData.user_id || parsedUserData.id || null;
//             }
            
//             // Try other possible keys
//             return localStorage.getItem('user_id') || 
//                    localStorage.getItem('userId') || 
//                    localStorage.getItem('id') || 
//                    null;
//         } catch (error) {
//             console.error('Error reading user_id from localStorage:', error);
//             return null;
//         }
//     };

//     // Fetch transactions from API
//     const fetchTransactions = async () => {
//         const userId = getUserIdFromLocalStorage();
        
//         if (!userId) {
//             setError('User ID not found. Please login again.');
//             setLoading(false);
//             return;
//         }
        
//         setLoading(true);
//         setError(null);
        
//         try {
//             const response = await axios.get(`${baseurl}/transactions/`, {
//                 params: { user_id: userId },
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // Add authorization header if needed
//                     // 'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             });
            
//             if (response.data && response.data.results) {
//                 const apiTransactions = response.data.results;
                
//                 // Transform API data to match your component structure
//                 const transformedTransactions = apiTransactions.map((tx, index) => ({
//                     transaction_id: tx.transaction_id || tx.order || index + 1,
//                     transaction_date: tx.transaction_date || 'N/A',
//                     property_name: tx.property_name || 'N/A',
//                     plan_name: tx.plan_name || tx.subscription_variant || 'N/A',
//                     payment_type: tx.payment_type || 'Unknown',
//                     transaction_for: tx.transaction_for || 'Unknown',
//                     paid_amount: tx.paid_amount || '0.00',
//                     payment_mode: tx.payment_mode || 'Unknown',
//                     role: tx.role || 'Unknown',
//                     username: `User_${tx.user_id || 'N/A'}`,
//                     user_id: tx.user_id || 'N/A',
//                     phone_pe_merchant_order_id: tx.phone_pe_merchant_order_id || 'N/A',
//                     phone_pe_order_id: tx.phone_pe_order_id || 'N/A',
//                     phone_pe_transaction_id: tx.phone_pe_transaction_id || 'N/A',
//                     document_file: tx.document_file || null,
//                     document_number: tx.document_number || null,
//                     status: tx.status || 'unknown',
//                     // Original API fields (for reference)
//                     _original: tx
//                 }));
                
//                 // Reverse to show newest first
//                 transformedTransactions.sort((a, b) => b.transaction_id - a.transaction_id);
                
//                 setTransactions(transformedTransactions);
//                 setFilteredTransactions(transformedTransactions);
//             } else {
//                 setError('No transactions data received');
//             }
//         } catch (err) {
//             console.error('Error fetching transactions:', err);
            
//             // Handle specific error cases
//             if (err.response) {
//                 if (err.response.status === 401) {
//                     setError('Session expired. Please login again.');
//                 } else if (err.response.status === 403) {
//                     setError('Access denied. Please check your permissions.');
//                 } else if (err.response.status === 404) {
//                     setError('No transactions found for this user.');
//                 } else {
//                     setError(`Error ${err.response.status}: Failed to fetch transactions.`);
//                 }
//             } else if (err.request) {
//                 setError('Network error. Please check your connection.');
//             } else {
//                 setError('Failed to fetch transactions. Please try again later.');
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Fetch transactions on component mount
//     useEffect(() => {
//         fetchTransactions();
//     }, []);

//     // Apply filters and search
//     useEffect(() => {
//         let result = [...transactions];

//         // Apply type filter
//         if (filter === 'product') {
//             result = result.filter(item => item.transaction_for === 'product');
//         } else if (filter === 'subscription') {
//             result = result.filter(item => 
//                 item.transaction_for === 'subscription' || 
//                 item.plan_name !== 'N/A' && item.plan_name !== null
//             );
//         } else if (filter === 'success') {
//             result = result.filter(item => item.status === 'success');
//         } else if (filter === 'pending') {
//             result = result.filter(item => item.status === 'pending');
//         }

//         // Apply global search
//         if (searchQuery.trim()) {
//             const searchLower = searchQuery.toLowerCase().trim();
//             result = result.filter(item => {
//                 return (
//                     (item.transaction_id && item.transaction_id.toString().includes(searchLower)) ||
//                     (item.property_name && item.property_name.toLowerCase().includes(searchLower)) ||
//                     (item.plan_name && item.plan_name.toLowerCase().includes(searchLower)) ||
//                     (item.payment_type && item.payment_type.toLowerCase().includes(searchLower)) ||
//                     (item.transaction_for && item.transaction_for.toLowerCase().includes(searchLower)) ||
//                     (item.paid_amount && item.paid_amount.toString().includes(searchQuery)) ||
//                     (item.payment_mode && item.payment_mode.toLowerCase().includes(searchLower)) ||
//                     (item.role && item.role.toLowerCase().includes(searchLower)) ||
//                     (item.username && item.username.toLowerCase().includes(searchLower)) ||
//                     (item.user_id && item.user_id.toString().includes(searchQuery)) ||
//                     (item.phone_pe_merchant_order_id && item.phone_pe_merchant_order_id.toLowerCase().includes(searchLower)) ||
//                     (item.phone_pe_order_id && item.phone_pe_order_id.toLowerCase().includes(searchLower)) ||
//                     (item.phone_pe_transaction_id && item.phone_pe_transaction_id.toLowerCase().includes(searchLower)) ||
//                     (item.status && item.status.toLowerCase().includes(searchLower)) ||
//                     (item.document_number && item.document_number.toLowerCase().includes(searchLower))
//                 );
//             });
//         }

//         setFilteredTransactions(result);
//         setCurrentPage(1); // Reset to first page when filters change
//     }, [filter, searchQuery, transactions]);

//     // Calculate pagination
//     const totalItems = filteredTransactions.length;
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
//     const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

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
//             alert("No data to export");
//             return;
//         }

//         const headers = [
//             "S.No",
//             "Transaction ID",
//             "Transaction Date",
//             "Property Name",
//             "Plan Name",
//             "Transaction For",
//             "Paid Amount",
//             "Payment Mode",
//             "Status",
//             "Document Number",
//             "PhonePe Merchant Order ID",
//             "PhonePe Order ID",
//             "PhonePe Transaction ID",
//             "User ID"
//         ];

//         const csvContent = [
//             headers.join(","),
//             ...filteredTransactions.map((item, index) =>
//                 [
//                     index + 1,
//                     item.transaction_id,
//                     `"${formatDateTime(item.transaction_date)}"`,
//                     `"${item.property_name}"`,
//                     `"${item.plan_name}"`,
//                     `"${mapTransactionFor(item.transaction_for)}"`,
//                     `"₹${parseFloat(item.paid_amount || 0).toLocaleString('en-IN')}"`,
//                     `"${item.payment_mode || 'N/A'}"`,
//                     `"${formatStatus(item.status)}"`,
//                     `"${item.document_number || ''}"`,
//                     `"${item.phone_pe_merchant_order_id || ''}"`,
//                     `"${item.phone_pe_order_id || ''}"`,
//                     `"${item.phone_pe_transaction_id || ''}"`,
//                     item.user_id
//                 ].join(",")
//             )
//         ].join("\n");

//         const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//         const link = document.createElement("a");
//         const url = URL.createObjectURL(blob);
//         const timestamp = new Date().toISOString().split("T")[0];

//         link.setAttribute("href", url);
//         link.setAttribute("download", `transactions_${timestamp}.csv`);
//         link.style.visibility = "hidden";
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     // Handle search change
//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//         setCurrentPage(1);
//     };

//     // Handle filter change
//     const handleFilterChange = (e) => {
//         setFilter(e.target.value);
//         setCurrentPage(1);
//     };

//     // Refresh transactions
//     const handleRefresh = () => {
//         fetchTransactions();
//     };

//     // Calculate totals
//     const totalAmount = filteredTransactions.reduce((sum, item) => {
//         return sum + parseFloat(item.paid_amount || 0);
//     }, 0);

//     const successCount = filteredTransactions.filter(t => t.status === 'success').length;
//     const pendingCount = filteredTransactions.filter(t => t.status === 'pending').length;
//     const failedCount = filteredTransactions.filter(t => t.status === 'failed').length;

//     return (
//         <>
//             <AgentNavbar />

//             <div className="staff-page">
//                 {/* Header with refresh button */}
//                 <div className="staff-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <h2>Transaction Summary</h2>
//                     <button 
//                         onClick={handleRefresh}
//                         style={{
//                             padding: '8px 16px',
//                             backgroundColor: '#273c75',
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '4px',
//                             cursor: 'pointer',
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '8px'
//                         }}
//                     >
//                         🔄 Refresh
//                     </button>
//                 </div>

//                 {/* Error message */}
//                 {error && (
//                     <div className="alert alert-danger" style={{ margin: '16px' }}>
//                         {error} 
//                         <button 
//                             onClick={fetchTransactions}
//                             style={{ marginLeft: '16px', padding: '4px 8px' }}
//                         >
//                             Retry
//                         </button>
//                     </div>
//                 )}

//                 {/* Toolbar */}
//                 <div className="staff-toolbar">
//                     {/* Left Side: Search and Filter */}
//                     <div className="toolbar-left">
//                         {/* Filter Dropdown */}
//                         <div className="filter-container">
//                             <select 
//                                 className="role-filter"
//                                 value={filter}
//                                 onChange={handleFilterChange}
//                             >
//                                 <option value="all">All Transactions</option>
//                                 <option value="product">Product Purchases</option>
//                                 <option value="subscription">Subscriptions</option>
//                                 <option value="success">Success</option>
//                                 <option value="pending">Pending</option>
//                             </select>
//                         </div>

//                         {/* Search Box */}
//                         <div className="search-box">
//                             <input
//                                 type="text"
//                                 placeholder="Search transactions..."
//                                 value={searchQuery}
//                                 onChange={handleSearchChange}
//                             />
//                         </div>
//                     </div>

//                     {/* Right Side: Export Button */}
//                     <div className="toolbar-right">
//                         <button 
//                             className="export-btn"
//                             style={{
//                                 backgroundColor: '#273c75',
//                                 borderColor: '#273c75',
//                                 color: 'white'
//                             }}
//                             onClick={exportToExcel}
//                             disabled={filteredTransactions.length === 0}
//                         >
//                             Export Excel
//                         </button>
//                     </div>
//                 </div>

//                 {/* Summary Cards */}
//                 <div className="summary-cards">
//                     <div className="summary-card">
//                         <div className="card-icon" style={{ background: '#e0f2fe' }}>
//                             <span style={{ color: '#0284c7' }}>💰</span>
//                         </div>
//                         <div className="card-content">
//                             <div className="card-value">{filteredTransactions.length}</div>
//                             <div className="card-label">Total Transactions</div>
//                         </div>
//                     </div>
//                     <div className="summary-card">
//                         <div className="card-icon" style={{ background: '#dcfce7' }}>
//                             <span style={{ color: '#16a34a' }}>₹</span>
//                         </div>
//                         <div className="card-content">
//                             <div className="card-value">
//                                 ₹{totalAmount.toLocaleString('en-IN', { 
//                                     minimumFractionDigits: 2, 
//                                     maximumFractionDigits: 2 
//                                 })}
//                             </div>
//                             <div className="card-label">Total Amount</div>
//                         </div>
//                     </div>
//                     <div className="summary-card">
//                         <div className="card-icon" style={{ background: '#dcfce7' }}>
//                             <span style={{ color: '#16a34a' }}>✓</span>
//                         </div>
//                         <div className="card-content">
//                             <div className="card-value">{successCount}</div>
//                             <div className="card-label">Successful</div>
//                         </div>
//                     </div>
//                     <div className="summary-card">
//                         <div className="card-icon" style={{ background: '#fef3c7' }}>
//                             <span style={{ color: '#d97706' }}>⏳</span>
//                         </div>
//                         <div className="card-content">
//                             <div className="card-value">{pendingCount}</div>
//                             <div className="card-label">Pending</div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Table */}
//                 <div className="staff-table-wrapper">
//                     <table className="staff-table">
//                         <thead>
//                             <tr>
//                                 <th>S.No.</th>
//                                 <th>TRANSACTION ID</th>
//                                 <th>DATE & TIME</th>
//                                 <th>PROPERTY NAME</th>
//                                 <th>PLAN NAME</th>
//                                 <th>TRANSACTION FOR</th>
//                                 <th>AMOUNT</th>
//                                 <th>PAYMENT MODE</th>
//                                 <th>DOCUMENT NO.</th>
//                                 <th>STATUS</th>
//                                 <th>RECEIPT</th>
//                                 <th>PHONEPE ID</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {loading ? (
//                                 <tr>
//                                     <td colSpan="12" className="no-data">
//                                         <div className="loading-spinner">
//                                             Loading transactions...
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ) : error ? (
//                                 <tr>
//                                     <td colSpan="12" className="no-data error">
//                                         {error}
//                                     </td>
//                                 </tr>
//                             ) : currentTransactions.length > 0 ? (
//                                 currentTransactions.map((transaction, index) => (
//                                     <tr key={transaction.transaction_id}>
//                                         <td>{startIndex + index + 1}</td>
//                                         <td className="transaction-id">
//                                             <strong>#{transaction.transaction_id}</strong>
//                                         </td>
//                                         <td>{formatDateTime(transaction.transaction_date)}</td>
//                                         <td className="property-cell">
//                                             <div className="property-name">{transaction.property_name}</div>
//                                         </td>
//                                         <td>
//                                             <span className="plan-badge">{transaction.plan_name}</span>
//                                         </td>
//                                         <td>
//                                             <span className="type-badge">
//                                                 {mapTransactionFor(transaction.transaction_for)}
//                                             </span>
//                                         </td>
//                                         <td className="amount-cell">
//                                             <strong>₹{parseFloat(transaction.paid_amount || 0).toLocaleString('en-IN')}</strong>
//                                         </td>
//                                         <td>
//                                             <span className="mode-badge">{transaction.payment_mode || 'N/A'}</span>
//                                         </td>
//                                         <td>
//                                             {transaction.document_number || '-'}
//                                         </td>
//                                         <td>
//                                             <span 
//                                                 className="status-badge"
//                                                 style={{ 
//                                                     backgroundColor: `${getStatusColor(transaction.status)}20`,
//                                                     color: getStatusColor(transaction.status)
//                                                 }}
//                                             >
//                                                 {formatStatus(transaction.status)}
//                                             </span>
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
//                                         <td className="phonepe-id">
//                                             <small style={{ fontSize: '0.8em', color: '#666' }}>
//                                                 {transaction.phone_pe_order_id || '-'}
//                                             </small>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="12" className="no-data">
//                                         No transactions found
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
                    
//                     {/* Pagination */}
//                     {totalItems > 0 && (
//                         <div className="pagination-container">
//                             {/* Items per page selector */}
//                             <div className="items-per-page">
//                                 <span>Show:</span>
//                                 <select 
//                                     value={itemsPerPage} 
//                                     onChange={handleItemsPerPageChange}
//                                 >
//                                     <option value="5">5</option>
//                                     <option value="10">10</option>
//                                     <option value="20">20</option>
//                                     <option value="50">50</option>
//                                     <option value="100">100</option>
//                                 </select>
//                                 <span>
//                                     Showing {startIndex + 1} to {endIndex} of {totalItems} items
//                                 </span>
//                             </div>
                            
//                             {/* Page navigation */}
//                             <div className="pagination-controls">
//                                 {/* First Page */}
//                                 <button
//                                     onClick={() => handlePageChange(1)}
//                                     disabled={currentPage === 1}
//                                 >
//                                     ««
//                                 </button>
                                
//                                 {/* Previous Page */}
//                                 <button
//                                     onClick={() => handlePageChange(currentPage - 1)}
//                                     disabled={currentPage === 1}
//                                 >
//                                     «
//                                 </button>
                                
//                                 {/* Page Numbers */}
//                                 {getPageNumbers().map(page => (
//                                     <button
//                                         key={page}
//                                         onClick={() => handlePageChange(page)}
//                                         className={currentPage === page ? 'active-page' : ''}
//                                     >
//                                         {page}
//                                     </button>
//                                 ))}
                                
//                                 {/* Next Page */}
//                                 <button
//                                     onClick={() => handlePageChange(currentPage + 1)}
//                                     disabled={currentPage === totalPages}
//                                 >
//                                     »
//                                 </button>
                                
//                                 {/* Last Page */}
//                                 <button
//                                     onClick={() => handlePageChange(totalPages)}
//                                     disabled={currentPage === totalPages}
//                                 >
//                                     »»
//                                 </button>
//                             </div>
                            
//                             {/* Current page info */}
//                             <div className="page-info">
//                                 Page {currentPage} of {totalPages}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }

// export default ClientTransactionSummary;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TransactionSummary.css';
import AgentNavbar from "./../Client_Navbar/Client_Navbar";
import { baseurl } from '../../BaseURL/BaseURL';

function ClientTransactionSummary() {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Format date from API response (DD-MM-YYYY HH:MM:SS)
    const formatDateTime = (dateString) => {
        if (!dateString) return 'N/A';
        
        try {
            // Assuming format: "05-02-2026 15:57:05"
            const [datePart, timePart] = dateString.split(' ');
            const [day, month, year] = datePart.split('-');
            const time = timePart.substring(0, 5); // Remove seconds
            
            // Format: DD/MM/YYYY HH:MM
            return `${day}/${month}/${year} ${time}`;
        } catch (error) {
            console.error('Error parsing date:', dateString, error);
            return 'Invalid Date';
        }
    };

    // Get status badge color
    const getStatusColor = (status) => {
        if (!status) return '#6b7280';
        
        switch(status.toLowerCase()) {
            case 'success': return '#10b981';
            case 'completed': return '#10b981';
            case 'pending': return '#f59e0b';
            case 'failed': return '#ef4444';
            default: return '#6b7280';
        }
    };

    // Format status text
    const formatStatus = (status) => {
        if (!status) return 'Unknown';
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    // Map transaction_for to readable format
    const mapTransactionFor = (transactionFor) => {
        if (!transactionFor) return 'N/A';
        return transactionFor.charAt(0).toUpperCase() + transactionFor.slice(1);
    };

    // Get user_id from localStorage
    const getUserIdFromLocalStorage = () => {
        try {
            const userData = localStorage.getItem('userData');
            if (userData) {
                const parsedUserData = JSON.parse(userData);
                return parsedUserData.user_id || parsedUserData.id || null;
            }
            
            // Try other possible keys
            return localStorage.getItem('user_id') || 
                   localStorage.getItem('userId') || 
                   localStorage.getItem('id') || 
                   null;
        } catch (error) {
            console.error('Error reading user_id from localStorage:', error);
            return null;
        }
    };

    // Fetch transactions from API
    const fetchTransactions = async () => {
        const userId = getUserIdFromLocalStorage();
        
        if (!userId) {
            setError('User ID not found. Please login again.');
            setLoading(false);
            return;
        }
        
        setLoading(true);
        setError(null);
        
        try {
            const response = await axios.get(`${baseurl}/transactions/`, {
                params: { user_id: userId },
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (response.data && response.data.results) {
                const apiTransactions = response.data.results;
                
                // Transform API data to match your component structure
                const transformedTransactions = apiTransactions.map((tx, index) => ({
                    transaction_id: tx.transaction_id || tx.order || index + 1,
                    transaction_date: tx.transaction_date || 'N/A',
                    property_name: tx.property_name || 'N/A',
                    plan_name: tx.plan_name || tx.subscription_variant || 'N/A',
                    payment_type: tx.payment_type || 'Unknown',
                    transaction_for: tx.transaction_for || 'Unknown',
                    paid_amount: tx.paid_amount || '0.00',
                    payment_mode: tx.payment_mode || 'Unknown',
                    role: tx.role || 'Unknown',
                    username: `User_${tx.user_id || 'N/A'}`,
                    user_id: tx.user_id || 'N/A',
                    phone_pe_merchant_order_id: tx.phone_pe_merchant_order_id || 'N/A',
                    phone_pe_order_id: tx.phone_pe_order_id || 'N/A',
                    phone_pe_transaction_id: tx.phone_pe_transaction_id || 'N/A',
                    document_file: tx.document_file || null,
                    document_number: tx.document_number || null,
                    status: tx.status || 'unknown',
                    // Original API fields (for reference)
                    _original: tx
                }));
                
                // Reverse to show newest first
                transformedTransactions.sort((a, b) => b.transaction_id - a.transaction_id);
                
                setTransactions(transformedTransactions);
                setFilteredTransactions(transformedTransactions);
            } else {
                setError('No transactions data received');
            }
        } catch (err) {
            console.error('Error fetching transactions:', err);
            
            // Handle specific error cases
            if (err.response) {
                if (err.response.status === 401) {
                    setError('Session expired. Please login again.');
                } else if (err.response.status === 403) {
                    setError('Access denied. Please check your permissions.');
                } else if (err.response.status === 404) {
                    setError('No transactions found for this user.');
                } else {
                    setError(`Error ${err.response.status}: Failed to fetch transactions.`);
                }
            } else if (err.request) {
                setError('Network error. Please check your connection.');
            } else {
                setError('Failed to fetch transactions. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Fetch transactions on component mount
    useEffect(() => {
        fetchTransactions();
    }, []);

    // Apply filters and search
    useEffect(() => {
        let result = [...transactions];

        // Apply type filter
        if (filter === 'product') {
            result = result.filter(item => item.transaction_for === 'product');
        } else if (filter === 'subscription') {
            result = result.filter(item => 
                item.transaction_for === 'subscription' || 
                (item.plan_name !== 'N/A' && item.plan_name !== null)
            );
        } else if (filter === 'success') {
            result = result.filter(item => item.status === 'success' || item.status === 'completed');
        } else if (filter === 'pending') {
            result = result.filter(item => item.status === 'pending');
        } else if (filter === 'failed') {
            result = result.filter(item => item.status === 'failed');
        }

        // Apply global search
        if (searchQuery.trim()) {
            const searchLower = searchQuery.toLowerCase().trim();
            result = result.filter(item => {
                return (
                    (item.transaction_id && item.transaction_id.toString().includes(searchLower)) ||
                    (item.property_name && item.property_name.toLowerCase().includes(searchLower)) ||
                    (item.plan_name && item.plan_name.toLowerCase().includes(searchLower)) ||
                    (item.payment_type && item.payment_type.toLowerCase().includes(searchLower)) ||
                    (item.transaction_for && item.transaction_for.toLowerCase().includes(searchLower)) ||
                    (item.paid_amount && item.paid_amount.toString().includes(searchQuery)) ||
                    (item.payment_mode && item.payment_mode.toLowerCase().includes(searchLower)) ||
                    (item.role && item.role.toLowerCase().includes(searchLower)) ||
                    (item.username && item.username.toLowerCase().includes(searchLower)) ||
                    (item.user_id && item.user_id.toString().includes(searchQuery)) ||
                    (item.phone_pe_merchant_order_id && item.phone_pe_merchant_order_id.toLowerCase().includes(searchLower)) ||
                    (item.phone_pe_order_id && item.phone_pe_order_id.toLowerCase().includes(searchLower)) ||
                    (item.phone_pe_transaction_id && item.phone_pe_transaction_id.toLowerCase().includes(searchLower)) ||
                    (item.status && item.status.toLowerCase().includes(searchLower)) ||
                    (item.document_number && item.document_number.toLowerCase().includes(searchLower))
                );
            });
        }

        setFilteredTransactions(result);
        setCurrentPage(1); // Reset to first page when filters change
    }, [filter, searchQuery, transactions]);

    // Calculate pagination
    const totalItems = filteredTransactions.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

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
            alert("No data to export");
            return;
        }

        const headers = [
            "S.No",
            "Transaction ID",
            "Transaction Date",
            "Property Name",
            "Plan Name",
            "Transaction For",
            "Paid Amount",
            "Payment Mode",
            "Status",
            "Document Number",
            "PhonePe Merchant Order ID",
            "PhonePe Order ID",
            "PhonePe Transaction ID",
            "User ID"
        ];

        const csvContent = [
            headers.join(","),
            ...filteredTransactions.map((item, index) =>
                [
                    index + 1,
                    item.transaction_id,
                    `"${formatDateTime(item.transaction_date)}"`,
                    `"${item.property_name}"`,
                    `"${item.plan_name}"`,
                    `"${mapTransactionFor(item.transaction_for)}"`,
                    `"₹${parseFloat(item.paid_amount || 0).toLocaleString('en-IN')}"`,
                    `"${item.payment_mode || 'N/A'}"`,
                    `"${formatStatus(item.status)}"`,
                    `"${item.document_number || ''}"`,
                    `"${item.phone_pe_merchant_order_id || ''}"`,
                    `"${item.phone_pe_order_id || ''}"`,
                    `"${item.phone_pe_transaction_id || ''}"`,
                    item.user_id
                ].join(",")
            )
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        const timestamp = new Date().toISOString().split("T")[0];

        link.setAttribute("href", url);
        link.setAttribute("download", `transactions_${timestamp}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Handle search change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    // Handle filter change
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    };

    // Refresh transactions
    const handleRefresh = () => {
        fetchTransactions();
    };

    // Calculate totals - FIXED: Only include successful/completed transactions in total amount
    const completedTransactions = filteredTransactions.filter(t => 
        t.status === 'success' || t.status === 'completed'
    );
    
    const totalAmount = completedTransactions.reduce((sum, item) => {
        return sum + parseFloat(item.paid_amount || 0);
    }, 0);

    const successCount = completedTransactions.length;
    const pendingCount = filteredTransactions.filter(t => t.status === 'pending').length;
    const failedCount = filteredTransactions.filter(t => t.status === 'failed').length;

    return (
        <>
            <AgentNavbar />

            <div className="staff-page">
                {/* Header with refresh button */}
                <div className="staff-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>My Transaction Summary</h2>
                    <button 
                        onClick={handleRefresh}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#273c75',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        🔄 Refresh
                    </button>
                </div>

                {/* Error message */}
                {error && (
                    <div className="alert alert-danger" style={{ margin: '16px' }}>
                        {error} 
                        <button 
                            onClick={fetchTransactions}
                            style={{ marginLeft: '16px', padding: '4px 8px' }}
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Toolbar */}
                <div className="staff-toolbar">
                    {/* Left Side: Search and Filter */}
                    <div className="toolbar-left">
                        {/* Filter Dropdown */}
                        <div className="filter-container">
                            <select 
                                className="role-filter"
                                value={filter}
                                onChange={handleFilterChange}
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    fontSize: '14px'
                                }}
                            >
                                <option value="all">All Transactions</option>
                                <option value="product">Product Purchases</option>
                                <option value="subscription">Subscriptions</option>
                                <option value="success">Successful</option>
                                <option value="pending">Pending</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>

                        {/* Search Box */}
                        <div className="search-box" style={{ position: 'relative', flex: 1 }}>
                            <input
                                type="text"
                                placeholder="Search transactions..."
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
                                color: '#666'
                            }}>
                                🔍
                            </span>
                            {searchQuery && (
                                <button 
                                    onClick={() => setSearchQuery("")}
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#666'
                                    }}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right Side: Export Button */}
                    <div className="toolbar-right">
                        <button 
                            className="export-btn"
                            style={{
                                backgroundColor: '#273c75',
                                borderColor: '#273c75',
                                color: 'white',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                fontSize: '14px',
                                cursor: 'pointer',
                                border: 'none'
                            }}
                            onClick={exportToExcel}
                            disabled={filteredTransactions.length === 0}
                        >
                            Export Excel
                        </button>
                    </div>
                </div>

                {/* Summary Cards - FIXED: Total amount now only shows completed transactions */}
                <div className="summary-cards" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                    margin: '16px 0'
                }}>
                    <div className="summary-card" style={{
                        background: 'white',
                        borderRadius: '8px',
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <div className="card-icon" style={{ 
                            background: '#e0f2fe',
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px'
                        }}>
                            <span style={{ color: '#0284c7' }}>💰</span>
                        </div>
                        <div className="card-content">
                            <div className="card-value" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                {filteredTransactions.length}
                            </div>
                            <div className="card-label" style={{ color: '#666', fontSize: '14px' }}>
                                Total Transactions
                            </div>
                        </div>
                    </div>

                    <div className="summary-card" style={{
                        background: 'white',
                        borderRadius: '8px',
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <div className="card-icon" style={{ 
                            background: '#dcfce7',
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px'
                        }}>
                            <span style={{ color: '#16a34a' }}>✓</span>
                        </div>
                        <div className="card-content">
                            <div className="card-value" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                ₹{totalAmount.toLocaleString('en-IN', { 
                                    minimumFractionDigits: 2, 
                                    maximumFractionDigits: 2 
                                })}
                            </div>
                            <div className="card-label" style={{ color: '#666', fontSize: '14px' }}>
                                Total Amount (Completed)
                            </div>
                        </div>
                    </div>

                    <div className="summary-card" style={{
                        background: 'white',
                        borderRadius: '8px',
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <div className="card-icon" style={{ 
                            background: '#dcfce7',
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px'
                        }}>
                            <span style={{ color: '#16a34a' }}>✓</span>
                        </div>
                        <div className="card-content">
                            <div className="card-value" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                {successCount}
                            </div>
                            <div className="card-label" style={{ color: '#666', fontSize: '14px' }}>
                                Successful
                            </div>
                        </div>
                    </div>

                    <div className="summary-card" style={{
                        background: 'white',
                        borderRadius: '8px',
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <div className="card-icon" style={{ 
                            background: '#fef3c7',
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px'
                        }}>
                            <span style={{ color: '#d97706' }}>⏳</span>
                        </div>
                        <div className="card-content">
                            <div className="card-value" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                {pendingCount}
                            </div>
                            <div className="card-label" style={{ color: '#666', fontSize: '14px' }}>
                                Pending
                            </div>
                        </div>
                    </div>

                    <div className="summary-card" style={{
                        background: 'white',
                        borderRadius: '8px',
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <div className="card-icon" style={{ 
                            background: '#fee2e2',
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px'
                        }}>
                            <span style={{ color: '#dc2626' }}>✗</span>
                        </div>
                        <div className="card-content">
                            <div className="card-value" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                {failedCount}
                            </div>
                            <div className="card-label" style={{ color: '#666', fontSize: '14px' }}>
                                Failed
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="staff-table-wrapper" style={{
                    background: 'white',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <table className="staff-table" style={{
                        width: '100%',
                        borderCollapse: 'collapse'
                    }}>
                        <thead>
                            <tr style={{
                                background: '#f8f9fa',
                                borderBottom: '2px solid #dee2e6'
                            }}>
                                <th style={{ padding: '12px', textAlign: 'left' }}>S.No.</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>TRANSACTION ID</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>DATE & TIME</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>PROPERTY NAME</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>PLAN NAME</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>TRANSACTION FOR</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>AMOUNT</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>PAYMENT MODE</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>DOCUMENT NO.</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>STATUS</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>RECEIPT</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>PHONEPE ID</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="12" className="no-data" style={{ padding: '40px', textAlign: 'center' }}>
                                        <div className="loading-spinner">
                                            Loading transactions...
                                        </div>
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="12" className="no-data error" style={{ padding: '40px', textAlign: 'center', color: '#dc2626' }}>
                                        {error}
                                    </td>
                                </tr>
                            ) : currentTransactions.length > 0 ? (
                                currentTransactions.map((transaction, index) => (
                                    <tr key={transaction.transaction_id} style={{
                                        borderBottom: '1px solid #dee2e6'
                                    }}>
                                        <td style={{ padding: '12px' }}>{startIndex + index + 1}</td>
                                        <td className="transaction-id" style={{ padding: '12px' }}>
                                            <strong>#{transaction.transaction_id}</strong>
                                        </td>
                                        <td style={{ padding: '12px' }}>{formatDateTime(transaction.transaction_date)}</td>
                                        <td className="property-cell" style={{ padding: '12px' }}>
                                            <div className="property-name">{transaction.property_name}</div>
                                        </td>
                                        <td style={{ padding: '12px' }}>
                                            <span className="plan-badge" style={{
                                                background: '#e9ecef',
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                fontSize: '12px'
                                            }}>{transaction.plan_name}</span>
                                        </td>
                                        <td style={{ padding: '12px' }}>
                                            <span className="type-badge" style={{
                                                background: '#e9ecef',
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                fontSize: '12px'
                                            }}>
                                                {mapTransactionFor(transaction.transaction_for)}
                                            </span>
                                        </td>
                                        <td className="amount-cell" style={{ padding: '12px', fontWeight: 'bold' }}>
                                            <strong>₹{parseFloat(transaction.paid_amount || 0).toLocaleString('en-IN')}</strong>
                                        </td>
                                        <td style={{ padding: '12px' }}>
                                            <span className="mode-badge" style={{
                                                background: '#e9ecef',
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                fontSize: '12px'
                                            }}>{transaction.payment_mode || 'N/A'}</span>
                                        </td>
                                        <td style={{ padding: '12px' }}>
                                            {transaction.document_number || '-'}
                                        </td>
                                        <td style={{ padding: '12px' }}>
                                            <span 
                                                className="status-badge"
                                                style={{ 
                                                    backgroundColor: `${getStatusColor(transaction.status)}20`,
                                                    color: getStatusColor(transaction.status),
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '12px',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                {formatStatus(transaction.status)}
                                            </span>
                                        </td>
                                        <td className="receipt-cell" style={{ padding: '12px' }}>
                                            {transaction.document_file ? (
                                                <a
                                                    href={`${baseurl}${transaction.document_file}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="receipt-link"
                                                    style={{
                                                        color: '#273c75',
                                                        textDecoration: 'none'
                                                    }}
                                                >
                                                    📄 View
                                                </a>
                                            ) : (
                                                <span className="no-receipt">-</span>
                                            )}
                                        </td>
                                        <td className="phonepe-id" style={{ padding: '12px' }}>
                                            <small style={{ fontSize: '0.8em', color: '#666' }}>
                                                {transaction.phone_pe_order_id || '-'}
                                            </small>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="12" className="no-data" style={{ padding: '40px', textAlign: 'center' }}>
                                        No transactions found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    
                    {/* Pagination */}
                    {totalItems > 0 && (
                        <div className="pagination-container" style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '16px',
                            borderTop: '1px solid #dee2e6',
                            background: '#f8f9fa'
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
                                    Showing {startIndex + 1} to {endIndex} of {totalItems} items
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
}

export default ClientTransactionSummary;