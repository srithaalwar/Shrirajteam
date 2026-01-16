// import React, { useEffect, useState } from "react";
// import "./StaffList.css";
// import { baseurl } from "../../BaseURL/BaseURL";
// import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";



// const StaffList = () => {
//   const [staff, setStaff] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetch(`${baseurl}/users/`)
//       .then((res) => res.json())
//       .then((data) => {
//         setStaff(data.results || []);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   const filteredStaff = staff.filter((item) => {
//     const value = `${item.first_name} ${item.last_name} ${item.email} ${item.phone_number}`.toLowerCase();
//     return value.includes(search.toLowerCase());
//   });

//   return (
//     <>
//     <WebsiteNavbar />
  
//     <div className="staff-page">
//       {/* Header */}
//       <div className="staff-header">
//         <h2>Staff</h2>
//         <span className="welcome-text">Welcome back, Admin User</span>
//       </div>

//       {/* Search + Add */}
//       <div className="staff-toolbar">
//         <div className="search-box">
//           <input
//             type="text"
//             placeholder="Search by name, email, or mobile"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <span className="search-icon">🔍</span>
//         </div>

//         <button className="add-staff-btn">
//           + Add Staff
//         </button>
//       </div>

//       {/* Table */}
//       <div className="staff-table-wrapper">
//         <table className="staff-table table-responsive">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>NAME</th>
//               <th>EMAIL</th>
//               <th>MOBILE</th>
//               <th>ROLE</th>
//               <th>STATUS</th>
//               <th>LAST LOGIN</th>
//               <th>ACTIONS</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredStaff.map((item, index) => (
//               <tr key={item.user_id}>
//                 <td>{index + 1}</td>
//                 <td className="name-cell">
//                   {item.first_name} {item.last_name}
//                 </td>
//                 <td className="email-cell">{item.email}</td>
//                 <td>{item.phone_number}</td>

//                 <td>
//                   <span className="role-badge">
//                     {item.roles?.[0]?.role_name || "STAFF"}
//                   </span>
//                 </td>

//                 <td>
//                   <span
//                     className={`status-badge ${
//                       item.status === "active" ? "active" : "inactive"
//                     }`}
//                   >
//                     {item.status.toUpperCase()}
//                   </span>
//                 </td>

//                 <td>Never</td>

//                 <td className="actions">
//                   <button className="edit-btn">✏️</button>
//                   <button className="delete-btn">🗑️</button>
//                 </td>
//               </tr>
//             ))}

//             {filteredStaff.length === 0 && (
//               <tr>
//                 <td colSpan="8" className="no-data">
//                   No staff found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//     </>
//   );
// };

// export default StaffList;




// import React, { useEffect, useState } from "react";
// import "./Users.css";
// import { baseurl } from "../../BaseURL/BaseURL";
// import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";

// const StaffList = () => {
//   const [staff, setStaff] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetch(`${baseurl}/users/`)
//       .then((res) => res.json())
//       .then((data) => {
//         setStaff(data.results || []);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   const filteredStaff = staff.filter((item) => {
//     const value = `${item.first_name} ${item.last_name} ${item.email} ${item.phone_number}`.toLowerCase();
//     return value.includes(search.toLowerCase());
//   });

//   return (
//     <>
//       <WebsiteNavbar />

//       <div className="staff-page">
//         {/* Header */}
//         <div className="staff-header">
//           <h2>Users</h2>
//         </div>

//         {/* Toolbar */}
//         <div className="staff-toolbar">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Search by name, email, or mobile"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <span className="search-icon">🔍</span>
//           </div>

//         </div>

//         {/* Table */}
//         <div className="staff-table-wrapper">
//           <table className="staff-table">
//             <thead>
//               <tr>
//                 <th>S.No.</th>
//                 <th>NAME</th>
//                 <th>EMAIL</th>
//                 <th>MOBILE</th>
//                 <th>ROLE</th>
//                 <th>STATUS</th>
//                 <th>LAST LOGIN</th>
//                 <th>ACTIONS</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredStaff.map((item, index) => (
//                 <tr key={item.user_id}>
//                   <td>{index + 1}</td>

//                   <td className="name-cell">
//                     {item.first_name} {item.last_name}
//                   </td>

//                   <td className="email-cell">{item.email}</td>
//                   <td>{item.phone_number}</td>

