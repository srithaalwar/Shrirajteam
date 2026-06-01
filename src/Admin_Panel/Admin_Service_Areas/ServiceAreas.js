import React, { useEffect, useState } from 'react';
// import "./ServiceAreas.css";
import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseurl } from './../../BaseURL/BaseURL';
import Swal from 'sweetalert2';

function ServiceAreas() {
  const [areas, setAreas] = useState([]);
  const [filteredAreas, setFilteredAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  
  const navigate = useNavigate();

  /* ================= FETCH ================= */
  const fetchAreas = async () => {
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
      
      const res = await axios.get(`${baseurl}/service-areas/?${params.toString()}`);
      
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
      
      // Sort by service_area_id in descending order (newest first)
      const sorted = data.sort((a, b) => b.service_area_id - a.service_area_id);
      setAreas(sorted);
      setFilteredAreas(sorted);
      setTotalItems(count);
    } catch (error) {
      console.error("Error fetching service areas:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load service areas',
        confirmButtonColor: '#273c75'
      });
    }
    setLoading(false);
  };

  useEffect(() => { 
    fetchAreas(); 
  }, [currentPage, itemsPerPage, searchQuery]);

  /* ================= SEARCH ================= */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  /* ================= TOGGLE ACTIVE STATUS ================= */
  const handleToggleStatus = async (areaId, currentStatus) => {
    try {
      const area = areas.find(a => a.service_area_id === areaId);
      if (!area) return;
      
      const updatedArea = {
        ...area,
        is_active: !currentStatus
      };
      
      await axios.put(`${baseurl}/service-areas/${areaId}/`, updatedArea);
      
      Swal.fire({
        icon: 'success',
        title: 'Updated',
        text: `Service area ${!currentStatus ? 'activated' : 'deactivated'} successfully`,
        confirmButtonColor: '#273c75',
        timer: 2000,
        showConfirmButton: false
      });
      
      fetchAreas(); // Refresh the list
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

  /* ================= DELETE ================= */
  const handleDelete = async (areaId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#273c75',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        setLoading(true);
        
        // Method 1: Using service_area_id in URL
        const deleteUrl = `${baseurl}/service-areas/${areaId}/`;
        console.log("Deleting URL:", deleteUrl);
        
        const response = await axios.delete(deleteUrl);
        console.log("Delete response:", response);
        
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Service area has been deleted successfully.',
          confirmButtonColor: '#273c75',
          timer: 2000,
          showConfirmButton: false
        });
        
        // Refresh the list
        fetchAreas();
      }
    } catch (error) {
      console.error("Error deleting service area:", error);
      console.error("Error response:", error.response);
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);
      
      let errorMessage = 'Failed to delete service area';
      
      if (error.response?.status === 404) {
        errorMessage = 'Service area not found. It may have been already deleted.';
      } else if (error.response?.status === 400) {
        errorMessage = error.response?.data?.detail || 'Bad request. Please check the data.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Delete Failed',
        text: errorMessage,
        confirmButtonColor: '#273c75'
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= PAGINATION HANDLERS ================= */
  // Calculate pagination values
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  
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

  return (
    <>
      <AdminNavbar />

      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <h2>Service Areas</h2>
        </div>

        {/* Toolbar */}
        <div className="page-toolbar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by Area Name, City, State or Pincode"
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
            onClick={() => navigate('/a-add-service-area')}
          >
            Add Service Area
          </button>
        </div>

        {/* Table */}
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>ID</th>
                <th>Area Name</th>
                <th>City</th>
                <th>State</th>
                <th>Pincode</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="no-data">
                    <div className="text-center">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : filteredAreas.length ? (
                filteredAreas.map((area, index) => (
                  <tr key={area.service_area_id}>
                    <td>{startIndex + index}</td>
                    <td>{area.service_area_id}</td>
                    <td>{area.area_name}</td>
                    <td>{area.city}</td>
                    <td>{area.state}</td>
                    <td>{area.pincode}</td>
                    <td>{area.latitude || '-'}</td>
                    <td>{area.longitude || '-'}</td>
                    <td>
                      <button
                        onClick={() => handleToggleStatus(area.service_area_id, area.is_active)}
                        style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          border: 'none',
                          backgroundColor: area.is_active ? '#28a745' : '#dc3545',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        {area.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="actions">
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          className="edit-btn"
                          onClick={() => navigate(`/a-edit-service-area/${area.service_area_id}`)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDelete(area.service_area_id)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="no-data">
                    No service areas found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {/* Pagination Controls */}
          {totalItems > 0 && (
            <div className="pagination-container" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              borderTop: '1px solid #eee',
              backgroundColor: '#f8f9fa',
              flexWrap: 'wrap',
              gap: '10px'
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
                  of {totalItems} items
                </span>
              </div>
              
              {/* Page navigation */}
              <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
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

export default ServiceAreas;