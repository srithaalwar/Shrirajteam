// import React, { useEffect, useState } from 'react';
// import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
// import {
//   Table, TableBody, TableCell, TableHead, TableRow,
//   Box, Button, IconButton, Container, Pagination, TextField, Paper
// } from '@mui/material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { baseurl } from './../../BaseURL/BaseURL';
// import SearchIcon from '@mui/icons-material/Search';
// import Swal from 'sweetalert2';

// function BookingSlab() {
//   const [slabs, setSlabs] = useState([]);
//   const [filteredSlabs, setFilteredSlabs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');
//   const itemsPerPage = 5;

//   const navigate = useNavigate();

//   /* ================= FETCH ================= */
//   const fetchSlabs = () => {
//     setLoading(true);
//     axios.get(`${baseurl}/booking-slabs/`)
//       .then(res => {
//         const sorted = res.data.sort((a, b) => b.id - a.id);
//         setSlabs(sorted);
//         setFilteredSlabs(sorted);
//         setPage(1);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   };

//   useEffect(() => { fetchSlabs(); }, []);

//   /* ================= SEARCH ================= */
//   const safeToString = (v) => v ? v.toString() : '';

//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setFilteredSlabs([...slabs].sort((a, b) => b.id - a.id));
//       setPage(1);
//       return;
//     }

//     const q = searchQuery.toLowerCase();
//     const filtered = slabs.filter(s =>
//       safeToString(s.id).includes(q) ||
//       safeToString(s.min_value).includes(q) ||
//       safeToString(s.max_value).includes(q) ||
//       safeToString(s.booking_amount).includes(q)
//     );

//     setFilteredSlabs(filtered.sort((a, b) => b.id - a.id));
//     setPage(1);
//   }, [searchQuery, slabs]);

//   /* ================= DELETE ================= */
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33'
//     }).then(result => {
//       if (result.isConfirmed) {
//         axios.delete(`${baseurl}/booking-slabs/${id}/`)
//           .then(() => {
//             Swal.fire('Deleted!', 'Booking slab deleted.', 'success');
//             fetchSlabs();
//           })
//           .catch(() => Swal.fire('Error', 'Delete failed', 'error'));
//       }
//     });
//   };

//   /* ================= PAGINATION ================= */
//   const totalPages = Math.ceil(filteredSlabs.length / itemsPerPage);
//   const paginatedSlabs = filteredSlabs.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   const formatCurrency = (v) => `₹${Number(v || 0).toLocaleString()}`;

//   return (
//     <>
//       <AdminNavbar />

//       <Container maxWidth="xl" sx={{ mt: 10 }}>
//         {/* ===== HEADER ===== */}
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//           <h2 style={{ fontWeight: 700 }}>Booking Slabs</h2>

//           {/* ✅ ADD SLAB BUTTON (NOT REMOVED) */}
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate('/a-add-booking-slab')}
//             sx={{ textTransform: 'none', borderRadius: '8px' }}
//           >
//             Add Slab
//           </Button>
//         </Box>

//         {/* ===== SEARCH ===== */}
//         <Box mb={3}>
//           <TextField
//             placeholder="Search by ID, Min, Max or Amount"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             size="small"
//             InputProps={{
//               startAdornment: <SearchIcon sx={{ mr: 1 }} />
//             }}
//             sx={{
//               width: 320,
//               background: '#fff',
//               borderRadius: '8px'
//             }}
//           />
//         </Box>

