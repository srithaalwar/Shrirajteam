// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Swal from "sweetalert2";
// import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";

// function EditCommissionLevels() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     level_no: "",
//     percentage: "",
//   });

//   const [loading, setLoading] = useState(true);

//   /* ================= FETCH ================= */
//   useEffect(() => {
//     axios
//       .get(`${baseurl}/commissions-master/${id}/`)
//       .then((res) => {
//         const data = res.data;
//         setFormData({
//           level_no: data.level_no?.toString() || "",
//           percentage: data.percentage?.toString() || "",
//         });
//         setLoading(false);
//       })
//       .catch(() => {
//         setLoading(false);
//         Swal.fire({
//           icon: "error",
//           title: "Load Failed",
//           text: "Failed to load commission level data.",
//           confirmButtonColor: "#6C63FF",
//         });
//       });
//   }, [id]);

//   /* ================= CHANGE ================= */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!formData.level_no || !formData.percentage) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please fill in all required fields",
//         confirmButtonColor: "#6C63FF",
//       });
//       return;
//     }

//     if (Number(formData.level_no) < 0) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Level No cannot be negative",
//         confirmButtonColor: "#6C63FF",
//       });
//       return;
//     }

//     if (
//       Number(formData.percentage) < 0 ||
//       Number(formData.percentage) > 100
//     ) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Percentage must be between 0 and 100",
//         confirmButtonColor: "#6C63FF",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       await axios.put(`${baseurl}/commissions-master/${id}/`, {
//         level_no: Number(formData.level_no),
//         percentage: Number(formData.percentage),
//       });

//       Swal.fire({
//         icon: "success",
//         title: "Updated",
//         text: "Commission level updated successfully",
//         confirmButtonColor: "#6C63FF",
//         confirmButtonText: "OK",
//       }).then(() => navigate("/admin-commissionmaster"));
//     } catch (error) {
//       console.error("Update failed:", error);

//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text:
//           error.response?.data?.detail ||
//           "Failed to update commission level",
//         confirmButtonColor: "#6C63FF",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <>
//         <AdminNavbar />
//         <div className="container my-5 text-center">
//           <div className="spinner-border text-primary" role="status"></div>
//           <p className="mt-3">Loading commission level data...</p>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <AdminNavbar />

//       <div className="container my-4">
//         <div className="card p-4">
//           <h4 className="text-center mb-4">Edit Commission Level</h4>

//           <form onSubmit={handleSubmit}>
//             {/* All Fields in One Row */}
//             <div className="row mb-3">
//               {/* Level No */}
//               <div className="col-md-6">
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Level No <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     name="level_no"
//                     value={formData.level_no}
//                     onChange={handleChange}
//                     className="form-control"
//                     placeholder="Enter level number"
//                     min="0"
//                     step="1"
//                     required
//                     disabled={loading}
//                   />
//                 </div>
//               </div>

//               {/* Percentage */}
//               <div className="col-md-6">
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Percentage <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     name="percentage"
//                     value={formData.percentage}
//                     onChange={handleChange}
//                     className="form-control"
//                     placeholder="Enter percentage"
//                     min="0"
//                     max="100"
//                     step="0.01"
//                     required
//                     disabled={loading}
//                   />
//                   <small className="text-muted">
//                     Enter value like 10 for 10%
//                   </small>
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
//                     onClick={() => navigate("/admin-commissionmaster")}
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
//                     {loading ? "Updating..." : "Update Commission Level"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default EditCommissionLevels;




// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Swal from "sweetalert2";
// import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";

// function EditCommissionLevels() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     level_no: "",
//     percentage: "",
//     commission_type: "",
//   });

//   const [loading, setLoading] = useState(true);

//   // Commission type options
//   const commissionTypes = [
//     { value: "product_commission", label: "Product Commission" },
//     { value: "property_commission", label: "Property Commission" },
//     { value: "referral_commission", label: "Referral Commission" },
//     { value: "seller_referral_commission", label: "Seller Referral Commission" }
//   ];

//   /* ================= FETCH ================= */
//   useEffect(() => {
//     axios
//       .get(`${baseurl}/commissions-master/${id}/`)
//       .then((res) => {
//         const data = res.data;
//         setFormData({
//           level_no: data.level_no?.toString() || "",
//           percentage: data.percentage?.toString() || "",
//           commission_type: data.commission_type || "product_commission",
//         });
//         setLoading(false);
//       })
//       .catch(() => {
//         setLoading(false);
//         Swal.fire({
//           icon: "error",
//           title: "Load Failed",
//           text: "Failed to load commission level data.",
//           confirmButtonColor: "#6C63FF",
//         });
//       });
//   }, [id]);

//   /* ================= CHANGE ================= */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!formData.level_no || !formData.percentage || !formData.commission_type) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please fill in all required fields",
//         confirmButtonColor: "#6C63FF",
//       });
//       return;
//     }

//     if (Number(formData.level_no) < 0) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Level No cannot be negative",
//         confirmButtonColor: "#6C63FF",
//       });
//       return;
//     }

//     if (
//       Number(formData.percentage) < 0 ||
//       Number(formData.percentage) > 100
//     ) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Percentage must be between 0 and 100",
//         confirmButtonColor: "#6C63FF",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       await axios.put(`${baseurl}/commissions-master/${id}/`, {
//         level_no: Number(formData.level_no),
//         percentage: Number(formData.percentage),
//         commission_type: formData.commission_type,
//       });

//       Swal.fire({
//         icon: "success",
//         title: "Updated",
//         text: "Commission level updated successfully",
//         confirmButtonColor: "#6C63FF",
//         confirmButtonText: "OK",
//       }).then(() => navigate("/admin-commissionmaster"));
//     } catch (error) {
//       console.error("Update failed:", error);

//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text:
//           error.response?.data?.detail ||
//           "Failed to update commission level",
//         confirmButtonColor: "#6C63FF",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <>
//         <AdminNavbar />
//         <div className="container my-5 text-center">
//           <div className="spinner-border text-primary" role="status"></div>
//           <p className="mt-3">Loading commission level data...</p>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <AdminNavbar />

//       <div className="container my-4">
//         <div className="card p-4">
//           <h4 className="text-center mb-4">Edit Commission Level</h4>

//           <form onSubmit={handleSubmit}>
//             {/* Fields Row */}
//             <div className="row mb-3">
//               {/* Level No */}
//               <div className="col-md-4">
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Level No <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     name="level_no"
//                     value={formData.level_no}
//                     onChange={handleChange}
//                     className="form-control"
//                     placeholder="Enter level number"
//                     min="0"
//                     step="1"
//                     required
//                     disabled={loading}
//                   />
//                 </div>
//               </div>

//               {/* Percentage */}
//               <div className="col-md-4">
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Percentage <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     name="percentage"
//                     value={formData.percentage}
//                     onChange={handleChange}
//                     className="form-control"
//                     placeholder="Enter percentage"
//                     min="0"
//                     max="100"
//                     step="0.01"
//                     required
//                     disabled={loading}
//                   />
//                   <small className="text-muted">
//                     Enter value like 10 for 10%
//                   </small>
//                 </div>
//               </div>

//               {/* Commission Type */}
//               <div className="col-md-4">
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Commission Type <span className="text-danger">*</span>
//                   </label>
//                   <select
//                     name="commission_type"
//                     value={formData.commission_type}
//                     onChange={handleChange}
//                     className="form-control"
//                     required
//                     disabled={loading}
//                   >
//                     {commissionTypes.map(type => (
//                       <option key={type.value} value={type.value}>
//                         {type.label}
//                       </option>
//                     ))}
//                   </select>
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
//                     onClick={() => navigate("/admin-commissionmaster")}
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
//                     {loading ? "Updating..." : "Update Commission Level"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default EditCommissionLevels;


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
    commission_type: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Commission type options
  const commissionTypes = [
    { value: "product_commission", label: "Product Commission" },
    { value: "property_commission", label: "Property Commission" },
    { value: "referral_commission", label: "Referral Commission" },
    { value: "seller_referral_commission", label: "Seller Referral Commission" }
  ];

  /* ================= FETCH ================= */
  useEffect(() => {
    axios
      .get(`${baseurl}/commissions-master/${id}/`)
      .then((res) => {
        const data = res.data;
        setFormData({
          level_no: data.level_no?.toString() || "",
          percentage: data.percentage?.toString() || "",
          commission_type: data.commission_type || "product_commission",
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        let errorMessage = "Failed to load commission level data.";
        
        if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.response?.data?.detail) {
          errorMessage = error.response.data.detail;
        }
        
        Swal.fire({
          icon: "error",
          title: "Load Failed",
          text: errorMessage,
          confirmButtonColor: "#273c75",
        }).then(() => navigate("/admin-commissionmaster"));
      });
  }, [id, navigate]);

  /* ================= CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.level_no && formData.commission_type !== 'property_commission') {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Level No is required for this commission type",
        confirmButtonColor: "#273c75",
      });
      return;
    }

    if (!formData.percentage) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all required fields",
        confirmButtonColor: "#273c75",
      });
      return;
    }

    if (Number(formData.level_no) < 0) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Level No cannot be negative",
        confirmButtonColor: "#273c75",
      });
      return;
    }

    if (Number(formData.percentage) < 0 || Number(formData.percentage) > 100) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Percentage must be between 0 and 100",
        confirmButtonColor: "#273c75",
      });
      return;
    }

    setSubmitting(true);

    try {
      await axios.put(`${baseurl}/commissions-master/${id}/`, {
        level_no: formData.level_no ? Number(formData.level_no) : null,
        percentage: Number(formData.percentage),
        commission_type: formData.commission_type,
      });

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Commission level updated successfully",
        confirmButtonColor: "#273c75",
        confirmButtonText: "OK",
      }).then(() => navigate("/admin-commissionmaster"));
      
    } catch (error) {
      console.error("Update failed:", error);
      
      // Extract error message from backend response
      let errorMessage = "Failed to update commission level";
      
      if (error.response) {
        const backendError = error.response.data;
        
        if (backendError.error) {
          errorMessage = backendError.error;
        } else if (backendError.detail) {
          errorMessage = backendError.detail;
        } else if (typeof backendError === 'string') {
          errorMessage = backendError;
        } else if (backendError.message) {
          errorMessage = backendError.message;
        }
        
        // Handle specific validation errors from serializer
        if (backendError.level_no) {
          errorMessage = `Level No: ${backendError.level_no.join(', ')}`;
        } else if (backendError.percentage) {
          errorMessage = `Percentage: ${backendError.percentage.join(', ')}`;
        } else if (backendError.commission_type) {
          errorMessage = `Commission Type: ${backendError.commission_type.join(', ')}`;
        }
      }
      
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonColor: "#273c75",
      });
    } finally {
      setSubmitting(false);
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
            <div className="row mb-3">
              {/* Level No */}
              <div className="col-md-4">
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
                    disabled={submitting}
                  />
                  <small className="text-muted">Optional for property commission</small>
                </div>
              </div>

              {/* Percentage */}
              <div className="col-md-4">
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
                    disabled={submitting}
                  />
                  <small className="text-muted">Enter value like 10 for 10%</small>
                </div>
              </div>

              {/* Commission Type */}
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">
                    Commission Type <span className="text-danger">*</span>
                  </label>
                  <select
                    name="commission_type"
                    value={formData.commission_type}
                    onChange={handleChange}
                    className="form-control"
                    required
                    disabled={submitting}
                  >
                    {commissionTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Info Alert for Product + Seller Commission */}
            {(formData.commission_type === 'product_commission' || formData.commission_type === 'seller_referral_commission') && (
              <div className="alert alert-info mb-3">
                <small>
                  ℹ️ Product and Seller Referral commissions share a combined limit of 100%.
                  Current total must not exceed 100%.
                </small>
              </div>
            )}

            {/* Buttons */}
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin-commissionmaster")}
                    disabled={submitting}
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
                    disabled={submitting}
                  >
                    {submitting ? "Updating..." : "Update Commission Level"}
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