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

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [departments, setDepartments] = useState([]);
  const [totalPagesMeeting, setTotalPagesMeeting] = useState(1);
  const [totalPagesScheduled, setTotalPagesScheduled] = useState(1);

  useEffect(() => {
    axios.get(`${baseurl}/departments/`)
      .then(res => setDepartments(res.data.results || []))
      .catch(err => console.log("Departments fetch error:", err));
  }, []);

  useEffect(() => {
    fetchMeetingRequests();
  }, []);

  const fetchMeetingRequests = () => {
    setLoading(true);
    axios
      .get(`${baseurl}/meeting-requests/`)
      .then((response) => {
        // Handle paginated response
        const data = response.data.results || response.data || [];
        setMeetingData(Array.isArray(data) ? data : []);
        setTotalPagesMeeting(Math.ceil((response.data.count || data.length) / itemsPerPage));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching meeting requests:', error);
        setMeetingData([]);
        setLoading(false);
      });
  };

  const fetchScheduledMeetings = () => {
    setLoading(true);
    axios
      .get(`${baseurl}/scheduled-meetings/`)
      .then((response) => {
        // Handle paginated response
        const data = response.data.results || response.data || [];
        setScheduledData(Array.isArray(data) ? data : []);
        setTotalPagesScheduled(Math.ceil((response.data.count || data.length) / itemsPerPage));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching scheduled meetings:', error);
        setScheduledData([]);
        setLoading(false);
      });
  };

  const deleteMeetingRequest = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This meeting request will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
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
    setPage(1);

    if (newValue === 0) fetchMeetingRequests();
    else fetchScheduledMeetings();
  };

  const getTableData = () => {
    // Ensure we're working with arrays
    const source = tabValue === 0 ? meetingData : scheduledData;
    
    // Check if source is an array
    if (!Array.isArray(source)) {
      console.error('Source is not an array:', source);
      return [];
    }
    
    // Handle pagination
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = source.slice(startIndex, endIndex);

    return paginatedData.map((item) => {
      const isScheduled = item.is_scheduled || false;
      
      // Find department name
      const departmentName = departments.find(
        (d) => d.id === parseInt(item.department)
      )?.name || "N/A";

      return {
        id: item.request_id || item.schedule_id || item.id,
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

  const totalPages = tabValue === 0 ? totalPagesMeeting : totalPagesScheduled;

  const handlePageChange = (value) => {
    setPage(value);
  };

  const tableData = getTableData();

  return (
    <>
      <Header />
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="meeting-requests-container">
              <div className="text-center mb-4">
                <ul className="nav nav-tabs justify-content-center" id="meetingTabs" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${tabValue === 0 ? 'active' : ''}`}
                      onClick={() => handleTabChange(0)}
                      type="button"
                    >
                      Meeting Requests
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${tabValue === 1 ? 'active' : ''}`}
                      onClick={() => handleTabChange(1)}
                      type="button"
                    >
                      Scheduled Meetings
                    </button>
                  </li>
                </ul>
              </div>

              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">
                    {tabValue === 0 ? "Meeting Requests" : "Scheduled Meetings"}
                    <span className="badge bg-light text-dark ms-2">
                      {tabValue === 0 ? meetingData.length : scheduledData.length} items
                    </span>
                  </h5>
                </div>
                <div className="card-body p-0">
                  {loading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="mt-2">Loading data...</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
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
                          {tableData.length > 0 ? (
                            tableData.map((item, index) => (
                              <tr key={`${item.id}-${index}`}>
                                {tabValue === 0 && <td>{item.id}</td>}
                                <td>{item.user_id}</td>
                                <td>{item.name}</td>
                                <td>{item.referral_id}</td>
                                <td>{item.email}</td>
                                <td>{item.department_name}</td>
                                <td>{item.date}</td>
                                <td>{item.time}</td>
                                <td>
                                  {tabValue === 0 ? (
                                    <button
                                      className={`btn btn-sm ${item.is_scheduled ? 'btn-outline-secondary' : 'btn-primary'}`}
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
                                      className="form-select form-select-sm"
                                      value={item.status || "scheduled"}
                                      onChange={(e) =>
                                        handleStatusChange(item.scheduled_meeting_id, e.target.value)
                                      }
                                      style={{ minWidth: '140px' }}
                                    >
                                      <option value="scheduled">Scheduled</option>
                                      <option value="cancelled">Cancelled</option>
                                      <option value="completed">Completed</option>
                                    </select>
                                  )}
                                </td>
                                <td>
                                  {tabValue === 0 ? (
                                    <button
                                      className="btn btn-sm btn-danger"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteMeetingRequest(item.request_id);
                                      }}
                                      title="Delete"
                                    >
                                      <i className="fas fa-trash"></i>
                                    </button>
                                  ) : (
                                    "—"
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={tabValue === 0 ? 10 : 9} className="text-center py-4">
                                <div className="text-muted">
                                  <i className="fas fa-inbox fa-2x mb-2"></i>
                                  <p className="mb-0">No data available</p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    <p className="text-muted mb-0">
                      Page {page} of {totalPages} • Showing {tableData.length} items
                    </p>
                  </div>
                  <nav aria-label="Page navigation">
                    <ul className="pagination mb-0">
                      <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => handlePageChange(page - 1)}
                          disabled={page === 1}
                        >
                          Previous
                        </button>
                      </li>
                      {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`page-item ${page === index + 1 ? 'active' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => handlePageChange(page + 1)}
                          disabled={page === totalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MeetingRequests;