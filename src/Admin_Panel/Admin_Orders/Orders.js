import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AgentNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import { baseurl } from '../../BaseURL/BaseURL';
import "./Orders.css";
import { 
  FaShoppingBag, 
  FaFileInvoice, 
  FaCalendarAlt, 
  FaRupeeSign, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock, 
  FaTruck, 
  FaBoxOpen, 
  FaArrowLeft,
  FaEye,
  FaPrint,
  FaDownload,
  FaFilter,
  FaSort,
  FaSearch
} from "react-icons/fa";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [expandedOrders, setExpandedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
  from: "",
  to: ""
});
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  // Fetch orders
  const fetchOrders = async () => {
    if (!userId) {
      setLoading(false);
      setOrders([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching orders for user:", userId);
      
      const response = await axios.get(`${baseurl}/orders/`, {
        params: { user: userId },
        timeout: 10000
      });
      
      console.log("Orders API Response:", response.data);
      
      const ordersData = response.data.results || response.data || [];
      setOrders(ordersData);
      
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders. Please try again later.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchOrders();
  }, [userId]);

  // Toggle order details
  const toggleOrderDetails = (orderId) => {
    if (expandedOrders.includes(orderId)) {
      setExpandedOrders(expandedOrders.filter(id => id !== orderId));
    } else {
      setExpandedOrders([...expandedOrders, orderId]);
    }
  };

  // Get order status badge
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return {
          text: 'Paid',
          className: 'status-paid',
          icon: <FaCheckCircle className="me-1" />
        };
      case 'pending':
        return {
          text: 'Pending',
          className: 'status-pending',
          icon: <FaClock className="me-1" />
        };
      case 'processing':
        return {
          text: 'Processing',
          className: 'status-processing',
          icon: <FaTruck className="me-1" />
        };
      case 'shipped':
        return {
          text: 'Shipped',
          className: 'status-shipped',
          icon: <FaTruck className="me-1" />
        };
      case 'delivered':
        return {
          text: 'Delivered',
          className: 'status-delivered',
          icon: <FaBoxOpen className="me-1" />
        };
      case 'cancelled':
        return {
          text: 'Cancelled',
          className: 'status-cancelled',
          icon: <FaTimesCircle className="me-1" />
        };
      default:
        return {
          text: status,
          className: 'status-default',
          icon: <FaClock className="me-1" />
        };
    }
  };

  // Filter and sort orders
//   const getFilteredAndSortedOrders = () => {
//     let filtered = [...orders];

//     // Apply search filter
//     if (searchTerm) {
//       filtered = filtered.filter(order => 
//         order.order_id.toString().includes(searchTerm) ||
//         order.user_name?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Apply status filter
//     if (statusFilter !== "all") {
//       filtered = filtered.filter(order => 
//         order.status.toLowerCase() === statusFilter.toLowerCase()
//       );
//     }

//     // Apply sorting
//     filtered.sort((a, b) => {
//       const dateA = new Date(a.created_at.split(' ').reverse().join('-'));
//       const dateB = new Date(b.created_at.split(' ').reverse().join('-'));
      
//       if (sortBy === "latest") {
//         return dateB - dateA;
//       } else if (sortBy === "oldest") {
//         return dateA - dateB;
//       } else if (sortBy === "amount_high") {
//         return parseFloat(b.total_amount) - parseFloat(a.total_amount);
//       } else if (sortBy === "amount_low") {
//         return parseFloat(a.total_amount) - parseFloat(b.total_amount);
//       }
//       return 0;
//     });

//     return filtered;
//   };
const getFilteredAndSortedOrders = () => {
  let filtered = [...orders];

  // Apply search filter
  if (searchTerm) {
    filtered = filtered.filter(order => 
      order.order_id.toString().includes(searchTerm) ||
      order.user_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply status filter
  if (statusFilter !== "all") {
    filtered = filtered.filter(order => 
      order.status.toLowerCase() === statusFilter.toLowerCase()
    );
  }

  // Apply date range filter
  if (dateRange.from || dateRange.to) {
    filtered = filtered.filter(order => {
      const orderDate = new Date(order.created_at.split(' ').reverse().join('-'));
      
      let fromDate = dateRange.from ? new Date(dateRange.from) : null;
      let toDate = dateRange.to ? new Date(dateRange.to) : null;
      
      // Set time to start of day for fromDate
      if (fromDate) {
        fromDate.setHours(0, 0, 0, 0);
      }
      
      // Set time to end of day for toDate
      if (toDate) {
        toDate.setHours(23, 59, 59, 999);
      }
      
      const isAfterFrom = fromDate ? orderDate >= fromDate : true;
      const isBeforeTo = toDate ? orderDate <= toDate : true;
      
      return isAfterFrom && isBeforeTo;
    });
  }

  // Apply sorting
  filtered.sort((a, b) => {
    const dateA = new Date(a.created_at.split(' ').reverse().join('-'));
    const dateB = new Date(b.created_at.split(' ').reverse().join('-'));
    
   if (sortBy === "amount_high") {
      return parseFloat(b.total_amount) - parseFloat(a.total_amount);
    } else if (sortBy === "amount_low") {
      return parseFloat(a.total_amount) - parseFloat(b.total_amount);
    }
    return 0;
  });

  return filtered;
};


  // View invoice
  const handleViewInvoice = async (order) => {
    setSelectedOrder(order);
    // In a real app, you would fetch the invoice PDF here
    // For now, we'll just show a mock invoice
  };

  // Download invoice
  const handleDownloadInvoice = async (order) => {
    setInvoiceLoading(true);
    try {
      // Mock invoice download
      setTimeout(() => {
        const invoiceContent = `
          Invoice for Order #${order.order_id}
          Date: ${order.created_at}
          Total Amount: ₹${order.total_amount}
          Status: ${order.status}
        `;
        
        const blob = new Blob([invoiceContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-order-${order.order_id}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        setInvoiceLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error downloading invoice:", error);
      setInvoiceLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return dateString; // Already formatted from API
  };

  // Get product image
  const getProductImage = (item) => {
    if (item.variant_details?.media && item.variant_details.media.length > 0) {
      const media = item.variant_details.media[0];
      return `${baseurl}${media.file}`;
    }
    return "https://images.unsplash.com/photo-1583394838336-acd977736f90?w-400";
  };

  // Handle continue shopping
  const handleContinueShopping = () => {
    navigate("/client-busineess-category");
  };

  // Calculate items count
  const calculateItemsCount = (order) => {
    return order.items.reduce((total, item) => total + item.quantity, 0);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setSortBy("latest");
     setDateRange({
    from: "",
    to: ""
  });
  };

  const filteredOrders = getFilteredAndSortedOrders();

  if (!userId) {
    return (
      <>
        <AgentNavbar />
        <div className="agent-orders-container">
          <div className="agent-orders-empty text-center py-5">
            <div className="empty-orders-icon mb-3">
              <FaShoppingBag size={64} />
            </div>
            <h3 className="mb-3">Please Login</h3>
            <p className="text-muted mb-4">
              You need to be logged in to view your orders
            </p>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </button>
          </div>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <AgentNavbar />
        <div className="agent-orders-container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading orders...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AgentNavbar />
      
      <div className="agent-orders-container">
        <div className="agent-orders-header">
          <h1 className="agent-orders-title">
            <FaShoppingBag className="me-2" />
            Orders
            {orders.length > 0 && (
              <span className="orders-count-badge">{orders.length}</span>
            )}
          </h1>
          {/* <button 
            className="btn btn-outline-secondary"
            onClick={handleContinueShopping}
          >
            <FaArrowLeft className="me-2" />
            Continue Shopping
          </button> */}
        </div>

        {/* Filters and Search */}
        <div className="orders-filters-section">
          <div className="filters-grid">
            {/* Search Box */}
            <div className="filter-group">
              <label className="filter-label">
                <FaSearch className="me-1" />
                Search
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Status Filter */}
            <div className="filter-group">
              <label className="filter-label">
                <FaFilter className="me-1" />
                Status
              </label>
              <select 
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            {/* Date Range Filter */}
            <div className="filter-group">
              <label className="filter-label">
                <FaCalendarAlt className="me-1" />
                Date Range
              </label>
              <div className="date-range-inputs">
                <input
                  type="date"
                  className="form-control"
                  placeholder="From Date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                />
                <span className="date-separator">to</span>
                <input
                  type="date"
                  className="form-control"
                  placeholder="To Date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                />
              </div>
            </div>
            
            {/* Sort By */}
            <div className="filter-group">
              <label className="filter-label">
                <FaSort className="me-1" />
                Sort By
              </label>
              <select 
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount_high">Amount: High to Low</option>
                <option value="amount_low">Amount: Low to High</option>
              </select>
            </div>
            
            {/* Reset Button */}
            <div className="filter-group reset-btn-group">
              <label className="filter-label invisible">Reset</label>
              <button 
                className="btn btn-outline-secondary reset-btn reset-button"
                onClick={handleResetFilters}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="agent-orders-empty text-center py-5">
            <div className="empty-orders-icon mb-3">
              <FaShoppingBag size={64} />
            </div>
            <h3 className="mb-3">No Orders Yet</h3>
            <p className="text-muted mb-4">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <button 
              className="btn btn-primary btn-lg"
              onClick={handleContinueShopping}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Orders Summary */}
            <div className="orders-summary-cards">
              <div className="summary-card">
                <div className="summary-card-icon total-orders">
                  <FaShoppingBag />
                </div>
                <div className="summary-card-content">
                  <h3>{orders.length}</h3>
                  <p>Total Orders</p>
                </div>
              </div>
              
              <div className="summary-card">
                <div className="summary-card-icon paid-orders">
                  <FaCheckCircle />
                </div>
                <div className="summary-card-content">
                  <h3>{orders.filter(o => o.status === 'paid').length}</h3>
                  <p>Paid Orders</p>
                </div>
              </div>
              
              <div className="summary-card">
                <div className="summary-card-icon total-spent">
                  <FaRupeeSign />
                </div>
                <div className="summary-card-content">
                  <h3>₹{orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0).toFixed(2)}</h3>
                  <p>Total Spent</p>
                </div>
              </div>
              
              <div className="summary-card">
                <div className="summary-card-icon pending-orders">
                  <FaClock />
                </div>
                <div className="summary-card-content">
                  <h3>{orders.filter(o => o.status === 'pending').length}</h3>
                  <p>Pending Orders</p>
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="orders-list-section">
              <div className="orders-list-header">
                <h3>
                  Orders ({filteredOrders.length})
                  {filteredOrders.length !== orders.length && (
                    <span className="filtered-count">
                      (Filtered from {orders.length})
                    </span>
                  )}
                </h3>
              </div>
              
              <div className="orders-list">
                {filteredOrders.map((order) => {
                  const statusBadge = getStatusBadge(order.status);
                  const itemsCount = calculateItemsCount(order);
                  const isExpanded = expandedOrders.includes(order.order_id);
                  
                  return (
                    <div key={order.order_id} className="order-card">
                      <div 
                        className="order-summary"
                        onClick={() => toggleOrderDetails(order.order_id)}
                      >
                        <div className="order-info">
                          <div className="order-id">
                            <FaFileInvoice className="me-2" />
                            <strong>Order #{order.order_id}</strong>
                          </div>
                          <div className="order-date">
                            <FaCalendarAlt className="me-2" />
                            {formatDate(order.created_at)}
                          </div>
                        </div>
                        
                        <div className="order-status-amount">
                          <div className={`status-badge ${statusBadge.className}`}>
                            {statusBadge.icon}
                            {statusBadge.text}
                          </div>
                          <div className="order-amount">
                            <FaRupeeSign className="me-1" />
                            {parseFloat(order.total_amount).toFixed(2)}
                          </div>
                        </div>
                        
                        <div className="order-actions-collapse">
                          <button 
                            className="btn btn-sm btn-outline-primary view-details-btn order-button-view"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleOrderDetails(order.order_id);
                            }}
                          >
                            <FaEye className="me-1" />
                            {isExpanded ? 'Hide Details' : 'View Details'}
                          </button>
                          <span className="items-count">
                            {itemsCount} item{itemsCount !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <div className="order-details">
                          {/* Order Items */}
                          <div className="order-items-section">
                            <h5>Order Items</h5>
                            <div className="order-items-list">
                              {order.items.map((item) => {
                                const variant = item.variant_details || {};
                                const attributes = variant.attributes || {};
                                const displayAttributes = Object.entries(attributes)
                                  .map(([key, value]) => `${key}: ${value}`)
                                  .join(', ');
                                
                                return (
                                  <div key={item.id} className="order-item-card">
                                    <div className="order-item-image">
                                      <img 
                                        src={getProductImage(item)} 
                                        alt={variant.sku}
                                        onError={(e) => {
                                          e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w-400";
                                        }}
                                      />
                                    </div>
                                    
                                    <div className="order-item-details">
                                      <h6 className="item-title">{variant.sku || 'Product'}</h6>
                                      {displayAttributes && (
                                        <p className="item-attributes">{displayAttributes}</p>
                                      )}
                                      <div className="item-pricing">
                                        <div className="price-quantity">
                                          <span className="price">₹{parseFloat(item.price || 0).toFixed(2)}</span>
                                          <span className="quantity">× {item.quantity}</span>
                                        </div>
                                        <div className="item-subtotal">
                                          ₹{(parseFloat(item.price || 0) * item.quantity).toFixed(2)}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          
                          {/* Order Summary */}
                          <div className="order-total-section">
                            <h5>Order Summary</h5>
                            <div className="order-total-details">
                              <div className="total-row">
                                <span>Subtotal:</span>
                                <span>₹{parseFloat(order.total_amount).toFixed(2)}</span>
                              </div>
                              <div className="total-row">
                                <span>Tax:</span>
                                <span>₹0.00</span>
                              </div>
                              <div className="total-row shipping">
                                <span>Shipping:</span>
                                <span className="free-shipping">FREE</span>
                              </div>
                              <div className="total-divider"></div>
                              <div className="total-row grand-total">
                                <span>Total Amount:</span>
                                <span className="grand-total-amount">
                                  ₹{parseFloat(order.total_amount).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Order Actions */}
                          {/* <div className="order-actions-section">
                            <button 
                              className="btn btn-outline-primary"
                              onClick={() => handleViewInvoice(order)}
                              disabled={invoiceLoading}
                            >
                              <FaEye className="me-1" />
                              View Invoice
                            </button>
                            <button 
                              className="btn btn-outline-secondary"
                              onClick={() => handleDownloadInvoice(order)}
                              disabled={invoiceLoading}
                            >
                              {invoiceLoading ? (
                                <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                              ) : (
                                <FaDownload className="me-1" />
                              )}
                              Download Invoice
                            </button>
                            <button 
                              className="btn btn-outline-success"
                              onClick={() => navigate(`/track-order/${order.order_id}`)}
                            >
                              <FaTruck className="me-1" />
                              Track Order
                            </button>
                          </div> */}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Invoice Modal */}
      {selectedOrder && (
        <div className="invoice-modal-overlay">
          <div className="invoice-modal">
            <div className="invoice-modal-header">
              <h3>Invoice - Order #{selectedOrder.order_id}</h3>
              <button 
                className="btn-close"
                onClick={() => setSelectedOrder(null)}
              ></button>
            </div>
            <div className="invoice-modal-body">
              <div className="invoice-header">
                <div className="invoice-company">
                  <h4>Your Company Name</h4>
                  <p>123 Street, City, State 12345</p>
                  <p>contact@company.com</p>
                </div>
                <div className="invoice-details">
                  <div className="invoice-detail-row">
                    <span>Invoice #:</span>
                    <strong>INV-{selectedOrder.order_id}</strong>
                  </div>
                  <div className="invoice-detail-row">
                    <span>Order Date:</span>
                    <span>{formatDate(selectedOrder.created_at)}</span>
                  </div>
                  <div className="invoice-detail-row">
                    <span>Status:</span>
                    <span className={`status-badge ${getStatusBadge(selectedOrder.status).className}`}>
                      {getStatusBadge(selectedOrder.status).text}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="invoice-items">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.variant_details?.sku || 'Product'}</td>
                        <td>{item.quantity}</td>
                        <td>₹{parseFloat(item.price || 0).toFixed(2)}</td>
                        <td>₹{(parseFloat(item.price || 0) * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="invoice-total">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>₹{parseFloat(selectedOrder.total_amount).toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Tax:</span>
                  <span>₹0.00</span>
                </div>
                <div className="total-row shipping">
                  <span>Shipping:</span>
                  <span>FREE</span>
                </div>
                <div className="total-row grand-total">
                  <span>Total:</span>
                  <span className="grand-total-amount">
                    ₹{parseFloat(selectedOrder.total_amount).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className="invoice-modal-footer">
              <button 
                className="btn btn-primary"
                onClick={() => window.print()}
              >
                <FaPrint className="me-1" />
                Print Invoice
              </button>
              <button 
                className="btn btn-outline-secondary"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Orders;