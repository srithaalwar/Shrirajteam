// import React, { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";

// const AddCommissionLevels = () => {
//   const [formData, setFormData] = useState({
//     level_no: "",
//     percentage: "",
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
//       await axios.post(`${baseurl}/commissions-master/`, {
//         level_no: Number(formData.level_no),
//         percentage: Number(formData.percentage),
//       });

//       // SUCCESS SWEETALERT
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Commission Level added successfully",
//         confirmButtonColor: "#6C63FF",
//         confirmButtonText: "OK",
//       }).then(() => navigate("/admin-commissionmaster"));
//     } catch (error) {
//       console.error("Error submitting form:", error);

//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text:
//           error.response?.data?.detail ||
//           "Failed to add commission level",
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
//           <h4 className="text-center mb-4">Add Commission Level</h4>

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
//                     {loading ? "Adding..." : "Add Commission Level"}
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

// export default AddCommissionLevels;


import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";

const AddCommissionLevels = () => {
  const [formData, setFormData] = useState({
    level_no: "",
    percentage: "",
    commission_type: "product_commission", // Default value
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Commission type options
  const commissionTypes = [
    { value: "product_commission", label: "Product Commission" },
    { value: "property_commission", label: "Property Commission" },
    { value: "referral_commission", label: "Referral Commission" },
    { value: "seller_referral_commission", label: "Seller Referral Commission" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.level_no || !formData.percentage || !formData.commission_type) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all required fields",
        confirmButtonColor: "#6C63FF",
      });
      return;
    }

    if (Number(formData.level_no) < 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Level No cannot be negative",
        confirmButtonColor: "#6C63FF",
      });
      return;
    }

    if (
      Number(formData.percentage) < 0 ||
      Number(formData.percentage) > 100
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Percentage must be between 0 and 100",
        confirmButtonColor: "#6C63FF",
      });
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${baseurl}/commissions-master/`, {
        level_no: Number(formData.level_no),
        percentage: Number(formData.percentage),
        commission_type: formData.commission_type,
      });

      // SUCCESS SWEETALERT
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Commission Level added successfully",
        confirmButtonColor: "#6C63FF",
        confirmButtonText: "OK",
      }).then(() => navigate("/admin-commissionmaster"));
    } catch (error) {
      console.error("Error submitting form:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.detail ||
          "Failed to add commission level",
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
          <h4 className="text-center mb-4">Add Commission Level</h4>

          <form onSubmit={handleSubmit}>
            {/* Fields Row */}
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
                    required
                    disabled={loading}
                  />
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
                    disabled={loading}
                  />
                  <small className="text-muted">
                    Enter value like 10 for 10%
                  </small>
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
                    disabled={loading}
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

            {/* Buttons */}
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin-commissionmaster")}
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
                    {loading ? "Adding..." : "Add Commission Level"}
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

export default AddCommissionLevels;