import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './TransactionSummary.css';
import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
import { baseurl } from '../../BaseURL/BaseURL';
import Swal from "sweetalert2";

function AdminTransactionSummary() {

    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
    const [updatingCOD, setUpdatingCOD] = useState(null);
    const [uploadingFile, setUploadingFile] = useState(null);
    
    // Advanced filters
    const [selectedType, setSelectedType] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [paymentModeFilter, setPaymentModeFilter] = useState("All");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [selectedRole, setSelectedRole] = useState("All");
    const [selectedUserId, setSelectedUserId] = useState("");
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    
    // User data for dropdown
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [userSearchTerm, setUserSearchTerm] = useState("");
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    
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

    // Transaction For choices - Only Property related
    const TRANSACTION_FOR_CHOICES = {
        'property': 'Property',
        'product_commission': 'Product Commission'
    };

    // Role choices - Only Client and Agent
    const ROLE_CHOICES = ['Client', 'Agent'];

    // Status choices - match backend exactly
    const STATUS_CHOICES = ['All', 'success', 'pending', 'failed'];

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

    // Format date for API
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

    // Map transaction_for to more readable values
    const mapTransactionFor = (transactionFor) => {
        return TRANSACTION_FOR_CHOICES[transactionFor] || transactionFor;
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
            'upi': 'UPI',
            'netbanking': 'Net Banking',
            'card': 'Card'
        };
        return map[paymentMode] || paymentMode || 'N/A';
    };

    // Reverse map payment mode for API
    const reverseMapPaymentMode = (mode) => {
        const map = {
            'UPI': 'upi',
            'UPI QR': 'UPI_QR',
            'Net Banking': 'netbanking',
            'Credit Card': 'card',
            'Debit Card': 'card',
            'Card': 'card',
            'COD': 'cod'
        };
        return map[mode] || mode.toLowerCase();
    };

    // Get status badge color based on backend status
    const getStatusColor = (status) => {
        switch(status?.toLowerCase()) {
            case 'success': return '#10b981';
            case 'pending': return '#f59e0b';
            case 'failed': return '#ef4444';
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

    // Handle file upload for transaction
    const handleFileUpload = async (transaction, file) => {
        if (!file) {
            Swal.fire({
                icon: "warning",
                title: "No File",
                text: "Please select a file to upload",
            });
            return;
        }

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

        setUploadingFile(transaction.transaction_id);

        try {
            const formData = new FormData();
            formData.append('document_file', file);
            
            const response = await axios.patch(
                `${baseurl}/transactions/${transaction.transaction_id}/upload-document/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );
            
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Document uploaded successfully",
                timer: 2000,
                showConfirmButton: false
            });
            
            await fetchTransactions();
            
        } catch (error) {
            console.error('Error uploading file:', error);
            Swal.fire({
                icon: "error",
                title: "Upload Failed",
                text: error.response?.data?.message || "Failed to upload document",
                confirmButtonColor: "#6C63FF",
            });
        } finally {
            setUploadingFile(null);
        }
    };

    // Trigger file input click
    const triggerFileUpload = (transaction) => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.pdf,.jpg,.jpeg,.png';
        fileInput.onchange = (e) => {
            if (e.target.files && e.target.files[0]) {
                handleFileUpload(transaction, e.target.files[0]);
            }
        };
        fileInput.click();
    };

    // Fetch users from API
    const fetchUsers = async () => {
        setLoadingUsers(true);
        try {
            const response = await axios.get(`${baseurl}/users/`);
            console.log('Users API Response:', response.data);
            
            let usersList = [];
            if (response.data && response.data.results) {
                usersList = response.data.results;
            } else if (Array.isArray(response.data)) {
                usersList = response.data;
            } else if (response.data && response.data.data) {
                usersList = response.data.data;
            }
            
            setUsers(usersList);
        } catch (error) {
            console.error('Error fetching users:', error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to load users list",
                confirmButtonColor: "#6C63FF",
            });
        } finally {
            setLoadingUsers(false);
        }
    };

    // Fetch transactions from API - Only property related
    const fetchTransactions = async () => {
        setLoading(true);
        setError(null);
        try {
            let url = `${baseurl}/transactions/`; 
            const params = new URLSearchParams();
            
            // Filter only property-related transactions
            params.append('transaction_for', 'property');
            
            if (searchQuery.trim()) {
                params.append('search', searchQuery.trim());
            }
            
            if (selectedType !== "All") {
                const apiTransactionFor = Object.keys(TRANSACTION_FOR_CHOICES).find(
                    key => TRANSACTION_FOR_CHOICES[key] === selectedType
                );
                if (apiTransactionFor && apiTransactionFor !== 'property') {
                    params.append('transaction_for', apiTransactionFor);
                }
            }
            
            if (selectedRole !== "All" && (selectedRole === 'Client' || selectedRole === 'Agent')) {
                params.append('role_name', selectedRole);
            }
            
            if (selectedUserId && selectedUserId.trim()) {
                params.append('user_id', selectedUserId.trim());
            }
            
            if (statusFilter !== "All") {
                params.append('status', statusFilter);
            }
            
            if (paymentModeFilter !== "All") {
                params.append('payment_mode', reverseMapPaymentMode(paymentModeFilter));
            }
            
            if (dateFrom) {
                params.append('start_date', formatDateForAPI(dateFrom));
            }
            if (dateTo) {
                params.append('end_date', formatDateForAPI(dateTo));
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
                plan_name: item.plan_name || 'N/A',
                payment_type: item.payment_type || 'Property',
                transaction_for: item.transaction_for,
                paid_amount: item.paid_amount,
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
        const types = ["All", "Property"];
        setUniqueTypes(types);
        
        const statuses = ["All"];
        data.forEach(item => {
            const status = item.status;
            if (status && !statuses.includes(status)) {
                statuses.push(status);
            }
        });
        setUniqueStatuses(statuses);
        
        const modes = ["All"];
        data.forEach(item => {
            if (item.payment_mode && !modes.includes(item.payment_mode)) {
                modes.push(item.payment_mode);
            }
        });
        setUniquePaymentModes(modes);
    };

    // Filter users based on search term
    const getFilteredUsers = () => {
        if (!userSearchTerm) return users;
        const searchLower = userSearchTerm.toLowerCase();
        return users.filter(user => 
            (user.user_id && user.user_id.toString().includes(searchLower)) ||
            (user.first_name && user.first_name.toLowerCase().includes(searchLower)) ||
            (user.last_name && user.last_name.toLowerCase().includes(searchLower)) ||
            (user.email && user.email.toLowerCase().includes(searchLower)) ||
            (user.phone_number && user.phone_number.includes(searchLower))
        );
    };

    // Handle user selection
    const handleUserSelect = (user) => {
        setSelectedUserId(user.user_id.toString());
        setUserSearchTerm(`${user.user_id} - ${user.first_name || ''} ${user.last_name || ''} (${user.email})`);
        setShowUserDropdown(false);
        setCurrentPage(1);
    };

    // Clear selected user
    const clearSelectedUser = () => {
        setSelectedUserId("");
        setUserSearchTerm("");
        setShowUserDropdown(false);
        setCurrentPage(1);
    };

    // Fetch data when filters or pagination changes
    useEffect(() => {
        fetchTransactions();
    }, [currentPage, itemsPerPage, selectedType, searchQuery, statusFilter, paymentModeFilter, dateFrom, dateTo, selectedRole, selectedUserId]);

    // Load users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTransactions = filteredTransactions.slice(0, itemsPerPage);

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
            "Plan Name", "Transaction For", "Paid Amount", "Payment Mode",
            "Payment Method", "Role", "User ID", "PhonePe Merchant Order ID",
            "PhonePe Order ID", "PhonePe Transaction ID", "Document Number", "Status"
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
                    `"${mapTransactionFor(item.transaction_for)}"`,
                    `"${parseFloat(item.paid_amount).toLocaleString('en-IN')}"`,
                    `"${item.payment_mode}"`,
                    `"${item.payment_method}"`,
                    `"${item.role}"`,
                    `"${item.user_id}"`,
                    `"${item.phone_pe_merchant_order_id || ''}"`,
                    `"${item.phone_pe_order_id || ''}"`,
                    `"${item.phone_pe_transaction_id || ''}"`,
                    `"${item.document_number || ''}"`,
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

    const handleTypeFilterChange = (e) => {
        setSelectedType(e.target.value);
        setCurrentPage(1);
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1);
    };

    const handlePaymentModeFilterChange = (e) => {
        setPaymentModeFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleRoleFilterChange = (e) => {
        setSelectedRole(e.target.value);
        setCurrentPage(1);
    };

    const handleDateFromChange = (e) => {
        setDateFrom(e.target.value);
        setCurrentPage(1);
    };

    const handleDateToChange = (e) => {
        setDateTo(e.target.value);
        setCurrentPage(1);
    };

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
        setSelectedRole("All");
        clearSelectedUser();
        setCurrentPage(1);
    };

    // Check if any filters are active
    const hasActiveFilters = () => {
        return searchQuery !== "" || selectedType !== "All" || statusFilter !== "All" || 
               paymentModeFilter !== "All" || dateFrom !== "" || dateTo !== "" ||
               selectedRole !== "All" || selectedUserId !== "";
    };

    const handleRefresh = () => {
        fetchTransactions();
    };

    const searchPlaceholder = "Search by ID, order ID, property, plan, amount, status, payment mode...";

    // Render status cell with dropdown for COD transactions
    const renderStatusCell = (transaction) => {
        const isCODTransaction = isCOD(transaction);
        const isPending = transaction.status === 'pending';
        const isUpdating = updatingCOD === transaction.transaction_id;

        if (isCODTransaction && isPending) {
            return (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <select
                        value={transaction.status}
                        onChange={(e) => handleCODStatusUpdate(transaction.order, transaction, e.target.value)}
                        disabled={isUpdating}
                        style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            border: `1px solid ${getStatusColor(transaction.status)}`,
                            backgroundColor: '#fff',
                            fontSize: '12px',
                            cursor: 'pointer',
                            outline: 'none',
                            width: '100px'
                        }}
                    >
                        <option value="pending">pending</option>
                        <option value="success">success</option>
                    </select>
                    {isUpdating && (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    )}
                </div>
            );
        } else {
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
        }
    };

    // Render actions cell with upload button
    const renderActionsCell = (transaction) => {
        const isUploading = uploadingFile === transaction.transaction_id;
        
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                    onClick={() => triggerFileUpload(transaction)}
                    disabled={isUploading}
                    style={{
                        padding: '6px 12px',
                        backgroundColor: '#273c75',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: isUploading ? 'not-allowed' : 'pointer',
                        fontWeight: '500',
                        whiteSpace: 'nowrap',
                        opacity: isUploading ? 0.6 : 1
                    }}
                >
                    {isUploading ? (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ marginRight: '4px' }}></span>
                            Uploading...
                        </>
                    ) : (
                        '📄 Upload Files'
                    )}
                </button>
            </div>
        );
    };

    // Handle clicking outside the user dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            const userDropdownContainer = document.querySelector('.user-dropdown-container');
            if (userDropdownContainer && !userDropdownContainer.contains(event.target)) {
                setShowUserDropdown(false);
            }
        };

        if (showUserDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserDropdown]);

    return (
        <>
            <AdminNavbar />

            <div className="staff-page">
                {/* Header */}
                <div className="staff-header">
                    <h2>Property Transaction Summary</h2>
                    <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                        Total Property Transactions: {totalItems}
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
                        {/* Transaction Type Filter */}
                        <div style={{ minWidth: '180px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                                Transaction For
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
                                        {type === 'All' ? 'All Transactions' : type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Role Filter - Only Client and Agent */}
                        <div style={{ minWidth: '150px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                                Role
                            </label>
                            <select 
                                value={selectedRole}
                                onChange={handleRoleFilterChange}
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    width: '100%'
                                }}
                            >
                                <option value="All">All Roles</option>
                                {ROLE_CHOICES.map((role) => (
                                    <option key={role} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* User ID Filter with Searchable Dropdown */}
                        <div style={{ minWidth: '250px', position: 'relative' }} className="user-dropdown-container">
                            <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                                Select User
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    placeholder="Search by ID, Name, Email, or Phone..."
                                    value={userSearchTerm}
                                    onChange={(e) => {
                                        setUserSearchTerm(e.target.value);
                                        setShowUserDropdown(true);
                                        if (e.target.value === "") {
                                            setSelectedUserId("");
                                        }
                                    }}
                                    onFocus={() => setShowUserDropdown(true)}
                                    style={{
                                        padding: '8px 12px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                        width: '100%',
                                        paddingRight: selectedUserId ? '30px' : '12px'
                                    }}
                                />
                                {selectedUserId && (
                                    <button
                                        onClick={clearSelectedUser}
                                        style={{
                                            position: 'absolute',
                                            right: '8px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: '#999',
                                            fontSize: '16px'
                                        }}
                                    >
                                        ✕
                                    </button>
                                )}
                                
                                {/* User Dropdown */}
                                {showUserDropdown && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        right: 0,
                                        maxHeight: '300px',
                                        overflowY: 'auto',
                                        backgroundColor: 'white',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                        zIndex: 1000,
                                        marginTop: '2px'
                                    }}>
                                        {loadingUsers ? (
                                            <div style={{ padding: '12px', textAlign: 'center', color: '#666' }}>
                                                Loading users...
                                            </div>
                                        ) : getFilteredUsers().length === 0 ? (
                                            <div style={{ padding: '12px', textAlign: 'center', color: '#666' }}>
                                                No users found
                                            </div>
                                        ) : (
                                            getFilteredUsers().map((user) => (
                                                <div
                                                    key={user.user_id}
                                                    onClick={() => handleUserSelect(user)}
                                                    style={{
                                                        padding: '10px 12px',
                                                        cursor: 'pointer',
                                                        borderBottom: '1px solid #f0f0f0',
                                                        transition: 'background 0.2s'
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                                >
                                                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                                                        ID: {user.user_id}
                                                    </div>
                                                    <div style={{ fontSize: '12px', color: '#666' }}>
                                                        {user.first_name || ''} {user.last_name || ''}
                                                        {user.email && ` • ${user.email}`}
                                                        {user.phone_number && ` • ${user.phone_number}`}
                                                    </div>
                                                    {user.roles && user.roles.length > 0 && (
                                                        <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                                                            Role: {user.roles.map(r => r.role_name).join(', ')}
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
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
                                        {status === 'All' ? 'All Statuses' : status}
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
                            <span>💡 You can search by: transaction ID, order ID, property, plan, amount, status, payment mode</span>
                        </div>
                    </div>
                )}

                {/* Summary Cards */}
                <div className="summary-cards">
                    <div className="summary-card">
                        <div className="card-icon" style={{ background: '#e0f2fe' }}>
                            <span style={{ color: '#0284c7' }}>₹</span>
                        </div>
                        <div className="card-content">
                            <div className="card-value">{totalItems}</div>
                            <div className="card-label">Total Property Transactions</div>
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
                                <th>ORDER ID</th>
                                <th>DATE & TIME</th>
                                <th>PROPERTY NAME</th>
                                <th>PLAN NAME</th>
                                <th>TRANSACTION FOR</th>
                                <th>AMOUNT</th>
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
                                    <td colSpan="16" className="no-data">
                                        <div className="text-center py-4">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <p className="mt-2">Loading property transactions...</p>
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
                                        <td>{transaction.displayDate}</td>
                                        <td className="property-cell">
                                            <div className="property-name">{transaction.property_name}</div>
                                        </td>
                                        <td>
                                            <span className="plan-badge">{transaction.plan_name}</span>
                                        </td>
                                        <td>
                                            <span className={`type-badge ${transaction.payment_type === 'Booking-Amount' ? 'booking' : 
                                                transaction.payment_type === 'Full-Amount' ? 'full' : 'property'}`}>
                                                {mapTransactionFor(transaction.transaction_for)}
                                            </span>
                                        </td>
                                        <td className="amount-cell">
                                            <strong>₹{parseFloat(transaction.paid_amount).toLocaleString('en-IN')}</strong>
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
                                    <td colSpan="16" className="no-data">
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
                                                <p>No property transactions found matching your criteria</p>
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
                                            "No property transactions found"
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
                select.status-dropdown {
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 500;
                    cursor: pointer;
                    outline: none;
                }
                select.status-dropdown:focus {
                    border-color: #273c75;
                }
                select.status-dropdown:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                .role-badge {
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 500;
                    background-color: #e0e7ff;
                    color: #4338ca;
                }
            `}</style>
        </>
    );
}

export default AdminTransactionSummary;