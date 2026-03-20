import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
// import "./Users.css";

// ✅ Format date for display (dd/mm/yyyy)
const formatDateForDisplay = (dateTimeString) => {
  if (!dateTimeString) return "";
  try {
    // Parse date string from format "20-03-2026 15:35:12"
    const parts = dateTimeString.split(' ');
    const dateParts = parts[0].split('-');
    if (dateParts.length === 3) {
      const day = dateParts[0];
      const month = dateParts[1];
      const year = dateParts[2];
      return `${day}/${month}/${year}`;
    }
    
    // Fallback to standard date parsing
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) return dateTimeString;
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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

// ✅ ROLE MAPPING FUNCTION
const mapRole = (role) => {
  if (role === "Agent") return "Team";
  if (role === "Client") return "User";
  if (role === "Admin") return "Admin";
  return role || "";
};

// ✅ Reverse role mapping for API
const reverseMapRole = (role) => {
  if (role === "Team") return "agent";
  if (role === "User") return "client";
  if (role === "Admin") return "admin";
  return role.toLowerCase();
};

const TotalReferrals = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [loading, setLoading] = useState(true);
  const [uniqueRoles, setUniqueRoles] = useState(["All"]);
  
  // Advanced filters
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [hasReferrer, setHasReferrer] = useState(true); // Track if we're filtering by referrer

  // Fetch data from API
  const fetchStaff = async () => {
    setLoading(true);
    try {
      // Build URL with has_referrer filter
      let url = `${baseurl}/users/search/`;
      const params = new URLSearchParams();
      
      // Add has_referrer filter - always true for this view
      params.append('has_referrer', 'true');
      
      // Add search query (this handles global search across all fields)
      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }
      
      // Add role filter if not "All"
      if (selectedRole !== "All") {
        params.append('role', reverseMapRole(selectedRole));
      }
      
      // Add status filter if not "All"
      if (statusFilter !== "All") {
        params.append('status', statusFilter.toLowerCase());
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
      
      const res = await axios.get(url);
      
      // Handle API response
      let data = [];
      let count = 0;
      
      if (res.data && res.data.results) {
        data = res.data.results || [];
        count = res.data.count || data.length;
      } else if (Array.isArray(res.data)) {
        data = res.data;
        count = res.data.length;
      } else {
        data = [];
        count = 0;
      }
      
      console.log("API Response Data:", data);
      
      // Transform data
      const transformed = data.map((user) => ({
        id: user.user_id,
        user_id: user.user_id,
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        name: `${user.first_name || ''} ${user.last_name || ''}`.trim(),
        email: user.email || "",
        phone: user.phone_number || "",
        status: user.status || "inactive",
        role: mapRole(user.roles?.[0]?.role_name || ""),
        referralId: user.referral_id || "N/A",
        referredBy: user.referred_by || "N/A",
        levelNo: user.level_no || "N/A",
        kycStatus: user.kyc_status || "pending",
        fullData: user,
        created_at: user.created_at || "",
        displayDate: formatDateForDisplay(user.created_at || ""),
        walletBalance: user.wallet_balance || "0.00",
        city: user.city || "",
        state: user.state || "",
        country: user.country || "",
        username: user.username || ""
      }));
      
      console.log("Transformed Data:", transformed);
      
      setStaff(transformed);
      setFilteredStaff(transformed);
      setTotalItems(count);
      
      // Calculate total pages
      const calculatedPages = Math.ceil(count / itemsPerPage);
      setTotalPages(calculatedPages || 1);
      
      // Extract unique roles for filter dropdown
      const roles = ["All"];
      transformed.forEach(user => {
        if (user.role && !roles.includes(user.role)) {
          roles.push(user.role);
        }
      });
      setUniqueRoles(roles);
      
    } catch (err) {
      console.error("Error fetching staff:", err.response || err.message || err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to load staff data: ${err.response?.data?.message || err.message}`,
        confirmButtonColor: "#6C63FF",
      });
      setStaff([]);
      setFilteredStaff([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when filters or pagination changes
  useEffect(() => {
    fetchStaff();
  }, [currentPage, itemsPerPage, selectedRole, searchQuery, statusFilter, dateFrom, dateTo]);

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
    setCurrentPage(1); // Reset to first page when changing items per page
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
    if (staff.length === 0) {
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
      "Username",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Role",
      "Referral ID",
      "Referred By",
      "Level No",
      "Created At",
      "Status",
      "KYC Status",
      "Wallet Balance",
      "City",
      "State",
      "Country"
    ];

    const csvContent = [
      headers.join(","),
      ...staff.map((user, index) =>
        [
          index + 1,
          user.id,
          `"${user.username || ''}"`,
          `"${user.first_name}"`,
          `"${user.last_name}"`,
          `"${user.email}"`,
          `"${user.phone}"`,
          `"${user.role}"`,
          `"${user.referralId}"`,
          `"${user.referredBy}"`,
          `"${user.levelNo}"`,
          `"${user.displayDate}"`,
          `"${user.status}"`,
          `"${user.kycStatus}"`,
          `"${user.walletBalance}"`,
          `"${user.city || ''}"`,
          `"${user.state || ''}"`,
          `"${user.country || ''}"`
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().split("T")[0];

    link.setAttribute("href", url);
    link.setAttribute("download", `users_with_referrer_${timestamp}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Swal.fire({
      icon: "success",
      title: "Export Successful",
      text: `Exported ${staff.length} users to CSV file.`,
      timer: 2000,
      showConfirmButton: false
    });
  };

  // Handle search change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle role filter change
  const handleRoleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedRole(value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Handle status filter change
  const handleStatusFilterChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
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

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedRole("All");
    setStatusFilter("All");
    setDateFrom("");
    setDateTo("");
    setCurrentPage(1);
  };

  // Handle search submit on Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchStaff();
    }
  };

  // Check if any filters are active
  const hasActiveFilters = () => {
    return searchQuery !== "" || 
           selectedRole !== "All" || 
           statusFilter !== "All" || 
           dateFrom !== "" || 
           dateTo !== "";
  };

  // Calculate start index for serial numbers
  const startIndex = (currentPage - 1) * itemsPerPage;

  // Search placeholder text showing what can be searched
  const searchPlaceholder = "Search by name, email, phone, referral ID, status (active/inactive), role (admin/agent/client), date (YYYY-MM-DD), user ID...";

  return (
    <>
      <WebsiteNavbar />

      <div className="staff-page">
        {/* Header */}
        <div className="staff-header">
          <h2>Users with Referrers</h2>
          <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
            Total Users with Referrers: {totalItems}
          </div>
        </div>

        {/* Toolbar */}
        <div className="staff-toolbar">
          {/* Left Side: Search and Filters */}
          <div className="toolbar-left">
            {/* Search Box - Enhanced with better placeholder */}
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
                title="Search across all fields: name, email, phone, referral ID, status, role, date, user ID"
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
              disabled={staff.length === 0}
            >
              Export Excel
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
            {/* Role Filter */}
            <div style={{ minWidth: '150px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                Role
              </label>
              <select 
                className="role-filter"
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
                {uniqueRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
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
                <option value="All">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Date From */}
            <div style={{ minWidth: '150px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                Created From
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
                Created To
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
              <span>💡 Showing users who have a referrer. You can also search by: user ID, status (active/inactive), date, role name</span>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="staff-table-wrapper">
          <table className="staff-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>S.No.</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>User ID</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>NAME</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>EMAIL</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>MOBILE</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>ROLE</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>REFERRAL ID</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>REFERRED BY</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>LEVEL NO</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>CREATED AT</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>STATUS</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>WALLET</th>
               </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="12" style={{ padding: '40px', textAlign: 'center' }}>
                    <div style={{ fontSize: '16px', color: '#666' }}>
                      Loading users...
                    </div>
                  </td>
                </tr>
              ) : filteredStaff.length > 0 ? (
                filteredStaff.map((user, index) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>{startIndex + index + 1}</td>
                    <td style={{ padding: '12px' }}>{user.id}</td>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{user.name || "N/A"}</td>
                    <td style={{ padding: '12px' }}>{user.email || "N/A"}</td>
                    <td style={{ padding: '12px' }}>{user.phone || "N/A"}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: user.role === 'Admin' ? '#e3f2fd' : 
                                       user.role === 'Team' ? '#e8f5e9' : '#f3e5f5',
                        color: user.role === 'Admin' ? '#1976d2' : 
                               user.role === 'Team' ? '#388e3c' : '#7b1fa2'
                      }}>
                        {user.role || "N/A"}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        fontFamily: 'monospace',
                        fontWeight: '500',
                        color: '#273c75'
                      }}>
                        {user.referralId || "N/A"}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        fontFamily: 'monospace',
                        fontWeight: '500',
                        color: '#e67e22'
                      }}>
                        {user.referredBy || "N/A"}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: '#fff3e0',
                        color: '#f39c12'
                      }}>
                        Level {user.levelNo}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>{user.displayDate || "N/A"}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: user.status === "active" ? '#e8f5e9' : '#ffebee',
                        color: user.status === "active" ? '#2e7d32' : '#c62828'
                      }}>
                        {user.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        fontWeight: '600',
                        color: '#27ae60'
                      }}>
                        ₹{parseFloat(user.walletBalance).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" style={{ padding: '40px', textAlign: 'center' }}>
                    <div style={{ fontSize: '16px', color: '#666' }}>
                      {hasActiveFilters() ? 
                        "No users found matching your criteria" : 
                        "No users with referrers found"}
                    </div>
                    {hasActiveFilters() && (
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
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {filteredStaff.length > 0 && totalPages > 1 && (
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
    </>
  );
};

export default TotalReferrals;