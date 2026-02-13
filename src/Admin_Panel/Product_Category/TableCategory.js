// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
// import { baseurl } from "./../../BaseURL/BaseURL";
// import Swal from "sweetalert2";
// // import "./TableProductCategory.css";

// function TableProductCategory() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [levelFilter, setLevelFilter] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseurl}/categories/`);
//       const data = Array.isArray(res.data) ? res.data : res.data.results || [];
//       // Sort by display_order if available, otherwise by ID
//       const sortedData = data.sort((a, b) => 
//         (a.display_order || a.category_id) - (b.display_order || b.category_id)
//       );
//       setCategories(sortedData);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to load categories',
//         confirmButtonColor: '#273c75'
//       });
//     }
//     setLoading(false);
//   };

//   const getParentName = (parentId) => {
//     if (!parentId) return "None";
//     const parent = categories.find(c => c.category_id === parentId);
//     return parent ? parent.name : "Unknown";
//   };

//   const getLevelBadgeClass = (level) => {
//     switch(level) {
//       case 'global': return 'level-badge global';
//       case 'business': return 'level-badge business';
//       case 'product': return 'level-badge product';
//       default: return 'level-badge';
//     }
//   };

//   const handleDeleteCategory = async (id) => {
//     // Check if category has children
//     const hasChildren = categories.some(cat => cat.parent === id);
//     if (hasChildren) {
//       Swal.fire({
//         title: 'Cannot Delete',
//         text: 'This category has sub-categories. Please delete them first.',
//         icon: 'warning',
//         confirmButtonColor: '#273c75'
//       });
//       return;
//     }

//     Swal.fire({
//       title: 'Are you sure?',
//       text: "This will delete the category permanently!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#273c75',
//       confirmButtonText: 'Delete',
//       cancelButtonText: 'Cancel'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`${baseurl}/categories/${id}/`);
//           Swal.fire('Deleted!', 'Category deleted successfully.', 'success');
//           fetchCategories();
//         } catch (error) {
//           console.error("Error deleting category:", error);
//           Swal.fire('Error', 'Failed to delete category. Please try again.', 'error');
//         }
//       }
//     });
//   };

//   const filteredCategories = categories.filter(cat => {
//     const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          cat.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          getParentName(cat.parent).toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesLevel = !levelFilter || cat.level === levelFilter;
//     return matchesSearch && matchesLevel;
//   });

//   return (
//     <>
//       <AdminNavbar />

//       <div className="page-container">
//         {/* ==================== PRODUCT CATEGORIES SECTION ==================== */}
//         <div className="section-container">
//           {/* Header */}
//           <div className="page-header">
//             <h2>Product Categories</h2>
//           </div>

//           {/* Toolbar */}
//           <div className="page-toolbar">
//             <div className="search-box">
//               <input
//                 type="text"
//                 placeholder="Search by name, slug or parent"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <span className="search-icon">🔍</span>
//             </div>

//             <div className="filter-box">
//               <select
//                 value={levelFilter}
//                 onChange={(e) => setLevelFilter(e.target.value)}
//                 className="level-filter"
//               >
//                 <option value="">All Levels</option>
//                 <option value="global">Global</option>
//                 <option value="business">Business</option>
//                 <option value="product">Product</option>
//               </select>
//             </div>
            
//             <button 
//               className="primary-btn"
//               style={{
//                 backgroundColor: '#273c75',
//                 borderColor: '#273c75',
//                 color: 'white'
//               }}
//               onClick={() => navigate("/productcategoryform")}
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
//                   <th>SLUG</th>
//                   <th>LEVEL</th>
//                   <th>PARENT</th>
//                   <th>STATUS</th>
//                   <th>ORDER</th>
//                   <th>ACTIONS</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td colSpan="8" className="no-data">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : filteredCategories.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="no-data">
//                       No categories found
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredCategories.map((cat, index) => (
//                     <tr key={cat.category_id}>
//                       <td>{index + 1}</td>
//                       <td className="name-cell">
//                         {cat.name}
//                         {cat.icon && (
//                           <img 
//                             src={cat.icon} 
//                             alt={cat.name} 
//                             className="category-icon"
//                             style={{
//                               width: '24px',
//                               height: '24px',
//                               borderRadius: '4px',
//                               marginLeft: '8px',
//                               objectFit: 'cover'
//                             }}
//                           />
//                         )}
//                       </td>
//                       <td>
//                         <code className="slug-text">{cat.slug}</code>
//                       </td>
//                       <td>
//                         <span className={getLevelBadgeClass(cat.level)}>
//                           {cat.level}
//                         </span>
//                       </td>
//                       <td>
//                         <span className="parent-badge">
//                           {getParentName(cat.parent)}
//                         </span>
//                       </td>
//                       <td>
//                         <span className={`status-badge ${cat.is_active ? 'active' : 'inactive'}`}>
//                           {cat.is_active ? 'Active' : 'Inactive'}
//                         </span>
//                       </td>
//                       <td>
//                         <span className="order-badge">
//                           {cat.display_order || '-'}
//                         </span>
//                       </td>
//                       <td className="actions">
//                         <button 
//                           className="edit-btn"
//                           onClick={() => navigate(`/editproductcategory/${cat.category_id}`)}
//                         >
//                           ✏️
//                         </button>
//                         <button 
//                           className="delete-btn"
//                           onClick={() => handleDeleteCategory(cat.category_id)}
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

// export default TableProductCategory;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
import { baseurl } from "./../../BaseURL/BaseURL";
import Swal from "sweetalert2";
// import "./TableProductCategory.css";

function TableProductCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, [currentPage, itemsPerPage, searchTerm, levelFilter]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams({
        page: currentPage,
        page_size: itemsPerPage,
      });
      
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      
      if (levelFilter) {
        params.append('level', levelFilter);
      }
      
      const res = await axios.get(`${baseurl}/categories/?${params.toString()}`);
      
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
      
      // Sort by display_order if available, otherwise by ID
      const sortedData = data.sort((a, b) => 
        (a.display_order || a.category_id) - (b.display_order || b.category_id)
      );
      
      setCategories(sortedData);
      setTotalItems(count);
    } catch (error) {
      console.error("Error fetching categories:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load categories',
        confirmButtonColor: '#273c75'
      });
    }
    setLoading(false);
  };

  const getParentName = (parentId) => {
    if (!parentId) return "None";
    const parent = categories.find(c => c.category_id === parentId);
    return parent ? parent.name : "Unknown";
  };

  const getLevelBadgeClass = (level) => {
    switch(level) {
      case 'global': return 'level-badge global';
      case 'business': return 'level-badge business';
      case 'product': return 'level-badge product';
      default: return 'level-badge';
    }
  };

  const handleDeleteCategory = async (id) => {
    // Check if category has children
    const hasChildren = categories.some(cat => cat.parent === id);
    if (hasChildren) {
      Swal.fire({
        title: 'Cannot Delete',
        text: 'This category has sub-categories. Please delete them first.',
        icon: 'warning',
        confirmButtonColor: '#273c75'
      });
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "This will delete the category permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#273c75',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${baseurl}/categories/${id}/`);
          Swal.fire('Deleted!', 'Category deleted successfully.', 'success');
          fetchCategories();
        } catch (error) {
          console.error("Error deleting category:", error);
          Swal.fire('Error', 'Failed to delete category. Please try again.', 'error');
        }
      }
    });
  };

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
        {/* ==================== PRODUCT CATEGORIES SECTION ==================== */}
        <div className="section-container">
          {/* Header */}
          <div className="page-header">
            <h2>Product Categories</h2>
          </div>

          {/* Toolbar */}
          <div className="page-toolbar">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by name, slug or parent"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
              />
              {/* <span className="search-icon">🔍</span> */}
            </div>

            <div className="filter-box">
              <select
                value={levelFilter}
                onChange={(e) => {
                  setLevelFilter(e.target.value);
                  setCurrentPage(1); // Reset to first page when filtering
                }}
                className="level-filter"
              >
                <option value="">All Levels</option>
                <option value="global">Global</option>
                <option value="business">Business</option>
                <option value="product">Product</option>
              </select>
            </div>
            
            <button 
              className="primary-btn"
              style={{
                backgroundColor: '#273c75',
                borderColor: '#273c75',
                color: 'white'
              }}
              onClick={() => navigate("/productcategoryform")}
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
                  <th>SLUG</th>
                  <th>LEVEL</th>
                  <th>PARENT</th>
                  <th>STATUS</th>
                  <th>ORDER</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="no-data">
                      Loading...
                    </td>
                  </tr>
                ) : categories.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="no-data">
                      No categories found
                    </td>
                  </tr>
                ) : (
                  categories.map((cat, index) => (
                    <tr key={cat.category_id}>
                      <td>{startIndex + index}</td>
                      <td className="name-cell">
                        {cat.name}
                        {cat.icon && (
                          <img 
                            src={cat.icon} 
                            alt={cat.name} 
                            className="category-icon"
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '4px',
                              marginLeft: '8px',
                              objectFit: 'cover'
                            }}
                          />
                        )}
                      </td>
                      <td>
                        <code className="slug-text">{cat.slug}</code>
                      </td>
                      <td>
                        <span className={getLevelBadgeClass(cat.level)}>
                          {cat.level}
                        </span>
                      </td>
                      <td>
                        <span className="parent-badge">
                          {getParentName(cat.parent)}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${cat.is_active ? 'active' : 'inactive'}`}>
                          {cat.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <span className="order-badge">
                          {cat.display_order || '-'}
                        </span>
                      </td>
                      <td className="actions">
                        <button 
                          className="edit-btn"
                          onClick={() => navigate(`/editproductcategory/${cat.category_id}`)}
                        >
                          ✏️
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteCategory(cat.category_id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
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
      </div>
    </>
  );
}

export default TableProductCategory;