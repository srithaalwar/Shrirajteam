// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL';
// import './DisplayRequests.css';

// function DisplayRequests() {
//     const [data, setData] = useState([]);
//     const [page, setPage] = useState(1);
//     const rowsPerPage = 8;
//     const [loading, setLoading] = useState(true);
//     const [departments, setDepartments] = useState([]);

//     const userId = localStorage.getItem("user_id");

//     // Fetch departments
//     useEffect(() => {
//         axios.get(`${baseurl}/departments/`)
//             .then(res => setDepartments(res.data))
//             .catch(err => console.log("Departments fetch error:", err));
//     }, []);

//     // Fetch meeting requests
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`${baseurl}/meeting-requests/user-id/${userId}/`);
//                 setData(response.data);
//             } catch (error) {
//                 console.error('Error fetching meeting requests:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [userId]);

//     // DELETE handler
//     const handleDelete = async (id) => {
//         if (!window.confirm('Are you sure you want to delete this meeting request?')) {
//             return;
//         }

//         try {
//             await axios.delete(`${baseurl}/meeting-requests/${id}/`);

//             const updated = data.filter(item => item.request_id !== id);
//             setData(updated);

//             // Adjust page if needed
//             const totalPages = Math.ceil(updated.length / rowsPerPage);
//             if (page > totalPages) {
//                 setPage(totalPages === 0 ? 1 : totalPages);
//             }

//         } catch (error) {
//             console.error("Delete error:", error);
//             alert('Failed to delete meeting request. Please try again.');
//         }
//     };

//     // Process data with department name and action button
//     const processedData = data.map(item => ({
//         ...item,
//         department_name: departments.find(d => d.id === Number(item.department))?.name || "N/A",
//         actions: (
//             <button 
//                 className="btn btn-sm btn-outline-danger"
//                 onClick={() => handleDelete(item.request_id)}
//             >
//                 <i className="bi bi-trash"></i> Delete
//             </button>
//         )
//     }));

//     // Pagination
//     const paginatedData = processedData.slice(
//         (page - 1) * rowsPerPage,
//         page * rowsPerPage
//     );

//     const headers = [
//         { key: 'request_id', label: 'Request ID' },
//         { key: 'name', label: 'Name' },
//         { key: 'email', label: 'Email' },
//         { key: 'department_name', label: 'Department' },
//         { key: 'requested_date', label: 'Requested Date' },
//         { key: 'requested_time', label: 'Requested Time' },
//         { key: 'actions', label: 'Actions' },
//     ];

//     const totalPages = Math.ceil(processedData.length / rowsPerPage);

//     const handlePageChange = (newPage) => {
//         setPage(newPage);
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };

//     return (
//         <>
//             <AgentNavbar />
//             <div className="container-fluid display-requests-container">
//                 <div className="row">
//                     <div className="col-12">
//                         <div className="card shadow-sm border-0 mb-4">
//                             <div className="card-body">
//                                 <h5 className="card-title mb-4">Meeting Requests</h5>
//                                 {loading ? (
//                                     <div className="text-center py-5">
//                                         <div className="spinner-border text-primary" role="status">
//                                             <span className="visually-hidden">Loading...</span>
//                                         </div>
//                                         <p className="mt-2">Loading meeting requests...</p>
//                                     </div>
//                                 ) : processedData.length === 0 ? (
//                                     <div className="text-center py-5">
//                                         <i className="bi bi-calendar-x display-1 text-muted"></i>
//                                         <p className="mt-3">No meeting requests found.</p>
//                                     </div>
//                                 ) : (
//                                     <>
//                                         <div className="table-responsive">
//                                             <table className="table table-hover">
//                                                 <thead className="table-light">
//                                                     <tr>
//                                                         {headers.map(header => (
//                                                             <th key={header.key}>{header.label}</th>
//                                                         ))}
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                     {paginatedData.map((item) => (
//                                                         <tr key={item.request_id}>
//                                                             <td>{item.request_id}</td>
//                                                             <td>{item.name}</td>
//                                                             <td>{item.email}</td>
//                                                             <td>{item.department_name}</td>
//                                                             <td>{new Date(item.requested_date).toLocaleDateString()}</td>
//                                                             <td>{item.requested_time}</td>
//                                                             <td>{item.actions}</td>
//                                                         </tr>
//                                                     ))}
//                                                 </tbody>
//                                             </table>
//                                         </div>

//                                         {/* Pagination */}
//                                         {totalPages > 1 && (
//                                             <nav aria-label="Page navigation" className="d-flex justify-content-end mt-3">
//                                                 <ul className="pagination">
//                                                     <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
//                                                         <button 
//                                                             className="page-link" 
//                                                             onClick={() => handlePageChange(page - 1)}
//                                                             disabled={page === 1}
//                                                         >
//                                                             Previous
//                                                         </button>
//                                                     </li>
                                                    
//                                                     {[...Array(totalPages)].map((_, index) => {
//                                                         const pageNumber = index + 1;
//                                                         // Show limited page numbers
//                                                         if (
//                                                             pageNumber === 1 || 
//                                                             pageNumber === totalPages || 
//                                                             (pageNumber >= page - 1 && pageNumber <= page + 1)
//                                                         ) {
//                                                             return (
//                                                                 <li 
//                                                                     key={pageNumber} 
//                                                                     className={`page-item ${page === pageNumber ? 'active' : ''}`}
//                                                                 >
//                                                                     <button 
//                                                                         className="page-link" 
//                                                                         onClick={() => handlePageChange(pageNumber)}
//                                                                     >
//                                                                         {pageNumber}
//                                                                     </button>
//                                                                 </li>
//                                                             );
//                                                         }
//                                                         // Show ellipsis
//                                                         if (
//                                                             (pageNumber === 2 && page > 3) ||
//                                                             (pageNumber === totalPages - 1 && page < totalPages - 2)
//                                                         ) {
//                                                             return (
//                                                                 <li key={`ellipsis-${pageNumber}`} className="page-item disabled">
//                                                                     <span className="page-link">...</span>
//                                                                 </li>
//                                                             );
//                                                         }
//                                                         return null;
//                                                     })}
                                                    
//                                                     <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
//                                                         <button 
//                                                             className="page-link" 
//                                                             onClick={() => handlePageChange(page + 1)}
//                                                             disabled={page === totalPages}
//                                                         >
//                                                             Next
//                                                         </button>
//                                                     </li>
//                                                 </ul>
//                                             </nav>
//                                         )}
//                                     </>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default DisplayRequests;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
 import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
 import { baseurl } from '../../BaseURL/BaseURL';
import './DisplayRequests.css';

function DisplayRequests() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const rowsPerPage = 8;
    const [loading, setLoading] = useState(true);
    const [departments, setDepartments] = useState([]);
    const [error, setError] = useState(null);

    const userId = localStorage.getItem("user_id");

    // Fetch departments
    useEffect(() => {
        axios.get(`${baseurl}/departments/`)
            .then(res => {
                // Handle paginated response
                const deptData = res.data.results || res.data;
                setDepartments(Array.isArray(deptData) ? deptData : []);
            })
            .catch(err => {
                console.log("Departments fetch error:", err);
                setDepartments([]);
            });
    }, []);

    // Fetch meeting requests
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(`${baseurl}/meeting-requests/?user=${userId}`);
                
                // Handle paginated response
                const responseData = response.data.results || response.data;
                setData(Array.isArray(responseData) ? responseData : []);
            } catch (error) {
                console.error('Error fetching meeting requests:', error);
                setError('Failed to load meeting requests. Please try again.');
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    // DELETE handler
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this meeting request?')) {
            return;
        }

        try {
            await axios.delete(`${baseurl}/meeting-requests/${id}/`);

            const updated = data.filter(item => item.request_id !== id);
            setData(updated);

            // Adjust page if needed
            const totalPages = Math.ceil(updated.length / rowsPerPage);
            if (page > totalPages) {
                setPage(totalPages === 0 ? 1 : totalPages);
            }

            // Show success message
            alert('Meeting request deleted successfully!');
        } catch (error) {
            console.error("Delete error:", error);
            alert('Failed to delete meeting request. Please try again.');
        }
    };

    // Format date to readable format
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            // Handle DD-MM-YYYY format
            const [day, month, year] = dateString.split('-');
            return new Date(`${year}-${month}-${day}`).toLocaleDateString();
        } catch {
            return dateString;
        }
    };

    // Process data with department name and action button
    const processedData = data.map(item => ({
        ...item,
        department_name: departments.find(d => d.id === Number(item.department))?.name || "N/A",
        formatted_date: formatDate(item.requested_date),
        actions: (
            <button 
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDelete(item.request_id)}
            >
                <i className="bi bi-trash"></i> Delete
            </button>
        )
    }));

    // Pagination
    const paginatedData = processedData.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const totalPages = Math.ceil(processedData.length / rowsPerPage);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {/* <AgentNavbar /> */}
            <div className="container-fluid display-requests-container">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow-sm border-0 mb-4">
                            <div className="card-body">
                                <h5 className="card-title mb-4">Meeting Requests</h5>
                                
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}

                                {loading ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p className="mt-2">Loading meeting requests...</p>
                                    </div>
                                ) : processedData.length === 0 ? (
                                    <div className="text-center py-5">
                                        <i className="bi bi-calendar-x display-1 text-muted"></i>
                                        <p className="mt-3">No meeting requests found.</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>Request ID</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Department</th>
                                                        <th>Requested Date</th>
                                                        <th>Requested Time</th>
                                                        <th>Status</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {paginatedData.map((item) => (
                                                        <tr key={item.request_id}>
                                                            <td>{item.request_id}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.department_name}</td>
                                                            <td>{item.formatted_date}</td>
                                                            <td>{item.requested_time}</td>
                                                            <td>
                                                                <span className={`badge ${item.is_scheduled ? 'bg-success' : 'bg-warning'}`}>
                                                                    {item.is_scheduled ? 'Scheduled' : 'Pending'}
                                                                </span>
                                                            </td>
                                                            <td>{item.actions}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Pagination */}
                                        {totalPages > 1 && (
                                            <nav aria-label="Page navigation" className="d-flex justify-content-end mt-3">
                                                <ul className="pagination">
                                                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                                        <button 
                                                            className="page-link" 
                                                            onClick={() => handlePageChange(page - 1)}
                                                            disabled={page === 1}
                                                        >
                                                            Previous
                                                        </button>
                                                    </li>
                                                    
                                                    {[...Array(totalPages)].map((_, index) => {
                                                        const pageNumber = index + 1;
                                                        // Show limited page numbers
                                                        if (
                                                            pageNumber === 1 || 
                                                            pageNumber === totalPages || 
                                                            (pageNumber >= page - 1 && pageNumber <= page + 1)
                                                        ) {
                                                            return (
                                                                <li 
                                                                    key={pageNumber} 
                                                                    className={`page-item ${page === pageNumber ? 'active' : ''}`}
                                                                >
                                                                    <button 
                                                                        className="page-link" 
                                                                        onClick={() => handlePageChange(pageNumber)}
                                                                    >
                                                                        {pageNumber}
                                                                    </button>
                                                                </li>
                                                            );
                                                        }
                                                        // Show ellipsis
                                                        if (
                                                            (pageNumber === 2 && page > 3) ||
                                                            (pageNumber === totalPages - 1 && page < totalPages - 2)
                                                        ) {
                                                            return (
                                                                <li key={`ellipsis-${pageNumber}`} className="page-item disabled">
                                                                    <span className="page-link">...</span>
                                                                </li>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                    
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
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DisplayRequests;