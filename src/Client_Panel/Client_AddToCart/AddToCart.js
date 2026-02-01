
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClientNavbar from "../../Client_Panel/Client_Navbar/Client_Navbar";
import { baseurl } from '../../BaseURL/BaseURL';
import "./AddToCart.css";
import { FaTrash, FaMinus, FaPlus, FaCreditCard, FaArrowLeft, FaShoppingCart } from "react-icons/fa";

function ClientCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [updatingItem, setUpdatingItem] = useState(null);
  const [removingItem, setRemovingItem] = useState(null);
  
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  // Fetch cart items
  const fetchCartItems = async () => {
    if (!userId) {
      setLoading(false);
      setCartItems([]);
      return;
    }

    try {
      setLoading(true);
      console.log("Fetching cart items for user:", userId);
      
      const response = await axios.get(`${baseurl}/cart/?user=${userId}`);
      console.log("Cart API Response:", response.data);
      
      const cartResponse = response.data;
      let userCartItems = [];
      
      if (cartResponse.results && Array.isArray(cartResponse.results)) {
        userCartItems = cartResponse.results;
      } else if (Array.isArray(cartResponse)) {
        userCartItems = cartResponse;
      }
      
      console.log("Filtered cart items:", userCartItems);
      setCartItems(userCartItems);
      
    } catch (error) {
      console.error("Error fetching cart data:", error);
      showSnackbar("Error loading cart data", "error");
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  // Update quantity
  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;

    const cartItem = cartItems.find(item => item.id === cartItemId);
    if (!cartItem) return;

    // Check stock availability
    if (newQuantity > cartItem.variant_details.stock) {
      showSnackbar(`Only ${cartItem.variant_details.stock} items available in stock`, "error");
      return;
    }

    setUpdatingItem(cartItemId);
    
    try {
      await axios.put(`${baseurl}/cart/${cartItemId}/`, {
        user: parseInt(userId),
        variant: cartItem.variant,
        quantity: newQuantity
      });

      // Update local state
      setCartItems(prev => prev.map(item => 
        item.id === cartItemId ? { 
          ...item, 
          quantity: newQuantity,
          subtotal: (parseFloat(cartItem.variant_details.selling_price) * newQuantity)
        } : item
      ));

      // Dispatch cart update event for navbar
      window.dispatchEvent(new Event('cartUpdated'));
      
      showSnackbar("Quantity updated successfully", "success");
    } catch (error) {
      console.error("Error updating quantity:", error);
      showSnackbar("Failed to update quantity", "error");
    } finally {
      setUpdatingItem(null);
    }
  };

  // Remove item from cart
  const handleRemoveItem = async (cartItemId) => {
    setRemovingItem(cartItemId);
    
    try {
      await axios.delete(`${baseurl}/cart/${cartItemId}/`);
      
      // Update local state
      setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      
      // Dispatch cart update event for navbar
      window.dispatchEvent(new Event('cartUpdated'));
      
      showSnackbar("Item removed from cart", "info");
    } catch (error) {
      console.error("Error removing item:", error);
      showSnackbar("Failed to remove item", "error");
    } finally {
      setRemovingItem(null);
    }
  };

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + parseFloat(item.subtotal || 0);
    }, 0);
  };

  const calculateTax = () => {
    return cartItems.reduce((total, item) => {
      const taxPercent = parseFloat(item.variant_details.tax_percent || 0);
      const price = parseFloat(item.variant_details.selling_price || 0);
      return total + ((price * item.quantity * taxPercent) / 100);
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  // Initiate Payment
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      showSnackbar("Your cart is empty", "warning");
      return;
    }

    if (!userId) {
      showSnackbar("Please login to proceed", "warning");
      return;
    }

    setPaymentLoading(true);
    try {
      // Create order first
      const orderResponse = await axios.post(`${baseurl}/orders/`, {
        user: parseInt(userId),
        items: cartItems.map(item => ({
          variant: item.variant,
          quantity: item.quantity,
          price: parseFloat(item.variant_details.selling_price)
        }))
      });

      console.log("Order created:", orderResponse.data);
      
      // Initiate payment
      const paymentResponse = await axios.post(`${baseurl}/payment/initiate/`, {
        order_id: orderResponse.data.id,
        amount: calculateTotal(),
        user_id: parseInt(userId)
      });

      console.log("Payment response:", paymentResponse.data);

      if (paymentResponse.data && paymentResponse.data.payment_url) {
        // Redirect to payment gateway
        window.location.href = paymentResponse.data.payment_url;
      } else {
        showSnackbar("Payment initialization failed", "error");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      showSnackbar(
        error.response?.data?.message || "Failed to initiate payment",
        "error"
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  // Helper function to show snackbar
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
    setTimeout(() => setSnackbarOpen(false), 3000);
  };

  // Handle continue shopping
  const handleContinueShopping = () => {
    navigate("/client-busineess-category");
  };

  // Handle product click
  // const handleProductClick = (variantId) => {
  //   navigate(`/client-business-product-details/${variantId}`);
  // };

  // Get product image
  const getProductImage = (item) => {
    if (item.variant_details.media && item.variant_details.media.length > 0) {
      const media = item.variant_details.media[0];
      return `${baseurl}${media.file}`;
    }
    return "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400";
  };

  if (!userId) {
    return (
      <>
        <ClientNavbar />
        <div className="agent-cart-container">
          <div className="agent-cart-empty text-center py-5">
            <div className="empty-cart-icon mb-3">
              <FaShoppingCart size={64} />
            </div>
            <h3 className="mb-3">Please Login</h3>
            <p className="text-muted mb-4">
              You need to be logged in to view your cart
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
        <ClientNavbar />
        <div className="agent-cart-container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading cart...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ClientNavbar />
      
      {/* Snackbar */}
      {snackbarOpen && (
        <div className={`agent-cart-snackbar ${snackbarSeverity}`}>
          {snackbarMessage}
        </div>
      )}

      <div className="agent-cart-container">
        <div className="agent-cart-header">
          <h1 className="agent-cart-title">
            <FaShoppingCart className="me-2" />
            Shopping Cart
            {cartItems.length > 0 && (
              <span className="cart-count-badge">{cartItems.length}</span>
            )}
          </h1>
          <button 
            className="btn btn-outline-secondary"
            onClick={handleContinueShopping}
          >
            <FaArrowLeft className="me-2" />
            Continue Shopping
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="agent-cart-empty text-center py-5">
            <div className="empty-cart-icon mb-3">
              <FaShoppingCart size={64} />
            </div>
            <h3 className="mb-3">Your cart is empty</h3>
            <p className="text-muted mb-4">
              Add some products to your cart and they will appear here
            </p>
            <button 
              className="btn btn-primary btn-lg"
              onClick={handleContinueShopping}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="agent-cart-content">
            <div className="cart-items-section">
              <div className="cart-items-header">
                <h3>Cart Items ({cartItems.length})</h3>
              </div>
              
              <div className="cart-items-list">
                {cartItems.map((item) => {
                  const variant = item.variant_details;
                  const mrp = parseFloat(variant.mrp || 0);
                  const price = parseFloat(variant.selling_price || 0);
                  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
                  const attributes = variant.attributes || {};
                  const displayAttributes = Object.entries(attributes).map(([key, value]) => 
                    `${key.replace(/_/g, ' ')}: ${value}`
                  ).join(', ');

                  return (
                    <div key={item.id} className="cart-item-card">
                      <div className="cart-item-image" >
                                              {/* <div className="cart-item-image" onClick={() => handleProductClick(item.variant)}> */}

                        <img 
                          src={getProductImage(item)} 
                          alt={variant.sku}
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400";
                          }}
                        />
                      </div>
                      
                      <div className="cart-item-details">
                        <div className="item-header">
                          <h5 className="item-title" >
                            {variant.sku}
                          </h5>
                            {/* <h5 className="item-title" onClick={() => handleProductClick(item.variant)}>
                            {variant.sku}
                          </h5> */}
                          <button 
                            className="btn btn-danger btn-sm remove-btn"
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={removingItem === item.id}
                          >
                            {removingItem === item.id ? (
                              <span className="spinner-border spinner-border-sm" role="status"></span>
                            ) : (
                              <FaTrash />
                            )}
                          </button>
                        </div>
                        
                        {displayAttributes && (
                          <p className="item-attributes text-muted small">
                            {displayAttributes}
                          </p>
                        )}
                        
                        <div className="item-pricing">
                          <div className="price-display">
                            <span className="current-price">₹{price.toFixed(2)}</span>
                            {discount > 0 && (
                              <>
                                <span className="original-price">₹{mrp.toFixed(2)}</span>
                                <span className="discount-badge">{discount}% OFF</span>
                              </>
                            )}
                          </div>
                          
                          <div className="item-stock">
                            <span className={`stock-badge ${variant.stock > 10 ? 'in-stock' : 'low-stock'}`}>
                              {variant.stock > 10 ? 'In Stock' : `Only ${variant.stock} left`}
                            </span>
                          </div>
                        </div>
                        
                        <div className="item-quantity">
                          <div className="quantity-controls">
                            <button 
                              className="quantity-btn"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1 || updatingItem === item.id}
                            >
                              <FaMinus />
                            </button>
                            
                            <span className="quantity-display">
                              {updatingItem === item.id ? (
                                <span className="spinner-border spinner-border-sm" role="status"></span>
                              ) : (
                                item.quantity
                              )}
                            </span>
                            
                            <button 
                              className="quantity-btn"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              disabled={item.quantity >= variant.stock || updatingItem === item.id}
                            >
                              <FaPlus />
                            </button>
                          </div>
                          
                          <div className="item-subtotal">
                            <span className="subtotal-label">Subtotal:</span>
                            <span className="subtotal-amount">₹{item.subtotal.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="order-summary-section">
              <div className="order-summary-card">
                <h3 className="summary-title">Order Summary</h3>
                
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>₹{calculateSubtotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="summary-row">
                    <span>Tax</span>
                    <span>₹{calculateTax().toFixed(2)}</span>
                  </div>
                  
                  <div className="summary-row shipping-row">
                    <span>Shipping</span>
                    <span className="free-shipping">FREE</span>
                  </div>
                  
                  <div className="summary-divider"></div>
                  
                  <div className="summary-row total-row">
                    <span className="total-label">Total</span>
                    <span className="total-amount">₹{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="checkout-actions">
                  <button 
                    className="btn btn-primary checkout-btn"
                    onClick={handleCheckout}
                    disabled={paymentLoading || cartItems.length === 0}
                  >
                    {paymentLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaCreditCard className="me-2" />
                        Proceed to Checkout
                      </>
                    )}
                  </button>
                  
                  <button 
                    className="btn btn-outline-secondary continue-btn"
                    onClick={handleContinueShopping}
                  >
                    <FaArrowLeft className="me-2" />
                    Continue Shopping
                  </button>
                </div>
                
                {/* <div className="secure-checkout">
                  <div className="secure-icon">🔒</div>
                  <div className="secure-text">
                    <div className="secure-title">Secure Checkout</div>
                    <div className="secure-subtitle">Your payment information is protected</div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ClientCart