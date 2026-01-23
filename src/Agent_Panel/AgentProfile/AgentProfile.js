import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../BaseURL/BaseURL";
import WebsiteNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import "./AgentProfile.css";

const PartnerProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    axios
      .get(`${baseurl}/users/${userId}/`)
      .then((response) => {
        const data = response.data;
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [userId]);

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(
        `${baseurl}/users/${userId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        await Swal.fire({
          title: "Account Deleted",
          text: "Your account has been deleted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });

        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        localStorage.removeItem("user_id");

        window.location.href = "/login";
      } else {
        Swal.fire({
          title: "Failed",
          text: "Unable to delete account. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    }

    setShowDeleteDialog(false);
  };

  const confirmDelete = () => {
    setShowDeleteDialog(false);
    setTimeout(() => {
      handleDeleteAccount();
    }, 200);
  };

  if (loading) {
    return (
      <>
        <WebsiteNavbar />
        <div className="partner-profile-page">
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
        <WebsiteNavbar />
        <div className="partner-profile-page">
          <div className="profile-container">
            <div className="profile-error">Failed to load profile</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <WebsiteNavbar />
      
      <div className="partner-profile-page">
        <div className="profile-container">
          {/* Profile Header */}
          <div className="profile-header">
            <h2>Profile</h2>
            <button 
              className="profile-edit-btn"
              onClick={() => navigate("/agent-edit-profile")}
              title="Edit Profile"
            >
              ✏️
            </button>
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
                {/* {userData.date_of_birth
                  ? new Date(userData.date_of_birth).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "N/A"} */}
                  {userData.date_of_birth}
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
            
            {/* Action Buttons */}
            <div className="profile-actions">
              <button 
                className="profile-close-btn"
                onClick={() => navigate("/agent-dashboard")}
              >
                Close
              </button>
              
              <button 
                className="profile-delete-btn"
                onClick={() => setShowDeleteDialog(true)}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteDialog && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <div className="modal-header">
              <h3>Delete Account</h3>
              <button 
                className="modal-close"
                onClick={() => setShowDeleteDialog(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <p>Are you sure you want to permanently delete your account? This action cannot be undone.</p>
            </div>
            
            <div className="modal-footer">
              <button 
                className="secondary-btn"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </button>
              <button 
                className="delete-confirm-btn"
                onClick={confirmDelete}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PartnerProfile;