//                   <td>
//                     <span className="role-badge">
//                       {item.roles?.[0]?.role_name || "STAFF"}
//                     </span>
//                   </td>

//                   <td>
//                     <span
//                       className={`status-badge ${
//                         item.status === "active" ? "active" : "inactive"
//                       }`}
//                     >
//                       {item.status?.toUpperCase()}
//                     </span>
//                   </td>

//                   <td>Never</td>

//                   <td className="actions">
//                     <button className="edit-btn">✏️</button>
//                     <button className="delete-btn">🗑️</button>
//                   </td>
//                 </tr>
//               ))}

//               {filteredStaff.length === 0 && (
//                 <tr>
//                   <td colSpan="8" className="no-data">
//                     No staff found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default StaffList;



import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import "./Users.css";

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

// ✅ Format date for search (convert to dd-mm-yyyy for searching)
const formatDateForSearch = (dateTimeString) => {
  if (!dateTimeString) return "";
  try {
    const datePart = dateTimeString.split(" ")[0];
    const [day, month, year] = datePart.split("-");
    return `${day}-${month}-${year}`;
  } catch (error) {
    console.error("Error formatting date for search:", error);
    return "";
  }
};

// ✅ Normalize search query to handle different date formats
const normalizeSearchQuery = (query) => {
  if (!query) return "";
  
  // Convert dd/mm/yyyy to dd-mm-yyyy for searching
  const datePattern1 = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const datePattern2 = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
  
  if (datePattern1.test(query)) {
    return query.replace(/\//g, '-');
  } else if (datePattern2.test(query)) {
    return query;
  }
  
  return query;
};

// ✅ ROLE MAPPING FUNCTION
const mapRole = (role) => {
  if (role === "Agent") return "Team";
  if (role === "Client") return "User";
  return role;
};

const StaffList = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 5;

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseurl}/users/`);
      const data = res.data.results || res.data || [];
      
      const transformed = data.map((user) => ({
        id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        phone: user.phone_number,
        status: user.status,
        role: mapRole(user.roles?.[0]?.role_name || ""),
        referralId: user.referral_id,
        kycStatus: user.kyc_status,
        fullData: user,
        created_at: user.created_at,
        displayDate: formatDateForDisplay(user.created_at),
        searchDate: formatDateForSearch(user.created_at),
        last_login: user.last_login || "Never"
      }));
      
      setStaff(transformed);
      setFilteredStaff(transformed);
    } catch (err) {
      console.error("Error fetching staff:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load staff data",
        confirmButtonColor: "#6C63FF",
      });
    } finally {
      setLoading(false);
    }
  };

  // Get unique roles for filter
  const uniqueRoles = ["All", ...new Set(staff.map((user) => user.role).filter(Boolean))];

  // Apply filters and search
  useEffect(() => {
    let result = [...staff];
    
    // Apply role filter
    if (selectedRole !== "All") {
      result = result.filter(user => user.role === selectedRole);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const normalizedQuery = normalizeSearchQuery(searchQuery.toLowerCase());
      
      result = result.filter((user) => {
        const searchableFields = [
          user.id?.toString() || "",
          user.first_name?.toLowerCase() || "",
          user.last_name?.toLowerCase() || "",
          user.name?.toLowerCase() || "",
          user.email?.toLowerCase() || "",
          user.phone?.toString() || "",
          user.role?.toLowerCase() || "",
          user.referralId?.toString() || "",
          user.displayDate?.toLowerCase() || "",
          user.searchDate?.toLowerCase() || "",
          user.status?.toLowerCase() || ""
        ];
        
        const searchableText = searchableFields.join(" ");
        return searchableText.includes(normalizedQuery);
      });
    }
    
    // Sort by ID (newest first)
    result = result.sort((a, b) => b.id - a.id);
    setFilteredStaff(result);
    setPage(1); // Reset to first page on filter change
  }, [staff, selectedRole, searchQuery]);

  // Pagination
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = filteredStaff.slice(startIndex, startIndex + rowsPerPage);
  const pageCount = Math.ceil(filteredStaff.length / rowsPerPage);

  const getSerialNumber = (index) => startIndex + index + 1;

  // Export to Excel (CSV)
  const exportToExcel = () => {
    if (filteredStaff.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Data",
        text: "There is no data to export.",
      });
      return;
    }

    const headers = [
      "S.No",
      "User ID",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Role",
      "Referral ID",
      "Created At",
      "Status",
      "Last Login"
    ];

    const csvContent = [
      headers.join(","),
      ...filteredStaff.map((user, index) =>
        [
          index + 1,
          user.id,
          `"${user.first_name}"`,
          `"${user.last_name}"`,
          `"${user.email}"`,
          `"${user.phone}"`,
          `"${user.role}"`,
          `"${user.referralId}"`,
          `"${user.displayDate}"`,
          `"${user.status}"`,
          `"${user.last_login}"`
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().split("T")[0];

    link.setAttribute("href", url);
    link.setAttribute("download", `users_${timestamp}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Swal.fire({
      icon: "success",
      title: "Export Successful",
      text: `Exported ${filteredStaff.length} users to CSV file.`,
      timer: 2000,
      showConfirmButton: false
    });
  };

  // Handle Actions
  const handleView = (user) => {
    navigate("/View_Tmanagement", { state: { user } });
  };

  const handleEdit = (user) => {
    navigate("/Edit_Tmanagement", { state: { user } });
  };

  const handleDelete = (user_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${baseurl}/users/${user_id}/`)
          .then((res) => {
            if (res.status === 204 || res.status === 200) {
              setStaff(prev => prev.filter(user => user.id !== user_id));
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "User has been deleted.",
                timer: 2000,
                showConfirmButton: false
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Failed",
                text: "Failed to delete user."
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Error deleting user, please try again."
            });
          });
      }
    });
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await axios.put(`${baseurl}/users/${userId}/`, { status: newStatus });
      setStaff(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, status: newStatus, fullData: { ...user.fullData, status: newStatus } }
          : user
      ));
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Status updated successfully.",
        timer: 1500,
        showConfirmButton: false
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update status."
      });
    }
  };

  return (
    <>
      <WebsiteNavbar />

      <div className="staff-page">
        {/* Header */}
        <div className="staff-header">
          <h2>Users</h2>
        </div>

        {/* Toolbar - Fixed layout: left=search/filter, right=button */}
        <div className="staff-toolbar">
          {/* Left Side: Search and Filter */}
          <div className="toolbar-left">
            {/* Role Filter */}
            <div className="filter-container">
              <select 
                className="role-filter"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                {uniqueRoles.map((role) => (
                  <option key={role} value={role}>
                    {mapRole(role)}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Box */}
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by name, email, phone, role, date..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          {/* Right Side: Export Button */}
          <div className="toolbar-right">
            <button 
              className="export-btn"
              onClick={exportToExcel}
            >
              Export Excel
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="staff-table-wrapper">
          <table className="staff-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>User ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>MOBILE</th>
                <th>ROLE</th>
                <th>REFERRAL ID</th>
                <th>CREATED AT</th>
                <th>STATUS</th>
                <th>LAST LOGIN</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="11" className="no-data">
                    Loading...
                  </td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((user, index) => (
                  <tr key={user.id}>
                    <td>{getSerialNumber(index)}</td>
                    <td>{user.id}</td>
                    <td className="name-cell">{user.name}</td>
                    <td className="email-cell">{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <span className="role-badge">{user.role}</span>
                    </td>
                    <td>{user.referralId}</td>
                    <td>{user.displayDate}</td>
                    <td>
                      <select 
                        className="status-select"
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value)}
                        style={{
                          color: user.status === "active" ? "#10b981" : "#ef4444",
                          fontWeight: "bold"
                        }}
                      >
                        <option value="active" style={{ color: "#10b981" }}>Active</option>
                        <option value="inactive" style={{ color: "#ef4444" }}>Inactive</option>
                      </select>
                    </td>
                    <td>{user.last_login}</td>
                    <td className="actions">
                      <button 
                        className="view-btn"
                        onClick={() => handleView(user.fullData)}
                        title="View"
                      >
                        👁️
                      </button>
                      <button 
                        className="edit-btn"
                        onClick={() => handleEdit(user.fullData)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(user.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="no-data">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="pagination-container">
            <button
              className="pagination-btn"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              ← Previous
            </button>
            
            <div className="page-numbers">
              {[...Array(pageCount)].map((_, i) => {
                const pageNum = i + 1;
                if (pageNum === page || pageNum === page - 1 || pageNum === page + 1) {
                  return (
                    <button
                      key={pageNum}
                      className={`page-btn ${page === pageNum ? 'active' : ''}`}
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                }
                return null;
              })}
            </div>
            
            <button
              className="pagination-btn"
              disabled={page === pageCount}
              onClick={() => setPage(page + 1)}
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Add CSS for new elements */}
      <style jsx="true">{`
        .staff-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          gap: 15px;
          flex-wrap: wrap;
        }
        
        .toolbar-left {
          display: flex;
          align-items: center;
          gap: 15px;
          flex: 1;
          flex-wrap: wrap;
        }
        
        .toolbar-right {
          flex: 0 0 auto;
        }
        
        .filter-container {
          flex: 0 0 auto;
        }
        
        .role-filter {
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          background-color: white;
          min-width: 150px;
          cursor: pointer;
        }
        
        .role-filter:focus {
          outline: none;
          border-color: #6C63FF;
        }
        
        .search-box {
          position: relative;
          flex: 1;
          min-width: 250px;
          max-width: 400px;
        }
        
        .search-box input {
          width: 100%;
          padding: 10px 40px 10px 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.3s;
        }
        
        .search-box input:focus {
          outline: none;
          border-color: #6C63FF;
        }
        
        .search-icon {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
          pointer-events: none;
        }
        
        .export-btn {
          background-color: #10b981;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.3s;
          white-space: nowrap;
          min-width: 120px;
        }
        
        .export-btn:hover {
          background-color: #0da271;
        }
        
        .staff-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .staff-table th {
          padding: 16px;
          text-align: left;
          font-weight: 600;
          color: #495057;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background-color: #f8f9fa;
          border-bottom: 2px solid #e9ecef;
        }
        
        .staff-table td {
          padding: 16px;
          border-bottom: 1px solid #e9ecef;
          color: #333;
        }
        
        .staff-table tr:hover {
          background-color: #f8f9fa;
        }
        
        .status-select {
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid #ddd;
          background: white;
          font-size: 13px;
          cursor: pointer;
          min-width: 100px;
        }
        
        .status-select:focus {
          outline: none;
          border-color: #6C63FF;
        }
        
        .view-btn, .edit-btn, .delete-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          transition: all 0.2s;
          margin: 0 2px;
        }
        
        .view-btn {
          background-color: #e7f3ff;
          color: #1976d2;
        }
        
        .view-btn:hover {
          background-color: #d0e7ff;
        }
        
        .edit-btn {
          background-color: #fff4e5;
          color: #f57c00;
        }
        
        .edit-btn:hover {
          background-color: #ffe8cc;
        }
        
        .delete-btn {
          background-color: #ffeaea;
          color: #d32f2f;
        }
        
        .delete-btn:hover {
          background-color: #ffd5d5;
        }
        
        .pagination-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 30px;
          gap: 10px;
        }
        
        .pagination-btn {
          padding: 8px 16px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }
        
        .pagination-btn:hover:not(:disabled) {
          background-color: #f0f0f0;
        }
        
        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .page-numbers {
          display: flex;
          gap: 5px;
        }
        
        .page-btn {
          width: 36px;
          height: 36px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }
        
        .page-btn.active {
          background-color: #6C63FF;
          color: white;
          border-color: #6C63FF;
        }
        
        .page-btn:hover:not(.active) {
          background-color: #f0f0f0;
        }
        
        .no-data {
          text-align: center;
          padding: 40px !important;
          color: #666;
          font-style: italic;
        }
        
        @media (max-width: 768px) {
          .staff-toolbar {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }
          
          .toolbar-left {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }
          
          .filter-container,
          .search-box {
            width: 100%;
          }
          
          .search-box {
            max-width: 100%;
          }
          
          .role-filter {
            width: 100%;
          }
          
          .toolbar-right {
            width: 100%;
          }
          
          .export-btn {
            width: 100%;
          }
          
          .staff-table-wrapper {
            overflow-x: auto;
          }
          
          .actions {
            white-space: nowrap;
          }
        }
        
        @media (min-width: 769px) {
          .toolbar-left {
            flex-wrap: nowrap;
          }
        }
      `}</style>
    </>
  );
};

export default StaffList;