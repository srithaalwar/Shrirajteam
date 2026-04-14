import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { baseurl } from '../../BaseURL/BaseURL';
import './BusinessEnquiries.css';
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";

const BusinessEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseData, setResponseData] = useState({
    quoted_price: '',
    response_message: '',
    status: ''
  });
  const [businessName, setBusinessName] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const businessId = queryParams.get('business');
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (businessId) {
      fetchEnquiries();
      fetchBusinessDetails();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No business selected',
        confirmButtonColor: '#d33',
      }).then(() => {
        navigate('/my-business');
      });
    }
  }, [businessId]);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseurl}/product-enquiries/?business=${businessId}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log("Enquiries response:", response.data);
      const enquiriesData = response.data.results || response.data;
      setEnquiries(Array.isArray(enquiriesData) ? enquiriesData : []);
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

  const fetchBusinessDetails = async () => {
    try {
      const response = await axios.get(
        `${baseurl}/business/${businessId}/?user_id=${userId}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setBusinessName(response.data.business_name);
    } catch (error) {
      console.error('Error fetching business details:', error);
    }
  };

  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      const response = await axios.patch(
        `${baseurl}/product-enquiries/${enquiryId}/`,
        {
          status: newStatus
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Enquiry status updated successfully',
          confirmButtonColor: '#3085d6',
          timer: 2000
        });
        fetchEnquiries(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating status:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update status',
        confirmButtonColor: '#d33',
      });
    }
  };

  const openResponseModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setResponseData({
      quoted_price: enquiry.quoted_price || '',
      response_message: enquiry.response_message || '',
      status: enquiry.status
    });
    setShowResponseModal(true);
  };

  const submitResponse = async () => {
    if (!responseData.response_message.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please enter a response message',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    try {
      const response = await axios.patch(
        `${baseurl}/product-enquiries/${selectedEnquiry.enquiry_id}/`,
        {
          quoted_price: responseData.quoted_price || null,
          response_message: responseData.response_message,
          status: responseData.status
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Response sent successfully',
          confirmButtonColor: '#3085d6',
          timer: 2000
        });
        setShowResponseModal(false);
        fetchEnquiries(); // Refresh the list
      }
    } catch (error) {
      console.error('Error submitting response:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to submit response',
        confirmButtonColor: '#d33',
      });
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { label: 'Pending', class: 'badge-warning' },
      'responded': { label: 'Responded', class: 'badge-info' },
      'quoted': { label: 'Quoted', class: 'badge-primary' },
      'accepted': { label: 'Accepted', class: 'badge-success' },
      'rejected': { label: 'Rejected', class: 'badge-danger' },
      'completed': { label: 'Completed', class: 'badge-secondary' }
    };
    const config = statusConfig[status] || { label: status, class: 'badge-secondary' };
    return (
      <span className={`badge ${config.class} status-badge`}>
        {config.label}
      </span>
    );
  };

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = searchTerm === '' ||
      enquiry.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.contact_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.contact_phone?.includes(searchTerm) ||
      enquiry.contact_email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || enquiry.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEnquiries = filteredEnquiries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);

  const handleBack = () => {
    navigate('/my-business');
  };

  if (loading) {
    return (
      <>
        <AgentNavbar />
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
      <AgentNavbar />
      <div className="container-fluid enquiries-container">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-md-8">
            <button 
              className="btn btn-outline-secondary mb-3 back-btn"
              onClick={handleBack}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Businesses
            </button>
            <h1 className="enquiries-title">Product Enquiries</h1>
            <p className="enquiries-subtitle">
              {businessName ? `Managing enquiries for: ${businessName}` : 'View and manage customer enquiries'}
            </p>
          </div>
          <div className="col-md-4 text-end">
            <div className="stats-summary">
              <div className="stat-badge">
                Total: {enquiries.length}
              </div>
              <div className="stat-badge pending">
                Pending: {enquiries.filter(e => e.status === 'pending').length}
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="input-group search-box">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by product, brand, customer name, phone or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <select
              className="form-select filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="responded">Responded</option>
              <option value="quoted">Quoted</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-outline-primary w-100"
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
              }}
            >
              <i className="bi bi-arrow-repeat me-2"></i>
              Reset Filters
            </button>
          </div>
        </div>

        {/* Enquiries Table */}
        {currentEnquiries.length === 0 ? (
          <div className="row">
            <div className="col-12">
              <div className="no-results text-center py-5">
                <i className="bi bi-inbox display-1 text-muted"></i>
                <h3 className="mt-3">No enquiries found</h3>
                <p className="text-muted">
                  {searchTerm || filterStatus !== 'all'
                    ? 'Try adjusting your search or filters'
                    : 'No enquiries have been made for this business yet'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table enquiries-table">
                    <thead>
                      <tr>
                        <th>Enquiry ID</th>
                        <th>Product Details</th>
                        <th>Customer Details</th>
                        <th>Enquiry Details</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentEnquiries.map((enquiry) => (
                        <tr key={enquiry.enquiry_id}>
                          <td>
                            <span className="enquiry-id">#{enquiry.enquiry_id}</span>
                          </td>
                          <td>
                            <div className="product-info">
                              <strong>{enquiry.product_name}</strong>
                              {enquiry.brand && (
                                <div className="brand-text">
                                  <i className="bi bi-tag me-1"></i>
                                  {enquiry.brand}
                                </div>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="customer-info">
                              <div>
                                <i className="bi bi-person me-1"></i>
                                <strong>{enquiry.contact_name}</strong>
                              </div>
                              <div className="contact-details">
                                <div>
                                  <i className="bi bi-telephone me-1"></i>
                                  <a href={`tel:${enquiry.contact_phone}`}>{enquiry.contact_phone}</a>
                                </div>
                                <div>
                                  <i className="bi bi-envelope me-1"></i>
                                  <a href={`mailto:${enquiry.contact_email}`}>{enquiry.contact_email}</a>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="enquiry-details">
                              <div>
                                <i className="bi bi-calendar me-1"></i>
                                Date: {enquiry.enquiry_date}
                              </div>
                              <div>
                                <i className="bi bi-box me-1"></i>
                                Quantity: {enquiry.quantity}
                              </div>
                              {enquiry.due_date && (
                                <div>
                                  <i className="bi bi-hourglass-split me-1"></i>
                                  Due: {enquiry.due_date}
                                </div>
                              )}
                              {enquiry.message && (
                                <div className="message-preview" title={enquiry.message}>
                                  <i className="bi bi-chat-text me-1"></i>
                                  {enquiry.message.substring(0, 50)}
                                  {enquiry.message.length > 50 && '...'}
                                </div>
                              )}
                            </div>
                          </td>
                          <td>
                            {getStatusBadge(enquiry.status)}
                            {enquiry.quoted_price && (
                              <div className="quoted-price mt-1">
                                <small>Quote: ₹{enquiry.quoted_price}</small>
                              </div>
                            )}
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => openResponseModal(enquiry)}
                              >
                                <i className="bi bi-reply me-1"></i>
                                Respond
                              </button>
                              <select
                                className="form-select form-select-sm status-select"
                                value={enquiry.status}
                                onChange={(e) => handleStatusChange(enquiry.enquiry_id, e.target.value)}
                              >
                                <option value="pending">Pending</option>
                                <option value="responded">Responded</option>
                                <option value="quoted">Quoted</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                                <option value="completed">Completed</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="row mt-4">
                <div className="col-12">
                  <nav className="enquiries-pagination">
                    <ul className="pagination justify-content-center">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <i className="bi bi-chevron-left"></i> Previous
                        </button>
                      </li>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <li
                          key={page}
                          className={`page-item ${currentPage === page ? 'active' : ''}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        </li>
                      ))}

                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next <i className="bi bi-chevron-right"></i>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </>
        )}

        {/* Response Modal */}
        {showResponseModal && selectedEnquiry && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <i className="bi bi-chat-dots me-2"></i>
                    Respond to Enquiry #{selectedEnquiry.enquiry_id}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowResponseModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="enquiry-summary mb-4">
                    <h6>Enquiry Summary</h6>
                    <div className="row">
                      <div className="col-md-6">
                        <p><strong>Product:</strong> {selectedEnquiry.product_name}</p>
                        <p><strong>Brand:</strong> {selectedEnquiry.brand || 'N/A'}</p>
                        <p><strong>Quantity:</strong> {selectedEnquiry.quantity}</p>
                      </div>
                      <div className="col-md-6">
                        <p><strong>Customer:</strong> {selectedEnquiry.contact_name}</p>
                        <p><strong>Phone:</strong> {selectedEnquiry.contact_phone}</p>
                        <p><strong>Email:</strong> {selectedEnquiry.contact_email}</p>
                      </div>
                    </div>
                    {selectedEnquiry.message && (
                      <div className="customer-message">
                        <strong>Customer Message:</strong>
                        <p className="mt-2">{selectedEnquiry.message}</p>
                      </div>
                    )}
                  </div>

                  <hr />

                  <div className="response-form">
                    <h6>Your Response</h6>
                    <div className="mb-3">
                      <label className="form-label">Quoted Price (Optional)</label>
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <input
                          type="number"
                          className="form-control"
                          value={responseData.quoted_price}
                          onChange={(e) => setResponseData({...responseData, quoted_price: e.target.value})}
                          placeholder="Enter quoted price"
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        value={responseData.status}
                        onChange={(e) => setResponseData({...responseData, status: e.target.value})}
                      >
                        <option value="pending">Pending</option>
                        <option value="responded">Responded</option>
                        <option value="quoted">Quoted</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Response Message *</label>
                      <textarea
                        className="form-control"
                        rows="5"
                        value={responseData.response_message}
                        onChange={(e) => setResponseData({...responseData, response_message: e.target.value})}
                        placeholder="Type your response here..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowResponseModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={submitResponse}
                  >
                    <i className="bi bi-send me-2"></i>
                    Send Response
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showResponseModal && <div className="modal-backdrop show"></div>}
      </div>
    </>
  );
};

export default BusinessEnquiries;