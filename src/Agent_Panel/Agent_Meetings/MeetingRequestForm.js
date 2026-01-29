import React, { useState } from "react";
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import { baseurl } from '../../BaseURL/BaseURL';
import Swal from 'sweetalert2';
import './MeetingRequestForm.css';

const MeetingRequestForm = () => {
    const [form, setForm] = useState({
        date: "",
        startTime: "",
        name: localStorage.getItem("user_name") || "",
        email: localStorage.getItem("email") || "",
        referralId: localStorage.getItem("referral_id") || "",
    });

    const location = useLocation();
    const navigate = useNavigate();
    const { profileType, departmentId } = location.state || {};
    const agentId = localStorage.getItem("user_id");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            user_id: parseInt(agentId),
            referral_id: form.referralId,
            name: form.name,
            email: form.email,
            department: departmentId,
            requested_date: form.date,
            requested_time: form.startTime,
        };

        try {
            const response = await fetch(`${baseurl}/meeting-requests/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Meeting request submitted successfully!',
                    timer: 2000,
                    showConfirmButton: false
                });
                navigate("/p-meetings");
            } else {
                const errorData = await response.json();
                console.error("Submission failed:", errorData);
                Swal.fire({
                    icon: 'error',
                    title: 'Submission Failed',
                    text: 'Please check your input and try again.'
                });
            }
        } catch (error) {
            console.error("Error submitting meeting request:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred. Please try again later.'
            });
        }
    };

    return (
        <>
            <AgentNavbar />
            <div className="container-fluid meeting-request-container">
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-xl-8">
                        <div className="card shadow-sm border-0">
                            <div className="card-body p-4 p-md-5">
                                <h4 className="card-title mb-4">
                                    Meeting Request for <span className="text-primary">{profileType}</span>
                                </h4>
                                
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Name"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label htmlFor="name">Name</label>
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label htmlFor="email">Email</label>
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="referralId"
                                                    name="referralId"
                                                    placeholder="Referral ID"
                                                    value={form.referralId}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="referralId">Referral ID</label>
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="date"
                                                    name="date"
                                                    value={form.date}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label htmlFor="date">Date</label>
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="time"
                                                    className="form-control"
                                                    id="startTime"
                                                    name="startTime"
                                                    value={form.startTime}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label htmlFor="startTime">Start Time</label>
                                            </div>
                                        </div>
                                        
                                        <div className="col-12 mt-4">
                                            <div className="d-flex justify-content-end gap-2">
                                                <button 
                                                    type="button" 
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => navigate("/p-meetings")}
                                                >
                                                    Cancel
                                                </button>
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-primary px-4"
                                                >
                                                    Submit Meeting Request
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MeetingRequestForm;