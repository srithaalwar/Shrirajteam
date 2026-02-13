// import React, { useState, useEffect } from "react";
// import { Container, Card, Form, Button, InputGroup, Spinner } from "react-bootstrap";
// import { Eye, EyeSlash } from "react-bootstrap-icons";
// import { useNavigate } from "react-router-dom";
// import shrirajlogo from "./../Images/shrirajlogo.png";
// import "./Register.css";
// import { baseurl } from '../BaseURL/BaseURL';
// import Swal from "sweetalert2";

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [agree, setAgree] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [fetchingRoles, setFetchingRoles] = useState(true);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//     phone_number: "",
//     role_ids: []
//   });

//   const [roles, setRoles] = useState([]);
//   const [errors, setErrors] = useState({
//     email: "",
//     phone_number: ""
//   });
//   const [helplineNumber, setHelplineNumber] = useState("");

//   // Sponsor ID states (for Agent role)
//   const [sponsorInfo, setSponsorInfo] = useState(null);
//   const [sponsorError, setSponsorError] = useState('');
//   const [showSponsorField, setShowSponsorField] = useState(false);

//   // Fetch roles and helpline number on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       setFetchingRoles(true);
      
//       try {
//         // Fetch roles
//         const rolesResponse = await fetch(`${baseurl}/roles/`);
//         if (!rolesResponse.ok) {
//           throw new Error('Failed to fetch roles');
//         }
//         const rolesData = await rolesResponse.json();
//         console.log("Roles API Response:", rolesData); // Debug log
        
//         // Handle both array and object with results property
//         let rolesList = [];
//         if (Array.isArray(rolesData)) {
//           rolesList = rolesData;
//         } else if (rolesData.results && Array.isArray(rolesData.results)) {
//           rolesList = rolesData.results;
//         }
        
//         // Filter out admin role and sort by role name
//         const filteredRoles = rolesList
//           .filter(role => role.role_name.toLowerCase() !== "admin")
//           .sort((a, b) => a.role_name.localeCompare(b.role_name));
        
//         console.log("Filtered roles for dropdown:", filteredRoles); // Debug log
//         setRoles(filteredRoles);

//         // Fetch helpline number
//         const phoneResponse = await fetch(`${baseurl}/phonenumbers/`);
//         if (phoneResponse.ok) {
//           const phoneData = await phoneResponse.json();
//           if (Array.isArray(phoneData) && phoneData.length > 0 && phoneData[0].phone_number) {
//             setHelplineNumber(phoneData[0].phone_number);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Connection Error",
//           text: "Failed to load registration data. Please try again later.",
//           confirmButtonColor: "#d33"
//         });
//       } finally {
//         setFetchingRoles(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Check sponsor ID for Agent role
//   const checkSponsorId = async (sponsorId) => {
//     if (!sponsorId || sponsorId.trim() === "") {
//       setSponsorInfo(null);
//       setSponsorError('');
//       return;
//     }

//     try {
//       const response = await fetch(`${baseurl}/users/role/Agent/`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch agents');
//       }
//       const agents = await response.json();
//       console.log("Agents fetched for sponsor check:", agents); // Debug log

//       const foundAgent = agents.find(agent => 
//         agent.referral_id && agent.referral_id.toString() === sponsorId.toString()
//       );

//       if (foundAgent) {
//         setSponsorInfo(foundAgent);
//         setSponsorError('');
//         console.log("Sponsor found:", foundAgent); // Debug log
//       } else {
//         setSponsorInfo(null);
//         setSponsorError('Not a valid Sponsor ID');
//         console.log("Sponsor not found for ID:", sponsorId); // Debug log
//       }
//     } catch (error) {
//       setSponsorInfo(null);
//       setSponsorError('Error checking sponsor ID');
//       console.error('Error checking sponsor ID:', error);
//     }
//   };

//   // Handle role change
//   const handleRoleChange = (roleId) => {
//     const selectedRole = roles.find(role => role.role_id === parseInt(roleId));
//     console.log("Selected role:", selectedRole); // Debug log
    
//     setFormData({ ...formData, role_ids: [parseInt(roleId)] });
    
//     const isAgentRole = selectedRole?.role_name === "Agent";
//     setShowSponsorField(isAgentRole);
    
//     // Clear sponsor info when role changes
//     if (!isAgentRole) {
//       setSponsorInfo(null);
//       setSponsorError('');
//     }
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   // Handle sponsor ID change with debounce
//   useEffect(() => {
//     if (showSponsorField && formData.referred_by) {
//       const timer = setTimeout(() => {
//         checkSponsorId(formData.referred_by);
//       }, 500);

//       return () => clearTimeout(timer);
//     }
//   }, [formData.referred_by, showSponsorField]);

//   // Handle sponsor ID input change
//   const handleSponsorChange = (e) => {
//     const value = e.target.value;
//     setFormData({ ...formData, referred_by: value });
//     setSponsorError('');
//     setSponsorInfo(null);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     const newErrors = {};
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     if (!formData.phone_number.trim()) newErrors.phone_number = "Phone number is required";
//     if (!formData.role_ids.length) {
//       Swal.fire({
//         icon: "error",
//         title: "Role Required",
//         text: "Please select a role",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     if (!agree) {
//       Swal.fire({
//         icon: "warning",
//         title: "Terms Required",
//         text: "Please agree to the Terms & Conditions and Privacy Policy",
//         confirmButtonColor: "#3085d6"
//       });
//       return;
//     }

//     // If Agent role and sponsor field is shown, validate sponsor
//     if (showSponsorField) {
//       const selectedRole = roles.find(role => role.role_id === formData.role_ids[0]);
//       if (selectedRole?.role_name === "Agent" && (!formData.referred_by || sponsorError)) {
//         Swal.fire({
//           icon: "error",
//           title: "Sponsor ID Required",
//           text: "Please enter a valid Sponsor ID for Agent registration",
//           confirmButtonColor: "#d33"
//         });
//         return;
//       }
//     }

//     setLoading(true);

//     // Prepare full form data with additional required fields
//     const completeFormData = {
//       ...formData,
//       status: "active",
//       kyc_status: "pending",
//       referral_id: "",
//       date_of_birth: "",
//       gender: "",
//       address: "",
//       city: "",
//       state: "",
//       country: "",
//       pin_code: "",
//       pan_number: "",
//       aadhaar_number: "",
//       account_holder_name: "",
//       bank_name: "",
//       branch_name: "",
//       account_number: "",
//       account_type: "",
//       ifsc_code: "",
//       nominee_reference_to: ""
//     };

//     console.log("Submitting form data:", completeFormData); // Debug log

//     try {
//       const response = await fetch(`${baseurl}/users/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(completeFormData),
//       });

//       const responseData = await response.json();
//       console.log("Registration response:", responseData); // Debug log

//       if (response.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Registration Successful!",
//           text: "You have been registered successfully!",
//           confirmButtonColor: "#3085d6"
//         }).then(() => {
//           navigate("/login");
//         });
//       } else {
//         // Handle backend validation errors
//         const backendErrors = {};
//         if (responseData.email) {
//           backendErrors.email = Array.isArray(responseData.email) 
//             ? responseData.email[0] 
//             : "Email already exists";
//         }
//         if (responseData.phone_number) {
//           backendErrors.phone_number = Array.isArray(responseData.phone_number)
//             ? responseData.phone_number[0]
//             : "Phone number already exists";
//         }
        
//         if (Object.keys(backendErrors).length > 0) {
//           setErrors(backendErrors);
//         }

//         Swal.fire({
//           icon: "error",
//           title: "Registration Failed",
//           text: responseData.message || responseData.detail || "Please check the form for errors.",
//           confirmButtonColor: "#d33"
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Network Error",
//         text: "An error occurred while submitting the form. Please try again.",
//         confirmButtonColor: "#d33"
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle login navigation
//   const handleLoginClick = () => {
//     navigate("/login");
//   };

//   // Handle terms link click
//   const handleTermsClick = () => {
//     window.open("/termsandconditions", "_blank");
//   };

//   // Handle privacy policy click
//   const handlePrivacyClick = () => {
//     window.open("/privacypolicy", "_blank");
//   };

//   return (
//     <div className="register-bg">
//       <span className="register-close" onClick={() => navigate("/")}>✕</span>

//       <Container className="register-container">
//         <Card className="register-card">
//           <Card.Body>
//             {/* Logo + Brand */}
//             <div className="register-brand-row">
//               <img src={shrirajlogo} alt="Shriraj Logo" className="register-logo" />
//               <span className="register-brand-name">Shriraj</span>
//             </div>

//             {/* Title */}
//             <div className="register-title">Registration</div>

//             <Form onSubmit={handleSubmit}>
//               {/* First & Last Name */}
//               <div className="register-two-col">
//                 <Form.Control
//                   type="text"
//                   name="first_name"
//                   placeholder="First Name *"
//                   className="register-input"
//                   value={formData.first_name}
//                   onChange={handleChange}
//                   required
//                 />
//                 <Form.Control
//                   type="text"
//                   name="last_name"
//                   placeholder="Last Name *"
//                   className="register-input"
//                   value={formData.last_name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Email & Password */}
//               <div className="register-two-col">
//                 <Form.Control
//                   type="email"
//                   name="email"
//                   placeholder="Email *"
//                   className="register-input"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   isInvalid={!!errors.email}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors.email}
//                 </Form.Control.Feedback>

//                 <InputGroup>
//                   <Form.Control
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     placeholder="Password *"
//                     className="register-input"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     minLength="6"
//                   />
//                   <InputGroup.Text
//                     className="register-eye"
//                     onClick={() => setShowPassword(!showPassword)}
//                     style={{ cursor: "pointer" }}
//                   >
//                     {showPassword ? <EyeSlash /> : <Eye />}
//                   </InputGroup.Text>
//                 </InputGroup>
//               </div>

//               {/* Phone & Role */}
//               <div className="register-two-col">
//                 <Form.Control
//                   type="tel"
//                   name="phone_number"
//                   placeholder="Phone Number *"
//                   className="register-input"
//                   value={formData.phone_number}
//                   onChange={handleChange}
//                   required
//                   isInvalid={!!errors.phone_number}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors.phone_number}
//                 </Form.Control.Feedback>

//                 {fetchingRoles ? (
//                   <div className="register-input" style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     height: "44px"
//                   }}>
//                     <Spinner animation="border" size="sm" />
//                     <span className="ms-2">Loading roles...</span>
//                   </div>
//                 ) : (
//                   <Form.Select 
//                     className="register-input"
//                     value={formData.role_ids[0] || ""}
//                     onChange={(e) => handleRoleChange(e.target.value)}
//                     required
//                   >
//                     <option value="">Select Role *</option>
//                     {roles.length > 0 ? (
//                       roles.map((role) => (
//                         <option key={role.role_id} value={role.role_id}>
//                           {role.role_name === "Agent"
//                             ? "Team"
//                             : role.role_name === "Client"
//                             ? "User"
//                             : role.role_name}
//                         </option>
//                       ))
//                     ) : (
//                       <option value="" disabled>No roles available</option>
//                     )}
//                   </Form.Select>
//                 )}
//               </div>

//               {/* Sponsor ID Field (Only for Agent role) */}
//               {showSponsorField && (
//                 <div className="mb-3">
//                   <Form.Control
//                     type="text"
//                     name="referred_by"
//                     placeholder="Sponsor ID (Required for Team registration)"
//                     className="register-input mb-2"
//                     value={formData.referred_by || ""}
//                     onChange={handleSponsorChange}
//                     isInvalid={!!sponsorError}
//                   />
//                   {sponsorError && (
//                     <Form.Control.Feedback type="invalid">
//                       {sponsorError}
//                     </Form.Control.Feedback>
//                   )}
//                   {sponsorInfo && (
//                     <div className="text-success small mt-1">
//                       ✓ Valid Sponsor: <strong>{sponsorInfo.first_name} {sponsorInfo.last_name}</strong>
//                       {sponsorInfo.phone_number && ` (${sponsorInfo.phone_number})`}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Terms */}
//               <Form.Check
//                 type="checkbox"
//                 className="register-terms"
//                 checked={agree}
//                 onChange={() => setAgree(!agree)}
//                 label={
//                   <>
//                     I agree to the{" "}
//                     <span className="register-link" onClick={handleTermsClick}>
//                       Terms & Conditions
//                     </span>{" "}
//                     and{" "}
//                     <span className="register-link" onClick={handlePrivacyClick}>
//                       Privacy Policy
//                     </span>
//                   </>
//                 }
//               />

//               {/* Helpline */}
//               <div className="register-helpline">
//                 Helpline Number: <strong>{helplineNumber || "9399492809"}</strong>
//               </div>

//               {/* Register Button */}
//               <Button 
//                 className="register-btn" 
//                 type="submit"
//                 disabled={!agree || loading || fetchingRoles}
//               >
//                 {loading ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                     Registering...
//                   </>
//                 ) : (
//                   "Register"
//                 )}
//               </Button>

//               {/* Login link */}
//               <div className="register-footer">
//                 Already registered?{" "}
//                 <span
//                   className="register-link"
//                   onClick={handleLoginClick}
//                   style={{ cursor: "pointer" }}
//                 >
//                   Login
//                 </span>
//               </div>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Container>
//     </div>
//   );
// };

// export default Register;


// import React, { useState, useEffect } from "react";
// import { Container, Card, Form, Button, InputGroup, Spinner } from "react-bootstrap";
// import { Eye, EyeSlash } from "react-bootstrap-icons";
// import { useNavigate } from "react-router-dom";
// import shrirajlogo from "./../Images/shrirajlogo.png";
// import "./Register.css";
// import { baseurl } from '../BaseURL/BaseURL';
// import Swal from "sweetalert2";

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [agree, setAgree] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [fetchingRoles, setFetchingRoles] = useState(true);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//     phone_number: "",
//     role_ids: [],
//     referred_by: "" // Add referred_by to formData
//   });

//   const [roles, setRoles] = useState([]);
//   const [errors, setErrors] = useState({
//     email: "",
//     phone_number: ""
//   });
//   const [helplineNumber, setHelplineNumber] = useState("");

//   // Sponsor ID states (for Agent role)
//   const [sponsorInfo, setSponsorInfo] = useState(null);
//   const [sponsorError, setSponsorError] = useState('');
//   const [showSponsorField, setShowSponsorField] = useState(false);

//   // Fetch roles and helpline number on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       setFetchingRoles(true);
      
//       try {
//         // Fetch roles
//         const rolesResponse = await fetch(`${baseurl}/roles/`);
//         if (!rolesResponse.ok) {
//           throw new Error('Failed to fetch roles');
//         }
//         const rolesData = await rolesResponse.json();
//         console.log("Roles API Response:", rolesData);
        
//         // Handle both array and object with results property
//         let rolesList = [];
//         if (Array.isArray(rolesData)) {
//           rolesList = rolesData;
//         } else if (rolesData.results && Array.isArray(rolesData.results)) {
//           rolesList = rolesData.results;
//         }
        
//         // Filter out admin role and sort by role name
//         const filteredRoles = rolesList
//           .filter(role => role.role_name.toLowerCase() !== "admin")
//           .sort((a, b) => a.role_name.localeCompare(b.role_name));
        
//         console.log("Filtered roles for dropdown:", filteredRoles);
//         setRoles(filteredRoles);

//         // Fetch helpline number
//         const phoneResponse = await fetch(`${baseurl}/phonenumbers/`);
//         if (phoneResponse.ok) {
//           const phoneData = await phoneResponse.json();
//           if (Array.isArray(phoneData) && phoneData.length > 0 && phoneData[0].phone_number) {
//             setHelplineNumber(phoneData[0].phone_number);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Connection Error",
//           text: "Failed to load registration data. Please try again later.",
//           confirmButtonColor: "#d33"
//         });
//       } finally {
//         setFetchingRoles(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Check sponsor ID for Agent role
//   const checkSponsorId = async (sponsorId) => {
//     if (!sponsorId || sponsorId.trim() === "") {
//       setSponsorInfo(null);
//       setSponsorError('');
//       return;
//     }

//     try {
//       const response = await fetch(`${baseurl}/users/role/Agent/`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch agents');
//       }
//       const agents = await response.json();

//       const foundAgent = agents.find(agent => 
//         agent.referral_id && agent.referral_id.toString() === sponsorId.toString()
//       );

//       if (foundAgent) {
//         setSponsorInfo(foundAgent);
//         setSponsorError('');
//       } else {
//         setSponsorInfo(null);
//         setSponsorError('Not a valid Sponsor ID');
//       }
//     } catch (error) {
//       setSponsorInfo(null);
//       setSponsorError('Error checking sponsor ID');
//       console.error('Error checking sponsor ID:', error);
//     }
//   };

//   // Handle role change
//   const handleRoleChange = (roleId) => {
//     const selectedRole = roles.find(role => role.role_id === parseInt(roleId));
    
//     setFormData({ ...formData, role_ids: [parseInt(roleId)] });
    
//     const isAgentRole = selectedRole?.role_name === "Agent";
//     setShowSponsorField(isAgentRole);
    
//     // Clear sponsor info when role changes
//     if (!isAgentRole) {
//       setFormData(prev => ({ ...prev, referred_by: "" }));
//       setSponsorInfo(null);
//       setSponsorError('');
//     }
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   // Handle sponsor ID change with debounce
//   useEffect(() => {
//     if (showSponsorField && formData.referred_by) {
//       const timer = setTimeout(() => {
//         checkSponsorId(formData.referred_by);
//       }, 500);

//       return () => clearTimeout(timer);
//     }
//   }, [formData.referred_by, showSponsorField]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[0-9]{10}$/;

//     if (!formData.first_name.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "First Name Required",
//         text: "Please enter your first name",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     if (!formData.last_name.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Last Name Required",
//         text: "Please enter your last name",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (!formData.password.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Password Required",
//         text: "Please enter a password",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     } else if (formData.password.length < 6) {
//       Swal.fire({
//         icon: "error",
//         title: "Password Too Short",
//         text: "Password must be at least 6 characters",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     if (!formData.phone_number.trim()) {
//       newErrors.phone_number = "Phone number is required";
//     } else if (!phoneRegex.test(formData.phone_number)) {
//       newErrors.phone_number = "Please enter a valid 10-digit phone number";
//     }

//     if (!formData.role_ids.length) {
//       Swal.fire({
//         icon: "error",
//         title: "Role Required",
//         text: "Please select a role",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     if (!agree) {
//       Swal.fire({
//         icon: "warning",
//         title: "Terms Required",
//         text: "Please agree to the Terms & Conditions and Privacy Policy",
//         confirmButtonColor: "#3085d6"
//       });
//       return;
//     }

//     // If Agent role and sponsor field is shown, validate sponsor
//     if (showSponsorField) {
//       const selectedRole = roles.find(role => role.role_id === formData.role_ids[0]);
//       if (selectedRole?.role_name === "Agent" && (!formData.referred_by || sponsorError)) {
//         Swal.fire({
//           icon: "error",
//           title: "Sponsor ID Required",
//           text: "Please enter a valid Sponsor ID for Team registration",
//           confirmButtonColor: "#d33"
//         });
//         return;
//       }
//     }

//     setLoading(true);

//     // Prepare form data - only send fields that are actually needed
//     const submitData = {
//       first_name: formData.first_name.trim(),
//       last_name: formData.last_name.trim(),
//       email: formData.email.trim(),
//       password: formData.password,
//       phone_number: formData.phone_number.trim(),
//       role_ids: formData.role_ids,
//       status: "active",
//       kyc_status: "pending"
//     };

//     // Add sponsor ID only if it exists
//     if (formData.referred_by && formData.referred_by.trim()) {
//       submitData.referred_by = formData.referred_by.trim();
//     }

//     console.log("Submitting form data:", submitData);

//     try {
//       const response = await fetch(`${baseurl}/users/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(submitData),
//       });

//       const responseData = await response.json();
//       console.log("Registration response:", responseData);

//       if (response.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Registration Successful!",
//           text: "You have been registered successfully!",
//           confirmButtonColor: "#3085d6"
//         }).then(() => {
//           navigate("/login");
//         });
//       } else {
//         // Handle backend validation errors
//         const backendErrors = {};
//         if (responseData.email) {
//           backendErrors.email = Array.isArray(responseData.email) 
//             ? responseData.email[0] 
//             : "Email already exists";
//         }
//         if (responseData.phone_number) {
//           backendErrors.phone_number = Array.isArray(responseData.phone_number)
//             ? responseData.phone_number[0]
//             : "Phone number already exists";
//         }
        
//         // Parse error message if it's a string
//         if (responseData.error && typeof responseData.error === 'string') {
//           try {
//             // Try to parse the error string as JSON
//             const parsedError = JSON.parse(responseData.error.replace(/'/g, '"'));
//             if (parsedError.date_of_birth) {
//               console.error("Date format error:", parsedError.date_of_birth);
//             }
//           } catch (parseError) {
//             console.error("Error parsing error message:", responseData.error);
//           }
//         }

//         if (Object.keys(backendErrors).length > 0) {
//           setErrors(backendErrors);
//         }

//         Swal.fire({
//           icon: "error",
//           title: "Registration Failed",
//           text: responseData.message || responseData.detail || "Please check the form for errors.",
//           confirmButtonColor: "#d33"
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Network Error",
//         text: "An error occurred while submitting the form. Please try again.",
//         confirmButtonColor: "#d33"
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle login navigation
//   const handleLoginClick = () => {
//     navigate("/login");
//   };

//   // Handle terms link click
//   const handleTermsClick = () => {
//     window.open("/termsandconditions", "_blank");
//   };

//   // Handle privacy policy click
//   const handlePrivacyClick = () => {
//     window.open("/privacypolicy", "_blank");
//   };

//   return (
//     <div className="register-bg">
//       <span className="register-close" onClick={() => navigate("/")}>✕</span>

//       <Container className="register-container">
//         <Card className="register-card">
//           <Card.Body>
//             {/* Logo + Brand */}
//             <div className="register-brand-row">
//               <img src={shrirajlogo} alt="Shriraj Logo" className="register-logo" />
//               <span className="register-brand-name">Shriraj</span>
//             </div>

//             {/* Title */}
//             <div className="register-title">Registration</div>

//             <Form onSubmit={handleSubmit}>
//               {/* First & Last Name */}
//               <div className="register-two-col">
//                 <Form.Control
//                   type="text"
//                   name="first_name"
//                   placeholder="First Name *"
//                   className="register-input"
//                   value={formData.first_name}
//                   onChange={handleChange}
//                 />
//                 <Form.Control
//                   type="text"
//                   name="last_name"
//                   placeholder="Last Name *"
//                   className="register-input"
//                   value={formData.last_name}
//                   onChange={handleChange}
//                 />
//               </div>

//               {/* Email & Password */}
//               <div className="register-two-col">
//                 <Form.Control
//                   type="email"
//                   name="email"
//                   placeholder="Email *"
//                   className="register-input"
//                   value={formData.email}
//                   onChange={handleChange}
//                   isInvalid={!!errors.email}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors.email}
//                 </Form.Control.Feedback>

//                 <InputGroup>
//                   <Form.Control
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     placeholder="Password * (min 6 characters)"
//                     className="register-input"
//                     value={formData.password}
//                     onChange={handleChange}
//                   />
//                   <InputGroup.Text
//                     className="register-eye"
//                     onClick={() => setShowPassword(!showPassword)}
//                     style={{ cursor: "pointer" }}
//                   >
//                     {showPassword ? <EyeSlash /> : <Eye />}
//                   </InputGroup.Text>
//                 </InputGroup>
//               </div>

//               {/* Phone & Role */}
//               <div className="register-two-col">
//                 <Form.Control
//                   type="tel"
//                   name="phone_number"
//                   placeholder="Phone Number * (10 digits)"
//                   className="register-input"
//                   value={formData.phone_number}
//                   onChange={handleChange}
//                   isInvalid={!!errors.phone_number}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors.phone_number}
//                 </Form.Control.Feedback>

//                 {fetchingRoles ? (
//                   <div className="register-input" style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     height: "44px"
//                   }}>
//                     <Spinner animation="border" size="sm" />
//                     <span className="ms-2">Loading roles...</span>
//                   </div>
//                 ) : (
//                   <Form.Select 
//                     className="register-input"
//                     value={formData.role_ids[0] || ""}
//                     onChange={(e) => handleRoleChange(e.target.value)}
//                   >
//                     <option value="">Select Role *</option>
//                     {roles.length > 0 ? (
//                       roles.map((role) => (
//                         <option key={role.role_id} value={role.role_id}>
//                           {role.role_name === "Agent"
//                             ? "Team"
//                             : role.role_name === "Client"
//                             ? "User"
//                             : role.role_name}
//                         </option>
//                       ))
//                     ) : (
//                       <option value="" disabled>No roles available</option>
//                     )}
//                   </Form.Select>
//                 )}
//               </div>

//               {/* Sponsor ID Field (Only for Agent role) */}
//               {showSponsorField && (
//                 <div className="mb-3">
//                   <Form.Control
//                     type="text"
//                     name="referred_by"
//                     placeholder="Sponsor ID (Required for Team registration)"
//                     className="register-input mb-2"
//                     value={formData.referred_by}
//                     onChange={handleChange}
//                     isInvalid={!!sponsorError}
//                   />
//                   {sponsorError && (
//                     <Form.Control.Feedback type="invalid">
//                       {sponsorError}
//                     </Form.Control.Feedback>
//                   )}
//                   {sponsorInfo && (
//                     <div className="text-success small mt-1">
//                       ✓ Valid Sponsor: <strong>{sponsorInfo.first_name} {sponsorInfo.last_name}</strong>
//                       {sponsorInfo.phone_number && ` (${sponsorInfo.phone_number})`}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Terms */}
//               <Form.Check
//                 type="checkbox"
//                 className="register-terms"
//                 checked={agree}
//                 onChange={() => setAgree(!agree)}
//                 label={
//                   <>
//                     I agree to the{" "}
//                     <span className="register-link" onClick={handleTermsClick}>
//                       Terms & Conditions
//                     </span>{" "}
//                     and{" "}
//                     <span className="register-link" onClick={handlePrivacyClick}>
//                       Privacy Policy
//                     </span>
//                   </>
//                 }
//               />

//               {/* Helpline */}
//               <div className="register-helpline">
//                 Helpline Number: <strong>{helplineNumber || "9399492809"}</strong>
//               </div>

//               {/* Register Button */}
//               <Button 
//                 className="register-btn" 
//                 type="submit"
//                 disabled={!agree || loading || fetchingRoles}
//               >
//                 {loading ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                     Registering...
//                   </>
//                 ) : (
//                   "Register"
//                 )}
//               </Button>

//               {/* Login link */}
//               <div className="register-footer">
//                 Already registered?{" "}
//                 <span
//                   className="register-link"
//                   onClick={handleLoginClick}
//                   style={{ cursor: "pointer" }}
//                 >
//                   Login
//                 </span>
//               </div>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Container>
//     </div>
//   );
// };

// export default Register;




// import React, { useState, useEffect } from "react";
// import { Container, Card, Form, Button, InputGroup, Spinner } from "react-bootstrap";
// import { Eye, EyeSlash } from "react-bootstrap-icons";
// import { useNavigate } from "react-router-dom";
// import shrirajlogo from "./../Images/shrirajlogo.png";
// import "./Register.css";
// import { baseurl } from '../BaseURL/BaseURL';
// import Swal from "sweetalert2";

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [agree, setAgree] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [fetchingRoles, setFetchingRoles] = useState(true);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//     phone_number: "",
//     role_ids: [],
//     referred_by: "" // Add referred_by to formData
//   });

//   const [roles, setRoles] = useState([]);
//   const [errors, setErrors] = useState({
//     email: "",
//     phone_number: ""
//   });
//   const [helplineNumber, setHelplineNumber] = useState("");

//   // Sponsor ID states (for Agent role)
//   const [sponsorInfo, setSponsorInfo] = useState(null);
//   const [sponsorError, setSponsorError] = useState('');
//   const [showSponsorField, setShowSponsorField] = useState(false);
//   const [checkingSponsor, setCheckingSponsor] = useState(false);

//   // Fetch roles and helpline number on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       setFetchingRoles(true);
      
//       try {
//         // Fetch roles
//         const rolesResponse = await fetch(`${baseurl}/roles/`);
//         if (!rolesResponse.ok) {
//           throw new Error('Failed to fetch roles');
//         }
//         const rolesData = await rolesResponse.json();
//         console.log("Roles API Response:", rolesData);
        
//         // Handle both array and object with results property
//         let rolesList = [];
//         if (Array.isArray(rolesData)) {
//           rolesList = rolesData;
//         } else if (rolesData.results && Array.isArray(rolesData.results)) {
//           rolesList = rolesData.results;
//         }
        
//         // Filter out admin role and sort by role name
//         const filteredRoles = rolesList
//           .filter(role => role.role_name.toLowerCase() !== "admin")
//           .sort((a, b) => a.role_name.localeCompare(b.role_name));
        
//         console.log("Filtered roles for dropdown:", filteredRoles);
//         setRoles(filteredRoles);

//         // Fetch helpline number
//         const phoneResponse = await fetch(`${baseurl}/phonenumbers/`);
//         if (phoneResponse.ok) {
//           const phoneData = await phoneResponse.json();
//           if (Array.isArray(phoneData) && phoneData.length > 0 && phoneData[0].phone_number) {
//             setHelplineNumber(phoneData[0].phone_number);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Connection Error",
//           text: "Failed to load registration data. Please try again later.",
//           confirmButtonColor: "#d33"
//         });
//       } finally {
//         setFetchingRoles(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Check sponsor ID for Agent role (only when user enters a value)
//   const checkSponsorId = async (sponsorId) => {
//     if (!sponsorId || sponsorId.trim() === "") {
//       setSponsorInfo(null);
//       setSponsorError('');
//       setCheckingSponsor(false);
//       return;
//     }

//     setCheckingSponsor(true);
//     setSponsorError('');
//     setSponsorInfo(null);

//     try {
//       const response = await fetch(`${baseurl}/users/role/Agent/`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch agents');
//       }
//       const agents = await response.json();

//       const foundAgent = agents.find(agent => 
//         agent.referral_id && agent.referral_id.toString() === sponsorId.toString()
//       );

//       if (foundAgent) {
//         setSponsorInfo(foundAgent);
//         setSponsorError('');
//       } else {
//         setSponsorInfo(null);
//         setSponsorError('Not a valid Sponsor ID');
//       }
//     } catch (error) {
//       setSponsorInfo(null);
//       setSponsorError('Error checking sponsor ID');
//       console.error('Error checking sponsor ID:', error);
//     } finally {
//       setCheckingSponsor(false);
//     }
//   };

//   // Handle role change
//   const handleRoleChange = (roleId) => {
//     const selectedRole = roles.find(role => role.role_id === parseInt(roleId));
    
//     setFormData(prev => ({ 
//       ...prev, 
//       role_ids: [parseInt(roleId)],
//       referred_by: "" // Clear sponsor ID when role changes
//     }));
    
//     const isAgentRole = selectedRole?.role_name === "Agent";
//     setShowSponsorField(isAgentRole);
    
//     // Clear sponsor info when role changes
//     if (!isAgentRole) {
//       setSponsorInfo(null);
//       setSponsorError('');
//     }
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   // Handle sponsor ID change with debounce
//   useEffect(() => {
//     if (showSponsorField && formData.referred_by) {
//       const timer = setTimeout(() => {
//         checkSponsorId(formData.referred_by);
//       }, 800); // Increased debounce time

//       return () => clearTimeout(timer);
//     } else if (showSponsorField && !formData.referred_by) {
//       // Clear sponsor info if field is empty
//       setSponsorInfo(null);
//       setSponsorError('');
//       setCheckingSponsor(false);
//     }
//   }, [formData.referred_by, showSponsorField]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[0-9]{10}$/;

//     if (!formData.first_name.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "First Name Required",
//         text: "Please enter your first name",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     if (!formData.last_name.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Last Name Required",
//         text: "Please enter your last name",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (!formData.password.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Password Required",
//         text: "Please enter a password",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     } else if (formData.password.length < 6) {
//       Swal.fire({
//         icon: "error",
//         title: "Password Too Short",
//         text: "Password must be at least 6 characters",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     if (!formData.phone_number.trim()) {
//       newErrors.phone_number = "Phone number is required";
//     } else if (!phoneRegex.test(formData.phone_number)) {
//       newErrors.phone_number = "Please enter a valid 10-digit phone number";
//     }

//     if (!formData.role_ids.length) {
//       Swal.fire({
//         icon: "error",
//         title: "Role Required",
//         text: "Please select a role",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     if (!agree) {
//       Swal.fire({
//         icon: "warning",
//         title: "Terms Required",
//         text: "Please agree to the Terms & Conditions and Privacy Policy",
//         confirmButtonColor: "#3085d6"
//       });
//       return;
//     }

//     // Validate sponsor ID only if entered (optional)
//     if (showSponsorField && formData.referred_by && sponsorError) {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Sponsor ID",
//         text: "Please enter a valid Sponsor ID or leave it blank",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     setLoading(true);

//     // Prepare form data
//     const submitData = {
//       first_name: formData.first_name.trim(),
//       last_name: formData.last_name.trim(),
//       email: formData.email.trim(),
//       password: formData.password,
//       phone_number: formData.phone_number.trim(),
//       role_ids: formData.role_ids,
//       status: "active",
//       kyc_status: "pending"
//     };

//     // Add sponsor ID only if it exists and is valid
//     if (formData.referred_by && formData.referred_by.trim() && !sponsorError) {
//       submitData.referred_by = formData.referred_by.trim();
//     }
//     // If sponsor ID is entered but has error, don't submit
//     else if (formData.referred_by && formData.referred_by.trim() && sponsorError) {
//       setLoading(false);
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Sponsor ID",
//         text: "Please enter a valid Sponsor ID or leave it blank",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     console.log("Submitting form data:", submitData);

//     try {
//       const response = await fetch(`${baseurl}/users/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(submitData),
//       });

//       const responseData = await response.json();
//       console.log("Registration response:", responseData);

//       if (response.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Registration Successful!",
//           text: "You have been registered successfully!",
//           confirmButtonColor: "#3085d6"
//         }).then(() => {
//           navigate("/login");
//         });
//       } else {
//         // Handle backend validation errors
//         const backendErrors = {};
//         if (responseData.email) {
//           backendErrors.email = Array.isArray(responseData.email) 
//             ? responseData.email[0] 
//             : "Email already exists";
//         }
//         if (responseData.phone_number) {
//           backendErrors.phone_number = Array.isArray(responseData.phone_number)
//             ? responseData.phone_number[0]
//             : "Phone number already exists";
//         }
        
//         // Parse error message if it's a string
//         if (responseData.error && typeof responseData.error === 'string') {
//           try {
//             // Try to parse the error string as JSON
//             const parsedError = JSON.parse(responseData.error.replace(/'/g, '"'));
//             if (parsedError.date_of_birth) {
//               console.error("Date format error:", parsedError.date_of_birth);
//             }
//           } catch (parseError) {
//             console.error("Error parsing error message:", responseData.error);
//           }
//         }

//         if (Object.keys(backendErrors).length > 0) {
//           setErrors(backendErrors);
//         }

//         Swal.fire({
//           icon: "error",
//           title: "Registration Failed",
//           text: responseData.message || responseData.detail || "Please check the form for errors.",
//           confirmButtonColor: "#d33"
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Network Error",
//         text: "An error occurred while submitting the form. Please try again.",
//         confirmButtonColor: "#d33"
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle login navigation
//   const handleLoginClick = () => {
//     navigate("/login");
//   };

//   // Handle terms link click
//   const handleTermsClick = () => {
//     window.open("/terms-and-conditions", "_blank");

//   };

//   // Handle privacy policy click
//   const handlePrivacyClick = () => {
//     window.open("/privacy-policy", "_blank");
//   };

//   return (
//     <div className="register-bg">
//       <span className="register-close" onClick={() => navigate("/")}>✕</span>

//       <Container className="register-container">
//         <Card className="register-card">
//           <Card.Body>
//             {/* Logo + Brand */}
//             <div className="register-brand-row">
//               <img src={shrirajlogo} alt="Shriraj Logo" className="register-logo" />
//             </div>

//             {/* Title */}
//             <div className="register-title">Registration</div>

//             <Form onSubmit={handleSubmit}>
//               {/* First & Last Name */}
//               <div className="register-form-grid">
//                 <div className="form-group-container">
//                   <Form.Control
//                     type="text"
//                     name="first_name"
//                     placeholder="First Name *"
//                     className="register-input"
//                     value={formData.first_name}
//                     onChange={handleChange}
//                   />
//                   <div className="error-feedback"></div>
//                 </div>
                
//                 <div className="form-group-container">
//                   <Form.Control
//                     type="text"
//                     name="last_name"
//                     placeholder="Last Name *"
//                     className="register-input"
//                     value={formData.last_name}
//                     onChange={handleChange}
//                   />
//                   <div className="error-feedback"></div>
//                 </div>
//               </div>

