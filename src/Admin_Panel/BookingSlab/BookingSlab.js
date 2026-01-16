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
  
  const navigate = useNavigate();

  /* ================= FETCH ================= */
  const fetchSlabs = () => {
    setLoading(true);
    axios.get(`${baseurl}/booking-slabs/`)
      .then(res => {
        const sorted = res.data.sort((a, b) => b.id - a.id);
        setSlabs(sorted);
        setFilteredSlabs(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchSlabs(); }, []);

  /* ================= SEARCH ================= */
  const safeToString = (v) => v ? v.toString() : '';

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSlabs([...slabs].sort((a, b) => b.id - a.id));
      return;
    }

    const q = searchQuery.toLowerCase();
    const filtered = slabs.filter(s =>
      safeToString(s.id).includes(q) ||
      safeToString(s.min_value).includes(q) ||
      safeToString(s.max_value).includes(q) ||
      safeToString(s.booking_amount).includes(q)
    );

    setFilteredSlabs(filtered.sort((a, b) => b.id - a.id));
  }, [searchQuery, slabs]);

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {
        axios.delete(`${baseurl}/booking-slabs/${id}/`)
          .then(() => {
            Swal.fire('Deleted!', 'Booking slab deleted.', 'success');
            fetchSlabs();
          })
          .catch(() => Swal.fire('Error', 'Delete failed', 'error'));
      }
    });
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <button 
            className="primary-btn"
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
                    <td>{index + 1}</td>
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
        </div>
      </div>
    </>
  );
}

export default BookingSlab;