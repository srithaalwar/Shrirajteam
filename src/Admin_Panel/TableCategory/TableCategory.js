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



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
// import { baseurl } from "./../../BaseURL/BaseURL";
// import Swal from "sweetalert2";
// import "./TableCategory.css";

// function TableCategory() {
//   const [categories, setCategories] = useState([]);
//   const [types, setTypes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchCat, setSearchCat] = useState("");
//   const [searchType, setSearchType] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCategories();
//     fetchTypes();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${baseurl}/property-categories/`);
//       const data = Array.isArray(res.data.results) ? res.data.results : [];
//       setCategories(data.sort((a, b) => b.property_category_id - a.property_category_id));
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const fetchTypes = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseurl}/property-types/`);
//       const data = Array.isArray(res.data.results) ? res.data.results : [];
//       setTypes(data.sort((a, b) => b.property_type_id - a.property_type_id));
//     } catch (error) {
//       console.error("Error fetching types:", error);
//     }
//     setLoading(false);
//   };

//   const handleDeleteCategory = async (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "This will delete the property category permanently!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`${baseurl}/property-categories/${id}/`);
//           Swal.fire('Deleted!', 'Property category deleted successfully.', 'success');
//           fetchCategories();
//         } catch (error) {
//           console.error("Error deleting category:", error);
//           Swal.fire('Error', 'Failed to delete category. Please try again.', 'error');
//         }
//       }
//     });
//   };

//   const handleDeleteType = async (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "This will delete the property type permanently!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`${baseurl}/property-types/${id}/`);
//           Swal.fire('Deleted!', 'Property type deleted successfully.', 'success');
//           fetchTypes();
//         } catch (error) {
//           console.error("Error deleting type:", error);
//           Swal.fire('Error', 'Failed to delete property type. Please try again.', 'error');
//         }
//       }
//     });
//   };

//   const getCategoryName = (id) =>
//     categories.find((c) => c.property_category_id === id)?.name || "Unknown";

//   const filteredCategories = categories.filter(cat =>
//     cat.name.toLowerCase().includes(searchCat.toLowerCase())
//   );

//   const filteredTypes = types.filter(type =>
//     type.name.toLowerCase().includes(searchType.toLowerCase()) ||
//     getCategoryName(type.category).toLowerCase().includes(searchType.toLowerCase())
//   );

//   return (
//     <>
//       <AdminNavbar />

//       <div className="page-container">
//         {/* ==================== PROPERTY CATEGORIES SECTION ==================== */}
//         <div className="section-container">
//           {/* Header */}
//           <div className="page-header">
//             <h2>Property Categories</h2>
//           </div>

//           {/* Toolbar */}
//           <div className="page-toolbar">
//             <div className="search-box">
//               <input
//                 type="text"
//                 placeholder="Search category name"
//                 value={searchCat}
//                 onChange={(e) => setSearchCat(e.target.value)}
//               />
//               <span className="search-icon">🔍</span>
//             </div>
            
//             <button 
//               className="primary-btn"
//               style={{
//     backgroundColor: '#273c75',
//     borderColor: '#273c75',
//     color: 'white'
//   }}
//               onClick={() => navigate("/propertycategoryform")}
//             >
//               Add Category
//             </button>
//           </div>

//           {/* Table */}
//           <div className="table-card">
//             <table className="data-table">
//               <thead>
//                 <tr>
//                   <th>S.No.</th>
//                   <th>CATEGORY NAME</th>
//                   <th>ACTIONS</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredCategories.length === 0 ? (
//                   <tr>
//                     <td colSpan="3" className="no-data">
//                       No categories found
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredCategories.map((cat, index) => (
//                     <tr key={cat.property_category_id}>
//                       <td>{index + 1}</td>
//                       <td className="name-cell">{cat.name}</td>
//                       <td className="actions">
//                         <button 
//                           className="delete-btn"
//                           onClick={() => handleDeleteCategory(cat.property_category_id)}
//                         >
//                           🗑️
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* ==================== PROPERTY TYPES SECTION ==================== */}
//         <div className="section-container" style={{ marginTop: '32px' }}>
//           {/* Header */}
//           <div className="page-header">
//             <h2>Property Types</h2>
//           </div>

//           {/* Toolbar */}
//           <div className="page-toolbar">
//             <div className="search-box">
//               <input
//                 type="text"
//                 placeholder="Search by type or category"
//                 value={searchType}
//                 onChange={(e) => setSearchType(e.target.value)}
//               />
//               <span className="search-icon">🔍</span>
//             </div>
            
//             <button 
//               className="primary-btn"
//               style={{
//     backgroundColor: '#273c75',
//     borderColor: '#273c75',
//     color: 'white'
//   }}
//               onClick={() => navigate("/a-category")}
//             >
//               Add Property Type
//             </button>
//           </div>

//           {/* Table */}
//           <div className="table-card">
//             <table className="data-table">
//               <thead>
//                 <tr>
//                   <th>S.No.</th>
//                   <th>TYPE NAME</th>
//                   <th>CATEGORY</th>
//                   <th>ACTIONS</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td colSpan="4" className="no-data">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : filteredTypes.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="no-data">
//                       No property types found
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredTypes.map((item, index) => (
//                     <tr key={item.property_type_id}>
//                       <td>{index + 1}</td>
//                       <td className="name-cell">{item.name}</td>
//                       <td>
//                         <span className="category-badge">
//                           {getCategoryName(item.category)}
//                         </span>
//                       </td>
//                       <td className="actions">
//                         <button 
//                           className="edit-btn"
//                           onClick={() => navigate(`/editcategory/${item.property_type_id}`)}
//                         >
//                           ✏️
//                         </button>
//                         <button 
//                           className="delete-btn"
//                           onClick={() => handleDeleteType(item.property_type_id)}
//                         >
//                           🗑️
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
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

  // Pagination states for Categories
  const [currentPageCat, setCurrentPageCat] = useState(1);
  const [itemsPerPageCat, setItemsPerPageCat] = useState(5);
  const [totalItemsCat, setTotalItemsCat] = useState(0);

  // Pagination states for Types
  const [currentPageType, setCurrentPageType] = useState(1);
  const [itemsPerPageType, setItemsPerPageType] = useState(5);
  const [totalItemsType, setTotalItemsType] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchTypes();
  }, [currentPageCat, itemsPerPageCat, currentPageType, itemsPerPageType]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      // Build query parameters for categories
      const params = new URLSearchParams({
        page: currentPageCat,
        page_size: itemsPerPageCat,
      });
      
      if (searchCat.trim()) {
        params.append('search', searchCat.trim());
      }
      
      const res = await axios.get(`${baseurl}/property-categories/?${params.toString()}`);
      
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
      
      const sorted = data.sort((a, b) => b.property_category_id - a.property_category_id);
      setCategories(sorted);
      setTotalItemsCat(count);
    } catch (error) {
      console.error("Error fetching categories:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load property categories',
        confirmButtonColor: '#273c75'
      });
    }
  };

  const fetchTypes = async () => {
    setLoading(true);
    try {
      // Build query parameters for types
      const params = new URLSearchParams({
        page: currentPageType,
        page_size: itemsPerPageType,
      });
      
      if (searchType.trim()) {
        params.append('search', searchType.trim());
      }
      
      const res = await axios.get(`${baseurl}/property-types/?${params.toString()}`);
      
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
      
      const sorted = data.sort((a, b) => b.property_type_id - a.property_type_id);
      setTypes(sorted);
      setTotalItemsType(count);
    } catch (error) {
      console.error("Error fetching types:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load property types',
        confirmButtonColor: '#273c75'
      });
    }
    setLoading(false);
  };

  const handleDeleteCategory = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will delete the property category permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#273c75',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${baseurl}/property-categories/${id}/`);
          Swal.fire('Deleted!', 'Property category deleted successfully.', 'success');
          fetchCategories();
          fetchTypes(); // Refresh types as they might reference this category
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
      confirmButtonColor: '#d33',
      cancelButtonColor: '#273c75',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
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

  /* ================= PAGINATION FUNCTIONS FOR CATEGORIES ================= */
  const totalPagesCat = Math.ceil(totalItemsCat / itemsPerPageCat);
  const startIndexCat = (currentPageCat - 1) * itemsPerPageCat + 1;

  const handlePageChangeCat = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPagesCat) {
      setCurrentPageCat(pageNumber);
    }
  };

  const handleItemsPerPageChangeCat = (e) => {
    const value = parseInt(e.target.value);
    setItemsPerPageCat(value);
    setCurrentPageCat(1);
  };

  /* ================= PAGINATION FUNCTIONS FOR TYPES ================= */
  const totalPagesType = Math.ceil(totalItemsType / itemsPerPageType);
  const startIndexType = (currentPageType - 1) * itemsPerPageType + 1;

  const handlePageChangeType = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPagesType) {
      setCurrentPageType(pageNumber);
    }
  };

  const handleItemsPerPageChangeType = (e) => {
    const value = parseInt(e.target.value);
    setItemsPerPageType(value);
    setCurrentPageType(1);
  };

  /* ================= GENERATE PAGE NUMBERS ================= */
  const getPageNumbers = (totalPages, currentPage) => {
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

  /* ================= PAGINATION COMPONENT ================= */
  const PaginationControls = ({ 
    totalItems, 
    currentPage, 
    totalPages, 
    startIndex,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
    getPageNumbers 
  }) => {
    const pageNumbers = getPageNumbers(totalPages, currentPage);
    
    return (
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
          {pageNumbers.map(page => (
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
    );
  };

  /* ================= HANDLE SEARCH CHANGES ================= */
  const handleSearchCatChange = (e) => {
    setSearchCat(e.target.value);
    setCurrentPageCat(1); // Reset to first page when searching
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setCurrentPageType(1); // Reset to first page when searching
  };

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
                onChange={handleSearchCatChange}
              />
              {/* <span className="search-icon">🔍</span> */}
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
                {loading ? (
                  <tr>
                    <td colSpan="3" className="no-data">
                      Loading...
                    </td>
                  </tr>
                ) : categories.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="no-data">
                      No categories found
                    </td>
                  </tr>
                ) : (
                  categories.map((cat, index) => (
                    <tr key={cat.property_category_id}>
                      <td>{startIndexCat + index}</td>
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
            
            {/* Pagination Controls for Categories */}
            {totalItemsCat > 0 && (
              <PaginationControls
                totalItems={totalItemsCat}
                currentPage={currentPageCat}
                totalPages={totalPagesCat}
                startIndex={startIndexCat}
                itemsPerPage={itemsPerPageCat}
                handlePageChange={handlePageChangeCat}
                handleItemsPerPageChange={handleItemsPerPageChangeCat}
                getPageNumbers={() => getPageNumbers(totalPagesCat, currentPageCat)}
              />
            )}
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
                onChange={handleSearchTypeChange}
              />
              {/* <span className="search-icon">🔍</span> */}
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
                ) : types.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="no-data">
                      No property types found
                    </td>
                  </tr>
                ) : (
                  types.map((item, index) => (
                    <tr key={item.property_type_id}>
                      <td>{startIndexType + index}</td>
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
            
            {/* Pagination Controls for Types */}
            {totalItemsType > 0 && (
              <PaginationControls
                totalItems={totalItemsType}
                currentPage={currentPageType}
                totalPages={totalPagesType}
                startIndex={startIndexType}
                itemsPerPage={itemsPerPageType}
                handlePageChange={handlePageChangeType}
                handleItemsPerPageChange={handleItemsPerPageChangeType}
                getPageNumbers={() => getPageNumbers(totalPagesType, currentPageType)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TableCategory;