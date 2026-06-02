// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AgentNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL';
// import "./Order_commission.css";
// import { 
//   FaShoppingBag, 
//   FaEye, 
//   FaSort, 
//   FaFilter,
//   FaSearch,
//   FaChevronDown,
//   FaChevronUp
// } from "react-icons/fa";

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("user_id");

//   // Fetch orders
//   const fetchOrders = async () => {
//     if (!userId) {
//       setLoading(false);
//       setOrders([]);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
      
//       console.log("Fetching orders for user:", userId);
      
//       const response = await axios.get(`${baseurl}/orders/`, {
//         params: { user: userId },
//         timeout: 10000
//       });
      
//       console.log("Orders API Response:", response.data);
      
//       const ordersData = response.data.results || response.data || [];
//       setOrders(ordersData);
      
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       setError("Failed to load orders. Please try again later.");
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [userId]);

//   // Format date to DD MMM YYYY
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
//   };

//   // Format amount with Indian number format
//   const formatAmount = (amount) => {
//     if (!amount) return "₹0";
//     const num = parseFloat(amount);
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(num);
//   };

//   // Get status badge class
//   const getStatusClass = (status) => {
//     if (!status) return "status-default";
//     switch (status.toLowerCase()) {
//       case 'cancelled':
//         return "status-cancelled";
//       case 'processing':
//         return "status-processing";
//       case 'paid':
//       case 'delivered':
//         return "status-delivered";
//       default:
//         return "status-default";
//     }
//   };

//   // Handle sorting
//   const handleSort = (key) => {
//     setSortConfig(prev => ({
//       key,
//       direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
//     }));
//   };

//   // Get sorted and filtered orders
//   const getFilteredAndSortedOrders = () => {
//     let filtered = [...orders];

//     // Apply search filter (by Order ID or Buyer)
//     if (searchTerm) {
//       filtered = filtered.filter(order => 
//         order.order_id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
//         order.user_name?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Apply status filter
//     if (statusFilter !== "all") {
//       filtered = filtered.filter(order => 
//         order.status?.toLowerCase() === statusFilter.toLowerCase()
//       );
//     }

//     // Apply sorting
//     filtered.sort((a, b) => {
//       let aVal, bVal;
      
//       switch (sortConfig.key) {
//         case 'orderId':
//           aVal = a.order_id;
//           bVal = b.order_id;
//           break;
//         case 'date':
//           aVal = new Date(a.created_at);
//           bVal = new Date(b.created_at);
//           break;
//         case 'buyer':
//           aVal = a.user_name || '';
//           bVal = b.user_name || '';
//           break;
//         case 'products':
//           aVal = a.items?.length || 0;
//           bVal = b.items?.length || 0;
//           break;
//         case 'items':
//           aVal = a.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
//           bVal = b.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
//           break;
//         case 'amount':
//           aVal = parseFloat(a.total_amount) || 0;
//           bVal = parseFloat(b.total_amount) || 0;
//           break;
//         case 'agent':
//           aVal = a.agent_name || '';
//           bVal = b.agent_name || '';
//           break;
//         case 'commission':
//           aVal = parseFloat(a.commission) || 0;
//           bVal = parseFloat(b.commission) || 0;
//           break;
//         default:
//           return 0;
//       }
      
//       if (sortConfig.direction === 'asc') {
//         return aVal > bVal ? 1 : -1;
//       } else {
//         return aVal < bVal ? 1 : -1;
//       }
//     });

//     return filtered;
//   };

//   // Get product names as string
//   const getProductNames = (items) => {
//     if (!items || items.length === 0) return "-";
//     const names = items.map(item => {
//       const variant = item.variant_details;
//       return variant?.sku || item.product_name || "Product";
//     });
//     if (names.length > 2) {
//       return `${names.slice(0, 2).join(", ")} +${names.length - 2} more`;
//     }
//     return names.join(", ");
//   };

//   // Get total items count
//   const getTotalItems = (items) => {
//     if (!items || items.length === 0) return 0;
//     return items.reduce((sum, item) => sum + (item.quantity || 0), 0);
//   };

//   const filteredOrders = getFilteredAndSortedOrders();

//   if (!userId) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="orders-container">
//           <div className="orders-empty">
//             <FaShoppingBag size={64} />
//             <h3>Please Login</h3>
//             <p>You need to be logged in to view your orders</p>
//             <button onClick={() => navigate("/login")}>Go to Login</button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <AgentNavbar />
      
//       <div className="orders-container">
//         {/* Header */}
//         <div className="orders-header">
//           <h1 className="orders-title">Orders</h1>
//         </div>

//         {/* Search and Filter Bar */}
//         <div className="orders-filters">
//           <div className="search-wrapper">
//             <FaSearch className="search-icon" />
//             <input
//               type="text"
//               placeholder="Search by Order ID or Buyer..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
          
//           <div className="filter-wrapper">
//             <FaFilter className="filter-icon" />
//             <select 
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <option value="all">All Status</option>
//               <option value="cancelled">Cancelled</option>
//               <option value="processing">Processing</option>
//               <option value="paid">Paid</option>
//               <option value="delivered">Delivered</option>
//             </select>
//           </div>
//         </div>

//         {error ? (
//           <div className="error-message">{error}</div>
//         ) : filteredOrders.length === 0 ? (
//           <div className="orders-empty">
//             <FaShoppingBag size={64} />
//             <h3>No Orders Found</h3>
//             <p>{searchTerm || statusFilter !== "all" ? "Try adjusting your filters" : "You haven't placed any orders yet"}</p>
//           </div>
//         ) : (
//           <div className="orders-table-wrapper">
//             <table className="orders-table">
//               <thead>
//                 <tr>
//                   <th onClick={() => handleSort('orderId')}>
//                     Order ID
//                     <FaSort className={`sort-icon ${sortConfig.key === 'orderId' ? 'active' : ''}`} />
//                   </th>
//                   <th onClick={() => handleSort('date')}>
//                     Date
//                     <FaSort className={`sort-icon ${sortConfig.key === 'date' ? 'active' : ''}`} />
//                   </th>
//                   <th onClick={() => handleSort('buyer')}>
//                     Buyer
//                     <FaSort className={`sort-icon ${sortConfig.key === 'buyer' ? 'active' : ''}`} />
//                   </th>
//                   <th onClick={() => handleSort('products')}>
//                     Products
//                     <FaSort className={`sort-icon ${sortConfig.key === 'products' ? 'active' : ''}`} />
//                   </th>
//                   <th onClick={() => handleSort('items')}>
//                     Items
//                     <FaSort className={`sort-icon ${sortConfig.key === 'items' ? 'active' : ''}`} />
//                   </th>
//                   <th onClick={() => handleSort('amount')}>
//                     Amount
//                     <FaSort className={`sort-icon ${sortConfig.key === 'amount' ? 'active' : ''}`} />
//                   </th>
//                   <th onClick={() => handleSort('agent')}>
//                     Primary Agent
//                     <FaSort className={`sort-icon ${sortConfig.key === 'agent' ? 'active' : ''}`} />
//                   </th>
//                   <th onClick={() => handleSort('commission')}>
//                     Commission
//                     <FaSort className={`sort-icon ${sortConfig.key === 'commission' ? 'active' : ''}`} />
//                   </th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredOrders.map((order) => (
//                   <tr key={order.order_id}>
//                     <td className="order-id">{order.order_id}</td>
//                     <td>{formatDate(order.created_at)}</td>
//                     <td className="buyer-cell">
//                       <div className="buyer-name">{order.full_name || "Guest"}</div>
//                       <div className="buyer-company">{order.company_name || "-"}</div>
//                     </td>
//                     <td className="products-cell">{getProductNames(order.items)}</td>
//                     <td>{getTotalItems(order.items)}</td>
//                     <td className="amount-cell">{formatAmount(order.total_amount)}</td>
//                     <td>{order.agent_name || "-"}</td>
//                     <td className="commission-cell">{formatAmount(order.commission)}</td>
//                     <td>
//                       <span className={`status-badge ${getStatusClass(order.status)}`}>
//                         {order.status || "Pending"}
//                       </span>
//                     </td>
//                     <td>
//                       <button 
//                         className="view-btn"
//                         onClick={() => navigate(`/order/${order.order_id}`)}
//                       >
//                         <FaEye /> View
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Orders;



//========================================



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AgentNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL';
// import "./Order_commission.css";
// import { 
//   FaShoppingBag, 
//   FaEye, 
//   FaSort, 
//   FaFilter,
//   FaSearch,
//   FaChevronLeft,
//   FaChevronRight,
//   FaAngleDoubleLeft,
//   FaAngleDoubleRight
// } from "react-icons/fa";

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("user_id");
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [totalItems, setTotalItems] = useState(0);

//   // Fetch orders
//   const fetchOrders = async () => {
//     if (!userId) {
//       setOrders([]);
//       return;
//     }

//     try {
//       setError(null);
      
//       console.log("Fetching orders for user:", userId);
      
//       const response = await axios.get(`${baseurl}/orders/`, {
//         params: { user: userId },
//         timeout: 10000
//       });
      
//       console.log("Orders API Response:", response.data);
      
//       const ordersData = response.data.results || response.data || [];
      
//       // Sort orders by created_at (newest first) before setting to state
//       const sortedOrders = [...ordersData].sort((a, b) => {
//         const dateA = parseCustomDate(a.created_at);
//         const dateB = parseCustomDate(b.created_at);
//         return dateB - dateA;
//       });
      
//       setOrders(sortedOrders);
//       setTotalItems(sortedOrders.length);
      
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       setError("Failed to load orders. Please try again later.");
//       setOrders([]);
//       setTotalItems(0);
//     }
//   };

//   // Helper function to parse custom date format "DD-MM-YYYY HH:MM:SS"
//   const parseCustomDate = (dateString) => {
//     if (!dateString) return new Date(0);
//     try {
//       const [datePart, timePart] = dateString.split(' ');
//       const [day, month, year] = datePart.split('-');
//       const [hours, minutes, seconds] = timePart ? timePart.split(':') : [0, 0, 0];
//       return new Date(year, month - 1, day, hours, minutes, seconds);
//     } catch (error) {
//       return new Date(0);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [userId]);

//   // Reset to first page when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter, sortConfig]);

//   // Display date exactly as stored in backend
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     return dateString;
//   };

//   // Format amount with Indian number format
//   const formatAmount = (amount) => {
//     if (!amount) return "₹0";
//     const num = parseFloat(amount);
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(num);
//   };

//   // Get status badge class
//   const getStatusClass = (status) => {
//     if (!status) return "status-default";
//     switch (status.toLowerCase()) {
//       case 'cancelled':
//         return "status-cancelled";
//       case 'processing':
//         return "status-processing";
//       case 'paid':
//       case 'delivered':
//         return "status-delivered";
//       default:
//         return "status-default";
//     }
//   };

//   // Handle sorting
//   const handleSort = (key) => {
//     setSortConfig(prev => ({
//       key,
//       direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
//     }));
//   };

//   // Get filtered orders
//   const getFilteredOrders = () => {
//     let filtered = [...orders];

//     // Apply search filter
//     if (searchTerm) {
//       filtered = filtered.filter(order => 
//         order.order_id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
//         order.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Apply status filter
//     if (statusFilter !== "all") {
//       filtered = filtered.filter(order => 
//         order.status?.toLowerCase() === statusFilter.toLowerCase()
//       );
//     }

//     // Apply sorting
//     filtered.sort((a, b) => {
//       let aVal, bVal;
      
//       switch (sortConfig.key) {
//         case 'orderId':
//           aVal = a.order_id;
//           bVal = b.order_id;
//           break;
//         case 'date':
//           aVal = parseCustomDate(a.created_at);
//           bVal = parseCustomDate(b.created_at);
//           break;
//         case 'buyer':
//           aVal = a.full_name || '';
//           bVal = b.full_name || '';
//           break;
//         case 'products':
//           aVal = a.items?.length || 0;
//           bVal = b.items?.length || 0;
//           break;
//         case 'items':
//           aVal = a.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
//           bVal = b.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
//           break;
//         case 'amount':
//           aVal = parseFloat(a.total_amount) || 0;
//           bVal = parseFloat(b.total_amount) || 0;
//           break;
//         case 'agent':
//           aVal = a.agent_name || '';
//           bVal = b.agent_name || '';
//           break;
//         case 'commission':
//           aVal = parseFloat(a.commission) || 0;
//           bVal = parseFloat(b.commission) || 0;
//           break;
//         default:
//           return 0;
//       }
      
//       if (sortConfig.direction === 'asc') {
//         return aVal > bVal ? 1 : -1;
//       } else {
//         return aVal < bVal ? 1 : -1;
//       }
//     });

//     return filtered;
//   };

//   // Get paginated data
//   const getPaginatedData = () => {
//     const filteredOrders = getFilteredOrders();
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return filteredOrders.slice(startIndex, endIndex);
//   };

//   // Get current page data
//   const currentOrders = getPaginatedData();
//   const totalFilteredItems = getFilteredOrders().length;
//   const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);

//   // Pagination handlers
//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const goToFirstPage = () => {
//     setCurrentPage(1);
//   };

//   const goToLastPage = () => {
//     setCurrentPage(totalPages);
//   };

//   const goToPreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const goToNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   // Get page numbers to display
//   const getPageNumbers = () => {
//     const pageNumbers = [];
//     const maxPagesToShow = 5;
    
//     if (totalPages <= maxPagesToShow) {
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
//       const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      
//       if (startPage > 1) {
//         pageNumbers.push(1);
//         if (startPage > 2) pageNumbers.push('...');
//       }
      
//       for (let i = startPage; i <= endPage; i++) {
//         pageNumbers.push(i);
//       }
      
//       if (endPage < totalPages) {
//         if (endPage < totalPages - 1) pageNumbers.push('...');
//         pageNumbers.push(totalPages);
//       }
//     }
    
//     return pageNumbers;
//   };

//   // Get product names as string
//   const getProductNames = (items) => {
//     if (!items || items.length === 0) return "-";
//     const names = items.map(item => {
//       const variant = item.variant_details;
//       return variant?.sku || item.product_name || "Product";
//     });
//     if (names.length > 2) {
//       return `${names.slice(0, 2).join(", ")} +${names.length - 2} more`;
//     }
//     return names.join(", ");
//   };

//   // Get total items count
//   const getTotalItems = (items) => {
//     if (!items || items.length === 0) return 0;
//     return items.reduce((sum, item) => sum + (item.quantity || 0), 0);
//   };

//   if (!userId) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="orders-container">
//           <div className="orders-empty">
//             <FaShoppingBag size={64} />
//             <h3>Please Login</h3>
//             <p>You need to be logged in to view your orders</p>
//             <button onClick={() => navigate("/login")}>Go to Login</button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <AgentNavbar />
      
//       <div className="orders-container">
//         {/* Header */}
//         <div className="orders-header">
//           <h1 className="orders-title">Orders</h1>
//         </div>

//         {/* Search and Filter Bar */}
//         <div className="orders-filters">
//           <div className="search-wrapper">
//             <FaSearch className="search-icon" />
//             <input
//               type="text"
//               placeholder="Search by Order ID or Buyer..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
          
//           <div className="filter-wrapper">
//             <FaFilter className="filter-icon" />
//             <select 
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <option value="all">All Status</option>
//               <option value="cancelled">Cancelled</option>
//               <option value="processing">Processing</option>
//               <option value="paid">Paid</option>
//               <option value="delivered">Delivered</option>
//             </select>
//           </div>

//           <div className="items-per-page-wrapper">
//             <label>Show:</label>
//             <select 
//               value={itemsPerPage}
//               onChange={(e) => {
//                 setItemsPerPage(Number(e.target.value));
//                 setCurrentPage(1);
//               }}
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={20}>20</option>
//               <option value={50}>50</option>
//             </select>
//           </div>
//         </div>

//         {error ? (
//           <div className="error-message">{error}</div>
//         ) : currentOrders.length === 0 ? (
//           <div className="orders-empty">
//             <FaShoppingBag size={64} />
//             <h3>No Orders Found</h3>
//             <p>{searchTerm || statusFilter !== "all" ? "Try adjusting your filters" : "You haven't placed any orders yet"}</p>
//           </div>
//         ) : (
//           <>
//             <div className="orders-table-wrapper">
//               <table className="orders-table">
//                 <thead>
//                   <tr>
//                     <th onClick={() => handleSort('orderId')}>
//                       Order ID
//                       <FaSort className={`sort-icon ${sortConfig.key === 'orderId' ? 'active' : ''}`} />
//                     </th>
//                     <th onClick={() => handleSort('date')}>
//                       Date & Time
//                       <FaSort className={`sort-icon ${sortConfig.key === 'date' ? 'active' : ''}`} />
//                     </th>
//                     <th onClick={() => handleSort('buyer')}>
//                       Buyer
//                       <FaSort className={`sort-icon ${sortConfig.key === 'buyer' ? 'active' : ''}`} />
//                     </th>
//                     <th onClick={() => handleSort('products')}>
//                       Products
//                       <FaSort className={`sort-icon ${sortConfig.key === 'products' ? 'active' : ''}`} />
//                     </th>
//                     <th onClick={() => handleSort('items')}>
//                       Items
//                       <FaSort className={`sort-icon ${sortConfig.key === 'items' ? 'active' : ''}`} />
//                     </th>
//                     <th onClick={() => handleSort('amount')}>
//                       Amount
//                       <FaSort className={`sort-icon ${sortConfig.key === 'amount' ? 'active' : ''}`} />
//                     </th>
//                     {/* <th onClick={() => handleSort('agent')}>
//                       Primary Agent
//                       <FaSort className={`sort-icon ${sortConfig.key === 'agent' ? 'active' : ''}`} />
//                     </th> */}
//                     <th onClick={() => handleSort('commission')}>
//                       Commission
//                       <FaSort className={`sort-icon ${sortConfig.key === 'commission' ? 'active' : ''}`} />
//                     </th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentOrders.map((order) => (
//                     <tr key={order.order_id}>
//                       <td className="order-id">{order.order_id}</td>
//                       <td>{formatDate(order.created_at)}</td>
//                       <td className="buyer-cell">
//                         <div className="buyer-name">{order.full_name || "Guest"}</div>
//                         <div className="buyer-company">{order.company_name}</div>
//                       </td>
//                       <td className="products-cell">{getProductNames(order.items)}</td>
//                       <td>{getTotalItems(order.items)}</td>
//                       <td className="amount-cell">{formatAmount(order.total_amount)}</td>
//                       {/* <td>{order.agent_name}</td> */}
//                       <td className="commission-cell">{formatAmount(order.commission)}</td>
//                       <td>
//                         <span className={`status-badge ${getStatusClass(order.status)}`}>
//                           {order.status || "Pending"}
//                         </span>
//                       </td>
//                       <td>
//                         <button 
//                           className="view-btn"
//                           onClick={() => navigate(`/order/${order.order_id}`)}
//                         >
//                           <FaEye /> View
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination Section */}
//             {totalFilteredItems > 0 && (
//               <div className="pagination-container">
//                 <div className="pagination-info">
//                   Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalFilteredItems)} of {totalFilteredItems} orders
//                 </div>
                
//                 <div className="pagination-controls">
//                   <button 
//                     onClick={goToFirstPage} 
//                     disabled={currentPage === 1}
//                     className="pagination-btn"
//                   >
//                     <FaAngleDoubleLeft />
//                   </button>
//                   <button 
//                     onClick={goToPreviousPage} 
//                     disabled={currentPage === 1}
//                     className="pagination-btn"
//                   >
//                     <FaChevronLeft />
//                   </button>
                  
//                   <div className="page-numbers">
//                     {getPageNumbers().map((page, index) => (
//                       <button
//                         key={index}
//                         onClick={() => typeof page === 'number' && goToPage(page)}
//                         className={`page-btn ${currentPage === page ? 'active' : ''} ${typeof page !== 'number' ? 'dots' : ''}`}
//                         disabled={typeof page !== 'number'}
//                       >
//                         {page}
//                       </button>
//                     ))}
//                   </div>
                  
//                   <button 
//                     onClick={goToNextPage} 
//                     disabled={currentPage === totalPages}
//                     className="pagination-btn"
//                   >
//                     <FaChevronRight />
//                   </button>
//                   <button 
//                     onClick={goToLastPage} 
//                     disabled={currentPage === totalPages}
//                     className="pagination-btn"
//                   >
//                     <FaAngleDoubleRight />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// export default Orders;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AgentNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL';
// import "./Order_commission.css";
// import { 
//   FaShoppingBag, 
//   FaEye, 
//   FaSort, 
//   FaFilter,
//   FaSearch,
//   FaChevronLeft,
//   FaChevronRight,
//   FaAngleDoubleLeft,
//   FaAngleDoubleRight
// } from "react-icons/fa";

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
//   const [productsCache, setProductsCache] = useState({}); // Cache for product names
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("user_id");
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [totalItems, setTotalItems] = useState(0);

//   // Fetch product details to get product name
//   const fetchProductName = async (productId) => {
//     // Check cache first
//     if (productsCache[productId]) {
//       return productsCache[productId];
//     }

//     try {
//       const response = await axios.get(`${baseurl}/products/${productId}/`, {
//         timeout: 10000
//       });
      
//       const productName = response.data.product_name || `Product ${productId}`;
      
//       // Update cache
//       setProductsCache(prev => ({
//         ...prev,
//         [productId]: productName
//       }));
      
//       return productName;
//     } catch (error) {
//       console.error(`Error fetching product ${productId}:`, error);
//       return `Product ${productId}`;
//     }
//   };

//   // Fetch all product names for items in orders
//   const enrichOrdersWithProductNames = async (ordersData) => {
//     const productIds = new Set();
    
//     // Collect all unique product IDs from orders
//     ordersData.forEach(order => {
//       if (order.items && order.items.length > 0) {
//         order.items.forEach(item => {
//           if (item.variant_details && item.variant_details.product) {
//             productIds.add(item.variant_details.product);
//           }
//         });
//       }
//     });
    
//     // Fetch all product details in parallel
//     const fetchPromises = Array.from(productIds).map(productId => 
//       fetchProductName(productId)
//     );
    
//     await Promise.all(fetchPromises);
//   };

//   // Fetch orders
//   const fetchOrders = async () => {
//     if (!userId) {
//       setOrders([]);
//       return;
//     }

//     try {
//       setError(null);
      
//       console.log("Fetching orders for user:", userId);
      
//       const response = await axios.get(`${baseurl}/orders/`, {
//         params: { user: userId },
//         timeout: 10000
//       });
      
//       console.log("Orders API Response:", response.data);
      
//       const ordersData = response.data.results || response.data || [];
      
//       // Enrich orders with product names
//       await enrichOrdersWithProductNames(ordersData);
      
//       // Sort orders by created_at (newest first) before setting to state
//       const sortedOrders = [...ordersData].sort((a, b) => {
//         const dateA = parseCustomDate(a.created_at);
//         const dateB = parseCustomDate(b.created_at);
//         return dateB - dateA;
//       });
      
//       setOrders(sortedOrders);
//       setTotalItems(sortedOrders.length);
      
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       setError("Failed to load orders. Please try again later.");
//       setOrders([]);
//       setTotalItems(0);
//     }
//   };

//   // Helper function to parse custom date format "DD-MM-YYYY HH:MM:SS"
//   const parseCustomDate = (dateString) => {
//     if (!dateString) return new Date(0);
//     try {
//       const [datePart, timePart] = dateString.split(' ');
//       const [day, month, year] = datePart.split('-');
//       const [hours, minutes, seconds] = timePart ? timePart.split(':') : [0, 0, 0];
//       return new Date(year, month - 1, day, hours, minutes, seconds);
//     } catch (error) {
//       return new Date(0);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [userId]);

//   // Reset to first page when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter, sortConfig]);

//   // Display date exactly as stored in backend
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     return dateString;
//   };

//   // Format amount with Indian number format
//   const formatAmount = (amount) => {
//     if (!amount) return "₹0";
//     const num = parseFloat(amount);
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(num);
//   };

//   // Get status badge class
//   const getStatusClass = (status) => {
//     if (!status) return "status-default";
//     switch (status.toLowerCase()) {
//       case 'cancelled':
//         return "status-cancelled";
//       case 'processing':
//         return "status-processing";
//       case 'paid':
//       case 'delivered':
//         return "status-delivered";
//       default:
//         return "status-default";
//     }
//   };

//   // Handle sorting
//   const handleSort = (key) => {
//     setSortConfig(prev => ({
//       key,
//       direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
//     }));
//   };

//   // Get filtered orders
//   const getFilteredOrders = () => {
//     let filtered = [...orders];

//     // Apply search filter
//     if (searchTerm) {
//       filtered = filtered.filter(order => 
//         order.order_id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
//         order.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Apply status filter
//     if (statusFilter !== "all") {
//       filtered = filtered.filter(order => 
//         order.status?.toLowerCase() === statusFilter.toLowerCase()
//       );
//     }

//     // Apply sorting
//     filtered.sort((a, b) => {
//       let aVal, bVal;
      
//       switch (sortConfig.key) {
//         case 'orderId':
//           aVal = a.order_id;
//           bVal = b.order_id;
//           break;
//         case 'date':
//           aVal = parseCustomDate(a.created_at);
//           bVal = parseCustomDate(b.created_at);
//           break;
//         case 'buyer':
//           aVal = a.full_name || '';
//           bVal = b.full_name || '';
//           break;
//         case 'products':
//           aVal = a.items?.length || 0;
//           bVal = b.items?.length || 0;
//           break;
//         case 'items':
//           aVal = a.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
//           bVal = b.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
//           break;
//         case 'amount':
//           aVal = parseFloat(a.total_amount) || 0;
//           bVal = parseFloat(b.total_amount) || 0;
//           break;
//         case 'agent':
//           aVal = a.agent_name || '';
//           bVal = b.agent_name || '';
//           break;
//         case 'commission':
//           aVal = parseFloat(a.commission) || 0;
//           bVal = parseFloat(b.commission) || 0;
//           break;
//         default:
//           return 0;
//       }
      
//       if (sortConfig.direction === 'asc') {
//         return aVal > bVal ? 1 : -1;
//       } else {
//         return aVal < bVal ? 1 : -1;
//       }
//     });

//     return filtered;
//   };

//   // Get paginated data
//   const getPaginatedData = () => {
//     const filteredOrders = getFilteredOrders();
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return filteredOrders.slice(startIndex, endIndex);
//   };

//   // Get current page data
//   const currentOrders = getPaginatedData();
//   const totalFilteredItems = getFilteredOrders().length;
//   const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);

//   // Pagination handlers
//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const goToFirstPage = () => {
//     setCurrentPage(1);
//   };

//   const goToLastPage = () => {
//     setCurrentPage(totalPages);
//   };

//   const goToPreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const goToNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   // Get page numbers to display
//   const getPageNumbers = () => {
//     const pageNumbers = [];
//     const maxPagesToShow = 5;
    
//     if (totalPages <= maxPagesToShow) {
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
//       const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      
//       if (startPage > 1) {
//         pageNumbers.push(1);
//         if (startPage > 2) pageNumbers.push('...');
//       }
      
//       for (let i = startPage; i <= endPage; i++) {
//         pageNumbers.push(i);
//       }
      
//       if (endPage < totalPages) {
//         if (endPage < totalPages - 1) pageNumbers.push('...');
//         pageNumbers.push(totalPages);
//       }
//     }
    
//     return pageNumbers;
//   };

//   // Get product names with actual product names from cache
//   const getProductNames = (items) => {
//     if (!items || items.length === 0) return "-";
    
//     const names = items.map(item => {
//       const productId = item.variant_details?.product;
//       if (productId && productsCache[productId]) {
//         return productsCache[productId];
//       }
//       // Fallback to SKU or variant ID if product name not available
//       return item.variant_details?.sku || item.product_name || `Product ${productId || 'Unknown'}`;
//     });
    
//     if (names.length > 2) {
//       return `${names.slice(0, 2).join(", ")} +${names.length - 2} more`;
//     }
//     return names.join(", ");
//   };

//   // Get total items count
//   const getTotalItems = (items) => {
//     if (!items || items.length === 0) return 0;
//     return items.reduce((sum, item) => sum + (item.quantity || 0), 0);
//   };

//   if (!userId) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="orders-container">
//           <div className="orders-empty">
//             <FaShoppingBag size={64} />
//             <h3>Please Login</h3>
//             <p>You need to be logged in to view your orders</p>
//             <button onClick={() => navigate("/login")}>Go to Login</button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <AgentNavbar />
      
//       <div className="orders-container">
//         {/* Header */}
//         <div className="orders-header">
//           <h1 className="orders-title">Orders</h1>
//         </div>

//         {/* Search and Filter Bar */}
//         <div className="orders-filters">
//           <div className="search-wrapper">
//             <FaSearch className="search-icon" />
//             <input
//               type="text"
//               placeholder="Search by Order ID or Buyer..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
          
//           <div className="filter-wrapper">
//             <FaFilter className="filter-icon" />
//             <select 
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <option value="all">All Status</option>
//               <option value="cancelled">Cancelled</option>
//               <option value="processing">Processing</option>
//               <option value="paid">Paid</option>
//               <option value="delivered">Delivered</option>
//             </select>
//           </div>

//           <div className="items-per-page-wrapper">
//             <label>Show:</label>
//             <select 
//               value={itemsPerPage}
//               onChange={(e) => {
//                 setItemsPerPage(Number(e.target.value));
//                 setCurrentPage(1);
//               }}
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={20}>20</option>
//               <option value={50}>50</option>
//             </select>
//           </div>
//         </div>

//         {error ? (
//           <div className="error-message">{error}</div>
//         ) : currentOrders.length === 0 ? (
//           <div className="orders-empty">
//             <FaShoppingBag size={64} />
//             <h3>No Orders Found</h3>
//             <p>{searchTerm || statusFilter !== "all" ? "Try adjusting your filters" : "You haven't placed any orders yet"}</p>
//           </div>
//         ) : (
//           <>
//             <div className="orders-table-wrapper">
//               <table className="orders-table">
//                 <thead>
//                   <tr>
//                     <th onClick={() => handleSort('orderId')}>
//                       Order ID
//                       <FaSort className={`sort-icon ${sortConfig.key === 'orderId' ? 'active' : ''}`} />
//                     </th>
//                     <th onClick={() => handleSort('date')}>
//                       Date & Time
//                       <FaSort className={`sort-icon ${sortConfig.key === 'date' ? 'active' : ''}`} />
//                     </th>
//                     <th onClick={() => handleSort('buyer')}>
//                       Buyer
//                       <FaSort className={`sort-icon ${sortConfig.key === 'buyer' ? 'active' : ''}`} />
//                     </th>
//                     <th onClick={() => handleSort('products')}>
//                       Products
//                       <FaSort className={`sort-icon ${sortConfig.key === 'products' ? 'active' : ''}`} />
//                     </th>
//                     <th onClick={() => handleSort('items')}>
//                       Items
//                       <FaSort className={`sort-icon ${sortConfig.key === 'items' ? 'active' : ''}`} />
//                     </th>
//                     <th onClick={() => handleSort('amount')}>
//                       Amount
//                       <FaSort className={`sort-icon ${sortConfig.key === 'amount' ? 'active' : ''}`} />
//                     </th>
//                     <th onClick={() => handleSort('commission')}>
//                       Commission
//                       <FaSort className={`sort-icon ${sortConfig.key === 'commission' ? 'active' : ''}`} />
//                     </th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentOrders.map((order) => (
//                     <tr key={order.order_id}>
//                       <td className="order-id">{order.order_id}</td>
//                       <td>{formatDate(order.created_at)}</td>
//                       <td className="buyer-cell">
//                         <div className="buyer-name">{order.full_name || "Guest"}</div>
//                         <div className="buyer-company">{order.company_name}</div>
//                       </td>
//                       <td className="products-cell">{getProductNames(order.items)}</td>
//                       <td>{getTotalItems(order.items)}</td>
//                       <td className="amount-cell">{formatAmount(order.total_amount)}</td>
//                       <td className="commission-cell">{formatAmount(order.commission)}</td>
//                       <td>
//                         <span className={`status-badge ${getStatusClass(order.status)}`}>
//                           {order.status || "Pending"}
//                         </span>
//                       </td>
//                       <td>
//                         <button 
//                           className="view-btn"
//                           onClick={() => navigate(`/order/${order.order_id}`)}
//                         >
//                           <FaEye /> View
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination Section */}
//             {totalFilteredItems > 0 && (
//               <div className="pagination-container">
//                 <div className="pagination-info">
//                   Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalFilteredItems)} of {totalFilteredItems} orders
//                 </div>
                
//                 <div className="pagination-controls">
//                   <button 
//                     onClick={goToFirstPage} 
//                     disabled={currentPage === 1}
//                     className="pagination-btn"
//                   >
//                     <FaAngleDoubleLeft />
//                   </button>
//                   <button 
//                     onClick={goToPreviousPage} 
//                     disabled={currentPage === 1}
//                     className="pagination-btn"
//                   >
//                     <FaChevronLeft />
//                   </button>
                  
//                   <div className="page-numbers">
//                     {getPageNumbers().map((page, index) => (
//                       <button
//                         key={index}
//                         onClick={() => typeof page === 'number' && goToPage(page)}
//                         className={`page-btn ${currentPage === page ? 'active' : ''} ${typeof page !== 'number' ? 'dots' : ''}`}
//                         disabled={typeof page !== 'number'}
//                       >
//                         {page}
//                       </button>
//                     ))}
//                   </div>
                  
//                   <button 
//                     onClick={goToNextPage} 
//                     disabled={currentPage === totalPages}
//                     className="pagination-btn"
//                   >
//                     <FaChevronRight />
//                   </button>
//                   <button 
//                     onClick={goToLastPage} 
//                     disabled={currentPage === totalPages}
//                     className="pagination-btn"
//                   >
//                     <FaAngleDoubleRight />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// export default Orders;




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AgentNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL';
// import "./Order_commission.css";
// import { 
//   FaShoppingBag, 
//   FaEye, 
//   FaSort, 
//   FaFilter,
//   FaSearch,
//   FaChevronLeft,
//   FaChevronRight,
//   FaAngleDoubleLeft,
//   FaAngleDoubleRight
// } from "react-icons/fa";

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
//   const [productsCache, setProductsCache] = useState({}); // Cache for product names
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("user_id");
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [totalItems, setTotalItems] = useState(0);

//   // Fetch product details to get product name
//   const fetchProductName = async (productId) => {
//     // Check cache first
//     if (productsCache[productId]) {
//       return productsCache[productId];
//     }

//     try {
//       const response = await axios.get(`${baseurl}/products/${productId}/`, {
//         timeout: 10000
//       });
      
//       const productName = response.data.product_name || `Product ${productId}`;
      
//       // Update cache
//       setProductsCache(prev => ({
//         ...prev,
//         [productId]: productName
//       }));
      
//       return productName;
//     } catch (error) {
//       console.error(`Error fetching product ${productId}:`, error);
//       return `Product ${productId}`;
//     }
//   };

//   // Fetch all product names for items in orders
//   const enrichOrdersWithProductNames = async (ordersData) => {
//     const productIds = new Set();
    
//     // Collect all unique product IDs from orders
//     ordersData.forEach(order => {
//       if (order.items && order.items.length > 0) {
//         order.items.forEach(item => {
//           if (item.variant_details && item.variant_details.product) {
//             productIds.add(item.variant_details.product);
//           }
//         });
//       }
//     });
    
//     // Fetch all product details in parallel
//     const fetchPromises = Array.from(productIds).map(productId => 
//       fetchProductName(productId)
//     );
    
//     await Promise.all(fetchPromises);
//   };

//   // Calculate total distribution commission for an order
//   const getTotalDistributionCommission = (items) => {
//     if (!items || items.length === 0) return 0;
    
//     const totalCommission = items.reduce((sum, item) => {
//       const commission = parseFloat(item.variant_details?.distribution_commission) || 0;
//       const quantity = item.quantity || 1;
//       return sum + (commission * quantity);
//     }, 0);
    
//     return totalCommission;
//   };

//   // Fetch orders
//   const fetchOrders = async () => {
//     if (!userId) {
//       setOrders([]);
//       return;
//     }

//     try {
//       setError(null);
      
//       console.log("Fetching orders for user:", userId);
      
//       const response = await axios.get(`${baseurl}/orders/`, {
//         params: { user: userId },
//         timeout: 10000
//       });
      
//       console.log("Orders API Response:", response.data);
      
//       const ordersData = response.data.results || response.data || [];
      
//       // Enrich orders with product names
//       await enrichOrdersWithProductNames(ordersData);
      
//       // Sort orders by created_at (newest first) before setting to state
//       const sortedOrders = [...ordersData].sort((a, b) => {
//         const dateA = parseCustomDate(a.created_at);
//         const dateB = parseCustomDate(b.created_at);
//         return dateB - dateA;
//       });
      
//       setOrders(sortedOrders);
//       setTotalItems(sortedOrders.length);
      
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       setError("Failed to load orders. Please try again later.");
//       setOrders([]);
//       setTotalItems(0);
//     }
//   };

//   // Helper function to parse custom date format "DD-MM-YYYY HH:MM:SS"
//   const parseCustomDate = (dateString) => {
//     if (!dateString) return new Date(0);
//     try {
//       const [datePart, timePart] = dateString.split(' ');
//       const [day, month, year] = datePart.split('-');
//       const [hours, minutes, seconds] = timePart ? timePart.split(':') : [0, 0, 0];
//       return new Date(year, month - 1, day, hours, minutes, seconds);
//     } catch (error) {
//       return new Date(0);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [userId]);

//   // Reset to first page when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter, sortConfig]);

//   // Display date exactly as stored in backend
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     return dateString;
//   };

//   // Format amount with Indian number format
//   const formatAmount = (amount) => {
//     if (!amount && amount !== 0) return "₹0";
//     const num = parseFloat(amount);
//     if (isNaN(num)) return "₹0";
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(num);
//   };

//   // Get status badge class
//   const getStatusClass = (status) => {
//     if (!status) return "status-default";
//     switch (status.toLowerCase()) {
//       case 'cancelled':
//         return "status-cancelled";
//       case 'processing':
//         return "status-processing";
//       case 'paid':
//       case 'delivered':
//         return "status-delivered";
//       default:
//         return "status-default";
//     }
//   };

//   // Handle sorting
//   const handleSort = (key) => {
//     setSortConfig(prev => ({
//       key,
//       direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
//     }));
//   };

//   // Get filtered orders
//   const getFilteredOrders = () => {
//     let filtered = [...orders];

//     // Apply search filter
//     if (searchTerm) {
//       filtered = filtered.filter(order => 
//         order.order_id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
//         order.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Apply status filter
//     if (statusFilter !== "all") {
//       filtered = filtered.filter(order => 
//         order.status?.toLowerCase() === statusFilter.toLowerCase()
//       );
//     }

//     // Apply sorting
//     filtered.sort((a, b) => {
//       let aVal, bVal;
      
//       switch (sortConfig.key) {
//         case 'orderId':
//           aVal = a.order_id;
//           bVal = b.order_id;
//           break;
//         case 'date':
//           aVal = parseCustomDate(a.created_at);
//           bVal = parseCustomDate(b.created_at);
//           break;
//         case 'buyer':
//           aVal = a.full_name || '';
//           bVal = b.full_name || '';
//           break;
//         case 'products':
//           aVal = a.items?.length || 0;
//           bVal = b.items?.length || 0;
//           break;
//         case 'items':
//           aVal = a.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
//           bVal = b.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
//           break;
//         case 'amount':
//           aVal = parseFloat(a.total_amount) || 0;
//           bVal = parseFloat(b.total_amount) || 0;
//           break;
//         case 'commission':
//           aVal = getTotalDistributionCommission(a.items);
//           bVal = getTotalDistributionCommission(b.items);
//           break;
//         default:
//           return 0;
//       }
      
//       if (sortConfig.direction === 'asc') {
//         return aVal > bVal ? 1 : -1;
//       } else {
//         return aVal < bVal ? 1 : -1;
//       }
//     });

//     return filtered;
//   };

//   // Get paginated data
//   const getPaginatedData = () => {
//     const filteredOrders = getFilteredOrders();
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return filteredOrders.slice(startIndex, endIndex);
//   };

//   // Get current page data
//   const currentOrders = getPaginatedData();
//   const totalFilteredItems = getFilteredOrders().length;
//   const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);

//   // Pagination handlers
//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const goToFirstPage = () => {
//     setCurrentPage(1);
//   };

//   const goToLastPage = () => {
//     setCurrentPage(totalPages);
//   };

//   const goToPreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const goToNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   // Get page numbers to display
//   const getPageNumbers = () => {
//     const pageNumbers = [];
//     const maxPagesToShow = 5;
    
//     if (totalPages <= maxPagesToShow) {
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
//       const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      
//       if (startPage > 1) {
//         pageNumbers.push(1);
//         if (startPage > 2) pageNumbers.push('...');
//       }
      
//       for (let i = startPage; i <= endPage; i++) {
//         pageNumbers.push(i);
//       }
      
//       if (endPage < totalPages) {
//         if (endPage < totalPages - 1) pageNumbers.push('...');
//         pageNumbers.push(totalPages);
//       }
//     }
    
//     return pageNumbers;
//   };

//   // Get product names with actual product names from cache
//   const getProductNames = (items) => {
//     if (!items || items.length === 0) return "-";
    
//     const names = items.map(item => {
//       const productId = item.variant_details?.product;
//       if (productId && productsCache[productId]) {
//         return productsCache[productId];
//       }
//       // Fallback to SKU or variant ID if product name not available
//       return item.variant_details?.sku || item.product_name || `Product ${productId || 'Unknown'}`;
//     });
    
//     if (names.length > 2) {
//       return `${names.slice(0, 2).join(", ")} +${names.length - 2} more`;
//     }
//     return names.join(", ");
//   };

//   // Get total items count
//   const getTotalItemsCount = (items) => {
//     if (!items || items.length === 0) return 0;
//     return items.reduce((sum, item) => sum + (item.quantity || 0), 0);
//   };

//   if (!userId) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="orders-container">
//           <div className="orders-empty">
//             <FaShoppingBag size={64} />
//             <h3>Please Login</h3>
//             <p>You need to be logged in to view your orders</p>
//             <button onClick={() => navigate("/login")}>Go to Login</button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <AgentNavbar />
      
//       <div className="orders-container">
//         {/* Header */}
//         <div className="orders-header">
//           <h1 className="orders-title">Orders</h1>
//         </div>

//         {/* Search and Filter Bar */}
//         <div className="orders-filters">
//           <div className="search-wrapper">
//             <FaSearch className="search-icon" />
//             <input
//               type="text"
//               placeholder="Search by Order ID or Buyer..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
          
//           {/* <div className="filter-wrapper">
//             <FaFilter className="filter-icon" />
//             <select 
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <option value="all">All Status</option>
//               <option value="cancelled">Cancelled</option>
//               <option value="processing">Processing</option>
//               <option value="paid">Paid</option>
//               <option value="delivered">Delivered</option>
//             </select>
//           </div> */}

//           <div className="items-per-page-wrapper">
//             <label>Show:</label>
//             <select 
//               value={itemsPerPage}
//               onChange={(e) => {
//                 setItemsPerPage(Number(e.target.value));
//                 setCurrentPage(1);
//               }}
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={20}>20</option>
//               <option value={50}>50</option>
//             </select>
//           </div>
//         </div>

