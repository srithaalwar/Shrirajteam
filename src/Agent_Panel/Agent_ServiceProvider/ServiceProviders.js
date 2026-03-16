import React, { useEffect, useState } from 'react';
import "./ServiceProviders.css";
import AdminNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseurl } from './../../BaseURL/BaseURL';
import Swal from 'sweetalert2';

function ServiceProviders() {
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  
  const navigate = useNavigate();

  /* ================= FETCH ================= */
  const fetchProviders = async () => {
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
      
      // Sort by provider_id in descending order (newest first)
      const sorted = data.sort((a, b) => b.provider_id - a.provider_id);
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

  useEffect(() => { 
    fetchProviders(); 
  }, [currentPage, itemsPerPage, searchQuery]);

  /* ================= SEARCH ================= */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
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
          .catch(() => Swal.fire('Error', 'Delete failed', 'error'));
      }
    });
  };

  /* ================= STATUS UPDATE ================= */
  const handleStatusChange = async (providerId, currentStatus) => {
    const newStatus = currentStatus === 'Approved' ? 'Pending' : 'Approved';
    
    try {
      await axios.patch(`${baseurl}/service-providers/${providerId}/`, {
        status: newStatus
      });
      
      Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        text: `Provider status changed to ${newStatus}`,
        timer: 1500,
        showConfirmButton: false
      });
      
      fetchProviders(); // Refresh the list
    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update status',
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

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Approved':
        return 'badge bg-success';
      case 'Rejected':
        return 'badge bg-danger';
      case 'Pending':
      default:
        return 'badge bg-warning text-dark';
    }
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
              placeholder="Search by Name, Mobile, Email or Aadhaar"
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
            onClick={() => navigate('/a-add-service-provider')}
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
                <th>Status</th>
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
                    <td>
                      {provider.category_name }
                    </td>
                    <td>{provider.experience_years ? `${provider.experience_years} yrs` : '-'}</td>
                    <td>
                      <span className={getStatusBadgeClass(provider.status)}>
                        {provider.status}
                      </span>
                    </td>
                    <td className="actions">
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {/* Status Toggle Button */}
                        {/* <button 
                          className="status-btn"
                          onClick={() => handleStatusChange(provider.provider_id, provider.status)}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            border: '1px solid #273c75',
                            background: 'transparent',
                            color: '#273c75',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                          title="Toggle Status"
                        >
                          {provider.status === 'Approved' ? '↩️' : '✓'}
                        </button> */}
                        
                        {/* View Button */}
                        <button 
                          className="view-btn"
                          onClick={() => navigate(`/a-view-service-provider/${provider.provider_id}`)}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            border: '1px solid #17a2b8',
                            background: 'transparent',
                            color: '#17a2b8'
                          }}
                          title="View Details"
                        >
                          👁️
                        </button>
                        
                        {/* Edit Button */}
                        <button 
                          className="edit-btn"
                          onClick={() => navigate(`/a-edit-service-provider/${provider.provider_id}`)}
                        >
                          ✏️
                        </button>
                        
                        {/* Delete Button */}
                        <button 
                          className="delete-btn"
                          onClick={() => handleDelete(provider.provider_id)}
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

export default ServiceProviders;