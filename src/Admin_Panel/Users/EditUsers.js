// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import "bootstrap/dist/css/bootstrap.min.css";

// const EditUser = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone_number: "",
//     status: "active",
//     referral_id: "",
//     referred_by: "",
//     roles: []
//   });

//   const [availableRoles, setAvailableRoles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const [userRoles, setUserRoles] = useState([]); // Store user's roles separately

//   useEffect(() => {
//     loadData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const loadData = async () => {
//     setInitialLoading(true);
//     try {
//       await Promise.all([fetchUserData(), fetchAvailableRoles()]);
//     } catch (err) {
//       console.error("Error loading data:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to load data",
//         confirmButtonColor: "#6C63FF",
//       }).then(() => navigate("/users"));
//     } finally {
//       setInitialLoading(false);
//     }
//   };

//   const fetchUserData = async () => {
//     try {
//       let userData;
      
//       // First try to get from location state
//       if (location.state?.user) {
//         userData = location.state.user;
//       } else {
//         // Fetch from API if not in state
//         const response = await axios.get(`${baseurl}/users/${id}/`);
//         userData = response.data;
//       }
      
//       // Extract user roles for display
//       const roles = userData.roles?.map(role => role.role_name) || [];
//       setUserRoles(roles);
      
//       setFormData({
//         first_name: userData.first_name || "",
//         last_name: userData.last_name || "",
//         email: userData.email || "",
//         phone_number: userData.phone_number || "",
//         status: userData.status || "active",
//         referral_id: userData.referral_id || "",
//         referred_by: userData.referred_by || "",
//         roles: roles // Set in form data for API submission
//       });
//     } catch (err) {
//       console.error("Error fetching user:", err);
//       throw err;
//     }
//   };

//   const fetchAvailableRoles = async () => {
//     try {
//       // This endpoint should return available roles from your backend
//       // If not available, use default roles
//       const response = await axios.get(`${baseurl}/roles/`);
//       if (response.data && Array.isArray(response.data)) {
//         setAvailableRoles(response.data);
//       } else {
//         // Default roles if API doesn't return
//         setAvailableRoles(["Admin", "Agent", "Client", "Super Admin"]);
//       }
//     } catch (err) {
//       console.error("Error fetching roles:", err);
//       // Set default roles on error
//       setAvailableRoles(["Admin", "Agent", "Client", "Super Admin"]);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Remove the handleRoleChange function since roles are not editable

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!formData.first_name.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please enter first name",
//         confirmButtonColor: "#6C63FF",
//       });
//       return;
//     }

//     if (!formData.email.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please enter email",
//         confirmButtonColor: "#6C63FF",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       // Prepare the data for update
//       const updateData = {
//         first_name: formData.first_name.trim(),
//         last_name: formData.last_name.trim(),
//         email: formData.email.trim(),
//         phone_number: formData.phone_number,
//         status: formData.status,
//         referral_id: formData.referral_id,
//         referred_by: formData.referred_by,
//         // Roles are not editable, so keep them as is
//         roles: formData.roles.map(role => ({ role_name: role }))
//       };

//       await axios.put(`${baseurl}/users/${id}/`, updateData);

//       // Success alert
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "User updated successfully",
//         confirmButtonColor: "#6C63FF",
//         confirmButtonText: "OK",
//       }).then(() => navigate("/admin-users"));
//     } catch (err) {
//       console.error("Update error:", err);

//       // Error alert
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: err.response?.data?.detail || "Failed to update user",
//         confirmButtonColor: "#6C63FF",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (initialLoading) {
//     return (
//       <>
//         <WebsiteNavbar />
//         <div className="container my-4">
//           <div className="card p-4 text-center">
//             <h4 className="mb-3">Edit User</h4>
//             <div className="text-muted">Loading...</div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <WebsiteNavbar />

//       <div className="container my-4">
//         <div className="card p-4">
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <h4 className="mb-0">Edit User</h4>
//             <button
//               className="btn btn-outline-secondary"
//               onClick={() => navigate("/admin-users")}
//             >
//               Back to List
//             </button>
//           </div>

