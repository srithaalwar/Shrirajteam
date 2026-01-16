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




import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Agent_Navbar.css";
import logoImage from "../../Logos/logo1.png";
import { Link } from "react-router-dom";

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
  FaStar
} from "react-icons/fa";

const AgentNavbar = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedMenu, setExpandedMenu] = useState(null);
  
  const dropdownRef = useRef(null);
  const loginUrl = "/login";
  const signupUrl = "/register";
  
  const navigate = useNavigate();

  // Define your navigation items with appropriate icons
  const menuItems = [
    { path: "/agent-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/agent-add-property", name: "Add Property", icon: <FaHome /> },
    { path: "/agent-my-properties", name: "My Properties", icon: <FaBuilding /> },
    { path: "/agent-properties", name: "Properties", icon: <FaClipboardList /> },
    { path: "/agent-business", name: "Business", icon: <FaBriefcase /> },
    { path: "/agent-my-business", name: "My Business", icon: <FaUserTie /> },
    {
      name: "Operations",
      icon: <FaCogs />,
      subMenu: [
        { path: "/agent-payout", name: "Payout", icon: <FaMoneyBillWave /> },
        { path: "/agent-plans", name: "Plans", icon: <FaCreditCard /> },
        { path: "/agent-training-material", name: "Training Material", icon: <FaGraduationCap /> },
        { path: "/agent-transactions", name: "Transactions", icon: <FaExchangeAlt /> },
        { path: "/agent-business", name: "Business", icon: <FaBriefcase /> },
        { path: "/agent-site-visits", name: "Site Visits", icon: <FaEye /> },
        { path: "/agent-my-team", name: "My Team", icon: <FaUsers /> },
      ],
    },
    { path: "/", name: "Meetings", icon: <FaCalendarAlt /> },
    { path: "/", name: "Offers", icon: <FaTag /> },
    { path: "/", name: "Profile", icon: <FaUserCircle /> },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategories(false);
      }
    };

    if (showCategories) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCategories]);

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

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("agentData");
    sessionStorage.clear();
    setOpen(false);
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

        {/* SEARCH */}
        <div className="wn-nav-center">
          <div className="wn-search-box">
            <div className="wn-category-dropdown" ref={dropdownRef}>
              <div 
                className="wn-dropdown-toggle-area"
                onClick={handleDropdownToggle}
                style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              >
                <span className="wn-category-text">{selectedCategory}</span>
                <span className={`wn-dropdown-arrow ${showCategories ? "open" : ""}`} />
              </div>

              {showCategories && (
                <div className="wn-category-menu">
                  <div
                    className="wn-category-item"
                    onClick={() => handleCategorySelect("All")}
                  >
                    <span>All Categories</span>
                  </div>

                  {categories.map((cat) => (
                    <div
                      key={cat.category_id}
                      className="wn-category-item"
                      onClick={() => handleCategorySelect(cat.name)}
                    >
                      <span>{cat.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="wn-search-divider" />

            <input
              type="text"
              placeholder="What are you looking for?"
            />

            <span className="wn-search-icon">🔍</span>
          </div>
        </div>

        <div className="wn-nav-right">
          {/* <LoginButtonExternal />
          <SignupButtonExternal /> */}
          <div className="wn-cart">🛒 Cart</div>
        </div>
      </header>

      {/* OVERLAY */}
      {open && <div className="wn-overlay" onClick={() => setOpen(false)} />}

      {/* SIDEBAR - UPDATED WITH BETTER UI */}
      <aside className={`wn-sidebar ${open ? "open" : ""}`}>
        {/* Header */}
        <div className="wn-sidebar-header">
          <div className="wn-logo">
            <img 
              src={logoImage} 
              alt="Shriraj Logo" 
              className="wn-logo-img"
            />
          </div>
          <button className="wn-close-btn" onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* User Info Section (Optional - Add if you have user data) */}
        {/* <div className="wn-user-info">
          <div className="wn-user-avatar">
            <FaUserCircle size={42} color="#1e40af" />
          </div>
          <div className="wn-user-details">
            <h4 className="wn-user-name">Agent User</h4>
            <p className="wn-user-role">Agent</p>
          </div>
        </div> */}

        {/* <div className="wn-divider" /> */}

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

        {/* Logout Button - Updated with better icon */}
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