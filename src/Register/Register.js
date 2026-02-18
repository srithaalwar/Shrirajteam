
//14-02-2026
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
    referred_by: ""
  });

  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({
    email: "",
    phone_number: ""
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

  // Function to sync cart with backend after registration
  const syncCartAfterRegistration = async (userId) => {
    try {
      // Get cart from localStorage only
      const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
      
      // Only sync if there are items
      if (guestCart.length > 0) {
        // Prepare payload for API - supports multiple items
        const cartPayload = guestCart.map(item => ({
          user: parseInt(userId),
          variant: item.variant_id,
          quantity: item.quantity
        }));

        console.log("Syncing cart after registration:", cartPayload);

        // Send cart data to backend using baseurl
        const response = await fetch(`${baseurl}/cart/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartPayload) // API supports array of items
        });

        if (response.ok) {
          // Clear cart data after successful sync
          localStorage.removeItem("website_guest_cart");
          
          console.log("Cart synced successfully after registration");
          return true;
        } else {
          console.error("Failed to sync cart with backend");
          return false;
        }
      }
      return true; // No items to sync
    } catch (error) {
      console.error("Error syncing cart after registration:", error);
      return false;
    }
  };

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
      referred_by: ""
    }));
    
    const isAgentRole = selectedRole?.role_name === "Agent";
    setShowSponsorField(isAgentRole);
    
    if (!isAgentRole) {
      setSponsorInfo(null);
      setSponsorError('');
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Handle sponsor ID change with debounce
  useEffect(() => {
    if (showSponsorField && formData.referred_by) {
      const timer = setTimeout(() => {
        checkSponsorId(formData.referred_by);
      }, 800);

      return () => clearTimeout(timer);
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

  // Navigate to appropriate cart page based on role
  const navigateToCartPage = (role) => {
    if (role === "Agent") {
      navigate("/agent-add-to-cart");
    } else if (role === "Client") {
      navigate("/client-add-to-cart");
    } else {
      navigate("/checkout");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

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

    if (showSponsorField && formData.referred_by && sponsorError && !autoChecking) {
      Swal.fire({
        icon: "error",
        title: "Invalid Sponsor ID",
        text: "Please enter a valid Sponsor ID or leave it blank",
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
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      phone_number: formData.phone_number.trim(),
      role_ids: formData.role_ids,
    };

    if (formData.referred_by && formData.referred_by.trim() && !sponsorError) {
      submitData.referred_by = formData.referred_by.trim();
    }
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
        await Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "You have been registered successfully!",
          confirmButtonColor: "#3085d6"
        });

        if (responseData.user_id) {
          localStorage.setItem("user_id", responseData.user_id);
          
          if (responseData.roles) {
            localStorage.setItem("user_roles", JSON.stringify(responseData.roles));
          }

          const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
          const hasItems = guestCart.length > 0;
          
          if (hasItems) {
            await syncCartAfterRegistration(responseData.user_id);
          }
          
          const redirectedFromCart = localStorage.getItem('redirect_from_cart') === 'true';
          
          if (redirectedFromCart && hasItems) {
            // Clear the redirect flag
            localStorage.removeItem('redirect_from_cart');
            
            const userRoles = responseData.roles || [];
            
            if (userRoles.length > 1) {
              const { value: selectedRole } = await Swal.fire({
                title: "Select Your Role",
                input: "select",
                inputOptions: userRoles.reduce((acc, role) => ({ ...acc, [role]: role }), {}),
                inputPlaceholder: "Choose your role",
                showCancelButton: true,
                confirmButtonText: "Proceed",
                cancelButtonText: "Cancel",
              });
              if (selectedRole) {
                navigateToCartPage(selectedRole);
              } else {
                navigate("/login");
              }
            } else if (userRoles.length === 1) {
              navigateToCartPage(userRoles[0]);
            } else {
              const referralId = responseData.referred_by || '';
              if (referralId.toUpperCase().startsWith('SRP')) {
                navigate('/agent-add-to-cart');
              } else if (referralId.toUpperCase().startsWith('SRT')) {
                navigate('/client-add-to-cart');
              } else {
                navigate('/checkout');
              }
            }
          } else {
            navigate("/login");
          }
        } else {
          navigate("/login");
        }
      } else {
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
        
        if (responseData.referred_by) {
          backendErrors.referred_by = Array.isArray(responseData.referred_by)
            ? responseData.referred_by[0]
            : "Invalid sponsor ID";
        }
        
        if (responseData.error && typeof responseData.error === 'string') {
          try {
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
              <div className="register-form-grid mb-4">
                <div className="form-group-container">
                  <Form.Control
                    type="text"
                    name="first_name"
                    placeholder="First Name *"
                    className="register-input"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
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
                </div>
              </div>

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
                </div>
              </div>

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
                </div>
              </div>

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
                    
                    {sponsorError && formData.referred_by !== "" && (
                      <Form.Control.Feedback type="invalid" className="error-feedback">
                        {sponsorError}
                      </Form.Control.Feedback>
                    )}
                    
                    {(checkingSponsor || autoChecking) && (
                      <div className="sponsor-loading sponsor-feedback">
                        <Spinner animation="border" size="sm" className="me-1" />
                        Checking sponsor ID...
                      </div>
                    )}
                    
                    {sponsorInfo && !sponsorError && (
                      <div className="sponsor-valid sponsor-feedback">
                        ✓ Valid Sponsor ID: <strong>{formData.referred_by}</strong>
                        <div className="sponsor-details">
                          {sponsorInfo.first_name} {sponsorInfo.last_name}
                          {sponsorInfo.phone_number && ` (${sponsorInfo.phone_number})`}
                        </div>
                      </div>
                    )}
                    
                    {!sponsorError && !checkingSponsor && !autoChecking && !sponsorInfo && formData.referred_by === "" && (
                      <div className="sponsor-loading sponsor-feedback">
                        Enter the Referral ID of your sponsor (optional)
                      </div>
                    )}
                  </div>
                </div>
              )}

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

              <div className="register-helpline">
                Helpline Number: <strong>{helplineNumber || "9399492809"}</strong>
              </div>

              <Button 
                className="register-btn" 
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
          .cart-banner {
            padding: 10px 12px;
          }
          
          .cart-banner-icon {
            font-size: 20px;
            width: 32px;
            height: 32px;
          }
          
          .cart-banner-text {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;
