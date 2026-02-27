



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { baseurl } from "../../BaseURL/BaseURL";
// import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import './MySubscriptionPlan.css';

// function MySubscriptionPlan() {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 10;
//   const navigate = useNavigate();

//   // Get current user ID from localStorage
//   const userId = localStorage.getItem('user_id');

//   useEffect(() => {
//     if (userId) {
//       fetchSubscriptions();
//     } else {
//       Swal.fire({
//         icon: 'error',
//         title: 'Authentication Required',
//         text: 'Please login to view subscriptions.',
//         confirmButtonColor: '#3085d6',
//       }).then(() => {
//         navigate('/login');
//       });
//     }
//   }, [userId]);

//   const fetchSubscriptions = async () => {
//     try {
//       setLoading(true);
      
//       // Fetch subscriptions for the specific user
//       const response = await axios.get(`${baseurl}/subscriptions/search/`);
      
//       // Handle the API response format
//       let subscriptionsData = [];
//       if (response.data && response.data.results && Array.isArray(response.data.results)) {
//         subscriptionsData = response.data.results;
//       } else if (response.data && Array.isArray(response.data)) {
//         subscriptionsData = response.data;
//       }
      
//       // Sort by subscription_id in descending order (newest first)
//       const sorted = subscriptionsData.sort((a, b) => b.subscription_id - a.subscription_id);
//       setSubscriptions(sorted);
//       setFilteredSubscriptions(sorted);
      
//     } catch (error) {
//       console.error('Error fetching subscriptions:', error);
      
//       if (error.response && error.response.status === 404) {
//         setSubscriptions([]);
//         setFilteredSubscriptions([]);
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Failed to load subscriptions. Please try again.',
//           confirmButtonColor: '#3085d6',
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= SEARCH ================= */
//   const safeToString = (v) => v ? v.toString() : '';

//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setFilteredSubscriptions([...subscriptions].sort((a, b) => b.subscription_id - a.subscription_id));
//       setPage(1);
//       return;
//     }

//     const q = searchQuery.toLowerCase();
//     const filtered = subscriptions.filter(sub =>
//       safeToString(sub.subscription_id).includes(q) ||
//       safeToString(sub.plan_name).toLowerCase().includes(q) ||
//       safeToString(sub.subscription_status).toLowerCase().includes(q) ||
//       safeToString(sub.duration_in_days).includes(q) ||
//       safeToString(sub.subscription_start_datetime).includes(q) ||
//       safeToString(sub.subscription_end_datetime).includes(q) ||
//       safeToString(sub.user_email).toLowerCase().includes(q)
//     );

//     setFilteredSubscriptions(filtered.sort((a, b) => b.subscription_id - a.subscription_id));
//     setPage(1);
//   }, [searchQuery, subscriptions]);

//   /* ================= CANCEL SUBSCRIPTION ================= */
//   const handleCancelSubscription = (subscriptionId) => {
//     Swal.fire({
//       title: 'Cancel Subscription?',
//       text: "Are you sure you want to cancel this subscription? This action cannot be undone.",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, cancel it',
//     }).then(result => {
//       if (result.isConfirmed) {
//         // Here you would typically call an API to cancel the subscription
//         // For now, we'll show a success message
//         Swal.fire({
//           icon: 'success',
//           title: 'Cancelled!',
//           text: 'Subscription has been cancelled successfully.',
//           confirmButtonColor: '#3085d6',
//         });
//         // fetchSubscriptions(); // Uncomment when API is ready
//       }
//     });
//   };

//   const handleViewDetails = (subscriptionId) => {
//     navigate(`/subscription-details/${subscriptionId}`);
//   };

//   const handlePageChange = (pageNumber) => {
//     setPage(pageNumber);
//   };

//   const formatDateTime = (dateTimeString) => {
//     if (!dateTimeString) return '-';
//     try {
//       // Handle format: "09-02-2026 16:05:12"
//       if (dateTimeString.includes('-') && dateTimeString.includes(':')) {
//         const [datePart, timePart] = dateTimeString.split(' ');
//         const [day, month, year] = datePart.split('-');
//         return `${day}/${month}/${year} ${timePart}`;
//       }
//       return dateTimeString;
//     } catch (error) {
//       return dateTimeString;
//     }
//   };