//               {/* Email & Password */}
//               <div className="register-form-grid">
//                 <div className="form-group-container">
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     placeholder="Email *"
//                     className="register-input"
//                     value={formData.email}
//                     onChange={handleChange}
//                     isInvalid={!!errors.email}
//                   />
//                   <Form.Control.Feedback type="invalid" className="error-feedback">
//                     {errors.email}
//                   </Form.Control.Feedback>
//                 </div>

//                 <div className="form-group-container">
//                   <InputGroup>
//                     <Form.Control
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       placeholder="Password * (min 6 characters)"
//                       className="register-input"
//                       value={formData.password}
//                       onChange={handleChange}
//                     />
//                     <InputGroup.Text
//                       className="register-eye eye-icon"
//                       onClick={() => setShowPassword(!showPassword)}
//                       style={{ cursor: "pointer" }}
//                     >
//                       {showPassword ? <EyeSlash /> : <Eye />}
//                     </InputGroup.Text>
//                   </InputGroup>
//                   <div className="error-feedback"></div>
//                 </div>
//               </div>

//               {/* Phone & Role */}
//               <div className="register-form-grid">
//                 <div className="form-group-container">
//                   <Form.Control
//                     type="tel"
//                     name="phone_number"
//                     placeholder="Phone Number * (10 digits)"
//                     className="register-input"
//                     value={formData.phone_number}
//                     onChange={handleChange}
//                     isInvalid={!!errors.phone_number}
//                   />
//                   <Form.Control.Feedback type="invalid" className="error-feedback">
//                     {errors.phone_number}
//                   </Form.Control.Feedback>
//                 </div>

//                 <div className="form-group-container">
//                   {fetchingRoles ? (
//                     <div className="spinner-wrapper">
//                       <Spinner animation="border" size="sm" />
//                       <span className="ms-2">Loading roles...</span>
//                     </div>
//                   ) : (
//                     <Form.Select 
//                       className="register-input"
//                       value={formData.role_ids[0] || ""}
//                       onChange={(e) => handleRoleChange(e.target.value)}
//                     >
//                       <option value="">Select Role *</option>
//                       {roles.length > 0 ? (
//                         roles.map((role) => (
//                           <option key={role.role_id} value={role.role_id}>
//                             {role.role_name === "Agent"
//                               ? "Team"
//                               : role.role_name === "Client"
//                               ? "User"
//                               : role.role_name}
//                           </option>
//                         ))
//                       ) : (
//                         <option value="" disabled>No roles available</option>
//                       )}
//                     </Form.Select>
//                   )}
//                   <div className="error-feedback"></div>
//                 </div>
//               </div>

//               {/* Sponsor ID Field (Only for Agent/Team role - Optional) */}
//               {showSponsorField && (
//                 <div className="register-form-grid full-width">
//                   <div className="form-group-container">
//                     <Form.Control
//                       type="text"
//                       name="referred_by"
//                       placeholder="Sponsor ID (Optional for Team registration)"
//                       className="register-input"
//                       value={formData.referred_by}
//                       onChange={handleChange}
//                       isInvalid={!!sponsorError && formData.referred_by !== ""}
//                     />
                    
//                     {/* Show validation feedback */}
//                     {sponsorError && formData.referred_by !== "" && (
//                       <Form.Control.Feedback type="invalid" className="error-feedback">
//                         {sponsorError}
//                       </Form.Control.Feedback>
//                     )}
                    
//                     {/* Show loading indicator */}
//                     {checkingSponsor && (
//                       <div className="sponsor-loading sponsor-feedback">
//                         <Spinner animation="border" size="sm" className="me-1" />
//                         Checking sponsor ID...
//                       </div>
//                     )}
                    
//                     {/* Show valid sponsor info */}
//                     {sponsorInfo && !sponsorError && (
//                       <div className="sponsor-valid sponsor-feedback">
//                         ✓ Valid Sponsor: <strong>{sponsorInfo.first_name} {sponsorInfo.last_name}</strong>
//                         {sponsorInfo.phone_number && ` (${sponsorInfo.phone_number})`}
//                       </div>
//                     )}
                    
//                     {/* Helper text */}
//                     {!sponsorError && !checkingSponsor && !sponsorInfo && formData.referred_by === "" && (
//                       <div className="sponsor-loading sponsor-feedback">
//                         Enter Sponsor ID if you have one (optional)
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Terms */}
//               <div className="register-terms-container">
//                 <Form.Check
//                   type="checkbox"
//                   className="register-terms"
//                   checked={agree}
//                   onChange={() => setAgree(!agree)}
//                   label={
//                     <>
//                       I agree to the{" "}
//                       <span className="register-link" onClick={handleTermsClick}>
//                         Terms & Conditions
//                       </span>{" "}
//                       and{" "}
//                       <span className="register-link" onClick={handlePrivacyClick}>
//                         Privacy Policy
//                       </span>
//                     </>
//                   }
//                 />
//               </div>

//               {/* Helpline */}
//               <div className="register-helpline">
//                 Helpline Number: <strong>{helplineNumber || "9399492809"}</strong>
//               </div>

//               {/* Register Button */}
//               <Button 
//                 className="register-btn " 
//                 type="submit"
//                 disabled={!agree || loading || fetchingRoles}
//                   style={{ backgroundColor: "#273c75", borderColor: "#273c75" }}

//               >
//                 {loading ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                     Registering...
//                   </>
//                 ) : (
//                   "Register"
//                 )}
//               </Button>

//               {/* Login link */}
//               <div className="register-footer">
//                 Already registered?{" "}
//                 <span
//                   className="register-link"
//                   onClick={handleLoginClick}
//                   style={{ cursor: "pointer" }}
//                 >
//                   Login
//                 </span>
//               </div>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Container>
//     </div>
//   );
// };

// export default Register;



// import React, { useState, useEffect } from "react";
// import { Container, Card, Form, Button, InputGroup, Spinner } from "react-bootstrap";
// import { Eye, EyeSlash } from "react-bootstrap-icons";
// import { useNavigate, useLocation } from "react-router-dom";
// import shrirajlogo from "./../Images/shrirajlogo.png";
// import "./Register.css";
// import { baseurl } from '../BaseURL/BaseURL';
// import Swal from "sweetalert2";

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [agree, setAgree] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [fetchingRoles, setFetchingRoles] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//     phone_number: "",
//     role_ids: [],
//     referred_by: "" // Add referred_by to formData
//   });

//   const [roles, setRoles] = useState([]);
//   const [errors, setErrors] = useState({
//     email: "",
//     phone_number: ""
//   });
//   const [helplineNumber, setHelplineNumber] = useState("");

//   // Sponsor ID states (for Agent role)
//   const [sponsorInfo, setSponsorInfo] = useState(null);
//   const [sponsorError, setSponsorError] = useState('');
//   const [showSponsorField, setShowSponsorField] = useState(false);
//   const [checkingSponsor, setCheckingSponsor] = useState(false);
//   const [autoChecking, setAutoChecking] = useState(false); // Track auto-check from URL

//   // Function to extract referral_id from URL query parameters
//   const getReferralIdFromURL = () => {
//     const queryParams = new URLSearchParams(location.search);
//     return queryParams.get('referral_id') || queryParams.get('refferal_id');
//   };

//   // Check sponsor ID for Agent role
//   const checkSponsorId = async (sponsorId, isAutoCheck = false) => {
//     if (!sponsorId || sponsorId.trim() === "") {
//       setSponsorInfo(null);
//       setSponsorError('');
//       if (!isAutoCheck) setCheckingSponsor(false);
//       return;
//     }

//     if (!isAutoCheck) setCheckingSponsor(true);
//     setAutoChecking(isAutoCheck);
//     setSponsorError('');
//     setSponsorInfo(null);

//     try {
//       const response = await fetch(`${baseurl}/users/role/Agent/`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch agents');
//       }
//       const agents = await response.json();

//       const foundAgent = agents.find(agent => 
//         agent.referral_id && agent.referral_id.toString() === sponsorId.toString()
//       );

//       if (foundAgent) {
//         setSponsorInfo(foundAgent);
//         setSponsorError('');
//       } else {
//         setSponsorInfo(null);
//         setSponsorError('Not a valid Sponsor ID');
        
//         // Show error only if it's not an auto-check from URL
//         if (!isAutoCheck) {
//           Swal.fire({
//             icon: "error",
//             title: "Invalid Sponsor ID",
//             text: "Please enter a valid Sponsor ID or leave it blank",
//             confirmButtonColor: "#d33",
//             timer: 3000
//           });
//         }
//       }
//     } catch (error) {
//       setSponsorInfo(null);
//       setSponsorError('Error checking sponsor ID');
//       console.error('Error checking sponsor ID:', error);
//     } finally {
//       if (!isAutoCheck) setCheckingSponsor(false);
//       setAutoChecking(false);
//     }
//   };

//   // Handle role change
//   const handleRoleChange = (roleId) => {
//     const selectedRole = roles.find(role => role.role_id === parseInt(roleId));
    
//     setFormData(prev => ({ 
//       ...prev, 
//       role_ids: [parseInt(roleId)],
//       referred_by: "" // Clear sponsor ID when role changes
//     }));
    
//     const isAgentRole = selectedRole?.role_name === "Agent";
//     setShowSponsorField(isAgentRole);
    
//     // Clear sponsor info when role changes
//     if (!isAgentRole) {
//       setSponsorInfo(null);
//       setSponsorError('');
//     }
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   // Handle sponsor ID change with debounce
//   useEffect(() => {
//     if (showSponsorField && formData.referred_by) {
//       const timer = setTimeout(() => {
//         checkSponsorId(formData.referred_by);
//       }, 800); // Increased debounce time

//       return () => clearTimeout(timer);
//     } else if (showSponsorField && !formData.referred_by) {
//       // Clear sponsor info if field is empty
//       setSponsorInfo(null);
//       setSponsorError('');
//       setCheckingSponsor(false);
//       setAutoChecking(false);
//     }
//   }, [formData.referred_by, showSponsorField]);

//   // Fetch roles and helpline number on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       setFetchingRoles(true);
      
//       try {
//         // Fetch roles
//         const rolesResponse = await fetch(`${baseurl}/roles/`);
//         if (!rolesResponse.ok) {
//           throw new Error('Failed to fetch roles');
//         }
//         const rolesData = await rolesResponse.json();
//         console.log("Roles API Response:", rolesData);
        
//         // Handle both array and object with results property
//         let rolesList = [];
//         if (Array.isArray(rolesData)) {
//           rolesList = rolesData;
//         } else if (rolesData.results && Array.isArray(rolesData.results)) {
//           rolesList = rolesData.results;
//         }
        
//         // Filter out admin role and sort by role name
//         const filteredRoles = rolesList
//           .filter(role => role.role_name.toLowerCase() !== "admin")
//           .sort((a, b) => a.role_name.localeCompare(b.role_name));
        
//         console.log("Filtered roles for dropdown:", filteredRoles);
//         setRoles(filteredRoles);

//         // Fetch helpline number
//         const phoneResponse = await fetch(`${baseurl}/phonenumbers/`);
//         if (phoneResponse.ok) {
//           const phoneData = await phoneResponse.json();
//           if (Array.isArray(phoneData) && phoneData.length > 0 && phoneData[0].phone_number) {
//             setHelplineNumber(phoneData[0].phone_number);
//           }
//         }

//         // Check for referral ID in URL after roles are loaded
//         const referralIdFromURL = getReferralIdFromURL();
//         if (referralIdFromURL) {
//           console.log("Referral ID found in URL:", referralIdFromURL);
          
//           // Find Agent role
//           const agentRole = filteredRoles.find(role => role.role_name === "Agent");
//           if (agentRole) {
//             // Auto-select Team (Agent) role
//             setTimeout(() => {
//               setFormData(prev => ({ 
//                 ...prev, 
//                 role_ids: [agentRole.role_id],
//                 referred_by: referralIdFromURL
//               }));
//               setShowSponsorField(true);
              
//               // Auto-validate the sponsor ID
//               setTimeout(() => {
//                 checkSponsorId(referralIdFromURL, true);
//               }, 100);
//             }, 100);
            
//             // Show notification about auto-selection
//             setTimeout(() => {
//               Swal.fire({
//                 icon: "info",
//                 title: "Team Registration",
//                 text: "You've been referred! Team role and Sponsor ID have been auto-filled.",
//                 confirmButtonColor: "#3085d6",
//                 timer: 4000
//               });
//             }, 500);
//           }
//         }

//       } catch (error) {
//         console.error("Error fetching data:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Connection Error",
//           text: "Failed to load registration data. Please try again later.",
//           confirmButtonColor: "#d33"
//         });
//       } finally {
//         setFetchingRoles(false);
//       }
//     };

//     fetchData();
//   }, [location.search]); // Add location.search to dependencies

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[0-9]{10}$/;

//     if (!formData.first_name.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "First Name Required",
//         text: "Please enter your first name",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     if (!formData.last_name.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Last Name Required",
//         text: "Please enter your last name",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (!formData.password.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Password Required",
//         text: "Please enter a password",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     } else if (formData.password.length < 6) {
//       Swal.fire({
//         icon: "error",
//         title: "Password Too Short",
//         text: "Password must be at least 6 characters",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     if (!formData.phone_number.trim()) {
//       newErrors.phone_number = "Phone number is required";
//     } else if (!phoneRegex.test(formData.phone_number)) {
//       newErrors.phone_number = "Please enter a valid 10-digit phone number";
//     }

//     if (!formData.role_ids.length) {
//       Swal.fire({
//         icon: "error",
//         title: "Role Required",
//         text: "Please select a role",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     if (!agree) {
//       Swal.fire({
//         icon: "warning",
//         title: "Terms Required",
//         text: "Please agree to the Terms & Conditions and Privacy Policy",
//         confirmButtonColor: "#3085d6"
//       });
//       return;
//     }

//     // Validate sponsor ID only if entered (optional)
//     if (showSponsorField && formData.referred_by && sponsorError && !autoChecking) {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Sponsor ID",
//         text: "Please enter a valid Sponsor ID or leave it blank",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     // If sponsor ID is from URL and still checking, wait
//     if (showSponsorField && formData.referred_by && autoChecking) {
//       Swal.fire({
//         icon: "info",
//         title: "Please wait",
//         text: "Validating Sponsor ID...",
//         confirmButtonColor: "#3085d6",
//         showConfirmButton: false,
//         allowOutsideClick: false
//       });
//       return;
//     }

//     setLoading(true);

//     // Prepare form data
//     const submitData = {
//       first_name: formData.first_name.trim(),
//       last_name: formData.last_name.trim(),
//       email: formData.email.trim(),
//       password: formData.password,
//       phone_number: formData.phone_number.trim(),
//       role_ids: formData.role_ids,
//       status: "active",
//       kyc_status: "pending"
//     };

//     // Add sponsor ID only if it exists and is valid
//     if (formData.referred_by && formData.referred_by.trim() && !sponsorError) {
//       submitData.referred_by = formData.referred_by.trim();
//     }
//     // If sponsor ID is entered but has error, don't submit
//     else if (formData.referred_by && formData.referred_by.trim() && sponsorError) {
//       setLoading(false);
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Sponsor ID",
//         text: "Please enter a valid Sponsor ID or leave it blank",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     console.log("Submitting form data:", submitData);

//     try {
//       const response = await fetch(`${baseurl}/users/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(submitData),
//       });

//       const responseData = await response.json();
//       console.log("Registration response:", responseData);

//       if (response.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Registration Successful!",
//           text: "You have been registered successfully!",
//           confirmButtonColor: "#3085d6"
//         }).then(() => {
//           navigate("/login");
//         });
//       } else {
//         // Handle backend validation errors
//         const backendErrors = {};
//         if (responseData.email) {
//           backendErrors.email = Array.isArray(responseData.email) 
//             ? responseData.email[0] 
//             : "Email already exists";
//         }
//         if (responseData.phone_number) {
//           backendErrors.phone_number = Array.isArray(responseData.phone_number)
//             ? responseData.phone_number[0]
//             : "Phone number already exists";
//         }
        
//         // Parse error message if it's a string
//         if (responseData.error && typeof responseData.error === 'string') {
//           try {
//             // Try to parse the error string as JSON
//             const parsedError = JSON.parse(responseData.error.replace(/'/g, '"'));
//             if (parsedError.date_of_birth) {
//               console.error("Date format error:", parsedError.date_of_birth);
//             }
//           } catch (parseError) {
//             console.error("Error parsing error message:", responseData.error);
//           }
//         }

//         if (Object.keys(backendErrors).length > 0) {
//           setErrors(backendErrors);
//         }

//         Swal.fire({
//           icon: "error",
//           title: "Registration Failed",
//           text: responseData.message || responseData.detail || "Please check the form for errors.",
//           confirmButtonColor: "#d33"
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Network Error",
//         text: "An error occurred while submitting the form. Please try again.",
//         confirmButtonColor: "#d33"
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle login navigation
//   const handleLoginClick = () => {
//     navigate("/login");
//   };

//   // Handle terms link click
//   const handleTermsClick = () => {
//     window.open("/terms-and-conditions", "_blank");
//   };

//   // Handle privacy policy click
//   const handlePrivacyClick = () => {
//     window.open("/privacy-policy", "_blank");
//   };

//   return (
//     <div className="register-bg">
//       <span className="register-close" onClick={() => navigate("/")}>✕</span>

//       <Container className="register-container">
//         <Card className="register-card">
//           <Card.Body>
//             {/* Logo + Brand */}
//             <div className="register-brand-row">
//               <img src={shrirajlogo} alt="Shriraj Logo" className="register-logo" />
//             </div>

//             {/* Title */}
//             <div className="register-title">Registration</div>

//             {/* Show referral banner if referral ID is in URL */}
//             {getReferralIdFromURL() && (
//               <div className="referral-banner">
//                 <div className="referral-banner-content">
//                   <span className="referral-banner-icon">👥</span>
//                   <span className="referral-banner-text">
//                     You're joining as part of a Team! Sponsor ID has been auto-filled.
//                   </span>
//                 </div>
//               </div>
//             )}

//             <Form onSubmit={handleSubmit}>
//               {/* First & Last Name */}
//               <div className="register-form-grid">
//                 <div className="form-group-container">
//                   <Form.Control
//                     type="text"
//                     name="first_name"
//                     placeholder="First Name *"
//                     className="register-input"
//                     value={formData.first_name}
//                     onChange={handleChange}
//                   />
//                   <div className="error-feedback"></div>
//                 </div>
                
//                 <div className="form-group-container">
//                   <Form.Control
//                     type="text"
//                     name="last_name"
//                     placeholder="Last Name *"
//                     className="register-input"
//                     value={formData.last_name}
//                     onChange={handleChange}
//                   />
//                   <div className="error-feedback"></div>
//                 </div>
//               </div>

//               {/* Email & Password */}
//               <div className="register-form-grid">
//                 <div className="form-group-container">
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     placeholder="Email *"
//                     className="register-input"
//                     value={formData.email}
//                     onChange={handleChange}
//                     isInvalid={!!errors.email}
//                   />
//                   <Form.Control.Feedback type="invalid" className="error-feedback">
//                     {errors.email}
//                   </Form.Control.Feedback>
//                 </div>

//                 <div className="form-group-container">
//                   <InputGroup>
//                     <Form.Control
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       placeholder="Password * (min 6 characters)"
//                       className="register-input"
//                       value={formData.password}
//                       onChange={handleChange}
//                     />
//                     <InputGroup.Text
//                       className="register-eye eye-icon"
//                       onClick={() => setShowPassword(!showPassword)}
//                       style={{ cursor: "pointer" }}
//                     >
//                       {showPassword ? <EyeSlash /> : <Eye />}
//                     </InputGroup.Text>
//                   </InputGroup>
//                   <div className="error-feedback"></div>
//                 </div>
//               </div>

//               {/* Phone & Role */}
//               <div className="register-form-grid">
//                 <div className="form-group-container">
//                   <Form.Control
//                     type="tel"
//                     name="phone_number"
//                     placeholder="Phone Number * (10 digits)"
//                     className="register-input"
//                     value={formData.phone_number}
//                     onChange={handleChange}
//                     isInvalid={!!errors.phone_number}
//                   />
//                   <Form.Control.Feedback type="invalid" className="error-feedback">
//                     {errors.phone_number}
//                   </Form.Control.Feedback>
//                 </div>

//                 <div className="form-group-container">
//                   {fetchingRoles ? (
//                     <div className="spinner-wrapper">
//                       <Spinner animation="border" size="sm" />
//                       <span className="ms-2">Loading roles...</span>
//                     </div>
//                   ) : (
//                     <Form.Select 
//                       className="register-input"
//                       value={formData.role_ids[0] || ""}
//                       onChange={(e) => handleRoleChange(e.target.value)}
//                     >
//                       <option value="">Select Role *</option>
//                       {roles.length > 0 ? (
//                         roles.map((role) => (
//                           <option key={role.role_id} value={role.role_id}>
//                             {role.role_name === "Agent"
//                               ? "Team"
//                               : role.role_name === "Client"
//                               ? "User"
//                               : role.role_name}
//                           </option>
//                         ))
//                       ) : (
//                         <option value="" disabled>No roles available</option>
//                       )}
//                     </Form.Select>
//                   )}
//                   <div className="error-feedback"></div>
//                 </div>
//               </div>

//               {/* Sponsor ID Field (Only for Agent/Team role - Optional) */}
//               {showSponsorField && (
//                 <div className="register-form-grid full-width">
//                   <div className="form-group-container">
//                     <Form.Control
//                       type="text"
//                       name="referred_by"
//                       placeholder="Sponsor ID (Optional for Team registration)"
//                       className="register-input"
//                       value={formData.referred_by}
//                       onChange={handleChange}
//                       isInvalid={!!sponsorError && formData.referred_by !== ""}
//                     />
                    
//                     {/* Show validation feedback */}
//                     {sponsorError && formData.referred_by !== "" && (
//                       <Form.Control.Feedback type="invalid" className="error-feedback">
//                         {sponsorError}
//                       </Form.Control.Feedback>
//                     )}
                    
//                     {/* Show loading indicator */}
//                     {(checkingSponsor || autoChecking) && (
//                       <div className="sponsor-loading sponsor-feedback">
//                         <Spinner animation="border" size="sm" className="me-1" />
//                         Checking sponsor ID...
//                       </div>
//                     )}
                    
//                     {/* Show valid sponsor info */}
//                     {sponsorInfo && !sponsorError && (
//                       <div className="sponsor-valid sponsor-feedback">
//                         ✓ Valid Sponsor: <strong>{sponsorInfo.first_name} {sponsorInfo.last_name}</strong>
//                         {sponsorInfo.phone_number && ` (${sponsorInfo.phone_number})`}
//                       </div>
//                     )}
                    
//                     {/* Helper text */}
//                     {!sponsorError && !checkingSponsor && !autoChecking && !sponsorInfo && formData.referred_by === "" && (
//                       <div className="sponsor-loading sponsor-feedback">
//                         Enter Sponsor ID if you have one (optional)
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Terms */}
//               <div className="register-terms-container">
//                 <Form.Check
//                   type="checkbox"
//                   className="register-terms"
//                   checked={agree}
//                   onChange={() => setAgree(!agree)}
//                   label={
//                     <>
//                       I agree to the{" "}
//                       <span className="register-link" onClick={handleTermsClick}>
//                         Terms & Conditions
//                       </span>{" "}
//                       and{" "}
//                       <span className="register-link" onClick={handlePrivacyClick}>
//                         Privacy Policy
//                       </span>
//                     </>
//                   }
//                 />
//               </div>

//               {/* Helpline */}
//               <div className="register-helpline">
//                 Helpline Number: <strong>{helplineNumber || "9399492809"}</strong>
//               </div>

//               {/* Register Button */}
//               <Button 
//                 className="register-btn " 
//                 type="submit"
//                 disabled={!agree || loading || fetchingRoles || (showSponsorField && autoChecking)}
//                 style={{ backgroundColor: "#273c75", borderColor: "#273c75" }}
//               >
//                 {loading ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                     Registering...
//                   </>
//                 ) : (
//                   "Register"
//                 )}
//               </Button>

//               {/* Login link */}
//               <div className="register-footer">
//                 Already registered?{" "}
//                 <span
//                   className="register-link"
//                   onClick={handleLoginClick}
//                   style={{ cursor: "pointer" }}
//                 >
//                   Login
//                 </span>
//               </div>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Container>
//     </div>
//   );
// };

// export default Register;






// import React, { useState, useEffect } from "react";
// import { Container, Card, Form, Button, InputGroup, Spinner } from "react-bootstrap";
// import { Eye, EyeSlash } from "react-bootstrap-icons";
// import { useNavigate, useLocation } from "react-router-dom";
// import shrirajlogo from "./../Images/shrirajlogo.png";
// import "./Register.css";
// import { baseurl } from '../BaseURL/BaseURL';
// import Swal from "sweetalert2";

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [agree, setAgree] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [fetchingRoles, setFetchingRoles] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//     phone_number: "",
//     role_ids: [],
//     referred_by: "" // Add referred_by to formData
//   });

