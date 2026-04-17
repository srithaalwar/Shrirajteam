// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Client_Navbar.css";
// import logoImage from "../../Logos/logo1.png";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { baseurl } from "../../BaseURL/BaseURL";

// // Import FontAwesome icons
// import { 
//   FaTachometerAlt, 
//   FaHome, 
//   FaBuilding, 
//   FaUsers, 
//   FaClipboardList, 
//   FaCogs,
//   FaCalendarAlt,
//   FaChartLine,
//   FaBriefcase,
//   FaFileAlt,
//   FaTag,
//   FaUserCircle,
//   FaSignOutAlt,
//   FaCaretDown,
//   FaCaretRight,
//   FaMoneyBillWave,
//   FaHandHoldingUsd,
//   FaCreditCard,
//   FaLayerGroup,
//   FaGraduationCap,
//   FaQuestionCircle,
//   FaExchangeAlt,
//   FaDatabase,
//   FaSitemap,
//   FaEye,
//   FaRobot,
//   FaUserTie,
//   FaStar,
//   FaEnvelope,
//   FaPhone,
//   FaIdCard,
//   FaBell,
//   FaHeart,
//   FaShoppingCart
// } from "react-icons/fa";

// const ClientNavbar = () => {
//   const [open, setOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [showCategories, setShowCategories] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [expandedMenu, setExpandedMenu] = useState(null);
//   const [userData, setUserData] = useState({
//     email: "",
//     phone_number: "",
//     referral_id: "",
//     username: "",
//     user_name: "",
//     referred_by: "",
//     image: ""
//   });

//   // Notification states
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showNotifications, setShowNotifications] = useState(false);

//   // Cart states
//   const [cartItems, setCartItems] = useState([]);
//   const [cartItemCount, setCartItemCount] = useState(0); // Number of distinct items
//   const [cartTotalQuantity, setCartTotalQuantity] = useState(0); // Total quantity sum
//   const [cartLoading, setCartLoading] = useState(false);

//   // Wishlist states
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [wishlistCount, setWishlistCount] = useState(0); // Number of wishlist items
//   const [wishlistLoading, setWishlistLoading] = useState(false);

//   const dropdownRef = useRef(null);
//   const notificationRef = useRef(null);
//   const profileRef = useRef(null);
//   const loginUrl = "/login";
//   const signupUrl = "/register";

//   const navigate = useNavigate();

//   // Get user ID from localStorage
//   const userId = localStorage.getItem("user_id");

//   // Fetch user data from API to get the image
//   const fetchUserDataFromAPI = async () => {
//     if (!userId) return;

//     try {
//       const response = await axios.get(`${baseurl}/users/${userId}/`);
//       console.log("User data from API:", response.data);

//       if (response.data) {
//         // Update localStorage with the image
//         if (response.data.image) {
//           localStorage.setItem("user_image", response.data.image);
//         }

//         setUserData(prevData => ({
//           ...prevData,
//           email: response.data.email || prevData.email,
//           phone_number: response.data.phone_number || prevData.phone_number,
//           referral_id: response.data.referral_id || prevData.referral_id,
//           username: response.data.username || prevData.username,
//           user_name: response.data.user_name || prevData.user_name,
//           referred_by: response.data.referred_by || prevData.referred_by,
//           image: response.data.image || prevData.image
//         }));
//       }
//     } catch (error) {
//       console.error("Error fetching user data from API:", error);
//     }
//   };

//   // Fetch user data from localStorage on component mount
//   useEffect(() => {
//     const fetchUserData = () => {
//       const storedUserData = {
//         email: localStorage.getItem("email") || "",
//         phone_number: localStorage.getItem("phone_number") || "",
//         referral_id: localStorage.getItem("referral_id") || "",
//         username: localStorage.getItem("username") || "",
//         user_name: localStorage.getItem("user_name") || "",
//         referred_by: localStorage.getItem("referred_by") || "",
//         image: localStorage.getItem("user_image") || ""
//       };
//       setUserData(storedUserData);
//       console.log("User data from localStorage:", storedUserData);
//     };

//     fetchUserData();

//     // Fetch fresh user data from API to get the image
//     fetchUserDataFromAPI();

//     // Listen for storage changes
//     const handleStorageChange = () => {
//       fetchUserData();
//     };

//     window.addEventListener('storage', handleStorageChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, [userId]);

//   /* ================= FETCH CART ITEMS ================= */
//   const fetchCartItems = async () => {
//     if (!userId) {
//       console.log("No user_id found, cannot fetch cart items");
//       setCartItems([]);
//       setCartItemCount(0);
//       setCartTotalQuantity(0);
//       return;
//     }

//     setCartLoading(true);
//     try {
//       console.log("Fetching cart items for user:", userId);

//       // Fetch cart items from API with user filter
//       const response = await axios.get(`${baseurl}/cart/?user=${userId}`);
//       console.log("Cart API Response:", response.data);

//       // Handle paginated response - get items from results array
//       const cartResponse = response.data;
//       let userCartItems = [];

//       if (cartResponse.results && Array.isArray(cartResponse.results)) {
//         // Get items from results array
//         userCartItems = cartResponse.results;
//       } else if (Array.isArray(cartResponse)) {
//         // If response is already an array
//         userCartItems = cartResponse;
//       }

//       console.log("User cart items:", userCartItems);

//       setCartItems(userCartItems);

//       // Use the count from API response
//       if (cartResponse.count !== undefined) {
//         setCartItemCount(cartResponse.count);
//       } else {
//         setCartItemCount(userCartItems.length);
//       }

//       // Calculate total quantity
//       const totalQuantity = userCartItems.reduce((total, item) => {
//         return total + (item.quantity || 1);
//       }, 0);

//       setCartTotalQuantity(totalQuantity);

//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//       setCartItems([]);
//       setCartItemCount(0);
//       setCartTotalQuantity(0);
//     } finally {
//       setCartLoading(false);
//     }
//   };

//   /* ================= FETCH WISHLIST ITEMS ================= */
//   const fetchWishlistItems = async () => {
//     if (!userId) {
//       console.log("No user_id found, cannot fetch wishlist items");
//       setWishlistItems([]);
//       setWishlistCount(0);
//       return;
//     }

//     setWishlistLoading(true);
//     try {
//       console.log("Fetching wishlist items for user:", userId);

//       // Fetch wishlist items from API with user filter
//       const response = await axios.get(`${baseurl}/wishlist/?user=${userId}`);
//       console.log("Wishlist API Response:", response.data);

//       // Handle paginated response - get items from results array
//       const wishlistResponse = response.data;
//       let userWishlistItems = [];

//       if (wishlistResponse.results && Array.isArray(wishlistResponse.results)) {
//         // Get items from results array
//         userWishlistItems = wishlistResponse.results;
//       } else if (Array.isArray(wishlistResponse)) {
//         // If response is already an array
//         userWishlistItems = wishlistResponse;
//       }

//       console.log("User wishlist items:", userWishlistItems);

//       setWishlistItems(userWishlistItems);

//       // Use the count from API response
//       if (wishlistResponse.count !== undefined) {
//         setWishlistCount(wishlistResponse.count);
//       } else {
//         setWishlistCount(userWishlistItems.length);
//       }

//     } catch (error) {
//       console.error("Error fetching wishlist items:", error);
//       setWishlistItems([]);
//       setWishlistCount(0);
//     } finally {
//       setWishlistLoading(false);
//     }
//   };

//   // Fetch cart items on component mount and set up polling
//   useEffect(() => {
//     if (userId) {
//       console.log("Setting up cart polling for user:", userId);
//       fetchCartItems();

//       // Poll for cart updates every 5 seconds for real-time updates
//       const cartIntervalId = setInterval(fetchCartItems, 5000);

//       return () => clearInterval(cartIntervalId);
//     } else {
//       setCartItems([]);
//       setCartItemCount(0);
//       setCartTotalQuantity(0);
//     }
//   }, [userId]);

//   // Fetch wishlist items on component mount and set up polling
//   useEffect(() => {
//     if (userId) {
//       console.log("Setting up wishlist polling for user:", userId);
//       fetchWishlistItems();

//       // Poll for wishlist updates every 5 seconds for real-time updates
//       const wishlistIntervalId = setInterval(fetchWishlistItems, 5000);

//       return () => clearInterval(wishlistIntervalId);
//     } else {
//       setWishlistItems([]);
//       setWishlistCount(0);
//     }
//   }, [userId]);

//   // Also fetch cart when component mounts
//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   // Also fetch wishlist when component mounts
//   useEffect(() => {
//     fetchWishlistItems();
//   }, []);

//   // Listen for cart updates from other components
//   useEffect(() => {
//     const handleCartUpdate = () => {
//       console.log("Cart update event received, refreshing cart...");
//       fetchCartItems();
//     };

//     // Listen for custom event when cart is updated
//     window.addEventListener('cartUpdated', handleCartUpdate);

//     return () => {
//       window.removeEventListener('cartUpdated', handleCartUpdate);
//     };
//   }, []);

//   // Listen for wishlist updates from other components
//   useEffect(() => {
//     const handleWishlistUpdate = () => {
//       console.log("Wishlist update event received, refreshing wishlist...");
//       fetchWishlistItems();
//     };

//     // Listen for custom event when wishlist is updated
//     window.addEventListener('wishlistUpdated', handleWishlistUpdate);

//     return () => {
//       window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
//     };
//   }, []);

//   // Fetch notifications for the user
//   const fetchNotifications = async () => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) {
//         console.log("No user_id found in localStorage");
//         return;
//       }

//       console.log("Fetching notifications for client user:", userId);

//       const response = await axios.get(`${baseurl}/notifications/?user=${userId}&is_read=false`);
//       console.log("Client Notifications API Response:", response.data);

//       const allNotifications = response.data.results || [];

//       const apiUnreadCount = response.data.unread_count;
//       if (apiUnreadCount !== undefined) {
//         setUnreadCount(apiUnreadCount);
//       } else {
//         const localUnreadCount = allNotifications.filter(n => !n.is_read).length;
//         setUnreadCount(localUnreadCount);
//       }

//       setNotifications(allNotifications);

//     } catch (error) {
//       console.error("Error fetching client notifications:", error);
//       const unread = notifications.filter(notification => !notification.is_read);
//       setUnreadCount(unread.length);
//     }
//   };

//   // Fetch notifications on component mount and set up polling
//   useEffect(() => {
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       console.log("Setting up notification polling for client user:", userId);
//       fetchNotifications();

//       // Poll for new notifications every 30 seconds
//       const intervalId = setInterval(fetchNotifications, 30000);

//       return () => clearInterval(intervalId);
//     }
//   }, []);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowCategories(false);
//       }

//       if (notificationRef.current && !notificationRef.current.contains(event.target)) {
//         setShowNotifications(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleDropdownToggle = (event) => {
//     event.stopPropagation();
//     setShowCategories(!showCategories);
//   };

//   const handleCategorySelect = (categoryName) => {
//     setSelectedCategory(categoryName);
//     setShowCategories(false);
//   };

//   const toggleSubMenu = (menuName) => {
//     if (expandedMenu === menuName) {
//       setExpandedMenu(null);
//     } else {
//       setExpandedMenu(menuName);
//     }
//   };

//   // Handle notification click
//   const handleNotificationClick = (event) => {
//     event.stopPropagation();
//     setShowNotifications(!showNotifications);
//   };

//   // Mark notification as read and navigate to property/product
//   const handleNotificationItemClick = async (notification) => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) {
//         console.error("No user_id found in localStorage");
//         return;
//       }

//       console.log("Marking client notification as read:", notification);

//       await axios.post(`${baseurl}/notifications/mark-read/`, {
//         user_id: parseInt(userId),
//         notification_status_ids: [notification.notification_status_id]
//       });

//       console.log("Successfully marked client notification as read");

//       const updatedNotifications = notifications.map(n => 
//         n.notification_status_id === notification.notification_status_id 
//           ? { ...n, is_read: true } 
//           : n
//       );

//       setNotifications(updatedNotifications);

//       const newUnreadCount = updatedNotifications.filter(n => !n.is_read).length;
//       setUnreadCount(newUnreadCount);

//       setShowNotifications(false);

//       // Navigate based on notification type for client
//       if (notification.property !== null) {
//         // Navigate to client property details
//         navigate(`/client-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         // Navigate to client product details with product_id and variant_id
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;

//         // Navigate to the correct URL for client
//         if (productId && variantId) {
//           navigate(`/client-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           // Fallback: If we only have productId
//           navigate(`/client-business-product-details/${productId}/`);
//         } else if (variantId) {
//           // Fallback: If we only have variantId
//           navigate(`/client-product-details/${variantId}`);
//         } else {
//           fetchNotifications();
//         }
//       } else {
//         fetchNotifications();
//       }

//     } catch (error) {
//       console.error("Error marking client notification as read:", error);
//       const updatedNotifications = notifications.map(n => 
//         n.notification_status_id === notification.notification_status_id 
//           ? { ...n, is_read: true } 
//           : n
//       );

//       setNotifications(updatedNotifications);
//       const newUnreadCount = updatedNotifications.filter(n => !n.is_read).length;
//       setUnreadCount(newUnreadCount);

//       setShowNotifications(false);

//       // Try navigation anyway even if API fails
//       if (notification.property !== null) {
//         navigate(`/client-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;

//         if (productId && variantId) {
//           navigate(`/client-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/client-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/client-product-details/${variantId}`);
//         }
//       }
//     }
//   };

//   // Format notification message with better styling
//   const formatNotificationMessage = (notification) => {
//     if (notification.property !== null) {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//           <div className="wn-notification-subtitle">Property Update</div>
//         </div>
//       );
//     } else if (notification.product !== null) {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//           <div className="wn-notification-subtitle">Product Update</div>
//         </div>
//       );
//     } else {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//         </div>
//       );
//     }
//   };

//  const handleLogout = () => {
//   console.log("Client logged out");

//   // Clear all stored data
//   localStorage.removeItem("authToken");
//   localStorage.removeItem("userRole");
//   localStorage.removeItem("clientData");
//   localStorage.removeItem("user_id");
//   localStorage.removeItem("email");
//   localStorage.removeItem("username");
//   localStorage.removeItem("phone_number");
//   localStorage.removeItem("referral_id");
//   localStorage.removeItem("referred_by");
//   localStorage.removeItem("user_name");
//   localStorage.removeItem("user_image");
//   localStorage.removeItem("token");
//   localStorage.removeItem("access_token");
//   localStorage.removeItem("refresh_token");
//   localStorage.removeItem("user_roles");

//   sessionStorage.clear();

//   setOpen(false);
//   setNotifications([]);
//   setUnreadCount(0);
//   setCartItems([]);
//   setCartItemCount(0);
//   setCartTotalQuantity(0);
//   setWishlistItems([]);
//   setWishlistCount(0);

//   // ✅ 🔥 Notify React Native app about logout
//   if (window.ReactNativeWebView) {
//     window.ReactNativeWebView.postMessage("");
//   }

//   navigate("/");
// };

//   // Handle wishlist click
//   const handleWishlistClick = () => {
//     navigate("/client-wishlist");
//   };

//   // Handle cart click
//   const handleCartClick = () => {
//     navigate("/client-add-to-cart");
//   };

//   // Handle profile click
//   const handleProfileClick = () => {
//     navigate("/client-profile");
//   };

//   // Function to get full image URL
//   const getFullImageUrl = (imagePath) => {
//     if (!imagePath) return null;

//     // If it's already a full URL, return as is
//     if (imagePath.startsWith('http')) {
//       return imagePath;
//     }

//     // If it starts with /media/, append baseurl
//     if (imagePath.startsWith('/media/')) {
//       return `${baseurl}${imagePath}`;
//     }

//     // If it's just a filename or path without /media/, add /media/ prefix
//     if (!imagePath.startsWith('/')) {
//       return `${baseurl}/media/${imagePath}`;
//     }

//     // Default case
//     return `${baseurl}${imagePath}`;
//   };

//   // Define your navigation items with appropriate icons
//   const menuItems = [
//     { path: "/client-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
//     { path: "/client-add-property-form", name: "Add Property", icon: <FaHome /> },
//     { path: "/client-properties", name: "Properties", icon: <FaBuilding /> },
//     { path: "/client-my-properties", name: "My Properties", icon: <FaClipboardList /> },
//     { path: "/client-busineess-category", name: "Products", icon: <FaBriefcase /> },
//     { path: "/client-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/client-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//     { path: "/client-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//     { path: "/client-my-plans", name: "My Plans", icon: <FaCreditCard /> },
//     { path: "/client-wishlist", name: "My Wishlist", icon: <FaHeart /> },
//     { path: "/client-add-to-cart", name: "My Cart", icon: <FaShoppingCart /> },
//     { path: "/client-orders", name: "Orders", icon: <FaCreditCard /> },
//     { path: "/client-profile", name: "Profile", icon: <FaUserCircle /> },
//   ];

