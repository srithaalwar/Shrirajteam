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





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../BaseURL/BaseURL';
// import './Users.css';

// ✅ Robust date formatter (same style as Users file)
const formatDateForDisplay = (dateTimeString) => {
  if (!dateTimeString) return 'N/A';

  try {
    const datePart = dateTimeString.split(' ')[0]; // YYYY-MM-DD or DD-MM-YYYY
    const parts = datePart.includes('-')
      ? datePart.split('-')
      : datePart.split('/');

    if (parts.length !== 3) return 'N/A';

    // If backend sends YYYY-MM-DD
    if (parts[0].length === 4) {
      const [year, month, day] = parts;
      return `${day}/${month}/${year}`;
    }

    // If backend sends DD-MM-YYYY
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
  const [filteredPrefixes, setFilteredPrefixes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 5;

  useEffect(() => {
    fetchPrefixes();
  }, []);

  const fetchPrefixes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseurl}/referral-prefix/`);
      console.log('Fetched referral prefixes:', response.data);

      // ✅ Normalize API response to array
      const data = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data?.results)
        ? response.data.results
        : Array.isArray(response.data?.data)
        ? response.data.data
        : [];

      const transformed = data.map((item, index) => ({
        id: item.id,
        prefix: item.prefix,
        created_at: item.created_at,
        displayDate: formatDateForDisplay(item.created_at),
        fullData: item,
      }));

      setPrefixes(transformed);
      setFilteredPrefixes(transformed);
    } catch (error) {
      console.error('Error fetching referral prefixes:', error);
      alert('Error: Failed to load referral prefixes');
      setPrefixes([]);
      setFilteredPrefixes([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Search filter (same behavior as Users file)
  useEffect(() => {
    let result = [...prefixes];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();

      result = result.filter((item) => {
        const searchableFields = [
          item.id?.toString() || '',
          item.prefix?.toLowerCase() || '',
          item.displayDate?.toLowerCase() || '',
        ];

        return searchableFields.join(' ').includes(q);
      });
    }

    // newest first
    result = result.sort((a, b) => b.id - a.id);

    setFilteredPrefixes(result);
    setPage(1);
  }, [prefixes, searchQuery]);

  // Pagination
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = filteredPrefixes.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  const pageCount = Math.ceil(filteredPrefixes.length / rowsPerPage);

  const getSerialNumber = (index) => startIndex + index + 1;

  const handleEdit = (id) => {
    navigate(`/edit-referral-prefix/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this prefix?')) return;

    try {
      await axios.delete(`${baseurl}/referral-prefix/${id}/`);

      setPrefixes((prev) => prev.filter((p) => p.id !== id));
      alert('Success: Prefix deleted successfully');
    } catch (error) {
      console.error('Error deleting prefix:', error);
      alert('Error: Failed to delete prefix');
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
                onChange={(e) => setSearchQuery(e.target.value)}
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
              ) : paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{getSerialNumber(index)}</td>
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
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="pagination-container">
            <button
              className="pagination-btn"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              ← Previous
            </button>

            <div className="page-numbers">
              {[...Array(pageCount)].map((_, i) => {
                const pageNum = i + 1;
                if (
                  pageNum === page ||
                  pageNum === page - 1 ||
                  pageNum === page + 1
                ) {
                  return (
                    <button
                      key={pageNum}
                      className={`page-btn ${
                        page === pageNum ? 'active' : ''
                      }`}
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                }
                return null;
              })}
            </div>

            <button
              className="pagination-btn"
              disabled={page === pageCount}
              onClick={() => setPage(page + 1)}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ReferralPrefix;
