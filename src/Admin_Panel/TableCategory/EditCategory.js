// import React, { useEffect, useState } from "react";
// import {
//   TextField,
//   Button,
//   Container,
//   Typography,
//   MenuItem,
//   Grid,
//   Box,
// } from "@mui/material";
// import axios from "axios";
// import Swal from "sweetalert2";
// import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
// import { baseurl } from './../../BaseURL/BaseURL';
// import { useParams, useNavigate } from "react-router-dom";

// function EditCategory() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [typeName, setTypeName] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [allCategories, setAllCategories] = useState([]);

//   const TYPE_URL = `${baseurl}/property-types/${id}/`;
//   const GET_CATEGORIES = `${baseurl}/property-categories/`;

//   useEffect(() => {
//     loadCategories();
//     loadType();
//   }, []);

// const loadCategories = async () => {
//   try {
//     const res = await axios.get(GET_CATEGORIES);

//     // ✅ handle both array & paginated responses safely
//     const categories = Array.isArray(res.data)
//       ? res.data
//       : res.data.results || [];

//     setAllCategories(categories);
//   } catch (err) {
//     console.log(err);
//     setAllCategories([]);
//   }
// };


//   // Load ONLY Property Type
//   const loadType = async () => {
//     try {
//       const res = await axios.get(TYPE_URL);
//       setTypeName(res.data.name);
//       setSelectedCategory(res.data.category);
//     } catch (err) {
//       Swal.fire("Error", "Type not found", "error");
//     }
//   };

//   const handleUpdateType = async () => {
//     try {
//       await axios.put(TYPE_URL, {
//         name: typeName,
//         category: selectedCategory,
//       });

//       Swal.fire("Success", "Property Type Updated Successfully", "success");
//       navigate("/tablecategory");
//     } catch (err) {
//       Swal.fire("Error", "Update Failed", "error");
//     }
//   };

//   return (
//     <>
//       <AdminNavbar />
//       <Container maxWidth="sm" sx={{ mt: 4 }}>
//         <Typography variant="h5" gutterBottom>
//           Edit Property Type
//         </Typography>

//         <Box mt={2}>
//           <TextField
//             select
//             fullWidth
//             label="Select Category"
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             sx={{ mb: 2 }}
//           >
//             {Array.isArray(allCategories) &&
//   allCategories.map((cat) => (
//     <MenuItem
//       key={cat.property_category_id}
//       value={cat.property_category_id}
//     >
//       {cat.name}
//     </MenuItem>
// ))}

          
//           </TextField>

//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={8}>
//               <TextField
//                 fullWidth
//                 label="Type Name"
//                 value={typeName}
//                 onChange={(e) => setTypeName(e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={4}>
//               <Button
//                 variant="contained"
//                 fullWidth
//                 sx={{ height: "56px" }}
//                 onClick={handleUpdateType}
//               >
//                 Update
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </Container>
//     </>
//   );
// }

// export default EditCategory;




import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
import { baseurl } from './../../BaseURL/BaseURL';
import { useParams, useNavigate } from "react-router-dom";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ 
    typeName: "", 
    selectedCategory: "" 
  });
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const TYPE_URL = `${baseurl}/property-types/${id}/`;
  const GET_CATEGORIES = `${baseurl}/property-categories/`;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setInitialLoading(true);
    try {
      await Promise.all([loadCategories(), loadType()]);
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setInitialLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await axios.get(GET_CATEGORIES);
      const categories = Array.isArray(res.data)
        ? res.data
        : res.data.results || [];
      setAllCategories(categories);
    } catch (err) {
      console.log(err);
      setAllCategories([]);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load categories",
        confirmButtonColor: "#6C63FF",
      });
    }
  };

  const loadType = async () => {
    try {
      const res = await axios.get(TYPE_URL);
      setFormData({
        typeName: res.data.name || "",
        selectedCategory: res.data.category || ""
      });
    } catch (err) {
      console.error("Error loading type:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load property type",
        confirmButtonColor: "#6C63FF",
      }).then(() => navigate("/tablecategory"));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.selectedCategory.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select a category",
        confirmButtonColor: "#6C63FF",
      });
      return;
    }

    if (!formData.typeName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter type name",
        confirmButtonColor: "#6C63FF",
      });
      return;
    }

    setLoading(true);
    
    try {
      await axios.put(TYPE_URL, {
        name: formData.typeName,
        category: formData.selectedCategory,
      });

      // SUCCESS SWEETALERT
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Property type updated successfully",
        confirmButtonColor: "#6C63FF",
        confirmButtonText: "OK",
      }).then(() => navigate("/tablecategory"));

    } catch (err) {
      console.error("Update error:", err);
      
      // ERROR SWEETALERT
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.detail || "Failed to update property type",
        confirmButtonColor: "#6C63FF",
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <>
        <AdminNavbar />
        <div className="page-container">
          <div className="page-header">
            <h2>Edit Property Type</h2>
          </div>
          <div className="form-container">
            <div className="loading-placeholder">Loading...</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      
      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <h2>Edit Property Type</h2>
          <p className="page-subtitle">Update property type details</p>
        </div>

        {/* Form Container */}
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {/* Category Select Field */}
            <div className="form-group">
              <label className="form-label">
                Select Category <span className="required">*</span>
              </label>
              <select
                name="selectedCategory"
                value={formData.selectedCategory}
                onChange={handleChange}
                className="form-input"
                required
                disabled={loading || allCategories.length === 0}
              >
                <option value="">Select a category</option>
                {Array.isArray(allCategories) && allCategories.map((cat) => (
                  <option 
                    key={cat.property_category_id} 
                    value={cat.property_category_id}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
              {allCategories.length === 0 && (
                <p className="form-hint">No categories available</p>
              )}
            </div>

            {/* Type Name Field */}
            <div className="form-group">
              <label className="form-label">
                Type Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="typeName"
                value={formData.typeName}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter property type name"
                required
                disabled={loading}
              />
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => navigate("/tablecategory")}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="primary-btn"
                disabled={loading || allCategories.length === 0}
              >
                {loading ? "Updating..." : "Update Type"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Add CSS for loading state */}
      <style jsx="true">{`
        .loading-placeholder {
          text-align: center;
          padding: 40px;
          color: #666;
          font-size: 16px;
        }
        
        .page-subtitle {
          color: #666;
          margin-top: 5px;
          font-size: 14px;
        }
        
        .form-hint {
          color: #888;
          font-size: 12px;
          margin-top: 5px;
          font-style: italic;
        }
        
        select.form-input {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 10px center;
          background-size: 16px;
          padding-right: 40px;
        }
        
        select.form-input:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }
        
        .form-input:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
}

export default EditCategory;