//         {error ? (
//           <div className="error-message">{error}</div>
//         ) : currentOrders.length === 0 ? (
//           <div className="orders-empty">
//             <FaShoppingBag size={64} />
//             <h3>No Orders Found</h3>
//             <p>{searchTerm || statusFilter !== "all" ? "Try adjusting your filters" : "You haven't placed any orders yet"}</p>
//           </div>
//         ) : (
//           <>
//             <div className="orders-table-wrapper">
//               <table className="orders-table">
//                 <thead>
//                   <tr>
//                     <th onClick={() => handleSort('orderId')}>
//                       Order ID
//                       <FaSort className={`sort-icon ${sortConfig.key === 'orderId' ? 'active' : ''}`} />
//                     </th>
//                     <th onClick={() => handleSort('date')}>
//                       Date & Time
//                       <FaSort className={`sort-icon ${sortConfig.key === 'date' ? 'active' : ''}`} />
//                     </th>
//                     <th onClick={() => handleSort('buyer')}>
//                       Buyer
//                       <FaSort className={`sort-icon ${sortConfig.key === 'buyer' ? 'active' : ''}`} />
//                     </th>
//                     <th onClick={() => handleSort('products')}>
//                       Products
//                       <FaSort className={`sort-icon ${sortConfig.key === 'products' ? 'active' : ''}`} />
//                     </th>
//                     <th onClick={() => handleSort('items')}>
//                       Items
//                       <FaSort className={`sort-icon ${sortConfig.key === 'items' ? 'active' : ''}`} />
//                     </th>
//                     <th onClick={() => handleSort('amount')}>
//                       Amount
//                       <FaSort className={`sort-icon ${sortConfig.key === 'amount' ? 'active' : ''}`} />
//                     </th>
//                     <th onClick={() => handleSort('commission')}>
//                       Commission
//                       <FaSort className={`sort-icon ${sortConfig.key === 'commission' ? 'active' : ''}`} />
//                     </th>
//                     {/* <th>Status</th> */}
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentOrders.map((order) => (
//                     <tr key={order.order_id}>
//                       <td className="order-id">{order.order_id}</td>
//                       <td>{formatDate(order.created_at)}</td>
//                       <td className="buyer-cell">
//                         <div className="buyer-name">{order.full_name || "Guest"}</div>
//                         <div className="buyer-company">{order.company_name}</div>
//                       </td>
//                       <td className="products-cell">{getProductNames(order.items)}</td>
//                       <td>{getTotalItemsCount(order.items)}</td>
//                       <td className="amount-cell">{formatAmount(order.total_amount)}</td>
//                       <td className="commission-cell">
//                         {formatAmount(getTotalDistributionCommission(order.items))}
//                       </td>
//                       {/* <td>
//                         <span className={`status-badge ${getStatusClass(order.status)}`}>
//                           {order.status || "Pending"}
//                         </span>
//                       </td> */}
//                       <td>
//                         <button 
//                           className="view-btn"
//                           onClick={() => navigate(`/order/${order.order_id}`)}
//                         >
//                           <FaEye /> View
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination Section */}
//             {totalFilteredItems > 0 && (
//               <div className="pagination-container">
//                 <div className="pagination-info">
//                   Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalFilteredItems)} of {totalFilteredItems} orders
//                 </div>
                
//                 <div className="pagination-controls">
//                   <button 
//                     onClick={goToFirstPage} 
//                     disabled={currentPage === 1}
//                     className="pagination-btn"
//                   >
//                     <FaAngleDoubleLeft />
//                   </button>
//                   <button 
//                     onClick={goToPreviousPage} 
//                     disabled={currentPage === 1}
//                     className="pagination-btn"
//                   >
//                     <FaChevronLeft />
//                   </button>
                  
//                   <div className="page-numbers">
//                     {getPageNumbers().map((page, index) => (
//                       <button
//                         key={index}
//                         onClick={() => typeof page === 'number' && goToPage(page)}
//                         className={`page-btn ${currentPage === page ? 'active' : ''} ${typeof page !== 'number' ? 'dots' : ''}`}
//                         disabled={typeof page !== 'number'}
//                       >
//                         {page}
//                       </button>
//                     ))}
//                   </div>
                  
//                   <button 
//                     onClick={goToNextPage} 
//                     disabled={currentPage === totalPages}
//                     className="pagination-btn"
//                   >
//                     <FaChevronRight />
//                   </button>
//                   <button 
//                     onClick={goToLastPage} 
//                     disabled={currentPage === totalPages}
//                     className="pagination-btn"
//                   >
//                     <FaAngleDoubleRight />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// export default Orders;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AgentNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import { baseurl } from '../../BaseURL/BaseURL';
import "./Order_commission.css";
import { 
  FaShoppingBag, 
  FaEye, 
  FaSort, 
  FaFilter,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight
} from "react-icons/fa";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [productsCache, setProductsCache] = useState({});
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch product details to get product name
  const fetchProductName = async (productId) => {
    if (productsCache[productId]) {
      return productsCache[productId];
    }

    try {
      const response = await axios.get(`${baseurl}/products/${productId}/`, {
        timeout: 10000
      });
      
      const productName = response.data.product_name || `Product ${productId}`;
      
      setProductsCache(prev => ({
        ...prev,
        [productId]: productName
      }));
      
      return productName;
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error);
      return `Product ${productId}`;
    }
  };

  // Fetch all product names for items in orders
  const enrichOrdersWithProductNames = async (ordersData) => {
    const productIds = new Set();
    
    ordersData.forEach(order => {
      if (order.items && order.items.length > 0) {
        order.items.forEach(item => {
          if (item.variant_details && item.variant_details.product) {
            productIds.add(item.variant_details.product);
          }
        });
      }
    });
    
    const fetchPromises = Array.from(productIds).map(productId => 
      fetchProductName(productId)
    );
    
    await Promise.all(fetchPromises);
  };

  // Calculate total distribution commission for an order
  // ONLY use outside distribution_commission, if null or undefined return 0
  const getItemCommission = (item) => {
    // Check if distribution_commission exists at the item level (outside variant_details)
    if (item.distribution_commission !== undefined && 
        item.distribution_commission !== null && 
        item.distribution_commission !== '') {
      const commission = parseFloat(item.distribution_commission);
      return !isNaN(commission) ? commission : 0;
    }
    
    // Return 0 if outside distribution_commission is not present
    return 0;
  };

  const getTotalDistributionCommission = (items) => {
    if (!items || items.length === 0) return 0;
    
    const totalCommission = items.reduce((sum, item) => {
      const commission = getItemCommission(item);
      const quantity = item.quantity || 1;
      return sum + (commission * quantity);
    }, 0);
    
    return totalCommission;
  };

  // Fetch orders
  const fetchOrders = async () => {
    if (!userId) {
      setOrders([]);
      return;
    }

    try {
      setError(null);
      
      console.log("Fetching orders for user:", userId);
      
      const response = await axios.get(`${baseurl}/orders/`, {
        params: { user: userId },
        timeout: 10000
      });
      
      console.log("Orders API Response:", response.data);
      
      const ordersData = response.data.results || response.data || [];
      
      // Log commission data for debugging
      ordersData.forEach(order => {
        if (order.items && order.items.length > 0) {
          order.items.forEach(item => {
            console.log(`Item - Outside distribution_commission: ${item.distribution_commission}`);
          });
        }
      });
      
      await enrichOrdersWithProductNames(ordersData);
      
      const sortedOrders = [...ordersData].sort((a, b) => {
        const dateA = parseCustomDate(a.created_at);
        const dateB = parseCustomDate(b.created_at);
        return dateB - dateA;
      });
      
      setOrders(sortedOrders);
      setTotalItems(sortedOrders.length);
      
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders. Please try again later.");
      setOrders([]);
      setTotalItems(0);
    }
  };

  const parseCustomDate = (dateString) => {
    if (!dateString) return new Date(0);
    try {
      const [datePart, timePart] = dateString.split(' ');
      const [day, month, year] = datePart.split('-');
      const [hours, minutes, seconds] = timePart ? timePart.split(':') : [0, 0, 0];
      return new Date(year, month - 1, day, hours, minutes, seconds);
    } catch (error) {
      return new Date(0);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortConfig]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString;
  };

  const formatAmount = (amount) => {
    if (!amount && amount !== 0) return "₹0";
    const num = parseFloat(amount);
    if (isNaN(num)) return "₹0";
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  const getStatusClass = (status) => {
    if (!status) return "status-default";
    switch (status.toLowerCase()) {
      case 'cancelled':
        return "status-cancelled";
      case 'processing':
        return "status-processing";
      case 'paid':
      case 'delivered':
        return "status-delivered";
      default:
        return "status-default";
    }
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getFilteredOrders = () => {
    let filtered = [...orders];

    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.order_id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(order => 
        order.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch (sortConfig.key) {
        case 'orderId':
          aVal = a.order_id;
          bVal = b.order_id;
          break;
        case 'date':
          aVal = parseCustomDate(a.created_at);
          bVal = parseCustomDate(b.created_at);
          break;
        case 'buyer':
          aVal = a.full_name || '';
          bVal = b.full_name || '';
          break;
        case 'products':
          aVal = a.items?.length || 0;
          bVal = b.items?.length || 0;
          break;
        case 'items':
          aVal = a.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
          bVal = b.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
          break;
        case 'amount':
          aVal = parseFloat(a.total_amount) || 0;
          bVal = parseFloat(b.total_amount) || 0;
          break;
        case 'commission':
          aVal = getTotalDistributionCommission(a.items);
          bVal = getTotalDistributionCommission(b.items);
          break;
        default:
          return 0;
      }
      
      if (sortConfig.direction === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  };

  const getPaginatedData = () => {
    const filteredOrders = getFilteredOrders();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredOrders.slice(startIndex, endIndex);
  };

  const currentOrders = getPaginatedData();
  const totalFilteredItems = getFilteredOrders().length;
  const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      
      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const getProductNames = (items) => {
    if (!items || items.length === 0) return "-";
    
    const names = items.map(item => {
      const productId = item.variant_details?.product;
      if (productId && productsCache[productId]) {
        return productsCache[productId];
      }
      return item.variant_details?.sku || item.product_name || `Product ${productId || 'Unknown'}`;
    });
    
    if (names.length > 2) {
      return `${names.slice(0, 2).join(", ")} +${names.length - 2} more`;
    }
    return names.join(", ");
  };

  const getTotalItemsCount = (items) => {
    if (!items || items.length === 0) return 0;
    return items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  };

  if (!userId) {
    return (
      <>
        <AgentNavbar />
        <div className="orders-container">
          <div className="orders-empty">
            <FaShoppingBag size={64} />
            <h3>Please Login</h3>
            <p>You need to be logged in to view your orders</p>
            <button onClick={() => navigate("/login")}>Go to Login</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AgentNavbar />
      
      <div className="orders-container">
        <div className="orders-header">
          <h1 className="orders-title">Orders & Commission</h1>
        </div>

        <div className="orders-filters">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by Order ID or Buyer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="items-per-page-wrapper">
            <label>Show:</label>
            <select 
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {error ? (
          <div className="error-message">{error}</div>
        ) : currentOrders.length === 0 ? (
          <div className="orders-empty">
            <FaShoppingBag size={64} />
            <h3>No Orders Found</h3>
            <p>{searchTerm || statusFilter !== "all" ? "Try adjusting your filters" : "You haven't placed any orders yet"}</p>
          </div>
        ) : (
          <>
            <div className="orders-table-wrapper">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('orderId')}>
                      Order ID
                      <FaSort className={`sort-icon ${sortConfig.key === 'orderId' ? 'active' : ''}`} />
                    </th>
                    <th onClick={() => handleSort('date')}>
                      Date & Time
                      <FaSort className={`sort-icon ${sortConfig.key === 'date' ? 'active' : ''}`} />
                    </th>
                    <th onClick={() => handleSort('buyer')}>
                      Buyer
                      <FaSort className={`sort-icon ${sortConfig.key === 'buyer' ? 'active' : ''}`} />
                    </th>
                    <th onClick={() => handleSort('products')}>
                      Products
                      <FaSort className={`sort-icon ${sortConfig.key === 'products' ? 'active' : ''}`} />
                    </th>
                    <th onClick={() => handleSort('items')}>
                      Items
                      <FaSort className={`sort-icon ${sortConfig.key === 'items' ? 'active' : ''}`} />
                    </th>
                    <th onClick={() => handleSort('amount')}>
                      Amount
                      <FaSort className={`sort-icon ${sortConfig.key === 'amount' ? 'active' : ''}`} />
                    </th>
                    <th onClick={() => handleSort('commission')}>
                      Distribution Commission
                      <FaSort className={`sort-icon ${sortConfig.key === 'commission' ? 'active' : ''}`} />
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order) => (
                    <tr key={order.order_id}>
                      <td className="order-id">{order.order_id}</td>
                      <td>{formatDate(order.created_at)}</td>
                      <td className="buyer-cell">
                        <div className="buyer-name">{order.full_name || "Guest"}</div>
                        <div className="buyer-company">{order.company_name}</div>
                      </td>
                      <td className="products-cell">{getProductNames(order.items)}</td>
                      <td>{getTotalItemsCount(order.items)}</td>
                      <td className="amount-cell">{formatAmount(order.total_amount)}</td>
                      <td className="commission-cell">
                        {formatAmount(getTotalDistributionCommission(order.items))}
                      </td>
                      <td>
                        <button 
                          className="view-btn"
                          onClick={() => navigate(`/order/${order.order_id}`)}
                        >
                          <FaEye /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalFilteredItems > 0 && (
              <div className="pagination-container">
                <div className="pagination-info">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalFilteredItems)} of {totalFilteredItems} orders
                </div>
                
                <div className="pagination-controls">
                  <button 
                    onClick={goToFirstPage} 
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    <FaAngleDoubleLeft />
                  </button>
                  <button 
                    onClick={goToPreviousPage} 
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    <FaChevronLeft />
                  </button>
                  
                  <div className="page-numbers">
                    {getPageNumbers().map((page, index) => (
                      <button
                        key={index}
                        onClick={() => typeof page === 'number' && goToPage(page)}
                        className={`page-btn ${currentPage === page ? 'active' : ''} ${typeof page !== 'number' ? 'dots' : ''}`}
                        disabled={typeof page !== 'number'}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button 
                    onClick={goToNextPage} 
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                  >
                    <FaChevronRight />
                  </button>
                  <button 
                    onClick={goToLastPage} 
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                  >
                    <FaAngleDoubleRight />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Orders;