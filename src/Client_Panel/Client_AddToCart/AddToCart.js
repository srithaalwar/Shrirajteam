// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AgentNavbar from "../../Client_Panel/Client_Navbar/Client_Navbar";
// import { baseurl, redirecturl } from '../../BaseURL/BaseURL';
// import "./AddToCart.css";
// import { FaTrash, FaMinus, FaPlus, FaCreditCard, FaArrowLeft, FaShoppingCart } from "react-icons/fa";

// function AgentCart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [paymentLoading, setPaymentLoading] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [updatingItem, setUpdatingItem] = useState(null);
//   const [removingItem, setRemovingItem] = useState(null);
//   const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
//   const [merchantOrderId, setMerchantOrderId] = useState(null);
//   const [paymentUrl, setPaymentUrl] = useState(null);
//   const hasPostedStatus = useRef(false);
  
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("user_id");

//   // Fetch cart items
//   const fetchCartItems = async () => {
//     if (!userId) {
//       setLoading(false);
//       setCartItems([]);
//       return;
//     }

//     try {
//       setLoading(true);
//       console.log("Fetching cart items for user:", userId);
      
//       const response = await axios.get(`${baseurl}/cart/?user=${userId}`);
//       console.log("Cart API Response:", response.data);
      
//       const cartResponse = response.data;
//       let userCartItems = [];
      
//       if (cartResponse.results && Array.isArray(cartResponse.results)) {
//         userCartItems = cartResponse.results;
//       } else if (Array.isArray(cartResponse)) {
//         userCartItems = cartResponse;
//       }
      
//       console.log("Filtered cart items:", userCartItems);
//       setCartItems(userCartItems);
      
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//       showSnackbar("Error loading cart data", "error");
//       setCartItems([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial fetch
//   useEffect(() => {
//     fetchCartItems();
//   }, [userId]);

//   // Handle payment confirmation on component mount
//   useEffect(() => {
//     const merchant_order_id = localStorage.getItem("merchant_order_id");
    
//     const confirmCartPayment = async () => {
//       if (hasPostedStatus.current || !merchant_order_id) return;
      
//       try {
//         hasPostedStatus.current = true;
        
//         const response = await axios.post(
//           `${baseurl}/product/confirm-payment/`,
//           {
//             merchant_order_id: merchant_order_id
//           }
//         );
        
//         console.log("Payment confirmation response:", response.data);
        
//         // Clear storage after successful confirmation
//         localStorage.removeItem("merchant_order_id");
//         localStorage.removeItem("order_id");
//         localStorage.removeItem("payment_amount");
        
//         // Refresh cart data
//         await fetchCartItems();
        
//         showSnackbar("Payment confirmed successfully!", "success");
        
//         // Optionally redirect to success page
//         setTimeout(() => {
//           navigate("/client-transactions");
//         }, 2000);
        
//       } catch (error) {
//         console.error("Error confirming payment:", error);
//         hasPostedStatus.current = false; // Allow retry
//         showSnackbar(
//           error.response?.data?.message || "Payment confirmation failed",
//           "error"
//         );
//       }
//     };
    
//     confirmCartPayment();
//   }, []);

//   // Update quantity
//   const handleQuantityChange = async (cartItemId, newQuantity) => {
//     if (newQuantity < 1) return;

//     const cartItem = cartItems.find(item => item.id === cartItemId);
//     if (!cartItem) return;

//     // Check stock availability
//     if (newQuantity > cartItem.variant_details.stock) {
//       showSnackbar(`Only ${cartItem.variant_details.stock} items available in stock`, "error");
//       return;
//     }

//     setUpdatingItem(cartItemId);
    
//     try {
//       await axios.put(`${baseurl}/cart/${cartItemId}/`, {
//         user: parseInt(userId),
//         variant: cartItem.variant,
//         quantity: newQuantity
//       });

//       // Update local state
//       setCartItems(prev => prev.map(item => 
//         item.id === cartItemId ? { 
//           ...item, 
//           quantity: newQuantity,
//           subtotal: (parseFloat(cartItem.variant_details.selling_price) * newQuantity)
//         } : item
//       ));

//       // Dispatch cart update event for navbar
//       window.dispatchEvent(new Event('cartUpdated'));
      
