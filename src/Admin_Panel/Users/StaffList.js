import React, { useEffect, useState } from "react";
import "./StaffList.css";
import { baseurl } from "../../BaseURL/BaseURL";
import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";



const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${baseurl}/users/`)
      .then((res) => res.json())
      .then((data) => {
        setStaff(data.results || []);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredStaff = staff.filter((item) => {
    const value = `${item.first_name} ${item.last_name} ${item.email} ${item.phone_number}`.toLowerCase();
    return value.includes(search.toLowerCase());
  });

  return (
    <>
    <WebsiteNavbar />
  
    <div className="staff-page">
      {/* Header */}
      <div className="staff-header">
        <h2>Staff</h2>
        <span className="welcome-text">Welcome back, Admin User</span>
      </div>

      {/* Search + Add */}
      <div className="staff-toolbar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, email, or mobile"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <button className="add-staff-btn">
          + Add Staff
        </button>
      </div>

      {/* Table */}
      <div className="staff-table-wrapper">
        <table className="staff-table">
          <thead>
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>MOBILE</th>
              <th>ROLE</th>
              <th>STATUS</th>
              <th>LAST LOGIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredStaff.map((item, index) => (
              <tr key={item.user_id}>
                <td>{index + 1}</td>
                <td className="name-cell">
                  {item.first_name} {item.last_name}
                </td>
                <td className="email-cell">{item.email}</td>
                <td>{item.phone_number}</td>

                <td>
                  <span className="role-badge">
                    {item.roles?.[0]?.role_name || "STAFF"}
                  </span>
                </td>

                <td>
                  <span
                    className={`status-badge ${
                      item.status === "active" ? "active" : "inactive"
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </span>
                </td>

                <td>Never</td>

                <td className="actions">
                  <button className="edit-btn">✏️</button>
                  <button className="delete-btn">🗑️</button>
                </td>
              </tr>
            ))}

            {filteredStaff.length === 0 && (
              <tr>
                <td colSpan="8" className="no-data">
                  No staff found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default StaffList;
