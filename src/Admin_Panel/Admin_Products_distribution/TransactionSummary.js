import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TransactionSummary.css';
import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
import { baseurl } from '../../BaseURL/BaseURL';
import Swal from "sweetalert2";

function AdminTransactionSummary() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [distributingCommission, setDistributingCommission] = useState(null);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    
    // Track which orders have commission distributed
    const [commissionDistributedOrders, setCommissionDistributedOrders] = useState(new Set());

    // API URL with filters
    const API_URL = `${baseurl}/transactions/?role_name=Agent&transaction_for=product`;

    // Format date for display
    const formatDateForDisplay = (dateTimeString) => {
        if (!dateTimeString) return "";
        return dateTimeString;
    };

    // Get status badge color
    const getStatusColor = (status) => {
        switch(status?.toLowerCase()) {
            case 'success': return '#10b981';
            case 'pending': return '#f59e0b';
            case 'failed': return '#ef4444';
            default: return '#6b7280';
        }
    };

    // Handle commission distribution
    const handleDistributeCommission = async (transaction) => {
        if (!transaction.order) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Order ID is missing for this transaction",
            });
            return;
        }

        // Check if commission already distributed
        if (commissionDistributedOrders.has(transaction.order)) {
            Swal.fire({
                icon: "info",
                title: "Already Distributed",
                text: "Commission has already been distributed for this order",
                confirmButtonColor: "#6C63FF",
            });
            return;
        }

        setDistributingCommission(transaction.transaction_id);

        try {
            const payload = {
                buyer_user_id: transaction.user_id,
                order_id: transaction.order
            };

            console.log("Distributing commission with payload:", payload);

            const response = await axios.post(`${baseurl}/product-distribute-commission/`, payload);
            
            console.log("Commission distribution response:", response.data);

            if (response.data.message === "Commission already distributed for this order") {
                // Mark as distributed
                setCommissionDistributedOrders(prev => new Set([...prev, transaction.order]));
                
                Swal.fire({
                    icon: "info",
                    title: "Already Distributed",
                    text: response.data.message,
                    confirmButtonColor: "#6C63FF",
                });
            } else if (response.data.message === "Commission distributed successfully") {
                // Mark as distributed
                setCommissionDistributedOrders(prev => new Set([...prev, transaction.order]));
                
                // Show detailed success message
                const distributedLevels = response.data.distributed_levels || 0;
                const totalCommission = response.data.total_commission || "0";
                
                Swal.fire({
                    icon: "success",
                    title: "Commission Distributed",
                    html: `
                        <div style="text-align: left;">
                            <p><strong>${response.data.message}</strong></p>
                            <p>Order ID: ${response.data.order_id}</p>
                            <p>Total Commission: ₹${parseFloat(totalCommission).toLocaleString('en-IN')}</p>
                            <p>Levels Distributed: ${distributedLevels}</p>
                        </div>
                    `,
                    confirmButtonColor: "#6C63FF",
                });
                
                // Refresh transactions to update any changes
                await fetchTransactions();
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: response.data.message || "Commission distributed successfully",
                    confirmButtonColor: "#6C63FF",
                });
                
                // Mark as distributed
                setCommissionDistributedOrders(prev => new Set([...prev, transaction.order]));
                await fetchTransactions();
            }
            
        } catch (error) {
            console.error('Error distributing commission:', error);
            
            let errorMessage = "Failed to distribute commission";
            
            if (error.response) {
                console.error("Error response:", error.response.data);
                errorMessage = error.response.data?.error || 
                              error.response.data?.message || 
                              error.response.statusText ||
                              "Failed to distribute commission";
                
                // Check for specific error messages from backend
                if (errorMessage.includes("not found")) {
                    errorMessage = "Buyer or Order not found";
                } else if (errorMessage.includes("only for agents")) {
                    errorMessage = "Commission distribution is applicable only for agents";
                } else if (errorMessage.includes("no upline")) {
                    errorMessage = "Agent has no upline for commission distribution";
                } else if (errorMessage.includes("successful payment")) {
                    errorMessage = "Commission only available after successful payment";
                }
            }
            
            Swal.fire({
                icon: "error",
                title: "Error",
                text: errorMessage,
                confirmButtonColor: "#6C63FF",
            });
        } finally {
            setDistributingCommission(null);
        }
    };

    // Fetch transactions
    const fetchTransactions = async () => {
        setLoading(true);
        setError(null);
        try {
            const url = `${API_URL}&page=${currentPage}&page_size=${itemsPerPage}`;
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
            
            // Fetch ALL commission transactions to check which orders have commission
            let allCommissionTransactions = [];
            try {
                const commissionResponse = await axios.get(`${baseurl}/transactions/?transaction_for=product_commission&page_size=1000`);
                if (commissionResponse.data && commissionResponse.data.results) {
                    allCommissionTransactions = commissionResponse.data.results;
                } else if (Array.isArray(commissionResponse.data)) {
                    allCommissionTransactions = commissionResponse.data;
                }
            } catch (err) {
                console.error("Error fetching commission transactions:", err);
            }
            
            // Check for existing commission transactions to mark which orders already have commission
            const ordersWithCommission = new Set();
            allCommissionTransactions.forEach(commission => {
                if (commission.order) {
                    ordersWithCommission.add(commission.order);
                }
            });
            
            setCommissionDistributedOrders(ordersWithCommission);
            setTransactions(data);
            setTotalItems(count);
            const calculatedPages = Math.ceil(count / itemsPerPage);
            setTotalPages(calculatedPages || 1);
            
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setError(`Failed to fetch transactions: ${error.message}`);
            setTransactions([]);
            setTotalItems(0);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data when pagination changes
    useEffect(() => {
        fetchTransactions();
    }, [currentPage, itemsPerPage]);

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTransactions = transactions;

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

    const handleRefresh = () => {
        fetchTransactions();
    };

    // Render actions cell with commission button
    const renderActionsCell = (transaction) => {
        // Only show for success status
        if (transaction.status === 'success') {
            const isDistributing = distributingCommission === transaction.transaction_id;
            const isAlreadyDistributed = transaction.order && commissionDistributedOrders.has(transaction.order);
            
            return (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                        onClick={() => handleDistributeCommission(transaction)}
                        disabled={isDistributing || isAlreadyDistributed}
                        style={{
                            padding: '6px 12px',
                            backgroundColor: isAlreadyDistributed ? '#9ca3af' : '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            cursor: isDistributing || isAlreadyDistributed ? 'not-allowed' : 'pointer',
                            fontWeight: '500',
                            whiteSpace: 'nowrap',
                            opacity: isDistributing || isAlreadyDistributed ? 0.6 : 1
                        }}
                    >
                        {isDistributing ? (
                            <>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ marginRight: '4px' }}></span>
                                Distributing...
                            </>
                        ) : isAlreadyDistributed ? (
                            'Commission Distributed ✓'
                        ) : (
                            'Distribute Commission'
                        )}
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
                    <h2>Transaction Summary - Agent Product Transactions</h2>
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

                {/* Table */}
                <div className="staff-table-wrapper">
                    <table className="staff-table">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>TRANSACTION ID</th>
                                <th>ORDER ID</th>
                                <th>DATE & TIME</th>
                                <th>AMOUNT</th>
                                <th>PAYMENT MODE</th>
                                <th>PAYMENT METHOD</th>
                                <th>USER ID</th>
                                <th>STATUS</th>
                                <th>DOCUMENT NO.</th>
                                <th>RECEIPT</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="12" className="no-data">
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
                                            <strong>{transaction.transaction_id}</strong>
                                        </td>
                                        <td>
                                            {transaction.order ? (
                                                <span className="order-badge">{transaction.order}</span>
                                            ) : (
                                                <span className="text-muted">-</span>
                                            )}
                                        </td>
                                        <td>{transaction.transaction_date}</td>
                                        <td className="amount-cell">
                                            <strong>₹{parseFloat(transaction.paid_amount).toLocaleString('en-IN')}</strong>
                                        </td>
                                        <td>
                                            <span className="mode-badge">{transaction.payment_mode || 'N/A'}</span>
                                        </td>
                                        <td>
                                            <span className={`method-badge ${transaction.payment_method === 'COD' ? 'cod' : 'online'}`}>
                                                {transaction.payment_method || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="username-cell">{transaction.user_id}</td>
                                        <td>
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
                                        </td>
                                        <td className="document-cell">
                                            {transaction.document_number || '-'}
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
                                        <td className="actions-cell">
                                            {renderActionsCell(transaction)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="12" className="no-data">
                                        No transactions found
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
                .amount-cell {
                    font-weight: 600;
                }
                .transaction-id {
                    font-family: monospace;
                }
                .actions-cell {
                    text-align: center;
                }
            `}</style>
        </>
    );
}

export default AdminTransactionSummary;