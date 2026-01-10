import React from "react";
import "./ShopHeader.css";
import { FaStar, FaTruck, FaStore } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const ShopHeader = ({ activeTab, onTabChange }) => {
  return (
    <div className="shop-header bg-white border-bottom">
      <div className="container py-4">
        <div className="d-flex align-items-center gap-4">

          {/* Logo */}
          <div className="shop-logo">
            <img src="/logo.png" alt="Shop Logo" />
          </div>

          {/* Info */}
          <div className="flex-grow-1">
            <h3 className="fw-bold mb-1">Series Enterprises</h3>

            <div className="text-muted d-flex align-items-center gap-1 mb-2">
              <MdLocationOn />
              Mumbai, Maharashtra
            </div>

            <div className="d-flex align-items-center gap-4 flex-wrap">
              <div>
                <small className="text-muted">Ratings</small>
                <div className="text-warning">
                  <FaStar /><FaStar /><FaStar /><FaStar />
                  <FaStar className="text-secondary" />
                </div>
              </div>

              <div className="border-start ps-3">
                <small className="text-muted">Availability</small>
                <div className="text-success">
                  <FaTruck /> Deliverable
                </div>
              </div>

              <div className="border-start ps-3">
                <small className="text-muted">Status</small>
                <div className="text-success">
                  <FaStore /> Open
                </div>
              </div>

              <div className="border-start ps-3">
                <small className="text-muted">Shipping</small>
                <div className="text-success">
                  <FaTruck /> Free Shipping
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="shop-tabs mt-4">
          {["shop", "locations", "reviews"].map(tab => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopHeader;
