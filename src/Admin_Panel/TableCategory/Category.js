// import React, { useState, useEffect } from 'react';
// import {
//   TextField,
//   Button,
//   Container,
//   Typography,
//   Box,
//   Grid,
//   MenuItem,
// } from '@mui/material';

// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useNavigate } from "react-router-dom";
// import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
// import { baseurl } from './../../BaseURL/BaseURL';

// function Category() {
//   const [categoryName, setCategoryName] = useState('');
//   const [typeName, setTypeName] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [allCategories, setAllCategories] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${baseurl}/property-categories/`);
//      setAllCategories(res.data.results || []);

//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const handleCreateCategory = async () => {
//     if (!categoryName.trim())
//       return Swal.fire('Error', 'Please enter a category name', 'error');

//     try {
//       await axios.post(`${baseurl}/property-categories/`, { name: categoryName });
//       Swal.fire('Success', 'Category Created', 'success');
//       setCategoryName('');
//       fetchCategories();
//     } catch (err) {
//       Swal.fire('Error', 'Failed to create category', 'error');
//     }
//   };

//   const handleCreateType = async () => {
//     if (!selectedCategory || !typeName.trim()) {
//       return Swal.fire('Error', 'Please select category and enter type name', 'error');
//     }

//     try {
//       await axios.post(`${baseurl}/property-types/`, {
//         category: selectedCategory,
//         name: typeName,
//       });

//       Swal.fire('Success', 'Type Created', 'success');
//       setTypeName('');
//       setSelectedCategory('');

//       navigate("/tablecategory");
//     } catch (err) {
//       Swal.fire('Error', 'Failed to create type', 'error');
//     }
//   };

//   return (
//     <>
//       <AdminNavbar />
//       <Container maxWidth="sm" sx={{ mt: 4 }}>

//         <Typography variant="h5" gutterBottom>
//           Create Type Under Category
//         </Typography>

//         <TextField
//           select
//           label="Select Category"
//           fullWidth
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           sx={{ mb: 2 }}
//         >
//           {Array.isArray(allCategories) && allCategories.map((cat) => (
//             <MenuItem key={cat.property_category_id} value={cat.property_category_id}>
//               {cat.name}
//             </MenuItem>
//           ))}
//         </TextField>

//         <TextField
//           label="Type Name"
//           fullWidth
//           value={typeName}
//           onChange={(e) => setTypeName(e.target.value)}
//         />

//         <Button
//           variant="contained"
//           color="primary"
//           sx={{ mt: 3, width: '100%' }}
//           onClick={handleCreateType}
//         >
//           Submit
//         </Button>
//       </Container>
//     </>
//   );
// }

// export default Category;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useNavigate } from "react-router-dom";
// import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
// import { baseurl } from './../../BaseURL/BaseURL';

// function Category() {
//   const [formData, setFormData] = useState({ 
//     selectedCategory: '', 
//     typeName: '' 
//   });
//   const [allCategories, setAllCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${baseurl}/property-categories/`);
//       setAllCategories(res.data.results || []);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to load categories",
//         confirmButtonColor: "#6C63FF",
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.selectedCategory.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please select a category",
//         confirmButtonColor: "#6C63FF",
//       });
//       return;
//     }

//     if (!formData.typeName.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please enter type name",
//         confirmButtonColor: "#6C63FF",
//       });
//       return;
//     }

//     setLoading(true);
    
//     try {
//       await axios.post(`${baseurl}/property-types/`, {
//         category: formData.selectedCategory,
//         name: formData.typeName,
//       });

//       // SUCCESS SWEETALERT
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Type created successfully",
//         confirmButtonColor: "#6C63FF",
//         confirmButtonText: "OK",
//       }).then(() => navigate("/tablecategory"));

//     } catch (err) {
//       console.error("Error posting:", err);
      
//       // ERROR SWEETALERT
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: err.response?.data?.detail || "Failed to create type",
//         confirmButtonColor: "#6C63FF",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <>
//       <AdminNavbar />
      
//       <div className="page-container">
//         {/* Header */}
//         <div className="page-header">
//           <h2>Create Property Type</h2>
//           <p className="page-subtitle">Add a new property type under existing category</p>
//         </div>

//         {/* Form Container */}
//         <div className="form-container">
//           <form onSubmit={handleSubmit}>
//             {/* Category Select Field */}
//             <div className="form-group">
//               <label className="form-label">
//                 Select Category <span className="required">*</span>
//               </label>
//               <select
//                 name="selectedCategory"
//                 value={formData.selectedCategory}
//                 onChange={handleChange}
//                 className="form-input"
//                 required
//                 disabled={loading || allCategories.length === 0}
//               >
//                 <option value="">Select a category</option>
//                 {Array.isArray(allCategories) && allCategories.map((cat) => (
//                   <option key={cat.property_category_id} value={cat.property_category_id}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//               {allCategories.length === 0 && (
//                 <p className="form-hint">No categories available. Please create categories first.</p>
//               )}
//             </div>

//             {/* Type Name Field */}
//             <div className="form-group">
//               <label className="form-label">
//                 Type Name <span className="required">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="typeName"
//                 value={formData.typeName}
//                 onChange={handleChange}
//                 className="form-input"
//                 placeholder="Enter property type name"
//                 required
//                 disabled={loading}
//               />
//             </div>

//             {/* Form Actions */}
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
//                 disabled={loading || allCategories.length === 0}
//               >
//                 {loading ? "Creating..." : "Create Type"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Add CSS for new elements */}
//       <style jsx="true">{`
//         .page-subtitle {
//           color: #666;
//           margin-top: 5px;
//           font-size: 14px;
//         }
        
//         .form-hint {
//           color: #888;
//           font-size: 12px;
//           margin-top: 5px;
//           font-style: italic;
//         }
        
//         select.form-input {
//           appearance: none;
//           background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
//           background-repeat: no-repeat;
//           background-position: right 10px center;
//           background-size: 16px;
//           padding-right: 40px;
//         }
        
//         select.form-input:disabled {
//           background-color: #f5f5f5;
//           cursor: not-allowed;
//         }
//       `}</style>
//     </>
//   );
// }

// export default Category;




import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import "bootstrap/dist/css/bootstrap.min.css";

const Category = () => {
  const [formData, setFormData] = useState({
    selectedCategory: "",
    typeName: "",
  });

  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setInitialLoading(true);
    try {
      const res = await axios.get(`${baseurl}/property-categories/`);
      const categories = Array.isArray(res.data)
        ? res.data
        : res.data.results || [];
      setAllCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load categories",
        confirmButtonColor: "#6C63FF",
      });
    } finally {
      setInitialLoading(false);
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
      await axios.post(`${baseurl}/property-types/`, {
        category: formData.selectedCategory,
        name: formData.typeName.trim(),
      });

      // SUCCESS SWEETALERT
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Type created successfully",
        confirmButtonColor: "#6C63FF",
        confirmButtonText: "OK",
      }).then(() => navigate("/tablecategory"));
    } catch (err) {
      console.error("Error posting:", err);

      // ERROR SWEETALERT
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.detail || "Failed to create type",
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
        <div className="container my-4">
          <div className="card p-4 text-center">
            <h4 className="mb-3">Create Property Type</h4>
            <div className="text-muted">Loading...</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />

      <div className="container my-4">
        <div className="card p-4">
          <h4 className="text-center mb-4">Create Property Type</h4>

          <form onSubmit={handleSubmit}>
            {/* Category Select */}
            <div className="row mb-3">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">
                    Select Category <span className="text-danger">*</span>
                  </label>
                  <select
                    name="selectedCategory"
                    value={formData.selectedCategory}
                    onChange={handleChange}
                    className="form-control"
                    required
                    disabled={loading || allCategories.length === 0}
                  >
                    <option value="">Select a category</option>
                    {Array.isArray(allCategories) &&
                      allCategories.map((cat) => (
                        <option
                          key={cat.property_category_id}
                          value={cat.property_category_id}
                        >
                          {cat.name}
                        </option>
                      ))}
                  </select>

                  {allCategories.length === 0 && (
                    <small className="text-muted">
                      No categories available. Please create categories first.
                    </small>
                  )}
                </div>
              </div>
            </div>

            {/* Type Name */}
            <div className="row mb-3">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">
                    Type Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="typeName"
                    value={formData.typeName}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter property type name"
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
                    disabled={loading || allCategories.length === 0}
                  >
                    {loading ? "Creating..." : "Create Type"}
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

export default Category;
