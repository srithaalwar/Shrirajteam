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



// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AgentNavbar from "../../Client_Panel/Client_Navbar/Client_Navbar";
// import { baseurl, redirecturl } from '../../BaseURL/BaseURL';
// import "./AddToCart.css";
// import { FaTrash, FaMinus, FaPlus, FaCreditCard, FaArrowLeft, FaShoppingCart, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

// function ClientCart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [paymentLoading, setPaymentLoading] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [updatingItem, setUpdatingItem] = useState(null);
//   const [removingItem, setRemovingItem] = useState(null);
//   const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
//   const [paymentInfo, setPaymentInfo] = useState(null);
  
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
    
//     // Check for pending payment confirmation on mount
//     const checkPaymentStatus = async () => {
//       const merchantOrderId = localStorage.getItem("merchant_order_id");
      
//       if (merchantOrderId && !hasPostedStatus.current) {
//         await confirmPayment(merchantOrderId);
//       }
//     };
    
//     checkPaymentStatus();
//   }, [userId]);

//   // Confirm Payment function
//   const confirmPayment = async (merchantOrderId) => {
//     if (hasPostedStatus.current || !merchantOrderId) return;
    
//     try {
//       hasPostedStatus.current = true;
//       console.log("Confirming payment for merchant_order_id:", merchantOrderId);
      
//       const response = await axios.post(
//         `${baseurl}/product/confirm-payment/`,
//         {
//           merchant_order_id: merchantOrderId
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );
      
//       console.log("Payment confirmation response:", response.data);
      
//       if (response.data.status === "COMPLETED") {
//         // Clear cart after successful payment
//         await clearCartAfterPayment();
        
//         // Clear localStorage
//         localStorage.removeItem("merchant_order_id");
//         localStorage.removeItem("order_id");
//         localStorage.removeItem("payment_amount");
        
//         showSnackbar("Payment confirmed successfully!", "success");
        
//         // Show success dialog
//         setPaymentInfo({
//           status: "success",
//           message: response.data.message,
//           merchant_order_id: response.data.merchant_order_id,
//           order_id: response.data.order_id,
//           amount: response.data.amount / 100, // Convert from paise to rupees
//           payment_details: response.data.payment_details
//         });
//         setPaymentDialogOpen(true);
        
//         // Refresh cart data
//         await fetchCartItems();
        
//       } else {
//         showSnackbar("Payment verification failed", "error");
//       }
      
//     } catch (error) {
//       console.error("Error confirming payment:", error);
//       hasPostedStatus.current = false; // Allow retry
//       showSnackbar(
//         error.response?.data?.message || "Payment confirmation failed",
//         "error"
//       );
//     }
//   };

//   // Clear cart after successful payment
//   const clearCartAfterPayment = async () => {
//     try {
//       // Get current cart items
//       const currentCartResponse = await axios.get(`${baseurl}/cart/?user=${userId}`);
//       const userCartItems = currentCartResponse.data.results || currentCartResponse.data || [];
      
//       // Delete all cart items for the user
//       const deletePromises = userCartItems.map(item =>
//         axios.delete(`${baseurl}/cart/${item.id}/`)
//       );
//       await Promise.all(deletePromises);
      
//       // Clear local cart state
//       setCartItems([]);
      
//       // Dispatch cart update event for navbar
//       window.dispatchEvent(new Event('cartUpdated'));
      
//       console.log("Cart cleared after successful payment");
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//     }
//   };

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
//           redirect_url: `${redirecturl}/agent-transactions`,
//           amount: totalAmount
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       console.log("Payment initiation response:", paymentResponse.data);

//       if (paymentResponse.data && paymentResponse.data.payment_url) {
//         // Save payment info to localStorage for confirmation later
//         localStorage.setItem('merchant_order_id', paymentResponse.data.merchant_order_id);
//         localStorage.setItem('order_id', paymentResponse.data.order_id);
//         localStorage.setItem('payment_amount', totalAmount.toString());
        
//         // Clear hasPostedStatus flag since we're starting a new payment
//         hasPostedStatus.current = false;
        
//         // Redirect to payment gateway
//         window.location.href = paymentResponse.data.payment_url;
//       } else {
//         showSnackbar("Payment initialization failed", "error");
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

//   // Handle payment dialog close
//   const handlePaymentDialogClose = () => {
//     setPaymentDialogOpen(false);
//     setPaymentInfo(null);
//     navigate("/client-transactions");
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
//           {snackbarSeverity === "success" ? <FaCheckCircle className="me-2" /> : <FaExclamationCircle className="me-2" />}
//           {snackbarMessage}
//         </div>
//       )}

//       {/* Payment Success Dialog */}
//       {paymentDialogOpen && paymentInfo && (
//         <div className="payment-dialog-overlay">
//           <div className="payment-dialog">
//             <div className="payment-dialog-header">
//               <FaCheckCircle className="text-success me-2" size={32} />
//               <h3>Payment Successful!</h3>
//             </div>
//             <div className="payment-dialog-body">
//               <p>{paymentInfo.message}</p>
//               <div className="payment-details">
//                 <div className="payment-detail-row">
//                   <span>Order ID:</span>
//                   <strong>{paymentInfo.order_id}</strong>
//                 </div>
//                 <div className="payment-detail-row">
//                   <span>Merchant Order ID:</span>
//                   <strong>{paymentInfo.merchant_order_id}</strong>
//                 </div>
//                 <div className="payment-detail-row">
//                   <span>Amount Paid:</span>
//                   <strong>₹{paymentInfo.amount.toFixed(2)}</strong>
//                 </div>
//                 {paymentInfo.payment_details && paymentInfo.payment_details.length > 0 && (
//                   <div className="payment-detail-row">
//                     <span>Transaction ID:</span>
//                     <strong>{paymentInfo.payment_details[0].transaction_id}</strong>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="payment-dialog-footer">
//               <button 
//                 className="btn btn-primary"
//                 onClick={handlePaymentDialogClose}
//               >
//                 View Transactions
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
//               {paymentInfo ? "Your order has been placed successfully!" : "Add some products to your cart and they will appear here"}
//             </p>
//             <button 
//               className="btn btn-primary btn-lg"
//               onClick={handleContinueShopping}
//             >
//               {paymentInfo ? "Continue Shopping" : "Browse Products"}
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

// export default ClientCart;




// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AgentNavbar from "../../Client_Panel/Client_Navbar/Client_Navbar";import { baseurl, redirecturl } from '../../BaseURL/BaseURL';
// import "./AddToCart.css";
// import { FaTrash, FaMinus, FaPlus, FaCreditCard, FaArrowLeft, FaShoppingCart, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

// function AgentCart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [paymentLoading, setPaymentLoading] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [updatingItem, setUpdatingItem] = useState(null);
//   const [removingItem, setRemovingItem] = useState(null);
//   const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
//   const [paymentInfo, setPaymentInfo] = useState(null);
//   const [retryCount, setRetryCount] = useState(0);
  
//   const hasPostedStatus = useRef(false);
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("user_id");
  
//   const MAX_RETRIES = 3;

//   // Helper function to check URL for payment parameters
//   const checkURLForPaymentStatus = () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const paymentStatus = urlParams.get('payment_status');
//     const merchantOrderId = urlParams.get('merchant_order_id');
//     const orderId = urlParams.get('order_id');
//     const status = urlParams.get('status');
    
//     console.log("URL Parameters:", {
//       paymentStatus,
//       merchantOrderId,
//       orderId,
//       status
//     });
    
//     // If we have payment status in URL, update localStorage
//     if (merchantOrderId) {
//       localStorage.setItem('merchant_order_id', merchantOrderId);
      
//       if (orderId) {
//         localStorage.setItem('order_id', orderId);
//       }
      
//       if (paymentStatus || status) {
//         localStorage.setItem('payment_status', paymentStatus || status);
//       }
      
//       // Clear URL parameters
//       if (window.history.replaceState) {
//         const newUrl = window.location.pathname;
//         window.history.replaceState({}, document.title, newUrl);
//       }
      
//       return true;
//     }
    
//     return false;
//   };

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
      
//       const response = await axios.get(`${baseurl}/cart/?user=${userId}`, {
//         timeout: 10000
//       });
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

//   // Clear cart after successful payment
//   const clearCartAfterPayment = async () => {
//     try {
//       // Get current cart items
//       const currentCartResponse = await axios.get(`${baseurl}/cart/?user=${userId}`, {
//         timeout: 5000
//       });
//       const userCartItems = currentCartResponse.data.results || currentCartResponse.data || [];
      
//       // Delete all cart items for the user
//       const deletePromises = userCartItems.map(item =>
//         axios.delete(`${baseurl}/cart/${item.id}/`, {
//           timeout: 5000
//         })
//       );
//       await Promise.all(deletePromises);
      
//       // Clear local cart state
//       setCartItems([]);
      
//       // Dispatch cart update event for navbar
//       window.dispatchEvent(new Event('cartUpdated'));
      
//       console.log("Cart cleared after successful payment");
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//     }
//   };

//   // Confirm Payment function with retry logic
//   const confirmPayment = async (merchantOrderId, retry = false) => {
//     // Don't proceed if already processing or no merchant order id
//     if ((hasPostedStatus.current && !retry) || !merchantOrderId) {
//       console.log("Skipping payment confirmation - already processing or no order id");
//       return;
//     }
    
//     try {
//       if (!retry) {
//         hasPostedStatus.current = true;
//         console.log("Starting payment confirmation for merchant_order_id:", merchantOrderId);
//       } else {
//         console.log("Retrying payment confirmation, attempt:", retryCount + 1);
//       }
      
//       const response = await axios.post(
//         `${baseurl}/product/confirm-payment/`,
//         {
//           merchant_order_id: merchantOrderId,
//           user_id: parseInt(userId)
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           timeout: 15000 // 15 second timeout
//         }
//       );
      
//       console.log("Payment confirmation response:", response.data);
      
//       // Handle different response formats
//       if (response.data.status === "COMPLETED" || response.data.status === "success" || response.data.success) {
//         // Clear cart after successful payment
//         await clearCartAfterPayment();
        
//         // Clear localStorage
//         localStorage.removeItem("merchant_order_id");
//         localStorage.removeItem("order_id");
//         localStorage.removeItem("payment_amount");
//         localStorage.removeItem("payment_status");
        
//         showSnackbar("Payment confirmed successfully!", "success");
        
//         // Show success dialog
//         setPaymentInfo({
//           status: "success",
//           message: response.data.message || "Payment completed successfully",
//           merchant_order_id: response.data.merchant_order_id || merchantOrderId,
//           order_id: response.data.order_id || localStorage.getItem("order_id"),
//           amount: (response.data.amount || localStorage.getItem("payment_amount") || 0) / 100,
//           payment_details: response.data.payment_details || []
//         });
//         setPaymentDialogOpen(true);
        
//         // Reset retry count on success
//         setRetryCount(0);
        
//         // Refresh cart data
//         await fetchCartItems();
        
//       } else {
//         showSnackbar(response.data.message || "Payment verification pending", "warning");
//         // Reset hasPostedStatus to allow retry
//         hasPostedStatus.current = false;
        
//         // Clear localStorage if payment failed
//         if (response.data.status === "FAILED" || response.data.status === "failed") {
//           localStorage.removeItem("merchant_order_id");
//           localStorage.removeItem("order_id");
//           localStorage.removeItem("payment_amount");
//           localStorage.removeItem("payment_status");
//         }
//       }
      
//     } catch (error) {
//       console.error("Error confirming payment:", error);
      
//       // If not a retry, reset the flag
//       if (!retry) {
//         hasPostedStatus.current = false;
//       }
      
//       // Check if we should retry
//       if (retryCount < MAX_RETRIES && !retry) {
//         const newRetryCount = retryCount + 1;
//         setRetryCount(newRetryCount);
        
//         // Retry after delay
//         setTimeout(() => {
//           confirmPayment(merchantOrderId, true);
//         }, 2000);
        
//         showSnackbar(`Verifying payment... (Attempt ${newRetryCount}/${MAX_RETRIES})`, "info");
//       } else {
//         // Max retries reached or this was already a retry
//         const errorMessage = error.response?.data?.message || 
//                             error.response?.data?.detail || 
//                             "Payment verification failed. Please check your transactions page.";
        
//         showSnackbar(errorMessage, "error");
        
//         // Clear localStorage on final error
//         localStorage.removeItem("merchant_order_id");
//         localStorage.removeItem("order_id");
//         localStorage.removeItem("payment_amount");
//         localStorage.removeItem("payment_status");
        
//         // Reset retry count
//         setRetryCount(0);
//       }
//     }
//   };

//   // Initial fetch and payment status check
//   useEffect(() => {
//     const initializeComponent = async () => {
//       // First, check URL for payment parameters
//       const hasPaymentInURL = checkURLForPaymentStatus();
      
//       // Fetch cart items
//       await fetchCartItems();
      
//       // Check for pending payment confirmation
//       const merchantOrderId = localStorage.getItem("merchant_order_id");
//       const paymentStatus = localStorage.getItem("payment_status");
//       const orderId = localStorage.getItem("order_id");
      
//       console.log("Payment status check:", {
//         merchantOrderId,
//         paymentStatus,
//         orderId,
//         hasPaymentInURL
//       });
      
//       // Only confirm payment if we have all required data
//       if (merchantOrderId && orderId && (paymentStatus === 'success' || hasPaymentInURL)) {
//         await confirmPayment(merchantOrderId);
//       } else if (merchantOrderId && !paymentStatus) {
//         // If we have merchant order id but no status, user might have manually navigated
//         console.log("Clearing stale payment data");
//         localStorage.removeItem("merchant_order_id");
//         localStorage.removeItem("order_id");
//         localStorage.removeItem("payment_amount");
//         localStorage.removeItem("payment_status");
//       }
//     };
    
//     initializeComponent();
    
//     // Cleanup function
//     return () => {
//       // Reset retry count on unmount
//       setRetryCount(0);
//     };
//   }, [userId]);

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
//       }, {
//         timeout: 5000
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
//       await axios.delete(`${baseurl}/cart/${cartItemId}/`, {
//         timeout: 5000
//       });
      
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
//           amount: totalAmount
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           timeout: 15000
//         }
//       );

//       console.log("Payment initiation response:", paymentResponse.data);

//       if (paymentResponse.data && paymentResponse.data.payment_url) {
//         // Save payment info to localStorage for confirmation later
//         localStorage.setItem('merchant_order_id', paymentResponse.data.merchant_order_id);
//         localStorage.setItem('order_id', paymentResponse.data.order_id);
//         localStorage.setItem('payment_amount', totalAmount.toString());
//         localStorage.removeItem('payment_status'); // Clear any previous status
        
//         // Reset payment confirmation flag since we're starting a new payment
//         hasPostedStatus.current = false;
//         setRetryCount(0);
        
//         // Redirect to payment gateway
//         window.location.href = paymentResponse.data.payment_url;
//       } else {
//         showSnackbar("Payment initialization failed", "error");
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

//   // Handle payment dialog close
//   const handlePaymentDialogClose = () => {
//     setPaymentDialogOpen(false);
//     setPaymentInfo(null);
//     navigate("/client-transactions");
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

//   // Get product image
//   const getProductImage = (item) => {
//     if (item.variant_details.media && item.variant_details.media.length > 0) {
//       const media = item.variant_details.media[0];
//       return `${baseurl}${media.file}`;
//     }
//     return "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400";
//   };

//   // Handle manual payment verification
//   const handleManualVerification = () => {
//     const merchantOrderId = localStorage.getItem("merchant_order_id");
//     if (merchantOrderId) {
//       hasPostedStatus.current = false;
//       setRetryCount(0);
//       confirmPayment(merchantOrderId);
//     }
//   };

//   // Clear payment status
//   const handleClearPaymentStatus = () => {
//     localStorage.removeItem("merchant_order_id");
//     localStorage.removeItem("order_id");
//     localStorage.removeItem("payment_amount");
//     localStorage.removeItem("payment_status");
//     hasPostedStatus.current = false;
//     setRetryCount(0);
//     showSnackbar("Payment status cleared", "info");
//     window.location.reload();
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
//           {snackbarSeverity === "success" ? <FaCheckCircle className="me-2" /> : <FaExclamationCircle className="me-2" />}
//           {snackbarMessage}
//         </div>
//       )}

//       {/* Payment Success Dialog */}
//       {paymentDialogOpen && paymentInfo && (
//         <div className="payment-dialog-overlay">
//           <div className="payment-dialog">
//             <div className="payment-dialog-header">
//               <FaCheckCircle className="text-success me-2" size={32} />
//               <h3>Payment Successful!</h3>
//             </div>
//             <div className="payment-dialog-body">
//               <p>{paymentInfo.message}</p>
//               <div className="payment-details">
//                 <div className="payment-detail-row">
//                   <span>Order ID:</span>
//                   <strong>{paymentInfo.order_id}</strong>
//                 </div>
//                 <div className="payment-detail-row">
//                   <span>Merchant Order ID:</span>
//                   <strong>{paymentInfo.merchant_order_id}</strong>
//                 </div>
//                 <div className="payment-detail-row">
//                   <span>Amount Paid:</span>
//                   <strong>₹{paymentInfo.amount.toFixed(2)}</strong>
//                 </div>
//                 {paymentInfo.payment_details && paymentInfo.payment_details.length > 0 && (
//                   <div className="payment-detail-row">
//                     <span>Transaction ID:</span>
//                     <strong>{paymentInfo.payment_details[0].transaction_id}</strong>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="payment-dialog-footer">
//               <button 
//                 className="btn btn-primary"
//                 onClick={handlePaymentDialogClose}
//               >
//                 View Transactions
//               </button>
//               <button 
//                 className="btn btn-outline-secondary ms-2"
//                 onClick={() => {
//                   setPaymentDialogOpen(false);
//                   setPaymentInfo(null);
//                   handleContinueShopping();
//                 }}
//               >
//                 Continue Shopping
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="agent-cart-container">
//         {/* Payment Status Alert */}
//         {cartItems.length === 0 && localStorage.getItem("merchant_order_id") && !paymentDialogOpen && (
//           <div className="payment-verification-alert mb-4">
//             <div className="alert alert-warning d-flex align-items-center justify-content-between">
//               <div>
//                 <FaExclamationCircle className="me-2" />
//                 <span>Payment verification in progress...</span>
//               </div>
//               <div>
//                 <button 
//                   className="btn btn-sm btn-outline-warning me-2"
//                   onClick={handleManualVerification}
//                   disabled={hasPostedStatus.current}
//                 >
//                   {hasPostedStatus.current ? 'Verifying...' : 'Check Status'}
//                 </button>
//                 <button 
//                   className="btn btn-sm btn-outline-secondary"
//                   onClick={handleClearPaymentStatus}
//                 >
//                   Clear Status
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

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
//               {paymentInfo ? "Your order has been placed successfully!" : "Add some products to your cart and they will appear here"}
//             </p>
//             <button 
//               className="btn btn-primary btn-lg"
//               onClick={handleContinueShopping}
//             >
//               {paymentInfo ? "Continue Shopping" : "Browse Products"}
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
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AgentNavbar from "../../Client_Panel/Client_Navbar/Client_Navbar";
import { baseurl, redirecturl } from '../../BaseURL/BaseURL';
import "./AddToCart.css";
import { FaTrash, FaMinus, FaPlus, FaCreditCard, FaArrowLeft, FaShoppingCart, FaCheckCircle, FaExclamationCircle, FaTimes, FaMoneyBillWave, FaTruck, FaMapMarkerAlt, FaUser, FaPhone, FaCity, FaFlag } from "react-icons/fa";

function ClientCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [updatingItem, setUpdatingItem] = useState(null);
  const [removingItem, setRemovingItem] = useState(null);
  const [paymentSuccessOpen, setPaymentSuccessOpen] = useState(false);
  const [paymentSuccessInfo, setPaymentSuccessInfo] = useState(null);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  
  // New state for payment method and addresses
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [shippingAddress, setShippingAddress] = useState({
    full_name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
  });
  const [billingAddress, setBillingAddress] = useState({
    full_name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
  });
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [addressErrors, setAddressErrors] = useState({});
  const [addressTouched, setAddressTouched] = useState({});
  
  const paymentVerifiedRef = useRef(false);
  const paymentTimerRef = useRef(null);
  const location = useLocation();
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
      
      const response = await axios.get(`${baseurl}/cart/?user=${userId}`, {
        timeout: 10000
      });
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

  // Validate address fields
  const validateAddress = (address, type) => {
    const errors = {};
    
    if (!address.full_name?.trim()) {
      errors[`${type}_full_name`] = "Full name is required";
    }
    
    if (!address.phone?.trim()) {
      errors[`${type}_phone`] = "Phone number is required";
    } else if (!/^\d{10}$/.test(address.phone)) {
      errors[`${type}_phone`] = "Enter a valid 10-digit phone number";
    }
    
    if (!address.address_line1?.trim()) {
      errors[`${type}_address_line1`] = "Address line 1 is required";
    }
    
    if (!address.city?.trim()) {
      errors[`${type}_city`] = "City is required";
    }
    
    if (!address.state?.trim()) {
      errors[`${type}_state`] = "State is required";
    }
    
    if (!address.pincode?.trim()) {
      errors[`${type}_pincode`] = "Pincode is required";
    } else if (!/^\d{6}$/.test(address.pincode)) {
      errors[`${type}_pincode`] = "Enter a valid 6-digit pincode";
    }
    
    return errors;
  };

  // Validate all addresses based on payment method
  const validateAddresses = () => {
    let errors = {};
    
    // Always validate shipping address
    errors = { ...errors, ...validateAddress(shippingAddress, 'shipping') };
    
    // Validate billing address if not same as shipping
    if (!sameAsShipping) {
      errors = { ...errors, ...validateAddress(billingAddress, 'billing') };
    }
    
    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle address input change
  const handleAddressChange = (type, field, value) => {
    if (type === 'shipping') {
      setShippingAddress(prev => ({ ...prev, [field]: value }));
      
      // If same as shipping is checked, update billing too
      if (sameAsShipping) {
        setBillingAddress(prev => ({ ...prev, [field]: value }));
      }
    } else {
      setBillingAddress(prev => ({ ...prev, [field]: value }));
    }
    
    // Mark field as touched
    setAddressTouched(prev => ({ ...prev, [`${type}_${field}`]: true }));
    
    // Clear error for this field
    if (addressErrors[`${type}_${field}`]) {
      setAddressErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${type}_${field}`];
        return newErrors;
      });
    }
  };

  // Handle same as shipping checkbox
  const handleSameAsShippingChange = (e) => {
    const checked = e.target.checked;
    setSameAsShipping(checked);
    
    if (checked) {
      // Copy shipping address to billing
      setBillingAddress({ ...shippingAddress });
      
      // Clear billing address errors
      setAddressErrors(prev => {
        const newErrors = { ...prev };
        Object.keys(newErrors).forEach(key => {
          if (key.startsWith('billing_')) {
            delete newErrors[key];
          }
        });
        return newErrors;
      });
    }
  };

  // Clear cart after successful payment
  const clearCartAfterPayment = async () => {
    try {
      if (!userId) return;
      
      // Get current cart items
      const currentCartResponse = await axios.get(`${baseurl}/cart/?user=${userId}`, {
        timeout: 5000
      });
      const userCartItems = currentCartResponse.data.results || currentCartResponse.data || [];
      
      // Delete all cart items for the user
      const deletePromises = userCartItems.map(item =>
        axios.delete(`${baseurl}/cart/${item.id}/`, {
          timeout: 5000
        }).catch(err => {
          console.warn(`Failed to delete cart item ${item.id}:`, err);
          return Promise.resolve();
        })
      );
      await Promise.all(deletePromises);
      
      // Clear local cart state
      setCartItems([]);
      
      // Dispatch cart update event for navbar
      window.dispatchEvent(new Event('cartUpdated'));
      
      console.log("Cart cleared after successful payment");
      return true;
    } catch (error) {
      console.error("Error clearing cart:", error);
      return false;
    }
  };

  // Check URL for payment parameters
  const checkURLForPaymentParams = () => {
    const searchParams = new URLSearchParams(location.search);
    const merchantOrderId = searchParams.get('merchant_order_id');
    const paymentStatus = searchParams.get('payment_status');
    const orderId = searchParams.get('order_id');
    
    console.log("Checking URL for payment params:", {
      merchantOrderId,
      paymentStatus,
      orderId
    });
    
    if (merchantOrderId) {
      // Save to localStorage
      localStorage.setItem('merchant_order_id', merchantOrderId);
      if (paymentStatus) localStorage.setItem('payment_status', paymentStatus);
      if (orderId) localStorage.setItem('order_id', orderId);
      
      // Clean the URL
      window.history.replaceState({}, '', window.location.pathname);
      
      return merchantOrderId;
    }
    
    return null;
  };

  // Show payment success alert
  const showPaymentSuccessAlert = (paymentData) => {
    setPaymentSuccessInfo({
      merchant_order_id: paymentData.merchant_order_id || paymentData.merchantOrderId,
      order_id: paymentData.order_id || paymentData.orderId,
      amount: paymentData.amount || calculateTotal(),
      message: paymentData.message || "Your payment was successful!",
      timestamp: new Date().toLocaleString()
    });
    setPaymentSuccessOpen(true);
    setPaymentVerified(true);
  };

  // Close payment success alert
  const closePaymentSuccessAlert = () => {
    setPaymentSuccessOpen(false);
    setPaymentSuccessInfo(null);
    
    // Clear localStorage
    localStorage.removeItem("merchant_order_id");
    localStorage.removeItem("order_id");
    localStorage.removeItem("payment_status");
    
    // Reset verification flag
    paymentVerifiedRef.current = false;
    setPaymentVerified(false);
    
    // Refresh cart data
    fetchCartItems();
  };

  // Confirm Payment function
  const confirmPayment = async (merchantOrderId) => {
    if (!merchantOrderId || paymentVerifiedRef.current) {
      console.log("No merchant order ID or payment already verified");
      return;
    }

    try {
      setIsVerifyingPayment(true);
      paymentVerifiedRef.current = true;
      
      console.log("Calling confirm-payment API with:", { merchant_order_id: merchantOrderId });
      
      const response = await axios.post(
        `${baseurl}/product/confirm-payment/`,
        {
          merchant_order_id: merchantOrderId
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 15000
        }
      );
      
      console.log("Payment confirmation response:", response.data);
      
      const paymentData = response.data;
      
      if (paymentData.status === "success" || paymentData.status === "SUCCESS") {
        // Payment successful
        showSnackbar("Payment confirmed successfully!", "success");
        
        // Clear cart
        const cleared = await clearCartAfterPayment();
        
        if (cleared) {
          // Show payment success alert
          showPaymentSuccessAlert(paymentData);
        }
        
      } else if (paymentData.status === "pending" || paymentData.status === "PENDING") {
        // Payment still pending
        showSnackbar("Payment is still pending. We'll check again in 30 seconds.", "info");
        
        // Reset verified flag to allow retry
        paymentVerifiedRef.current = false;
        
        // Schedule retry in 30 seconds
        paymentTimerRef.current = setTimeout(() => {
          console.log("30 seconds passed, retrying payment confirmation...");
          confirmPayment(merchantOrderId);
        }, 30000);
        
      } else {
        // Payment failed
        showSnackbar(paymentData.message || "Payment verification failed", "error");
        localStorage.removeItem("merchant_order_id");
        localStorage.removeItem("order_id");
        localStorage.removeItem("payment_status");
      }
      fetchCartItems()
      
    } catch (error) {
      console.error("Error confirming payment:", error);
      showSnackbar("Payment verification failed. Please try again.", "error");
      
      // Reset verified flag on error
      paymentVerifiedRef.current = false;
      
      // Retry in 30 seconds on network errors
      if (error.code === 'ECONNABORTED' || !error.response) {
        paymentTimerRef.current = setTimeout(() => {
          console.log("Network error, retrying payment confirmation in 30 seconds...");
          confirmPayment(merchantOrderId);
        }, 30000);
      } else {
        localStorage.removeItem("merchant_order_id");
        localStorage.removeItem("order_id");
        localStorage.removeItem("payment_status");
      }
    } finally {
      setIsVerifyingPayment(false);
    }
  };

  // Initialize component
  useEffect(() => {
    const initialize = async () => {
      await fetchCartItems();
      
      // Check URL for payment parameters
      const merchantOrderIdFromURL = checkURLForPaymentParams();
      
      // Check localStorage for pending payment
      const merchantOrderId = merchantOrderIdFromURL || localStorage.getItem("merchant_order_id");
      const paymentStatus = localStorage.getItem("payment_status");
      
      console.log("Initial payment check:", {
        merchantOrderIdFromURL,
        merchantOrderId,
        paymentStatus,
        pathname: location.pathname,
        search: location.search
      });
      
      // If we have a merchant order ID, confirm payment
      if (merchantOrderId && !paymentVerifiedRef.current && !paymentVerified) {
        console.log("Found merchant order ID, starting payment verification:", merchantOrderId);
        
        // Wait 1 second before first check to ensure page is loaded
        setTimeout(() => {
          confirmPayment(merchantOrderId);
        }, 1000);
      }
    };
    
    initialize();
    
    // Cleanup timers on unmount
    return () => {
      if (paymentTimerRef.current) {
        clearTimeout(paymentTimerRef.current);
      }
    };
  }, [location.search]);

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
      }, {
        timeout: 5000
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
      await axios.delete(`${baseurl}/cart/${cartItemId}/`, {
        timeout: 5000
      });
      
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

    // Validate addresses
    if (!validateAddresses()) {
      showSnackbar("Please fill in all required address fields", "error");
      // Mark all fields as touched to show errors
      const allFields = {};
      ['shipping', 'billing'].forEach(type => {
        ['full_name', 'phone', 'address_line1', 'city', 'state', 'pincode'].forEach(field => {
          if (!(type === 'billing' && sameAsShipping)) {
            allFields[`${type}_${field}`] = true;
          }
        });
      });
      setAddressTouched(allFields);
      return;
    }

    setPaymentLoading(true);
    try {
      console.log("Initiating payment for user:", userId);
      console.log("Payment method:", paymentMethod);

      // Prepare payment payload
      const paymentPayload = {
        user_id: parseInt(userId),
        payment_method: paymentMethod,
        shipping_address: shippingAddress
      };

      // Add billing address (either same as shipping or separate)
      if (sameAsShipping) {
        paymentPayload.billing_address = shippingAddress;
      } else {
        paymentPayload.billing_address = billingAddress;
      }

      // Add redirect_url only for online payment
      if (paymentMethod === "online") {
        paymentPayload.redirect_url = `${redirecturl}/client-add-to-cart`;
      }

      console.log("Payment payload:", paymentPayload);

      const paymentResponse = await axios.post(
        `${baseurl}/product/initiate-payment/`,
        paymentPayload,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 15000
        }
      );

      console.log("Payment initiation response:", paymentResponse.data);

      if (paymentMethod === "online") {
        // Online payment - redirect to payment gateway
        if (paymentResponse.data && paymentResponse.data.payment_url) {
          // Save merchant order id to localStorage
          localStorage.setItem('merchant_order_id', paymentResponse.data.merchant_order_id);
          localStorage.setItem('order_id', paymentResponse.data.order_id);
          
          // Reset verification flag
          paymentVerifiedRef.current = false;
          setPaymentVerified(false);
          
          // Redirect to payment gateway
          window.location.href = paymentResponse.data.payment_url;
        } else {
          showSnackbar("Payment initialization failed", "error");
        }
      } else {
        // COD payment - show success message and clear cart
        showSnackbar("Order placed successfully with COD!", "success");
        
        // Clear cart
        await clearCartAfterPayment();
        
        // Show success message with order details
        setPaymentSuccessInfo({
          order_id: paymentResponse.data.order_id,
          amount: calculateTotal(),
          message: "Your order has been placed successfully with Cash on Delivery",
          timestamp: new Date().toLocaleString()
        });
        setPaymentSuccessOpen(true);
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
    setTimeout(() => setSnackbarOpen(false), 4000);
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

  // Manual verification for testing
  const handleManualVerification = () => {
    const merchantOrderId = localStorage.getItem("merchant_order_id");
    if (merchantOrderId) {
      paymentVerifiedRef.current = false;
      setPaymentVerified(false);
      confirmPayment(merchantOrderId);
    }
  };

  // Render address form with icons
  const renderAddressForm = (type, address, title) => {
    const prefix = type === 'shipping' ? 'shipping' : 'billing';
    
    return (
      <div className="address-form-section">
        <h6 className="address-form-title">
          {type === 'shipping' ? <FaTruck className="me-2" /> : <FaCreditCard className="me-2" />}
          {title}
        </h6>
        
        <div className="address-form-grid">
          <div className="form-group">
            <label className="form-label">
              <FaUser className="me-1" size={12} />
              Full Name *
            </label>
            <input
              type="text"
              className={`form-control ${addressTouched[`${prefix}_full_name`] && addressErrors[`${prefix}_full_name`] ? 'is-invalid' : ''}`}
              value={address.full_name}
              onChange={(e) => handleAddressChange(type, 'full_name', e.target.value)}
              onBlur={() => setAddressTouched(prev => ({ ...prev, [`${prefix}_full_name`]: true }))}
              placeholder="Enter full name"
            />
            {addressTouched[`${prefix}_full_name`] && addressErrors[`${prefix}_full_name`] && (
              <div className="invalid-feedback">{addressErrors[`${prefix}_full_name`]}</div>
            )}
          </div>
          
          <div className="form-group">
            <label className="form-label">
              <FaPhone className="me-1" size={12} />
              Phone Number *
            </label>
            <input
              type="tel"
              className={`form-control ${addressTouched[`${prefix}_phone`] && addressErrors[`${prefix}_phone`] ? 'is-invalid' : ''}`}
              value={address.phone}
              onChange={(e) => handleAddressChange(type, 'phone', e.target.value)}
              onBlur={() => setAddressTouched(prev => ({ ...prev, [`${prefix}_phone`]: true }))}
              placeholder="Enter 10-digit phone number"
              maxLength="10"
            />
            {addressTouched[`${prefix}_phone`] && addressErrors[`${prefix}_phone`] && (
              <div className="invalid-feedback">{addressErrors[`${prefix}_phone`]}</div>
            )}
          </div>
          
          <div className="form-group full-width">
            <label className="form-label">
              <FaMapMarkerAlt className="me-1" size={12} />
              Address Line 1 *
            </label>
            <input
              type="text"
              className={`form-control ${addressTouched[`${prefix}_address_line1`] && addressErrors[`${prefix}_address_line1`] ? 'is-invalid' : ''}`}
              value={address.address_line1}
              onChange={(e) => handleAddressChange(type, 'address_line1', e.target.value)}
              onBlur={() => setAddressTouched(prev => ({ ...prev, [`${prefix}_address_line1`]: true }))}
              placeholder="House number, street name"
            />
            {addressTouched[`${prefix}_address_line1`] && addressErrors[`${prefix}_address_line1`] && (
              <div className="invalid-feedback">{addressErrors[`${prefix}_address_line1`]}</div>
            )}
          </div>
          
          <div className="form-group full-width">
            <label className="form-label">Address Line 2</label>
            <input
              type="text"
              className="form-control"
              value={address.address_line2}
              onChange={(e) => handleAddressChange(type, 'address_line2', e.target.value)}
              placeholder="Landmark, area (optional)"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">
              <FaCity className="me-1" size={12} />
              City *
            </label>
            <input
              type="text"
              className={`form-control ${addressTouched[`${prefix}_city`] && addressErrors[`${prefix}_city`] ? 'is-invalid' : ''}`}
              value={address.city}
              onChange={(e) => handleAddressChange(type, 'city', e.target.value)}
              onBlur={() => setAddressTouched(prev => ({ ...prev, [`${prefix}_city`]: true }))}
              placeholder="City"
            />
            {addressTouched[`${prefix}_city`] && addressErrors[`${prefix}_city`] && (
              <div className="invalid-feedback">{addressErrors[`${prefix}_city`]}</div>
            )}
          </div>
          
          <div className="form-group">
            <label className="form-label">
              <FaFlag className="me-1" size={12} />
              State *
            </label>
            <input
              type="text"
              className={`form-control ${addressTouched[`${prefix}_state`] && addressErrors[`${prefix}_state`] ? 'is-invalid' : ''}`}
              value={address.state}
              onChange={(e) => handleAddressChange(type, 'state', e.target.value)}
              onBlur={() => setAddressTouched(prev => ({ ...prev, [`${prefix}_state`]: true }))}
              placeholder="State"
            />
            {addressTouched[`${prefix}_state`] && addressErrors[`${prefix}_state`] && (
              <div className="invalid-feedback">{addressErrors[`${prefix}_state`]}</div>
            )}
          </div>
          
          <div className="form-group">
            <label className="form-label">Pincode *</label>
            <input
              type="text"
              className={`form-control ${addressTouched[`${prefix}_pincode`] && addressErrors[`${prefix}_pincode`] ? 'is-invalid' : ''}`}
              value={address.pincode}
              onChange={(e) => handleAddressChange(type, 'pincode', e.target.value)}
              onBlur={() => setAddressTouched(prev => ({ ...prev, [`${prefix}_pincode`]: true }))}
              placeholder="6-digit pincode"
              maxLength="6"
            />
            {addressTouched[`${prefix}_pincode`] && addressErrors[`${prefix}_pincode`] && (
              <div className="invalid-feedback">{addressErrors[`${prefix}_pincode`]}</div>
            )}
          </div>
        </div>
      </div>
    );
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
          {snackbarSeverity === "success" ? 
            <FaCheckCircle className="me-2" /> : 
            <FaExclamationCircle className="me-2" />
          }
          {snackbarMessage}
        </div>
      )}

      {/* Payment Success Alert Dialog */}
      {paymentSuccessOpen && paymentSuccessInfo && (
        <div className="payment-success-overlay">
          <div className="payment-success-alert">
            <div className="payment-success-header">
              <FaCheckCircle className="text-success me-3" size={40} />
              <div>
                <h3 className="mb-1">Order Placed Successfully!</h3>
                <p className="text-muted mb-0">{paymentSuccessInfo.message}</p>
              </div>
              <button 
                className="btn-close ms-auto"
                onClick={closePaymentSuccessAlert}
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="payment-success-body">
              <div className="success-icon-container">
                <div className="success-icon-circle">
                  <FaCheckCircle size={48} />
                </div>
              </div>
              
              <p className="success-message text-center">
                Thank you for your purchase!
              </p>
              
              <div className="payment-details-card">
                <h5 className="mb-3">Order Details</h5>
                {paymentSuccessInfo.order_id && (
                  <div className="payment-detail-item">
                    <span className="detail-label">Order ID:</span>
                    <span className="detail-value">{paymentSuccessInfo.order_id}</span>
                  </div>
                )}
                <div className="payment-detail-item">
                  <span className="detail-label">Amount:</span>
                  <span className="detail-value">₹{paymentSuccessInfo.amount.toFixed(2)}</span>
                </div>
                <div className="payment-detail-item">
                  <span className="detail-label">Date & Time:</span>
                  <span className="detail-value">{paymentSuccessInfo.timestamp}</span>
                </div>
              </div>
              
              <div className="alert alert-info mt-3">
                <small>
                  <FaExclamationCircle className="me-2" />
                  Your cart has been cleared. You will receive order confirmation shortly.
                </small>
              </div>
            </div>
            
            <div className="payment-success-footer">
              <button 
                className="btn btn-primary"
                onClick={closePaymentSuccessAlert}
              >
                Continue Shopping
              </button>
              <button 
                className="btn btn-outline-secondary"
                onClick={() => navigate("/client-orders")}
              >
                View Orders
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="agent-cart-container">
        {/* Payment Verification Status */}
        {isVerifyingPayment && (
          <div className="payment-verification-status mb-4">
            <div className="alert alert-info">
              <div className="d-flex align-items-center">
                <div className="spinner-border spinner-border-sm me-3" role="status"></div>
                <div>
                  <strong>Verifying Payment Status</strong>
                  <p className="mb-0 small">Checking payment confirmation...</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="agent-cart-header">
          <h1 className="agent-cart-title">
            <FaShoppingCart className="me-2" />
            Shopping Cart
            {cartItems.length > 0 && (
              <span className="cart-count-badge">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </span>
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
            
            {paymentVerified ? (
              <>
                <h3 className="mb-3 text-success">Payment Successful!</h3>
                <p className="text-muted mb-4">
                  Your order has been placed and cart has been cleared.
                </p>
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={handleContinueShopping}
                >
                  Continue Shopping
                </button>
              </>
            ) : localStorage.getItem("merchant_order_id") ? (
              <>
                <h3 className="mb-3">Payment Processing</h3>
                <p className="text-muted mb-4">
                  We're verifying your payment status...
                </p>
                {!isVerifyingPayment && (
                  <button 
                    className="btn btn-warning btn-lg"
                    onClick={handleManualVerification}
                  >
                    Check Payment Status
                  </button>
                )}
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        ) : (
          <div className="agent-cart-content split-layout">
            {/* Left Column - Cart Items */}
            <div className="cart-items-column">
              <div className="cart-items-header sticky-header">
                <h3>Cart Items ({cartItems.length})</h3>
              </div>
              
              <div className="cart-items-list scrollable-list">
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
                    <div key={item.id} className="cart-item-card compact">
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
                          <h6 className="item-title">
                            {variant.sku}
                          </h6>
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
            
            {/* Right Column - Order Summary with Payment and Address */}
            <div className="order-summary-column">
              <div className="order-summary-card compact">
                <h3 className="summary-title">Order Summary</h3>
                
                <div className="summary-details compact">
                  <div className="summary-row">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
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

                {/* Payment Method Selection */}
                <div className="payment-method-section compact">
                  <h6 className="payment-method-title">Select Payment Method</h6>
                  <div className="payment-method-options compact">
                    <label className={`payment-method-option compact ${paymentMethod === 'online' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={paymentMethod === 'online'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <FaCreditCard className="payment-icon" />
                      <div className="payment-method-info">
                        <span className="payment-method-name">Online Payment</span>
                      </div>
                    </label>

                    <label className={`payment-method-option compact ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <FaMoneyBillWave className="payment-icon" />
                      <div className="payment-method-info">
                        <span className="payment-method-name">Cash on Delivery</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Address Section */}
                <div className="address-section compact">
                  <h6 className="address-section-title">Delivery Address</h6>
                  
                  {/* Shipping Address */}
                  {renderAddressForm('shipping', shippingAddress, 'Shipping Address')}
                  
                  {/* Billing Address */}
                  <div className="billing-address-section">
                    <div className="form-check mb-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="sameAsShipping"
                        checked={sameAsShipping}
                        onChange={handleSameAsShippingChange}
                      />
                      <label className="form-check-label small" htmlFor="sameAsShipping">
                        Billing address same as shipping
                      </label>
                    </div>
                    
                    {!sameAsShipping && renderAddressForm('billing', billingAddress, 'Billing Address')}
                  </div>
                </div>
                
                <div className="checkout-actions compact">
                  <button 
                    className="btn btn-primary checkout-btn"
                    onClick={handleCheckout}
                    disabled={paymentLoading || cartItems.length === 0 || isVerifyingPayment}
                  >
                    {paymentLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        {paymentMethod === 'online' ? <FaCreditCard className="me-2" /> : <FaMoneyBillWave className="me-2" />}
                        {paymentMethod === 'online' ? 'Pay Now' : 'Place Order (COD)'}
                      </>
                    )}
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