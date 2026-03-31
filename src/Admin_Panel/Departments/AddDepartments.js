



import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from '../../BaseURL/BaseURL';
import "bootstrap/dist/css/bootstrap.min.css";
import './Departments.css'
const AddDepartments = () => {
  const [formData, setFormData] = useState({ 
    deptName: "" 
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.deptName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter department name",
        confirmButtonColor: "#6C63FF",
      });
      return;
    }

    setLoading(true);
    
    try {
      await axios.post(`${baseurl}/departments/`, {
        name: formData.deptName.trim(),
      });

      // SUCCESS SWEETALERT
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Department created successfully",
        confirmButtonColor: "#6C63FF",
        confirmButtonText: "OK",
      }).then(() => navigate("/a-departments"));

    } catch (err) {
      console.error("Error posting:", err);
      
      // ERROR SWEETALERT
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.detail || "Failed to add department",
        confirmButtonColor: "#6C63FF",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      
      <div className="container my-4 department-div">
        <div className="card p-4">
          <h4 className="text-center mb-4">Add Department</h4>

          <form onSubmit={handleSubmit}>
            {/* Department Name Field */}
            <div className="row mb-3">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">
                    Department Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="deptName"
                    value={formData.deptName}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter department name"
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
                    onClick={() => navigate("/a-departments")}
                    disabled={loading}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn"
                    style={{
                      backgroundColor: '#273c75',
                      borderColor: '#273c75',
                      color: 'white',
                      minWidth: '150px'
                    }}
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add Department"}
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

export default AddDepartments;