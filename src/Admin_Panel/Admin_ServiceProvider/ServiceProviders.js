import React, { useEffect, useState } from 'react';
import "./ServiceProviders.css";
import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseurl } from './../../BaseURL/BaseURL';
import Swal from 'sweetalert2';

function AdminServiceProviders() {
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [categories, setCategories] = useState({}); // Store category mapping
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  
  const navigate = useNavigate();

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

  /* ================= FETCH PROVIDERS ================= */
  const fetchProviders = async (categoryMap = null) => {
    setLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams({
        page: currentPage,
        page_size: itemsPerPage,
      });
      
      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }
      
      const res = await axios.get(`${baseurl}/service-providers/?${params.toString()}`);
      
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
      
      // Add category name to each provider
      const categoriesToUse = categoryMap || categories;
      const dataWithCategories = data.map(provider => ({
        ...provider,
        category_display_name: categoriesToUse[provider.service_category] || 'N/A'
      }));
      
      // Sort by provider_id in descending order (newest first)
      const sorted = dataWithCategories.sort((a, b) => b.provider_id - a.provider_id);
      setProviders(sorted);
      setFilteredProviders(sorted);
      setTotalItems(count);
    } catch (error) {
      console.error("Error fetching service providers:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load service providers',
        confirmButtonColor: '#273c75'
      });
    }
    setLoading(false);
  };

  /* ================= INITIAL LOAD ================= */
  useEffect(() => { 
    const loadData = async () => {
      const categoryMap = await fetchCategories();
      await fetchProviders(categoryMap);
    };
    loadData();
  }, [currentPage, itemsPerPage, searchQuery]);

  /* ================= SEARCH ================= */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  /* ================= DELETE ================= */
  const handleDelete = (providerId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#273c75',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        axios.delete(`${baseurl}/service-providers/${providerId}/`)
          .then(() => {
            Swal.fire('Deleted!', 'Service provider deleted.', 'success');
            fetchProviders(); // Refetch data after deletion
          })
          .catch((error) => {
            console.error("Delete error:", error);
            Swal.fire('Error', 'Delete failed', 'error');
          });
      }
    });
  };

  /* ================= VERIFICATION STATUS UPDATE ================= */
  const handleVerificationStatusChange = async (providerId, newStatus) => {
    setUpdatingStatus(providerId);
    
    try {
      // Try PATCH first (preferred for partial updates)
      const response = await axios.put(`${baseurl}/service-providers/${providerId}/`, {
        verification_status: newStatus
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log("Update response:", response.data);
      
      Swal.fire({
        icon: 'success',
        title: 'Verification Status Updated',
        text: `Provider verification status changed to ${newStatus}`,
        timer: 1500,
        showConfirmButton: false
      });
      
      // Refresh the list with current categories
      const categoryMap = await fetchCategories();
      await fetchProviders(categoryMap);
      
    } catch (error) {
      console.error("Error updating verification status:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      
      // If PATCH fails, try PUT as fallback
      if (error.response?.status === 405) {
        try {
          await axios.put(`${baseurl}/service-providers/${providerId}/`, {
            verification_status: newStatus
          });
          
          Swal.fire({
            icon: 'success',
            title: 'Verification Status Updated',
            text: `Provider verification status changed to ${newStatus}`,
            timer: 1500,
            showConfirmButton: false
          });
          
          const categoryMap = await fetchCategories();
          await fetchProviders(categoryMap);
          
        } catch (putError) {
          console.error("PUT also failed:", putError);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: putError.response?.data?.message || 'Failed to update verification status',
            confirmButtonColor: '#273c75'
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || error.response?.data?.detail || 'Failed to update verification status',
          confirmButtonColor: '#273c75'
        });
      }
    } finally {
      setUpdatingStatus(null);
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

  return (
    <>
      <AdminNavbar />

      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <h2>Service Providers</h2>
        </div>

        {/* Toolbar */}
        <div className="page-toolbar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by Name, Mobile, Email, Aadhaar or Verification Status"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <button 
            className="primary-btn"
            style={{
              backgroundColor: '#273c75',
              borderColor: '#273c75',
              color: 'white'
            }}
            onClick={() => navigate('/admin-add-service-provider')}
          >
            Add Provider
          </button>
        </div>

        {/* Table */}
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>ID</th>
                <th>Full Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Category Name</th>
                <th>Experience</th>
                <th>Verification Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="no-data">
                    Loading...
                  </td>
                </tr>
              ) : filteredProviders.length ? (
                filteredProviders.map((provider, index) => (
                  <tr key={provider.provider_id}>
                    <td>{startIndex + index}</td>
                    <td>{provider.provider_id}</td>
                    <td>{provider.full_name}</td>
                    <td>{provider.mobile_number}</td>
                    <td>{provider.email || '-'}</td>
                    {/* Display category name from mapping */}
                    <td style={{ fontWeight: '500' }}>
                      {provider.category_display_name || provider.category_name || '-'}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {provider.experience_years ? `${provider.experience_years} yrs` : '-'}
                    </td>
                    <td style={{ minWidth: '180px' }}>
                      <select
                        value={provider.verification_status || 'pending'}
                        onChange={(e) => handleVerificationStatusChange(provider.provider_id, e.target.value)}
                        disabled={updatingStatus === provider.provider_id}
                        className="status-dropdown"
                        style={{
                          padding: '6px 12px',
                          borderRadius: '4px',
                          border: `2px solid ${
                            provider.verification_status?.toLowerCase() === 'verified' ? '#28a745' : 
                            provider.verification_status?.toLowerCase() === 'rejected' ? '#dc3545' : 
                            provider.verification_status?.toLowerCase() === 'suspended' ? '#6c757d' : 
                            '#ffc107'
                          }`,
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: '500',
                          outline: 'none',
                          width: '100%'
                        }}
                      >
                        <option value="pending" style={{ color: '#856404', backgroundColor: '#fff3cd' }}>
                          ⏳ Pending
                        </option>
                        <option value="verified" style={{ color: '#155724', backgroundColor: '#d4edda' }}>
                          ✅ Verified
                        </option>
                        <option value="rejected" style={{ color: '#721c24', backgroundColor: '#f8d7da' }}>
                          ❌ Rejected
                        </option>
                        <option value="suspended" style={{ color: '#383d41', backgroundColor: '#e2e3e5' }}>
                          ⚠️ Suspended
                        </option>
                      </select>
                      {updatingStatus === provider.provider_id && (
                        <span style={{ marginLeft: '8px', fontSize: '12px', color: '#666' }}>
                          Updating...
                        </span>
                      )}
                    </td>
                    <td className="actions">
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {/* View Button */}
                        <button 
                          className="view-btn"
                          onClick={() => navigate(`/admin-view-service-provider/${provider.provider_id}`)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '4px',
                            border: '1px solid #17a2b8',
                            background: 'transparent',
                            color: '#17a2b8',
                            cursor: 'pointer',
                            fontSize: '16px'
                          }}
                          title="View Details"
                        >
                          👁️
                        </button>
                        
                        {/* Edit Button */}
                        <button 
                          className="edit-btn"
                          onClick={() => navigate(`/admin-edit-service-provider/${provider.provider_id}`)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '4px',
                            border: '1px solid #ffc107',
                            background: 'transparent',
                            color: '#ffc107',
                            cursor: 'pointer',
                            fontSize: '16px'
                          }}
                          title="Edit Provider"
                        >
                          ✏️
                        </button>
                        
                        {/* Delete Button */}
                        <button 
                          className="delete-btn"
                          onClick={() => handleDelete(provider.provider_id)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '4px',
                            border: '1px solid #dc3545',
                            background: 'transparent',
                            color: '#dc3545',
                            cursor: 'pointer',
                            fontSize: '16px'
                          }}
                          title="Delete Provider"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="no-data">
                    No service providers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {/* Pagination Controls */}
          {totalItems > 0 && (
            <div className="pagination-container">
              {/* Items per page selector */}
              <div className="items-per-page">
                <span>Show:</span>
                <select 
                  value={itemsPerPage} 
                  onChange={handleItemsPerPageChange}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span>of {totalItems} items</span>
              </div>
              
              {/* Page navigation */}
              <div className="pagination-controls">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                >
                  ««
                </button>
                
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  «
                </button>
                
                {getPageNumbers().map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    style={{
                      background: currentPage === page ? '#273c75' : 'white',
                      color: currentPage === page ? 'white' : '#333',
                      fontWeight: currentPage === page ? 'bold' : 'normal'
                    }}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  »
                </button>
                
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  »»
                </button>
              </div>
              
              <div className="page-info">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminServiceProviders;