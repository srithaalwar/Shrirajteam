// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import AdminNavbar from "../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../BaseURL/BaseURL";
// import "./CarouselList.css"; // You can create this CSS file

// function CarouselList() {
//   const [carousels, setCarousels] = useState([]);
//   const [filteredCarousels, setFilteredCarousels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [totalItems, setTotalItems] = useState(0);
  
//   const navigate = useNavigate();

//   /* ================= FETCH CAROUSELS ================= */
//   const fetchCarousels = async () => {
//     setLoading(true);
//     try {
//       // Build query parameters
//       const params = new URLSearchParams({
//         page: currentPage,
//         page_size: itemsPerPage,
//       });
      
//       if (searchQuery.trim()) {
//         params.append('search', searchQuery.trim());
//       }
      
//       const res = await axios.get(`${baseurl}/carousel/?${params.toString()}`);
      
//       // Handle different response formats
//       let data = [];
//       let count = 0;
      
//       if (Array.isArray(res.data)) {
//         data = res.data;
//         count = res.data.length;
//       } else if (res.data.results) {
//         data = res.data.results || [];
//         count = res.data.count || data.length;
//       } else {
//         data = res.data;
//         count = res.data.length || 0;
//       }
      
//       const sorted = data.sort((a, b) => b.id - a.id);
//       setCarousels(sorted);
//       setFilteredCarousels(sorted);
//       setTotalItems(count);
//     } catch (error) {
//       console.error("Error fetching carousels:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to load carousel items',
//         confirmButtonColor: '#273c75'
//       });
//     }
//     setLoading(false);
//   };

//   useEffect(() => { 
//     fetchCarousels(); 
//   }, [currentPage, itemsPerPage, searchQuery]);

//   /* ================= SEARCH HANDLER ================= */
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1); // Reset to first page when searching
//   };

//   /* ================= DELETE HANDLER ================= */
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#273c75',
//       confirmButtonText: 'Delete',
//       cancelButtonText: 'Cancel'
//     }).then(result => {
//       if (result.isConfirmed) {
//         axios.delete(`${baseurl}/carousel/${id}/`)
//           .then(() => {
//             Swal.fire('Deleted!', 'Carousel item deleted.', 'success');
//             fetchCarousels(); // Refetch data after deletion
//           })
//           .catch(() => Swal.fire('Error', 'Delete failed', 'error'));
//       }
//     });
//   };

//   /* ================= STATUS UPDATE HANDLER ================= */
//   const handleStatusToggle = async (id, currentStatus) => {
//     try {
//       await axios.patch(`${baseurl}/carousel/${id}/`, {
//         active: !currentStatus
//       });
      
//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: `Carousel item ${!currentStatus ? 'activated' : 'deactivated'} successfully`,
//         confirmButtonColor: '#273c75',
//         timer: 2000
//       });
      
//       fetchCarousels(); // Refresh the list
//     } catch (error) {
//       console.error("Error updating status:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to update status',
//         confirmButtonColor: '#273c75'
//       });
//     }
//   };

//   /* ================= PAGINATION HANDLERS ================= */
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage + 1;
  
//   const handlePageChange = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   const handleItemsPerPageChange = (e) => {
//     const value = parseInt(e.target.value);
//     setItemsPerPage(value);
//     setCurrentPage(1);
//   };

//   // Generate page numbers for pagination
//   const getPageNumbers = () => {
//     const pageNumbers = [];
//     const maxVisiblePages = 5;
    
//     if (totalPages <= maxVisiblePages) {
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       let startPage = Math.max(1, currentPage - 2);
//       let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
//       if (endPage - startPage + 1 < maxVisiblePages) {
//         startPage = Math.max(1, endPage - maxVisiblePages + 1);
//       }
      
//       for (let i = startPage; i <= endPage; i++) {
//         pageNumbers.push(i);
//       }
//     }
    
//     return pageNumbers;
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   // Get media type icon
//   const getMediaTypeIcon = (item) => {
//     if (item.image) return '🖼️';
//     if (item.video) return '🎥';
//     return '📁';
//   };

//   // Truncate text
//   const truncateText = (text, maxLength = 30) => {
//     if (!text) return '-';
//     return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
//   };

//   return (
//     <>
//       <AdminNavbar />

//       <div className="page-container">
//         {/* Header */}
//         <div className="page-header">
//           <h2>Carousel Management</h2>
//         </div>

//         {/* Toolbar */}
//         <div className="page-toolbar">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Search by title, description or link"
//               value={searchQuery}
//               onChange={handleSearchChange}
//             />
//           </div>
          
//           <button 
//             className="primary-btn"
//             style={{
//               backgroundColor: '#273c75',
//               borderColor: '#273c75',
//               color: 'white'
//             }}
//             onClick={() => navigate('/a-add-carousel')}
//           >
//             + Add Carousel Item
//           </button>
//         </div>

