import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import "./SubCategories.css";

const SubCategories = () => {
  const { id } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://test.shrirajteam.com:85/categories/${id}/`)
      .then(res => res.json())
      .then(data => {
        setSubCategories(data.children || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  return (
    <>
      <WebsiteNavbar />

      <div className="webhome-container">
        <h2 className="section-title">Sub Categories</h2>

        {loading ? (
          <p>Loading...</p>
        ) : subCategories.length === 0 ? (
          <p>No subcategories available</p>
        ) : (
          <div className="categories-row">
            {subCategories.map((sub, index) => (
              <div className="category-item" key={index}>
                <div className="category-icon">
                  <BusinessCenterIcon />
                </div>
                <p>{sub.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SubCategories;
