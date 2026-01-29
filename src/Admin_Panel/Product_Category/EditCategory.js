import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const EditProductCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    level: "",
    parent: "",
    display_order: "",
    is_active: true,
    icon: null
  });

  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [iconPreview, setIconPreview] = useState(null);
  const [currentIcon, setCurrentIcon] = useState(null);

  const CATEGORY_URL = `${baseurl}/categories/${id}/`;

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    setInitialLoading(true);
    try {
      await Promise.all([loadCategories(), loadCategory()]);
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setInitialLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await axios.get(`${baseurl}/categories/`);
      const categories = Array.isArray(res.data) ? res.data : res.data.results || [];
      // Filter out current category and its children to avoid circular reference
      const filteredCategories = categories.filter(cat => 
        cat.category_id !== parseInt(id)
      );
      setAllCategories(filteredCategories);
    } catch (err) {
      console.error("Failed to load categories:", err);
      setAllCategories([]);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load categories",
        confirmButtonColor: "#273c75",
      });
    }
  };

  const loadCategory = async () => {
    try {
      const res = await axios.get(CATEGORY_URL);
      const data = res.data;
      setFormData({
        name: data.name || "",
        slug: data.slug || "",
        description: data.description || "",
        level: data.level || "",
        parent: data.parent || "",
        display_order: data.display_order || "",
        is_active: data.is_active ?? true
      });
      if (data.icon) {
        setCurrentIcon(data.icon);
        setIconPreview(data.icon);
      }
    } catch (err) {
      console.error("Error loading category:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load category",
        confirmButtonColor: "#273c75",
      }).then(() => navigate("/tableproductcategory"));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Auto-generate slug from name if empty
    if (name === 'name' && !formData.slug) {
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

  const removeIcon = () => {
    setFormData({ ...formData, icon: 'remove' });
    setIconPreview(null);
    setCurrentIcon(null);
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

    if (!formData.level) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select level",
        confirmButtonColor: "#273c75",
      });
      return;
    }

    // Check for circular reference
    if (formData.parent) {
      const parentId = parseInt(formData.parent);
      if (parentId === parseInt(id)) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Category cannot be its own parent",
          confirmButtonColor: "#273c75",
        });
        return;
      }
    }

    setLoading(true);

    try {
      // Prepare form data
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name.trim());
      formDataObj.append('slug', formData.slug.trim());
      if (formData.description) {
        formDataObj.append('description', formData.description.trim());
      } else {
        formDataObj.append('description', '');
      }
      formDataObj.append('level', formData.level);
      if (formData.parent) {
        formDataObj.append('parent', formData.parent);
      } else {
        formDataObj.append('parent', '');
      }
      if (formData.display_order) {
        formDataObj.append('display_order', formData.display_order);
      } else {
        formDataObj.append('display_order', '');
      }
      formDataObj.append('is_active', formData.is_active);
      
      // Handle icon
      if (formData.icon === 'remove') {
        formDataObj.append('icon', '');
      } else if (formData.icon) {
        formDataObj.append('icon', formData.icon);
      }

      await axios.put(CATEGORY_URL, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // SUCCESS SWEETALERT
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Category updated successfully",
        confirmButtonColor: "#273c75",
        confirmButtonText: "OK",
      }).then(() => navigate("/tableproductcategory"));
    } catch (err) {
      console.error("Update error:", err);
      
      let errorMessage = "Failed to update category";
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
            <h4 className="mb-3">Edit Product Category</h4>
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
          <h4 className="text-center ">Edit Product Category</h4>

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
                  placeholder="Enter slug"
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
                  placeholder="Enter category description"
                  rows="3"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Level + Parent + Order in one row */}
            <div className="row ">
              <div className="col-md-4">
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
                  <option value="">Select Level</option>
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
                  disabled={loading}
                >
                  <option value="">None (Top Level)</option>
                  {filteredParents.map((cat) => (
                    <option key={cat.category_id} value={cat.category_id}>
                      {cat.name} ({cat.level})
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
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
                <div className="d-flex gap-2 align-items-center">
                  <input
                    type="file"
                    name="icon"
                    onChange={handleFileChange}
                    className="form-control"
                    accept="image/*"
                    disabled={loading}
                  />
                  {(currentIcon || iconPreview) && (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={removeIcon}
                      disabled={loading}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <small className="text-muted">
                  Optional. Max 2MB. Supported: JPEG, PNG, GIF, WebP
                </small>
              </div>
              
              {(currentIcon || iconPreview) && (
                <div className="col-md-6">
                  <label className="form-label">Preview</label>
                  <div className="icon-preview">
                    <img 
                      src={iconPreview || currentIcon} 
                      alt="Preview" 
                      className="img-thumbnail"
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Status Checkbox */}
            <div className="row">
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
                    {loading ? "Updating..." : "Update Category"}
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

export default EditProductCategory;