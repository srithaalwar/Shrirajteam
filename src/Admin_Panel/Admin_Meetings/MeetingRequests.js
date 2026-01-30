// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Header from '../../Admin_Panel/Admin_Navbar/Admin_Navbar';
// import { useNavigate } from 'react-router-dom';
// import { baseurl } from '../../BaseURL/BaseURL';
// import Swal from 'sweetalert2';
// import './MeetingRequests.css';

// function MeetingRequests() {
//   const [tabValue, setTabValue] = useState(0);
//   const [meetingData, setMeetingData] = useState([]);
//   const [scheduledData, setScheduledData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const [page, setPage] = useState(1);
//   const itemsPerPage = 5;

//   const [departments, setDepartments] = useState([]);

//   useEffect(() => {
//     axios.get(`${baseurl}/departments/`)
//       .then(res => setDepartments(res.data))
//       .catch(err => console.log("Departments fetch error:", err));
//   }, []);

//   useEffect(() => {
//     fetchMeetingRequests();
//   }, []);

//   const fetchMeetingRequests = () => {
//     setLoading(true);
//     axios
//       .get(`${baseurl}/meeting-requests/`)
//       .then((response) => {
//         setMeetingData(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching meeting requests:', error);
//         setLoading(false);
//       });
//   };

//   const fetchScheduledMeetings = () => {
//     setLoading(true);
//     axios
//       .get(`${baseurl}/scheduled-meetings/`)
//       .then((response) => {
//         setScheduledData(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching scheduled meetings:', error);
//         setLoading(false);
//       });
//   };

//   const deleteMeetingRequest = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This meeting request will be permanently deleted.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios
//           .delete(`${baseurl}/meeting-requests/${id}/`)
//           .then(() => {
//             Swal.fire({
//               icon: "success",
//               title: "Deleted!",
//               text: "Meeting request deleted successfully.",
//               timer: 2000,
//               showConfirmButton: false,
//             });
//             fetchMeetingRequests();
//           })
//           .catch((error) => {
//             console.error("Delete error:", error);
//             Swal.fire("Error", "Failed to delete. Try again.", "error");
//           });
//       }
//     });
//   };

//   const handleStatusChange = (scheduleId, newStatus) => {
//     const meeting = scheduledData.find(
//       (item) => item.scheduled_meeting_id === scheduleId
//     );

//     if (!meeting) {
//       Swal.fire({
//         icon: "error",
//         title: "Not Found",
//         text: "Meeting not found",
//       });
//       return;
//     }

//     axios
//       .put(`${baseurl}/scheduled-meetings/${scheduleId}/`, { status: newStatus })
//       .then(() => {
//         fetchScheduledMeetings();
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: "Status updated successfully!",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       })
//       .catch((error) => {
//         console.error("Error updating meeting status:", error);
//         Swal.fire("Error", "Failed to update status. Try again.", "error");
//       });
//   };

//   const handleTabChange = (newValue) => {
//     setTabValue(newValue);
//     setPage(1);

//     if (newValue === 0) fetchMeetingRequests();
//     else fetchScheduledMeetings();
//   };

//   const getTableData = () => {
//     const source = tabValue === 0 ? meetingData : scheduledData;
//     const sliced = source.slice((page - 1) * itemsPerPage, page * itemsPerPage);

//     return sliced.map((item) => {
//       const isScheduled = item.is_scheduled;
//       const departmentName = departments?.find((d) => d.id == item.department)?.name || "N/A";

//       return {
//         id: item.request_id || item.schedule_id,
//         user_id: item.user_id,
//         name: item.name,
//         referral_id: item.referral_id,
//         email: item.email,
//         department_name: departmentName,
//         date: item.requested_date || item.scheduled_date,
//         time: item.requested_time || item.scheduled_time,
//         is_scheduled: isScheduled,
//         status: item.status,
//         scheduled_meeting_id: item.scheduled_meeting_id,
//         request_id: item.request_id
//       };
//     });
//   };

//   const totalPages = Math.ceil(
//     (tabValue === 0 ? meetingData.length : scheduledData.length) / itemsPerPage
//   );

//   const handlePageChange = (value) => {
//     setPage(value);
//   };

//   const tableData = getTableData();

//   return (
//     <>
//       <Header />
//       <div className="container-fluid py-4">
//         <div className="row">
//           <div className="col-12">
//             <div className="meeting-requests-container">
//               <div className="text-center mb-4">
//                 <ul className="nav nav-tabs justify-content-center" id="meetingTabs" role="tablist">
//                   <li className="nav-item" role="presentation">
//                     <button
//                       className={`nav-link ${tabValue === 0 ? 'active' : ''}`}
//                       onClick={() => handleTabChange(0)}
//                       type="button"
//                     >
//                       Meeting Requests
//                     </button>
//                   </li>
//                   <li className="nav-item" role="presentation">
//                     <button
//                       className={`nav-link ${tabValue === 1 ? 'active' : ''}`}
//                       onClick={() => handleTabChange(1)}
//                       type="button"
//                     >
//                       Scheduled Meetings
//                     </button>
//                   </li>
//                 </ul>
//               </div>

//               <div className="card">
//                 <div className="card-header bg-primary text-white">
//                   <h5 className="mb-0">
//                     {tabValue === 0 ? "Meeting Requests" : "Scheduled Meetings"}
//                   </h5>
//                 </div>
//                 <div className="card-body p-0">
//                   {loading ? (
//                     <div className="text-center py-5">
//                       <div className="spinner-border text-primary" role="status">
//                         <span className="visually-hidden">Loading...</span>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="table-responsive">
//                       <table className="table table-hover mb-0">
//                         <thead className="table-light">
//                           <tr>
//                             {tabValue === 0 && <th>Request ID</th>}
//                             <th>User ID</th>
//                             <th>Team Name</th>
//                             <th>Team Referral ID</th>
//                             <th>Email</th>
//                             <th>Department</th>
//                             <th>{tabValue === 0 ? "Requested Date" : "Scheduled Date"}</th>
//                             <th>{tabValue === 0 ? "Requested Time" : "Scheduled Time"}</th>
//                             <th>Schedule</th>
//                             <th>Actions</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {tableData.map((item) => (
//                             <tr key={item.id}>
//                               {tabValue === 0 && <td>{item.id}</td>}
//                               <td>{item.user_id}</td>
//                               <td>{item.name}</td>
//                               <td>{item.referral_id}</td>
//                               <td>{item.email}</td>
//                               <td>{item.department_name}</td>
//                               <td>{item.date}</td>
//                               <td>{item.time}</td>
//                               <td>
//                                 {tabValue === 0 ? (
//                                   <button
//                                     className={`btn btn-sm ${item.is_scheduled ? 'btn-outline-secondary' : 'btn-primary'}`}
//                                     disabled={item.is_scheduled}
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       if (!item.is_scheduled) {
//                                         navigate(`/shedulemeet/${item.user_id}`, {
//                                           state: { request_id: item.request_id },
//                                         });
//                                       }
//                                     }}
//                                   >
//                                     {item.is_scheduled ? "Scheduled" : "Schedule"}
//                                   </button>
//                                 ) : (
//                                   <select
//                                     className="form-select form-select-sm"
//                                     value={item.status || "scheduled"}
//                                     onChange={(e) =>
//                                       handleStatusChange(item.scheduled_meeting_id, e.target.value)
//                                     }
//                                     style={{ minWidth: '140px' }}
//                                   >
//                                     <option value="scheduled">Scheduled</option>
//                                     <option value="cancelled">Cancelled</option>
//                                     <option value="completed">Completed</option>
//                                   </select>
//                                 )}
//                               </td>
//                               <td>
//                                 {tabValue === 0 ? (
//                                   <button
//                                     className="btn btn-sm btn-danger"
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       deleteMeetingRequest(item.request_id);
//                                     }}
//                                     title="Delete"
//                                   >
//                                     <i className="fas fa-trash"></i>
//                                   </button>
//                                 ) : (
//                                   "—"
//                                 )}
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                       {tableData.length === 0 && !loading && (
//                         <div className="text-center py-4">
//                           <p className="text-muted mb-0">No data available</p>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {totalPages > 1 && (
//                 <div className="d-flex justify-content-end mt-3">
//                   <nav aria-label="Page navigation">
//                     <ul className="pagination">
//                       <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
//                         <button className="page-link" onClick={() => handlePageChange(page - 1)}>
//                           Previous
//                         </button>
//                       </li>
//                       {[...Array(totalPages)].map((_, index) => (
//                         <li key={index} className={`page-item ${page === index + 1 ? 'active' : ''}`}>
//                           <button className="page-link" onClick={() => handlePageChange(index + 1)}>
//                             {index + 1}
//                           </button>
//                         </li>
//                       ))}
//                       <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
//                         <button className="page-link" onClick={() => handlePageChange(page + 1)}>
//                           Next
//                         </button>
//                       </li>
//                     </ul>
//                   </nav>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default MeetingRequests;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
//  import Header from '../../Admin_Panel/Admin_Navbar/Admin_Navbar';
// import { useNavigate } from 'react-router-dom';
// import { baseurl } from '../../BaseURL/BaseURL';
// import Swal from 'sweetalert2';
// import './MeetingRequests.css';

// function MeetingRequests() {
//   const [tabValue, setTabValue] = useState(0);
//   const [meetingData, setMeetingData] = useState([]);
//   const [scheduledData, setScheduledData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const [page, setPage] = useState(1);
//   const itemsPerPage = 5;

//   const [departments, setDepartments] = useState([]);
//   const [totalPagesMeeting, setTotalPagesMeeting] = useState(1);
//   const [totalPagesScheduled, setTotalPagesScheduled] = useState(1);

//   useEffect(() => {
//     axios.get(`${baseurl}/departments/`)
//       .then(res => setDepartments(res.data.results || []))
//       .catch(err => console.log("Departments fetch error:", err));
//   }, []);

//   useEffect(() => {
//     fetchMeetingRequests();
//   }, []);

//   const fetchMeetingRequests = () => {
//     setLoading(true);
//     axios
//       .get(`${baseurl}/meeting-requests/`)
//       .then((response) => {
//         // Handle paginated response
//         const data = response.data.results || response.data || [];
//         setMeetingData(Array.isArray(data) ? data : []);
//         setTotalPagesMeeting(Math.ceil((response.data.count || data.length) / itemsPerPage));
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching meeting requests:', error);
//         setMeetingData([]);
//         setLoading(false);
//       });
//   };

//   const fetchScheduledMeetings = () => {
//     setLoading(true);
//     axios
//       .get(`${baseurl}/scheduled-meetings/`)
//       .then((response) => {
//         // Handle paginated response
//         const data = response.data.results || response.data || [];
//         setScheduledData(Array.isArray(data) ? data : []);
//         setTotalPagesScheduled(Math.ceil((response.data.count || data.length) / itemsPerPage));
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching scheduled meetings:', error);
//         setScheduledData([]);
//         setLoading(false);
//       });
//   };

//   const deleteMeetingRequest = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This meeting request will be permanently deleted.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios
//           .delete(`${baseurl}/meeting-requests/${id}/`)
//           .then(() => {
//             Swal.fire({
//               icon: "success",
//               title: "Deleted!",
//               text: "Meeting request deleted successfully.",
//               timer: 2000,
//               showConfirmButton: false,
//             });
//             fetchMeetingRequests();
//           })
//           .catch((error) => {
//             console.error("Delete error:", error);
//             Swal.fire("Error", "Failed to delete. Try again.", "error");
//           });
//       }
//     });
//   };

//   const handleStatusChange = (scheduleId, newStatus) => {
//     const meeting = scheduledData.find(
//       (item) => item.scheduled_meeting_id === scheduleId
//     );

//     if (!meeting) {
//       Swal.fire({
//         icon: "error",
//         title: "Not Found",
//         text: "Meeting not found",
//       });
//       return;
//     }

//     axios
//       .put(`${baseurl}/scheduled-meetings/${scheduleId}/`, { status: newStatus })
//       .then(() => {
//         fetchScheduledMeetings();
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: "Status updated successfully!",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       })
//       .catch((error) => {
//         console.error("Error updating meeting status:", error);
//         Swal.fire("Error", "Failed to update status. Try again.", "error");
//       });
//   };

//   const handleTabChange = (newValue) => {
//     setTabValue(newValue);
//     setPage(1);

//     if (newValue === 0) fetchMeetingRequests();
//     else fetchScheduledMeetings();
//   };

//   const getTableData = () => {
//     // Ensure we're working with arrays
//     const source = tabValue === 0 ? meetingData : scheduledData;
    
//     // Check if source is an array
//     if (!Array.isArray(source)) {
//       console.error('Source is not an array:', source);
//       return [];
//     }
    
//     // Handle pagination
//     const startIndex = (page - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const paginatedData = source.slice(startIndex, endIndex);

//     return paginatedData.map((item) => {
//       const isScheduled = item.is_scheduled || false;
      
//       // Find department name
//       const departmentName = departments.find(
//         (d) => d.id === parseInt(item.department)
//       )?.name || "N/A";

//       return {
//         id: item.request_id || item.schedule_id || item.id,
//         user_id: item.user_id || 'N/A',
//         name: item.name || 'N/A',
//         referral_id: item.referral_id || 'N/A',
//         email: item.email || 'N/A',
//         department_name: departmentName,
//         date: item.requested_date || item.scheduled_date || 'N/A',
//         time: item.requested_time || item.scheduled_time || 'N/A',
//         is_scheduled: isScheduled,
//         status: item.status || 'scheduled',
//         scheduled_meeting_id: item.scheduled_meeting_id || item.id,
//         request_id: item.request_id || item.id
//       };
//     });
//   };

//   const totalPages = tabValue === 0 ? totalPagesMeeting : totalPagesScheduled;

//   const handlePageChange = (value) => {
//     setPage(value);
//   };

//   const tableData = getTableData();

//   return (
//     <>
//       <Header />
//       <div className="container-fluid py-4">
//         <div className="row">
//           <div className="col-12">
//             <div className="meeting-requests-container">
//               <div className="text-center mb-4">
//                 <ul className="nav nav-tabs justify-content-center" id="meetingTabs" role="tablist">
//                   <li className="nav-item" role="presentation">
//                     <button
//                       className={`nav-link ${tabValue === 0 ? 'active' : ''}`}
//                       onClick={() => handleTabChange(0)}
//                       type="button"
//                     >
//                       Meeting Requests
//                     </button>
//                   </li>
//                   <li className="nav-item" role="presentation">
//                     <button
//                       className={`nav-link ${tabValue === 1 ? 'active' : ''}`}
//                       onClick={() => handleTabChange(1)}
//                       type="button"
//                     >
//                       Scheduled Meetings
//                     </button>
//                   </li>
//                 </ul>
//               </div>

//               <div className="card">
//                 <div className="card-header bg-primary text-white">
//                   <h5 className="mb-0">
//                     {tabValue === 0 ? "Meeting Requests" : "Scheduled Meetings"}
//                     <span className="badge bg-light text-dark ms-2">
//                       {tabValue === 0 ? meetingData.length : scheduledData.length} items
//                     </span>
//                   </h5>
//                 </div>
//                 <div className="card-body p-0">
//                   {loading ? (
//                     <div className="text-center py-5">
//                       <div className="spinner-border text-primary" role="status">
//                         <span className="visually-hidden">Loading...</span>
//                       </div>
//                       <p className="mt-2">Loading data...</p>
//                     </div>
//                   ) : (
//                     <div className="table-responsive">
//                       <table className="table table-hover mb-0">
//                         <thead className="table-light">
//                           <tr>
//                             {tabValue === 0 && <th>Request ID</th>}
//                             <th>User ID</th>
//                             <th>Team Name</th>
//                             <th>Team Referral ID</th>
//                             <th>Email</th>
//                             <th>Department</th>
//                             <th>{tabValue === 0 ? "Requested Date" : "Scheduled Date"}</th>
//                             <th>{tabValue === 0 ? "Requested Time" : "Scheduled Time"}</th>
//                             <th>Schedule</th>
//                             <th>Actions</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {tableData.length > 0 ? (
//                             tableData.map((item, index) => (
//                               <tr key={`${item.id}-${index}`}>
//                                 {tabValue === 0 && <td>{item.id}</td>}
//                                 <td>{item.user_id}</td>
//                                 <td>{item.name}</td>
//                                 <td>{item.referral_id}</td>
//                                 <td>{item.email}</td>
//                                 <td>{item.department_name}</td>
//                                 <td>{item.date}</td>
//                                 <td>{item.time}</td>
//                                 <td>
//                                   {tabValue === 0 ? (
//                                     <button
//                                       className={`btn btn-sm ${item.is_scheduled ? 'btn-outline-secondary' : 'btn-primary'}`}
//                                       disabled={item.is_scheduled}
//                                       onClick={(e) => {
//                                         e.stopPropagation();
//                                         if (!item.is_scheduled) {
//                                           navigate(`/shedulemeet/${item.user_id}`, {
//                                             state: { 
//                                               request_id: item.request_id,
//                                               name: item.name,
//                                               email: item.email,
//                                               department: item.department_name,
//                                               referral_id: item.referral_id
//                                             },
//                                           });
//                                         }
//                                       }}
//                                     >
//                                       {item.is_scheduled ? "Scheduled" : "Schedule"}
//                                     </button>
//                                   ) : (
//                                     <select
//                                       className="form-select form-select-sm"
//                                       value={item.status || "scheduled"}
//                                       onChange={(e) =>
//                                         handleStatusChange(item.scheduled_meeting_id, e.target.value)
//                                       }
//                                       style={{ minWidth: '140px' }}
//                                     >
//                                       <option value="scheduled">Scheduled</option>
//                                       <option value="cancelled">Cancelled</option>
//                                       <option value="completed">Completed</option>
//                                     </select>
//                                   )}
//                                 </td>
//                                 <td>
//                                   {tabValue === 0 ? (
//                                     <button
//                                       className="btn btn-sm btn-danger"
//                                       onClick={(e) => {
//                                         e.stopPropagation();
//                                         deleteMeetingRequest(item.request_id);
//                                       }}
//                                       title="Delete"
//                                     >
//                                       <i className="fas fa-trash"></i>
//                                     </button>
//                                   ) : (
//                                     "—"
//                                   )}
//                                 </td>
//                               </tr>
//                             ))
//                           ) : (
//                             <tr>
//                               <td colSpan={tabValue === 0 ? 10 : 9} className="text-center py-4">
//                                 <div className="text-muted">
//                                   <i className="fas fa-inbox fa-2x mb-2"></i>
//                                   <p className="mb-0">No data available</p>
//                                 </div>
//                               </td>
//                             </tr>
//                           )}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {totalPages > 1 && (
//                 <div className="d-flex justify-content-between align-items-center mt-3">
//                   <div>
//                     <p className="text-muted mb-0">
//                       Page {page} of {totalPages} • Showing {tableData.length} items
//                     </p>
//                   </div>
//                   <nav aria-label="Page navigation">
//                     <ul className="pagination mb-0">
//                       <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
//                         <button 
//                           className="page-link" 
//                           onClick={() => handlePageChange(page - 1)}
//                           disabled={page === 1}
//                         >
//                           Previous
//                         </button>
//                       </li>
//                       {[...Array(totalPages)].map((_, index) => (
//                         <li key={index} className={`page-item ${page === index + 1 ? 'active' : ''}`}>
//                           <button 
//                             className="page-link" 
//                             onClick={() => handlePageChange(index + 1)}
//                           >
//                             {index + 1}
//                           </button>
//                         </li>
//                       ))}
//                       <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
//                         <button 
//                           className="page-link" 
//                           onClick={() => handlePageChange(page + 1)}
//                           disabled={page === totalPages}
//                         >
//                           Next
//                         </button>
//                       </li>
//                     </ul>
//                   </nav>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default MeetingRequests;






import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../Admin_Panel/Admin_Navbar/Admin_Navbar';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../BaseURL/BaseURL';
import Swal from 'sweetalert2';
import './MeetingRequests.css';

function MeetingRequests() {
  const [tabValue, setTabValue] = useState(0);
  const [meetingData, setMeetingData] = useState([]);
  const [scheduledData, setScheduledData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Pagination states for Meeting Requests
  const [currentPageMeeting, setCurrentPageMeeting] = useState(1);
  const [itemsPerPageMeeting, setItemsPerPageMeeting] = useState(5);
  const [totalItemsMeeting, setTotalItemsMeeting] = useState(0);

  // Pagination states for Scheduled Meetings
  const [currentPageScheduled, setCurrentPageScheduled] = useState(1);
  const [itemsPerPageScheduled, setItemsPerPageScheduled] = useState(5);
  const [totalItemsScheduled, setTotalItemsScheduled] = useState(0);

  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get(`${baseurl}/departments/`)
      .then(res => setDepartments(res.data.results || []))
      .catch(err => console.log("Departments fetch error:", err));
  }, []);

  // Fetch based on active tab and pagination
  useEffect(() => {
    if (tabValue === 0) {
      fetchMeetingRequests();
    } else {
      fetchScheduledMeetings();
    }
  }, [
    tabValue, 
    currentPageMeeting, 
    itemsPerPageMeeting, 
    currentPageScheduled, 
    itemsPerPageScheduled,
    searchQuery
  ]);

  const fetchMeetingRequests = async () => {
    setLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams({
        page: currentPageMeeting,
        page_size: itemsPerPageMeeting,
      });
      
      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }
      
      const response = await axios.get(`${baseurl}/meeting-requests/?${params.toString()}`);
      
      // Handle different response formats
      let data = [];
      let count = 0;
      
      if (Array.isArray(response.data)) {
        data = response.data;
        count = response.data.length;
      } else if (response.data.results) {
        data = response.data.results || [];
        count = response.data.count || data.length;
      } else {
        data = response.data;
        count = response.data.length || 0;
      }
      
      setMeetingData(data);
      setTotalItemsMeeting(count);
    } catch (error) {
      console.error('Error fetching meeting requests:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load meeting requests',
        confirmButtonColor: '#273c75'
      });
      setMeetingData([]);
      setTotalItemsMeeting(0);
    }
    setLoading(false);
  };

  const fetchScheduledMeetings = async () => {
    setLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams({
        page: currentPageScheduled,
        page_size: itemsPerPageScheduled,
      });
      
      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }
      
      const response = await axios.get(`${baseurl}/scheduled-meetings/?${params.toString()}`);
      
      // Handle different response formats
      let data = [];
      let count = 0;
      
      if (Array.isArray(response.data)) {
        data = response.data;
        count = response.data.length;
      } else if (response.data.results) {
        data = response.data.results || [];
        count = response.data.count || data.length;
      } else {
        data = response.data;
        count = response.data.length || 0;
      }
      
      setScheduledData(data);
      setTotalItemsScheduled(count);
    } catch (error) {
      console.error('Error fetching scheduled meetings:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load scheduled meetings',
        confirmButtonColor: '#273c75'
      });
      setScheduledData([]);
      setTotalItemsScheduled(0);
    }
    setLoading(false);
  };

  const deleteMeetingRequest = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This meeting request will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
      confirmButtonColor: '#d33',
      cancelButtonColor: '#273c75',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${baseurl}/meeting-requests/${id}/`)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Meeting request deleted successfully.",
              timer: 2000,
              showConfirmButton: false,
            });
            fetchMeetingRequests();
          })
          .catch((error) => {
            console.error("Delete error:", error);
            Swal.fire("Error", "Failed to delete. Try again.", "error");
          });
      }
    });
  };

  const handleStatusChange = (scheduleId, newStatus) => {
    const meeting = scheduledData.find(
      (item) => item.scheduled_meeting_id === scheduleId
    );

    if (!meeting) {
      Swal.fire({
        icon: "error",
        title: "Not Found",
        text: "Meeting not found",
      });
      return;
    }

    axios
      .put(`${baseurl}/scheduled-meetings/${scheduleId}/`, { status: newStatus })
      .then(() => {
        fetchScheduledMeetings();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Status updated successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.error("Error updating meeting status:", error);
        Swal.fire("Error", "Failed to update status. Try again.", "error");
      });
  };

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
    setSearchQuery(""); // Clear search when switching tabs
  };

  /* ================= PAGINATION FUNCTIONS ================= */
  // Get current pagination values based on active tab
  const getCurrentPaginationValues = () => {
    if (tabValue === 0) {
      return {
        currentPage: currentPageMeeting,
        totalPages: Math.ceil(totalItemsMeeting / itemsPerPageMeeting),
        startIndex: (currentPageMeeting - 1) * itemsPerPageMeeting + 1,
        itemsPerPage: itemsPerPageMeeting,
        totalItems: totalItemsMeeting,
        handlePageChange: (page) => setCurrentPageMeeting(page),
        handleItemsPerPageChange: (e) => {
          const value = parseInt(e.target.value);
          setItemsPerPageMeeting(value);
          setCurrentPageMeeting(1);
        }
      };
    } else {
      return {
        currentPage: currentPageScheduled,
        totalPages: Math.ceil(totalItemsScheduled / itemsPerPageScheduled),
        startIndex: (currentPageScheduled - 1) * itemsPerPageScheduled + 1,
        itemsPerPage: itemsPerPageScheduled,
        totalItems: totalItemsScheduled,
        handlePageChange: (page) => setCurrentPageScheduled(page),
        handleItemsPerPageChange: (e) => {
          const value = parseInt(e.target.value);
          setItemsPerPageScheduled(value);
          setCurrentPageScheduled(1);
        }
      };
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = (totalPages, currentPage) => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  /* ================= PAGINATION COMPONENT ================= */
  const PaginationControls = () => {
    const {
      currentPage,
      totalPages,
      startIndex,
      itemsPerPage,
      totalItems,
      handlePageChange,
      handleItemsPerPageChange
    } = getCurrentPaginationValues();
    
    if (totalItems <= 0) return null;
    
    const pageNumbers = getPageNumbers(totalPages, currentPage);
    
    return (
      <div className="pagination-container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        borderTop: '1px solid #eee',
        backgroundColor: '#f8f9fa'
      }}>
        {/* Items per page selector */}
        <div className="items-per-page" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', color: '#666' }}>Show:</span>
          <select 
            value={itemsPerPage} 
            onChange={handleItemsPerPageChange}
            style={{
              padding: '6px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span style={{ fontSize: '14px', color: '#666' }}>
            of {totalItems} items
          </span>
        </div>
        
        {/* Page navigation */}
        <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* First Page */}
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            style={{
              padding: '6px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: currentPage === 1 ? '#f8f9fa' : 'white',
              color: currentPage === 1 ? '#ccc' : '#333',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            ««
          </button>
          
          {/* Previous Page */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: '6px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: currentPage === 1 ? '#f8f9fa' : 'white',
              color: currentPage === 1 ? '#ccc' : '#333',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            «
          </button>
          
          {/* Page Numbers */}
          {pageNumbers.map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              style={{
                padding: '6px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: currentPage === page ? '#273c75' : 'white',
                color: currentPage === page ? 'white' : '#333',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: currentPage === page ? 'bold' : 'normal'
              }}
            >
              {page}
            </button>
          ))}
          
          {/* Next Page */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: '6px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: currentPage === totalPages ? '#f8f9fa' : 'white',
              color: currentPage === totalPages ? '#ccc' : '#333',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            »
          </button>
          
          {/* Last Page */}
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            style={{
              padding: '6px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: currentPage === totalPages ? '#f8f9fa' : 'white',
              color: currentPage === totalPages ? '#ccc' : '#333',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            »»
          </button>
        </div>
        
        {/* Current page info */}
        <div className="page-info" style={{ fontSize: '14px', color: '#666' }}>
          Page {currentPage} of {totalPages}
        </div>
      </div>
    );
  };

  /* ================= HANDLE SEARCH ================= */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Reset to first page for both tabs
    setCurrentPageMeeting(1);
    setCurrentPageScheduled(1);
  };

  // Get table data for current tab
  const getTableData = () => {
    const source = tabValue === 0 ? meetingData : scheduledData;
    
    if (!Array.isArray(source)) {
      console.error('Source is not an array:', source);
      return [];
    }
    
    return source.map((item) => {
      const isScheduled = item.is_scheduled || false;
      
      // Find department name
      const departmentName = departments.find(
        (d) => d.id === parseInt(item.department)
      )?.name || "N/A";

      return {
        id: item.request_id || item.scheduled_meeting_id || item.id,
        user_id: item.user_id || 'N/A',
        name: item.name || 'N/A',
        referral_id: item.referral_id || 'N/A',
        email: item.email || 'N/A',
        department_name: departmentName,
        date: item.requested_date || item.scheduled_date || 'N/A',
        time: item.requested_time || item.scheduled_time || 'N/A',
        is_scheduled: isScheduled,
        status: item.status || 'scheduled',
        scheduled_meeting_id: item.scheduled_meeting_id || item.id,
        request_id: item.request_id || item.id
      };
    });
  };

  const tableData = getTableData();
  const { startIndex } = getCurrentPaginationValues();

  return (
    <>
      <Header />
      
      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <h2>Meeting Requests</h2>
          <div className="total-count">
            Total {tabValue === 0 ? 'Meeting Requests' : 'Scheduled Meetings'}: {getCurrentPaginationValues().totalItems}
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container" style={{ marginBottom: '20px' }}>
          <div className="tabs" style={{ 
            display: 'flex', 
            borderBottom: '2px solid #e0e0e0',
            gap: '0'
          }}>
            <button
              className={`tab-button ${tabValue === 0 ? 'active' : ''}`}
              onClick={() => handleTabChange(0)}
              style={{
                padding: '12px 24px',
                background: tabValue === 0 ? '#273c75' : 'transparent',
                color: tabValue === 0 ? 'white' : '#666',
                border: 'none',
                borderBottom: tabValue === 0 ? '2px solid #273c75' : '2px solid transparent',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '6px 6px 0 0',
                transition: 'all 0.3s'
              }}
            >
              Meeting Requests
            </button>
            <button
              className={`tab-button ${tabValue === 1 ? 'active' : ''}`}
              onClick={() => handleTabChange(1)}
              style={{
                padding: '12px 24px',
                background: tabValue === 1 ? '#273c75' : 'transparent',
                color: tabValue === 1 ? 'white' : '#666',
                border: 'none',
                borderBottom: tabValue === 1 ? '2px solid #273c75' : '2px solid transparent',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '6px 6px 0 0',
                transition: 'all 0.3s'
              }}
            >
              Scheduled Meetings
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="page-toolbar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name, email, referral ID..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {/* Table */}
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                {tabValue === 0 && <th>S.No.</th>}
                {tabValue === 0 && <th>Request ID</th>}
                <th>User ID</th>
                <th>Team Name</th>
                <th>Team Referral ID</th>
                <th>Email</th>
                <th>Department</th>
                <th>{tabValue === 0 ? "Requested Date" : "Scheduled Date"}</th>
                <th>{tabValue === 0 ? "Requested Time" : "Scheduled Time"}</th>
                <th>Schedule</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={tabValue === 0 ? 11 : 10} className="no-data">
                    Loading...
                  </td>
                </tr>
              ) : tableData.length > 0 ? (
                tableData.map((item, index) => (
                  <tr key={`${item.id}-${index}`}>
                    {tabValue === 0 && <td>{startIndex + index}</td>}
                    {tabValue === 0 && <td>{item.id}</td>}
                    <td>{item.user_id}</td>
                    <td className="name-cell">{item.name}</td>
                    <td>{item.referral_id}</td>
                    <td className="email-cell">{item.email}</td>
                    <td>
                      <span className="department-badge">
                        {item.department_name}
                      </span>
                    </td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>
                      {tabValue === 0 ? (
                        <button
                          className={`schedule-btn ${item.is_scheduled ? 'disabled' : 'primary-btn'}`}
                          style={{
                            backgroundColor: item.is_scheduled ? '#ccc' : '#273c75',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            cursor: item.is_scheduled ? 'not-allowed' : 'pointer',
                            fontSize: '13px',
                            opacity: item.is_scheduled ? 0.6 : 1
                          }}
                          disabled={item.is_scheduled}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!item.is_scheduled) {
                              navigate(`/shedulemeet/${item.user_id}`, {
                                state: { 
                                  request_id: item.request_id,
                                  name: item.name,
                                  email: item.email,
                                  department: item.department_name,
                                  referral_id: item.referral_id
                                },
                              });
                            }
                          }}
                        >
                          {item.is_scheduled ? "Scheduled" : "Schedule"}
                        </button>
                      ) : (
                        <select
                          className="status-select"
                          value={item.status || "scheduled"}
                          onChange={(e) =>
                            handleStatusChange(item.scheduled_meeting_id, e.target.value)
                          }
                          style={{
                            padding: '6px 12px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '13px',
                            minWidth: '120px'
                          }}
                        >
                          <option value="scheduled">Scheduled</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="completed">Completed</option>
                        </select>
                      )}
                    </td>
                    <td className="actions">
                      {tabValue === 0 ? (
                        <button 
                          className="delete-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMeetingRequest(item.request_id);
                          }}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={tabValue === 0 ? 11 : 10} className="no-data">
                    No {tabValue === 0 ? 'meeting requests' : 'scheduled meetings'} found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {/* Pagination Controls */}
          <PaginationControls />
        </div>
      </div>
    </>
  );
}

export default MeetingRequests;