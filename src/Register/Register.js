
// //14-02-2026
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
//     referred_by: ""
//   });

//   const [roles, setRoles] = useState([]);
//   const [errors, setErrors] = useState({
//     email: "",
//     phone_number: ""
//   });
//   const [helplineNumber, setHelplineNumber] = useState("");
//   const [hasCartItems, setHasCartItems] = useState(false);
//   const [redirectFromCart, setRedirectFromCart] = useState(false);

//   // Sponsor ID states (for Agent role)
//   const [sponsorInfo, setSponsorInfo] = useState(null);
//   const [sponsorError, setSponsorError] = useState('');
//   const [showSponsorField, setShowSponsorField] = useState(false);
//   const [checkingSponsor, setCheckingSponsor] = useState(false);
//   const [autoChecking, setAutoChecking] = useState(false);

//   // Check if user has items in cart
//   useEffect(() => {
//     const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
//     const cartRedirect = localStorage.getItem("redirect_from_cart") === "true";
    
//     setHasCartItems(guestCart.length > 0);
//     setRedirectFromCart(cartRedirect);

//     // Only show message if there are actual cart items
//     if (cartRedirect && guestCart.length > 0) {
//       Swal.fire({
//         title: 'Complete Your Registration',
//         text: 'You have items in your cart. Complete registration to proceed with checkout.',
//         icon: 'info',
//         timer: 4000,
//         timerProgressBar: true,
//         showConfirmButton: false
//       });
//     }
//   }, []);

//   // Function to sync cart with backend after registration
//   const syncCartAfterRegistration = async (userId) => {
//     try {
//       // Get cart from localStorage only
//       const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
      
//       // Only sync if there are items
//       if (guestCart.length > 0) {
//         // Prepare payload for API - supports multiple items
//         const cartPayload = guestCart.map(item => ({
//           user: parseInt(userId),
//           variant: item.variant_id,
//           quantity: item.quantity
//         }));

//         console.log("Syncing cart after registration:", cartPayload);

//         // Send cart data to backend using baseurl
//         const response = await fetch(`${baseurl}/cart/`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(cartPayload) // API supports array of items
//         });

//         if (response.ok) {
//           // Clear cart data after successful sync
//           localStorage.removeItem("website_guest_cart");
          
//           console.log("Cart synced successfully after registration");
//           return true;
//         } else {
//           console.error("Failed to sync cart with backend");
//           return false;
//         }
//       }
//       return true; // No items to sync
//     } catch (error) {
//       console.error("Error syncing cart after registration:", error);
//       return false;
//     }
//   };

//   // Function to extract referral_id from URL query parameters
//   const getReferralIdFromURL = () => {
//     const queryParams = new URLSearchParams(location.search);
//     return queryParams.get('referral_id') || queryParams.get('refferal_id');
//   };

//   // Check sponsor ID for Agent role
//   // const checkSponsorId = async (sponsorId, isAutoCheck = false) => {
//   //   if (!sponsorId || sponsorId.trim() === "") {
//   //     setSponsorInfo(null);
//   //     setSponsorError('');
//   //     if (!isAutoCheck) setCheckingSponsor(false);
//   //     return;
//   //   }

//   //   if (!isAutoCheck) setCheckingSponsor(true);
//   //   setAutoChecking(isAutoCheck);
//   //   setSponsorError('');
//   //   setSponsorInfo(null);

//   //   try {
//   //     const response = await fetch(`${baseurl}/users/search/?referral_id=${encodeURIComponent(sponsorId.trim())}`);
      
//   //     if (!response.ok) {
//   //       throw new Error('Failed to fetch sponsor info');
//   //     }
      
//   //     const data = await response.json();
//   //     console.log("Sponsor check API response:", data);

//   //     let foundAgent = null;
      
//   //     if (Array.isArray(data) && data.length > 0) {
//   //       foundAgent = data[0];
//   //     } else if (data && data.results && Array.isArray(data.results) && data.results.length > 0) {
//   //       foundAgent = data.results[0];
//   //     }
      
//   //     if (foundAgent) {
//   //       setSponsorInfo(foundAgent);
//   //       setSponsorError('');
        
//   //       if (isAutoCheck) {
//   //         Swal.fire({
//   //           icon: "success",
//   //           title: "Valid Sponsor Found!",
//   //           text: `Sponsor: ${foundAgent.first_name} ${foundAgent.last_name}`,
//   //           confirmButtonColor: "#3085d6",
//   //           timer: 3000
//   //         });
//   //       }
//   //     } else {
//   //       setSponsorInfo(null);
//   //       setSponsorError('Invalid Sponsor ID');
        
//   //       if (!isAutoCheck) {
//   //         Swal.fire({
//   //           icon: "error",
//   //           title: "Invalid Sponsor ID",
//   //           text: "Please enter a valid Sponsor ID or leave it blank",
//   //           confirmButtonColor: "#d33",
//   //           timer: 3000
//   //         });
//   //       }
//   //     }
//   //   } catch (error) {
//   //     setSponsorInfo(null);
//   //     setSponsorError('Error checking sponsor ID');
//   //     console.error('Error checking sponsor ID:', error);
//   //   } finally {
//   //     if (!isAutoCheck) setCheckingSponsor(false);
//   //     setAutoChecking(false);
//   //   }
//   // };
// // Check sponsor ID for Agent role
// const checkSponsorId = async (sponsorId, isAutoCheck = false) => {
//   if (!sponsorId || sponsorId.trim() === "") {
//     setSponsorInfo(null);
//     setSponsorError('');
//     if (!isAutoCheck) setCheckingSponsor(false);
//     return;
//   }

//   if (!isAutoCheck) setCheckingSponsor(true);
//   setAutoChecking(isAutoCheck);
//   setSponsorError('');
//   setSponsorInfo(null);

//   try {
//     const response = await fetch(`${baseurl}/users/search/?referral_id=${encodeURIComponent(sponsorId.trim())}`);
    
//     if (!response.ok) {
//       throw new Error('Failed to fetch sponsor info');
//     }
    
//     const data = await response.json();
//     console.log("Sponsor check API response:", data);

//     let foundAgent = null;
    
//     if (Array.isArray(data) && data.length > 0) {
//       foundAgent = data[0];
//     } else if (data && data.results && Array.isArray(data.results) && data.results.length > 0) {
//       foundAgent = data.results[0];
//     }
    
//     if (foundAgent) {
//       setSponsorInfo(foundAgent);
//       setSponsorError('');
      
//       if (isAutoCheck) {
//         // Optional: You can keep a small success indicator if needed
//         console.log(`Valid Sponsor Found: ${foundAgent.first_name} ${foundAgent.last_name}`);
//       }
//     } else {
//       setSponsorInfo(null);
//       setSponsorError('Invalid Sponsor ID');
//       // Removed the Swal.fire popup for invalid sponsor
//     }
//   } catch (error) {
//     setSponsorInfo(null);
//     setSponsorError('Error checking sponsor ID');
//     console.error('Error checking sponsor ID:', error);
//   } finally {
//     if (!isAutoCheck) setCheckingSponsor(false);
//     setAutoChecking(false);
//   }
// };



//   // Handle role change
//   const handleRoleChange = (roleId) => {
//     const selectedRole = roles.find(role => role.role_id === parseInt(roleId));
    
//     setFormData(prev => ({ 
//       ...prev, 
//       role_ids: [parseInt(roleId)],
//       referred_by: ""
//     }));
    
//     const isAgentRole = selectedRole?.role_name === "Agent";
//     setShowSponsorField(isAgentRole);
    
//     if (!isAgentRole) {
//       setSponsorInfo(null);
//       setSponsorError('');
//     }
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
    
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   // Handle sponsor ID change with debounce
//   // useEffect(() => {
//   //   if (showSponsorField && formData.referred_by) {
//   //     const timer = setTimeout(() => {
//   //       checkSponsorId(formData.referred_by);
//   //     }, 800);

//   //     return () => clearTimeout(timer);
//   //   } else if (showSponsorField && !formData.referred_by) {
//   //     setSponsorInfo(null);
//   //     setSponsorError('');
//   //     setCheckingSponsor(false);
//   //     setAutoChecking(false);
//   //   }
//   // }, [formData.referred_by, showSponsorField]);

//   // Handle sponsor ID change with increased debounce time
// // Handle sponsor ID change with increased debounce time
// useEffect(() => {
//   if (showSponsorField && formData.referred_by) {
//     // Clear any existing error while typing
//     setSponsorError('');
//     setSponsorInfo(null);
//     setCheckingSponsor(false);
//     setAutoChecking(false);
    
//     // Only check if there's actual text and length is reasonable
//     if (formData.referred_by.trim().length > 0) {
//       const timer = setTimeout(() => {
//         // Only validate if it's a reasonable length (at least 3 chars)
//         if (formData.referred_by.trim().length >= 3) {
//           checkSponsorId(formData.referred_by);
//         } else if (formData.referred_by.trim().length > 0) {
//           // Show message for too short IDs but don't call API
//           setSponsorError('Sponsor ID must be at least 3 characters');
//           setSponsorInfo(null);
//           setCheckingSponsor(false);
//           setAutoChecking(false);
//         }
//       }, 2000); // 2 seconds delay

//       return () => clearTimeout(timer);
//     }
//   } else if (showSponsorField && !formData.referred_by) {
//     setSponsorInfo(null);
//     setSponsorError('');
//     setCheckingSponsor(false);
//     setAutoChecking(false);
//   }
// }, [formData.referred_by, showSponsorField]);

//   // Fetch roles and helpline number on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       setFetchingRoles(true);
      
//       try {
//         const rolesResponse = await fetch(`${baseurl}/roles/`);
//         if (!rolesResponse.ok) {
//           throw new Error('Failed to fetch roles');
//         }
//         const rolesData = await rolesResponse.json();
//         console.log("Roles API Response:", rolesData);
        
//         let rolesList = [];
//         if (Array.isArray(rolesData)) {
//           rolesList = rolesData;
//         } else if (rolesData.results && Array.isArray(rolesData.results)) {
//           rolesList = rolesData.results;
//         }
        
//         const filteredRoles = rolesList
//           .filter(role => role.role_name.toLowerCase() !== "admin")
//           .sort((a, b) => a.role_name.localeCompare(b.role_name));
        
//         console.log("Filtered roles for dropdown:", filteredRoles);
//         setRoles(filteredRoles);

//         const phoneResponse = await fetch(`${baseurl}/phonenumbers/`);
//         if (phoneResponse.ok) {
//           const phoneData = await phoneResponse.json();
//           if (Array.isArray(phoneData) && phoneData.length > 0 && phoneData[0].phone_number) {
//             setHelplineNumber(phoneData[0].phone_number);
//           }
//         }

//         const referralIdFromURL = getReferralIdFromURL();
//         if (referralIdFromURL) {
//           console.log("Referral ID found in URL:", referralIdFromURL);
          
//           const agentRole = filteredRoles.find(role => role.role_name === "Agent");
//           if (agentRole) {
//             setTimeout(() => {
//               setFormData(prev => ({ 
//                 ...prev, 
//                 role_ids: [agentRole.role_id],
//                 referred_by: referralIdFromURL
//               }));
//               setShowSponsorField(true);
              
//               setTimeout(() => {
//                 checkSponsorId(referralIdFromURL, true);
//               }, 100);
//             }, 100);
            
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
//   }, [location.search]);

//   // Navigate to appropriate cart page based on role
//   const navigateToCartPage = (role) => {
//     if (role === "Agent") {
//       navigate("/agent-add-to-cart");
//     } else if (role === "Client") {
//       navigate("/client-add-to-cart");
//     } else {
//       navigate("/checkout");
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

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

//    if (formData.email.trim() && !emailRegex.test(formData.email)) {
//   newErrors.email = "Please enter a valid email address";
// }

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

//     if (showSponsorField && formData.referred_by && sponsorError && !autoChecking) {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Sponsor ID",
//         text: "Please enter a valid Sponsor ID or leave it blank",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

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

//     const submitData = {
//       first_name: formData.first_name.trim(),
//       last_name: formData.last_name.trim(),
//       email: formData.email.trim(),
//       password: formData.password,
//       phone_number: formData.phone_number.trim(),
//       role_ids: formData.role_ids,
//     };

//     if (formData.referred_by && formData.referred_by.trim() && !sponsorError) {
//       submitData.referred_by = formData.referred_by.trim();
//     }
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
//         await Swal.fire({
//           icon: "success",
//           title: "Registration Successful!",
//           text: "You have been registered successfully!",
//           confirmButtonColor: "#3085d6"
//         });

//         if (responseData.user_id) {
//           localStorage.setItem("user_id", responseData.user_id);
          
//           if (responseData.roles) {
//             localStorage.setItem("user_roles", JSON.stringify(responseData.roles));
//           }

//           const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
//           const hasItems = guestCart.length > 0;
          
//           if (hasItems) {
//             await syncCartAfterRegistration(responseData.user_id);
//           }
          
//           const redirectedFromCart = localStorage.getItem('redirect_from_cart') === 'true';
          
//           if (redirectedFromCart && hasItems) {
//             // Clear the redirect flag
//             localStorage.removeItem('redirect_from_cart');
            
//             const userRoles = responseData.roles || [];
            
//             if (userRoles.length > 1) {
//               const { value: selectedRole } = await Swal.fire({
//                 title: "Select Your Role",
//                 input: "select",
//                 inputOptions: userRoles.reduce((acc, role) => ({ ...acc, [role]: role }), {}),
//                 inputPlaceholder: "Choose your role",
//                 showCancelButton: true,
//                 confirmButtonText: "Proceed",
//                 cancelButtonText: "Cancel",
//               });
//               if (selectedRole) {
//                 navigateToCartPage(selectedRole);
//               } else {
//                 navigate("/login");
//               }
//             } else if (userRoles.length === 1) {
//               navigateToCartPage(userRoles[0]);
//             } else {
//               const referralId = responseData.referred_by || '';
//               if (referralId.toUpperCase().startsWith('SRP')) {
//                 navigate('/agent-add-to-cart');
//               } else if (referralId.toUpperCase().startsWith('SRT')) {
//                 navigate('/client-add-to-cart');
//               } else {
//                 navigate('/checkout');
//               }
//             }
//           } else {
//             navigate("/login");
//           }
//         } else {
//           navigate("/login");
//         }
//       } else {
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
        
//         if (responseData.referred_by) {
//           backendErrors.referred_by = Array.isArray(responseData.referred_by)
//             ? responseData.referred_by[0]
//             : "Invalid sponsor ID";
//         }
        
//         if (responseData.error && typeof responseData.error === 'string') {
//           try {
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

//   const handleLoginClick = () => {
//     const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
//     if (guestCart.length > 0) {
//       localStorage.setItem('redirect_from_cart', 'true');
//     }
//     navigate("/login");
//   };

//   const handleTermsClick = () => {
//     window.open("/terms-and-conditions", "_blank");
//   };

//   const handlePrivacyClick = () => {
//     window.open("/privacy-policy", "_blank");
//   };

//   return (
//     <div className="register-bg">
//       <span className="register-close" onClick={() => {
//         const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
//         if (guestCart.length > 0) {
//           localStorage.setItem('redirect_from_cart', 'true');
//         }
//         navigate("/");
//       }}>✕</span>

//       <Container className="register-container">
//         <Card className="register-card">
//           <Card.Body>
//             <div className="register-brand-row">
//               <img src={shrirajlogo} alt="Shriraj Logo" className="register-logo" />
//             </div>

//             <div className="register-title">Registration</div>

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

//             {hasCartItems && redirectFromCart && (
//               <div className="cart-banner">
//                 <div className="cart-banner-content">
//                   <span className="cart-banner-icon">🛒</span>
//                   <span className="cart-banner-text">
//                     You have items in your cart. Complete registration to proceed.
//                   </span>
//                 </div>
//               </div>
//             )}

//            <Form onSubmit={handleSubmit}>
//   {/* Row 1: First Name & Last Name */}
//   <div className="register-form-grid">
//     <div className="form-group-container">
//       <Form.Control
//         type="text"
//         name="first_name"
//         placeholder="First Name *"
//         className="register-input"
//         value={formData.first_name}
//         onChange={handleChange}
//       />
//     </div>
    
//     <div className="form-group-container">
//       <Form.Control
//         type="text"
//         name="last_name"
//         placeholder="Last Name *"
//         className="register-input"
//         value={formData.last_name}
//         onChange={handleChange}
//       />
//     </div>
//   </div>

//   {/* Row 2: Email & Password */}
//   <div className="register-form-grid">
//     <div className="form-group-container">
//       <Form.Control
//         type="email"
//         name="email"
// placeholder="Email (Optional)"
//         className="register-input"
//         value={formData.email}
//         onChange={handleChange}
//         isInvalid={!!errors.email}
//       />
//       {errors.email && (
//         <div className="error-feedback">{errors.email}</div>
//       )}
//     </div>

//     <div className="form-group-container">
//       <InputGroup className="input-group">
//         <Form.Control
//           type={showPassword ? "text" : "password"}
//           name="password"
//           placeholder="Password *"
//           className="register-input"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         <InputGroup.Text
//           className="register-eye"
//           onClick={() => setShowPassword(!showPassword)}
//         >
//           {showPassword ? <EyeSlash /> : <Eye />}
//         </InputGroup.Text>
//       </InputGroup>
//     </div>
//   </div>

//   {/* Row 3: Phone Number & Role */}
//   <div className="register-form-grid">
//     <div className="form-group-container">
//       <Form.Control
//         type="tel"
//         name="phone_number"
//         placeholder="Phone Number * (10 digits)"
//         className="register-input"
//         value={formData.phone_number}
//         onChange={handleChange}
//         isInvalid={!!errors.phone_number}
//       />
//       {errors.phone_number && (
//         <div className="error-feedback">{errors.phone_number}</div>
//       )}
//     </div>

//     <div className="form-group-container">
//       {fetchingRoles ? (
//         <div className="spinner-wrapper">
//           <Spinner animation="border" size="sm" />
//           <span className="ms-2">Loading roles...</span>
//         </div>
//       ) : (
//         <Form.Select 
//           className="register-input"
//           value={formData.role_ids[0] || ""}
//           onChange={(e) => handleRoleChange(e.target.value)}
//         >
//           <option value="">Select Role *</option>
//           {roles.length > 0 ? (
//             roles.map((role) => (
//               <option key={role.role_id} value={role.role_id}>
//                 {role.role_name === "Agent"
//                   ? "Team"
//                   : role.role_name === "Client"
//                   ? "User"
//                   : role.role_name}
//               </option>
//             ))
//           ) : (
//             <option value="" disabled>No roles available</option>
//           )}
//         </Form.Select>
//       )}
//     </div>
//   </div>

//   {/* Sponsor Field */}
//   {showSponsorField && (
//     <div className="register-form-grid full-width">
//       <div className="form-group-container">
//         <Form.Control
//           type="text"
//           name="referred_by"
//           placeholder="Enter Sponsor ID (Optional)"
//           className="register-input"
//           value={formData.referred_by}
//           onChange={handleChange}
//           isInvalid={!!sponsorError && formData.referred_by !== ""}
//         />
        
//         {sponsorError && formData.referred_by !== "" && (
//           <div className="error-feedback">{sponsorError}</div>
//         )}
        
//         {(checkingSponsor || autoChecking) && (
//           <div className="sponsor-loading sponsor-feedback">
//             <Spinner animation="border" size="sm" className="me-1" />
//             Checking sponsor ID...
//           </div>
//         )}
        
//         {sponsorInfo && !sponsorError && (
//           <div className="sponsor-valid sponsor-feedback">
//             ✓ Valid Sponsor ID: <strong>{formData.referred_by}</strong>
//             <div className="sponsor-details">
//               {sponsorInfo.first_name} {sponsorInfo.last_name}
//               {sponsorInfo.phone_number && ` (${sponsorInfo.phone_number})`}
//             </div>
//           </div>
//         )}
        
//         {!sponsorError && !checkingSponsor && !autoChecking && !sponsorInfo && formData.referred_by === "" && (
//           <div className="sponsor-loading sponsor-feedback">
//             Enter the Referral ID of your sponsor (optional)
//           </div>
//         )}
//       </div>
//     </div>
//   )}

//   {/* Terms and Conditions */}
//   <div className="register-terms-container">
//     <Form.Check
//       type="checkbox"
//       id="terms-checkbox"
//       className="register-terms"
//       checked={agree}
//       onChange={() => setAgree(!agree)}
//       label={
//         <span>
//           I agree to the{" "}
//           <span className="register-link" onClick={handleTermsClick}>
//             Terms & Conditions
//           </span>{" "}
//           and{" "}
//           <span className="register-link" onClick={handlePrivacyClick}>
//             Privacy Policy
//           </span>
//         </span>
//       }
//     />
//   </div>

//   {/* Helpline */}
//   <div className="register-helpline">
//     Helpline Number: <strong>{helplineNumber || "9399492809"}</strong>
//   </div>

//   {/* Register Button */}
//   <Button 
//     className="register-btn" 
//     type="submit"
//     disabled={!agree || loading || fetchingRoles || (showSponsorField && autoChecking)}
//   >
//     {loading ? (
//       <>
//         <Spinner animation="border" size="sm" className="me-2" />
//         Registering...
//       </>
//     ) : (
//       "Register"
//     )}
//   </Button>

//   {/* Footer */}
//   <div className="register-footer">
//     Already registered?{" "}
//     <span
//       className="register-link"
//       onClick={handleLoginClick}
//     >
//       Login
//     </span>
//   </div>
// </Form>
//           </Card.Body>
//         </Card>
//       </Container>

//       <style>{`
//         .cart-banner {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border-radius: 8px;
//           margin-bottom: 20px;
//           padding: 12px 16px;
//           animation: slideDown 0.5s ease-out;
//         }

//         .cart-banner-content {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .cart-banner-icon {
//           font-size: 24px;
//           background: rgba(255, 255, 255, 0.2);
//           width: 40px;
//           height: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 50%;
//         }

//         .cart-banner-text {
//           color: white;
//           font-size: 14px;
//           font-weight: 500;
//           flex: 1;
//         }

//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @media (max-width: 768px) {
//           .cart-banner {
//             padding: 10px 12px;
//           }
          
//           .cart-banner-icon {
//             font-size: 20px;
//             width: 32px;
//             height: 32px;
//           }
          
//           .cart-banner-text {
//             font-size: 12px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Register;


//=========================================



//14-02-2026
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
//     referred_by: ""
//   });

//   const [roles, setRoles] = useState([]);
//   const [errors, setErrors] = useState({
//     email: "",
//     phone_number: ""
//   });
//   const [helplineNumber, setHelplineNumber] = useState("");
//   const [hasCartItems, setHasCartItems] = useState(false);
//   const [redirectFromCart, setRedirectFromCart] = useState(false);

//   // Sponsor ID states (for Agent role)
//   const [sponsorInfo, setSponsorInfo] = useState(null);
//   const [sponsorError, setSponsorError] = useState('');
//   const [showSponsorField, setShowSponsorField] = useState(false);
//   const [checkingSponsor, setCheckingSponsor] = useState(false);
//   const [autoChecking, setAutoChecking] = useState(false);

//   // Check if user has items in cart
//   useEffect(() => {
//     const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
//     const cartRedirect = localStorage.getItem("redirect_from_cart") === "true";
    
//     setHasCartItems(guestCart.length > 0);
//     setRedirectFromCart(cartRedirect);

//     // Only show message if there are actual cart items
//     if (cartRedirect && guestCart.length > 0) {
//       Swal.fire({
//         title: 'Complete Your Registration',
//         text: 'You have items in your cart. Complete registration to proceed with checkout.',
//         icon: 'info',
//         timer: 4000,
//         timerProgressBar: true,
//         showConfirmButton: false
//       });
//     }
//   }, []);

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
//       const response = await fetch(`${baseurl}/users/search/?referral_id=${encodeURIComponent(sponsorId.trim())}`);
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch sponsor info');
//       }
      
//       const data = await response.json();
//       console.log("Sponsor check API response:", data);

//       let foundAgent = null;
      
//       if (Array.isArray(data) && data.length > 0) {
//         foundAgent = data[0];
//       } else if (data && data.results && Array.isArray(data.results) && data.results.length > 0) {
//         foundAgent = data.results[0];
//       }
      
//       if (foundAgent) {
//         setSponsorInfo(foundAgent);
//         setSponsorError('');
        
//         if (isAutoCheck) {
//           console.log(`Valid Sponsor Found: ${foundAgent.first_name} ${foundAgent.last_name}`);
//         }
//       } else {
//         setSponsorInfo(null);
//         setSponsorError('Invalid Sponsor ID');
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
//       referred_by: ""
//     }));
    
//     const isAgentRole = selectedRole?.role_name === "Agent";
//     setShowSponsorField(isAgentRole);
    
//     if (!isAgentRole) {
//       setSponsorInfo(null);
//       setSponsorError('');
//     }
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
    
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   // Handle sponsor ID change with increased debounce time
//   useEffect(() => {
//     if (showSponsorField && formData.referred_by) {
//       setSponsorError('');
//       setSponsorInfo(null);
//       setCheckingSponsor(false);
//       setAutoChecking(false);
      
//       if (formData.referred_by.trim().length > 0) {
//         const timer = setTimeout(() => {
//           if (formData.referred_by.trim().length >= 3) {
//             checkSponsorId(formData.referred_by);
//           } else if (formData.referred_by.trim().length > 0) {
//             setSponsorError('Sponsor ID must be at least 3 characters');
//             setSponsorInfo(null);
//             setCheckingSponsor(false);
//             setAutoChecking(false);
//           }
//         }, 2000);

//         return () => clearTimeout(timer);
//       }
//     } else if (showSponsorField && !formData.referred_by) {
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
//         const rolesResponse = await fetch(`${baseurl}/roles/`);
//         if (!rolesResponse.ok) {
//           throw new Error('Failed to fetch roles');
//         }
//         const rolesData = await rolesResponse.json();
//         console.log("Roles API Response:", rolesData);
        
//         let rolesList = [];
//         if (Array.isArray(rolesData)) {
//           rolesList = rolesData;
//         } else if (rolesData.results && Array.isArray(rolesData.results)) {
//           rolesList = rolesData.results;
//         }
        
//         const filteredRoles = rolesList
//           .filter(role => role.role_name.toLowerCase() !== "admin")
//           .sort((a, b) => a.role_name.localeCompare(b.role_name));
        
//         console.log("Filtered roles for dropdown:", filteredRoles);
//         setRoles(filteredRoles);

//         const phoneResponse = await fetch(`${baseurl}/phonenumbers/`);
//         if (phoneResponse.ok) {
//           const phoneData = await phoneResponse.json();
//           if (Array.isArray(phoneData) && phoneData.length > 0 && phoneData[0].phone_number) {
//             setHelplineNumber(phoneData[0].phone_number);
//           }
//         }

//         const referralIdFromURL = getReferralIdFromURL();
//         if (referralIdFromURL) {
//           console.log("Referral ID found in URL:", referralIdFromURL);
          
//           const agentRole = filteredRoles.find(role => role.role_name === "Agent");
//           if (agentRole) {
//             setTimeout(() => {
//               setFormData(prev => ({ 
//                 ...prev, 
//                 role_ids: [agentRole.role_id],
//                 referred_by: referralIdFromURL
//               }));
//               setShowSponsorField(true);
              
//               setTimeout(() => {
//                 checkSponsorId(referralIdFromURL, true);
//               }, 100);
//             }, 100);
            
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
//   }, [location.search]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

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

//     if (formData.email.trim() && !emailRegex.test(formData.email)) {
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

//     if (showSponsorField && formData.referred_by && sponsorError && !autoChecking) {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Sponsor ID",
//         text: "Please enter a valid Sponsor ID or leave it blank",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

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

//     const submitData = {
//       first_name: formData.first_name.trim(),
//       last_name: formData.last_name.trim(),
//       email: formData.email.trim(),
//       password: formData.password,
//       phone_number: formData.phone_number.trim(),
//       role_ids: formData.role_ids,
//     };

//     if (formData.referred_by && formData.referred_by.trim() && !sponsorError) {
//       submitData.referred_by = formData.referred_by.trim();
//     }
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
//         // Store phone number for OTP verification
//         localStorage.setItem("temp_phone_number", formData.phone_number.trim());
        
//         // Store registration data temporarily
//         const tempUserData = {
//           phone_number: formData.phone_number.trim(),
//           first_name: formData.first_name.trim(),
//           last_name: formData.last_name.trim(),
//           email: formData.email.trim(),
//           role_ids: formData.role_ids,
//         };
//         localStorage.setItem("temp_user_data", JSON.stringify(tempUserData));
        
//         await Swal.fire({
//           icon: "success",
//           title: "OTP Sent!",
//           text: responseData.message || "OTP sent successfully to your mobile number",
//           confirmButtonColor: "#3085d6"
//         });

//         // Navigate to OTP verification page
//         navigate("/register-verify-otp", { 
//           state: { 
//             phoneNumber: formData.phone_number.trim(),
//             fromRegistration: true
//           } 
//         });
//       } else {
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
        
//         if (responseData.referred_by) {
//           backendErrors.referred_by = Array.isArray(responseData.referred_by)
//             ? responseData.referred_by[0]
//             : "Invalid sponsor ID";
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

//   const handleLoginClick = () => {
//     const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
//     if (guestCart.length > 0) {
//       localStorage.setItem('redirect_from_cart', 'true');
//     }
//     navigate("/login");
//   };

//   const handleTermsClick = () => {
//     window.open("/terms-and-conditions", "_blank");
//   };

//   const handlePrivacyClick = () => {
//     window.open("/privacy-policy", "_blank");
//   };

//   return (
//     <div className="register-bg">
//       <span className="register-close" onClick={() => {
//         const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
//         if (guestCart.length > 0) {
//           localStorage.setItem('redirect_from_cart', 'true');
//         }
//         navigate("/");
//       }}>✕</span>

//       <Container className="register-container">
//         <Card className="register-card">
//           <Card.Body>
//             <div className="register-brand-row">
//               <img src={shrirajlogo} alt="Shriraj Logo" className="register-logo" />
//             </div>

//             <div className="register-title">Registration</div>

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

//             {hasCartItems && redirectFromCart && (
//               <div className="cart-banner">
//                 <div className="cart-banner-content">
//                   <span className="cart-banner-icon">🛒</span>
//                   <span className="cart-banner-text">
//                     You have items in your cart. Complete registration to proceed.
//                   </span>
//                 </div>
//               </div>
//             )}

//             <Form onSubmit={handleSubmit}>
//               {/* Row 1: First Name & Last Name */}
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
//                 </div>
//               </div>

//               {/* Row 2: Email & Password */}
//               <div className="register-form-grid">
//                 <div className="form-group-container">
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     placeholder="Email (Optional)"
//                     className="register-input"
//                     value={formData.email}
//                     onChange={handleChange}
//                     isInvalid={!!errors.email}
//                   />
//                   {errors.email && (
//                     <div className="error-feedback">{errors.email}</div>
//                   )}
//                 </div>

//                 <div className="form-group-container">
//                   <InputGroup className="input-group">
//                     <Form.Control
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       placeholder="Password *"
//                       className="register-input"
//                       value={formData.password}
//                       onChange={handleChange}
//                     />
//                     <InputGroup.Text
//                       className="register-eye"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <EyeSlash /> : <Eye />}
//                     </InputGroup.Text>
//                   </InputGroup>
//                 </div>
//               </div>

//               {/* Row 3: Phone Number & Role */}
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
//                   {errors.phone_number && (
//                     <div className="error-feedback">{errors.phone_number}</div>
//                   )}
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
//                 </div>
//               </div>

//               {/* Sponsor Field */}
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
                    
//                     {sponsorError && formData.referred_by !== "" && (
//                       <div className="error-feedback">{sponsorError}</div>
//                     )}
                    
//                     {(checkingSponsor || autoChecking) && (
//                       <div className="sponsor-loading sponsor-feedback">
//                         <Spinner animation="border" size="sm" className="me-1" />
//                         Checking sponsor ID...
//                       </div>
//                     )}
                    
//                     {sponsorInfo && !sponsorError && (
//                       <div className="sponsor-valid sponsor-feedback">
//                         ✓ Valid Sponsor ID: <strong>{formData.referred_by}</strong>
//                         <div className="sponsor-details">
//                           {sponsorInfo.first_name} {sponsorInfo.last_name}
//                           {sponsorInfo.phone_number && ` (${sponsorInfo.phone_number})`}
//                         </div>
//                       </div>
//                     )}
                    
//                     {!sponsorError && !checkingSponsor && !autoChecking && !sponsorInfo && formData.referred_by === "" && (
//                       <div className="sponsor-loading sponsor-feedback">
//                         Enter the Referral ID of your sponsor (optional)
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Terms and Conditions */}
//               <div className="register-terms-container">
//                 <Form.Check
//                   type="checkbox"
//                   id="terms-checkbox"
//                   className="register-terms"
//                   checked={agree}
//                   onChange={() => setAgree(!agree)}
//                   label={
//                     <span>
//                       I agree to the{" "}
//                       <span className="register-link" onClick={handleTermsClick}>
//                         Terms & Conditions
//                       </span>{" "}
//                       and{" "}
//                       <span className="register-link" onClick={handlePrivacyClick}>
//                         Privacy Policy
//                       </span>
//                     </span>
//                   }
//                 />
//               </div>

//               {/* Helpline */}
//               <div className="register-helpline">
//                 Helpline Number: <strong>{helplineNumber || "9399492809"}</strong>
//               </div>

//               {/* Register Button */}
//               <Button 
//                 className="register-btn" 
//                 type="submit"
//                 disabled={!agree || loading || fetchingRoles || (showSponsorField && autoChecking)}
//               >
//                 {loading ? (
//                   <>
//                     <Spinner animation="border" size="sm" className="me-2" />
//                     Registering...
//                   </>
//                 ) : (
//                   "Register"
//                 )}
//               </Button>

//               {/* Footer */}
//               <div className="register-footer">
//                 Already registered?{" "}
//                 <span
//                   className="register-link"
//                   onClick={handleLoginClick}
//                 >
//                   Login
//                 </span>
//               </div>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Container>

//       <style>{`
//         .cart-banner {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border-radius: 8px;
//           margin-bottom: 20px;
//           padding: 12px 16px;
//           animation: slideDown 0.5s ease-out;
//         }

//         .cart-banner-content {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .cart-banner-icon {
//           font-size: 24px;
//           background: rgba(255, 255, 255, 0.2);
//           width: 40px;
//           height: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 50%;
//         }

//         .cart-banner-text {
//           color: white;
//           font-size: 14px;
//           font-weight: 500;
//           flex: 1;
//         }

//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @media (max-width: 768px) {
//           .cart-banner {
//             padding: 10px 12px;
//           }
          
//           .cart-banner-icon {
//             font-size: 20px;
//             width: 32px;
//             height: 32px;
//           }
          
//           .cart-banner-text {
//             font-size: 12px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Register;

//=====================================================

// Code updated Date on = 08-04-2026


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
//     referred_by: ""
//   });

//   const [roles, setRoles] = useState([]);
//   const [errors, setErrors] = useState({
//     email: "",
//     phone_number: "",
//     first_name: "",
//     last_name: "",
//     password: "",
//     role_ids: "",
//     referred_by: ""
//   });
//   const [helplineNumber, setHelplineNumber] = useState("");
//   const [hasCartItems, setHasCartItems] = useState(false);
//   const [redirectFromCart, setRedirectFromCart] = useState(false);

//   // Sponsor ID states (for Agent role)
//   const [sponsorInfo, setSponsorInfo] = useState(null);
//   const [sponsorError, setSponsorError] = useState('');
//   const [showSponsorField, setShowSponsorField] = useState(false);
//   const [checkingSponsor, setCheckingSponsor] = useState(false);
//   const [autoChecking, setAutoChecking] = useState(false);

//   // Check if user has items in cart
//   useEffect(() => {
//     const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
//     const cartRedirect = localStorage.getItem("redirect_from_cart") === "true";
    
//     setHasCartItems(guestCart.length > 0);
//     setRedirectFromCart(cartRedirect);

//     // Only show message if there are actual cart items
//     if (cartRedirect && guestCart.length > 0) {
//       Swal.fire({
//         title: 'Complete Your Registration',
//         text: 'You have items in your cart. Complete registration to proceed with checkout.',
//         icon: 'info',
//         timer: 4000,
//         timerProgressBar: true,
//         showConfirmButton: false
//       });
//     }
//   }, []);

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
//       const response = await fetch(`${baseurl}/users/search/?referral_id=${encodeURIComponent(sponsorId.trim())}`);
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch sponsor info');
//       }
      
//       const data = await response.json();
//       console.log("Sponsor check API response:", data);

//       let foundAgent = null;
      
//       if (Array.isArray(data) && data.length > 0) {
//         foundAgent = data[0];
//       } else if (data && data.results && Array.isArray(data.results) && data.results.length > 0) {
//         foundAgent = data.results[0];
//       }
      
//       if (foundAgent) {
//         setSponsorInfo(foundAgent);
//         setSponsorError('');
//         // Clear any previous backend error for referred_by
//         setErrors(prev => ({ ...prev, referred_by: "" }));
        
//         if (isAutoCheck) {
//           console.log(`Valid Sponsor Found: ${foundAgent.first_name} ${foundAgent.last_name}`);
//         }
//       } else {
//         setSponsorInfo(null);
//         setSponsorError('Invalid Sponsor ID');
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
//       referred_by: ""
//     }));
    
//     const isAgentRole = selectedRole?.role_name === "Agent";
//     setShowSponsorField(isAgentRole);
    
//     if (!isAgentRole) {
//       setSponsorInfo(null);
//       setSponsorError('');
//       setErrors(prev => ({ ...prev, referred_by: "" }));
//     }
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
    
//     // Clear error for this field when user starts typing
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   // Handle sponsor ID change with increased debounce time
//   useEffect(() => {
//     if (showSponsorField && formData.referred_by) {
//       setSponsorError('');
//       setSponsorInfo(null);
//       setCheckingSponsor(false);
//       setAutoChecking(false);
      
//       if (formData.referred_by.trim().length > 0) {
//         const timer = setTimeout(() => {
//           if (formData.referred_by.trim().length >= 3) {
//             checkSponsorId(formData.referred_by);
//           } else if (formData.referred_by.trim().length > 0) {
//             setSponsorError('Sponsor ID must be at least 3 characters');
//             setSponsorInfo(null);
//             setCheckingSponsor(false);
//             setAutoChecking(false);
//           }
//         }, 2000);

//         return () => clearTimeout(timer);
//       }
//     } else if (showSponsorField && !formData.referred_by) {
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
//         const rolesResponse = await fetch(`${baseurl}/roles/`);
//         if (!rolesResponse.ok) {
//           throw new Error('Failed to fetch roles');
//         }
//         const rolesData = await rolesResponse.json();
//         console.log("Roles API Response:", rolesData);
        
//         let rolesList = [];
//         if (Array.isArray(rolesData)) {
//           rolesList = rolesData;
//         } else if (rolesData.results && Array.isArray(rolesData.results)) {
//           rolesList = rolesData.results;
//         }
        
//         const filteredRoles = rolesList
//           .filter(role => role.role_name.toLowerCase() !== "admin")
//           .sort((a, b) => a.role_name.localeCompare(b.role_name));
        
//         console.log("Filtered roles for dropdown:", filteredRoles);
//         setRoles(filteredRoles);

//         const phoneResponse = await fetch(`${baseurl}/phonenumbers/`);
//         if (phoneResponse.ok) {
//           const phoneData = await phoneResponse.json();
//           if (Array.isArray(phoneData) && phoneData.length > 0 && phoneData[0].phone_number) {
//             setHelplineNumber(phoneData[0].phone_number);
//           }
//         }

//         const referralIdFromURL = getReferralIdFromURL();
//         if (referralIdFromURL) {
//           console.log("Referral ID found in URL:", referralIdFromURL);
          
//           const agentRole = filteredRoles.find(role => role.role_name === "Agent");
//           if (agentRole) {
//             setTimeout(() => {
//               setFormData(prev => ({ 
//                 ...prev, 
//                 role_ids: [agentRole.role_id],
//                 referred_by: referralIdFromURL
//               }));
//               setShowSponsorField(true);
              
//               setTimeout(() => {
//                 checkSponsorId(referralIdFromURL, true);
//               }, 100);
//             }, 100);
            
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
//   }, [location.search]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[0-9]{10}$/;

//     // Frontend validation
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

//     if (formData.email.trim() && !emailRegex.test(formData.email)) {
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

//     if (showSponsorField && formData.referred_by && sponsorError && !autoChecking) {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Sponsor ID",
//         text: "Please enter a valid Sponsor ID or leave it blank",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

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

//     const submitData = {
//       first_name: formData.first_name.trim(),
//       last_name: formData.last_name.trim(),
//       email: formData.email.trim(),
//       password: formData.password,
//       phone_number: formData.phone_number.trim(),
//       role_ids: formData.role_ids,
//     };

//     if (formData.referred_by && formData.referred_by.trim() && !sponsorError) {
//       submitData.referred_by = formData.referred_by.trim();
//     }
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
//         // Store phone number for OTP verification
//         localStorage.setItem("temp_phone_number", formData.phone_number.trim());
        
//         // Store registration data temporarily
//         const tempUserData = {
//           phone_number: formData.phone_number.trim(),
//           first_name: formData.first_name.trim(),
//           last_name: formData.last_name.trim(),
//           email: formData.email.trim(),
//           role_ids: formData.role_ids,
//         };
//         localStorage.setItem("temp_user_data", JSON.stringify(tempUserData));
        
//         await Swal.fire({
//           icon: "success",
//           title: "OTP Sent!",
//           text: responseData.message || "OTP sent successfully to your mobile number",
//           confirmButtonColor: "#3085d6"
//         });

//         // Navigate to OTP verification page
//         navigate("/register-verify-otp", { 
//           state: { 
//             phoneNumber: formData.phone_number.trim(),
//             fromRegistration: true
//           } 
//         });
//       } else {
//         // IMPROVED: Handle all backend errors properly
//         const backendErrors = {};
//         let errorMessage = "";
//         let errorList = [];
        
//         // Check if responseData has error object (from your Django API)
//         if (responseData.error) {
//           errorMessage = responseData.error;
//           errorList.push(responseData.error);
//         }
        
//         // Handle field-specific errors (Django REST framework format)
//         if (responseData.email) {
//           const emailError = Array.isArray(responseData.email) 
//             ? responseData.email[0] 
//             : responseData.email;
//           backendErrors.email = emailError;
//           errorList.push(emailError);
//         }
//         if (responseData.phone_number) {
//           const phoneError = Array.isArray(responseData.phone_number)
//             ? responseData.phone_number[0]
//             : responseData.phone_number;
//           backendErrors.phone_number = phoneError;
//           errorList.push(phoneError);
//         }
//         if (responseData.referred_by) {
//           const referralError = Array.isArray(responseData.referred_by)
//             ? responseData.referred_by[0]
//             : responseData.referred_by;
//           backendErrors.referred_by = referralError;
//           errorList.push(referralError);
//           setSponsorError(referralError);
//         }
//         if (responseData.first_name) {
//           backendErrors.first_name = Array.isArray(responseData.first_name)
//             ? responseData.first_name[0]
//             : responseData.first_name;
//           errorList.push(backendErrors.first_name);
//         }
//         if (responseData.last_name) {
//           backendErrors.last_name = Array.isArray(responseData.last_name)
//             ? responseData.last_name[0]
//             : responseData.last_name;
//           errorList.push(backendErrors.last_name);
//         }
//         if (responseData.password) {
//           backendErrors.password = Array.isArray(responseData.password)
//             ? responseData.password[0]
//             : responseData.password;
//           errorList.push(backendErrors.password);
//         }
//         if (responseData.role_ids) {
//           backendErrors.role_ids = Array.isArray(responseData.role_ids)
//             ? responseData.role_ids[0]
//             : responseData.role_ids;
//           errorList.push(backendErrors.role_ids);
//         }

//         // Update errors state to show inline errors
//         if (Object.keys(backendErrors).length > 0) {
//           setErrors(backendErrors);
//         }

//         // Show error message in SweetAlert
//         let displayErrorMessage = errorMessage || "Please check the form for errors.";
        
//         // If no specific error message but has field errors, show them
//         if (!errorMessage && errorList.length > 0) {
//           displayErrorMessage = errorList.join("\n");
//         }
        
//         // Handle specific error cases
//         if (responseData.email && responseData.email.toString().includes("already exists")) {
//           displayErrorMessage = "❌ This email is already registered. Please use a different email or login.";
//         }
//         if (responseData.phone_number && responseData.phone_number.toString().includes("already exists")) {
//           displayErrorMessage = "❌ This phone number is already registered. Please use a different number or login.";
//         }

//         await Swal.fire({
//           icon: "error",
//           title: "Registration Failed",
//           text: displayErrorMessage,
//           confirmButtonColor: "#d33",
//           html: errorList.length > 1 ? 
//             `<div style="text-align: left;">
//               ${errorList.map(err => `• ${err}<br/>`).join('')}
//              </div>` : undefined
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

//   const handleLoginClick = () => {
//     const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
//     if (guestCart.length > 0) {
//       localStorage.setItem('redirect_from_cart', 'true');
//     }
//     navigate("/login");
//   };

//   const handleTermsClick = () => {
//     window.open("/terms-and-conditions", "_blank");
//   };

//   const handlePrivacyClick = () => {
//     window.open("/privacy-policy", "_blank");
//   };

//   return (
//     <div className="register-bg">
//       <span className="register-close" onClick={() => {
//         const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
//         if (guestCart.length > 0) {
//           localStorage.setItem('redirect_from_cart', 'true');
//         }
//         navigate("/");
//       }}>✕</span>

//       <Container className="register-container">
//         <Card className="register-card">
//           <Card.Body>
//             <div className="register-brand-row">
//               <img src={shrirajlogo} alt="Shriraj Logo" className="register-logo" />
//             </div>

//             <div className="register-title">Registration</div>

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

//             {hasCartItems && redirectFromCart && (
//               <div className="cart-banner">
//                 <div className="cart-banner-content">
//                   <span className="cart-banner-icon">🛒</span>
//                   <span className="cart-banner-text">
//                     You have items in your cart. Complete registration to proceed.
//                   </span>
//                 </div>
//               </div>
//             )}

//             <Form onSubmit={handleSubmit}>
//               {/* Row 1: First Name & Last Name */}
//               <div className="register-form-grid">
//                 <div className="form-group-container">
//                   <Form.Control
//                     type="text"
//                     name="first_name"
//                     placeholder="First Name *"
//                     className={`register-input ${errors.first_name ? 'is-invalid' : ''}`}
//                     value={formData.first_name}
//                     onChange={handleChange}
//                   />
//                   {errors.first_name && (
//                     <div className="error-feedback" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
//                       {errors.first_name}
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="form-group-container">
//                   <Form.Control
//                     type="text"
//                     name="last_name"
//                     placeholder="Last Name *"
//                     className={`register-input ${errors.last_name ? 'is-invalid' : ''}`}
//                     value={formData.last_name}
//                     onChange={handleChange}
//                   />
//                   {errors.last_name && (
//                     <div className="error-feedback" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
//                       {errors.last_name}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Row 2: Email & Password */}
//               <div className="register-form-grid">
//                 <div className="form-group-container">
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     placeholder="Email (Optional)"
//                     className={`register-input ${errors.email ? 'is-invalid' : ''}`}
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                   {errors.email && (
//                     <div className="error-feedback" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
//                       {errors.email}
//                     </div>
//                   )}
//                 </div>

//                 <div className="form-group-container">
//                   <InputGroup className="input-group">
//                     <Form.Control
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       placeholder="Password *"
//                       className={`register-input ${errors.password ? 'is-invalid' : ''}`}
//                       value={formData.password}
//                       onChange={handleChange}
//                     />
//                     <InputGroup.Text
//                       className="register-eye"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <EyeSlash /> : <Eye />}
//                     </InputGroup.Text>
//                   </InputGroup>
//                   {errors.password && (
//                     <div className="error-feedback" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
//                       {errors.password}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Row 3: Phone Number & Role */}
//               <div className="register-form-grid">
//                 <div className="form-group-container">
//                   <Form.Control
//                     type="tel"
//                     name="phone_number"
//                     placeholder="Phone Number * (10 digits)"
//                     className={`register-input ${errors.phone_number ? 'is-invalid' : ''}`}
//                     value={formData.phone_number}
//                     onChange={handleChange}
//                   />
//                   {errors.phone_number && (
//                     <div className="error-feedback" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
//                       {errors.phone_number}
//                     </div>
//                   )}
//                 </div>

//                 <div className="form-group-container">
//                   {fetchingRoles ? (
//                     <div className="spinner-wrapper">
//                       <Spinner animation="border" size="sm" />
//                       <span className="ms-2">Loading roles...</span>
//                     </div>
//                   ) : (
//                     <>
//                       <Form.Select 
//                         className={`register-input ${errors.role_ids ? 'is-invalid' : ''}`}
//                         value={formData.role_ids[0] || ""}
//                         onChange={(e) => handleRoleChange(e.target.value)}
//                       >
//                         <option value="">Select Role *</option>
//                         {roles.length > 0 ? (
//                           roles.map((role) => (
//                             <option key={role.role_id} value={role.role_id}>
//                               {role.role_name === "Agent"
//                                 ? "Team"
//                                 : role.role_name === "Client"
//                                 ? "User"
//                                 : role.role_name}
//                             </option>
//                           ))
//                         ) : (
//                           <option value="" disabled>No roles available</option>
//                         )}
//                       </Form.Select>
//                       {errors.role_ids && (
//                         <div className="error-feedback" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
//                           {errors.role_ids}
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Sponsor Field */}
//               {showSponsorField && (
//                 <div className="register-form-grid full-width">
//                   <div className="form-group-container">
//                     <Form.Control
//                       type="text"
//                       name="referred_by"
//                       placeholder="Enter Sponsor ID (Optional)"
//                       className={`register-input ${(sponsorError || errors.referred_by) ? 'is-invalid' : ''}`}
//                       value={formData.referred_by}
//                       onChange={handleChange}
//                     />
                    
//                     {(sponsorError || errors.referred_by) && formData.referred_by !== "" && (
//                       <div className="error-feedback" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
//                         {sponsorError || errors.referred_by}
//                       </div>
//                     )}
                    
//                     {(checkingSponsor || autoChecking) && (
//                       <div className="sponsor-loading sponsor-feedback" style={{ color: '#6c757d', fontSize: '12px', marginTop: '5px' }}>
//                         <Spinner animation="border" size="sm" className="me-1" />
//                         Checking sponsor ID...
//                       </div>
//                     )}
                    
//                     {sponsorInfo && !sponsorError && !errors.referred_by && (
//                       <div className="sponsor-valid sponsor-feedback" style={{ color: '#28a745', fontSize: '12px', marginTop: '5px' }}>
//                         ✓ Valid Sponsor ID: <strong>{formData.referred_by}</strong>
//                         <div className="sponsor-details" style={{ fontSize: '11px', color: '#6c757d' }}>
//                           {sponsorInfo.first_name} {sponsorInfo.last_name}
//                           {sponsorInfo.phone_number && ` (${sponsorInfo.phone_number})`}
//                         </div>
//                       </div>
//                     )}
                    
//                     {!sponsorError && !checkingSponsor && !autoChecking && !sponsorInfo && formData.referred_by === "" && (
//                       <div className="sponsor-loading sponsor-feedback" style={{ color: '#6c757d', fontSize: '12px', marginTop: '5px' }}>
//                         Enter the Referral ID of your sponsor (optional)
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Terms and Conditions */}
//               <div className="register-terms-container">
//                 <Form.Check
//                   type="checkbox"
//                   id="terms-checkbox"
//                   className="register-terms"
//                   checked={agree}
//                   onChange={() => setAgree(!agree)}
//                   label={
//                     <span>
//                       I agree to the{" "}
//                       <span className="register-link" onClick={handleTermsClick}>
//                         Terms & Conditions
//                       </span>{" "}
//                       and{" "}
//                       <span className="register-link" onClick={handlePrivacyClick}>
//                         Privacy Policy
//                       </span>
//                     </span>
//                   }
//                 />
//               </div>

//               {/* Helpline */}
//               <div className="register-helpline">
//                 Helpline Number: <strong>{helplineNumber || "9399492809"}</strong>
//               </div>

//               {/* Register Button */}
//               <Button 
//                 className="register-btn" 
//                 type="submit"
//                 disabled={!agree || loading || fetchingRoles || (showSponsorField && autoChecking)}
//               >
//                 {loading ? (
//                   <>
//                     <Spinner animation="border" size="sm" className="me-2" />
//                     Registering...
//                   </>
//                 ) : (
//                   "Register"
//                 )}
//               </Button>

//               {/* Footer */}
//               <div className="register-footer">
//                 Already registered?{" "}
//                 <span
//                   className="register-link"
//                   onClick={handleLoginClick}
//                 >
//                   Login
//                 </span>
//               </div>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Container>

//       <style>{`
//         .cart-banner {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border-radius: 8px;
//           margin-bottom: 20px;
//           padding: 12px 16px;
//           animation: slideDown 0.5s ease-out;
//         }

//         .cart-banner-content {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .cart-banner-icon {
//           font-size: 24px;
//           background: rgba(255, 255, 255, 0.2);
//           width: 40px;
//           height: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 50%;
//         }

//         .cart-banner-text {
//           color: white;
//           font-size: 14px;
//           font-weight: 500;
//           flex: 1;
//         }

//         .referral-banner {
//           background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
//           border-radius: 8px;
//           margin-bottom: 20px;
//           padding: 12px 16px;
//           animation: slideDown 0.5s ease-out;
//         }

//         .referral-banner-content {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .referral-banner-icon {
//           font-size: 24px;
//           background: rgba(255, 255, 255, 0.2);
//           width: 40px;
//           height: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 50%;
//         }

//         .referral-banner-text {
//           color: #004d40;
//           font-size: 14px;
//           font-weight: 500;
//           flex: 1;
//         }

//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @media (max-width: 768px) {
//           .cart-banner, .referral-banner {
//             padding: 10px 12px;
//           }
          
//           .cart-banner-icon, .referral-banner-icon {
//             font-size: 20px;
//             width: 32px;
//             height: 32px;
//           }
          
//           .cart-banner-text, .referral-banner-text {
//             font-size: 12px;
//           }
//         }
//       `}</style>
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
//     full_name: "",
//     password: "",
//     phone_number: "",
//     role_ids: [],
//     referred_by: ""
//   });

//   const [roles, setRoles] = useState([]);
//   const [errors, setErrors] = useState({
//     full_name: "",
//     phone_number: "",
//     password: "",
//     role_ids: "",
//     referred_by: ""
//   });
//   const [helplineNumber, setHelplineNumber] = useState("");
//   const [hasCartItems, setHasCartItems] = useState(false);
//   const [redirectFromCart, setRedirectFromCart] = useState(false);

//   // Sponsor ID states (for Agent role)
//   const [sponsorInfo, setSponsorInfo] = useState(null);
//   const [sponsorError, setSponsorError] = useState('');
//   const [showSponsorField, setShowSponsorField] = useState(false);
//   const [checkingSponsor, setCheckingSponsor] = useState(false);
//   const [autoChecking, setAutoChecking] = useState(false);

//   // Check if user has items in cart
//   useEffect(() => {
//     const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
//     const cartRedirect = localStorage.getItem("redirect_from_cart") === "true";
    
//     setHasCartItems(guestCart.length > 0);
//     setRedirectFromCart(cartRedirect);

//     // Only show message if there are actual cart items
//     if (cartRedirect && guestCart.length > 0) {
//       Swal.fire({
//         title: 'Complete Your Registration',
//         text: 'You have items in your cart. Complete registration to proceed with checkout.',
//         icon: 'info',
//         timer: 4000,
//         timerProgressBar: true,
//         showConfirmButton: false
//       });
//     }
//   }, []);

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
//       const response = await fetch(`${baseurl}/users/search/?referral_id=${encodeURIComponent(sponsorId.trim())}`);
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch sponsor info');
//       }
      
//       const data = await response.json();
//       console.log("Sponsor check API response:", data);

//       let foundAgent = null;
      
//       if (Array.isArray(data) && data.length > 0) {
//         foundAgent = data[0];
//       } else if (data && data.results && Array.isArray(data.results) && data.results.length > 0) {
//         foundAgent = data.results[0];
//       }
      
//       if (foundAgent) {
//         setSponsorInfo(foundAgent);
//         setSponsorError('');
//         // Clear any previous backend error for referred_by
//         setErrors(prev => ({ ...prev, referred_by: "" }));
        
//         if (isAutoCheck) {
//           console.log(`Valid Sponsor Found: ${foundAgent.full_name || foundAgent.first_name + ' ' + foundAgent.last_name}`);
//         }
//       } else {
//         setSponsorInfo(null);
//         setSponsorError('Invalid Sponsor ID');
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
//       referred_by: ""
//     }));
    
//     const isAgentRole = selectedRole?.role_name === "Agent";
//     setShowSponsorField(isAgentRole);
    
//     if (!isAgentRole) {
//       setSponsorInfo(null);
//       setSponsorError('');
//       setErrors(prev => ({ ...prev, referred_by: "" }));
//     }
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
    
//     // Clear error for this field when user starts typing
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   // Handle sponsor ID change with increased debounce time
//   useEffect(() => {
//     if (showSponsorField && formData.referred_by) {
//       setSponsorError('');
//       setSponsorInfo(null);
//       setCheckingSponsor(false);
//       setAutoChecking(false);
      
//       if (formData.referred_by.trim().length > 0) {
//         const timer = setTimeout(() => {
//           if (formData.referred_by.trim().length >= 3) {
//             checkSponsorId(formData.referred_by);
//           } else if (formData.referred_by.trim().length > 0) {
//             setSponsorError('Sponsor ID must be at least 3 characters');
//             setSponsorInfo(null);
//             setCheckingSponsor(false);
//             setAutoChecking(false);
//           }
//         }, 2000);

//         return () => clearTimeout(timer);
//       }
//     } else if (showSponsorField && !formData.referred_by) {
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
//         const rolesResponse = await fetch(`${baseurl}/roles/`);
//         if (!rolesResponse.ok) {
//           throw new Error('Failed to fetch roles');
//         }
//         const rolesData = await rolesResponse.json();
//         console.log("Roles API Response:", rolesData);
        
//         let rolesList = [];
//         if (Array.isArray(rolesData)) {
//           rolesList = rolesData;
//         } else if (rolesData.results && Array.isArray(rolesData.results)) {
//           rolesList = rolesData.results;
//         }
        
//         const filteredRoles = rolesList
//           .filter(role => role.role_name.toLowerCase() !== "admin")
//           .sort((a, b) => a.role_name.localeCompare(b.role_name));
        
//         console.log("Filtered roles for dropdown:", filteredRoles);
//         setRoles(filteredRoles);

//         const phoneResponse = await fetch(`${baseurl}/phonenumbers/`);
//         if (phoneResponse.ok) {
//           const phoneData = await phoneResponse.json();
//           if (Array.isArray(phoneData) && phoneData.length > 0 && phoneData[0].phone_number) {
//             setHelplineNumber(phoneData[0].phone_number);
//           }
//         }

//         const referralIdFromURL = getReferralIdFromURL();
//         if (referralIdFromURL) {
//           console.log("Referral ID found in URL:", referralIdFromURL);
          
//           const agentRole = filteredRoles.find(role => role.role_name === "Agent");
//           if (agentRole) {
//             setTimeout(() => {
//               setFormData(prev => ({ 
//                 ...prev, 
//                 role_ids: [agentRole.role_id],
//                 referred_by: referralIdFromURL
//               }));
//               setShowSponsorField(true);
              
//               setTimeout(() => {
//                 checkSponsorId(referralIdFromURL, true);
//               }, 100);
//             }, 100);
            
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
//   }, [location.search]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newErrors = {};
//     const phoneRegex = /^[0-9]{10}$/;

//     // Frontend validation
//     if (!formData.full_name.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Full Name Required",
//         text: "Please enter your full name",
//         confirmButtonColor: "#d33"
//       });
//       return;
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

//     if (showSponsorField && formData.referred_by && sponsorError && !autoChecking) {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Sponsor ID",
//         text: "Please enter a valid Sponsor ID or leave it blank",
//         confirmButtonColor: "#d33"
//       });
//       return;
//     }

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

//     const submitData = {
//       full_name: formData.full_name.trim(),
//       password: formData.password,
//       phone_number: formData.phone_number.trim(),
//       role_ids: formData.role_ids,
//     };

//     if (formData.referred_by && formData.referred_by.trim() && !sponsorError) {
//       submitData.referred_by = formData.referred_by.trim();
//     }
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
//         // Store phone number for OTP verification
//         localStorage.setItem("temp_phone_number", formData.phone_number.trim());
        
//         // Store registration data temporarily
//         const tempUserData = {
//           phone_number: formData.phone_number.trim(),
//           full_name: formData.full_name.trim(),
//           role_ids: formData.role_ids,
//         };
//         localStorage.setItem("temp_user_data", JSON.stringify(tempUserData));
        
//         await Swal.fire({
//           icon: "success",
//           title: "OTP Sent!",
//           text: responseData.message || "OTP sent successfully to your mobile number",
//           confirmButtonColor: "#3085d6"
//         });

//         // Navigate to OTP verification page
//         navigate("/register-verify-otp", { 
//           state: { 
//             phoneNumber: formData.phone_number.trim(),
//             fromRegistration: true
//           } 
//         });
//       } else {
//         // IMPROVED: Handle all backend errors properly
//         const backendErrors = {};
//         let errorMessage = "";
//         let errorList = [];
        
//         // Check if responseData has error object (from your Django API)
//         if (responseData.error) {
//           errorMessage = responseData.error;
//           errorList.push(responseData.error);
//         }
        
//         // Handle field-specific errors (Django REST framework format)
//         if (responseData.full_name) {
//           const fullNameError = Array.isArray(responseData.full_name) 
//             ? responseData.full_name[0] 
//             : responseData.full_name;
//           backendErrors.full_name = fullNameError;
//           errorList.push(fullNameError);
//         }
//         if (responseData.phone_number) {
//           const phoneError = Array.isArray(responseData.phone_number)
//             ? responseData.phone_number[0]
//             : responseData.phone_number;
//           backendErrors.phone_number = phoneError;
//           errorList.push(phoneError);
//         }
//         if (responseData.referred_by) {
//           const referralError = Array.isArray(responseData.referred_by)
//             ? responseData.referred_by[0]
//             : responseData.referred_by;
//           backendErrors.referred_by = referralError;
//           errorList.push(referralError);
//           setSponsorError(referralError);
//         }
//         if (responseData.password) {
//           backendErrors.password = Array.isArray(responseData.password)
//             ? responseData.password[0]
//             : responseData.password;
//           errorList.push(backendErrors.password);
//         }
//         if (responseData.role_ids) {
//           backendErrors.role_ids = Array.isArray(responseData.role_ids)
//             ? responseData.role_ids[0]
//             : responseData.role_ids;
//           errorList.push(backendErrors.role_ids);
//         }

//         // Update errors state to show inline errors
//         if (Object.keys(backendErrors).length > 0) {
//           setErrors(backendErrors);
//         }

//         // Show error message in SweetAlert
//         let displayErrorMessage = errorMessage || "Please check the form for errors.";
        
//         // If no specific error message but has field errors, show them
//         if (!errorMessage && errorList.length > 0) {
//           displayErrorMessage = errorList.join("\n");
//         }
        
//         // Handle specific error cases
//         if (responseData.phone_number && responseData.phone_number.toString().includes("already exists")) {
//           displayErrorMessage = "❌ This phone number is already registered. Please use a different number or login.";
//         }

//         await Swal.fire({
//           icon: "error",
//           title: "Registration Failed",
//           text: displayErrorMessage,
//           confirmButtonColor: "#d33",
//           html: errorList.length > 1 ? 
//             `<div style="text-align: left;">
//               ${errorList.map(err => `• ${err}<br/>`).join('')}
//              </div>` : undefined
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

//   const handleLoginClick = () => {
//     const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
//     if (guestCart.length > 0) {
//       localStorage.setItem('redirect_from_cart', 'true');
//     }
//     navigate("/login");
//   };

//   const handleTermsClick = () => {
//     window.open("/terms-and-conditions", "_blank");
//   };

//   const handlePrivacyClick = () => {
//     window.open("/privacy-policy", "_blank");
//   };

//   return (
//     <div className="register-bg">
//       <span className="register-close" onClick={() => {
//         const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
//         if (guestCart.length > 0) {
//           localStorage.setItem('redirect_from_cart', 'true');
//         }
//         navigate("/");
//       }}>✕</span>

//       <Container className="register-container">
//         <Card className="register-card">
//           <Card.Body>
//             <div className="register-brand-row">
//               <img src={shrirajlogo} alt="Shriraj Logo" className="register-logo" />
//             </div>

//             <div className="register-title">Registration</div>

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

//             {hasCartItems && redirectFromCart && (
//               <div className="cart-banner">
//                 <div className="cart-banner-content">
//                   <span className="cart-banner-icon">🛒</span>
//                   <span className="cart-banner-text">
//                     You have items in your cart. Complete registration to proceed.
//                   </span>
//                 </div>
//               </div>
//             )}

//             <Form onSubmit={handleSubmit}>
//               {/* Full Name Field */}
//                             <div className="register-form-grid">

//               <div className="form-group-container">
//                 <Form.Control
//                   type="text"
//                   name="full_name"
//                   placeholder="Full Name *"
//                   className={`register-input ${errors.full_name ? 'is-invalid' : ''}`}
//                   value={formData.full_name}
//                   onChange={handleChange}
//                 />
//                 {errors.full_name && (
//                   <div className="error-feedback" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
//                     {errors.full_name}
//                   </div>
//                 )}
//               </div>

//               {/* Password Field */}
//               <div className="form-group-container">
//                 <InputGroup className="input-group">
//                   <Form.Control
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     placeholder="Password *"
//                     className={`register-input ${errors.password ? 'is-invalid' : ''}`}
//                     value={formData.password}
//                     onChange={handleChange}
//                   />
//                   <InputGroup.Text
//                     className="register-eye"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <EyeSlash /> : <Eye />}
//                   </InputGroup.Text>
//                 </InputGroup>
//                 {errors.password && (
//                   <div className="error-feedback" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
//                     {errors.password}
//                   </div>
//                 )}
//               </div>
//                             </div>


//               {/* Phone Number & Role Row */}
//               <div className="register-form-grid">
//                 <div className="form-group-container">
//                   <Form.Control
//                     type="tel"
//                     name="phone_number"
//                     placeholder="Phone Number * (10 digits)"
//                     className={`register-input ${errors.phone_number ? 'is-invalid' : ''}`}
//                     value={formData.phone_number}
//                     onChange={handleChange}
//                   />
//                   {errors.phone_number && (
//                     <div className="error-feedback" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
//                       {errors.phone_number}
//                     </div>
//                   )}
//                 </div>

//                 <div className="form-group-container">
//                   {fetchingRoles ? (
//                     <div className="spinner-wrapper">
//                       <Spinner animation="border" size="sm" />
//                       <span className="ms-2">Loading roles...</span>
//                     </div>
//                   ) : (
//                     <>
//                       <Form.Select 
//                         className={`register-input ${errors.role_ids ? 'is-invalid' : ''}`}
//                         value={formData.role_ids[0] || ""}
//                         onChange={(e) => handleRoleChange(e.target.value)}
//                       >
//                         <option value="">Select Role *</option>
//                         {roles.length > 0 ? (
//                           roles.map((role) => (
//                             <option key={role.role_id} value={role.role_id}>
//                               {role.role_name === "Agent"
//                                 ? "Team"
//                                 : role.role_name === "Client"
//                                 ? "User"
//                                 : role.role_name}
//                             </option>
//                           ))
//                         ) : (
//                           <option value="" disabled>No roles available</option>
//                         )}
//                       </Form.Select>
//                       {errors.role_ids && (
//                         <div className="error-feedback" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
//                           {errors.role_ids}
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Sponsor Field */}
//               {showSponsorField && (
//                 <div className="form-group-container">
//                   <Form.Control
//                     type="text"
//                     name="referred_by"
//                     placeholder="Enter Sponsor ID (Optional)"
//                     className={`register-input ${(sponsorError || errors.referred_by) ? 'is-invalid' : ''}`}
//                     value={formData.referred_by}
//                     onChange={handleChange}
//                   />
                  
//                   {(sponsorError || errors.referred_by) && formData.referred_by !== "" && (
//                     <div className="error-feedback" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
//                       {sponsorError || errors.referred_by}
//                     </div>
//                   )}
                  
//                   {(checkingSponsor || autoChecking) && (
//                     <div className="sponsor-loading sponsor-feedback" style={{ color: '#6c757d', fontSize: '12px', marginTop: '5px' }}>
//                       <Spinner animation="border" size="sm" className="me-1" />
//                       Checking sponsor ID...
//                     </div>
//                   )}
                  
//                   {sponsorInfo && !sponsorError && !errors.referred_by && (
//                     <div className="sponsor-valid sponsor-feedback" style={{ color: '#28a745', fontSize: '12px', marginTop: '5px' }}>
//                       ✓ Valid Sponsor ID: <strong>{formData.referred_by}</strong>
//                       <div className="sponsor-details" style={{ fontSize: '11px', color: '#6c757d' }}>
//                         {sponsorInfo.full_name || `${sponsorInfo.first_name} ${sponsorInfo.last_name}`}
//                         {sponsorInfo.phone_number && ` (${sponsorInfo.phone_number})`}
//                       </div>
//                     </div>
//                   )}
                  
//                   {!sponsorError && !checkingSponsor && !autoChecking && !sponsorInfo && formData.referred_by === "" && (
//                     <div className="sponsor-loading sponsor-feedback" style={{ color: '#6c757d', fontSize: '12px', marginTop: '5px' }}>
//                       Enter the Referral ID of your sponsor (optional)
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Terms and Conditions */}
//               <div className="register-terms-container">
//                 <Form.Check
//                   type="checkbox"
//                   id="terms-checkbox"
//                   className="register-terms"
//                   checked={agree}
//                   onChange={() => setAgree(!agree)}
//                   label={
//                     <span>
//                       I agree to the{" "}
//                       <span className="register-link" onClick={handleTermsClick}>
//                         Terms & Conditions
//                       </span>{" "}
//                       and{" "}
//                       <span className="register-link" onClick={handlePrivacyClick}>
//                         Privacy Policy
//                       </span>
//                     </span>
//                   }
//                 />
//               </div>

//               {/* Helpline */}
//               <div className="register-helpline">
//                 Helpline Number: <strong>{helplineNumber || "9399492809"}</strong>
//               </div>

//               {/* Register Button */}
//               <Button 
//                 className="register-btn" 
//                 type="submit"
//                 disabled={!agree || loading || fetchingRoles || (showSponsorField && autoChecking)}
//               >
//                 {loading ? (
//                   <>
//                     <Spinner animation="border" size="sm" className="me-2" />
//                     Registering...
//                   </>
//                 ) : (
//                   "Register"
//                 )}
//               </Button>

//               {/* Footer */}
//               <div className="register-footer">
//                 Already registered?{" "}
//                 <span
//                   className="register-link"
//                   onClick={handleLoginClick}
//                 >
//                   Login
//                 </span>
//               </div>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Container>

//       <style>{`
//         .cart-banner {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border-radius: 8px;
//           margin-bottom: 20px;
//           padding: 12px 16px;
//           animation: slideDown 0.5s ease-out;
//         }

//         .cart-banner-content {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .cart-banner-icon {
//           font-size: 24px;
//           background: rgba(255, 255, 255, 0.2);
//           width: 40px;
//           height: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 50%;
//         }

//         .cart-banner-text {
//           color: white;
//           font-size: 14px;
//           font-weight: 500;
//           flex: 1;
//         }

//         .referral-banner {
//           background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
//           border-radius: 8px;
//           margin-bottom: 20px;
//           padding: 12px 16px;
//           animation: slideDown 0.5s ease-out;
//         }

//         .referral-banner-content {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .referral-banner-icon {
//           font-size: 24px;
//           background: rgba(255, 255, 255, 0.2);
//           width: 40px;
//           height: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 50%;
//         }

//         .referral-banner-text {
//           color: #004d40;
//           font-size: 14px;
//           font-weight: 500;
//           flex: 1;
//         }

//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @media (max-width: 768px) {
//           .cart-banner, .referral-banner {
//             padding: 10px 12px;
//           }
          
//           .cart-banner-icon, .referral-banner-icon {
//             font-size: 20px;
//             width: 32px;
//             height: 32px;
//           }
          
//           .cart-banner-text, .referral-banner-text {
//             font-size: 12px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Register;


//============================================

// Changes done on Date - 20-04-2026


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
    full_name: "",
    password: "",
    phone_number: "",
    role_ids: [],
    referred_by: ""
  });

  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({
    full_name: "",
    phone_number: "",
    password: "",
    role_ids: "",
    referred_by: ""
  });
  const [helplineNumber, setHelplineNumber] = useState("");
  const [hasCartItems, setHasCartItems] = useState(false);
  const [redirectFromCart, setRedirectFromCart] = useState(false);

  // Sponsor ID states (for Agent role)
  const [sponsorInfo, setSponsorInfo] = useState(null);
  const [sponsorError, setSponsorError] = useState('');
  const [showSponsorField, setShowSponsorField] = useState(false);
  const [checkingSponsor, setCheckingSponsor] = useState(false);
  const [autoChecking, setAutoChecking] = useState(false);

  // Check if user has items in cart
  useEffect(() => {
    const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
    const cartRedirect = localStorage.getItem("redirect_from_cart") === "true";
    
    setHasCartItems(guestCart.length > 0);
    setRedirectFromCart(cartRedirect);

    // Only show message if there are actual cart items
    if (cartRedirect && guestCart.length > 0) {
      Swal.fire({
        title: 'Complete Your Registration',
        text: 'You have items in your cart. Complete registration to proceed with checkout.',
        icon: 'info',
        timer: 4000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    }
  }, []);

  // Function to extract referral_id from URL query parameters
  const getReferralIdFromURL = () => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get('referral_id') || queryParams.get('refferal_id');
  };

  // Check sponsor ID for Agent role
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
      const response = await fetch(`${baseurl}/users/search/?referral_id=${encodeURIComponent(sponsorId.trim())}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch sponsor info');
      }
      
      const data = await response.json();
      console.log("Sponsor check API response:", data);

      let foundAgent = null;
      
      if (Array.isArray(data) && data.length > 0) {
        foundAgent = data[0];
      } else if (data && data.results && Array.isArray(data.results) && data.results.length > 0) {
        foundAgent = data.results[0];
      }
      
      if (foundAgent) {
        setSponsorInfo(foundAgent);
        setSponsorError('');
        // Clear any previous backend error for referred_by
        setErrors(prev => ({ ...prev, referred_by: "" }));
        
        if (isAutoCheck) {
          console.log(`Valid Sponsor Found: ${foundAgent.full_name || foundAgent.first_name + ' ' + foundAgent.last_name}`);
        }
      } else {
        setSponsorInfo(null);
        setSponsorError('Invalid Sponsor ID');
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
      referred_by: ""
    }));
    
    const isAgentRole = selectedRole?.role_name === "Agent";
    setShowSponsorField(isAgentRole);
    
    if (!isAgentRole) {
      setSponsorInfo(null);
      setSponsorError('');
      setErrors(prev => ({ ...prev, referred_by: "" }));
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Handle sponsor ID change with increased debounce time
  useEffect(() => {
    if (showSponsorField && formData.referred_by) {
      setSponsorError('');
      setSponsorInfo(null);
      setCheckingSponsor(false);
      setAutoChecking(false);
      
      if (formData.referred_by.trim().length > 0) {
        const timer = setTimeout(() => {
          if (formData.referred_by.trim().length >= 3) {
            checkSponsorId(formData.referred_by);
          } else if (formData.referred_by.trim().length > 0) {
            setSponsorError('Sponsor ID must be at least 3 characters');
            setSponsorInfo(null);
            setCheckingSponsor(false);
            setAutoChecking(false);
          }
        }, 2000);

        return () => clearTimeout(timer);
      }
    } else if (showSponsorField && !formData.referred_by) {
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
        const rolesResponse = await fetch(`${baseurl}/roles/`);
        if (!rolesResponse.ok) {
          throw new Error('Failed to fetch roles');
        }
        const rolesData = await rolesResponse.json();
        console.log("Roles API Response:", rolesData);
        
        let rolesList = [];
        if (Array.isArray(rolesData)) {
          rolesList = rolesData;
        } else if (rolesData.results && Array.isArray(rolesData.results)) {
          rolesList = rolesData.results;
        }
        
        const filteredRoles = rolesList
          .filter(role => role.role_name.toLowerCase() !== "admin")
          .sort((a, b) => a.role_name.localeCompare(b.role_name));
        
        console.log("Filtered roles for dropdown:", filteredRoles);
        setRoles(filteredRoles);

        const phoneResponse = await fetch(`${baseurl}/phonenumbers/`);
        if (phoneResponse.ok) {
          const phoneData = await phoneResponse.json();
          if (Array.isArray(phoneData) && phoneData.length > 0 && phoneData[0].phone_number) {
            setHelplineNumber(phoneData[0].phone_number);
          }
        }

        const referralIdFromURL = getReferralIdFromURL();
        if (referralIdFromURL) {
          console.log("Referral ID found in URL:", referralIdFromURL);
          
          const agentRole = filteredRoles.find(role => role.role_name === "Agent");
          if (agentRole) {
            setTimeout(() => {
              setFormData(prev => ({ 
                ...prev, 
                role_ids: [agentRole.role_id],
                referred_by: referralIdFromURL
              }));
              setShowSponsorField(true);
              
              setTimeout(() => {
                checkSponsorId(referralIdFromURL, true);
              }, 100);
            }, 100);
            
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
  }, [location.search]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/;

    // Frontend validation
    if (!formData.full_name.trim()) {
      Swal.fire({
        icon: "error",
        title: "Full Name Required",
        text: "Please enter your full name",
        confirmButtonColor: "#d33"
      });
      return;
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

    // NEW VALIDATION: Make referral ID mandatory for Agent role
    if (showSponsorField && (!formData.referred_by || formData.referred_by.trim() === "")) {
      Swal.fire({
        icon: "error",
        title: "Sponsor ID Required",
        text: "Sponsor ID is mandatory for Team registration. Please enter a valid Sponsor ID.",
        confirmButtonColor: "#d33"
      });
      setErrors(prev => ({ ...prev, referred_by: "Sponsor ID is required" }));
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

    if (showSponsorField && formData.referred_by && sponsorError && !autoChecking) {
      Swal.fire({
        icon: "error",
        title: "Invalid Sponsor ID",
        text: "Please enter a valid Sponsor ID",
        confirmButtonColor: "#d33"
      });
      return;
    }

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

    const submitData = {
      full_name: formData.full_name.trim(),
      password: formData.password,
      phone_number: formData.phone_number.trim(),
      role_ids: formData.role_ids,
      referred_by: formData.referred_by.trim() // Always include for Agent role
    };

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
        // Store phone number for OTP verification
        localStorage.setItem("temp_phone_number", formData.phone_number.trim());
        
        // Store registration data temporarily
        const tempUserData = {
          phone_number: formData.phone_number.trim(),
          full_name: formData.full_name.trim(),
          role_ids: formData.role_ids,
        };
        localStorage.setItem("temp_user_data", JSON.stringify(tempUserData));
        
        await Swal.fire({
          icon: "success",
          title: "OTP Sent!",
          text: responseData.message || "OTP sent successfully to your mobile number",
          confirmButtonColor: "#3085d6"
        });

        // Navigate to OTP verification page
        navigate("/register-verify-otp", { 
          state: { 
            phoneNumber: formData.phone_number.trim(),
            fromRegistration: true
          } 
        });
      } else {
        // IMPROVED: Handle all backend errors properly
        const backendErrors = {};
        let errorMessage = "";
        let errorList = [];
        
        // Check if responseData has error object (from your Django API)
        if (responseData.error) {
          errorMessage = responseData.error;
          errorList.push(responseData.error);
        }
        
        // Handle field-specific errors (Django REST framework format)
        if (responseData.full_name) {
          const fullNameError = Array.isArray(responseData.full_name) 
            ? responseData.full_name[0] 
            : responseData.full_name;
          backendErrors.full_name = fullNameError;
          errorList.push(fullNameError);
        }
        if (responseData.phone_number) {
          const phoneError = Array.isArray(responseData.phone_number)
            ? responseData.phone_number[0]
            : responseData.phone_number;
          backendErrors.phone_number = phoneError;
          errorList.push(phoneError);
        }
        if (responseData.referred_by) {
          const referralError = Array.isArray(responseData.referred_by)
            ? responseData.referred_by[0]
            : responseData.referred_by;
          backendErrors.referred_by = referralError;
          errorList.push(referralError);
          setSponsorError(referralError);
        }
        if (responseData.password) {
          backendErrors.password = Array.isArray(responseData.password)
            ? responseData.password[0]
            : responseData.password;
          errorList.push(backendErrors.password);
        }
        if (responseData.role_ids) {
          backendErrors.role_ids = Array.isArray(responseData.role_ids)
            ? responseData.role_ids[0]
            : responseData.role_ids;
          errorList.push(backendErrors.role_ids);
        }

        // Update errors state to show inline errors
        if (Object.keys(backendErrors).length > 0) {
          setErrors(backendErrors);
        }

        // Show error message in SweetAlert
        let displayErrorMessage = errorMessage || "Please check the form for errors.";
        
        // If no specific error message but has field errors, show them
        if (!errorMessage && errorList.length > 0) {
          displayErrorMessage = errorList.join("\n");
        }
        
        // Handle specific error cases
        if (responseData.phone_number && responseData.phone_number.toString().includes("already exists")) {
          displayErrorMessage = "❌ This phone number is already registered. Please use a different number or login.";
        }

        await Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: displayErrorMessage,
          confirmButtonColor: "#d33",
          html: errorList.length > 1 ? 
            `<div style="text-align: left;">
              ${errorList.map(err => `• ${err}<br/>`).join('')}
             </div>` : undefined
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

  const handleLoginClick = () => {
    const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
    if (guestCart.length > 0) {
      localStorage.setItem('redirect_from_cart', 'true');
    }
    navigate("/login");
  };

  const handleTermsClick = () => {
    window.open("/terms-and-conditions", "_blank");
  };

  const handlePrivacyClick = () => {
    window.open("/privacy-policy", "_blank");
  };

  return (
    <div className="register-bg">
      <span className="register-close" onClick={() => {
        const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
        if (guestCart.length > 0) {
          localStorage.setItem('redirect_from_cart', 'true');
        }
        navigate("/");
      }}>✕</span>

      <Container className="register-container">
        <Card className="register-card">
          <Card.Body>
            <div className="register-brand-row">
              <img src={shrirajlogo} alt="Shriraj Logo" className="register-logo" />
            </div>

            <div className="register-title">Registration</div>

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

            {hasCartItems && redirectFromCart && (
              <div className="cart-banner">
                <div className="cart-banner-content">
                  <span className="cart-banner-icon">🛒</span>
                  <span className="cart-banner-text">
                    You have items in your cart. Complete registration to proceed.
                  </span>
                </div>
              </div>
            )}

            <Form onSubmit={handleSubmit}>
              {/* Full Name Field */}
              <div className="register-form-grid">
                <div className="form-group-container">
                  <Form.Control
                    type="text"
                    name="full_name"
                    placeholder="Full Name *"
                    className={`register-input ${errors.full_name ? 'is-invalid' : ''}`}
                    value={formData.full_name}
                    onChange={handleChange}
                  />
                  {errors.full_name && (
                    <div className="error-feedback" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                      {errors.full_name}
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="form-group-container">
                  <InputGroup className="input-group">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password *"
                      className={`register-input ${errors.password ? 'is-invalid' : ''}`}
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <InputGroup.Text
                      className="register-eye"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeSlash /> : <Eye />}
                    </InputGroup.Text>
                  </InputGroup>
                  {errors.password && (
                    <div className="error-feedback" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                      {errors.password}
                    </div>
                  )}
                </div>
              </div>

              {/* Phone Number & Role Row */}
              <div className="register-form-grid">
                <div className="form-group-container">
                  <Form.Control
                    type="tel"
                    name="phone_number"
                    placeholder="Phone Number * (10 digits)"
                    className={`register-input ${errors.phone_number ? 'is-invalid' : ''}`}
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                  {errors.phone_number && (
                    <div className="error-feedback" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                      {errors.phone_number}
                    </div>
                  )}
                </div>

                <div className="form-group-container">
                  {fetchingRoles ? (
                    <div className="spinner-wrapper">
                      <Spinner animation="border" size="sm" />
                      <span className="ms-2">Loading roles...</span>
                    </div>
                  ) : (
                    <>
                      <Form.Select 
                        className={`register-input ${errors.role_ids ? 'is-invalid' : ''}`}
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
                      {errors.role_ids && (
                        <div className="error-feedback" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                          {errors.role_ids}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Sponsor Field - Now Mandatory for Agent role */}
              {showSponsorField && (
                <div className="form-group-container">
                  <Form.Control
                    type="text"
                    name="referred_by"
                    placeholder="Enter Sponsor ID *"
                    className={`register-input ${(sponsorError || errors.referred_by) ? 'is-invalid' : ''}`}
                    value={formData.referred_by}
                    onChange={handleChange}
                    required
                  />
                  
                  {(sponsorError || errors.referred_by) && formData.referred_by !== "" && (
                    <div className="error-feedback" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                      {sponsorError || errors.referred_by}
                    </div>
                  )}
                  
                  {!formData.referred_by && (
                    <div className="error-feedback" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                      Sponsor ID is required for Team registration
                    </div>
                  )}
                  
                  {(checkingSponsor || autoChecking) && (
                    <div className="sponsor-loading sponsor-feedback" style={{ color: '#6c757d', fontSize: '12px', marginTop: '5px' }}>
                      <Spinner animation="border" size="sm" className="me-1" />
                      Checking sponsor ID...
                    </div>
                  )}
                  
                  {sponsorInfo && !sponsorError && !errors.referred_by && formData.referred_by && (
                    <div className="sponsor-valid sponsor-feedback" style={{ color: '#28a745', fontSize: '12px', marginTop: '5px' }}>
                      ✓ Valid Sponsor ID: <strong>{formData.referred_by}</strong>
                      <div className="sponsor-details" style={{ fontSize: '11px', color: '#6c757d' }}>
                        {sponsorInfo.full_name || `${sponsorInfo.first_name} ${sponsorInfo.last_name}`}
                        {sponsorInfo.phone_number && ` (${sponsorInfo.phone_number})`}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="register-terms-container">
                <Form.Check
                  type="checkbox"
                  id="terms-checkbox"
                  className="register-terms"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                  label={
                    <span>
                      I agree to the{" "}
                      <span className="register-link" onClick={handleTermsClick}>
                        Terms & Conditions
                      </span>{" "}
                      and{" "}
                      <span className="register-link" onClick={handlePrivacyClick}>
                        Privacy Policy
                      </span>
                    </span>
                  }
                />
              </div>

              {/* Helpline */}
              <div className="register-helpline">
                Helpline Number: <strong>{helplineNumber || "9399492809"}</strong>
              </div>

              {/* Register Button */}
              <Button 
                className="register-btn" 
                type="submit"
                disabled={!agree || loading || fetchingRoles || (showSponsorField && autoChecking) || (showSponsorField && !formData.referred_by)}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </Button>

              {/* Footer */}
              <div className="register-footer">
                Already registered?{" "}
                <span
                  className="register-link"
                  onClick={handleLoginClick}
                >
                  Login
                </span>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <style>{`
        .cart-banner {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
          margin-bottom: 20px;
          padding: 12px 16px;
          animation: slideDown 0.5s ease-out;
        }

        .cart-banner-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cart-banner-icon {
          font-size: 24px;
          background: rgba(255, 255, 255, 0.2);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .cart-banner-text {
          color: white;
          font-size: 14px;
          font-weight: 500;
          flex: 1;
        }

        .referral-banner {
          background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
          border-radius: 8px;
          margin-bottom: 20px;
          padding: 12px 16px;
          animation: slideDown 0.5s ease-out;
        }

        .referral-banner-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .referral-banner-icon {
          font-size: 24px;
          background: rgba(255, 255, 255, 0.2);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .referral-banner-text {
          color: #004d40;
          font-size: 14px;
          font-weight: 500;
          flex: 1;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .cart-banner, .referral-banner {
            padding: 10px 12px;
          }
          
          .cart-banner-icon, .referral-banner-icon {
            font-size: 20px;
            width: 32px;
            height: 32px;
          }
          
          .cart-banner-text, .referral-banner-text {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;