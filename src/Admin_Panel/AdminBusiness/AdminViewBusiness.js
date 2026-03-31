import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { baseurl } from '../../BaseURL/BaseURL';
import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import './AdminViewBusiness.css';

const AdminViewBusiness = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  
  const userId = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');

  // Business types mapping
  const BUSINESS_TYPES = {
    'individual': 'Individual',
    'proprietor': 'Proprietor',
    'partnership': 'Partnership',
    'private_limited': 'Private Limited',
    'llp': 'LLP'
  };

  // Days of week mapping
  const DAYS_MAP = {
    'monday': 'Monday',
    'tuesday': 'Tuesday',
    'wednesday': 'Wednesday',
    'thursday': 'Thursday',
    'friday': 'Friday',
    'saturday': 'Saturday',
    'sunday': 'Sunday'
  };

  useEffect(() => {
    fetchBusinessDetails();
    fetchCategories();
  }, [id]);

  const fetchBusinessDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}/business/${id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setBusiness(response.data);
    } catch (error) {
      console.error('Error fetching business details:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load business details',
        confirmButtonColor: '#d33',
      }).then(() => {
        navigate('/admin-business');
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseurl}/categories/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const businessCategories = Array.isArray(response.data)
        ? response.data.filter(cat => cat.level === 'business')
        : response.data.results?.filter(cat => cat.level === 'business') || [];
      setCategories(businessCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getCategoryNames = (categoryIds) => {
    if (!Array.isArray(categoryIds) || !categories.length) return 'No categories';
    return categoryIds
      .map(id => {
        const category = categories.find(cat => cat.category_id === id);
        return category ? category.name : '';
      })
      .filter(name => name)
      .join(', ');
  };

  const getVerificationStatusBadge = (status) => {
    const statusConfig = {
      'pending': { label: 'Pending', class: 'badge-warning' },
      'verified': { label: 'Verified', class: 'badge-success' },
      'rejected': { label: 'Rejected', class: 'badge-danger' },
      'suspended': { label: 'Suspended', class: 'badge-secondary' }
    };
    const config = statusConfig[status] || { label: status, class: 'badge-info' };
    return (
      <span className={`badge ${config.class} verification-badge`}>
        {config.label}
      </span>
    );
  };

  const formatTime = (time) => {
    if (!time) return 'Closed';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleVerificationStatusChange = async (newStatus) => {
    try {
      const loadingAlert = Swal.fire({
        title: 'Updating...',
        text: 'Please wait while we update the verification status',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await axios.put(
        `${baseurl}/business/${id}/`,
        {
          verification_status: newStatus
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      Swal.close();

      if (response.status === 200 || response.status === 201) {
        setBusiness({ ...business, verification_status: newStatus });

        Swal.fire({
          icon: 'success',
          title: 'Status Updated!',
          text: `Verification status changed to ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
          confirmButtonColor: '#3085d6',
          timer: 2000,
          timerProgressBar: true
        });
      }
    } catch (error) {
      console.error('Error updating verification status:', error);
      
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Failed to update verification status',
        confirmButtonColor: '#d33',
      });
    }
  };

  const InfoField = ({ label, value }) => {
    return (
      <div className="info-field">
        <span className="info-label">{label}:</span>
        <span className="info-value">{value || 'N/A'}</span>
      </div>
    );
  };

  const SectionTitle = ({ title }) => {
    return (
      <div className="section-title">
        <h3>{title}</h3>
      </div>
    );
  };

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="view-business-container">
          <div className="loading-container">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading business details...</p>
          </div>
        </div>
      </>
    );
  }

  if (!business) {
    return (
      <>
        <AdminNavbar />
        <div className="view-business-container">
          <div className="error-container">
            <i className="bi bi-exclamation-triangle-fill display-1 text-warning"></i>
            <h3 className="mt-3">Business Not Found</h3>
            <p>The business you're looking for doesn't exist or has been removed.</p>
            <button className="btn btn-primary mt-3" onClick={() => navigate('/admin-business')}>
              Back to Businesses
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className="view-business-container">
        {/* Header with Back Button and Title */}
        <div className="view-header">
          <button className="btn-back" onClick={() => navigate('/admin-business')}>
            <i className="bi bi-arrow-left"></i> Back
          </button>
          <h1 className="business-title">{business.business_name}</h1>
          <div className="header-actions">
            <button className="btn-edit" onClick={() => navigate(`/admin-edit-business/${id}`)}>
              <i className="bi bi-pencil"></i> Edit
            </button>
          </div>
        </div>

        {/* Logo and Banner Section */}
        <div className="media-section">
          <div className="logo-container">
            {business.logo ? (
              <img 
                src={`${baseurl}${business.logo}`} 
                alt={`${business.business_name} logo`}
                className="business-logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/100x100/6c757d/ffffff?text=Logo';
                }}
              />
            ) : (
              <div className="logo-placeholder">
                <i className="bi bi-building"></i>
              </div>
            )}
          </div>
          <div className="banner-container">
            {business.banner ? (
              <img 
                src={`${baseurl}${business.banner}`} 
                alt={`${business.business_name} banner`}
                className="business-banner"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/800x200/6c757d/ffffff?text=No+Banner';
                }}
              />
            ) : (
              <div className="banner-placeholder">
                <i className="bi bi-image"></i>
                <span>No Banner</span>
              </div>
            )}
          </div>
        </div>

        {/* Verification Status Section */}
        <div className="verification-section">
          <div className="verification-status-row">
            <span className="verification-label">Verification Status:</span>
            <select
              className="verification-status-select"
              value={business.verification_status}
              onChange={(e) => handleVerificationStatusChange(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
              <option value="suspended">Suspended</option>
            </select>
            {business.is_featured && (
              <span className="featured-badge">Featured</span>
            )}
            {/* {business.is_active ? (
              <span className="active-badge active">Active</span>
            ) : (
              <span className="active-badge inactive">Inactive</span>
            )} */}
          </div>
        </div>

        {/* Basic Information */}
        <div className="info-section">
          <SectionTitle title="Basic Information" />
          <div className="info-grid">
            <InfoField label="Business Name" value={business.business_name} />
            <InfoField label="Legal Name" value={business.legal_name} />
            <InfoField label="Business Type" value={BUSINESS_TYPES[business.business_type] || business.business_type} />
            <InfoField label="Categories" value={getCategoryNames(business.categories)} />
          </div>
          <div className="description-field">
            <InfoField label="Description" value={business.description} />
          </div>
        </div>

        {/* Contact Information */}
        <div className="info-section">
          <SectionTitle title="Contact Information" />
          <div className="info-grid">
            <InfoField label="Support Email" value={business.support_email} />
            <InfoField label="Support Phone" value={business.support_phone} />
            <InfoField label="Website" value={business.website} />
          </div>
        </div>

        {/* Address Information */}
        <div className="info-section">
          <SectionTitle title="Address" />
          <div className="info-grid">
            <InfoField label="Address Line 1" value={business.address_line1} />
            <InfoField label="Address Line 2" value={business.address_line2} />
          </div>
          <div className="info-grid">
            <InfoField label="City" value={business.city} />
            <InfoField label="State" value={business.state} />
          </div>
          <div className="info-grid">
            <InfoField label="Country" value={business.country} />
            <InfoField label="Pincode" value={business.pincode} />
          </div>
        </div>

        {/* Bank & Compliance */}
        <div className="info-section">
          <SectionTitle title="Bank & Compliance" />
          <div className="info-grid">
            <InfoField label="Account Holder Name" value={business.bank_account_name} />
            <InfoField label="Account Number" value={business.bank_account_number} />
            <InfoField label="IFSC Code" value={business.bank_ifsc} />
          </div>
          <div className="info-grid">
            <InfoField label="Bank Name" value={business.bank_name} />
            <InfoField label="GST Number" value={business.gst_number} />
            <InfoField label="PAN Number" value={business.pan_number} />
          </div>
        </div>

        {/* Marketplace Settings */}
        <div className="info-section">
          <SectionTitle title="Marketplace Settings" />
          <div className="info-grid">
            <InfoField label="Commission Percentage" value={`${business.commission_percent}%`} />
            <InfoField label="Settlement Cycle" value={`${business.settlement_cycle_days} days`} />
            <InfoField label="Minimum Order Value" value={`₹${business.min_order_value}`} />
          </div>
        </div>

        {/* Working Hours */}
        <div className="info-section">
          <SectionTitle title="Working Hours" />
          <div className="working-hours-table-container">
            <table className="working-hours-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Opening Time</th>
                  <th>Closing Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {business.working_hours && business.working_hours.length > 0 ? (
                  business.working_hours.map((hour) => (
                    <tr key={hour.day}>
                      <td>{DAYS_MAP[hour.day] || hour.day}</td>
                      <td>{!hour.is_closed && hour.opens_at ? formatTime(hour.opens_at) : '—'}</td>
                      <td>{!hour.is_closed && hour.closes_at ? formatTime(hour.closes_at) : '—'}</td>
                      <td>
                        {hour.is_closed ? (
                          <span className="closed-badge">Closed</span>
                        ) : (
                          <span className="open-badge">Open</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No working hours set</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="admin-action-buttons ">
          <button className="btn btn-secondary" onClick={() => navigate('/admin-business')}>
            <i className="bi bi-arrow-left"></i> Back to List
          </button>
          <button className="btn btn-primary" onClick={() => navigate(`/admin-edit-business/${id}`)}>
            <i className="bi bi-pencil"></i> Edit Business
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminViewBusiness;