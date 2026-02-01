import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AgentNavbar from "../Agent_Navbar/Agent_Navbar";
import { baseurl } from '../../BaseURL/BaseURL';
import "./Wishlist.css";
import { FaTrash, FaHeart, FaShoppingCart, FaArrowLeft, FaPlus } from "react-icons/fa";

function AgentWishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingItem, setRemovingItem] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  // Fetch wishlist items
  const fetchWishlistItems = async () => {
    if (!userId) {
      setLoading(false);
      setWishlistItems([]);
      return;
    }

    try {
      setLoading(true);
      console.log("Fetching wishlist items for user:", userId);
      
      const response = await axios.get(`${baseurl}/wishlist/?user=${userId}`);
      console.log("Wishlist API Response:", response.data);
      
      const wishlistResponse = response.data;
      let userWishlistItems = [];
      
      if (wishlistResponse.results && Array.isArray(wishlistResponse.results)) {
        userWishlistItems = wishlistResponse.results;
      } else if (Array.isArray(wishlistResponse)) {
        userWishlistItems = wishlistResponse;
      }
      
      console.log("Filtered wishlist items:", userWishlistItems);
      setWishlistItems(userWishlistItems);
      
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
      showSnackbar("Error loading wishlist data", "error");
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchWishlistItems();
  }, [userId]);

  // Remove item from wishlist
  const handleRemoveItem = async (wishlistItemId) => {
    setRemovingItem(wishlistItemId);
    
    try {
      await axios.delete(`${baseurl}/wishlist/${wishlistItemId}/`);
      
      // Update local state
      setWishlistItems(prev => prev.filter(item => item.id !== wishlistItemId));
      
      // Dispatch wishlist update event for navbar
      window.dispatchEvent(new Event('wishlistUpdated'));
      
      showSnackbar("Item removed from wishlist", "info");
    } catch (error) {
      console.error("Error removing item:", error);
      showSnackbar("Failed to remove item", "error");
    } finally {
      setRemovingItem(null);
    }
  };

  // Add item to cart from wishlist
  const handleAddToCart = async (wishlistItem) => {
    if (!userId) {
      showSnackbar("Please login to add items to cart", "warning");
      return;
    }

    setAddingToCart(wishlistItem.id);
    
    try {
      // Check if item already in cart
      const cartResponse = await axios.get(`${baseurl}/cart/?user=${userId}`);
      const cartItems = cartResponse.data.results || cartResponse.data || [];
      const existingCartItem = cartItems.find(item => item.variant === wishlistItem.variant);
      
      if (existingCartItem) {
        // Update quantity if already in cart
        await axios.put(`${baseurl}/cart/${existingCartItem.id}/`, {
          user: parseInt(userId),
          variant: wishlistItem.variant,
          quantity: existingCartItem.quantity + 1
        });
        showSnackbar("Quantity updated in cart", "success");
      } else {
        // Add new item to cart
        await axios.post(`${baseurl}/cart/`, {
          user: parseInt(userId),
          variant: wishlistItem.variant,
          quantity: 1
        });
        showSnackbar("Added to cart successfully", "success");
      }
      
      // Dispatch cart update event for navbar
      window.dispatchEvent(new Event('cartUpdated'));
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (error.response?.status === 400 && error.response?.data?.error?.includes("stock")) {
        showSnackbar("Item out of stock", "error");
      } else {
        showSnackbar("Failed to add to cart", "error");
      }
    } finally {
      setAddingToCart(null);
    }
  };

  // Move all items to cart
  const handleMoveAllToCart = async () => {
    if (wishlistItems.length === 0) {
      showSnackbar("Your wishlist is empty", "warning");
      return;
    }

    if (!userId) {
      showSnackbar("Please login to add items to cart", "warning");
      return;
    }

    setAddingToCart("all");
    
    try {
      // Get current cart items
      const cartResponse = await axios.get(`${baseurl}/cart/?user=${userId}`);
      const cartItems = cartResponse.data.results || cartResponse.data || [];
      
      let successCount = 0;
      let errorCount = 0;
      
      // Add each wishlist item to cart
      for (const wishlistItem of wishlistItems) {
        try {
          const existingCartItem = cartItems.find(item => item.variant === wishlistItem.variant);
          
          if (existingCartItem) {
            // Update quantity if already in cart
            await axios.put(`${baseurl}/cart/${existingCartItem.id}/`, {
              user: parseInt(userId),
              variant: wishlistItem.variant,
              quantity: existingCartItem.quantity + 1
            });
          } else {
            // Add new item to cart
            await axios.post(`${baseurl}/cart/`, {
              user: parseInt(userId),
              variant: wishlistItem.variant,
              quantity: 1
            });
          }
          successCount++;
        } catch (error) {
          console.error(`Failed to add variant ${wishlistItem.variant} to cart:`, error);
          errorCount++;
        }
      }
      
      // Dispatch cart update event for navbar
      window.dispatchEvent(new Event('cartUpdated'));
      
      if (successCount > 0) {
        showSnackbar(`Added ${successCount} items to cart${errorCount > 0 ? ` (${errorCount} failed)` : ''}`, "success");
      } else {
        showSnackbar("Failed to add items to cart", "error");
      }
      
    } catch (error) {
      console.error("Error moving all to cart:", error);
      showSnackbar("Failed to move items to cart", "error");
    } finally {
      setAddingToCart(null);
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
    navigate("/agent-busineess-category");
  };

  // Handle product click
  const handleProductClick = (variantId) => {
    navigate(`/client-product-details/${variantId}`);
  };

  // Get product image
  const getProductImage = (item) => {
    if (item.variant_details?.media && item.variant_details.media.length > 0) {
      const media = item.variant_details.media[0];
      return `${baseurl}${media.file}`;
    }
    return "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400";
  };

  // Clear all wishlist items
  const handleClearAll = async () => {
    if (wishlistItems.length === 0) return;
    
    if (!window.confirm("Are you sure you want to clear all items from your wishlist?")) {
      return;
    }
    
    try {
      // Delete all wishlist items one by one
      for (const item of wishlistItems) {
        await axios.delete(`${baseurl}/wishlist/${item.id}/`);
      }
      
      // Clear local state
      setWishlistItems([]);
      
      // Dispatch wishlist update event for navbar
      window.dispatchEvent(new Event('wishlistUpdated'));
      
      showSnackbar("All items removed from wishlist", "info");
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      showSnackbar("Failed to clear wishlist", "error");
    }
  };

  if (!userId) {
    return (
      <>
        <AgentNavbar />
        <div className="wishlist-container">
          <div className="wishlist-empty text-center py-5">
            <div className="empty-wishlist-icon mb-3">
              <FaHeart size={64} />
            </div>
            <h3 className="mb-3">Please Login</h3>
            <p className="text-muted mb-4">
              You need to be logged in to view your wishlist
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
        <div className="wishlist-container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading wishlist...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AgentNavbar />
      
      {/* Snackbar */}
      {snackbarOpen && (
        <div className={`wishlist-snackbar ${snackbarSeverity}`}>
          {snackbarMessage}
        </div>
      )}

      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1 className="wishlist-title">
            <FaHeart className="me-2" style={{ color: '#ff2e93' }} />
            My Wishlist
            {wishlistItems.length > 0 && (
              <span className="wishlist-count-badge">{wishlistItems.length}</span>
            )}
          </h1>
          <div className="wishlist-header-actions">
            {wishlistItems.length > 0 && (
              <button 
                className="btn btn-outline-danger"
                onClick={handleClearAll}
                disabled={removingItem === "all"}
              >
                Clear All
              </button>
            )}
            <button 
              className="btn btn-outline-secondary"
              onClick={handleContinueShopping}
            >
              <FaArrowLeft className="me-2" />
              Continue Shopping
            </button>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="wishlist-empty text-center py-5">
            <div className="empty-wishlist-icon mb-3">
              <FaHeart size={64} style={{ color: '#ddd' }} />
            </div>
            <h3 className="mb-3">Your wishlist is empty</h3>
            <p className="text-muted mb-4">
              Add some products to your wishlist and they will appear here
            </p>
            <button 
              className="btn btn-primary btn-lg"
              onClick={handleContinueShopping}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="wishlist-content">
            {/* Bulk Actions */}
            <div className="wishlist-bulk-actions">
              <div className="bulk-actions-left">
                <span className="wishlist-items-count">
                  {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in wishlist
                </span>
              </div>
              <div className="bulk-actions-right">
                <button 
                  className="btn btn-primary"
                  onClick={handleMoveAllToCart}
                  disabled={addingToCart === "all"}
                >
                  {addingToCart === "all" ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Adding...
                    </>
                  ) : (
                    <>
                      <FaShoppingCart className="me-2" />
                      Move All to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {/* Wishlist Items */}
            <div className="wishlist-items-section">
              <div className="wishlist-items-list">
                {wishlistItems.map((item) => {
                  const variant = item.variant_details || {};
                  const mrp = parseFloat(variant.mrp || 0);
                  const price = parseFloat(variant.selling_price || 0);
                  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
                  const attributes = variant.attributes || {};
                  const displayAttributes = Object.entries(attributes).map(([key, value]) => 
                    `${key.replace(/_/g, ' ')}: ${value}`
                  ).join(', ');

                  return (
                    <div key={item.id} className="wishlist-item-card">
                      <div 
                        className="wishlist-item-image"
                        onClick={() => handleProductClick(item.variant)}
                      >
                        <img 
                          src={getProductImage(item)} 
                          alt={variant.sku || "Product"}
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400";
                          }}
                        />
                      </div>
                      
                      <div className="wishlist-item-details">
                        <div className="item-header">
                          <h5 
                            className="item-title"
                            onClick={() => handleProductClick(item.variant)}
                          >
                            {variant.sku || "Product"}
                          </h5>
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
                        
                        <div className="wishlist-item-actions">
                          <button 
                            className="btn btn-outline-primary add-to-cart-btn"
                            onClick={() => handleAddToCart(item)}
                            disabled={addingToCart === item.id || variant.stock <= 0}
                          >
                            {addingToCart === item.id ? (
                              <span className="spinner-border spinner-border-sm" role="status"></span>
                            ) : (
                              <>
                                <FaShoppingCart className="me-2" />
                                Add to Cart
                              </>
                            )}
                          </button>
                          
                          <span className="added-date">
                            Added on: {new Date(item.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Wishlist Summary */}
            <div className="wishlist-summary">
              <div className="wishlist-summary-card">
                <h3 className="summary-title">Wishlist Summary</h3>
                
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Total Items</span>
                    <span>{wishlistItems.length}</span>
                  </div>
                  
                  <div className="summary-row">
                    <span>Items in Stock</span>
                    <span>
                      {wishlistItems.filter(item => item.variant_details?.stock > 0).length}
                    </span>
                  </div>
                  
                  <div className="summary-divider"></div>
                  
                  <div className="summary-row total-value">
                    <span>Total Value</span>
                    <span className="total-amount">
                      ₹{wishlistItems.reduce((total, item) => {
                        const price = parseFloat(item.variant_details?.selling_price || 0);
                        return total + price;
                      }, 0).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="wishlist-actions">
                  <button 
                    className="btn btn-primary move-all-btn"
                    onClick={handleMoveAllToCart}
                    disabled={addingToCart === "all" || wishlistItems.length === 0}
                  >
                    {addingToCart === "all" ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Adding...
                      </>
                    ) : (
                      <>
                        <FaShoppingCart className="me-2" />
                        Move All to Cart
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
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AgentWishlist;