//   const [roles, setRoles] = useState([]);
//   const [errors, setErrors] = useState({
//     email: "",
//     phone_number: ""
//   });
//   const [helplineNumber, setHelplineNumber] = useState("");

//   // Sponsor ID states (for Agent role)
//   const [sponsorInfo, setSponsorInfo] = useState(null);
//   const [sponsorError, setSponsorError] = useState('');
//   const [showSponsorField, setShowSponsorField] = useState(false);
//   const [checkingSponsor, setCheckingSponsor] = useState(false);
//   const [autoChecking, setAutoChecking] = useState(false); // Track auto-check from URL

//   // Function to extract referral_id from URL query parameters
//   const getReferralIdFromURL = () => {
//     const queryParams = new URLSearchParams(location.search);
//     return queryParams.get('referral_id') || queryParams.get('refferal_id');
//   };

//   // Check sponsor ID for Agent role using new API endpoint
//   const checkSponsorId = async (sponsorId, isAutoCheck = false) => {
//     if (!sponsorId || sponsorId.trim() === "") {
//       setSponsorInfo(null);
//       setSponsorError('');
//       if (!isAutoCheck) setCheckingSponsor(false);
//       return;
//     }

//     if (!isAutoCheck) setCheckingSponsor(true);
//     setAutoChecking(isAutoCheck);
//     setSponsorError('');
//     setSponsorInfo(null);

//     try {
//       // Use the new API endpoint for checking referral IDs
//       const response = await fetch(`${baseurl}/users/search/?referral_id=${encodeURIComponent(sponsorId)}`);
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch sponsor info');
//       }
      
//       const data = await response.json();
//       console.log("Sponsor check API response:", data);

//       // Handle different response structures
//       if (data && Array.isArray(data) && data.length > 0) {
//         const foundAgent = data[0]; // Assuming API returns array with matching users
//         setSponsorInfo(foundAgent);
//         setSponsorError('');
        
//         // If auto-check from URL, show success message
//         if (isAutoCheck) {
//           Swal.fire({
//             icon: "success",
//             title: "Valid Sponsor Found!",
//             text: `Sponsor: ${foundAgent.first_name} ${foundAgent.last_name}`,
//             confirmButtonColor: "#3085d6",
//             timer: 3000
//           });
//         }
//       } else if (data && data.results && Array.isArray(data.results) && data.results.length > 0) {
//         // Handle paginated response
//         const foundAgent = data.results[0];
//         setSponsorInfo(foundAgent);
//         setSponsorError('');
        
//         if (isAutoCheck) {
//           Swal.fire({
//             icon: "success",
//             title: "Valid Sponsor Found!",
//             text: `Sponsor: ${foundAgent.first_name} ${foundAgent.last_name}`,
//             confirmButtonColor: "#3085d6",
//             timer: 3000
//           });
//         }
//       } else {
//         setSponsorInfo(null);
//         setSponsorError('Not a valid Sponsor ID');
        
//         // Show error only if it's not an auto-check from URL
//         if (!isAutoCheck) {
//           Swal.fire({
//             icon: "error",
//             title: "Invalid Sponsor ID",
//             text: "Please enter a valid Sponsor ID or leave it blank",
//             confirmButtonColor: "#d33",
//             timer: 3000
//           });
//         }
//       }
//     } catch (error) {
//       setSponsorInfo(null);
//       setSponsorError('Error checking sponsor ID');
//       console.error('Error checking sponsor ID:', error);
//     } finally {
//       if (!isAutoCheck) setCheckingSponsor(false);
//       setAutoChecking(false);
//     }
//   };

//   // Handle role change
//   const handleRoleChange = (roleId) => {
//     const selectedRole = roles.find(role => role.role_id === parseInt(roleId));
    
//     setFormData(prev => ({ 
//       ...prev, 
//       role_ids: [parseInt(roleId)],
//       referred_by: "" // Clear sponsor ID when role changes
//     }));
    
//     const isAgentRole = selectedRole?.role_name === "Agent";
//     setShowSponsorField(isAgentRole);
    
//     // Clear sponsor info when role changes
//     if (!isAgentRole) {
//       setSponsorInfo(null);
//       setSponsorError('');
//     }
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   // Handle sponsor ID change with debounce
//   useEffect(() => {
//     if (showSponsorField && formData.referred_by) {
//       const timer = setTimeout(() => {
//         checkSponsorId(formData.referred_by);
//       }, 800); // Increased debounce time

//       return () => clearTimeout(timer);
//     } else if (showSponsorField && !formData.referred_by) {
//       // Clear sponsor info if field is empty
//       setSponsorInfo(null);
//       setSponsorError('');
//       setCheckingSponsor(false);
//       setAutoChecking(false);
//     }
//   }, [formData.referred_by, showSponsorField]);

//   // Fetch roles and helpline number on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       setFetchingRoles(true);
      
//       try {
//         // Fetch roles
//         const rolesResponse = await fetch(`${baseurl}/roles/`);
//         if (!rolesResponse.ok) {
//           throw new Error('Failed to fetch roles');
//         }
//         const rolesData = await rolesResponse.json();
//         console.log("Roles API Response:", rolesData);
        
//         // Handle both array and object with results property
//         let rolesList = [];
//         if (Array.isArray(rolesData)) {
//           rolesList = rolesData;
//         } else if (rolesData.results && Array.isArray(rolesData.results)) {
//           rolesList = rolesData.results;
//         }
        
//         // Filter out admin role and sort by role name
//         const filteredRoles = rolesList
//           .filter(role => role.role_name.toLowerCase() !== "admin")
//           .sort((a, b) => a.role_name.localeCompare(b.role_name));
        
//         console.log("Filtered roles for dropdown:", filteredRoles);
//         setRoles(filteredRoles);

//         // Fetch helpline number
//         const phoneResponse = await fetch(`${baseurl}/phonenumbers/`);
//         if (phoneResponse.ok) {
//           const phoneData = await phoneResponse.json();
//           if (Array.isArray(phoneData) && phoneData.length > 0 && phoneData[0].phone_number) {
//             setHelplineNumber(phoneData[0].phone_number);
//           }
//         }

//         // Check for referral ID in URL after roles are loaded
//         const referralIdFromURL = getReferralIdFromURL();
//         if (referralIdFromURL) {
//           console.log("Referral ID found in URL:", referralIdFromURL);
          
//           // Find Agent role
//           const agentRole = filteredRoles.find(role => role.role_name === "Agent");
//           if (agentRole) {
//             // Auto-select Team (Agent) role
//             setTimeout(() => {
//               setFormData(prev => ({ 
//                 ...prev, 
//                 role_ids: [agentRole.role_id],
//                 referred_by: referralIdFromURL
//               }));
//               setShowSponsorField(true);
              
//               // Auto-validate the sponsor ID
//               setTimeout(() => {
//                 checkSponsorId(referralIdFromURL, true);
//               }, 100);
//             }, 100);
            
//             // Show notification about auto-selection
//             setTimeout(() => {
//               Swal.fire({
//                 icon: "info",
//                 title: "Team Registration",
//                 text: "You've been referred! Team role and Sponsor ID have been auto-filled.",
//                 confirmButtonColor: "#3085d6",
//                 timer: 4000
//               });
//             }, 500);
//           }
//         }

//       } catch (error) {
//         console.error("Error fetching data:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Connection Error",
//           text: "Failed to load registration data. Please try again later.",
//           confirmButtonColor: "#d33"
//         });
//       } finally {
//         setFetchingRoles(false);
//       }
//     };

//     fetchData();
//   }, [location.search]); // Add location.search to dependencies

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[0-9]{10}$/;

//     if (!formData.first_name.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "First Name Required",
//         text: "Please enter your first name",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     if (!formData.last_name.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Last Name Required",
//         text: "Please enter your last name",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (!formData.password.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Password Required",
//         text: "Please enter a password",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     } else if (formData.password.length < 6) {
//       Swal.fire({
//         icon: "error",
//         title: "Password Too Short",
//         text: "Password must be at least 6 characters",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     if (!formData.phone_number.trim()) {
//       newErrors.phone_number = "Phone number is required";
//     } else if (!phoneRegex.test(formData.phone_number)) {
//       newErrors.phone_number = "Please enter a valid 10-digit phone number";
//     }

//     if (!formData.role_ids.length) {
//       Swal.fire({
//         icon: "error",
//         title: "Role Required",
//         text: "Please select a role",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     if (!agree) {
//       Swal.fire({
//         icon: "warning",
//         title: "Terms Required",
//         text: "Please agree to the Terms & Conditions and Privacy Policy",
//         confirmButtonColor: "#3085d6"
//       });
//       return;
//     }

//     // Validate sponsor ID only if entered (optional)
//     if (showSponsorField && formData.referred_by && sponsorError && !autoChecking) {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Sponsor ID",
//         text: "Please enter a valid Sponsor ID or leave it blank",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     // If sponsor ID is from URL and still checking, wait
//     if (showSponsorField && formData.referred_by && autoChecking) {
//       Swal.fire({
//         icon: "info",
//         title: "Please wait",
//         text: "Validating Sponsor ID...",
//         confirmButtonColor: "#3085d6",
//         showConfirmButton: false,
//         allowOutsideClick: false
//       });
//       return;
//     }

//     setLoading(true);

//     // Prepare form data for registration
//     const submitData = {
//       first_name: formData.first_name.trim(),
//       last_name: formData.last_name.trim(),
//       email: formData.email.trim(),
//       password: formData.password,
//       phone_number: formData.phone_number.trim(),
//       role_ids: formData.role_ids,
//       status: "active",
//       kyc_status: "pending"
//     };

//     // Add sponsor ID only if it exists and is valid
//     if (formData.referred_by && formData.referred_by.trim() && !sponsorError) {
//       // Check what needs to be passed as referred_by - could be user_id or referral_id
//       // Based on your API, we need to pass the user_id of the sponsor
//       if (sponsorInfo && sponsorInfo.user_id) {
//         submitData.referred_by = sponsorInfo.user_id;
//       } else {
//         // Fallback: pass the referral_id string
//         submitData.referred_by = formData.referred_by.trim();
//       }
//     }
//     // If sponsor ID is entered but has error, don't submit
//     else if (formData.referred_by && formData.referred_by.trim() && sponsorError) {
//       setLoading(false);
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Sponsor ID",
//         text: "Please enter a valid Sponsor ID or leave it blank",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

//     console.log("Submitting form data:", submitData);

//     try {
//       const response = await fetch(`${baseurl}/users/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(submitData),
//       });

//       const responseData = await response.json();
//       console.log("Registration response:", responseData);

//       if (response.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Registration Successful!",
//           text: "You have been registered successfully!",
//           confirmButtonColor: "#3085d6"
//         }).then(() => {
//           navigate("/login");
//         });
//       } else {
//         // Handle backend validation errors
//         const backendErrors = {};
//         if (responseData.email) {
//           backendErrors.email = Array.isArray(responseData.email) 
//             ? responseData.email[0] 
//             : "Email already exists";
//         }
//         if (responseData.phone_number) {
//           backendErrors.phone_number = Array.isArray(responseData.phone_number)
//             ? responseData.phone_number[0]
//             : "Phone number already exists";
//         }
        
//         // Handle referred_by errors
//         if (responseData.referred_by) {
//           backendErrors.referred_by = Array.isArray(responseData.referred_by)
//             ? responseData.referred_by[0]
//             : "Invalid sponsor ID";
//         }
        
//         // Parse error message if it's a string
//         if (responseData.error && typeof responseData.error === 'string') {
//           try {
//             // Try to parse the error string as JSON
//             const parsedError = JSON.parse(responseData.error.replace(/'/g, '"'));
//             if (parsedError.date_of_birth) {
//               console.error("Date format error:", parsedError.date_of_birth);
//             }
//           } catch (parseError) {
//             console.error("Error parsing error message:", responseData.error);
//           }
//         }

//         if (Object.keys(backendErrors).length > 0) {
//           setErrors(backendErrors);
//         }

//         Swal.fire({
//           icon: "error",
//           title: "Registration Failed",
//           text: responseData.message || responseData.detail || "Please check the form for errors.",
//           confirmButtonColor: "#d33"
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Network Error",
//         text: "An error occurred while submitting the form. Please try again.",
//         confirmButtonColor: "#d33"
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle login navigation
//   const handleLoginClick = () => {
//     navigate("/login");
//   };

