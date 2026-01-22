import React, { useEffect, useState } from "react";
import { baseurl } from "../../BaseURL/BaseURL";
import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function AddTrainingMaterial() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    description: "",
  });

  const [departments, setDepartments] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${baseurl}/departments/`).then((res) => {
      setDepartments(res.data?.results || []); // ✅ pagination
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("department", formData.department);
    data.append("description", formData.description);
    data.append("video", videoFile);

    try {
      await axios.post(`${baseurl}/training-materials/`, data);
      Swal.fire("Success", "Material added", "success");
      navigate("/admin-trainingmaterial");
    } catch {
      Swal.fire("Error", "Upload failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container my-4">
        <div className="card p-4">
          <h4 className="text-center mb-4">Add Training Material</h4>

          <form onSubmit={handleSubmit}>
            {/* First Row: Title and Department in two columns */}
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Title *</label>
                  <input
                    className="form-control"
                    placeholder="Enter title"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Department *</label>
                  <select
                    className="form-select"
                    required
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                  >
                    <option value="">Select Department</option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Second Row: Description (full width) */}
            <div className="row mb-3">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">Description *</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Enter description"
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Third Row: Video Upload (full width) */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">Video File *</label>
                  <input
                    type="file"
                    accept="video/mp4"
                    className="form-control"
                    required
                    onChange={(e) => setVideoFile(e.target.files[0])}
                  />
                  <small className="text-muted">Only MP4 files are allowed</small>
                </div>
              </div>
            </div>

            {/* Fourth Row: Buttons */}
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>

                  <button 
                    className="btn"
                    style={{
                      backgroundColor: '#273c75',
                      borderColor: '#273c75',
                      color: 'white'
                    }}
                    disabled={loading}
                  >
                    {loading ? "Uploading..." : "Submit"}
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

export default AddTrainingMaterial;