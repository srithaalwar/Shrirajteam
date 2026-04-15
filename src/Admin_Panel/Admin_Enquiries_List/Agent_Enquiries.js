import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { baseurl } from '../../BaseURL/BaseURL';
import './BusinessEnquiries.css';
import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";

const BusinessEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const businessId = queryParams.get('business');
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (businessId) {
      fetchEnquiries();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No business selected',
        confirmButtonColor: '#d33',
      }).then(() => {
        navigate('/agent-my-business');
      });
    }
  }, [businessId]);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseurl}/product-enquiries/?business_id=${businessId}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log("Enquiries response:", response.data);
      const enquiriesData = response.data.results || response.data;
      
      // Process the enquiries data
      const processedEnquiries = (Array.isArray(enquiriesData) ? enquiriesData : []).map(enquiry => {
        let productName = '';
        let quantity = 0;
        
        if (enquiry.products && enquiry.products.length > 0) {
          productName = enquiry.products[0].name || '';
          quantity = enquiry.products[0].qty || 0;
        }
        
        return {
          ...enquiry,
          product_name: productName,
          quantity: quantity
        };
      });
      
      setEnquiries(processedEnquiries);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load enquiries',
        confirmButtonColor: '#d33',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/agent-my-business');
  };

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="container-fluid enquiries-container">
          <div className="row">
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading enquiries...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className="container-fluid enquiries-container">
        {/* Header with Back Button */}
        <div className="row mb-4">
          <div className="col-12">
            <button 
              className="btn btn-outline-secondary mb-3"
              onClick={handleBack}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Businesses
            </button>
            <h1 className="enquiries-title">Product Enquiries</h1>
          </div>
        </div>

        {/* Enquiries Table */}
        {enquiries.length === 0 ? (
          <div className="row">
            <div className="col-12">
              <div className="text-center py-5">
                <i className="bi bi-inbox display-1 text-muted"></i>
                <h3 className="mt-3">No enquiries found</h3>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th>Enquiry ID</th>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Customer Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Message</th>
                      <th>Enquiry Date</th>
                      <th>Due Date</th>
                      {/* <th>Status</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((enquiry) => (
                      <tr key={enquiry.enquiry_id}>
                        <td>{enquiry.enquiry_id}</td>
                        <td>{enquiry.product_name || 'N/A'}</td>
                        <td>{enquiry.quantity || 0}</td>
                        <td>{enquiry.contact_name}</td>
                        <td>{enquiry.contact_phone}</td>
                        <td>{enquiry.contact_email}</td>
                        <td>{enquiry.message || 'No message'}</td>
                        <td>{enquiry.enquiry_date}</td>
                        <td>{enquiry.due_date || 'Not specified'}</td>
                        {/* <td>
                          <span className={`badge bg-${getStatusColor(enquiry.status)}`}>
                            {enquiry.status}
                          </span>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Helper function to get status color
const getStatusColor = (status) => {
  switch(status) {
    case 'pending': return 'warning';
    case 'responded': return 'info';
    case 'quoted': return 'primary';
    case 'accepted': return 'success';
    case 'rejected': return 'danger';
    case 'completed': return 'secondary';
    default: return 'secondary';
  }
};

export default BusinessEnquiries;