// CartPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import Swal from "sweetalert2";
import "./CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCartItems();
    
    // Listen for cart updates from other pages
    window.addEventListener('cartUpdated', loadCartItems);
    
    return () => {
      window.removeEventListener('cartUpdated', loadCartItems);
    };
  }, []);

  const loadCartItems = () => {
    const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
    setCartItems(guestCart);
    setLoading(false);
  };

  const updateQuantity = (variantId, newQty) => {
    const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
    const itemIndex = guestCart.findIndex(item => item.variant_id === variantId);
    
    if (itemIndex >= 0) {
      if (newQty <= 0) {
        // Remove item if quantity is 0 or less
        guestCart.splice(itemIndex, 1);
      } else {
        // Update quantity
        guestCart[itemIndex].quantity = newQty;
        guestCart[itemIndex].addedAt = new Date().toISOString();
      }
      
      localStorage.setItem("website_guest_cart", JSON.stringify(guestCart));
      setCartItems(guestCart);
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const removeItem = (variantId) => {
    Swal.fire({
      title: 'Remove Item',
      text: 'Are you sure you want to remove this item from cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#f76f2f',
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
        const filteredCart = guestCart.filter(item => item.variant_id !== variantId);
        
        localStorage.setItem("website_guest_cart", JSON.stringify(filteredCart));
        setCartItems(filteredCart);
        window.dispatchEvent(new Event('cartUpdated'));
        
        Swal.fire(
          'Removed!',
          'Item has been removed from cart.',
          'success'
        );
      }
    });
  };

  const clearCart = () => {
    if (cartItems.length === 0) return;
    
    Swal.fire({
      title: 'Clear Cart',
      text: 'Are you sure you want to clear your entire cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, clear all',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#f76f2f',
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("website_guest_cart", JSON.stringify([]));
        setCartItems([]);
        window.dispatchEvent(new Event('cartUpdated'));
        
        Swal.fire(
          'Cleared!',
          'Your cart has been cleared.',
          'success'
        );
      }
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotalMrp = () => {
    return cartItems.reduce((total, item) => total + (item.mrp * item.quantity), 0);
  };

  const calculateDiscount = () => {
    return calculateTotalMrp() - calculateTotal();
  };

  const proceedToCheckout = () => {
    // You'll need to implement the checkout flow for guest users
    // This could involve:
    // 1. Collecting guest information (name, email, phone, address)
    // 2. Creating a guest order in your backend
    // 3. Processing payment
    // 4. Clearing the cart after successful order
    
    Swal.fire({
      title: 'Proceed to Checkout',
      text: 'You will be redirected to checkout page',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Continue',
      cancelButtonText: 'Continue Shopping',
      confirmButtonColor: '#f76f2f',
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        // Save cart data to session for checkout
        sessionStorage.setItem('checkout_cart', JSON.stringify(cartItems));
        window.location.href = '/checkout';
      }
    });
  };

  if (loading) {
    return (
      <>
        <WebsiteNavbar />
        <div className="text-center py-5">Loading cart...</div>
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <WebsiteNavbar />
        <div className="empty-cart-container">
          <div className="empty-cart-content">
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <WebsiteNavbar />
      <div className="cart-container">
        <h1 className="cart-title">Your Shopping Cart</h1>
        
        <div className="cart-layout">
          <div className="cart-items-section">
            <div className="cart-header">
              <h2>Cart Items ({cartItems.length})</h2>
              <button onClick={clearCart} className="clear-cart-btn">
                Clear Cart
              </button>
            </div>
            
            {cartItems.map((item, index) => (
              <div key={item.variant_id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-sku">SKU: {item.sku}</p>
                  
                  {Object.entries(item.attributes || {}).map(([key, value]) => (
                    <p key={key} className="cart-item-attribute">
                      {key.replace(/_/g, " ")}: {value}
                    </p>
                  ))}
                  
                  <div className="cart-item-price">
                    <span className="current-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                    {item.mrp > item.price && (
                      <span className="original-price">₹{(item.mrp * item.quantity).toFixed(2)}</span>
                    )}
                  </div>
                </div>
                
                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button 
                      onClick={() => updateQuantity(item.variant_id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.variant_id, item.quantity + 1)}
                      disabled={item.quantity >= (item.stock || 99)}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.variant_id)}
                    className="remove-item-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Total MRP</span>
              <span>₹{calculateTotalMrp().toFixed(2)}</span>
            </div>
            
            {calculateDiscount() > 0 && (
              <div className="summary-row discount">
                <span>Discount</span>
                <span>- ₹{calculateDiscount().toFixed(2)}</span>
              </div>
            )}
            
            <div className="summary-row total">
              <span>Total Amount</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
            
            <button onClick={proceedToCheckout} className="checkout-btn">
              Proceed to Checkout
            </button>
            
            <Link to="/" className="continue-shopping-link">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;