//   const formatDate = (dateTimeString) => {
//     if (!dateTimeString) return '-';
//     try {
//       // Handle format: "09-02-2026 16:05:12"
//       if (dateTimeString.includes('-') && dateTimeString.includes(':')) {
//         const [datePart] = dateTimeString.split(' ');
//         const [day, month, year] = datePart.split('-');
//         return `${day}/${month}/${year}`;
//       }
//       return dateTimeString;
//     } catch (error) {
//       return dateTimeString;
//     }
//   };

//   const getStatusBadgeClass = (status) => {
//     const statusLower = (status || '').toLowerCase();
//     switch(statusLower) {
//       case 'active':
//         return 'status-active';
//       case 'unpaid':
//         return 'status-inactive';
//       case 'expired':
//         return 'status-expired';
//       case 'cancelled':
//         return 'status-cancelled';
//       default:
//         return 'status-inactive';
//     }
//   };

//   const getStatusDisplay = (status) => {
//     if (!status) return 'Unknown';
//     return status.charAt(0).toUpperCase() + status.slice(1);
//   };

//   const calculateRemainingDays = (endDateTime) => {
//     if (!endDateTime) return '-';
//     try {
//       const [datePart, timePart] = endDateTime.split(' ');
//       const [day, month, year] = datePart.split('-');
//       const [hour, minute, second] = timePart.split(':');
      
//       const endDate = new Date(year, month - 1, day, hour, minute, second);
//       const today = new Date();
      
//       const diffTime = endDate - today;
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
//       if (diffDays < 0) return 'Expired';
//       if (diffDays === 0) return 'Last day';
//       return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
//     } catch (error) {
//       return '-';
//     }
//   };

//   const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage) || 1;
//   const paginatedSubscriptions = filteredSubscriptions.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   return (
//     <>
//       <AdminNavbar />

//       <div className="page-container">
//         {/* Header */}
//         <div className="page-header">
//           <h2>My Subscription Plans</h2>
//         </div>

//         {/* Toolbar */}
//         <div className="page-toolbar">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Search by Plan Name, Status, or Email"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
          
//           <button 
//             className="primary-btn"
//             style={{
//               backgroundColor: '#273c75',
//               borderColor: '#273c75',
//               color: 'white'
//             }}
//             onClick={() => navigate('/agent-subscription-plan')}
//           >
//             View Available Plans
//           </button>
//         </div>

//         {/* Table */}
//         <div className="table-card">
//           <table className="data-table">
//             <thead>
//               <tr>
//                 <th>S.No.</th>
//                 <th>Subscription ID</th>
//                 <th>Plan Name</th>
//                 <th>Duration</th>
//                 <th>Status</th>
//                 <th>Start Date & Time</th>
//                 <th>End Date & Time</th>
//                 <th>Remaining</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="9" className="no-data">
//                     <div className="loading-spinner"></div>
//                     Loading subscriptions...
//                   </td>
//                 </tr>
//               ) : filteredSubscriptions.length ? (
//                 paginatedSubscriptions.map((sub, index) => (
//                   <tr key={sub.subscription_id}>
//                     <td>{(page - 1) * itemsPerPage + index + 1}</td>
//                     <td>{sub.subscription_id}</td>
//                     <td>
//                       <strong>{sub.plan_name || 'N/A'}</strong>
//                       <br />
//                       <small style={{ fontSize: '11px', color: '#666' }}>
//                         Variant: {sub.subscription_variant}
//                       </small>
//                     </td>
//                     <td>{sub.duration_in_days || '-'} days</td>
//                     <td>
//                       <span className={getStatusBadgeClass(sub.subscription_status)}>
//                         {getStatusDisplay(sub.subscription_status)}
//                       </span>
//                     </td>
//                     <td>{formatDateTime(sub.subscription_start_datetime)}</td>
//                     <td>{formatDateTime(sub.subscription_end_datetime)}</td>
//                     <td>
//                       <span className={getStatusBadgeClass(
//                         calculateRemainingDays(sub.subscription_end_datetime) === 'Expired' 
//                           ? 'expired' 
//                           : 'active'
//                       )}>
//                         {calculateRemainingDays(sub.subscription_end_datetime)}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="9" className="no-data">
//                     <div className="empty-state">
//                       <div className="empty-icon">📋</div>
//                       <h4>No Subscriptions Found</h4>
//                       <p>You don't have any active or past subscriptions yet.</p>
//                       {/* <button 
//                         className="primary-btn"
//                         style={{
//                           marginTop: '15px',
//                           backgroundColor: '#273c75',
//                           borderColor: '#273c75',
//                           color: 'white'
//                         }}
//                         onClick={() => navigate('/available-plans')}
//                       >
//                         Browse Available Plans
//                       </button> */}
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {/* Pagination */}
//           {filteredSubscriptions.length > itemsPerPage && (
//             <div className="pagination-container">
//               <div className="pagination">
//                 <button
//                   className="page-btn"
//                   onClick={() => handlePageChange(page - 1)}
//                   disabled={page === 1}
//                 >
//                   ← Previous
//                 </button>
                
//                 <div className="page-numbers">
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
//                     <button
//                       key={pageNumber}
//                       className={`page-number ${page === pageNumber ? 'active' : ''}`}
//                       onClick={() => handlePageChange(pageNumber)}
//                     >
//                       {pageNumber}
//                     </button>
//                   ))}
//                 </div>
                
//                 <button
//                   className="page-btn"
//                   onClick={() => handlePageChange(page + 1)}
//                   disabled={page === totalPages}
//                 >
//                   Next →
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default MySubscriptionPlan;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseurl } from "../../BaseURL/BaseURL";
import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './MySubscriptionPlan.css';

function MySubscriptionPlan() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Get current user ID from localStorage
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (userId) {
      fetchSubscriptions();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Required',
        text: 'Please login to view subscriptions.',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        navigate('/login');
      });
    }
  }, [userId]);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      
      // Fetch subscriptions for the specific user
      const response = await axios.get(`${baseurl}/subscriptions/search/`);
      
      // Handle the API response format
      let subscriptionsData = [];
      if (response.data && response.data.results && Array.isArray(response.data.results)) {
        subscriptionsData = response.data.results;
      } else if (response.data && Array.isArray(response.data)) {
        subscriptionsData = response.data;
      }
      
      // Sort by subscription_id in descending order (newest first)
      const sorted = subscriptionsData.sort((a, b) => b.subscription_id - a.subscription_id);
      setSubscriptions(sorted);
      setFilteredSubscriptions(sorted);
      
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      
      if (error.response && error.response.status === 404) {
        setSubscriptions([]);
        setFilteredSubscriptions([]);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load subscriptions. Please try again.',
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
      setFilteredSubscriptions([...subscriptions].sort((a, b) => b.subscription_id - a.subscription_id));
      setPage(1);
      return;
    }

    const q = searchQuery.toLowerCase();
    const filtered = subscriptions.filter(sub =>
      safeToString(sub.subscription_id).includes(q) ||
      safeToString(sub.user_id).includes(q) ||
      safeToString(sub.plan_name).toLowerCase().includes(q) ||
      safeToString(sub.subscription_status).toLowerCase().includes(q) ||
      safeToString(sub.duration_in_days).includes(q) ||
      safeToString(sub.subscription_start_datetime).includes(q) ||
      safeToString(sub.subscription_end_datetime).includes(q) ||
      safeToString(sub.user_email).toLowerCase().includes(q)
    );

    setFilteredSubscriptions(filtered.sort((a, b) => b.subscription_id - a.subscription_id));
    setPage(1);
  }, [searchQuery, subscriptions]);

  /* ================= CANCEL SUBSCRIPTION ================= */
  const handleCancelSubscription = (subscriptionId) => {
    Swal.fire({
      title: 'Cancel Subscription?',
      text: "Are you sure you want to cancel this subscription? This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it',
    }).then(result => {
      if (result.isConfirmed) {
        // Here you would typically call an API to cancel the subscription
        // For now, we'll show a success message
        Swal.fire({
          icon: 'success',
          title: 'Cancelled!',
          text: 'Subscription has been cancelled successfully.',
          confirmButtonColor: '#3085d6',
        });
        // fetchSubscriptions(); // Uncomment when API is ready
      }
    });
  };

  const handleViewDetails = (subscriptionId) => {
    navigate(`/subscription-details/${subscriptionId}`);
  };

  const handleViewUser = (userId) => {
    navigate(`/admin-view-user/${userId}`);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '-';
    try {
      // Handle format: "09-02-2026 16:05:12"
      if (dateTimeString.includes('-') && dateTimeString.includes(':')) {
        const [datePart, timePart] = dateTimeString.split(' ');
        const [day, month, year] = datePart.split('-');
        return `${day}/${month}/${year} ${timePart}`;
      }
      return dateTimeString;
    } catch (error) {
      return dateTimeString;
    }
  };

  const formatDate = (dateTimeString) => {
    if (!dateTimeString) return '-';
    try {
      // Handle format: "09-02-2026 16:05:12"
      if (dateTimeString.includes('-') && dateTimeString.includes(':')) {
        const [datePart] = dateTimeString.split(' ');
        const [day, month, year] = datePart.split('-');
        return `${day}/${month}/${year}`;
      }
      return dateTimeString;
    } catch (error) {
      return dateTimeString;
    }
  };

  const getStatusBadgeClass = (status) => {
    const statusLower = (status || '').toLowerCase();
    switch(statusLower) {
      case 'paid':
      case 'active':
        return 'status-active';
      case 'unpaid':
        return 'status-inactive';
      case 'expired':
        return 'status-expired';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-inactive';
    }
  };

  const getStatusDisplay = (status) => {
    if (!status) return 'Unknown';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const calculateRemainingDays = (endDateTime) => {
    if (!endDateTime) return '-';
    try {
      const [datePart, timePart] = endDateTime.split(' ');
      const [day, month, year] = datePart.split('-');
      const [hour, minute, second] = timePart.split(':');
      
      const endDate = new Date(year, month - 1, day, hour, minute, second);
      const today = new Date();
      
      const diffTime = endDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 0) return 'Expired';
      if (diffDays === 0) return 'Last day';
      return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    } catch (error) {
      return '-';
    }
  };

  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage) || 1;
  const paginatedSubscriptions = filteredSubscriptions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <AdminNavbar />

      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <h2>My Subscription Plans</h2>
        </div>

        {/* Toolbar */}
        <div className="page-toolbar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by Plan Name, Status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button 
            className="primary-btn"
            style={{
              backgroundColor: '#273c75',
              borderColor: '#273c75',
              color: 'white'
            }}
            onClick={() => navigate('/admin-subscriptions')}
          >
            View Available Plans
          </button>
        </div>

        {/* Table */}
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>User ID</th>
                <th>Subscription ID</th>
                <th>Plan Name</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Start Date & Time</th>
                <th>End Date & Time</th>
                <th>Remaining</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="no-data">
                    <div className="loading-spinner"></div>
                    Loading subscriptions...
                  </td>
                </tr>
              ) : filteredSubscriptions.length ? (
                paginatedSubscriptions.map((sub, index) => (
                  <tr key={sub.subscription_id}>
                    <td>{(page - 1) * itemsPerPage + index + 1}</td>
                    <td>
                      <span 
                        className="user-id-link"
                        onClick={() => handleViewUser(sub.user_id)}
                        style={{
                          color: '#273c75',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          fontWeight: '500'
                        }}
                      >
                        {sub.user_id}
                      </span>
                    </td>
                    <td>{sub.subscription_id}</td>
                    <td>
                      <strong>{sub.plan_name || 'N/A'}</strong>
                      <br />
                      <small style={{ fontSize: '11px', color: '#666' }}>
                        Variant: {sub.subscription_variant}
                      </small>
                    </td>
                    <td>{sub.duration_in_days || '-'} days</td>
                    <td>
                      <span className={getStatusBadgeClass(sub.subscription_status)}>
                        {getStatusDisplay(sub.subscription_status)}
                      </span>
                    </td>
                    <td>{formatDateTime(sub.subscription_start_datetime)}</td>
                    <td>{formatDateTime(sub.subscription_end_datetime)}</td>
                    <td>
                      <span className={getStatusBadgeClass(
                        calculateRemainingDays(sub.subscription_end_datetime) === 'Expired' 
                          ? 'expired' 
                          : 'active'
                      )}>
                        {calculateRemainingDays(sub.subscription_end_datetime)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="no-data">
                    <div className="empty-state">
                      <div className="empty-icon">📋</div>
                      <h4>No Subscriptions Found</h4>
                      <p>You don't have any active or past subscriptions yet.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {filteredSubscriptions.length > itemsPerPage && (
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

export default MySubscriptionPlan;