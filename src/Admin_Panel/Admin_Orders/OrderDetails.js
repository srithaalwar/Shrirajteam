// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import AgentNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL';
// import "./OrderDetails.css";
// import { 
//   FaArrowLeft, 
//   FaDownload, 
//   FaPrint,
//   FaUser,
//   FaBuilding,
//   FaTag,
//   FaBox,
//   FaRupeeSign,
//   FaPercent,
//   FaChartLine
// } from "react-icons/fa";

// function OrderDetails() {
//   const { orderId } = useParams();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);
//   const [commissions, setCommissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch order details
//   const fetchOrderDetails = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Fetch order details
//       const orderResponse = await axios.get(`${baseurl}/orders/${orderId}/`);
//       setOrder(orderResponse.data);
      
//       // Fetch commission breakdown
//       const commissionResponse = await axios.get(
//         `${baseurl}/product-commissions/?commission_type=product_commission&order_id=${orderId}`
//       );
//       setCommissions(commissionResponse.data.results || []);
      
//     } catch (error) {
//       console.error("Error fetching order details:", error);
//       setError("Failed to load order details. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (orderId) {
//       fetchOrderDetails();
//     }
//   }, [orderId]);

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB', { 
//       day: '2-digit', 
//       month: 'long', 
//       year: 'numeric' 
//     });
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

//   // Get total quantity
//   const getTotalQuantity = () => {
//     if (!order?.items) return 0;
//     return order.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
//   };

//   // Get total products count
//   const getTotalProducts = () => {
//     if (!order?.items) return 0;
//     return order.items.length;
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

//   // Handle back navigation
//   const handleBack = () => {
//     navigate("/admin-commission");
//   };

//   // Handle print
//   const handlePrint = () => {
//     window.print();
//   };

//   // Handle download
//   const handleDownload = () => {
//     const invoiceContent = `
//       Order #${order?.order_id}
//       Date: ${formatDate(order?.created_at)}
//       Total Amount: ${formatAmount(order?.total_amount)}
//       Status: ${order?.status}
//     `;
    
//     const blob = new Blob([invoiceContent], { type: 'text/plain' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `order-${order?.order_id}.txt`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     window.URL.revokeObjectURL(url);
//   };

//   if (error || !order) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="order-details-container">
//           <div className="error-message">
//             <p>{error || "Order not found"}</p>
//             <button onClick={handleBack} className="back-btn">Go Back</button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <AgentNavbar />
      
//       <div className="order-details-container">
//         {/* Header */}
//         <div className="order-details-header">
//           <button onClick={handleBack} className="back-button">
//             <FaArrowLeft /> Back to Orders
//           </button>
//            <div className="order-title-section">
//           <h1 className="order-title">Order {order.order_id}</h1>
//           <p className="order-date">{formatDate(order.created_at)}</p>
//         </div>
//         </div>

//         {/* Order Title */}
       

//         <div className="order-details-grid">
//           {/* Sale Summary Section */}
//           <div className="summary-section">
//             <h2 className="section-title">Sale Summary</h2>
//             <div className="summary-table">
//               <div className="summary-row">
//                 <span className="summary-label">Order ID</span>
//                 <span className="summary-value">{order.order_id}</span>
//               </div>
//               <div className="summary-row">
//                 <span className="summary-label">Total Products</span>
//                 <span className="summary-value">{getTotalProducts()}</span>
//               </div>
//               <div className="summary-row">
//                 <span className="summary-label">Total Quantity</span>
//                 <span className="summary-value">{getTotalQuantity()}</span>
//               </div>
//               <div className="summary-row">
//                 <span className="summary-label">Total Amount</span>
//                 <span className="summary-value amount">{formatAmount(order.total_amount)}</span>
//               </div>
//             </div>
//           </div>

//           {/* Buyer Details Section */}
//           <div className="buyer-section">
//             <h2 className="section-title">Buyer Details</h2>
//             <div className="buyer-info">
//               <div className="buyer-detail">
//                 <FaUser className="detail-icon" />
//                 <div>
//                   <span className="detail-label">Name:</span>
//                   <span className="detail-value">{order.user_name || "Guest"}</span>
//                 </div>
//               </div>
//               <div className="buyer-detail">
//                 <FaBuilding className="detail-icon" />
//                 <div>
//                   <span className="detail-label">Company:</span>
//                   <span className="detail-value">{order.company_name || "-"}</span>
//                 </div>
//               </div>
//               <div className="buyer-detail">
//                 <FaTag className="detail-icon" />
//                 <div>
//                   <span className="detail-label">Order Status:</span>
//                   <span className={`status-badge ${getStatusClass(order.status)}`}>
//                     {order.status || "Pending"}
//                   </span>
//                 </div>
//               </div>
//               <div className="buyer-detail">
//                 <FaUser className="detail-icon" />
//                 <div>
//                   <span className="detail-label">Primary Agent:</span>
//                   <span className="detail-value">{order.agent_name || "-"}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Products Section */}
//         <div className="products-section">
//           <h2 className="section-title">
//             Products ({getTotalProducts()})
//           </h2>
//           <div className="products-table-wrapper">
//             <table className="products-table">
//               <thead>
//                 <tr>
//                   <th>S.No.</th>
//                   <th>Product</th>
//                   <th>Category</th>
//                   <th>SKU</th>
//                   <th>Qty</th>
//                   <th>Unit Price</th>
//                   <th>Line Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {order.items?.map((item, index) => {
//                   const variant = item.variant_details || {};
//                   const productName = variant.sku || item.product_name || "Product";
//                   const category = variant.category || item.category || "-";
//                   const sku = variant.sku_code || variant.sku || "-";
//                   const unitPrice = parseFloat(item.price || 0);
//                   const quantity = item.quantity || 0;
//                   const lineTotal = unitPrice * quantity;
                  
//                   return (
//                     <tr key={item.id}>
//                       <td>{index + 1}</td>
//                       <td className="product-name-cell">
//                         <div className="product-name">{productName}</div>
//                         {variant.description && (
//                           <div className="product-description">{variant.description}</div>
//                         )}
//                       </td>
//                       <td>{category}</td>
//                       <td className="sku-cell">{sku}</td>
//                       <td>{quantity}</td>
//                       <td className="price-cell">{formatAmount(unitPrice)}</td>
//                       <td className="total-cell">{formatAmount(lineTotal)}</td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Commission Breakdown Section */}
//         {commissions.length > 0 && (
//           <div className="commission-section">
//             <h2 className="section-title">
//               <FaChartLine className="section-icon" />
//               Commission Breakdown ({commissions.length} Levels)
//             </h2>
//             <div className="commission-table-wrapper">
//               <table className="commission-table">
//                 <thead>
//                   <tr>
//                     <th>Level</th>
//                     <th>Agent Name</th>
//                     <th>Agent ID</th>
//                     <th>Commission %</th>
//                     <th>Commission Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {commissions
//                     .sort((a, b) => a.level_no - b.level_no)
//                     .map((commission) => (
//                       <tr key={commission.id}>
//                         <td className="level-cell">
//                           <span className="level-badge">Level {commission.level_no}</span>
//                         </td>
//                         <td>
//                           <div className="agent-name">{commission.agent_name}</div>
//                           <div className="referral-id">ID: {commission.referral_id}</div>
//                         </td>
//                         <td>{commission.agent || "-"}</td>
//                         <td className="percentage-cell">
//                           <FaPercent className="percent-icon" />
//                           {parseFloat(commission.percentage).toFixed(2)}%
//                         </td>
//                         <td className="commission-amount">
//                           {formatAmount(commission.amount)}
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default OrderDetails;



// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import AgentNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL';
// import "./OrderDetails.css";
// import { 
//   FaArrowLeft, 
//   FaDownload, 
//   FaPrint,
//   FaUser,
//   FaBuilding,
//   FaTag,
//   FaBox,
//   FaRupeeSign,
//   FaPercent,
//   FaChartLine
// } from "react-icons/fa";

// function OrderDetails() {
//   const { orderId } = useParams();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);
//   const [commissions, setCommissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch order details
//   const fetchOrderDetails = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Fetch order details
//       const orderResponse = await axios.get(`${baseurl}/orders/${orderId}/`);
//       setOrder(orderResponse.data);
      
//       // Fetch commission breakdown
//       const commissionResponse = await axios.get(
//         `${baseurl}/product-commissions/?commission_type=product_commission&order_id=${orderId}`
//       );
//       setCommissions(commissionResponse.data.results || []);
      
//     } catch (error) {
//       console.error("Error fetching order details:", error);
//       setError("Failed to load order details. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (orderId) {
//       fetchOrderDetails();
//     }
//   }, [orderId]);

//   // Helper function to parse custom date format "DD-MM-YYYY HH:MM:SS"
//   const parseCustomDate = (dateString) => {
//     if (!dateString) return new Date();
//     try {
//       const [datePart, timePart] = dateString.split(' ');
//       const [day, month, year] = datePart.split('-');
//       const [hours, minutes, seconds] = timePart ? timePart.split(':') : [0, 0, 0];
//       // Create date object (month is 0-indexed in JavaScript)
//       return new Date(year, month - 1, day, hours, minutes, seconds);
//     } catch (error) {
//       return new Date();
//     }
//   };

//   // Format date from "DD-MM-YYYY HH:MM:SS" to "DD Month YYYY"
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     try {
//       // Your backend format: "11-04-2026 15:13:02"
//       const [datePart, timePart] = dateString.split(' ');
//       const [day, month, year] = datePart.split('-');
      
//       const months = [
//         'January', 'February', 'March', 'April', 'May', 'June',
//         'July', 'August', 'September', 'October', 'November', 'December'
//       ];
      
//       const monthName = months[parseInt(month) - 1];
//       const dayNum = parseInt(day);
      
//       // Format as "11 April 2026"
//       return `${dayNum} ${monthName} ${year}`;
      
//     } catch (error) {
//       console.error("Error formatting date:", error);
//       return dateString;
//     }
//   };

//   // Format date with time for detailed view
//   const formatDateTime = (dateString) => {
//     if (!dateString) return "";
//     try {
//       const [datePart, timePart] = dateString.split(' ');
//       const [day, month, year] = datePart.split('-');
//       const [hours, minutes] = timePart.split(':');
      
//       const months = [
//         'January', 'February', 'March', 'April', 'May', 'June',
//         'July', 'August', 'September', 'October', 'November', 'December'
//       ];
      
//       const monthName = months[parseInt(month) - 1];
//       const dayNum = parseInt(day);
      
//       // Format as "11 April 2026, 15:13"
//       return `${dayNum} ${monthName} ${year}, ${hours}:${minutes}`;
      
//     } catch (error) {
//       return dateString;
//     }
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

//   // Get total quantity
//   const getTotalQuantity = () => {
//     if (!order?.items) return 0;
//     return order.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
//   };

//   // Get total products count
//   const getTotalProducts = () => {
//     if (!order?.items) return 0;
//     return order.items.length;
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

//   // Handle back navigation
//   const handleBack = () => {
//     navigate("/admin-commission");
//   };

//   // Handle print
//   const handlePrint = () => {
//     window.print();
//   };

//   // Handle download
//   const handleDownload = () => {
//     const invoiceContent = `
//       ORDER DETAILS
//       =============
      
//       Order #${order?.order_id}
//       Date: ${formatDateTime(order?.created_at)}
//       Total Amount: ${formatAmount(order?.total_amount)}
//       Status: ${order?.status}
      
//       Buyer Details:
//       Name: ${order?.user_name || "Guest"}
//       Company: ${order?.company_name || "-"}
//       Primary Agent: ${order?.agent_name || "-"}
      
//       Products:
//       ${order?.items?.map((item, index) => {
//         const variant = item.variant_details || {};
//         const productName = variant.sku || item.product_name || "Product";
//         const quantity = item.quantity || 0;
//         const price = parseFloat(item.price || 0);
//         const lineTotal = price * quantity;
//         return `${index + 1}. ${productName} - Qty: ${quantity} - Price: ${formatAmount(price)} - Total: ${formatAmount(lineTotal)}`;
//       }).join('\n')}
      
//       Commission Breakdown:
//       ${commissions.map((commission, index) => {
//         return `${index + 1}. Level ${commission.level_no} - ${commission.agent_name} - ${commission.percentage}% - ${formatAmount(commission.amount)}`;
//       }).join('\n')}
      
//       Total Amount: ${formatAmount(order?.total_amount)}
//       =============
//       Generated on: ${new Date().toLocaleString()}
//     `;
    
//     const blob = new Blob([invoiceContent], { type: 'text/plain' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `order-${order?.order_id}.txt`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     window.URL.revokeObjectURL(url);
//   };

//   if (loading) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="order-details-container">
//           <div className="loading-spinner">Loading order details...</div>
//         </div>
//       </>
//     );
//   }

//   if (error || !order) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="order-details-container">
//           <div className="error-message">
//             <p>{error || "Order not found"}</p>
//             <button onClick={handleBack} className="back-btn">Go Back</button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <AgentNavbar />
      
//       <div className="order-details-container">
//         {/* Header */}
//         <div className="order-details-header">
//           <button onClick={handleBack} className="back-button">
//             <FaArrowLeft /> Back to Orders
//           </button>
//            <div className="order-title-section">
//           <h1 className="order-title">Order {order.order_id}</h1>
//           <p className="order-date">{formatDateTime(order.created_at)}</p>
//         </div>
//         </div>

//         {/* Order Title */}
      

//         <div className="order-details-grid">
//           {/* Sale Summary Section */}
//           <div className="summary-section">
//             <h2 className="section-title">Sale Summary</h2>
//             <div className="summary-table">
//               <div className="summary-row">
//                 <span className="summary-label">Order ID</span>
//                 <span className="summary-value">{order.order_id}</span>
//               </div>
//               <div className="summary-row">
//                 <span className="summary-label">Total Products</span>
//                 <span className="summary-value">{getTotalProducts()}</span>
//               </div>
//               <div className="summary-row">
//                 <span className="summary-label">Total Quantity</span>
//                 <span className="summary-value">{getTotalQuantity()}</span>
//               </div>
//               <div className="summary-row">
//                 <span className="summary-label">Total Amount</span>
//                 <span className="summary-value amount">{formatAmount(order.total_amount)}</span>
//               </div>
//             </div>
//           </div>

//           {/* Buyer Details Section */}
//           <div className="buyer-section">
//             <h2 className="section-title">Buyer Details</h2>
//             <div className="buyer-info">
//               <div className="buyer-detail">
//                 <FaUser className="detail-icon" />
//                 <div>
//                   <span className="detail-label">Name:</span>
//                   <span className="detail-value">{order.full_name || order.user_name || "Guest"}</span>
//                 </div>
//               </div>
//               <div className="buyer-detail">
//                 <FaBuilding className="detail-icon" />
//                 <div>
//                   <span className="detail-label">Company:</span>
//                   <span className="detail-value">{order.company_name || "-"}</span>
//                 </div>
//               </div>
//               <div className="buyer-detail">
//                 <FaTag className="detail-icon" />
//                 <div>
//                   <span className="detail-label">Order Status:</span>
//                   <span className={`status-badge ${getStatusClass(order.status)}`}>
//                     {order.status || "Pending"}
//                   </span>
//                 </div>
//               </div>
//               <div className="buyer-detail">
//                 <FaUser className="detail-icon" />
//                 <div>
//                   <span className="detail-label">Primary Agent:</span>
//                   <span className="detail-value">{order.agent_name || "-"}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Products Section */}
//         <div className="products-section">
//           <h2 className="section-title">
//             Products ({getTotalProducts()})
//           </h2>
//           <div className="products-table-wrapper">
//             <table className="products-table">
//               <thead>
//                 <tr>
//                   <th>S.No.</th>
//                   <th>Product</th>
//                   <th>Category</th>
//                   <th>SKU</th>
//                   <th>Qty</th>
//                   <th>Unit Price</th>
//                   <th>Line Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {order.items?.map((item, index) => {
//                   const variant = item.variant_details || {};
//                   const productName = variant.sku || item.product_name || "Product";
//                   const category = variant.category || item.category || "-";
//                   const sku = variant.sku || "-";
//                   const unitPrice = parseFloat(item.price || 0);
//                   const quantity = item.quantity || 0;
//                   const lineTotal = unitPrice * quantity;
                  
//                   return (
//                     <tr key={item.id}>
//                       <td>{index + 1}</td>
//                       <td className="product-name-cell">
//                         <div className="product-name">{productName}</div>
//                         {variant.description && (
//                           <div className="product-description">{variant.description}</div>
//                         )}
//                       </td>
//                       <td>{category}</td>
//                       <td className="sku-cell">{sku}</td>
//                       <td>{quantity}</td>
//                       <td className="price-cell">{formatAmount(unitPrice)}</td>
//                       <td className="total-cell">{formatAmount(lineTotal)}</td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Commission Breakdown Section */}
//         {commissions.length > 0 && (
//           <div className="commission-section">
//             <h2 className="section-title">
//               <FaChartLine className="section-icon" />
//               Commission Breakdown ({commissions.length} Levels)
//             </h2>
//             <div className="commission-table-wrapper">
//               <table className="commission-table">
//                 <thead>
//                   <tr>
//                     <th>Level</th>
//                     <th>Agent Name</th>
//                     <th>Referral ID</th>
//                     <th>Commission %</th>
//                     <th>Commission Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {commissions
//                     .sort((a, b) => (a.level_no || 0) - (b.level_no || 0))
//                     .map((commission) => (
//                       <tr key={commission.id}>
//                         <td className="level-cell">
//                           <span className="level-badge">Level {commission.level_no || commission.level || 1}</span>
//                         </td>
//                         <td>
//                           <div className="agent-name">{commission.agent_name || commission.agent_username || "-"}</div>
//                         </td>
//                         <td>{commission.referral_id || commission.agent_code || "-"}</td>
//                         <td className="percentage-cell">
//                           <FaPercent className="percent-icon" />
//                           {parseFloat(commission.percentage || commission.commission_percentage || 0).toFixed(2)}%
//                         </td>
//                         <td className="commission-amount">
//                           {formatAmount(commission.amount || commission.commission_amount || 0)}
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default OrderDetails;



import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AgentNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import { baseurl } from '../../BaseURL/BaseURL';
import "./OrderDetails.css";
import { 
  FaArrowLeft, 
  FaDownload, 
  FaPrint,
  FaUser,
  FaBuilding,
  FaTag,
  FaBox,
  FaRupeeSign,
  FaPercent,
  FaChartLine
} from "react-icons/fa";

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [commissions, setCommissions] = useState([]);
  const [error, setError] = useState(null);

  // Fetch order details
  const fetchOrderDetails = async () => {
    try {
      setError(null);
      
      // Fetch order details
      const orderResponse = await axios.get(`${baseurl}/orders/${orderId}/`);
      setOrder(orderResponse.data);
      
      // Fetch commission breakdown
      const commissionResponse = await axios.get(
        `${baseurl}/product-commissions/?commission_type=product_commission&order_id=${orderId}`
      );
      setCommissions(commissionResponse.data.results || []);
      
    } catch (error) {
      console.error("Error fetching order details:", error);
      setError("Failed to load order details. Please try again later.");
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  // Helper function to parse custom date format "DD-MM-YYYY HH:MM:SS"
  const parseCustomDate = (dateString) => {
    if (!dateString) return new Date();
    try {
      const [datePart, timePart] = dateString.split(' ');
      const [day, month, year] = datePart.split('-');
      const [hours, minutes, seconds] = timePart ? timePart.split(':') : [0, 0, 0];
      // Create date object (month is 0-indexed in JavaScript)
      return new Date(year, month - 1, day, hours, minutes, seconds);
    } catch (error) {
      return new Date();
    }
  };

  // Format date from "DD-MM-YYYY HH:MM:SS" to "DD Month YYYY"
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      // Your backend format: "11-04-2026 15:13:02"
      const [datePart, timePart] = dateString.split(' ');
      const [day, month, year] = datePart.split('-');
      
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      
      const monthName = months[parseInt(month) - 1];
      const dayNum = parseInt(day);
      
      // Format as "11 April 2026"
      return `${dayNum} ${monthName} ${year}`;
      
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  // Format date with time for detailed view
  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    try {
      const [datePart, timePart] = dateString.split(' ');
      const [day, month, year] = datePart.split('-');
      const [hours, minutes] = timePart.split(':');
      
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      
      const monthName = months[parseInt(month) - 1];
      const dayNum = parseInt(day);
      
      // Format as "11 April 2026, 15:13"
      return `${dayNum} ${monthName} ${year}, ${hours}:${minutes}`;
      
    } catch (error) {
      return dateString;
    }
  };

  // Format amount with Indian number format
  const formatAmount = (amount) => {
    if (!amount) return "₹0";
    const num = parseFloat(amount);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  // Get total quantity
  const getTotalQuantity = () => {
    if (!order?.items) return 0;
    return order.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  };

  // Get total products count
  const getTotalProducts = () => {
    if (!order?.items) return 0;
    return order.items.length;
  };

  // Get status badge class
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

  // Handle back navigation
  const handleBack = () => {
    navigate("/admin-commission");
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Handle download
  const handleDownload = () => {
    const invoiceContent = `
      ORDER DETAILS
      =============
      
      Order #${order?.order_id}
      Date: ${formatDateTime(order?.created_at)}
      Total Amount: ${formatAmount(order?.total_amount)}
      Status: ${order?.status}
      
      Buyer Details:
      Name: ${order?.full_name || order?.user_name || "Guest"}
      Company: ${order?.company_name || "-"}
      Primary Agent: ${order?.agent_name || "-"}
      
      Products:
      ${order?.items?.map((item, index) => {
        const variant = item.variant_details || {};
        const productName = variant.sku || item.product_name || "Product";
        const quantity = item.quantity || 0;
        const price = parseFloat(item.price || 0);
        const lineTotal = price * quantity;
        return `${index + 1}. ${productName} - Qty: ${quantity} - Price: ${formatAmount(price)} - Total: ${formatAmount(lineTotal)}`;
      }).join('\n')}
      
      Commission Breakdown:
      ${commissions.map((commission, index) => {
        return `${index + 1}. Level ${commission.level_no || commission.level || 1} - ${commission.agent_name || commission.agent_username || "-"} - ${commission.percentage || commission.commission_percentage || 0}% - ${formatAmount(commission.amount || commission.commission_amount || 0)}`;
      }).join('\n')}
      
      Total Amount: ${formatAmount(order?.total_amount)}
      =============
      Generated on: ${new Date().toLocaleString()}
    `;
    
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `order-${order?.order_id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (error || !order) {
    return (
      <>
        <AgentNavbar />
        <div className="order-details-container">
          <div className="error-message">
            <p>{error || "Order not found"}</p>
            <button onClick={handleBack} className="back-btn">Go Back</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AgentNavbar />
      
      <div className="order-details-container">
        {/* Header */}
        <div className="order-details-header">
          <button onClick={handleBack} className="back-button">
            <FaArrowLeft /> Back to Orders
          </button>
           <div className="order-title-section">
          <h1 className="order-title">Order {order.order_id}</h1>
          <p className="order-date">{formatDateTime(order.created_at)}</p>
        </div>
        </div>

        {/* Order Title */}
      

        <div className="order-details-grid">
          {/* Sale Summary Section */}
          <div className="summary-section">
            <h2 className="section-title">Sale Summary</h2>
            <div className="summary-table">
              <div className="summary-row">
                <span className="summary-label">Order ID</span>
                <span className="summary-value">{order.order_id}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Total Products</span>
                <span className="summary-value">{getTotalProducts()}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Total Quantity</span>
                <span className="summary-value">{getTotalQuantity()}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Total Amount</span>
                <span className="summary-value amount">{formatAmount(order.total_amount)}</span>
              </div>
            </div>
          </div>

          {/* Buyer Details Section */}
          <div className="buyer-section">
            <h2 className="section-title">Buyer Details</h2>
            <div className="buyer-info">
              <div className="buyer-detail">
                <FaUser className="detail-icon" />
                <div>
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">{order.full_name || order.user_name || "Guest"}</span>
                </div>
              </div>
              <div className="buyer-detail">
                <FaBuilding className="detail-icon" />
                <div>
                  <span className="detail-label">Company:</span>
                  <span className="detail-value">{order.company_name || "-"}</span>
                </div>
              </div>
              <div className="buyer-detail">
                <FaTag className="detail-icon" />
                <div>
                  <span className="detail-label">Order Status:</span>
                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                    {order.status || "Pending"}
                  </span>
                </div>
              </div>
              {/* <div className="buyer-detail">
                <FaUser className="detail-icon" />
                <div>
                  <span className="detail-label">Primary Agent:</span>
                  <span className="detail-value">{order.agent_name || "-"}</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="products-section">
          <h2 className="section-title">
            Products ({getTotalProducts()})
          </h2>
          <div className="products-table-wrapper">
            <table className="products-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>SKU</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Line Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item, index) => {
                  const variant = item.variant_details || {};
                  const productName = variant.sku || item.product_name || "Product";
                  const category = variant.category || item.category || "-";
                  const sku = variant.sku || "-";
                  const unitPrice = parseFloat(item.price || 0);
                  const quantity = item.quantity || 0;
                  const lineTotal = unitPrice * quantity;
                  
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td className="product-name-cell">
                        <div className="product-name">{productName}</div>
                        {variant.description && (
                          <div className="product-description">{variant.description}</div>
                        )}
                      </td>
                      <td>{category}</td>
                      <td className="sku-cell">{sku}</td>
                      <td>{quantity}</td>
                      <td className="price-cell">{formatAmount(unitPrice)}</td>
                      <td className="total-cell">{formatAmount(lineTotal)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Commission Breakdown Section */}
        {commissions.length > 0 && (
          <div className="commission-section">
            <h2 className="section-title">
              <FaChartLine className="section-icon" />
              Commission Breakdown ({commissions.length} Levels)
            </h2>
            <div className="commission-table-wrapper">
              <table className="commission-table">
                <thead>
                  <tr>
                    <th>Level</th>
                    <th>Agent Name</th>
                    <th>Referral ID</th>
                    <th>Commission %</th>
                    <th>Commission Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {commissions
                    .sort((a, b) => (a.level_no || 0) - (b.level_no || 0))
                    .map((commission) => (
                      <tr key={commission.id}>
                        <td className="level-cell">
                          <span className="level-badge">Level {commission.level_no || commission.level || 1}</span>
                        </td>
                        <td>
                          <div className="agent-name">{commission.agent_name || commission.agent_username || "-"}</div>
                        </td>
                        <td>{commission.referral_id || commission.agent_code || "-"}</td>
                        <td className="percentage-cell">
                          {/* <FaPercent className="percent-icon" /> */}
                          {parseFloat(commission.percentage || commission.commission_percentage || 0).toFixed(2)}%
                        </td>
                        <td className="commission-amount">
                          {formatAmount(commission.amount || commission.commission_amount || 0)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default OrderDetails;