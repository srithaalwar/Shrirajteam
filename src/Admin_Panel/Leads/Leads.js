import React, { useEffect, useState } from "react";
import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
// import "./CommonTable.css";



const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
     fetch(`${baseurl}/leads/`)
      .then((res) => res.json())
      .then((data) => setLeads(data.results || []))
      .catch((err) => console.error(err));
  }, []);

  const filteredLeads = leads.filter((item) => {
    const value = `${item.first_name} ${item.last_name} ${item.email} ${item.phone_number}`.toLowerCase();
    return value.includes(search.toLowerCase());
  });

  return (
    <>
    <WebsiteNavbar />
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <h2>Leads</h2>
        <span className="welcome-text">Welcome back, Admin User</span>
      </div>

      {/* Toolbar */}
      <div className="page-toolbar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, email, or mobile"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {/* Table */}
      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>MOBILE</th>
              <th>MESSAGE</th>
              <th>CREATED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.map((lead, index) => (
              <tr key={lead.id}>
                <td>{index + 1}</td>
                <td className="name-cell">
                  {lead.first_name} {lead.last_name}
                </td>
                <td className="muted-text">{lead.email}</td>
                <td>{lead.phone_number}</td>
                <td>{lead.message}</td>
                <td>{lead.created_at}</td>
                <td className="actions">
                  <button className="delete-btn">🗑️</button>
                </td>
              </tr>
            ))}

            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan="7" className="no-data">
                  No leads found
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

export default Leads;
