import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import "bootstrap/dist/css/bootstrap.min.css";

const AddSetting = () => {
  const [formData, setFormData] = useState({
    key: "",
    value: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 // In AddSetting.js - update the handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation code remains the same...

  setLoading(true);

  try {
    // Convert value to appropriate type (number if numeric)
    let processedValue = formData.value;
    
    const valueAsString = String(formData.value).trim();
    if (valueAsString !== '' && !isNaN(valueAsString)) {
      processedValue = Number(valueAsString);
    }

    console.log('Adding setting with payload:', {
      key: formData.key,
      value: processedValue
    });

    const response = await axios.post(`${baseurl}/settings/`, {
      key: formData.key,
      value: processedValue,
    });

    console.log('Add response:', response.data);

    // Check if addition was successful
    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Setting added successfully",
        confirmButtonColor: "#273c75",
        confirmButtonText: "OK",
      }).then(() => navigate("/a-settings"));
    } else {
      throw new Error("Unexpected response status");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    
    let errorMessage = "Failed to add setting";
    
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      
      if (error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
        }
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

  // Predefined setting suggestions
  const settingSuggestions = [
    { key: "REFERRAL_AMOUNT", value: 10, description: "Amount for referrals" },
//     { key: "SIGNUP_BONUS", value: 50, description: "Bonus on signup" },
//     { key: "MAX_WITHDRAW_LIMIT", value: 5000, description: "Maximum withdrawal limit" },
//     { key: "MIN_DEPOSIT_AMOUNT", value: 100, description: "Minimum deposit amount" },
//     { key: "TAX_PERCENTAGE", value: 5, description: "Tax percentage on transactions" },
//     { key: "MAINTENANCE_MODE", value: false, description: "Enable/disable maintenance" },
  ];

  const applySuggestion = (suggestion) => {
    setFormData({
      key: suggestion.key,
      value: String(suggestion.value), // Convert to string for input field
    });
  };

  return (
    <>
      <AdminNavbar />

      <div className="container my-4">
        <div className="card p-4">
          <h4 className="text-center mb-4">Add New Setting</h4>

          {/* Quick suggestions */}
          <div className="mb-4">
            <label className="form-label fw-bold">Quick Templates:</label>
            <div className="d-flex flex-wrap gap-2">
              {settingSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  className="btn btn-sm"
                  style={{
                    backgroundColor: "#f0f2f5",
                    border: "1px solid #ddd",
                    color: "#333"
                  }}
                  onClick={() => applySuggestion(suggestion)}
                >
                  {suggestion.key}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Key Field */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Setting Key <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="key"
                    value={formData.key}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="e.g., REFERRAL_AMOUNT"
                    style={{ textTransform: 'uppercase' }}
                    required
                    disabled={loading}
                  />
                  <small className="text-muted">
                    Use uppercase letters, numbers, and underscores only
                  </small>
                </div>
              </div>

              {/* Value Field */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Setting Value <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter value (number or text)"
                    required
                    disabled={loading}
                  />
                  <small className="text-muted">
                    Numeric values will be stored as numbers
                  </small>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="row mt-3">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/a-settings")}
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
                    {loading ? "Adding..." : "Add Setting"}
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

export default AddSetting;