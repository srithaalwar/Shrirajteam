import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseurl } from "../../BaseURL/BaseURL";
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './TableOffers.css';

function TableOffers() {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Get current user ID from localStorage
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (userId) {
      fetchOffers();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Required',
        text: 'Please login to view offers.',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        navigate('/login');
      });
    }
  }, [userId]);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      
      // Fetch offers for the specific user
      const response = await axios.get(`${baseurl}/offers/user-id/${userId}/`);
      
      // Handle different response formats
      let offersData = [];
      if (response.data && Array.isArray(response.data)) {
        offersData = response.data;
      } else if (response.data && response.data.results && Array.isArray(response.data.results)) {
        offersData = response.data.results;
      }
      
      const sorted = offersData.sort((a, b) => b.id - a.id);
      setOffers(sorted);
      setFilteredOffers(sorted);
      
    } catch (error) {
      console.error('Error fetching offers:', error);
      
      if (error.response && error.response.status === 404) {
        setOffers([]);
        setFilteredOffers([]);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load offers. Please try again.',
          confirmButtonColor: '#3085d6',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= SEARCH ================= */
  const safeToString = (v) => v ? v.toString() : '';

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredOffers([...offers].sort((a, b) => b.id - a.id));
      setPage(1);
      return;
    }

    const q = searchQuery.toLowerCase();
    const filtered = offers.filter(o =>
      safeToString(o.id).includes(q) ||
      safeToString(o.offer_type).toLowerCase().includes(q) ||
      safeToString(o.value).includes(q) ||
      safeToString(o.description).toLowerCase().includes(q) ||
      safeToString(o.start_date).includes(q) ||
      safeToString(o.end_date).includes(q)
    );

    setFilteredOffers(filtered.sort((a, b) => b.id - a.id));
    setPage(1);
  }, [searchQuery, offers]);

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then(result => {
      if (result.isConfirmed) {
        axios.delete(`${baseurl}/offers/${id}/`)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Offer deleted successfully.',
              confirmButtonColor: '#3085d6',
            });
            fetchOffers();
          })
          .catch(() => Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Delete failed',
            confirmButtonColor: '#3085d6',
          }));
      }
    });
  };

  const handleEdit = (id) => {
    navigate(`/agent-edit-offer/${id}`);
  };

  const handleAddNew = () => {
    navigate('/agent-add-offer');
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      if (dateString.includes('-')) {
        const [day, month, year] = dateString.split('-');
        return `${day}/${month}/${year}`;
      } else if (dateString.includes('T')) {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      }
      return dateString;
    } catch (error) {
      return dateString;
    }
  };

  const getOfferTypeDisplay = (type) => {
    const types = {
      'discount_percent': 'Discount %',
      'discount_flat': 'Flat Discount',
      'buy_x_get_y': 'Buy X Get Y',
      'free_gift': 'Free Gift'
    };
    return types[type] || type;
  };

  const formatOfferValue = (offer) => {
    if (!offer) return '-';
    
    switch(offer.offer_type) {
      case 'discount_percent':
        return `${offer.value}%`;
      case 'discount_flat':
        return `₹${Number(offer.value || 0).toLocaleString()}`;
      case 'buy_x_get_y':
        return `Buy ${offer.x_quantity || 0} Get ${offer.y_quantity || 0}`;
      case 'free_gift':
        return offer.description || 'Free Gift';
      default:
        return offer.value || '-';
    }
  };

  const getStatusBadgeClass = (isActive) => {
    return isActive ? 'status-active' : 'status-inactive';
  };

  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage) || 1;
  const paginatedOffers = filteredOffers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <AgentNavbar />

      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <h2>My Offers</h2>
        </div>

        {/* Toolbar */}
        <div className="page-toolbar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by ID, Type, Description or Date"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* <span className="search-icon">🔍</span> */}
          </div>
          
          <button 
            className="primary-btn"
            style={{
              backgroundColor: '#273c75',
              borderColor: '#273c75',
              color: 'white'
            }}
            onClick={handleAddNew}
          >
            Add New Offer
          </button>
        </div>

        {/* Table */}
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>ID</th>
                <th>OFFER TYPE</th>
                <th>OFFER VALUE</th>
                <th>DESCRIPTION</th>
                <th>START DATE</th>
                <th>END DATE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="no-data">
                    <div className="loading-spinner"></div>
                    Loading offers...
                  </td>
                </tr>
              ) : filteredOffers.length ? (
                paginatedOffers.map((offer, index) => (
                  <tr key={offer.id}>
                    <td>{(page - 1) * itemsPerPage + index + 1}</td>
                    <td>{offer.id}</td>
                    <td>{getOfferTypeDisplay(offer.offer_type)}</td>
                    <td>{formatOfferValue(offer)}</td>
                    <td className="description-cell">{offer.description || '-'}</td>
                    <td>{formatDate(offer.start_date)}</td>
                    <td>{formatDate(offer.end_date)}</td>
                    <td>
                      <span className={getStatusBadgeClass(offer.is_active)}>
                        {offer.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="actions">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEdit(offer.id)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(offer.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="no-data">
                    <div className="empty-state">
                      <div className="empty-icon">🎁</div>
                      <h4>No Offers Available</h4>
                      <p>You haven't created any offers yet. Click "Add New Offer" to create your first offer.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {filteredOffers.length > itemsPerPage && (
            <div className="pagination-container">
              <div className="pagination">
                <button
                  className="page-btn"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  ← Previous
                </button>
                
                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <button
                      key={pageNumber}
                      className={`page-number ${page === pageNumber ? 'active' : ''}`}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>
                
                <button
                  className="page-btn"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TableOffers;