//   // Handle terms link click
//   const handleTermsClick = () => {
//     window.open("/terms-and-conditions", "_blank");
//   };

//   // Handle privacy policy click
//   const handlePrivacyClick = () => {
//     window.open("/privacy-policy", "_blank");
//   };

//   return (
//     <div className="register-bg">
//       <span className="register-close" onClick={() => navigate("/")}>✕</span>

//       <Container className="register-container">
//         <Card className="register-card">
//           <Card.Body>
//             {/* Logo + Brand */}
//             <div className="register-brand-row">
//               <img src={shrirajlogo} alt="Shriraj Logo" className="register-logo" />
//             </div>

//             {/* Title */}
//             <div className="register-title">Registration</div>

//             {/* Show referral banner if referral ID is in URL */}
//             {getReferralIdFromURL() && (
//               <div className="referral-banner">
//                 <div className="referral-banner-content">
//                   <span className="referral-banner-icon">👥</span>
//                   <span className="referral-banner-text">
//                     You're joining as part of a Team! Sponsor ID has been auto-filled.
//                   </span>
//                 </div>
//               </div>
//             )}

//             <Form onSubmit={handleSubmit}>
//               {/* First & Last Name */}
//               <div className="register-form-grid">
//                 <div className="form-group-container">
//                   <Form.Control
//                     type="text"
//                     name="first_name"
//                     placeholder="First Name *"
//                     className="register-input"
//                     value={formData.first_name}
//                     onChange={handleChange}
//                   />
//                   <div className="error-feedback"></div>
//                 </div>
                
//                 <div className="form-group-container">
//                   <Form.Control
//                     type="text"
//                     name="last_name"
//                     placeholder="Last Name *"
//                     className="register-input"
//                     value={formData.last_name}
//                     onChange={handleChange}
//                   />
//                   <div className="error-feedback"></div>
//                 </div>
//               </div>

//               {/* Email & Password */}
//               <div className="register-form-grid">
//                 <div className="form-group-container">
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     placeholder="Email *"
//                     className="register-input"
//                     value={formData.email}
//                     onChange={handleChange}
//                     isInvalid={!!errors.email}
//                   />
//                   <Form.Control.Feedback type="invalid" className="error-feedback">
//                     {errors.email}
//                   </Form.Control.Feedback>
//                 </div>

//                 <div className="form-group-container">
//                   <InputGroup>
//                     <Form.Control
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       placeholder="Password * (min 6 characters)"
//                       className="register-input"
//                       value={formData.password}
//                       onChange={handleChange}
//                     />
//                     <InputGroup.Text
//                       className="register-eye eye-icon"
//                       onClick={() => setShowPassword(!showPassword)}
//                       style={{ cursor: "pointer" }}
//                     >
//                       {showPassword ? <EyeSlash /> : <Eye />}
//                     </InputGroup.Text>
//                   </InputGroup>
//                   <div className="error-feedback"></div>
//                 </div>
//               </div>

//               {/* Phone & Role */}
//               <div className="register-form-grid">
//                 <div className="form-group-container">
//                   <Form.Control
//                     type="tel"
//                     name="phone_number"
//                     placeholder="Phone Number * (10 digits)"
//                     className="register-input"
//                     value={formData.phone_number}
//                     onChange={handleChange}
//                     isInvalid={!!errors.phone_number}
//                   />
//                   <Form.Control.Feedback type="invalid" className="error-feedback">
//                     {errors.phone_number}
//                   </Form.Control.Feedback>
//                 </div>

//                 <div className="form-group-container">
//                   {fetchingRoles ? (
//                     <div className="spinner-wrapper">
//                       <Spinner animation="border" size="sm" />
//                       <span className="ms-2">Loading roles...</span>
//                     </div>
//                   ) : (
//                     <Form.Select 
//                       className="register-input"
//                       value={formData.role_ids[0] || ""}
//                       onChange={(e) => handleRoleChange(e.target.value)}
//                     >
//                       <option value="">Select Role *</option>
//                       {roles.length > 0 ? (
//                         roles.map((role) => (
//                           <option key={role.role_id} value={role.role_id}>
//                             {role.role_name === "Agent"
//                               ? "Team"
//                               : role.role_name === "Client"
//                               ? "User"
//                               : role.role_name}
//                           </option>
//                         ))
//                       ) : (
//                         <option value="" disabled>No roles available</option>
//                       )}
//                     </Form.Select>
//                   )}
//                   <div className="error-feedback"></div>
//                 </div>
//               </div>

//               {/* Sponsor ID Field (Only for Agent/Team role - Optional) */}
//               {showSponsorField && (
//                 <div className="register-form-grid full-width">
//                   <div className="form-group-container">
//                     <Form.Control
//                       type="text"
//                       name="referred_by"
//                       placeholder="Enter Sponsor ID (Optional)"
//                       className="register-input"
//                       value={formData.referred_by}
//                       onChange={handleChange}
//                       isInvalid={!!sponsorError && formData.referred_by !== ""}
//                     />
                    
//                     {/* Show validation feedback */}
//                     {sponsorError && formData.referred_by !== "" && (
//                       <Form.Control.Feedback type="invalid" className="error-feedback">
//                         {sponsorError}
//                       </Form.Control.Feedback>
//                     )}
                    
//                     {/* Show loading indicator */}
//                     {(checkingSponsor || autoChecking) && (
//                       <div className="sponsor-loading sponsor-feedback">
//                         <Spinner animation="border" size="sm" className="me-1" />
//                         Checking sponsor ID...
//                       </div>
//                     )}
                    
//                     {/* Show valid sponsor info */}
//                     {sponsorInfo && !sponsorError && (
//                       <div className="sponsor-valid sponsor-feedback">
//                         ✓ Valid Sponsor: <strong>{sponsorInfo.first_name} {sponsorInfo.last_name}</strong>
//                         {sponsorInfo.phone_number && ` (${sponsorInfo.phone_number})`}
                        
//                       </div>
//                     )}
                    
//                     {/* Helper text */}
//                     {!sponsorError && !checkingSponsor && !autoChecking && !sponsorInfo && formData.referred_by === "" && (
//                       <div className="sponsor-loading sponsor-feedback">
//                         Enter the Referral ID of your sponsor (optional)
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Terms */}
//               <div className="register-terms-container">
//                 <Form.Check
//                   type="checkbox"
//                   className="register-terms"
//                   checked={agree}
//                   onChange={() => setAgree(!agree)}
//                   label={
//                     <>
//                       I agree to the{" "}
//                       <span className="register-link" onClick={handleTermsClick}>
//                         Terms & Conditions
//                       </span>{" "}
//                       and{" "}
//                       <span className="register-link" onClick={handlePrivacyClick}>
//                         Privacy Policy
//                       </span>
//                     </>
//                   }
//                 />
//               </div>

//               {/* Helpline */}
//               <div className="register-helpline">
//                 Helpline Number: <strong>{helplineNumber || "9399492809"}</strong>
//               </div>

//               {/* Register Button */}
//               <Button 
//                 className="register-btn " 
//                 type="submit"
//                 disabled={!agree || loading || fetchingRoles || (showSponsorField && autoChecking)}
//                 style={{ backgroundColor: "#273c75", borderColor: "#273c75" }}
//               >
//                 {loading ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                     Registering...
//                   </>
//                 ) : (
//                   "Register"
//                 )}
//               </Button>

//               {/* Login link */}
//               <div className="register-footer">
//                 Already registered?{" "}
//                 <span
//                   className="register-link"
//                   onClick={handleLoginClick}
//                   style={{ cursor: "pointer" }}
//                 >
//                   Login
//                 </span>
//               </div>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Container>
//     </div>
//   );
// };

// export default Register;




import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, InputGroup, Spinner } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useNavigate, useLocation } from "react-router-dom";
import shrirajlogo from "./../Images/shrirajlogo.png";
import "./Register.css";
import { baseurl } from '../BaseURL/BaseURL';
import Swal from "sweetalert2";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingRoles, setFetchingRoles] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    role_ids: [],
    referred_by: "" // Add referred_by to formData
  });

  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({
    email: "",
    phone_number: ""
  });
  const [helplineNumber, setHelplineNumber] = useState("");

  // Sponsor ID states (for Agent role)
  const [sponsorInfo, setSponsorInfo] = useState(null);
  const [sponsorError, setSponsorError] = useState('');
  const [showSponsorField, setShowSponsorField] = useState(false);
  const [checkingSponsor, setCheckingSponsor] = useState(false);
  const [autoChecking, setAutoChecking] = useState(false); // Track auto-check from URL

  // Function to extract referral_id from URL query parameters
  const getReferralIdFromURL = () => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get('referral_id') || queryParams.get('refferal_id');
  };

  // Check sponsor ID for Agent role using new API endpoint
  const checkSponsorId = async (sponsorId, isAutoCheck = false) => {
    if (!sponsorId || sponsorId.trim() === "") {
      setSponsorInfo(null);
      setSponsorError('');
      if (!isAutoCheck) setCheckingSponsor(false);
      return;
    }

    if (!isAutoCheck) setCheckingSponsor(true);
    setAutoChecking(isAutoCheck);
    setSponsorError('');
    setSponsorInfo(null);

    try {
      // Use the new API endpoint for checking referral IDs
      const response = await fetch(`${baseurl}/users/search/?referral_id=${encodeURIComponent(sponsorId.trim())}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch sponsor info');
      }
      
      const data = await response.json();
      console.log("Sponsor check API response:", data);

      // Handle different response structures
      let foundAgent = null;
      
      if (Array.isArray(data) && data.length > 0) {
        foundAgent = data[0];
      } else if (data && data.results && Array.isArray(data.results) && data.results.length > 0) {
        foundAgent = data.results[0];
      }
      
      if (foundAgent) {
        setSponsorInfo(foundAgent);
        setSponsorError('');
        
        if (isAutoCheck) {
          Swal.fire({
            icon: "success",
            title: "Valid Sponsor Found!",
            text: `Sponsor: ${foundAgent.first_name} ${foundAgent.last_name}`,
            confirmButtonColor: "#3085d6",
            timer: 3000
          });
        }
      } else {
        setSponsorInfo(null);
        setSponsorError('Invalid Sponsor ID');
        
        if (!isAutoCheck) {
          Swal.fire({
            icon: "error",
            title: "Invalid Sponsor ID",
            text: "Please enter a valid Sponsor ID or leave it blank",
            confirmButtonColor: "#d33",
            timer: 3000
          });
        }
      }
    } catch (error) {
      setSponsorInfo(null);
      setSponsorError('Error checking sponsor ID');
      console.error('Error checking sponsor ID:', error);
    } finally {
      if (!isAutoCheck) setCheckingSponsor(false);
      setAutoChecking(false);
    }
  };

  // Handle role change
  const handleRoleChange = (roleId) => {
    const selectedRole = roles.find(role => role.role_id === parseInt(roleId));
    
    setFormData(prev => ({ 
      ...prev, 
      role_ids: [parseInt(roleId)],
      referred_by: "" // Clear sponsor ID when role changes
    }));
    
    const isAgentRole = selectedRole?.role_name === "Agent";
    setShowSponsorField(isAgentRole);
    
    // Clear sponsor info when role changes
    if (!isAgentRole) {
      setSponsorInfo(null);
      setSponsorError('');
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Handle sponsor ID change with debounce
  useEffect(() => {
    if (showSponsorField && formData.referred_by) {
      const timer = setTimeout(() => {
        checkSponsorId(formData.referred_by);
      }, 800); // Increased debounce time

      return () => clearTimeout(timer);
    } else if (showSponsorField && !formData.referred_by) {
      // Clear sponsor info if field is empty
      setSponsorInfo(null);
      setSponsorError('');
      setCheckingSponsor(false);
      setAutoChecking(false);
    }
  }, [formData.referred_by, showSponsorField]);

  // Fetch roles and helpline number on component mount
  useEffect(() => {
    const fetchData = async () => {
      setFetchingRoles(true);
      
      try {
        // Fetch roles
        const rolesResponse = await fetch(`${baseurl}/roles/`);
        if (!rolesResponse.ok) {
          throw new Error('Failed to fetch roles');
        }
        const rolesData = await rolesResponse.json();
        console.log("Roles API Response:", rolesData);
        
        // Handle both array and object with results property
        let rolesList = [];
        if (Array.isArray(rolesData)) {
          rolesList = rolesData;
        } else if (rolesData.results && Array.isArray(rolesData.results)) {
          rolesList = rolesData.results;
        }
        
        // Filter out admin role and sort by role name
        const filteredRoles = rolesList
          .filter(role => role.role_name.toLowerCase() !== "admin")
          .sort((a, b) => a.role_name.localeCompare(b.role_name));
        
        console.log("Filtered roles for dropdown:", filteredRoles);
        setRoles(filteredRoles);

        // Fetch helpline number
        const phoneResponse = await fetch(`${baseurl}/phonenumbers/`);
        if (phoneResponse.ok) {
          const phoneData = await phoneResponse.json();
          if (Array.isArray(phoneData) && phoneData.length > 0 && phoneData[0].phone_number) {
            setHelplineNumber(phoneData[0].phone_number);
          }
        }

        // Check for referral ID in URL after roles are loaded
        const referralIdFromURL = getReferralIdFromURL();
        if (referralIdFromURL) {
          console.log("Referral ID found in URL:", referralIdFromURL);
          
          // Find Agent role
          const agentRole = filteredRoles.find(role => role.role_name === "Agent");
          if (agentRole) {
            // Auto-select Team (Agent) role
            setTimeout(() => {
              setFormData(prev => ({ 
                ...prev, 
                role_ids: [agentRole.role_id],
                referred_by: referralIdFromURL
              }));
              setShowSponsorField(true);
              
              // Auto-validate the sponsor ID
              setTimeout(() => {
                checkSponsorId(referralIdFromURL, true);
              }, 100);
            }, 100);
            
            // Show notification about auto-selection
            setTimeout(() => {
              Swal.fire({
                icon: "info",
                title: "Team Registration",
                text: "You've been referred! Team role and Sponsor ID have been auto-filled.",
                confirmButtonColor: "#3085d6",
                timer: 4000
              });
            }, 500);
          }
        }

      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          icon: "error",
          title: "Connection Error",
          text: "Failed to load registration data. Please try again later.",
          confirmButtonColor: "#d33"
        });
      } finally {
        setFetchingRoles(false);
      }
    };

    fetchData();
  }, [location.search]); // Add location.search to dependencies

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.first_name.trim()) {
      Swal.fire({
        icon: "error",
        title: "First Name Required",
        text: "Please enter your first name",
        confirmButtonColor: "#d33"
      });
      return;
    }

    if (!formData.last_name.trim()) {
      Swal.fire({
        icon: "error",
        title: "Last Name Required",
        text: "Please enter your last name",
        confirmButtonColor: "#d33"
      });
      return;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      Swal.fire({
        icon: "error",
        title: "Password Required",
        text: "Please enter a password",
        confirmButtonColor: "#d33"
      });
      return;
    } else if (formData.password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Password Too Short",
        text: "Password must be at least 6 characters",
        confirmButtonColor: "#d33"
      });
      return;
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone_number)) {
      newErrors.phone_number = "Please enter a valid 10-digit phone number";
    }

    if (!formData.role_ids.length) {
      Swal.fire({
        icon: "error",
        title: "Role Required",
        text: "Please select a role",
        confirmButtonColor: "#d33"
      });
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!agree) {
      Swal.fire({
        icon: "warning",
        title: "Terms Required",
        text: "Please agree to the Terms & Conditions and Privacy Policy",
        confirmButtonColor: "#3085d6"
      });
      return;
    }

    // Validate sponsor ID only if entered (optional)
    if (showSponsorField && formData.referred_by && sponsorError && !autoChecking) {
      Swal.fire({
        icon: "error",
        title: "Invalid Sponsor ID",
        text: "Please enter a valid Sponsor ID or leave it blank",
        confirmButtonColor: "#d33"
      });
      return;
    }

    // If sponsor ID is from URL and still checking, wait
    if (showSponsorField && formData.referred_by && autoChecking) {
      Swal.fire({
        icon: "info",
        title: "Please wait",
        text: "Validating Sponsor ID...",
        confirmButtonColor: "#3085d6",
        showConfirmButton: false,
        allowOutsideClick: false
      });
      return;
    }

    setLoading(true);

    // Prepare form data for registration
    const submitData = {
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      phone_number: formData.phone_number.trim(),
      role_ids: formData.role_ids,
      // status: "active",
      // kyc_status: "pending"
    };

    // Add sponsor ID exactly as entered in the form
    if (formData.referred_by && formData.referred_by.trim() && !sponsorError) {
      // Send the referral_id string as entered by user
      submitData.referred_by = formData.referred_by.trim();
    }
    // If sponsor ID is entered but has error, don't submit
    else if (formData.referred_by && formData.referred_by.trim() && sponsorError) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Invalid Sponsor ID",
        text: "Please enter a valid Sponsor ID or leave it blank",
        confirmButtonColor: "#d33"
      });
      return;
    }

    console.log("Submitting form data:", submitData);

    try {
      const response = await fetch(`${baseurl}/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const responseData = await response.json();
      console.log("Registration response:", responseData);

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "You have been registered successfully!",
          confirmButtonColor: "#3085d6"
        }).then(() => {
          navigate("/login");
        });
      } else {
        // Handle backend validation errors
        const backendErrors = {};
        if (responseData.email) {
          backendErrors.email = Array.isArray(responseData.email) 
            ? responseData.email[0] 
            : "Email already exists";
        }
        if (responseData.phone_number) {
          backendErrors.phone_number = Array.isArray(responseData.phone_number)
            ? responseData.phone_number[0]
            : "Phone number already exists";
        }
        
        // Handle referred_by errors
        if (responseData.referred_by) {
          backendErrors.referred_by = Array.isArray(responseData.referred_by)
            ? responseData.referred_by[0]
            : "Invalid sponsor ID";
        }
        
        // Parse error message if it's a string
        if (responseData.error && typeof responseData.error === 'string') {
          try {
            // Try to parse the error string as JSON
            const parsedError = JSON.parse(responseData.error.replace(/'/g, '"'));
            if (parsedError.date_of_birth) {
              console.error("Date format error:", parsedError.date_of_birth);
            }
          } catch (parseError) {
            console.error("Error parsing error message:", responseData.error);
          }
        }

        if (Object.keys(backendErrors).length > 0) {
          setErrors(backendErrors);
        }

        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: responseData.message || responseData.detail || "Please check the form for errors.",
          confirmButtonColor: "#d33"
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "An error occurred while submitting the form. Please try again.",
        confirmButtonColor: "#d33"
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle login navigation
  const handleLoginClick = () => {
    navigate("/login");
  };

  // Handle terms link click
  const handleTermsClick = () => {
    window.open("/terms-and-conditions", "_blank");
  };

  // Handle privacy policy click
  const handlePrivacyClick = () => {
    window.open("/privacy-policy", "_blank");
  };

  return (
    <div className="register-bg">
      <span className="register-close" onClick={() => navigate("/")}>✕</span>

      <Container className="register-container">
        <Card className="register-card">
          <Card.Body>
            {/* Logo + Brand */}
            <div className="register-brand-row">
              <img src={shrirajlogo} alt="Shriraj Logo" className="register-logo" />
            </div>

            {/* Title */}
            <div className="register-title">Registration</div>

            {/* Show referral banner if referral ID is in URL */}
            {getReferralIdFromURL() && (
              <div className="referral-banner">
                <div className="referral-banner-content">
                  <span className="referral-banner-icon">👥</span>
                  <span className="referral-banner-text">
                    You're joining as part of a Team! Sponsor ID has been auto-filled.
                  </span>
                </div>
              </div>
            )}

            <Form onSubmit={handleSubmit}>
              {/* First & Last Name */}
              <div className="register-form-grid">
                <div className="form-group-container">
                  <Form.Control
                    type="text"
                    name="first_name"
                    placeholder="First Name *"
                    className="register-input"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                  <div className="error-feedback"></div>
                </div>
                
                <div className="form-group-container">
                  <Form.Control
                    type="text"
                    name="last_name"
                    placeholder="Last Name *"
                    className="register-input"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                  <div className="error-feedback"></div>
                </div>
              </div>

              {/* Email & Password */}
              <div className="register-form-grid">
                <div className="form-group-container">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email *"
                    className="register-input"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid" className="error-feedback">
                    {errors.email}
                  </Form.Control.Feedback>
                </div>

                <div className="form-group-container">
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password * (min 6 characters)"
                      className="register-input"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <InputGroup.Text
                      className="register-eye eye-icon"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? <EyeSlash /> : <Eye />}
                    </InputGroup.Text>
                  </InputGroup>
                  <div className="error-feedback"></div>
                </div>
              </div>

              {/* Phone & Role */}
              <div className="register-form-grid">
                <div className="form-group-container">
                  <Form.Control
                    type="tel"
                    name="phone_number"
                    placeholder="Phone Number * (10 digits)"
                    className="register-input"
                    value={formData.phone_number}
                    onChange={handleChange}
                    isInvalid={!!errors.phone_number}
                  />
                  <Form.Control.Feedback type="invalid" className="error-feedback">
                    {errors.phone_number}
                  </Form.Control.Feedback>
                </div>

                <div className="form-group-container">
                  {fetchingRoles ? (
                    <div className="spinner-wrapper">
                      <Spinner animation="border" size="sm" />
                      <span className="ms-2">Loading roles...</span>
                    </div>
                  ) : (
                    <Form.Select 
                      className="register-input"
                      value={formData.role_ids[0] || ""}
                      onChange={(e) => handleRoleChange(e.target.value)}
                    >
                      <option value="">Select Role *</option>
                      {roles.length > 0 ? (
                        roles.map((role) => (
                          <option key={role.role_id} value={role.role_id}>
                            {role.role_name === "Agent"
                              ? "Team"
                              : role.role_name === "Client"
                              ? "User"
                              : role.role_name}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>No roles available</option>
                      )}
                    </Form.Select>
                  )}
                  <div className="error-feedback"></div>
                </div>
              </div>

              {/* Sponsor ID Field (Only for Agent/Team role - Optional) */}
              {showSponsorField && (
                <div className="register-form-grid full-width">
                  <div className="form-group-container">
                    <Form.Control
                      type="text"
                      name="referred_by"
                      placeholder="Enter Sponsor ID (Optional)"
                      className="register-input"
                      value={formData.referred_by}
                      onChange={handleChange}
                      isInvalid={!!sponsorError && formData.referred_by !== ""}
                    />
                    
                    {/* Show validation feedback */}
                    {sponsorError && formData.referred_by !== "" && (
                      <Form.Control.Feedback type="invalid" className="error-feedback">
                        {sponsorError}
                      </Form.Control.Feedback>
                    )}
                    
                    {/* Show loading indicator */}
                    {(checkingSponsor || autoChecking) && (
                      <div className="sponsor-loading sponsor-feedback">
                        <Spinner animation="border" size="sm" className="me-1" />
                        Checking sponsor ID...
                      </div>
                    )}
                    
                    {/* Show valid sponsor info */}
                    {sponsorInfo && !sponsorError && (
                      <div className="sponsor-valid sponsor-feedback">
                        ✓ Valid Sponsor ID: <strong>{formData.referred_by}</strong>
                        <div className="sponsor-details">
                          {sponsorInfo.first_name} {sponsorInfo.last_name}
                          {sponsorInfo.phone_number && ` (${sponsorInfo.phone_number})`}
                        </div>
                      </div>
                    )}
                    
                    {/* Helper text */}
                    {!sponsorError && !checkingSponsor && !autoChecking && !sponsorInfo && formData.referred_by === "" && (
                      <div className="sponsor-loading sponsor-feedback">
                        Enter the Referral ID of your sponsor (optional)
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Terms */}
              <div className="register-terms-container">
                <Form.Check
                  type="checkbox"
                  className="register-terms"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                  label={
                    <>
                      I agree to the{" "}
                      <span className="register-link" onClick={handleTermsClick}>
                        Terms & Conditions
                      </span>{" "}
                      and{" "}
                      <span className="register-link" onClick={handlePrivacyClick}>
                        Privacy Policy
                      </span>
                    </>
                  }
                />
              </div>

              {/* Helpline */}
              <div className="register-helpline">
                Helpline Number: <strong>{helplineNumber || "9399492809"}</strong>
              </div>

              {/* Register Button */}
              <Button 
                className="register-btn " 
                type="submit"
                disabled={!agree || loading || fetchingRoles || (showSponsorField && autoChecking)}
                style={{ backgroundColor: "#273c75", borderColor: "#273c75" }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </Button>

              {/* Login link */}
              <div className="register-footer">
                Already registered?{" "}
                <span
                  className="register-link"
                  onClick={handleLoginClick}
                  style={{ cursor: "pointer" }}
                >
                  Login
                </span>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Register;