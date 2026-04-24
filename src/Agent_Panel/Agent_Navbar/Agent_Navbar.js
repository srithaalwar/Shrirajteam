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
//       if (!userId) {
//         console.error("No user_id found in localStorage");
//         return;
//       }
      
//       console.log("Marking agent notification as read:", notification);
      
//       // Mark as read API call
//       await axios.post(`${baseurl}/notifications/mark-read/`, {
//         user_id: parseInt(userId),
//         notification_status_ids: [notification.notification_status_id]
//       });
      
//       console.log("Successfully marked agent notification as read");
      
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
      
//       // Navigate based on notification type for agent
//       if (notification.property !== null) {
//         // Navigate to agent property details
//         navigate(`/agent-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         // Navigate to agent product details with product_id and variant_id
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;
        
//         // Navigate to the correct URL for agent
//         if (productId && variantId) {
//           navigate(`/agent-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/agent-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/agent-product-details/${variantId}`);
//         } else {
//           fetchNotifications();
//         }
//       } else if (notification.meeting && notification.meeting.id) {
//         navigate(`/p-meetings/${notification.meeting.id}`);
//       } else {
//         fetchNotifications();
//       }
      
//     } catch (error) {
//       console.error("Error marking agent notification as read:", error);
      
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
//         navigate(`/agent-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;
        
//         if (productId && variantId) {
//           navigate(`/agent-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/agent-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/agent-product-details/${variantId}`);
//         }
//       } else if (notification.meeting && notification.meeting.id) {
//         navigate(`/p-meetings/${notification.meeting.id}`);
//       }
//     }
//   };

//   // Format notification message (keeping exact same layout as image)
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
//     navigate("/agent-wishlist");
//   };

//   // Handle cart click - UPDATED
//   const handleCartClick = () => {
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
//    { path: "/agent-add-variant-form", name: "Add Variant", icon: <FaUserTie /> },


//     {
//       name: "Operations",
//       icon: <FaCogs />,
//       subMenu: [
//         { path: "/agent-payout", name: "Payout", icon: <FaMoneyBillWave /> },
//         { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//         { path: "/agent-my-subscription-plans", name: "My Plans", icon: <FaCreditCard /> },
//         { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
//         { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//         { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> },
//         { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },
//       ],
//     },
//     { path: "/p-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/agent-offers", name: "Offers", icon: <FaTag /> },
//     { path: "/agent-my-orders", name: "My Orders", icon: <FaTag /> },
//         { path: "/agent-orders", name: "Orders", icon: <FaTag /> },

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
            
//             {/* Notifications Dropdown - Keeping exact same layout as image */}
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
//           <div className="wn-section-title">Team Menu</div>
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
// import Swal from "sweetalert2";

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
//   FaCheck,
//   FaPlusCircle
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
  
//   // Subscription state
//   const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
//   const [loadingSubscription, setLoadingSubscription] = useState(false);
  
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
  
//   const dropdownRef = useRef(null);
//   const notificationRef = useRef(null);
//   const loginUrl = "/login";
//   const signupUrl = "/register";
  
//   const navigate = useNavigate();

//   // Get current user ID from localStorage
//   const currentUserId = localStorage.getItem("user_id");

//   // Fetch user subscription status
//   const fetchUserSubscription = async () => {
//     if (!currentUserId) {
//       setHasActiveSubscription(false);
//       return;
//     }

//     try {
//       setLoadingSubscription(true);
//       const res = await fetch(`${baseurl}/user-subscriptions/user-id/${currentUserId}/`);
      
//       if (res.ok) {
//         const response = await res.json();
//         console.log("Subscription API Response:", response);
        
//         // Check if user has any active subscription based on latest_status
//         if (response && response.latest_status === "paid") {
//           setHasActiveSubscription(true);
//         } else {
//           setHasActiveSubscription(false);
//         }
//       } else {
//         console.error('Failed to fetch subscription:', res.status);
//         setHasActiveSubscription(false);
//       }
//     } catch (err) {
//       console.error('Error fetching user subscription:', err);
//       setHasActiveSubscription(false);
//     } finally {
//       setLoadingSubscription(false);
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
//         referred_by: localStorage.getItem("referred_by") || ""
//       };
//       setUserData(storedUserData);
//     };

//     fetchUserData();
    
//     // Fetch subscription status
//     fetchUserSubscription();
    
//     // Listen for storage changes
//     const handleStorageChange = () => {
//       fetchUserData();
//       fetchUserSubscription();
//     };
    
//     window.addEventListener('storage', handleStorageChange);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, [currentUserId]);

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
      
//       const response = await axios.get(`${baseurl}/cart/?user=${userId}`);
//       console.log("Cart API Response:", response.data);
      
//       const cartResponse = response.data;
//       let userCartItems = [];
      
//       if (cartResponse.results && Array.isArray(cartResponse.results)) {
//         userCartItems = cartResponse.results;
//       } else if (Array.isArray(cartResponse)) {
//         userCartItems = cartResponse;
//       }
      
//       console.log("User cart items:", userCartItems);
      
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
      
//       const response = await axios.get(`${baseurl}/wishlist/?user=${userId}`);
//       console.log("Wishlist API Response:", response.data);
      
//       const wishlistResponse = response.data;
//       let userWishlistItems = [];
      
//       if (wishlistResponse.results && Array.isArray(wishlistResponse.results)) {
//         userWishlistItems = wishlistResponse.results;
//       } else if (Array.isArray(wishlistResponse)) {
//         userWishlistItems = wishlistResponse;
//       }
      
//       console.log("User wishlist items:", userWishlistItems);
      
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
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       console.log("Setting up cart polling for user:", userId);
//       fetchCartItems();
      
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

//   // Handle Add Product click with subscription check
//   const handleAddProductClick = (e) => {
//     e.preventDefault();
    
//     // Check if user has active subscription
//     if (!hasActiveSubscription) {
//       Swal.fire({
//         title: 'Subscription Required',
//         html: '<div style="text-align: center;">You need an active subscription to add products.<br><br><strong>Please purchase a subscription plan to continue.</strong></div>',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#273c75',
//         cancelButtonColor: '#95a5a6',
//         confirmButtonText: 'View Plans',
//         cancelButtonText: 'Later',
//         reverseButtons: true,
//         customClass: {
//           confirmButton: 'btn btn-primary me-2',
//           cancelButton: 'btn btn-secondary'
//         }
//       }).then((result) => {
//         if (result.isConfirmed) {
//           // Navigate to subscription plans page
//           navigate('/agent-subscription-plan');
//         }
//       });
//       return;
//     }
    
//     // If user has active subscription, navigate to add product page
//     navigate('/agent-add-product-form');
//   };

//   // Handle Add Variant click with subscription check
//   const handleAddVariantClick = (e) => {
//     e.preventDefault();
    
//     // Check if user has active subscription
//     if (!hasActiveSubscription) {
//       Swal.fire({
//         title: 'Subscription Required',
//         html: '<div style="text-align: center;">You need an active subscription to add product variants.<br><br><strong>Please purchase a subscription plan to continue.</strong></div>',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#273c75',
//         cancelButtonColor: '#95a5a6',
//         confirmButtonText: 'View Plans',
//         cancelButtonText: 'Later',
//         reverseButtons: true,
//         customClass: {
//           confirmButton: 'btn btn-primary me-2',
//           cancelButton: 'btn btn-secondary'
//         }
//       }).then((result) => {
//         if (result.isConfirmed) {
//           // Navigate to subscription plans page
//           navigate('/agent-subscription-plan');
//         }
//       });
//       return;
//     }
    
//     // If user has active subscription, navigate to add variant page
//     navigate('/agent-add-variant-form');
//   };

//   // Mark notification as read and navigate to property/product
//   const handleNotificationItemClick = async (notification) => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) {
//         console.error("No user_id found in localStorage");
//         return;
//       }
      
//       console.log("Marking agent notification as read:", notification);
      
//       await axios.post(`${baseurl}/notifications/mark-read/`, {
//         user_id: parseInt(userId),
//         notification_status_ids: [notification.notification_status_id]
//       });
      
//       console.log("Successfully marked agent notification as read");
      
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
//         navigate(`/agent-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;
        
//         if (productId && variantId) {
//           navigate(`/agent-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/agent-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/agent-product-details/${variantId}`);
//         } else {
//           fetchNotifications();
//         }
//       } else if (notification.meeting && notification.meeting.id) {
//         navigate(`/p-meetings/${notification.meeting.id}`);
//       } else {
//         fetchNotifications();
//       }
      
//     } catch (error) {
//       console.error("Error marking agent notification as read:", error);
      
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
//         navigate(`/agent-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;
        
//         if (productId && variantId) {
//           navigate(`/agent-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/agent-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/agent-product-details/${variantId}`);
//         }
//       } else if (notification.meeting && notification.meeting.id) {
//         navigate(`/p-meetings/${notification.meeting.id}`);
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
//     setHasActiveSubscription(false);
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

//   // Handle wishlist click
//   const handleWishlistClick = () => {
//     navigate("/agent-wishlist");
//   };

//   // Handle cart click
//   const handleCartClick = () => {
//     navigate("/agent-add-to-cart");
//   };

//   // Define your navigation items
//   // const menuItems = [
//   //   { path: "/agent-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
//   //   { path: "/agent-add-property", name: "Add Property", icon: <FaHome /> },
//   //   { path: "/agent-my-properties", name: "My Properties", icon: <FaBuilding /> },
//   //   { path: "/agent-properties", name: "Properties", icon: <FaClipboardList /> },
//   //   { path: "/agent-my-products", name: "My Products", icon: <FaBriefcase /> },
//   //   { path: "/agent-my-business", name: "My Business", icon: <FaUserTie /> },
//   //   { path: "/agent-busineess-category", name: "Products", icon: <FaUserTie /> },
//   //   { 
//   //     path: "/agent-add-product-form", 
//   //     name: "Add Product", 
//   //     icon: <FaPlusCircle />,
//   //     onClick: handleAddProductClick,
//   //     requiresSubscription: true
//   //   },
//   //   { 
//   //     path: "/agent-add-variant-form", 
//   //     name: "Add Product Variant", 
//   //     icon: <FaPlusCircle />,
//   //     onClick: handleAddVariantClick,
//   //     requiresSubscription: true
//   //   },
//   //   {
//   //     name: "Operations",
//   //     icon: <FaCogs />,
//   //     subMenu: [
//   //       { path: "/agent-payout", name: "Payout", icon: <FaMoneyBillWave /> },
//   //       { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//   //       { path: "/agent-my-subscription-plans", name: "My Plans", icon: <FaCreditCard /> },
//   //       { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
//   //       { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//   //       { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> },
//   //       { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },
//   //     ],
//   //   },
//   //   { path: "/p-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//   //   { path: "/agent-offers", name: "Offers", icon: <FaTag /> },
//   //   { path: "/agent-my-orders", name: "My Orders", icon: <FaTag /> },
//   //   { path: "/agent-orders", name: "Orders", icon: <FaTag /> },
//   //   { path: "/agent-wishlist", name: "My Wishlist", icon: <FaHeart /> },
//   //   { path: "/agent-add-to-cart", name: "My Cart", icon: <FaShoppingCart /> },
//   //   { path: "/agent-profile", name: "Profile", icon: <FaUserCircle /> },
//   // ];


//   //===========

//   // Define your navigation items with better categorization
// const menuItems = [
//   { 
//     path: "/agent-dashboard", 
//     name: "Dashboard", 
//     icon: <FaTachometerAlt /> 
//   },
  
//   // Properties Main Category
//   {
//     name: "Properties",
//     icon: <FaBuilding />,
//     subMenu: [
//       { path: "/agent-add-property", name: "Add Property", icon: <FaPlusCircle /> },
//       { path: "/agent-my-properties", name: "My Properties", icon: <FaHome /> },
//       { path: "/agent-properties", name: "All Properties", icon: <FaClipboardList /> },
//       { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> }
//     ],
//   },
  
//   // Products Main Category
//   {
//     name: "Products",
//     icon: <FaBriefcase />,
//     subMenu: [
//       { 
//         path: "/agent-add-product-form", 
//         name: "Add Product", 
//         icon: <FaPlusCircle />,
//         onClick: handleAddProductClick,
//         requiresSubscription: true
//       },
//       { 
//         path: "/agent-add-variant-form", 
//         name: "Add Product Variant", 
//         icon: <FaPlusCircle />,
//         onClick: handleAddVariantClick,
//         requiresSubscription: true
//       },
//       { path: "/agent-my-products", name: "My Products", icon: <FaTag /> },
//       { path: "/agent-busineess-category", name: "All Products ", icon: <FaLayerGroup /> }
//     ],
//   },
  
//   // Orders Main Category
//   {
//     name: "Orders",
//     icon: <FaShoppingCart />,
//     subMenu: [
//       { path: "/agent-my-orders", name: "My Orders", icon: <FaClipboardList /> },
//       { path: "/agent-orders", name: "All Orders", icon: <FaDatabase /> },
//       { path: "/agent-add-to-cart", name: "Cart", icon: <FaShoppingCart /> },
//       { path: "/agent-wishlist", name: "Wishlist", icon: <FaHeart /> }
//     ],
//   },
  
//   // Operations Main Category (Your existing Operations menu)
//   {
//     name: "Operations",
//     icon: <FaCogs />,
//     subMenu: [
//       { path: "/agent-payout", name: "Payout", icon: <FaMoneyBillWave /> },
//       { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//       { path: "/agent-my-subscription-plans", name: "My Plans", icon: <FaCreditCard /> },
//       { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
//       { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//       { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },
//     ],
//   },
  
//   // Other standalone items
//   { path: "/agent-my-business", name: "My Business", icon: <FaUserTie /> },
//   { path: "/p-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//   { path: "/agent-offers", name: "Offers", icon: <FaTag /> },
//   { path: "/agent-profile", name: "Profile", icon: <FaUserCircle /> },
// ];

//   // Helper function to render menu item with click handler
//   const renderMenuItem = (item) => {
//     if (item.onClick) {
//       return (
//         <li key={item.name}>
//           <a 
//             href={item.path}
//             className="wn-sidebar-link"
//             onClick={(e) => {
//               e.preventDefault();
//               item.onClick(e);
//             }}
//           >
//             <span className="wn-sidebar-icon">{item.icon}</span>
//             <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
//             {!hasActiveSubscription && item.requiresSubscription && (
//               <span className="wn-subscription-badge" style={{ 
//                 marginLeft: "auto", 
//                 fontSize: "10px", 
//                 backgroundColor: "#ff6b6b", 
//                 color: "white", 
//                 padding: "2px 6px", 
//                 borderRadius: "10px" 
//               }}>
//                 Required
//               </span>
//             )}
//           </a>
//         </li>
//       );
//     }
    
//     return (
//       <li key={item.path || item.name}>
//         <Link 
//           to={item.path} 
//           className="wn-sidebar-link"
//           onClick={() => setOpen(false)}
//         >
//           <span className="wn-sidebar-icon">{item.icon}</span>
//           <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
//         </Link>
//       </li>
//     );
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
//           {/* Subscription Status Indicator (Optional) */}
//           {currentUserId && (
//             <div className="wn-subscription-status" style={{ 
//               marginRight: "10px",
//               fontSize: "12px",
//               padding: "4px 8px",
//               borderRadius: "4px",
//               backgroundColor: hasActiveSubscription ? "#d4edda" : "#f8d7da",
//               color: hasActiveSubscription ? "#155724" : "#721c24"
//             }}>
//               {hasActiveSubscription ? "Active " : "Inactive"}
//             </div>
//           )}
          
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
//           <div className="wn-section-title">Team Menu</div>
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
//                   renderMenuItem(item)
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
// import Swal from "sweetalert2";

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
//   FaCheck,
//   FaPlusCircle,
//     FaShareAlt,
// } from "react-icons/fa";
// import ShareModal from "../../ShareModal/ShareModal";

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
  
//   // Subscription state
//   const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
//   const [loadingSubscription, setLoadingSubscription] = useState(false);
  
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
  
//   const dropdownRef = useRef(null);
//   const notificationRef = useRef(null);
//   const loginUrl = "/login";
//   const signupUrl = "/register";
  
//   const navigate = useNavigate();

//   // Get current user ID from localStorage
//   const currentUserId = localStorage.getItem("user_id");

//   // Fetch user subscription status
//   const fetchUserSubscription = async () => {
//     if (!currentUserId) {
//       setHasActiveSubscription(false);
//       return;
//     }

//     try {
//       setLoadingSubscription(true);
//       const res = await fetch(`${baseurl}/user-subscriptions/user-id/${currentUserId}/`);
      
//       if (res.ok) {
//         const response = await res.json();
//         console.log("Subscription API Response:", response);
        
//         // Check if user has any active subscription based on latest_status
//         if (response && response.latest_status === "paid") {
//           setHasActiveSubscription(true);
//         } else {
//           setHasActiveSubscription(false);
//         }
//       } else {
//         console.error('Failed to fetch subscription:', res.status);
//         setHasActiveSubscription(false);
//       }
//     } catch (err) {
//       console.error('Error fetching user subscription:', err);
//       setHasActiveSubscription(false);
//     } finally {
//       setLoadingSubscription(false);
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
//         referred_by: localStorage.getItem("referred_by") || ""
//       };
//       setUserData(storedUserData);
//     };

//     fetchUserData();
    
//     // Fetch subscription status
//     fetchUserSubscription();
    
//     // Listen for storage changes
//     const handleStorageChange = () => {
//       fetchUserData();
//       fetchUserSubscription();
//     };
    
//     window.addEventListener('storage', handleStorageChange);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, [currentUserId]);

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
      
//       const response = await axios.get(`${baseurl}/cart/?user=${userId}`);
//       console.log("Cart API Response:", response.data);
      
//       const cartResponse = response.data;
//       let userCartItems = [];
      
//       if (cartResponse.results && Array.isArray(cartResponse.results)) {
//         userCartItems = cartResponse.results;
//       } else if (Array.isArray(cartResponse)) {
//         userCartItems = cartResponse;
//       }
      
//       console.log("User cart items:", userCartItems);
      
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
      
//       const response = await axios.get(`${baseurl}/wishlist/?user=${userId}`);
//       console.log("Wishlist API Response:", response.data);
      
