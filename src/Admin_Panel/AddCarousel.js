import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Admin_Panel/Admin_Navbar/Admin_Navbar";
import { baseurl } from "../BaseURL/BaseURL";
import "bootstrap/dist/css/bootstrap.min.css";

const AddCarousel = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    order: "",
    active: true,
    image: null,
    video: null
  });

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [mediaType, setMediaType] = useState("image"); // 'image' or 'video'

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB for images)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File too large",
          text: "Please select an image smaller than 5MB",
          confirmButtonColor: "#273c75",
        });
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Invalid file type",
          text: "Please select a valid image (JPEG, PNG, GIF, WebP)",
          confirmButtonColor: "#273c75",
        });
        return;
      }

      setFormData({ ...formData, image: file, video: null });
      setMediaType("image");
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setVideoPreview(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 20MB for videos)
      if (file.size > 20 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File too large",
          text: "Please select a video smaller than 20MB",
          confirmButtonColor: "#273c75",
        });
        return;
      }

      // Validate file type
      const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
      if (!validTypes.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Invalid file type",
          text: "Please select a valid video (MP4, WebM, OGG, MOV)",
          confirmButtonColor: "#273c75",
        });
        return;
      }

      setFormData({ ...formData, video: file, image: null });
      setMediaType("video");
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result);
        setImagePreview(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter carousel title",
        confirmButtonColor: "#273c75",
      });
      return;
    }

    if (!formData.image && !formData.video) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select either an image or a video",
        confirmButtonColor: "#273c75",
      });
      return;
    }

    setLoading(true);

    try {
      // Prepare form data for file upload
      const formDataObj = new FormData();
      formDataObj.append('title', formData.title.trim());
      
      if (formData.description) {
        formDataObj.append('description', formData.description.trim());
      }
      
      if (formData.link) {
        formDataObj.append('link', formData.link.trim());
      }
      
      if (formData.order) {
        formDataObj.append('order', formData.order);
      }
      
      formDataObj.append('active', formData.active);
      
      if (formData.image) {
        formDataObj.append('image', formData.image);
      }
      
      if (formData.video) {
        formDataObj.append('video', formData.video);
      }

      await axios.post(`${baseurl}/carousel/`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // SUCCESS SWEETALERT
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Carousel item created successfully",
        confirmButtonColor: "#273c75",
        confirmButtonText: "OK",
      }).then(() => navigate("/carousel-list")); // Change this to your carousel list route
    } catch (err) {
      console.error("Error creating carousel item:", err);
      
      // Handle validation errors
      let errorMessage = "Failed to create carousel item";
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

  const clearMediaSelection = () => {
    setFormData({
      ...formData,
      image: null,
      video: null
    });
    setImagePreview(null);
    setVideoPreview(null);
    setMediaType("image");
  };

  return (
    <>
      <AdminNavbar />

      <div className="container my-4">
        <div className="card p-4">
          <h4 className="text-center mb-4">Add Carousel Item</h4>

          <form onSubmit={handleSubmit}>
            {/* Title + Order in one row */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">
                  Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter carousel title"
                  required
                  disabled={loading}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Display Order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter display order (optional)"
                  min="0"
                  disabled={loading}
                />
                <small className="text-muted">Lower numbers display first</small>
              </div>
            </div>

            {/* Description */}
            <div className="row mb-3">
              <div className="col-12">
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

            {/* Link */}
            <div className="row mb-3">
              <div className="col-12">
                <label className="form-label">Link URL</label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="https://example.com (optional)"
                  disabled={loading}
                />
                <small className="text-muted">URL to navigate when carousel is clicked</small>
              </div>
            </div>

            {/* Media Type Selection */}
            <div className="row mb-3">
              <div className="col-12">
                <label className="form-label mb-2">Media Type</label>
                <div className="d-flex gap-4">
                  <div className="form-check">
                    <input
                      type="radio"
                      id="mediaImage"
                      name="mediaType"
                      value="image"
                      checked={mediaType === "image"}
                      onChange={(e) => {
                        setMediaType(e.target.value);
                        clearMediaSelection();
                      }}
                      className="form-check-input"
                      disabled={loading}
                    />
                    <label className="form-check-label" htmlFor="mediaImage">
                      Image
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="mediaVideo"
                      name="mediaType"
                      value="video"
                      checked={mediaType === "video"}
                      onChange={(e) => {
                        setMediaType(e.target.value);
                        clearMediaSelection();
                      }}
                      className="form-check-input"
                      disabled={loading}
                    />
                    <label className="form-check-label" htmlFor="mediaVideo">
                      Video
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            {mediaType === "image" && (
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">
                    Carousel Image <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="form-control"
                    accept="image/*"
                    disabled={loading}
                  />
                  <small className="text-muted">
                    Required. Max 5MB. Supported: JPEG, PNG, GIF, WebP
                  </small>
                </div>
                
                {imagePreview && (
                  <div className="col-md-6">
                    <label className="form-label">Preview</label>
                    <div className="icon-preview">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="img-thumbnail"
                        style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Video Upload */}
            {mediaType === "video" && (
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">
                    Carousel Video <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name="video"
                    onChange={handleVideoChange}
                    className="form-control"
                    accept="video/*"
                    disabled={loading}
                  />
                  <small className="text-muted">
                    Required. Max 20MB. Supported: MP4, WebM, OGG, MOV
                  </small>
                </div>
                
                {videoPreview && (
                  <div className="col-md-6">
                    <label className="form-label">Preview</label>
                    <div className="video-preview">
                      <video 
                        src={videoPreview} 
                        controls
                        className="img-thumbnail"
                        style={{ maxWidth: '200px', maxHeight: '150px' }}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Status Checkbox */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                    className="form-check-input"
                    id="isActive"
                    disabled={loading}
                  />
                  <label className="form-check-label" htmlFor="isActive">
                    Active Carousel Item
                  </label>
                </div>
                <small className="text-muted">
                  Inactive items won't be displayed on the website
                </small>
              </div>
            </div>

            {/* Buttons */}
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/carousel-list")} // Change this to your carousel list route
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
                    {loading ? "Creating..." : "Create Carousel Item"}
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

export default AddCarousel;