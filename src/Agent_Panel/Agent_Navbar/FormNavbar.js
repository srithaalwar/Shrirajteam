import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./FormNavbar.css";
import { FaHome, FaBuilding, FaBriefcase } from "react-icons/fa";

const FormNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define the three form paths
  const forms = [
    {
      path: "/agent-add-property",
      name: "Add Property",
      icon: <FaBuilding />,
      description: "Real Estate"
    },
    {
      path: "/agent-add-product-form",
      name: "Add Product",
      icon: <FaBriefcase />,
      description: "Business"
    },
    {
      path: "/agent-add-variant-form",
      name: "Add Variant",
      icon: <FaHome />,
      description: "Product Variant"
    }
  ];

  // Check if current path is one of the form pages
  const isFormPage = forms.some(form => location.pathname === form.path);

  if (!isFormPage) {
    return null;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="form-navbar">
      <div className="form-navbar-container">
        {forms.map((form) => (
          <button
            key={form.path}
            className={`form-nav-btn ${location.pathname === form.path ? "active" : ""}`}
            onClick={() => handleNavigation(form.path)}
          >
            <span className="form-nav-icon">{form.icon}</span>
            <div className="form-nav-text">
              <span className="form-nav-name">{form.name}</span>
              <span className="form-nav-desc">{form.description}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormNavbar;