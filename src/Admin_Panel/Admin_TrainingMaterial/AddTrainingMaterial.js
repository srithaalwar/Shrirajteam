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
          <h4 className="text-center mb-3">Add Training Material</h4>

          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-3"
              placeholder="Title"
              required
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <select
              className="form-select mb-3"
              required
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

            <textarea
              className="form-control mb-3"
              rows="4"
              placeholder="Description"
              required
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <input
              type="file"
              accept="video/mp4"
              className="form-control mb-3"
              required
              onChange={(e) => setVideoFile(e.target.files[0])}
            />

            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate(-1)}
              >
                Back
              </button>

              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Uploading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddTrainingMaterial;
