
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import "./Users.css";

// ✅ Format date for display (dd/mm/yyyy)
const formatDateForDisplay = (dateTimeString) => {
  if (!dateTimeString) return "";
  try {
    // Handle different date formats
    if (dateTimeString.includes("-")) {
      const datePart = dateTimeString.split(" ")[0];
      const [day, month, year] = datePart.split("-");
      return `${day}/${month}/${year}`;
    }
    return dateTimeString;
  } catch (error) {
    console.error("Error formatting date:", error);
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

const UserList = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [loading, setLoading] = useState(true);
  const [uniqueRoles, setUniqueRoles] = useState(["All"]);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch data from API
  const fetchStaff = async () => {
    setLoading(true);
    try {
      let url = `${baseurl}/users/search/`;
      const params = new URLSearchParams();
      
      // Add role filter if not "All"
      if (selectedRole !== "All") {
        params.append('role', reverseMapRole(selectedRole));
      }
      
      // Add search query if exists
      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
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
        kycStatus: user.kyc_status || "pending",
        fullData: user,
        created_at: user.created_at || "",
        displayDate: formatDateForDisplay(user.created_at || ""),
        last_login: user.last_login || "Never"
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
  }, [currentPage, itemsPerPage, selectedRole, searchQuery]);

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
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Role",
      "Referral ID",
      "Created At",
      "Status",
      "KYC Status"
    ];

    const csvContent = [
      headers.join(","),
      ...staff.map((user, index) =>
        [
          index + 1,
          user.id,
          `"${user.first_name}"`,
          `"${user.last_name}"`,
          `"${user.email}"`,
          `"${user.phone}"`,
          `"${user.role}"`,
          `"${user.referralId}"`,
          `"${user.displayDate}"`,
          `"${user.status}"`,
          `"${user.kycStatus}"`
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().split("T")[0];

    link.setAttribute("href", url);
    link.setAttribute("download", `users_${timestamp}.csv`);
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

  // Handle Actions
  const handleView = (user) => {
    navigate(`/admin-view-user/${user.user_id}`, { state: { user: user.fullData } });
  };

  const handleEdit = (user) => {
    navigate(`/admin-edit-user/${user.user_id}`, { state: { user: user.fullData } });
  };

  const handleDelete = (user_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${baseurl}/users/${user_id}/`)
          .then((res) => {
            if (res.status === 204 || res.status === 200) {
              // Refetch data after deletion
              fetchStaff();
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "User has been deleted.",
                timer: 2000,
                showConfirmButton: false
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Failed",
                text: "Failed to delete user."
              });
            }
          })
          .catch((err) => {
            console.error("Delete error:", err);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Error deleting user, please try again."
            });
          });
      }
    });
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await axios.put(`${baseurl}/users/${userId}/`, { status: newStatus });
      // Refetch data to get updated status
      fetchStaff();
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Status updated successfully.",
        timer: 1500,
        showConfirmButton: false
      });
    } catch (err) {
      console.error("Status update error:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update status."
      });
    }
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

  // Handle search submit on Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchStaff();
    }
  };

  // Calculate start index for serial numbers
  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <>
      <WebsiteNavbar />

      <div className="staff-page">
        {/* Header */}
        <div className="staff-header">
          <h2>Users</h2>
          <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
            Total Users: {totalItems}
          </div>
        </div>

        {/* Toolbar - Fixed layout: left=search/filter, right=button */}
        <div className="staff-toolbar">
          {/* Left Side: Search and Filter */}
          <div className="toolbar-left">
            {/* Role Filter */}
            <div className="filter-container">
              <select 
                className="role-filter"
                value={selectedRole}
                onChange={handleRoleFilterChange}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  minWidth: '120px'
                }}
              >
                {uniqueRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Box */}
            <div className="search-box" style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                style={{
                  padding: '8px 12px 8px 40px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  width: '300px'
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
                fontWeight: '500'
              }}
              onClick={exportToExcel}
              disabled={staff.length === 0}
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
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>NAME</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>EMAIL</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>MOBILE</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>ROLE</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>REFERRAL ID</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>CREATED AT</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>STATUS</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'left' }}>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" style={{ padding: '40px', textAlign: 'center' }}>
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
                    <td style={{ padding: '12px', fontWeight: '500' }}>{user.name}</td>
                    <td style={{ padding: '12px' }}>{user.email}</td>
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
                    <td style={{ padding: '12px' }}>{user.referralId || "N/A"}</td>
                    <td style={{ padding: '12px' }}>{user.displayDate || "N/A"}</td>
                    <td style={{ padding: '12px' }}>
                      <select 
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          border: '1px solid #ddd',
                          color: user.status === "active" ? "#10b981" : "#ef4444",
                          fontWeight: "500",
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          minWidth: '100px'
                        }}
                      >
                        <option value="active" style={{ color: "#10b981" }}>Active</option>
                        <option value="inactive" style={{ color: "#ef4444" }}>Inactive</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={() => handleView(user)}
                          title="View"
                          style={{
                            padding: '4px 8px',
                            border: 'none',
                            borderRadius: '4px',
                            backgroundColor: '#e3f2fd',
                            color: '#1976d2',
                            cursor: 'pointer',
                            fontSize: '14px'
                          }}
                        >
                          👁️
                        </button>
                        {/* <button 
                          onClick={() => handleEdit(user)}
                          title="Edit"
                          style={{
                            padding: '4px 8px',
                            border: 'none',
                            borderRadius: '4px',
                            backgroundColor: '#e8f5e9',
                            color: '#388e3c',
                            cursor: 'pointer',
                            fontSize: '14px'
                          }}
                        >
                          ✏️
                        </button> */}
                        <button 
                          onClick={() => handleDelete(user.id)}
                          title="Delete"
                          style={{
                            padding: '4px 8px',
                            border: 'none',
                            borderRadius: '4px',
                            backgroundColor: '#ffebee',
                            color: '#d32f2f',
                            cursor: 'pointer',
                            fontSize: '14px'
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" style={{ padding: '40px', textAlign: 'center' }}>
                    <div style={{ fontSize: '16px', color: '#666' }}>
                      {searchQuery || selectedRole !== "All" ? 
                        "No users found matching your criteria" : 
                        "No users found"}
                    </div>
                    {searchQuery || selectedRole !== "All" ? (
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedRole("All");
                        }}
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
                        Clear Filters
                      </button>
                    ) : null}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
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
      </div>
    </>
  );
};

export default UserList;