//           <form onSubmit={handleSubmit}>
//             {/* Personal Information */}
//             <div className="row mb-4">
//               <div className="col-12">
//                 <h5 className="mb-3" style={{ color: '#273c75' }}>Personal Information</h5>
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">
//                   First Name <span className="text-danger">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="first_name"
//                   value={formData.first_name}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter first name"
//                   required
//                   disabled={loading}
//                 />
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Last Name</label>
//                 <input
//                   type="text"
//                   name="last_name"
//                   value={formData.last_name}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter last name"
//                   disabled={loading}
//                 />
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">
//                   Email <span className="text-danger">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter email"
//                   required
//                   disabled={loading}
//                 />
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Phone Number</label>
//                 <input
//                   type="tel"
//                   name="phone_number"
//                   value={formData.phone_number}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter phone number"
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             {/* Account Information */}
//             <div className="row mb-4">
//               <div className="col-12">
//                 <h5 className="mb-3" style={{ color: '#273c75' }}>Account Information</h5>
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Referral ID</label>
//                 <input
//                   type="text"
//                   name="referral_id"
//                   value={formData.referral_id}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter referral ID"
//                   disabled={loading}
//                 />
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Referred By</label>
//                 <input
//                   type="text"
//                   name="referred_by"
//                   value={formData.referred_by}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter referred by"
//                   disabled={loading}
//                 />
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Status</label>
//                 <select
//                   name="status"
//                   value={formData.status}
//                   onChange={handleChange}
//                   className="form-control"
//                   disabled={loading}
//                 >
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                 </select>
//               </div>
              
//               {/* Read-only Role Display */}
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Role</label>
//                 <div className="form-control" 
//                      style={{ 
//                        backgroundColor: '#f8f9fa', 
//                        border: '1px solid #ced4da',
//                        minHeight: '38px',
//                        display: 'flex',
//                        alignItems: 'center',
//                        padding: '6px 12px'
//                      }}>
//                   {userRoles.length > 0 ? (
//                     userRoles.map((role, index) => (
//                       <span key={role} className="me-2">
//                         {role}
//                         {index < userRoles.length - 1 ? ', ' : ''}
//                       </span>
//                     ))
//                   ) : (
//                     <span className="text-muted">No roles assigned</span>
//                   )}
//                 </div>
//                 <small className="text-muted">Roles cannot be edited</small>
//               </div>

//               {/* Alternative: Display as badges */}
//               {/* <div className="col-md-6 mb-3">
//                 <label className="form-label">Role</label>
//                 <div className="p-2 border rounded" style={{ backgroundColor: '#f8f9fa' }}>
//                   {userRoles.length > 0 ? (
//                     <div className="d-flex flex-wrap gap-1">
//                       {userRoles.map((role) => (
//                         <span 
//                           key={role} 
//                           className="badge" 
//                           style={{ 
//                             backgroundColor: '#273c75',
//                             color: 'white',
//                             fontSize: '0.85em'
//                           }}
//                         >
//                           {role}
//                         </span>
//                       ))}
//                     </div>
//                   ) : (
//                     <span className="text-muted">No roles assigned</span>
//                   )}
//                 </div>
//                 <small className="text-muted">Roles cannot be edited</small>
//               </div> */}
//             </div>

//             {/* Action Buttons */}
//             <div className="row mt-4">
//               <div className="col-12">
//                 <div className="d-flex justify-content-between">
//                   <button
//                     type="button"
//                     className="btn btn-outline-secondary"
//                     onClick={() => navigate("/admin-users")}
//                     disabled={loading}
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     className="btn btn-primary"
//                     style={{
//                       backgroundColor: '#273c75',
//                       borderColor: '#273c75',
//                       color: 'white',
//                       minWidth: '180px'
//                     }}
//                     disabled={loading}
//                   >
//                     {loading ? "Updating..." : "Update User"}
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

// export default EditUser;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import "bootstrap/dist/css/bootstrap.min.css";

