// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // import { baseurl } from '../../BaseURL/BaseURL';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './TransactionSummary.css';
// import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";

// function TransactionSummary() {
//     const [transactions, setTransactions] = useState([]);
//     const [filteredTransactions, setFilteredTransactions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [filter, setFilter] = useState('all');
//     const [searchQuery, setSearchQuery] = useState('');
    
//     // Pagination states
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(10);

//     // Static data
//     const staticTransactions = [
//         {
//             transaction_id: 1001,
//             transaction_date: "2024-01-15 10:30:00",
//             property_name: "Sunrise Apartments",
//             plan_name: "Premium Plan",
//             payment_type: "Booking-Amount",
//             transaction_for: "booking",
//             paid_amount: "50000.00",
//             payment_mode: "Online",
//             role: "Buyer",
//             username: "john_doe",
//             user_id: 101,
//             phone_pe_merchant_order_id: "M123456789",
//             phone_pe_order_id: "O987654321",
//             phone_pe_transaction_id: "T456789123",
//             document_file: "/uploads/receipt_1001.pdf",
//             status: "completed"
//         },
//         {
//             transaction_id: 1002,
//             transaction_date: "2024-01-14 14:45:00",
//             property_name: "Ocean View Villa",
//             plan_name: "Basic Plan",
//             payment_type: "Full-Amount",
//             transaction_for: "booking",
//             paid_amount: "2500000.00",
//             payment_mode: "Bank Transfer",
//             role: "Investor",
//             username: "alice_smith",
//             user_id: 102,
//             phone_pe_merchant_order_id: "M234567890",
//             phone_pe_order_id: "O876543210",
//             phone_pe_transaction_id: "T567891234",
//             document_file: "/uploads/receipt_1002.pdf",
//             status: "completed"
//         },
//         {
//             transaction_id: 1003,
//             transaction_date: "2024-01-13 09:15:00",
//             property_name: "Mountain Retreat",
//             plan_name: "Gold Subscription",
//             payment_type: "Subscription",
//             transaction_for: "subscription",
//             paid_amount: "15000.00",
//             payment_mode: "Credit Card",
//             role: "Agent",
//             username: "bob_wilson",
//             user_id: 103,
//             phone_pe_merchant_order_id: "M345678901",
//             phone_pe_order_id: "O765432109",
//             phone_pe_transaction_id: "T678912345",
//             document_file: null,
//             status: "pending"
//         },
//         {
//             transaction_id: 1004,
//             transaction_date: "2024-01-12 16:20:00",
//             property_name: "City Center Plaza",
//             plan_name: "Enterprise Plan",
//             payment_type: "Booking-Amount",
//             transaction_for: "booking",
//             paid_amount: "75000.00",
//             payment_mode: "UPI",
//             role: "Corporate",
//             username: "corporate_xyz",
//             user_id: 104,
//             phone_pe_merchant_order_id: "M456789012",
//             phone_pe_order_id: "O654321098",
//             phone_pe_transaction_id: "T789123456",
//             document_file: "/uploads/receipt_1004.pdf",
//             status: "completed"
//         },
//         {
//             transaction_id: 1005,
//             transaction_date: "2024-01-11 11:00:00",
//             property_name: "Garden View Residency",
//             plan_name: "Silver Subscription",
//             payment_type: "Subscription",
//             transaction_for: "subscription",
//             paid_amount: "10000.00",
//             payment_mode: "Debit Card",
//             role: "Buyer",
//             username: "sarah_johnson",
//             user_id: 105,
//             phone_pe_merchant_order_id: "M567890123",
//             phone_pe_order_id: "O543210987",
//             phone_pe_transaction_id: "T891234567",
//             document_file: "/uploads/receipt_1005.pdf",
//             status: "failed"
//         },
//         {
//             transaction_id: 1006,
//             transaction_date: "2024-01-10 13:30:00",
//             property_name: "Luxury Penthouse",
//             plan_name: "Platinum Plan",
//             payment_type: "Full-Amount",
//             transaction_for: "booking",
//             paid_amount: "5000000.00",
//             payment_mode: "Online",
//             role: "Investor",
//             username: "mike_brown",
//             user_id: 106,
//             phone_pe_merchant_order_id: "M678901234",
//             phone_pe_order_id: "O432109876",
//             phone_pe_transaction_id: "T912345678",
//             document_file: null,
//             status: "completed"
//         },
//         {
//             transaction_id: 1007,
//             transaction_date: "2024-01-09 15:45:00",
//             property_name: "Lakefront Villas",
//             plan_name: "Premium Plan",
//             payment_type: "Booking-Amount",
//             transaction_for: "booking",
//             paid_amount: "60000.00",
//             payment_mode: "Net Banking",
//             role: "Buyer",
//             username: "emma_watson",
//             user_id: 107,
//             phone_pe_merchant_order_id: "M789012345",
//             phone_pe_order_id: "O321098765",
//             phone_pe_transaction_id: "T123456789",
//             document_file: "/uploads/receipt_1007.pdf",
//             status: "completed"
//         },
//         {
//             transaction_id: 1008,
//             transaction_date: "2024-01-08 10:00:00",
//             property_name: "Tech Park Office",
//             plan_name: "Business Plan",
//             payment_type: "Full-Amount",
//             transaction_for: "booking",
//             paid_amount: "3000000.00",
//             payment_mode: "Bank Transfer",
//             role: "Corporate",
//             username: "tech_corp",
//             user_id: 108,
//             phone_pe_merchant_order_id: "M890123456",
//             phone_pe_order_id: "O210987654",
//             phone_pe_transaction_id: "T234567890",
//             document_file: "/uploads/receipt_1008.pdf",
//             status: "completed"
//         },
//         {
//             transaction_id: 1009,
//             transaction_date: "2024-01-07 12:15:00",
//             property_name: "Beachside Bungalow",
//             plan_name: "Standard Plan",
//             payment_type: "Booking-Amount",
//             transaction_for: "booking",
//             paid_amount: "45000.00",
//             payment_mode: "UPI",
//             role: "Buyer",
//             username: "david_lee",
//             user_id: 109,
//             phone_pe_merchant_order_id: "M901234567",
//             phone_pe_order_id: "O109876543",
//             phone_pe_transaction_id: "T345678901",
//             document_file: "/uploads/receipt_1009.pdf",
//             status: "completed"
//         },
//         {
//             transaction_id: 1010,
//             transaction_date: "2024-01-06 14:30:00",
//             property_name: "Hilltop Mansion",
//             plan_name: "Diamond Plan",
//             payment_type: "Full-Amount",
//             transaction_for: "booking",
//             paid_amount: "7500000.00",
//             payment_mode: "Online",
//             role: "Investor",
//             username: "sophia_clark",
//             user_id: 110,
//             phone_pe_merchant_order_id: "M012345678",
//             phone_pe_order_id: "O098765432",
//             phone_pe_transaction_id: "T456789012",
//             document_file: null,
//             status: "pending"
//         }
//     ];

