import React, { useState, useEffect } from "react";
import { baseurl } from "../../BaseURL/BaseURL";
import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function EditTrainingMaterial() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const material = state?.material;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    if (material) {
      setFormData({
        title: material.title,
        description: material.description,
      });
    }
  }, [material]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (videoFile) data.append("video", videoFile);

    try {
      await axios.put(
        `${baseurl}/training-materials/${material.id}/`,
        data
      );
      Swal.fire("Updated", "Material updated", "success");
      navigate("/admin-trainingmaterial");
    } catch {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  if (!material) return null;

  return (
    <>
      <AdminNavbar />
      <div className="container my-4">
        <div className="card p-4">
          <h4 className="text-center mb-3">Edit Training Material</h4>

          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-3"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />

            <textarea
              className="form-control mb-3"
              rows="4"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />

            <video
              controls
              className="mb-3 w-100"
              src={`${baseurl}/${material.video}`}
            />

            <input
              type="file"
              accept="video/mp4"
              className="form-control mb-3"
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
              <button className="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditTrainingMaterial;