// const EditUser = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone_number: "",
//     date_of_birth: "",
//     gender: "",
//     marital_status: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     pin_code: "",
//     status: "active",
//     referral_id: "",
//     referred_by: "",
//     pan_number: "",
//     aadhaar_number: "",
//     account_holder_name: "",
//     bank_name: "",
//     branch_name: "",
//     account_number: "",
//     account_type: "",
//     ifsc_code: "",
//     nominee_reference_to: "",
//     nominee_relationship: "",
//     kyc_status: "pending",
//     roles: []
//   });

//   const [availableRoles, setAvailableRoles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const [userRoles, setUserRoles] = useState([]);

//   useEffect(() => {
//     loadData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const loadData = async () => {
//     setInitialLoading(true);
//     try {
//       await Promise.all([fetchUserData(), fetchAvailableRoles()]);
//     } catch (err) {
//       console.error("Error loading data:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to load data",
//         confirmButtonColor: "#6C63FF",
//       }).then(() => navigate("/users"));
//     } finally {
//       setInitialLoading(false);
//     }
//   };

//   const fetchUserData = async () => {
//     try {
//       let userData;
      
//       // First try to get from location state
//       if (location.state?.user) {
//         userData = location.state.user;
//       } else {
//         // Fetch from API if not in state
//         const response = await axios.get(`${baseurl}/users/${id}/`);
//         userData = response.data;
//       }
      
//       // Extract user roles for display
//       const roles = userData.roles?.map(role => role.role_name) || [];
//       setUserRoles(roles);
      
//       // Format date for input field (yyyy-mm-dd)
//       const formatDateForInput = (dateStr) => {
//         if (!dateStr) return "";
//         try {
//           const [day, month, year] = dateStr.split("-");
//           return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
//         } catch (error) {
//           return "";
//         }
//       };
      
//       setFormData({
//         first_name: userData.first_name || "",
//         last_name: userData.last_name || "",
//         email: userData.email || "",
//         phone_number: userData.phone_number || "",
//         date_of_birth: formatDateForInput(userData.date_of_birth) || "",
//         gender: userData.gender || "",
//         marital_status: userData.marital_status || "",
//         address: userData.address || "",
//         city: userData.city || "",
//         state: userData.state || "",
//         country: userData.country || "",
//         pin_code: userData.pin_code || "",
//         status: userData.status || "active",
//         referral_id: userData.referral_id || "",
//         referred_by: userData.referred_by || "",
//         pan_number: userData.pan_number || "",
//         aadhaar_number: userData.aadhaar_number || "",
//         account_holder_name: userData.account_holder_name || "",
//         bank_name: userData.bank_name || "",
//         branch_name: userData.branch_name || "",
//         account_number: userData.account_number || "",
//         account_type: userData.account_type || "",
//         ifsc_code: userData.ifsc_code || "",
//         nominee_reference_to: userData.nominee_reference_to || "",
//         nominee_relationship: userData.nominee_relationship || "",
//         kyc_status: userData.kyc_status || "pending",
//         roles: roles
//       });
//     } catch (err) {
//       console.error("Error fetching user:", err);
//       throw err;
//     }
//   };

//   const fetchAvailableRoles = async () => {
//     try {
//       const response = await axios.get(`${baseurl}/roles/`);
//       if (response.data && Array.isArray(response.data)) {
//         setAvailableRoles(response.data);
//       } else {
//         // Default roles if API doesn't return
//         setAvailableRoles(["Admin", "Agent", "Client", "Super Admin"]);
//       }
//     } catch (err) {
//       console.error("Error fetching roles:", err);
//       setAvailableRoles(["Admin", "Agent", "Client", "Super Admin"]);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
    
//     if (type === "file" && files.length > 0) {
//       // Handle file uploads if needed
//       const file = files[0];
//       setFormData(prev => ({
//         ...prev,
//         [name]: file
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!formData.first_name.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please enter first name",
//         confirmButtonColor: "#6C63FF",
//       });
//       return;
//     }

//     if (!formData.email.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please enter email",
//         confirmButtonColor: "#6C63FF",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       // Format date for API (dd-mm-yyyy)
//       const formatDateForAPI = (dateStr) => {
//         if (!dateStr) return "";
//         try {
//           const [year, month, day] = dateStr.split("-");
//           return `${day}-${month}-${year}`;
//         } catch (error) {
//           return "";
//         }
//       };

