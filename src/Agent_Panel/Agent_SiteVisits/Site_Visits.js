import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../BaseURL/BaseURL";
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import "./Site_Visits.css"; // Create this CSS file

const Sitevisit = () => {
  const [siteVisits, setSiteVisits] = useState([]);
  const [filteredVisits, setFilteredVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  const rowsPerPage = 5;

  const fetchSiteVisits = async () => {
    try {
      const response = await axios.get(`${baseurl}/site-visits/user-id/${userId}/`);
      
      const visits = Array.isArray(response.data)
        ? response.data
        : response.data.visits || response.data.results || [];

      setSiteVisits(visits);
      setFilteredVisits(visits);
    } catch (error) {
      console.error("Error fetching site visits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteVisits();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = siteVisits.filter((visit) => {
      return (
        (visit.date || "").toLowerCase().includes(query) ||
        (visit.time || "").toLowerCase().includes(query) ||
        (visit.site_name || "").toLowerCase().includes(query) ||
        (visit.site_owner_name || "").toLowerCase().includes(query) ||
        (visit.site_owner_mobile_number || "").toLowerCase().includes(query) ||
        (visit.site_owner_email || "").toLowerCase().includes(query) ||
        (visit.site_location || "").toLowerCase().includes(query) ||
        (visit.customer_name || "").toLowerCase().includes(query) ||
        (visit.customer_mobile_number || "").toLowerCase().includes(query) ||
        (visit.remarks || "").toLowerCase().includes(query)
      );
    });

    setFilteredVisits(filtered);
    setPage(1);
  };

  const paginatedData = filteredVisits.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const pageCount = Math.ceil(filteredVisits.length / rowsPerPage);

  const handleImageClick = (imgUrl) => {
    const fullUrl = imgUrl.startsWith("http") ? imgUrl : `${baseurl}/${imgUrl}`;
    setSelectedImage(fullUrl);
    setImageDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setImageDialogOpen(false);
    setSelectedImage(null);
  };

  const handleEdit = (id) => {
    navigate(`/agent-editsitevisit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this site visit?")) {
      try {
        await axios.delete(`${baseurl}/site-visits/${id}/`);
        fetchSiteVisits();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <>
      <AgentNavbar />
      <div className="container mt-5">
        <div className="text-center mb-4">
          <h1 className="fw-bold text-primary">Site Visits</h1>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div className="search-container">
            <input
              type="text"
              className="form-control"
              placeholder="Search Site Visits..."
              value={searchQuery}
              onChange={handleSearch}
              style={{ width: "300px" }}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/agent-addsitevisit")}
          >
            <i className="fas fa-plus me-2"></i>Add Site Visit
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Site Name</th>
                <th>Owner Name</th>
                <th>Owner Mobile</th>
                <th>Owner Email</th>
                <th>Location</th>
                <th>Customer Name</th>
                <th>Customer Mobile</th>
                <th>Remarks</th>
                <th>Photo</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="12" className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((visit, index) => (
                  <tr key={index}>
                    <td>{visit.date}</td>
                    <td>{visit.time}</td>
                    <td>{visit.site_name}</td>
                    <td>{visit.site_owner_name}</td>
                    <td>{visit.site_owner_mobile_number}</td>
                    <td>{visit.site_owner_email}</td>
                    <td>{visit.site_location}</td>
                    <td>{visit.customer_name}</td>
                    <td>{visit.customer_mobile_number}</td>
                    <td className="remarks-cell">{visit.remarks}</td>
                    <td>
                      {visit.site_photo ? (
                        <img
                          src={visit.site_photo.startsWith("http") ? visit.site_photo : `${baseurl}/${visit.site_photo}`}
                          alt="Site"
                          className="site-photo-thumbnail"
                          onClick={() => handleImageClick(visit.site_photo)}
                        />
                      ) : (
                        <span className="text-muted">No Image</span>
                      )}
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(visit.id)}
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(visit.id)}
                          title="Delete"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center py-4">
                    <div className="alert alert-info mb-0">
                      No Site Visits Found
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </button>
              </li>
              
              {[...Array(pageCount)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${page === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              
              <li className={`page-item ${page === pageCount ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage(page + 1)}
                  disabled={page === pageCount}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}

        {/* Image Modal */}
        {imageDialogOpen && (
          <div className="modal fade show" style={{ display: "block" }} role="dialog">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Site Photo</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseDialog}
                  ></button>
                </div>
                <div className="modal-body text-center">
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt="Site Large"
                      className="img-fluid rounded"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sitevisit;