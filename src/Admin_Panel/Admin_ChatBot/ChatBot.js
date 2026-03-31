


import React, { useEffect, useState } from "react";
import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../../BaseURL/BaseURL";
import "./ChatBot.css";
import Swal from "sweetalert2";

function Chatbot() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Build query parameters for pagination
        const params = new URLSearchParams({
          page: currentPage,
          page_size: itemsPerPage,
        });
        
        if (searchQuery.trim()) {
          params.append('search', searchQuery.trim());
        }
        
        const res = await axios.get(`${baseurl}/responses/?${params.toString()}`);
        
        // Handle different response formats
        let results = [];
        let count = 0;
        
        if (Array.isArray(res.data)) {
          results = res.data;
          count = res.data.length;
        } else if (res.data.results) {
          results = res.data.results || [];
          count = res.data.count || results.length;
        } else {
          results = res.data;
          count = res.data.length || 0;
        }
        
        setData(results);
        setFilteredData(results);
        setTotalItems(count);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load chatbot Q&A data',
          confirmButtonColor: '#273c75'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, itemsPerPage, searchQuery]);

  /* ================= SEARCH ================= */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCreate = () => {
    navigate("/admin-createq&a");
  };

  const handleEdit = (id) => {
    navigate(`/admin-editqa/${id}`);
  };

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This Q&A will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#273c75",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${baseurl}/responses/${id}/`);
          // Refetch data after deletion
          const fetchAfterDelete = async () => {
            try {
              const res = await axios.get(`${baseurl}/responses/?page=${currentPage}&page_size=${itemsPerPage}`);
              let results = [];
              let count = 0;
              
              if (Array.isArray(res.data)) {
                results = res.data;
                count = res.data.length;
              } else if (res.data.results) {
                results = res.data.results || [];
                count = res.data.count || results.length;
              } else {
                results = res.data;
                count = res.data.length || 0;
              }
              
              setData(results);
              setFilteredData(results);
              setTotalItems(count);
            } catch (err) {
              console.error("Error refetching after delete:", err);
            }
          };
          await fetchAfterDelete();
          Swal.fire("Deleted!", "Q&A has been deleted.", "success");
        } catch (err) {
          console.error("Error deleting Q&A:", err);
          Swal.fire("Error!", "Failed to delete Q&A.", "error");
        }
      }
    });
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
          <h2>Chatbot Q&A</h2>
        </div>

        {/* Toolbar */}
        <div className="page-toolbar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search questions or answers..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {/* <span className="search-icon">🔍</span> */}
          </div>

          <button
            className="primary-btn"
            style={{
              backgroundColor: "#273c75",
              borderColor: "#273c75",
              color: "white",
            }}
            onClick={handleCreate}
          >
            Create Q&A
          </button>
        </div>

        {/* Table */}
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>S.No.</th>
                <th style={{ width: '80px' }}>ID</th>
                <th style={{ width: '300px' }}>QUESTION</th>
                <th style={{ width: '400px', maxWidth: '400px' }}>ANSWER</th>
                <th style={{ width: '120px' }}>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="no-data">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="no-data error">
                    {error}
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{startIndex + index}</td>
                    <td>{item.id}</td>
                    <td className="question-cell" style={{ 
                      maxWidth: '300px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.question}
                    </td>
                    <td className="answer-cell" style={{ 
                      maxWidth: '400px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      paddingRight: '10px'
                    }}>
                      {item.answer}
                    </td>
                    <td className="actions" style={{ 
                      whiteSpace: 'nowrap',
                      padding: '8px'
                    }}>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(item.id)}
                        style={{ marginRight: '8px' }}
                      >
                        ✏️
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(item.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No Q&A data found
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
}

export default Chatbot;