//       // Prepare the data for update
//       const updateData = {
//         first_name: formData.first_name.trim(),
//         last_name: formData.last_name.trim(),
//         email: formData.email.trim(),
//         phone_number: formData.phone_number,
//         date_of_birth: formatDateForAPI(formData.date_of_birth),
//         gender: formData.gender,
//         marital_status: formData.marital_status,
//         address: formData.address,
//         city: formData.city,
//         state: formData.state,
//         country: formData.country,
//         pin_code: formData.pin_code,
//         status: formData.status,
//         referral_id: formData.referral_id,
//         referred_by: formData.referred_by,
//         pan_number: formData.pan_number,
//         aadhaar_number: formData.aadhaar_number,
//         account_holder_name: formData.account_holder_name,
//         bank_name: formData.bank_name,
//         branch_name: formData.branch_name,
//         account_number: formData.account_number,
//         account_type: formData.account_type,
//         ifsc_code: formData.ifsc_code,
//         nominee_reference_to: formData.nominee_reference_to,
//         nominee_relationship: formData.nominee_relationship,
//         kyc_status: formData.kyc_status,
//         roles: formData.roles.map(role => ({ role_name: role }))
//       };

//       await axios.put(`${baseurl}/users/${id}/`, updateData);

//       // Success alert
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "User updated successfully",
//         confirmButtonColor: "#6C63FF",
//         confirmButtonText: "OK",
//       }).then(() => navigate("/admin-users"));
//     } catch (err) {
//       console.error("Update error:", err);

//       // Error alert
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: err.response?.data?.detail || "Failed to update user",
//         confirmButtonColor: "#6C63FF",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (initialLoading) {
//     return (
//       <>
//         <WebsiteNavbar />
//         <div className="container my-4">
//           <div className="card p-4 text-center">
//             <h4 className="mb-3">Edit User</h4>
//             <div className="text-muted">Loading...</div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <WebsiteNavbar />

//       <div className="container my-4">
//         <div className="card p-4">
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <h4 className="mb-0">Edit User</h4>
//             <button
//               className="btn btn-outline-secondary"
//               onClick={() => navigate("/admin-users")}
//             >
//               Back to List
//             </button>
//           </div>

//           <form onSubmit={handleSubmit}>
//             {/* Personal Information */}
//             <div className="row mb-4">
//               <div className="col-12">
//                 <h5 className="mb-3" style={{ color: '#273c75' }}>Personal Information</h5>
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">
//                   First Name <span className="text-danger">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="first_name"
//                   value={formData.first_name}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter first name"
//                   required
//                   disabled={loading}
//                 />
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Last Name</label>
//                 <input
//                   type="text"
//                   name="last_name"
//                   value={formData.last_name}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter last name"
//                   disabled={loading}
//                 />
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">
//                   Email <span className="text-danger">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter email"
//                   required
//                   disabled={loading}
//                 />
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Phone Number</label>
//                 <input
//                   type="tel"
//                   name="phone_number"
//                   value={formData.phone_number}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter phone number"
//                   disabled={loading}
//                 />
//               </div>

//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Date of Birth</label>
//                 <input
//                   type="date"
//                   name="date_of_birth"
//                   value={formData.date_of_birth}
//                   onChange={handleChange}
//                   className="form-control"
//                   disabled={loading}
//                 />
//               </div>

//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Gender</label>
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   className="form-control"
//                   disabled={loading}
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>

//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Marital Status</label>
//                 <select
//                   name="marital_status"
//                   value={formData.marital_status}
//                   onChange={handleChange}
//                   className="form-control"
//                   disabled={loading}
//                 >
//                   <option value="">Select Status</option>
//                   <option value="single">Single</option>
//                   <option value="married">Married</option>
//                   <option value="divorced">Divorced</option>
//                   <option value="widowed">Widowed</option>
//                 </select>
//               </div>
//             </div>

//             {/* Address Information */}
//             <div className="row mb-4">
//               <div className="col-12">
//                 <h5 className="mb-3" style={{ color: '#273c75' }}>Address Information</h5>
//               </div>
              
