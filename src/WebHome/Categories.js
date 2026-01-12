import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import './Categories.css'
import { baseurl } from "../BaseURL/BaseURL";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const categoriesRowRef = useRef(null);

  useEffect(() => {
    // Using baseurl for the API endpoint
    fetch(`${baseurl}/categories/?level=global`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.results
          .filter(cat => cat.level === "global" && cat.is_active)
          .sort((a, b) => a.display_order - b.display_order);

        setCategories(filtered);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Calculate total pages
  const itemsPerPage = 9;
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  // Get current page categories
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="categories-wrapper">
      {/* LEFT ARROW */}
      <button
        className={`category-arrow ${currentPage === 0 ? "disabled" : ""}`}
        onClick={handlePrev}
        disabled={currentPage === 0}
      >
        ‹
      </button>

      {/* CATEGORIES */}
      <div className="categories-row" ref={categoriesRowRef}>
        {currentCategories.map(cat => (
          <div
            className="category-item"
            key={cat.category_id}
            onClick={() => navigate(`/w-subcategory/${cat.category_id}`)}
          >
            <div className="category-icon">
              <BusinessCenterIcon />
            </div>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>

      {/* RIGHT ARROW */}
      <button
        className={`category-arrow ${currentPage === totalPages - 1 ? "disabled" : ""}`}
        onClick={handleNext}
        disabled={currentPage === totalPages - 1}
      >
        ›
      </button>

      {/* Optional: Dots indicator - Remove if not needed */}
      {totalPages > 1 && (
        <div className="category-dots">
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={`category-dot ${index === currentPage ? "active" : ""}`}
              onClick={() => setCurrentPage(index)}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;