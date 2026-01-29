// import React, { useEffect, useState } from 'react';
// import Header from '../../../Shared/Navbar/Navbar';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { baseurl } from '../../../BaseURL/BaseURL';
// import Swal from 'sweetalert2';
// import './SheduleMeeting.css';

// function SheduleMeeting() {
//     const location = useLocation();
//     const RequestId = location.state?.request_id;
//     const navigate = useNavigate();
//     const [departments, setDepartments] = useState([]);
    
//     useEffect(() => {
//         axios.get(`${baseurl}/departments/`)
//             .then(res => setDepartments(res.data))
//             .catch(err => console.log("Departments fetch error:", err));
//     }, []);

//     const [form, setForm] = useState({
//         name: '',
//         email: '',
//         department_name: '',
//         date: '',
//         startTime: '',
//         meeting_link: '',
//         notes: '',
//         status: 'scheduled',
//         referralId: '',
//         userId: ''
//     });

//     const [loading, setLoading] = useState(false);
//     const [requestId, setRequestId] = useState(null);

//     useEffect(() => {
//         if (RequestId) {
//             axios
//                 .get(`${baseurl}/meeting-requests/${RequestId}/`)
//                 .then((res) => {
//                     const data = res.data;
//                     const departmentName = departments.find(
//                         (d) => d.id === Number(data.department)
//                     )?.name || "N/A";
//                     setForm((prev) => ({
//                         ...prev,
//                         name: data.name,
//                         email: data.email,
//                         department_name: departmentName,
//                         date: data.requested_date,
//                         startTime: data.requested_time,
//                         referralId: data.referral_id,
//                         userId: data.user_id,
//                     }));
//                     setRequestId(data.request_id);
//                 })
//                 .catch((err) => {
//                     console.error('Failed to fetch agent details:', err);
//                 });
//         }
//     }, [RequestId, departments]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         if (!requestId || !form.meeting_link) {
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'Missing Information',
//                 text: 'Request ID or Meeting Link is missing.',
//             });
//             setLoading(false);
//             return;
//         }

//         const payload = {
//             request: requestId,
//             scheduled_date: form.date,
//             scheduled_time: form.startTime,
//             meeting_link: form.meeting_link,
//             scheduled_by: 1,
//             status: form.status,
//             notes: form.notes,
//             referral_id: form.referralId,
//             user_id: form.userId,
//             name: form.name,
//             email: form.email,
//             department_name: form.department_name
//         };

//         console.log("Payload being sent:", payload);

//         try {
//             await axios.post(`${baseurl}/scheduled-meetings/`, payload);
//             await Swal.fire({
//                 icon: 'success',
//                 title: 'Success',
//                 text: 'Meeting scheduled successfully.',
//                 timer: 2000,
//                 showConfirmButton: false,
//             });

//             setForm({
//                 name: '',
//                 email: '',
//                 department_name: '',
//                 date: '',
//                 startTime: '',
//                 meeting_link: '',
//                 notes: '',
//                 status: 'scheduled',
//                 referralId: '',
//                 userId: ''
//             });

//             navigate('/a-meetings');

//         } catch (error) {
//             console.error('Error scheduling meeting:', error);
//             if (error.response) {
//                 console.error('Server Response:', error.response.data);
//             }
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: 'Failed to schedule meeting.',
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <Header />
//             <div className="container-fluid py-4">
//                 <div className="row justify-content-center">
//                     <div className="col-12 col-lg-10 col-xl-8">
//                         <div className="schedule-meeting-container">
//                             <div className="card shadow-sm">
//                                 <div className="card-header bg-primary text-white py-3">
//                                     <h2 className="h4 mb-0 text-center">
//                                         Meeting Request for <strong>{form.department_name}</strong>
//                                     </h2>
//                                 </div>
//                                 <div className="card-body p-4">
//                                     <form onSubmit={handleSubmit}>
//                                         <div className="row g-3">
//                                             <div className="col-md-4">
//                                                 <div className="form-group">
//                                                     <label htmlFor="name" className="form-label">
//                                                         Name <span className="text-danger">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         className="form-control"
//                                                         id="name"
//                                                         name="name"
//                                                         value={form.name}
//                                                         onChange={handleChange}
//                                                         required
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="form-group">
//                                                     <label htmlFor="email" className="form-label">
//                                                         Email <span className="text-danger">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="email"
//                                                         className="form-control"
//                                                         id="email"
//                                                         name="email"
//                                                         value={form.email}
//                                                         onChange={handleChange}
//                                                         required
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="form-group">
//                                                     <label htmlFor="department_name" className="form-label">
//                                                         Department
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         className="form-control"
//                                                         id="department_name"
//                                                         value={form.department_name}
//                                                         readOnly
//                                                     />
//                                                 </div>
//                                             </div>