//       const wishlistResponse = response.data;
//       let userWishlistItems = [];
      
//       if (wishlistResponse.results && Array.isArray(wishlistResponse.results)) {
//         userWishlistItems = wishlistResponse.results;
//       } else if (Array.isArray(wishlistResponse)) {
//         userWishlistItems = wishlistResponse;
//       }
      
//       console.log("User wishlist items:", userWishlistItems);
      
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
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       console.log("Setting up cart polling for user:", userId);
//       fetchCartItems();
      
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

//   // Handle Add Product click with subscription check
//   const handleAddProductClick = (e) => {
//     e.preventDefault();
    
//     // Check if user has active subscription
//     if (!hasActiveSubscription) {
//       Swal.fire({
//         title: 'Subscription Required',
//         html: '<div style="text-align: center;">You need an active subscription to add products.<br><br><strong>Please purchase a subscription plan to continue.</strong></div>',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#273c75',
//         cancelButtonColor: '#95a5a6',
//         confirmButtonText: 'View Plans',
//         cancelButtonText: 'Later',
//         reverseButtons: true,
//         customClass: {
//           confirmButton: 'btn btn-primary me-2',
//           cancelButton: 'btn btn-secondary'
//         }
//       }).then((result) => {
//         if (result.isConfirmed) {
//           // Navigate to subscription plans page
//           navigate('/agent-subscription-plan');
//         }
//       });
//       return;
//     }
    
//     // If user has active subscription, navigate to add product page
//     navigate('/agent-add-product-form');
//   };

//   // Handle Add Variant click with subscription check
//   const handleAddVariantClick = (e) => {
//     e.preventDefault();
    
//     // Check if user has active subscription
//     if (!hasActiveSubscription) {
//       Swal.fire({
//         title: 'Subscription Required',
//         html: '<div style="text-align: center;">You need an active subscription to add product variants.<br><br><strong>Please purchase a subscription plan to continue.</strong></div>',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#273c75',
//         cancelButtonColor: '#95a5a6',
//         confirmButtonText: 'View Plans',
//         cancelButtonText: 'Later',
//         reverseButtons: true,
//         customClass: {
//           confirmButton: 'btn btn-primary me-2',
//           cancelButton: 'btn btn-secondary'
//         }
//       }).then((result) => {
//         if (result.isConfirmed) {
//           // Navigate to subscription plans page
//           navigate('/agent-subscription-plan');
//         }
//       });
//       return;
//     }
    
//     // If user has active subscription, navigate to add variant page
//     navigate('/agent-add-variant-form');
//   };

//   // Mark notification as read and navigate to property/product
//   const handleNotificationItemClick = async (notification) => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) {
//         console.error("No user_id found in localStorage");
//         return;
//       }
      
//       console.log("Marking agent notification as read:", notification);
      
//       await axios.post(`${baseurl}/notifications/mark-read/`, {
//         user_id: parseInt(userId),
//         notification_status_ids: [notification.notification_status_id]
//       });
      
//       console.log("Successfully marked agent notification as read");
      
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
//         navigate(`/agent-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;
        
//         if (productId && variantId) {
//           navigate(`/agent-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/agent-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/agent-product-details/${variantId}`);
//         } else {
//           fetchNotifications();
//         }
//       } else if (notification.meeting && notification.meeting.id) {
//         navigate(`/p-meetings/${notification.meeting.id}`);
//       } else {
//         fetchNotifications();
//       }
      
//     } catch (error) {
//       console.error("Error marking agent notification as read:", error);
      
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
//         navigate(`/agent-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;
        
//         if (productId && variantId) {
//           navigate(`/agent-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/agent-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/agent-product-details/${variantId}`);
//         }
//       } else if (notification.meeting && notification.meeting.id) {
//         navigate(`/p-meetings/${notification.meeting.id}`);
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
//     setHasActiveSubscription(false);
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

//   // Handle wishlist click
//   const handleWishlistClick = () => {
//     navigate("/agent-wishlist");
//   };

//   // Handle cart click
//   const handleCartClick = () => {
//     navigate("/agent-add-to-cart");
//   };

//   // Define your navigation items with better categorization
// const menuItems = [
//   { 
//     path: "/agent-dashboard", 
//     name: "Dashboard", 
//     icon: <FaTachometerAlt /> 
//   },
  
//   // Properties Main Category
//   {
//     name: "Real Estate",
//     icon: <FaBuilding />,
//     subMenu: [
//       { path: "/agent-add-property", name: "Add Property", icon: <FaPlusCircle /> },
//       { path: "/agent-my-properties", name: "My Properties", icon: <FaHome /> },
//       { path: "/agent-properties", name: "All Properties", icon: <FaClipboardList /> },
//       { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> }
//     ],
//   },
  
//   // Products Main Category
//   {
//     name: "Products",
//     icon: <FaBriefcase />,
//     subMenu: [
//       { 
//         path: "/agent-add-product-form", 
//         name: "Add Product", 
//         icon: <FaPlusCircle />,
//         onClick: handleAddProductClick,
//         requiresSubscription: true
//       },
//       { 
//         path: "/agent-add-variant-form", 
//         name: "Add Product Variant", 
//         icon: <FaPlusCircle />,
//         onClick: handleAddVariantClick,
//         requiresSubscription: true
//       },
//       { path: "/agent-my-products", name: "My Products", icon: <FaTag /> },
//       { path: "/agent-busineess-category", name: "All Products ", icon: <FaLayerGroup /> }
//     ],
//   },
  
//   // Orders Main Category
//   {
//     name: "Orders",
//     icon: <FaShoppingCart />,
//     subMenu: [
//       { path: "/agent-my-orders", name: "My Orders", icon: <FaClipboardList /> },
//       { path: "/agent-orders", name: "All Orders", icon: <FaDatabase /> },
//       { path: "/agent-add-to-cart", name: "Cart", icon: <FaShoppingCart /> },
//       { path: "/agent-wishlist", name: "Wishlist", icon: <FaHeart /> }
//     ],
//   },
  
//   // Operations Main Category (Your existing Operations menu)
//   {
//     name: "Operations",
//     icon: <FaCogs />,
//     subMenu: [
//       // { path: "/agent-payout", name: "Payout", icon: <FaMoneyBillWave /> },
//       { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//       { path: "/agent-my-subscription-plans", name: "My Plans", icon: <FaCreditCard /> },
//       { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
//       { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//       { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },
//     ],
//   },
  
//   // Other standalone items
//   { path: "/agent-my-business", name: "My Business", icon: <FaUserTie /> },
//     { path: "/a-service-providers", name: "Service Providers", icon: <FaUserTie /> },

//   { path: "/p-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//   { path: "/agent-offers", name: "Offers", icon: <FaTag /> },
//   { path: "/agent-profile", name: "Profile", icon: <FaUserCircle /> },
// ];

//   // Helper function to render menu item with click handler
//   const renderMenuItem = (item) => {
//     if (item.onClick) {
//       return (
//         <li key={item.name}>
//           <a 
//             href={item.path}
//             className="wn-sidebar-link"
//             onClick={(e) => {
//               e.preventDefault();
//               item.onClick(e);
//             }}
//           >
//             <span className="wn-sidebar-icon">{item.icon}</span>
//             <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
//             {!hasActiveSubscription && item.requiresSubscription && (
//               <span className="wn-subscription-badge" style={{ 
//                 marginLeft: "auto", 
//                 fontSize: "10px", 
//                 backgroundColor: "#ff6b6b", 
//                 color: "white", 
//                 padding: "2px 6px", 
//                 borderRadius: "10px" 
//               }}>
//                 Required
//               </span>
//             )}
//           </a>
//         </li>
//       );
//     }
    
//     return (
//       <li key={item.path || item.name}>
//         <Link 
//           to={item.path} 
//           className="wn-sidebar-link"
//           onClick={() => setOpen(false)}
//         >
//           <span className="wn-sidebar-icon">{item.icon}</span>
//           <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
//         </Link>
//       </li>
//     );
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

//         {/* Subscription Status and Refer Button Section - NEW */}
//         <div className="wn-sidebar-status-section">
//           {/* Subscription Status */}
//           <div className="wn-sidebar-subscription-status">
//             <span className="wn-status-label">Subscription:</span>
//             <span className={`wn-status-value ${hasActiveSubscription ? 'active' : 'inactive'}`}>
//               {hasActiveSubscription ? 'Active' : 'Inactive'}
//             </span>
//           </div>

//         <ShareModal
//   mode="custom"
//   shareUrl={`${window.location.origin}/register?referral_id=${userData.referral_id || "SRP000001"}`}
//   productTitle="Join using my referral link!"
//   triggerAs="button"
//   triggerClassName="wn-sidebar-refer-btn"
//   triggerLabel={
//     <>
//       <FaShareAlt  style={{ marginRight: "8px" }} />
//       Refer Now
//     </>
//   }
// />
//         </div>

//         {/* Navigation Items */}
//         <div className="wn-nav-section">
//           <div className="wn-section-title">Team Menu</div>
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
//                   renderMenuItem(item)
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
// import Swal from "sweetalert2";
// import { useLocation } from "react-router-dom";

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
//   FaCheck,
//   FaPlusCircle,
//   FaShareAlt,
// } from "react-icons/fa";
// import ShareModal from "./ShareModal/ShareModal";

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
//     referred_by: "",
//     image: ""
//   });
//   const [copyStatus, setCopyStatus] = useState({ copied: false, showMessage: false });
  
//   // Subscription state
//   const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
//   const [loadingSubscription, setLoadingSubscription] = useState(false);
  
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
  
//   const dropdownRef = useRef(null);
//   const notificationRef = useRef(null);
//   const profileRef = useRef(null);
//   const loginUrl = "/login";
//   const signupUrl = "/register";
  
//   const navigate = useNavigate();
//   const location = useLocation();
// const showQuickActions = ["/agent-home", "/agent-dashboard", "/"].includes(location.pathname);

//   // Get current user ID from localStorage
//   const currentUserId = localStorage.getItem("user_id");

//   // Fetch user data from API to get the image
//   const fetchUserDataFromAPI = async () => {
//     if (!currentUserId) return;
    
//     try {
//       const response = await axios.get(`${baseurl}/users/${currentUserId}/`);
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

//   // Fetch user subscription status
//   const fetchUserSubscription = async () => {
//     if (!currentUserId) {
//       setHasActiveSubscription(false);
//       return;
//     }

//     try {
//       setLoadingSubscription(true);
//       const res = await fetch(`${baseurl}/user-subscriptions/user-id/${currentUserId}/`);
      
//       if (res.ok) {
//         const response = await res.json();
//         console.log("Subscription API Response:", response);
        
//         // Check if user has any active subscription based on latest_status
//         if (response && response.latest_status === "paid") {
//           setHasActiveSubscription(true);
//         } else {
//           setHasActiveSubscription(false);
//         }
//       } else {
//         console.error('Failed to fetch subscription:', res.status);
//         setHasActiveSubscription(false);
//       }
//     } catch (err) {
//       console.error('Error fetching user subscription:', err);
//       setHasActiveSubscription(false);
//     } finally {
//       setLoadingSubscription(false);
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
    
//     // Fetch subscription status
//     fetchUserSubscription();
    
//     // Listen for storage changes
//     const handleStorageChange = () => {
//       fetchUserData();
//       fetchUserSubscription();
//     };
    
//     window.addEventListener('storage', handleStorageChange);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, [currentUserId]);

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
      
//       const response = await axios.get(`${baseurl}/cart/?user=${userId}`);
//       console.log("Cart API Response:", response.data);
      
//       const cartResponse = response.data;
//       let userCartItems = [];
      
//       if (cartResponse.results && Array.isArray(cartResponse.results)) {
//         userCartItems = cartResponse.results;
//       } else if (Array.isArray(cartResponse)) {
//         userCartItems = cartResponse;
//       }
      
//       console.log("User cart items:", userCartItems);
      
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
      
//       const response = await axios.get(`${baseurl}/wishlist/?user=${userId}`);
//       console.log("Wishlist API Response:", response.data);
      
//       const wishlistResponse = response.data;
//       let userWishlistItems = [];
      
//       if (wishlistResponse.results && Array.isArray(wishlistResponse.results)) {
//         userWishlistItems = wishlistResponse.results;
//       } else if (Array.isArray(wishlistResponse)) {
//         userWishlistItems = wishlistResponse;
//       }
      
//       console.log("User wishlist items:", userWishlistItems);
      
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
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       console.log("Setting up cart polling for user:", userId);
//       fetchCartItems();
      
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

//   // Handle Add Product click with subscription check
//   const handleAddProductClick = (e) => {
//     e.preventDefault();
    
//     // Check if user has active subscription
//     if (!hasActiveSubscription) {
//       Swal.fire({
//         title: 'Subscription Required',
//         html: '<div style="text-align: center;">You need an active subscription to add products.<br><br><strong>Please purchase a subscription plan to continue.</strong></div>',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#273c75',
//         cancelButtonColor: '#95a5a6',
//         confirmButtonText: 'View Plans',
//         cancelButtonText: 'Later',
//         reverseButtons: true,
//         customClass: {
//           confirmButton: 'btn btn-primary me-2',
//           cancelButton: 'btn btn-secondary'
//         }
//       }).then((result) => {
//         if (result.isConfirmed) {
//           // Navigate to subscription plans page
//           navigate('/agent-subscription-plan');
//         }
//       });
//       return;
//     }
    
//     // If user has active subscription, navigate to add product page
//     navigate('/agent-add-product-form');
//   };

//   // Handle Add Variant click with subscription check
//   const handleAddVariantClick = (e) => {
//     e.preventDefault();
    
//     // Check if user has active subscription
//     if (!hasActiveSubscription) {
//       Swal.fire({
//         title: 'Subscription Required',
//         html: '<div style="text-align: center;">You need an active subscription to add product variants.<br><br><strong>Please purchase a subscription plan to continue.</strong></div>',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#273c75',
//         cancelButtonColor: '#95a5a6',
//         confirmButtonText: 'View Plans',
//         cancelButtonText: 'Later',
//         reverseButtons: true,
//         customClass: {
//           confirmButton: 'btn btn-primary me-2',
//           cancelButton: 'btn btn-secondary'
//         }
//       }).then((result) => {
//         if (result.isConfirmed) {
//           // Navigate to subscription plans page
//           navigate('/agent-subscription-plan');
//         }
//       });
//       return;
//     }
    
//     // If user has active subscription, navigate to add variant page
//     navigate('/agent-add-variant-form');
//   };

//   // Mark notification as read and navigate to property/product
//   const handleNotificationItemClick = async (notification) => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) {
//         console.error("No user_id found in localStorage");
//         return;
//       }
      
//       console.log("Marking agent notification as read:", notification);
      
//       await axios.post(`${baseurl}/notifications/mark-read/`, {
//         user_id: parseInt(userId),
//         notification_status_ids: [notification.notification_status_id]
//       });
      
//       console.log("Successfully marked agent notification as read");
      
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
//         navigate(`/agent-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;
        
//         if (productId && variantId) {
//           navigate(`/agent-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/agent-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/agent-product-details/${variantId}`);
//         } else {
//           fetchNotifications();
//         }
//       } else if (notification.meeting && notification.meeting.id) {
//         navigate(`/p-meetings/${notification.meeting.id}`);
//       } else {
//         fetchNotifications();
//       }
      
//     } catch (error) {
//       console.error("Error marking agent notification as read:", error);
      
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
//         navigate(`/agent-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;
        
//         if (productId && variantId) {
//           navigate(`/agent-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/agent-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/agent-product-details/${variantId}`);
//         }
//       } else if (notification.meeting && notification.meeting.id) {
//         navigate(`/p-meetings/${notification.meeting.id}`);
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
//     setHasActiveSubscription(false);
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

//   // Handle wishlist click
//   const handleWishlistClick = () => {
//     navigate("/agent-wishlist");
//   };

//   // Handle cart click
//   const handleCartClick = () => {
//     navigate("/agent-add-to-cart");
//   };

//   // Handle profile click
//   const handleProfileClick = () => {
//     navigate("/agent-profile");
//   };

//   // Define your navigation items with better categorization
// const menuItems = [
//    { 
//     path: "/agent-home", 
//     name: "Home", 
//     icon: <FaHome /> 
//   },
//   { 
//     path: "/agent-dashboard", 
//     name: "Dashboard", 
//     icon: <FaTachometerAlt /> 
//   },
  
//   // Properties Main Category
//   {
//     name: "Real Estate",
//     icon: <FaBuilding />,
//     subMenu: [
//       { path: "/agent-add-property", name: "Add Property", icon: <FaPlusCircle /> },
//       { path: "/agent-my-properties", name: "My Properties", icon: <FaHome /> },
//       { path: "/agent-properties", name: "All Properties", icon: <FaClipboardList /> },
//       { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> }
//     ],
//   },
  
//   // Products Main Category
//   {
//     name: "Business",
//     icon: <FaBriefcase />,
//     subMenu: [
//        { 
//         path: "/agent-my-business", 
//         name: "My Business", 
//         icon: <FaUserTie />,
      
//       },
//       { 
//         path: "/agent-add-product-form", 
//         name: "Add Product", 
//         icon: <FaPlusCircle />,
//         onClick: handleAddProductClick,
//         requiresSubscription: true
//       },
//       { 
//         path: "/agent-add-variant-form", 
//         name: "Add Product Variant", 
//         icon: <FaPlusCircle />,
//         onClick: handleAddVariantClick,
//         requiresSubscription: true
//       },
//       { path: "/agent-my-products", name: "My Products", icon: <FaTag /> },
//       { path: "/agent-busineess-category", name: "All Products ", icon: <FaLayerGroup /> }
//     ],
//   },
  
//   // Orders Main Category
//   {
//     name: "Orders",
//     icon: <FaShoppingCart />,
//     subMenu: [
//       { path: "/agent-my-orders", name: "My Orders", icon: <FaClipboardList /> },
//       { path: "/agent-orders", name: "All Orders", icon: <FaDatabase /> },
//       { path: "/agent-add-to-cart", name: "Cart", icon: <FaShoppingCart /> },
//       { path: "/agent-wishlist", name: "Wishlist", icon: <FaHeart /> }
//     ],
//   },
  
//   // Operations Main Category (Your existing Operations menu)
//   {
//     name: "Operations",
//     icon: <FaCogs />,
//     subMenu: [
//       // { path: "/agent-payout", name: "Payout", icon: <FaMoneyBillWave /> },
//       { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//       { path: "/agent-my-subscription-plans", name: "My Plans", icon: <FaCreditCard /> },
//       { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
//       { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//       { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },
//     ],
//   },
  
//   // Other standalone items
//   // { path: "/agent-my-business", name: "My Business", icon: <FaUserTie /> },
//     { path: "/a-service-providers", name: "Service Providers", icon: <FaUserTie /> },

//   { path: "/p-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//   { path: "/agent-offers", name: "Offers", icon: <FaTag /> },
//   { path: "/agent-profile", name: "Profile", icon: <FaUserCircle /> },
// ];

//   // Helper function to render menu item with click handler
//   const renderMenuItem = (item) => {
//     if (item.onClick) {
//       return (
//         <li key={item.name}>
//           <a 
//             href={item.path}
//             className="wn-sidebar-link"
//             onClick={(e) => {
//               e.preventDefault();
//               item.onClick(e);
//             }}
//           >
//             <span className="wn-sidebar-icon">{item.icon}</span>
//             <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
//             {!hasActiveSubscription && item.requiresSubscription && (
//               <span className="wn-subscription-badge" style={{ 
//                 marginLeft: "auto", 
//                 fontSize: "10px", 
//                 backgroundColor: "#ff6b6b", 
//                 color: "white", 
//                 padding: "2px 6px", 
//                 borderRadius: "10px" 
//               }}>
//                 Required
//               </span>
//             )}
//           </a>
//         </li>
//       );
//     }
    
//     return (
//       <li key={item.path || item.name}>
//         <Link 
//           to={item.path} 
//           className="wn-sidebar-link"
//           onClick={() => setOpen(false)}
//         >
//           <span className="wn-sidebar-icon">{item.icon}</span>
//           <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
//         </Link>
//       </li>
//     );
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
//           {/* ✅ Desktop Quick Action Buttons — hidden on mobile */}
//       <div className="wn-desktop-quick-actions">
//         <button
//           className="wn-quick-btn wn-quick-btn--property"
//           onClick={() => navigate("/agent-add-property")}
//         >
//           <FaHome size={13} />
//           Add Property
//         </button>
//         <button
//           className="wn-quick-btn wn-quick-btn--product"
//           onClick={handleAddProductClick}
//         >
//           <FaPlusCircle size={13} />
//           Add Product
//         </button>
//         <button
//           className="wn-quick-btn wn-quick-btn--business"
//           onClick={() => navigate("/agent-add-business-form")}
//         >
//           <FaBuilding size={13} />
//           Add Business
//         </button>
//       </div>


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
//       {/* ✅ Mobile Quick Actions Strip — shown below navbar on key pages */}
//    {/* ✅ Mobile Quick Action Buttons — three in one row */}
// {showQuickActions && (
//   <div className="wn-mobile-quick-actions">
//     <button
//       className="wn-mqa-btn wn-mqa-btn--property"
//       onClick={() => navigate("/agent-add-property")}
//     >
//       <span className="wn-mqa-text">
//         <strong>Add Property</strong>
//       </span>
//     </button>

//     <button
//       className="wn-mqa-btn wn-mqa-btn--product"
//       onClick={handleAddProductClick}
//     >
//       <span className="wn-mqa-text">
//         <strong>Add Product</strong>
//       </span>
//     </button>

//     <button
//       className="wn-mqa-btn wn-mqa-btn--business"
//       onClick={() => navigate("/agent-add-business-form")}
//     >
//       <span className="wn-mqa-text">
//         <strong>Add Business</strong>
//       </span>
//     </button>
//   </div>
// )}

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

//         {/* Subscription Status and Refer Button Section - NEW */}
//         <div className="wn-sidebar-status-section">
//           {/* Subscription Status */}
//           <div className="wn-sidebar-subscription-status">
//             <span className="wn-status-label">Subscription:</span>
//             <span className={`wn-status-value ${hasActiveSubscription ? 'active' : 'inactive'}`}>
//               {hasActiveSubscription ? 'Active' : 'Inactive'}
//             </span>
//           </div>

//         <ShareModal
//   mode="custom"
//   shareUrl={`${window.location.origin}/register?referral_id=${userData.referral_id || "SRP000001"}`}
//   productTitle="Join using my referral link!"
//   triggerAs="button"
//   triggerClassName="wn-sidebar-refer-btn"
//   triggerLabel={
//     <>
//       <FaShareAlt  style={{ marginRight: "8px" }} />
//       Refer Now
//     </>
//   }
// />
//         </div>

//         {/* Navigation Items */}
//         <div className="wn-nav-section">
//           <div className="wn-section-title">Team Menu</div>
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
//                   renderMenuItem(item)
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
// import Swal from "sweetalert2";
// import { useLocation } from "react-router-dom";

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
//   FaCheck,
//   FaPlusCircle,
//   FaShareAlt,
//   FaBars,
// } from "react-icons/fa";
// import ShareModal from "./ShareModal/ShareModal";

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
//     referred_by: "",
//     image: ""
//   });
//   const [copyStatus, setCopyStatus] = useState({ copied: false, showMessage: false });
  
//   // Header dropdown states
//   const [openRealEstateDropdown, setOpenRealEstateDropdown] = useState(false);
//   const [openBusinessDropdown, setOpenBusinessDropdown] = useState(false);
//   const [openOrdersDropdown, setOpenOrdersDropdown] = useState(false);
//   const [openOperationsDropdown, setOpenOperationsDropdown] = useState(false);
  
//   // Subscription state
//   const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
//   const [loadingSubscription, setLoadingSubscription] = useState(false);
  
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
  
//   const dropdownRef = useRef(null);
//   const notificationRef = useRef(null);
//   const profileRef = useRef(null);
//   const realEstateDropdownRef = useRef(null);
//   const businessDropdownRef = useRef(null);
//   const ordersDropdownRef = useRef(null);
//   const operationsDropdownRef = useRef(null);
  
//   const loginUrl = "/login";
//   const signupUrl = "/register";
  
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get current user ID from localStorage
//   const currentUserId = localStorage.getItem("user_id");

//   // Fetch user data from API to get the image
//   const fetchUserDataFromAPI = async () => {
//     if (!currentUserId) return;
    
//     try {
//       const response = await axios.get(`${baseurl}/users/${currentUserId}/`);
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

//   // Fetch user subscription status
//   const fetchUserSubscription = async () => {
//     if (!currentUserId) {
//       setHasActiveSubscription(false);
//       return;
//     }

//     try {
//       setLoadingSubscription(true);
//       const res = await fetch(`${baseurl}/user-subscriptions/user-id/${currentUserId}/`);
      
//       if (res.ok) {
//         const response = await res.json();
//         console.log("Subscription API Response:", response);
        
//         // Check if user has any active subscription based on latest_status
//         if (response && response.latest_status === "paid") {
//           setHasActiveSubscription(true);
//         } else {
//           setHasActiveSubscription(false);
//         }
//       } else {
//         console.error('Failed to fetch subscription:', res.status);
//         setHasActiveSubscription(false);
//       }
//     } catch (err) {
//       console.error('Error fetching user subscription:', err);
//       setHasActiveSubscription(false);
//     } finally {
//       setLoadingSubscription(false);
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
    
//     // Fetch subscription status
//     fetchUserSubscription();
    
//     // Listen for storage changes
//     const handleStorageChange = () => {
//       fetchUserData();
//       fetchUserSubscription();
//     };
    
//     window.addEventListener('storage', handleStorageChange);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, [currentUserId]);

//   // Hide copy message after 3 seconds
//   useEffect(() => {
//     if (copyStatus.showMessage) {
//       const timer = setTimeout(() => {
//         setCopyStatus({ copied: false, showMessage: false });
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [copyStatus.showMessage]);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (realEstateDropdownRef.current && !realEstateDropdownRef.current.contains(event.target)) {
//         setOpenRealEstateDropdown(false);
//       }
//       if (businessDropdownRef.current && !businessDropdownRef.current.contains(event.target)) {
//         setOpenBusinessDropdown(false);
//       }
//       if (ordersDropdownRef.current && !ordersDropdownRef.current.contains(event.target)) {
//         setOpenOrdersDropdown(false);
//       }
//       if (operationsDropdownRef.current && !operationsDropdownRef.current.contains(event.target)) {
//         setOpenOperationsDropdown(false);
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
      
//       const response = await axios.get(`${baseurl}/cart/?user=${userId}`);
//       console.log("Cart API Response:", response.data);
      
//       const cartResponse = response.data;
//       let userCartItems = [];
      
//       if (cartResponse.results && Array.isArray(cartResponse.results)) {
//         userCartItems = cartResponse.results;
//       } else if (Array.isArray(cartResponse)) {
//         userCartItems = cartResponse;
//       }
      
//       console.log("User cart items:", userCartItems);
      
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
      
//       const response = await axios.get(`${baseurl}/wishlist/?user=${userId}`);
//       console.log("Wishlist API Response:", response.data);
      
//       const wishlistResponse = response.data;
//       let userWishlistItems = [];
      
//       if (wishlistResponse.results && Array.isArray(wishlistResponse.results)) {
//         userWishlistItems = wishlistResponse.results;
//       } else if (Array.isArray(wishlistResponse)) {
//         userWishlistItems = wishlistResponse;
//       }
      
//       console.log("User wishlist items:", userWishlistItems);
      
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
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       console.log("Setting up cart polling for user:", userId);
//       fetchCartItems();
      
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
      
//       const intervalId = setInterval(fetchNotifications, 30000);
      
//       return () => clearInterval(intervalId);
//     }
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

//   // Handle Add Product click with subscription check
//   const handleAddProductClick = (e) => {
//     e.preventDefault();
    
//     // Check if user has active subscription
//     if (!hasActiveSubscription) {
//       Swal.fire({
//         title: 'Subscription Required',
//         html: '<div style="text-align: center;">You need an active subscription to add products.<br><br><strong>Please purchase a subscription plan to continue.</strong></div>',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#273c75',
//         cancelButtonColor: '#95a5a6',
//         confirmButtonText: 'View Plans',
//         cancelButtonText: 'Later',
//         reverseButtons: true,
//         customClass: {
//           confirmButton: 'btn btn-primary me-2',
//           cancelButton: 'btn btn-secondary'
//         }
//       }).then((result) => {
//         if (result.isConfirmed) {
//           // Navigate to subscription plans page
//           navigate('/agent-subscription-plan');
//         }
//       });
//       return;
//     }
    
//     // If user has active subscription, navigate to add product page
//     navigate('/agent-add-product-form');
//   };

//   // Handle Add Variant click with subscription check
//   const handleAddVariantClick = (e) => {
//     e.preventDefault();
    
//     // Check if user has active subscription
//     if (!hasActiveSubscription) {
//       Swal.fire({
//         title: 'Subscription Required',
//         html: '<div style="text-align: center;">You need an active subscription to add product variants.<br><br><strong>Please purchase a subscription plan to continue.</strong></div>',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#273c75',
//         cancelButtonColor: '#95a5a6',
//         confirmButtonText: 'View Plans',
//         cancelButtonText: 'Later',
//         reverseButtons: true,
//         customClass: {
//           confirmButton: 'btn btn-primary me-2',
//           cancelButton: 'btn btn-secondary'
//         }
//       }).then((result) => {
//         if (result.isConfirmed) {
//           // Navigate to subscription plans page
//           navigate('/agent-subscription-plan');
//         }
//       });
//       return;
//     }
    
//     // If user has active subscription, navigate to add variant page
//     navigate('/agent-add-variant-form');
//   };

//   // Mark notification as read and navigate to property/product
//   const handleNotificationItemClick = async (notification) => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) {
//         console.error("No user_id found in localStorage");
//         return;
//       }
      
//       console.log("Marking agent notification as read:", notification);
      
//       await axios.post(`${baseurl}/notifications/mark-read/`, {
//         user_id: parseInt(userId),
//         notification_status_ids: [notification.notification_status_id]
//       });
      
//       console.log("Successfully marked agent notification as read");
      
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
//         navigate(`/agent-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;
        
//         if (productId && variantId) {
//           navigate(`/agent-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/agent-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/agent-product-details/${variantId}`);
//         } else {
//           fetchNotifications();
//         }
//       } else if (notification.meeting && notification.meeting.id) {
//         navigate(`/p-meetings/${notification.meeting.id}`);
//       } else {
//         fetchNotifications();
//       }
      
//     } catch (error) {
//       console.error("Error marking agent notification as read:", error);
      
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
//         navigate(`/agent-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;
        
//         if (productId && variantId) {
//           navigate(`/agent-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/agent-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/agent-product-details/${variantId}`);
//         }
//       } else if (notification.meeting && notification.meeting.id) {
//         navigate(`/p-meetings/${notification.meeting.id}`);
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
//     setHasActiveSubscription(false);
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

//   // Handle wishlist click
//   const handleWishlistClick = () => {
//     navigate("/agent-wishlist");
//   };

//   // Handle cart click
//   const handleCartClick = () => {
//     navigate("/agent-add-to-cart");
//   };

//   // Handle profile click
//   const handleProfileClick = () => {
//     navigate("/agent-profile");
//   };

//   // Define dropdown menu items
//   const realEstateItems = [
//     { path: "/agent-add-property", name: "Add Property", icon: <FaPlusCircle /> },
//     { path: "/agent-my-properties", name: "My Properties", icon: <FaHome /> },
//     { path: "/agent-properties", name: "All Properties", icon: <FaClipboardList /> },
//     { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> }
//   ];

//   const businessItems = [
//     { path: "/agent-add-business-form", name: "Add Business", icon: <FaUserTie /> },
//     { 
//       path: "/agent-add-product-form", 
//       name: "Add Product", 
//       icon: <FaPlusCircle />,
//       onClick: handleAddProductClick,
//       requiresSubscription: true
//     },
//     { 
//       path: "/agent-add-variant-form", 
//       name: "Add Product Variant", 
//       icon: <FaPlusCircle />,
//       onClick: handleAddVariantClick,
//       requiresSubscription: true
//     },
//     { path: "/agent-busineess-category", name: "All Products", icon: <FaLayerGroup /> },
//     { path: "/agent-offers", name: "Offers", icon: <FaTag /> },


//   ];

//   const ordersItems = [
//     { path: "/agent-my-orders", name: "My Orders", icon: <FaClipboardList /> },
//     { path: "/agent-orders", name: "All Orders", icon: <FaDatabase /> },
//     { path: "/agent-add-to-cart", name: "Cart", icon: <FaShoppingCart /> },
//     { path: "/agent-wishlist", name: "Wishlist", icon: <FaHeart /> }
//   ];

//   const operationsItems = [
//     { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//     { path: "/agent-my-subscription-plans", name: "My Plans", icon: <FaCreditCard /> },
//     { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
//     { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//     { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },
//   ];

//   // Helper function to render dropdown item
//   const renderDropdownItem = (item, index) => {
//     if (item.onClick) {
//       return (
//         <a
//           key={index}
//           href={item.path}
//           className="wn-dropdown-link"
//           onClick={(e) => {
//             e.preventDefault();
//             item.onClick(e);
//             // Close dropdown after click
//             setOpenRealEstateDropdown(false);
//             setOpenBusinessDropdown(false);
//             setOpenOrdersDropdown(false);
//             setOpenOperationsDropdown(false);
//           }}
//         >
//           <span className="wn-dropdown-icon">{item.icon}</span>
//           <span className="wn-dropdown-text">{item.name}</span>
//           {!hasActiveSubscription && item.requiresSubscription && (
//             <span className="wn-dropdown-badge">Required</span>
//           )}
//         </a>
//       );
//     }
    
//     return (
//       <Link
//         key={index}
//         to={item.path}
//         className="wn-dropdown-link"
//         onClick={() => {
//           setOpenRealEstateDropdown(false);
//           setOpenBusinessDropdown(false);
//           setOpenOrdersDropdown(false);
//           setOpenOperationsDropdown(false);
//         }}
//       >
//         <span className="wn-dropdown-icon">{item.icon}</span>
//         <span className="wn-dropdown-text">{item.name}</span>
//       </Link>
//     );
//   };

//   // Define your navigation items for sidebar
//   const menuItems = [
//     { 
//       path: "/agent-home", 
//       name: "Home", 
//       icon: <FaHome /> 
//     },
//     { 
//       path: "/agent-dashboard", 
//       name: "Dashboard", 
//       icon: <FaTachometerAlt /> 
//     },
    
//     // Properties Main Category
//     {
//       name: "Real Estate",
//       icon: <FaBuilding />,
//       subMenu: [
//         { path: "/agent-add-property", name: "Add Property", icon: <FaPlusCircle /> },
//         { path: "/agent-my-properties", name: "My Properties", icon: <FaHome /> },
//         { path: "/agent-properties", name: "All Properties", icon: <FaClipboardList /> },
//         { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> }
//       ],
//     },
    
//     // Products Main Category
//     {
//       name: "Business",
//       icon: <FaBriefcase />,
//       subMenu: [
//         { 
//           path: "/agent-my-business", 
//           name: "My Business", 
//           icon: <FaUserTie />,
//         },
//         { 
//           path: "/agent-add-product-form", 
//           name: "Add Product", 
//           icon: <FaPlusCircle />,
//           onClick: handleAddProductClick,
//           requiresSubscription: true
//         },
//         { 
//           path: "/agent-add-variant-form", 
//           name: "Add Product Variant", 
//           icon: <FaPlusCircle />,
//           onClick: handleAddVariantClick,
//           requiresSubscription: true
//         },
//         // { path: "/agent-my-products", name: "My Products", icon: <FaTag /> },
//         { path: "/agent-busineess-category", name: "All Products ", icon: <FaLayerGroup /> }
//       ],
//     },
    
//     // Orders Main Category
//     {
//       name: "Orders",
//       icon: <FaShoppingCart />,
//       subMenu: [
//         { path: "/agent-my-orders", name: "My Orders", icon: <FaClipboardList /> },
//         { path: "/agent-orders", name: "All Orders", icon: <FaDatabase /> },
//         { path: "/agent-add-to-cart", name: "Cart", icon: <FaShoppingCart /> },
//         { path: "/agent-wishlist", name: "Wishlist", icon: <FaHeart /> }
//       ],
//     },
    
//     // Operations Main Category
//     {
//       name: "Operations",
//       icon: <FaCogs />,
//       subMenu: [
//         { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//         { path: "/agent-my-subscription-plans", name: "My Plans", icon: <FaCreditCard /> },
//         { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
//         { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//         { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },
//       ],
//     },
    
//     { path: "/a-service-providers", name: "Service Providers", icon: <FaUserTie /> },
//     { path: "/p-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/agent-offers", name: "Offers", icon: <FaTag /> },
//     { path: "/agent-profile", name: "Profile", icon: <FaUserCircle /> },
//   ];

//   // Helper function to render menu item
//   const renderMenuItem = (item) => {
//     if (item.onClick) {
//       return (
//         <li key={item.name}>
//           <a 
//             href={item.path}
//             className="wn-sidebar-link"
//             onClick={(e) => {
//               e.preventDefault();
//               item.onClick(e);
//             }}
//           >
//             <span className="wn-sidebar-icon">{item.icon}</span>
//             <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
//             {!hasActiveSubscription && item.requiresSubscription && (
//               <span className="wn-subscription-badge" style={{ 
//                 marginLeft: "auto", 
//                 fontSize: "10px", 
//                 backgroundColor: "#ff6b6b", 
//                 color: "white", 
//                 padding: "2px 6px", 
//                 borderRadius: "10px" 
//               }}>
//                 Required
//               </span>
//             )}
//           </a>
//         </li>
//       );
//     }
    
//     return (
//       <li key={item.path || item.name}>
//         <Link 
//           to={item.path} 
//           className="wn-sidebar-link"
//           onClick={() => setOpen(false)}
//         >
//           <span className="wn-sidebar-icon">{item.icon}</span>
//           <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
//         </Link>
//       </li>
//     );
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
        
//         {/* Header Dropdown Menus - Desktop */}
//         <div className="wn-header-dropdowns">
//           {/* Real Estate Dropdown */}
//           <div className="wn-header-dropdown" ref={realEstateDropdownRef}>
//             <button 
//               className="wn-header-dropdown-btn"
//               onClick={() => setOpenRealEstateDropdown(!openRealEstateDropdown)}
//             >
//               <FaBuilding className="wn-dropdown-btn-icon" />
//               <span>Real Estate</span>
//               <FaCaretDown className="wn-dropdown-arrow" />
//             </button>
//             {openRealEstateDropdown && (
//               <div className="wn-header-dropdown-menu">
//                 {realEstateItems.map((item, idx) => renderDropdownItem(item, idx))}
//               </div>
//             )}
//           </div>

//           {/* Business Dropdown */}
//           <div className="wn-header-dropdown" ref={businessDropdownRef}>
//             <button 
//               className="wn-header-dropdown-btn"
//               onClick={() => setOpenBusinessDropdown(!openBusinessDropdown)}
//             >
//               <FaBriefcase className="wn-dropdown-btn-icon" />
//               <span>Business</span>
//               <FaCaretDown className="wn-dropdown-arrow" />
//             </button>
//             {openBusinessDropdown && (
//               <div className="wn-header-dropdown-menu">
//                 {businessItems.map((item, idx) => renderDropdownItem(item, idx))}
//               </div>
//             )}
//           </div>

//           {/* Orders Dropdown */}
//           <div className="wn-header-dropdown" ref={ordersDropdownRef}>
//             <button 
//               className="wn-header-dropdown-btn"
//               onClick={() => setOpenOrdersDropdown(!openOrdersDropdown)}
//             >
//               <FaShoppingCart className="wn-dropdown-btn-icon" />
//               <span>Product</span>
//               <FaCaretDown className="wn-dropdown-arrow" />
//             </button>
//             {openOrdersDropdown && (
//               <div className="wn-header-dropdown-menu">
//                 {ordersItems.map((item, idx) => renderDropdownItem(item, idx))}
//               </div>
//             )}
//           </div>

//           {/* Operations Dropdown */}
//           {/* <div className="wn-header-dropdown" ref={operationsDropdownRef}>
//             <button 
//               className="wn-header-dropdown-btn"
//               onClick={() => setOpenOperationsDropdown(!openOperationsDropdown)}
//             >
//               <FaCogs className="wn-dropdown-btn-icon" />
//               <span>Operations</span>
//               <FaCaretDown className="wn-dropdown-arrow" />
//             </button>
//             {openOperationsDropdown && (
//               <div className="wn-header-dropdown-menu">
//                 {operationsItems.map((item, idx) => renderDropdownItem(item, idx))}
//               </div>
//             )}
//           </div> */}
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

//       {/* Mobile Quick Actions - Bottom Navigation Bar */}
//       <div className="wn-mobile-bottom-nav">
//         <div className="wn-mobile-nav-item" onClick={() => {
//           setOpenRealEstateDropdown(false);
//           setOpenBusinessDropdown(false);
//           setOpenOrdersDropdown(false);
//           setOpenOperationsDropdown(false);
//           // Open sidebar or show mobile menu
//           setOpen(true);
//         }}>
//           <FaBars size={20} />
//           <span>Menu</span>
//         </div>
        
//         <div className="wn-mobile-nav-item" onClick={() => {
//           setOpenRealEstateDropdown(!openRealEstateDropdown);
//           setOpenBusinessDropdown(false);
//           setOpenOrdersDropdown(false);
//           setOpenOperationsDropdown(false);
//         }}>
//           <FaBuilding size={20} />
//           <span>Real Estate</span>
//           {openRealEstateDropdown && (
//             <div className="wn-mobile-submenu">
//               {realEstateItems.map((item, idx) => (
//                 <Link key={idx} to={item.path} className="wn-mobile-submenu-link" onClick={() => setOpenRealEstateDropdown(false)}>
//                   <span className="wn-mobile-submenu-icon">{item.icon}</span>
//                   <span>{item.name}</span>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
        
//         <div className="wn-mobile-nav-item" onClick={() => {
//           setOpenBusinessDropdown(!openBusinessDropdown);
//           setOpenRealEstateDropdown(false);
//           setOpenOrdersDropdown(false);
//           setOpenOperationsDropdown(false);
//         }}>
//           <FaBriefcase size={20} />
//           <span>Business</span>
//           {openBusinessDropdown && (
//             <div className="wn-mobile-submenu">
//               {businessItems.map((item, idx) => {
//                 if (item.onClick) {
//                   return (
//                     <a key={idx} href={item.path} className="wn-mobile-submenu-link" onClick={(e) => {
//                       e.preventDefault();
//                       item.onClick(e);
//                       setOpenBusinessDropdown(false);
//                     }}>
//                       <span className="wn-mobile-submenu-icon">{item.icon}</span>
//                       <span>{item.name}</span>
//                       {!hasActiveSubscription && item.requiresSubscription && (
//                         <span className="wn-mobile-badge">Req</span>
//                       )}
//                     </a>
//                   );
//                 }
//                 return (
//                   <Link key={idx} to={item.path} className="wn-mobile-submenu-link" onClick={() => setOpenBusinessDropdown(false)}>
//                     <span className="wn-mobile-submenu-icon">{item.icon}</span>
//                     <span>{item.name}</span>
//                   </Link>
//                 );
//               })}
//             </div>
//           )}
//         </div>
        
//         <div className="wn-mobile-nav-item" onClick={() => {
//           setOpenOrdersDropdown(!openOrdersDropdown);
//           setOpenRealEstateDropdown(false);
//           setOpenBusinessDropdown(false);
//           setOpenOperationsDropdown(false);
//         }}>
//           <FaShoppingCart size={20} />
//           <span>Orders</span>
//           {cartItemCount > 0 && <span className="wn-mobile-badge-cart">{cartItemCount}</span>}
//           {openOrdersDropdown && (
//             <div className="wn-mobile-submenu">
//               {ordersItems.map((item, idx) => (
//                 <Link key={idx} to={item.path} className="wn-mobile-submenu-link" onClick={() => setOpenOrdersDropdown(false)}>
//                   <span className="wn-mobile-submenu-icon">{item.icon}</span>
//                   <span>{item.name}</span>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
        
//         <div className="wn-mobile-nav-item" onClick={() => {
//           setOpenOperationsDropdown(!openOperationsDropdown);
//           setOpenRealEstateDropdown(false);
//           setOpenBusinessDropdown(false);
//           setOpenOrdersDropdown(false);
//         }}>
//           <FaCogs size={20} />
//           <span>Operations</span>
//           {openOperationsDropdown && (
//             <div className="wn-mobile-submenu">
//               {operationsItems.map((item, idx) => (
//                 <Link key={idx} to={item.path} className="wn-mobile-submenu-link" onClick={() => setOpenOperationsDropdown(false)}>
//                   <span className="wn-mobile-submenu-icon">{item.icon}</span>
//                   <span>{item.name}</span>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

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

//         {/* Subscription Status and Refer Button Section - NEW */}
//         <div className="wn-sidebar-status-section">
//           {/* Subscription Status */}
//           <div className="wn-sidebar-subscription-status">
//             <span className="wn-status-label">Subscription:</span>
//             <span className={`wn-status-value ${hasActiveSubscription ? 'active' : 'inactive'}`}>
//               {hasActiveSubscription ? 'Active' : 'Inactive'}
//             </span>
//           </div>

//           <ShareModal
//             mode="custom"
//             shareUrl={`${window.location.origin}/register?referral_id=${userData.referral_id || "SRP000001"}`}
//             productTitle="Join using my referral link!"
//             triggerAs="button"
//             triggerClassName="wn-sidebar-refer-btn"
//             triggerLabel={
//               <>
//                 <FaShareAlt style={{ marginRight: "8px" }} />
//                 Refer Now
//               </>
//             }
//           />
//         </div>

//         {/* Navigation Items */}
//         <div className="wn-nav-section">
//           <div className="wn-section-title">Team Menu</div>
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
//                   renderMenuItem(item)
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



//================================================

// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Agent_Navbar.css";
// import logoImage from "../../Logos/logo1.png";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { baseurl } from "../../BaseURL/BaseURL";
// import Swal from "sweetalert2";
// import { useLocation } from "react-router-dom";
// import AgentSearchBar from './AgentSearchBar';
// import { FaSearch } from 'react-icons/fa';
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
//   FaCheck,
//   FaPlusCircle,
//   FaShareAlt,
//   FaBars,
// } from "react-icons/fa";
// import ShareModal from "./ShareModal/ShareModal";

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
//     referred_by: "",
//     image: ""
//   });
//   const [copyStatus, setCopyStatus] = useState({ copied: false, showMessage: false });
  
//   // Header dropdown states
//   const [openRealEstateDropdown, setOpenRealEstateDropdown] = useState(false);
//   const [openBusinessDropdown, setOpenBusinessDropdown] = useState(false);
//   const [openProductsDropdown, setOpenProductsDropdown] = useState(false);
//   const [openOperationsDropdown, setOpenOperationsDropdown] = useState(false);
  
//   // Subscription state
//   const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
//   const [loadingSubscription, setLoadingSubscription] = useState(false);
  
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
  
//   const dropdownRef = useRef(null);
//   const notificationRef = useRef(null);
//   const profileRef = useRef(null);
//   const realEstateDropdownRef = useRef(null);
//   const businessDropdownRef = useRef(null);
//   const productsDropdownRef = useRef(null);
//   const operationsDropdownRef = useRef(null);
  
//   const loginUrl = "/login";
//   const signupUrl = "/register";
  
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get current user ID from localStorage
//   const currentUserId = localStorage.getItem("user_id");

//   // Fetch user data from API to get the image
//   const fetchUserDataFromAPI = async () => {
//     if (!currentUserId) return;
    
//     try {
//       const response = await axios.get(`${baseurl}/users/${currentUserId}/`);
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

//   // Fetch user subscription status
//   const fetchUserSubscription = async () => {
//     if (!currentUserId) {
//       setHasActiveSubscription(false);
//       return;
//     }

//     try {
//       setLoadingSubscription(true);
//       const res = await fetch(`${baseurl}/user-subscriptions/user-id/${currentUserId}/`);
      
//       if (res.ok) {
//         const response = await res.json();
//         console.log("Subscription API Response:", response);
        
//         // Check if user has any active subscription based on latest_status
//         if (response && response.latest_status === "paid") {
//           setHasActiveSubscription(true);
//         } else {
//           setHasActiveSubscription(false);
//         }
//       } else {
//         console.error('Failed to fetch subscription:', res.status);
//         setHasActiveSubscription(false);
//       }
//     } catch (err) {
//       console.error('Error fetching user subscription:', err);
//       setHasActiveSubscription(false);
//     } finally {
//       setLoadingSubscription(false);
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
    
//     // Fetch subscription status
//     fetchUserSubscription();
    
//     // Listen for storage changes
//     const handleStorageChange = () => {
//       fetchUserData();
//       fetchUserSubscription();
//     };
    
//     window.addEventListener('storage', handleStorageChange);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, [currentUserId]);

//   // Hide copy message after 3 seconds
//   useEffect(() => {
//     if (copyStatus.showMessage) {
//       const timer = setTimeout(() => {
//         setCopyStatus({ copied: false, showMessage: false });
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [copyStatus.showMessage]);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (realEstateDropdownRef.current && !realEstateDropdownRef.current.contains(event.target)) {
//         setOpenRealEstateDropdown(false);
//       }
//       if (businessDropdownRef.current && !businessDropdownRef.current.contains(event.target)) {
//         setOpenBusinessDropdown(false);
//       }
//       if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target)) {
//         setOpenProductsDropdown(false);
//       }
//       if (operationsDropdownRef.current && !operationsDropdownRef.current.contains(event.target)) {
//         setOpenOperationsDropdown(false);
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
      
//       const response = await axios.get(`${baseurl}/cart/?user=${userId}`);
//       console.log("Cart API Response:", response.data);
      
//       const cartResponse = response.data;
//       let userCartItems = [];
      
//       if (cartResponse.results && Array.isArray(cartResponse.results)) {
//         userCartItems = cartResponse.results;
//       } else if (Array.isArray(cartResponse)) {
//         userCartItems = cartResponse;
//       }
      
//       console.log("User cart items:", userCartItems);
      
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
      
//       const response = await axios.get(`${baseurl}/wishlist/?user=${userId}`);
//       console.log("Wishlist API Response:", response.data);
      
//       const wishlistResponse = response.data;
//       let userWishlistItems = [];
      
//       if (wishlistResponse.results && Array.isArray(wishlistResponse.results)) {
//         userWishlistItems = wishlistResponse.results;
//       } else if (Array.isArray(wishlistResponse)) {
//         userWishlistItems = wishlistResponse;
//       }
      
//       console.log("User wishlist items:", userWishlistItems);
      
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
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       console.log("Setting up cart polling for user:", userId);
//       fetchCartItems();
      
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
      
//       const intervalId = setInterval(fetchNotifications, 30000);
      
//       return () => clearInterval(intervalId);
//     }
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

//   // Handle Add Product click with subscription check
//   const handleAddProductClick = (e) => {
//     e.preventDefault();
    
//     // Check if user has active subscription
//     if (!hasActiveSubscription) {
//       Swal.fire({
//         title: 'Subscription Required',
//         html: '<div style="text-align: center;">You need an active subscription to add products.<br><br><strong>Please purchase a subscription plan to continue.</strong></div>',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#273c75',
//         cancelButtonColor: '#95a5a6',
//         confirmButtonText: 'View Plans',
//         cancelButtonText: 'Later',
//         reverseButtons: true,
//         customClass: {
//           confirmButton: 'btn btn-primary me-2',
//           cancelButton: 'btn btn-secondary'
//         }
//       }).then((result) => {
//         if (result.isConfirmed) {
//           // Navigate to subscription plans page
//           navigate('/agent-subscription-plan');
//         }
//       });
//       return;
//     }
    
//     // If user has active subscription, navigate to add product page
//     navigate('/agent-add-product-form');
//   };

//   // Handle Add Variant click with subscription check
//   const handleAddVariantClick = (e) => {
//     e.preventDefault();
    
//     // Check if user has active subscription
//     if (!hasActiveSubscription) {
//       Swal.fire({
//         title: 'Subscription Required',
//         html: '<div style="text-align: center;">You need an active subscription to add product variants.<br><br><strong>Please purchase a subscription plan to continue.</strong></div>',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#273c75',
//         cancelButtonColor: '#95a5a6',
//         confirmButtonText: 'View Plans',
//         cancelButtonText: 'Later',
//         reverseButtons: true,
//         customClass: {
//           confirmButton: 'btn btn-primary me-2',
//           cancelButton: 'btn btn-secondary'
//         }
//       }).then((result) => {
//         if (result.isConfirmed) {
//           // Navigate to subscription plans page
//           navigate('/agent-subscription-plan');
//         }
//       });
//       return;
//     }
    
//     // If user has active subscription, navigate to add variant page
//     navigate('/agent-add-variant-form');
//   };

//   // Mark notification as read and navigate to property/product
//   const handleNotificationItemClick = async (notification) => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) {
//         console.error("No user_id found in localStorage");
//         return;
//       }
      
//       console.log("Marking agent notification as read:", notification);
      
//       await axios.post(`${baseurl}/notifications/mark-read/`, {
//         user_id: parseInt(userId),
//         notification_status_ids: [notification.notification_status_id]
//       });
      
//       console.log("Successfully marked agent notification as read");
      
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
//         navigate(`/agent-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;
        
//         if (productId && variantId) {
//           navigate(`/agent-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/agent-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/agent-product-details/${variantId}`);
//         } else {
//           fetchNotifications();
//         }
//       } else if (notification.meeting && notification.meeting.id) {
//         navigate(`/p-meetings/${notification.meeting.id}`);
//       } else {
//         fetchNotifications();
//       }
      
//     } catch (error) {
//       console.error("Error marking agent notification as read:", error);
      
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
//         navigate(`/agent-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;
        
//         if (productId && variantId) {
//           navigate(`/agent-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/agent-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/agent-product-details/${variantId}`);
//         }
//       } else if (notification.meeting && notification.meeting.id) {
//         navigate(`/p-meetings/${notification.meeting.id}`);
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
//     setHasActiveSubscription(false);
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

//   // Handle wishlist click
//   const handleWishlistClick = () => {
//     navigate("/agent-wishlist");
//   };

//   // Handle cart click
//   const handleCartClick = () => {
//     navigate("/agent-add-to-cart");
//   };

//   // Handle profile click
//   const handleProfileClick = () => {
//     navigate("/agent-profile");
//   };

//   // Define dropdown menu items
//   const realEstateItems = [
//     { path: "/agent-add-property", name: "Add Property", icon: <FaPlusCircle /> },
//     { path: "/agent-my-properties", name: "My Properties", icon: <FaHome /> },
//     { path: "/agent-properties", name: "All Properties", icon: <FaClipboardList /> },
//     { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> }
//   ];

//   const businessItems = [
//     { path: "/agent-my-business", name: "View Business", icon: <FaUserTie /> },
//     { path: "/agent-add-business-form", name: "Add Business", icon: <FaPlusCircle /> }
//   ];

//   const productsItems = [
//     { path: "/agent-offers", name: "Offers", icon: <FaTag /> },
//     { 
//       path: "/agent-add-product-form", 
//       name: "Add Product", 
//       icon: <FaPlusCircle />,
//       onClick: handleAddProductClick,
//       requiresSubscription: true
//     },
//     { 
//       path: "/agent-add-variant-form", 
//       name: "Add Product Variant", 
//       icon: <FaPlusCircle />,
//       onClick: handleAddVariantClick,
//       requiresSubscription: true
//     },
//     { path: "/agent-busineess-category", name: "All Products", icon: <FaLayerGroup /> }
//   ];

//   const operationsItems = [
//     { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//     { path: "/agent-my-subscription-plans", name: "My Plans", icon: <FaCreditCard /> },
//     { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
//     { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//     { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },
//   ];

//   // Helper function to render dropdown item
//   const renderDropdownItem = (item, index) => {
//     if (item.onClick) {
//       return (
//         <a
//           key={index}
//           href={item.path}
//           className="wn-dropdown-link"
//           onClick={(e) => {
//             e.preventDefault();
//             item.onClick(e);
//             // Close dropdown after click
//             setOpenRealEstateDropdown(false);
//             setOpenBusinessDropdown(false);
//             setOpenProductsDropdown(false);
//             setOpenOperationsDropdown(false);
//           }}
//         >
//           <span className="wn-dropdown-icon">{item.icon}</span>
//           <span className="wn-dropdown-text">{item.name}</span>
//           {!hasActiveSubscription && item.requiresSubscription && (
//             <span className="wn-dropdown-badge">Required</span>
//           )}
//         </a>
//       );
//     }
    
//     return (
//       <Link
//         key={index}
//         to={item.path}
//         className="wn-dropdown-link"
//         onClick={() => {
//           setOpenRealEstateDropdown(false);
//           setOpenBusinessDropdown(false);
//           setOpenProductsDropdown(false);
//           setOpenOperationsDropdown(false);
//         }}
//       >
//         <span className="wn-dropdown-icon">{item.icon}</span>
//         <span className="wn-dropdown-text">{item.name}</span>
//       </Link>
//     );
//   };

//   // Define your navigation items for sidebar
//   const menuItems = [
//     { 
//       path: "/agent-home", 
//       name: "Home", 
//       icon: <FaHome /> 
//     },
//     { 
//       path: "/agent-dashboard", 
//       name: "Dashboard", 
//       icon: <FaTachometerAlt /> 
//     },
    
//     // Properties Main Category
//     {
//       name: "Real Estate",
//       icon: <FaBuilding />,
//       subMenu: [
//         { path: "/agent-add-property", name: "Add Property", icon: <FaPlusCircle /> },
//         { path: "/agent-my-properties", name: "My Properties", icon: <FaHome /> },
//         { path: "/agent-properties", name: "All Properties", icon: <FaClipboardList /> },
//         { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> }
//       ],
//     },
    
//     // Business Main Category
//     {
//       name: "Business",
//       icon: <FaBriefcase />,
//       subMenu: [
//         { path: "/agent-my-business", name: "View Business", icon: <FaUserTie /> },
//         { path: "/agent-add-business-form", name: "Add Business", icon: <FaPlusCircle /> }
//       ],
//     },
    
//     // Products Main Category
//     {
//       name: "Products",
//       icon: <FaLayerGroup />,
//       subMenu: [
//         { path: "/agent-offers", name: "Offers", icon: <FaTag /> },
//         { 
//           path: "/agent-add-product-form", 
//           name: "Add Product", 
//           icon: <FaPlusCircle />,
//           onClick: handleAddProductClick,
//           requiresSubscription: true
//         },
//         { 
//           path: "/agent-add-variant-form", 
//           name: "Add Product Variant", 
//           icon: <FaPlusCircle />,
//           onClick: handleAddVariantClick,
//           requiresSubscription: true
//         },
//         { path: "/agent-busineess-category", name: "All Products", icon: <FaLayerGroup /> }
//       ],
//     },
    
//     // Operations Main Category
//     {
//       name: "Operations",
//       icon: <FaCogs />,
//       subMenu: [
//         { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//         { path: "/agent-my-subscription-plans", name: "My Plans", icon: <FaCreditCard /> },
//         { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
//         { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//         { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },
//       ],
//     },
//        { path: "/agent-my-orders", name: "My Orders", icon: <FaTag /> },
//         { path: "/agent-orders", name: "Orders", icon: <FaTag /> },
//     { path: "/a-service-providers", name: "Service Providers", icon: <FaUserTie /> },
//     { path: "/p-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/agent-profile", name: "Profile", icon: <FaUserCircle /> },
//   ];

//   // Helper function to render menu item
//   const renderMenuItem = (item) => {
//     if (item.onClick) {
//       return (
//         <li key={item.name}>
//           <a 
//             href={item.path}
//             className="wn-sidebar-link"
//             onClick={(e) => {
//               e.preventDefault();
//               item.onClick(e);
//             }}
//           >
//             <span className="wn-sidebar-icon">{item.icon}</span>
//             <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
//             {!hasActiveSubscription && item.requiresSubscription && (
//               <span className="wn-subscription-badge" style={{ 
//                 marginLeft: "auto", 
//                 fontSize: "10px", 
//                 backgroundColor: "#ff6b6b", 
//                 color: "white", 
//                 padding: "2px 6px", 
//                 borderRadius: "10px" 
//               }}>
//                 Required
//               </span>
//             )}
//           </a>
//         </li>
//       );
//     }
    
//     return (
//       <li key={item.path || item.name}>
//         <Link 
//           to={item.path} 
//           className="wn-sidebar-link"
//           onClick={() => setOpen(false)}
//         >
//           <span className="wn-sidebar-icon">{item.icon}</span>
//           <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
//         </Link>
//       </li>
//     );
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
//           <AgentSearchBar placeholder="Search products,  businesses..." />

        
//         {/* Header Dropdown Menus - Desktop */}
//         <div className="wn-header-dropdowns">
//           {/* Real Estate Dropdown */}
//           <div className="wn-header-dropdown" ref={realEstateDropdownRef}>
//             <button 
//               className="wn-header-dropdown-btn"
//               onClick={() => setOpenRealEstateDropdown(!openRealEstateDropdown)}
//             >
//               <FaBuilding className="wn-dropdown-btn-icon" />
//               <span>Real Estate</span>
//               <FaCaretDown className="wn-dropdown-arrow" />
//             </button>
//             {openRealEstateDropdown && (
//               <div className="wn-header-dropdown-menu">
//                 {realEstateItems.map((item, idx) => renderDropdownItem(item, idx))}
//               </div>
//             )}
//           </div>

//           {/* Business Dropdown */}
//           <div className="wn-header-dropdown" ref={businessDropdownRef}>
//             <button 
//               className="wn-header-dropdown-btn"
//               onClick={() => setOpenBusinessDropdown(!openBusinessDropdown)}
//             >
//               <FaBriefcase className="wn-dropdown-btn-icon" />
//               <span>Business</span>
//               <FaCaretDown className="wn-dropdown-arrow" />
//             </button>
//             {openBusinessDropdown && (
//               <div className="wn-header-dropdown-menu">
//                 {businessItems.map((item, idx) => renderDropdownItem(item, idx))}
//               </div>
//             )}
//           </div>

//           {/* Products Dropdown */}
//           <div className="wn-header-dropdown" ref={productsDropdownRef}>
//             <button 
//               className="wn-header-dropdown-btn"
//               onClick={() => setOpenProductsDropdown(!openProductsDropdown)}
//             >
//               <FaLayerGroup className="wn-dropdown-btn-icon" />
//               <span>Products</span>
//               <FaCaretDown className="wn-dropdown-arrow" />
//             </button>
//             {openProductsDropdown && (
//               <div className="wn-header-dropdown-menu">
//                 {productsItems.map((item, idx) => renderDropdownItem(item, idx))}
//               </div>
//             )}
//           </div>
          
//   {/* Orders Dropdown - NEW */}
//   <div className="wn-header-dropdown" ref={operationsDropdownRef}>
//     <button 
//       className="wn-header-dropdown-btn"
//       onClick={() => setOpenOperationsDropdown(!openOperationsDropdown)}
//     >
//       <FaTag className="wn-dropdown-btn-icon" />
//       <span>Orders</span>
//       <FaCaretDown className="wn-dropdown-arrow" />
//     </button>
//     {openOperationsDropdown && (
//       <div className="wn-header-dropdown-menu">
//         <Link
//           to="/agent-my-orders"
//           className="wn-dropdown-link"
//           onClick={() => setOpenOperationsDropdown(false)}
//         >
//           <span className="wn-dropdown-icon"><FaTag /></span>
//           <span className="wn-dropdown-text">My Orders</span>
//         </Link>
//         <Link
//           to="/agent-orders"
//           className="wn-dropdown-link"
//           onClick={() => setOpenOperationsDropdown(false)}
//         >
//           <span className="wn-dropdown-icon"><FaClipboardList /></span>
//           <span className="wn-dropdown-text">Orders</span>
//         </Link>
//       </div>
//     )}
//   </div>


//           {/* Operations Dropdown - Commented out */}
//           {/* <div className="wn-header-dropdown" ref={operationsDropdownRef}>
//             <button 
//               className="wn-header-dropdown-btn"
//               onClick={() => setOpenOperationsDropdown(!openOperationsDropdown)}
//             >
//               <FaCogs className="wn-dropdown-btn-icon" />
//               <span>Operations</span>
//               <FaCaretDown className="wn-dropdown-arrow" />
//             </button>
//             {openOperationsDropdown && (
//               <div className="wn-header-dropdown-menu">
//                 {operationsItems.map((item, idx) => renderDropdownItem(item, idx))}
//               </div>
//             )}
//           </div> */}
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

//           {/* Logout Button - Desktop */}
//           {/* <button 
//             className="wn-logout-btn-navbar"
//             onClick={handleLogout}
//             title="Logout"
//           >
//             <FaSignOutAlt size={16} />
//             <span className="wn-logout-text-navbar">Logout</span>
//           </button> */}
//         </div>
//       </header>

//       {/* Mobile Logout Button - Fixed at bottom of sidebar only (removed from navbar) */}
//       {/* The logout button in sidebar will serve as the mobile logout option */}

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

//         {/* Subscription Status and Refer Button Section */}
//         <div className="wn-sidebar-status-section">
//           {/* Subscription Status */}
//           <div className="wn-sidebar-subscription-status">
//             <span className="wn-status-label">Subscription:</span>
//             <span className={`wn-status-value ${hasActiveSubscription ? 'active' : 'inactive'}`}>
//               {hasActiveSubscription ? 'Active' : 'Inactive'}
//             </span>
//           </div>

//           <ShareModal
//             mode="custom"
//             shareUrl={`${window.location.origin}/register?referral_id=${userData.referral_id || "SRP000001"}`}
//             productTitle="Join using my referral link!"
//             triggerAs="button"
//             triggerClassName="wn-sidebar-refer-btn"
//             triggerLabel={
//               <>
//                 <FaShareAlt style={{ marginRight: "8px" }} />
//                 Refer Now
//               </>
//             }
//           />
//         </div>

//         {/* Navigation Items */}
//         <div className="wn-nav-section">
//           <div className="wn-section-title">Team Menu</div>
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
//                         {item.subMenu.map((subItem, subIndex) => {
//                           if (subItem.onClick) {
//                             return (
//                               <li key={`${subItem.name}-${subIndex}`}>
//                                 <a 
//                                   href={subItem.path}
//                                   className="wn-submenu-link"
//                                   onClick={(e) => {
//                                     e.preventDefault();
//                                     subItem.onClick(e);
//                                     setOpen(false);
//                                   }}
//                                 >
//                                   <span className="wn-submenu-icon">
//                                     {subItem.icon || <FaCogs />}
//                                   </span>
//                                   <span className="wn-submenu-text" style={{ marginLeft: "10px" }}>{subItem.name}</span>
//                                   {!hasActiveSubscription && subItem.requiresSubscription && (
//                                     <span className="wn-subscription-badge" style={{ 
//                                       marginLeft: "auto", 
//                                       fontSize: "10px", 
//                                       backgroundColor: "#ff6b6b", 
//                                       color: "white", 
//                                       padding: "2px 6px", 
//                                       borderRadius: "10px" 
//                                     }}>
//                                       Required
//                                     </span>
//                                   )}
//                                 </a>
//                               </li>
//                             );
//                           }
//                           return (
//                             <li key={`${subItem.name}-${subIndex}`}>
//                               <Link 
//                                 to={subItem.path} 
//                                 className="wn-submenu-link"
//                                 onClick={() => setOpen(false)}
//                               >
//                                 <span className="wn-submenu-icon">
//                                   {subItem.icon || <FaCogs />}
//                                 </span>
//                                 <span className="wn-submenu-text" style={{ marginLeft: "10px" }}>{subItem.name}</span>
//                               </Link>
//                             </li>
//                           );
//                         })}
//                       </ul>
//                     )}
//                   </li>
//                 ) : (
//                   // Regular menu item without submenu
//                   renderMenuItem(item)
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

// export default AgentNavbar;


//================================


// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Agent_Navbar.css";
// import logoImage from "../../Logos/logo1.png";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { baseurl } from "../../BaseURL/BaseURL";
// import Swal from "sweetalert2";
// import { useLocation } from "react-router-dom";
// import AgentSearchBar from './AgentSearchBar';
// import { FaSearch } from 'react-icons/fa';
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
//   FaCheck,
//   FaPlusCircle,
//   FaShareAlt,
//   FaBars,
// } from "react-icons/fa";
// import ShareModal from "./ShareModal/ShareModal";

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
//     referred_by: "",
//     image: ""
//   });
//   const [copyStatus, setCopyStatus] = useState({ copied: false, showMessage: false });
  
//   // Header dropdown states
//   const [openRealEstateDropdown, setOpenRealEstateDropdown] = useState(false);
//   const [openBusinessDropdown, setOpenBusinessDropdown] = useState(false);
//   const [openProductsDropdown, setOpenProductsDropdown] = useState(false);
//   const [openOperationsDropdown, setOpenOperationsDropdown] = useState(false);
  
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
  
//   const dropdownRef = useRef(null);
//   const notificationRef = useRef(null);
//   const profileRef = useRef(null);
//   const realEstateDropdownRef = useRef(null);
//   const businessDropdownRef = useRef(null);
//   const productsDropdownRef = useRef(null);
//   const operationsDropdownRef = useRef(null);
  
//   const loginUrl = "/login";
//   const signupUrl = "/register";
  
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get current user ID from localStorage
//   const currentUserId = localStorage.getItem("user_id");

//   // Fetch user data from API to get the image
//   const fetchUserDataFromAPI = async () => {
//     if (!currentUserId) return;
    
//     try {
//       const response = await axios.get(`${baseurl}/users/${currentUserId}/`);
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
//   }, [currentUserId]);

//   // Hide copy message after 3 seconds
//   useEffect(() => {
//     if (copyStatus.showMessage) {
//       const timer = setTimeout(() => {
//         setCopyStatus({ copied: false, showMessage: false });
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [copyStatus.showMessage]);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (realEstateDropdownRef.current && !realEstateDropdownRef.current.contains(event.target)) {
//         setOpenRealEstateDropdown(false);
//       }
//       if (businessDropdownRef.current && !businessDropdownRef.current.contains(event.target)) {
//         setOpenBusinessDropdown(false);
//       }
//       if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target)) {
//         setOpenProductsDropdown(false);
//       }
//       if (operationsDropdownRef.current && !operationsDropdownRef.current.contains(event.target)) {
//         setOpenOperationsDropdown(false);
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
      
//       const response = await axios.get(`${baseurl}/cart/?user=${userId}`);
//       console.log("Cart API Response:", response.data);
      
//       const cartResponse = response.data;
//       let userCartItems = [];
      
//       if (cartResponse.results && Array.isArray(cartResponse.results)) {
//         userCartItems = cartResponse.results;
//       } else if (Array.isArray(cartResponse)) {
//         userCartItems = cartResponse;
//       }
      
//       console.log("User cart items:", userCartItems);
      
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
      
//       const response = await axios.get(`${baseurl}/wishlist/?user=${userId}`);
//       console.log("Wishlist API Response:", response.data);
      
//       const wishlistResponse = response.data;
//       let userWishlistItems = [];
      
//       if (wishlistResponse.results && Array.isArray(wishlistResponse.results)) {
//         userWishlistItems = wishlistResponse.results;
//       } else if (Array.isArray(wishlistResponse)) {
//         userWishlistItems = wishlistResponse;
//       }
      
//       console.log("User wishlist items:", userWishlistItems);
      
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
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       console.log("Setting up cart polling for user:", userId);
//       fetchCartItems();
      
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
      
//       const intervalId = setInterval(fetchNotifications, 30000);
      
//       return () => clearInterval(intervalId);
//     }
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

//   // Handle Add Product click - No subscription check
//   const handleAddProductClick = (e) => {
//     e.preventDefault();
//     navigate('/agent-add-product-form');
//   };

//   // Handle Add Variant click - No subscription check
//   const handleAddVariantClick = (e) => {
//     e.preventDefault();
//     navigate('/agent-add-variant-form');
//   };

//   // Mark notification as read and navigate to property/product
//   const handleNotificationItemClick = async (notification) => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) {
//         console.error("No user_id found in localStorage");
//         return;
//       }
      
//       console.log("Marking agent notification as read:", notification);
      
//       await axios.post(`${baseurl}/notifications/mark-read/`, {
//         user_id: parseInt(userId),
//         notification_status_ids: [notification.notification_status_id]
//       });
      
//       console.log("Successfully marked agent notification as read");
      
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
//         navigate(`/agent-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;
        
//         if (productId && variantId) {
//           navigate(`/agent-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/agent-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/agent-product-details/${variantId}`);
//         } else {
//           fetchNotifications();
//         }
//       } else if (notification.meeting && notification.meeting.id) {
//         navigate(`/p-meetings/${notification.meeting.id}`);
//       } else {
//         fetchNotifications();
//       }
      
//     } catch (error) {
//       console.error("Error marking agent notification as read:", error);
      
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
//         navigate(`/agent-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;
        
//         if (productId && variantId) {
//           navigate(`/agent-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/agent-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/agent-product-details/${variantId}`);
//         }
//       } else if (notification.meeting && notification.meeting.id) {
//         navigate(`/p-meetings/${notification.meeting.id}`);
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

//   // Handle wishlist click
//   const handleWishlistClick = () => {
//     navigate("/agent-wishlist");
//   };

//   // Handle cart click
//   const handleCartClick = () => {
//     navigate("/agent-add-to-cart");
//   };

//   // Handle profile click
//   const handleProfileClick = () => {
//     navigate("/agent-profile");
//   };

//   // Define dropdown menu items - Removed requiresSubscription flag
//   const realEstateItems = [
//     { path: "/agent-add-property", name: "Add Property", icon: <FaPlusCircle /> },
//     { path: "/agent-my-properties", name: "My Properties", icon: <FaHome /> },
//     { path: "/agent-properties", name: "All Properties", icon: <FaClipboardList /> },
//     { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> }
//   ];

//   const businessItems = [
//     { path: "/agent-my-business", name: "View Business", icon: <FaUserTie /> },
//     { path: "/agent-add-business-form", name: "Add Business", icon: <FaPlusCircle /> }
//   ];

//   const productsItems = [
//     { path: "/agent-offers", name: "Offers", icon: <FaTag /> },
//     { 
//       path: "/agent-add-product-form", 
//       name: "Add Product", 
//       icon: <FaPlusCircle />,
//       onClick: handleAddProductClick
//     },
//     { 
//       path: "/agent-add-variant-form", 
//       name: "Add Product Variant", 
//       icon: <FaPlusCircle />,
//       onClick: handleAddVariantClick
//     },
//     { path: "/agent-busineess-category", name: "All Products", icon: <FaLayerGroup /> }
//   ];

//   const operationsItems = [
//     { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//     { path: "/agent-my-subscription-plans", name: "My Plans", icon: <FaCreditCard /> },
//     { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
//     { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//     { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },
//   ];

//   // Helper function to render dropdown item
//   const renderDropdownItem = (item, index) => {
//     if (item.onClick) {
//       return (
//         <a
//           key={index}
//           href={item.path}
//           className="wn-dropdown-link"
//           onClick={(e) => {
//             e.preventDefault();
//             item.onClick(e);
//             // Close dropdown after click
//             setOpenRealEstateDropdown(false);
//             setOpenBusinessDropdown(false);
//             setOpenProductsDropdown(false);
//             setOpenOperationsDropdown(false);
//           }}
//         >
//           <span className="wn-dropdown-icon">{item.icon}</span>
//           <span className="wn-dropdown-text">{item.name}</span>
//         </a>
//       );
//     }
    
//     return (
//       <Link
//         key={index}
//         to={item.path}
//         className="wn-dropdown-link"
//         onClick={() => {
//           setOpenRealEstateDropdown(false);
//           setOpenBusinessDropdown(false);
//           setOpenProductsDropdown(false);
//           setOpenOperationsDropdown(false);
//         }}
//       >
//         <span className="wn-dropdown-icon">{item.icon}</span>
//         <span className="wn-dropdown-text">{item.name}</span>
//       </Link>
//     );
//   };

//   // Define your navigation items for sidebar - Removed requiresSubscription flag
//   const menuItems = [
//     { 
//       path: "/agent-home", 
//       name: "Home", 
//       icon: <FaHome /> 
//     },
//     { 
//       path: "/agent-dashboard", 
//       name: "Dashboard", 
//       icon: <FaTachometerAlt /> 
//     },
    
//     // Properties Main Category
//     {
//       name: "Real Estate",
//       icon: <FaBuilding />,
//       subMenu: [
//         { path: "/agent-add-property", name: "Add Property", icon: <FaPlusCircle /> },
//         { path: "/agent-my-properties", name: "My Properties", icon: <FaHome /> },
//         { path: "/agent-properties", name: "All Properties", icon: <FaClipboardList /> },
//         { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> }
//       ],
//     },
    
//     // Business Main Category
//     {
//       name: "Business",
//       icon: <FaBriefcase />,
//       subMenu: [
//         { path: "/agent-my-business", name: "View Business", icon: <FaUserTie /> },
//         { path: "/agent-add-business-form", name: "Add Business", icon: <FaPlusCircle /> }
//       ],
//     },
    
//     // Products Main Category
//     {
//       name: "Products",
//       icon: <FaLayerGroup />,
//       subMenu: [
//         { path: "/agent-offers", name: "Offers", icon: <FaTag /> },
//         { 
//           path: "/agent-add-product-form", 
//           name: "Add Product", 
//           icon: <FaPlusCircle />,
//           onClick: handleAddProductClick
//         },
//         { 
//           path: "/agent-add-variant-form", 
//           name: "Add Product Variant", 
//           icon: <FaPlusCircle />,
//           onClick: handleAddVariantClick
//         },
//         { path: "/agent-busineess-category", name: "All Products", icon: <FaLayerGroup /> }
//       ],
//     },
    
//     // Operations Main Category
//     {
//       name: "Operations",
//       icon: <FaCogs />,
//       subMenu: [
//         { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//         { path: "/agent-my-subscription-plans", name: "My Plans", icon: <FaCreditCard /> },
//         { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
//         { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//         { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },
//       ],
//     },
//     { path: "/agent-my-orders", name: "My Orders", icon: <FaTag /> },
//     { path: "/agent-orders", name: "Orders", icon: <FaTag /> },
//     { path: "/a-service-providers", name: "Service Providers", icon: <FaUserTie /> },
//     { path: "/p-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/agent-profile", name: "Profile", icon: <FaUserCircle /> },
//   ];

//   // Helper function to render menu item
//   const renderMenuItem = (item) => {
//     if (item.onClick) {
//       return (
//         <li key={item.name}>
//           <a 
//             href={item.path}
//             className="wn-sidebar-link"
//             onClick={(e) => {
//               e.preventDefault();
//               item.onClick(e);
//             }}
//           >
//             <span className="wn-sidebar-icon">{item.icon}</span>
//             <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
//           </a>
//         </li>
//       );
//     }
    
//     return (
//       <li key={item.path || item.name}>
//         <Link 
//           to={item.path} 
//           className="wn-sidebar-link"
//           onClick={() => setOpen(false)}
//         >
//           <span className="wn-sidebar-icon">{item.icon}</span>
//           <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
//         </Link>
//       </li>
//     );
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

//   return (
//     <>
//       {/* NAVBAR */}
//       <header className="wn-navbar">
//         <div className="wn-nav-left">
//           <button className="wn-menu-btn" onClick={() => setOpen(true)}>☰</button>
//         <div className="wn-logo">
//   <img 
//     src={logoImage} 
//     alt="Shriraj Logo" 
//     className="wn-logo-img"
//     onClick={() => navigate('/agent-home')}
//     style={{ cursor: 'pointer' }}
//   />
// </div>

//         </div>
//           <AgentSearchBar placeholder="Search products..." />

        
//         {/* Header Dropdown Menus - Desktop */}
//         <div className="wn-header-dropdowns">
//           {/* Real Estate Dropdown */}
//           <div className="wn-header-dropdown" ref={realEstateDropdownRef}>
//             <button 
//               className="wn-header-dropdown-btn"
//               onClick={() => setOpenRealEstateDropdown(!openRealEstateDropdown)}
//             >
//               <FaBuilding className="wn-dropdown-btn-icon" />
//               <span>Real Estate</span>
//               <FaCaretDown className="wn-dropdown-arrow" />
//             </button>
//             {openRealEstateDropdown && (
//               <div className="wn-header-dropdown-menu">
//                 {realEstateItems.map((item, idx) => renderDropdownItem(item, idx))}
//               </div>
//             )}
//           </div>

//           {/* Business Dropdown */}
//           <div className="wn-header-dropdown" ref={businessDropdownRef}>
//             <button 
//               className="wn-header-dropdown-btn"
//               onClick={() => setOpenBusinessDropdown(!openBusinessDropdown)}
//             >
//               <FaBriefcase className="wn-dropdown-btn-icon" />
//               <span>Business</span>
//               <FaCaretDown className="wn-dropdown-arrow" />
//             </button>
//             {openBusinessDropdown && (
//               <div className="wn-header-dropdown-menu">
//                 {businessItems.map((item, idx) => renderDropdownItem(item, idx))}
//               </div>
//             )}
//           </div>

//           {/* Products Dropdown */}
//           <div className="wn-header-dropdown" ref={productsDropdownRef}>
//             <button 
//               className="wn-header-dropdown-btn"
//               onClick={() => setOpenProductsDropdown(!openProductsDropdown)}
//             >
//               <FaLayerGroup className="wn-dropdown-btn-icon" />
//               <span>Products</span>
//               <FaCaretDown className="wn-dropdown-arrow" />
//             </button>
//             {openProductsDropdown && (
//               <div className="wn-header-dropdown-menu">
//                 {productsItems.map((item, idx) => renderDropdownItem(item, idx))}
//               </div>
//             )}
//           </div>
          
//           {/* Orders Dropdown */}
//           <div className="wn-header-dropdown" ref={operationsDropdownRef}>
//             <button 
//               className="wn-header-dropdown-btn"
//               onClick={() => setOpenOperationsDropdown(!openOperationsDropdown)}
//             >
//               <FaTag className="wn-dropdown-btn-icon" />
//               <span>Orders</span>
//               <FaCaretDown className="wn-dropdown-arrow" />
//             </button>
//             {openOperationsDropdown && (
//               <div className="wn-header-dropdown-menu">
//                 <Link
//                   to="/agent-my-orders"
//                   className="wn-dropdown-link"
//                   onClick={() => setOpenOperationsDropdown(false)}
//                 >
//                   <span className="wn-dropdown-icon"><FaTag /></span>
//                   <span className="wn-dropdown-text">My Orders</span>
//                 </Link>
//                 <Link
//                   to="/agent-orders"
//                   className="wn-dropdown-link"
//                   onClick={() => setOpenOperationsDropdown(false)}
//                 >
//                   <span className="wn-dropdown-icon"><FaClipboardList /></span>
//                   <span className="wn-dropdown-text">Orders</span>
//                 </Link>
//               </div>
//             )}
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
//            <div className="wn-user-panel-indicator">
//     <div className="wn-panel-badge">
//       <FaUserTie className="wn-panel-icon" />
//       <span className="wn-panel-name">Team </span>
//     </div>
//     <div className="wn-user-role-info">
//       <span className="wn-user-name">
//         {userData.user_name || userData.username || "Team"}
//       </span>
//     </div>
//   </div>
          
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

//       {/* Mobile Logout Button - Fixed at bottom of sidebar only (removed from navbar) */}
//       {/* The logout button in sidebar will serve as the mobile logout option */}

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

//         {/* Refer Button Section */}
//         <div className="wn-sidebar-status-section">
//           <ShareModal
//             mode="custom"
//             shareUrl={`${window.location.origin}/register?referral_id=${userData.referral_id || "SRP000001"}`}
//             productTitle="Join using my referral link!"
//             triggerAs="button"
//             triggerClassName="wn-sidebar-refer-btn"
//             triggerLabel={
//               <>
//                 <FaShareAlt style={{ marginRight: "8px" }} />
//                 Refer Now
//               </>
//             }
//           />
//         </div>

//         {/* Navigation Items */}
//         <div className="wn-nav-section">
//           <div className="wn-section-title">Team Menu</div>
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
//                         {item.subMenu.map((subItem, subIndex) => {
//                           if (subItem.onClick) {
//                             return (
//                               <li key={`${subItem.name}-${subIndex}`}>
//                                 <a 
//                                   href={subItem.path}
//                                   className="wn-submenu-link"
//                                   onClick={(e) => {
//                                     e.preventDefault();
//                                     subItem.onClick(e);
//                                     setOpen(false);
//                                   }}
//                                 >
//                                   <span className="wn-submenu-icon">
//                                     {subItem.icon || <FaCogs />}
//                                   </span>
//                                   <span className="wn-submenu-text" style={{ marginLeft: "10px" }}>{subItem.name}</span>
//                                 </a>
//                               </li>
//                             );
//                           }
//                           return (
//                             <li key={`${subItem.name}-${subIndex}`}>
//                               <Link 
//                                 to={subItem.path} 
//                                 className="wn-submenu-link"
//                                 onClick={() => setOpen(false)}
//                               >
//                                 <span className="wn-submenu-icon">
//                                   {subItem.icon || <FaCogs />}
//                                 </span>
//                                 <span className="wn-submenu-text" style={{ marginLeft: "10px" }}>{subItem.name}</span>
//                               </Link>
//                             </li>
//                           );
//                         })}
//                       </ul>
//                     )}
//                   </li>
//                 ) : (
//                   // Regular menu item without submenu
//                   renderMenuItem(item)
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

// export default AgentNavbar;


//====================================



// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Agent_Navbar.css";
// import logoImage from "../../Logos/logo1.png";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { baseurl } from "../../BaseURL/BaseURL";
// import Swal from "sweetalert2";
// import { useLocation } from "react-router-dom";
// import AgentSearchBar from './AgentSearchBar';
// import { FaSearch } from 'react-icons/fa';
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
//   FaCheck,
//   FaPlusCircle,
//   FaShareAlt,
//   FaBars,
// } from "react-icons/fa";
// import ShareModal from "./ShareModal/ShareModal";

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
//     referred_by: "",
//     image: ""
//   });
//   const [copyStatus, setCopyStatus] = useState({ copied: false, showMessage: false });
//   const [showProfileTooltip, setShowProfileTooltip] = useState(false);
  
//   // Header dropdown states
//   const [openRealEstateDropdown, setOpenRealEstateDropdown] = useState(false);
//   const [openBusinessDropdown, setOpenBusinessDropdown] = useState(false);
//   const [openProductsDropdown, setOpenProductsDropdown] = useState(false);
//   const [openOperationsDropdown, setOpenOperationsDropdown] = useState(false);
  
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
  
//   const dropdownRef = useRef(null);
//   const notificationRef = useRef(null);
//   const profilePanelRef = useRef(null);
//   const realEstateDropdownRef = useRef(null);
//   const businessDropdownRef = useRef(null);
//   const productsDropdownRef = useRef(null);
//   const operationsDropdownRef = useRef(null);
  
//   const loginUrl = "/login";
//   const signupUrl = "/register";
  
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get current user ID from localStorage
//   const currentUserId = localStorage.getItem("user_id");

//   // Fetch user data from API to get the image
//   const fetchUserDataFromAPI = async () => {
//     if (!currentUserId) return;
    
//     try {
//       const response = await axios.get(`${baseurl}/users/${currentUserId}/`);
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
//   }, [currentUserId]);

//   // Hide copy message after 3 seconds
//   useEffect(() => {
//     if (copyStatus.showMessage) {
//       const timer = setTimeout(() => {
//         setCopyStatus({ copied: false, showMessage: false });
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [copyStatus.showMessage]);

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

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (realEstateDropdownRef.current && !realEstateDropdownRef.current.contains(event.target)) {
//         setOpenRealEstateDropdown(false);
//       }
//       if (businessDropdownRef.current && !businessDropdownRef.current.contains(event.target)) {
//         setOpenBusinessDropdown(false);
//       }
//       if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target)) {
//         setOpenProductsDropdown(false);
//       }
//       if (operationsDropdownRef.current && !operationsDropdownRef.current.contains(event.target)) {
//         setOpenOperationsDropdown(false);
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

//   /* ================= FETCH CART ITEMS ================= */
// //   const fetchCartItems = async () => {
// //     const userId = localStorage.getItem("user_id");
    
// //     if (!userId) {
// //       console.log("No user_id found, cannot fetch cart items");
// //       setCartItems([]);
// //       setCartItemCount(0);
// //       setCartTotalQuantity(0);
// //       return;
// //     }

// //     setCartLoading(true);
// //     try {
// //       console.log("Fetching cart items for user:", userId);
      
// //       const response = await axios.get(`${baseurl}/cart/?user=${userId}`);
// //       console.log("Cart API Response:", response.data);
      
// //       const cartResponse = response.data;
// //       let userCartItems = [];
      
// //       if (cartResponse.results && Array.isArray(cartResponse.results)) {
// //         userCartItems = cartResponse.results;
// //       } else if (Array.isArray(cartResponse)) {
// //         userCartItems = cartResponse;
// //       }
      
// //       console.log("User cart items:", userCartItems);
      
// //       setCartItems(userCartItems);
      
// //       if (cartResponse.count !== undefined) {
// //         setCartItemCount(cartResponse.count);
// //       } else {
// //         setCartItemCount(userCartItems.length);
// //       }
      
// //       const totalQuantity = userCartItems.reduce((total, item) => {
// //         return total + (item.quantity || 1);
// //       }, 0);
      
// //       setCartTotalQuantity(totalQuantity);
      
// //     } catch (error) {
// //       console.error("Error fetching cart items:", error);
// //       setCartItems([]);
// //       setCartItemCount(0);
// //       setCartTotalQuantity(0);
// //     } finally {
// //       setCartLoading(false);
// //     }
// //   };


// const fetchCartItems = async () => {
//   const userId = localStorage.getItem("user_id");
  
//   if (!userId) {
//     console.log("No user_id found, cannot fetch cart items");
//     setCartItems([]);
//     setCartItemCount(0);
//     setCartTotalQuantity(0);
//     return;
//   }

//   setCartLoading(true);
//   try {
//     console.log("Fetching cart items for user:", userId);
    
//     const response = await axios.get(`${baseurl}/cart/?user=${userId}`);
//     console.log("Cart API Response:", response.data);
    
//     const cartResponse = response.data;
//     let userCartItems = [];
    
//     if (cartResponse.results && Array.isArray(cartResponse.results)) {
//       userCartItems = cartResponse.results;
//     } else if (Array.isArray(cartResponse)) {
//       userCartItems = cartResponse;
//     }
    
//     console.log("User cart items:", userCartItems);
    
//     setCartItems(userCartItems);
    
//     // Set cart item count (number of unique products)
//     if (cartResponse.count !== undefined) {
//       setCartItemCount(cartResponse.count);
//     } else {
//       setCartItemCount(userCartItems.length);
//     }
    
//     // Calculate total quantity (sum of all quantities)
//     const totalQuantity = userCartItems.reduce((total, item) => {
//       return total + (item.quantity || 1);
//     }, 0);
    
//     setCartTotalQuantity(totalQuantity);
    
//   } catch (error) {
//     console.error("Error fetching cart items:", error);
//     setCartItems([]);
//     setCartItemCount(0);
//     setCartTotalQuantity(0);
//   } finally {
//     setCartLoading(false);
//   }
// };

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
      
//       const response = await axios.get(`${baseurl}/wishlist/?user=${userId}`);
//       console.log("Wishlist API Response:", response.data);
      
//       const wishlistResponse = response.data;
//       let userWishlistItems = [];
      
//       if (wishlistResponse.results && Array.isArray(wishlistResponse.results)) {
//         userWishlistItems = wishlistResponse.results;
//       } else if (Array.isArray(wishlistResponse)) {
//         userWishlistItems = wishlistResponse;
//       }
      
//       console.log("User wishlist items:", userWishlistItems);
      
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
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       console.log("Setting up cart polling for user:", userId);
//       fetchCartItems();
      
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
      
//       const intervalId = setInterval(fetchNotifications, 30000);
      
//       return () => clearInterval(intervalId);
//     }
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

//   // Handle Add Product click - No subscription check
//   const handleAddProductClick = (e) => {
//     e.preventDefault();
//     navigate('/agent-add-product-form');
//   };

//   // Handle Add Variant click - No subscription check
//   const handleAddVariantClick = (e) => {
//     e.preventDefault();
//     navigate('/agent-add-variant-form');
//   };

//   // Mark notification as read and navigate to property/product
//   const handleNotificationItemClick = async (notification) => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) {
//         console.error("No user_id found in localStorage");
//         return;
//       }
      
//       console.log("Marking agent notification as read:", notification);
      
//       await axios.post(`${baseurl}/notifications/mark-read/`, {
//         user_id: parseInt(userId),
//         notification_status_ids: [notification.notification_status_id]
//       });
      
//       console.log("Successfully marked agent notification as read");
      
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
//         navigate(`/agent-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;
        
//         if (productId && variantId) {
//           navigate(`/agent-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/agent-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/agent-product-details/${variantId}`);
//         } else {
//           fetchNotifications();
//         }
//       } else if (notification.meeting && notification.meeting.id) {
//         navigate(`/p-meetings/${notification.meeting.id}`);
//       } else {
//         fetchNotifications();
//       }
      
//     } catch (error) {
//       console.error("Error marking agent notification as read:", error);
      
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
//         navigate(`/agent-properties-details/${notification.property.id}`);
//       } else if (notification.product !== null) {
//         const productId = notification.product.product_id;
//         const variantId = notification.product.variant_id;
        
//         if (productId && variantId) {
//           navigate(`/agent-business-product-details/${productId}/?variant=${variantId}`);
//         } else if (productId) {
//           navigate(`/agent-business-product-details/${productId}/`);
//         } else if (variantId) {
//           navigate(`/agent-product-details/${variantId}`);
//         }
//       } else if (notification.meeting && notification.meeting.id) {
//         navigate(`/p-meetings/${notification.meeting.id}`);
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

//   // Handle wishlist click
//   const handleWishlistClick = () => {
//     navigate("/agent-wishlist");
//   };

//   // Handle cart click
//   const handleCartClick = () => {
//     navigate("/agent-add-to-cart");
//   };

//   // Handle profile click from the panel
//   const handleProfilePanelClick = () => {
//     navigate("/agent-profile");
//   };

//   // Handle profile panel hover
//   const handleProfilePanelMouseEnter = () => {
//     setShowProfileTooltip(true);
//   };

//   const handleProfilePanelMouseLeave = () => {
//     setShowProfileTooltip(false);
//   };

//   // Define dropdown menu items - Removed requiresSubscription flag
//   const realEstateItems = [
//     { path: "/agent-add-property", name: "Add Property", icon: <FaPlusCircle /> },
//     { path: "/agent-my-properties", name: "My Properties", icon: <FaHome /> },
//     { path: "/agent-properties", name: "All Properties", icon: <FaClipboardList /> },
//     { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> }
//   ];

//   const businessItems = [
//     { path: "/agent-my-business", name: "View Business", icon: <FaUserTie /> },
//     { path: "/agent-add-business-form", name: "Add Business", icon: <FaPlusCircle /> }
//   ];

//   const productsItems = [
//     { path: "/agent-offers", name: "Offers", icon: <FaTag /> },
//     { 
//       path: "/agent-add-product-form", 
//       name: "Add Product", 
//       icon: <FaPlusCircle />,
//       onClick: handleAddProductClick
//     },
//     { 
//       path: "/agent-add-variant-form", 
//       name: "Add Product Variant", 
//       icon: <FaPlusCircle />,
//       onClick: handleAddVariantClick
//     },
//     { path: "/agent-busineess-category", name: "All Products", icon: <FaLayerGroup /> }
//   ];

//   const operationsItems = [
//     { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//     { path: "/agent-my-subscription-plans", name: "My Plans", icon: <FaCreditCard /> },
//     { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
//     { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//     { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },

//   ];

//   // Helper function to render dropdown item
//   const renderDropdownItem = (item, index) => {
//     if (item.onClick) {
//       return (
//         <a
//           key={index}
//           href={item.path}
//           className="wn-dropdown-link"
//           onClick={(e) => {
//             e.preventDefault();
//             item.onClick(e);
//             // Close dropdown after click
//             setOpenRealEstateDropdown(false);
//             setOpenBusinessDropdown(false);
//             setOpenProductsDropdown(false);
//             setOpenOperationsDropdown(false);
//           }}
//         >
//           <span className="wn-dropdown-icon">{item.icon}</span>
//           <span className="wn-dropdown-text">{item.name}</span>
//         </a>
//       );
//     }
    
//     return (
//       <Link
//         key={index}
//         to={item.path}
//         className="wn-dropdown-link"
//         onClick={() => {
//           setOpenRealEstateDropdown(false);
//           setOpenBusinessDropdown(false);
//           setOpenProductsDropdown(false);
//           setOpenOperationsDropdown(false);
//         }}
//       >
//         <span className="wn-dropdown-icon">{item.icon}</span>
//         <span className="wn-dropdown-text">{item.name}</span>
//       </Link>
//     );
//   };

//   // Define your navigation items for sidebar - Removed requiresSubscription flag
//   const menuItems = [
//     { 
//       path: "/agent-home", 
//       name: "Home", 
//       icon: <FaHome /> 
//     },
//     { 
//       path: "/agent-dashboard", 
//       name: "Dashboard", 
//       icon: <FaTachometerAlt /> 
//     },
    
//     // Properties Main Category
//     {
//       name: "Real Estate",
//       icon: <FaBuilding />,
//       subMenu: [
//         { path: "/agent-add-property", name: "Add Property", icon: <FaPlusCircle /> },
//         { path: "/agent-my-properties", name: "My Properties", icon: <FaHome /> },
//         { path: "/agent-properties", name: "All Properties", icon: <FaClipboardList /> },
//         { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> }
//       ],
//     },
    
//     // Business Main Category
//     {
//       name: "Business",
//       icon: <FaBriefcase />,
//       subMenu: [
//         { path: "/agent-my-business", name: "View Business", icon: <FaUserTie /> },
//         { path: "/agent-add-business-form", name: "Add Business", icon: <FaPlusCircle /> }
//       ],
//     },
    
//     // Products Main Category
//     {
//       name: "Products",
//       icon: <FaLayerGroup />,
//       subMenu: [
//         { path: "/agent-offers", name: "Offers", icon: <FaTag /> },
//         { 
//           path: "/agent-add-product-form", 
//           name: "Add Product", 
//           icon: <FaPlusCircle />,
//           onClick: handleAddProductClick
//         },
//         { 
//           path: "/agent-add-variant-form", 
//           name: "Add Product Variant", 
//           icon: <FaPlusCircle />,
//           onClick: handleAddVariantClick
//         },
//         { path: "/agent-busineess-category", name: "All Products", icon: <FaLayerGroup /> }
//       ],
//     },
    
//     // Operations Main Category
//     {
//       name: "Operations",
//       icon: <FaCogs />,
//       subMenu: [
//         { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
//         { path: "/agent-my-subscription-plans", name: "My Plans", icon: <FaCreditCard /> },
//         { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
//         { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
//         { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },

//       ],
//     },
//     { path: "/agent-my-orders", name: "My Orders", icon: <FaTag /> },
//     { path: "/agent-orders", name: "Orders", icon: <FaTag /> },
//     { path: "/a-service-providers", name: "Service Providers", icon: <FaUserTie /> },
//     { path: "/p-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
//     { path: "/agent-profile", name: "Profile", icon: <FaUserCircle /> },
//   ];

//   // Helper function to render menu item
//   const renderMenuItem = (item) => {
//     if (item.onClick) {
//       return (
//         <li key={item.name}>
//           <a 
//             href={item.path}
//             className="wn-sidebar-link"
//             onClick={(e) => {
//               e.preventDefault();
//               item.onClick(e);
//             }}
//           >
//             <span className="wn-sidebar-icon">{item.icon}</span>
//             <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
//           </a>
//         </li>
//       );
//     }
    
//     return (
//       <li key={item.path || item.name}>
//         <Link 
//           to={item.path} 
//           className="wn-sidebar-link"
//           onClick={() => setOpen(false)}
//         >
//           <span className="wn-sidebar-icon">{item.icon}</span>
//           <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
//         </Link>
//       </li>
//     );
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

//   return (
//     <>
//       {/* NAVBAR */}
//       <header className="wn-navbar">
//         <div className="wn-nav-left">
//           <button className="wn-menu-btn" onClick={() => setOpen(true)}>☰</button>
//         <div className="wn-logo">
//   <img 
//     src={logoImage} 
//     alt="Shriraj Logo" 
//     className="wn-logo-img"
//     onClick={() => navigate('/agent-home')}
//     style={{ cursor: 'pointer' }}
//   />
// </div>

//         </div>
//           <AgentSearchBar placeholder="Search products..." />

        
//         {/* Header Dropdown Menus - Desktop */}
//         <div className="wn-header-dropdowns">
//           {/* Real Estate Dropdown */}
//           <div className="wn-header-dropdown" ref={realEstateDropdownRef}>
//             <button 
//               className="wn-header-dropdown-btn"
//               onClick={() => setOpenRealEstateDropdown(!openRealEstateDropdown)}
//             >
//               <FaBuilding className="wn-dropdown-btn-icon" />
//               <span>Real Estate</span>
//               <FaCaretDown className="wn-dropdown-arrow" />
//             </button>
//             {openRealEstateDropdown && (
//               <div className="wn-header-dropdown-menu">
//                 {realEstateItems.map((item, idx) => renderDropdownItem(item, idx))}
//               </div>
//             )}
//           </div>

//           {/* Business Dropdown */}
//           <div className="wn-header-dropdown" ref={businessDropdownRef}>
//             <button 
//               className="wn-header-dropdown-btn"
//               onClick={() => setOpenBusinessDropdown(!openBusinessDropdown)}
//             >
//               <FaBriefcase className="wn-dropdown-btn-icon" />
//               <span>Business</span>
//               <FaCaretDown className="wn-dropdown-arrow" />
//             </button>
//             {openBusinessDropdown && (
//               <div className="wn-header-dropdown-menu">
//                 {businessItems.map((item, idx) => renderDropdownItem(item, idx))}
//               </div>
//             )}
//           </div>

//           {/* Products Dropdown */}
//           <div className="wn-header-dropdown" ref={productsDropdownRef}>
//             <button 
//               className="wn-header-dropdown-btn"
//               onClick={() => setOpenProductsDropdown(!openProductsDropdown)}
//             >
//               <FaLayerGroup className="wn-dropdown-btn-icon" />
//               <span>Products</span>
//               <FaCaretDown className="wn-dropdown-arrow" />
//             </button>
//             {openProductsDropdown && (
//               <div className="wn-header-dropdown-menu">
//                 {productsItems.map((item, idx) => renderDropdownItem(item, idx))}
//               </div>
//             )}
//           </div>
          
//           {/* Orders Dropdown */}
//           <div className="wn-header-dropdown" ref={operationsDropdownRef}>
//             <button 
//               className="wn-header-dropdown-btn"
//               onClick={() => setOpenOperationsDropdown(!openOperationsDropdown)}
//             >
//               <FaTag className="wn-dropdown-btn-icon" />
//               <span>Orders</span>
//               <FaCaretDown className="wn-dropdown-arrow" />
//             </button>
//             {openOperationsDropdown && (
//               <div className="wn-header-dropdown-menu">
//                 <Link
//                   to="/agent-my-orders"
//                   className="wn-dropdown-link"
//                   onClick={() => setOpenOperationsDropdown(false)}
//                 >
//                   <span className="wn-dropdown-icon"><FaTag /></span>
//                   <span className="wn-dropdown-text">My Orders</span>
//                 </Link>
//                 <Link
//                   to="/agent-orders"
//                   className="wn-dropdown-link"
//                   onClick={() => setOpenOperationsDropdown(false)}
//                 >
//                   <span className="wn-dropdown-icon"><FaClipboardList /></span>
//                   <span className="wn-dropdown-text">Orders</span>
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="wn-nav-right">
//         {/* Copy Status Message */}
// {copyStatus.showMessage && (
//   <div className="wn-copy-message">
//     {copyStatus.copied ? (
//       <>
//         <FaCheck style={{ marginRight: "5px", color: "#4CAF50" }} />
//         Referral link copied!
//       </>
//     ) : (
//       "Copying..."
//     )}
//   </div>
// )}



// {/* Wishlist Icon with Dynamic Count */}
// <div 
//   className="wn-wishlist" 
//   onClick={handleWishlistClick}
//   title={`Wishlist: ${wishlistCount} item${wishlistCount !== 1 ? 's' : ''}`}
//   style={{ 
//     opacity: wishlistLoading ? 0.7 : 1,
//     cursor: wishlistLoading ? 'not-allowed' : 'pointer'
//   }}
// >
//   <FaHeart size={16} />
//   {wishlistCount > 0 && (
//     <span className="wn-wishlist-badge">{wishlistCount > 99 ? '99+' : wishlistCount}</span>
//   )}
// </div>

// {/* Cart Icon with Dynamic Count - FIXED: Now shows total quantity instead of item count */}
// <div 
//   className="wn-cart" 
//   onClick={handleCartClick}
//   title={`Cart: ${cartTotalQuantity} item${cartTotalQuantity !== 1 ? 's' : ''} total`}
//   style={{ 
//     opacity: cartLoading ? 0.7 : 1,
//     cursor: cartLoading ? 'not-allowed' : 'pointer'
//   }}
// >
//   <FaShoppingCart size={16} />
//   {cartTotalQuantity > 0 && (
//     <span className="wn-cart-badge">{cartTotalQuantity > 99 ? '99+' : cartTotalQuantity}</span>
//   )}
// </div>

// {/* Notification Icon with Dropdown */}
// <div 
//   ref={notificationRef}
//   className="wn-notification-container"
// >
//   <div 
//     className="wn-notification-icon" 
//     onClick={handleNotificationClick}
//     title="Notifications"
//   >
//     <FaBell size={16} />
//     {unreadCount > 0 && (
//       <span className="wn-notification-badge">{unreadCount}</span>
//     )}
//   </div>
  
//   {/* Notifications Dropdown */}
//   {showNotifications && (
//     <div className="wn-notifications-dropdown">
//       <div className="wn-notifications-header">
//         <h4>Notifications</h4>
//       </div>
      
//       <div className="wn-notifications-list">
//         {notifications.length > 0 ? (
//           notifications.map((notification) => (
//             <div 
//               key={notification.notification_status_id}
//               className={`wn-notification-item ${!notification.is_read ? 'wn-unread' : ''}`}
//               onClick={() => handleNotificationItemClick(notification)}
//             >
//               <div className="wn-notification-content">
//                 {formatNotificationMessage(notification)}
//                 <small className="wn-notification-time">
//                   {new Date(notification.created_at).toLocaleDateString('en-US', {
//                     month: 'short',
//                     day: 'numeric',
//                     hour: '2-digit',
//                     minute: '2-digit'
//                   })}
//                 </small>
//               </div>
//               {!notification.is_read && (
//                 <div className="wn-unread-dot"></div>
//               )}
//             </div>
//           ))
//         ) : (
//           <div className="wn-no-notifications">
//             No notifications yet
//           </div>
//         )}
//       </div>
//     </div>
//   )}
// </div>

// {/* User Panel Indicator */}
// <div 
//   className="wn-user-panel-indicator"
//   ref={profilePanelRef}
//   onClick={handleProfilePanelClick}
//   onMouseEnter={handleProfilePanelMouseEnter}
//   onMouseLeave={handleProfilePanelMouseLeave}
//   style={{ cursor: 'pointer', position: 'relative' }}
// >
//   <div className="wn-panel-badge">
//     <FaUserTie className="wn-panel-icon" />
//     <span className="wn-panel-name">Team</span>
//   </div>
//   <div className="wn-user-role-info">
//     <span className="wn-user-name">
//       {userData.full_name || userData.username || "Team"}
//     </span>
//   </div>
  
//   {/* Tooltip on hover */}
//   {showProfileTooltip && (
//     <div className="wn-profile-tooltip">
//       <div className="wn-tooltip-content">
//         <div className="wn-tooltip-arrow"></div>
//         <div className="wn-tooltip-text">
//           <FaUserCircle size={14} style={{ marginRight: '8px' }} />
//           Click here to view profile details
//         </div>
//       </div>
//     </div>
//   )}
// </div>
//         </div>
//       </header>

//       {/* Mobile Logout Button - Fixed at bottom of sidebar only (removed from navbar) */}
//       {/* The logout button in sidebar will serve as the mobile logout option */}

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

//         {/* Refer Button Section */}
//         <div className="wn-sidebar-status-section">
//           <ShareModal
//             mode="custom"
//             shareUrl={`${window.location.origin}/register?referral_id=${userData.referral_id || "SRP000001"}`}
//             productTitle="Join using my referral link!"
//             triggerAs="button"
//             triggerClassName="wn-sidebar-refer-btn"
//             triggerLabel={
//               <>
//                 <FaShareAlt style={{ marginRight: "8px" }} />
//                 Refer Now
//               </>
//             }
//           />
//         </div>

//         {/* Navigation Items */}
//         <div className="wn-nav-section">
//           <div className="wn-section-title">Team Menu</div>
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
//                         {item.subMenu.map((subItem, subIndex) => {
//                           if (subItem.onClick) {
//                             return (
//                               <li key={`${subItem.name}-${subIndex}`}>
//                                 <a 
//                                   href={subItem.path}
//                                   className="wn-submenu-link"
//                                   onClick={(e) => {
//                                     e.preventDefault();
//                                     subItem.onClick(e);
//                                     setOpen(false);
//                                   }}
//                                 >
//                                   <span className="wn-submenu-icon">
//                                     {subItem.icon || <FaCogs />}
//                                   </span>
//                                   <span className="wn-submenu-text" style={{ marginLeft: "10px" }}>{subItem.name}</span>
//                                 </a>
//                               </li>
//                             );
//                           }
//                           return (
//                             <li key={`${subItem.name}-${subIndex}`}>
//                               <Link 
//                                 to={subItem.path} 
//                                 className="wn-submenu-link"
//                                 onClick={() => setOpen(false)}
//                               >
//                                 <span className="wn-submenu-icon">
//                                   {subItem.icon || <FaCogs />}
//                                 </span>
//                                 <span className="wn-submenu-text" style={{ marginLeft: "10px" }}>{subItem.name}</span>
//                               </Link>
//                             </li>
//                           );
//                         })}
//                       </ul>
//                     )}
//                   </li>
//                 ) : (
//                   // Regular menu item without submenu
//                   renderMenuItem(item)
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

// export default AgentNavbar;

//==================================================

// Changes done on Date 17-04-2026


import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Agent_Navbar.css";
import logoImage from "../../Logos/logo1.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../../BaseURL/BaseURL";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import AgentSearchBar from './AgentSearchBar';
import { FaSearch } from 'react-icons/fa';
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
  FaCheck,
  FaPlusCircle,
  FaShareAlt,
  FaBars,
} from "react-icons/fa";
import ShareModal from "./ShareModal/ShareModal";

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
    referred_by: "",
    image: "",
    first_name: "",
    last_name: "",
    full_name: ""
  });
  const [copyStatus, setCopyStatus] = useState({ copied: false, showMessage: false });
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);
  
  // Header dropdown states
  const [openRealEstateDropdown, setOpenRealEstateDropdown] = useState(false);
  const [openBusinessDropdown, setOpenBusinessDropdown] = useState(false);
  const [openProductsDropdown, setOpenProductsDropdown] = useState(false);
  const [openOperationsDropdown, setOpenOperationsDropdown] = useState(false);
  
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
  
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const profilePanelRef = useRef(null);
  const realEstateDropdownRef = useRef(null);
  const businessDropdownRef = useRef(null);
  const productsDropdownRef = useRef(null);
  const operationsDropdownRef = useRef(null);
  
  const loginUrl = "/login";
  const signupUrl = "/register";
  
  const navigate = useNavigate();
  const location = useLocation();

  // Get current user ID from localStorage
  const currentUserId = localStorage.getItem("user_id");

  // Helper function to get user display name
  const getUserDisplayName = () => {
    // Priority: full_name > first_name + last_name > username > user_name > "Team"
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
    
    return "Team";
  };

  // Fetch user data from API to get the image and name fields
  const fetchUserDataFromAPI = async () => {
    if (!currentUserId) return;
    
    try {
      const response = await axios.get(`${baseurl}/users/${currentUserId}/`);
      console.log("User data from API:", response.data);
      
      if (response.data) {
        // Update localStorage with the image and name fields
        if (response.data.image) {
          localStorage.setItem("user_image", response.data.image);
        }
        if (response.data.first_name) {
          localStorage.setItem("first_name", response.data.first_name);
        }
        if (response.data.last_name) {
          localStorage.setItem("last_name", response.data.last_name);
        }
        if (response.data.full_name) {
          localStorage.setItem("full_name", response.data.full_name);
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
    
    // Fetch fresh user data from API to get the image and name fields
    fetchUserDataFromAPI();
    
    // Listen for storage changes
    const handleStorageChange = () => {
      fetchUserData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [currentUserId]);

  // Hide copy message after 3 seconds
  useEffect(() => {
    if (copyStatus.showMessage) {
      const timer = setTimeout(() => {
        setCopyStatus({ copied: false, showMessage: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [copyStatus.showMessage]);

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (realEstateDropdownRef.current && !realEstateDropdownRef.current.contains(event.target)) {
        setOpenRealEstateDropdown(false);
      }
      if (businessDropdownRef.current && !businessDropdownRef.current.contains(event.target)) {
        setOpenBusinessDropdown(false);
      }
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target)) {
        setOpenProductsDropdown(false);
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
      
      const response = await axios.get(`${baseurl}/cart/?user=${userId}`);
      console.log("Cart API Response:", response.data);
      
      const cartResponse = response.data;
      let userCartItems = [];
      
      if (cartResponse.results && Array.isArray(cartResponse.results)) {
        userCartItems = cartResponse.results;
      } else if (Array.isArray(cartResponse)) {
        userCartItems = cartResponse;
      }
      
      console.log("User cart items:", userCartItems);
      
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
      
      const response = await axios.get(`${baseurl}/wishlist/?user=${userId}`);
      console.log("Wishlist API Response:", response.data);
      
      const wishlistResponse = response.data;
      let userWishlistItems = [];
      
      if (wishlistResponse.results && Array.isArray(wishlistResponse.results)) {
        userWishlistItems = wishlistResponse.results;
      } else if (Array.isArray(wishlistResponse)) {
        userWishlistItems = wishlistResponse;
      }
      
      console.log("User wishlist items:", userWishlistItems);
      
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
    const userId = localStorage.getItem("user_id");
    if (userId) {
      console.log("Setting up cart polling for user:", userId);
      fetchCartItems();
      
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

  // Handle Add Product click - No subscription check
  const handleAddProductClick = (e) => {
    e.preventDefault();
    navigate('/agent-add-product-form');
  };

  // Handle Add Variant click - No subscription check
  const handleAddVariantClick = (e) => {
    e.preventDefault();
    navigate('/agent-add-variant-form');
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
      
      await axios.post(`${baseurl}/notifications/mark-read/`, {
        user_id: parseInt(userId),
        notification_status_ids: [notification.notification_status_id]
      });
      
      console.log("Successfully marked agent notification as read");
      
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

  // Handle wishlist click
  const handleWishlistClick = () => {
    navigate("/agent-wishlist");
  };

  // Handle cart click
  const handleCartClick = () => {
    navigate("/agent-add-to-cart");
  };

  // Handle profile click from the panel
  const handleProfilePanelClick = () => {
    navigate("/agent-profile");
  };

  // Handle profile panel hover
  const handleProfilePanelMouseEnter = () => {
    setShowProfileTooltip(true);
  };

  const handleProfilePanelMouseLeave = () => {
    setShowProfileTooltip(false);
  };

  // Define dropdown menu items - Removed requiresSubscription flag
  const realEstateItems = [
    { path: "/agent-add-property", name: "Add Property", icon: <FaPlusCircle /> },
    { path: "/agent-my-properties", name: "My Properties", icon: <FaHome /> },
    { path: "/agent-properties", name: "All Properties", icon: <FaClipboardList /> },
    { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> }
  ];

  const businessItems = [
    { path: "/agent-my-business", name: "View Business", icon: <FaUserTie /> },
    { path: "/agent-add-business-form", name: "Add Business", icon: <FaPlusCircle /> }
  ];

  const productsItems = [
    { path: "/agent-offers", name: "Offers", icon: <FaTag /> },
    { 
      path: "/agent-add-product-form", 
      name: "Add Product", 
      icon: <FaPlusCircle />,
      onClick: handleAddProductClick
    },
    { 
      path: "/agent-add-variant-form", 
      name: "Add Product Variant", 
      icon: <FaPlusCircle />,
      onClick: handleAddVariantClick
    },
    { path: "/agent-busineess-category", name: "All Products", icon: <FaLayerGroup /> }
  ];

  const operationsItems = [
    { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
    { path: "/agent-my-subscription-plans", name: "My Plans", icon: <FaCreditCard /> },
    { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
    { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
    { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },

  ];

  // Helper function to render dropdown item
  const renderDropdownItem = (item, index) => {
    if (item.onClick) {
      return (
        <a
          key={index}
          href={item.path}
          className="wn-dropdown-link"
          onClick={(e) => {
            e.preventDefault();
            item.onClick(e);
            // Close dropdown after click
            setOpenRealEstateDropdown(false);
            setOpenBusinessDropdown(false);
            setOpenProductsDropdown(false);
            setOpenOperationsDropdown(false);
          }}
        >
          <span className="wn-dropdown-icon">{item.icon}</span>
          <span className="wn-dropdown-text">{item.name}</span>
        </a>
      );
    }
    
    return (
      <Link
        key={index}
        to={item.path}
        className="wn-dropdown-link"
        onClick={() => {
          setOpenRealEstateDropdown(false);
          setOpenBusinessDropdown(false);
          setOpenProductsDropdown(false);
          setOpenOperationsDropdown(false);
        }}
      >
        <span className="wn-dropdown-icon">{item.icon}</span>
        <span className="wn-dropdown-text">{item.name}</span>
      </Link>
    );
  };

  // Define your navigation items for sidebar - Removed requiresSubscription flag
  const menuItems = [
    { 
      path: "/agent-home", 
      name: "Home", 
      icon: <FaHome /> 
    },
    { 
      path: "/agent-dashboard", 
      name: "Dashboard", 
      icon: <FaTachometerAlt /> 
    },
    
    // Properties Main Category
    {
      name: "Real Estate",
      icon: <FaBuilding />,
      subMenu: [
        { path: "/agent-add-property", name: "Add Property", icon: <FaPlusCircle /> },
        { path: "/agent-my-properties", name: "My Properties", icon: <FaHome /> },
        { path: "/agent-properties", name: "All Properties", icon: <FaClipboardList /> },
        { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> }
      ],
    },
    
    // Business Main Category
    {
      name: "Business",
      icon: <FaBriefcase />,
      subMenu: [
        { path: "/agent-my-business", name: "View Business", icon: <FaUserTie /> },
        { path: "/agent-add-business-form", name: "Add Business", icon: <FaPlusCircle /> }
      ],
    },
    
    // Products Main Category
    {
      name: "Products",
      icon: <FaLayerGroup />,
      subMenu: [
        { path: "/agent-offers", name: "Offers", icon: <FaTag /> },
        { 
          path: "/agent-add-product-form", 
          name: "Add Product", 
          icon: <FaPlusCircle />,
          onClick: handleAddProductClick
        },
        { 
          path: "/agent-add-variant-form", 
          name: "Add Product Variant", 
          icon: <FaPlusCircle />,
          onClick: handleAddVariantClick
        },
        { path: "/agent-busineess-category", name: "All Products", icon: <FaLayerGroup /> }
      ],
    },
    
    // Operations Main Category
    {
      name: "Operations",
      icon: <FaCogs />,
      subMenu: [
        { path: "/agent-subscription-plan", name: "Plans", icon: <FaCreditCard /> },
        { path: "/agent-my-subscription-plans", name: "My Plans", icon: <FaCreditCard /> },
        { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
        { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
        { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },

      ],
    },
    { path: "/agent-my-orders", name: "My Orders/As Buyer", icon: <FaTag /> },
    { path: "/agent-orders", name: "Orders/As Seller", icon: <FaTag /> },
    { path: "/a-service-providers", name: "Service Providers", icon: <FaUserTie /> },
    { path: "/p-meetings", name: "Meetings", icon: <FaCalendarAlt /> },
    { path: "/agent-profile", name: "Profile", icon: <FaUserCircle /> },
  ];

  // Helper function to render menu item
  const renderMenuItem = (item) => {
    if (item.onClick) {
      return (
        <li key={item.name}>
          <a 
            href={item.path}
            className="wn-sidebar-link"
            onClick={(e) => {
              e.preventDefault();
              item.onClick(e);
            }}
          >
            <span className="wn-sidebar-icon">{item.icon}</span>
            <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
          </a>
        </li>
      );
    }
    
    return (
      <li key={item.path || item.name}>
        <Link 
          to={item.path} 
          className="wn-sidebar-link"
          onClick={() => setOpen(false)}
        >
          <span className="wn-sidebar-icon">{item.icon}</span>
          <span className="wn-sidebar-text" style={{ marginLeft: "10px" }}>{item.name}</span>
        </Link>
      </li>
    );
  };

  // Function to get full image URL
  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it starts with /media/, append baseurl
    if (imagePath.startsWith('/media/')) {
      return `${baseurl}${imagePath}`;
    }
    
    // If it's just a filename or path without /media/, add /media/ prefix
    if (!imagePath.startsWith('/')) {
      return `${baseurl}/media/${imagePath}`;
    }
    
    // Default case
    return `${baseurl}${imagePath}`;
  };

  // Get the display name for the current user
  const displayName = getUserDisplayName();

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
    onClick={() => navigate('/agent-home')}
    style={{ cursor: 'pointer' }}
  />
</div>

        </div>
          <AgentSearchBar placeholder="Search products..." />

        
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

          {/* Products Dropdown */}
          <div className="wn-header-dropdown" ref={productsDropdownRef}>
            <button 
              className="wn-header-dropdown-btn"
              onClick={() => setOpenProductsDropdown(!openProductsDropdown)}
            >
              <FaLayerGroup className="wn-dropdown-btn-icon" />
              <span>Products</span>
              <FaCaretDown className="wn-dropdown-arrow" />
            </button>
            {openProductsDropdown && (
              <div className="wn-header-dropdown-menu">
                {productsItems.map((item, idx) => renderDropdownItem(item, idx))}
              </div>
            )}
          </div>
          
          {/* Orders Dropdown */}
          <div className="wn-header-dropdown" ref={operationsDropdownRef}>
            <button 
              className="wn-header-dropdown-btn"
              onClick={() => setOpenOperationsDropdown(!openOperationsDropdown)}
            >
              <FaTag className="wn-dropdown-btn-icon" />
              <span>Orders</span>
              <FaCaretDown className="wn-dropdown-arrow" />
            </button>
            {openOperationsDropdown && (
              <div className="wn-header-dropdown-menu">
                <Link
                  to="/agent-my-orders"
                  className="wn-dropdown-link"
                  onClick={() => setOpenOperationsDropdown(false)}
                >
                  <span className="wn-dropdown-icon"><FaTag /></span>
                  <span className="wn-dropdown-text">My Orders/As Buyer</span>
                </Link>
                <Link
                  to="/agent-orders"
                  className="wn-dropdown-link"
                  onClick={() => setOpenOperationsDropdown(false)}
                >
                  <span className="wn-dropdown-icon"><FaClipboardList /></span>
                  <span className="wn-dropdown-text">Orders/As Seller</span>
                </Link>
              </div>
            )}
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



{/* Wishlist Icon with Dynamic Count */}
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

{/* Cart Icon with Dynamic Count - FIXED: Now shows total quantity instead of item count */}
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

{/* User Panel Indicator */}
<div 
  className="wn-user-panel-indicator"
  ref={profilePanelRef}
  onClick={handleProfilePanelClick}
  onMouseEnter={handleProfilePanelMouseEnter}
  onMouseLeave={handleProfilePanelMouseLeave}
  style={{ cursor: 'pointer', position: 'relative' }}
>
  <div className="wn-panel-badge">
    <FaUserTie className="wn-panel-icon" />
    <span className="wn-panel-name">Team</span>
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

      {/* Mobile Logout Button - Fixed at bottom of sidebar only (removed from navbar) */}
      {/* The logout button in sidebar will serve as the mobile logout option */}

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

        {/* Refer Button Section */}
        <div className="wn-sidebar-status-section">
          <ShareModal
            mode="custom"
            shareUrl={`${window.location.origin}/register?referral_id=${userData.referral_id || "SRP000001"}`}
            productTitle="Join using my referral link!"
            triggerAs="button"
            triggerClassName="wn-sidebar-refer-btn"
            triggerLabel={
              <>
                <FaShareAlt style={{ marginRight: "8px" }} />
                Refer Now
              </>
            }
          />
        </div>

        {/* Navigation Items */}
        <div className="wn-nav-section">
          <div className="wn-section-title">Team Menu</div>
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
                        {item.subMenu.map((subItem, subIndex) => {
                          if (subItem.onClick) {
                            return (
                              <li key={`${subItem.name}-${subIndex}`}>
                                <a 
                                  href={subItem.path}
                                  className="wn-submenu-link"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    subItem.onClick(e);
                                    setOpen(false);
                                  }}
                                >
                                  <span className="wn-submenu-icon">
                                    {subItem.icon || <FaCogs />}
                                  </span>
                                  <span className="wn-submenu-text" style={{ marginLeft: "10px" }}>{subItem.name}</span>
                                </a>
                              </li>
                            );
                          }
                          return (
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
                          );
                        })}
                      </ul>
                    )}
                  </li>
                ) : (
                  // Regular menu item without submenu
                  renderMenuItem(item)
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

export default AgentNavbar;