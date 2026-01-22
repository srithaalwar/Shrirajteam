// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Table,
//   TableHead,
//   TableBody,
//   TableCell,
//   TableRow,
//   Container,
//   IconButton,
//   Pagination,
//   Paper,
//   Stack,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/DeleteOutline";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
// import { baseurl } from './../../BaseURL/BaseURL';

// import "./Departments.css"; // ✅ scoped UI CSS

// const Departments = () => {
//   const [departments, setDepartments] = useState([]);
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 8;
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

// const fetchDepartments = async () => {
//   try {
//     const res = await axios.get(`${baseurl}/departments/`);

//     // ✅ FIX: use res.data.results
//     const data = Array.isArray(res.data.results) ? res.data.results : [];

//     // ✅ sort newest first
//     const sortedDepartments = data.sort((a, b) => b.id - a.id);

//     setDepartments(sortedDepartments);
//   } catch (err) {
//     console.error("Error:", err);
//   }
// };


//   const handleDelete = async (id, name) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: `You are about to delete "${name}" department.`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//       reverseButtons: true,
//     });

//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`${baseurl}/departments/${id}/`);
//         Swal.fire({
//           title: "Deleted!",
//           text: "Department deleted successfully.",
//           icon: "success",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         fetchDepartments();
//       } catch (err) {
//         Swal.fire("Error", "Delete failed", "error");
//       }
//     }
//   };

//   const paginate = (data, page) =>
//     data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

//   return (
//     <>
//       <AdminNavbar />

//       <Container maxWidth="xl" className="tc-root">

//         {/* HEADER */}
//         <Box className="tc-header">
//           <h2 className="tc-title">Departments</h2>
//           <Button
//             variant="contained"
//             className="tc-add-btn"
//             onClick={() => navigate("/adddepartment")}
//           >
//             Add Department
//           </Button>
//         </Box>

//         {/* TABLE */}
//         <Paper className="tc-table-card">
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell className="tc-th">S.No</TableCell>
//                 <TableCell className="tc-th">Department Name</TableCell>
//                 <TableCell className="tc-th tc-center">Actions</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {departments.length > 0 ? (
//                 paginate(departments, page).map((dept, index) => (
//                   <TableRow key={dept.id} hover>
//                     <TableCell className="tc-td">
//                       {(page - 1) * itemsPerPage + index + 1}
//                     </TableCell>
//                     <TableCell className="tc-td tc-bold">
//                       {dept.name}
//                     </TableCell>
//                     <TableCell className="tc-center">
//                       <IconButton
//                         className="tc-delete-btn"
//                         onClick={() => handleDelete(dept.id, dept.name)}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={3} align="center">
//                     No departments found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </Paper>

//         {/* PAGINATION */}
//         <Stack className="tc-pagination">
//           <Pagination
//             count={Math.ceil(departments.length / itemsPerPage)}
//             page={page}
//             onChange={(_, value) => setPage(value)}
//           />
//         </Stack>

//       </Container>
//     </>
//   );
// };

// export default Departments;




