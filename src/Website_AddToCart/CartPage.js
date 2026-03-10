
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import Swal from "sweetalert2";
// import "./CartPage.css";

// const WebsiteCartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     checkLoginStatus();
//     loadCartItems();
    
//     // Listen for cart updates from other pages
//     window.addEventListener('cartUpdated', loadCartItems);
//     window.addEventListener('storage', handleStorageChange);
    
//     return () => {
//       window.removeEventListener('cartUpdated', loadCartItems);
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   const checkLoginStatus = () => {
//     const userId = localStorage.getItem("user_id");
//     setIsLoggedIn(!!userId);
//   };

//   const handleStorageChange = (e) => {
//     if (e.key === 'website_guest_cart') {
//       loadCartItems();
//     }
//   };

//   const loadCartItems = () => {
//     const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
//     setCartItems(guestCart);
//     setLoading(false);
//   };

//   const updateQuantity = (variantId, newQty) => {
//     const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
//     const itemIndex = guestCart.findIndex(item => item.variant_id === variantId);
    
//     if (itemIndex >= 0) {
//       if (newQty <= 0) {
//         guestCart.splice(itemIndex, 1);
//       } else {
//         guestCart[itemIndex].quantity = newQty;
//         guestCart[itemIndex].addedAt = new Date().toISOString();
//       }
      
//       localStorage.setItem("website_guest_cart", JSON.stringify(guestCart));
//       setCartItems(guestCart);
//       window.dispatchEvent(new Event('cartUpdated'));
//     }
//   };

//   const removeItem = (variantId) => {
//     Swal.fire({
//       title: 'Remove Item',
//       text: 'Are you sure you want to remove this item from cart?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, remove it',
//       cancelButtonText: 'Cancel',
//       confirmButtonColor: '#f76f2f',
//       cancelButtonColor: '#6c757d',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
//         const filteredCart = guestCart.filter(item => item.variant_id !== variantId);
        
//         localStorage.setItem("website_guest_cart", JSON.stringify(filteredCart));
//         setCartItems(filteredCart);
//         window.dispatchEvent(new Event('cartUpdated'));
        
//         Swal.fire(
//           'Removed!',
//           'Item has been removed from cart.',
//           'success'
//         );
//       }
//     });
//   };

//   const clearCart = () => {
//     if (cartItems.length === 0) return;
    
//     Swal.fire({
//       title: 'Clear Cart',
//       text: 'Are you sure you want to clear your entire cart?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, clear all',
//       cancelButtonText: 'Cancel',
//       confirmButtonColor: '#f76f2f',
//       cancelButtonColor: '#6c757d',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.setItem("website_guest_cart", JSON.stringify([]));
//         setCartItems([]);
//         window.dispatchEvent(new Event('cartUpdated'));
        
//         Swal.fire(
//           'Cleared!',
//           'Your cart has been cleared.',
//           'success'
//         );
//       }
//     });
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   };

//   const calculateTotalMrp = () => {
//     return cartItems.reduce((total, item) => total + (item.mrp * item.quantity), 0);
//   };

//   const calculateDiscount = () => {
//     return calculateTotalMrp() - calculateTotal();
//   };

//   const proceedToCheckout = () => {
//     if (!isLoggedIn) {
//       // Show login/register alert for non-logged in users
//       Swal.fire({
//         title: 'Login Required',
//         text: 'Please login or register to proceed with checkout',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Login',
//         cancelButtonText: 'Register',
//         confirmButtonColor: '#f76f2f',
//         cancelButtonColor: '#28a745',
//         reverseButtons: true
//       }).then((result) => {
//         if (result.isConfirmed) {
//           // Store cart data in session storage before navigating to login
//           sessionStorage.setItem('redirect_from_cart', 'true');
//           sessionStorage.setItem('pending_cart', JSON.stringify(cartItems));
//           navigate('/login');
//         } else if (result.dismiss === Swal.DismissReason.cancel) {
//           // Store cart data in session storage before navigating to register
//           sessionStorage.setItem('redirect_from_cart', 'true');
//           sessionStorage.setItem('pending_cart', JSON.stringify(cartItems));
//           navigate('/register');
//         }
//       });
//     } else {
//       // User is logged in, proceed with checkout
//       handleCheckout();
//     }
//   };

