import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from '../../BaseURL/BaseURL';
import "bootstrap/dist/css/bootstrap.min.css";
import './ReferralForm.css';

const AddReferralPrefix = () => {
  const navigate = useNavigate();
  const [prefix, setPrefix] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePrefix = (value) => {
    const prefixRegex = /^[A-Z]{3}$/;
    if (!value.trim()) return 'Prefix is required';
    if (!prefixRegex.test(value)) return 'Prefix must contain exactly 3 uppercase letters only';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validatePrefix(prefix);
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
        confirmButtonColor: "#6C63FF",
      });
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${baseurl}/referral-prefix/`, {
        prefix: prefix.toUpperCase()
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Referral prefix created successfully",
        confirmButtonColor: "#6C63FF",
        confirmButtonText: "OK",
      }).then(() => navigate("/a-settings"));

      setPrefix('');
    } catch (error) {
      console.error("Error:", error);

      let errorMessage = "Failed to add referral prefix";
      if (error.response?.data?.prefix) {
        errorMessage = error.response.data.prefix[0];
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonColor: "#6C63FF",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container my-4 department-div">
        <div className="card p-4">
          <h4 className="text-center mb-4">Add Referral Prefix</h4>

          <form onSubmit={handleSubmit}>
            {/* Prefix Field */}
            <div className="row mb-3">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">
                    Prefix <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value.toUpperCase())}
                    className="form-control"
                    placeholder="Enter exactly 3 uppercase letters (e.g., SRT)"
                    maxLength="3"
                    minLength="3"
                    required
                    disabled={loading}
                    style={{ textTransform: 'uppercase' }}
                  />
                  <div className="form-text">
                    Enter exactly 3 uppercase letters only
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/a-settings")}
                    disabled={loading}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn"
                    style={{
                      backgroundColor: '#273c75',
                      borderColor: '#273c75',
                      color: 'white',
                      minWidth: '150px'
                    }}
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add Prefix"}
                  </button>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default AddReferralPrefix;