//                                             <div className="col-md-4">
//                                                 <div className="form-group">
//                                                     <label htmlFor="date" className="form-label">
//                                                         Date <span className="text-danger">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="date"
//                                                         className="form-control"
//                                                         id="date"
//                                                         name="date"
//                                                         value={form.date}
//                                                         onChange={handleChange}
//                                                         required
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="form-group">
//                                                     <label htmlFor="startTime" className="form-label">
//                                                         Start Time <span className="text-danger">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="time"
//                                                         className="form-control"
//                                                         id="startTime"
//                                                         name="startTime"
//                                                         value={form.startTime}
//                                                         onChange={handleChange}
//                                                         required
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="form-group">
//                                                     <label htmlFor="meeting_link" className="form-label">
//                                                         Meeting Link <span className="text-danger">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="url"
//                                                         className="form-control"
//                                                         id="meeting_link"
//                                                         name="meeting_link"
//                                                         value={form.meeting_link}
//                                                         onChange={handleChange}
//                                                         required
//                                                         placeholder="https://meet.google.com/xxx-xxxx-xxx"
//                                                     />
//                                                 </div>
//                                             </div>

//                                             <div className="col-12">
//                                                 <div className="form-group">
//                                                     <label htmlFor="notes" className="form-label">
//                                                         Notes <span className="text-danger">*</span>
//                                                     </label>
//                                                     <textarea
//                                                         className="form-control"
//                                                         id="notes"
//                                                         name="notes"
//                                                         rows="4"
//                                                         value={form.notes}
//                                                         onChange={handleChange}
//                                                         required
//                                                         placeholder="Enter meeting notes..."
//                                                     />
//                                                 </div>
//                                             </div>

//                                             <div className="col-12">
//                                                 <div className="d-flex gap-2">
//                                                     <button 
//                                                         type="submit" 
//                                                         className="btn btn-primary"
//                                                         disabled={loading}
//                                                     >
//                                                         {loading ? (
//                                                             <>
//                                                                 <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                                                                 Submitting...
//                                                             </>
//                                                         ) : (
//                                                             'Submit'
//                                                         )}
//                                                     </button>
//                                                     <button 
//                                                         type="button" 
//                                                         className="btn btn-outline-secondary"
//                                                         onClick={() => navigate('/a-meetings')}
//                                                     >
//                                                         Cancel
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default SheduleMeeting;




import React, { useEffect, useState } from 'react';
import Header from '../../Admin_Panel/Admin_Navbar/Admin_Navbar';
import { useLocation, useNavigate, useParams } from 'react-router-dom'; // Added useParams
import axios from 'axios';
import { baseurl } from '../../BaseURL/BaseURL';
import Swal from 'sweetalert2';
import './SheduleMeeting.css';

