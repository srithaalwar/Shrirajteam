import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WebsiteSubCategories from "../../src/SubCategories/SubCategories"; // Adjust path as needed
import { baseurl } from "../BaseURL/BaseURL";

const CategoryBySlug = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    const fetchCategoryId = async () => {
      try {
        const response = await fetch(`${baseurl}/categories/?slug=${slug}`);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          const category = data.results[0];
          setCategoryId(category.category_id);
        } else {
          console.error("Category not found");
          navigate("/"); // Redirect to home if category not found
        }
      } catch (error) {
        console.error("Error fetching category:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryId();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading category...</span>
        </div>
      </div>
    );
  }

  if (!categoryId) {
    return null;
  }

  // Pass the ID to the existing component
  return <WebsiteSubCategories categoryId={categoryId} />;
};

export default CategoryBySlug;