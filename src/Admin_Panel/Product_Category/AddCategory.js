import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import "bootstrap/dist/css/bootstrap.min.css";
// import './ProductCategory.css';

const ProductCategoryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    level: "product",
    parent: "",
    display_order: "",
    is_active: true,
    icon: null
  });

  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [iconPreview, setIconPreview] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setInitialLoading(true);
    try {
      const res = await axios.get(`${baseurl}/categories/`);
      const categories = Array.isArray(res.data) ? res.data : res.data.results || [];
      setAllCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load categories",
        confirmButtonColor: "#273c75",
      });
    } finally {
      setInitialLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Auto-generate slug from name
    if (name === 'name') {
      const slugValue = value.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-');
      setFormData(prev => ({ ...prev, slug: slugValue }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File too large",
          text: "Please select an image smaller than 2MB",
          confirmButtonColor: "#273c75",
        });
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Invalid file type",
          text: "Please select a valid image (JPEG, PNG, GIF, WebP)",
          confirmButtonColor: "#273c75",
        });
        return;
      }

      setFormData({ ...formData, icon: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter category name",
        confirmButtonColor: "#273c75",
      });
      return;
    }

    if (!formData.slug.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter slug",
        confirmButtonColor: "#273c75",
      });
      return;
    }

    setLoading(true);

    try {
      // Prepare form data for file upload
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name.trim());
      formDataObj.append('slug', formData.slug.trim());
      if (formData.description) {
        formDataObj.append('description', formData.description.trim());
      }
      formDataObj.append('level', formData.level);
      if (formData.parent) {
        formDataObj.append('parent', formData.parent);
      }
      if (formData.display_order) {
        formDataObj.append('display_order', formData.display_order);
      }
      formDataObj.append('is_active', formData.is_active);
      if (formData.icon) {
        formDataObj.append('icon', formData.icon);
      }

      await axios.post(`${baseurl}/categories/`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // SUCCESS SWEETALERT
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Category created successfully",
        confirmButtonColor: "#273c75",
        confirmButtonText: "OK",
      }).then(() => navigate("/tableproductcategory"));
    } catch (err) {
      console.error("Error creating category:", err);
      
      // Handle validation errors
      let errorMessage = "Failed to create category";
      if (err.response?.data) {
        if (typeof err.response.data === 'object') {
          const errors = Object.values(err.response.data).flat().join(', ');
          errorMessage = errors;
        } else {
          errorMessage = err.response.data.detail || errorMessage;
        }
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonColor: "#273c75",
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <>
        <AdminNavbar />
        <div className="container my-4">
          <div className="card p-4 text-center">
            <h4 className="mb-3">Create Product Category</h4>
            <div className="text-muted">Loading...</div>
          </div>
        </div>
      </>
    );
  }

  // Filter parents based on selected level
  const filteredParents = allCategories.filter(cat => {
    if (formData.level === 'global') return false;
    if (formData.level === 'business') return cat.level === 'global';
    if (formData.level === 'product') return cat.level === 'business';
    return false;
  });

  return (
    <>
      <AdminNavbar />

      <div className="container my-4">
        <div className="card p-4">
          <h4 className="text-center ">Create Product Category</h4>

          <form onSubmit={handleSubmit}>
            {/* Name + Slug in one row */}
            <div className="row ">
              <div className="col-md-6 ">
                <label className="form-label">
                  Category Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter category name"
                  required
                  disabled={loading}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Slug <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter slug (auto-generated)"
                  required
                  disabled={loading}
                />
                <small className="text-muted">
                  URL-friendly version of the name
                </small>
              </div>
            </div>

            {/* Description */}
            <div className="row ">
              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter category description (optional)"
                  rows="3"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Level + Parent + Order in one row */}
            <div className="row ">
              <div className="col-md-4 ">
                <label className="form-label">
                  Level <span className="text-danger">*</span>
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="form-control"
                  required
                  disabled={loading}
                >
                  <option value="global">Global</option>
                  <option value="business">Business</option>
                  <option value="product">Product</option>
                </select>
              </div>

              <div className="col-md-4 ">
                <label className="form-label">Parent Category</label>
                <select
                  name="parent"
                  value={formData.parent}
                  onChange={handleChange}
                  className="form-control"
                  disabled={loading || filteredParents.length === 0}
                >
                  <option value="">None (Top Level)</option>
                  {filteredParents.map((cat) => (
                    <option key={cat.category_id} value={cat.category_id}>
                      {cat.name} ({cat.level})
                    </option>
                  ))}
                </select>
                {filteredParents.length === 0 && (
                  <small className="text-muted">
                    No valid parent categories available for selected level
                  </small>
                )}
              </div>

              <div className="col-md-4 ">
                <label className="form-label">Display Order</label>
                <input
                  type="number"
                  name="display_order"
                  value={formData.display_order}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Optional"
                  min="0"
                  disabled={loading}
                />
                <small className="text-muted">Lower numbers display first</small>
              </div>
            </div>

            {/* Icon Upload */}
            <div className="row ">
              <div className="col-md-6">
                <label className="form-label">Category Icon</label>
                <input
                  type="file"
                  name="icon"
                  onChange={handleFileChange}
                  className="form-control"
                  accept="image/*"
                  disabled={loading}
                />
                <small className="text-muted">
                  Optional. Max 2MB. Supported: JPEG, PNG, GIF, WebP
                </small>
              </div>
              
              {iconPreview && (
                <div className="col-md-6">
                  <label className="form-label">Preview</label>
                  <div className="icon-preview">
                    <img 
                      src={iconPreview} 
                      alt="Preview" 
                      className="img-thumbnail"
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Status Checkbox */}
            <div className="row ">
              <div className="col-12">
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="form-check-input"
                    id="isActive"
                    disabled={loading}
                  />
                  <label className="form-check-label" htmlFor="isActive">
                    Active Category
                  </label>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/tableproductcategory")}
                    disabled={loading}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn"
                    style={{
                      backgroundColor: "#273c75",
                      borderColor: "#273c75",
                      color: "white",
                      minWidth: "180px",
                    }}
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Category"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductCategoryForm;