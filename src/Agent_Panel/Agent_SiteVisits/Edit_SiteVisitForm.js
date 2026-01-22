import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseurl } from "../../BaseURL/BaseURL";
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import "./Edit_SiteVisitForm.css"; // Create this CSS file

function EditSitevisit() {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSiteVisit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseurl}/site-visits/${id}/`);
      const data = response.data;
      
      setFormData({
        date: data.date || "",
        time: data.time || "",
        user_id: agentId,
        site_name: data.site_name || "",
        site_owner_name: data.site_owner_name || "",
        site_owner_mobile_number: data.site_owner_mobile_number || "",
        site_owner_email: data.site_owner_email || "",
        site_location: data.site_location || "",
        customer_name: data.customer_name || "",
        customer_mobile_number: data.customer_mobile_number || "",
        remarks: data.remarks || "",
        site_photo: data.site_photo || null,
      });
    } catch (error) {
      console.error("Error fetching site visit:", error);
      alert("Failed to fetch site visit data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteVisit();
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.site_name) newErrors.site_name = "Site name is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          if (key === "user_id") {
            payload.append("agent_id", parseInt(value));
          } else {
            payload.append(key, value);
          }
        }
      });

      await axios.put(`${baseurl}/site-visits/${id}/`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Site Visit updated successfully!");
      navigate("/agent-site-visits");
    } catch (error) {
      console.error("Error updating site visit:", error.response?.data || error);
      alert("Failed to update site visit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <AgentNavbar />
        <div className="container mt-5">
          <div className="text-center">
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
      <AgentNavbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="card shadow">
              <div className="card-header text-dark">
                <h2 className="mb-0 text-center">Edit Site Visit</h2>
              </div>
              
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    {/* Date */}
                    <div className="col-md-4">
                      <label htmlFor="date" className="form-label fw-bold">
                        Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className={`form-control ${errors.date ? "is-invalid" : ""}`}
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                      {errors.date && (
                        <div className="invalid-feedback">{errors.date}</div>
                      )}
                    </div>

                    {/* Time */}
                    <div className="col-md-4">
                      <label htmlFor="time" className="form-label fw-bold">
                        Time <span className="text-danger">*</span>
                      </label>
                      <input
                        type="time"
                        className={`form-control ${errors.time ? "is-invalid" : ""}`}
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                      />
                      {errors.time && (
                        <div className="invalid-feedback">{errors.time}</div>
                      )}
                    </div>

                    {/* Site Name */}
                    <div className="col-md-4">
                      <label htmlFor="site_name" className="form-label fw-bold">
                        Site Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.site_name ? "is-invalid" : ""}`}
                        id="site_name"
                        name="site_name"
                        value={formData.site_name}
                        onChange={handleChange}
                        required
                      />
                      {errors.site_name && (
                        <div className="invalid-feedback">{errors.site_name}</div>
                      )}
                    </div>

                    {/* Site Owner Name */}
                    <div className="col-md-4">
                      <label htmlFor="site_owner_name" className="form-label fw-bold">
                        Site Owner Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="site_owner_name"
                        name="site_owner_name"
                        value={formData.site_owner_name}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Site Owner Mobile */}
                    <div className="col-md-4">
                      <label htmlFor="site_owner_mobile_number" className="form-label fw-bold">
                        Site Owner Mobile Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="site_owner_mobile_number"
                        name="site_owner_mobile_number"
                        value={formData.site_owner_mobile_number}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Site Owner Email */}
                    <div className="col-md-4">
                      <label htmlFor="site_owner_email" className="form-label fw-bold">
                        Site Owner Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="site_owner_email"
                        name="site_owner_email"
                        value={formData.site_owner_email}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Site Location */}
                    <div className="col-md-4">
                      <label htmlFor="site_location" className="form-label fw-bold">
                        Site Location
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="site_location"
                        name="site_location"
                        value={formData.site_location}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Customer Name */}
                    <div className="col-md-4">
                      <label htmlFor="customer_name" className="form-label fw-bold">
                        Customer Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="customer_name"
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Customer Mobile */}
                    <div className="col-md-4">
                      <label htmlFor="customer_mobile_number" className="form-label fw-bold">
                        Customer Mobile Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="customer_mobile_number"
                        name="customer_mobile_number"
                        value={formData.customer_mobile_number}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Remarks */}
                    <div className="col-md-4">
                      <label htmlFor="remarks" className="form-label fw-bold">
                        Remarks
                      </label>
                      <textarea
                        className="form-control"
                        id="remarks"
                        name="remarks"
                        rows="3"
                        value={formData.remarks}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Photo Upload */}
                    <div className="col-md-8">
                      <label htmlFor="site_photo" className="form-label fw-bold">
                        Site Photo
                      </label>
                      <div className="d-flex align-items-start gap-3">
                        <input
                          type="file"
                          className="form-control"
                          id="site_photo"
                          name="site_photo"
                          onChange={handleChange}
                          accept="image/*"
                          style={{ maxWidth: "300px" }}
                        />
                        
                        {/* Show existing image */}
                        {formData.site_photo && typeof formData.site_photo === "string" && (
                          <div className="existing-photo">
                            <p className="mb-1"><small>Current Photo:</small></p>
                            <img
                              src={formData.site_photo.startsWith("http")
                                ? formData.site_photo
                                : `${baseurl}${formData.site_photo}`}
                              alt="Site"
                              className="existing-image"
                            />
                          </div>
                        )}
                      </div>
                      
                      {/* Show new file name */}
                      {formData.site_photo && typeof formData.site_photo === "object" && (
                        <small className="text-muted mt-1 d-block">
                          New file: {formData.site_photo.name}
                        </small>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center mt-4">
                   <button
  type="submit"
  className="btn btn-warning px-5 py-2"
  disabled={isSubmitting}
  style={{
    backgroundColor: '#273c75',
    borderColor: '#273c75',
    color: 'white'
  }}
>
  {isSubmitting ? (
    <>
      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      Updating...
    </>
  ) : (
    "Update"
  )}
</button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary ms-3 px-5 py-2"
                      onClick={() => navigate("/agent-site-visits")}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditSitevisit;