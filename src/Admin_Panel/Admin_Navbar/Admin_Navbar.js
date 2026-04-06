

// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Admin_Navbar.css";
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
//   FaEnvelope,
//   FaPhone,
//   FaIdCard,
//   FaBell,
//   FaPlusCircle,
//   FaShoppingCart,
//   FaHeart
// } from "react-icons/fa";

// const AdminNavbar = () => {
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
//     referred_by: ""
//   });
  
//   // Notification states
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showNotifications, setShowNotifications] = useState(false);
  
//   const dropdownRef = useRef(null);
//   const notificationRef = useRef(null);
//   const loginUrl = "/login";
//   const signupUrl = "/register";
  
//   const navigate = useNavigate();

//   // Fetch user data from localStorage on component mount
//   useEffect(() => {
//     const fetchUserData = () => {
//       const storedUserData = {
//         email: localStorage.getItem("email") || "",
//         phone_number: localStorage.getItem("phone_number") || "",
//         referral_id: localStorage.getItem("referral_id") || "",
//         username: localStorage.getItem("username") || "",
//         user_name: localStorage.getItem("user_name") || "",
//         referred_by: localStorage.getItem("referred_by") || ""
//       };
//       setUserData(storedUserData);
//     };

//     fetchUserData();
    
//     // Listen for storage changes
//     const handleStorageChange = () => {
//       fetchUserData();
//     };
    
//     window.addEventListener('storage', handleStorageChange);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   // Fetch notifications for the user - FIXED TO SHOW ALL NOTIFICATIONS LIKE AGENTNAVBAR
//   const fetchNotifications = async () => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) {
//         console.log("No user_id found in localStorage");
//         return;
//       }

//       console.log("Fetching notifications for admin user:", userId);
      
//       // Use the correct endpoint from your API documentation
//       const response = await axios.get(`${baseurl}/notifications/?user=${userId}&is_read=false`);
//       console.log("Admin Notifications API Response:", response.data);
      
//       // The API response has results array with count, next, previous
//       const allNotifications = response.data.results || [];
      
//       console.log("All notifications:", allNotifications);
      
//       // DON'T FILTER - SHOW ALL NOTIFICATIONS LIKE AGENTNAVBAR
//       // This allows admin to see user registrations, logins, etc.
      
//       // Update unread count from API response or calculate locally
//       const apiUnreadCount = response.data.unread_count;
//       if (apiUnreadCount !== undefined) {
//         setUnreadCount(apiUnreadCount);
//       } else {
//         // Calculate unread count locally
//         const localUnreadCount = allNotifications.filter(n => !n.is_read).length;
//         setUnreadCount(localUnreadCount);
//       }
      
//       // Set ALL notifications without filtering
//       setNotifications(allNotifications);
      
//     } catch (error) {
//       console.error("Error fetching admin notifications:", error);
//       if (error.response) {
//         console.error("Error response status:", error.response.status);
//         console.error("Error response data:", error.response.data);
//       }
//       // Fallback: Try to filter unread notifications locally
//       const unread = notifications.filter(notification => !notification.is_read);
//       setUnreadCount(unread.length);
//     }
//   };

//   // Fetch notifications on component mount and set up polling
//   useEffect(() => {
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       console.log("Setting up notification polling for admin user:", userId);
//       fetchNotifications();
      
//       // Poll for new notifications every 30 seconds
//       const intervalId = setInterval(fetchNotifications, 30000);
      
//       return () => clearInterval(intervalId);
//     }
//   }, []);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       // Close categories dropdown
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowCategories(false);
//       }
      
//       // Close notifications dropdown
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

//   // Mark notification as read and navigate to property/product/user - FIXED TO HANDLE ALL TYPES
//   const handleNotificationItemClick = async (notification) => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) {
//         console.error("No user_id found in localStorage");
//         return;
//       }
      
//       console.log("Marking admin notification as read:", notification);
      
//       // Mark as read API call
//       await axios.post(`${baseurl}/notifications/mark-read/`, {
//         user_id: parseInt(userId),
//         notification_status_ids: [notification.notification_status_id]
//       });
      
//       console.log("Successfully marked admin notification as read");
      
//       // Update local state immediately for better UX
//       const updatedNotifications = notifications.map(n => 
//         n.notification_status_id === notification.notification_status_id 
//           ? { ...n, is_read: true } 
//           : n
//       );
      
//       setNotifications(updatedNotifications);
      
//       // Update unread count
//       const newUnreadCount = updatedNotifications.filter(n => !n.is_read).length;
//       setUnreadCount(newUnreadCount);
      
//       // Close notifications dropdown
//       setShowNotifications(false);
      
//       // Navigate based on notification type for admin
//       if (notification.property !== null) {
//         // Navigate to admin property details
//         navigate(`/admin-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         // Navigate to admin product details with product_id and variant_id
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;
        
//         // Navigate to the correct URL
//         if (productId && variantId) {
//           navigate(`/admin-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/admin-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/admin-product-details/${variantId}`);
//         } else {
//           fetchNotifications();
//         }
//       } else if (notification.user !== null) {
//         // Navigate to user details page if you have one
//         // navigate(`/admin-user-details/${notification.user.id}`);
//         // If no user details page, just refresh notifications
//         fetchNotifications();
//       } else if (notification.meeting) {
//         // Navigate to meeting details
//         navigate(`/admin-meetings/${notification.meeting.id}`);
//       } else {
//         // For other notification types, just refresh
//         fetchNotifications();
//       }
      
//     } catch (error) {
//       console.error("Error marking admin notification as read:", error);
      
//       // Still update UI even if API call fails for better UX
//       const updatedNotifications = notifications.map(n => 
//         n.notification_status_id === notification.notification_status_id 
//           ? { ...n, is_read: true } 
//           : n
//       );
      
//       setNotifications(updatedNotifications);
      
//       // Update unread count
//       const newUnreadCount = updatedNotifications.filter(n => !n.is_read).length;
//       setUnreadCount(newUnreadCount);
      
//       setShowNotifications(false);
      
//       // Try navigation anyway even if API fails
//       if (notification.property !== null) {
//         navigate(`/admin-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;
        
//         if (productId && variantId) {
//           navigate(`/admin-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/admin-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/admin-product-details/${variantId}`);
//         }
//       } else if (notification.meeting) {
//         navigate(`/admin-meetings/${notification.meeting.id}`);
//       }
//     }
//   };

//   // Mark all notifications as read
//   const handleMarkAllAsRead = async () => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) {
//         console.error("No user_id found in localStorage");
//         return;
//       }
      
//       const unreadNotifications = notifications.filter(n => !n.is_read);
      
//       if (unreadNotifications.length === 0) {
//         console.log("No unread admin notifications to mark");
//         return;
//       }
      
//       console.log("Marking all admin notifications as read");
      
//       // Get all unread notification status IDs
//       const notificationStatusIds = unreadNotifications.map(n => n.notification_status_id);
      
//       // Use the correct endpoint and payload structure
//       const response = await axios.post(`${baseurl}/notifications/mark-read/`, {
//         user_id: parseInt(userId),
//         notification_status_ids: notificationStatusIds
//       });
      
//       console.log("Admin mark all as read response:", response.data);
      
//       // Update local state
//       const updatedNotifications = notifications.map(n => ({ ...n, is_read: true }));
//       setNotifications(updatedNotifications);
//       setUnreadCount(0);
      
//     } catch (error) {
//       console.error("Error marking all admin notifications as read:", error);
//       // Fallback: Update UI even if API fails
//       const updatedNotifications = notifications.map(n => ({ ...n, is_read: true }));
//       setNotifications(updatedNotifications);
//       setUnreadCount(0);
//     }
//   };

//   // Format notification message - FIXED TO HANDLE ALL TYPES LIKE AGENTNAVBAR
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
//     } else if (notification.user !== null) {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//           <div className="wn-notification-subtitle">User Activity</div>
//         </div>
//       );
//     } else if (notification.meeting) {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//           <div className="wn-notification-subtitle">Meeting Update</div>
//         </div>
//       );
//     } else {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//           <div className="wn-notification-subtitle">System Notification</div>
//         </div>
//       );
//     }
//   };

//   const handleLogout = () => {
//     console.log("Admin logged out");
//     // Clear all stored data
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("adminData");
//     localStorage.removeItem("user_id");
//     localStorage.removeItem("email");
//     localStorage.removeItem("username");
//     localStorage.removeItem("phone_number");
//     localStorage.removeItem("referral_id");
//     localStorage.removeItem("referred_by");
//     localStorage.removeItem("user_name");
//     localStorage.removeItem("token");
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     localStorage.removeItem("user_roles"); // Clear user roles if stored
    
//     sessionStorage.clear();
//     setOpen(false);
//     setNotifications([]);
//     setUnreadCount(0);
//     navigate("/");
//   };

//   const LoginButtonExternal = () => (
//     <a href={loginUrl} className="wn-login-btn-link">
//       <button className="wn-login-btn">Login</button>
//     </a>
//   );

//   const SignupButtonExternal = () => (
//     <a href={signupUrl} className="wn-signup-btn-link">
//       <button className="wn-signup-btn">Sign Up</button>
//     </a>
//   );

//   // Define your navigation items with better categorization
//   const menuItems = [
//     { 
//       path: "/admin-dashboard", 
//       name: "Dashboard", 
//       icon: <FaTachometerAlt /> 
//     },
    
//     // Properties Main Category
//     {
//       name: "Real Estate",
//       icon: <FaBuilding />,
//       subMenu: [
//         { path: "/admin-add-property", name: "Add Property", icon: <FaPlusCircle /> },
//         { path: "/admin-properties", name: "All Properties", icon: <FaClipboardList /> },
//         { path: "/tablecategory", name: "Property Categories", icon: <FaTag /> },
//         { path: "/admin-sitevisit", name: "Site Visits", icon: <FaEye /> }
//       ],
//     },
    
//     // Products Main Category
//     {
//       name: "Business",
//       icon: <FaBriefcase />,
//       subMenu: [
//         { path: "/admin-business", name: "Business Listings", icon: <FaBriefcase /> },
//         { path: "/tableproductcategory", name: "Product Categories", icon: <FaLayerGroup /> },
//         { path: "/admin-orders", name: "Orders", icon: <FaShoppingCart /> }
//       ],
//     },
    
//     // Users Main Category
//     {
//       name: "Users",
//       icon: <FaUsers />,
//       subMenu: [
//         { path: "/admin-users", name: "All Users", icon: <FaUsers /> },
//         { path: "/users-subscriptions", name: "User Subscriptions", icon: <FaCreditCard /> }
//       ],
//     },
    
//     // Operations Main Category (expanded)
//     {
//       name: "Operations",
//       icon: <FaCogs />,
//       subMenu: [
//         { path: "/admin-subscriptions", name: "Subscription Plans", icon: <FaCreditCard /> },
//         { path: "/a-bookingslab", name: "Booking Slab", icon: <FaLayerGroup /> },
//         { path: "/admin-trainingmaterial", name: "Training Material", icon: <FaGraduationCap /> },
//         { path: "/admin-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//         { path: "/admin-commissionmaster", name: "Payout Master", icon: <FaDatabase /> },
//         { path: "/a-departments", name: "Departments", icon: <FaSitemap /> },
//         { path: "/admin-chatbot", name: "Chat Bot", icon: <FaRobot /> },
//         { path: "/admin-carousel-list", name: "Add Carousel", icon: <FaQuestionCircle /> },
//         { path: "/admin-amenities-list", name: " Amenities", icon: <FaQuestionCircle /> }
//       ],
//     },
    
//     // Other standalone items
//         { path: "/a-service-categories", name: "Service Categories", icon: <FaCalendarAlt /> },
//                 { path: "/admin-service-providers", name: "Service Providers", icon: <FaCalendarAlt /> },


//     { path: "/admin-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/a-leads", name: "Leads", icon: <FaChartLine /> },
//     { path: "/admin-reports", name: "Reports", icon: <FaFileAlt /> },
//         { path: "/referral-reports", name: "Referral Reports", icon: <FaFileAlt /> },

