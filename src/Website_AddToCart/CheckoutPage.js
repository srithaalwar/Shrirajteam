// CheckoutPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import Swal from "sweetalert2";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // User Options
  const [userType, setUserType] = useState("guest"); // "guest", "login", "register"
  
  // Guest Information
  const [guestInfo, setGuestInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
  });
  
  // Registration Fields
  const [registerInfo, setRegisterInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
  });
  
  // Login Fields
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });
  
  // User state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Order Details
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderNotes, setOrderNotes] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  // Order Summary
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  // Base URL - replace with your actual base URL
  const baseurl = "https://test.shrirajteam.com:85/api";

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("user_token");
    const userData = localStorage.getItem("user_data");
    
    if (token && userData) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(userData));
      setUserType("logged_in");
    }
    
    loadCartItems();
  }, [navigate]);

  // Load cart items
  const loadCartItems = () => {
    const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
    
    if (guestCart.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Cart is Empty',
        text: 'Please add items to your cart before checkout',
        confirmButtonText: 'Back to Shopping',
        confirmButtonColor: '#f76f2f',
      }).then(() => {
        navigate("/products");
      });
      return;
    }
    
    setCartItems(guestCart);
    calculateOrderSummary(guestCart);
    setLoading(false);
  };

  // Calculate order summary
  const calculateOrderSummary = (items) => {
    const subtotalVal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingVal = subtotalVal > 500 ? 0 : 50;
    const taxVal = subtotalVal * 0.18;
    
    setSubtotal(subtotalVal);
    setShippingCost(shippingVal);
    setTax(taxVal);
    setTotal(subtotalVal + shippingVal + taxVal);
  };

  // Handle input changes
  const handleGuestInputChange = (e) => {
    const { name, value } = e.target;
    setGuestInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo(prev => ({ ...prev, [name]: value }));
  };

  // Validate Registration
  const validateRegistration = () => {
    const { firstName, lastName, email, phone, password, confirmPassword, address, city, state, pincode } = registerInfo;
    
    const errors = [];
    
    if (!firstName.trim()) errors.push("First name is required");
    if (!lastName.trim()) errors.push("Last name is required");
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) errors.push("Valid email is required");
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) errors.push("Valid 10-digit phone number is required");
    
    if (password.length < 6) errors.push("Password must be at least 6 characters");
    if (password !== confirmPassword) errors.push("Passwords do not match");
    
    if (!address.trim()) errors.push("Address is required");
    if (!city.trim()) errors.push("City is required");
    if (!state.trim()) errors.push("State is required");
    
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(pincode)) errors.push("Valid 6-digit pincode is required");
    
    return errors;
  };

  // Validate Login
  const validateLogin = () => {
    const { email, password } = loginInfo;
    const errors = [];
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) errors.push("Valid email is required");
    if (password.length < 6) errors.push("Password is required");
    
    return errors;
  };

  // Validate Guest Checkout
  const validateGuestCheckout = () => {
    const { firstName, lastName, email, phone, address, city, state, pincode } = guestInfo;
    
    const errors = [];
    
    if (!firstName.trim()) errors.push("First name is required");
    if (!lastName.trim()) errors.push("Last name is required");
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) errors.push("Valid email is required");
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) errors.push("Valid 10-digit phone number is required");
    
    if (!address.trim()) errors.push("Address is required");
    if (!city.trim()) errors.push("City is required");
    if (!state.trim()) errors.push("State is required");
    
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(pincode)) errors.push("Valid 6-digit pincode is required");
    
    if (!agreedToTerms) errors.push("You must agree to terms & conditions");
    
    return errors;
  };

  // Handle User Registration
  const handleRegister = async () => {
    const errors = validateRegistration();
    
    if (errors.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Error',
        html: errors.map(err => `<p>• ${err}</p>`).join(''),
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
      });
      return;
    }

    try {
      Swal.fire({
        title: 'Creating Account...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      // Call registration API
      const response = await fetch(`${baseurl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: registerInfo.firstName,
          last_name: registerInfo.lastName,
          email: registerInfo.email,
          phone: registerInfo.phone,
          password: registerInfo.password,
          address: registerInfo.address,
          city: registerInfo.city,
          state: registerInfo.state,
          pincode: registerInfo.pincode,
          country: registerInfo.country,
          user_type: "customer"
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save user data and token
        localStorage.setItem("user_token", data.token);
        localStorage.setItem("user_data", JSON.stringify(data.user));
        
        setIsLoggedIn(true);
        setCurrentUser(data.user);
        setUserType("logged_in");
        
        Swal.fire({
          icon: 'success',
          title: 'Account Created!',
          text: 'You are now logged in',
          confirmButtonText: 'Continue Checkout',
          confirmButtonColor: '#f76f2f',
        });
        
        // Convert guest cart to user cart
        await convertGuestCartToUserCart(data.user.id);
        
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message,
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
      });
    }
  };

  // Handle User Login
  const handleLogin = async () => {
    const errors = validateLogin();
    
    if (errors.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Login Error',
        html: errors.map(err => `<p>• ${err}</p>`).join(''),
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
      });
      return;
    }

    try {
      Swal.fire({
        title: 'Logging in...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      const response = await fetch(`${baseurl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginInfo.email,
          password: loginInfo.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save user data and token
        localStorage.setItem("user_token", data.token);
        localStorage.setItem("user_data", JSON.stringify(data.user));
        
        setIsLoggedIn(true);
        setCurrentUser(data.user);
        setUserType("logged_in");
        
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: `Welcome back, ${data.user.first_name}!`,
          confirmButtonText: 'Continue Checkout',
          confirmButtonColor: '#f76f2f',
        });
        
        // Convert guest cart to user cart
        await convertGuestCartToUserCart(data.user.id);
        
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message,
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
      });
    }
  };

  // Convert guest cart to user cart
  const convertGuestCartToUserCart = async (userId) => {
    const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
    
    if (guestCart.length === 0) return;
    
    try {
      // Send each cart item to user's cart
      for (const item of guestCart) {
        await fetch(`${baseurl}/cart/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("user_token")}`
          },
          body: JSON.stringify({
            user_id: userId,
            product_id: item.product_id,
            variant_id: item.variant_id,
            quantity: item.quantity,
            price: item.price
          }),
        });
      }
      
      // Clear guest cart
      localStorage.removeItem("website_guest_cart");
      window.dispatchEvent(new Event('cartUpdated'));
      
      // Reload cart items (now from user's cart)
      const userCartResponse = await fetch(`${baseurl}/cart/${userId}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("user_token")}`
        }
      });
      
      if (userCartResponse.ok) {
        const userCartData = await userCartResponse.json();
        setCartItems(userCartData.items || []);
      }
      
    } catch (error) {
      console.error("Failed to convert cart:", error);
    }
  };

  // Handle Place Order
  const handlePlaceOrder = async () => {
    if (userType === "guest") {
      const errors = validateGuestCheckout();
      if (errors.length > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Please fix errors',
          html: errors.map(err => `<p>• ${err}</p>`).join(''),
          confirmButtonText: 'OK',
          confirmButtonColor: '#f76f2f',
        });
        return;
      }
    }
    
    // Check stock
    const outOfStockItems = cartItems.filter(item => 
      item.quantity > (item.stock || 0)
    );
    
    if (outOfStockItems.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Stock Issue',
        html: `Some items are out of stock:<br>
               ${outOfStockItems.map(item => `<br>• ${item.name} (Available: ${item.stock})`).join('')}`,
        confirmButtonText: 'Update Cart',
        confirmButtonColor: '#f76f2f',
      }).then(() => navigate("/cart"));
      return;
    }

    try {
      Swal.fire({
        title: 'Processing Order...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      // Prepare order data based on user type
      const orderData = {
        order_id: `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`,
        cart_items: cartItems,
        order_summary: { 
          subtotal: subtotal.toFixed(2), 
          shipping: shippingCost.toFixed(2), 
          tax: tax.toFixed(2), 
          total: total.toFixed(2) 
        },
        shipping_method: shippingMethod,
        payment_method: paymentMethod,
        // order_notes,
        order_date: new Date().toISOString(),
        status: paymentMethod === "cod" ? "confirmed" : "pending_payment"
      };

      // Add user info based on type
      if (userType === "logged_in" && currentUser) {
        orderData.user_id = currentUser.id;
        orderData.user_info = {
          id: currentUser.id,
          name: `${currentUser.first_name} ${currentUser.last_name}`,
          email: currentUser.email,
          phone: currentUser.phone
        };
        orderData.shipping_address = {
          address: currentUser.address || "",
          city: currentUser.city || "",
          state: currentUser.state || "",
          pincode: currentUser.pincode || "",
          country: currentUser.country || "India"
        };
      } else {
        orderData.guest_info = guestInfo;
        orderData.shipping_address = {
          address: guestInfo.address,
          city: guestInfo.city,
          state: guestInfo.state,
          pincode: guestInfo.pincode,
          country: guestInfo.country
        };
      }

      // Send order
      const endpoint = userType === "logged_in" ? "/orders/user-order" : "/orders/guest-order";
      const response = await fetch(`${baseurl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(userType === "logged_in" && {
            "Authorization": `Bearer ${localStorage.getItem("user_token")}`
          })
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        Swal.close();
        
        // Clear guest cart (if still exists)
        localStorage.removeItem("website_guest_cart");
        window.dispatchEvent(new Event('cartUpdated'));
        
        // Save order info
        localStorage.setItem("last_order_info", JSON.stringify({
          order_id: data.order_id || orderData.order_id,
          total: total,
          email: userType === "logged_in" ? currentUser.email : guestInfo.email,
          payment_method: paymentMethod,
          user_type: userType
        }));

        // Redirect
        if (paymentMethod === "cod") {
          navigate("/order-confirmation");
        } else {
          handleOnlinePayment(data.payment_link);
        }
      } else {
        throw new Error(data.message || "Failed to place order");
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Order Failed',
        text: error.message,
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
      });
    }
  };

  // Handle online payment
  const handleOnlinePayment = (paymentUrl) => {
    if (paymentMethod === "razorpay" && window.Razorpay) {
      const options = {
        key: "rzp_test_YOUR_KEY_HERE", // Replace with your Razorpay key
        amount: total * 100,
        currency: "INR",
        name: "Shriraj Store",
        description: "Order Payment",
        order_id: `order_${Date.now()}`,
        handler: function(response) {
          // Handle payment success
          console.log("Payment success:", response);
          navigate("/order-confirmation");
        },
        prefill: {
          name: userType === "logged_in" 
            ? `${currentUser.first_name} ${currentUser.last_name}`
            : `${guestInfo.firstName} ${guestInfo.lastName}`,
          email: userType === "logged_in" ? currentUser.email : guestInfo.email,
          contact: userType === "logged_in" ? currentUser.phone : guestInfo.phone
        },
        theme: {
          color: "#f76f2f"
        },
        modal: {
          ondismiss: function() {
            Swal.fire({
              title: 'Payment Cancelled',
              text: 'You cancelled the payment process',
              icon: 'warning',
              confirmButtonColor: '#f76f2f',
            });
          }
        }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else if (paymentUrl) {
      // For other payment gateways
      window.location.href = paymentUrl;
    } else {
      // Fallback
      navigate("/order-confirmation");
    }
  };

  // Back to cart
  const handleBackToCart = () => {
    navigate("/cart");
  };

  if (loading) {
    return (
      <>
        <WebsiteNavbar />
        <div className="loading-checkout">
          <div className="spinner"></div>
          <p>Loading checkout...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <WebsiteNavbar />
      
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <div className="checkout-steps">
            <div className="step active">1. Cart</div>
            <div className="step active">2. Checkout</div>
            <div className="step">3. Payment</div>
            <div className="step">4. Confirm</div>
          </div>
        </div>

        <div className="checkout-layout">
          {/* Left Column - Forms */}
          <div className="checkout-forms">
            
            {/* User Type Selection */}
            {!isLoggedIn && (
              <section className="checkout-section">
                <h2>Checkout Options</h2>
                <div className="user-options">
                  <div className="user-option-tabs">
                    <button 
                      className={`user-tab ${userType === "guest" ? "active" : ""}`}
                      onClick={() => setUserType("guest")}
                    >
                      Guest Checkout
                    </button>
                    <button 
                      className={`user-tab ${userType === "login" ? "active" : ""}`}
                      onClick={() => setUserType("login")}
                    >
                      Login
                    </button>
                    <button 
                      className={`user-tab ${userType === "register" ? "active" : ""}`}
                      onClick={() => setUserType("register")}
                    >
                      Create Account
                    </button>
                  </div>

                  {/* Guest Checkout Form */}
                  {userType === "guest" && (
                    <div className="guest-form">
                      <p className="option-description">
                        Checkout without creating an account. You can track your order using your email.
                      </p>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>First Name *</label>
                          <input
                            type="text"
                            name="firstName"
                            value={guestInfo.firstName}
                            onChange={handleGuestInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Last Name *</label>
                          <input
                            type="text"
                            name="lastName"
                            value={guestInfo.lastName}
                            onChange={handleGuestInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Email *</label>
                          <input
                            type="email"
                            name="email"
                            value={guestInfo.email}
                            onChange={handleGuestInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Phone *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={guestInfo.phone}
                            onChange={handleGuestInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Login Form */}
                  {userType === "login" && (
                    <div className="login-form">
                      <p className="option-description">
                        Login to your existing account for faster checkout and order tracking.
                      </p>
                      <div className="form-group">
                        <label>Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={loginInfo.email}
                          onChange={handleLoginInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Password *</label>
                        <input
                          type="password"
                          name="password"
                          value={loginInfo.password}
                          onChange={handleLoginInputChange}
                          required
                        />
                      </div>
                      <button 
                        onClick={handleLogin}
                        className="login-action-btn"
                      >
                        Login & Continue
                      </button>
                      <p className="forgot-password">
                        <a href="/forgot-password">Forgot password?</a>
                      </p>
                    </div>
                  )}

                  {/* Registration Form */}
                  {userType === "register" && (
                    <div className="register-form">
                      <p className="option-description">
                        Create an account to track orders, save addresses, and faster checkout.
                      </p>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>First Name *</label>
                          <input
                            type="text"
                            name="firstName"
                            value={registerInfo.firstName}
                            onChange={handleRegisterInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Last Name *</label>
                          <input
                            type="text"
                            name="lastName"
                            value={registerInfo.lastName}
                            onChange={handleRegisterInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Email *</label>
                          <input
                            type="email"
                            name="email"
                            value={registerInfo.email}
                            onChange={handleRegisterInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Phone *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={registerInfo.phone}
                            onChange={handleRegisterInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Password *</label>
                          <input
                            type="password"
                            name="password"
                            value={registerInfo.password}
                            onChange={handleRegisterInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Confirm Password *</label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={registerInfo.confirmPassword}
                            onChange={handleRegisterInputChange}
                            required
                          />
                        </div>
                      </div>
                      <button 
                        onClick={handleRegister}
                        className="register-action-btn"
                      >
                        Create Account & Continue
                      </button>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Logged In User */}
            {isLoggedIn && currentUser && (
              <section className="checkout-section">
                <h2>Welcome, {currentUser.first_name}!</h2>
                <div className="logged-in-user">
                  <div className="user-info">
                    <p><strong>Email:</strong> {currentUser.email}</p>
                    <p><strong>Phone:</strong> {currentUser.phone}</p>
                  </div>
                  <button 
                    onClick={() => {
                      localStorage.removeItem("user_token");
                      localStorage.removeItem("user_data");
                      setIsLoggedIn(false);
                      setCurrentUser(null);
                      setUserType("guest");
                    }}
                    className="logout-btn"
                  >
                    Logout
                  </button>
                </div>
              </section>
            )}

            {/* Shipping Address */}
            {(userType === "guest" || userType === "logged_in" || userType === "register") && (
              <section className="checkout-section">
                <h2>Shipping Address</h2>
                <div className="form-group">
                  <label>Address *</label>
                  <textarea
                    name="address"
                    value={userType === "guest" ? guestInfo.address : 
                          userType === "register" ? registerInfo.address : 
                          currentUser?.address || ""}
                    onChange={userType === "guest" ? handleGuestInputChange : 
                             userType === "register" ? handleRegisterInputChange : 
                             () => {}}
                    rows="3"
                    required
                    placeholder="Street address, apartment, suite, etc."
                  />
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={userType === "guest" ? guestInfo.city : 
                            userType === "register" ? registerInfo.city : 
                            currentUser?.city || ""}
                      onChange={userType === "guest" ? handleGuestInputChange : 
                               userType === "register" ? handleRegisterInputChange : 
                               () => {}}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={userType === "guest" ? guestInfo.state : 
                            userType === "register" ? registerInfo.state : 
                            currentUser?.state || ""}
                      onChange={userType === "guest" ? handleGuestInputChange : 
                               userType === "register" ? handleRegisterInputChange : 
                               () => {}}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={userType === "guest" ? guestInfo.pincode : 
                            userType === "register" ? registerInfo.pincode : 
                            currentUser?.pincode || ""}
                      onChange={userType === "guest" ? handleGuestInputChange : 
                               userType === "register" ? handleRegisterInputChange : 
                               () => {}}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      value="India"
                      disabled
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Shipping Method */}
            <section className="checkout-section">
              <h2>Shipping Method</h2>
              <div className="shipping-options">
                <label className="shipping-option">
                  <input
                    type="radio"
                    name="shipping"
                    value="standard"
                    checked={shippingMethod === "standard"}
                    onChange={(e) => setShippingMethod(e.target.value)}
                  />
                  <div className="option-content">
                    <span className="option-title">Standard Shipping</span>
                    <span className="option-desc">5-7 business days</span>
                    <span className="option-price">
                      {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                    </span>
                  </div>
                </label>
                <label className="shipping-option">
                  <input
                    type="radio"
                    name="shipping"
                    value="express"
                    checked={shippingMethod === "express"}
                    onChange={(e) => setShippingMethod(e.target.value)}
                  />
                  <div className="option-content">
                    <span className="option-title">Express Shipping</span>
                    <span className="option-desc">2-3 business days</span>
                    <span className="option-price">₹120</span>
                  </div>
                </label>
              </div>
            </section>

            {/* Payment Method */}
            <section className="checkout-section">
              <h2>Payment Method</h2>
              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="option-content">
                    <span className="option-title">Cash on Delivery</span>
                    <span className="option-desc">Pay when you receive</span>
                  </div>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="razorpay"
                    checked={paymentMethod === "razorpay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="option-content">
                    <span className="option-title">Credit/Debit Card</span>
                    <span className="option-desc">Visa, Mastercard, Rupay</span>
                  </div>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="option-content">
                    <span className="option-title">UPI</span>
                    <span className="option-desc">Google Pay, PhonePe, Paytm</span>
                  </div>
                </label>
              </div>
            </section>

            {/* Order Notes */}
            <section className="checkout-section">
              <h2>Order Notes (Optional)</h2>
              <div className="form-group">
                <textarea
                  placeholder="Special instructions, delivery preferences, etc."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  rows="3"
                />
              </div>
            </section>

            {/* Benefits of Registration (for guest users) */}
            {userType === "guest" && (
              <div className="registration-benefits">
                <h4>Benefits of Creating an Account:</h4>
                <ul className="benefit-list">
                  <li>Track all your orders in one place</li>
                  <li>Save multiple shipping addresses</li>
                  <li>Faster checkout for future purchases</li>
                  <li>Exclusive member discounts and offers</li>
                  <li>Easy returns and refunds</li>
                </ul>
                <button 
                  onClick={() => setUserType("register")}
                  className="create-account-link"
                >
                  Create Account
                </button>
              </div>
            )}

            {/* Terms & Conditions */}
            <div className="terms-agreement">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                />
                <span>
                  I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</a> and 
                  <a href="/privacy" target="_blank" rel="noopener noreferrer"> Privacy Policy</a>
                </span>
              </label>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            
            {/* Cart Items Preview */}
            <div className="order-items">
              {cartItems.map((item) => (
                <div key={item.variant_id} className="order-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity} × ₹{item.price.toFixed(2)}</p>
                    {item.attributes && Object.entries(item.attributes).slice(0, 2).map(([key, value]) => (
                      <span key={key} className="item-attribute">
                        {key.replace(/_/g, " ")}: {value}
                      </span>
                    ))}
                  </div>
                  <div className="item-total">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "FREE" : `₹${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="price-row">
                <span>Tax (18% GST)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="price-row total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="delivery-info">
              <p>📦 <strong>Estimated Delivery:</strong> {shippingMethod === "express" ? "2-3 business days" : "5-7 business days"}</p>
              <p>🔄 <strong>Return Policy:</strong> 7-day easy returns</p>
            </div>

            {/* Action Buttons */}
            <div className="checkout-actions">
              <button 
                onClick={handleBackToCart}
                className="back-to-cart-btn"
              >
                ← Back to Cart
              </button>
              <button 
                onClick={handlePlaceOrder}
                className="place-order-btn"
                disabled={!agreedToTerms || (userType === "guest" && Object.values(guestInfo).some(val => !val))}
              >
                {paymentMethod === "cod" ? "Place Order" : "Proceed to Payment"}
              </button>
            </div>

            {/* Security Info */}
            <div className="security-info">
              <p>🔒 Secure checkout · Your information is protected</p>
              <p>📞 Need help? <a href="/contact">Contact Support</a></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;