import React, { useState, useEffect } from 'react';
import "./ServiceProviders.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { baseurl } from '../../BaseURL/BaseURL';
import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";

const AddServiceProvider = () => {
  const [activeTab, setActiveTab] = useState('personal-details');
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem('user_id');

  const [serviceCategories, setServiceCategories] = useState([]);

  // Define tabs
  const tabs = [
    { id: 'personal-details', label: 'Personal Details' },
    { id: 'identity-details', label: 'Identity Details' },
    { id: 'service-details', label: 'Service Details' },
    { id: 'business-details', label: 'Business Details' },
    { id: 'bank-details', label: 'Bank Details' },
    { id: 'documents-upload', label: 'Documents Upload' }
  ];

  // Error States
  const [errors, setErrors] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    // Personal Details
    full_name: '',
    father_or_husband_name: '',
    date_of_birth: '',
    gender: '',
    mobile_number: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: 'IN',
    pin_code: '',

    // Identity Details
    aadhaar_number: '',
    pan_number: '',
    photo: null,
    identity_proof: null,

    // Service Details
    service_category: '',
    experience_years: '',
    skills: '',
    service_area: '',
    service_charges: '',

    // Business Details
    business_name: '',
    gst_number: '',
    shop_address: '',

    // Bank Details - ALL OPTIONAL
    bank_name: '',
    account_holder_name: '',
    account_number: '',
    ifsc_code: '',
    upi_id: '',

    // Documents - All Optional
    aadhaar_card: null,
    address_proof: null,
    experience_certificate: null,

    // Status
    status: 'Pending',
    created_by: userId || 1
  });

  // Fetch service categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseurl}/service-categories/`);
        let data = response.data.results || response.data || [];
        setServiceCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching service categories:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load service categories',
          confirmButtonColor: '#d33',
        });
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: file
      }));
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const validateCurrentTab = () => {
    const newErrors = {};
    
    switch (activeTab) {
      case 'personal-details':
        if (!formData.full_name?.trim()) newErrors.full_name = 'Full Name is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.mobile_number?.trim()) newErrors.mobile_number = 'Mobile Number is required';
        if (!formData.address?.trim()) newErrors.address = 'Address is required';
        if (!formData.city?.trim()) newErrors.city = 'City is required';
        if (!formData.state?.trim()) newErrors.state = 'State is required';
        if (!formData.country?.trim()) newErrors.country = 'Country is required';
        if (!formData.pin_code?.trim()) newErrors.pin_code = 'Pin Code is required';
        
        if (formData.mobile_number && !/^\d{10}$/.test(formData.mobile_number)) {
          newErrors.mobile_number = 'Mobile number must be 10 digits';
        }
        break;

      case 'identity-details':
        if (!formData.aadhaar_number?.trim()) newErrors.aadhaar_number = 'Aadhaar Number is required';
        
        if (formData.aadhaar_number && !/^\d{12}$/.test(formData.aadhaar_number)) {
          newErrors.aadhaar_number = 'Aadhaar number must be 12 digits';
        }
        
        if (formData.pan_number && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan_number)) {
          newErrors.pan_number = 'Invalid PAN format (e.g., ABCDE1234F)';
        }
        break;

      case 'service-details':
        if (!formData.service_category) newErrors.service_category = 'Service Category is required';
        if (!formData.service_area?.trim()) newErrors.service_area = 'Service Area is required';
        break;

      case 'business-details':
      case 'bank-details':
      case 'documents-upload':
        // All fields are optional
        break;
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentTab()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill all required fields correctly',
        confirmButtonColor: '#d33',
      });
      return;
    }
    
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // Validate all tabs
    let isValid = true;
    for (const tab of tabs) {
      setActiveTab(tab.id);
      if (!validateCurrentTab()) {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Form',
        text: 'Please complete all required fields',
        confirmButtonColor: '#d33',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          if (value instanceof File) {
            payload.append(key, value);
          } else {
            payload.append(key, value.toString());
          }
        }
      });

      await axios.post(`${baseurl}/service-providers/`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Service Provider Added Successfully!',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        navigate("/admin-service-providers");
      });

    } catch (error) {
      console.error('Submission error:', error);
      
      let errorMessage = 'Error adding service provider';
      
      if (error.response?.data) {
        if (error.response.data.aadhaar_number) {
          errorMessage = 'Aadhaar number already exists';
        } else if (error.response.data.mobile_number) {
          errorMessage = 'Mobile number already exists';
        } else if (error.response.data.email) {
          errorMessage = 'Email already exists';
        } else {
          errorMessage = error.response.data.detail || JSON.stringify(error.response.data);
        }
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: errorMessage,
        confirmButtonColor: '#d33',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderError = (fieldName) => {
    return errors[fieldName] ? (
      <div className="invalid-feedback">{errors[fieldName]}</div>
    ) : null;
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'personal-details':
        return (
          <div className="form-section">
            <h5 className="form-section-title">Personal Details</h5>
            <div className="form-section-content">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Full Name *</label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      className={`form-control customer-form-input ${errors.full_name ? 'is-invalid' : ''}`}
                      placeholder="Enter full name"
                    />
                    {renderError('full_name')}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Father/Husband Name</label>
                    <input
                      type="text"
                      name="father_or_husband_name"
                      value={formData.father_or_husband_name}
                      onChange={handleChange}
                      className="form-control customer-form-input"
                      placeholder="Enter father or husband name"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Date of Birth</label>
                    <input
                      type="date"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      className="form-control customer-form-input"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Gender *</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`form-select customer-form-input ${errors.gender ? 'is-invalid' : ''}`}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {renderError('gender')}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Mobile Number *</label>
                    <input
                      type="tel"
                      name="mobile_number"
                      value={formData.mobile_number}
                      onChange={handleChange}
                      className={`form-control customer-form-input ${errors.mobile_number ? 'is-invalid' : ''}`}
                      placeholder="10 digit mobile number"
                      maxLength="10"
                    />
                    {renderError('mobile_number')}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control customer-form-input"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`form-control customer-form-input ${errors.address ? 'is-invalid' : ''}`}
                      rows="3"
                      placeholder="Enter full address"
                    />
                    {renderError('address')}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Country *</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`form-control customer-form-input ${errors.country ? 'is-invalid' : ''}`}
                      placeholder="Enter country"
                    />
                    {renderError('country')}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`form-control customer-form-input ${errors.state ? 'is-invalid' : ''}`}
                      placeholder="Enter state"
                    />
                    {renderError('state')}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`form-control customer-form-input ${errors.city ? 'is-invalid' : ''}`}
                      placeholder="Enter city"
                    />
                    {renderError('city')}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Pin Code *</label>
                    <input
                      type="text"
                      name="pin_code"
                      value={formData.pin_code}
                      onChange={handleChange}
                      className={`form-control customer-form-input ${errors.pin_code ? 'is-invalid' : ''}`}
                      placeholder="Enter pin code"
                      maxLength="6"
                    />
                    {renderError('pin_code')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'identity-details':
        return (
          <div className="form-section">
            <h5 className="form-section-title">Identity Details</h5>
            <div className="form-section-content">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Aadhaar Number *</label>
                    <input
                      type="text"
                      name="aadhaar_number"
                      value={formData.aadhaar_number}
                      onChange={handleChange}
                      className={`form-control customer-form-input ${errors.aadhaar_number ? 'is-invalid' : ''}`}
                      placeholder="12-digit Aadhaar number"
                      maxLength="12"
                    />
                    {renderError('aadhaar_number')}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">PAN Number</label>
                    <input
                      type="text"
                      name="pan_number"
                      value={formData.pan_number}
                      onChange={handleChange}
                      className={`form-control customer-form-input ${errors.pan_number ? 'is-invalid' : ''}`}
                      placeholder="e.g., ABCDE1234F"
                      maxLength="10"
                    />
                    {renderError('pan_number')}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Photo</label>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, 'photo')}
                      className="form-control customer-form-input"
                      accept="image/*"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Identity Proof</label>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, 'identity_proof')}
                      className="form-control customer-form-input"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'service-details':
        return (
          <div className="form-section">
            <h5 className="form-section-title">Service Details</h5>
            <div className="form-section-content">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Service Category *</label>
                    <select
                      name="service_category"
                      value={formData.service_category}
                      onChange={handleChange}
                      className={`form-select customer-form-input ${errors.service_category ? 'is-invalid' : ''}`}
                    >
                      <option value="">Select Category</option>
                      {serviceCategories.map(cat => (
                        <option key={cat.category_id} value={cat.category_id}>
                          {cat.category_name}
                        </option>
                      ))}
                    </select>
                    {renderError('service_category')}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Experience (Years)</label>
                    <input
                      type="number"
                      name="experience_years"
                      value={formData.experience_years}
                      onChange={handleChange}
                      className="form-control customer-form-input"
                      placeholder="Years of experience"
                      min="0"
                      step="0.5"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Skills</label>
                    <textarea
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      className="form-control customer-form-input"
                      rows="3"
                      placeholder="List your skills (comma separated)"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Service Area *</label>
                    <textarea
                      name="service_area"
                      value={formData.service_area}
                      onChange={handleChange}
                      className={`form-control customer-form-input ${errors.service_area ? 'is-invalid' : ''}`}
                      rows="3"
                      placeholder="Areas where you provide service"
                    />
                    {renderError('service_area')}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Service Charges (₹)</label>
                    <input
                      type="number"
                      name="service_charges"
                      value={formData.service_charges}
                      onChange={handleChange}
                      className="form-control customer-form-input"
                      placeholder="Enter service charges"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'business-details':
        return (
          <div className="form-section">
            <h5 className="form-section-title">Business Details</h5>
            <div className="form-section-content">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Business Name</label>
                    <input
                      type="text"
                      name="business_name"
                      value={formData.business_name}
                      onChange={handleChange}
                      className="form-control customer-form-input"
                      placeholder="Enter business name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">GST Number</label>
                    <input
                      type="text"
                      name="gst_number"
                      value={formData.gst_number}
                      onChange={handleChange}
                      className="form-control customer-form-input"
                      placeholder="Enter GST number"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Shop Address</label>
                    <textarea
                      name="shop_address"
                      value={formData.shop_address}
                      onChange={handleChange}
                      className="form-control customer-form-input"
                      rows="3"
                      placeholder="Enter shop address"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'bank-details':
        return (
          <div className="form-section">
            <h5 className="form-section-title">Bank Details (Optional)</h5>
            <div className="alert alert-info">
              <i className="bi bi-info-circle me-2"></i>
              Bank details are optional. You can add them later if needed.
            </div>
            <div className="form-section-content">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Bank Name</label>
                    <input
                      type="text"
                      name="bank_name"
                      value={formData.bank_name}
                      onChange={handleChange}
                      className="form-control customer-form-input"
                      placeholder="Enter bank name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Account Holder Name</label>
                    <input
                      type="text"
                      name="account_holder_name"
                      value={formData.account_holder_name}
                      onChange={handleChange}
                      className="form-control customer-form-input"
                      placeholder="Enter account holder name"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Account Number</label>
                    <input
                      type="text"
                      name="account_number"
                      value={formData.account_number}
                      onChange={handleChange}
                      className="form-control customer-form-input"
                      placeholder="Enter account number"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">IFSC Code</label>
                    <input
                      type="text"
                      name="ifsc_code"
                      value={formData.ifsc_code}
                      onChange={handleChange}
                      className="form-control customer-form-input"
                      placeholder="e.g., SBIN0001234"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">UPI ID</label>
                    <input
                      type="text"
                      name="upi_id"
                      value={formData.upi_id}
                      onChange={handleChange}
                      className="form-control customer-form-input"
                      placeholder="e.g., name@upi"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'documents-upload':
        return (
          <div className="form-section">
            <h5 className="form-section-title">Documents Upload (Optional)</h5>
            <div className="form-section-content">
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Aadhaar Card</label>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, 'aadhaar_card')}
                      className="form-control customer-form-input"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Address Proof</label>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, 'address_proof')}
                      className="form-control customer-form-input"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="admin-customer-form-label">Experience Certificate</label>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, 'experience_certificate')}
                      className="form-control customer-form-input"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container-fluid admin-add-property-main-div">
        <div className="row">
          <div className="col-12">
            <div className="property-form-container">
              <div className="admin-form-header">
                <h2 className="form-title">Add Service Provider</h2>
                <div className="admin-form-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary me-2"
                    onClick={() => navigate('/admin-service-providers')}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn"
                    style={{
                      backgroundColor: '#273c75',
                      borderColor: '#273c75',
                      color: 'white'
                    }}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Add Provider'}
                  </button>
                </div>
              </div>

              <div className="admin-form-tabs-container">
                <ul className="nav nav-tabs admin-form-tabs">
                  {tabs.map((tab) => (
                    <li className="nav-item" key={tab.id}>
                      <button
                        className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab.id)}
                        type="button"
                      >
                        {tab.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="admin-form-body">
                <form>
                  {renderActiveTab()}
                  
                  <div className="admin-form-navigation">
                    <div className="row">
                      <div className="col-md-6">
                        {activeTab !== 'personal-details' && (
                          <button 
                            type="button" 
                            className="btn btn-secondary"
                            onClick={handleBack}
                            disabled={isSubmitting}
                          >
                            <i className="bi bi-arrow-left me-1"></i> Back
                          </button>
                        )}
                      </div>
                      <div className="col-md-6 text-end">
                        {activeTab !== 'documents-upload' ? (
                          <button 
                            type="button" 
                            className="btn"
                            style={{
                              backgroundColor: '#273c75',
                              borderColor: '#273c75',
                              color: 'white'
                            }}
                            onClick={handleNext}
                            disabled={isSubmitting}
                          >
                            Next <i className="bi bi-arrow-right ms-1"></i>
                          </button>
                        ) : (
                          <button 
                            type="button" 
                            className="btn"
                            style={{
                              backgroundColor: '#273c75',
                              borderColor: '#273c75',
                              color: 'white'
                            }}
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-1"></span>
                                Saving...
                              </>
                            ) : (
                              <>
                                Add Provider
                                <i className="bi bi-check-circle ms-1"></i>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddServiceProvider;