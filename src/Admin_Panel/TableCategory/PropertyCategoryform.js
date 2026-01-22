// import React, { useState } from "react";
// import {
//   Container,
//   TextField,
//   Button,
//   Box
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Swal from "sweetalert2"; // Popup import
// import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
// import { baseurl } from './../../BaseURL/BaseURL';

// function AddPropertyCategory() {
//   const [formData, setFormData] = useState({ name: "" });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(`${baseurl}/property-categories/`, formData);

//       // SUCCESS SWEETALERT
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Category Created",
//         confirmButtonColor: "#6C63FF", // Purple button like screenshot
//         confirmButtonText: "OK",
//       }).then(() => navigate("/tablecategory")); // Redirect after popup

//     } catch (err) {
//       console.error("Error posting:", err);

//       // ERROR SWEETALERT
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to add category",
//         confirmButtonColor: "#6C63FF",
//       });
//     }
//   };

//   return (
//     <>
//       <AdminNavbar /> {/* Navbar */}
//       <Container maxWidth="sm" sx={{ mt: 6 }}>
//         <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
//           Add Property Category
//         </h2>

//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Category Name"
//             name="name"
//             required
//             value={formData.name}
//             onChange={(e) =>
//               setFormData({ ...formData, name: e.target.value })
//             }
//             sx={{ mb: 3 }}
//           />

//           <Box sx={{ textAlign: "center" }}>
//             <Button type="submit" variant="contained" color="success">
//               Add Category
//             </Button>
//           </Box>
//         </form>
//       </Container>
//     </>
//   );
// }

// export default AddPropertyCategory;




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Swal from "sweetalert2";
// import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
// import { baseurl } from './../../BaseURL/BaseURL';

// function AddPropertyCategory() {
//   const [formData, setFormData] = useState({ name: "" });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.name.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please enter category name",
//         confirmButtonColor: "#6C63FF",
//       });
//       return;
//     }

//     setLoading(true);
    
//     try {
//       await axios.post(`${baseurl}/property-categories/`, formData);

//       // SUCCESS SWEETALERT
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Category created successfully",
//         confirmButtonColor: "#6C63FF",
//         confirmButtonText: "OK",
//       }).then(() => navigate("/tablecategory"));

//     } catch (err) {
//       console.error("Error posting:", err);
      
//       // ERROR SWEETALERT
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: err.response?.data?.detail || "Failed to add category",
//         confirmButtonColor: "#6C63FF",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <AdminNavbar />
      
//       <div className="page-container">
//         {/* Header */}
//         <div className="page-header">
//           <h2>Add Property Category</h2>
//         </div>

//         {/* Form Container */}
//         <div className="form-container">
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label className="form-label">
//                 Category Name <span className="required">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 className="form-input"
//                 placeholder="Enter category name"
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <div className="form-actions">
//               <button
//                 type="button"
//                 className="secondary-btn"
//                 onClick={() => navigate("/tablecategory")}
//                 disabled={loading}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="primary-btn"
//                 disabled={loading}
//               >
//                 {loading ? "Adding..." : "Add Category"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AddPropertyCategory;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import "bootstrap/dist/css/bootstrap.min.css";

const AddPropertyCategory = () => {
  const [formData, setFormData] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter category name",
        confirmButtonColor: "#6C63FF",
      });
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${baseurl}/property-categories/`, {
        name: formData.name.trim(),
      });

      // SUCCESS SWEETALERT
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Category created successfully",
        confirmButtonColor: "#6C63FF",
        confirmButtonText: "OK",
      }).then(() => navigate("/tablecategory"));
    } catch (err) {
      console.error("Error posting:", err);

      // ERROR SWEETALERT
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.detail || "Failed to add category",
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
          <h4 className="text-center mb-4">Add Property Category</h4>

          <form onSubmit={handleSubmit}>
            {/* Category Name */}
            <div className="row mb-3">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">
                    Category Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter category name"
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
                    onClick={() => navigate("/tablecategory")}
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
                    {loading ? "Adding..." : "Add Category"}
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

export default AddPropertyCategory;
