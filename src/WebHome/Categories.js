import React, { useState, useEffect } from "react";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://test.shrirajteam.com:85/categories/?level=global");
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Access the results array from the API response
        const apiCategories = data.results
          .filter(category => category.level === "global" && category.is_active)
          .map(category => ({
            id: category.category_id,
            name: category.name,
            icon: <BusinessCenterIcon />, // Static icon for all
            slug: category.slug,
            displayOrder: category.display_order
          }));
        
        // Sort by display_order
        apiCategories.sort((a, b) => a.displayOrder - b.displayOrder);
        
        setCategories(apiCategories);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="categories-loading">Loading categories...</div>;
  }

  if (error) {
    return <div className="categories-error">Error loading categories</div>;
  }

  if (categories.length === 0) {
    return <div className="categories-empty">No categories available</div>;
  }

  return (
    <div className="categories-row">
      {categories.map((cat) => (
        <div className="category-item" key={cat.id}>
          <div className="category-icon">{cat.icon}</div>
          <p>{cat.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Categories;