//   const handleCheckout = async () => {
//     const userId = localStorage.getItem("user_id");
    
//     if (!userId) {
//       Swal.fire('Error', 'User not found. Please login again.', 'error');
//       return;
//     }

//     try {
//       // Prepare cart data for API
//       const cartPayload = cartItems.map(item => ({
//         user: parseInt(userId),
//         variant: item.variant_id,
//         quantity: item.quantity
//       }));

//       // Show loading
//       Swal.fire({
//         title: 'Processing...',
//         text: 'Please wait while we process your cart',
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         }
//       });

//       // Send cart data to API
//       const response = await fetch('https://test.shrirajteam.com:85/cart/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(cartPayload)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Swal.close();
        
//         // Clear local cart after successful API sync
//         localStorage.setItem("website_guest_cart", JSON.stringify([]));
        
//         // Navigate based on user role
//         const userRoles = JSON.parse(localStorage.getItem('user_roles') || '[]');
        
//         if (userRoles.includes('Agent')) {
//           navigate('/agent-cart');
//         } else if (userRoles.includes('Client')) {
//           navigate('/client-cart');
//         } else {
//           // Default fallback based on referral ID
//           const referralId = localStorage.getItem('referral_id') || '';
//           if (referralId.toUpperCase().startsWith('SRP')) {
//             navigate('/agent-cart');
//           } else if (referralId.toUpperCase().startsWith('SRT')) {
//             navigate('/client-cart');
//           } else {
//             navigate('/checkout');
//           }
//         }
//       } else {
//         Swal.fire('Error', data.error || 'Failed to process cart', 'error');
//       }
//     } catch (error) {
//       console.error('Checkout error:', error);
//       Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
//     }
//   };

//   if (loading) {
//     return (
//       <>
//         <WebsiteNavbar />
//         <div className="text-center py-5">Loading cart...</div>
//       </>
//     );
//   }

//   if (cartItems.length === 0) {
//     return (
//       <>
//         <WebsiteNavbar />
//         <div className="empty-cart-container">
//           <div className="empty-cart-content">
//             <h2>Your cart is empty</h2>
//             <p>Looks like you haven't added any items to your cart yet.</p>
//             <Link to="/" className="continue-shopping-btn">
//               Continue Shopping
//             </Link>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <WebsiteNavbar />
//       <div className="cart-container">
//         <h1 className="cart-title">Your Shopping Cart</h1>
        
//         <div className="cart-layout">
//           <div className="cart-items-section">
//             <div className="cart-header">
//               <h2>Cart Items ({cartItems.length})</h2>
//               <button onClick={clearCart} className="clear-cart-btn">
//                 Clear Cart
//               </button>
//             </div>
            
//             {cartItems.map((item, index) => (
//               <div key={item.variant_id} className="cart-item">
//                 <div className="cart-item-image">
//                   <img src={item.image} alt={item.name} />
//                 </div>
                
//                 <div className="cart-item-details">
//                   <h3>{item.name}</h3>
//                   <p className="cart-item-sku">SKU: {item.sku}</p>
                  
//                   {Object.entries(item.attributes || {}).map(([key, value]) => (
//                     <p key={key} className="cart-item-attribute">
//                       {key.replace(/_/g, " ")}: {value}
//                     </p>
//                   ))}
                  
//                   <div className="cart-item-price">
//                     <span className="current-price">₹{(item.price * item.quantity).toFixed(2)}</span>
//                     {item.mrp > item.price && (
//                       <span className="original-price">₹{(item.mrp * item.quantity).toFixed(2)}</span>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="cart-item-actions">
//                   <div className="quantity-control">
//                     <button 
//                       onClick={() => updateQuantity(item.variant_id, item.quantity - 1)}
//                       disabled={item.quantity <= 1}
//                     >
//                       −
//                     </button>
//                     <span>{item.quantity}</span>
//                     <button 
//                       onClick={() => updateQuantity(item.variant_id, item.quantity + 1)}
//                       disabled={item.quantity >= (item.stock || 99)}
//                     >
//                       +
//                     </button>
//                   </div>
                  
//                   <button 
//                     onClick={() => removeItem(item.variant_id)}
//                     className="remove-item-btn"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="cart-summary">
//             <h2>Order Summary</h2>
            
//             <div className="summary-row">
//               <span>Total MRP</span>
//               <span>₹{calculateTotalMrp().toFixed(2)}</span>
//             </div>
            
//             {calculateDiscount() > 0 && (
//               <div className="summary-row discount">
//                 <span>Discount</span>
//                 <span>- ₹{calculateDiscount().toFixed(2)}</span>
//               </div>
//             )}
            
//             <div className="summary-row total">
//               <span>Total Amount</span>
//               <span>₹{calculateTotal().toFixed(2)}</span>
//             </div>
            
//             <button onClick={proceedToCheckout} className="checkout-btn">
//               {isLoggedIn ? 'Proceed to Checkout' : 'Login to Checkout'}
//             </button>
            
//             <Link to="/" className="continue-shopping-link">
//               ← Continue Shopping
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default WebsiteCartPage;




import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import Swal from "sweetalert2";
import "./CartPage.css";
import { baseurl } from "../BaseURL/BaseURL";
const WebsiteCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus();
    loadCartItems();
    
    // Listen for cart updates from other pages
    window.addEventListener('cartUpdated', loadCartItems);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('cartUpdated', loadCartItems);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const checkLoginStatus = () => {
    const userId = localStorage.getItem("user_id");
    setIsLoggedIn(!!userId);
  };

  const handleStorageChange = (e) => {
    if (e.key === 'website_guest_cart') {
      loadCartItems();
    }
  };

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
        guestCart.splice(itemIndex, 1);
      } else {
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
    if (!isLoggedIn) {
      // Show login/register alert for non-logged in users
      Swal.fire({
        title: 'Login Required',
        text: 'Please login or register to proceed with checkout',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Register',
        confirmButtonColor: '#f76f2f',
        cancelButtonColor: '#28a745',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          // Store cart data in session storage before navigating to login
          sessionStorage.setItem('redirect_from_cart', 'true');
          sessionStorage.setItem('pending_cart', JSON.stringify(cartItems));
          navigate('/login');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Store cart data in session storage before navigating to register
          sessionStorage.setItem('redirect_from_cart', 'true');
          sessionStorage.setItem('pending_cart', JSON.stringify(cartItems));
          navigate('/register');
        }
      });
    } else {
      // User is logged in, proceed with checkout
      handleCheckout();
    }
  };

  const handleCheckout = async () => {
    const userId = localStorage.getItem("user_id");
    
    if (!userId) {
      Swal.fire('Error', 'User not found. Please login again.', 'error');
      return;
    }

    try {
      // Prepare cart data for API
      const cartPayload = cartItems.map(item => ({
        user: parseInt(userId),
        variant: item.variant_id,
        quantity: item.quantity
      }));

      // Show loading
      Swal.fire({
        title: 'Processing...',
        text: 'Please wait while we process your cart',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Send cart data to API
const response = await fetch(`${baseurl}/cart/`, {



        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartPayload)
      });

      const data = await response.json();

      if (response.ok) {
        Swal.close();
        
        // Clear local cart after successful API sync
        localStorage.setItem("website_guest_cart", JSON.stringify([]));
        
        // Navigate based on user role
        const userRoles = JSON.parse(localStorage.getItem('user_roles') || '[]');
        
        if (userRoles.includes('Agent')) {
          navigate('/agent-cart');
        } else if (userRoles.includes('Client')) {
          navigate('/client-cart');
        } else {
          // Default fallback based on referral ID
          const referralId = localStorage.getItem('referral_id') || '';
          if (referralId.toUpperCase().startsWith('SRP')) {
            navigate('/agent-cart');
          } else if (referralId.toUpperCase().startsWith('SRT')) {
            navigate('/client-cart');
          } else {
            navigate('/checkout');
          }
        }
      } else {
        Swal.fire('Error', data.error || 'Failed to process cart', 'error');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
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
          <button onClick={handleGoBack} className="back-button">
            ← Back
          </button>
          <div className="empty-cart-content">
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/" className="continue-shopping-btn improved">
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
        <button onClick={handleGoBack} className="back-button btn btn-outline-secondary">
          ← Back
        </button>
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
              {isLoggedIn ? 'Proceed to Checkout' : 'Login to Checkout'}
            </button>
            
            <Link to="/" className="continue-shopping-link improved">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebsiteCartPage;