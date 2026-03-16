import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import "bootstrap/dist/css/bootstrap.min.css";

const EditServiceCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category_name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${baseurl}/service-categories/${id}/`);
        setFormData({
          category_name: res.data.category_name ?? "",
          description: res.data.description ?? "",
        });
      } catch (error) {
        console.error("Failed to load category:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load service category details",
          confirmButtonColor: "#273c75",
        }).then(() => navigate("/a-service-categories"));
      } finally {
        setFetchLoading(false);
      }
    };

    fetchCategory();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.category_name) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Category name is required",
        confirmButtonColor: "#273c75",
      });
      return;
    }

    setLoading(true);

    try {
      await axios.put(`${baseurl}/service-categories/${id}/`, {
        category_name: formData.category_name,
        description: formData.description || null,
      });

      // SUCCESS SWEETALERT
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Service category updated successfully",
        confirmButtonColor: "#273c75",
        confirmButtonText: "OK",
      }).then(() => navigate("/a-service-categories"));
    } catch (error) {
      console.error("Failed to update:", error);

      // Handle duplicate category name error
      let errorMessage = "Failed to update service category";
      if (error.response?.data?.category_name) {
        errorMessage = "Category name already exists";
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: errorMessage,
        confirmButtonColor: "#273c75",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <>
        <AdminNavbar />
        <div className="container my-4 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />

      <div className="container my-4">
        <div className="card p-4">
          <h4 className="text-center mb-4">Edit Service Category</h4>

          <form onSubmit={handleSubmit}>
            {/* Category Name */}
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Category Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="category_name"
                    value={formData.category_name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter category name"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter description (optional)"
                    rows="3"
                    disabled={loading}
                  />
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
                    onClick={() => navigate("/a-service-categories")}
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
                    {loading ? "Updating..." : "Update Service Category"}
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

export default EditServiceCategory;