//   return (
//     <>
//       {/* NAVBAR */}
//       <header className="wn-navbar">
//         <div className="wn-nav-left">
//           <button className="wn-menu-btn" onClick={() => setOpen(true)}>☰</button>
//           <div className="wn-logo">
//             <img 
//               src={logoImage} 
//               alt="Shriraj Logo" 
//               className="wn-logo-img"
//             />
//           </div>
//         </div>

//         <div className="wn-nav-right">
//           {/* Notification Icon with Dropdown */}
//           <div 
//             ref={notificationRef}
//             className="wn-notification-container"
//           >
//             <div 
//               className="wn-notification-icon" 
//               onClick={handleNotificationClick}
//               title="Notifications"
//             >
//               <FaBell size={16} />
//               {unreadCount > 0 && (
//                 <span className="wn-notification-badge">{unreadCount}</span>
//               )}
//             </div>

//             {/* Notifications Dropdown */}
//             {showNotifications && (
//               <div className="wn-notifications-dropdown">
//                 <div className="wn-notifications-header">
//                   <h4>Client Notifications</h4>
//                 </div>

//                 <div className="wn-notifications-list">
//                   {notifications.length > 0 ? (
//                     notifications.map((notification) => (
//                       <div 
//                         key={notification.notification_status_id}
//                         className={`wn-notification-item ${!notification.is_read ? 'wn-unread' : ''}`}
//                         onClick={() => handleNotificationItemClick(notification)}
//                       >
//                         <div className="wn-notification-content">
//                           {formatNotificationMessage(notification)}
//                           <small className="wn-notification-time">
//                             {new Date(notification.created_at).toLocaleDateString('en-US', {
//                               month: 'short',
//                               day: 'numeric',
//                               hour: '2-digit',
//                               minute: '2-digit'
//                             })}
//                           </small>
//                         </div>
//                         {!notification.is_read && (
//                           <div className="wn-unread-dot"></div>
//                         )}
//                       </div>
//                     ))
//                   ) : (
//                     <div className="wn-no-notifications">
//                       No notifications yet
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Wishlist Icon with Dynamic Count */}
//           <div 
//             className="wn-wishlist" 
//             onClick={handleWishlistClick}
//             title={`Wishlist: ${wishlistCount} item${wishlistCount !== 1 ? 's' : ''}`}
//             style={{ 
//               opacity: wishlistLoading ? 0.7 : 1,
//               cursor: wishlistLoading ? 'not-allowed' : 'pointer'
//             }}
//           >
//             <FaHeart size={16} />
//             {wishlistCount > 0 && (
//               <span className="wn-wishlist-badge">{wishlistCount > 99 ? '99+' : wishlistCount}</span>
//             )}
//           </div>

//           {/* Cart Icon with Dynamic Count */}
//           <div 
//             className="wn-cart" 
//             onClick={handleCartClick}
//             title={`Cart: ${cartItemCount} item${cartItemCount !== 1 ? 's' : ''} (${cartTotalQuantity} total)`}
//             style={{ 
//               opacity: cartLoading ? 0.7 : 1,
//               cursor: cartLoading ? 'not-allowed' : 'pointer'
//             }}
//           >
//             <FaShoppingCart size={16} />
//             {cartItemCount > 0 && (
//               <span className="wn-cart-badge">{cartItemCount > 99 ? '99+' : cartItemCount}</span>
//             )}
//           </div>

//           {/* Profile Image with Rounded Circle */}
//           <div 
//             className="wn-profile-image-container" 
//             onClick={handleProfileClick}
//             title="Profile"
//             ref={profileRef}
//           >
//             {userData.image ? (
//               <img 
//                 src={getFullImageUrl(userData.image)} 
//                 alt="Profile" 
//                 className="wn-profile-image"
//                 onError={(e) => {
//                   console.error("Error loading image:", userData.image);
//                   e.target.onerror = null;
//                   e.target.style.display = 'none';
//                   if (e.target.nextSibling) {
//                     e.target.nextSibling.style.display = 'flex';
//                   } else {
//                     // If no fallback element exists, create one
//                     const fallback = document.createElement('div');
//                     fallback.className = 'wn-profile-image-fallback';
//                     fallback.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg>';
//                     e.target.parentNode.appendChild(fallback);
//                   }
//                 }}
//               />
//             ) : null}
//             {!userData.image && (
//               <div className="wn-profile-image-fallback">
//                 <FaUserCircle size={24} />
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* OVERLAY */}
//       {open && <div className="wn-overlay" onClick={() => setOpen(false)} />}

//       {/* SIDEBAR */}
//       <aside className={`wn-sidebar ${open ? "open" : ""}`}>
//         {/* Header with Logo and User Info Side by Side */}
//         <div className="wn-sidebar-header">
//           <div className="wn-logo-with-user">
//             <img 
//               src={logoImage} 
//               alt="Shriraj Logo" 
//               className="wn-logo-img-sidebar"
//             />
//             <div className="wn-user-info-compact">
//               <div className="wn-user-details-compact">
//                 {userData.email && (
//                   <div className="wn-detail-item">
//                     <FaEnvelope className="wn-detail-icon" size={10} />
//                     <span className="wn-detail-text">{userData.email}</span>
//                   </div>
//                 )}

//                 {userData.phone_number && (
//                   <div className="wn-detail-item">
//                     <FaPhone className="wn-detail-icon" size={10} />
//                     <span className="wn-detail-text">
//                       {userData.phone_number}
//                     </span>
//                   </div>
//                 )}

//                 {userData.referral_id ? (
//                   <div className="wn-detail-item">
//                     <FaIdCard className="wn-detail-icon" size={10} />
//                     <span className="wn-detail-text">
//                       Ref ID: {userData.referral_id}
//                     </span>
//                   </div>
//                 ) : (
//                   <div className="wn-detail-item">
//                     <FaIdCard className="wn-detail-icon" size={10} />
//                     <span className="wn-detail-text">Ref ID: None</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <button className="wn-close-btn" onClick={() => setOpen(false)}>✕</button>
//         </div>

//         {/* Navigation Items */}
//         <div className="wn-nav-section">
//           <div className="wn-section-title">User Menu</div>
//           <ul className="wn-menu-list">
//             {menuItems.map((item, index) => (
//               <li key={item.name || item.path}>
//                 <Link 
//                   to={item.path} 
//                   className="wn-sidebar-link"
//                   onClick={() => setOpen(false)}
//                 >
//                   <span className="wn-sidebar-icon">{item.icon}</span>
//                   <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>
//                     {item.name}
//                   </span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="wn-divider" />

//         {/* Logout Button */}
//         <div className="wn-logout-section">
//           <button 
//             className="wn-logout-btn"
//             onClick={handleLogout}
//           >
//             <span className="wn-logout-icon">
//               <FaSignOutAlt />
//             </span>
//             <span className="wn-logout-text">Logout</span>
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default ClientNavbar;





//==============================================


// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Client_Navbar.css";
// import logoImage from "../../Logos/logo1.png";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { baseurl } from "../../BaseURL/BaseURL";
// import ClientSearchBar from "./ClientSearchBar";

// // Import FontAwesome icons
// import { 
//   FaTachometerAlt, 
//   FaHome, 
//   FaBuilding, 
//   FaUsers, 
//   FaClipboardList, 
//   FaCogs,
//   FaCalendarAlt,
//   FaChartLine,
//   FaBriefcase,
//   FaFileAlt,
//   FaTag,
//   FaUserCircle,
//   FaSignOutAlt,
//   FaCaretDown,
//   FaCaretRight,
//   FaMoneyBillWave,
//   FaHandHoldingUsd,
//   FaCreditCard,
//   FaLayerGroup,
//   FaGraduationCap,
//   FaQuestionCircle,
//   FaExchangeAlt,
//   FaDatabase,
//   FaSitemap,
//   FaEye,
//   FaRobot,
//   FaUserTie,
//   FaStar,
//   FaEnvelope,
//   FaPhone,
//   FaIdCard,
//   FaBell,
//   FaHeart,
//   FaShoppingCart,
//   FaSearch
// } from "react-icons/fa";

// const ClientNavbar = () => {
//   const [open, setOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [showCategories, setShowCategories] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [expandedMenu, setExpandedMenu] = useState(null);
//   const [userData, setUserData] = useState({
//     email: "",
//     phone_number: "",
//     referral_id: "",
//     username: "",
//     user_name: "",
//     referred_by: "",
//     image: ""
//   });

//   // Notification states
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showNotifications, setShowNotifications] = useState(false);

//   // Cart states
//   const [cartItems, setCartItems] = useState([]);
//   const [cartItemCount, setCartItemCount] = useState(0);
//   const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
//   const [cartLoading, setCartLoading] = useState(false);

//   // Wishlist states
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [wishlistLoading, setWishlistLoading] = useState(false);

//   // Mobile search modal state
//   const [showMobileSearch, setShowMobileSearch] = useState(false);

//   const dropdownRef = useRef(null);
//   const notificationRef = useRef(null);
//   const profileRef = useRef(null);
//   const loginUrl = "/login";
//   const signupUrl = "/register";

//   const navigate = useNavigate();

//   // Get user ID from localStorage
//   const userId = localStorage.getItem("user_id");

//   // Fetch user data from API to get the image
//   const fetchUserDataFromAPI = async () => {
//     if (!userId) return;

//     try {
//       const response = await axios.get(`${baseurl}/users/${userId}/`);
//       console.log("User data from API:", response.data);

//       if (response.data) {
//         if (response.data.image) {
//           localStorage.setItem("user_image", response.data.image);
//         }

//         setUserData(prevData => ({
//           ...prevData,
//           email: response.data.email || prevData.email,
//           phone_number: response.data.phone_number || prevData.phone_number,
//           referral_id: response.data.referral_id || prevData.referral_id,
//           username: response.data.username || prevData.username,
//           user_name: response.data.user_name || prevData.user_name,
//           referred_by: response.data.referred_by || prevData.referred_by,
//           image: response.data.image || prevData.image
//         }));
//       }
//     } catch (error) {
//       console.error("Error fetching user data from API:", error);
//     }
//   };

//   // Fetch user data from localStorage on component mount
//   useEffect(() => {
//     const fetchUserData = () => {
//       const storedUserData = {
//         email: localStorage.getItem("email") || "",
//         phone_number: localStorage.getItem("phone_number") || "",
//         referral_id: localStorage.getItem("referral_id") || "",
//         username: localStorage.getItem("username") || "",
//         user_name: localStorage.getItem("user_name") || "",
//         referred_by: localStorage.getItem("referred_by") || "",
//         image: localStorage.getItem("user_image") || ""
//       };
//       setUserData(storedUserData);
//       console.log("User data from localStorage:", storedUserData);
//     };

//     fetchUserData();
//     fetchUserDataFromAPI();

//     const handleStorageChange = () => {
//       fetchUserData();
//     };

//     window.addEventListener('storage', handleStorageChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, [userId]);

//   /* ================= FETCH CART ITEMS ================= */
//   const fetchCartItems = async () => {
//     if (!userId) {
//       setCartItems([]);
//       setCartItemCount(0);
//       setCartTotalQuantity(0);
//       return;
//     }

//     setCartLoading(true);
//     try {
//       const response = await axios.get(`${baseurl}/cart/?user=${userId}`);

//       const cartResponse = response.data;
//       let userCartItems = [];

//       if (cartResponse.results && Array.isArray(cartResponse.results)) {
//         userCartItems = cartResponse.results;
//       } else if (Array.isArray(cartResponse)) {
//         userCartItems = cartResponse;
//       }

//       setCartItems(userCartItems);

//       if (cartResponse.count !== undefined) {
//         setCartItemCount(cartResponse.count);
//       } else {
//         setCartItemCount(userCartItems.length);
//       }

//       const totalQuantity = userCartItems.reduce((total, item) => {
//         return total + (item.quantity || 1);
//       }, 0);

//       setCartTotalQuantity(totalQuantity);

//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//       setCartItems([]);
//       setCartItemCount(0);
//       setCartTotalQuantity(0);
//     } finally {
//       setCartLoading(false);
//     }
//   };

//   /* ================= FETCH WISHLIST ITEMS ================= */
//   const fetchWishlistItems = async () => {
//     if (!userId) {
//       setWishlistItems([]);
//       setWishlistCount(0);
//       return;
//     }

//     setWishlistLoading(true);
//     try {
//       const response = await axios.get(`${baseurl}/wishlist/?user=${userId}`);

//       const wishlistResponse = response.data;
//       let userWishlistItems = [];

//       if (wishlistResponse.results && Array.isArray(wishlistResponse.results)) {
//         userWishlistItems = wishlistResponse.results;
//       } else if (Array.isArray(wishlistResponse)) {
//         userWishlistItems = wishlistResponse;
//       }

//       setWishlistItems(userWishlistItems);

//       if (wishlistResponse.count !== undefined) {
//         setWishlistCount(wishlistResponse.count);
//       } else {
//         setWishlistCount(userWishlistItems.length);
//       }

//     } catch (error) {
//       console.error("Error fetching wishlist items:", error);
//       setWishlistItems([]);
//       setWishlistCount(0);
//     } finally {
//       setWishlistLoading(false);
//     }
//   };

//   // Fetch cart items on component mount and set up polling
//   useEffect(() => {
//     if (userId) {
//       fetchCartItems();
//       const cartIntervalId = setInterval(fetchCartItems, 5000);
//       return () => clearInterval(cartIntervalId);
//     } else {
//       setCartItems([]);
//       setCartItemCount(0);
//       setCartTotalQuantity(0);
//     }
//   }, [userId]);

//   // Fetch wishlist items on component mount and set up polling
//   useEffect(() => {
//     if (userId) {
//       fetchWishlistItems();
//       const wishlistIntervalId = setInterval(fetchWishlistItems, 5000);
//       return () => clearInterval(wishlistIntervalId);
//     } else {
//       setWishlistItems([]);
//       setWishlistCount(0);
//     }
//   }, [userId]);

//   // Listen for cart updates from other components
//   useEffect(() => {
//     const handleCartUpdate = () => {
//       fetchCartItems();
//     };

//     window.addEventListener('cartUpdated', handleCartUpdate);

//     return () => {
//       window.removeEventListener('cartUpdated', handleCartUpdate);
//     };
//   }, []);

//   // Listen for wishlist updates from other components
//   useEffect(() => {
//     const handleWishlistUpdate = () => {
//       fetchWishlistItems();
//     };

//     window.addEventListener('wishlistUpdated', handleWishlistUpdate);

//     return () => {
//       window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
//     };
//   }, []);

//   // Fetch notifications for the user
//   const fetchNotifications = async () => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) return;

//       const response = await axios.get(`${baseurl}/notifications/?user=${userId}&is_read=false`);

//       const allNotifications = response.data.results || [];

//       const apiUnreadCount = response.data.unread_count;
//       if (apiUnreadCount !== undefined) {
//         setUnreadCount(apiUnreadCount);
//       } else {
//         const localUnreadCount = allNotifications.filter(n => !n.is_read).length;
//         setUnreadCount(localUnreadCount);
//       }

//       setNotifications(allNotifications);

//     } catch (error) {
//       console.error("Error fetching client notifications:", error);
//       const unread = notifications.filter(notification => !notification.is_read);
//       setUnreadCount(unread.length);
//     }
//   };

//   // Fetch notifications on component mount and set up polling
//   useEffect(() => {
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       fetchNotifications();
//       const intervalId = setInterval(fetchNotifications, 30000);
//       return () => clearInterval(intervalId);
//     }
//   }, []);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowCategories(false);
//       }

//       if (notificationRef.current && !notificationRef.current.contains(event.target)) {
//         setShowNotifications(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleDropdownToggle = (event) => {
//     event.stopPropagation();
//     setShowCategories(!showCategories);
//   };

//   const handleCategorySelect = (categoryName) => {
//     setSelectedCategory(categoryName);
//     setShowCategories(false);
//   };

//   const toggleSubMenu = (menuName) => {
//     if (expandedMenu === menuName) {
//       setExpandedMenu(null);
//     } else {
//       setExpandedMenu(menuName);
//     }
//   };

//   // Handle notification click
//   const handleNotificationClick = (event) => {
//     event.stopPropagation();
//     setShowNotifications(!showNotifications);
//   };

//   // Mark notification as read and navigate
//   const handleNotificationItemClick = async (notification) => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) return;

//       await axios.post(`${baseurl}/notifications/mark-read/`, {
//         user_id: parseInt(userId),
//         notification_status_ids: [notification.notification_status_id]
//       });

//       const updatedNotifications = notifications.map(n => 
//         n.notification_status_id === notification.notification_status_id 
//           ? { ...n, is_read: true } 
//           : n
//       );

//       setNotifications(updatedNotifications);

//       const newUnreadCount = updatedNotifications.filter(n => !n.is_read).length;
//       setUnreadCount(newUnreadCount);

//       setShowNotifications(false);

//       if (notification.property !== null) {
//         navigate(`/client-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;

//         if (productId && variantId) {
//           navigate(`/client-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/client-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/client-product-details/${variantId}`);
//         }
//       }

//     } catch (error) {
//       console.error("Error marking client notification as read:", error);
//       const updatedNotifications = notifications.map(n => 
//         n.notification_status_id === notification.notification_status_id 
//           ? { ...n, is_read: true } 
//           : n
//       );

//       setNotifications(updatedNotifications);
//       const newUnreadCount = updatedNotifications.filter(n => !n.is_read).length;
//       setUnreadCount(newUnreadCount);

//       setShowNotifications(false);

//       if (notification.property !== null) {
//         navigate(`/client-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;

//         if (productId && variantId) {
//           navigate(`/client-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/client-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/client-product-details/${variantId}`);
//         }
//       }
//     }
//   };

//   // Format notification message
//   const formatNotificationMessage = (notification) => {
//     if (notification.property !== null) {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//           <div className="wn-notification-subtitle">Property Update</div>
//         </div>
//       );
//     } else if (notification.product !== null) {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//           <div className="wn-notification-subtitle">Product Update</div>
//         </div>
//       );
//     } else {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//         </div>
//       );
//     }
//   };

//   const handleLogout = () => {
//     console.log("Client logged out");

//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("clientData");
//     localStorage.removeItem("user_id");
//     localStorage.removeItem("email");
//     localStorage.removeItem("username");
//     localStorage.removeItem("phone_number");
//     localStorage.removeItem("referral_id");
//     localStorage.removeItem("referred_by");
//     localStorage.removeItem("user_name");
//     localStorage.removeItem("user_image");
//     localStorage.removeItem("token");
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     localStorage.removeItem("user_roles");

//     sessionStorage.clear();

//     setOpen(false);
//     setNotifications([]);
//     setUnreadCount(0);
//     setCartItems([]);
//     setCartItemCount(0);
//     setCartTotalQuantity(0);
//     setWishlistItems([]);
//     setWishlistCount(0);

//     if (window.ReactNativeWebView) {
//       window.ReactNativeWebView.postMessage("");
//     }

//     navigate("/");
//   };

//   // Handle wishlist click
//   const handleWishlistClick = () => {
//     navigate("/client-wishlist");
//   };

//   // Handle cart click
//   const handleCartClick = () => {
//     navigate("/client-add-to-cart");
//   };

//   // Handle profile click
//   const handleProfileClick = () => {
//     navigate("/client-profile");
//   };

//   // Handle mobile search click
//   const handleMobileSearchClick = () => {
//     setShowMobileSearch(true);
//   };

//   // Close mobile search modal
//   const closeMobileSearch = () => {
//     setShowMobileSearch(false);
//   };

//   // Function to get full image URL
//   const getFullImageUrl = (imagePath) => {
//     if (!imagePath) return null;
//     if (imagePath.startsWith('http')) return imagePath;
//     if (imagePath.startsWith('/media/')) return `${baseurl}${imagePath}`;
//     if (!imagePath.startsWith('/')) return `${baseurl}/media/${imagePath}`;
//     return `${baseurl}${imagePath}`;
//   };

//   // Define navigation items
//   const menuItems = [
//     { path: "/client-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
//     { path: "/client-add-property-form", name: "Add Property", icon: <FaHome /> },
//     { path: "/client-properties", name: "Properties", icon: <FaBuilding /> },
//     { path: "/client-my-properties", name: "My Properties", icon: <FaClipboardList /> },
//     { path: "/client-busineess-category", name: "Products", icon: <FaBriefcase /> },
//     { path: "/client-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/client-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//     { path: "/client-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//     { path: "/client-my-plans", name: "My Plans", icon: <FaCreditCard /> },
//     { path: "/client-wishlist", name: "My Wishlist", icon: <FaHeart /> },
//     { path: "/client-add-to-cart", name: "My Cart", icon: <FaShoppingCart /> },
//     { path: "/client-orders", name: "Orders", icon: <FaCreditCard /> },
//     { path: "/client-profile", name: "Profile", icon: <FaUserCircle /> },
//   ];

//   return (
//     <>
//       {/* NAVBAR */}
//       <header className="wn-navbar">
//         <div className="wn-nav-left">
//           <button className="wn-menu-btn" onClick={() => setOpen(true)}>☰</button>
//           <div className="wn-logo">
//             <img 
//               src={logoImage} 
//               alt="Shriraj Logo" 
//               className="wn-logo-img"
//             />
//           </div>
//         </div>

//         {/* Desktop Search Bar */}
//         <div className="wn-desktop-search">
//           <ClientSearchBar placeholder="Search products, businesses..." />
//         </div>

//         {/* Mobile Search Button */}
//         <button 
//           className="wn-mobile-search-btn"
//           onClick={handleMobileSearchClick}
//           aria-label="Search"
//         >
//           <FaSearch size={18} />
//         </button>

//         <div className="wn-nav-right">
//           {/* Notification Icon */}
//           <div 
//             ref={notificationRef}
//             className="wn-notification-container"
//           >
//             <div 
//               className="wn-notification-icon" 
//               onClick={handleNotificationClick}
//               title="Notifications"
//             >
//               <FaBell size={16} />
//               {unreadCount > 0 && (
//                 <span className="wn-notification-badge">{unreadCount}</span>
//               )}
//             </div>

//             {showNotifications && (
//               <div className="wn-notifications-dropdown">
//                 <div className="wn-notifications-header">
//                   <h4>Client Notifications</h4>
//                 </div>

//                 <div className="wn-notifications-list">
//                   {notifications.length > 0 ? (
//                     notifications.map((notification) => (
//                       <div 
//                         key={notification.notification_status_id}
//                         className={`wn-notification-item ${!notification.is_read ? 'wn-unread' : ''}`}
//                         onClick={() => handleNotificationItemClick(notification)}
//                       >
//                         <div className="wn-notification-content">
//                           {formatNotificationMessage(notification)}
//                           <small className="wn-notification-time">
//                             {new Date(notification.created_at).toLocaleDateString('en-US', {
//                               month: 'short',
//                               day: 'numeric',
//                               hour: '2-digit',
//                               minute: '2-digit'
//                             })}
//                           </small>
//                         </div>
//                         {!notification.is_read && (
//                           <div className="wn-unread-dot"></div>
//                         )}
//                       </div>
//                     ))
//                   ) : (
//                     <div className="wn-no-notifications">
//                       No notifications yet
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Wishlist Icon */}
//           <div 
//             className="wn-wishlist" 
//             onClick={handleWishlistClick}
//             title={`Wishlist: ${wishlistCount} item${wishlistCount !== 1 ? 's' : ''}`}
//             style={{ 
//               opacity: wishlistLoading ? 0.7 : 1,
//               cursor: wishlistLoading ? 'not-allowed' : 'pointer'
//             }}
//           >
//             <FaHeart size={16} />
//             {wishlistCount > 0 && (
//               <span className="wn-wishlist-badge">{wishlistCount > 99 ? '99+' : wishlistCount}</span>
//             )}
//           </div>

//           {/* Cart Icon */}
//           <div 
//             className="wn-cart" 
//             onClick={handleCartClick}
//             title={`Cart: ${cartItemCount} item${cartItemCount !== 1 ? 's' : ''} (${cartTotalQuantity} total)`}
//             style={{ 
//               opacity: cartLoading ? 0.7 : 1,
//               cursor: cartLoading ? 'not-allowed' : 'pointer'
//             }}
//           >
//             <FaShoppingCart size={16} />
//             {cartItemCount > 0 && (
//               <span className="wn-cart-badge">{cartItemCount > 99 ? '99+' : cartItemCount}</span>
//             )}
//           </div>

//           {/* Profile Image */}
//           <div 
//             className="wn-profile-image-container" 
//             onClick={handleProfileClick}
//             title="Profile"
//             ref={profileRef}
//           >
//             {userData.image ? (
//               <img 
//                 src={getFullImageUrl(userData.image)} 
//                 alt="Profile" 
//                 className="wn-profile-image"
//                 onError={(e) => {
//                   console.error("Error loading image:", userData.image);
//                   e.target.onerror = null;
//                   e.target.style.display = 'none';
//                   if (e.target.nextSibling) {
//                     e.target.nextSibling.style.display = 'flex';
//                   } else {
//                     const fallback = document.createElement('div');
//                     fallback.className = 'wn-profile-image-fallback';
//                     fallback.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg>';
//                     e.target.parentNode.appendChild(fallback);
//                   }
//                 }}
//               />
//             ) : null}
//             {!userData.image && (
//               <div className="wn-profile-image-fallback">
//                 <FaUserCircle size={24} />
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Mobile Search Modal */}
//       {showMobileSearch && (
//         <div className="wn-mobile-search-modal" onClick={closeMobileSearch}>
//           <div className="wn-mobile-search-content" onClick={(e) => e.stopPropagation()}>
//             <div className="wn-mobile-search-header">
//               <h4>Search</h4>
//               <button 
//                 className="wn-mobile-search-close"
//                 onClick={closeMobileSearch}
//               >
//                 ✕
//               </button>
//             </div>
//             <ClientSearchBar placeholder="Search products, businesses, properties..." />
//           </div>
//         </div>
//       )}

//       {/* OVERLAY */}
//       {open && <div className="wn-overlay" onClick={() => setOpen(false)} />}

//       {/* SIDEBAR */}
//       <aside className={`wn-sidebar ${open ? "open" : ""}`}>
//         {/* Header with Logo and User Info */}
//         <div className="wn-sidebar-header">
//           <div className="wn-logo-with-user">
//             <img 
//               src={logoImage} 
//               alt="Shriraj Logo" 
//               className="wn-logo-img-sidebar"
//             />
//             <div className="wn-user-info-compact">
//               <div className="wn-user-details-compact">
//                 {userData.email && (
//                   <div className="wn-detail-item">
//                     <FaEnvelope className="wn-detail-icon" size={10} />
//                     <span className="wn-detail-text">{userData.email}</span>
//                   </div>
//                 )}

//                 {userData.phone_number && (
//                   <div className="wn-detail-item">
//                     <FaPhone className="wn-detail-icon" size={10} />
//                     <span className="wn-detail-text">
//                       {userData.phone_number}
//                     </span>
//                   </div>
//                 )}

//                 {userData.referral_id ? (
//                   <div className="wn-detail-item">
//                     <FaIdCard className="wn-detail-icon" size={10} />
//                     <span className="wn-detail-text">
//                       Ref ID: {userData.referral_id}
//                     </span>
//                   </div>
//                 ) : (
//                   <div className="wn-detail-item">
//                     <FaIdCard className="wn-detail-icon" size={10} />
//                     <span className="wn-detail-text">Ref ID: None</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <button className="wn-close-btn" onClick={() => setOpen(false)}>✕</button>
//         </div>

//         {/* Navigation Items */}
//         <div className="wn-nav-section">
//           <div className="wn-section-title">User Menu</div>
//           <ul className="wn-menu-list">
//             {menuItems.map((item, index) => (
//               <li key={item.name || item.path}>
//                 <Link 
//                   to={item.path} 
//                   className="wn-sidebar-link"
//                   onClick={() => setOpen(false)}
//                 >
//                   <span className="wn-sidebar-icon">{item.icon}</span>
//                   <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>
//                     {item.name}
//                   </span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="wn-divider" />

//         {/* Logout Button */}
//         <div className="wn-logout-section">
//           <button 
//             className="wn-logout-btn"
//             onClick={handleLogout}
//           >
//             <span className="wn-logout-icon">
//               <FaSignOutAlt />
//             </span>
//             <span className="wn-logout-text">Logout</span>
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default ClientNavbar;


//===========================



// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Client_Navbar.css";
// import logoImage from "../../Logos/logo1.png";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { baseurl } from "../../BaseURL/BaseURL";
// import ClientSearchBar from "./ClientSearchBar";

// // Import FontAwesome icons
// import { 
//   FaTachometerAlt, 
//   FaHome, 
//   FaBuilding, 
//   FaUsers, 
//   FaClipboardList, 
//   FaCogs,
//   FaCalendarAlt,
//   FaChartLine,
//   FaBriefcase,
//   FaFileAlt,
//   FaTag,
//   FaUserCircle,
//   FaSignOutAlt,
//   FaCaretDown,
//   FaCaretRight,
//   FaMoneyBillWave,
//   FaHandHoldingUsd,
//   FaCreditCard,
//   FaLayerGroup,
//   FaGraduationCap,
//   FaQuestionCircle,
//   FaExchangeAlt,
//   FaDatabase,
//   FaSitemap,
//   FaEye,
//   FaRobot,
//   FaUserTie,
//   FaStar,
//   FaEnvelope,
//   FaPhone,
//   FaIdCard,
//   FaBell,
//   FaHeart,
//   FaShoppingCart,
//   FaSearch,
//   FaBoxOpen // Added for Orders icon
// } from "react-icons/fa";

// const ClientNavbar = () => {
//   const [open, setOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [showCategories, setShowCategories] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [expandedMenu, setExpandedMenu] = useState(null);
//   const [userData, setUserData] = useState({
//     email: "",
//     phone_number: "",
//     referral_id: "",
//     username: "",
//     user_name: "",
//     referred_by: "",
//     image: ""
//   });

//   // Notification states
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showNotifications, setShowNotifications] = useState(false);

//   // Cart states
//   const [cartItems, setCartItems] = useState([]);
//   const [cartItemCount, setCartItemCount] = useState(0);
//   const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
//   const [cartLoading, setCartLoading] = useState(false);

//   // Wishlist states
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [wishlistLoading, setWishlistLoading] = useState(false);

//   // Mobile search modal state
//   const [showMobileSearch, setShowMobileSearch] = useState(false);

//   const dropdownRef = useRef(null);
//   const notificationRef = useRef(null);
//   const profileRef = useRef(null);
//   const loginUrl = "/login";
//   const signupUrl = "/register";

//   const navigate = useNavigate();

//   // Get user ID from localStorage
//   const userId = localStorage.getItem("user_id");

//   // Fetch user data from API to get the image
//   const fetchUserDataFromAPI = async () => {
//     if (!userId) return;

//     try {
//       const response = await axios.get(`${baseurl}/users/${userId}/`);
//       console.log("User data from API:", response.data);

//       if (response.data) {
//         if (response.data.image) {
//           localStorage.setItem("user_image", response.data.image);
//         }

//         setUserData(prevData => ({
//           ...prevData,
//           email: response.data.email || prevData.email,
//           phone_number: response.data.phone_number || prevData.phone_number,
//           referral_id: response.data.referral_id || prevData.referral_id,
//           username: response.data.username || prevData.username,
//           user_name: response.data.user_name || prevData.user_name,
//           referred_by: response.data.referred_by || prevData.referred_by,
//           image: response.data.image || prevData.image
//         }));
//       }
//     } catch (error) {
//       console.error("Error fetching user data from API:", error);
//     }
//   };

//   // Fetch user data from localStorage on component mount
//   useEffect(() => {
//     const fetchUserData = () => {
//       const storedUserData = {
//         email: localStorage.getItem("email") || "",
//         phone_number: localStorage.getItem("phone_number") || "",
//         referral_id: localStorage.getItem("referral_id") || "",
//         username: localStorage.getItem("username") || "",
//         user_name: localStorage.getItem("user_name") || "",
//         referred_by: localStorage.getItem("referred_by") || "",
//         image: localStorage.getItem("user_image") || ""
//       };
//       setUserData(storedUserData);
//       console.log("User data from localStorage:", storedUserData);
//     };

//     fetchUserData();
//     fetchUserDataFromAPI();

//     const handleStorageChange = () => {
//       fetchUserData();
//     };

//     window.addEventListener('storage', handleStorageChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, [userId]);

//   /* ================= FETCH CART ITEMS ================= */
//   const fetchCartItems = async () => {
//     if (!userId) {
//       setCartItems([]);
//       setCartItemCount(0);
//       setCartTotalQuantity(0);
//       return;
//     }

//     setCartLoading(true);
//     try {
//       const response = await axios.get(`${baseurl}/cart/?user=${userId}`);

//       const cartResponse = response.data;
//       let userCartItems = [];

//       if (cartResponse.results && Array.isArray(cartResponse.results)) {
//         userCartItems = cartResponse.results;
//       } else if (Array.isArray(cartResponse)) {
//         userCartItems = cartResponse;
//       }

//       setCartItems(userCartItems);

//       if (cartResponse.count !== undefined) {
//         setCartItemCount(cartResponse.count);
//       } else {
//         setCartItemCount(userCartItems.length);
//       }

//       const totalQuantity = userCartItems.reduce((total, item) => {
//         return total + (item.quantity || 1);
//       }, 0);

//       setCartTotalQuantity(totalQuantity);

//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//       setCartItems([]);
//       setCartItemCount(0);
//       setCartTotalQuantity(0);
//     } finally {
//       setCartLoading(false);
//     }
//   };

//   /* ================= FETCH WISHLIST ITEMS ================= */
//   const fetchWishlistItems = async () => {
//     if (!userId) {
//       setWishlistItems([]);
//       setWishlistCount(0);
//       return;
//     }

//     setWishlistLoading(true);
//     try {
//       const response = await axios.get(`${baseurl}/wishlist/?user=${userId}`);

//       const wishlistResponse = response.data;
//       let userWishlistItems = [];

//       if (wishlistResponse.results && Array.isArray(wishlistResponse.results)) {
//         userWishlistItems = wishlistResponse.results;
//       } else if (Array.isArray(wishlistResponse)) {
//         userWishlistItems = wishlistResponse;
//       }

//       setWishlistItems(userWishlistItems);

//       if (wishlistResponse.count !== undefined) {
//         setWishlistCount(wishlistResponse.count);
//       } else {
//         setWishlistCount(userWishlistItems.length);
//       }

//     } catch (error) {
//       console.error("Error fetching wishlist items:", error);
//       setWishlistItems([]);
//       setWishlistCount(0);
//     } finally {
//       setWishlistLoading(false);
//     }
//   };

//   // Fetch cart items on component mount and set up polling
//   useEffect(() => {
//     if (userId) {
//       fetchCartItems();
//       const cartIntervalId = setInterval(fetchCartItems, 5000);
//       return () => clearInterval(cartIntervalId);
//     } else {
//       setCartItems([]);
//       setCartItemCount(0);
//       setCartTotalQuantity(0);
//     }
//   }, [userId]);

//   // Fetch wishlist items on component mount and set up polling
//   useEffect(() => {
//     if (userId) {
//       fetchWishlistItems();
//       const wishlistIntervalId = setInterval(fetchWishlistItems, 5000);
//       return () => clearInterval(wishlistIntervalId);
//     } else {
//       setWishlistItems([]);
//       setWishlistCount(0);
//     }
//   }, [userId]);

//   // Listen for cart updates from other components
//   useEffect(() => {
//     const handleCartUpdate = () => {
//       fetchCartItems();
//     };

//     window.addEventListener('cartUpdated', handleCartUpdate);

//     return () => {
//       window.removeEventListener('cartUpdated', handleCartUpdate);
//     };
//   }, []);

//   // Listen for wishlist updates from other components
//   useEffect(() => {
//     const handleWishlistUpdate = () => {
//       fetchWishlistItems();
//     };

//     window.addEventListener('wishlistUpdated', handleWishlistUpdate);

//     return () => {
//       window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
//     };
//   }, []);

//   // Fetch notifications for the user
//   const fetchNotifications = async () => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) return;

//       const response = await axios.get(`${baseurl}/notifications/?user=${userId}&is_read=false`);

//       const allNotifications = response.data.results || [];

//       const apiUnreadCount = response.data.unread_count;
//       if (apiUnreadCount !== undefined) {
//         setUnreadCount(apiUnreadCount);
//       } else {
//         const localUnreadCount = allNotifications.filter(n => !n.is_read).length;
//         setUnreadCount(localUnreadCount);
//       }

//       setNotifications(allNotifications);

//     } catch (error) {
//       console.error("Error fetching client notifications:", error);
//       const unread = notifications.filter(notification => !notification.is_read);
//       setUnreadCount(unread.length);
//     }
//   };

//   // Fetch notifications on component mount and set up polling
//   useEffect(() => {
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       fetchNotifications();
//       const intervalId = setInterval(fetchNotifications, 30000);
//       return () => clearInterval(intervalId);
//     }
//   }, []);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowCategories(false);
//       }

//       if (notificationRef.current && !notificationRef.current.contains(event.target)) {
//         setShowNotifications(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleDropdownToggle = (event) => {
//     event.stopPropagation();
//     setShowCategories(!showCategories);
//   };

//   const handleCategorySelect = (categoryName) => {
//     setSelectedCategory(categoryName);
//     setShowCategories(false);
//   };

//   const toggleSubMenu = (menuName) => {
//     if (expandedMenu === menuName) {
//       setExpandedMenu(null);
//     } else {
//       setExpandedMenu(menuName);
//     }
//   };

//   // Handle notification click
//   const handleNotificationClick = (event) => {
//     event.stopPropagation();
//     setShowNotifications(!showNotifications);
//   };

//   // Mark notification as read and navigate
//   const handleNotificationItemClick = async (notification) => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) return;

//       await axios.post(`${baseurl}/notifications/mark-read/`, {
//         user_id: parseInt(userId),
//         notification_status_ids: [notification.notification_status_id]
//       });

//       const updatedNotifications = notifications.map(n => 
//         n.notification_status_id === notification.notification_status_id 
//           ? { ...n, is_read: true } 
//           : n
//       );

//       setNotifications(updatedNotifications);

//       const newUnreadCount = updatedNotifications.filter(n => !n.is_read).length;
//       setUnreadCount(newUnreadCount);

//       setShowNotifications(false);

//       if (notification.property !== null) {
//         navigate(`/client-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;

//         if (productId && variantId) {
//           navigate(`/client-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/client-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/client-product-details/${variantId}`);
//         }
//       }

//     } catch (error) {
//       console.error("Error marking client notification as read:", error);
//       const updatedNotifications = notifications.map(n => 
//         n.notification_status_id === notification.notification_status_id 
//           ? { ...n, is_read: true } 
//           : n
//       );

//       setNotifications(updatedNotifications);
//       const newUnreadCount = updatedNotifications.filter(n => !n.is_read).length;
//       setUnreadCount(newUnreadCount);

//       setShowNotifications(false);

//       if (notification.property !== null) {
//         navigate(`/client-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;

//         if (productId && variantId) {
//           navigate(`/client-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/client-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/client-product-details/${variantId}`);
//         }
//       }
//     }
//   };

//   // Format notification message
//   const formatNotificationMessage = (notification) => {
//     if (notification.property !== null) {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//           <div className="wn-notification-subtitle">Property Update</div>
//         </div>
//       );
//     } else if (notification.product !== null) {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//           <div className="wn-notification-subtitle">Product Update</div>
//         </div>
//       );
//     } else {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//         </div>
//       );
//     }
//   };

//   const handleLogout = () => {
//     console.log("Client logged out");

//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("clientData");
//     localStorage.removeItem("user_id");
//     localStorage.removeItem("email");
//     localStorage.removeItem("username");
//     localStorage.removeItem("phone_number");
//     localStorage.removeItem("referral_id");
//     localStorage.removeItem("referred_by");
//     localStorage.removeItem("user_name");
//     localStorage.removeItem("user_image");
//     localStorage.removeItem("token");
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     localStorage.removeItem("user_roles");

//     sessionStorage.clear();

//     setOpen(false);
//     setNotifications([]);
//     setUnreadCount(0);
//     setCartItems([]);
//     setCartItemCount(0);
//     setCartTotalQuantity(0);
//     setWishlistItems([]);
//     setWishlistCount(0);

//     if (window.ReactNativeWebView) {
//       window.ReactNativeWebView.postMessage("");
//     }

//     navigate("/");
//   };

//   // Handle wishlist click
//   const handleWishlistClick = () => {
//     navigate("/client-wishlist");
//   };

//   // Handle cart click
//   const handleCartClick = () => {
//     navigate("/client-add-to-cart");
//   };

//   // Handle orders click - NEW FUNCTION
//   const handleOrdersClick = () => {
//     navigate("/client-orders");
//   };

//   // Handle profile click
//   const handleProfileClick = () => {
//     navigate("/client-profile");
//   };

//   // Handle mobile search click
//   const handleMobileSearchClick = () => {
//     setShowMobileSearch(true);
//   };

//   // Close mobile search modal
//   const closeMobileSearch = () => {
//     setShowMobileSearch(false);
//   };

//   // Function to get full image URL
//   const getFullImageUrl = (imagePath) => {
//     if (!imagePath) return null;
//     if (imagePath.startsWith('http')) return imagePath;
//     if (imagePath.startsWith('/media/')) return `${baseurl}${imagePath}`;
//     if (!imagePath.startsWith('/')) return `${baseurl}/media/${imagePath}`;
//     return `${baseurl}${imagePath}`;
//   };

//   // Define navigation items
//   const menuItems = [
//     { path: "/client-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
//     { path: "/client-add-property-form", name: "Add Property", icon: <FaHome /> },
//     { path: "/client-properties", name: "Properties", icon: <FaBuilding /> },
//     { path: "/client-my-properties", name: "My Properties", icon: <FaClipboardList /> },
//     { path: "/client-busineess-category", name: "Products", icon: <FaBriefcase /> },
//     { path: "/client-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/client-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//     { path: "/client-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//     { path: "/client-my-plans", name: "My Plans", icon: <FaCreditCard /> },
//     { path: "/client-wishlist", name: "My Wishlist", icon: <FaHeart /> },
//     { path: "/client-add-to-cart", name: "My Cart", icon: <FaShoppingCart /> },
//     { path: "/client-orders", name: "Orders", icon: <FaBoxOpen /> }, // Added Orders
//     { path: "/client-profile", name: "Profile", icon: <FaUserCircle /> },
//   ];

//   return (
//     <>
//       {/* NAVBAR */}
//       <header className="wn-navbar">
//         <div className="wn-nav-left">
//           <button className="wn-menu-btn" onClick={() => setOpen(true)}>☰</button>
//  <div 
//       className="wn-logo" 
//       onClick={() => navigate("/client-busineess-category")}
//       style={{ cursor: "pointer" }}
//     >            <img 
//               src={logoImage} 
//               alt="Shriraj Logo" 
//               className="wn-logo-img"
//             />
//           </div>
//         </div>

//         {/* Desktop Search Bar */}
//         <div className="wn-desktop-search">
//           <ClientSearchBar placeholder="Search products..." />
//         </div>

//         {/* Desktop Navigation Items - NEW SECTION */}
//         <div className="wn-desktop-nav-items">
//           <div 
//             className="wn-desktop-nav-item"
//             onClick={handleOrdersClick}
//           >
//             <FaBoxOpen className="wn-desktop-nav-icon" />
//             <span className="wn-desktop-nav-text">Orders</span>
//           </div>
//         </div>

//         {/* Mobile Search Button */}
//         <button 
//           className="wn-mobile-search-btn"
//           onClick={handleMobileSearchClick}
//           aria-label="Search"
//         >
//           <FaSearch size={18} />
//         </button>

//         <div className="wn-nav-right">
//           {/* Notification Icon */}
//           <div 
//             ref={notificationRef}
//             className="wn-notification-container"
//           >
//             <div 
//               className="wn-notification-icon" 
//               onClick={handleNotificationClick}
//               title="Notifications"
//             >
//               <FaBell size={16} />
//               {unreadCount > 0 && (
//                 <span className="wn-notification-badge">{unreadCount}</span>
//               )}
//             </div>

//             {showNotifications && (
//               <div className="wn-notifications-dropdown">
//                 <div className="wn-notifications-header">
//                   <h4>Client Notifications</h4>
//                 </div>

//                 <div className="wn-notifications-list">
//                   {notifications.length > 0 ? (
//                     notifications.map((notification) => (
//                       <div 
//                         key={notification.notification_status_id}
//                         className={`wn-notification-item ${!notification.is_read ? 'wn-unread' : ''}`}
//                         onClick={() => handleNotificationItemClick(notification)}
//                       >
//                         <div className="wn-notification-content">
//                           {formatNotificationMessage(notification)}
//                           <small className="wn-notification-time">
//                             {new Date(notification.created_at).toLocaleDateString('en-US', {
//                               month: 'short',
//                               day: 'numeric',
//                               hour: '2-digit',
//                               minute: '2-digit'
//                             })}
//                           </small>
//                         </div>
//                         {!notification.is_read && (
//                           <div className="wn-unread-dot"></div>
//                         )}
//                       </div>
//                     ))
//                   ) : (
//                     <div className="wn-no-notifications">
//                       No notifications yet
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Wishlist Icon */}
//           <div 
//             className="wn-wishlist" 
//             onClick={handleWishlistClick}
//             title={`Wishlist: ${wishlistCount} item${wishlistCount !== 1 ? 's' : ''}`}
//             style={{ 
//               opacity: wishlistLoading ? 0.7 : 1,
//               cursor: wishlistLoading ? 'not-allowed' : 'pointer'
//             }}
//           >
//             <FaHeart size={16} />
//             {wishlistCount > 0 && (
//               <span className="wn-wishlist-badge">{wishlistCount > 99 ? '99+' : wishlistCount}</span>
//             )}
//           </div>

//           {/* Cart Icon */}
//           <div 
//             className="wn-cart" 
//             onClick={handleCartClick}
//             title={`Cart: ${cartItemCount} item${cartItemCount !== 1 ? 's' : ''} (${cartTotalQuantity} total)`}
//             style={{ 
//               opacity: cartLoading ? 0.7 : 1,
//               cursor: cartLoading ? 'not-allowed' : 'pointer'
//             }}
//           >
//             <FaShoppingCart size={16} />
//             {cartItemCount > 0 && (
//               <span className="wn-cart-badge">{cartItemCount > 99 ? '99+' : cartItemCount}</span>
//             )}
//           </div>

//           {/* Profile Image */}
//           <div 
//             className="wn-profile-image-container" 
//             onClick={handleProfileClick}
//             title="Profile"
//             ref={profileRef}
//           >
//             {userData.image ? (
//               <img 
//                 src={getFullImageUrl(userData.image)} 
//                 alt="Profile" 
//                 className="wn-profile-image"
//                 onError={(e) => {
//                   console.error("Error loading image:", userData.image);
//                   e.target.onerror = null;
//                   e.target.style.display = 'none';
//                   if (e.target.nextSibling) {
//                     e.target.nextSibling.style.display = 'flex';
//                   } else {
//                     const fallback = document.createElement('div');
//                     fallback.className = 'wn-profile-image-fallback';
//                     fallback.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg>';
//                     e.target.parentNode.appendChild(fallback);
//                   }
//                 }}
//               />
//             ) : null}
//             {!userData.image && (
//               <div className="wn-profile-image-fallback">
//                 <FaUserCircle size={24} />
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Mobile Search Modal */}
//       {showMobileSearch && (
//         <div className="wn-mobile-search-modal" onClick={closeMobileSearch}>
//           <div className="wn-mobile-search-content" onClick={(e) => e.stopPropagation()}>
//             <div className="wn-mobile-search-header">
//               <h4>Search</h4>
//               <button 
//                 className="wn-mobile-search-close"
//                 onClick={closeMobileSearch}
//               >
//                 ✕
//               </button>
//             </div>
//             <ClientSearchBar placeholder="Search products..." />
//           </div>
//         </div>
//       )}

//       {/* OVERLAY */}
//       {open && <div className="wn-overlay" onClick={() => setOpen(false)} />}

//       {/* SIDEBAR */}
//       <aside className={`wn-sidebar ${open ? "open" : ""}`}>
//         {/* Header with Logo and User Info */}
//         <div className="wn-sidebar-header">
//           <div className="wn-logo-with-user">
//             <img 
//               src={logoImage} 
//               alt="Shriraj Logo" 
//               className="wn-logo-img-sidebar"
//             />
//             <div className="wn-user-info-compact">
//               <div className="wn-user-details-compact">
//                 {userData.email && (
//                   <div className="wn-detail-item">
//                     <FaEnvelope className="wn-detail-icon" size={10} />
//                     <span className="wn-detail-text">{userData.email}</span>
//                   </div>
//                 )}

//                 {userData.phone_number && (
//                   <div className="wn-detail-item">
//                     <FaPhone className="wn-detail-icon" size={10} />
//                     <span className="wn-detail-text">
//                       {userData.phone_number}
//                     </span>
//                   </div>
//                 )}

//                 {userData.referral_id ? (
//                   <div className="wn-detail-item">
//                     <FaIdCard className="wn-detail-icon" size={10} />
//                     <span className="wn-detail-text">
//                       Ref ID: {userData.referral_id}
//                     </span>
//                   </div>
//                 ) : (
//                   <div className="wn-detail-item">
//                     <FaIdCard className="wn-detail-icon" size={10} />
//                     <span className="wn-detail-text">Ref ID: None</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <button className="wn-close-btn" onClick={() => setOpen(false)}>✕</button>
//         </div>

//         {/* Navigation Items */}
//         <div className="wn-nav-section">
//           <div className="wn-section-title">User Menu</div>
//           <ul className="wn-menu-list">
//             {menuItems.map((item, index) => (
//               <li key={item.name || item.path}>
//                 <Link 
//                   to={item.path} 
//                   className="wn-sidebar-link"
//                   onClick={() => setOpen(false)}
//                 >
//                   <span className="wn-sidebar-icon">{item.icon}</span>
//                   <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>
//                     {item.name}
//                   </span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="wn-divider" />

//         {/* Logout Button */}
//         <div className="wn-logout-section">
//           <button 
//             className="wn-logout-btn"
//             onClick={handleLogout}
//           >
//             <span className="wn-logout-icon">
//               <FaSignOutAlt />
//             </span>
//             <span className="wn-logout-text">Logout</span>
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default ClientNavbar;

//====================================================


// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Client_Navbar.css";
// import logoImage from "../../Logos/logo1.png";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { baseurl } from "../../BaseURL/BaseURL";
// import ClientSearchBar from "./ClientSearchBar";

// // Import FontAwesome icons
// import { 
//   FaTachometerAlt, 
//   FaHome, 
//   FaBuilding, 
//   FaUsers, 
//   FaClipboardList, 
//   FaCogs,
//   FaCalendarAlt,
//   FaChartLine,
//   FaBriefcase,
//   FaFileAlt,
//   FaTag,
//   FaUserCircle,
//   FaSignOutAlt,
//   FaCaretDown,
//   FaCaretRight,
//   FaMoneyBillWave,
//   FaHandHoldingUsd,
//   FaCreditCard,
//   FaLayerGroup,
//   FaGraduationCap,
//   FaQuestionCircle,
//   FaExchangeAlt,
//   FaDatabase,
//   FaSitemap,
//   FaEye,
//   FaRobot,
//   FaUserTie,
//   FaStar,
//   FaEnvelope,
//   FaPhone,
//   FaIdCard,
//   FaBell,
//   FaHeart,
//   FaShoppingCart,
//   FaSearch,
//   FaBoxOpen // Added for Orders icon
// } from "react-icons/fa";

// const ClientNavbar = () => {
//   const [open, setOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [showCategories, setShowCategories] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [expandedMenu, setExpandedMenu] = useState(null);
//   const [userData, setUserData] = useState({
//     email: "",
//     phone_number: "",
//     referral_id: "",
//     username: "",
//     user_name: "",
//     referred_by: "",
//     image: ""
//   });

//   // Notification states
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showNotifications, setShowNotifications] = useState(false);

//   // Cart states
//   const [cartItems, setCartItems] = useState([]);
//   const [cartItemCount, setCartItemCount] = useState(0);
//   const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
//   const [cartLoading, setCartLoading] = useState(false);

//   // Wishlist states
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [wishlistLoading, setWishlistLoading] = useState(false);

//   // Mobile search modal state
//   const [showMobileSearch, setShowMobileSearch] = useState(false);

//   const dropdownRef = useRef(null);
//   const notificationRef = useRef(null);
//   const profileRef = useRef(null);
//   const loginUrl = "/login";
//   const signupUrl = "/register";

//   const navigate = useNavigate();

//   // Get user ID from localStorage
//   const userId = localStorage.getItem("user_id");

//   // Fetch user data from API to get the image
//   const fetchUserDataFromAPI = async () => {
//     if (!userId) return;

//     try {
//       const response = await axios.get(`${baseurl}/users/${userId}/`);
//       console.log("User data from API:", response.data);

//       if (response.data) {
//         if (response.data.image) {
//           localStorage.setItem("user_image", response.data.image);
//         }

//         setUserData(prevData => ({
//           ...prevData,
//           email: response.data.email || prevData.email,
//           phone_number: response.data.phone_number || prevData.phone_number,
//           referral_id: response.data.referral_id || prevData.referral_id,
//           username: response.data.username || prevData.username,
//           user_name: response.data.user_name || prevData.user_name,
//           referred_by: response.data.referred_by || prevData.referred_by,
//           image: response.data.image || prevData.image
//         }));
//       }
//     } catch (error) {
//       console.error("Error fetching user data from API:", error);
//     }
//   };

//   // Fetch user data from localStorage on component mount
//   useEffect(() => {
//     const fetchUserData = () => {
//       const storedUserData = {
//         email: localStorage.getItem("email") || "",
//         phone_number: localStorage.getItem("phone_number") || "",
//         referral_id: localStorage.getItem("referral_id") || "",
//         username: localStorage.getItem("username") || "",
//         user_name: localStorage.getItem("user_name") || "",
//         referred_by: localStorage.getItem("referred_by") || "",
//         image: localStorage.getItem("user_image") || ""
//       };
//       setUserData(storedUserData);
//       console.log("User data from localStorage:", storedUserData);
//     };

//     fetchUserData();
//     fetchUserDataFromAPI();

//     const handleStorageChange = () => {
//       fetchUserData();
//     };

//     window.addEventListener('storage', handleStorageChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, [userId]);

//   /* ================= FETCH CART ITEMS ================= */
//   const fetchCartItems = async () => {
//     if (!userId) {
//       setCartItems([]);
//       setCartItemCount(0);
//       setCartTotalQuantity(0);
//       return;
//     }

//     setCartLoading(true);
//     try {
//       const response = await axios.get(`${baseurl}/cart/?user=${userId}`);

//       const cartResponse = response.data;
//       let userCartItems = [];

//       if (cartResponse.results && Array.isArray(cartResponse.results)) {
//         userCartItems = cartResponse.results;
//       } else if (Array.isArray(cartResponse)) {
//         userCartItems = cartResponse;
//       }

//       setCartItems(userCartItems);

//       if (cartResponse.count !== undefined) {
//         setCartItemCount(cartResponse.count);
//       } else {
//         setCartItemCount(userCartItems.length);
//       }

//       const totalQuantity = userCartItems.reduce((total, item) => {
//         return total + (item.quantity || 1);
//       }, 0);

//       setCartTotalQuantity(totalQuantity);

//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//       setCartItems([]);
//       setCartItemCount(0);
//       setCartTotalQuantity(0);
//     } finally {
//       setCartLoading(false);
//     }
//   };

//   /* ================= FETCH WISHLIST ITEMS ================= */
//   const fetchWishlistItems = async () => {
//     if (!userId) {
//       setWishlistItems([]);
//       setWishlistCount(0);
//       return;
//     }

//     setWishlistLoading(true);
//     try {
//       const response = await axios.get(`${baseurl}/wishlist/?user=${userId}`);

//       const wishlistResponse = response.data;
//       let userWishlistItems = [];

//       if (wishlistResponse.results && Array.isArray(wishlistResponse.results)) {
//         userWishlistItems = wishlistResponse.results;
//       } else if (Array.isArray(wishlistResponse)) {
//         userWishlistItems = wishlistResponse;
//       }

//       setWishlistItems(userWishlistItems);

//       if (wishlistResponse.count !== undefined) {
//         setWishlistCount(wishlistResponse.count);
//       } else {
//         setWishlistCount(userWishlistItems.length);
//       }

//     } catch (error) {
//       console.error("Error fetching wishlist items:", error);
//       setWishlistItems([]);
//       setWishlistCount(0);
//     } finally {
//       setWishlistLoading(false);
//     }
//   };

//   // Fetch cart items on component mount and set up polling
//   useEffect(() => {
//     if (userId) {
//       fetchCartItems();
//       const cartIntervalId = setInterval(fetchCartItems, 5000);
//       return () => clearInterval(cartIntervalId);
//     } else {
//       setCartItems([]);
//       setCartItemCount(0);
//       setCartTotalQuantity(0);
//     }
//   }, [userId]);

//   // Fetch wishlist items on component mount and set up polling
//   useEffect(() => {
//     if (userId) {
//       fetchWishlistItems();
//       const wishlistIntervalId = setInterval(fetchWishlistItems, 5000);
//       return () => clearInterval(wishlistIntervalId);
//     } else {
//       setWishlistItems([]);
//       setWishlistCount(0);
//     }
//   }, [userId]);

//   // Listen for cart updates from other components
//   useEffect(() => {
//     const handleCartUpdate = () => {
//       fetchCartItems();
//     };

//     window.addEventListener('cartUpdated', handleCartUpdate);

//     return () => {
//       window.removeEventListener('cartUpdated', handleCartUpdate);
//     };
//   }, []);

//   // Listen for wishlist updates from other components
//   useEffect(() => {
//     const handleWishlistUpdate = () => {
//       fetchWishlistItems();
//     };

//     window.addEventListener('wishlistUpdated', handleWishlistUpdate);

//     return () => {
//       window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
//     };
//   }, []);

//   // Fetch notifications for the user
//   const fetchNotifications = async () => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) return;

//       const response = await axios.get(`${baseurl}/notifications/?user=${userId}&is_read=false`);

//       const allNotifications = response.data.results || [];

//       const apiUnreadCount = response.data.unread_count;
//       if (apiUnreadCount !== undefined) {
//         setUnreadCount(apiUnreadCount);
//       } else {
//         const localUnreadCount = allNotifications.filter(n => !n.is_read).length;
//         setUnreadCount(localUnreadCount);
//       }

//       setNotifications(allNotifications);

//     } catch (error) {
//       console.error("Error fetching client notifications:", error);
//       const unread = notifications.filter(notification => !notification.is_read);
//       setUnreadCount(unread.length);
//     }
//   };

//   // Fetch notifications on component mount and set up polling
//   useEffect(() => {
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       fetchNotifications();
//       const intervalId = setInterval(fetchNotifications, 30000);
//       return () => clearInterval(intervalId);
//     }
//   }, []);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowCategories(false);
//       }

//       if (notificationRef.current && !notificationRef.current.contains(event.target)) {
//         setShowNotifications(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleDropdownToggle = (event) => {
//     event.stopPropagation();
//     setShowCategories(!showCategories);
//   };

//   const handleCategorySelect = (categoryName) => {
//     setSelectedCategory(categoryName);
//     setShowCategories(false);
//   };

//   const toggleSubMenu = (menuName) => {
//     if (expandedMenu === menuName) {
//       setExpandedMenu(null);
//     } else {
//       setExpandedMenu(menuName);
//     }
//   };

//   // Handle notification click
//   const handleNotificationClick = (event) => {
//     event.stopPropagation();
//     setShowNotifications(!showNotifications);
//   };

//   // Mark notification as read and navigate
//   const handleNotificationItemClick = async (notification) => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) return;

//       await axios.post(`${baseurl}/notifications/mark-read/`, {
//         user_id: parseInt(userId),
//         notification_status_ids: [notification.notification_status_id]
//       });

//       const updatedNotifications = notifications.map(n => 
//         n.notification_status_id === notification.notification_status_id 
//           ? { ...n, is_read: true } 
//           : n
//       );

//       setNotifications(updatedNotifications);

//       const newUnreadCount = updatedNotifications.filter(n => !n.is_read).length;
//       setUnreadCount(newUnreadCount);

//       setShowNotifications(false);

//       if (notification.property !== null) {
//         navigate(`/client-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;

//         if (productId && variantId) {
//           navigate(`/client-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/client-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/client-product-details/${variantId}`);
//         }
//       }

//     } catch (error) {
//       console.error("Error marking client notification as read:", error);
//       const updatedNotifications = notifications.map(n => 
//         n.notification_status_id === notification.notification_status_id 
//           ? { ...n, is_read: true } 
//           : n
//       );

//       setNotifications(updatedNotifications);
//       const newUnreadCount = updatedNotifications.filter(n => !n.is_read).length;
//       setUnreadCount(newUnreadCount);

//       setShowNotifications(false);

//       if (notification.property !== null) {
//         navigate(`/client-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;

//         if (productId && variantId) {
//           navigate(`/client-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/client-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/client-product-details/${variantId}`);
//         }
//       }
//     }
//   };

//   // Format notification message
//   const formatNotificationMessage = (notification) => {
//     if (notification.property !== null) {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//           <div className="wn-notification-subtitle">Property Update</div>
//         </div>
//       );
//     } else if (notification.product !== null) {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//           <div className="wn-notification-subtitle">Product Update</div>
//         </div>
//       );
//     } else {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//         </div>
//       );
//     }
//   };

//   const handleLogout = () => {
//     console.log("Client logged out");

//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("clientData");
//     localStorage.removeItem("user_id");
//     localStorage.removeItem("email");
//     localStorage.removeItem("username");
//     localStorage.removeItem("phone_number");
//     localStorage.removeItem("referral_id");
//     localStorage.removeItem("referred_by");
//     localStorage.removeItem("user_name");
//     localStorage.removeItem("user_image");
//     localStorage.removeItem("token");
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     localStorage.removeItem("user_roles");

//     sessionStorage.clear();

//     setOpen(false);
//     setNotifications([]);
//     setUnreadCount(0);
//     setCartItems([]);
//     setCartItemCount(0);
//     setCartTotalQuantity(0);
//     setWishlistItems([]);
//     setWishlistCount(0);

//     if (window.ReactNativeWebView) {
//       window.ReactNativeWebView.postMessage("");
//     }

//     navigate("/");
//   };

//   // Handle wishlist click
//   const handleWishlistClick = () => {
//     navigate("/client-wishlist");
//   };

//   // Handle cart click
//   const handleCartClick = () => {
//     navigate("/client-add-to-cart");
//   };

//   // Handle orders click - NEW FUNCTION
//   const handleOrdersClick = () => {
//     navigate("/client-orders");
//   };

//   // Handle profile click
//   const handleProfileClick = () => {
//     navigate("/client-profile");
//   };

//   // Handle mobile search click
//   const handleMobileSearchClick = () => {
//     setShowMobileSearch(true);
//   };

//   // Close mobile search modal
//   const closeMobileSearch = () => {
//     setShowMobileSearch(false);
//   };

//   // Function to get full image URL
//   const getFullImageUrl = (imagePath) => {
//     if (!imagePath) return null;
//     if (imagePath.startsWith('http')) return imagePath;
//     if (imagePath.startsWith('/media/')) return `${baseurl}${imagePath}`;
//     if (!imagePath.startsWith('/')) return `${baseurl}/media/${imagePath}`;
//     return `${baseurl}${imagePath}`;
//   };

//   // Define navigation items
//   const menuItems = [
//     { path: "/client-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
//     { path: "/client-add-property-form", name: "Add Property", icon: <FaHome /> },
//     { path: "/client-properties", name: "Properties", icon: <FaBuilding /> },
//     { path: "/client-my-properties", name: "My Properties", icon: <FaClipboardList /> },
//     { path: "/client-busineess-category", name: "Products", icon: <FaBriefcase /> },
//     { path: "/client-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/client-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//     { path: "/client-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//     { path: "/client-my-plans", name: "My Plans", icon: <FaCreditCard /> },
//     { path: "/client-wishlist", name: "My Wishlist", icon: <FaHeart /> },
//     { path: "/client-add-to-cart", name: "My Cart", icon: <FaShoppingCart /> },
//     { path: "/client-orders", name: "Orders", icon: <FaBoxOpen /> },
//     { path: "/client-profile", name: "Profile", icon: <FaUserCircle /> },
//   ];

//   return (
//     <>
//       {/* NAVBAR */}
//       <header className="wn-navbar">
//         <div className="wn-nav-left">
//           <button className="wn-menu-btn" onClick={() => setOpen(true)}>☰</button>
//           {/* FIXED: Logo now navigates to client products page */}
//           <div 
//             className="wn-logo" 
//             onClick={() => navigate("/client-busineess-category")}
//             style={{ cursor: "pointer" }}
//           >
//             <img 
//               src={logoImage} 
//               alt="Shriraj Logo" 
//               className="wn-logo-img"
//             />
//           </div>
//         </div>

//         {/* Desktop Search Bar */}
//         <div className="wn-desktop-search">
//           <ClientSearchBar placeholder="Search products..." />
//         </div>

//         {/* User Panel Indicator - NEW SECTION */}
//         <div className="wn-user-panel-indicator">
//           <div className="wn-panel-badge">
//             <FaUserCircle className="wn-panel-icon" />
//             <span className="wn-panel-name">Client </span>
//           </div>
//           <div className="wn-user-role-info">
//             <span className="wn-user-name">
//               {userData.user_name || userData.username || "Client"}
//             </span>
//             {/* <span className="wn-user-role">Client</span> */}
//           </div>
//         </div>

//         {/* Desktop Navigation Items */}
//         <div className="wn-desktop-nav-items">
//           <div 
//             className="wn-desktop-nav-item"
//             onClick={handleOrdersClick}
//           >
//             <FaBoxOpen className="wn-desktop-nav-icon" />
//             <span className="wn-desktop-nav-text">Orders</span>
//           </div>
//         </div>

//         {/* Mobile Search Button */}
//         <button 
//           className="wn-mobile-search-btn"
//           onClick={handleMobileSearchClick}
//           aria-label="Search"
//         >
//           <FaSearch size={18} />
//         </button>

//         <div className="wn-nav-right">
//           {/* Notification Icon */}
//           <div 
//             ref={notificationRef}
//             className="wn-notification-container"
//           >
//             <div 
//               className="wn-notification-icon" 
//               onClick={handleNotificationClick}
//               title="Notifications"
//             >
//               <FaBell size={16} />
//               {unreadCount > 0 && (
//                 <span className="wn-notification-badge">{unreadCount}</span>
//               )}
//             </div>

//             {showNotifications && (
//               <div className="wn-notifications-dropdown">
//                 <div className="wn-notifications-header">
//                   <h4>Client Notifications</h4>
//                 </div>

//                 <div className="wn-notifications-list">
//                   {notifications.length > 0 ? (
//                     notifications.map((notification) => (
//                       <div 
//                         key={notification.notification_status_id}
//                         className={`wn-notification-item ${!notification.is_read ? 'wn-unread' : ''}`}
//                         onClick={() => handleNotificationItemClick(notification)}
//                       >
//                         <div className="wn-notification-content">
//                           {formatNotificationMessage(notification)}
//                           <small className="wn-notification-time">
//                             {new Date(notification.created_at).toLocaleDateString('en-US', {
//                               month: 'short',
//                               day: 'numeric',
//                               hour: '2-digit',
//                               minute: '2-digit'
//                             })}
//                           </small>
//                         </div>
//                         {!notification.is_read && (
//                           <div className="wn-unread-dot"></div>
//                         )}
//                       </div>
//                     ))
//                   ) : (
//                     <div className="wn-no-notifications">
//                       No notifications yet
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Wishlist Icon */}
//           <div 
//             className="wn-wishlist" 
//             onClick={handleWishlistClick}
//             title={`Wishlist: ${wishlistCount} item${wishlistCount !== 1 ? 's' : ''}`}
//             style={{ 
//               opacity: wishlistLoading ? 0.7 : 1,
//               cursor: wishlistLoading ? 'not-allowed' : 'pointer'
//             }}
//           >
//             <FaHeart size={16} />
//             {wishlistCount > 0 && (
//               <span className="wn-wishlist-badge">{wishlistCount > 99 ? '99+' : wishlistCount}</span>
//             )}
//           </div>

//           {/* Cart Icon */}
//           <div 
//             className="wn-cart" 
//             onClick={handleCartClick}
//             title={`Cart: ${cartItemCount} item${cartItemCount !== 1 ? 's' : ''} (${cartTotalQuantity} total)`}
//             style={{ 
//               opacity: cartLoading ? 0.7 : 1,
//               cursor: cartLoading ? 'not-allowed' : 'pointer'
//             }}
//           >
//             <FaShoppingCart size={16} />
//             {cartItemCount > 0 && (
//               <span className="wn-cart-badge">{cartItemCount > 99 ? '99+' : cartItemCount}</span>
//             )}
//           </div>

//           {/* Profile Image */}
//           <div 
//             className="wn-profile-image-container" 
//             onClick={handleProfileClick}
//             title="Profile"
//             ref={profileRef}
//           >
//             {userData.image ? (
//               <img 
//                 src={getFullImageUrl(userData.image)} 
//                 alt="Profile" 
//                 className="wn-profile-image"
//                 onError={(e) => {
//                   console.error("Error loading image:", userData.image);
//                   e.target.onerror = null;
//                   e.target.style.display = 'none';
//                   if (e.target.nextSibling) {
//                     e.target.nextSibling.style.display = 'flex';
//                   } else {
//                     const fallback = document.createElement('div');
//                     fallback.className = 'wn-profile-image-fallback';
//                     fallback.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg>';
//                     e.target.parentNode.appendChild(fallback);
//                   }
//                 }}
//               />
//             ) : null}
//             {!userData.image && (
//               <div className="wn-profile-image-fallback">
//                 <FaUserCircle size={24} />
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Mobile Search Modal */}
//       {showMobileSearch && (
//         <div className="wn-mobile-search-modal" onClick={closeMobileSearch}>
//           <div className="wn-mobile-search-content" onClick={(e) => e.stopPropagation()}>
//             <div className="wn-mobile-search-header">
//               <h4>Search</h4>
//               <button 
//                 className="wn-mobile-search-close"
//                 onClick={closeMobileSearch}
//               >
//                 ✕
//               </button>
//             </div>
//             <ClientSearchBar placeholder="Search products..." />
//           </div>
//         </div>
//       )}

//       {/* OVERLAY */}
//       {open && <div className="wn-overlay" onClick={() => setOpen(false)} />}

//       {/* SIDEBAR */}
//       <aside className={`wn-sidebar ${open ? "open" : ""}`}>
//         {/* Header with Logo and User Info */}
//         <div className="wn-sidebar-header">
//           <div className="wn-logo-with-user">
//             <img 
//               src={logoImage} 
//               alt="Shriraj Logo" 
//               className="wn-logo-img-sidebar"
//             />
//             <div className="wn-user-info-compact">
//               <div className="wn-user-details-compact">
//                 {userData.email && (
//                   <div className="wn-detail-item">
//                     <FaEnvelope className="wn-detail-icon" size={10} />
//                     <span className="wn-detail-text">{userData.email}</span>
//                   </div>
//                 )}

//                 {userData.phone_number && (
//                   <div className="wn-detail-item">
//                     <FaPhone className="wn-detail-icon" size={10} />
//                     <span className="wn-detail-text">
//                       {userData.phone_number}
//                     </span>
//                   </div>
//                 )}

//                 {userData.referral_id ? (
//                   <div className="wn-detail-item">
//                     <FaIdCard className="wn-detail-icon" size={10} />
//                     <span className="wn-detail-text">
//                       Ref ID: {userData.referral_id}
//                     </span>
//                   </div>
//                 ) : (
//                   <div className="wn-detail-item">
//                     <FaIdCard className="wn-detail-icon" size={10} />
//                     <span className="wn-detail-text">Ref ID: None</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <button className="wn-close-btn" onClick={() => setOpen(false)}>✕</button>
//         </div>

//         {/* Navigation Items */}
//         <div className="wn-nav-section">
//           <div className="wn-section-title">User Menu</div>
//           <ul className="wn-menu-list">
//             {menuItems.map((item, index) => (
//               <li key={item.name || item.path}>
//                 <Link 
//                   to={item.path} 
//                   className="wn-sidebar-link"
//                   onClick={() => setOpen(false)}
//                 >
//                   <span className="wn-sidebar-icon">{item.icon}</span>
//                   <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>
//                     {item.name}
//                   </span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="wn-divider" />

//         {/* Logout Button */}
//         <div className="wn-logout-section">
//           <button 
//             className="wn-logout-btn"
//             onClick={handleLogout}
//           >
//             <span className="wn-logout-icon">
//               <FaSignOutAlt />
//             </span>
//             <span className="wn-logout-text">Logout</span>
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default ClientNavbar;

//========================================


// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Client_Navbar.css";
// import logoImage from "../../Logos/logo1.png";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { baseurl } from "../../BaseURL/BaseURL";
// import ClientSearchBar from "./ClientSearchBar";

// // Import FontAwesome icons
// import {
//   FaTachometerAlt,
//   FaHome,
//   FaBuilding,
//   FaUsers,
//   FaClipboardList,
//   FaCogs,
//   FaCalendarAlt,
//   FaChartLine,
//   FaBriefcase,
//   FaFileAlt,
//   FaTag,
//   FaUserCircle,
//   FaSignOutAlt,
//   FaCaretDown,
//   FaCaretRight,
//   FaMoneyBillWave,
//   FaHandHoldingUsd,
//   FaCreditCard,
//   FaLayerGroup,
//   FaGraduationCap,
//   FaQuestionCircle,
//   FaExchangeAlt,
//   FaDatabase,
//   FaSitemap,
//   FaEye,
//   FaRobot,
//   FaUserTie,
//   FaStar,
//   FaEnvelope,
//   FaPhone,
//   FaIdCard,
//   FaBell,
//   FaHeart,
//   FaShoppingCart,
//   FaSearch,
//   FaBoxOpen // Added for Orders icon
// } from "react-icons/fa";

// const ClientNavbar = () => {
//   const [open, setOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [showCategories, setShowCategories] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [expandedMenu, setExpandedMenu] = useState(null);
//   const [userData, setUserData] = useState({
//     email: "",
//     phone_number: "",
//     referral_id: "",
//     username: "",
//     user_name: "",
//     referred_by: "",
//     image: ""
//   });
//   const [showProfileTooltip, setShowProfileTooltip] = useState(false);

//   // Notification states
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showNotifications, setShowNotifications] = useState(false);

//   // Cart states
//   const [cartItems, setCartItems] = useState([]);
//   const [cartItemCount, setCartItemCount] = useState(0);
//   const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
//   const [cartLoading, setCartLoading] = useState(false);

//   // Wishlist states
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [wishlistLoading, setWishlistLoading] = useState(false);

//   // Mobile search modal state
//   const [showMobileSearch, setShowMobileSearch] = useState(false);

//   const dropdownRef = useRef(null);
//   const notificationRef = useRef(null);
//   const profilePanelRef = useRef(null);
//   const loginUrl = "/login";
//   const signupUrl = "/register";

//   const navigate = useNavigate();

//   // Get user ID from localStorage
//   const userId = localStorage.getItem("user_id");

//   // Fetch user data from API to get the image
//   const fetchUserDataFromAPI = async () => {
//     if (!userId) return;

//     try {
//       const response = await axios.get(`${baseurl}/users/${userId}/`);
//       console.log("User data from API:", response.data);

//       if (response.data) {
//         if (response.data.image) {
//           localStorage.setItem("user_image", response.data.image);
//         }

//         setUserData(prevData => ({
//           ...prevData,
//           email: response.data.email || prevData.email,
//           phone_number: response.data.phone_number || prevData.phone_number,
//           referral_id: response.data.referral_id || prevData.referral_id,
//           username: response.data.username || prevData.username,
//           user_name: response.data.user_name || prevData.user_name,
//           referred_by: response.data.referred_by || prevData.referred_by,
//           image: response.data.image || prevData.image
//         }));
//       }
//     } catch (error) {
//       console.error("Error fetching user data from API:", error);
//     }
//   };

//   // Fetch user data from localStorage on component mount
//   useEffect(() => {
//     const fetchUserData = () => {
//       const storedUserData = {
//         email: localStorage.getItem("email") || "",
//         phone_number: localStorage.getItem("phone_number") || "",
//         referral_id: localStorage.getItem("referral_id") || "",
//         username: localStorage.getItem("username") || "",
//         user_name: localStorage.getItem("user_name") || "",
//         referred_by: localStorage.getItem("referred_by") || "",
//         image: localStorage.getItem("user_image") || ""
//       };
//       setUserData(storedUserData);
//       console.log("User data from localStorage:", storedUserData);
//     };

//     fetchUserData();
//     fetchUserDataFromAPI();

//     const handleStorageChange = () => {
//       fetchUserData();
//     };

//     window.addEventListener('storage', handleStorageChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, [userId]);

//   // Close tooltip when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profilePanelRef.current && !profilePanelRef.current.contains(event.target)) {
//         setShowProfileTooltip(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   /* ================= FETCH CART ITEMS ================= */
//   /* ================= FETCH CART ITEMS ================= */
//   const fetchCartItems = async () => {
//     if (!userId) {
//       setCartItems([]);
//       setCartItemCount(0);
//       setCartTotalQuantity(0);
//       return;
//     }

//     setCartLoading(true);
//     try {
//       const response = await axios.get(`${baseurl}/cart/?user=${userId}`);

//       const cartResponse = response.data;
//       let userCartItems = [];

//       if (cartResponse.results && Array.isArray(cartResponse.results)) {
//         userCartItems = cartResponse.results;
//       } else if (Array.isArray(cartResponse)) {
//         userCartItems = cartResponse;
//       }

//       setCartItems(userCartItems);

//       // Set cart item count (number of unique products)
//       if (cartResponse.count !== undefined) {
//         setCartItemCount(cartResponse.count);
//       } else {
//         setCartItemCount(userCartItems.length);
//       }

//       // Calculate total quantity (sum of all quantities)
//       const totalQuantity = userCartItems.reduce((total, item) => {
//         return total + (item.quantity || 1);
//       }, 0);

//       setCartTotalQuantity(totalQuantity);

//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//       setCartItems([]);
//       setCartItemCount(0);
//       setCartTotalQuantity(0);
//     } finally {
//       setCartLoading(false);
//     }
//   };
//   /* ================= FETCH WISHLIST ITEMS ================= */
//   const fetchWishlistItems = async () => {
//     if (!userId) {
//       setWishlistItems([]);
//       setWishlistCount(0);
//       return;
//     }

//     setWishlistLoading(true);
//     try {
//       const response = await axios.get(`${baseurl}/wishlist/?user=${userId}`);

//       const wishlistResponse = response.data;
//       let userWishlistItems = [];

//       if (wishlistResponse.results && Array.isArray(wishlistResponse.results)) {
//         userWishlistItems = wishlistResponse.results;
//       } else if (Array.isArray(wishlistResponse)) {
//         userWishlistItems = wishlistResponse;
//       }

//       setWishlistItems(userWishlistItems);

//       if (wishlistResponse.count !== undefined) {
//         setWishlistCount(wishlistResponse.count);
//       } else {
//         setWishlistCount(userWishlistItems.length);
//       }

//     } catch (error) {
//       console.error("Error fetching wishlist items:", error);
//       setWishlistItems([]);
//       setWishlistCount(0);
//     } finally {
//       setWishlistLoading(false);
//     }
//   };

//   // Fetch cart items on component mount and set up polling
//   useEffect(() => {
//     if (userId) {
//       fetchCartItems();
//       const cartIntervalId = setInterval(fetchCartItems, 5000);
//       return () => clearInterval(cartIntervalId);
//     } else {
//       setCartItems([]);
//       setCartItemCount(0);
//       setCartTotalQuantity(0);
//     }
//   }, [userId]);

//   // Fetch wishlist items on component mount and set up polling
//   useEffect(() => {
//     if (userId) {
//       fetchWishlistItems();
//       const wishlistIntervalId = setInterval(fetchWishlistItems, 5000);
//       return () => clearInterval(wishlistIntervalId);
//     } else {
//       setWishlistItems([]);
//       setWishlistCount(0);
//     }
//   }, [userId]);

//   // Listen for cart updates from other components
//   useEffect(() => {
//     const handleCartUpdate = () => {
//       fetchCartItems();
//     };

//     window.addEventListener('cartUpdated', handleCartUpdate);

//     return () => {
//       window.removeEventListener('cartUpdated', handleCartUpdate);
//     };
//   }, []);

//   // Listen for wishlist updates from other components
//   useEffect(() => {
//     const handleWishlistUpdate = () => {
//       fetchWishlistItems();
//     };

//     window.addEventListener('wishlistUpdated', handleWishlistUpdate);

//     return () => {
//       window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
//     };
//   }, []);

//   // Fetch notifications for the user
//   const fetchNotifications = async () => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) return;

//       const response = await axios.get(`${baseurl}/notifications/?user=${userId}&is_read=false`);

//       const allNotifications = response.data.results || [];

//       const apiUnreadCount = response.data.unread_count;
//       if (apiUnreadCount !== undefined) {
//         setUnreadCount(apiUnreadCount);
//       } else {
//         const localUnreadCount = allNotifications.filter(n => !n.is_read).length;
//         setUnreadCount(localUnreadCount);
//       }

//       setNotifications(allNotifications);

//     } catch (error) {
//       console.error("Error fetching client notifications:", error);
//       const unread = notifications.filter(notification => !notification.is_read);
//       setUnreadCount(unread.length);
//     }
//   };

//   // Fetch notifications on component mount and set up polling
//   useEffect(() => {
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       fetchNotifications();
//       const intervalId = setInterval(fetchNotifications, 30000);
//       return () => clearInterval(intervalId);
//     }
//   }, []);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowCategories(false);
//       }

//       if (notificationRef.current && !notificationRef.current.contains(event.target)) {
//         setShowNotifications(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleDropdownToggle = (event) => {
//     event.stopPropagation();
//     setShowCategories(!showCategories);
//   };

//   const handleCategorySelect = (categoryName) => {
//     setSelectedCategory(categoryName);
//     setShowCategories(false);
//   };

//   const toggleSubMenu = (menuName) => {
//     if (expandedMenu === menuName) {
//       setExpandedMenu(null);
//     } else {
//       setExpandedMenu(menuName);
//     }
//   };

//   // Handle notification click
//   const handleNotificationClick = (event) => {
//     event.stopPropagation();
//     setShowNotifications(!showNotifications);
//   };

//   // Mark notification as read and navigate
//   const handleNotificationItemClick = async (notification) => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) return;

//       await axios.post(`${baseurl}/notifications/mark-read/`, {
//         user_id: parseInt(userId),
//         notification_status_ids: [notification.notification_status_id]
//       });

//       const updatedNotifications = notifications.map(n =>
//         n.notification_status_id === notification.notification_status_id
//           ? { ...n, is_read: true }
//           : n
//       );

//       setNotifications(updatedNotifications);

//       const newUnreadCount = updatedNotifications.filter(n => !n.is_read).length;
//       setUnreadCount(newUnreadCount);

//       setShowNotifications(false);

//       if (notification.property !== null) {
//         navigate(`/client-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;

//         if (productId && variantId) {
//           navigate(`/client-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/client-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/client-product-details/${variantId}`);
//         }
//       }

//     } catch (error) {
//       console.error("Error marking client notification as read:", error);
//       const updatedNotifications = notifications.map(n =>
//         n.notification_status_id === notification.notification_status_id
//           ? { ...n, is_read: true }
//           : n
//       );

//       setNotifications(updatedNotifications);
//       const newUnreadCount = updatedNotifications.filter(n => !n.is_read).length;
//       setUnreadCount(newUnreadCount);

//       setShowNotifications(false);

//       if (notification.property !== null) {
//         navigate(`/client-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;

//         if (productId && variantId) {
//           navigate(`/client-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/client-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/client-product-details/${variantId}`);
//         }
//       }
//     }
//   };

//   // Format notification message
//   const formatNotificationMessage = (notification) => {
//     if (notification.property !== null) {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//           <div className="wn-notification-subtitle">{notification.notification_for}</div>
//         </div>
//       );
//     } else if (notification.product !== null) {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//           <div className="wn-notification-subtitle">{notification.notification_for}</div>
//         </div>
//       );
//     } else {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//         </div>
//       );
//     }
//   };

//   const handleLogout = () => {
//     console.log("Client logged out");

//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("clientData");
//     localStorage.removeItem("user_id");
//     localStorage.removeItem("email");
//     localStorage.removeItem("username");
//     localStorage.removeItem("phone_number");
//     localStorage.removeItem("referral_id");
//     localStorage.removeItem("referred_by");
//     localStorage.removeItem("user_name");
//     localStorage.removeItem("user_image");
//     localStorage.removeItem("token");
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     localStorage.removeItem("user_roles");

//     sessionStorage.clear();

//     setOpen(false);
//     setNotifications([]);
//     setUnreadCount(0);
//     setCartItems([]);
//     setCartItemCount(0);
//     setCartTotalQuantity(0);
//     setWishlistItems([]);
//     setWishlistCount(0);

//     if (window.ReactNativeWebView) {
//       window.ReactNativeWebView.postMessage("");
//     }

//     navigate("/");
//   };

//   // Handle wishlist click
//   const handleWishlistClick = () => {
//     navigate("/client-wishlist");
//   };

//   // Handle cart click
//   const handleCartClick = () => {
//     navigate("/client-add-to-cart");
//   };

//   // Handle orders click - NEW FUNCTION
//   const handleOrdersClick = () => {
//     navigate("/client-orders");
//   };

//   // Handle profile click from panel
//   const handleProfilePanelClick = () => {
//     navigate("/client-profile");
//   };

//   // Handle profile panel hover
//   const handleProfilePanelMouseEnter = () => {
//     setShowProfileTooltip(true);
//   };

//   const handleProfilePanelMouseLeave = () => {
//     setShowProfileTooltip(false);
//   };

//   // Handle mobile search click
//   const handleMobileSearchClick = () => {
//     setShowMobileSearch(true);
//   };

//   // Close mobile search modal
//   const closeMobileSearch = () => {
//     setShowMobileSearch(false);
//   };

//   // Function to get full image URL
//   const getFullImageUrl = (imagePath) => {
//     if (!imagePath) return null;
//     if (imagePath.startsWith('http')) return imagePath;
//     if (imagePath.startsWith('/media/')) return `${baseurl}${imagePath}`;
//     if (!imagePath.startsWith('/')) return `${baseurl}/media/${imagePath}`;
//     return `${baseurl}${imagePath}`;
//   };

//   // Define navigation items
//   const menuItems = [
//     { path: "/client-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
//     { path: "/client-add-property-form", name: "Add Property", icon: <FaHome /> },
//     { path: "/client-properties", name: "Properties", icon: <FaBuilding /> },
//     { path: "/client-my-properties", name: "My Properties", icon: <FaClipboardList /> },
//     { path: "/client-busineess-category", name: "Products", icon: <FaBriefcase /> },
//     { path: "/client-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/client-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//     { path: "/client-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//     { path: "/client-my-plans", name: "My Plans", icon: <FaCreditCard /> },
//     { path: "/client-wishlist", name: "My Wishlist", icon: <FaHeart /> },
//     { path: "/client-add-to-cart", name: "My Cart", icon: <FaShoppingCart /> },
//     { path: "/client-orders", name: "Orders", icon: <FaBoxOpen /> },
//     { path: "/client-profile", name: "Profile", icon: <FaUserCircle /> },
//   ];

//   return (
//     <>
//       {/* NAVBAR */}
//       <header className="wn-navbar">
//         <div className="wn-nav-left">
//           <button className="wn-menu-btn" onClick={() => setOpen(true)}>☰</button>
//           {/* FIXED: Logo now navigates to client products page */}
//           <div
//             className="wn-logo"
//             onClick={() => navigate("/client-busineess-category")}
//             style={{ cursor: "pointer" }}
//           >
//             <img
//               src={logoImage}
//               alt="Shriraj Logo"
//               className="wn-logo-img"
//             />
//           </div>
//         </div>

//         {/* Desktop Search Bar */}
//         <div className="wn-desktop-search">
//           <ClientSearchBar placeholder="Search products..." />
//         </div>

//         {/* User Panel Indicator - Clickable with Tooltip */}


//         {/* Desktop Navigation Items */}
//         <div className="wn-desktop-nav-items">
//           <div
//             className="wn-desktop-nav-item"
//             onClick={handleOrdersClick}
//           >
//             <FaBoxOpen className="wn-desktop-nav-icon" />
//             <span className="wn-desktop-nav-text">Orders</span>
//           </div>
//         </div>

//         {/* Mobile Search Button */}
//         <button
//           className="wn-mobile-search-btn"
//           onClick={handleMobileSearchClick}
//           aria-label="Search"
//         >
//           <FaSearch size={18} />
//         </button>

//         <div className="wn-nav-right">
//           {/* Notification Icon */}


//           {/* Wishlist Icon */}
//           <div
//             className="wn-wishlist"
//             onClick={handleWishlistClick}
//             title={`Wishlist: ${wishlistCount} item${wishlistCount !== 1 ? 's' : ''}`}
//             style={{
//               opacity: wishlistLoading ? 0.7 : 1,
//               cursor: wishlistLoading ? 'not-allowed' : 'pointer'
//             }}
//           >
//             <FaHeart size={16} />
//             {wishlistCount > 0 && (
//               <span className="wn-wishlist-badge">{wishlistCount > 99 ? '99+' : wishlistCount}</span>
//             )}
//           </div>

//           {/* Cart Icon */}
//           {/* Cart Icon - FIXED: Now shows total quantity instead of item count */}
//           <div
//             className="wn-cart"
//             onClick={handleCartClick}
//             title={`Cart: ${cartTotalQuantity} item${cartTotalQuantity !== 1 ? 's' : ''} total`}
//             style={{
//               opacity: cartLoading ? 0.7 : 1,
//               cursor: cartLoading ? 'not-allowed' : 'pointer'
//             }}
//           >
//             <FaShoppingCart size={16} />
//             {cartTotalQuantity > 0 && (
//               <span className="wn-cart-badge">{cartTotalQuantity > 99 ? '99+' : cartTotalQuantity}</span>
//             )}
//           </div>
//             <div 
//             ref={notificationRef}
//             className="wn-notification-container"
//           >
//             <div 
//               className="wn-notification-icon" 
//               onClick={handleNotificationClick}
//               title="Notifications"
//             >
//               <FaBell size={16} />
//               {unreadCount > 0 && (
//                 <span className="wn-notification-badge">{unreadCount}</span>
//               )}
//             </div>
            
//             {showNotifications && (
//               <div className="wn-notifications-dropdown">
//                 <div className="wn-notifications-header">
//                   <h4>Client Notifications</h4>
//                 </div>
                
//                 <div className="wn-notifications-list">
//                   {notifications.length > 0 ? (
//                     notifications.map((notification) => (
//                       <div 
//                         key={notification.notification_status_id}
//                         className={`wn-notification-item ${!notification.is_read ? 'wn-unread' : ''}`}
//                         onClick={() => handleNotificationItemClick(notification)}
//                       >
//                         <div className="wn-notification-content">
//                           {formatNotificationMessage(notification)}
//                           <small className="wn-notification-time">
//                             {new Date(notification.created_at).toLocaleDateString('en-US', {
//                               month: 'short',
//                               day: 'numeric',
//                               hour: '2-digit',
//                               minute: '2-digit'
//                             })}
//                           </small>
//                         </div>
//                         {!notification.is_read && (
//                           <div className="wn-unread-dot"></div>
//                         )}
//                       </div>
//                     ))
//                   ) : (
//                     <div className="wn-no-notifications">
//                       No notifications yet
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//           <div
//             className="wn-user-panel-indicator"
//             ref={profilePanelRef}
//             onClick={handleProfilePanelClick}
//             onMouseEnter={handleProfilePanelMouseEnter}
//             onMouseLeave={handleProfilePanelMouseLeave}
//             style={{ cursor: 'pointer', position: 'relative' }}
//           >
//             <div className="wn-panel-badge">
//               <FaUserCircle className="wn-panel-icon" />
//               <span className="wn-panel-name">Client</span>
//             </div>
//             <div className="wn-user-role-info">
//               <span className="wn-user-name">
//                 {userData.user_name || userData.username || "Client"}
//               </span>
//             </div>

//             {/* Tooltip on hover */}
//             {showProfileTooltip && (
//               <div className="wn-profile-tooltip">
//                 <div className="wn-tooltip-content">
//                   <div className="wn-tooltip-arrow"></div>
//                   <div className="wn-tooltip-text">
//                     <FaUserCircle size={14} style={{ marginRight: '8px' }} />
//                     Click here to view profile details
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Mobile Search Modal */}
//       {showMobileSearch && (
//         <div className="wn-mobile-search-modal" onClick={closeMobileSearch}>
//           <div className="wn-mobile-search-content" onClick={(e) => e.stopPropagation()}>
//             <div className="wn-mobile-search-header">
//               <h4>Search</h4>
//               <button
//                 className="wn-mobile-search-close"
//                 onClick={closeMobileSearch}
//               >
//                 ✕
//               </button>
//             </div>
//             <ClientSearchBar placeholder="Search products..." />
//           </div>
//         </div>
//       )}

//       {/* OVERLAY */}
//       {open && <div className="wn-overlay" onClick={() => setOpen(false)} />}

//       {/* SIDEBAR */}
//       <aside className={`wn-sidebar ${open ? "open" : ""}`}>
//         {/* Header with Logo and User Info */}
//         <div className="wn-sidebar-header">
//           <div className="wn-logo-with-user">
//             <img
//               src={logoImage}
//               alt="Shriraj Logo"
//               className="wn-logo-img-sidebar"
//             />
//             <div className="wn-user-info-compact">
//               <div className="wn-user-details-compact">
//                 {userData.email && (
//                   <div className="wn-detail-item">
//                     <FaEnvelope className="wn-detail-icon" size={10} />
//                     <span className="wn-detail-text">{userData.email}</span>
//                   </div>
//                 )}

//                 {userData.phone_number && (
//                   <div className="wn-detail-item">
//                     <FaPhone className="wn-detail-icon" size={10} />
//                     <span className="wn-detail-text">
//                       {userData.phone_number}
//                     </span>
//                   </div>
//                 )}

//                 {userData.referral_id ? (
//                   <div className="wn-detail-item">
//                     <FaIdCard className="wn-detail-icon" size={10} />
//                     <span className="wn-detail-text">
//                       Ref ID: {userData.referral_id}
//                     </span>
//                   </div>
//                 ) : (
//                   <div className="wn-detail-item">
//                     <FaIdCard className="wn-detail-icon" size={10} />
//                     <span className="wn-detail-text">Ref ID: None</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <button className="wn-close-btn" onClick={() => setOpen(false)}>✕</button>
//         </div>

//         {/* Navigation Items */}
//         <div className="wn-nav-section">
//           <div className="wn-section-title">User Menu</div>
//           <ul className="wn-menu-list">
//             {menuItems.map((item, index) => (
//               <li key={item.name || item.path}>
//                 <Link
//                   to={item.path}
//                   className="wn-sidebar-link"
//                   onClick={() => setOpen(false)}
//                 >
//                   <span className="wn-sidebar-icon">{item.icon}</span>
//                   <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>
//                     {item.name}
//                   </span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="wn-divider" />

//         {/* Logout Button */}
//         <div className="wn-logout-section">
//           <button
//             className="wn-logout-btn"
//             onClick={handleLogout}
//           >
//             <span className="wn-logout-icon">
//               <FaSignOutAlt />
//             </span>
//             <span className="wn-logout-text">Logout</span>
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default ClientNavbar;



//================================================
// chages done on 17-04-2026

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Client_Navbar.css";
import logoImage from "../../Logos/logo1.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../../BaseURL/BaseURL";
import ClientSearchBar from "./ClientSearchBar";

// Import FontAwesome icons
import {
  FaTachometerAlt,
  FaHome,
  FaBuilding,
  FaUsers,
  FaClipboardList,
  FaCogs,
  FaCalendarAlt,
  FaChartLine,
  FaBriefcase,
  FaFileAlt,
  FaTag,
  FaUserCircle,
  FaSignOutAlt,
  FaCaretDown,
  FaCaretRight,
  FaMoneyBillWave,
  FaHandHoldingUsd,
  FaCreditCard,
  FaLayerGroup,
  FaGraduationCap,
  FaQuestionCircle,
  FaExchangeAlt,
  FaDatabase,
  FaSitemap,
  FaEye,
  FaRobot,
  FaUserTie,
  FaStar,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaBell,
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaBoxOpen // Added for Orders icon
} from "react-icons/fa";

const ClientNavbar = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [userData, setUserData] = useState({
    email: "",
    phone_number: "",
    referral_id: "",
    username: "",
    user_name: "",
    referred_by: "",
    image: "",
    first_name: "",
    last_name: "",
    full_name: ""
  });
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);

  // Notification states
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  // Cart states
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [cartLoading, setCartLoading] = useState(false);

  // Wishlist states
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // Mobile search modal state
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const profilePanelRef = useRef(null);
  const loginUrl = "/login";
  const signupUrl = "/register";

  const navigate = useNavigate();

  // Get user ID from localStorage
  const userId = localStorage.getItem("user_id");

  // Helper function to get user display name
  const getUserDisplayName = () => {
    // Priority: full_name > first_name + last_name > username > user_name > "Client"
    if (userData.full_name && userData.full_name.trim() !== "") {
      return userData.full_name;
    }
    
    if (userData.first_name && userData.first_name.trim() !== "") {
      if (userData.last_name && userData.last_name.trim() !== "") {
        return `${userData.first_name} ${userData.last_name}`;
      }
      return userData.first_name;
    }
    
    if (userData.last_name && userData.last_name.trim() !== "") {
      return userData.last_name;
    }
    
    if (userData.username && userData.username.trim() !== "") {
      return userData.username;
    }
    
    if (userData.user_name && userData.user_name.trim() !== "") {
      return userData.user_name;
    }
    
    return "Client";
  };

  // Fetch user data from API to get the image
  const fetchUserDataFromAPI = async () => {
    if (!userId) return;

    try {
      const response = await axios.get(`${baseurl}/users/${userId}/`);
      console.log("User data from API:", response.data);

      if (response.data) {
        if (response.data.image) {
          localStorage.setItem("user_image", response.data.image);
        }

        setUserData(prevData => ({
          ...prevData,
          email: response.data.email || prevData.email,
          phone_number: response.data.phone_number || prevData.phone_number,
          referral_id: response.data.referral_id || prevData.referral_id,
          username: response.data.username || prevData.username,
          user_name: response.data.user_name || prevData.user_name,
          referred_by: response.data.referred_by || prevData.referred_by,
          image: response.data.image || prevData.image,
          first_name: response.data.first_name || prevData.first_name,
          last_name: response.data.last_name || prevData.last_name,
          full_name: response.data.full_name || prevData.full_name
        }));
      }
    } catch (error) {
      console.error("Error fetching user data from API:", error);
    }
  };

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const fetchUserData = () => {
      const storedUserData = {
        email: localStorage.getItem("email") || "",
        phone_number: localStorage.getItem("phone_number") || "",
        referral_id: localStorage.getItem("referral_id") || "",
        username: localStorage.getItem("username") || "",
        user_name: localStorage.getItem("user_name") || "",
        referred_by: localStorage.getItem("referred_by") || "",
        image: localStorage.getItem("user_image") || "",
        first_name: localStorage.getItem("first_name") || "",
        last_name: localStorage.getItem("last_name") || "",
        full_name: localStorage.getItem("full_name") || ""
      };
      setUserData(storedUserData);
      console.log("User data from localStorage:", storedUserData);
    };

    fetchUserData();
    fetchUserDataFromAPI();

    const handleStorageChange = () => {
      fetchUserData();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [userId]);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profilePanelRef.current && !profilePanelRef.current.contains(event.target)) {
        setShowProfileTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ================= FETCH CART ITEMS ================= */
  /* ================= FETCH CART ITEMS ================= */
  const fetchCartItems = async () => {
    if (!userId) {
      setCartItems([]);
      setCartItemCount(0);
      setCartTotalQuantity(0);
      return;
    }

    setCartLoading(true);
    try {
      const response = await axios.get(`${baseurl}/cart/?user=${userId}`);

      const cartResponse = response.data;
      let userCartItems = [];

      if (cartResponse.results && Array.isArray(cartResponse.results)) {
        userCartItems = cartResponse.results;
      } else if (Array.isArray(cartResponse)) {
        userCartItems = cartResponse;
      }

      setCartItems(userCartItems);

      // Set cart item count (number of unique products)
      if (cartResponse.count !== undefined) {
        setCartItemCount(cartResponse.count);
      } else {
        setCartItemCount(userCartItems.length);
      }

      // Calculate total quantity (sum of all quantities)
      const totalQuantity = userCartItems.reduce((total, item) => {
        return total + (item.quantity || 1);
      }, 0);

      setCartTotalQuantity(totalQuantity);

    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]);
      setCartItemCount(0);
      setCartTotalQuantity(0);
    } finally {
      setCartLoading(false);
    }
  };
  /* ================= FETCH WISHLIST ITEMS ================= */
  const fetchWishlistItems = async () => {
    if (!userId) {
      setWishlistItems([]);
      setWishlistCount(0);
      return;
    }

    setWishlistLoading(true);
    try {
      const response = await axios.get(`${baseurl}/wishlist/?user=${userId}`);

      const wishlistResponse = response.data;
      let userWishlistItems = [];

      if (wishlistResponse.results && Array.isArray(wishlistResponse.results)) {
        userWishlistItems = wishlistResponse.results;
      } else if (Array.isArray(wishlistResponse)) {
        userWishlistItems = wishlistResponse;
      }

      setWishlistItems(userWishlistItems);

      if (wishlistResponse.count !== undefined) {
        setWishlistCount(wishlistResponse.count);
      } else {
        setWishlistCount(userWishlistItems.length);
      }

    } catch (error) {
      console.error("Error fetching wishlist items:", error);
      setWishlistItems([]);
      setWishlistCount(0);
    } finally {
      setWishlistLoading(false);
    }
  };

  // Fetch cart items on component mount and set up polling
  useEffect(() => {
    if (userId) {
      fetchCartItems();
      const cartIntervalId = setInterval(fetchCartItems, 5000);
      return () => clearInterval(cartIntervalId);
    } else {
      setCartItems([]);
      setCartItemCount(0);
      setCartTotalQuantity(0);
    }
  }, [userId]);

  // Fetch wishlist items on component mount and set up polling
  useEffect(() => {
    if (userId) {
      fetchWishlistItems();
      const wishlistIntervalId = setInterval(fetchWishlistItems, 5000);
      return () => clearInterval(wishlistIntervalId);
    } else {
      setWishlistItems([]);
      setWishlistCount(0);
    }
  }, [userId]);

  // Listen for cart updates from other components
  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCartItems();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // Listen for wishlist updates from other components
  useEffect(() => {
    const handleWishlistUpdate = () => {
      fetchWishlistItems();
    };

    window.addEventListener('wishlistUpdated', handleWishlistUpdate);

    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, []);

  // Fetch notifications for the user
  const fetchNotifications = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      if (!userId) return;

      const response = await axios.get(`${baseurl}/notifications/?user=${userId}&is_read=false`);

      const allNotifications = response.data.results || [];

      const apiUnreadCount = response.data.unread_count;
      if (apiUnreadCount !== undefined) {
        setUnreadCount(apiUnreadCount);
      } else {
        const localUnreadCount = allNotifications.filter(n => !n.is_read).length;
        setUnreadCount(localUnreadCount);
      }

      setNotifications(allNotifications);

    } catch (error) {
      console.error("Error fetching client notifications:", error);
      const unread = notifications.filter(notification => !notification.is_read);
      setUnreadCount(unread.length);
    }
  };

  // Fetch notifications on component mount and set up polling
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      fetchNotifications();
      const intervalId = setInterval(fetchNotifications, 30000);
      return () => clearInterval(intervalId);
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategories(false);
      }

      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (event) => {
    event.stopPropagation();
    setShowCategories(!showCategories);
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setShowCategories(false);
  };

  const toggleSubMenu = (menuName) => {
    if (expandedMenu === menuName) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(menuName);
    }
  };

  // Handle notification click
  const handleNotificationClick = (event) => {
    event.stopPropagation();
    setShowNotifications(!showNotifications);
  };

  // Mark notification as read and navigate
  const handleNotificationItemClick = async (notification) => {
    try {
      const userId = localStorage.getItem("user_id");
      if (!userId) return;

      await axios.post(`${baseurl}/notifications/mark-read/`, {
        user_id: parseInt(userId),
        notification_status_ids: [notification.notification_status_id]
      });

      const updatedNotifications = notifications.map(n =>
        n.notification_status_id === notification.notification_status_id
          ? { ...n, is_read: true }
          : n
      );

      setNotifications(updatedNotifications);

      const newUnreadCount = updatedNotifications.filter(n => !n.is_read).length;
      setUnreadCount(newUnreadCount);

      setShowNotifications(false);

      if (notification.property !== null) {
        navigate(`/client-properties-details/${notification.property.id}`);
      } else if (notification.product !== null) {
        const productId = notification.product.product_id;
        const variantId = notification.product.variant_id;

        if (productId && variantId) {
          navigate(`/client-business-product-details/${productId}/?variant=${variantId}`);
        } else if (productId) {
          navigate(`/client-business-product-details/${productId}/`);
        } else if (variantId) {
          navigate(`/client-product-details/${variantId}`);
        }
      }

    } catch (error) {
      console.error("Error marking client notification as read:", error);
      const updatedNotifications = notifications.map(n =>
        n.notification_status_id === notification.notification_status_id
          ? { ...n, is_read: true }
          : n
      );

      setNotifications(updatedNotifications);
      const newUnreadCount = updatedNotifications.filter(n => !n.is_read).length;
      setUnreadCount(newUnreadCount);

      setShowNotifications(false);

      if (notification.property !== null) {
        navigate(`/client-properties-details/${notification.property.id}`);
      } else if (notification.product !== null) {
        const productId = notification.product.product_id;
        const variantId = notification.product.variant_id;

        if (productId && variantId) {
          navigate(`/client-business-product-details/${productId}/?variant=${variantId}`);
        } else if (productId) {
          navigate(`/client-business-product-details/${productId}/`);
        } else if (variantId) {
          navigate(`/client-product-details/${variantId}`);
        }
      }
    }
  };

  // Format notification message
  const formatNotificationMessage = (notification) => {
    if (notification.property !== null) {
      return (
        <div className="wn-notification-message-content">
          <strong className="wn-notification-title">{notification.message}</strong>
          <div className="wn-notification-subtitle">{notification.notification_for}</div>
        </div>
      );
    } else if (notification.product !== null) {
      return (
        <div className="wn-notification-message-content">
          <strong className="wn-notification-title">{notification.message}</strong>
          <div className="wn-notification-subtitle">{notification.notification_for}</div>
        </div>
      );
    } else {
      return (
        <div className="wn-notification-message-content">
          <strong className="wn-notification-title">{notification.message}</strong>
        </div>
      );
    }
  };

  const handleLogout = () => {
    console.log("Client logged out");

    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("clientData");
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("phone_number");
    localStorage.removeItem("referral_id");
    localStorage.removeItem("referred_by");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_image");
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_roles");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("full_name");

    sessionStorage.clear();

    setOpen(false);
    setNotifications([]);
    setUnreadCount(0);
    setCartItems([]);
    setCartItemCount(0);
    setCartTotalQuantity(0);
    setWishlistItems([]);
    setWishlistCount(0);

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage("");
    }

    navigate("/");
  };

  // Handle wishlist click
  const handleWishlistClick = () => {
    navigate("/client-wishlist");
  };

  // Handle cart click
  const handleCartClick = () => {
    navigate("/client-add-to-cart");
  };

  // Handle orders click - NEW FUNCTION
  const handleOrdersClick = () => {
    navigate("/client-orders");
  };

  // Handle profile click from panel
  const handleProfilePanelClick = () => {
    navigate("/client-profile");
  };

  // Handle profile panel hover
  const handleProfilePanelMouseEnter = () => {
    setShowProfileTooltip(true);
  };

  const handleProfilePanelMouseLeave = () => {
    setShowProfileTooltip(false);
  };

  // Handle mobile search click
  const handleMobileSearchClick = () => {
    setShowMobileSearch(true);
  };

  // Close mobile search modal
  const closeMobileSearch = () => {
    setShowMobileSearch(false);
  };

  // Function to get full image URL
  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/media/')) return `${baseurl}${imagePath}`;
    if (!imagePath.startsWith('/')) return `${baseurl}/media/${imagePath}`;
    return `${baseurl}${imagePath}`;
  };

  // Define navigation items
  const menuItems = [
    { path: "/client-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/client-add-property-form", name: "Add Property", icon: <FaHome /> },
    { path: "/client-properties", name: "Properties", icon: <FaBuilding /> },
    { path: "/client-my-properties", name: "My Properties", icon: <FaClipboardList /> },
    { path: "/client-busineess-category", name: "Products", icon: <FaBriefcase /> },
    { path: "/client-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
    { path: "/client-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
    { path: "/client-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
    { path: "/client-my-plans", name: "My Plans", icon: <FaCreditCard /> },
    { path: "/client-wishlist", name: "My Wishlist", icon: <FaHeart /> },
    { path: "/client-add-to-cart", name: "My Cart", icon: <FaShoppingCart /> },
    { path: "/client-orders", name: "Orders", icon: <FaBoxOpen /> },
    { path: "/client-profile", name: "Profile", icon: <FaUserCircle /> },
  ];

  // Get the display name for the current user
  const displayName = getUserDisplayName();

  return (
    <>
      {/* NAVBAR */}
      <header className="wn-navbar">
        <div className="wn-nav-left">
          <button className="wn-menu-btn" onClick={() => setOpen(true)}>☰</button>
          {/* FIXED: Logo now navigates to client products page */}
          <div
            className="wn-logo"
            onClick={() => navigate("/client-busineess-category")}
            style={{ cursor: "pointer" }}
          >
            <img
              src={logoImage}
              alt="Shriraj Logo"
              className="wn-logo-img"
            />
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="wn-desktop-search">
          <ClientSearchBar placeholder="Search products..." />
        </div>

        {/* User Panel Indicator - Clickable with Tooltip */}


        {/* Desktop Navigation Items */}
        <div className="wn-desktop-nav-items">
          <div
            className="wn-desktop-nav-item"
            onClick={handleOrdersClick}
          >
            <FaBoxOpen className="wn-desktop-nav-icon" />
            <span className="wn-desktop-nav-text">Orders</span>
          </div>
        </div>

        {/* Mobile Search Button */}
        <button
          className="wn-mobile-search-btn"
          onClick={handleMobileSearchClick}
          aria-label="Search"
        >
          <FaSearch size={18} />
        </button>

        <div className="wn-nav-right">
          {/* Notification Icon */}


          {/* Wishlist Icon */}
          <div
            className="wn-wishlist"
            onClick={handleWishlistClick}
            title={`Wishlist: ${wishlistCount} item${wishlistCount !== 1 ? 's' : ''}`}
            style={{
              opacity: wishlistLoading ? 0.7 : 1,
              cursor: wishlistLoading ? 'not-allowed' : 'pointer'
            }}
          >
            <FaHeart size={16} />
            {wishlistCount > 0 && (
              <span className="wn-wishlist-badge">{wishlistCount > 99 ? '99+' : wishlistCount}</span>
            )}
          </div>

          {/* Cart Icon */}
          {/* Cart Icon - FIXED: Now shows total quantity instead of item count */}
          <div
            className="wn-cart"
            onClick={handleCartClick}
            title={`Cart: ${cartTotalQuantity} item${cartTotalQuantity !== 1 ? 's' : ''} total`}
            style={{
              opacity: cartLoading ? 0.7 : 1,
              cursor: cartLoading ? 'not-allowed' : 'pointer'
            }}
          >
            <FaShoppingCart size={16} />
            {cartTotalQuantity > 0 && (
              <span className="wn-cart-badge">{cartTotalQuantity > 99 ? '99+' : cartTotalQuantity}</span>
            )}
          </div>
            <div 
            ref={notificationRef}
            className="wn-notification-container"
          >
            <div 
              className="wn-notification-icon" 
              onClick={handleNotificationClick}
              title="Notifications"
            >
              <FaBell size={16} />
              {unreadCount > 0 && (
                <span className="wn-notification-badge">{unreadCount}</span>
              )}
            </div>
            
            {showNotifications && (
              <div className="wn-notifications-dropdown">
                <div className="wn-notifications-header">
                  <h4>Client Notifications</h4>
                </div>
                
                <div className="wn-notifications-list">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div 
                        key={notification.notification_status_id}
                        className={`wn-notification-item ${!notification.is_read ? 'wn-unread' : ''}`}
                        onClick={() => handleNotificationItemClick(notification)}
                      >
                        <div className="wn-notification-content">
                          {formatNotificationMessage(notification)}
                          <small className="wn-notification-time">
                            {new Date(notification.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </small>
                        </div>
                        {!notification.is_read && (
                          <div className="wn-unread-dot"></div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="wn-no-notifications">
                      No notifications yet
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div
            className="wn-user-panel-indicator"
            ref={profilePanelRef}
            onClick={handleProfilePanelClick}
            onMouseEnter={handleProfilePanelMouseEnter}
            onMouseLeave={handleProfilePanelMouseLeave}
            style={{ cursor: 'pointer', position: 'relative' }}
          >
            <div className="wn-panel-badge">
              <FaUserCircle className="wn-panel-icon" />
              <span className="wn-panel-name">Client</span>
            </div>
            <div className="wn-user-role-info">
              <span className="wn-user-name">
                {displayName}
              </span>
            </div>

            {/* Tooltip on hover */}
            {showProfileTooltip && (
              <div className="wn-profile-tooltip">
                <div className="wn-tooltip-content">
                  <div className="wn-tooltip-arrow"></div>
                  <div className="wn-tooltip-text">
                    <FaUserCircle size={14} style={{ marginRight: '8px' }} />
                    Click here to view profile details
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Search Modal */}
      {showMobileSearch && (
        <div className="wn-mobile-search-modal" onClick={closeMobileSearch}>
          <div className="wn-mobile-search-content" onClick={(e) => e.stopPropagation()}>
            <div className="wn-mobile-search-header">
              <h4>Search</h4>
              <button
                className="wn-mobile-search-close"
                onClick={closeMobileSearch}
              >
                ✕
              </button>
            </div>
            <ClientSearchBar placeholder="Search products..." />
          </div>
        </div>
      )}

      {/* OVERLAY */}
      {open && <div className="wn-overlay" onClick={() => setOpen(false)} />}

      {/* SIDEBAR */}
      <aside className={`wn-sidebar ${open ? "open" : ""}`}>
        {/* Header with Logo and User Info */}
        <div className="wn-sidebar-header">
          <div className="wn-logo-with-user">
            <img
              src={logoImage}
              alt="Shriraj Logo"
              className="wn-logo-img-sidebar"
            />
            <div className="wn-user-info-compact">
              <div className="wn-user-details-compact">
                {userData.email && (
                  <div className="wn-detail-item">
                    <FaEnvelope className="wn-detail-icon" size={10} />
                    <span className="wn-detail-text">{userData.email}</span>
                  </div>
                )}

                {userData.phone_number && (
                  <div className="wn-detail-item">
                    <FaPhone className="wn-detail-icon" size={10} />
                    <span className="wn-detail-text">
                      {userData.phone_number}
                    </span>
                  </div>
                )}

                {userData.referral_id ? (
                  <div className="wn-detail-item">
                    <FaIdCard className="wn-detail-icon" size={10} />
                    <span className="wn-detail-text">
                      Ref ID: {userData.referral_id}
                    </span>
                  </div>
                ) : (
                  <div className="wn-detail-item">
                    <FaIdCard className="wn-detail-icon" size={10} />
                    <span className="wn-detail-text">Ref ID: None</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button className="wn-close-btn" onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* Navigation Items */}
        <div className="wn-nav-section">
          <div className="wn-section-title">User Menu</div>
          <ul className="wn-menu-list">
            {menuItems.map((item, index) => (
              <li key={item.name || item.path}>
                <Link
                  to={item.path}
                  className="wn-sidebar-link"
                  onClick={() => setOpen(false)}
                >
                  <span className="wn-sidebar-icon">{item.icon}</span>
                  <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="wn-divider" />

        {/* Logout Button */}
        <div className="wn-logout-section">
          <button
            className="wn-logout-btn"
            onClick={handleLogout}
          >
            <span className="wn-logout-icon">
              <FaSignOutAlt />
            </span>
            <span className="wn-logout-text">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default ClientNavbar;