//     const formatDateTime = (dateString) => {
//         if (!dateString) return 'N/A';
        
//         if (typeof dateString === 'string') {
//             const datePart = dateString.split(' ')[0];
//             const timePart = dateString.split(' ')[1];
//             const [year, month, day] = datePart.split('-');
//             const time = timePart.substring(0, 5); // Remove seconds
//             return `${day}/${month}/${year} ${time}`;
//         }
        
//         return 'Invalid Date';
//     };

//     // Map role similar to Users page
//     const mapRole = (role) => {
//         if (role === "Agent") return "Team";
//         if (role === "Client") return "User";
//         return role;
//     };

//     // Get status badge color
//     const getStatusColor = (status) => {
//         switch(status?.toLowerCase()) {
//             case 'completed': return '#10b981';
//             case 'pending': return '#f59e0b';
//             case 'failed': return '#ef4444';
//             default: return '#6b7280';
//         }
//     };

//     useEffect(() => {
//         // Set static data directly
//         setTransactions(staticTransactions);
//         setFilteredTransactions(staticTransactions);
//         setLoading(false);
//     }, []);

//     // Apply filters and search
//     useEffect(() => {
//         let result = [...staticTransactions];

//         // Apply type filter
//         if (filter === 'Booking-Amount') {
//             result = result.filter(item => item.payment_type === 'Booking-Amount');
//         } else if (filter === 'Full-Amount') {
//             result = result.filter(item => item.payment_type === 'Full-Amount');
//         } else if (filter === 'subscription') {
//             result = result.filter(item => item.transaction_for === 'subscription');
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
//                     (item.status && item.status.toLowerCase().includes(searchLower))
//                 );
//             });
//         }

//         setFilteredTransactions(result);
//     }, [filter, searchQuery]);

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
//             "Payment Type",
//             "Transaction For",
//             "Paid Amount",
//             "Payment Mode",
//             "Role",
//             "Username",
//             "User ID",
//             "PhonePe Merchant Order ID",
//             "PhonePe Order ID",
//             "PhonePe Transaction ID",
//             "Status"
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
//                     `"${item.payment_type}"`,
//                     `"${item.transaction_for}"`,
//                     `"₹${parseFloat(item.paid_amount).toLocaleString('en-IN')}"`,
//                     `"${item.payment_mode}"`,
//                     `"${mapRole(item.role)}"`,
//                     `"${item.username}"`,
//                     item.user_id,
//                     `"${item.phone_pe_merchant_order_id}"`,
//                     `"${item.phone_pe_order_id || ''}"`,
//                     `"${item.phone_pe_transaction_id || ''}"`,
//                     `"${item.status}"`
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

//     // Get unique payment modes for filter
//     const uniquePaymentModes = ["All", ...new Set(staticTransactions.map(t => t.payment_mode).filter(Boolean))];

//     return (
//         <>
//             <AdminNavbar />

//             <div className="staff-page">
//                 {/* Header */}
//                 <div className="staff-header">
//                     <h2>Transaction Summary</h2>
//                 </div>

//                 {/* Toolbar */}
//                 <div className="staff-toolbar">
//                     {/* Left Side: Search and Filter */}
//                     <div className="toolbar-left">
//                         {/* Payment Mode Filter */}
//                         <div className="filter-container">
//                             <select 
//                                 className="role-filter"
//                                 value={filter}
//                                 onChange={handleFilterChange}
//                             >
//                                 <option value="all">All Transactions</option>
//                                 <option value="Booking-Amount">Booking Amount</option>
//                                 <option value="Full-Amount">Full Amount</option>
//                                 <option value="subscription">Subscriptions</option>
//                             </select>
//                         </div>

//                         {/* Search Box */}
//                         <div className="search-box">
//                             <input
//                                 type="text"
//                                 placeholder="Search by ID, property, user, amount..."
//                                 value={searchQuery}
//                                 onChange={handleSearchChange}
//                             />
//                             {/* <span className="search-icon">🔍</span> */}
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
//                             <span style={{ color: '#16a34a' }}>✓</span>
//                         </div>
//                         <div className="card-content">
//                             <div className="card-value">
//                                 ₹{filteredTransactions
//                                     .reduce((sum, item) => sum + parseFloat(item.paid_amount || 0), 0)
//                                     .toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                             </div>
//                             <div className="card-label">Total Amount</div>
//                         </div>
//                     </div>
//                     <div className="summary-card">
//                         <div className="card-icon" style={{ background: '#fef3c7' }}>
//                             <span style={{ color: '#d97706' }}>⏳</span>
//                         </div>
//                         <div className="card-content">
//                             <div className="card-value">
//                                 {filteredTransactions.filter(t => t.status === 'pending').length}
//                             </div>
//                             <div className="card-label">Pending</div>
//                         </div>
//                     </div>
//                     <div className="summary-card">
//                         <div className="card-icon" style={{ background: '#fee2e2' }}>
//                             <span style={{ color: '#dc2626' }}>✗</span>
//                         </div>
//                         <div className="card-content">
//                             <div className="card-value">
//                                 {filteredTransactions.filter(t => t.status === 'failed').length}
//                             </div>
//                             <div className="card-label">Failed</div>
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
//                                 <th>PAYMENT TYPE</th>
//                                 <th>AMOUNT</th>
//                                 <th>PAYMENT MODE</th>
//                                 <th>ROLE</th>
//                                 <th>USERNAME</th>
//                                 <th>USER ID</th>
//                                 <th>STATUS</th>
//                                 <th>RECEIPT</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {loading ? (
//                                 <tr>
//                                     <td colSpan="13" className="no-data">
//                                         Loading...
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
//                                             <span className={`type-badge ${transaction.payment_type === 'Booking-Amount' ? 'booking' : 
//                                                 transaction.payment_type === 'Full-Amount' ? 'full' : 'subscription'}`}>
//                                                 {transaction.payment_type}
//                                             </span>
//                                         </td>
//                                         <td className="amount-cell">
//                                             <strong>₹{parseFloat(transaction.paid_amount).toLocaleString('en-IN')}</strong>
//                                         </td>
//                                         <td>
//                                             <span className="mode-badge">{transaction.payment_mode}</span>
//                                         </td>
//                                         <td>
//                                             <span className="role-badge">{mapRole(transaction.role)}</span>
//                                         </td>
//                                         <td className="username-cell">{transaction.username}</td>
//                                         <td>{transaction.user_id}</td>
//                                         <td>
//                                             <span 
//                                                 className="status-badge"
//                                                 style={{ 
//                                                     backgroundColor: `${getStatusColor(transaction.status)}20`,
//                                                     color: getStatusColor(transaction.status)
//                                                 }}
//                                             >
//                                                 {transaction.status?.charAt(0).toUpperCase() + transaction.status?.slice(1)}
//                                             </span>
//                                         </td>
//                                         <td className="receipt-cell">
//                                             {transaction.document_file ? (
//                                                 <a
//                                                     href={transaction.document_file}
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
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="13" className="no-data">
//                                         No transactions found
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
                    
//                     {/* Pagination */}
//                     {totalItems > 0 && (
//                         <div className="pagination-container" style={{
//                             display: 'flex',
//                             justifyContent: 'space-between',
//                             alignItems: 'center',
//                             padding: '16px',
//                             borderTop: '1px solid #eee',
//                             backgroundColor: '#f8f9fa'
//                         }}>
//                             {/* Items per page selector */}
//                             <div className="items-per-page" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                                 <span style={{ fontSize: '14px', color: '#666' }}>Show:</span>
//                                 <select 
//                                     value={itemsPerPage} 
//                                     onChange={handleItemsPerPageChange}
//                                     style={{
//                                         padding: '6px 12px',
//                                         border: '1px solid #ddd',
//                                         borderRadius: '4px',
//                                         fontSize: '14px'
//                                     }}
//                                 >
//                                     <option value="5">5</option>
//                                     <option value="10">10</option>
//                                     <option value="20">20</option>
//                                     <option value="50">50</option>
//                                     <option value="100">100</option>
//                                 </select>
//                                 <span style={{ fontSize: '14px', color: '#666' }}>
//                                     Showing {startIndex + 1} to {endIndex} of {totalItems} items
//                                 </span>
//                             </div>
                            
//                             {/* Page navigation */}
//                             <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                                 {/* First Page */}
//                                 <button
//                                     onClick={() => handlePageChange(1)}
//                                     disabled={currentPage === 1}
//                                     style={{
//                                         padding: '6px 12px',
//                                         border: '1px solid #ddd',
//                                         borderRadius: '4px',
//                                         background: currentPage === 1 ? '#f8f9fa' : 'white',
//                                         color: currentPage === 1 ? '#ccc' : '#333',
//                                         cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//                                         fontSize: '14px'
//                                     }}
//                                 >
//                                     ««
//                                 </button>
                                
//                                 {/* Previous Page */}
//                                 <button
//                                     onClick={() => handlePageChange(currentPage - 1)}
//                                     disabled={currentPage === 1}
//                                     style={{
//                                         padding: '6px 12px',
//                                         border: '1px solid #ddd',
//                                         borderRadius: '4px',
//                                         background: currentPage === 1 ? '#f8f9fa' : 'white',
//                                         color: currentPage === 1 ? '#ccc' : '#333',
//                                         cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//                                         fontSize: '14px'
//                                     }}
//                                 >
//                                     «
//                                 </button>
                                
//                                 {/* Page Numbers */}
//                                 {getPageNumbers().map(page => (
//                                     <button
//                                         key={page}
//                                         onClick={() => handlePageChange(page)}
//                                         style={{
//                                             padding: '6px 12px',
//                                             border: '1px solid #ddd',
//                                             borderRadius: '4px',
//                                             background: currentPage === page ? '#273c75' : 'white',
//                                             color: currentPage === page ? 'white' : '#333',
//                                             cursor: 'pointer',
//                                             fontSize: '14px',
//                                             fontWeight: currentPage === page ? 'bold' : 'normal'
//                                         }}
//                                     >
//                                         {page}
//                                     </button>
//                                 ))}
                                
//                                 {/* Next Page */}
//                                 <button
//                                     onClick={() => handlePageChange(currentPage + 1)}
//                                     disabled={currentPage === totalPages}
//                                     style={{
//                                         padding: '6px 12px',
//                                         border: '1px solid #ddd',
//                                         borderRadius: '4px',
//                                         background: currentPage === totalPages ? '#f8f9fa' : 'white',
//                                         color: currentPage === totalPages ? '#ccc' : '#333',
//                                         cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
//                                         fontSize: '14px'
//                                     }}
//                                 >
//                                     »
//                                 </button>
                                
//                                 {/* Last Page */}
//                                 <button
//                                     onClick={() => handlePageChange(totalPages)}
//                                     disabled={currentPage === totalPages}
//                                     style={{
//                                         padding: '6px 12px',
//                                         border: '1px solid #ddd',
//                                         borderRadius: '4px',
//                                         background: currentPage === totalPages ? '#f8f9fa' : 'white',
//                                         color: currentPage === totalPages ? '#ccc' : '#333',
//                                         cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
//                                         fontSize: '14px'
//                                     }}
//                                 >
//                                     »»
//                                 </button>
//                             </div>
                            
//                             {/* Current page info */}
//                             <div className="page-info" style={{ fontSize: '14px', color: '#666' }}>
//                                 Page {currentPage} of {totalPages}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }

// export default TransactionSummary;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './TransactionSummary.css';
// import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL'; // Added baseurl import

// function TransactionSummary() {
//     const [transactions, setTransactions] = useState([]);
//     const [filteredTransactions, setFilteredTransactions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [filter, setFilter] = useState('all');
//     const [searchQuery, setSearchQuery] = useState('');
//     const [error, setError] = useState(null);
    
//     // Pagination states
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(10);
    
//     // API URL - Using baseurl from import
//     const API_URL = `${baseurl}/transactions/`; // Updated to use baseurl

//     const formatDateTime = (dateString) => {
//         if (!dateString) return 'N/A';
        
//         try {
//             // Handle format: "05-02-2026 15:32:33" to "05/02/2026 15:32"
//             const [datePart, timePart] = dateString.split(' ');
//             const [day, month, year] = datePart.split('-');
//             const time = timePart ? timePart.substring(0, 5) : '';
//             return `${day}/${month}/${year} ${time}`;
//         } catch (error) {
//             console.error('Error formatting date:', error);
//             return 'Invalid Date';
//         }
//     };

//     // Map status from API response to display values
//     const mapStatus = (status) => {
//         const statusMap = {
//             'success': 'completed',
//             'pending': 'pending',
//             'failed': 'failed'
//         };
//         return statusMap[status] || status;
//     };

//     // Map transaction_for to more readable values
//     const mapTransactionFor = (transactionFor) => {
//         const map = {
//             'product': 'Product Purchase',
//             'booking': 'Property Booking',
//             'subscription': 'Subscription'
//         };
//         return map[transactionFor] || transactionFor;
//     };

//     // Map payment_mode to more readable values
//     const mapPaymentMode = (paymentMode) => {
//         const map = {
//             'UPI_COLLECT': 'UPI',
//             'NET_BANKING': 'Net Banking',
//             'CREDIT_CARD': 'Credit Card',
//             'DEBIT_CARD': 'Debit Card'
//         };
//         return map[paymentMode] || paymentMode;
//     };

//     // Get role from user data (you might need to fetch user details separately)
//     const getUserRole = (user) => {
//         // This is a placeholder - you'll need to fetch user roles from your API
//         // For now, we'll return a default value
//         return 'User';
//     };

//     // Get status badge color
//     const getStatusColor = (status) => {
//         const normalizedStatus = mapStatus(status);
//         switch(normalizedStatus?.toLowerCase()) {
//             case 'completed':
//             case 'success': return '#10b981';
//             case 'pending': return '#f59e0b';
//             case 'failed': return '#ef4444';
//             default: return '#6b7280';
//         }
//     };

//     // Fetch transactions from API
//     const fetchTransactions = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await axios.get(API_URL);
//             console.log('API Response:', response.data);
            
//             if (response.data && response.data.results) {
//                 // Transform API data to match your component structure
//                 const transformedData = response.data.results.map((item, index) => ({
//                     transaction_id: item.transaction_id,
//                     transaction_date: item.transaction_date,
//                     property_name: item.property_name || 'N/A',
//                     plan_name: item.plan_name || 'N/A',
//                     payment_type: item.payment_type || 'Product',
//                     transaction_for: item.transaction_for,
//                     paid_amount: item.paid_amount,
//                     payment_mode: item.payment_mode || 'Online',
//                     role: item.role || getUserRole(item.user_id),
//                     username: `user_${item.user_id}`, // You might want to fetch actual username
//                     user_id: item.user_id,
//                     phone_pe_merchant_order_id: item.phone_pe_merchant_order_id,
//                     phone_pe_order_id: item.phone_pe_order_id,
//                     phone_pe_transaction_id: item.phone_pe_transaction_id,
//                     document_file: item.document_file,
//                     status: mapStatus(item.status),
//                     // Add original API data for reference
//                     api_data: item
//                 }));
                
//                 setTransactions(transformedData);
//                 setFilteredTransactions(transformedData);
//             } else {
//                 setError('No data received from API');
//                 setTransactions([]);
//                 setFilteredTransactions([]);
//             }
//         } catch (error) {
//             console.error('Error fetching transactions:', error);
//             setError(`Failed to fetch transactions: ${error.message}`);
//             setTransactions([]);
//             setFilteredTransactions([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchTransactions();
        
//         // Optional: Set up auto-refresh every 30 seconds
//         // const intervalId = setInterval(fetchTransactions, 30000);
//         // return () => clearInterval(intervalId);
//     }, []);

//     // Apply filters and search
//     useEffect(() => {
//         if (!transactions.length) {
//             setFilteredTransactions([]);
//             return;
//         }

//         let result = [...transactions];

//         // Apply type filter
//         if (filter === 'Booking-Amount') {
//             result = result.filter(item => item.payment_type === 'Booking-Amount');
//         } else if (filter === 'Full-Amount') {
//             result = result.filter(item => item.payment_type === 'Full-Amount');
//         } else if (filter === 'subscription') {
//             result = result.filter(item => item.transaction_for === 'subscription');
//         } else if (filter === 'product') {
//             result = result.filter(item => item.transaction_for === 'product');
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
//                     (item.api_data?.document_number && item.api_data.document_number.toLowerCase().includes(searchLower))
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
//             "Payment Type",
//             "Transaction For",
//             "Paid Amount",
//             "Payment Mode",
//             "Role",
//             "Username",
//             "PhonePe Merchant Order ID",
//             "PhonePe Order ID",
//             "PhonePe Transaction ID",
//             "Document Number",
//             "Status"
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
//                     `"${item.payment_type}"`,
//                     `"${mapTransactionFor(item.transaction_for)}"`,
//                     `"₹${parseFloat(item.paid_amount).toLocaleString('en-IN')}"`,
//                     `"${mapPaymentMode(item.payment_mode)}"`,
//                     `"${item.role}"`,
//                     `"${item.username}"`,
//                     `"${item.phone_pe_merchant_order_id || ''}"`,
//                     `"${item.phone_pe_order_id || ''}"`,
//                     `"${item.phone_pe_transaction_id || ''}"`,
//                     `"${item.api_data?.document_number || ''}"`,
//                     `"${item.status}"`
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

//     // Handle refresh
//     const handleRefresh = () => {
//         fetchTransactions();
//     };

//     return (
//         <>
//             <AdminNavbar />

//             <div className="staff-page">
//                 {/* Header */}
//                 <div className="staff-header">
//                     <h2>Transaction Summary</h2>
//                     <div style={{ display: 'flex', gap: '10px' }}>
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
//                     {/* Left Side: Search and Filter */}
//                     <div className="toolbar-left">
//                         {/* Payment Mode Filter */}
//                         <div className="filter-container">
//                             <select 
//                                 className="role-filter"
//                                 value={filter}
//                                 onChange={handleFilterChange}
//                             >
//                                 <option value="all">All Transactions</option>
//                                 <option value="Booking-Amount">Booking Amount</option>
//                                 <option value="Full-Amount">Full Amount</option>
//                                 <option value="subscription">Subscriptions</option>
//                                 <option value="product">Product Purchases</option>
//                             </select>
//                         </div>

//                         {/* Search Box */}
//                         <div className="search-box">
//                             <input
//                                 type="text"
//                                 placeholder="Search by ID, property, user, amount..."
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
//                             disabled={loading || filteredTransactions.length === 0}
//                         >
//                             {loading ? 'Loading...' : 'Export Excel'}
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
//                             <span style={{ color: '#16a34a' }}>✓</span>
//                         </div>
//                         <div className="card-content">
//                             <div className="card-value">
//                                 ₹{filteredTransactions
//                                     .reduce((sum, item) => sum + parseFloat(item.paid_amount || 0), 0)
//                                     .toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                             </div>
//                             <div className="card-label">Total Amount</div>
//                         </div>
//                     </div>
//                     <div className="summary-card">
//                         <div className="card-icon" style={{ background: '#fef3c7' }}>
//                             <span style={{ color: '#d97706' }}>⏳</span>
//                         </div>
//                         <div className="card-content">
//                             <div className="card-value">
//                                 {filteredTransactions.filter(t => t.status === 'pending').length}
//                             </div>
//                             <div className="card-label">Pending</div>
//                         </div>
//                     </div>
//                     <div className="summary-card">
//                         <div className="card-icon" style={{ background: '#fee2e2' }}>
//                             <span style={{ color: '#dc2626' }}>✗</span>
//                         </div>
//                         <div className="card-content">
//                             <div className="card-value">
//                                 {filteredTransactions.filter(t => t.status === 'failed').length}
//                             </div>
//                             <div className="card-label">Failed</div>
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
//                                 <th>PAYMENT TYPE</th>
//                                 <th>AMOUNT</th>
//                                 <th>PAYMENT MODE</th>
//                                 <th>ROLE</th>
//                                 <th>USER ID</th>
//                                 <th>STATUS</th>
//                                 <th>RECEIPT</th>
//                                 <th>DOCUMENT NO.</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {loading ? (
//                                 <tr>
//                                     <td colSpan="14" className="no-data">
//                                         <div className="text-center py-4">
//                                             <div className="spinner-border text-primary" role="status">
//                                                 <span className="visually-hidden">Loading...</span>
//                                             </div>
//                                             <p className="mt-2">Loading transactions...</p>
//                                         </div>
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
//                                             <span className={`type-badge ${transaction.payment_type === 'Booking-Amount' ? 'booking' : 
//                                                 transaction.payment_type === 'Full-Amount' ? 'full' : 
//                                                 transaction.transaction_for === 'subscription' ? 'subscription' : 'product'}`}>
//                                                 {transaction.payment_type || mapTransactionFor(transaction.transaction_for)}
//                                             </span>
//                                         </td>
//                                         <td className="amount-cell">
//                                             <strong>₹{parseFloat(transaction.paid_amount).toLocaleString('en-IN')}</strong>
//                                         </td>
//                                         <td>
//                                             <span className="mode-badge">{mapPaymentMode(transaction.payment_mode)}</span>
//                                         </td>
//                                         <td>
//                                             <span className="role-badge">{transaction.role}</span>
//                                         </td>
//                                         <td className="username-cell">{transaction.user_id}</td>
//                                         <td>
//                                             <span 
//                                                 className="status-badge"
//                                                 style={{ 
//                                                     backgroundColor: `${getStatusColor(transaction.status)}20`,
//                                                     color: getStatusColor(transaction.status)
//                                                 }}
//                                             >
//                                                 {transaction.status?.charAt(0).toUpperCase() + transaction.status?.slice(1)}
//                                             </span>
//                                         </td>
//                                         <td className="receipt-cell">
//                                             {transaction.document_file ? (
//                                                 <a
//                                                     href={`${baseurl}${transaction.document_file}`} // Updated to use baseurl
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
//                                         <td>
//                                             {transaction.api_data?.document_number || '-'}
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="14" className="no-data">
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
//                                             "No transactions found"
//                                         )}
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
                    
//                     {/* Pagination - Only show if we have items */}
//                     {totalItems > 0 && !loading && (
//                         <div className="pagination-container" style={{
//                             display: 'flex',
//                             justifyContent: 'space-between',
//                             alignItems: 'center',
//                             padding: '16px',
//                             borderTop: '1px solid #eee',
//                             backgroundColor: '#f8f9fa'
//                         }}>
//                             {/* Items per page selector */}
//                             <div className="items-per-page" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                                 <span style={{ fontSize: '14px', color: '#666' }}>Show:</span>
//                                 <select 
//                                     value={itemsPerPage} 
//                                     onChange={handleItemsPerPageChange}
//                                     style={{
//                                         padding: '6px 12px',
//                                         border: '1px solid #ddd',
//                                         borderRadius: '4px',
//                                         fontSize: '14px'
//                                     }}
//                                 >
//                                     <option value="5">5</option>
//                                     <option value="10">10</option>
//                                     <option value="20">20</option>
//                                     <option value="50">50</option>
//                                     <option value="100">100</option>
//                                 </select>
//                                 <span style={{ fontSize: '14px', color: '#666' }}>
//                                     Showing {startIndex + 1} to {endIndex} of {totalItems} items
//                                 </span>
//                             </div>
                            
//                             {/* Page navigation */}
//                             <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                                 {/* First Page */}
//                                 <button
//                                     onClick={() => handlePageChange(1)}
//                                     disabled={currentPage === 1}
//                                     style={{
//                                         padding: '6px 12px',
//                                         border: '1px solid #ddd',
//                                         borderRadius: '4px',
//                                         background: currentPage === 1 ? '#f8f9fa' : 'white',
//                                         color: currentPage === 1 ? '#ccc' : '#333',
//                                         cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//                                         fontSize: '14px'
//                                     }}
//                                 >
//                                     ««
//                                 </button>
                                
//                                 {/* Previous Page */}
//                                 <button
//                                     onClick={() => handlePageChange(currentPage - 1)}
//                                     disabled={currentPage === 1}
//                                     style={{
//                                         padding: '6px 12px',
//                                         border: '1px solid #ddd',
//                                         borderRadius: '4px',
//                                         background: currentPage === 1 ? '#f8f9fa' : 'white',
//                                         color: currentPage === 1 ? '#ccc' : '#333',
//                                         cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//                                         fontSize: '14px'
//                                     }}
//                                 >
//                                     «
//                                 </button>
                                
//                                 {/* Page Numbers */}
//                                 {getPageNumbers().map(page => (
//                                     <button
//                                         key={page}
//                                         onClick={() => handlePageChange(page)}
//                                         style={{
//                                             padding: '6px 12px',
//                                             border: '1px solid #ddd',
//                                             borderRadius: '4px',
//                                             background: currentPage === page ? '#273c75' : 'white',
//                                             color: currentPage === page ? 'white' : '#333',
//                                             cursor: 'pointer',
//                                             fontSize: '14px',
//                                             fontWeight: currentPage === page ? 'bold' : 'normal'
//                                         }}
//                                     >
//                                         {page}
//                                     </button>
//                                 ))}
                                
//                                 {/* Next Page */}
//                                 <button
//                                     onClick={() => handlePageChange(currentPage + 1)}
//                                     disabled={currentPage === totalPages}
//                                     style={{
//                                         padding: '6px 12px',
//                                         border: '1px solid #ddd',
//                                         borderRadius: '4px',
//                                         background: currentPage === totalPages ? '#f8f9fa' : 'white',
//                                         color: currentPage === totalPages ? '#ccc' : '#333',
//                                         cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
//                                         fontSize: '14px'
//                                     }}
//                                 >
//                                     »
//                                 </button>
                                
//                                 {/* Last Page */}
//                                 <button
//                                     onClick={() => handlePageChange(totalPages)}
//                                     disabled={currentPage === totalPages}
//                                     style={{
//                                         padding: '6px 12px',
//                                         border: '1px solid #ddd',
//                                         borderRadius: '4px',
//                                         background: currentPage === totalPages ? '#f8f9fa' : 'white',
//                                         color: currentPage === totalPages ? '#ccc' : '#333',
//                                         cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
//                                         fontSize: '14px'
//                                     }}
//                                 >
//                                     »»
//                                 </button>
//                             </div>
                            
//                             {/* Current page info */}
//                             <div className="page-info" style={{ fontSize: '14px', color: '#666' }}>
//                                 Page {currentPage} of {totalPages}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }

// export default TransactionSummary;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TransactionSummary.css';
import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
import { baseurl } from '../../BaseURL/BaseURL';
import Swal from "sweetalert2";

function TransactionSummary() {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
    
    // Advanced filters
    const [selectedType, setSelectedType] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [paymentModeFilter, setPaymentModeFilter] = useState("All");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    
    // Unique values for filters
    const [uniqueTypes, setUniqueTypes] = useState(["All"]);
    const [uniqueStatuses, setUniqueStatuses] = useState(["All"]);
    const [uniquePaymentModes, setUniquePaymentModes] = useState(["All"]);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    
    // API URL
    const API_URL = `${baseurl}/transactions/`;

    // ✅ Format date for display (dd/mm/yyyy)
    const formatDateForDisplay = (dateTimeString) => {
        if (!dateTimeString) return "";
        try {
            // Handle format: "05-02-2026 15:32:33" to "05/02/2026 15:32"
            const [datePart, timePart] = dateTimeString.split(' ');
            if (datePart && datePart.includes('-')) {
                const [day, month, year] = datePart.split('-');
                const time = timePart ? timePart.substring(0, 5) : '';
                return `${day}/${month}/${year} ${time}`;
            }
            
            // Try standard date parsing
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

    // ✅ Format date for API (YYYY-MM-DD)
    const formatDateForAPI = (date) => {
        if (!date) return "";
        try {
            const d = new Date(date);
            if (isNaN(d.getTime())) return "";
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        } catch (error) {
            return "";
        }
    };

    // Map status from API response to display values
    const mapStatus = (status) => {
        const statusMap = {
            'success': 'completed',
            'pending': 'pending',
            'failed': 'failed'
        };
        return statusMap[status] || status;
    };

    // Map transaction_for to more readable values
    const mapTransactionFor = (transactionFor) => {
        const map = {
            'product': 'Product Purchase',
            'booking': 'Property Booking',
            'subscription': 'Subscription'
        };
        return map[transactionFor] || transactionFor;
    };

    // Map payment_mode to more readable values
    const mapPaymentMode = (paymentMode) => {
        const map = {
            'UPI_COLLECT': 'UPI',
            'NET_BANKING': 'Net Banking',
            'CREDIT_CARD': 'Credit Card',
            'DEBIT_CARD': 'Debit Card',
            'upi': 'UPI',
            'netbanking': 'Net Banking',
            'card': 'Card'
        };
        return map[paymentMode] || paymentMode;
    };

    // Reverse map payment mode for API
    const reverseMapPaymentMode = (mode) => {
        const map = {
            'UPI': 'upi',
            'Net Banking': 'netbanking',
            'Credit Card': 'card',
            'Debit Card': 'card',
            'Card': 'card'
        };
        return map[mode] || mode.toLowerCase();
    };

    // Get status badge color
    const getStatusColor = (status) => {
        const normalizedStatus = mapStatus(status);
        switch(normalizedStatus?.toLowerCase()) {
            case 'completed':
            case 'success': return '#10b981';
            case 'pending': return '#f59e0b';
            case 'failed': return '#ef4444';
            default: return '#6b7280';
        }
    };

    // Fetch transactions from API
    const fetchTransactions = async () => {
        setLoading(true);
        setError(null);
        try {
            let url = `${baseurl}/transactions/`; 
            const params = new URLSearchParams();
            
            // Add search query
            if (searchQuery.trim()) {
                params.append('search', searchQuery.trim());
            }
            
            // Add type filter if not "All"
            if (selectedType !== "All") {
                if (selectedType === "Booking-Amount" || selectedType === "Full-Amount") {
                    params.append('payment_type', selectedType);
                } else if (selectedType === "subscription") {
                    params.append('transaction_for', 'subscription');
                } else if (selectedType === "product") {
                    params.append('transaction_for', 'product');
                }
            }
            
            // Add status filter if not "All"
            if (statusFilter !== "All") {
                const apiStatus = statusFilter === "Completed" ? "success" : 
                                 statusFilter === "Pending" ? "pending" : 
                                 statusFilter === "Failed" ? "failed" : statusFilter.toLowerCase();
                params.append('status', apiStatus);
            }
            
            // Add payment mode filter if not "All"
            if (paymentModeFilter !== "All") {
                params.append('payment_mode', reverseMapPaymentMode(paymentModeFilter));
            }
            
            // Add date range filters
            if (dateFrom) {
                params.append('created_at_after', formatDateForAPI(dateFrom));
            }
            if (dateTo) {
                params.append('created_at_before', formatDateForAPI(dateTo));
            }
            
            // Add pagination parameters
            params.append('page', currentPage);
            params.append('page_size', itemsPerPage);
            
            // Build final URL with parameters
            const queryString = params.toString();
            if (queryString) {
                url += `?${queryString}`;
            }
            
            console.log("Fetching from URL:", url);
            
            const response = await axios.get(url);
            console.log('API Response:', response.data);
            
            // Handle API response
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
            
            // Transform API data
            const transformedData = data.map((item) => ({
                transaction_id: item.transaction_id,
                transaction_date: item.transaction_date,
                property_name: item.property_name || 'N/A',
                plan_name: item.plan_name || 'N/A',
                payment_type: item.payment_type || 'Product',
                transaction_for: item.transaction_for,
                paid_amount: item.paid_amount,
                payment_mode: mapPaymentMode(item.payment_mode || 'Online'),
                role: item.role || 'User',
                username: item.username || `user_${item.user_id}`,
                user_id: item.user_id,
                phone_pe_merchant_order_id: item.phone_pe_merchant_order_id,
                phone_pe_order_id: item.phone_pe_order_id,
                phone_pe_transaction_id: item.phone_pe_transaction_id,
                document_file: item.document_file,
                status: mapStatus(item.status),
                displayDate: formatDateForDisplay(item.transaction_date || ""),
                api_data: item
            }));
            
            console.log("Transformed Data:", transformedData);
            
            setTransactions(transformedData);
            setFilteredTransactions(transformedData);
            setTotalItems(count);
            
            // Calculate total pages
            const calculatedPages = Math.ceil(count / itemsPerPage);
            setTotalPages(calculatedPages || 1);
            
            // Extract unique values for filters
            extractUniqueValues(transformedData);
            
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

    // Extract unique values for filter dropdowns
    const extractUniqueValues = (data) => {
        // Types
        const types = ["All"];
        data.forEach(item => {
            let type = item.payment_type;
            if (item.transaction_for === 'subscription') type = 'subscription';
            if (item.transaction_for === 'product') type = 'product';
            if (type && !types.includes(type)) {
                types.push(type);
            }
        });
        setUniqueTypes(types);
        
        // Statuses
        const statuses = ["All"];
        data.forEach(item => {
            const status = item.status?.charAt(0).toUpperCase() + item.status?.slice(1);
            if (status && !statuses.includes(status) && status !== 'undefined') {
                statuses.push(status);
            }
        });
        setUniqueStatuses(statuses);
        
        // Payment Modes
        const modes = ["All"];
        data.forEach(item => {
            if (item.payment_mode && !modes.includes(item.payment_mode)) {
                modes.push(item.payment_mode);
            }
        });
        setUniquePaymentModes(modes);
    };

    // Fetch data when filters or pagination changes
    useEffect(() => {
        fetchTransactions();
    }, [currentPage, itemsPerPage, selectedType, searchQuery, statusFilter, paymentModeFilter, dateFrom, dateTo]);

    // Calculate pagination for display
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const currentTransactions = filteredTransactions.slice(0, itemsPerPage); // Since we're doing server-side pagination

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
            "S.No",
            "Transaction ID",
            "Transaction Date",
            "Property Name",
            "Plan Name",
            "Payment Type",
            "Transaction For",
            "Paid Amount",
            "Payment Mode",
            "Role",
            "Username",
            "User ID",
            "PhonePe Merchant Order ID",
            "PhonePe Order ID",
            "PhonePe Transaction ID",
            "Document Number",
            "Status"
        ];

        const csvContent = [
            headers.join(","),
            ...filteredTransactions.map((item, index) =>
                [
                    index + 1,
                    item.transaction_id,
                    `"${item.displayDate}"`,
                    `"${item.property_name}"`,
                    `"${item.plan_name}"`,
                    `"${item.payment_type}"`,
                    `"${mapTransactionFor(item.transaction_for)}"`,
                    `"${parseFloat(item.paid_amount).toLocaleString('en-IN')}"`,
                    `"${item.payment_mode}"`,
                    `"${item.role}"`,
                    `"${item.username}"`,
                    `"${item.user_id}"`,
                    `"${item.phone_pe_merchant_order_id || ''}"`,
                    `"${item.phone_pe_order_id || ''}"`,
                    `"${item.phone_pe_transaction_id || ''}"`,
                    `"${item.api_data?.document_number || ''}"`,
                    `"${item.status}"`
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

        Swal.fire({
            icon: "success",
            title: "Export Successful",
            text: `Exported ${filteredTransactions.length} transactions to CSV file.`,
            timer: 2000,
            showConfirmButton: false
        });
    };

    // Handle search change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    // Handle type filter change
    const handleTypeFilterChange = (e) => {
        setSelectedType(e.target.value);
        setCurrentPage(1);
    };

    // Handle status filter change
    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1);
    };

    // Handle payment mode filter change
    const handlePaymentModeFilterChange = (e) => {
        setPaymentModeFilter(e.target.value);
        setCurrentPage(1);
    };

    // Handle date from change
    const handleDateFromChange = (e) => {
        setDateFrom(e.target.value);
        setCurrentPage(1);
    };

    // Handle date to change
    const handleDateToChange = (e) => {
        setDateTo(e.target.value);
        setCurrentPage(1);
    };

    // Handle key press for search
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchTransactions();
        }
    };

    // Clear all filters
    const clearAllFilters = () => {
        setSearchQuery("");
        setSelectedType("All");
        setStatusFilter("All");
        setPaymentModeFilter("All");
        setDateFrom("");
        setDateTo("");
        setCurrentPage(1);
    };

    // Check if any filters are active
    const hasActiveFilters = () => {
        return searchQuery !== "" || 
               selectedType !== "All" || 
               statusFilter !== "All" || 
               paymentModeFilter !== "All" || 
               dateFrom !== "" || 
               dateTo !== "";
    };

    // Handle refresh
    const handleRefresh = () => {
        fetchTransactions();
    };

    // Search placeholder text
    const searchPlaceholder = "Search by ID, property, user, amount, status, payment mode...";

    return (
        <>
            <AdminNavbar />

            <div className="staff-page">
                {/* Header */}
                <div className="staff-header">
                    <h2>Transaction Summary</h2>
                    <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                        Total Transactions: {totalItems}
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
                    {/* Left Side: Search and Filters */}
                    <div className="toolbar-left">
                        {/* Search Box */}
                        <div className="search-box" style={{ position: 'relative', flex: 1 }}>
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
                                    minWidth: '400px'
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

                        {/* Advanced Filters Toggle */}
                        <button
                            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                            style={{
                                padding: '8px 12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                background: showAdvancedFilters ? '#273c75' : 'white',
                                color: showAdvancedFilters ? 'white' : '#333',
                                cursor: 'pointer',
                                fontSize: '14px',
                                marginLeft: '8px',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {showAdvancedFilters ? 'Hide Filters' : 'Show Filters'} 🔽
                        </button>
                    </div>

                    {/* Right Side: Export Button */}
                    <div className="toolbar-right">
                        {hasActiveFilters() && (
                            <button 
                                onClick={clearAllFilters}
                                style={{
                                    backgroundColor: '#6c757d',
                                    color: 'white',
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    border: 'none',
                                    marginRight: '8px'
                                }}
                            >
                                Clear Filters
                            </button>
                        )}
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

                {/* Advanced Filters */}
                {showAdvancedFilters && (
                    <div className="advanced-filters" style={{
                        padding: '16px',
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        marginTop: '12px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '16px',
                        alignItems: 'flex-end'
                    }}>
                        {/* Type Filter */}
                        <div style={{ minWidth: '150px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                                Transaction Type
                            </label>
                            <select 
                                value={selectedType}
                                onChange={handleTypeFilterChange}
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    width: '100%'
                                }}
                            >
                                {uniqueTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type === 'subscription' ? 'Subscriptions' : 
                                         type === 'product' ? 'Product Purchases' : type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div style={{ minWidth: '150px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                                Status
                            </label>
                            <select 
                                value={statusFilter}
                                onChange={handleStatusFilterChange}
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    width: '100%'
                                }}
                            >
                                {uniqueStatuses.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Payment Mode Filter */}
                        <div style={{ minWidth: '150px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                                Payment Mode
                            </label>
                            <select 
                                value={paymentModeFilter}
                                onChange={handlePaymentModeFilterChange}
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    width: '100%'
                                }}
                            >
                                {uniquePaymentModes.map((mode) => (
                                    <option key={mode} value={mode}>
                                        {mode}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date From */}
                        <div style={{ minWidth: '150px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                                Date From
                            </label>
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={handleDateFromChange}
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    width: '100%'
                                }}
                            />
                        </div>

                        {/* Date To */}
                        <div style={{ minWidth: '150px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                                Date To
                            </label>
                            <input
                                type="date"
                                value={dateTo}
                                onChange={handleDateToChange}
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    width: '100%'
                                }}
                            />
                        </div>

                        {/* Filter Hint */}
                        <div style={{ fontSize: '12px', color: '#666', flex: 1, textAlign: 'right' }}>
                            <span>💡 You can search by: transaction ID, property, plan, amount, status, payment mode</span>
                        </div>
                    </div>
                )}

                {/* Summary Cards */}
                <div className="summary-cards">
                    <div className="summary-card">
                        <div className="card-icon" style={{ background: '#e0f2fe' }}>
                            <span style={{ color: '#0284c7' }}>💰</span>
                        </div>
                        <div className="card-content">
                            <div className="card-value">{totalItems}</div>
                            <div className="card-label">Total Transactions</div>
                        </div>
                    </div>
                    <div className="summary-card">
                        <div className="card-icon" style={{ background: '#dcfce7' }}>
                            <span style={{ color: '#16a34a' }}>✓</span>
                        </div>
                        <div className="card-content">
                            <div className="card-value">
                                ₹{filteredTransactions
                                    .reduce((sum, item) => sum + parseFloat(item.paid_amount || 0), 0)
                                    .toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                            <div className="card-label">Total Amount</div>
                        </div>
                    </div>
                    <div className="summary-card">
                        <div className="card-icon" style={{ background: '#fef3c7' }}>
                            <span style={{ color: '#d97706' }}>⏳</span>
                        </div>
                        <div className="card-content">
                            <div className="card-value">
                                {filteredTransactions.filter(t => t.status === 'pending').length}
                            </div>
                            <div className="card-label">Pending</div>
                        </div>
                    </div>
                    <div className="summary-card">
                        <div className="card-icon" style={{ background: '#fee2e2' }}>
                            <span style={{ color: '#dc2626' }}>✗</span>
                        </div>
                        <div className="card-content">
                            <div className="card-value">
                                {filteredTransactions.filter(t => t.status === 'failed').length}
                            </div>
                            <div className="card-label">Failed</div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="staff-table-wrapper">
                    <table className="staff-table">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>TRANSACTION ID</th>
                                <th>DATE & TIME</th>
                                <th>PROPERTY NAME</th>
                                <th>PLAN NAME</th>
                                <th>PAYMENT TYPE</th>
                                <th>AMOUNT</th>
                                <th>PAYMENT MODE</th>
                                <th>ROLE</th>
                                <th>USER ID</th>
                                <th>STATUS</th>
                                <th>RECEIPT</th>
                                <th>DOCUMENT NO.</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="14" className="no-data">
                                        <div className="text-center py-4">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <p className="mt-2">Loading transactions...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : currentTransactions.length > 0 ? (
                                currentTransactions.map((transaction, index) => (
                                    <tr key={transaction.transaction_id}>
                                        <td>{startIndex + index + 1}</td>
                                        <td className="transaction-id">
                                            <strong>#{transaction.transaction_id}</strong>
                                        </td>
                                        <td>{transaction.displayDate}</td>
                                        <td className="property-cell">
                                            <div className="property-name">{transaction.property_name}</div>
                                        </td>
                                        <td>
                                            <span className="plan-badge">{transaction.plan_name}</span>
                                        </td>
                                        <td>
                                            <span className={`type-badge ${transaction.payment_type === 'Booking-Amount' ? 'booking' : 
                                                transaction.payment_type === 'Full-Amount' ? 'full' : 
                                                transaction.transaction_for === 'subscription' ? 'subscription' : 'product'}`}>
                                                {transaction.payment_type || mapTransactionFor(transaction.transaction_for)}
                                            </span>
                                        </td>
                                        <td className="amount-cell">
                                            <strong>₹{parseFloat(transaction.paid_amount).toLocaleString('en-IN')}</strong>
                                        </td>
                                        <td>
                                            <span className="mode-badge">{transaction.payment_mode}</span>
                                        </td>
                                        <td>
                                            <span className="role-badge">{transaction.role}</span>
                                        </td>
                                        <td className="username-cell">{transaction.user_id}</td>
                                        <td>
                                            <span 
                                                className="status-badge"
                                                style={{ 
                                                    backgroundColor: `${getStatusColor(transaction.status)}20`,
                                                    color: getStatusColor(transaction.status)
                                                }}
                                            >
                                                {transaction.status?.charAt(0).toUpperCase() + transaction.status?.slice(1)}
                                            </span>
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
                                        <td>
                                            {transaction.api_data?.document_number || '-'}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="14" className="no-data">
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
                                        ) : hasActiveFilters() ? (
                                            <div className="text-center py-4">
                                                <p>No transactions found matching your criteria</p>
                                                <button
                                                    onClick={clearAllFilters}
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
                                                    Clear All Filters
                                                </button>
                                            </div>
                                        ) : (
                                            "No transactions found"
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    
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
                                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} items
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

export default TransactionSummary;