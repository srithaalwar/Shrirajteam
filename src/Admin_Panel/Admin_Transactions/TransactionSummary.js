import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { baseurl } from '../../BaseURL/BaseURL';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TransactionSummary.css';
import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";

function TransactionSummary() {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Static data
    const staticTransactions = [
        {
            transaction_id: 1001,
            transaction_date: "2024-01-15 10:30:00",
            property_name: "Sunrise Apartments",
            plan_name: "Premium Plan",
            payment_type: "Booking-Amount",
            transaction_for: "booking",
            paid_amount: "50000.00",
            payment_mode: "Online",
            role: "Buyer",
            username: "john_doe",
            user_id: 101,
            phone_pe_merchant_order_id: "M123456789",
            phone_pe_order_id: "O987654321",
            phone_pe_transaction_id: "T456789123",
            document_file: "/uploads/receipt_1001.pdf",
            status: "completed"
        },
        {
            transaction_id: 1002,
            transaction_date: "2024-01-14 14:45:00",
            property_name: "Ocean View Villa",
            plan_name: "Basic Plan",
            payment_type: "Full-Amount",
            transaction_for: "booking",
            paid_amount: "2500000.00",
            payment_mode: "Bank Transfer",
            role: "Investor",
            username: "alice_smith",
            user_id: 102,
            phone_pe_merchant_order_id: "M234567890",
            phone_pe_order_id: "O876543210",
            phone_pe_transaction_id: "T567891234",
            document_file: "/uploads/receipt_1002.pdf",
            status: "completed"
        },
        {
            transaction_id: 1003,
            transaction_date: "2024-01-13 09:15:00",
            property_name: "Mountain Retreat",
            plan_name: "Gold Subscription",
            payment_type: "Subscription",
            transaction_for: "subscription",
            paid_amount: "15000.00",
            payment_mode: "Credit Card",
            role: "Agent",
            username: "bob_wilson",
            user_id: 103,
            phone_pe_merchant_order_id: "M345678901",
            phone_pe_order_id: "O765432109",
            phone_pe_transaction_id: "T678912345",
            document_file: null,
            status: "pending"
        },
        {
            transaction_id: 1004,
            transaction_date: "2024-01-12 16:20:00",
            property_name: "City Center Plaza",
            plan_name: "Enterprise Plan",
            payment_type: "Booking-Amount",
            transaction_for: "booking",
            paid_amount: "75000.00",
            payment_mode: "UPI",
            role: "Corporate",
            username: "corporate_xyz",
            user_id: 104,
            phone_pe_merchant_order_id: "M456789012",
            phone_pe_order_id: "O654321098",
            phone_pe_transaction_id: "T789123456",
            document_file: "/uploads/receipt_1004.pdf",
            status: "completed"
        },
        {
            transaction_id: 1005,
            transaction_date: "2024-01-11 11:00:00",
            property_name: "Garden View Residency",
            plan_name: "Silver Subscription",
            payment_type: "Subscription",
            transaction_for: "subscription",
            paid_amount: "10000.00",
            payment_mode: "Debit Card",
            role: "Buyer",
            username: "sarah_johnson",
            user_id: 105,
            phone_pe_merchant_order_id: "M567890123",
            phone_pe_order_id: "O543210987",
            phone_pe_transaction_id: "T891234567",
            document_file: "/uploads/receipt_1005.pdf",
            status: "failed"
        },
        {
            transaction_id: 1006,
            transaction_date: "2024-01-10 13:30:00",
            property_name: "Luxury Penthouse",
            plan_name: "Platinum Plan",
            payment_type: "Full-Amount",
            transaction_for: "booking",
            paid_amount: "5000000.00",
            payment_mode: "Online",
            role: "Investor",
            username: "mike_brown",
            user_id: 106,
            phone_pe_merchant_order_id: "M678901234",
            phone_pe_order_id: "O432109876",
            phone_pe_transaction_id: "T912345678",
            document_file: null,
            status: "completed"
        },
        {
            transaction_id: 1007,
            transaction_date: "2024-01-09 15:45:00",
            property_name: "Lakefront Villas",
            plan_name: "Premium Plan",
            payment_type: "Booking-Amount",
            transaction_for: "booking",
            paid_amount: "60000.00",
            payment_mode: "Net Banking",
            role: "Buyer",
            username: "emma_watson",
            user_id: 107,
            phone_pe_merchant_order_id: "M789012345",
            phone_pe_order_id: "O321098765",
            phone_pe_transaction_id: "T123456789",
            document_file: "/uploads/receipt_1007.pdf",
            status: "completed"
        },
        {
            transaction_id: 1008,
            transaction_date: "2024-01-08 10:00:00",
            property_name: "Tech Park Office",
            plan_name: "Business Plan",
            payment_type: "Full-Amount",
            transaction_for: "booking",
            paid_amount: "3000000.00",
            payment_mode: "Bank Transfer",
            role: "Corporate",
            username: "tech_corp",
            user_id: 108,
            phone_pe_merchant_order_id: "M890123456",
            phone_pe_order_id: "O210987654",
            phone_pe_transaction_id: "T234567890",
            document_file: "/uploads/receipt_1008.pdf",
            status: "completed"
        },
        {
            transaction_id: 1009,
            transaction_date: "2024-01-07 12:15:00",
            property_name: "Beachside Bungalow",
            plan_name: "Standard Plan",
            payment_type: "Booking-Amount",
            transaction_for: "booking",
            paid_amount: "45000.00",
            payment_mode: "UPI",
            role: "Buyer",
            username: "david_lee",
            user_id: 109,
            phone_pe_merchant_order_id: "M901234567",
            phone_pe_order_id: "O109876543",
            phone_pe_transaction_id: "T345678901",
            document_file: "/uploads/receipt_1009.pdf",
            status: "completed"
        },
        {
            transaction_id: 1010,
            transaction_date: "2024-01-06 14:30:00",
            property_name: "Hilltop Mansion",
            plan_name: "Diamond Plan",
            payment_type: "Full-Amount",
            transaction_for: "booking",
            paid_amount: "7500000.00",
            payment_mode: "Online",
            role: "Investor",
            username: "sophia_clark",
            user_id: 110,
            phone_pe_merchant_order_id: "M012345678",
            phone_pe_order_id: "O098765432",
            phone_pe_transaction_id: "T456789012",
            document_file: null,
            status: "pending"
        }
    ];

    const formatDateTime = (dateString) => {
        if (!dateString) return 'N/A';
        
        if (typeof dateString === 'string') {
            const datePart = dateString.split(' ')[0];
            const timePart = dateString.split(' ')[1];
            const [year, month, day] = datePart.split('-');
            const time = timePart.substring(0, 5); // Remove seconds
            return `${day}/${month}/${year} ${time}`;
        }
        
        return 'Invalid Date';
    };

    // Map role similar to Users page
    const mapRole = (role) => {
        if (role === "Agent") return "Team";
        if (role === "Client") return "User";
        return role;
    };

    // Get status badge color
    const getStatusColor = (status) => {
        switch(status?.toLowerCase()) {
            case 'completed': return '#10b981';
            case 'pending': return '#f59e0b';
            case 'failed': return '#ef4444';
            default: return '#6b7280';
        }
    };

    useEffect(() => {
        // Set static data directly
        setTransactions(staticTransactions);
        setFilteredTransactions(staticTransactions);
        setLoading(false);
    }, []);

    // Apply filters and search
    useEffect(() => {
        let result = [...staticTransactions];

        // Apply type filter
        if (filter === 'Booking-Amount') {
            result = result.filter(item => item.payment_type === 'Booking-Amount');
        } else if (filter === 'Full-Amount') {
            result = result.filter(item => item.payment_type === 'Full-Amount');
        } else if (filter === 'subscription') {
            result = result.filter(item => item.transaction_for === 'subscription');
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
                    (item.status && item.status.toLowerCase().includes(searchLower))
                );
            });
        }

        setFilteredTransactions(result);
    }, [filter, searchQuery]);

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
            "Status"
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
                    `"${item.payment_type}"`,
                    `"${item.transaction_for}"`,
                    `"₹${parseFloat(item.paid_amount).toLocaleString('en-IN')}"`,
                    `"${item.payment_mode}"`,
                    `"${mapRole(item.role)}"`,
                    `"${item.username}"`,
                    item.user_id,
                    `"${item.phone_pe_merchant_order_id}"`,
                    `"${item.phone_pe_order_id || ''}"`,
                    `"${item.phone_pe_transaction_id || ''}"`,
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

    // Get unique payment modes for filter
    const uniquePaymentModes = ["All", ...new Set(staticTransactions.map(t => t.payment_mode).filter(Boolean))];

    return (
        <>
            <AdminNavbar />

            <div className="staff-page">
                {/* Header */}
                <div className="staff-header">
                    <h2>Transaction Summary</h2>
                </div>

                {/* Toolbar */}
                <div className="staff-toolbar">
                    {/* Left Side: Search and Filter */}
                    <div className="toolbar-left">
                        {/* Payment Mode Filter */}
                        <div className="filter-container">
                            <select 
                                className="role-filter"
                                value={filter}
                                onChange={handleFilterChange}
                            >
                                <option value="all">All Transactions</option>
                                <option value="Booking-Amount">Booking Amount</option>
                                <option value="Full-Amount">Full Amount</option>
                                <option value="subscription">Subscriptions</option>
                            </select>
                        </div>

                        {/* Search Box */}
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Search by ID, property, user, amount..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <span className="search-icon">🔍</span>
                        </div>
                    </div>

                    {/* Right Side: Export Button */}
                    <div className="toolbar-right">
                        <button 
                            className="export-btn"
                            style={{
                                backgroundColor: '#273c75',
                                borderColor: '#273c75',
                                color: 'white'
                            }}
                            onClick={exportToExcel}
                        >
                            Export Excel
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="summary-cards">
                    <div className="summary-card">
                        <div className="card-icon" style={{ background: '#e0f2fe' }}>
                            <span style={{ color: '#0284c7' }}>💰</span>
                        </div>
                        <div className="card-content">
                            <div className="card-value">{filteredTransactions.length}</div>
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
                                <th>USERNAME</th>
                                <th>USER ID</th>
                                <th>STATUS</th>
                                <th>RECEIPT</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="13" className="no-data">
                                        Loading...
                                    </td>
                                </tr>
                            ) : currentTransactions.length > 0 ? (
                                currentTransactions.map((transaction, index) => (
                                    <tr key={transaction.transaction_id}>
                                        <td>{startIndex + index + 1}</td>
                                        <td className="transaction-id">
                                            <strong>#{transaction.transaction_id}</strong>
                                        </td>
                                        <td>{formatDateTime(transaction.transaction_date)}</td>
                                        <td className="property-cell">
                                            <div className="property-name">{transaction.property_name}</div>
                                        </td>
                                        <td>
                                            <span className="plan-badge">{transaction.plan_name}</span>
                                        </td>
                                        <td>
                                            <span className={`type-badge ${transaction.payment_type === 'Booking-Amount' ? 'booking' : 
                                                transaction.payment_type === 'Full-Amount' ? 'full' : 'subscription'}`}>
                                                {transaction.payment_type}
                                            </span>
                                        </td>
                                        <td className="amount-cell">
                                            <strong>₹{parseFloat(transaction.paid_amount).toLocaleString('en-IN')}</strong>
                                        </td>
                                        <td>
                                            <span className="mode-badge">{transaction.payment_mode}</span>
                                        </td>
                                        <td>
                                            <span className="role-badge">{mapRole(transaction.role)}</span>
                                        </td>
                                        <td className="username-cell">{transaction.username}</td>
                                        <td>{transaction.user_id}</td>
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
                                                    href={transaction.document_file}
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
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="13" className="no-data">
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

export default TransactionSummary;