//       showSnackbar("Quantity updated successfully", "success");
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//       showSnackbar("Failed to update quantity", "error");
//     } finally {
//       setUpdatingItem(null);
//     }
//   };

//   // Remove item from cart
//   const handleRemoveItem = async (cartItemId) => {
//     setRemovingItem(cartItemId);
    
//     try {
//       await axios.delete(`${baseurl}/cart/${cartItemId}/`);
      
//       // Update local state
//       setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      
//       // Dispatch cart update event for navbar
//       window.dispatchEvent(new Event('cartUpdated'));
      
//       showSnackbar("Item removed from cart", "info");
//     } catch (error) {
//       console.error("Error removing item:", error);
//       showSnackbar("Failed to remove item", "error");
//     } finally {
//       setRemovingItem(null);
//     }
//   };

//   // Calculate totals
//   const calculateSubtotal = () => {
//     return cartItems.reduce((total, item) => {
//       return total + parseFloat(item.subtotal || 0);
//     }, 0);
//   };

//   const calculateTax = () => {
//     return cartItems.reduce((total, item) => {
//       const taxPercent = parseFloat(item.variant_details.tax_percent || 0);
//       const price = parseFloat(item.variant_details.selling_price || 0);
//       return total + ((price * item.quantity * taxPercent) / 100);
//     }, 0);
//   };

//   const calculateTotal = () => {
//     return calculateSubtotal() + calculateTax();
//   };

//   // Convert to paise (₹1 = 100 paise)
//   const convertToPaise = (amount) => {
//     return Math.round(amount * 100);
//   };

//   // Initiate Payment
//   const handleCheckout = async () => {
//     if (cartItems.length === 0) {
//       showSnackbar("Your cart is empty", "warning");
//       return;
//     }

//     if (!userId) {
//       showSnackbar("Please login to proceed", "warning");
//       return;
//     }

//     setPaymentLoading(true);
//     try {
//       const totalAmount = calculateTotal();

//       console.log("Initiating payment with:", {
//         user_id: parseInt(userId),
//         redirect_url: `${redirecturl}/client-transactions`,      
//         amount: totalAmount
//       });

//       // Initiate payment with new API endpoint and payload
//       const paymentResponse = await axios.post(
//         `${baseurl}/product/initiate-payment/`,
//         {
//           user_id: parseInt(userId),
//           redirect_url: `${redirecturl}/client-transactions`,  
//           amount: totalAmount  // Send amount in rupees
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       console.log("Payment response:", paymentResponse.data);

//       if (paymentResponse.data) {
//         const orderId = paymentResponse.data.merchant_order_id;
//         setMerchantOrderId(orderId);
        
//         // Check if payment_url is returned
//         if (paymentResponse.data.payment_url) {
//           // If payment_url is provided, redirect directly
//           setPaymentUrl(paymentResponse.data.payment_url);
          
//           // Save payment info to localStorage for confirmation later
//           localStorage.setItem('merchant_order_id', orderId);
//           localStorage.setItem('order_id', paymentResponse.data.order_id);
//           localStorage.setItem('payment_amount', totalAmount.toString());
          
//           // Redirect to payment gateway
//           window.location.href = paymentResponse.data.payment_url;
//         } else {
//           // If no payment_url, show confirmation dialog
//           setConfirmDialogOpen(true);
          
//           // Store merchant_order_id for later confirmation
//           localStorage.setItem("merchant_order_id", orderId);
//         }
        
//       } else {
//         showSnackbar("Failed to initiate payment. Please try again.", "error");
//       }
//     } catch (error) {
//       console.error("Payment initiation error:", error);
//       showSnackbar(
//         error.response?.data?.message || error.response?.data?.detail || "Failed to initiate payment",
//         "error"
//       );
//     } finally {
//       setPaymentLoading(false);
//     }
//   };

//   // Confirm Payment (when no payment_url is provided)
//   const handleConfirmPayment = async () => {
//     if (!merchantOrderId) {
//       showSnackbar("Payment order ID not found", "error");
//       return;
//     }

//     setPaymentLoading(true);
//     try {
//       // Confirm payment API call
//       const response = await axios.post(
//         `${baseurl}/product/confirm-payment/`,
//         {
//           merchant_order_id: merchantOrderId
//         }
//       );

//       console.log("Payment confirmation response:", response.data);

//       if (response.data) {
//         // Handle successful payment response
//         showSnackbar("Payment successful!", "success");
//         setConfirmDialogOpen(false);
//         setMerchantOrderId(null);
        
//         // Clear storage
//         localStorage.removeItem('merchant_order_id');
//         localStorage.removeItem('order_id');
//         localStorage.removeItem('payment_amount');
        
//         // Clear cart after successful payment
//         await clearCartAfterPayment();
        
//         // Redirect to success page
//         setTimeout(() => {
//           navigate("/client-transactions");
//         }, 2000);
//       }
//     } catch (error) {
//       console.error("Payment confirmation error:", error);
//       showSnackbar(
//         error.response?.data?.message || "Payment failed. Please try again.",
//         "error"
//       );
//     } finally {
//       setPaymentLoading(false);
//       setConfirmDialogOpen(false);
//     }
//   };

//   // Clear cart after successful payment
//   const clearCartAfterPayment = async () => {
//     try {
//       // Delete all cart items for the user
//       const deletePromises = cartItems.map(item =>
//         axios.delete(`${baseurl}/cart/${item.id}/`)
//       );
//       await Promise.all(deletePromises);
      
//       // Clear local cart state
//       setCartItems([]);
      
//       // Dispatch cart update event for navbar
//       window.dispatchEvent(new Event('cartUpdated'));
      
//       showSnackbar("Cart cleared after successful payment", "success");
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//     }
//   };

//   // Helper function to show snackbar
//   const showSnackbar = (message, severity) => {
//     setSnackbarMessage(message);
//     setSnackbarSeverity(severity);
//     setSnackbarOpen(true);
//     setTimeout(() => setSnackbarOpen(false), 3000);
//   };

//   // Handle continue shopping
//   const handleContinueShopping = () => {
//     navigate("/client-busineess-category");
//   };

//   // Handle dialog close
//   const handleDialogClose = () => {
//     setConfirmDialogOpen(false);
//     setMerchantOrderId(null);
//   };

//   // Get product image
//   const getProductImage = (item) => {
//     if (item.variant_details.media && item.variant_details.media.length > 0) {
//       const media = item.variant_details.media[0];
//       return `${baseurl}${media.file}`;
//     }
//     return "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400";
//   };

//   if (!userId) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="agent-cart-container">
//           <div className="agent-cart-empty text-center py-5">
//             <div className="empty-cart-icon mb-3">
//               <FaShoppingCart size={64} />
//             </div>
//             <h3 className="mb-3">Please Login</h3>
//             <p className="text-muted mb-4">
//               You need to be logged in to view your cart
//             </p>
//             <button 
//               className="btn btn-primary btn-lg"
//               onClick={() => navigate("/login")}
//             >
//               Go to Login
//             </button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   if (loading) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="agent-cart-container">
//           <div className="text-center py-5">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-3">Loading cart...</p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <AgentNavbar />
      
//       {/* Snackbar */}
//       {snackbarOpen && (
//         <div className={`agent-cart-snackbar ${snackbarSeverity}`}>
//           {snackbarMessage}
//         </div>
//       )}

//       {/* Payment Confirmation Dialog */}
//       {confirmDialogOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Confirm Payment</h5>
//               <button 
//                 type="button" 
//                 className="btn-close" 
//                 onClick={handleDialogClose}
//               ></button>
//             </div>
//             <div className="modal-body">
//               <p>Please confirm your payment to complete the order.</p>
//               {merchantOrderId && (
//                 <div className="mt-3 p-2 bg-light rounded">
//                   <small className="text-muted">
//                     Order ID: {merchantOrderId}
//                   </small>
//                 </div>
//               )}
//               <div className="mt-3 p-3 bg-light rounded">
//                 <h6 className="mb-2">Order Summary</h6>
//                 <div className="d-flex justify-content-between">
//                   <span>Total Items:</span>
//                   <span>{cartItems.length}</span>
//                 </div>
//                 <div className="d-flex justify-content-between mt-2">
//                   <span>Total Amount:</span>
//                   <span className="fw-bold">₹{calculateTotal().toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button 
//                 type="button" 
//                 className="btn btn-secondary" 
//                 onClick={handleDialogClose}
//               >
//                 Cancel
//               </button>
//               <button 
//                 type="button" 
//                 className="btn btn-primary" 
//                 onClick={handleConfirmPayment}
//                 disabled={paymentLoading}
//               >
//                 {paymentLoading ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2" role="status"></span>
//                     Processing...
//                   </>
//                 ) : (
//                   "Confirm Payment"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="agent-cart-container">
//         <div className="agent-cart-header">
//           <h1 className="agent-cart-title">
//             <FaShoppingCart className="me-2" />
//             Shopping Cart
//             {cartItems.length > 0 && (
//               <span className="cart-count-badge">{cartItems.length}</span>
//             )}
//           </h1>
//           <button 
//             className="btn btn-outline-secondary"
//             onClick={handleContinueShopping}
//           >
//             <FaArrowLeft className="me-2" />
//             Continue Shopping
//           </button>
//         </div>

//         {cartItems.length === 0 ? (
//           <div className="agent-cart-empty text-center py-5">
//             <div className="empty-cart-icon mb-3">
//               <FaShoppingCart size={64} />
//             </div>
//             <h3 className="mb-3">Your cart is empty</h3>
//             <p className="text-muted mb-4">
//               Add some products to your cart and they will appear here
//             </p>
//             <button 
//               className="btn btn-primary btn-lg"
//               onClick={handleContinueShopping}
//             >
//               Browse Products
//             </button>
//           </div>
//         ) : (
//           <div className="agent-cart-content">
//             <div className="cart-items-section">
//               <div className="cart-items-header">
//                 <h3>Cart Items ({cartItems.length})</h3>
//               </div>
              
//               <div className="cart-items-list">
//                 {cartItems.map((item) => {
//                   const variant = item.variant_details;
//                   const mrp = parseFloat(variant.mrp || 0);
//                   const price = parseFloat(variant.selling_price || 0);
//                   const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
//                   const attributes = variant.attributes || {};
//                   const displayAttributes = Object.entries(attributes).map(([key, value]) => 
//                     `${key.replace(/_/g, ' ')}: ${value}`
//                   ).join(', ');

//                   return (
//                     <div key={item.id} className="cart-item-card">
//                       <div className="cart-item-image">
//                         <img 
//                           src={getProductImage(item)} 
//                           alt={variant.sku}
//                           onError={(e) => {
//                             e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400";
//                           }}
//                         />
//                       </div>
                      
//                       <div className="cart-item-details">
//                         <div className="item-header">
//                           <h5 className="item-title">
//                             {variant.sku}
//                           </h5>
//                           <button 
//                             className="btn btn-danger btn-sm remove-btn"
//                             onClick={() => handleRemoveItem(item.id)}
//                             disabled={removingItem === item.id}
//                           >
//                             {removingItem === item.id ? (
//                               <span className="spinner-border spinner-border-sm" role="status"></span>
//                             ) : (
//                               <FaTrash />
//                             )}
//                           </button>
//                         </div>
                        
//                         {displayAttributes && (
//                           <p className="item-attributes text-muted small">
//                             {displayAttributes}
//                           </p>
//                         )}
                        
//                         <div className="item-pricing">
//                           <div className="price-display">
//                             <span className="current-price">₹{price.toFixed(2)}</span>
//                             {discount > 0 && (
//                               <>
//                                 <span className="original-price">₹{mrp.toFixed(2)}</span>
//                                 <span className="discount-badge">{discount}% OFF</span>
//                               </>
//                             )}
//                           </div>
                          
//                           <div className="item-stock">
//                             <span className={`stock-badge ${variant.stock > 10 ? 'in-stock' : 'low-stock'}`}>
//                               {variant.stock > 10 ? 'In Stock' : `Only ${variant.stock} left`}
//                             </span>
//                           </div>
//                         </div>
                        
//                         <div className="item-quantity">
//                           <div className="quantity-controls">
//                             <button 
//                               className="quantity-btn"
//                               onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
//                               disabled={item.quantity <= 1 || updatingItem === item.id}
//                             >
//                               <FaMinus />
//                             </button>
                            
//                             <span className="quantity-display">
//                               {updatingItem === item.id ? (
//                                 <span className="spinner-border spinner-border-sm" role="status"></span>
//                               ) : (
//                                 item.quantity
//                               )}
//                             </span>
                            
//                             <button 
//                               className="quantity-btn"
//                               onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
//                               disabled={item.quantity >= variant.stock || updatingItem === item.id}
//                             >
//                               <FaPlus />
//                             </button>
//                           </div>
                          
//                           <div className="item-subtotal">
//                             <span className="subtotal-label">Subtotal:</span>
//                             <span className="subtotal-amount">₹{item.subtotal.toFixed(2)}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
            
//             {/* Order Summary */}
//             <div className="order-summary-section">
//               <div className="order-summary-card">
//                 <h3 className="summary-title">Order Summary</h3>
                
//                 <div className="summary-details">
//                   <div className="summary-row">
//                     <span>Subtotal ({cartItems.length} items)</span>
//                     <span>₹{calculateSubtotal().toFixed(2)}</span>
//                   </div>
                  
//                   <div className="summary-row">
//                     <span>Tax</span>
//                     <span>₹{calculateTax().toFixed(2)}</span>
//                   </div>
                  
//                   <div className="summary-row shipping-row">
//                     <span>Shipping</span>
//                     <span className="free-shipping">FREE</span>
//                   </div>
                  
//                   <div className="summary-divider"></div>
                  
//                   <div className="summary-row total-row">
//                     <span className="total-label">Total</span>
//                     <span className="total-amount">₹{calculateTotal().toFixed(2)}</span>
//                   </div>
//                 </div>
                
//                 <div className="checkout-actions">
//                   <button 
//                     className="btn btn-primary checkout-btn"
//                     onClick={handleCheckout}
//                     disabled={paymentLoading || cartItems.length === 0}
//                   >
//                     {paymentLoading ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" role="status"></span>
//                         Processing...
//                       </>
//                     ) : (
//                       <>
//                         <FaCreditCard className="me-2" />
//                         Proceed to Checkout
//                       </>
//                     )}
//                   </button>
                  
//                   <button 
//                     className="btn btn-outline-secondary continue-btn"
//                     onClick={handleContinueShopping}
//                   >
//                     <FaArrowLeft className="me-2" />
//                     Continue Shopping
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default AgentCart;



import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AgentNavbar from "../../Client_Panel/Client_Navbar/Client_Navbar";
import { baseurl, redirecturl } from '../../BaseURL/BaseURL';
import "./AddToCart.css";
import { FaTrash, FaMinus, FaPlus, FaCreditCard, FaArrowLeft, FaShoppingCart, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

function ClientCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [updatingItem, setUpdatingItem] = useState(null);
  const [removingItem, setRemovingItem] = useState(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);
  
  const hasPostedStatus = useRef(false);
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
    
    // Check for pending payment confirmation on mount
    const checkPaymentStatus = async () => {
      const merchantOrderId = localStorage.getItem("merchant_order_id");
      
      if (merchantOrderId && !hasPostedStatus.current) {
        await confirmPayment(merchantOrderId);
      }
    };
    
    checkPaymentStatus();
  }, [userId]);

  // Confirm Payment function
  const confirmPayment = async (merchantOrderId) => {
    if (hasPostedStatus.current || !merchantOrderId) return;
    
    try {
      hasPostedStatus.current = true;
      console.log("Confirming payment for merchant_order_id:", merchantOrderId);
      
      const response = await axios.post(
        `${baseurl}/product/confirm-payment/`,
        {
          merchant_order_id: merchantOrderId
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log("Payment confirmation response:", response.data);
      
      if (response.data.status === "COMPLETED") {
        // Clear cart after successful payment
        await clearCartAfterPayment();
        
        // Clear localStorage
        localStorage.removeItem("merchant_order_id");
        localStorage.removeItem("order_id");
        localStorage.removeItem("payment_amount");
        
        showSnackbar("Payment confirmed successfully!", "success");
        
        // Show success dialog
        setPaymentInfo({
          status: "success",
          message: response.data.message,
          merchant_order_id: response.data.merchant_order_id,
          order_id: response.data.order_id,
          amount: response.data.amount / 100, // Convert from paise to rupees
          payment_details: response.data.payment_details
        });
        setPaymentDialogOpen(true);
        
        // Refresh cart data
        await fetchCartItems();
        
      } else {
        showSnackbar("Payment verification failed", "error");
      }
      
    } catch (error) {
      console.error("Error confirming payment:", error);
      hasPostedStatus.current = false; // Allow retry
      showSnackbar(
        error.response?.data?.message || "Payment confirmation failed",
        "error"
      );
    }
  };

  // Clear cart after successful payment
  const clearCartAfterPayment = async () => {
    try {
      // Get current cart items
      const currentCartResponse = await axios.get(`${baseurl}/cart/?user=${userId}`);
      const userCartItems = currentCartResponse.data.results || currentCartResponse.data || [];
      
      // Delete all cart items for the user
      const deletePromises = userCartItems.map(item =>
        axios.delete(`${baseurl}/cart/${item.id}/`)
      );
      await Promise.all(deletePromises);
      
      // Clear local cart state
      setCartItems([]);
      
      // Dispatch cart update event for navbar
      window.dispatchEvent(new Event('cartUpdated'));
      
      console.log("Cart cleared after successful payment");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

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
      const totalAmount = calculateTotal();

      console.log("Initiating payment with:", {
        user_id: parseInt(userId),
        redirect_url: `${redirecturl}/client-transactions`,
        amount: totalAmount
      });

      // Initiate payment with new API endpoint and payload
      const paymentResponse = await axios.post(
        `${baseurl}/product/initiate-payment/`,
        {
          user_id: parseInt(userId),
          redirect_url: `${redirecturl}/agent-transactions`,
          amount: totalAmount
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Payment initiation response:", paymentResponse.data);

      if (paymentResponse.data && paymentResponse.data.payment_url) {
        // Save payment info to localStorage for confirmation later
        localStorage.setItem('merchant_order_id', paymentResponse.data.merchant_order_id);
        localStorage.setItem('order_id', paymentResponse.data.order_id);
        localStorage.setItem('payment_amount', totalAmount.toString());
        
        // Clear hasPostedStatus flag since we're starting a new payment
        hasPostedStatus.current = false;
        
        // Redirect to payment gateway
        window.location.href = paymentResponse.data.payment_url;
      } else {
        showSnackbar("Payment initialization failed", "error");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      showSnackbar(
        error.response?.data?.message || error.response?.data?.detail || "Failed to initiate payment",
        "error"
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  // Handle payment dialog close
  const handlePaymentDialogClose = () => {
    setPaymentDialogOpen(false);
    setPaymentInfo(null);
    navigate("/client-transactions");
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
        <AgentNavbar />
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
        <AgentNavbar />
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
      <AgentNavbar />
      
      {/* Snackbar */}
      {snackbarOpen && (
        <div className={`agent-cart-snackbar ${snackbarSeverity}`}>
          {snackbarSeverity === "success" ? <FaCheckCircle className="me-2" /> : <FaExclamationCircle className="me-2" />}
          {snackbarMessage}
        </div>
      )}

      {/* Payment Success Dialog */}
      {paymentDialogOpen && paymentInfo && (
        <div className="payment-dialog-overlay">
          <div className="payment-dialog">
            <div className="payment-dialog-header">
              <FaCheckCircle className="text-success me-2" size={32} />
              <h3>Payment Successful!</h3>
            </div>
            <div className="payment-dialog-body">
              <p>{paymentInfo.message}</p>
              <div className="payment-details">
                <div className="payment-detail-row">
                  <span>Order ID:</span>
                  <strong>{paymentInfo.order_id}</strong>
                </div>
                <div className="payment-detail-row">
                  <span>Merchant Order ID:</span>
                  <strong>{paymentInfo.merchant_order_id}</strong>
                </div>
                <div className="payment-detail-row">
                  <span>Amount Paid:</span>
                  <strong>₹{paymentInfo.amount.toFixed(2)}</strong>
                </div>
                {paymentInfo.payment_details && paymentInfo.payment_details.length > 0 && (
                  <div className="payment-detail-row">
                    <span>Transaction ID:</span>
                    <strong>{paymentInfo.payment_details[0].transaction_id}</strong>
                  </div>
                )}
              </div>
            </div>
            <div className="payment-dialog-footer">
              <button 
                className="btn btn-primary"
                onClick={handlePaymentDialogClose}
              >
                View Transactions
              </button>
            </div>
          </div>
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
              {paymentInfo ? "Your order has been placed successfully!" : "Add some products to your cart and they will appear here"}
            </p>
            <button 
              className="btn btn-primary btn-lg"
              onClick={handleContinueShopping}
            >
              {paymentInfo ? "Continue Shopping" : "Browse Products"}
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
                      <div className="cart-item-image">
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
                          <h5 className="item-title">
                            {variant.sku}
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
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ClientCart;