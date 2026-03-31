
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import "bootstrap/dist/css/bootstrap.min.css";

const AddBookingSlab = () => {
  const [formData, setFormData] = useState({
    min_value: "",
    max_value: "",
    booking_amount: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.min_value || !formData.booking_amount) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all required fields",
        confirmButtonColor: "#6C63FF",
      });
      return;
    }

    if (
      formData.max_value &&
      parseFloat(formData.max_value) <= parseFloat(formData.min_value)
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Max value must be greater than Min value",
        confirmButtonColor: "#6C63FF",
      });
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${baseurl}/booking-slabs/`, {
        min_value: formData.min_value,
        max_value: formData.max_value || null,
        booking_amount: formData.booking_amount,
      });

      // SUCCESS SWEETALERT
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Booking Slab added successfully",
        confirmButtonColor: "#6C63FF",
        confirmButtonText: "OK",
      }).then(() => navigate("/a-bookingslab"));
    } catch (error) {
      console.error("Error submitting form:", error);

      // ERROR SWEETALERT
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.detail || "Failed to add booking slab",
        confirmButtonColor: "#6C63FF",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container my-4">
        <div className="card p-4">
          <h4 className="text-center mb-4">Add Booking Slab</h4>

          <form onSubmit={handleSubmit}>
            {/* All Fields in One Row */}
            <div className="row mb-3">
              {/* Min Value */}
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">
                    Min Value <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    name="min_value"
                    value={formData.min_value}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter minimum value"
                    min="0"
                    step="0.01"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Max Value */}
              <div className="col-md-4">
                <div className="mb-1">
                  <label className="form-label">Max Value</label>
                  <input
                    type="number"
                    name="max_value"
                    value={formData.max_value}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter maximum value (optional)"
                    min={formData.min_value || "0"}
                    step="0.01"
                    disabled={loading}
                  />
                  <small className="text-muted">
                    Leave empty for "and above"
                  </small>
                </div>
              </div>

              {/* Booking Amount */}
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">
                    Booking Amount <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    name="booking_amount"
                    value={formData.booking_amount}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter booking amount"
                    min="0"
                    step="0.01"
                    required
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
                    onClick={() => navigate("/a-bookingslab")}
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
                    {loading ? "Adding..." : "Add Booking Slab"}
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

export default AddBookingSlab;
