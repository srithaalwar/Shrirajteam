// import React, { useState, useEffect } from "react";
// import { baseurl } from "../../BaseURL/BaseURL";
// import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate, useLocation } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// function EditTrainingMaterial() {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const material = state?.material;

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//   });
//   const [videoFile, setVideoFile] = useState(null);

//   useEffect(() => {
//     if (material) {
//       setFormData({
//         title: material.title,
//         description: material.description,
//       });
//     }
//   }, [material]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("description", formData.description);
//     if (videoFile) data.append("video", videoFile);

//     try {
//       await axios.put(
//         `${baseurl}/training-materials/${material.id}/`,
//         data
//       );
//       Swal.fire("Updated", "Material updated", "success");
//       navigate("/admin-trainingmaterial");
//     } catch {
//       Swal.fire("Error", "Update failed", "error");
//     }
//   };

//   if (!material) return null;

//   return (
//     <>
//       <AdminNavbar />
//       <div className="container my-4">
//         <div className="card p-4">
//           <h4 className="text-center mb-3">Edit Training Material</h4>

//           <form onSubmit={handleSubmit}>
//             <input
//               className="form-control mb-3"
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//               required
//             />

//             <textarea
//               className="form-control mb-3"
//               rows="4"
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//               required
//             />

//             <video
//               controls
//               className="mb-3 w-100"
//               src={`${baseurl}/${material.video}`}
//             />

//             <input
//               type="file"
//               accept="video/mp4"
//               className="form-control mb-3"
//               onChange={(e) => setVideoFile(e.target.files[0])}
//             />

//             <div className="d-flex justify-content-between">
//               <button
//                 type="button"
//                 className="btn btn-outline-secondary"
//                 onClick={() => navigate(-1)}
//               >
//                 Back
//               </button>
//               <button className="btn btn-primary">Update</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default EditTrainingMaterial;



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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    
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
    } finally {
      setLoading(false);
    }
  };

  if (!material) return null;

  return (
    <>
      <AdminNavbar />
      <div className="container my-4">
        <div className="card p-4">
          <h4 className="text-center mb-4">Edit Training Material</h4>

          <form onSubmit={handleSubmit}>
            {/* First Row: Title and Current Video */}
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Title *</label>
                  <input
                    className="form-control"
                    value={formData.title}
                    placeholder="Enter title"
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Current Video</label>
                  <div className="border rounded p-2 text-center">
                    <video
                      controls
                      className="w-100"
                      src={`${baseurl}/${material.video}`}
                      style={{ maxHeight: "200px" }}
                    />
                    <small className="text-muted d-block mt-1">
                      Current uploaded video
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row: Description */}
            <div className="row mb-3">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">Description *</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={formData.description}
                    placeholder="Enter description"
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            {/* Third Row: New Video Upload */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">Upload New Video (Optional)</label>
                  <input
                    type="file"
                    accept="video/mp4"
                    className="form-control"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                  />
                  <small className="text-muted">
                    Only MP4 files are allowed. Leave empty to keep current video.
                  </small>
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
                    {loading ? "Updating..." : "Update"}
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

export default EditTrainingMaterial;
