import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin_Navbar.css";
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
  FaRobot
} from "react-icons/fa";

const AdminNavbar = () => {
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
    { path: "/admin-dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/admin-add-property", name: "Add Property", icon: <FaHome /> },
    { path: "/admin-properties", name: "Properties", icon: <FaBuilding /> },
    { path: "/a-users", name: "Users", icon: <FaUsers /> },
    {
      name: "Operations",
      icon: <FaCogs />,
      subMenu: [
        { path: "/", name: "Company Payout", icon: <FaMoneyBillWave /> },
        { path: "/", name: "Team Payout", icon: <FaHandHoldingUsd /> },
        { path: "/", name: "Subscription", icon: <FaCreditCard /> },
        { path: "/a-bookingslab", name: "Booking Slab", icon: <FaLayerGroup /> },
        { path: "/admin-trainingmaterial", name: "Training Material", icon: <FaGraduationCap /> },
        { path: "/", name: "How it works", icon: <FaQuestionCircle /> },
        { path: "/", name: "Transactions", icon: <FaExchangeAlt /> },
        { path: "/", name: "Payout Master", icon: <FaDatabase /> },
        { path: "/tablecategory", name: "Category", icon: <FaTag /> },
        { path: "/", name: "Business", icon: <FaBriefcase /> },
        { path: "/", name: "Site Visits", icon: <FaEye /> },
        { path: "/", name: "Chat Bot", icon: <FaRobot /> },
        { path: "/a-departments", name: "Departments", icon: <FaSitemap /> },
      ],
    },
    { path: "/", name: "Meetings", icon: <FaCalendarAlt /> },
    { path: "/a-leads", name: "Leads", icon: <FaChartLine /> },
    { path: "/a-company", name: "Company", icon: <FaBriefcase /> },
    { path: "/", name: "Reports", icon: <FaFileAlt /> },
    { path: "/", name: "Prefix", icon: <FaTag /> },
    { path: "/admin-profile", name: "Profile", icon: <FaUserCircle /> },
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
    localStorage.removeItem("adminData");
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
          <div className="wn-cart admin-cart">🛒 Cart</div>
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
            <h4 className="wn-user-name">Admin User</h4>
            <p className="wn-user-role">Administrator</p>
          </div>
        </div> */}

        {/* <div className="wn-divider" /> */}

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
                      <span className="wn-sidebar-text">{item.name}</span>
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
                              <span className="wn-submenu-text"style={{ marginLeft: "10px" }}>{subItem.name}</span>
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

export default AdminNavbar;