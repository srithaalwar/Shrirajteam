// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Swal from "sweetalert2";
// import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import "bootstrap/dist/css/bootstrap.min.css";

// const EditSetting = () => {
//   const { key } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     key: "",
//     value: "",
//   });

//   const [originalKey, setOriginalKey] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(true);

//   useEffect(() => {
//     const fetchSetting = async () => {
//       setFetchLoading(true);
//       try {
//         // Fetch all settings and find the one with matching key
//         const res = await axios.get(`${baseurl}/settings/?key=${key}`);
        
//         let setting = null;
//         if (Array.isArray(res.data)) {
//           setting = res.data.find(s => s.key === key);
//         } else if (res.data.results) {
//           setting = res.data.results.find(s => s.key === key);
//         }

//         if (setting) {
//           setFormData({
//             key: setting.key,
//             value: String(setting.value), // Convert to string for input
//           });
//           setOriginalKey(setting.key);
//         } else {
//           throw new Error("Setting not found");
//         }
//       } catch (error) {
//         console.error("Failed to load setting:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Failed to load setting details",
//           confirmButtonColor: "#273c75",
//         }).then(() => navigate("/a-settings"));
//       } finally {
//         setFetchLoading(false);
//       }
//     };

//     if (key) {
//       fetchSetting();
//     }
//   }, [key, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!formData.key || !formData.value) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please fill in all required fields",
//         confirmButtonColor: "#273c75",
//       });
//       return;
//     }

//     // Key format validation (uppercase with underscores)
//     const keyPattern = /^[A-Z0-9_]+$/;
//     if (!keyPattern.test(formData.key)) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Key must contain only uppercase letters, numbers, and underscores",
//         confirmButtonColor: "#273c75",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       // Convert value to appropriate type (number if numeric)
//       let processedValue = formData.value;
      
//       // Check if value is numeric (handle as string first)
//       const valueAsString = String(formData.value).trim();
//       if (valueAsString !== '' && !isNaN(valueAsString)) {
//         processedValue = Number(valueAsString);
//       }

//       console.log('Updating setting:', {
//         originalKey,
//         newKey: formData.key,
//         value: processedValue
//       });

//       // If key changed, we need to delete old and create new
//       if (originalKey !== formData.key) {
//         // Delete old setting
//         await axios.delete(`${baseurl}/settings/`, {
//           data: { key: originalKey }
//         });
        
//         // Create new setting with new key
//         await axios.post(`${baseurl}/settings/`, {
//           key: formData.key,
//           value: processedValue,
//         });
//       } else {
//         // Update existing setting
//         await axios.put(`${baseurl}/settings/`, {
//           key: formData.key,
//           value: processedValue,
//         });
//       }

//       Swal.fire({
//         icon: "success",
//         title: "Updated!",
//         text: "Setting updated successfully",
//         confirmButtonColor: "#273c75",
//         confirmButtonText: "OK",
//       }).then(() => navigate("/a-settings"));
//     } catch (error) {
//       console.error("Failed to update:", error);
      
//       if (error.response) {
//         console.error("Response data:", error.response.data);
//         console.error("Response status:", error.response.status);
//       }

//       Swal.fire({
//         icon: "error",
//         title: "Update Failed",
//         text: error.response?.data?.detail || error.response?.data?.message || "An error occurred while updating the setting",
//         confirmButtonColor: "#273c75",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetchLoading) {
//     return (
//       <>
//         <AdminNavbar />
//         <div className="container my-4 text-center">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <AdminNavbar />

//       <div className="container my-4">
//         <div className="card p-4">
//           <h4 className="text-center mb-4">Edit Setting</h4>

//           <form onSubmit={handleSubmit}>
//             <div className="row">
//               {/* Key Field */}
//               <div className="col-md-6">
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Setting Key <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="key"
//                     value={formData.key}
//                     onChange={handleChange}
//                     className="form-control"
//                     placeholder="e.g., REFERRAL_AMOUNT"
//                     style={{ textTransform: 'uppercase' }}
//                     required
//                     disabled={loading}
//                   />
//                   <small className="text-muted">
//                     Changing key will create a new setting and delete the old one
//                   </small>
//                 </div>
//               </div>

//               {/* Value Field */}
//               <div className="col-md-6">
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Setting Value <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="value"
//                     value={formData.value}
//                     onChange={handleChange}
//                     className="form-control"
//                     placeholder="Enter value (number or text)"
//                     required
//                     disabled={loading}
//                   />
//                   <small className="text-muted">
//                     Current type: {isNaN(String(formData.value).trim()) ? 'Text' : 'Number'}
//                   </small>
//                 </div>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="row mt-3">
//               <div className="col-12">
//                 <div className="d-flex justify-content-between">
//                   <button
//                     type="button"
//                     className="btn btn-outline-secondary"
//                     onClick={() => navigate("/a-settings")}
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
//                     {loading ? "Updating..." : "Update Setting"}
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

// export default EditSetting;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import "bootstrap/dist/css/bootstrap.min.css";

const EditSetting = () => {
  const { key } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    key: "",
    value: "",
  });

  const [originalKey, setOriginalKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchSetting = async () => {
      setFetchLoading(true);
      try {
        // Fetch setting using query parameter
        const res = await axios.get(`${baseurl}/settings/?key=${key}`);
        
        console.log("Fetch Response:", res.data); // For debugging
        
        let setting = null;
        
        // Handle the response structure from your API
        if (res.data && res.data.results && Array.isArray(res.data.results)) {
          // Paginated response: { count, results: [...] }
          setting = res.data.results.find(s => s.key === key);
        } else if (Array.isArray(res.data)) {
          // Direct array response
          setting = res.data.find(s => s.key === key);
        } else if (res.data && res.data.data) {
          // Single object with data wrapper
          setting = res.data.data;
        } else {
          // Direct object response
          setting = res.data;
        }

        if (setting) {
          setFormData({
            key: setting.key,
            value: String(setting.value), // Convert to string for input
          });
          setOriginalKey(setting.key);
        } else {
          throw new Error("Setting not found");
        }
      } catch (error) {
        console.error("Failed to load setting:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load setting details",
          confirmButtonColor: "#273c75",
        }).then(() => navigate("/a-settings"));
      } finally {
        setFetchLoading(false);
      }
    };

    if (key) {
      fetchSetting();
    }
  }, [key, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.key || !formData.value) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all required fields",
        confirmButtonColor: "#273c75",
      });
      return;
    }

    // Key format validation (uppercase with underscores)
    const keyPattern = /^[A-Z0-9_]+$/;
    if (!keyPattern.test(formData.key)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Key must contain only uppercase letters, numbers, and underscores",
        confirmButtonColor: "#273c75",
      });
      return;
    }

    setLoading(true);

    try {
      // Convert value to appropriate type (number if numeric)
      let processedValue = formData.value;
      
      // Check if value is numeric (handle as string first)
      const valueAsString = String(formData.value).trim();
      if (valueAsString !== '' && !isNaN(valueAsString)) {
        processedValue = Number(valueAsString);
      }

      console.log('Updating setting with payload:', {
        key: formData.key,
        value: processedValue
      });

      // Make the PUT request
      const response = await axios.put(`${baseurl}/settings/`, {
        key: formData.key,
        value: processedValue,
      });

      console.log('Update response:', response.data); // For debugging

      // Check if update was successful
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Setting updated successfully",
          confirmButtonColor: "#273c75",
          confirmButtonText: "OK",
        }).then(() => navigate("/a-settings"));
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Failed to update:", error);
      
      let errorMessage = "An error occurred while updating the setting";
      
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
        
        // Extract error message from response
        if (error.response.data) {
          if (typeof error.response.data === 'string') {
            errorMessage = error.response.data;
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
          } else if (error.response.data.detail) {
            errorMessage = error.response.data.detail;
          } else if (error.response.data.error) {
            errorMessage = error.response.data.error;
          }
        }
      }

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: errorMessage,
        confirmButtonColor: "#273c75",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <>
        <AdminNavbar />
        <div className="container my-4 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
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
          <h4 className="text-center mb-4">Edit Setting</h4>

          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Key Field */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Setting Key <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="key"
                    value={formData.key}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="e.g., REFERRAL_AMOUNT"
                    style={{ textTransform: 'uppercase' }}
                    required
                    disabled={loading}
                  />
                  <small className="text-muted">
                    The unique identifier for this setting
                  </small>
                </div>
              </div>

              {/* Value Field */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Setting Value <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter value (number or text)"
                    required
                    disabled={loading}
                  />
                  <small className="text-muted">
                    {!isNaN(String(formData.value).trim()) ? '🔢 Numeric value' : '📝 Text value'}
                  </small>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="row mt-3">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/a-settings")}
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
                    {loading ? "Updating..." : "Update Setting"}
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

export default EditSetting;