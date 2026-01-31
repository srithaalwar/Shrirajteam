// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import DisplayRequest from './DisplayRequests';
// import axios from 'axios';
// import { baseurl } from '../../BaseURL/BaseURL';
// import './Meetings.css';

// function Meetings() {
//     const navigate = useNavigate();
//     const [subscriptionPaid, setSubscriptionPaid] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [departments, setDepartments] = useState([]);
//     const userId = localStorage.getItem("user_id");
//     const [page, setPage] = useState(1);
//     const cardsPerPage = 10;
    
//     const paginatedDepartments = departments.slice(
//         (page - 1) * cardsPerPage,
//         page * cardsPerPage
//     );
    
//     const totalPages = Math.ceil(departments.length / cardsPerPage);

//     // Fetch Subscription Status
//     useEffect(() => {
//         if (userId) {
//             axios.get(`${baseurl}/user-subscriptions/user-id/${userId}/`)
//                 .then(response => {
//                     const latest = response.data.find(item => item.latest_status !== undefined);
//                     setSubscriptionPaid(latest?.latest_status === "paid");
//                 })
//                 .catch(error => {
//                     console.error("Subscription fetch error:", error);
//                 });
//         }
//     }, [userId]);

//     // Fetch Departments API
//     useEffect(() => {
//         axios.get(`${baseurl}/departments/`)
//             .then(res => {
//                 setDepartments(res.data);
//             })
//             .catch(err => console.log("Departments fetch error:", err));
//     }, []);

//     const handleRequestMeeting = (departmentName, id) => {
//         if (subscriptionPaid) {
//             navigate("/p-meetingrequest", {
//                 state: { profileType: departmentName, departmentId: id },
//             });
//         } else {
//             setShowModal(true);
//         }
//     };

//     const handleCloseModal = () => setShowModal(false);
//     const handleSubscribe = () => navigate('/p-plans');

//     const handlePageChange = (newPage) => {
//         setPage(newPage);
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };

//     return (
//         <>
//             <AgentNavbar />
//             <div className="container-fluid meetings-container">
//                 <div className="row justify-content-center g-4">
//                     {/* Dynamic Cards */}
//                     {paginatedDepartments.map((dept) => (
//                         <div className="col-6 col-sm-4 col-md-3 col-lg-2-4" key={dept.id}>
//                             <div className="department-card">
//                                 <div className="card-body text-center">
//                                     <h6 className="department-name">{dept.name}</h6>
//                                     <div className="department-avatar">
//                                         <img 
//                                             src="/images/coach.png" 
//                                             alt={dept.name}
//                                             className="avatar-img"
//                                         />
//                                     </div>
//                                     <button
//                                         className="btn request-btn"
//                                         onClick={() => handleRequestMeeting(dept.name, dept.id)}
//                                     >
//                                         Request Meeting
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                     <div className="row mt-4">
//                         <div className="col-12">
//                             <nav aria-label="Page navigation" className="d-flex justify-content-end">
//                                 <ul className="pagination">
//                                     <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
//                                         <button 
//                                             className="page-link" 
//                                             onClick={() => handlePageChange(page - 1)}
//                                             disabled={page === 1}
//                                         >
//                                             Previous
//                                         </button>
//                                     </li>
                                    
//                                     {[...Array(totalPages)].map((_, index) => {
//                                         const pageNumber = index + 1;
//                                         // Show first page, last page, current page, and pages around current
//                                         if (
//                                             pageNumber === 1 || 
//                                             pageNumber === totalPages || 
//                                             (pageNumber >= page - 1 && pageNumber <= page + 1)
//                                         ) {
//                                             return (
//                                                 <li 
//                                                     key={pageNumber} 
//                                                     className={`page-item ${page === pageNumber ? 'active' : ''}`}
//                                                 >
//                                                     <button 
//                                                         className="page-link" 
//                                                         onClick={() => handlePageChange(pageNumber)}
//                                                     >
//                                                         {pageNumber}
//                                                     </button>
//                                                 </li>
//                                             );
//                                         }
//                                         // Show ellipsis for skipped pages
//                                         if (
//                                             (pageNumber === 2 && page > 3) ||
//                                             (pageNumber === totalPages - 1 && page < totalPages - 2)
//                                         ) {
//                                             return (
//                                                 <li key={`ellipsis-${pageNumber}`} className="page-item disabled">
//                                                     <span className="page-link">...</span>
//                                                 </li>
//                                             );
//                                         }
//                                         return null;
//                                     })}
                                    
//                                     <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
//                                         <button 
//                                             className="page-link" 
//                                             onClick={() => handlePageChange(page + 1)}
//                                             disabled={page === totalPages}
//                                         >
//                                             Next
//                                         </button>
//                                     </li>
//                                 </ul>
//                             </nav>
//                         </div>
//                     </div>
//                 )}
                
//                 <DisplayRequest />

//                 {/* Subscription Modal */}
//                 <div 
//                     className={`modal fade ${showModal ? 'show' : ''}`} 
//                     style={{ display: showModal ? 'block' : 'none' }}
//                     tabIndex="-1"
//                 >
//                     <div className="modal-dialog modal-dialog-centered">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Subscription Required</h5>
//                                 <button 
//                                     type="button" 
//                                     className="btn-close" 
//                                     onClick={handleCloseModal}
//                                 ></button>
//                             </div>
//                             <div className="modal-body">
//                                 <p>
//                                     You need an active subscription to <strong>request meetings</strong>.
//                                 </p>
//                             </div>
//                             <div className="modal-footer">
//                                 <button 
//                                     type="button" 
//                                     className="btn btn-outline-secondary" 
//                                     onClick={handleCloseModal}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button 
//                                     type="button" 
//                                     className="btn btn-primary"
//                                     onClick={handleSubscribe}
//                                 >
//                                     Subscribe Now
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
                
//                 {showModal && <div className="modal-backdrop fade show"></div>}
//             </div>
//         </>
//     );
// }

// export default Meetings;




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
//  import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
//  import DisplayRequest from './DisplayRequests';
// import axios from 'axios';
// import { baseurl } from '../../BaseURL/BaseURL';
// import './Meetings.css';

// function Meetings() {
//     const navigate = useNavigate();
//     const [subscriptionPaid, setSubscriptionPaid] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [departments, setDepartments] = useState([]);
//     const [loadingDepartments, setLoadingDepartments] = useState(true);
//     const userId = localStorage.getItem("user_id");
//     const [page, setPage] = useState(1);
//     const cardsPerPage = 10;
    
//     const paginatedDepartments = departments.slice(
//         (page - 1) * cardsPerPage,
//         page * cardsPerPage
//     );
    
//     const totalPages = Math.ceil(departments.length / cardsPerPage);

//     // Fetch Subscription Status
//     useEffect(() => {
//         if (userId) {
//             axios.get(`${baseurl}/user-subscriptions/user-id/${userId}/`)
//                 .then(response => {
//                     const latest = response.data.find(item => item.latest_status !== undefined);
//                     setSubscriptionPaid(latest?.latest_status === "paid");
//                 })
//                 .catch(error => {
//                     console.error("Subscription fetch error:", error);
//                 });
//         }
//     }, [userId]);

//     // Fetch Departments API
//     useEffect(() => {
//         setLoadingDepartments(true);
//         axios.get(`${baseurl}/departments/`)
//             .then(res => {
//                 // Handle both paginated and non-paginated responses
//                 const data = res.data.results || res.data;
//                 setDepartments(Array.isArray(data) ? data : []);
//             })
//             .catch(err => {
//                 console.log("Departments fetch error:", err);
//                 setDepartments([]);
//             })
//             .finally(() => {
//                 setLoadingDepartments(false);
//             });
//     }, []);

//     const handleRequestMeeting = (departmentName, id) => {
//         if (subscriptionPaid) {
//             navigate("/p-meetingrequest", {
//                 state: { profileType: departmentName, departmentId: id },
//             });
//         } else {
//             setShowModal(true);
//         }
//     };

//     const handleCloseModal = () => setShowModal(false);
//     const handleSubscribe = () => navigate('/p-plans');

//     const handlePageChange = (newPage) => {
//         setPage(newPage);
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };

//     return (
//         <>
//             <AgentNavbar />
//             <div className="container-fluid meetings-container">
//                 {loadingDepartments ? (
//                     <div className="text-center py-5">
//                         <div className="spinner-border text-primary" role="status">
//                             <span className="visually-hidden">Loading...</span>
//                         </div>
//                         <p className="mt-2">Loading departments...</p>
//                     </div>
//                 ) : (
//                     <>
//                         <div className="row justify-content-center g-4">
//                             {/* Dynamic Cards */}
//                             {paginatedDepartments.map((dept) => (
//                                 <div className="col-6 col-sm-4 col-md-3 col-lg-2-4" key={dept.id}>
//                                     <div className="department-card">
//                                         <div className="card-body text-center">
//                                             <h6 className="department-name">{dept.name}</h6>
//                                             <div className="department-avatar">
//                                                 <img 
//                                                     src="/images/coach.png" 
//                                                     alt={dept.name}
//                                                     className="avatar-img"
//                                                 />
//                                             </div>
//                                             <button
//                                                 className="btn request-btn"
//                                                 onClick={() => handleRequestMeeting(dept.name, dept.id)}
//                                             >
//                                                 Request Meeting
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Pagination */}
//                         {totalPages > 1 && (
//                             <div className="row mt-4">
//                                 <div className="col-12">
//                                     <nav aria-label="Page navigation" className="d-flex justify-content-end">
//                                         <ul className="pagination">
//                                             <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
//                                                 <button 
//                                                     className="page-link" 
//                                                     onClick={() => handlePageChange(page - 1)}
//                                                     disabled={page === 1}
//                                                 >
//                                                     Previous
//                                                 </button>
//                                             </li>
                                            
//                                             {[...Array(totalPages)].map((_, index) => {
//                                                 const pageNumber = index + 1;
//                                                 // Show first page, last page, current page, and pages around current
//                                                 if (
//                                                     pageNumber === 1 || 
//                                                     pageNumber === totalPages || 
//                                                     (pageNumber >= page - 1 && pageNumber <= page + 1)
//                                                 ) {
//                                                     return (
//                                                         <li 
//                                                             key={pageNumber} 
//                                                             className={`page-item ${page === pageNumber ? 'active' : ''}`}
//                                                         >
//                                                             <button 
//                                                                 className="page-link" 
//                                                                 onClick={() => handlePageChange(pageNumber)}
//                                                             >
//                                                                 {pageNumber}
//                                                             </button>
//                                                         </li>
//                                                     );
//                                                 }
//                                                 // Show ellipsis for skipped pages
//                                                 if (
//                                                     (pageNumber === 2 && page > 3) ||
//                                                     (pageNumber === totalPages - 1 && page < totalPages - 2)
//                                                 ) {
//                                                     return (
//                                                         <li key={`ellipsis-${pageNumber}`} className="page-item disabled">
//                                                             <span className="page-link">...</span>
//                                                         </li>
//                                                     );
//                                                 }
//                                                 return null;
//                                             })}
                                            
//                                             <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
//                                                 <button 
//                                                     className="page-link" 
//                                                     onClick={() => handlePageChange(page + 1)}
//                                                     disabled={page === totalPages}
//                                                 >
//                                                     Next
//                                                 </button>
//                                             </li>
//                                         </ul>
//                                     </nav>
//                                 </div>
//                             </div>
//                         )}
//                     </>
//                 )}
                
//                 <DisplayRequest />

//                 {/* Subscription Modal */}
//                 <div 
//                     className={`modal fade ${showModal ? 'show' : ''}`} 
//                     style={{ display: showModal ? 'block' : 'none' }}
//                     tabIndex="-1"
//                 >
//                     <div className="modal-dialog modal-dialog-centered">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Subscription Required</h5>
//                                 <button 
//                                     type="button" 
//                                     className="btn-close" 
//                                     onClick={handleCloseModal}
//                                 ></button>
//                             </div>
//                             <div className="modal-body">
//                                 <p>
//                                     You need an active subscription to <strong>request meetings</strong>.
//                                 </p>
//                             </div>
//                             <div className="modal-footer">
//                                 <button 
//                                     type="button" 
//                                     className="btn btn-outline-secondary" 
//                                     onClick={handleCloseModal}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button 
//                                     type="button" 
//                                     className="btn btn-primary"
//                                     onClick={handleSubscribe}
//                                 >
//                                     Subscribe Now
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
                
//                 {showModal && <div className="modal-backdrop fade show"></div>}
//             </div>
//         </>
//     );
// }

// export default Meetings;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientNavbar from "../../Client_Panel/Client_Navbar/Client_Navbar";
import DisplayRequest from './DisplayRequests';
import axios from 'axios';
import { baseurl } from '../../BaseURL/BaseURL';
import './Meetings.css';

function Meetings() {
    const navigate = useNavigate();
    const [subscriptionPaid, setSubscriptionPaid] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [loadingDepartments, setLoadingDepartments] = useState(true);
    const userId = localStorage.getItem("user_id");
    const [page, setPage] = useState(1);
    const cardsPerPage = 10;
    
    const paginatedDepartments = departments.slice(
        (page - 1) * cardsPerPage,
        page * cardsPerPage
    );
    
    const totalPages = Math.ceil(departments.length / cardsPerPage);

    // Background colors for different department initials
    const avatarColors = [
        '#4A6FA5', '#166088', '#3A7CA5', '#2C5F8A', '#4C6A92',
        '#2E4A76', '#3B5998', '#1E3A5F', '#2D5B8F', '#3C6E9F'
    ];

    // Function to get initials from department name
    const getInitials = (name) => {
        if (!name) return 'D';
        const words = name.split(' ');
        if (words.length === 1) return name.charAt(0).toUpperCase();
        return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
    };

    // Function to get color based on department name
    const getAvatarColor = (departmentName) => {
        if (!departmentName) return avatarColors[0];
        const index = departmentName.charCodeAt(0) % avatarColors.length;
        return avatarColors[index];
    };

    // Fetch Subscription Status
    useEffect(() => {
        if (userId) {
            axios.get(`${baseurl}/user-subscriptions/user-id/${userId}/`)
                .then(response => {
                    const latest = response.data.find(item => item.latest_status !== undefined);
                    setSubscriptionPaid(latest?.latest_status === "paid");
                })
                .catch(error => {
                    console.error("Subscription fetch error:", error);
                });
        }
    }, [userId]);

    // Fetch Departments API
    useEffect(() => {
        setLoadingDepartments(true);
        axios.get(`${baseurl}/departments/`)
            .then(res => {
                // Handle both paginated and non-paginated responses
                const data = res.data.results || res.data;
                setDepartments(Array.isArray(data) ? data : []);
            })
            .catch(err => {
                console.log("Departments fetch error:", err);
                setDepartments([]);
            })
            .finally(() => {
                setLoadingDepartments(false);
            });
    }, []);

    const handleRequestMeeting = (departmentName, id) => {
        if (subscriptionPaid) {
            navigate("/client-meetingrequest", {
                state: { profileType: departmentName, departmentId: id },
            });
        } else {
            setShowModal(true);
        }
    };

    const handleCloseModal = () => setShowModal(false);
    const handleSubscribe = () => navigate('/p-plans');

    const handlePageChange = (newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <ClientNavbar />
            <div className="container-fluid meetings-container">
                {loadingDepartments ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">Loading departments...</p>
                    </div>
                ) : (
                    <>
                        <div className="row justify-content-center g-4">
                            {/* Dynamic Cards */}
                            {paginatedDepartments.map((dept) => {
                                const initials = getInitials(dept.name);
                                const avatarColor = getAvatarColor(dept.name);
                                
                                return (
                                    <div className="col-6 col-sm-4 col-md-3 col-lg-2-4" key={dept.id}>
                                        <div className="department-card">
                                            <div className="card-body text-center">
                                                {/* Department Name at Top Left */}
                                                <h6 className="department-name">{dept.name}</h6>
                                                
                                                {/* Avatar with Initials in the middle */}
                                                <div className="department-avatar">
                                                    <div 
                                                        className="avatar-img"
                                                        style={{
                                                            backgroundColor: avatarColor,
                                                            width: '60px',
                                                            height: '60px',
                                                            borderRadius: '50%',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '20px',
                                                            fontWeight: 'bold',
                                                            color: 'white',
                                                            border: '3px solid #fff',
                                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                                                        }}
                                                    >
                                                        {initials}
                                                    </div>
                                                </div>
                                                
                                                {/* Request Meeting Button at bottom */}
                                                <button
                                                    className="btn request-btn"
                                                    onClick={() => handleRequestMeeting(dept.name, dept.id)}
                                                >
                                                    Request Meeting
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="row mt-4">
                                <div className="col-12">
                                    <nav aria-label="Page navigation" className="d-flex justify-content-end">
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
                                                // Show first page, last page, current page, and pages around current
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
                                                // Show ellipsis for skipped pages
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
                                </div>
                            </div>
                        )}
                    </>
                )}
                
                <DisplayRequest />

                {/* Subscription Modal */}
                <div 
                    className={`modal fade ${showModal ? 'show' : ''}`} 
                    style={{ display: showModal ? 'block' : 'none' }}
                    tabIndex="-1"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Subscription Required</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={handleCloseModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    You need an active subscription to <strong>request meetings</strong>.
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-outline-secondary" 
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-primary"
                                    onClick={handleSubscribe}
                                >
                                    Subscribe Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                {showModal && <div className="modal-backdrop fade show"></div>}
            </div>
        </>
    );
}

export default Meetings;