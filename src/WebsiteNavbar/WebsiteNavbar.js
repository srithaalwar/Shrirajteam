// import React, { useState, useEffect, useRef } from "react";
// import "./WebsiteNavbar.css";

// const WebsiteNavbar = () => {
//   const [open, setOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [showCategories, setShowCategories] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("All");
  
//   // Create a ref for the dropdown container
//   const dropdownRef = useRef(null);

//   // Fetch categories
//   useEffect(() => {
//     fetch("https://test.shrirajteam.com:85/categories/?level=global")
//       .then(res => res.json())
//       .then(data => {
//         const filtered = data.results
//           .filter(cat => cat.level === "global" && cat.is_active)
//           .sort((a, b) => a.display_order - b.display_order);

//         setCategories(filtered);
//       });
//   }, []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowCategories(false);
//       }
//     };

//     // Add event listener when dropdown is open
//     if (showCategories) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     // Clean up event listener
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showCategories]);

//   // Handle clicking on the dropdown toggle (including the arrow)
//   const handleDropdownToggle = (event) => {
//     // Prevent event from bubbling up to parent elements
//     event.stopPropagation();
//     setShowCategories(!showCategories);
//   };

//   // Handle selecting a category
//   const handleCategorySelect = (categoryName) => {
//     setSelectedCategory(categoryName);
//     setShowCategories(false);
//   };

//   return (
//     <>
//       {/* NAVBAR */}
//       <header className="wn-navbar">
//         <div className="wn-nav-left">
//           <button className="wn-menu-btn" onClick={() => setOpen(true)}>☰</button>

//           <div className="wn-logo">
//             <span>Shriraj</span>
//           </div>

//           <button className="wn-location-btn">📍 Select Location</button>
//         </div>

//         {/* SEARCH */}
//         <div className="wn-nav-center">
//           <div className="wn-search-box">
//             {/* CATEGORY DROPDOWN - Wrap with ref */}
//             <div 
//               className="wn-category-dropdown"
//               ref={dropdownRef}
//             >
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

//             {/* DIVIDER */}
//             <div className="wn-search-divider" />

//             {/* SEARCH INPUT */}
//             <input
//               type="text"
//               placeholder="What are you looking for?"
//             />

//             <span className="wn-search-icon">🔍</span>
//           </div>
//         </div>

//         <div className="wn-nav-right">
//           <button className="wn-sell-btn">Sell on ONDC</button>
//           <div className="wn-ondc-logo">ONDC<br />NETWORK</div>
//           <div className="wn-cart">🛒 Cart</div>
//         </div>
//       </header>

//       {/* OVERLAY */}
//       {open && <div className="wn-overlay" onClick={() => setOpen(false)} />}

//       {/* SIDEBAR */}
//       <aside className={`wn-sidebar ${open ? "open" : ""}`}>
//         {/* Header */}
//         <div className="wn-sidebar-header">
//           <div className="wn-logo">Shriraj</div>
//           <button className="wn-close-btn" onClick={() => setOpen(false)}>✕</button>
//         </div>

//         {/* Auth */}
//         <button className="wn-signup-btn">Sign Up</button>
//         <div className="wn-login-link">↳ Log in</div>

//         <div className="wn-divider" />

//         {/* Dynamic Categories */}
//         <ul className="wn-menu-list">
//           {categories.map((cat) => (
//             <li key={cat.category_id}>{cat.name}</li>
//           ))}
//         </ul>

//         <div className="wn-divider" />

//         {/* Support */}
//         <div className="wn-section-title">Support</div>
//         <ul className="wn-menu-list">
//           <li>📞 Contact Us</li>
//         </ul>

//         <div className="wn-divider" />

//         {/* Language */}
//         <div className="wn-section-title">Language</div>
//         <div className="wn-language-row">
//           <span>English - EN</span>
//           <label className="wn-switch">
//             <input type="checkbox" defaultChecked />
//             <span className="wn-slider" />
//           </label>
//         </div>

//         <div className="wn-divider" />

//         {/* Seller */}
//         <div className="wn-section-title">Seller</div>
//         <ul className="wn-menu-list">
//           <li>Login</li>
//           <li>Register</li>
//         </ul>

//         <div className="wn-divider" />

//         {/* Apps */}
//         <div className="wn-section-title">Our apps</div>
//         <ul className="wn-menu-list">
//           <li>▶ Google Play</li>
//           <li> App Store</li>
//         </ul>
//       </aside>
//     </>
//   );
// };

// export default WebsiteNavbar;


// import React, { useState, useEffect, useRef } from "react";
// import "./WebsiteNavbar.css";
// // Import your logo image - adjust the path as needed
// import logoImage from "../Logos/logo1.png"; // Or whatever your logo file is called

// const WebsiteNavbar = () => {
//   const [open, setOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [showCategories, setShowCategories] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("All");
  
//   // Create a ref for the dropdown container
//   const dropdownRef = useRef(null);

//   // Fetch categories
//   useEffect(() => {
//     fetch("https://test.shrirajteam.com:85/categories/?level=global")
//       .then(res => res.json())
//       .then(data => {
//         const filtered = data.results
//           .filter(cat => cat.level === "global" && cat.is_active)
//           .sort((a, b) => a.display_order - b.display_order);

//         setCategories(filtered);
//       });
//   }, []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowCategories(false);
//       }
//     };

//     // Add event listener when dropdown is open
//     if (showCategories) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     // Clean up event listener
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showCategories]);

//   // Handle clicking on the dropdown toggle (including the arrow)
//   const handleDropdownToggle = (event) => {
//     // Prevent event from bubbling up to parent elements
//     event.stopPropagation();
//     setShowCategories(!showCategories);
//   };

//   // Handle selecting a category
//   const handleCategorySelect = (categoryName) => {
//     setSelectedCategory(categoryName);
//     setShowCategories(false);
//   };

//   return (
//     <>
//       {/* NAVBAR */}
//       <header className="wn-navbar">
//         <div className="wn-nav-left">
//           <button className="wn-menu-btn" onClick={() => setOpen(true)}>☰</button>

//           {/* Logo with imported image */}
//           <div className="wn-logo">
//             <img 
//               src={logoImage} 
//               alt="Shriraj Logo" 
//               className="wn-logo-img"
//             />
//           </div>

//           <button className="wn-location-btn">📍 Select Location</button>
//         </div>

//         {/* SEARCH */}
//         <div className="wn-nav-center">
//           <div className="wn-search-box">
//             {/* CATEGORY DROPDOWN - Wrap with ref */}
//             <div 
//               className="wn-category-dropdown"
//               ref={dropdownRef}
//             >
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

//             {/* DIVIDER */}
//             <div className="wn-search-divider" />

//             {/* SEARCH INPUT */}
//             <input
//               type="text"
//               placeholder="What are you looking for?"
//             />

//             <span className="wn-search-icon">🔍</span>
//           </div>
//         </div>

//         {/* Updated Right Section with Signup and Login */}
//         <div className="wn-nav-right">
//           <button className="wn-login-btn">Login</button>
//           <button className="wn-signup-btn">Sign Up</button>
//           <div className="wn-cart">🛒 Cart</div>
//         </div>
//       </header>

//       {/* OVERLAY */}
//       {open && <div className="wn-overlay" onClick={() => setOpen(false)} />}

//       {/* SIDEBAR */}
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

//         {/* Auth */}
//         {/* <button className="wn-signup-btn">Sign Up</button>
//         <div className="wn-login-link">↳ Log in</div> */}

//         <div className="wn-divider" />

//         {/* Dynamic Categories */}
//         <ul className="wn-menu-list">
//           {categories.map((cat) => (
//             <li key={cat.category_id}>{cat.name}</li>
//           ))}
//         </ul>

//         <div className="wn-divider" />

//         {/* Support */}
//         <div className="wn-section-title">Support</div>
//         <ul className="wn-menu-list">
//           <li>📞 Contact Us</li>
//         </ul>

//         <div className="wn-divider" />

//         {/* Language */}
//         <div className="wn-section-title">Language</div>
//         <div className="wn-language-row">
//           <span>English - EN</span>
//           <label className="wn-switch">
//             <input type="checkbox" defaultChecked />
//             <span className="wn-slider" />
//           </label>
//         </div>

//         <div className="wn-divider" />

//         {/* Seller */}
//         <div className="wn-section-title">Seller</div>
//         <ul className="wn-menu-list">
//           <li>Login</li>
//           <li>Register</li>
//         </ul>

//         <div className="wn-divider" />

//         {/* Apps */}
//         <div className="wn-section-title">Our apps</div>
//         <ul className="wn-menu-list">
//           <li>▶ Google Play</li>
//           <li> App Store</li>
//         </ul>
//       </aside>
//     </>
//   );
// };

// export default WebsiteNavbar;


//==================================================
// after adding links of login and signup buttons 

import React, { useState, useEffect, useRef } from "react";
import "./WebsiteNavbar.css";
// Import your logo image - adjust the path as needed
import logoImage from "../Logos/logo1.png"; // Or whatever your logo file is called
import { Link } from "react-router-dom"; // Import Link if using React Router

const WebsiteNavbar = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Create a ref for the dropdown container
  const dropdownRef = useRef(null);

  // Define your login and signup URLs
  const loginUrl = "/login"; // Change to your actual login route
  const signupUrl = "/register"; // Change to your actual signup route

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

    // Add event listener when dropdown is open
    if (showCategories) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCategories]);

  // Handle clicking on the dropdown toggle (including the arrow)
  const handleDropdownToggle = (event) => {
    // Prevent event from bubbling up to parent elements
    event.stopPropagation();
    setShowCategories(!showCategories);
  };

  // Handle selecting a category
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setShowCategories(false);
  };

  // If you're using React Router
  const LoginButton = () => (
    <Link to={loginUrl} className="wn-login-btn-link">
      <button className="wn-login-btn">Login</button>
    </Link>
  );

  const SignupButton = () => (
    <Link to={signupUrl} className="wn-signup-btn-link">
      <button className="wn-signup-btn">Sign Up</button>
    </Link>
  );

  // If you're NOT using React Router, use regular anchor tags
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

          {/* Logo with imported image */}
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
            {/* CATEGORY DROPDOWN - Wrap with ref */}
            <div 
              className="wn-category-dropdown"
              ref={dropdownRef}
            >
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

            {/* DIVIDER */}
            <div className="wn-search-divider" />

            {/* SEARCH INPUT */}
            <input
              type="text"
              placeholder="What are you looking for?"
            />

            <span className="wn-search-icon">🔍</span>
          </div>
        </div>

        {/* Updated Right Section with Signup and Login */}
        <div className="wn-nav-right">
          {/* Option 1: If using React Router */}
          {/* <LoginButton />
          <SignupButton /> */}
          
          {/* Option 2: If using regular links */}
          <LoginButtonExternal />
          <SignupButtonExternal />
          
          <div className="wn-cart">🛒 Cart</div>
        </div>
      </header>

      {/* OVERLAY */}
      {open && <div className="wn-overlay" onClick={() => setOpen(false)} />}

      {/* SIDEBAR */}
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

        {/* Add Login/Signup to Sidebar as well */}
        {/* <a href={signupUrl} className="wn-signup-btn-link">
          <button className="wn-signup-btn">Sign Up</button>
        </a>
        <a href={loginUrl} className="wn-login-link">
          <div className="wn-login-link">↳ Log in</div>
        </a> */}

        <div className="wn-divider" />

        {/* Dynamic Categories */}
        <ul className="wn-menu-list">
          {categories.map((cat) => (
            <li key={cat.category_id}>{cat.name}</li>
          ))}
        </ul>

        <div className="wn-divider" />

        {/* Support */}
        <div className="wn-section-title">Support</div>
        <ul className="wn-menu-list">
          <li>📞 Contact Us</li>
        </ul>

        <div className="wn-divider" />

        {/* Language */}
        <div className="wn-section-title">Language</div>
        <div className="wn-language-row">
          <span>English - EN</span>
          <label className="wn-switch">
            <input type="checkbox" defaultChecked />
            <span className="wn-slider" />
          </label>
        </div>

        <div className="wn-divider" />

        {/* Seller */}
        <div className="wn-section-title">Seller</div>
        <ul className="wn-menu-list">
          <li>
            <a href="/seller/login">Login</a>
          </li>
          <li>
            <a href="/seller/register">Register</a>
          </li>
        </ul>

        <div className="wn-divider" />

        {/* Apps */}
        <div className="wn-section-title">Our apps</div>
        <ul className="wn-menu-list">
          <li>▶ Google Play</li>
          <li> App Store</li>
        </ul>
      </aside>
    </>
  );
};

export default WebsiteNavbar;