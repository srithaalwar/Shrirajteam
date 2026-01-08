import React, { useState, useEffect, useRef } from "react";
import "./Admin_Navbar.css";
import logoImage from "../../Logos/logo1.png";
import { Link } from "react-router-dom";

const WebsiteNavbar = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const dropdownRef = useRef(null);
  const loginUrl = "/login";
  const signupUrl = "/register";

  // Define sidebar navigation items
  const sidebarNavItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "My Orders", path: "/orders", icon: "📦" },
    { name: "Wishlist", path: "/wishlist", icon: "❤️" },
    { name: "Profile", path: "/profile", icon: "👤" },
    { name: "Notifications", path: "/notifications", icon: "🔔" },
    { name: "Help & Support", path: "/help", icon: "❓" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
  ];

  // Fetch categories
  useEffect(() => {
    fetch("https://test.shrirajteam.com:85/categories/?level=global")
      .then(res => res.json())
      .then(data => {
        const filtered = data.results
          .filter(cat => cat.level === "global" && cat.is_active)
          .sort((a, b) => a.display_order - b.display_order);
        setCategories(filtered);
      });
  }, []);

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

  // Logout function
  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
    // Example: Clear tokens, redirect to login, etc.
    // localStorage.removeItem('authToken');
    // window.location.href = '/login';
    setOpen(false); // Close sidebar after logout
  };

  // Login/Signup buttons
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
          <button className="wn-location-btn">📍 Select Location</button>
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
          <LoginButtonExternal />
          <SignupButtonExternal />
          <div className="wn-cart">🛒 Cart</div>
        </div>
      </header>

      {/* OVERLAY */}
      {open && <div className="wn-overlay" onClick={() => setOpen(false)} />}

      {/* SIDEBAR - SIMPLIFIED VERSION */}
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

        <div className="wn-divider" />

        {/* Navigation Items Only */}
        <div className="wn-nav-section">
          <div className="wn-section-title">Menu</div>
          <ul className="wn-menu-list">
            {sidebarNavItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className="wn-sidebar-link"
                  onClick={() => setOpen(false)}
                >
                  <span className="wn-sidebar-icon">{item.icon}</span>
                  <span className="wn-sidebar-text">{item.name}</span>
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
            <span className="wn-logout-icon">🚪</span>
            <span className="wn-logout-text">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default WebsiteNavbar;