import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import "bootstrap/dist/css/bootstrap.min.css";

const AddEditAmenities = () => {
  const [formData, setFormData] = useState({
    name: ""
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL if in edit mode

  // Check if we're in edit mode
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchAmenityItem();
    }
  }, [id]);

  // Fetch amenity item for editing
  const fetchAmenityItem = async () => {
    setFetchLoading(true);
    try {
      const res = await axios.get(`${baseurl}/amenities/${id}/`);
      const item = res.data;
      
      console.log("Fetched amenity:", item); // Debug log
      
      // Set form data with existing values
      setFormData({
        name: item.name || ""
      });
      
    } catch (error) {
      console.error("Error fetching amenity:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load amenity",
        confirmButtonColor: "#273c75",
      }).then(() => navigate("/admin-amenities-list"));
    }
    setFetchLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter amenity name",
        confirmButtonColor: "#273c75",
      });
      return;
    }

    setLoading(true);

    try {
      if (isEditMode) {
        // Update existing item
        await axios.put(`${baseurl}/amenities/${id}/`, {
          name: formData.name.trim()
        });
      } else {
        // Create new item
        await axios.post(`${baseurl}/amenities/`, {
          name: formData.name.trim()
        });
      }

      // Success message
      Swal.fire({
        icon: "success",
        title: "Success",
        text: isEditMode ? "Amenity updated successfully" : "Amenity created successfully",
        confirmButtonColor: "#273c75",
        confirmButtonText: "OK",
      }).then(() => navigate("/admin-amenities-list"));

    } catch (err) {
      console.error("Error saving amenity:", err);
      
      // Handle validation errors
      let errorMessage = isEditMode ? "Failed to update amenity" : "Failed to create amenity";
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

  if (fetchLoading) {
    return (
      <>
        <AdminNavbar />
        <div className="container my-4 text-center">
          <div className="spinner-border" role="status">
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
          <h4 className="text-center mb-4">
            {isEditMode ? "Edit Amenity" : "Add Amenity"}
          </h4>

          <form onSubmit={handleSubmit}>
            {/* Amenity Name */}
            <div className="row mb-4">
              <div className="col-md-8 offset-md-2">
                <label className="form-label">
                  Amenity Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  placeholder="Enter amenity name (e.g., Swimming Pool, Gym, Parking)"
                  required
                  disabled={loading}
                />
                <small className="text-muted">
                  Enter a descriptive name for the amenity
                </small>
              </div>
            </div>

            {/* Buttons */}
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-center gap-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg"
                    onClick={() => navigate("/admin-amenities-list")}
                    disabled={loading}
                    style={{ minWidth: "150px" }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-lg"
                    style={{
                      backgroundColor: "#273c75",
                      borderColor: "#273c75",
                      color: "white",
                      minWidth: "180px",
                    }}
                    disabled={loading}
                  >
                    {loading ? (isEditMode ? "Updating..." : "Creating...") : 
                     (isEditMode ? "Update Amenity" : "Create Amenity")}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Helper Information */}
          {/* <div className="row mt-4">
            <div className="col-md-8 offset-md-2">
              <div className="alert alert-info" style={{ backgroundColor: '#e8f4fd', borderColor: '#b8e1ff' }}>
                <h6 className="alert-heading mb-2">📋 Amenity Information</h6>
                <p className="mb-0 small">
                  Amenities are used to describe features and facilities available at properties.
                  Common examples include: Swimming Pool, Gym, Parking, Wi-Fi, Air Conditioning, etc.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AddEditAmenities;