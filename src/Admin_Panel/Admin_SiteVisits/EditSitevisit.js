
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import { baseurl } from '../../BaseURL/BaseURL';
import Swal from "sweetalert2";
// import "./EditSitevisit.css";

function AdminEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const agentId = localStorage.getItem("user_id");

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    user_id: agentId,
    site_name: "",
    site_owner_name: "",
    site_owner_mobile_number: "",
    site_owner_email: "",
    site_location: "",
    customer_name: "",
    customer_mobile_number: "",
    remarks: "",
    site_photo: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [existingPhotoUrl, setExistingPhotoUrl] = useState("");
  const [newPhotoSelected, setNewPhotoSelected] = useState(false);

  // Helper function to convert date from DD-MM-YYYY to YYYY-MM-DD
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    
    // Remove any time portion
    const dateOnly = dateStr.split(' ')[0];
    
    if (dateOnly.includes("-")) {
      const parts = dateOnly.split("-");
      if (parts.length === 3) {
        // Check format
        if (parts[0].length === 2) {
          // DD-MM-YYYY format
          const [day, month, year] = parts;
          return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        } else if (parts[0].length === 4) {
          // YYYY-MM-DD format
          return dateOnly;
        }
      }
    }
    return dateStr;
  };

  // Helper function to convert date from YYYY-MM-DD to DD-MM-YYYY
  const formatDateForBackend = (dateStr) => {
    if (!dateStr) return "";
    
    // Remove any time portion
    const dateOnly = dateStr.split('T')[0];
    
    if (dateOnly.includes("-")) {
      const [year, month, day] = dateOnly.split("-");
      return `${day}-${month}-${year}`;
    }
    return dateStr;
  };

  const fetchSiteVisit = async () => {
    try {
      const response = await axios.get(`${baseurl}/site-visits/${id}/`);
      const data = response.data;
      
      console.log("Fetched site visit data:", data);

      // Format date for input field
      const formattedDate = formatDateForInput(data.date);
      console.log("Formatted date for input:", formattedDate);

      // Format time for input field (HH:MM)
      let formattedTime = "";
      if (data.time) {
        const timeParts = data.time.split(":");
        if (timeParts.length >= 2) {
          formattedTime = `${timeParts[0].padStart(2, '0')}:${timeParts[1].padStart(2, '0')}`;
        } else {
          formattedTime = data.time;
        }
      }

      // Store existing photo URL for display
      let photoUrl = "";
      if (data.site_photo) {
        photoUrl = data.site_photo.startsWith("http")
          ? data.site_photo
          : data.site_photo.startsWith("/media/")
          ? `${baseurl}${data.site_photo}`
          : `${baseurl}/media/${data.site_photo}`;
        setExistingPhotoUrl(photoUrl);
      }

      setFormData({
        date: formattedDate,
        time: formattedTime,
        user_id: data.agent_id || data.user_id || agentId,
        site_name: data.site_name || "",
        site_owner_name: data.site_owner_name || "",
        site_owner_mobile_number: data.site_owner_mobile_number || "",
        site_owner_email: data.site_owner_email || "",
        site_location: data.site_location || "",
        customer_name: data.customer_name || "",
        customer_mobile_number: data.customer_mobile_number || "",
        remarks: data.remarks || "",
        site_photo: null,
      });
      
      setNewPhotoSelected(false);
    } catch (error) {
      console.error("Error fetching site visit:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load site visit details",
        confirmButtonColor: "#273c75",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSiteVisit();
    }
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date.trim()) newErrors.date = "Date is required";
    if (!formData.time.trim()) newErrors.time = "Time is required";
    if (!formData.site_name.trim()) newErrors.site_name = "Site name is required";
    
    // Mobile number validation
    const mobileRegex = /^[0-9]{10}$/;
    if (formData.site_owner_mobile_number && !mobileRegex.test(formData.site_owner_mobile_number)) {
      newErrors.site_owner_mobile_number = "Invalid mobile number (10 digits required)";
    }
    if (formData.customer_mobile_number && !mobileRegex.test(formData.customer_mobile_number)) {
      newErrors.customer_mobile_number = "Invalid mobile number (10 digits required)";
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.site_owner_email && !emailRegex.test(formData.site_owner_email)) {
      newErrors.site_owner_email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "site_photo") {
      if (files && files[0]) {
        const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        if (!validTypes.includes(files[0].type)) {
          setErrors(prev => ({
            ...prev,
            site_photo: "Please upload a valid image (JPEG, PNG, GIF, WebP)"
          }));
          return;
        }
        
        if (files[0].size > 5 * 1024 * 1024) {
          setErrors(prev => ({
            ...prev,
            site_photo: "Image size should be less than 5MB"
          }));
          return;
        }
        
        setErrors(prev => ({ ...prev, site_photo: "" }));
        setFormData(prev => ({ ...prev, [name]: files[0] }));
        setNewPhotoSelected(true);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: "" }));
      }
    }
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({ ...prev, site_photo: null }));
    setExistingPhotoUrl("");
    setNewPhotoSelected(false);
    
    // Clear file input
    const fileInput = document.querySelector('input[name="site_photo"]');
    if (fileInput) fileInput.value = '';
    
    // Clear any photo errors
    if (errors.site_photo) {
      setErrors(prev => ({ ...prev, site_photo: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const payload = new FormData();
      
      // Format date for backend (DD-MM-YYYY)
      if (formData.date) {
        const backendDate = formatDateForBackend(formData.date);
        console.log("Date for backend:", backendDate);
        payload.append("date", backendDate);
      }
      
      // Handle time format (ensure it's in HH:MM:SS format)
      let timeValue = formData.time;
      if (timeValue) {
        const timeParts = timeValue.split(":");
        if (timeParts.length === 2) {
          // Add seconds if not present
          timeValue = `${timeValue}:00`;
        }
      }
      
      payload.append("time", timeValue || "");
      payload.append("agent_id", formData.user_id);
      payload.append("site_name", formData.site_name || "");
      payload.append("site_owner_name", formData.site_owner_name || "");
      payload.append("site_owner_mobile_number", formData.site_owner_mobile_number || "");
      payload.append("site_owner_email", formData.site_owner_email || "");
      payload.append("site_location", formData.site_location || "");
      payload.append("customer_name", formData.customer_name || "");
      payload.append("customer_mobile_number", formData.customer_mobile_number || "");
      payload.append("remarks", formData.remarks || "");
      
      // Handle site_photo properly
      if (formData.site_photo instanceof File) {
        // User selected a new file
        payload.append("site_photo", formData.site_photo);
      } else if (formData.site_photo === null && !existingPhotoUrl) {
        // User removed the photo (no existing photo and no new photo)
        payload.append("site_photo", "");
      }
      // If formData.site_photo is null but existingPhotoUrl exists,
      // don't append anything (Django will keep existing photo)

      // Debug: Log FormData contents
      console.log("Submitting FormData:");
      for (let [key, value] of payload.entries()) {
        console.log(key, value instanceof File ? `${value.name} (File)` : value);
      }

      await axios.put(`${baseurl}/site-visits/${id}/`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Site visit updated successfully",
        confirmButtonColor: "#273c75",
        confirmButtonText: "OK",
      }).then(() => navigate("/admin-sitevisit"));
    } catch (error) {
      console.error("Error updating site visit:", error.response?.data || error);
      
      let errorMessage = "An error occurred while updating the site visit";
      if (error.response?.data) {
        // Handle photo-specific error
        if (error.response.data.site_photo) {
          errorMessage = `Photo error: ${error.response.data.site_photo}`;
        } 
        // Handle other field errors
        else if (typeof error.response.data === 'object') {
          errorMessage = Object.entries(error.response.data)
            .map(([field, err]) => `${field}: ${Array.isArray(err) ? err.join(', ') : err}`)
            .join('\n');
        } else if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        }
      }
      
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        html: `<div style="text-align: left; max-height: 200px; overflow-y: auto;">${errorMessage}</div>`,
        confirmButtonColor: "#273c75",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="container my-4">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading site visit data...</p>
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
          <h4 className="text-center mb-4">Edit Site Visit</h4>

          <form onSubmit={handleSubmit}>
            {/* First Row */}
            <div className="row mb-3">
              {/* Date */}
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">
                    Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`form-control ${errors.date ? "is-invalid" : ""}`}
                    required
                    disabled={submitting}
                  />
                  {errors.date && (
                    <div className="invalid-feedback">{errors.date}</div>
                  )}
                </div>
              </div>

              {/* Time */}
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">
                    Time <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`form-control ${errors.time ? "is-invalid" : ""}`}
                    required
                    disabled={submitting}
                  />
                  {errors.time && (
                    <div className="invalid-feedback">{errors.time}</div>
                  )}
                </div>
              </div>

              {/* Site Name */}
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">
                    Site Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="site_name"
                    value={formData.site_name}
                    onChange={handleChange}
                    className={`form-control ${errors.site_name ? "is-invalid" : ""}`}
                    placeholder="Enter site name"
                    required
                    disabled={submitting}
                  />
                  {errors.site_name && (
                    <div className="invalid-feedback">{errors.site_name}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Second Row */}
            <div className="row mb-3">
              {/* Site Owner Name */}
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Site Owner Name</label>
                  <input
                    type="text"
                    name="site_owner_name"
                    value={formData.site_owner_name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter site owner name"
                    disabled={submitting}
                  />
                </div>
              </div>

              {/* Site Owner Mobile */}
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Site Owner Mobile</label>
                  <input
                    type="tel"
                    name="site_owner_mobile_number"
                    value={formData.site_owner_mobile_number}
                    onChange={handleChange}
                    className={`form-control ${errors.site_owner_mobile_number ? "is-invalid" : ""}`}
                    placeholder="Enter 10-digit mobile number"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    disabled={submitting}
                  />
                  {errors.site_owner_mobile_number && (
                    <div className="invalid-feedback">{errors.site_owner_mobile_number}</div>
                  )}
                </div>
              </div>

              {/* Site Owner Email */}
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Site Owner Email</label>
                  <input
                    type="email"
                    name="site_owner_email"
                    value={formData.site_owner_email}
                    onChange={handleChange}
                    className={`form-control ${errors.site_owner_email ? "is-invalid" : ""}`}
                    placeholder="Enter email address"
                    disabled={submitting}
                  />
                  {errors.site_owner_email && (
                    <div className="invalid-feedback">{errors.site_owner_email}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Third Row */}
            <div className="row mb-3">
              {/* Site Location */}
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Site Location</label>
                  <input
                    type="text"
                    name="site_location"
                    value={formData.site_location}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter site location"
                    disabled={submitting}
                  />
                </div>
              </div>

              {/* Customer Name */}
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Customer Name</label>
                  <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter customer name"
                    disabled={submitting}
                  />
                </div>
              </div>

              {/* Customer Mobile */}
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Customer Mobile</label>
                  <input
                    type="tel"
                    name="customer_mobile_number"
                    value={formData.customer_mobile_number}
                    onChange={handleChange}
                    className={`form-control ${errors.customer_mobile_number ? "is-invalid" : ""}`}
                    placeholder="Enter 10-digit mobile number"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    disabled={submitting}
                  />
                  {errors.customer_mobile_number && (
                    <div className="invalid-feedback">{errors.customer_mobile_number}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Remarks Row */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">Remarks</label>
                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    className="form-control"
                    rows="2"
                    placeholder="Enter any remarks"
                    disabled={submitting}
                  />
                </div>
              </div>
            </div>

            {/* Photo Row */}
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Site Photo</label>
                  <input
                    type="file"
                    name="site_photo"
                    onChange={handleChange}
                    className={`form-control ${errors.site_photo ? "is-invalid" : ""}`}
                    accept="image/*"
                    disabled={submitting}
                  />
                  {errors.site_photo && (
                    <div className="invalid-feedback">{errors.site_photo}</div>
                  )}
                  <small className="text-muted">
                    Max file size: 5MB. Accepted formats: JPEG, PNG, GIF, WebP
                  </small>
                  
                  {/* Photo actions */}
                  <div className="mt-2">
                    {(existingPhotoUrl || formData.site_photo) && (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger me-2"
                        onClick={handleRemovePhoto}
                        disabled={submitting}
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Photo Previews */}
              <div className="col-md-6">
                {/* Existing Photo Preview */}
                {existingPhotoUrl && !newPhotoSelected && (
                  <div className="mb-3">
                    <label className="form-label">Existing Photo</label>
                    <div className="existing-photo-preview">
                      <img
                        src={existingPhotoUrl}
                        alt="Site"
                        className="existing-photo-img"
                        style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover' }}
                      />
                      <p className="text-muted mt-1">Current photo</p>
                    </div>
                  </div>
                )}
                
                {/* New Photo Preview */}
                {formData.site_photo && newPhotoSelected && (
                  <div className="mb-3">
                    <label className="form-label">New Photo Preview</label>
                    <div className="new-photo-preview">
                      <img
                        src={URL.createObjectURL(formData.site_photo)}
                        alt="Preview"
                        className="new-photo-img"
                        style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover' }}
                      />
                      <p className="text-muted mt-1">New photo selected</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* File Info */}
            {formData.site_photo && newPhotoSelected && (
              <div className="alert alert-info mb-4">
                <i className="fas fa-info-circle me-2"></i>
                New file selected: <strong>{formData.site_photo.name}</strong>
                <span className="ms-3 text-muted">
                  ({Math.round(formData.site_photo.size / 1024)} KB)
                </span>
              </div>
            )}
            
            {/* Warning if photo will be removed */}
            {!existingPhotoUrl && !formData.site_photo && (
              <div className="alert alert-warning mb-4">
                <i className="fas fa-exclamation-triangle me-2"></i>
                No photo selected. The site visit will have no photo after update.
              </div>
            )}

            {/* Buttons */}
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin-sitevisit")}
                    disabled={submitting}
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
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Updating...
                      </>
                    ) : "Update Site Visit"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminEdit;