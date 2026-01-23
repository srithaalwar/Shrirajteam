// import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
// import React, { useState } from 'react';
// import {
//   TextField,
//   Button,
//   Container,
//   Typography,
//   Box,
//   Grid
// } from '@mui/material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { baseurl } from './../../BaseURL/BaseURL';
//  import Swal from 'sweetalert2';

// function AddBookingSlab() {
//   const [formData, setFormData] = useState({
//     min_value: '',
//     max_value: '',
//     booking_amount: ''
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     await axios.post(`${baseurl}/booking-slabs/`, formData);

//     Swal.fire({
//       icon: 'success',
//       title: 'Success!',
//       text: 'Booking Slab added successfully!',
//       timer: 2000,
//       showConfirmButton: false
//     });

//     navigate('/a-bookingslab');
//   } catch (error) {
//     console.error('Error submitting form:', error);

//     Swal.fire({
//       icon: 'error',
//       title: 'Error',
//       text: 'Error submitting form'
//     });
//   }
// };


//   return (
//     <>
//       <AdminNavbar />
//       <Container maxWidth="xl" sx={{ padding: 4 }}>
//         {/* <Typography variant="h4" gutterBottom textAlign="center" sx={{ mb: 4 }}>
//           Add New Booking Slab
//         </Typography> */}

//          <Typography
//                                                 variant="h4"
//                                                 sx={{
//                                                   fontSize: {
//                                                     xs: "1.6rem",
//                                                     sm: "2.1rem",
//                                                     md: "2.2rem",
//                                                   },
//                                                   fontWeight: "bold",
//                                                   whiteSpace: "nowrap",
//                                                   overflow: "hidden",
//                                                   textAlign:'center',
//                                                   textOverflow: "ellipsis",
//                                                   marginBottom:"15px",
//                                                 }}
//                                               >
//                                                 Add New Booking Slab
//                                               </Typography>
        
//         <Box 
//           component="form" 
//           onSubmit={handleSubmit}
//           sx={{
//             width: '100%'
//           }}
//         >
//           <Grid container spacing={3} justifyContent="center">
//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 label="Min Value"
//                 name="min_value"
//                 value={formData.min_value}
//                 onChange={handleChange}
//                 variant="outlined"
//                 type="number"
//                 required
//                 InputProps={{
//                   inputProps: { 
//                     min: 0 
//                   }
//                 }}
//               />
//             </Grid>
            
//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 label="Max Value"
//                 name="max_value"
//                 value={formData.max_value}
//                 onChange={handleChange}
//                 variant="outlined"
//                 type="number"
//                 // required
//                 InputProps={{
//                   inputProps: { 
//                     min: formData.min_value || 0 
//                   }
//                 }}
//               />
//             </Grid>
            
//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 label="Booking Amount"
//                 name="booking_amount"
//                 value={formData.booking_amount}
//                 onChange={handleChange}
//                 variant="outlined"
//                 type="number"
//                 required
//                 InputProps={{
//                   inputProps: { 
//                     min: 0 
//                   }
//                 }}
//               />
//             </Grid>
            
//                      <Grid container justifyContent="center">
//              <Grid item xs="auto">
//                <Button 
//                  type="submit" 
//                  variant="contained" 
//                  fullWidth={false}
//                  sx={{ 
//                    height: '56px',
//                    fontSize: '1rem',
//                    mt: 2,
//                    px: 4
//                  }}
//                >
//                  Add Booking Slab
//                </Button>
//              </Grid>
//            </Grid>
//           </Grid>
//         </Box>
//       </Container>
//     </>
//   );
// }

// export default AddBookingSlab;




// import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { baseurl } from './../../BaseURL/BaseURL';
// import Swal from 'sweetalert2';
// import "./BookingSlab.css"; // Reusing the same CSS file

// function AddBookingSlab() {
//   const [formData, setFormData] = useState({
//     min_value: '',
//     max_value: '',
//     booking_amount: ''
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!formData.min_value || !formData.booking_amount) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Please fill in all required fields'
//       });
//       return;
//     }

//     if (formData.max_value && parseFloat(formData.max_value) <= parseFloat(formData.min_value)) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Max value must be greater than Min value'
//       });
//       return;
//     }

//     try {
//       await axios.post(`${baseurl}/booking-slabs/`, formData);

//       Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: 'Booking Slab added successfully!',
//         timer: 2000,
//         showConfirmButton: false
//       });

//       navigate('/a-bookingslab');
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error.response?.data?.detail || 'Error submitting form'
//       });
//     }
//   };

//   return (
//     <>
//       <AdminNavbar />
      
//       <div className="page-container">
//         {/* Header */}
//         <div className="page-header">
//           <h2>Add New Booking Slab</h2>
//         </div>

//         {/* Form Container */}
//         <div className="form-container">
//           <form onSubmit={handleSubmit}>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label className="form-label">
//                   Min Value <span className="required">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   name="min_value"
//                   value={formData.min_value}
//                   onChange={handleChange}
//                   className="form-input"
//                   placeholder="Enter minimum value"
//                   min="0"
//                   step="0.01"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label className="form-label">
//                   Max Value
//                 </label>
//                 <input
//                   type="number"
//                   name="max_value"
//                   value={formData.max_value}
//                   onChange={handleChange}
//                   className="form-input"
//                   placeholder="Enter maximum value (optional)"
//                   min={formData.min_value || "0"}
//                   step="0.01"
//                 />
//                 <div className="form-hint">
//                   Leave empty for "and above"
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label className="form-label">
//                   Booking Amount <span className="required">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   name="booking_amount"
//                   value={formData.booking_amount}
//                   onChange={handleChange}
//                   className="form-input"
//                   placeholder="Enter booking amount"
//                   min="0"
//                   step="0.01"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="form-actions">
//               <button
//                 type="button"
//                 className="secondary-btn"
//                 onClick={() => navigate('/a-bookingslab')}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="primary-btn"
//                 style={{
//     backgroundColor: '#273c75',
//     borderColor: '#273c75',
//     color: 'white'
//   }}
//               >
//                 Add Booking Slab
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AddBookingSlab;




// import React, { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import "bootstrap/dist/css/bootstrap.min.css";

// const AddBookingSlab = () => {
//   const [formData, setFormData] = useState({
//     min_value: "",
//     max_value: "",
//     booking_amount: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!formData.min_value || !formData.booking_amount) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please fill in all required fields",
//         confirmButtonColor: "#6C63FF",
//       });
//       return;
//     }

//     if (
//       formData.max_value &&
//       parseFloat(formData.max_value) <= parseFloat(formData.min_value)
//     ) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Max value must be greater than Min value",
//         confirmButtonColor: "#6C63FF",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       await axios.post(`${baseurl}/booking-slabs/`, {
//         min_value: formData.min_value,
//         max_value: formData.max_value || null,
//         booking_amount: formData.booking_amount,
//       });

//       // SUCCESS SWEETALERT
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Booking Slab added successfully",
//         confirmButtonColor: "#6C63FF",
//         confirmButtonText: "OK",
//       }).then(() => navigate("/a-bookingslab"));
//     } catch (error) {
//       console.error("Error submitting form:", error);

//       // ERROR SWEETALERT
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.response?.data?.detail || "Failed to add booking slab",
//         confirmButtonColor: "#6C63FF",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <AdminNavbar />

//       <div className="container my-4">
//         <div className="card p-4">
//           <h4 className="text-center mb-4">Add Booking Slab</h4>

//           <form onSubmit={handleSubmit}>
//             {/* Min Value */}
//             <div className="row mb-3">
//               <div className="col-12">
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Min Value <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     name="min_value"
//                     value={formData.min_value}
//                     onChange={handleChange}
//                     className="form-control"
//                     placeholder="Enter minimum value"
//                     min="0"
//                     step="0.01"
//                     required
//                     disabled={loading}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Max Value */}
//             <div className="row mb-3">
//               <div className="col-12">
//                 <div className="mb-1">
//                   <label className="form-label">Max Value</label>
//                   <input
//                     type="number"
//                     name="max_value"
//                     value={formData.max_value}
//                     onChange={handleChange}
//                     className="form-control"
//                     placeholder="Enter maximum value (optional)"
//                     min={formData.min_value || "0"}
//                     step="0.01"
//                     disabled={loading}
//                   />
//                 </div>
//                 <small className="text-muted">
//                   Leave empty for "and above"
//                 </small>
//               </div>
//             </div>

//             {/* Booking Amount */}
//             <div className="row mb-3">
//               <div className="col-12">
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Booking Amount <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     name="booking_amount"
//                     value={formData.booking_amount}
//                     onChange={handleChange}
//                     className="form-control"
//                     placeholder="Enter booking amount"
//                     min="0"
//                     step="0.01"
//                     required
//                     disabled={loading}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="row">
//               <div className="col-12">
//                 <div className="d-flex justify-content-between">
//                   <button
//                     type="button"
//                     className="btn btn-outline-secondary"
//                     onClick={() => navigate("/a-bookingslab")}
//                     disabled={loading}
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     className="btn"
//                     style={{
//                       backgroundColor: "#273c75",
//                       borderColor: "#273c75",
//                       color: "white",
//                       minWidth: "180px",
//                     }}
//                     disabled={loading}
//                   >
//                     {loading ? "Adding..." : "Add Booking Slab"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddBookingSlab;




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
