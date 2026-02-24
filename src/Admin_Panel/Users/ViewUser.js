import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Format date for display (dd/mm/yyyy)
const formatDateForDisplay = (dateTimeString) => {
  if (!dateTimeString) return "";
  try {
    const datePart = dateTimeString.split(" ")[0];
    const [day, month, year] = datePart.split("-");
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get user data from location state or fetch from API
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        let userData;
        
        // First try to get from location state
        if (location.state?.user) {
          userData = location.state.user;
        } else {
          // Fetch from API if not in state
          const response = await axios.get(`${baseurl}/users/${id}/`);
          userData = response.data;
        }
        
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load user data",
          confirmButtonColor: "#6C63FF",
        }).then(() => navigate("/admin-users"));
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, location.state, navigate]);

  if (loading) {
    return (
      <>
        <WebsiteNavbar />
        <div className="container my-4">
          <div className="card p-4 text-center">
            <h4 className="mb-3">View User Details</h4>
            <div className="text-muted">Loading...</div>
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <WebsiteNavbar />
        <div className="container my-4">
          <div className="card p-4 text-center">
            <h4 className="mb-3">User Not Found</h4>
            <button 
              className="btn btn-primary mt-3"
              // onClick={() => navigate("-1")}
                 onClick={() => navigate(-1)}
            >
              Back to Users
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <WebsiteNavbar />

      <div className="container my-4">
        <div className="card p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">User Details</h4>
            <button
              className="btn btn-outline-secondary"
              // onClick={() => navigate("/admin-users")}
                 onClick={() => navigate(-1)}
            >
              Back to List
            </button>
          </div>

          <div className="row">
            {/* Personal Information */}
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header" style={{ backgroundColor: '#273c75', color: 'white' }}>
                  <h6 className="mb-0">Personal Information</h6>
                </div>
                <div className="card-body">
                  <div className="row mb-2">
                    <div className="col-6">
                      <strong>User ID:</strong>
                    </div>
                    <div className="col-6">
                      {user.user_id}
                    </div>
                  </div>
                  
                  <div className="row mb-2">
                    <div className="col-6">
                      <strong>First Name:</strong>
                    </div>
                    <div className="col-6">
                      {user.first_name}
                    </div>
                  </div>
                  
                  <div className="row mb-2">
                    <div className="col-6">
                      <strong>Last Name:</strong>
                    </div>
                    <div className="col-6">
                      {user.last_name}
                    </div>
                  </div>
                  
                  <div className="row mb-2">
                    <div className="col-6">
                      <strong>Email:</strong>
                    </div>
                    <div className="col-6">
                      {user.email}
                    </div>
                  </div>
                  
                  <div className="row mb-2">
                    <div className="col-6">
                      <strong>Phone:</strong>
                    </div>
                    <div className="col-6">
                      {user.phone_number}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header" style={{ backgroundColor: '#273c75', color: 'white' }}>
                  <h6 className="mb-0">Account Information</h6>
                </div>
                <div className="card-body">
                  <div className="row mb-2">
                    <div className="col-6">
                      <strong>Referral ID:</strong>
                    </div>
                    <div className="col-6">
                      {user.referral_id}
                    </div>
                  </div>
                  
                  <div className="row mb-2">
                    <div className="col-6">
                      <strong>Referred By:</strong>
                    </div>
                    <div className="col-6">
                      {user.referred_by || "N/A"}
                    </div>
                  </div>
                  
                  <div className="row mb-2">
                    <div className="col-6">
                      <strong>Role:</strong>
                    </div>
                    <div className="col-6">
                      {user.roles?.map(role => role.role_name).join(", ") || "N/A"}
                    </div>
                  </div>
                  
                  <div className="row mb-2">
                    <div className="col-6">
                      <strong>Status:</strong>
                    </div>
                    <div className="col-6">
                      <span 
                        style={{ 
                          color: user.status === "active" ? "#10b981" : "#ef4444",
                          fontWeight: "bold"
                        }}
                      >
                        {user.status?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="row mb-2">
                    <div className="col-6">
                      <strong>KYC Status:</strong>
                    </div>
                    <div className="col-6">
                      {user.kyc_status || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dates Information */}
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header" style={{ backgroundColor: '#273c75', color: 'white' }}>
                  <h6 className="mb-0">Dates Information</h6>
                </div>
                <div className="card-body">
                  <div className="row mb-2">
                    <div className="col-6">
                      <strong>Created At:</strong>
                    </div>
                    <div className="col-6">
                      {formatDateForDisplay(user.created_at)}
                    </div>
                  </div>
                  
                  <div className="row mb-2">
                    <div className="col-6">
                      <strong>Last Login:</strong>
                    </div>
                    <div className="col-6">
                      {user.last_login ? formatDateForDisplay(user.last_login) : "Never"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header" style={{ backgroundColor: '#273c75', color: 'white' }}>
                  <h6 className="mb-0">Additional Information</h6>
                </div>
                <div className="card-body">
                  <div className="row mb-2">
                    <div className="col-6">
                      <strong>Username:</strong>
                    </div>
                    <div className="col-6">
                      {user.username || "N/A"}
                    </div>
                  </div>
                  
                  <div className="row mb-2">
                    <div className="col-6">
                      <strong>Email Verified:</strong>
                    </div>
                    <div className="col-6">
                      {user.email_verified ? "Yes" : "No"}
                    </div>
                  </div>
                  
                  <div className="row mb-2">
                    <div className="col-6">
                      <strong>Phone Verified:</strong>
                    </div>
                    <div className="col-6">
                      {user.phone_verified ? "Yes" : "No"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate("/admin-users")}
                >
                  Back to List
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigate(`/admin-edit-user/${id}`)}
                  style={{
                    backgroundColor: '#273c75',
                    borderColor: '#273c75',
                    color: 'white'
                  }}
                >
                  Edit User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUser;