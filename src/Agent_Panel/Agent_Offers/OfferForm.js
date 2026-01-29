import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseurl } from "../../BaseURL/BaseURL";
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import Swal from 'sweetalert2';
import './OfferForm.css';

const OfferForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  
  // Get user_id from local storage (set during login)
  const userId = localStorage.getItem('user_id');
  
  const offerTypes = [
    { value: 'discount_percent', label: 'Discount Percentage' },
    { value: 'discount_flat', label: 'Flat Discount' },
    { value: 'buy_x_get_y', label: 'Buy X Get Y' },
    { value: 'free_gift', label: 'Free Gift' }
  ];

  const [formData, setFormData] = useState({
    offer_type: '',
    value: '',
    x_quantity: '',
    y_quantity: '',
    description: '',
    start_date: '',
    end_date: '',
    user_id: userId || ''
  });

  const [errors, setErrors] = useState({});

  // Check if user is logged in (has user_id)
  useEffect(() => {
    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Required',
        text: 'Please login to create or edit offers.',
        confirmButtonColor: '#273c75',
      }).then(() => {
        navigate('/login');
      });
    }
  }, [userId]);

  // Fetch offer data if in edit mode
  useEffect(() => {
    if (isEditMode && userId) {
      fetchOffer();
    }
  }, [id, userId]);

  const fetchOffer = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}/offers/${id}/`);
      const offer = response.data;
      
      const parseDateFromAPI = (dateStr) => {
        if (!dateStr) return '';
        
        if (dateStr.includes('-')) {
          const parts = dateStr.split('-');
          if (parts.length === 3) {
            if (parts[0].length === 4) {
              return dateStr;
            } else if (parts[2].length === 4) {
              return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
            }
          }
        }
        
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          return date.toISOString().split('T')[0];
        }
        
        return '';
      };

      setFormData({
        offer_type: offer.offer_type || '',
        value: offer.value || '',
        x_quantity: offer.x_quantity || '',
        y_quantity: offer.y_quantity || '',
        description: offer.description || '',
        start_date: parseDateFromAPI(offer.start_date),
        end_date: parseDateFromAPI(offer.end_date),
        user_id: offer.user || userId || ''
      });
    } catch (error) {
      console.error('Error fetching offer:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load offer data.',
        confirmButtonColor: '#273c75',
      });
      navigate('/p-offers');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'offer_type') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        x_quantity: '',
        y_quantity: '',
        value: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Check if user is logged in
    if (!userId) {
      newErrors.general = 'User authentication required. Please login again.';
      Swal.fire({
        icon: 'error',
        title: 'Authentication Error',
        text: 'Your session may have expired. Please login again.',
        confirmButtonColor: '#273c75',
      }).then(() => {
        navigate('/login');
      });
      return false;
    }
    
    if (!formData.offer_type) {
      newErrors.offer_type = 'Offer type is required';
    }
    
    if (!formData.start_date) {
      newErrors.start_date = 'Start date is required';
    }
    
    if (!formData.end_date) {
      newErrors.end_date = 'End date is required';
    }
    
    switch(formData.offer_type) {
      case 'discount_percent':
        if (!formData.value || parseFloat(formData.value) <= 0 || parseFloat(formData.value) > 100) {
          newErrors.value = 'Please enter a valid percentage (1-100)';
        }
        break;
        
      case 'discount_flat':
        if (!formData.value || parseFloat(formData.value) <= 0) {
          newErrors.value = 'Please enter a valid amount';
        }
        break;
        
      case 'buy_x_get_y':
        if (!formData.x_quantity || parseInt(formData.x_quantity) <= 0) {
          newErrors.x_quantity = 'Please enter valid X quantity';
        }
        if (!formData.y_quantity || parseInt(formData.y_quantity) <= 0) {
          newErrors.y_quantity = 'Please enter valid Y quantity';
        }
        break;
        
      case 'free_gift':
        if (!formData.description?.trim()) {
          newErrors.description = 'Please describe the free gift';
        }
        break;
    }
    
    if (formData.start_date && formData.end_date) {
      const start = new Date(formData.start_date);
      const end = new Date(formData.end_date);
      
      if (end < start) {
        newErrors.end_date = 'End date must be after start date';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDateForAPI = (dateStr) => {
    if (!dateStr) return '';
    
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }
    
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return '';
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  const prepareDataForAPI = () => {
    const data = {
      ...formData,
      start_date: formatDateForAPI(formData.start_date),
      end_date: formatDateForAPI(formData.end_date),
      user_id: parseInt(userId)
    };

    if (data.value) data.value = parseFloat(data.value);
    if (data.x_quantity) data.x_quantity = parseInt(data.x_quantity);
    if (data.y_quantity) data.y_quantity = parseInt(data.y_quantity);

    if (!data.description) data.description = null;
    if (!data.value) data.value = null;
    if (!data.x_quantity) data.x_quantity = null;
    if (!data.y_quantity) data.y_quantity = null;

    if (data.user_id) {
      data.user = data.user_id;
      delete data.user_id;
    }

    return data;
  };

  const handleCancel = () => {
    if (formData.offer_type || formData.start_date || formData.end_date) {
      Swal.fire({
        title: 'Unsaved Changes',
        text: 'You have unsaved changes. Are you sure you want to leave?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#273c75',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Leave',
        cancelButtonText: 'Stay',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/agent-offers');
        }
      });
    } else {
      navigate('/agent-offers');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate user is logged in
    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Error',
        text: 'Please login to create or edit offers.',
        confirmButtonColor: '#273c75',
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    if (!validateForm()) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please fix the errors in the form.',
        confirmButtonColor: '#273c75',
      });
      return;
    }

    setSaving(true);
    try {
      const apiData = prepareDataForAPI();

      if (isEditMode) {
        await axios.put(`${baseurl}/offers/${id}/`, apiData);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Offer has been updated successfully.',
          confirmButtonColor: '#273c75',
        });
      } else {
        await axios.post(`${baseurl}/offers/`, apiData);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Offer has been created successfully.',
          confirmButtonColor: '#273c75',
        });
      }

      setTimeout(() => {
        navigate('/agent-offers');
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = isEditMode ? 'Failed to update offer.' : 'Failed to create offer.';
      
      if (error.response?.data) {
        const data = error.response.data;
        if (typeof data === 'object') {
          const fieldErrors = {};
          Object.keys(data).forEach(key => {
            fieldErrors[key] = Array.isArray(data[key]) ? data[key].join(', ') : data[key];
          });
          setErrors(fieldErrors);
          
          errorMessage = 'Please fix the errors in the form.';
        } else if (typeof data === 'string') {
          errorMessage = data;
        }
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonColor: '#273c75',
      });
    } finally {
      setSaving(false);
    }
  };

  const renderFieldsByType = () => {
    switch(formData.offer_type) {
      case 'discount_percent':
        return (
          <div className="form-group">
            <label className="form-label">
              Discount Percentage <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className={`form-control ${errors.value ? 'is-invalid' : ''}`}
              name="value"
              value={formData.value}
              onChange={handleChange}
              min="1"
              max="100"
              step="0.01"
              placeholder="e.g., 10"
              required
              disabled={saving}
            />
            {errors.value && (
              <div className="invalid-feedback">{errors.value}</div>
            )}
          </div>
        );
        
      case 'discount_flat':
        return (
          <div className="form-group">
            <label className="form-label">
              Flat Discount Amount <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className={`form-control ${errors.value ? 'is-invalid' : ''}`}
              name="value"
              value={formData.value}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="e.g., 500"
              required
              disabled={saving}
            />
            {errors.value && (
              <div className="invalid-feedback">{errors.value}</div>
            )}
          </div>
        );
        
      case 'buy_x_get_y':
        return (
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">
                  Buy Quantity (X) <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.x_quantity ? 'is-invalid' : ''}`}
                  name="x_quantity"
                  value={formData.x_quantity}
                  onChange={handleChange}
                  min="1"
                  placeholder="e.g., 2"
                  required
                  disabled={saving}
                />
                {errors.x_quantity && (
                  <div className="invalid-feedback">{errors.x_quantity}</div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">
                  Get Quantity (Y) <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.y_quantity ? 'is-invalid' : ''}`}
                  name="y_quantity"
                  value={formData.y_quantity}
                  onChange={handleChange}
                  min="1"
                  placeholder="e.g., 1"
                  required
                  disabled={saving}
                />
                {errors.y_quantity && (
                  <div className="invalid-feedback">{errors.y_quantity}</div>
                )}
              </div>
            </div>
          </div>
        );
        
      case 'free_gift':
        return (
          <div className="form-group">
            <label className="form-label">
              Gift Description <span className="text-danger">*</span>
            </label>
            <textarea
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="e.g., Free T-shirt with purchase"
              required
              disabled={saving}
            />
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  if (!userId) {
    return (
      <>
        <AgentNavbar />
        <div className="page-container">
          <div className="alert alert-danger text-center">
            Please login to access this page.
          </div>
          <div className="text-center">
            <button
              className="primary-btn"
              style={{ backgroundColor: '#273c75', color: 'white' }}
              onClick={() => navigate('/login')}
            >
              Go to Login
            </button>
          </div>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <AgentNavbar />
        <div className="page-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <h5>Loading offer data...</h5>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AgentNavbar />

      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <h2>{isEditMode ? 'Edit Offer' : 'Add New Offer'}</h2>
        </div>

        {/* Form Card */}
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            {errors.general && (
              <div className="alert alert-danger">
                {errors.general}
              </div>
            )}

            {/* Offer Type */}
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">
                    Offer Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-control ${errors.offer_type ? 'is-invalid' : ''}`}
                    name="offer_type"
                    value={formData.offer_type}
                    onChange={handleChange}
                    required
                    disabled={saving}
                  >
                    <option value="">Select Offer Type</option>
                    {offerTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.offer_type && (
                    <div className="invalid-feedback">{errors.offer_type}</div>
                  )}
                </div>
              </div>

              {/* Description for non-free_gift offers */}
              {formData.offer_type !== 'free_gift' && (
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Description (Optional)</label>
                    <input
                      type="text"
                      className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Brief description of the offer"
                      disabled={saving}
                    />
                    {errors.description && (
                      <div className="invalid-feedback">{errors.description}</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Dynamic Fields based on Offer Type */}
            {formData.offer_type && renderFieldsByType()}

            {/* Date Fields */}
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">
                    Start Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className={`form-control ${errors.start_date ? 'is-invalid' : ''}`}
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    max={formData.end_date || '2099-12-31'}
                    required
                    disabled={saving}
                  />
                  {errors.start_date && (
                    <div className="invalid-feedback">{errors.start_date}</div>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">
                    End Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className={`form-control ${errors.end_date ? 'is-invalid' : ''}`}
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    min={formData.start_date || '1900-01-01'}
                    required
                    disabled={saving}
                  />
                  {errors.end_date && (
                    <div className="invalid-feedback">{errors.end_date}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons */}
            {/* <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="primary-btn"
                style={{
                  backgroundColor: '#273c75',
                  borderColor: '#273c75',
                  color: 'white',
                  minWidth: '180px',
                }}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    {isEditMode ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  isEditMode ? 'Update Offer' : 'Create Offer'
                )}
              </button>
            </div> */}
            {/* Replace the existing form-actions div with this code */}
<div className="form-actions" style={{
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '30px',
  paddingTop: '20px',
  borderTop: '1px solid #e0e0e0'
}}>
  <div>
    <button
      type="button"
      className="cancel-btn"
      onClick={handleCancel}
      disabled={saving}
      style={{
        padding: '10px 25px',
        backgroundColor: '#f8f9fa',
        color: '#6c757d',
        border: '1px solid #dee2e6',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '500'
      }}
    >
      Cancel
    </button>
  </div>
  
  <div>
    <button
      type="submit"
      className="primary-btn"
      disabled={saving}
      style={{
        padding: '10px 25px',
        backgroundColor: '#273c75',
        color: 'white',
        border: '1px solid #273c75',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '500',
        minWidth: '180px'
      }}
    >
      {saving ? (
        <>
          <span className="spinner-border spinner-border-sm me-2"></span>
          {isEditMode ? 'Updating...' : 'Creating...'}
        </>
      ) : (
        isEditMode ? 'Update Offer' : 'Create Offer'
      )}
    </button>
  </div>
</div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OfferForm;