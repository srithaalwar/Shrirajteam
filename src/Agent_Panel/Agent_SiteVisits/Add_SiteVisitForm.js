import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../BaseURL/BaseURL";
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import "./Add_SiteVisitForm.css"; // Create this CSS file

function AddSitevisit() {
  const navigate = useNavigate();
  const agentId = localStorage.getItem("user_id");

  const [agents, setAgents] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    agent_id: "",
    site_name: "",
    site_owner_name: "",
    site_owner_mobile_number: "",
    user_id: agentId,
    site_location: "",
    customer_name: "",
    customer_mobile_number: "",
    remarks: "",
    site_photo: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

 useEffect(() => {
  const fetchAgents = async () => {
    try {
      const referralId = localStorage.getItem('referral_id');
      if (referralId) {
        // Fixed: Added proper URL formatting
        const response = await axios.get(`${baseurl}/users/search/?referred_by=${referralId}`);
        
        console.log("API Response:", response.data); // Add this for debugging
        
        // Fixed: Access the 'results' array instead of 'agents'
        const agentsList = response.data.results.map(agent => ({
          id: agent.user_id,
          name: `${agent.first_name} ${agent.last_name || ''}`.trim(),
          referral_id: agent.referral_id
        }));
        
        console.log("Processed agents:", agentsList); // Add this for debugging
        
        setAgents(agentsList);
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
      console.error("Error details:", error.response?.data);
    }
  };

  fetchAgents();
}, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.site_name) newErrors.site_name = "Site name is required";
    if (!formData.agent_id) newErrors.agent_id = "Agent is required";
    
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
    
    // Clear error when user starts typing
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
          payload.append(key, value);
        }
      });

      await axios.post(`${baseurl}/site-visits/`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Site Visit added successfully!");
      navigate("/agent-site-visits");
    } catch (error) {
      console.error("Error adding site visit:", error.response?.data || error);
      alert("Failed to add site visit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AgentNavbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="card shadow">
              <div className="card-header ">
                <h2 className="mb-0 text-center">Add Site Visit</h2>
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

                    {/* Agent ID */}
                    <div className="col-md-4">
                      <label htmlFor="agent_id" className="form-label fw-bold">
                        Agent ID <span className="text-danger">*</span>
                      </label>
                      <select
                        className={`form-select ${errors.agent_id ? "is-invalid" : ""}`}
                        id="agent_id"
                        name="agent_id"
                        value={formData.agent_id}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Agent</option>
                        {agents.map((agent) => (
                          <option key={agent.id} value={agent.id}>
                            {agent.name} - {agent.referral_id}
                          </option>
                        ))}
                      </select>
                      {errors.agent_id && (
                        <div className="invalid-feedback">{errors.agent_id}</div>
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

                    {/* Photo Upload */}
                    <div className="col-md-4">
                      <label htmlFor="site_photo" className="form-label fw-bold">
                        Site Photo
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="site_photo"
                        name="site_photo"
                        onChange={handleChange}
                        accept="image/*"
                      />
                      {formData.site_photo && (
                        <small className="text-muted mt-1 d-block">
                          Selected: {formData.site_photo.name}
                        </small>
                      )}
                    </div>

                    {/* Remarks */}
                    <div className="col-12">
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
                  </div>

                  {/* Submit Button */}
                  <div className="text-center mt-4">
                   <button
  type="submit"
  className="btn px-5 py-2"
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
      Submitting...
    </>
  ) : (
    "Submit"
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

export default AddSitevisit;