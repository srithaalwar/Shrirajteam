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
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
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

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  // Format date to DD MMM YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
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

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Get sorted and filtered orders
  const getFilteredAndSortedOrders = () => {
    let filtered = [...orders];

    // Apply search filter (by Order ID or Buyer)
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.order_id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(order => 
        order.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch (sortConfig.key) {
        case 'orderId':
          aVal = a.order_id;
          bVal = b.order_id;
          break;
        case 'date':
          aVal = new Date(a.created_at);
          bVal = new Date(b.created_at);
          break;
        case 'buyer':
          aVal = a.user_name || '';
          bVal = b.user_name || '';
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
        case 'agent':
          aVal = a.agent_name || '';
          bVal = b.agent_name || '';
          break;
        case 'commission':
          aVal = parseFloat(a.commission) || 0;
          bVal = parseFloat(b.commission) || 0;
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

  // Get product names as string
  const getProductNames = (items) => {
    if (!items || items.length === 0) return "-";
    const names = items.map(item => {
      const variant = item.variant_details;
      return variant?.sku || item.product_name || "Product";
    });
    if (names.length > 2) {
      return `${names.slice(0, 2).join(", ")} +${names.length - 2} more`;
    }
    return names.join(", ");
  };

  // Get total items count
  const getTotalItems = (items) => {
    if (!items || items.length === 0) return 0;
    return items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  };

  const filteredOrders = getFilteredAndSortedOrders();

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
        {/* Header */}
        <div className="orders-header">
          <h1 className="orders-title">Orders</h1>
        </div>

        {/* Search and Filter Bar */}
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
          
          <div className="filter-wrapper">
            <FaFilter className="filter-icon" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="cancelled">Cancelled</option>
              <option value="processing">Processing</option>
              <option value="paid">Paid</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>

        {error ? (
          <div className="error-message">{error}</div>
        ) : filteredOrders.length === 0 ? (
          <div className="orders-empty">
            <FaShoppingBag size={64} />
            <h3>No Orders Found</h3>
            <p>{searchTerm || statusFilter !== "all" ? "Try adjusting your filters" : "You haven't placed any orders yet"}</p>
          </div>
        ) : (
          <div className="orders-table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('orderId')}>
                    Order ID
                    <FaSort className={`sort-icon ${sortConfig.key === 'orderId' ? 'active' : ''}`} />
                  </th>
                  <th onClick={() => handleSort('date')}>
                    Date
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
                  <th onClick={() => handleSort('agent')}>
                    Primary Agent
                    <FaSort className={`sort-icon ${sortConfig.key === 'agent' ? 'active' : ''}`} />
                  </th>
                  <th onClick={() => handleSort('commission')}>
                    Commission
                    <FaSort className={`sort-icon ${sortConfig.key === 'commission' ? 'active' : ''}`} />
                  </th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.order_id}>
                    <td className="order-id">{order.order_id}</td>
                    <td>{formatDate(order.created_at)}</td>
                    <td className="buyer-cell">
                      <div className="buyer-name">{order.full_name || "Guest"}</div>
                      <div className="buyer-company">{order.company_name || "-"}</div>
                    </td>
                    <td className="products-cell">{getProductNames(order.items)}</td>
                    <td>{getTotalItems(order.items)}</td>
                    <td className="amount-cell">{formatAmount(order.total_amount)}</td>
                    <td>{order.agent_name || "-"}</td>
                    <td className="commission-cell">{formatAmount(order.commission)}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(order.status)}`}>
                        {order.status || "Pending"}
                      </span>
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
        )}
      </div>
    </>
  );
}

export default Orders;