//               <div className="col-12 mb-3">
//                 <label className="form-label">Address</label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter full address"
//                   disabled={loading}
//                 />
//               </div>
              
//               <div className="col-md-4 mb-3">
//                 <label className="form-label">City</label>
//                 <input
//                   type="text"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter city"
//                   disabled={loading}
//                 />
//               </div>
              
//               <div className="col-md-4 mb-3">
//                 <label className="form-label">State</label>
//                 <input
//                   type="text"
//                   name="state"
//                   value={formData.state}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter state"
//                   disabled={loading}
//                 />
//               </div>
              
//               <div className="col-md-4 mb-3">
//                 <label className="form-label">Country</label>
//                 <input
//                   type="text"
//                   name="country"
//                   value={formData.country}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter country"
//                   disabled={loading}
//                 />
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Pin Code</label>
//                 <input
//                   type="text"
//                   name="pin_code"
//                   value={formData.pin_code}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter pin code"
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             {/* Account Information */}
//             <div className="row mb-4">
//               <div className="col-12">
//                 <h5 className="mb-3" style={{ color: '#273c75' }}>Account Information</h5>
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Referral ID</label>
//                 <input
//                   type="text"
//                   name="referral_id"
//                   value={formData.referral_id}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter referral ID"
//                   disabled={loading}
//                 />
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Referred By</label>
//                 <input
//                   type="text"
//                   name="referred_by"
//                   value={formData.referred_by}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter referred by"
//                   disabled={loading}
//                 />
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Status</label>
//                 <select
//                   name="status"
//                   value={formData.status}
//                   onChange={handleChange}
//                   className="form-control"
//                   disabled={loading}
//                 >
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                 </select>
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">KYC Status</label>
//                 <select
//                   name="kyc_status"
//                   value={formData.kyc_status}
//                   onChange={handleChange}
//                   className="form-control"
//                   disabled={loading}
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="verified">Verified</option>
//                   <option value="rejected">Rejected</option>
//                 </select>
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Role</label>
//                 <div className="form-control" 
//                      style={{ 
//                        backgroundColor: '#f8f9fa', 
//                        border: '1px solid #ced4da',
//                        minHeight: '38px',
//                        display: 'flex',
//                        alignItems: 'center',
//                        padding: '6px 12px'
//                      }}>
//                   {userRoles.length > 0 ? (
//                     userRoles.map((role, index) => (
//                       <span key={role} className="me-2">
//                         {role}
//                         {index < userRoles.length - 1 ? ', ' : ''}
//                       </span>
//                     ))
//                   ) : (
//                     <span className="text-muted">No roles assigned</span>
//                   )}
//                 </div>
//                 <small className="text-muted">Roles cannot be edited</small>
//               </div>
//             </div>

//             {/* KYC Information */}
//             <div className="row mb-4">
//               <div className="col-12">
//                 <h5 className="mb-3" style={{ color: '#273c75' }}>KYC Information</h5>
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">PAN Number</label>
//                 <input
//                   type="text"
//                   name="pan_number"
//                   value={formData.pan_number}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter PAN number"
//                   disabled={loading}
//                 />
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Aadhaar Number</label>
//                 <input
//                   type="text"
//                   name="aadhaar_number"
//                   value={formData.aadhaar_number}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter Aadhaar number"
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             {/* Banking Information */}
//             <div className="row mb-4">
//               <div className="col-12">
//                 <h5 className="mb-3" style={{ color: '#273c75' }}>Banking Information</h5>
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Account Holder Name</label>
//                 <input
//                   type="text"
//                   name="account_holder_name"
//                   value={formData.account_holder_name}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter account holder name"
//                   disabled={loading}
//                 />
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Bank Name</label>
//                 <input
//                   type="text"
//                   name="bank_name"
//                   value={formData.bank_name}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter bank name"
//                   disabled={loading}
//                 />
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Branch Name</label>
//                 <input
//                   type="text"
//                   name="branch_name"
//                   value={formData.branch_name}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter branch name"
//                   disabled={loading}
//                 />
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Account Number</label>
//                 <input
//                   type="text"
//                   name="account_number"
//                   value={formData.account_number}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter account number"
//                   disabled={loading}
//                 />
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Account Type</label>
//                 <select
//                   name="account_type"
//                   value={formData.account_type}
//                   onChange={handleChange}
//                   className="form-control"
//                   disabled={loading}
//                 >
//                   <option value="">Select Account Type</option>
//                   <option value="Savings">Savings</option>
//                   <option value="Current">Current</option>
//                   <option value="Salary">Salary</option>
//                 </select>
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">IFSC Code</label>
//                 <input
//                   type="text"
//                   name="ifsc_code"
//                   value={formData.ifsc_code}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter IFSC code"
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             {/* Nominee Information */}
//             <div className="row mb-4">
//               <div className="col-12">
//                 <h5 className="mb-3" style={{ color: '#273c75' }}>Nominee Information</h5>
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Nominee Reference To</label>
//                 <input
//                   type="text"
//                   name="nominee_reference_to"
//                   value={formData.nominee_reference_to}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter nominee reference"
//                   disabled={loading}
//                 />
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Nominee Relationship</label>
//                 <input
//                   type="text"
//                   name="nominee_relationship"
//                   value={formData.nominee_relationship}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter nominee relationship"
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="row mt-4">
//               <div className="col-12">
//                 <div className="d-flex justify-content-between">
//                   <button
//                     type="button"
//                     className="btn btn-outline-secondary"
//                     onClick={() => navigate("/admin-users")}
//                     disabled={loading}
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     className="btn btn-primary"
//                     style={{
//                       backgroundColor: '#273c75',
//                       borderColor: '#273c75',
//                       color: 'white',
//                       minWidth: '180px'
//                     }}
//                     disabled={loading}
//                   >
//                     {loading ? "Updating..." : "Update User"}
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

// export default EditUser;




