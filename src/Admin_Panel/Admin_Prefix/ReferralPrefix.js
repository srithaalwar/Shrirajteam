// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { baseurl } from '../../BaseURL/BaseURL';
// import './ReferralPrefix.css';

// function ReferralPrefix() {
//   const [prefixes, setPrefixes] = useState([]); // always keep this as array
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const itemsPerPage = 10;
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchPrefixes();
//   }, []);

//   const fetchPrefixes = async () => {
//     try {
//       setLoading(true);

//       const response = await axios.get(`${baseurl}/referral-prefix/`);
//       console.log('Fetched referral prefixes:', response.data);

//       // ✅ Normalize API response to always be an array
//       const data = Array.isArray(response.data)
//         ? response.data
//         : Array.isArray(response.data?.results)
//         ? response.data.results
//         : Array.isArray(response.data?.data)
//         ? response.data.data
//         : [];

//       setPrefixes(data);
//       setTotalPages(Math.ceil(data.length / itemsPerPage) || 1);
//       setPage(1); // reset to first page after fetch
//     } catch (error) {
//       console.error('Error fetching referral prefixes:', error);
//       alert('Error: Failed to load referral prefixes');
//       setPrefixes([]); // safety fallback
//       setTotalPages(1);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this prefix?')) {
//       try {
//         await axios.delete(`${baseurl}/referral-prefix/${id}/`);

//         const updated = prefixes.filter(prefix => prefix.id !== id);
//         setPrefixes(updated);

//         const newTotalPages = Math.ceil(updated.length / itemsPerPage) || 1;
//         setTotalPages(newTotalPages);

//         if (page > newTotalPages) {
//           setPage(newTotalPages);
//         }

//         alert('Success: Prefix deleted successfully');
//       } catch (error) {
//         console.error('Error deleting prefix:', error);
//         alert('Error: Failed to delete prefix');
//       }
//     }
//   };

//   const handleEdit = (id) => {
//     navigate(`/edit-referral-prefix/${id}`);
//   };

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   // ✅ Robust date formatter (fixes Invalid Date)
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';

//     // Convert "YYYY-MM-DD HH:mm:ss" → "YYYY-MM-DDTHH:mm:ss"
//     const normalized =
//       typeof dateString === 'string' && dateString.includes(' ')
//         ? dateString.replace(' ', 'T')
//         : dateString;

//     const date = new Date(normalized);

//     if (isNaN(date.getTime())) {
//       return 'N/A';
//     }

//     return date.toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   const paginatedPrefixes = Array.isArray(prefixes)
//     ? prefixes.slice((page - 1) * itemsPerPage, page * itemsPerPage)
//     : [];

//   return (
//     <div className="referral-prefix-container">
//       <div className="header-section">
//         <h1 className="main-title">Referral Prefix Management</h1>
//       </div>

//       <div className="d-flex justify-content-end mb-4">
//         <button
//           className="btn btn-primary"
//           onClick={() => navigate('/add-referral-prefix')}
//         >
//           <i className="bi bi-plus-circle me-2"></i>
//           Add New Prefix
//         </button>
//       </div>

//       {loading ? (
//         <div className="text-center py-5">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p className="mt-3">Loading prefixes...</p>
//         </div>
//       ) : (
//         <>
//           <div className="table-responsive">
//             <table className="table table-bordered table-hover">
//               <thead className="table-dark">
//                 <tr>
//                   <th className="text-center">S.No</th>
//                   <th className="text-center">Prefix</th>
//                   <th className="text-center">Created At</th>
//                   <th className="text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedPrefixes.length > 0 ? (
//                   paginatedPrefixes.map((prefix, index) => (
//                     <tr key={prefix.id ?? index}>
//                       <td className="text-center align-middle">
//                         {(page - 1) * itemsPerPage + index + 1}
//                       </td>
//                       <td className="text-center align-middle">
//                         <span className="prefix-badge">
//                           {prefix.prefix}
//                         </span>
//                       </td>
//                       <td className="text-center align-middle">
//                         {formatDate(prefix.created_at)}
//                       </td>
//                       <td className="text-center align-middle">
//                         <div className="action-buttons">
//                           <button
//                             className="btn btn-sm btn-outline-primary me-2"
//                             onClick={() => handleEdit(prefix.id)}
//                           >
//                             <i className="bi bi-pencil"></i>
//                           </button>
//                           <button
//                             className="btn btn-sm btn-outline-danger"
//                             onClick={() => handleDelete(prefix.id)}
//                           >
//                             <i className="bi bi-trash"></i>
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="text-center py-4">
//                       No referral prefixes found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default ReferralPrefix;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { baseurl } from '../../BaseURL/BaseURL';
// // import './Users.css';

// // ✅ Robust date formatter (same style as Users file)
// const formatDateForDisplay = (dateTimeString) => {
//   if (!dateTimeString) return 'N/A';

//   try {
//     const datePart = dateTimeString.split(' ')[0]; // YYYY-MM-DD or DD-MM-YYYY
//     const parts = datePart.includes('-')
//       ? datePart.split('-')
//       : datePart.split('/');

//     if (parts.length !== 3) return 'N/A';

//     // If backend sends YYYY-MM-DD
//     if (parts[0].length === 4) {
//       const [year, month, day] = parts;
//       return `${day}/${month}/${year}`;
//     }

//     // If backend sends DD-MM-YYYY
//     const [day, month, year] = parts;
//     return `${day}/${month}/${year}`;
//   } catch (error) {
//     console.error('Error formatting date:', error);
//     return 'N/A';
//   }
// };

// const ReferralPrefix = () => {
//   const navigate = useNavigate();
//   const [prefixes, setPrefixes] = useState([]);
//   const [filteredPrefixes, setFilteredPrefixes] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);

//   const rowsPerPage = 5;

//   useEffect(() => {
//     fetchPrefixes();
//   }, []);

//   const fetchPrefixes = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${baseurl}/referral-prefix/`);
//       console.log('Fetched referral prefixes:', response.data);

//       // ✅ Normalize API response to array
//       const data = Array.isArray(response.data)
//         ? response.data
//         : Array.isArray(response.data?.results)
//         ? response.data.results
//         : Array.isArray(response.data?.data)
//         ? response.data.data
//         : [];

//       const transformed = data.map((item, index) => ({
//         id: item.id,
//         prefix: item.prefix,
//         created_at: item.created_at,
//         displayDate: formatDateForDisplay(item.created_at),
//         fullData: item,
//       }));

//       setPrefixes(transformed);
//       setFilteredPrefixes(transformed);
//     } catch (error) {
//       console.error('Error fetching referral prefixes:', error);
//       alert('Error: Failed to load referral prefixes');
//       setPrefixes([]);
//       setFilteredPrefixes([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔍 Search filter (same behavior as Users file)
//   useEffect(() => {
//     let result = [...prefixes];

//     if (searchQuery.trim()) {
//       const q = searchQuery.toLowerCase();

//       result = result.filter((item) => {
//         const searchableFields = [
//           item.id?.toString() || '',
//           item.prefix?.toLowerCase() || '',
//           item.displayDate?.toLowerCase() || '',
//         ];

//         return searchableFields.join(' ').includes(q);
//       });
//     }

//     // newest first
//     result = result.sort((a, b) => b.id - a.id);

//     setFilteredPrefixes(result);
//     setPage(1);
//   }, [prefixes, searchQuery]);

//   // Pagination
//   const startIndex = (page - 1) * rowsPerPage;
//   const paginatedData = filteredPrefixes.slice(
//     startIndex,
//     startIndex + rowsPerPage
//   );
//   const pageCount = Math.ceil(filteredPrefixes.length / rowsPerPage);

//   const getSerialNumber = (index) => startIndex + index + 1;

//   const handleEdit = (id) => {
//     navigate(`/edit-referral-prefix/${id}`);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this prefix?')) return;

//     try {
//       await axios.delete(`${baseurl}/referral-prefix/${id}/`);

//       setPrefixes((prev) => prev.filter((p) => p.id !== id));
//       alert('Success: Prefix deleted successfully');
//     } catch (error) {
//       console.error('Error deleting prefix:', error);
//       alert('Error: Failed to delete prefix');
//     }
//   };

//   return (
//     <>
//       <div className="staff-page">
//         {/* Header */}
//         <div className="staff-header">
//           <h2>Referral Prefixes</h2>
//         </div>

//         {/* Toolbar */}
//         <div className="staff-toolbar">
//           {/* Left Side: Search */}
//           <div className="toolbar-left">
//             <div className="search-box">
//               <input
//                 type="text"
//                 placeholder="Search by prefix or date..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <span className="search-icon">🔍</span>
//             </div>
//           </div>

//           {/* Right Side: Add Button */}
//           <div className="toolbar-right">
//             <button
//               className="export-btn"
//               style={{
//                 backgroundColor: '#273c75',
//                 borderColor: '#273c75',
//                 color: 'white',
//               }}
//               onClick={() => navigate('/add-referral-prefix')}
//             >
//               + Add Prefix
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="staff-table-wrapper">
//           <table className="staff-table">
//             <thead>
//               <tr>
//                 <th>S.No.</th>
//                 <th>ID</th>
//                 <th>PREFIX</th>
//                 <th>CREATED AT</th>
//                 <th>ACTIONS</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="5" className="no-data">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : paginatedData.length > 0 ? (
//                 paginatedData.map((item, index) => (
//                   <tr key={item.id}>
//                     <td>{getSerialNumber(index)}</td>
//                     <td>{item.id}</td>
//                     <td className="name-cell">{item.prefix}</td>
//                     <td>{item.displayDate}</td>
//                     <td className="actions">
//                       <button
//                         className="edit-btn action-btn"
//                         onClick={() => handleEdit(item.id)}
//                         title="Edit"
//                       >
//                         ✏️
//                       </button>
//                       <button
//                         className="delete-btn action-btn"
//                         onClick={() => handleDelete(item.id)}
//                         title="Delete"
//                       >
//                         🗑️
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="no-data">
//                     No referral prefixes found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {pageCount > 1 && (
//           <div className="pagination-container">
//             <button
//               className="pagination-btn"
//               disabled={page === 1}
//               onClick={() => setPage(page - 1)}
//             >
//               ← Previous
//             </button>

//             <div className="page-numbers">
//               {[...Array(pageCount)].map((_, i) => {
//                 const pageNum = i + 1;
//                 if (
//                   pageNum === page ||
//                   pageNum === page - 1 ||
//                   pageNum === page + 1
//                 ) {
//                   return (
//                     <button
//                       key={pageNum}
//                       className={`page-btn ${
//                         page === pageNum ? 'active' : ''
//                       }`}
//                       onClick={() => setPage(pageNum)}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 }
//                 return null;
//               })}
//             </div>

//             <button
//               className="pagination-btn"
//               disabled={page === pageCount}
//               onClick={() => setPage(page + 1)}
//             >
//               Next →
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ReferralPrefix;




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
              <span className="search-icon">🔍</span>
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