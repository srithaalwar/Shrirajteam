// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Box,
//   Button,
//   IconButton,
//   Container,
//   Pagination,
//   Paper,
//   Chip,
//   Stack,
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import EditIcon from "@mui/icons-material/EditOutlined";
// import DeleteIcon from "@mui/icons-material/DeleteOutline";
// import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
// import { baseurl } from "./../../BaseURL/BaseURL";

// import "./TableCategory.css"; // ✅ scoped CSS

// function TableCategory() {
//   const [categories, setCategories] = useState([]);
//   const [types, setTypes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [pageCat, setPageCat] = useState(1);
//   const [pageType, setPageType] = useState(1);
//   const itemsPerPage = 8;

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCategories();
//     fetchTypes();
//   }, []);

//   const fetchCategories = async () => {
//     const res = await axios.get(`${baseurl}/property-categories/`);
//     const data = Array.isArray(res.data.results) ? res.data.results : [];
//     setCategories(data.sort((a, b) => b.property_category_id - a.property_category_id));
//   };

//   const fetchTypes = async () => {
//     setLoading(true);
//     const res = await axios.get(`${baseurl}/property-types/`);
//     const data = Array.isArray(res.data.results) ? res.data.results : [];
//     setTypes(data.sort((a, b) => b.property_type_id - a.property_type_id));
//     setLoading(false);
//   };

//   const handleDeleteCategory = async (id) => {
//     if (!window.confirm("Do you want to delete this category?")) return;
    
//     try {
//       await axios.delete(`${baseurl}/property-categories/${id}/`);
//       // Refresh the entire page
//       window.location.reload();
//     } catch (error) {
//       console.error("Error deleting category:", error);
//       alert("Failed to delete category. Please try again.");
//     }
//   };

//   const handleDeleteType = async (id) => {
//     if (!window.confirm("Do you want to delete this property type?")) return;
    
//     try {
//       await axios.delete(`${baseurl}/property-types/${id}/`);
//       // Refresh the entire page
//       window.location.reload();
//     } catch (error) {
//       console.error("Error deleting type:", error);
//       alert("Failed to delete property type. Please try again.");
//     }
//   };

//   const getCategoryName = (id) =>
//     categories.find((c) => c.property_category_id === id)?.name || "Unknown";

//   const paginate = (data, page) =>
//     data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

//   return (
//     <>
//       <AdminNavbar />

//       <Container maxWidth="xl" className="tc-root">

//         {/* PROPERTY CATEGORIES */}
//         <Box className="tc-header">
//           <h2 className="tc-title">Property Categories</h2>
//           <Button
//             variant="contained"
//             className="tc-add-btn"
//             onClick={() => navigate("/propertycategoryform")}
//           >
//             Add Property Category
//           </Button>
//         </Box>

//         <Paper className="tc-table-card">
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell className="tc-th">S.No</TableCell>
//                 <TableCell className="tc-th">Category Name</TableCell>
//                 <TableCell className="tc-th tc-center">Actions</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {paginate(categories, pageCat).map((cat, index) => (
//                 <TableRow key={cat.property_category_id} hover>
//                   <TableCell className="tc-td">
//                     {(pageCat - 1) * itemsPerPage + index + 1}
//                   </TableCell>
//                   <TableCell className="tc-td tc-bold">{cat.name}</TableCell>
//                   <TableCell className="tc-center">
//                     <IconButton
//                       className="tc-delete-btn"
//                       onClick={() => handleDeleteCategory(cat.property_category_id)}
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Paper>

//         <Stack className="tc-pagination">
//           <Pagination
//             count={Math.ceil(categories.length / itemsPerPage)}
//             page={pageCat}
//             onChange={(_, v) => setPageCat(v)}
//           />
//         </Stack>

//         {/* PROPERTY TYPES */}
//         <Box className="tc-header">
//           <h2 className="tc-title">Property Types</h2>
//           <Button
//             variant="contained"
//             className="tc-add-btn"
//             onClick={() => navigate("/a-category")}
//           >
//             Add Property Type
//           </Button>
//         </Box>

//         <Paper className="tc-table-card">
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell className="tc-th">S.No</TableCell>
//                 <TableCell className="tc-th">Type Name</TableCell>
//                 <TableCell className="tc-th">Category</TableCell>
//                 <TableCell className="tc-th tc-center">Actions</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={4} align="center">Loading...</TableCell>
//                 </TableRow>
//               ) : (
//                 paginate(types, pageType).map((item, index) => (
//                   <TableRow key={item.property_type_id} hover>
//                     <TableCell className="tc-td">
//                       {(pageType - 1) * itemsPerPage + index + 1}
//                     </TableCell>
//                     <TableCell className="tc-td tc-bold">{item.name}</TableCell>
//                     <TableCell>
//                       <Chip
//                         label={getCategoryName(item.category)}
//                         className="tc-chip"
//                         size="small"
//                       />
//                     </TableCell>
//                     <TableCell className="tc-center">
//                       <IconButton
//                         className="tc-edit-btn"
//                         onClick={() =>
//                           navigate(`/editcategory/${item.property_type_id}`)
//                         }
//                       >
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton
//                         className="tc-delete-btn"
//                         onClick={() => handleDeleteType(item.property_type_id)}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </Paper>

//         <Stack className="tc-pagination">
//           <Pagination
//             count={Math.ceil(types.length / itemsPerPage)}
//             page={pageType}
//             onChange={(_, v) => setPageType(v)}
//           />
//         </Stack>

//       </Container>
//     </>
//   );
// }

// export default TableCategory;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
import { baseurl } from "./../../BaseURL/BaseURL";
import Swal from "sweetalert2";
import "./TableCategory.css";

function TableCategory() {
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCat, setSearchCat] = useState("");
  const [searchType, setSearchType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchTypes();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${baseurl}/property-categories/`);
      const data = Array.isArray(res.data.results) ? res.data.results : [];
      setCategories(data.sort((a, b) => b.property_category_id - a.property_category_id));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchTypes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseurl}/property-types/`);
      const data = Array.isArray(res.data.results) ? res.data.results : [];
      setTypes(data.sort((a, b) => b.property_type_id - a.property_type_id));
    } catch (error) {
      console.error("Error fetching types:", error);
    }
    setLoading(false);
  };

  const handleDeleteCategory = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will delete the property category permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${baseurl}/property-categories/${id}/`);
          Swal.fire('Deleted!', 'Property category deleted successfully.', 'success');
          fetchCategories();
        } catch (error) {
          console.error("Error deleting category:", error);
          Swal.fire('Error', 'Failed to delete category. Please try again.', 'error');
        }
      }
    });
  };

  const handleDeleteType = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will delete the property type permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${baseurl}/property-types/${id}/`);
          Swal.fire('Deleted!', 'Property type deleted successfully.', 'success');
          fetchTypes();
        } catch (error) {
          console.error("Error deleting type:", error);
          Swal.fire('Error', 'Failed to delete property type. Please try again.', 'error');
        }
      }
    });
  };

  const getCategoryName = (id) =>
    categories.find((c) => c.property_category_id === id)?.name || "Unknown";

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchCat.toLowerCase())
  );

  const filteredTypes = types.filter(type =>
    type.name.toLowerCase().includes(searchType.toLowerCase()) ||
    getCategoryName(type.category).toLowerCase().includes(searchType.toLowerCase())
  );

  return (
    <>
      <AdminNavbar />

      <div className="page-container">
        {/* ==================== PROPERTY CATEGORIES SECTION ==================== */}
        <div className="section-container">
          {/* Header */}
          <div className="page-header">
            <h2>Property Categories</h2>
          </div>

          {/* Toolbar */}
          <div className="page-toolbar">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search category name"
                value={searchCat}
                onChange={(e) => setSearchCat(e.target.value)}
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
              onClick={() => navigate("/propertycategoryform")}
            >
              Add Category
            </button>
          </div>

          {/* Table */}
          <div className="table-card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>CATEGORY NAME</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="no-data">
                      No categories found
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((cat, index) => (
                    <tr key={cat.property_category_id}>
                      <td>{index + 1}</td>
                      <td className="name-cell">{cat.name}</td>
                      <td className="actions">
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteCategory(cat.property_category_id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ==================== PROPERTY TYPES SECTION ==================== */}
        <div className="section-container" style={{ marginTop: '32px' }}>
          {/* Header */}
          <div className="page-header">
            <h2>Property Types</h2>
          </div>

          {/* Toolbar */}
          <div className="page-toolbar">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by type or category"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
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
              onClick={() => navigate("/a-category")}
            >
              Add Property Type
            </button>
          </div>

          {/* Table */}
          <div className="table-card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>TYPE NAME</th>
                  <th>CATEGORY</th>
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
                ) : filteredTypes.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="no-data">
                      No property types found
                    </td>
                  </tr>
                ) : (
                  filteredTypes.map((item, index) => (
                    <tr key={item.property_type_id}>
                      <td>{index + 1}</td>
                      <td className="name-cell">{item.name}</td>
                      <td>
                        <span className="category-badge">
                          {getCategoryName(item.category)}
                        </span>
                      </td>
                      <td className="actions">
                        <button 
                          className="edit-btn"
                          onClick={() => navigate(`/editcategory/${item.property_type_id}`)}
                        >
                          ✏️
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteType(item.property_type_id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableCategory;