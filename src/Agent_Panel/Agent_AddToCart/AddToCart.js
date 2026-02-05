// Cart.js - Bootstrap version
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
//  import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
//  import { baseurl } from '../../BaseURL/BaseURL';
// import "./AddToCart.css"; 
// function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [paymentLoading, setPaymentLoading] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
//   const [merchantOrderId, setMerchantOrderId] = useState(null);
//   const [paymentUrl, setPaymentUrl] = useState(null);
//   const hasPostedStatus = useRef(false);
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("user_id");

//   // Fetch cart items and products
//   useEffect(() => {
//     const fetchData = async () => {
//       if (!userId) {
//         setLoading(false);
//         return;
//       }

//       try {
//         // Fetch cart items
//         const cartResponse = await axios.get(`${baseurl}/cart/`);
//         const userCartItems = cartResponse.data.filter(
//           item => item.user === parseInt(userId)
//         );
//         setCartItems(userCartItems);

//         // Fetch all products to get product details
//         const productsResponse = await axios.get(`${baseurl}/products/`);
//         setProducts(productsResponse.data);
//       } catch (error) {
//         console.error("Error fetching cart data:", error);
//         showSnackbar("Error loading cart data", "error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [userId]);

//   // Handle payment confirmation on component mount
//   useEffect(() => {
//     const merchant_order_id = localStorage.getItem("merchant_order_id");
    
//     const confirmCartPayment = async () => {
//       if (hasPostedStatus.current || !merchant_order_id) return;
      
//       try {
//         hasPostedStatus.current = true;
        
//         await axios.post(
//           `${baseurl}/product/confirm-payment/`,
//           {
//             merchant_order_id: merchant_order_id
//           }
//         );
        
//         // Clear storage after successful confirmation
//         localStorage.removeItem("merchant_order_id");
        
//         // Refresh cart data
//         await refreshCartData();
        
//         showSnackbar("Payment confirmed successfully!", "success");
        
//         // Optionally redirect to success page
//         setTimeout(() => {
//           navigate("/add-to-cart-list");
//         }, 2000);
        
//       } catch (error) {
//         console.error("Error confirming payment:", error);
//         hasPostedStatus.current = false;
//         showSnackbar(
//           error.response?.data?.message || "Payment confirmation failed",
//           "error"
//         );
//       }
//     };
    
//     confirmCartPayment();
//   }, []);

//   // Refresh cart data after payment
//   const refreshCartData = async () => {
//     try {
//       const cartResponse = await axios.get(`${baseurl}/cart/`);
//       const userCartItems = cartResponse.data.filter(
//         item => item.user === parseInt(userId)
//       );
//       setCartItems(userCartItems);
//     } catch (error) {
//       console.error("Error refreshing cart:", error);
//     }
//   };

//   // Get product details for a cart item
//   const getProductDetails = (productId) => {
//     return products.find(product => product.id === productId) || {};
//   };

//   // Update quantity
//   const handleQuantityChange = async (cartItemId, newQuantity) => {
//     if (newQuantity < 1) return;

//     try {
//       await axios.put(`${baseurl}/cart/cart-id/${cartItemId}/`, {
//         user: parseInt(userId),
//         product: cartItems.find(item => item.id === cartItemId)?.product,
//         quantity: newQuantity
//       });

//       // Update local state
//       setCartItems(prev => prev.map(item => 
//         item.id === cartItemId ? { ...item, quantity: newQuantity } : item
//       ));

//       showSnackbar("Quantity updated successfully", "success");
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//       showSnackbar("Failed to update quantity", "error");
//     }
//   };

//   // Remove item from cart
//   const handleRemoveItem = async (cartItemId) => {
//     try {
//       await axios.delete(`${baseurl}/cart/cart-id/${cartItemId}/`);
      
//       // Update local state
//       setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      
//       showSnackbar("Item removed from cart", "info");
//     } catch (error) {
//       console.error("Error removing item:", error);
//       showSnackbar("Failed to remove item", "error");
//     }
//   };

//   // Calculate total
//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => {
//       const product = getProductDetails(item.product);
//       const price = product.selling_price || product.mrp || 0;
//       return total + (price * item.quantity);
//     }, 0);
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
//       const response = await axios.post(
//         `${baseurl}/product/initiate-payment/`,
//         {
//           user_id: parseInt(userId),
//           redirect_url: window.location.origin + "/add-to-cart-list"
//         }
//       );

//       console.log("Payment initiation response:", response.data);

//       if (response.data && response.data.merchant_order_id) {
//         const orderId = response.data.merchant_order_id;
//         setMerchantOrderId(orderId);
        
//         if (response.data.payment_url) {
//           setPaymentUrl(response.data.payment_url);
//           window.location.href = response.data.payment_url;
//         } else {
//           setConfirmDialogOpen(true);
//         }
        
//         localStorage.setItem("merchant_order_id", orderId);
        
//       } else {
//         showSnackbar("Failed to initiate payment. Please try again.", "error");
//       }
//     } catch (error) {
//       console.error("Payment initiation error:", error);
//       showSnackbar(
//         error.response?.data?.message || "Failed to initiate payment",
//         "error"
//       );
//     } finally {
//       setPaymentLoading(false);
//     }
//   };

//   // Confirm Payment
//   const handleConfirmPayment = async () => {
//     if (!merchantOrderId) {
//       showSnackbar("Payment order ID not found", "error");
//       return;
//     }

//     setPaymentLoading(true);
//     try {
//       const response = await axios.post(
//         `${baseurl}/product/confirm-payment/`,
//         {
//           merchant_order_id: merchantOrderId
//         }
//       );

//       if (response.data) {
//         showSnackbar("Payment successful!", "success");
//         setConfirmDialogOpen(false);
//         setMerchantOrderId(null);
        
//         await clearCartAfterPayment();
        
//         setTimeout(() => {
//           navigate("/add-to-cart-list");
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
//       const deletePromises = cartItems.map(item =>
//         axios.delete(`${baseurl}/cart/cart-id/${item.id}/`)
//       );
//       await Promise.all(deletePromises);
      
//       setCartItems([]);
      
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
//   };

//   // Handle continue shopping
//   const handleContinueShopping = () => {
//     navigate(-1);
//   };

//   // Snackbar handler
//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   // Handle dialog close
//   const handleDialogClose = () => {
//     setConfirmDialogOpen(false);
//     setMerchantOrderId(null);
//   };

//   if (!userId) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="container mt-4 mb-4">
//           <div className="text-center py-5">
//             <div className="empty-cart-icon mb-3">
//               <i className="bi bi-cart-x"></i>
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
//         <div className="container mt-4 mb-4">
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
      
//       {/* Toast/Snackbar */}
//       <div className={`toast-container position-fixed bottom-0 end-0 p-3`}>
//         <div className={`toast ${snackbarOpen ? 'show' : ''} ${snackbarSeverity === 'success' ? 'bg-success text-white' : 
//           snackbarSeverity === 'error' ? 'bg-danger text-white' : 
//           snackbarSeverity === 'warning' ? 'bg-warning text-dark' : 'bg-info text-white'}`} 
//           role="alert" 
//           aria-live="assertive" 
//           aria-atomic="true"
//         >
//           <div className="toast-header">
//             <strong className="me-auto">
//               {snackbarSeverity === 'success' ? 'Success' : 
//                snackbarSeverity === 'error' ? 'Error' : 
//                snackbarSeverity === 'warning' ? 'Warning' : 'Info'}
//             </strong>
//             <button type="button" className="btn-close" onClick={handleSnackbarClose}></button>
//           </div>
//           <div className="toast-body">
//             {snackbarMessage}
//           </div>
//         </div>
//       </div>

//       {/* Modal Dialog */}
//       <div className={`modal fade ${confirmDialogOpen ? 'show d-block' : ''}`} style={{backgroundColor: confirmDialogOpen ? 'rgba(0,0,0,0.5)' : 'transparent'}}>
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Confirm Payment</h5>
//               <button type="button" className="btn-close" onClick={handleDialogClose}></button>
//             </div>
//             <div className="modal-body">
//               <p>Please confirm your payment to complete the order.</p>
//               {merchantOrderId && (
//                 <div className="alert alert-light mt-2">
//                   <small className="text-muted">Order ID: {merchantOrderId}</small>
//                 </div>
//               )}
//               <div className="order-summary p-3 bg-light rounded mt-3">
//                 <h6 className="mb-3">Order Summary</h6>
//                 <div className="d-flex justify-content-between mb-2">
//                   <span>Total Items:</span>
//                   <span>{cartItems.length}</span>
//                 </div>
//                 <div className="d-flex justify-content-between">
//                   <span>Total Amount:</span>
//                   <span className="fw-bold">₹{calculateTotal().toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" onClick={handleDialogClose}>
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
//                     <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                     Processing...
//                   </>
//                 ) : 'Confirm Payment'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mt-4 mb-5">
//         <h1 className="mb-4 fw-bold">Shopping Cart</h1>
//         <hr className="mb-4" />

//         {cartItems.length === 0 ? (
//           <div className="text-center py-5">
//             <div className="empty-cart-icon mb-3">
//               <i className="bi bi-cart"></i>
//             </div>
//             <h3 className="mb-3">Your cart is empty</h3>
//             <p className="text-muted mb-4">
//               Add some products to your cart and they will appear here
//             </p>
//             <button 
//               className="btn btn-primary btn-lg"
//               onClick={handleContinueShopping}
//             >
//               Continue Shopping
//             </button>
//           </div>
//         ) : (
//           <>
//             <div className="table-responsive mb-4">
//               <table className="table table-hover">
//                 <thead className="table-light">
//                   <tr>
//                     <th scope="col">Product</th>
//                     <th scope="col" className="text-center">Price</th>
//                     <th scope="col" className="text-center">Quantity</th>
//                     <th scope="col" className="text-center">Total</th>
//                     <th scope="col" className="text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {cartItems.map((item) => {
//                     const product = getProductDetails(item.product);
//                     const totalPrice = (product.selling_price || product.mrp || 0) * item.quantity;

//                     return (
//                       <tr key={item.id}>
//                         <td>
//                           <div className="d-flex align-items-center">
//                             {product.product_image ? (
//                               <img 
//                                 src={`${baseurl}/${product.product_image}`}
//                                 alt={product.product_name}
//                                 className="product-image me-3"
//                               />
//                             ) : (
//                               <div className="product-image-placeholder me-3">
//                                 <span className="text-muted">No Image</span>
//                               </div>
//                             )}
//                             <div>
//                               <h6 className="mb-1 fw-bold">{product.product_name || "Unknown Product"}</h6>
//                               <p className="text-muted small mb-0">
//                                 {product.description ? 
//                                   product.description.substring(0, 50) + "..." : 
//                                   "No description"}
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="text-center align-middle">
//                           <div className="fw-medium">₹{product.selling_price || product.mrp || 0}</div>
//                           {product.mrp && product.selling_price && product.mrp > product.selling_price && (
//                             <div className="text-muted small text-decoration-line-through">
//                               ₹{product.mrp}
//                             </div>
//                           )}
//                         </td>
//                         <td className="text-center align-middle">
//                           <div className="d-flex align-items-center justify-content-center">
//                             <button 
//                               className="btn btn-outline-secondary btn-sm"
//                               onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
//                               disabled={item.quantity <= 1}
//                             >
//                               <i className="bi bi-dash"></i>
//                             </button>
//                             <span className="mx-2" style={{minWidth: "30px"}}>
//                               {item.quantity}
//                             </span>
//                             <button 
//                               className="btn btn-outline-secondary btn-sm"
//                               onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
//                             >
//                               <i className="bi bi-plus"></i>
//                             </button>
//                           </div>
//                         </td>
//                         <td className="text-center align-middle">
//                           <div className="fw-bold text-primary">
//                             ₹{totalPrice.toFixed(2)}
//                           </div>
//                         </td>
//                         <td className="text-center align-middle">
//                           <button 
//                             className="btn btn-outline-danger btn-sm"
//                             onClick={() => handleRemoveItem(item.id)}
//                           >
//                             <i className="bi bi-trash"></i>
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>

//             {/* Order Summary */}
//             <div className="card mb-4">
//               <div className="card-body">
//                 <h5 className="card-title fw-bold mb-3">Order Summary</h5>
//                 <hr className="my-2" />
                
//                 <div className="d-flex justify-content-between mb-2">
//                   <span>Subtotal ({cartItems.length} items)</span>
//                   <span>₹{calculateTotal().toFixed(2)}</span>
//                 </div>
                
//                 <div className="d-flex justify-content-between mb-3">
//                   <span>Shipping</span>
//                   <span>Free</span>
//                 </div>
                
//                 <hr className="my-2" />
                
//                 <div className="d-flex justify-content-between mb-4">
//                   <h5 className="fw-bold">Total</h5>
//                   <h5 className="fw-bold text-primary">₹{calculateTotal().toFixed(2)}</h5>
//                 </div>

//                 <div className="row g-3">
//                   <div className="col-md-6">
//                     <button
//                       className="btn btn-outline-secondary w-100 py-2"
//                       onClick={handleContinueShopping}
//                     >
//                       Continue Shopping
//                     </button>
//                   </div>
//                   <div className="col-md-6">
//                     <button
//                       className="btn btn-primary w-100 py-2"
//                       onClick={handleCheckout}
//                       disabled={paymentLoading || cartItems.length === 0}
//                     >
//                       {paymentLoading ? (
//                         <>
//                           <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                           Processing...
//                         </>
//                       ) : (
//                         <>
//                           <i className="bi bi-credit-card me-2"></i>
//                           Proceed to Checkout
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// export default Cart;




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL';
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
//       // Create order first
//       const orderResponse = await axios.post(`${baseurl}/orders/`, {
//         user: parseInt(userId),
//         items: cartItems.map(item => ({
//           variant: item.variant,
//           quantity: item.quantity,
//           price: parseFloat(item.variant_details.selling_price)
//         }))
//       });

//       console.log("Order created:", orderResponse.data);
      
//       // Initiate payment
//       const paymentResponse = await axios.post(`${baseurl}/payment/initiate/`, {
//         order_id: orderResponse.data.id,
//         amount: calculateTotal(),
//         user_id: parseInt(userId)
//       });

//       console.log("Payment response:", paymentResponse.data);

//       if (paymentResponse.data && paymentResponse.data.payment_url) {
//         // Redirect to payment gateway
//         window.location.href = paymentResponse.data.payment_url;
//       } else {
//         showSnackbar("Payment initialization failed", "error");
//       }
//     } catch (error) {
//       console.error("Payment initiation error:", error);
//       showSnackbar(
//         error.response?.data?.message || "Failed to initiate payment",
//         "error"
//       );
//     } finally {
//       setPaymentLoading(false);
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
//     navigate("/agent-busineess-category");
//   };

//   // Handle product click
// //   const handleProductClick = (variantId) => {
// //     navigate(`/agent-business-product-details/${variantId}`);
// //   };

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
//                                               {/* <div className="cart-item-image" onClick={() => handleProductClick(item.variant)}> */}

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

//                             {/* <h5 className="item-title" onClick={() => handleProductClick(item.variant)}>
//                             {variant.sku}
//                           </h5> */}
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
                
//                 {/* <div className="secure-checkout">
//                   <div className="secure-icon">🔒</div>
//                   <div className="secure-text">
//                     <div className="secure-title">Secure Checkout</div>
//                     <div className="secure-subtitle">Your payment information is protected</div>
//                   </div>
//                 </div> */}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default AgentCart;



//============================================================

// 


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
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
//       const amountInPaise = convertToPaise(totalAmount);

//       console.log("Initiating payment with:", {
//         user_id: parseInt(userId),
//     redirect_url: `${redirecturl}/agent-transactions`,      
//       amount: totalAmount,
//         amount_in_paise: amountInPaise
//       });

//       // Initiate payment with new API endpoint and payload
//       const paymentResponse = await axios.post(
//         `${baseurl}/product/initiate-payment/`,
//         {
//           user_id: parseInt(userId),
//     redirect_url: `${redirecturl}/agent-transactions`,  
//             amount: totalAmount  // Send amount in rupees
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       console.log("Payment response:", paymentResponse.data);

//       if (paymentResponse.data && paymentResponse.data.payment_url) {
//         // Save payment info to localStorage for confirmation later
//         localStorage.setItem('merchant_order_id', paymentResponse.data.merchant_order_id);
//         localStorage.setItem('order_id', paymentResponse.data.order_id);
//         localStorage.setItem('payment_amount', totalAmount.toString());
        
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

//   // Helper function to show snackbar
//   const showSnackbar = (message, severity) => {
//     setSnackbarMessage(message);
//     setSnackbarSeverity(severity);
//     setSnackbarOpen(true);
//     setTimeout(() => setSnackbarOpen(false), 3000);
//   };

//   // Handle continue shopping
//   const handleContinueShopping = () => {
//     navigate("/agent-busineess-category");
//   };

//   // Handle product click
//   // const handleProductClick = (variantId) => {
//   //   navigate(`/agent-business-product-details/${variantId}`);
//   // };

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
//                         {/* <div className="cart-item-image" onClick={() => handleProductClick(item.variant)}> */}
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
//                           {/* <h5 className="item-title" onClick={() => handleProductClick(item.variant)}>
//                             {variant.sku}
//                           </h5> */}
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
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import { baseurl, redirecturl } from '../../BaseURL/BaseURL';
import "./AddToCart.css";
import { FaTrash, FaMinus, FaPlus, FaCreditCard, FaArrowLeft, FaShoppingCart, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

function AgentCart() {
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
        redirect_url: `${redirecturl}/agent-transactions`,
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
    navigate("/agent-transactions");
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

export default AgentCart;