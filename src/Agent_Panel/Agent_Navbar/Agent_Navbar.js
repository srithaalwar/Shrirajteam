// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import "./Agent_Navbar.css";
// import logoImage from "../../Logos/logo1.png";
// import { Link } from "react-router-dom";

// // Import FontAwesome icons
// import { 
//   FaTachometerAlt, 
//   FaUsers, 
//   FaUserTie, 
//   FaClipboardList, 
//   FaStar,
//   FaCaretDown,
//   FaCaretRight
// } from "react-icons/fa";

// const AgentNavbar = () => {
//   const [open, setOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [showCategories, setShowCategories] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [expandedMenu, setExpandedMenu] = useState(null);
  
//   const dropdownRef = useRef(null);
//   const loginUrl = "/login";
//   const signupUrl = "/register";
  
//   // Initialize navigate hook
//   const navigate = useNavigate();

//   // Define your navigation items
//   const menuItems = [
//     { path: "/agent-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
//     { path: "/agent-add-property", name: "Add Property", icon: <FaUsers /> },
//     { path: "/agent-my-properties", name: "My Properties", icon: <FaUserTie /> },
//     { path: "/agent-Properties", name: "Properties", icon: <FaClipboardList /> },
//     { path: "/agent-Business", name: "Business", icon: <FaClipboardList /> },
//       { path: "/agent-my-Business", name: "My Business", icon: <FaClipboardList /> },
//     {
//       name: "Operations",
//       icon: <FaStar />,
//       subMenu: [
//         { path: "/agent-Payout", name: "Payout", icon: <FaStar /> },
//         { path: "/agent-Plans", name: "Plans" },
//         { path: "/agent-TrainingMaterial", name: "Training Material" },
//         { path: "/agent-Transactions", name: "Transactions" },
//         { path: "/agent-Business", name: "Business" },
//         { path: "/agent-Site_Visits", name: "Site Visits" },
//         { path: "/agent-My-team", name: "My Team" },
//       ],
//     },
//     { path: "/", name: "Meetings", icon: <FaClipboardList /> },
//     { path: "/", name: "Offers", icon: <FaClipboardList /> },
    
//     { path: "/", name: "Profile", icon: <FaClipboardList /> },
//   ];

//   // Fetch categories
//   // useEffect(() => {
//   //   fetch("https://test.shrirajteam.com:85/categories/?level=global")
//   //     .then(res => res.json())
//   //     .then(data => {
//   //       const filtered = data.results
//   //         .filter(cat => cat.level === "global" && cat.is_active)
//   //         .sort((a, b) => a.display_order - b.display_order);
//   //       setCategories(filtered);
//   //     });
//   // }, []);

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

//   // Toggle submenu expansion
//   const toggleSubMenu = (menuName) => {
//     if (expandedMenu === menuName) {
//       setExpandedMenu(null);
//     } else {
//       setExpandedMenu(menuName);
//     }
//   };

//   // Logout function - UPDATED with navigation
//   const handleLogout = () => {
//     // Add your logout logic here (clear tokens, user data, etc.)
//     console.log("User logged out");
    
//     // Example: Clear localStorage
//     localStorage.removeItem("token");
//     localStorage.removeItem("userData");
    
//     // Example: Clear sessionStorage
//     sessionStorage.clear();
    
//     // Close sidebar after logout
//     setOpen(false);
    
//     // Navigate to homepage
//     navigate("/");
//   };

//   // Login/Signup buttons
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
//           {/* <button className="wn-location-btn">📍 Select Location</button> */}
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
//           <div className="wn-cart">🛒 Cart</div>
//         </div>
//       </header>

//       {/* OVERLAY */}
//       {open && <div className="wn-overlay" onClick={() => setOpen(false)} />}

//       {/* SIDEBAR - UPDATED WITH YOUR MENU ITEMS */}
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

//         <div className="wn-divider" />

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
//                                 {subItem.icon || <FaStar />}
//                               </span>
//                               <span className="wn-submenu-text">{subItem.name}</span>
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
//                       <span className="wn-sidebar-text">{item.name}</span>
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
//             <span className="wn-logout-icon">🚪</span>
//             <span className="wn-logout-text">Logout</span>
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default AgentNavbar;




// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Agent_Navbar.css";
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
//   FaUserTie,
//   FaStar
// } from "react-icons/fa";

// const AgentNavbar = () => {
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
//     { path: "/agent-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
//     { path: "/agent-add-property", name: "Add Property", icon: <FaHome /> },
//     { path: "/agent-my-properties", name: "My Properties", icon: <FaBuilding /> },
//     { path: "/agent-properties", name: "Properties", icon: <FaClipboardList /> },
//     // { path: "/agent-add-business-form", name: "Business", icon: <FaBriefcase /> },
//         { path: "/agent-my-products", name: "My Products", icon: <FaBriefcase /> },

//     { path: "/agent-my-business", name: "My Business", icon: <FaUserTie /> },
//     { path: "/agent-busineess-category", name: "Products", icon: <FaUserTie /> },

//     { path: "/agent-add-product-form", name: "Add Product", icon: <FaUserTie /> },

//     {
//       name: "Operations",
//       icon: <FaCogs />,
//       subMenu: [
//         { path: "/agent-payout", name: "Payout", icon: <FaMoneyBillWave /> },
//         { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//         { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
//         { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//         // { path: "/agent-business", name: "Business", icon: <FaBriefcase /> },
//         { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> },
//         { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },
//       ],
//     },
//     { path: "/", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/", name: "Offers", icon: <FaTag /> },
//     { path: "/agent-profile", name: "Profile", icon: <FaUserCircle /> },
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
//     localStorage.removeItem("agentData");
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
//           <div className="wn-cart">🛒 Cart</div>
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
//             <h4 className="wn-user-name">Agent User</h4>
//             <p className="wn-user-role">Agent</p>
//           </div>
//         </div> */}

//         {/* <div className="wn-divider" /> */}

//         {/* Navigation Items */}
//         <div className="wn-nav-section">
//           <div className="wn-section-title">Agent Menu</div>
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

// export default AgentNavbar;




// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Agent_Navbar.css";
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
//   FaUserTie,
//   FaStar,
//   FaEnvelope,
//   FaPhone,
//   FaIdCard
// } from "react-icons/fa";

// const AgentNavbar = () => {
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
//     { path: "/agent-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
//     { path: "/agent-add-property", name: "Add Property", icon: <FaHome /> },
//     { path: "/agent-my-properties", name: "My Properties", icon: <FaBuilding /> },
//     { path: "/agent-properties", name: "Properties", icon: <FaClipboardList /> },
//     { path: "/agent-my-products", name: "My Products", icon: <FaBriefcase /> },
//     { path: "/agent-my-business", name: "My Business", icon: <FaUserTie /> },
//     { path: "/agent-busineess-category", name: "Products", icon: <FaUserTie /> },
//     { path: "/agent-add-product-form", name: "Add Product", icon: <FaUserTie /> },
//     {
//       name: "Operations",
//       icon: <FaCogs />,
//       subMenu: [
//         { path: "/agent-payout", name: "Payout", icon: <FaMoneyBillWave /> },
//         { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//         { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
//         { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//         { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> },
//         { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },
//       ],
//     },
//     { path: "/p-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/agent-offers", name: "Offers", icon: <FaTag /> },
//     { path: "/agent-profile", name: "Profile", icon: <FaUserCircle /> },
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
//     localStorage.removeItem("agentData");
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
//           <div className="wn-cart">🛒 Cart</div>
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
//                 {userData.user_name || userData.username || "User"}
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
//           <div className="wn-section-title">Agent Menu</div>
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

// export default AgentNavbar;



// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Agent_Navbar.css";
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
//   FaUserTie,
//   FaStar,
//   FaEnvelope,
//   FaPhone,
//   FaIdCard,
//   FaBell,
//   FaHeart,
//   FaShoppingCart
// } from "react-icons/fa";

// const AgentNavbar = () => {
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
//     { path: "/agent-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
//     { path: "/agent-add-property", name: "Add Property", icon: <FaHome /> },
//     { path: "/agent-my-properties", name: "My Properties", icon: <FaBuilding /> },
//     { path: "/agent-properties", name: "Properties", icon: <FaClipboardList /> },
//     { path: "/agent-my-products", name: "My Products", icon: <FaBriefcase /> },
//     { path: "/agent-my-business", name: "My Business", icon: <FaUserTie /> },
//     { path: "/agent-busineess-category", name: "Products", icon: <FaUserTie /> },
//     { path: "/agent-add-product-form", name: "Add Product", icon: <FaUserTie /> },
//     {
//       name: "Operations",
//       icon: <FaCogs />,
//       subMenu: [
//         { path: "/agent-payout", name: "Payout", icon: <FaMoneyBillWave /> },
//         { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//         { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
//         { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//         { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> },
//         { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },
//       ],
//     },
//     { path: "/p-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/agent-offers", name: "Offers", icon: <FaTag /> },
//     { path: "/agent-profile", name: "Profile", icon: <FaUserCircle /> },
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
//     localStorage.removeItem("agentData");
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
//     // Add notification functionality here
//   };

//   // Handle wishlist click
//   const handleWishlistClick = () => {
//     console.log("Wishlist icon clicked");
//     // Add wishlist functionality here
//   };

//   // Handle cart click
//   const handleCartClick = () => {
//     console.log("Cart icon clicked");
//     // Add cart functionality here
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
//             className="wn-notification" 
//             onClick={handleNotificationClick}
//             title="Notifications"
//           >
//             <FaBell size={16} />
//             {/* Optional notification badge */}
//             {/* <span className="wn-notification-badge">3</span> */}
//           </div>
          
//           {/* Wishlist Icon */}
//           <div 
//             className="wn-wishlist" 
//             onClick={handleWishlistClick}
//             title="Wishlist"
//           >
//             <FaHeart size={16} />
//             {/* Optional wishlist count */}
//             {/* <span className="wn-wishlist-count">2</span> */}
//           </div>
          
//           {/* Cart Icon */}
//           <div 
//             className="wn-cart" 
//             onClick={handleCartClick}
//             title="Cart"
//           >
//             <FaShoppingCart size={16} /> 
//             {/* Optional cart count */}
//             {/* <span className="wn-cart-count">3</span> */}
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
//           <div className="wn-section-title">Agent Menu</div>
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

// export default AgentNavbar;




// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Agent_Navbar.css";
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
//   FaUserTie,
//   FaStar,
//   FaEnvelope,
//   FaPhone,
//   FaIdCard,
//   FaBell,
//   FaHeart,
//   FaShoppingCart,
//   FaUserPlus
// } from "react-icons/fa";

// const AgentNavbar = () => {
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
//     { path: "/agent-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
//     { path: "/agent-add-property", name: "Add Property", icon: <FaHome /> },
//     { path: "/agent-my-properties", name: "My Properties", icon: <FaBuilding /> },
//     { path: "/agent-properties", name: "Properties", icon: <FaClipboardList /> },
//     { path: "/agent-my-products", name: "My Products", icon: <FaBriefcase /> },
//     { path: "/agent-my-business", name: "My Business", icon: <FaUserTie /> },
//     { path: "/agent-busineess-category", name: "Products", icon: <FaUserTie /> },
//     { path: "/agent-add-product-form", name: "Add Product", icon: <FaUserTie /> },
//     {
//       name: "Operations",
//       icon: <FaCogs />,
//       subMenu: [
//         { path: "/agent-payout", name: "Payout", icon: <FaMoneyBillWave /> },
//         { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//         { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
//         { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//         { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> },
//         { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },
//       ],
//     },
//     { path: "/p-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/agent-offers", name: "Offers", icon: <FaTag /> },
//     { path: "/agent-profile", name: "Profile", icon: <FaUserCircle /> },
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
//     localStorage.removeItem("agentData");
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

//   // Handle Refer Now button click
//   const handleReferNowClick = () => {
//     const referralId = userData.referral_id || "SRP000001";
//     const referUrl = `/register?referral_id=${referralId}`;
//     navigate(referUrl);
//   };

//   // Handle notification click
//   const handleNotificationClick = () => {
//     console.log("Notification icon clicked");
//     // Add notification functionality here
//   };

//   // Handle wishlist click
//   const handleWishlistClick = () => {
//     console.log("Wishlist icon clicked");
//     // Add wishlist functionality here
//   };

//   // Handle cart click
//   const handleCartClick = () => {
//     console.log("Cart icon clicked");
//     // Add cart functionality here
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
//           {/* Refer Now Button */}
//           <button 
//             className="wn-refer-now-btn"
//             onClick={handleReferNowClick}
//             title="Refer Now"
//           >
//             <FaUserPlus style={{ marginRight: "5px" }} />
//             Refer Now
//           </button>
          
//           {/* Notification Icon */}
//           <div 
//             className="wn-notification" 
//             onClick={handleNotificationClick}
//             title="Notifications"
//           >
//             <FaBell size={16} />
//             {/* Optional notification badge */}
//             {/* <span className="wn-notification-badge">3</span> */}
//           </div>
          
//           {/* Wishlist Icon */}
//           <div 
//             className="wn-wishlist" 
//             onClick={handleWishlistClick}
//             title="Wishlist"
//           >
//             <FaHeart size={16} />
//             {/* Optional wishlist count */}
//             {/* <span className="wn-wishlist-count">2</span> */}
//           </div>
          
//           {/* Cart Icon */}
//           <div 
//             className="wn-cart" 
//             onClick={handleCartClick}
//             title="Cart"
//           >
//             <FaShoppingCart size={16} /> 
//             {/* Optional cart count */}
//             {/* <span className="wn-cart-count">3</span> */}
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
//           <div className="wn-section-title">Agent Menu</div>
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

// export default AgentNavbar;



// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Agent_Navbar.css";
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
//   FaUserTie,
//   FaStar,
//   FaEnvelope,
//   FaPhone,
//   FaIdCard,
//   FaBell,
//   FaHeart,
//   FaShoppingCart,
//   FaUserPlus,
//   FaCopy,
//   FaCheck
// } from "react-icons/fa";

// const AgentNavbar = () => {
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
//   const [copyStatus, setCopyStatus] = useState({ copied: false, showMessage: false });
  
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

//   // Hide copy message after 3 seconds
//   useEffect(() => {
//     if (copyStatus.showMessage) {
//       const timer = setTimeout(() => {
//         setCopyStatus({ copied: false, showMessage: false });
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [copyStatus.showMessage]);

//   // Define your navigation items with appropriate icons
//   const menuItems = [
//     { path: "/agent-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
//     { path: "/agent-add-property", name: "Add Property", icon: <FaHome /> },
//     { path: "/agent-my-properties", name: "My Properties", icon: <FaBuilding /> },
//     { path: "/agent-properties", name: "Properties", icon: <FaClipboardList /> },
//     { path: "/agent-my-products", name: "My Products", icon: <FaBriefcase /> },
//     { path: "/agent-my-business", name: "My Business", icon: <FaUserTie /> },
//     { path: "/agent-busineess-category", name: "Products", icon: <FaUserTie /> },
//     { path: "/agent-add-product-form", name: "Add Product", icon: <FaUserTie /> },
//     {
//       name: "Operations",
//       icon: <FaCogs />,
//       subMenu: [
//         { path: "/agent-payout", name: "Payout", icon: <FaMoneyBillWave /> },
//         { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//         { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
//         { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//         { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> },
//         { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },
//       ],
//     },
//     { path: "/p-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/agent-offers", name: "Offers", icon: <FaTag /> },
//     { path: "/agent-profile", name: "Profile", icon: <FaUserCircle /> },
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
//     localStorage.removeItem("agentData");
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

//   // Handle Refer Now button click - UPDATED (removed window.open)
//   const handleReferNowClick = (e) => {
//     e.preventDefault();
    
//     const referralId = userData.referral_id || "SRP000001";
//     const baseUrl = window.location.origin; // Get current website URL
//     const referUrl = `${baseUrl}/register?referral_id=${referralId}`;
    
//     // Copy to clipboard
//     navigator.clipboard.writeText(referUrl)
//       .then(() => {
//         setCopyStatus({ copied: true, showMessage: true });
//         console.log("Referral URL copied to clipboard:", referUrl);
//       })
//       .catch(err => {
//         console.error("Failed to copy: ", err);
//         // Fallback for older browsers
//         const textArea = document.createElement("textarea");
//         textArea.value = referUrl;
//         document.body.appendChild(textArea);
//         textArea.select();
//         try {
//           document.execCommand('copy');
//           setCopyStatus({ copied: true, showMessage: true });
//           console.log("Referral URL copied to clipboard (fallback):", referUrl);
//         } catch (err) {
//           console.error("Fallback copy failed: ", err);
//         }
//         document.body.removeChild(textArea);
//       });
    
//     // REMOVED: window.open(referUrl, '_blank', 'noopener,noreferrer');
//   };

//   // Handle notification click
//   const handleNotificationClick = () => {
//     console.log("Notification icon clicked");
//     // Add notification functionality here
//   };

//   // Handle wishlist click
//   const handleWishlistClick = () => {
//     console.log("Wishlist icon clicked");
//     // Add wishlist functionality here
//   };

//   // Handle cart click
//   const handleCartClick = () => {
//     console.log("Cart icon clicked");
//     // Add cart functionality here
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
//           {/* Copy Status Message */}
//           {copyStatus.showMessage && (
//             <div className="wn-copy-message">
//               {copyStatus.copied ? (
//                 <>
//                   <FaCheck style={{ marginRight: "5px", color: "#4CAF50" }} />
//                   Referral link copied!
//                 </>
//               ) : (
//                 "Copying..."
//               )}
//             </div>
//           )}
          
//           {/* Refer Now Button */}
//           <button 
//             className="wn-refer-now-btn"
//             onClick={handleReferNowClick}
//             title="Refer Now"
//           >
//             {copyStatus.copied ? (
//               <FaCheck style={{ marginRight: "5px" }} />
//             ) : (
//               <FaUserPlus style={{ marginRight: "5px" }} />
//             )}
//             {copyStatus.copied ? "Copied!" : "Refer Now"}
//           </button>
          
//           {/* Notification Icon */}
//           <div 
//             className="wn-notification" 
//             onClick={handleNotificationClick}
//             title="Notifications"
//           >
//             <FaBell size={16} />
//             {/* Optional notification badge */}
//             {/* <span className="wn-notification-badge">3</span> */}
//           </div>
          
//           {/* Wishlist Icon */}
//           <div 
//             className="wn-wishlist" 
//             onClick={handleWishlistClick}
//             title="Wishlist"
//           >
//             <FaHeart size={16} />
//             {/* Optional wishlist count */}
//             {/* <span className="wn-wishlist-count">2</span> */}
//           </div>
          
//           {/* Cart Icon */}
//           <div 
//             className="wn-cart" 
//             onClick={handleCartClick}
//             title="Cart"
//           >
//             <FaShoppingCart size={16} /> 
//             {/* Optional cart count */}
//             {/* <span className="wn-cart-count">3</span> */}
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
//           <div className="wn-section-title">Agent Menu</div>
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

// export default AgentNavbar;


// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Agent_Navbar.css";
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
//   FaShoppingCart,
//   FaUserPlus,
//   FaCopy,
//   FaCheck
// } from "react-icons/fa";

// const AgentNavbar = () => {
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
//   const [copyStatus, setCopyStatus] = useState({ copied: false, showMessage: false });
  
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

//   // Hide copy message after 3 seconds
//   useEffect(() => {
//     if (copyStatus.showMessage) {
//       const timer = setTimeout(() => {
//         setCopyStatus({ copied: false, showMessage: false });
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [copyStatus.showMessage]);

//   // Fetch notifications for the user
//   const fetchNotifications = async () => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) {
//         console.log("No user_id found in localStorage");
//         return;
//       }

//       console.log("Fetching notifications for user:", userId);
      
//       // Use the correct endpoint from your API documentation
//       const response = await axios.get(`${baseurl}/notifications/?user=${userId}&is_read=false`);
//       console.log("Notifications API Response:", response.data);
      
//       // The API response has results array with count, next, previous
//       const allNotifications = response.data.results || [];
      
//       // Update unread count from API response or calculate locally
//       const apiUnreadCount = response.data.unread_count;
//       if (apiUnreadCount !== undefined) {
//         setUnreadCount(apiUnreadCount);
//       } else {
//         // Fallback: Calculate unread count locally
//         const localUnreadCount = allNotifications.filter(n => !n.is_read).length;
//         setUnreadCount(localUnreadCount);
//       }
      
//       // Set notifications
//       setNotifications(allNotifications);
      
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
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
//       console.log("Setting up notification polling for user:", userId);
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

//   // Mark notification as read and navigate to property/product
//   const handleNotificationItemClick = async (notification) => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) {
//         console.error("No user_id found in localStorage");
//         return;
//       }
      
//       console.log("Marking notification as read:", notification);
//       console.log("Notification status ID:", notification.notification_status_id);
      
//       // Use the correct endpoint and payload structure
//       await axios.post(`${baseurl}/notifications/mark-read/`, {
//         user_id: parseInt(userId),
//         notification_status_ids: [notification.notification_status_id]
//       });
      
//       console.log("Successfully marked notification as read");
      
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
      
//       // Navigate based on notification type
//       if (notification.property && notification.property.id) {
//         // Navigate to property details
//         console.log("Navigating to property:", notification.property.id);
//         // navigate(`/agent-properties/${notification.property.id}`);
//         navigate(`/agent-properties-details/${notification.property.id}`);
//       } else if (notification.product && notification.product.variant_id) {
//         // Navigate to product details
//         console.log("Navigating to product variant:", notification.product.variant_id);
//         navigate(`/agent-product-details/${notification.product.variant_id}`);
//       } else if (notification.meeting && notification.meeting.id) {
//         // Navigate to meeting details
//         console.log("Navigating to meeting:", notification.meeting.id);
//         navigate(`/p-meetings/${notification.meeting.id}`);
//       } else {
//         // If no specific navigation, just close dropdown and refresh notifications
//         fetchNotifications();
//       }
      
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//       if (error.response) {
//         console.error("Error response:", error.response.data);
//       }
      
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
      
//       // Try navigation anyway
//       if (notification.property && notification.property.id) {
//         navigate(`/agent-properties/${notification.property.id}`);
//       } else if (notification.product && notification.product.variant_id) {
//         navigate(`/agent-product-details/${notification.product.variant_id}`);
//       } else if (notification.meeting && notification.meeting.id) {
//         navigate(`/p-meetings/${notification.meeting.id}`);
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
//         console.log("No unread notifications to mark");
//         return;
//       }
      
//       console.log("Marking all notifications as read");
//       console.log("Unread notification IDs:", unreadNotifications.map(n => n.notification_status_id));
      
//       // Get all unread notification status IDs
//       const notificationStatusIds = unreadNotifications.map(n => n.notification_status_id);
      
//       // Use the correct endpoint and payload structure
//       const response = await axios.post(`${baseurl}/notifications/mark-read/`, {
//         user_id: parseInt(userId),
//         notification_status_ids: notificationStatusIds
//       });
      
//       console.log("Mark all as read response:", response.data);
      
//       // Update local state
//       const updatedNotifications = notifications.map(n => ({ ...n, is_read: true }));
//       setNotifications(updatedNotifications);
//       setUnreadCount(0);
      
//     } catch (error) {
//       console.error("Error marking all notifications as read:", error);
//       if (error.response) {
//         console.error("Error response:", error.response.data);
//       }
//       // Fallback: Update UI even if API fails
//       const updatedNotifications = notifications.map(n => ({ ...n, is_read: true }));
//       setNotifications(updatedNotifications);
//       setUnreadCount(0);
//     }
//   };

//   // Format notification message with better styling
//   const formatNotificationMessage = (notification) => {
//     if (notification.property) {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//           <div className="wn-notification-subtitle">Property Update</div>
//         </div>
//       );
//     } else if (notification.product) {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//           <div className="wn-notification-subtitle">Product Update</div>
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
//         </div>
//       );
//     }
//   };

//   const handleLogout = () => {
//     console.log("Agent logged out");
//     // Clear all stored data
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("agentData");
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
//     setNotifications([]);
//     setUnreadCount(0);
//     navigate("/");
//   };

//   // Handle Refer Now button click - UPDATED (removed window.open)
//   const handleReferNowClick = (e) => {
//     e.preventDefault();
    
//     const referralId = userData.referral_id || "SRP000001";
//     const baseUrl = window.location.origin; // Get current website URL
//     const referUrl = `${baseUrl}/register?referral_id=${referralId}`;
    
//     // Copy to clipboard
//     navigator.clipboard.writeText(referUrl)
//       .then(() => {
//         setCopyStatus({ copied: true, showMessage: true });
//         console.log("Referral URL copied to clipboard:", referUrl);
//       })
//       .catch(err => {
//         console.error("Failed to copy: ", err);
//         // Fallback for older browsers
//         const textArea = document.createElement("textarea");
//         textArea.value = referUrl;
//         document.body.appendChild(textArea);
//         textArea.select();
//         try {
//           document.execCommand('copy');
//           setCopyStatus({ copied: true, showMessage: true });
//           console.log("Referral URL copied to clipboard (fallback):", referUrl);
//         } catch (err) {
//           console.error("Fallback copy failed: ", err);
//         }
//         document.body.removeChild(textArea);
//       });
//   };

//   // Handle wishlist click
//   const handleWishlistClick = () => {
//     console.log("Wishlist icon clicked");
//     navigate("/agent-wishlist");
//   };

//   // Handle cart click
//   const handleCartClick = () => {
//     console.log("Cart icon clicked");
//     navigate("/agent-cart");
//   };

//   // Define your navigation items with appropriate icons
//   const menuItems = [
//     { path: "/agent-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
//     { path: "/agent-add-property", name: "Add Property", icon: <FaHome /> },
//     { path: "/agent-my-properties", name: "My Properties", icon: <FaBuilding /> },
//     { path: "/agent-properties", name: "Properties", icon: <FaClipboardList /> },
//     { path: "/agent-my-products", name: "My Products", icon: <FaBriefcase /> },
//     { path: "/agent-my-business", name: "My Business", icon: <FaUserTie /> },
//     { path: "/agent-busineess-category", name: "Products", icon: <FaUserTie /> },
//     { path: "/agent-add-product-form", name: "Add Product", icon: <FaUserTie /> },
//     {
//       name: "Operations",
//       icon: <FaCogs />,
//       subMenu: [
//         { path: "/agent-payout", name: "Payout", icon: <FaMoneyBillWave /> },
//         { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//         { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
//         { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//         { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> },
//         { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },
//       ],
//     },
//     { path: "/p-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/agent-offers", name: "Offers", icon: <FaTag /> },
//     { path: "/agent-profile", name: "Profile", icon: <FaUserCircle /> },
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
//           {/* Copy Status Message */}
//           {copyStatus.showMessage && (
//             <div className="wn-copy-message">
//               {copyStatus.copied ? (
//                 <>
//                   <FaCheck style={{ marginRight: "5px", color: "#4CAF50" }} />
//                   Referral link copied!
//                 </>
//               ) : (
//                 "Copying..."
//               )}
//             </div>
//           )}
          
//           {/* Refer Now Button */}
//           <button 
//             className="wn-refer-now-btn"
//             onClick={handleReferNowClick}
//             title="Refer Now"
//           >
//             {copyStatus.copied ? (
//               <FaCheck style={{ marginRight: "5px" }} />
//             ) : (
//               <FaUserPlus style={{ marginRight: "5px" }} />
//             )}
//             {copyStatus.copied ? "Copied!" : "Refer Now"}
//           </button>
          
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
//                   <h4>Notifications</h4>
//                   {/* {unreadCount > 0 && (
//                     <button 
//                       className="wn-mark-all-read"
//                       onClick={handleMarkAllAsRead}
//                     >
//                       Mark all as read
//                     </button>
//                   )} */}
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
                
//                 {/* {notifications.length > 0 && (
//                   <div className="wn-notifications-footer">
//                     <Link 
//                       to="/agent-notifications" 
//                       className="wn-view-all-notifications"
//                       onClick={() => setShowNotifications(false)}
//                     >
//                       View all notifications
//                     </Link>
//                   </div>
//                 )} */}
//               </div>
//             )}
//           </div>
          
//           {/* Wishlist Icon */}
//           <div 
//             className="wn-wishlist" 
//             onClick={handleWishlistClick}
//             title="Wishlist"
//           >
//             <FaHeart size={16} />
//           </div>
          
//           {/* Cart Icon */}
//           <div 
//             className="wn-cart" 
//             onClick={handleCartClick}
//             title="Cart"
//           >
//             <FaShoppingCart size={16} />
//             <span className="wn-cart-text">Cart</span>
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
//           <div className="wn-section-title">Agent Menu</div>
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

// export default AgentNavbar;


// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Agent_Navbar.css";
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
//   FaShoppingCart,
//   FaUserPlus,
//   FaCopy,
//   FaCheck
// } from "react-icons/fa";

// const AgentNavbar = () => {
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
//   const [copyStatus, setCopyStatus] = useState({ copied: false, showMessage: false });
  
//   // Notification states
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showNotifications, setShowNotifications] = useState(false);
  
//   // Cart states
//   const [cartItems, setCartItems] = useState([]);
//   const [cartItemCount, setCartItemCount] = useState(0); // Number of distinct items
//   const [cartTotalQuantity, setCartTotalQuantity] = useState(0); // Total quantity sum
//   const [cartLoading, setCartLoading] = useState(false);
  
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

//   // Hide copy message after 3 seconds
//   useEffect(() => {
//     if (copyStatus.showMessage) {
//       const timer = setTimeout(() => {
//         setCopyStatus({ copied: false, showMessage: false });
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [copyStatus.showMessage]);

//   /* ================= FETCH CART ITEMS ================= */
//   const fetchCartItems = async () => {
//     const userId = localStorage.getItem("user_id");
    
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
//       console.log("API cart count:", cartResponse.count);
//       console.log("Number of items in results:", userCartItems.length);
      
//       setCartItems(userCartItems);
      
//       // OPTION 1: Use the count from API response (recommended)
//       if (cartResponse.count !== undefined) {
//         // Use the count provided by API (number of distinct items)
//         setCartItemCount(cartResponse.count);
//         console.log("Using API count:", cartResponse.count);
//       } else {
//         // Fallback: Count items in results array
//         setCartItemCount(userCartItems.length);
//         console.log("Using results length:", userCartItems.length);
//       }
      
//       // Also calculate total quantity (for debugging/info)
//       const totalQuantity = userCartItems.reduce((total, item) => {
//         return total + (item.quantity || 1);
//       }, 0);
      
//       setCartTotalQuantity(totalQuantity);
//       console.log("Total quantity sum:", totalQuantity);
      
//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//       if (error.response) {
//         console.error("Error response status:", error.response.status);
//         console.error("Error response data:", error.response.data);
//       }
//       setCartItems([]);
//       setCartItemCount(0);
//       setCartTotalQuantity(0);
//     } finally {
//       setCartLoading(false);
//     }
//   };

//   // Fetch cart items on component mount and when user changes
//   useEffect(() => {
//     const userId = localStorage.getItem("user_id");
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
//   }, []);

//   // Also fetch cart when component mounts
//   useEffect(() => {
//     fetchCartItems();
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

//   // Fetch notifications for the user
//   const fetchNotifications = async () => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) {
//         console.log("No user_id found in localStorage");
//         return;
//       }

//       console.log("Fetching notifications for user:", userId);
      
//       // Use the correct endpoint from your API documentation
//       const response = await axios.get(`${baseurl}/notifications/?user=${userId}&is_read=false`);
//       console.log("Notifications API Response:", response.data);
      
//       // The API response has results array with count, next, previous
//       const allNotifications = response.data.results || [];
      
//       // Update unread count from API response or calculate locally
//       const apiUnreadCount = response.data.unread_count;
//       if (apiUnreadCount !== undefined) {
//         setUnreadCount(apiUnreadCount);
//       } else {
//         // Fallback: Calculate unread count locally
//         const localUnreadCount = allNotifications.filter(n => !n.is_read).length;
//         setUnreadCount(localUnreadCount);
//       }
      
//       // Set notifications
//       setNotifications(allNotifications);
      
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
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
//       console.log("Setting up notification polling for user:", userId);
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

//   // Mark notification as read and navigate to property/product
//   const handleNotificationItemClick = async (notification) => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) {
//         console.error("No user_id found in localStorage");
//         return;
//       }
      
//       console.log("Marking notification as read:", notification);
//       console.log("Notification status ID:", notification.notification_status_id);
      
//       // Use the correct endpoint and payload structure
//       await axios.post(`${baseurl}/notifications/mark-read/`, {
//         user_id: parseInt(userId),
//         notification_status_ids: [notification.notification_status_id]
//       });
      
//       console.log("Successfully marked notification as read");
      
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
      
//       // Navigate based on notification type
//       if (notification.property && notification.property.id) {
//         // Navigate to property details
//         console.log("Navigating to property:", notification.property.id);
//         navigate(`/agent-properties-details/${notification.property.id}`);
//       } else if (notification.product && notification.product.variant_id) {
//         // Navigate to product details
//         console.log("Navigating to product variant:", notification.product.variant_id);
//         navigate(`/agent-product-details/${notification.product.variant_id}`);
//       } else if (notification.meeting && notification.meeting.id) {
//         // Navigate to meeting details
//         console.log("Navigating to meeting:", notification.meeting.id);
//         navigate(`/p-meetings/${notification.meeting.id}`);
//       } else {
//         // If no specific navigation, just close dropdown and refresh notifications
//         fetchNotifications();
//       }
      
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//       if (error.response) {
//         console.error("Error response:", error.response.data);
//       }
      
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
      
//       // Try navigation anyway
//       if (notification.property && notification.property.id) {
//         navigate(`/agent-properties/${notification.property.id}`);
//       } else if (notification.product && notification.product.variant_id) {
//         navigate(`/agent-product-details/${notification.product.variant_id}`);
//       } else if (notification.meeting && notification.meeting.id) {
//         navigate(`/p-meetings/${notification.meeting.id}`);
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
//         console.log("No unread notifications to mark");
//         return;
//       }
      
//       console.log("Marking all notifications as read");
//       console.log("Unread notification IDs:", unreadNotifications.map(n => n.notification_status_id));
      
//       // Get all unread notification status IDs
//       const notificationStatusIds = unreadNotifications.map(n => n.notification_status_id);
      
//       // Use the correct endpoint and payload structure
//       const response = await axios.post(`${baseurl}/notifications/mark-read/`, {
//         user_id: parseInt(userId),
//         notification_status_ids: notificationStatusIds
//       });
      
//       console.log("Mark all as read response:", response.data);
      
//       // Update local state
//       const updatedNotifications = notifications.map(n => ({ ...n, is_read: true }));
//       setNotifications(updatedNotifications);
//       setUnreadCount(0);
      
//     } catch (error) {
//       console.error("Error marking all notifications as read:", error);
//       if (error.response) {
//         console.error("Error response:", error.response.data);
//       }
//       // Fallback: Update UI even if API fails
//       const updatedNotifications = notifications.map(n => ({ ...n, is_read: true }));
//       setNotifications(updatedNotifications);
//       setUnreadCount(0);
//     }
//   };

//   // Format notification message with better styling
//   const formatNotificationMessage = (notification) => {
//     if (notification.property) {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//           <div className="wn-notification-subtitle">Property Update</div>
//         </div>
//       );
//     } else if (notification.product) {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//           <div className="wn-notification-subtitle">Product Update</div>
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
//         </div>
//       );
//     }
//   };

//   const handleLogout = () => {
//     console.log("Agent logged out");
//     // Clear all stored data
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("agentData");
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
//     setNotifications([]);
//     setUnreadCount(0);
//     setCartItems([]);
//     setCartItemCount(0);
//     setCartTotalQuantity(0);
//     navigate("/");
//   };

//   // Handle Refer Now button click
//   const handleReferNowClick = (e) => {
//     e.preventDefault();
    
//     const referralId = userData.referral_id || "SRP000001";
//     const baseUrl = window.location.origin; // Get current website URL
//     const referUrl = `${baseUrl}/register?referral_id=${referralId}`;
    
//     // Copy to clipboard
//     navigator.clipboard.writeText(referUrl)
//       .then(() => {
//         setCopyStatus({ copied: true, showMessage: true });
//         console.log("Referral URL copied to clipboard:", referUrl);
//       })
//       .catch(err => {
//         console.error("Failed to copy: ", err);
//         // Fallback for older browsers
//         const textArea = document.createElement("textarea");
//         textArea.value = referUrl;
//         document.body.appendChild(textArea);
//         textArea.select();
//         try {
//           document.execCommand('copy');
//           setCopyStatus({ copied: true, showMessage: true });
//           console.log("Referral URL copied to clipboard (fallback):", referUrl);
//         } catch (err) {
//           console.error("Fallback copy failed: ", err);
//         }
//         document.body.removeChild(textArea);
//       });
//   };

//   // Handle wishlist click
//   const handleWishlistClick = () => {
//     console.log("Wishlist icon clicked");
//     navigate("/agent-wishlist");
//   };

//   // Handle cart click
//   const handleCartClick = () => {
//     console.log("Cart icon clicked");
//     console.log("Current cart distinct items:", cartItemCount);
//     console.log("Current cart total quantity:", cartTotalQuantity);
//     console.log("Cart items:", cartItems);
//     navigate("/agent-add-to-cart");


//   };

//   // Define your navigation items with appropriate icons
//   const menuItems = [
//     { path: "/agent-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
//     { path: "/agent-add-property", name: "Add Property", icon: <FaHome /> },
//     { path: "/agent-my-properties", name: "My Properties", icon: <FaBuilding /> },
//     { path: "/agent-properties", name: "Properties", icon: <FaClipboardList /> },
//     { path: "/agent-my-products", name: "My Products", icon: <FaBriefcase /> },
//     { path: "/agent-my-business", name: "My Business", icon: <FaUserTie /> },
//     { path: "/agent-busineess-category", name: "Products", icon: <FaUserTie /> },
//     { path: "/agent-add-product-form", name: "Add Product", icon: <FaUserTie /> },
//     {
//       name: "Operations",
//       icon: <FaCogs />,
//       subMenu: [
//         { path: "/agent-payout", name: "Payout", icon: <FaMoneyBillWave /> },
//         { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//         { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
//         { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//         { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> },
//         { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },
//       ],
//     },
//     { path: "/p-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/agent-offers", name: "Offers", icon: <FaTag /> },
//     { path: "/agent-profile", name: "Profile", icon: <FaUserCircle /> },
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
//           {/* Copy Status Message */}
//           {copyStatus.showMessage && (
//             <div className="wn-copy-message">
//               {copyStatus.copied ? (
//                 <>
//                   <FaCheck style={{ marginRight: "5px", color: "#4CAF50" }} />
//                   Referral link copied!
//                 </>
//               ) : (
//                 "Copying..."
//               )}
//             </div>
//           )}
          
//           {/* Refer Now Button */}
//           <button 
//             className="wn-refer-now-btn"
//             onClick={handleReferNowClick}
//             title="Refer Now"
//           >
//             {copyStatus.copied ? (
//               <FaCheck style={{ marginRight: "5px" }} />
//             ) : (
//               <FaUserPlus style={{ marginRight: "5px" }} />
//             )}
//             {copyStatus.copied ? "Copied!" : "Refer Now"}
//           </button>
          
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
//                   <h4>Notifications</h4>
//                   {/* {unreadCount > 0 && (
//                     <button 
//                       className="wn-mark-all-read"
//                       onClick={handleMarkAllAsRead}
//                     >
//                       Mark all as read
//                     </button>
//                   )} */}
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
                
//                 {/* {notifications.length > 0 && (
//                   <div className="wn-notifications-footer">
//                     <Link 
//                       to="/agent-notifications" 
//                       className="wn-view-all-notifications"
//                       onClick={() => setShowNotifications(false)}
//                     >
//                       View all notifications
//                     </Link>
//                   </div>
//                 )} */}
//               </div>
//             )}
//           </div>
          
//           {/* Wishlist Icon */}
//           <div 
//             className="wn-wishlist" 
//             onClick={handleWishlistClick}
//             title="Wishlist"
//           >
//             <FaHeart size={16} />
//           </div>
          
//           {/* Cart Icon with Dynamic Count */}
//           <div 
//             className="wn-cart" 
//             onClick={handleCartClick}
//             title={`Cart: ${cartItemCount} item${cartItemCount !== 1 ? 's' : ''} (${cartTotalQuantity} total)`}
//             style={{ opacity: cartLoading ? 0.7 : 1 }}
//           >
//             <FaShoppingCart size={16} />
//             {cartItemCount > 0 && (
//               <span className="wn-cart-badge">{cartItemCount}</span>
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
//           <div className="wn-section-title">Agent Menu</div>
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

// export default AgentNavbar;







// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Agent_Navbar.css";
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
//   FaShoppingCart,
//   FaUserPlus,
//   FaCopy,
//   FaCheck
// } from "react-icons/fa";

// const AgentNavbar = () => {
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
//   const [copyStatus, setCopyStatus] = useState({ copied: false, showMessage: false });
  
//   // Notification states
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showNotifications, setShowNotifications] = useState(false);
  
//   // Cart states
//   const [cartItems, setCartItems] = useState([]);
//   const [cartItemCount, setCartItemCount] = useState(0); // Number of distinct items
//   const [cartTotalQuantity, setCartTotalQuantity] = useState(0); // Total quantity sum
//   const [cartLoading, setCartLoading] = useState(false);
  
//   // Wishlist states - ADDED
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [wishlistCount, setWishlistCount] = useState(0); // Number of wishlist items
//   const [wishlistLoading, setWishlistLoading] = useState(false);
  
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

//   // Hide copy message after 3 seconds
//   useEffect(() => {
//     if (copyStatus.showMessage) {
//       const timer = setTimeout(() => {
//         setCopyStatus({ copied: false, showMessage: false });
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [copyStatus.showMessage]);

//   /* ================= FETCH CART ITEMS ================= */
//   const fetchCartItems = async () => {
//     const userId = localStorage.getItem("user_id");
    
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
//     const userId = localStorage.getItem("user_id");
    
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
//     const userId = localStorage.getItem("user_id");
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
//   }, []);

//   // Fetch wishlist items on component mount and set up polling
//   useEffect(() => {
//     const userId = localStorage.getItem("user_id");
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
//   }, []);

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

//       console.log("Fetching notifications for user:", userId);
      
//       const response = await axios.get(`${baseurl}/notifications/?user=${userId}&is_read=false`);
//       console.log("Notifications API Response:", response.data);
      
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
//       console.error("Error fetching notifications:", error);
//       const unread = notifications.filter(notification => !notification.is_read);
//       setUnreadCount(unread.length);
//     }
//   };

//   // Fetch notifications on component mount and set up polling
//   useEffect(() => {
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       console.log("Setting up notification polling for user:", userId);
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
      
//       if (notification.property && notification.property.id) {
//         navigate(`/agent-properties-details/${notification.property.id}`);
//       } else if (notification.product && notification.product.variant_id) {
//         navigate(`/agent-product-details/${notification.product.variant_id}`);
//       } else if (notification.meeting && notification.meeting.id) {
//         navigate(`/p-meetings/${notification.meeting.id}`);
//       } else {
//         fetchNotifications();
//       }
      
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//       const updatedNotifications = notifications.map(n => 
//         n.notification_status_id === notification.notification_status_id 
//           ? { ...n, is_read: true } 
//           : n
//       );
      
//       setNotifications(updatedNotifications);
//       const newUnreadCount = updatedNotifications.filter(n => !n.is_read).length;
//       setUnreadCount(newUnreadCount);
      
//       setShowNotifications(false);
      
//       if (notification.property && notification.property.id) {
//         navigate(`/agent-properties/${notification.property.id}`);
//       } else if (notification.product && notification.product.variant_id) {
//         navigate(`/agent-product-details/${notification.product.variant_id}`);
//       } else if (notification.meeting && notification.meeting.id) {
//         navigate(`/p-meetings/${notification.meeting.id}`);
//       }
//     }
//   };

//   // Format notification message
//   const formatNotificationMessage = (notification) => {
//     if (notification.property) {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//           <div className="wn-notification-subtitle">Property Update</div>
//         </div>
//       );
//     } else if (notification.product) {
//       return (
//         <div className="wn-notification-message-content">
//           <strong className="wn-notification-title">{notification.message}</strong>
//           <div className="wn-notification-subtitle">Product Update</div>
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
//         </div>
//       );
//     }
//   };

//   const handleLogout = () => {
//     console.log("Agent logged out");
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("agentData");
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
//     setNotifications([]);
//     setUnreadCount(0);
//     setCartItems([]);
//     setCartItemCount(0);
//     setCartTotalQuantity(0);
//     setWishlistItems([]);
//     setWishlistCount(0);
//     navigate("/");
//   };

//   // Handle Refer Now button click
//   const handleReferNowClick = (e) => {
//     e.preventDefault();
    
//     const referralId = userData.referral_id || "SRP000001";
//     const baseUrl = window.location.origin;
//     const referUrl = `${baseUrl}/register?referral_id=${referralId}`;
    
//     navigator.clipboard.writeText(referUrl)
//       .then(() => {
//         setCopyStatus({ copied: true, showMessage: true });
//       })
//       .catch(err => {
//         console.error("Failed to copy: ", err);
//         const textArea = document.createElement("textarea");
//         textArea.value = referUrl;
//         document.body.appendChild(textArea);
//         textArea.select();
//         try {
//           document.execCommand('copy');
//           setCopyStatus({ copied: true, showMessage: true });
//         } catch (err) {
//           console.error("Fallback copy failed: ", err);
//         }
//         document.body.removeChild(textArea);
//       });
//   };

//   // Handle wishlist click - UPDATED
//   const handleWishlistClick = () => {
//     console.log("Wishlist icon clicked");
//     console.log("Wishlist count:", wishlistCount);
//     console.log("Wishlist items:", wishlistItems);
//     navigate("/agent-wishlist");
//   };

//   // Handle cart click - UPDATED
//   const handleCartClick = () => {
//     console.log("Cart icon clicked");
//     console.log("Cart count:", cartItemCount);
//     console.log("Cart items:", cartItems);
//     navigate("/agent-add-to-cart");
//   };

//   // Define your navigation items - ADDED WISHLIST & CART TO SIDEBAR
//   const menuItems = [
//     { path: "/agent-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
//     { path: "/agent-add-property", name: "Add Property", icon: <FaHome /> },
//     { path: "/agent-my-properties", name: "My Properties", icon: <FaBuilding /> },
//     { path: "/agent-properties", name: "Properties", icon: <FaClipboardList /> },
//     { path: "/agent-my-products", name: "My Products", icon: <FaBriefcase /> },
//     { path: "/agent-my-business", name: "My Business", icon: <FaUserTie /> },
//     { path: "/agent-busineess-category", name: "Products", icon: <FaUserTie /> },
//     { path: "/agent-add-product-form", name: "Add Product", icon: <FaUserTie /> },
//     {
//       name: "Operations",
//       icon: <FaCogs />,
//       subMenu: [
//         { path: "/agent-payout", name: "Payout", icon: <FaMoneyBillWave /> },
//         { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//         { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
//         { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//         { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> },
//         { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },
//       ],
//     },
//     { path: "/p-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/agent-offers", name: "Offers", icon: <FaTag /> },
//     { path: "/agent-wishlist", name: "My Wishlist", icon: <FaHeart /> }, // ADDED
//     { path: "/agent-add-to-cart", name: "My Cart", icon: <FaShoppingCart /> }, // ADDED
//     { path: "/agent-profile", name: "Profile", icon: <FaUserCircle /> },
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
//           {/* Copy Status Message */}
//           {copyStatus.showMessage && (
//             <div className="wn-copy-message">
//               {copyStatus.copied ? (
//                 <>
//                   <FaCheck style={{ marginRight: "5px", color: "#4CAF50" }} />
//                   Referral link copied!
//                 </>
//               ) : (
//                 "Copying..."
//               )}
//             </div>
//           )}
          
//           {/* Refer Now Button */}
//           <button 
//             className="wn-refer-now-btn"
//             onClick={handleReferNowClick}
//             title="Refer Now"
//           >
//             {copyStatus.copied ? (
//               <FaCheck style={{ marginRight: "5px" }} />
//             ) : (
//               <FaUserPlus style={{ marginRight: "5px" }} />
//             )}
//             {copyStatus.copied ? "Copied!" : "Refer Now"}
//           </button>
          
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
//                   <h4>Notifications</h4>
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
          
//           {/* Wishlist Icon with Dynamic Count - UPDATED */}
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
//           <div className="wn-section-title">Agent Menu</div>
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

// export default AgentNavbar;


import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Agent_Navbar.css";
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
  FaUserTie,
  FaStar,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaBell,
  FaHeart,
  FaShoppingCart,
  FaUserPlus,
  FaCopy,
  FaCheck
} from "react-icons/fa";

const AgentNavbar = () => {
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
  const [copyStatus, setCopyStatus] = useState({ copied: false, showMessage: false });
  
  // Notification states
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Cart states
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0); // Number of distinct items
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0); // Total quantity sum
  const [cartLoading, setCartLoading] = useState(false);
  
  // Wishlist states - ADDED
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0); // Number of wishlist items
  const [wishlistLoading, setWishlistLoading] = useState(false);
  
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

  // Hide copy message after 3 seconds
  useEffect(() => {
    if (copyStatus.showMessage) {
      const timer = setTimeout(() => {
        setCopyStatus({ copied: false, showMessage: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [copyStatus.showMessage]);

  /* ================= FETCH CART ITEMS ================= */
  const fetchCartItems = async () => {
    const userId = localStorage.getItem("user_id");
    
    if (!userId) {
      console.log("No user_id found, cannot fetch cart items");
      setCartItems([]);
      setCartItemCount(0);
      setCartTotalQuantity(0);
      return;
    }

    setCartLoading(true);
    try {
      console.log("Fetching cart items for user:", userId);
      
      // Fetch cart items from API with user filter
      const response = await axios.get(`${baseurl}/cart/?user=${userId}`);
      console.log("Cart API Response:", response.data);
      
      // Handle paginated response - get items from results array
      const cartResponse = response.data;
      let userCartItems = [];
      
      if (cartResponse.results && Array.isArray(cartResponse.results)) {
        // Get items from results array
        userCartItems = cartResponse.results;
      } else if (Array.isArray(cartResponse)) {
        // If response is already an array
        userCartItems = cartResponse;
      }
      
      console.log("User cart items:", userCartItems);
      
      setCartItems(userCartItems);
      
      // Use the count from API response
      if (cartResponse.count !== undefined) {
        setCartItemCount(cartResponse.count);
      } else {
        setCartItemCount(userCartItems.length);
      }
      
      // Calculate total quantity
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
    const userId = localStorage.getItem("user_id");
    
    if (!userId) {
      console.log("No user_id found, cannot fetch wishlist items");
      setWishlistItems([]);
      setWishlistCount(0);
      return;
    }

    setWishlistLoading(true);
    try {
      console.log("Fetching wishlist items for user:", userId);
      
      // Fetch wishlist items from API with user filter
      const response = await axios.get(`${baseurl}/wishlist/?user=${userId}`);
      console.log("Wishlist API Response:", response.data);
      
      // Handle paginated response - get items from results array
      const wishlistResponse = response.data;
      let userWishlistItems = [];
      
      if (wishlistResponse.results && Array.isArray(wishlistResponse.results)) {
        // Get items from results array
        userWishlistItems = wishlistResponse.results;
      } else if (Array.isArray(wishlistResponse)) {
        // If response is already an array
        userWishlistItems = wishlistResponse;
      }
      
      console.log("User wishlist items:", userWishlistItems);
      
      setWishlistItems(userWishlistItems);
      
      // Use the count from API response
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
    const userId = localStorage.getItem("user_id");
    if (userId) {
      console.log("Setting up cart polling for user:", userId);
      fetchCartItems();
      
      // Poll for cart updates every 5 seconds for real-time updates
      const cartIntervalId = setInterval(fetchCartItems, 5000);
      
      return () => clearInterval(cartIntervalId);
    } else {
      setCartItems([]);
      setCartItemCount(0);
      setCartTotalQuantity(0);
    }
  }, []);

  // Fetch wishlist items on component mount and set up polling
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      console.log("Setting up wishlist polling for user:", userId);
      fetchWishlistItems();
      
      // Poll for wishlist updates every 5 seconds for real-time updates
      const wishlistIntervalId = setInterval(fetchWishlistItems, 5000);
      
      return () => clearInterval(wishlistIntervalId);
    } else {
      setWishlistItems([]);
      setWishlistCount(0);
    }
  }, []);

  // Also fetch cart when component mounts
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Also fetch wishlist when component mounts
  useEffect(() => {
    fetchWishlistItems();
  }, []);

  // Listen for cart updates from other components
  useEffect(() => {
    const handleCartUpdate = () => {
      console.log("Cart update event received, refreshing cart...");
      fetchCartItems();
    };

    // Listen for custom event when cart is updated
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // Listen for wishlist updates from other components
  useEffect(() => {
    const handleWishlistUpdate = () => {
      console.log("Wishlist update event received, refreshing wishlist...");
      fetchWishlistItems();
    };

    // Listen for custom event when wishlist is updated
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    
    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
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

      console.log("Fetching notifications for user:", userId);
      
      const response = await axios.get(`${baseurl}/notifications/?user=${userId}&is_read=false`);
      console.log("Notifications API Response:", response.data);
      
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
      console.error("Error fetching notifications:", error);
      const unread = notifications.filter(notification => !notification.is_read);
      setUnreadCount(unread.length);
    }
  };

  // Fetch notifications on component mount and set up polling
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      console.log("Setting up notification polling for user:", userId);
      fetchNotifications();
      
      // Poll for new notifications every 30 seconds
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

  // Mark notification as read and navigate to property/product
  const handleNotificationItemClick = async (notification) => {
    try {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        console.error("No user_id found in localStorage");
        return;
      }
      
      console.log("Marking agent notification as read:", notification);
      
      // Mark as read API call
      await axios.post(`${baseurl}/notifications/mark-read/`, {
        user_id: parseInt(userId),
        notification_status_ids: [notification.notification_status_id]
      });
      
      console.log("Successfully marked agent notification as read");
      
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
      
      // Navigate based on notification type for agent
      if (notification.property !== null) {
        // Navigate to agent property details
        navigate(`/agent-properties-details/${notification.property.id}`);
      } else if (notification.product !== null) {
        // Navigate to agent product details with product_id and variant_id
        const productId = notification.product.product_id;
        const variantId = notification.product.variant_id;
        
        // Navigate to the correct URL for agent
        if (productId && variantId) {
          navigate(`/agent-business-product-details/${productId}/?variant=${variantId}`);
        } else if (productId) {
          navigate(`/agent-business-product-details/${productId}/`);
        } else if (variantId) {
          navigate(`/agent-product-details/${variantId}`);
        } else {
          fetchNotifications();
        }
      } else if (notification.meeting && notification.meeting.id) {
        navigate(`/p-meetings/${notification.meeting.id}`);
      } else {
        fetchNotifications();
      }
      
    } catch (error) {
      console.error("Error marking agent notification as read:", error);
      
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
      
      // Try navigation anyway even if API fails
      if (notification.property !== null) {
        navigate(`/agent-properties-details/${notification.property.id}`);
      } else if (notification.product !== null) {
        const productId = notification.product.product_id;
        const variantId = notification.product.variant_id;
        
        if (productId && variantId) {
          navigate(`/agent-business-product-details/${productId}/?variant=${variantId}`);
        } else if (productId) {
          navigate(`/agent-business-product-details/${productId}/`);
        } else if (variantId) {
          navigate(`/agent-product-details/${variantId}`);
        }
      } else if (notification.meeting && notification.meeting.id) {
        navigate(`/p-meetings/${notification.meeting.id}`);
      }
    }
  };

  // Format notification message (keeping exact same layout as image)
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
        </div>
      );
    }
  };

  const handleLogout = () => {
    console.log("Agent logged out");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("agentData");
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
    setCartItems([]);
    setCartItemCount(0);
    setCartTotalQuantity(0);
    setWishlistItems([]);
    setWishlistCount(0);
    navigate("/");
  };

  // Handle Refer Now button click
  const handleReferNowClick = (e) => {
    e.preventDefault();
    
    const referralId = userData.referral_id || "SRP000001";
    const baseUrl = window.location.origin;
    const referUrl = `${baseUrl}/register?referral_id=${referralId}`;
    
    navigator.clipboard.writeText(referUrl)
      .then(() => {
        setCopyStatus({ copied: true, showMessage: true });
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
        const textArea = document.createElement("textarea");
        textArea.value = referUrl;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          setCopyStatus({ copied: true, showMessage: true });
        } catch (err) {
          console.error("Fallback copy failed: ", err);
        }
        document.body.removeChild(textArea);
      });
  };

  // Handle wishlist click - UPDATED
  const handleWishlistClick = () => {
    navigate("/agent-wishlist");
  };

  // Handle cart click - UPDATED
  const handleCartClick = () => {
    navigate("/agent-add-to-cart");
  };

  // Define your navigation items - ADDED WISHLIST & CART TO SIDEBAR
  const menuItems = [
    { path: "/agent-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/agent-add-property", name: "Add Property", icon: <FaHome /> },
    { path: "/agent-my-properties", name: "My Properties", icon: <FaBuilding /> },
    { path: "/agent-properties", name: "Properties", icon: <FaClipboardList /> },
    { path: "/agent-my-products", name: "My Products", icon: <FaBriefcase /> },
    { path: "/agent-my-business", name: "My Business", icon: <FaUserTie /> },
    { path: "/agent-busineess-category", name: "Products", icon: <FaUserTie /> },
    { path: "/agent-add-product-form", name: "Add Product", icon: <FaUserTie /> },
    {
      name: "Operations",
      icon: <FaCogs />,
      subMenu: [
        { path: "/agent-payout", name: "Payout", icon: <FaMoneyBillWave /> },
        { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
        { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
        { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
        { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> },
        { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },
      ],
    },
    { path: "/p-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
    { path: "/agent-offers", name: "Offers", icon: <FaTag /> },
    { path: "/agent-orders", name: "Orders", icon: <FaTag /> },
    { path: "/agent-wishlist", name: "My Wishlist", icon: <FaHeart /> }, // ADDED
    { path: "/agent-add-to-cart", name: "My Cart", icon: <FaShoppingCart /> }, // ADDED
    { path: "/agent-profile", name: "Profile", icon: <FaUserCircle /> },
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
          {/* Copy Status Message */}
          {copyStatus.showMessage && (
            <div className="wn-copy-message">
              {copyStatus.copied ? (
                <>
                  <FaCheck style={{ marginRight: "5px", color: "#4CAF50" }} />
                  Referral link copied!
                </>
              ) : (
                "Copying..."
              )}
            </div>
          )}
          
          {/* Refer Now Button */}
          <button 
            className="wn-refer-now-btn"
            onClick={handleReferNowClick}
            title="Refer Now"
          >
            {copyStatus.copied ? (
              <FaCheck style={{ marginRight: "5px" }} />
            ) : (
              <FaUserPlus style={{ marginRight: "5px" }} />
            )}
            {copyStatus.copied ? "Copied!" : "Refer Now"}
          </button>
          
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
            
            {/* Notifications Dropdown - Keeping exact same layout as image */}
            {showNotifications && (
              <div className="wn-notifications-dropdown">
                <div className="wn-notifications-header">
                  <h4>Notifications</h4>
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
          
          {/* Wishlist Icon with Dynamic Count - UPDATED */}
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
          
          {/* Cart Icon with Dynamic Count */}
          <div 
            className="wn-cart" 
            onClick={handleCartClick}
            title={`Cart: ${cartItemCount} item${cartItemCount !== 1 ? 's' : ''} (${cartTotalQuantity} total)`}
            style={{ 
              opacity: cartLoading ? 0.7 : 1,
              cursor: cartLoading ? 'not-allowed' : 'pointer'
            }}
          >
            <FaShoppingCart size={16} />
            {cartItemCount > 0 && (
              <span className="wn-cart-badge">{cartItemCount > 99 ? '99+' : cartItemCount}</span>
            )}
          </div>
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
          <div className="wn-section-title">Agent Menu</div>
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

export default AgentNavbar;