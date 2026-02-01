// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Admin_Navbar.css";
// import logoImage from "../../Logos/logo1.png";
// import { Link } from "react-router-dom";

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
//   FaRobot
// } from "react-icons/fa";

// const AdminNavbar = () => {
//   const [open, setOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [showCategories, setShowCategories] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [expandedMenu, setExpandedMenu] = useState(null);
  
//   const dropdownRef = useRef(null);
//   const loginUrl = "/login";
//   const signupUrl = "/register";
  
//   const navigate = useNavigate();

//   // Define your navigation items with appropriate icons
//   const menuItems = [
//     { path: "/admin-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
//     { path: "/admin-add-property", name: "Add Property", icon: <FaHome /> },
//     { path: "/admin-properties", name: "Properties", icon: <FaBuilding /> },
//     { path: "/admin-users", name: "Users", icon: <FaUsers /> },
//     {
//       name: "Operations",
//       icon: <FaCogs />,
//       subMenu: [
//         { path: "/", name: "Company Payout", icon: <FaMoneyBillWave /> },
//         { path: "/", name: "Team Payout", icon: <FaHandHoldingUsd /> },
//         { path: "/admin-subscriptions", name: "Subscription", icon: <FaCreditCard /> },
//         { path: "/a-bookingslab", name: "Booking Slab", icon: <FaLayerGroup /> },
//         { path: "/admin-trainingmaterial", name: "Training Material", icon: <FaGraduationCap /> },
//         { path: "/", name: "How it works", icon: <FaQuestionCircle /> },
//         { path: "/", name: "Transactions", icon: <FaExchangeAlt /> },
//         { path: "/admin-commissionmaster", name: "Payout Master", icon: <FaDatabase /> },
//         { path: "/tablecategory", name: "Category", icon: <FaTag /> },
//         { path: "/admin-business", name: "Business", icon: <FaBriefcase /> },
//         { path: "/", name: "Site Visits", icon: <FaEye /> },
//         { path: "/", name: "Chat Bot", icon: <FaRobot /> },
//         { path: "/a-departments", name: "Departments", icon: <FaSitemap /> },
//       ],
//     },
//     { path: "/", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/a-leads", name: "Leads", icon: <FaChartLine /> },
//     // { path: "/a-company", name: "Company", icon: <FaBriefcase /> },
//     { path: "/", name: "Reports", icon: <FaFileAlt /> },
//     { path: "/a-settings", name: "Prefix", icon: <FaTag /> },
//     { path: "/admin-profile", name: "Profile", icon: <FaUserCircle /> },
//   ];

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowCategories(false);
//       }
//     };

//     if (showCategories) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showCategories]);

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

//   const handleLogout = () => {
//     console.log("User logged out");
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("adminData");
//     sessionStorage.clear();
//     setOpen(false);
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

//         {/* SEARCH */}
//         <div className="wn-nav-center">
//           <div className="wn-search-box">
//             <div className="wn-category-dropdown" ref={dropdownRef}>
//               <div 
//                 className="wn-dropdown-toggle-area"
//                 onClick={handleDropdownToggle}
//                 style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
//               >
//                 <span className="wn-category-text">{selectedCategory}</span>
//                 <span className={`wn-dropdown-arrow ${showCategories ? "open" : ""}`} />
//               </div>

//               {showCategories && (
//                 <div className="wn-category-menu">
//                   <div
//                     className="wn-category-item"
//                     onClick={() => handleCategorySelect("All")}
//                   >
//                     <span>All Categories</span>
//                   </div>

//                   {categories.map((cat) => (
//                     <div
//                       key={cat.category_id}
//                       className="wn-category-item"
//                       onClick={() => handleCategorySelect(cat.name)}
//                     >
//                       <span>{cat.name}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="wn-search-divider" />

//             <input
//               type="text"
//               placeholder="What are you looking for?"
//             />

//             <span className="wn-search-icon">🔍</span>
//           </div>
//         </div>

//         <div className="wn-nav-right">
//           {/* <LoginButtonExternal />
//           <SignupButtonExternal /> */}
//           <div className="wn-cart admin-cart">🛒 Cart</div>
//         </div>
//       </header>

//       {/* OVERLAY */}
//       {open && <div className="wn-overlay" onClick={() => setOpen(false)} />}

//       {/* SIDEBAR - UPDATED WITH BETTER UI */}
//       <aside className={`wn-sidebar ${open ? "open" : ""}`}>
//         {/* Header */}
//         <div className="wn-sidebar-header">
//           <div className="wn-logo">
//             <img 
//               src={logoImage} 
//               alt="Shriraj Logo" 
//               className="wn-logo-img"
//             />
//           </div>
//           <button className="wn-close-btn" onClick={() => setOpen(false)}>✕</button>
//         </div>

//         {/* User Info Section (Optional - Add if you have user data) */}
//         {/* <div className="wn-user-info">
//           <div className="wn-user-avatar">
//             <FaUserCircle size={42} color="#1e40af" />
//           </div>
//           <div className="wn-user-details">
//             <h4 className="wn-user-name">Admin User</h4>
//             <p className="wn-user-role">Administrator</p>
//           </div>
//         </div> */}

//         {/* <div className="wn-divider" /> */}

//         {/* Navigation Items */}
//         <div className="wn-nav-section">
//           <div className="wn-section-title">Admin Menu</div>
//           <ul className="wn-menu-list">
//             {menuItems.map((item, index) => (
//               <React.Fragment key={item.name || item.path}>
//                 {/* Check if item has submenu */}
//                 {item.subMenu ? (
//                   <li className="wn-menu-item-with-submenu">
//                     <div 
//                       className="wn-menu-header"
//                       onClick={() => toggleSubMenu(item.name)}
//                     >
//                       <span className="wn-sidebar-icon">{item.icon}</span>
//                       <span className="wn-sidebar-text">{item.name}</span>
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
//                               <span className="wn-submenu-text"style={{ marginLeft: "10px" }}>{subItem.name}</span>
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </li>
//                 ) : (
//                   // Regular menu item without submenu
//                   <li>
//                     <Link 
//                       to={item.path} 
//                       className="wn-sidebar-link"
//                       onClick={() => setOpen(false)}
//                     >
//                 <span className="wn-sidebar-icon">{item.icon}</span>
// <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
//                     </Link>
//                   </li>
//                 )}
//               </React.Fragment>
//             ))}
//           </ul>
//         </div>

//         <div className="wn-divider" />

//         {/* Logout Button - Updated with better icon */}
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


// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Admin_Navbar.css";
// import logoImage from "../../Logos/logo1.png";
// import { Link } from "react-router-dom";

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
//   FaIdCard
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
  
//   const dropdownRef = useRef(null);
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

//   // Define your navigation items with appropriate icons
//   const menuItems = [
//     { path: "/admin-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
//     { path: "/admin-add-property", name: "Add Property", icon: <FaHome /> },
//     { path: "/admin-properties", name: "Properties", icon: <FaBuilding /> },
//     { path: "/admin-users", name: "Users", icon: <FaUsers /> },
//     {
//       name: "Operations",
//       icon: <FaCogs />,
//       subMenu: [
//         { path: "/", name: "Company Payout", icon: <FaMoneyBillWave /> },
//         { path: "/", name: "Team Payout", icon: <FaHandHoldingUsd /> },
//         { path: "/admin-subscriptions", name: "Subscription", icon: <FaCreditCard /> },
//         { path: "/a-bookingslab", name: "Booking Slab", icon: <FaLayerGroup /> },
//         { path: "/admin-trainingmaterial", name: "Training Material", icon: <FaGraduationCap /> },
//         { path: "/", name: "How it works", icon: <FaQuestionCircle /> },
//         { path: "/", name: "Transactions", icon: <FaExchangeAlt /> },
//         { path: "/admin-commissionmaster", name: "Payout Master", icon: <FaDatabase /> },
//         { path: "/tablecategory", name: " Property Category", icon: <FaTag /> },
//         { path: "/tableproductcategory", name: " Product Category", icon: <FaTag /> },
//         { path: "/admin-business", name: "Business", icon: <FaBriefcase /> },
//         { path: "/admin-sitevisit", name: "Site Visits", icon: <FaEye /> },
//         { path: "/admin-chatbot", name: "Chat Bot", icon: <FaRobot /> },
//         { path: "/a-departments", name: "Departments", icon: <FaSitemap /> },
//       ],
//     },
//     { path: "/admin-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/a-leads", name: "Leads", icon: <FaChartLine /> },
//     { path: "/", name: "Reports", icon: <FaFileAlt /> },
//     { path: "/a-settings", name: "Prefix", icon: <FaTag /> },
//     { path: "/admin-profile", name: "Profile", icon: <FaUserCircle /> },
//   ];

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowCategories(false);
//       }
//     };

//     if (showCategories) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showCategories]);

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

//   const handleLogout = () => {
//     console.log("User logged out");
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
    
//     sessionStorage.clear();
//     setOpen(false);
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

//         {/* SEARCH */}
//         {/* <div className="wn-nav-center">
//           <div className="wn-search-box">
//             <div className="wn-category-dropdown" ref={dropdownRef}>
//               <div 
//                 className="wn-dropdown-toggle-area"
//                 onClick={handleDropdownToggle}
//                 style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
//               >
//                 <span className="wn-category-text">{selectedCategory}</span>
//                 <span className={`wn-dropdown-arrow ${showCategories ? "open" : ""}`} />
//               </div>

//               {showCategories && (
//                 <div className="wn-category-menu">
//                   <div
//                     className="wn-category-item"
//                     onClick={() => handleCategorySelect("All")}
//                   >
//                     <span>All Categories</span>
//                   </div>

//                   {categories.map((cat) => (
//                     <div
//                       key={cat.category_id}
//                       className="wn-category-item"
//                       onClick={() => handleCategorySelect(cat.name)}
//                     >
//                       <span>{cat.name}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="wn-search-divider" />

//             <input
//               type="text"
//               placeholder="What are you looking for?"
//             />

//             <span className="wn-search-icon">🔍</span>
//           </div>
//         </div> */}

//         <div className="wn-nav-right">
//           <div className="wn-cart admin-cart">🛒 Cart</div>
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
//               {/* <div className="wn-user-name-compact">
//                 {userData.user_name || userData.username || "Admin"}
//               </div> */}
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

//         {/* <div className="wn-divider" /> */}

//         {/* Navigation Items */}
//         <div className="wn-nav-section">
//           <div className="wn-section-title">Admin Menu</div>
//           <ul className="wn-menu-list">
//             {menuItems.map((item, index) => (
//               <React.Fragment key={item.name || item.path}>
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
//                   <li>
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




// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Admin_Navbar.css";
// import logoImage from "../../Logos/logo1.png";
// import { Link } from "react-router-dom";

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
//   FaShoppingCart
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
  
//   const dropdownRef = useRef(null);
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

//   // Define your navigation items with appropriate icons
//   const menuItems = [
//     { path: "/admin-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
//     { path: "/admin-add-property", name: "Add Property", icon: <FaHome /> },
//     { path: "/admin-properties", name: "Properties", icon: <FaBuilding /> },
//     { path: "/admin-users", name: "Users", icon: <FaUsers /> },
//     {
//       name: "Operations",
//       icon: <FaCogs />,
//       subMenu: [
//         { path: "/", name: "Company Payout", icon: <FaMoneyBillWave /> },
//         { path: "/", name: "Team Payout", icon: <FaHandHoldingUsd /> },
//         { path: "/admin-subscriptions", name: "Subscription", icon: <FaCreditCard /> },
//         { path: "/a-bookingslab", name: "Booking Slab", icon: <FaLayerGroup /> },
//         { path: "/admin-trainingmaterial", name: "Training Material", icon: <FaGraduationCap /> },
//         { path: "/", name: "How it works", icon: <FaQuestionCircle /> },
//         { path: "/", name: "Transactions", icon: <FaExchangeAlt /> },
//         { path: "/admin-commissionmaster", name: "Payout Master", icon: <FaDatabase /> },
//         { path: "/tablecategory", name: " Property Category", icon: <FaTag /> },
//         { path: "/tableproductcategory", name: " Product Category", icon: <FaTag /> },
//         { path: "/admin-business", name: "Business", icon: <FaBriefcase /> },
//         { path: "/admin-sitevisit", name: "Site Visits", icon: <FaEye /> },
//         { path: "/admin-chatbot", name: "Chat Bot", icon: <FaRobot /> },
//         { path: "/a-departments", name: "Departments", icon: <FaSitemap /> },
//       ],
//     },
//     { path: "/admin-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/a-leads", name: "Leads", icon: <FaChartLine /> },
//     { path: "/", name: "Reports", icon: <FaFileAlt /> },
//     { path: "/a-settings", name: "Prefix", icon: <FaTag /> },
//     { path: "/admin-profile", name: "Profile", icon: <FaUserCircle /> },
//   ];

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowCategories(false);
//       }
//     };

//     if (showCategories) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showCategories]);

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

//   const handleLogout = () => {
//     console.log("User logged out");
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
    
//     sessionStorage.clear();
//     setOpen(false);
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

//   // Handle notification click
//   const handleNotificationClick = () => {
//     console.log("Notification icon clicked");
//     // You can add notification functionality here
//     // For now, it's just a static icon
//   };

//   // Handle cart click
//   const handleCartClick = () => {
//     console.log("Cart icon clicked");
//     // You can add cart functionality here
//   };

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
//           {/* Notification Icon */}
//           <div 
//             className="wn-notification admin-notification" 
//             onClick={handleNotificationClick}
//             title="Notifications"
//           >
//             <FaBell size={16} />
//             {/* Optional notification badge */}
//             {/* <span className="wn-notification-badge">3</span> */}
//           </div>
          
//           {/* Cart Icon */}
//           <div 
//             className="wn-cart admin-cart" 
//             onClick={handleCartClick}
//             title="Cart"
//           >
//             <FaShoppingCart size={16} />
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
//               <React.Fragment key={item.name || item.path}>
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
//                   <li>
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
  FaShoppingCart
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
  
  // Notification states
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
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

  // Fetch notifications for the user
  const fetchNotifications = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        console.log("No user_id found in localStorage");
        return;
      }

      console.log("Fetching notifications for admin user:", userId);
      
      // Use the correct endpoint from your API documentation
      const response = await axios.get(`${baseurl}/notifications/?user=${userId}&is_read=false`);
      console.log("Admin Notifications API Response:", response.data);
      
      // The API response has results array with count, next, previous
      const allNotifications = response.data.results || [];
      
      // Update unread count from API response or calculate locally
      const apiUnreadCount = response.data.unread_count;
      if (apiUnreadCount !== undefined) {
        setUnreadCount(apiUnreadCount);
      } else {
        // Fallback: Calculate unread count locally
        const localUnreadCount = allNotifications.filter(n => !n.is_read).length;
        setUnreadCount(localUnreadCount);
      }
      
      // Set notifications
      setNotifications(allNotifications);
      
    } catch (error) {
      console.error("Error fetching admin notifications:", error);
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);
      }
      // Fallback: Try to filter unread notifications locally
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
      
      // Poll for new notifications every 30 seconds
      const intervalId = setInterval(fetchNotifications, 30000);
      
      return () => clearInterval(intervalId);
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close categories dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategories(false);
      }
      
      // Close notifications dropdown
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

  // Mark notification as read and navigate to property/product
  const handleNotificationItemClick = async (notification) => {
    try {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        console.error("No user_id found in localStorage");
        return;
      }
      
      console.log("Marking admin notification as read:", notification);
      console.log("Admin notification status ID:", notification.notification_status_id);
      
      // Use the correct endpoint and payload structure
      await axios.post(`${baseurl}/notifications/mark-read/`, {
        user_id: parseInt(userId),
        notification_status_ids: [notification.notification_status_id]
      });
      
      console.log("Successfully marked admin notification as read");
      
      // Update local state immediately for better UX
      const updatedNotifications = notifications.map(n => 
        n.notification_status_id === notification.notification_status_id 
          ? { ...n, is_read: true } 
          : n
      );
      
      setNotifications(updatedNotifications);
      
      // Update unread count
      const newUnreadCount = updatedNotifications.filter(n => !n.is_read).length;
      setUnreadCount(newUnreadCount);
      
      // Close notifications dropdown
      setShowNotifications(false);
      
      // Navigate based on notification type for admin
      if (notification.property && notification.property.id) {
        // Navigate to admin property details
        console.log("Navigating to admin property:", notification.property.id);
        navigate(`/admin-property-details/${notification.property.id}`);
      } else if (notification.product && notification.product.variant_id) {
        // Navigate to admin product details
        console.log("Navigating to admin product variant:", notification.product.variant_id);
        navigate(`/admin-product-details/${notification.product.variant_id}`);
      } else if (notification.lead && notification.lead.id) {
        // Navigate to lead details
        console.log("Navigating to lead:", notification.lead.id);
        navigate(`/a-lead-details/${notification.lead.id}`);
      } else if (notification.meeting && notification.meeting.id) {
        // Navigate to meeting details
        console.log("Navigating to meeting:", notification.meeting.id);
        navigate(`/admin-meeting-details/${notification.meeting.id}`);
      } else {
        // If no specific navigation, just close dropdown and refresh notifications
        fetchNotifications();
      }
      
    } catch (error) {
      console.error("Error marking admin notification as read:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
      
      // Still update UI even if API call fails for better UX
      const updatedNotifications = notifications.map(n => 
        n.notification_status_id === notification.notification_status_id 
          ? { ...n, is_read: true } 
          : n
      );
      
      setNotifications(updatedNotifications);
      
      // Update unread count
      const newUnreadCount = updatedNotifications.filter(n => !n.is_read).length;
      setUnreadCount(newUnreadCount);
      
      setShowNotifications(false);
      
      // Try navigation anyway
      if (notification.property && notification.property.id) {
        navigate(`/admin-property-details/${notification.property.id}`);
      } else if (notification.product && notification.product.variant_id) {
        navigate(`/admin-product-details/${notification.product.variant_id}`);
      } else if (notification.lead && notification.lead.id) {
        navigate(`/a-lead-details/${notification.lead.id}`);
      } else if (notification.meeting && notification.meeting.id) {
        navigate(`/admin-meeting-details/${notification.meeting.id}`);
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
      console.log("Unread notification IDs:", unreadNotifications.map(n => n.notification_status_id));
      
      // Get all unread notification status IDs
      const notificationStatusIds = unreadNotifications.map(n => n.notification_status_id);
      
      // Use the correct endpoint and payload structure
      const response = await axios.post(`${baseurl}/notifications/mark-read/`, {
        user_id: parseInt(userId),
        notification_status_ids: notificationStatusIds
      });
      
      console.log("Admin mark all as read response:", response.data);
      
      // Update local state
      const updatedNotifications = notifications.map(n => ({ ...n, is_read: true }));
      setNotifications(updatedNotifications);
      setUnreadCount(0);
      
    } catch (error) {
      console.error("Error marking all admin notifications as read:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
      // Fallback: Update UI even if API fails
      const updatedNotifications = notifications.map(n => ({ ...n, is_read: true }));
      setNotifications(updatedNotifications);
      setUnreadCount(0);
    }
  };

  // Format notification message with better styling
  const formatNotificationMessage = (notification) => {
    if (notification.property) {
      return (
        <div className="wn-notification-message-content">
          <strong className="wn-notification-title">{notification.message}</strong>
          <div className="wn-notification-subtitle">Property Update</div>
        </div>
      );
    } else if (notification.product) {
      return (
        <div className="wn-notification-message-content">
          <strong className="wn-notification-title">{notification.message}</strong>
          <div className="wn-notification-subtitle">Product Update</div>
        </div>
      );
    } else if (notification.lead) {
      return (
        <div className="wn-notification-message-content">
          <strong className="wn-notification-title">{notification.message}</strong>
          <div className="wn-notification-subtitle">New Lead</div>
        </div>
      );
    } else if (notification.meeting) {
      return (
        <div className="wn-notification-message-content">
          <strong className="wn-notification-title">{notification.message}</strong>
          <div className="wn-notification-subtitle">Meeting Reminder</div>
        </div>
      );
    } else if (notification.user) {
      return (
        <div className="wn-notification-message-content">
          <strong className="wn-notification-title">{notification.message}</strong>
          <div className="wn-notification-subtitle">User Activity</div>
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
    console.log("Admin logged out");
    // Clear all stored data
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

  // Handle cart click
  const handleCartClick = () => {
    console.log("Cart icon clicked");
    // You can add cart functionality here
  };

  // Define your navigation items with appropriate icons
  const menuItems = [
    { path: "/admin-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/admin-add-property", name: "Add Property", icon: <FaHome /> },
    { path: "/admin-properties", name: "Properties", icon: <FaBuilding /> },
    { path: "/admin-users", name: "Users", icon: <FaUsers /> },
    {
      name: "Operations",
      icon: <FaCogs />,
      subMenu: [
        { path: "/", name: "Company Payout", icon: <FaMoneyBillWave /> },
        { path: "/", name: "Team Payout", icon: <FaHandHoldingUsd /> },
        { path: "/admin-subscriptions", name: "Subscription", icon: <FaCreditCard /> },
        { path: "/a-bookingslab", name: "Booking Slab", icon: <FaLayerGroup /> },
        { path: "/admin-trainingmaterial", name: "Training Material", icon: <FaGraduationCap /> },
        { path: "/", name: "How it works", icon: <FaQuestionCircle /> },
        { path: "/", name: "Transactions", icon: <FaExchangeAlt /> },
        { path: "/admin-commissionmaster", name: "Payout Master", icon: <FaDatabase /> },
        { path: "/tablecategory", name: " Property Category", icon: <FaTag /> },
        { path: "/tableproductcategory", name: " Product Category", icon: <FaTag /> },
        { path: "/admin-business", name: "Business", icon: <FaBriefcase /> },
        { path: "/admin-sitevisit", name: "Site Visits", icon: <FaEye /> },
        { path: "/admin-chatbot", name: "Chat Bot", icon: <FaRobot /> },
        { path: "/a-departments", name: "Departments", icon: <FaSitemap /> },
      ],
    },
    { path: "/admin-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
    { path: "/a-leads", name: "Leads", icon: <FaChartLine /> },
    { path: "/", name: "Reports", icon: <FaFileAlt /> },
    { path: "/a-settings", name: "Prefix", icon: <FaTag /> },
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
                  {/* {unreadCount > 0 && (
                    <button 
                      className="wn-mark-all-read"
                      onClick={handleMarkAllAsRead}
                    >
                      Mark all as read
                    </button>
                  )} */}
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
                
                {/* {notifications.length > 0 && (
                  <div className="wn-notifications-footer">
                    <Link 
                      to="/admin-notifications" 
                      className="wn-view-all-notifications"
                      onClick={() => setShowNotifications(false)}
                    >
                      View all notifications
                    </Link>
                  </div>
                )} */}
              </div>
            )}
          </div>
          
          {/* Cart Icon */}
          {/* <div 
            className="wn-cart admin-cart" 
            onClick={handleCartClick}
            title="Cart"
          >
            <FaShoppingCart size={16} />
          </div> */}
        </div>
      </header>

      {/* OVERLAY */}
      {open && <div className="wn-overlay" onClick={() => setOpen(false)} />}

      {/* SIDEBAR - UPDATED WITH USER INFO NEXT TO LOGO */}
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
              <React.Fragment key={item.name || item.path}>
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
                  <li>
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

export default AdminNavbar;