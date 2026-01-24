import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CommissionLevels.css";
import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import Swal from "sweetalert2";

function CommissionLevels() {
  const [levels, setLevels] = useState([]);
  const [filteredLevels, setFilteredLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  /* ================= FETCH ================= */
  const fetchLevels = () => {
    setLoading(true);
    axios
      .get(`${baseurl}/commissions-master/`)
      .then((res) => {
        const data = res.data?.results || res.data || [];
        const sorted = [...data].sort((a, b) => b.id - a.id);
        setLevels(sorted);
        setFilteredLevels(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  /* ================= SEARCH ================= */
  const safeToString = (v) => (v !== null && v !== undefined ? v.toString() : "");

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredLevels([...levels].sort((a, b) => b.id - a.id));
      return;
    }

    const q = searchQuery.toLowerCase();
    const filtered = levels.filter(
      (l) =>
        safeToString(l.id).includes(q) ||
        safeToString(l.level_no).includes(q) ||
        safeToString(l.percentage).includes(q) ||
        safeToString(l.date).toLowerCase().includes(q)
    );

    setFilteredLevels(filtered.sort((a, b) => b.id - a.id));
  }, [searchQuery, levels]);

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This commission level will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${baseurl}/commissions-master/${id}/`)
          .then(() => {
            Swal.fire("Deleted!", "Commission level deleted.", "success");
            fetchLevels();
          })
          .catch(() =>
            Swal.fire("Error", "Delete failed. Try again.", "error")
          );
      }
    });
  };

  const formatPercent = (v) =>
    `${Number(v || 0).toLocaleString()}%`;

  return (
    <>
      <AdminNavbar />

      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <h2>Commission Levels</h2>
        </div>

        {/* Toolbar */}
        <div className="page-toolbar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by ID, Level, Percentage or Date"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>

          <button
            className="primary-btn"
            style={{
              backgroundColor: "#273c75",
              borderColor: "#273c75",
              color: "white",
            }}
            onClick={() => navigate("/admin-add-commissionmaster")}
          >
            Add Level
          </button>
        </div>

        {/* Table */}
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>ID</th>
                <th>LEVEL NO</th>
                <th>PERCENTAGE</th>
                <th>DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="no-data">
                    Loading...
                  </td>
                </tr>
              ) : filteredLevels.length ? (
                filteredLevels.map((level, index) => (
                  <tr key={level.id}>
                    <td>{index + 1}</td>
                    <td>{level.id}</td>
                    <td>{level.level_no}</td>
                    <td>{formatPercent(level.percentage)}</td>
                    <td>{level.date || "N/A"}</td>
                    <td className="actions">
                      <button
                        className="edit-btn"
                        onClick={() =>
                          navigate(
                            `/admin-edit-commissionmaster/${level.id}`
                          )
                        }
                      >
                        ✏️
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(level.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No commission levels found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CommissionLevels;
