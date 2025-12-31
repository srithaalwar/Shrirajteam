import React, { useState } from "react";
import "./WebsiteNavbar.css";

const WebsiteNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-left">
          <button className="menu-btn" onClick={() => setOpen(true)}>
            ☰
          </button>
          <div className="logo">
             <span>Shriraj</span>
          </div>
          <button className="location-btn">📍 Select Location</button>
        </div>

<div className="nav-center">
  <div className="search-box">
    <select className="category-select">
      <option>All</option>
      <option>Electronics</option>
      <option>Fashion</option>
      <option>Grocery</option>
    </select>

    <input
      type="text"
      placeholder="What are you looking for?"
    />

    <span className="search-icon">🔍</span>
  </div>
</div>


        <div className="nav-right">
          <button className="sell-btn">Sell on ONDC</button>
          <div className="ondc-logo">ONDC<br />NETWORK</div>
          <div className="cart">🛒 Cart</div>
        </div>
      </header>

      {/* OVERLAY */}
      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      {/* SIDEBAR */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="logo">Shriraj </div>
          <button className="close-btn" onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* Auth */}
        <button className="signup-btn">Sign Up</button>
        <div className="login-link">↳ Log in</div>

        <div className="divider" />

        {/* Categories */}
        <ul className="menu-list">
          <li>Property Deals</li>
          <li>Bussiness Deals</li>
          <li>Product Deals</li>
          <li>Residential Projects</li>
          <li>Commercial Projects</li>
          <li>Co-working Spaces</li>
          <li>Office Leasing</li>
          <li>Retail Spaces</li>
          <li>Industrial Units</li>
          <li>Land Investments</li>
          <li>Smart Buildings</li>
          <li>Business Assets</li>
          <li>High-Return Deals</li>
        </ul>

        <div className="divider" />

        {/* Support */}
        <div className="section-title1">Support</div>
        <ul className="menu-list">
          <li>📞 Contact Us</li>
        </ul>

        <div className="divider" />

        {/* Language */}
        <div className="section-title1">Language</div>
        <div className="language-row">
          <span>English - EN</span>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider" />
          </label>
        </div>

        <div className="divider" />

        {/* Seller */}
        <div className="section-title1">Seller</div>
        <ul className="menu-list">
          <li>Login</li>
          <li>Register</li>
        </ul>

        <div className="divider" />

        {/* Apps */}
        <div className="section-title1">Our apps</div>
        <ul className="menu-list">
          <li>▶ Google Play</li>
          <li> App Store</li>
        </ul>
      </aside>
    </>
  );
};

export default WebsiteNavbar;