//     { path: "/a-settings", name: "Settings", icon: <FaTag /> },
//     { path: "/admin-profile", name: "Profile", icon: <FaUserCircle /> },
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
            
//             {/* Notifications Dropdown - SHOWING ALL NOTIFICATIONS NOW */}
//             {showNotifications && (
//               <div className="wn-notifications-dropdown">
//                 <div className="wn-notifications-header">
//                   <h4>Admin Notifications</h4>
//                   {unreadCount > 0 && (
//                     <button 
//                       className="wn-mark-all-read"
//                       onClick={handleMarkAllAsRead}
//                     >
//                       Mark all as read
//                     </button>
//                   )}
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
                
//                 {notifications.length > 0 && (
//                   <div className="wn-notifications-footer">
//                     <Link 
//                       to="/admin-notifications" 
//                       className="wn-view-all-notifications"
//                       onClick={() => setShowNotifications(false)}
//                     >
//                       View all notifications
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* OVERLAY */}
//       {open && <div className="wn-overlay" onClick={() => setOpen(false)} />}

//       {/* SIDEBAR - UPDATED WITH USER INFO NEXT TO LOGO */}
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
//           <div className="wn-section-title">Admin Menu</div>
//           <ul className="wn-menu-list">
//             {menuItems.map((item, index) => (
//               <React.Fragment key={item.name || item.path || index}>
//                 {/* Check if item has submenu */}
//                 {item.subMenu ? (
//                   <li className="wn-menu-item-with-submenu">
//                     <div 
//                       className="wn-menu-header"
//                       onClick={() => toggleSubMenu(item.name)}
//                     >
//                       <span className="wn-sidebar-icon">{item.icon}</span>
//                       <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
//                       <span className="wn-menu-arrow">
//                         {expandedMenu === item.name ? <FaCaretDown /> : <FaCaretRight />}
//                       </span>
//                     </div>
                    
//                     {/* Submenu items */}
//                     {expandedMenu === item.name && (
//                       <ul className="wn-submenu">
//                         {item.subMenu.map((subItem, subIndex) => (
//                           <li key={`${subItem.name}-${subIndex}`}>
//                             <Link 
//                               to={subItem.path} 
//                               className="wn-submenu-link"
//                               onClick={() => setOpen(false)}
//                             >
//                               <span className="wn-submenu-icon">
//                                 {subItem.icon || <FaCogs />}
//                               </span>
//                               <span className="wn-submenu-text" style={{ marginLeft: "10px" }}>{subItem.name}</span>
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </li>
//                 ) : (
//                   // Regular menu item without submenu
//                   <li key={item.path}>
//                     <Link 
//                       to={item.path} 
//                       className="wn-sidebar-link"
//                       onClick={() => setOpen(false)}
//                     >
//                       <span className="wn-sidebar-icon">{item.icon}</span>
//                       <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
//                     </Link>
//                   </li>
//                 )}
//               </React.Fragment>
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

// export default AdminNavbar;



//============================================


// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Admin_Navbar.css";
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
//   FaEnvelope,
//   FaPhone,
//   FaIdCard,
//   FaBell,
//   FaPlusCircle,
//   FaShoppingCart,
//   FaHeart
// } from "react-icons/fa";

// const AdminNavbar = () => {
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
//     referred_by: ""
//   });
  
//   // Notification states
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showNotifications, setShowNotifications] = useState(false);
  
//   const dropdownRef = useRef(null);
//   const notificationRef = useRef(null);
//   const loginUrl = "/login";
//   const signupUrl = "/register";
  
//   const navigate = useNavigate();

//   // Fetch user data from localStorage on component mount
//   useEffect(() => {
//     const fetchUserData = () => {
//       const storedUserData = {
//         email: localStorage.getItem("email") || "",
//         phone_number: localStorage.getItem("phone_number") || "",
//         referral_id: localStorage.getItem("referral_id") || "",
//         username: localStorage.getItem("username") || "",
//         user_name: localStorage.getItem("user_name") || "",
//         referred_by: localStorage.getItem("referred_by") || ""
//       };
//       setUserData(storedUserData);
//     };

//     fetchUserData();
    
//     // Listen for storage changes
//     const handleStorageChange = () => {
//       fetchUserData();
//     };
    
//     window.addEventListener('storage', handleStorageChange);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   // Fetch notifications for the user - FIXED TO SHOW ALL NOTIFICATIONS LIKE AGENTNAVBAR
//   const fetchNotifications = async () => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) {
//         console.log("No user_id found in localStorage");
//         return;
//       }

//       console.log("Fetching notifications for admin user:", userId);
      
//       // Use the correct endpoint from your API documentation
//       const response = await axios.get(`${baseurl}/notifications/?user=${userId}&is_read=false`);
//       console.log("Admin Notifications API Response:", response.data);
      
//       // The API response has results array with count, next, previous
//       const allNotifications = response.data.results || [];
      
//       console.log("All notifications:", allNotifications);
      
//       // DON'T FILTER - SHOW ALL NOTIFICATIONS LIKE AGENTNAVBAR
//       // This allows admin to see user registrations, logins, etc.
      
//       // Update unread count from API response or calculate locally
//       const apiUnreadCount = response.data.unread_count;
//       if (apiUnreadCount !== undefined) {
//         setUnreadCount(apiUnreadCount);
//       } else {
//         // Calculate unread count locally
//         const localUnreadCount = allNotifications.filter(n => !n.is_read).length;
//         setUnreadCount(localUnreadCount);
//       }
      
//       // Set ALL notifications without filtering
//       setNotifications(allNotifications);
      
//     } catch (error) {
//       console.error("Error fetching admin notifications:", error);
//       if (error.response) {
//         console.error("Error response status:", error.response.status);
//         console.error("Error response data:", error.response.data);
//       }
//       // Fallback: Try to filter unread notifications locally
//       const unread = notifications.filter(notification => !notification.is_read);
//       setUnreadCount(unread.length);
//     }
//   };

//   // Fetch notifications on component mount and set up polling
//   useEffect(() => {
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       console.log("Setting up notification polling for admin user:", userId);
//       fetchNotifications();
      
//       // Poll for new notifications every 30 seconds
//       const intervalId = setInterval(fetchNotifications, 30000);
      
//       return () => clearInterval(intervalId);
//     }
//   }, []);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       // Close categories dropdown
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowCategories(false);
//       }
      
//       // Close notifications dropdown
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

//   // Mark notification as read and navigate to property/product/user - FIXED TO HANDLE ALL TYPES
//   const handleNotificationItemClick = async (notification) => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) {
//         console.error("No user_id found in localStorage");
//         return;
//       }
      
//       console.log("Marking admin notification as read:", notification);
      
//       // Mark as read API call
//       await axios.post(`${baseurl}/notifications/mark-read/`, {
//         user_id: parseInt(userId),
//         notification_status_ids: [notification.notification_status_id]
//       });
      
//       console.log("Successfully marked admin notification as read");
      
//       // Update local state immediately for better UX
//       const updatedNotifications = notifications.map(n => 
//         n.notification_status_id === notification.notification_status_id 
//           ? { ...n, is_read: true } 
//           : n
//       );
      
//       setNotifications(updatedNotifications);
      
//       // Update unread count
//       const newUnreadCount = updatedNotifications.filter(n => !n.is_read).length;
//       setUnreadCount(newUnreadCount);
      
//       // Close notifications dropdown
//       setShowNotifications(false);
      
//       // Navigate based on notification type for admin
//       if (notification.property !== null) {
//         // Navigate to admin property details
//         navigate(`/admin-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         // Navigate to admin product details with product_id and variant_id
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;
        
//         // Navigate to the correct URL
//         if (productId && variantId) {
//           navigate(`/admin-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/admin-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/admin-product-details/${variantId}`);
//         } else {
//           fetchNotifications();
//         }
//       } else if (notification.user !== null) {
//         // Navigate to user details page if you have one
//         // navigate(`/admin-user-details/${notification.user.id}`);
//         // If no user details page, just refresh notifications
//         fetchNotifications();
//       } else if (notification.meeting) {
//         // Navigate to meeting details
//         navigate(`/admin-meetings/${notification.meeting.id}`);
//       } else {
//         // For other notification types, just refresh
//         fetchNotifications();
//       }
      
//     } catch (error) {
//       console.error("Error marking admin notification as read:", error);
      
//       // Still update UI even if API call fails for better UX
//       const updatedNotifications = notifications.map(n => 
//         n.notification_status_id === notification.notification_status_id 
//           ? { ...n, is_read: true } 
//           : n
//       );
      
//       setNotifications(updatedNotifications);
      
//       // Update unread count
//       const newUnreadCount = updatedNotifications.filter(n => !n.is_read).length;
//       setUnreadCount(newUnreadCount);
      
//       setShowNotifications(false);
      
//       // Try navigation anyway even if API fails
//       if (notification.property !== null) {
//         navigate(`/admin-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;
        
//         if (productId && variantId) {
//           navigate(`/admin-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/admin-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/admin-product-details/${variantId}`);
//         }
//       } else if (notification.meeting) {
//         navigate(`/admin-meetings/${notification.meeting.id}`);
//       }
//     }
//   };

//   // Mark all notifications as read
//   const handleMarkAllAsRead = async () => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) {
//         console.error("No user_id found in localStorage");
//         return;
//       }
      
//       const unreadNotifications = notifications.filter(n => !n.is_read);
      
//       if (unreadNotifications.length === 0) {
//         console.log("No unread admin notifications to mark");
//         return;
//       }
      
//       console.log("Marking all admin notifications as read");
      
//       // Get all unread notification status IDs
//       const notificationStatusIds = unreadNotifications.map(n => n.notification_status_id);
      
//       // Use the correct endpoint and payload structure
//       const response = await axios.post(`${baseurl}/notifications/mark-read/`, {
//         user_id: parseInt(userId),
//         notification_status_ids: notificationStatusIds
//       });
      
//       console.log("Admin mark all as read response:", response.data);
      
//       // Update local state
//       const updatedNotifications = notifications.map(n => ({ ...n, is_read: true }));
//       setNotifications(updatedNotifications);
//       setUnreadCount(0);
      
//     } catch (error) {
//       console.error("Error marking all admin notifications as read:", error);
//       // Fallback: Update UI even if API fails
//       const updatedNotifications = notifications.map(n => ({ ...n, is_read: true }));
//       setNotifications(updatedNotifications);
//       setUnreadCount(0);
//     }
//   };

//   // Format notification message - FIXED TO HANDLE ALL TYPES LIKE AGENTNAVBAR
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
//     } else if (notification.user !== null) {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//           <div className="wn-notification-subtitle">User Activity</div>
//         </div>
//       );
//     } else if (notification.meeting) {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//           <div className="wn-notification-subtitle">Meeting Update</div>
//         </div>
//       );
//     } else {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//           <div className="wn-notification-subtitle">System Notification</div>
//         </div>
//       );
//     }
//   };

//   const handleLogout = () => {
//     console.log("Admin logged out");
//     // Clear all stored data
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("adminData");
//     localStorage.removeItem("user_id");
//     localStorage.removeItem("email");
//     localStorage.removeItem("username");
//     localStorage.removeItem("phone_number");
//     localStorage.removeItem("referral_id");
//     localStorage.removeItem("referred_by");
//     localStorage.removeItem("user_name");
//     localStorage.removeItem("token");
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     localStorage.removeItem("user_roles"); // Clear user roles if stored
    
//     sessionStorage.clear();
//     setOpen(false);
//     setNotifications([]);
//     setUnreadCount(0);
//     navigate("/");
//   };

//   const LoginButtonExternal = () => (
//     <a href={loginUrl} className="wn-login-btn-link">
//       <button className="wn-login-btn">Login</button>
//     </a>
//   );

//   const SignupButtonExternal = () => (
//     <a href={signupUrl} className="wn-signup-btn-link">
//       <button className="wn-signup-btn">Sign Up</button>
//     </a>
//   );

//   // Define your navigation items with better categorization
//   const menuItems = [
//     { 
//       path: "/admin-dashboard", 
//       name: "Dashboard", 
//       icon: <FaTachometerAlt /> 
//     },
    
//     // Properties Main Category
//     {
//       name: "Real Estate",
//       icon: <FaBuilding />,
//       subMenu: [
//         { path: "/admin-add-property", name: "Add Property", icon: <FaPlusCircle /> },
//         { path: "/admin-properties", name: "All Properties", icon: <FaClipboardList /> },
//         { path: "/tablecategory", name: "Property Categories", icon: <FaTag /> },
//         { path: "/admin-sitevisit", name: "Site Visits", icon: <FaEye /> }
//       ],
//     },
    
//     // Products Main Category
//     {
//       name: "Business",
//       icon: <FaBriefcase />,
//       subMenu: [
//         { path: "/admin-business", name: "Business Listings", icon: <FaBriefcase /> },
//         { path: "/tableproductcategory", name: "Product Categories", icon: <FaLayerGroup /> },
//         { path: "/admin-orders", name: "Orders", icon: <FaShoppingCart /> }
//       ],
//     },
    
//     // Users Main Category
//     {
//       name: "Users",
//       icon: <FaUsers />,
//       subMenu: [
//         { path: "/admin-users", name: "All Users", icon: <FaUsers /> },
//         { path: "/users-subscriptions", name: "User Subscriptions", icon: <FaCreditCard /> }
//       ],
//     },
    
//     // Operations Main Category (expanded)
//     {
//       name: "Operations",
//       icon: <FaCogs />,
//       subMenu: [
//         { path: "/admin-subscriptions", name: "Subscription Plans", icon: <FaCreditCard /> },
//         { path: "/a-bookingslab", name: "Booking Slab", icon: <FaLayerGroup /> },
//         { path: "/admin-trainingmaterial", name: "Training Material", icon: <FaGraduationCap /> },
//         { path: "/admin-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//         { path: "/admin-commissionmaster", name: "Payout Master", icon: <FaDatabase /> },
//         { path: "/a-departments", name: "Departments", icon: <FaSitemap /> },
//         { path: "/admin-chatbot", name: "Chat Bot", icon: <FaRobot /> },
//         { path: "/admin-carousel-list", name: "Add Carousel", icon: <FaQuestionCircle /> },
//         { path: "/admin-amenities-list", name: " Amenities", icon: <FaQuestionCircle /> }
//       ],
//     },
    
//     // Other standalone items
//         { path: "/a-service-categories", name: "Service Categories", icon: <FaCalendarAlt /> },
//                 { path: "/admin-service-providers", name: "Service Providers", icon: <FaCalendarAlt /> },


//     { path: "/admin-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/a-leads", name: "Leads", icon: <FaChartLine /> },
//     { path: "/admin-reports", name: "Reports", icon: <FaFileAlt /> },
//         { path: "/referral-reports", name: "Referral Reports", icon: <FaFileAlt /> },

//     { path: "/a-settings", name: "Settings", icon: <FaTag /> },
//     { path: "/admin-profile", name: "Profile", icon: <FaUserCircle /> },
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
            
//             {/* Notifications Dropdown - SHOWING ALL NOTIFICATIONS NOW */}
//             {showNotifications && (
//               <div className="wn-notifications-dropdown">
//                 <div className="wn-notifications-header">
//                   <h4>Admin Notifications</h4>
//                   {unreadCount > 0 && (
//                     <button 
//                       className="wn-mark-all-read"
//                       onClick={handleMarkAllAsRead}
//                     >
//                       Mark all as read
//                     </button>
//                   )}
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
                
//                 {notifications.length > 0 && (
//                   <div className="wn-notifications-footer">
//                     <Link 
//                       to="/admin-notifications" 
//                       className="wn-view-all-notifications"
//                       onClick={() => setShowNotifications(false)}
//                     >
//                       View all notifications
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Profile Icon with Dropdown - Added Profile Icon */}
//           <div 
//             className="wn-profile-container"
//             onClick={() => navigate("/admin-profile")}
//             title="Profile"
//           >
//             <FaUserCircle size={24} className="wn-profile-icon" />
//           </div>

//           {/* Logout Button - Desktop */}
//           <button 
//             className="wn-logout-btn-navbar"
//             onClick={handleLogout}
//             title="Logout"
//           >
//             <FaSignOutAlt size={16} />
//             <span className="wn-logout-text-navbar">Logout</span>
//           </button>
//         </div>
//       </header>

//       {/* OVERLAY */}
//       {open && <div className="wn-overlay" onClick={() => setOpen(false)} />}

//       {/* SIDEBAR - UPDATED WITH USER INFO NEXT TO LOGO */}
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
//           <div className="wn-section-title">Admin Menu</div>
//           <ul className="wn-menu-list">
//             {menuItems.map((item, index) => (
//               <React.Fragment key={item.name || item.path || index}>
//                 {/* Check if item has submenu */}
//                 {item.subMenu ? (
//                   <li className="wn-menu-item-with-submenu">
//                     <div 
//                       className="wn-menu-header"
//                       onClick={() => toggleSubMenu(item.name)}
//                     >
//                       <span className="wn-sidebar-icon">{item.icon}</span>
//                       <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
//                       <span className="wn-menu-arrow">
//                         {expandedMenu === item.name ? <FaCaretDown /> : <FaCaretRight />}
//                       </span>
//                     </div>
                    
//                     {/* Submenu items */}
//                     {expandedMenu === item.name && (
//                       <ul className="wn-submenu">
//                         {item.subMenu.map((subItem, subIndex) => (
//                           <li key={`${subItem.name}-${subIndex}`}>
//                             <Link 
//                               to={subItem.path} 
//                               className="wn-submenu-link"
//                               onClick={() => setOpen(false)}
//                             >
//                               <span className="wn-submenu-icon">
//                                 {subItem.icon || <FaCogs />}
//                               </span>
//                               <span className="wn-submenu-text" style={{ marginLeft: "10px" }}>{subItem.name}</span>
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </li>
//                 ) : (
//                   // Regular menu item without submenu
//                   <li key={item.path}>
//                     <Link 
//                       to={item.path} 
//                       className="wn-sidebar-link"
//                       onClick={() => setOpen(false)}
//                     >
//                       <span className="wn-sidebar-icon">{item.icon}</span>
//                       <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
//                     </Link>
//                   </li>
//                 )}
//               </React.Fragment>
//             ))}
//           </ul>
//         </div>

//         <div className="wn-divider" />

//         {/* Logout Button - Mobile (in sidebar) */}
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

// export default AdminNavbar;


//=============================================================
// 



import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin_Navbar.css";
import logoImage from "../../Logos/logo1.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../../BaseURL/BaseURL";


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
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaBell,
  FaPlusCircle,
  FaShoppingCart,
  FaHeart
} from "react-icons/fa";

const AdminNavbar = () => {
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
    referred_by: ""
  });
  
  // Header dropdown states
  const [openRealEstateDropdown, setOpenRealEstateDropdown] = useState(false);
  const [openBusinessDropdown, setOpenBusinessDropdown] = useState(false);
  const [openUsersDropdown, setOpenUsersDropdown] = useState(false);
  const [openOperationsDropdown, setOpenOperationsDropdown] = useState(false);
  
  // Notification states
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const realEstateDropdownRef = useRef(null);
  const businessDropdownRef = useRef(null);
  const usersDropdownRef = useRef(null);
  const operationsDropdownRef = useRef(null);
  
  const loginUrl = "/login";
  const signupUrl = "/register";
  
  const navigate = useNavigate();

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const fetchUserData = () => {
      const storedUserData = {
        email: localStorage.getItem("email") || "",
        phone_number: localStorage.getItem("phone_number") || "",
        referral_id: localStorage.getItem("referral_id") || "",
        username: localStorage.getItem("username") || "",
        user_name: localStorage.getItem("user_name") || "",
        referred_by: localStorage.getItem("referred_by") || ""
      };
      setUserData(storedUserData);
    };

    fetchUserData();
    
    // Listen for storage changes
    const handleStorageChange = () => {
      fetchUserData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (realEstateDropdownRef.current && !realEstateDropdownRef.current.contains(event.target)) {
        setOpenRealEstateDropdown(false);
      }
      if (businessDropdownRef.current && !businessDropdownRef.current.contains(event.target)) {
        setOpenBusinessDropdown(false);
      }
      if (usersDropdownRef.current && !usersDropdownRef.current.contains(event.target)) {
        setOpenUsersDropdown(false);
      }
      if (operationsDropdownRef.current && !operationsDropdownRef.current.contains(event.target)) {
        setOpenOperationsDropdown(false);
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

  // Fetch notifications for the user
  const fetchNotifications = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        console.log("No user_id found in localStorage");
        return;
      }

      console.log("Fetching notifications for admin user:", userId);
      
      const response = await axios.get(`${baseurl}/notifications/?user=${userId}&is_read=false`);
      console.log("Admin Notifications API Response:", response.data);
      
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
      console.error("Error fetching admin notifications:", error);
      const unread = notifications.filter(notification => !notification.is_read);
      setUnreadCount(unread.length);
    }
  };

  // Fetch notifications on component mount and set up polling
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      console.log("Setting up notification polling for admin user:", userId);
      fetchNotifications();
      
      const intervalId = setInterval(fetchNotifications, 30000);
      
      return () => clearInterval(intervalId);
    }
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
      if (!userId) {
        console.error("No user_id found in localStorage");
        return;
      }
      
      console.log("Marking admin notification as read:", notification);
      
      await axios.post(`${baseurl}/notifications/mark-read/`, {
        user_id: parseInt(userId),
        notification_status_ids: [notification.notification_status_id]
      });
      
      console.log("Successfully marked admin notification as read");
      
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
        navigate(`/admin-properties-details/${notification.property.id}`);
      } else if (notification.product !== null) {
        const productId = notification.product.product_id;
        const variantId = notification.product.variant_id;
        
        if (productId && variantId) {
          navigate(`/admin-business-product-details/${productId}/?variant=${variantId}`);
        } else if (productId) {
          navigate(`/admin-business-product-details/${productId}/`);
        } else if (variantId) {
          navigate(`/admin-product-details/${variantId}`);
        } else {
          fetchNotifications();
        }
      } else if (notification.user !== null) {
        fetchNotifications();
      } else if (notification.meeting) {
        navigate(`/admin-meetings/${notification.meeting.id}`);
      } else {
        fetchNotifications();
      }
      
    } catch (error) {
      console.error("Error marking admin notification as read:", error);
      
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
        navigate(`/admin-properties-details/${notification.property.id}`);
      } else if (notification.product !== null) {
        const productId = notification.product.product_id;
        const variantId = notification.product.variant_id;
        
        if (productId && variantId) {
          navigate(`/admin-business-product-details/${productId}/?variant=${variantId}`);
        } else if (productId) {
          navigate(`/admin-business-product-details/${productId}/`);
        } else if (variantId) {
          navigate(`/admin-product-details/${variantId}`);
        }
      } else if (notification.meeting) {
        navigate(`/admin-meetings/${notification.meeting.id}`);
      }
    }
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        console.error("No user_id found in localStorage");
        return;
      }
      
      const unreadNotifications = notifications.filter(n => !n.is_read);
      
      if (unreadNotifications.length === 0) {
        console.log("No unread admin notifications to mark");
        return;
      }
      
      console.log("Marking all admin notifications as read");
      
      const notificationStatusIds = unreadNotifications.map(n => n.notification_status_id);
      
      const response = await axios.post(`${baseurl}/notifications/mark-read/`, {
        user_id: parseInt(userId),
        notification_status_ids: notificationStatusIds
      });
      
      console.log("Admin mark all as read response:", response.data);
      
      const updatedNotifications = notifications.map(n => ({ ...n, is_read: true }));
      setNotifications(updatedNotifications);
      setUnreadCount(0);
      
    } catch (error) {
      console.error("Error marking all admin notifications as read:", error);
      const updatedNotifications = notifications.map(n => ({ ...n, is_read: true }));
      setNotifications(updatedNotifications);
      setUnreadCount(0);
    }
  };

  // Format notification message
  const formatNotificationMessage = (notification) => {
    if (notification.property !== null) {
      return (
        <div className="wn-notification-message-content">
          <strong className="wn-notification-title">{notification.message}</strong>
          <div className="wn-notification-subtitle">Property Update</div>
        </div>
      );
    } else if (notification.product !== null) {
      return (
        <div className="wn-notification-message-content">
          <strong className="wn-notification-title">{notification.message}</strong>
          <div className="wn-notification-subtitle">Product Update</div>
        </div>
      );
    } else if (notification.user !== null) {
      return (
        <div className="wn-notification-message-content">
          <strong className="wn-notification-title">{notification.message}</strong>
          <div className="wn-notification-subtitle">User Activity</div>
        </div>
      );
    } else if (notification.meeting) {
      return (
        <div className="wn-notification-message-content">
          <strong className="wn-notification-title">{notification.message}</strong>
          <div className="wn-notification-subtitle">Meeting Update</div>
        </div>
      );
    } else {
      return (
        <div className="wn-notification-message-content">
          <strong className="wn-notification-title">{notification.message}</strong>
          <div className="wn-notification-subtitle">System Notification</div>
        </div>
      );
    }
  };

  const handleLogout = () => {
    console.log("Admin logged out");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("adminData");
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("phone_number");
    localStorage.removeItem("referral_id");
    localStorage.removeItem("referred_by");
    localStorage.removeItem("user_name");
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_roles");
    
    sessionStorage.clear();
    setOpen(false);
    setNotifications([]);
    setUnreadCount(0);
    navigate("/");
  };

  const LoginButtonExternal = () => (
    <a href={loginUrl} className="wn-login-btn-link">
      <button className="wn-login-btn">Login</button>
    </a>
  );

  const SignupButtonExternal = () => (
    <a href={signupUrl} className="wn-signup-btn-link">
      <button className="wn-signup-btn">Sign Up</button>
    </a>
  );

  // Define dropdown menu items
  const realEstateItems = [
    { path: "/admin-add-property", name: "Add Property", icon: <FaPlusCircle /> },
    { path: "/admin-properties", name: "All Properties", icon: <FaClipboardList /> },
    { path: "/tablecategory", name: "Property Categories", icon: <FaTag /> },
    { path: "/admin-sitevisit", name: "Site Visits", icon: <FaEye /> }
  ];

  const businessItems = [
    { path: "/admin-business", name: "Business Listings", icon: <FaBriefcase /> },
    { path: "/tableproductcategory", name: "Product Categories", icon: <FaLayerGroup /> },
    // { path: "/admin-orders", name: "Orders", icon: <FaShoppingCart /> }
  ];

  const usersItems = [
    { path: "/admin-users", name: "All Users", icon: <FaUsers /> },
    { path: "/users-subscriptions", name: "User Subscriptions", icon: <FaCreditCard /> }
  ];

  const operationsItems = [
    { path: "/admin-subscriptions", name: "Subscription Plans", icon: <FaCreditCard /> },
    { path: "/a-bookingslab", name: "Booking Slab", icon: <FaLayerGroup /> },
    { path: "/admin-trainingmaterial", name: "Training Material", icon: <FaGraduationCap /> },
    { path: "/admin-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
    { path: "/admin-commissionmaster", name: "Payout Master", icon: <FaDatabase /> },
   { path: "/admin-payouts", name: "Payouts", icon: <FaDatabase /> },

    { path: "/a-departments", name: "Departments", icon: <FaSitemap /> },
    { path: "/admin-chatbot", name: "Chat Bot", icon: <FaRobot /> },
    { path: "/admin-carousel-list", name: "Add Carousel", icon: <FaQuestionCircle /> },
    { path: "/admin-amenities-list", name: "Amenities", icon: <FaQuestionCircle /> }
  ];

  // Helper function to render dropdown item
  const renderDropdownItem = (item, index) => {
    return (
      <Link
        key={index}
        to={item.path}
        className="wn-dropdown-link"
        onClick={() => {
          setOpenRealEstateDropdown(false);
          setOpenBusinessDropdown(false);
          setOpenUsersDropdown(false);
          setOpenOperationsDropdown(false);
        }}
      >
        <span className="wn-dropdown-icon">{item.icon}</span>
        <span className="wn-dropdown-text">{item.name}</span>
      </Link>
    );
  };

  // Define your navigation items for sidebar
  const menuItems = [
    { 
      path: "/admin-dashboard", 
      name: "Dashboard", 
      icon: <FaTachometerAlt /> 
    },
    
    // Properties Main Category
    {
      name: "Real Estate",
      icon: <FaBuilding />,
      subMenu: realEstateItems,
    },
    
    // Business Main Category
    {
      name: "Business",
      icon: <FaBriefcase />,
      subMenu: businessItems,
    },
    
    // Users Main Category
    {
      name: "Users",
      icon: <FaUsers />,
      subMenu: usersItems,
    },
    
    // Operations Main Category
    {
      name: "Operations",
      icon: <FaCogs />,
      subMenu: operationsItems,
    },
    
    // Other standalone items
    { path: "/a-service-categories", name: "Service Categories", icon: <FaCalendarAlt /> },
    { path: "/admin-service-providers", name: "Service Providers", icon: <FaCalendarAlt /> },
    { path: "/admin-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
    { path: "/a-leads", name: "Leads", icon: <FaChartLine /> },
    { path: "/admin-reports", name: "Reports", icon: <FaFileAlt /> },
    { path: "/referral-reports", name: "Referral Reports", icon: <FaFileAlt /> },
    { path: "/a-settings", name: "Settings", icon: <FaTag /> },
    { path: "/admin-profile", name: "Profile", icon: <FaUserCircle /> },
  ];

  return (
    <>
      {/* NAVBAR */}
      <header className="wn-navbar">
        <div className="wn-nav-left">
          <button className="wn-menu-btn" onClick={() => setOpen(true)}>☰</button>
          <div className="wn-logo">
            <img 
              src={logoImage} 
              alt="Shriraj Logo" 
              className="wn-logo-img"
            />
          </div>
        </div>
        
        {/* Header Dropdown Menus - Desktop */}
        <div className="wn-header-dropdowns">
          {/* Real Estate Dropdown */}
          <div className="wn-header-dropdown" ref={realEstateDropdownRef}>
            <button 
              className="wn-header-dropdown-btn"
              onClick={() => setOpenRealEstateDropdown(!openRealEstateDropdown)}
            >
              <FaBuilding className="wn-dropdown-btn-icon" />
              <span>Real Estate</span>
              <FaCaretDown className="wn-dropdown-arrow" />
            </button>
            {openRealEstateDropdown && (
              <div className="wn-header-dropdown-menu">
                {realEstateItems.map((item, idx) => renderDropdownItem(item, idx))}
              </div>
            )}
          </div>

          {/* Business Dropdown */}
          <div className="wn-header-dropdown" ref={businessDropdownRef}>
            <button 
              className="wn-header-dropdown-btn"
              onClick={() => setOpenBusinessDropdown(!openBusinessDropdown)}
            >
              <FaBriefcase className="wn-dropdown-btn-icon" />
              <span>Business</span>
              <FaCaretDown className="wn-dropdown-arrow" />
            </button>
            {openBusinessDropdown && (
              <div className="wn-header-dropdown-menu">
                {businessItems.map((item, idx) => renderDropdownItem(item, idx))}
              </div>
            )}
          </div>

          {/* Users Dropdown */}
          {/* <div className="wn-header-dropdown" ref={usersDropdownRef}>
            <button 
              className="wn-header-dropdown-btn"
              onClick={() => setOpenUsersDropdown(!openUsersDropdown)}
            >
              <FaUsers className="wn-dropdown-btn-icon" />
              <span>Users</span>
              <FaCaretDown className="wn-dropdown-arrow" />
            </button>
            {openUsersDropdown && (
              <div className="wn-header-dropdown-menu">
                {usersItems.map((item, idx) => renderDropdownItem(item, idx))}
              </div>
            )}
          </div> */}

          {/* Operations Dropdown */}
          {/* <div className="wn-header-dropdown" ref={operationsDropdownRef}>
            <button 
              className="wn-header-dropdown-btn"
              onClick={() => setOpenOperationsDropdown(!openOperationsDropdown)}
            >
              <FaCogs className="wn-dropdown-btn-icon" />
              <span>Operations</span>
              <FaCaretDown className="wn-dropdown-arrow" />
            </button>
            {openOperationsDropdown && (
              <div className="wn-header-dropdown-menu">
                {operationsItems.map((item, idx) => renderDropdownItem(item, idx))}
              </div>
            )}
          </div> */}
          <Link to="/admin-orders" className="wn-header-direct-link">
  <FaShoppingCart className="wn-dropdown-btn-icon" />
  <span>Orders</span>
</Link>
        </div>

        <div className="wn-nav-right">
          {/* Notification Icon with Dropdown */}
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
            
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="wn-notifications-dropdown">
                <div className="wn-notifications-header">
                  <h4>Admin Notifications</h4>
                  {unreadCount > 0 && (
                    <button 
                      className="wn-mark-all-read"
                      onClick={handleMarkAllAsRead}
                    >
                      Mark all as read
                    </button>
                  )}
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
                
                {notifications.length > 0 && (
                  <div className="wn-notifications-footer">
                    <Link 
                      to="/admin-notifications" 
                      className="wn-view-all-notifications"
                      onClick={() => setShowNotifications(false)}
                    >
                      View all notifications
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile Icon */}
          <div 
            className="wn-profile-container"
            onClick={() => navigate("/admin-profile")}
            title="Profile"
          >
            <FaUserCircle size={24} className="wn-profile-icon" />
          </div>

          {/* Logout Button - Desktop */}
          {/* <button 
            className="wn-logout-btn-navbar"
            onClick={handleLogout}
            title="Logout"
          >
            <FaSignOutAlt size={16} />
            <span className="wn-logout-text-navbar">Logout</span>
          </button> */}
        </div>
      </header>

      {/* OVERLAY */}
      {open && <div className="wn-overlay" onClick={() => setOpen(false)} />}

      {/* SIDEBAR */}
      <aside className={`wn-sidebar ${open ? "open" : ""}`}>
        {/* Header with Logo and User Info Side by Side */}
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
          <div className="wn-section-title">Admin Menu</div>
          <ul className="wn-menu-list">
            {menuItems.map((item, index) => (
              <React.Fragment key={item.name || item.path || index}>
                {/* Check if item has submenu */}
                {item.subMenu ? (
                  <li className="wn-menu-item-with-submenu">
                    <div 
                      className="wn-menu-header"
                      onClick={() => toggleSubMenu(item.name)}
                    >
                      <span className="wn-sidebar-icon">{item.icon}</span>
                      <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
                      <span className="wn-menu-arrow">
                        {expandedMenu === item.name ? <FaCaretDown /> : <FaCaretRight />}
                      </span>
                    </div>
                    
                    {/* Submenu items */}
                    {expandedMenu === item.name && (
                      <ul className="wn-submenu">
                        {item.subMenu.map((subItem, subIndex) => (
                          <li key={`${subItem.name}-${subIndex}`}>
                            <Link 
                              to={subItem.path} 
                              className="wn-submenu-link"
                              onClick={() => setOpen(false)}
                            >
                              <span className="wn-submenu-icon">
                                {subItem.icon || <FaCogs />}
                              </span>
                              <span className="wn-submenu-text" style={{ marginLeft: "10px" }}>{subItem.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  // Regular menu item without submenu
                  <li key={item.path}>
                    <Link 
                      to={item.path} 
                      className="wn-sidebar-link"
                      onClick={() => setOpen(false)}
                    >
                      <span className="wn-sidebar-icon">{item.icon}</span>
                      <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
                    </Link>
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>

        <div className="wn-divider" />

        {/* Logout Button - Mobile (in sidebar) */}
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

export default AdminNavbar;