function SheduleMeeting() {
    const location = useLocation();
    const { agentId } = useParams(); // Get the agentId from URL params
    const RequestId = location.state?.request_id;
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    
    console.log("Agent ID from URL:", agentId); // Debug log
    console.log("Request ID from state:", RequestId); // Debug log

    useEffect(() => {
        axios.get(`${baseurl}/departments/`)
            .then(res => setDepartments(res.data))
            .catch(err => console.log("Departments fetch error:", err));
    }, []);

    const [form, setForm] = useState({
        name: '',
        email: '',
        department_name: '',
        date: '',
        startTime: '',
        meeting_link: '',
        notes: '',
        status: 'scheduled',
        referralId: '',
        userId: ''
    });

    const [loading, setLoading] = useState(false);
    const [requestId, setRequestId] = useState(null);
    const [meetingData, setMeetingData] = useState(null);

    // Fetch meeting request data
   // In SheduleMeeting.js, update the useEffect to also use data from state:

useEffect(() => {
    const fetchMeetingRequest = async () => {
        // First try to use data from navigation state
        if (location.state) {
            console.log("Using data from state:", location.state);
            const { request_id, name, email, department, referral_id } = location.state;
            
            setForm(prev => ({
                ...prev,
                name: name || '',
                email: email || '',
                department_name: department || '',
                referralId: referral_id || ''
            }));
            
            if (request_id) {
                setRequestId(request_id);
            }
        }
        
        // Then fetch detailed data if we have RequestId
        if (RequestId) {
            try {
                const response = await axios.get(`${baseurl}/meeting-requests/${RequestId}/`);
                const data = response.data;
                
                console.log("Fetched meeting data from API:", data);
                
                const departmentName = departments.find(
                    (d) => d.id === Number(data.department)
                )?.name || data.department_name || "N/A";
                
                setForm(prev => ({
                    ...prev,
                    name: data.name || prev.name,
                    email: data.email || prev.email,
                    department_name: departmentName,
                    date: data.requested_date || prev.date,
                    startTime: data.requested_time || prev.startTime,
                    referralId: data.referral_id || prev.referralId,
                    userId: data.user_id || prev.userId,
                }));
                
                setRequestId(data.request_id);
                setMeetingData(data);
                
            } catch (error) {
                console.error('Failed to fetch meeting details:', error);
                // Don't show error if we already have state data
                if (!location.state) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to load meeting details.',
                    });
                }
            }
        }
    };

    fetchMeetingRequest();
}, [RequestId, departments, location.state]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!requestId || !form.meeting_link) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Information',
                text: !requestId ? 'Request ID is missing.' : 'Meeting Link is required.',
            });
            setLoading(false);
            return;
        }

        const payload = {
            request: requestId,
            scheduled_date: form.date,
            scheduled_time: form.startTime,
            meeting_link: form.meeting_link,
            scheduled_by: 1, // TODO: Replace with actual user ID from auth
            status: form.status,
            notes: form.notes,
            referral_id: form.referralId,
            user_id: form.userId,
            name: form.name,
            email: form.email,
            department_name: form.department_name
        };

        console.log("Scheduling payload:", payload);

        try {
            const response = await axios.post(`${baseurl}/scheduled-meetings/`, payload);
            console.log("Schedule response:", response.data);
            
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Meeting scheduled successfully.',
                timer: 2000,
                showConfirmButton: false,
            });

            // Reset form
            setForm({
                name: '',
                email: '',
                department_name: '',
                date: '',
                startTime: '',
                meeting_link: '',
                notes: '',
                status: 'scheduled',
                referralId: '',
                userId: ''
            });

            // Navigate back to meetings list
            navigate('/a-meetings');

        } catch (error) {
            console.error('Error scheduling meeting:', error);
            let errorMessage = 'Failed to schedule meeting.';
            
            if (error.response) {
                console.error('Server Response:', error.response.data);
                errorMessage = error.response.data.message || JSON.stringify(error.response.data);
            }
            
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        Swal.fire({
            title: 'Cancel Scheduling?',
            text: 'Any unsaved changes will be lost.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Cancel',
            cancelButtonText: 'No, Continue'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/a-meetings');
            }
        });
    };

    return (
        <>
            <Header />
            <div className="container-fluid py-4">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10 col-xl-8">
                        <div className="schedule-meeting-container">
                            <div className="card shadow-sm">
                                <div className="card-header bg-primary text-white py-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h2 className="h4 mb-0">
                                            Schedule Meeting
                                        </h2>
                                        <div className="meeting-info-badge">
                                            <small>
                                                Agent ID: <strong>{agentId}</strong> | 
                                                Request ID: <strong>{requestId || 'N/A'}</strong>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-4">
                                    {!meetingData && !loading ? (
                                        <div className="text-center py-5">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading meeting details...</span>
                                            </div>
                                            <p className="mt-3">Loading meeting details...</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="alert alert-info mb-4">
                                                <i className="fas fa-info-circle me-2"></i>
                                                Scheduling meeting for <strong>{form.department_name}</strong> department
                                            </div>
                                            
                                            <form onSubmit={handleSubmit}>
                                                <div className="row g-3">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="name" className="form-label">
                                                                Name <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="name"
                                                                name="name"
                                                                value={form.name}
                                                                onChange={handleChange}
                                                                required
                                                                disabled={!meetingData}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="email" className="form-label">
                                                                Email <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                id="email"
                                                                name="email"
                                                                value={form.email}
                                                                onChange={handleChange}
                                                                required
                                                                disabled={!meetingData}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label htmlFor="department_name" className="form-label">
                                                                Department
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="department_name"
                                                                value={form.department_name}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label htmlFor="date" className="form-label">
                                                                Date <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                id="date"
                                                                name="date"
                                                                value={form.date}
                                                                onChange={handleChange}
                                                                required
                                                                min={new Date().toISOString().split('T')[0]}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label htmlFor="startTime" className="form-label">
                                                                Start Time <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="time"
                                                                className="form-control"
                                                                id="startTime"
                                                                name="startTime"
                                                                value={form.startTime}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="meeting_link" className="form-label">
                                                                Meeting Link <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="url"
                                                                className="form-control"
                                                                id="meeting_link"
                                                                name="meeting_link"
                                                                value={form.meeting_link}
                                                                onChange={handleChange}
                                                                required
                                                                placeholder="https://meet.google.com/xxx-xxxx-xxx or https://zoom.us/j/xxxxxxxx"
                                                            />
                                                            <small className="form-text text-muted">
                                                                Enter the complete meeting URL (Google Meet, Zoom, Teams, etc.)
                                                            </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="notes" className="form-label">
                                                                Notes <span className="text-danger">*</span>
                                                            </label>
                                                            <textarea
                                                                className="form-control"
                                                                id="notes"
                                                                name="notes"
                                                                rows="4"
                                                                value={form.notes}
                                                                onChange={handleChange}
                                                                required
                                                                placeholder="Enter meeting agenda, topics to discuss, or any special instructions..."
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="d-flex gap-2 justify-content-end">
                                                            <button 
                                                                type="button" 
                                                                className="btn btn-outline-secondary"
                                                                onClick={handleCancel}
                                                            >
                                                                <i className="fas fa-times me-2"></i>
                                                                Cancel
                                                            </button>
                                                            <button 
                                                                type="submit" 
                                                                className="btn btn-primary"
                                                                disabled={loading || !meetingData}
                                                            >
                                                                {loading ? (
                                                                    <>
                                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                                        Scheduling...
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <i className="fas fa-calendar-check me-2"></i>
                                                                        Schedule Meeting
                                                                    </>
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SheduleMeeting;