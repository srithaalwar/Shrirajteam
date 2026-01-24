import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";

function EditCommissionLevels() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    level_no: "",
    percentage: "",
  });

  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    axios
      .get(`${baseurl}/commissions-master/${id}/`)
      .then((res) => {
        const data = res.data;
        setFormData({
          level_no: data.level_no?.toString() || "",
          percentage: data.percentage?.toString() || "",
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Load Failed",
          text: "Failed to load commission level data.",
          confirmButtonColor: "#6C63FF",
        });
      });
  }, [id]);

  /* ================= CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.level_no || !formData.percentage) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all required fields",
        confirmButtonColor: "#6C63FF",
      });
      return;
    }

    if (Number(formData.level_no) < 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Level No cannot be negative",
        confirmButtonColor: "#6C63FF",
      });
      return;
    }

    if (
      Number(formData.percentage) < 0 ||
      Number(formData.percentage) > 100
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Percentage must be between 0 and 100",
        confirmButtonColor: "#6C63FF",
      });
      return;
    }

    setLoading(true);

    try {
      await axios.put(`${baseurl}/commissions-master/${id}/`, {
        level_no: Number(formData.level_no),
        percentage: Number(formData.percentage),
      });

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Commission level updated successfully",
        confirmButtonColor: "#6C63FF",
        confirmButtonText: "OK",
      }).then(() => navigate("/admin-commissionmaster"));
    } catch (error) {
      console.error("Update failed:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.detail ||
          "Failed to update commission level",
        confirmButtonColor: "#6C63FF",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="container my-5 text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">Loading commission level data...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />

      <div className="container my-4">
        <div className="card p-4">
          <h4 className="text-center mb-4">Edit Commission Level</h4>

          <form onSubmit={handleSubmit}>
            {/* All Fields in One Row */}
            <div className="row mb-3">
              {/* Level No */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Level No <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    name="level_no"
                    value={formData.level_no}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter level number"
                    min="0"
                    step="1"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Percentage */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Percentage <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    name="percentage"
                    value={formData.percentage}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter percentage"
                    min="0"
                    max="100"
                    step="0.01"
                    required
                    disabled={loading}
                  />
                  <small className="text-muted">
                    Enter value like 10 for 10%
                  </small>
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
                    onClick={() => navigate("/admin-commissionmaster")}
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
                    {loading ? "Updating..." : "Update Commission Level"}
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

export default EditCommissionLevels;