import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
import { baseurl } from './../../BaseURL/BaseURL';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  /* ================= FETCH DEPARTMENTS ================= */
  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseurl}/departments/`);
      
      // ✅ Handle both array & paginated responses safely
      const data = Array.isArray(res.data) 
        ? res.data 
        : (res.data.results || []);
      
      // ✅ Sort newest first
      const sortedDepartments = data.sort((a, b) => b.id - a.id);
      
      setDepartments(sortedDepartments);
      setFilteredDepartments(sortedDepartments);
    } catch (err) {
      console.error("Error fetching departments:", err);
      setDepartments([]);
      setFilteredDepartments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchDepartments(); 
  }, []);

  /* ================= SEARCH ================= */
  const safeToString = (v) => v ? v.toString() : '';

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredDepartments([...departments].sort((a, b) => b.id - a.id));
      return;
    }

    const q = searchQuery.toLowerCase();
    const filtered = departments.filter(dept =>
      safeToString(dept.id).includes(q) ||
      safeToString(dept.name).toLowerCase().includes(q)
    );

    setFilteredDepartments(filtered.sort((a, b) => b.id - a.id));
  }, [searchQuery, departments]);

  /* ================= DELETE ================= */
  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${name}" department.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${baseurl}/departments/${id}/`)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Department deleted successfully.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
            fetchDepartments();
          })
          .catch((err) => {
            console.error("Delete error:", err);
            Swal.fire("Error", "Delete failed", "error");
          });
      }
    });
  };

  return (
    <>
      <AdminNavbar />

      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <h2>Departments</h2>
        </div>

        {/* Toolbar */}
        <div className="page-toolbar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by ID or Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <button 
            className="primary-btn"
             style={{
                      backgroundColor: '#273c75',
                      borderColor: '#273c75',
                      color: 'white',
                      minWidth: '150px'
                    }}
            onClick={() => navigate("/adddepartment")}
          >
            Add Department
          </button>
        </div>

        {/* Table */}
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>ID</th>
                <th>DEPARTMENT NAME</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="no-data">
                    Loading...
                  </td>
                </tr>
              ) : filteredDepartments.length ? (
                filteredDepartments.map((dept, index) => (
                  <tr key={dept.id}>
                    <td>{index + 1}</td>
                    <td>{dept.id}</td>
                    <td>{dept.name}</td>
                    <td className="actions">
                      {/* <button 
                        className="edit-btn"
                        onClick={() => navigate(`/editdepartment/${dept.id}`)}
                      >
                        ✏️
                      </button> */}
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(dept.id, dept.name)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">
                    No departments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CSS styles (can also be moved to external CSS) */}
      <style jsx="true">{`
        .page-container {
          // max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .page-header {
          margin-bottom: 30px;
        }
        
        .page-header h2 {
          margin: 0;
          color: #333;
          font-size: 24px;
        }
        
        .page-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          gap: 15px;
        }
        
        .search-box {
          position: relative;
          flex-grow: 1;
          max-width: 400px;
        }
        
        .search-box input {
          width: 100%;
          padding: 10px 40px 10px 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.3s;
        }
        
        .search-box input:focus {
          outline: none;
          border-color: #6C63FF;
        }
        
        .search-icon {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
          pointer-events: none;
        }
        
        .primary-btn {
          background-color: #6C63FF;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.3s;
          white-space: nowrap;
        }
        
        .primary-btn:hover {
          background-color: #5a52d5;
        }
        
        .table-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          overflow: hidden;
        }
        
        .data-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .data-table thead {
          background-color: #f8f9fa;
          border-bottom: 2px solid #e9ecef;
        }
        
        .data-table th {
          padding: 16px;
          text-align: left;
          font-weight: 600;
          color: #495057;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .data-table td {
          padding: 16px;
          border-bottom: 1px solid #e9ecef;
          color: #333;
        }
        
        .data-table tr:hover {
          background-color: #f8f9fa;
        }
        
        .actions {
          display: flex;
          gap: 8px;
        }
        
        .edit-btn, .delete-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          transition: all 0.2s;
        }
        
        .edit-btn {
          background-color: #e7f3ff;
          color: #1976d2;
        }
        
        .edit-btn:hover {
          background-color: #d0e7ff;
        }
        
        .delete-btn {
          background-color: #ffeaea;
          color: #d32f2f;
        }
        
        .delete-btn:hover {
          background-color: #ffd5d5;
        }
        
        .no-data {
          text-align: center;
          padding: 40px !important;
          color: #666;
          font-style: italic;
        }
        
        @media (max-width: 768px) {
          .page-toolbar {
            flex-direction: column;
            align-items: stretch;
          }
          
          .search-box {
            max-width: 100%;
          }
          
          .data-table {
            display: block;
            overflow-x: auto;
          }
          
          .actions {
            flex-wrap: nowrap;
          }
        }
      `}</style>
    </>
  );
};

export default Departments;