import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import "bootstrap/dist/css/bootstrap.min.css";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    marital_status: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pin_code: "",
    status: "active",
    referral_id: "",
    referred_by: "",
    pan_number: "",
    aadhaar_number: "",
    account_holder_name: "",
    bank_name: "",
    branch_name: "",
    account_number: "",
    account_type: "",
    ifsc_code: "",
    nominee_reference_to: "",
    nominee_relationship: "",
    kyc_status: "pending",
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [userRoles, setUserRoles] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    setInitialLoading(true);
    try {
      await fetchUserData();
    } catch (err) {
      console.error("Error loading data:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load data",
        confirmButtonColor: "#6C63FF",
      }).then(() => navigate("/admin-users"));
    } finally {
      setInitialLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      let userData;
      
      // First try to get from location state
      if (location.state?.user) {
        userData = location.state.user;
      } else {
        // Fetch from API if not in state
        const response = await axios.get(`${baseurl}/users/${id}/`);
        userData = response.data;
      }
      
      setUserId(userData.user_id);
      
      // Extract user roles for display
      const roles = userData.roles?.map(role => role.role_name) || [];
      setUserRoles(roles);
      
      // Format date for input field (yyyy-mm-dd)
      // API returns DD-MM-YYYY, input needs YYYY-MM-DD
      const formatDateForInput = (dateStr) => {
        if (!dateStr) return "";
        try {
          const [day, month, year] = dateStr.split("-");
          return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        } catch (error) {
          return "";
        }
      };
      
      setFormData({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        email: userData.email || "",
        phone_number: userData.phone_number || "",
        date_of_birth: formatDateForInput(userData.date_of_birth) || "",
        gender: userData.gender || "",
        marital_status: userData.marital_status || "",
        address: userData.address || "",
        city: userData.city || "",
        state: userData.state || "",
        country: userData.country || "",
        pin_code: userData.pin_code || "",
        status: userData.status || "active",
        referral_id: userData.referral_id || "",
        referred_by: userData.referred_by || "",
        pan_number: userData.pan_number || "",
        aadhaar_number: userData.aadhaar_number || "",
        account_holder_name: userData.account_holder_name || "",
        bank_name: userData.bank_name || "",
        branch_name: userData.branch_name || "",
        account_number: userData.account_number || "",
        account_type: userData.account_type || "",
        ifsc_code: userData.ifsc_code || "",
        nominee_reference_to: userData.nominee_reference_to || "",
        nominee_relationship: userData.nominee_relationship || "",
        kyc_status: userData.kyc_status || "pending",
      });
    } catch (err) {
      console.error("Error fetching user:", err);
      throw err;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.first_name.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter first name",
        confirmButtonColor: "#6C63FF",
      });
      return;
    }

    if (!formData.email.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter email",
        confirmButtonColor: "#6C63FF",
      });
      return;
    }

    setLoading(true);

    try {
      // Prepare the data for update - match API structure
      // API expects YYYY-MM-DD format for dates
      const updateData = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim(),
        phone_number: formData.phone_number || null,
        // Send date in YYYY-MM-DD format
        date_of_birth: formData.date_of_birth || null,
        // Convert gender to lowercase
        gender: formData.gender ? formData.gender.toLowerCase() : null,
        marital_status: formData.marital_status || null,
        address: formData.address || null,
        city: formData.city || null,
        state: formData.state || null,
        country: formData.country || null,
        pin_code: formData.pin_code || null,
        status: formData.status,
        referral_id: formData.referral_id || null,
        referred_by: formData.referred_by || null,
        pan_number: formData.pan_number || null,
        aadhaar_number: formData.aadhaar_number || null,
        account_holder_name: formData.account_holder_name || null,
        bank_name: formData.bank_name || null,
        branch_name: formData.branch_name || null,
        account_number: formData.account_number || null,
        account_type: formData.account_type || null,
        ifsc_code: formData.ifsc_code || null,
        nominee_reference_to: formData.nominee_reference_to || null,
        nominee_relationship: formData.nominee_relationship || null,
        kyc_status: formData.kyc_status,
      };

      console.log("Sending update data:", updateData);

      const response = await axios.put(`${baseurl}/users/${userId}/`, updateData);

      console.log("Update response:", response);

      // Success alert
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User updated successfully",
        confirmButtonColor: "#6C63FF",
        confirmButtonText: "OK",
      }).then(() => navigate("/admin-users"));
    } catch (err) {
      console.error("Update error:", err);
      console.error("Error details:", err.response?.data);

      // Better error message
      let errorMessage = "Failed to update user";
      if (err.response?.data) {
        if (typeof err.response.data === 'object') {
          // Try to extract error messages
          const errors = Object.values(err.response.data).flat();
          errorMessage = errors.join(', ');
        } else if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.detail) {
          errorMessage = err.response.data.detail;
        }
      }

      // Error alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonColor: "#6C63FF",
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <>
        <WebsiteNavbar />
        <div className="container my-4">
          <div className="card p-4 text-center">
            <h4 className="mb-3">Edit User</h4>
            <div className="text-muted">Loading...</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <WebsiteNavbar />

      <div className="container my-4">
        <div className="card p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">Edit User - ID: {userId}</h4>
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/admin-users")}
            >
              Back to List
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="row mb-4">
              <div className="col-12">
                <h5 className="mb-3" style={{ color: '#273c75' }}>Personal Information</h5>
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter first name"
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter last name"
                  disabled={loading}
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter email"
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter phone number"
                  disabled={loading}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="form-control"
                  disabled={loading}
                />
                <small className="text-muted">Format: YYYY-MM-DD</small>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-control"
                  disabled={loading}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <small className="text-muted">Note: Must be lowercase</small>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Marital Status</label>
                <select
                  name="marital_status"
                  value={formData.marital_status}
                  onChange={handleChange}
                  className="form-control"
                  disabled={loading}
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
            </div>

            {/* Address Information */}
            <div className="row mb-4">
              <div className="col-12">
                <h5 className="mb-3" style={{ color: '#273c75' }}>Address Information</h5>
              </div>
              
              <div className="col-12 mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter full address"
                  disabled={loading}
                />
              </div>
              
              <div className="col-md-4 mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter city"
                  disabled={loading}
                />
              </div>
              
              <div className="col-md-4 mb-3">
                <label className="form-label">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter state"
                  disabled={loading}
                />
              </div>
              
              <div className="col-md-4 mb-3">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter country"
                  disabled={loading}
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Pin Code</label>
                <input
                  type="text"
                  name="pin_code"
                  value={formData.pin_code}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter pin code"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Account Information */}
            <div className="row mb-4">
              <div className="col-12">
                <h5 className="mb-3" style={{ color: '#273c75' }}>Account Information</h5>
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Referral ID</label>
                <input
                  type="text"
                  name="referral_id"
                  value={formData.referral_id}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter referral ID"
                  disabled={loading}
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Referred By</label>
                <input
                  type="text"
                  name="referred_by"
                  value={formData.referred_by}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter referred by"
                  disabled={loading}
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-control"
                  disabled={loading}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">KYC Status</label>
                <select
                  name="kyc_status"
                  value={formData.kyc_status}
                  onChange={handleChange}
                  className="form-control"
                  disabled={loading}
                >
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Role</label>
                <div className="form-control" 
                     style={{ 
                       backgroundColor: '#f8f9fa', 
                       border: '1px solid #ced4da',
                       minHeight: '38px',
                       display: 'flex',
                       alignItems: 'center',
                       padding: '6px 12px'
                     }}>
                  {userRoles.length > 0 ? (
                    userRoles.map((role, index) => (
                      <span key={role} className="me-2">
                        {role}
                        {index < userRoles.length - 1 ? ', ' : ''}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted">No roles assigned</span>
                  )}
                </div>
                <small className="text-muted">Roles cannot be edited</small>
              </div>
            </div>

            {/* KYC Information */}
            <div className="row mb-4">
              <div className="col-12">
                <h5 className="mb-3" style={{ color: '#273c75' }}>KYC Information</h5>
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">PAN Number</label>
                <input
                  type="text"
                  name="pan_number"
                  value={formData.pan_number}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter PAN number"
                  disabled={loading}
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Aadhaar Number</label>
                <input
                  type="text"
                  name="aadhaar_number"
                  value={formData.aadhaar_number}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Aadhaar number"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Banking Information */}
            <div className="row mb-4">
              <div className="col-12">
                <h5 className="mb-3" style={{ color: '#273c75' }}>Banking Information</h5>
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Account Holder Name</label>
                <input
                  type="text"
                  name="account_holder_name"
                  value={formData.account_holder_name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter account holder name"
                  disabled={loading}
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Bank Name</label>
                <input
                  type="text"
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter bank name"
                  disabled={loading}
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Branch Name</label>
                <input
                  type="text"
                  name="branch_name"
                  value={formData.branch_name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter branch name"
                  disabled={loading}
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Account Number</label>
                <input
                  type="text"
                  name="account_number"
                  value={formData.account_number}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter account number"
                  disabled={loading}
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Account Type</label>
                <select
                  name="account_type"
                  value={formData.account_type}
                  onChange={handleChange}
                  className="form-control"
                  disabled={loading}
                >
                  <option value="">Select Account Type</option>
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                  <option value="Salary">Salary</option>
                </select>
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">IFSC Code</label>
                <input
                  type="text"
                  name="ifsc_code"
                  value={formData.ifsc_code}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter IFSC code"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Nominee Information */}
            <div className="row mb-4">
              <div className="col-12">
                <h5 className="mb-3" style={{ color: '#273c75' }}>Nominee Information</h5>
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Nominee Reference To</label>
                <input
                  type="text"
                  name="nominee_reference_to"
                  value={formData.nominee_reference_to}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter nominee reference"
                  disabled={loading}
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Nominee Relationship</label>
                <input
                  type="text"
                  name="nominee_relationship"
                  value={formData.nominee_relationship}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter nominee relationship"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="row mt-4">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin-users")}
                    disabled={loading}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      backgroundColor: '#273c75',
                      borderColor: '#273c75',
                      color: 'white',
                      minWidth: '180px'
                    }}
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update User"}
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

export default EditUser;