//         {/* Table */}
//         <div className="table-card">
//           <table className="data-table">
//             <thead>
//               <tr>
//                 <th>S.No.</th>
//                 <th>ID</th>
//                 <th>Media</th>
//                 <th>Title</th>
//                 <th>Description</th>
//                 <th>Order</th>
//                 <th>Status</th>
//                 <th>Created</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="9" className="no-data">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : filteredCarousels.length ? (
//                 filteredCarousels.map((item, index) => (
//                   <tr key={item.id}>
//                     <td>{startIndex + index}</td>
//                     <td>{item.id}</td>
//                     <td className="media-icon">
//                       {getMediaTypeIcon(item)}
//                     </td>
//                     <td>
//                       <span className="title-cell" title={item.title}>
//                         {truncateText(item.title)}
//                       </span>
//                     </td>
//                     <td>
//                       <span className="desc-cell" title={item.description}>
//                         {truncateText(item.description)}
//                       </span>
//                     </td>
//                     <td>{item.order || '-'}</td>
//                     <td>
//                       <span 
//                         className={`status-badge ${item.active ? 'active' : 'inactive'}`}
//                         style={{
//                           padding: '4px 8px',
//                           borderRadius: '4px',
//                           fontSize: '12px',
//                           fontWeight: '500',
//                           cursor: 'pointer',
//                           backgroundColor: item.active ? '#d4edda' : '#f8d7da',
//                           color: item.active ? '#155724' : '#721c24'
//                         }}
//                         onClick={() => handleStatusToggle(item.id, item.active)}
//                       >
//                         {item.active ? 'Active' : 'Inactive'}
//                       </span>
//                     </td>
//                     <td>{formatDate(item.created_at)}</td>
//                     <td className="actions">
//                       <button 
//                         className="edit-btn"
//                         onClick={() => navigate(`/a-edit-carousel/${item.id}`)}
//                         title="Edit"
//                       >
//                         ✏️
//                       </button>
//                       <button 
//                         className="delete-btn"
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
//                   <td colSpan="9" className="no-data">
//                     No carousel items found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
          
//           {/* Pagination Controls */}
//           {totalItems > 0 && (
//             <div className="pagination-container" style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               padding: '16px',
//               borderTop: '1px solid #eee',
//               backgroundColor: '#f8f9fa'
//             }}>
//               {/* Items per page selector */}
//               <div className="items-per-page" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                 <span style={{ fontSize: '14px', color: '#666' }}>Show:</span>
//                 <select 
//                   value={itemsPerPage} 
//                   onChange={handleItemsPerPageChange}
//                   style={{
//                     padding: '6px 12px',
//                     border: '1px solid #ddd',
//                     borderRadius: '4px',
//                     fontSize: '14px'
//                   }}
//                 >
//                   <option value="5">5</option>
//                   <option value="10">10</option>
//                   <option value="20">20</option>
//                   <option value="50">50</option>
//                   <option value="100">100</option>
//                 </select>
//                 <span style={{ fontSize: '14px', color: '#666' }}>
//                   of {totalItems} items
//                 </span>
//               </div>
              
//               {/* Page navigation */}
//               <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                 <button
//                   onClick={() => handlePageChange(1)}
//                   disabled={currentPage === 1}
//                   style={{
//                     padding: '6px 12px',
//                     border: '1px solid #ddd',
//                     borderRadius: '4px',
//                     background: currentPage === 1 ? '#f8f9fa' : 'white',
//                     color: currentPage === 1 ? '#ccc' : '#333',
//                     cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//                     fontSize: '14px'
//                   }}
//                 >
//                   ««
//                 </button>
                
//                 <button
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   style={{
//                     padding: '6px 12px',
//                     border: '1px solid #ddd',
//                     borderRadius: '4px',
//                     background: currentPage === 1 ? '#f8f9fa' : 'white',
//                     color: currentPage === 1 ? '#ccc' : '#333',
//                     cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//                     fontSize: '14px'
//                   }}
//                 >
//                   «
//                 </button>
                
//                 {getPageNumbers().map(page => (
//                   <button
//                     key={page}
//                     onClick={() => handlePageChange(page)}
//                     style={{
//                       padding: '6px 12px',
//                       border: '1px solid #ddd',
//                       borderRadius: '4px',
//                       background: currentPage === page ? '#273c75' : 'white',
//                       color: currentPage === page ? 'white' : '#333',
//                       cursor: 'pointer',
//                       fontSize: '14px',
//                       fontWeight: currentPage === page ? 'bold' : 'normal'
//                     }}
//                   >
//                     {page}
//                   </button>
//                 ))}
                
//                 <button
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   style={{
//                     padding: '6px 12px',
//                     border: '1px solid #ddd',
//                     borderRadius: '4px',
//                     background: currentPage === totalPages ? '#f8f9fa' : 'white',
//                     color: currentPage === totalPages ? '#ccc' : '#333',
//                     cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
//                     fontSize: '14px'
//                   }}
//                 >
//                   »
//                 </button>
                
//                 <button
//                   onClick={() => handlePageChange(totalPages)}
//                   disabled={currentPage === totalPages}
//                   style={{
//                     padding: '6px 12px',
//                     border: '1px solid #ddd',
//                     borderRadius: '4px',
//                     background: currentPage === totalPages ? '#f8f9fa' : 'white',
//                     color: currentPage === totalPages ? '#ccc' : '#333',
//                     cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
//                     fontSize: '14px'
//                   }}
//                 >
//                   »»
//                 </button>
//               </div>
              
//               {/* Current page info */}
//               <div className="page-info" style={{ fontSize: '14px', color: '#666' }}>
//                 Page {currentPage} of {totalPages}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default CarouselList;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminNavbar from "../Admin_Panel/Admin_Navbar/Admin_Navbar";
import { baseurl } from "../BaseURL/BaseURL";
// import "./CarouselList.css"; 

function CarouselList() {
  const [carousels, setCarousels] = useState([]);
  const [filteredCarousels, setFilteredCarousels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  
  const navigate = useNavigate();

  /* ================= FETCH CAROUSELS ================= */
  const fetchCarousels = async () => {
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
      
      const res = await axios.get(`${baseurl}/carousel/?${params.toString()}`);
      
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
      
      // Sort by ID descending (newest first)
      const sorted = data.sort((a, b) => b.id - a.id);
      setCarousels(sorted);
      setFilteredCarousels(sorted);
      setTotalItems(count);
    } catch (error) {
      console.error("Error fetching carousels:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load carousel items',
        confirmButtonColor: '#273c75'
      });
    }
    setLoading(false);
  };

  useEffect(() => { 
    fetchCarousels(); 
  }, [currentPage, itemsPerPage, searchQuery]);

  /* ================= SEARCH HANDLER ================= */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  /* ================= DELETE HANDLER ================= */
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
        axios.delete(`${baseurl}/carousel/${id}/`)
          .then(() => {
            Swal.fire('Deleted!', 'Carousel item deleted.', 'success');
            fetchCarousels(); // Refetch data after deletion
          })
          .catch(() => Swal.fire('Error', 'Delete failed', 'error'));
      }
    });
  };

  /* ================= STATUS UPDATE HANDLER ================= */
  const handleStatusToggle = async (id, currentStatus) => {
    try {
      await axios.patch(`${baseurl}/carousel/${id}/`, {
        active: !currentStatus
      });
      
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `Carousel item ${!currentStatus ? 'activated' : 'deactivated'} successfully`,
        confirmButtonColor: '#273c75',
        timer: 2000
      });
      
      fetchCarousels(); // Refresh the list
    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update status',
        confirmButtonColor: '#273c75'
      });
    }
  };

  /* ================= PAGINATION HANDLERS ================= */
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(1);
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

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get media type icon and info
  const getMediaInfo = (item) => {
    if (item.image) return { type: 'image', icon: '🖼️', url: item.image };
    if (item.video) return { type: 'video', icon: '🎥', url: item.video };
    return { type: 'none', icon: '📁', url: null };
  };

  // Truncate text
  const truncateText = (text, maxLength = 30) => {
    if (!text) return '-';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <>
      <AdminNavbar />

      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <h2>Carousel Management</h2>
        </div>

        {/* Toolbar - Similar to BookingSlab */}
        <div className="page-toolbar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by title, description or link"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <button 
            className="primary-btn"
            style={{
              backgroundColor: '#273c75',
              borderColor: '#273c75',
              color: 'white'
            }}
            onClick={() => navigate('/a-add-carousel')}
          >
            Add Carousel
          </button>
        </div>

        {/* Table - Similar to BookingSlab */}
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>ID</th>
                <th>Media</th>
                <th>Title</th>
                <th>Description</th>
                <th>Link</th>
                <th>Order</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="no-data">
                    Loading...
                  </td>
                </tr>
              ) : filteredCarousels.length ? (
                filteredCarousels.map((item, index) => {
                  const mediaInfo = getMediaInfo(item);
                  return (
                    <tr key={item.id}>
                      <td>{startIndex + index}</td>
                      <td>{item.id}</td>
                      <td className="media-icon" title={`${mediaInfo.type} file`}>
                        {mediaInfo.icon}
                      </td>
                      <td>
                        <span className="title-cell" title={item.title}>
                          {truncateText(item.title, 20)}
                        </span>
                      </td>
                      <td>
                        <span className="desc-cell" title={item.description}>
                          {truncateText(item.description, 25)}
                        </span>
                      </td>
                      <td>
                        {item.link ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" 
                             style={{ color: '#273c75', textDecoration: 'none' }}
                             title={item.link}>
                            {truncateText(item.link, 20)}
                          </a>
                        ) : '-'}
                      </td>
                      <td>{item.order || '-'}</td>
                      <td>
                        <span 
                          className={`status-badge ${item.active ? 'active' : 'inactive'}`}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            backgroundColor: item.active ? '#d4edda' : '#f8d7da',
                            color: item.active ? '#155724' : '#721c24',
                            display: 'inline-block'
                          }}
                          onClick={() => handleStatusToggle(item.id, item.active)}
                        >
                          {item.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>{formatDate(item.created_at)}</td>
                      <td className="actions">
                        <button 
                          className="edit-btn"
                          onClick={() => navigate(`/a-edit-carousel/${item.id}`)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDelete(item.id)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="10" className="no-data">
                    No carousel items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {/* Pagination Controls - Same as BookingSlab */}
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

export default CarouselList;