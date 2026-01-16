import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from '../../BaseURL/BaseURL';
import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
import { useNavigate } from "react-router-dom";
import "./AdminProfile.css";

const AdminProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseurl}/users/${user_id}/`);
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user_id) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user_id]);

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="admin-profile-page">
          <div className="profile-container">
            <div className="profile-loading">Loading...</div>
          </div>
        </div>
      </>
    );
  }

  if (!userData) {
    return (
      <>
        <AdminNavbar />
        <div className="admin-profile-page">
          <div className="profile-container">
            <div className="profile-error">Failed to load profile</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      
      <div className="admin-profile-page">
        <div className="profile-container">
          {/* Profile Header */}
          <div className="profile-header">
            <h2>Profile</h2>
          </div>

          {/* Profile Card */}
          <div className="profile-card">
            {/* Profile Fields */}
            <div className="profile-field">
              <span className="profile-label">First Name:</span>
              <span className="profile-value">{userData.first_name || "N/A"}</span>
            </div>
            
            <div className="profile-divider"></div>
            
            <div className="profile-field">
              <span className="profile-label">Last Name:</span>
              <span className="profile-value">{userData.last_name || "N/A"}</span>
            </div>
            
            <div className="profile-divider"></div>
            
            <div className="profile-field">
              <span className="profile-label">Date of Birth:</span>
              <span className="profile-value">
                {userData.date_of_birth
                  ? new Date(userData.date_of_birth).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>
            
            <div className="profile-divider"></div>
            
            <div className="profile-field">
              <span className="profile-label">Gender:</span>
              <span className="profile-value">{userData.gender || "N/A"}</span>
            </div>
            
            <div className="profile-divider"></div>
            
            <div className="profile-field">
              <span className="profile-label">Email Address:</span>
              <span className="profile-value">{userData.email || "N/A"}</span>
            </div>
            
            <div className="profile-divider"></div>
            
            <div className="profile-field">
              <span className="profile-label">Mobile Number:</span>
              <span className="profile-value">{userData.phone_number || "N/A"}</span>
            </div>
            
            <div className="profile-divider"></div>
            
            <div className="profile-field">
              <span className="profile-label">Role:</span>
              <span className="profile-value">
                {userData.roles[0]?.role_name === "Agent"
                  ? "Team"
                  : userData.roles[0]?.role_name || "N/A"}
              </span>
            </div>
            
            <div className="profile-divider"></div>
            
            <div className="profile-field">
              <span className="profile-label">Pan number:</span>
              <span className="profile-value">{userData.pan_number || ""}</span>
            </div>
            
            <div className="profile-divider"></div>
            
            <div className="profile-field">
              <span className="profile-label">Aadhaar number:</span>
              <span className="profile-value">{userData.aadhaar_number || ""}</span>
            </div>
            
            {/* Close Button */}
            <div className="profile-footer">
              <button 
                className="profile-close-btn"
                onClick={() => navigate("/admin-dashboard")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;