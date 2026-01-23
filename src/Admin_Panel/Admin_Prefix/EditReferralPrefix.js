import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { baseurl } from '../../BaseURL/BaseURL';
import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import './ReferralForm.css';

const EditReferralPrefix = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [prefix, setPrefix] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchPrefix();
  }, [id]);

  const fetchPrefix = async () => {
    try {
      const response = await axios.get(`${baseurl}/referral-prefix/${id}/`);
      setPrefix(response.data.prefix);
    } catch (error) {
      console.error('Error fetching prefix:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch prefix details.",
        confirmButtonColor: "#6C63FF",
      }).then(() => navigate('/a-settings'));
    } finally {
      setFetching(false);
    }
  };

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
      await axios.put(`${baseurl}/referral-prefix/${id}/`, {
        prefix: prefix.toUpperCase()
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Referral prefix updated successfully",
        confirmButtonColor: "#6C63FF",
        confirmButtonText: "OK",
      }).then(() => navigate("/a-settings"));

    } catch (error) {
      console.error("Error:", error);

      let errorMessage = "Failed to update referral prefix";
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

  if (fetching) {
    return (
      <>
        <AdminNavbar />
        <div className="container my-4 department-div">
          <div className="card p-4 text-center">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3">Loading prefix details...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />

      <div className="container my-4 department-div">
        <div className="card p-4">
          <h4 className="text-center mb-4">Edit Referral Prefix</h4>

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
                    {loading ? "Updating..." : "Update Prefix"}
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

export default EditReferralPrefix;
