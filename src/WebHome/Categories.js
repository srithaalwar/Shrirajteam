import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import "./Categories.css";
import { baseurl } from "../BaseURL/BaseURL";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const rowRef = useRef(null);

  const getIconUrl = (iconPath) => {
    if (!iconPath) return null;
    if (iconPath.startsWith("http")) return iconPath;
    return `${baseurl}${iconPath}`;
  };

  useEffect(() => {
    fetch(`${baseurl}/categories/?level=global`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.results
          .filter((cat) => cat.level === "global" && cat.is_active)
          .sort((a, b) => a.display_order - b.display_order);
        setCategories(filtered);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div className="mani-as-cat-section">
      <div className="mani-as-cat-scroll-row" ref={rowRef}>
        {categories.map((cat, index) => (
          <div
            key={cat.category_id}
            className="mani-as-cat-item"
            style={{ animationDelay: `${index * 40}ms` }}
            onClick={() => navigate(`/w-subcategory/${cat.category_id}`)}
          >
            {cat.icon ? (
              <img
                src={getIconUrl(cat.icon)}
                alt={cat.name}
                className="mani-as-cat-icon-img"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            ) : (
              <BusinessCenterIcon className="mani-as-cat-icon-svg" />
            )}
            <span className="mani-as-cat-name">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;