//         {/* ===== TABLE CARD ===== */}
//         <Paper
//           elevation={0}
//           sx={{
//             borderRadius: '14px',
//             background: '#fff',
//             boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
//             overflow: 'hidden'
//           }}
//         >
//           <Table>
//             <TableHead>
//               <TableRow sx={{ background: '#f8f9fb' }}>
//                 {['S.No', 'ID', 'Min Value', 'Max Value', 'Booking Amount', 'Actions'].map(h => (
//                   <TableCell key={h} sx={{ fontWeight: 600, color: '#6b7280' }}>
//                     {h}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">Loading...</TableCell>
//                 </TableRow>
//               ) : paginatedSlabs.length ? (
//                 paginatedSlabs.map((slab, i) => (
//                   <TableRow key={slab.id} hover>
//                     <TableCell>{(page - 1) * itemsPerPage + i + 1}</TableCell>
//                     <TableCell>{slab.id}</TableCell>
//                     <TableCell>{formatCurrency(slab.min_value)}</TableCell>
//                     <TableCell>{formatCurrency(slab.max_value)}</TableCell>
//                     <TableCell>{formatCurrency(slab.booking_amount)}</TableCell>
//                     <TableCell>
//                       <IconButton
//                         size="small"
//                         sx={{ color: '#f97316' }}
//                         onClick={() => navigate(`/a-edit-booking-slab/${slab.id}`)}
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                       <IconButton
//                         size="small"
//                         sx={{ color: '#9ca3af' }}
//                         onClick={() => handleDelete(slab.id)}
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">
//                     No booking slabs found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </Paper>

//         {/* ===== PAGINATION ===== */}
//         {!loading && filteredSlabs.length > 0 && (
//           <Box display="flex" justifyContent="flex-end" mt={3}>
//             <Pagination
//               count={totalPages}
//               page={page}
//               onChange={(_, v) => setPage(v)}
//               color="primary"
//             />
//           </Box>
//         )}
//       </Container>
//     </>
//   );
// }

// export default BookingSlab;




// import React, { useEffect, useState } from 'react';
// import "./BookingSlab.css";
// import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { baseurl } from './../../BaseURL/BaseURL';
// import Swal from 'sweetalert2';

// function BookingSlab() {
//   const [slabs, setSlabs] = useState([]);
//   const [filteredSlabs, setFilteredSlabs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
  
//   const navigate = useNavigate();

//   /* ================= FETCH ================= */
//   const fetchSlabs = () => {
//     setLoading(true);
//     axios.get(`${baseurl}/booking-slabs/`)
//       .then(res => {
//         const sorted = res.data.sort((a, b) => b.id - a.id);
//         setSlabs(sorted);
//         setFilteredSlabs(sorted);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   };

//   useEffect(() => { fetchSlabs(); }, []);

//   /* ================= SEARCH ================= */
//   const safeToString = (v) => v ? v.toString() : '';

//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setFilteredSlabs([...slabs].sort((a, b) => b.id - a.id));
//       return;
//     }

//     const q = searchQuery.toLowerCase();
//     const filtered = slabs.filter(s =>
//       safeToString(s.id).includes(q) ||
//       safeToString(s.min_value).includes(q) ||
//       safeToString(s.max_value).includes(q) ||
//       safeToString(s.booking_amount).includes(q)
//     );

//     setFilteredSlabs(filtered.sort((a, b) => b.id - a.id));
//   }, [searchQuery, slabs]);

//   /* ================= DELETE ================= */
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33'
//     }).then(result => {
//       if (result.isConfirmed) {
//         axios.delete(`${baseurl}/booking-slabs/${id}/`)
//           .then(() => {
//             Swal.fire('Deleted!', 'Booking slab deleted.', 'success');
//             fetchSlabs();
//           })
//           .catch(() => Swal.fire('Error', 'Delete failed', 'error'));
//       }
//     });
//   };

//   const formatCurrency = (v) => `₹${Number(v || 0).toLocaleString()}`;

//   return (
//     <>
//       <AdminNavbar />

//       <div className="page-container">
//         {/* Header */}
//         <div className="page-header">
//           <h2>Booking Slabs</h2>
//         </div>

//         {/* Toolbar */}
//         <div className="page-toolbar">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Search by ID, Min, Max or Amount"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <span className="search-icon">🔍</span>
//           </div>
          
//           <button 
//             className="primary-btn"
// style={{
//     backgroundColor: '#273c75',
//     borderColor: '#273c75',
//     color: 'white'
//   }}

//             onClick={() => navigate('/a-add-booking-slab')}
//           >
//             Add Slab
//           </button>
//         </div>

//         {/* Table */}
//         <div className="table-card">
//           <table className="data-table">
//             <thead>
//               <tr>
//                 <th>S.No.</th>
//                 <th>ID</th>
//                 <th>MIN VALUE</th>
//                 <th>MAX VALUE</th>
//                 <th>BOOKING AMOUNT</th>
//                 <th>ACTIONS</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="no-data">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : filteredSlabs.length ? (
//                 filteredSlabs.map((slab, index) => (
//                   <tr key={slab.id}>
//                     <td>{index + 1}</td>
//                     <td>{slab.id}</td>
//                     <td>{formatCurrency(slab.min_value)}</td>
//                     <td>{formatCurrency(slab.max_value)}</td>
//                     <td>{formatCurrency(slab.booking_amount)}</td>
//                     <td className="actions">
//                       <button 
//                         className="edit-btn"
//                         onClick={() => navigate(`/a-edit-booking-slab/${slab.id}`)}
//                       >
//                         ✏️
//                       </button>
//                       <button 
//                         className="delete-btn"
//                         onClick={() => handleDelete(slab.id)}
//                       >
//                         🗑️
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="no-data">
//                     No booking slabs found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

// export default BookingSlab;



import React, { useEffect, useState } from 'react';
import "./BookingSlab.css";
import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseurl } from './../../BaseURL/BaseURL';
import Swal from 'sweetalert2';

function BookingSlab() {
  const [slabs, setSlabs] = useState([]);
  const [filteredSlabs, setFilteredSlabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  
  const navigate = useNavigate();

  /* ================= FETCH ================= */
  const fetchSlabs = async () => {
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
      
      const res = await axios.get(`${baseurl}/booking-slabs/?${params.toString()}`);
      
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
      
      const sorted = data.sort((a, b) => b.id - a.id);
      setSlabs(sorted);
      setFilteredSlabs(sorted);
      setTotalItems(count);
    } catch (error) {
      console.error("Error fetching booking slabs:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load booking slabs',
        confirmButtonColor: '#273c75'
      });
    }
    setLoading(false);
  };

  useEffect(() => { 
    fetchSlabs(); 
  }, [currentPage, itemsPerPage, searchQuery]);

  /* ================= SEARCH ================= */
  const safeToString = (v) => v ? v.toString() : '';

  // Search is now handled server-side in fetchSlabs
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
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
        axios.delete(`${baseurl}/booking-slabs/${id}/`)
          .then(() => {
            Swal.fire('Deleted!', 'Booking slab deleted.', 'success');
            fetchSlabs(); // Refetch data after deletion
          })
          .catch(() => Swal.fire('Error', 'Delete failed', 'error'));
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

  const formatCurrency = (v) => `₹${Number(v || 0).toLocaleString()}`;

  return (
    <>
      <AdminNavbar />

      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <h2>Booking Slabs</h2>
        </div>

        {/* Toolbar */}
        <div className="page-toolbar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by ID, Min, Max or Amount"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <button 
            className="primary-btn"
            style={{
              backgroundColor: '#273c75',
              borderColor: '#273c75',
              color: 'white'
            }}
            onClick={() => navigate('/a-add-booking-slab')}
          >
            Add Slab
          </button>
        </div>

        {/* Table */}
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>ID</th>
                <th>MIN VALUE</th>
                <th>MAX VALUE</th>
                <th>BOOKING AMOUNT</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="no-data">
                    Loading...
                  </td>
                </tr>
              ) : filteredSlabs.length ? (
                filteredSlabs.map((slab, index) => (
                  <tr key={slab.id}>
                    <td>{startIndex + index}</td>
                    <td>{slab.id}</td>
                    <td>{formatCurrency(slab.min_value)}</td>
                    <td>{formatCurrency(slab.max_value)}</td>
                    <td>{formatCurrency(slab.booking_amount)}</td>
                    <td className="actions">
                      <button 
                        className="edit-btn"
                        onClick={() => navigate(`/a-edit-booking-slab/${slab.id}`)}
                      >
                        ✏️
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(slab.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No booking slabs found
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

export default BookingSlab;