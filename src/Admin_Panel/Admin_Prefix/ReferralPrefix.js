
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../BaseURL/BaseURL';
import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import Swal from 'sweetalert2';

// ✅ Robust date formatter
const formatDateForDisplay = (dateTimeString) => {
  if (!dateTimeString) return 'N/A';

  try {
    const datePart = dateTimeString.split(' ')[0];
    const parts = datePart.includes('-')
      ? datePart.split('-')
      : datePart.split('/');

    if (parts.length !== 3) return 'N/A';

    if (parts[0].length === 4) {
      const [year, month, day] = parts;
      return `${day}/${month}/${year}`;
    }

    const [day, month, year] = parts;
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'N/A';
  }
};

const ReferralPrefix = () => {
  const navigate = useNavigate();
  const [prefixes, setPrefixes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchPrefixes();
  }, [currentPage, itemsPerPage, searchQuery]);

  const fetchPrefixes = async () => {
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
      
      const response = await axios.get(`${baseurl}/referral-prefix/?${params.toString()}`);
      
      // Handle different response formats
      let data = [];
      let count = 0;
      
      if (Array.isArray(response.data)) {
        data = response.data;
        count = response.data.length;
      } else if (response.data.results) {
        data = response.data.results || [];
        count = response.data.count || data.length;
      } else if (response.data.data) {
        data = response.data.data || [];
        count = response.data.count || data.length;
      } else {
        data = response.data;
        count = response.data.length || 0;
      }

      const transformed = data.map((item) => ({
        id: item.id,
        prefix: item.prefix,
        created_at: item.created_at,
        displayDate: formatDateForDisplay(item.created_at),
        fullData: item,
      }));

      setPrefixes(transformed);
      setTotalItems(count);
    } catch (error) {
      console.error('Error fetching referral prefixes:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load referral prefixes',
        confirmButtonColor: '#273c75'
      });
      setPrefixes([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  /* ================= PAGINATION FUNCTIONS ================= */
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

  /* ================= HANDLE SEARCH ================= */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleEdit = (id) => {
    navigate(`/edit-referral-prefix/${id}`);
  };

  const handleDelete = async (id) => {
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
      try {
        await axios.delete(`${baseurl}/referral-prefix/${id}/`);
        Swal.fire({
          title: 'Deleted!',
          text: 'Prefix deleted successfully.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        fetchPrefixes(); // Refetch data after deletion
      } catch (error) {
        console.error('Error deleting prefix:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete prefix',
          confirmButtonColor: '#273c75'
        });
      }
    }
  };

  return (
    <>
      <div className="staff-page">
        {/* Header */}
        <div className="staff-header">
          <h2>Referral Prefixes</h2>
        </div>

        {/* Toolbar */}
        <div className="staff-toolbar">
          {/* Left Side: Search */}
          <div className="toolbar-left">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by prefix or date..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {/* <span className="search-icon">🔍</span> */}
            </div>
          </div>

          {/* Right Side: Add Button */}
          <div className="toolbar-right">
            <button
              className="export-btn"
              style={{
                backgroundColor: '#273c75',
                borderColor: '#273c75',
                color: 'white',
              }}
              onClick={() => navigate('/add-referral-prefix')}
            >
              + Add Prefix
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="staff-table-wrapper">
          <table className="staff-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>ID</th>
                <th>PREFIX</th>
                <th>CREATED AT</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="no-data">
                    Loading...
                  </td>
                </tr>
              ) : prefixes.length > 0 ? (
                prefixes.map((item, index) => (
                  <tr key={item.id}>
                    <td>{startIndex + index}</td>
                    <td>{item.id}</td>
                    <td className="name-cell">{item.prefix}</td>
                    <td>{item.displayDate}</td>
                    <td className="actions">
                      <button
                        className="edit-btn action-btn"
                        onClick={() => handleEdit(item.id)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        className="delete-btn action-btn"
                        onClick={() => handleDelete(item.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No referral prefixes found
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
                  of {totalItems} items
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

// SettingsMain Component (if needed separately)
const SettingsMain = () => {
  return (
    <>
      <AdminNavbar />
      <div className="settings-container">
        <div className="container">
          <div className="card">
            <div className="tab-content" id="settingsTabContent">
              <div className="tab-pane fade show active" id="referral" role="tabpanel">
                <ReferralPrefix />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { SettingsMain };
export default ReferralPrefix;