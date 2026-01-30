// import React, { useEffect, useState } from "react";
// import "./UserList.css";
// import { baseurl } from "../../BaseURL/BaseURL";
// import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";



// const UserList = () => {
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

// export default UserList;




// import React, { useEffect, useState } from "react";
// import "./Users.css";
// import { baseurl } from "../../BaseURL/BaseURL";
// import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";

// const UserList = () => {
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

// export default UserList;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import "./Users.css";

// // ✅ Format date for display (dd/mm/yyyy)
// const formatDateForDisplay = (dateTimeString) => {
//   if (!dateTimeString) return "";
//   try {
//     const datePart = dateTimeString.split(" ")[0];
//     const [day, month, year] = datePart.split("-");
//     return `${day}/${month}/${year}`;
//   } catch (error) {
//     console.error("Error formatting date:", error);
//     return "";
//   }
// };

// // ✅ Format date for search (convert to dd-mm-yyyy for searching)
// const formatDateForSearch = (dateTimeString) => {
//   if (!dateTimeString) return "";
//   try {
//     const datePart = dateTimeString.split(" ")[0];
//     const [day, month, year] = datePart.split("-");
//     return `${day}-${month}-${year}`;
//   } catch (error) {
//     console.error("Error formatting date for search:", error);
//     return "";
//   }
// };

// // ✅ Normalize search query to handle different date formats
// const normalizeSearchQuery = (query) => {
//   if (!query) return "";
  
//   // Convert dd/mm/yyyy to dd-mm-yyyy for searching
//   const datePattern1 = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
//   const datePattern2 = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
  
//   if (datePattern1.test(query)) {
//     return query.replace(/\//g, '-');
//   } else if (datePattern2.test(query)) {
//     return query;
//   }
  
//   return query;
// };

// // ✅ ROLE MAPPING FUNCTION
// const mapRole = (role) => {
//   if (role === "Agent") return "Team";
//   if (role === "Client") return "User";
//   return role;
// };

// const UserList = () => {
//   const navigate = useNavigate();
//   const [staff, setStaff] = useState([]);
//   const [filteredStaff, setFilteredStaff] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedRole, setSelectedRole] = useState("All");
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const rowsPerPage = 5;

//   useEffect(() => {
//     fetchStaff();
//   }, []);

//   const fetchStaff = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseurl}/users/`);
//       const data = res.data.results || res.data || [];
      
//       const transformed = data.map((user) => ({
//         id: user.user_id,
//         first_name: user.first_name,
//         last_name: user.last_name,
//         name: `${user.first_name} ${user.last_name}`,
//         email: user.email,
//         phone: user.phone_number,
//         status: user.status,
//         role: mapRole(user.roles?.[0]?.role_name || ""),
//         referralId: user.referral_id,
//         kycStatus: user.kyc_status,
//         fullData: user,
//         created_at: user.created_at,
//         displayDate: formatDateForDisplay(user.created_at),
//         searchDate: formatDateForSearch(user.created_at),
//         last_login: user.last_login || "Never"
//       }));
      
//       setStaff(transformed);
//       setFilteredStaff(transformed);
//     } catch (err) {
//       console.error("Error fetching staff:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to load staff data",
//         confirmButtonColor: "#6C63FF",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get unique roles for filter
//   const uniqueRoles = ["All", ...new Set(staff.map((user) => user.role).filter(Boolean))];

//   // Apply filters and search
//   useEffect(() => {
//     let result = [...staff];
    
//     // Apply role filter
//     if (selectedRole !== "All") {
//       result = result.filter(user => user.role === selectedRole);
//     }
    
//     // Apply search filter
//     if (searchQuery.trim()) {
//       const normalizedQuery = normalizeSearchQuery(searchQuery.toLowerCase());
      
//       result = result.filter((user) => {
//         const searchableFields = [
//           user.id?.toString() || "",
//           user.first_name?.toLowerCase() || "",
//           user.last_name?.toLowerCase() || "",
//           user.name?.toLowerCase() || "",
//           user.email?.toLowerCase() || "",
//           user.phone?.toString() || "",
//           user.role?.toLowerCase() || "",
//           user.referralId?.toString() || "",
//           user.displayDate?.toLowerCase() || "",
//           user.searchDate?.toLowerCase() || "",
//           user.status?.toLowerCase() || ""
//         ];
        
//         const searchableText = searchableFields.join(" ");
//         return searchableText.includes(normalizedQuery);
//       });
//     }
    
//     // Sort by ID (newest first)
//     result = result.sort((a, b) => b.id - a.id);
//     setFilteredStaff(result);
//     setPage(1); // Reset to first page on filter change
//   }, [staff, selectedRole, searchQuery]);

//   // Pagination
//   const startIndex = (page - 1) * rowsPerPage;
//   const paginatedData = filteredStaff.slice(startIndex, startIndex + rowsPerPage);
//   const pageCount = Math.ceil(filteredStaff.length / rowsPerPage);

//   const getSerialNumber = (index) => startIndex + index + 1;

//   // Export to Excel (CSV)
//   const exportToExcel = () => {
//     if (filteredStaff.length === 0) {
//       Swal.fire({
//         icon: "warning",
//         title: "No Data",
//         text: "There is no data to export.",
//       });
//       return;
//     }

//     const headers = [
//       "S.No",
//       "User ID",
//       "First Name",
//       "Last Name",
//       "Email",
//       "Phone",
//       "Role",
//       "Referral ID",
//       "Created At",
//       "Status",
//       "Last Login"
//     ];

//     const csvContent = [
//       headers.join(","),
//       ...filteredStaff.map((user, index) =>
//         [
//           index + 1,
//           user.id,
//           `"${user.first_name}"`,
//           `"${user.last_name}"`,
//           `"${user.email}"`,
//           `"${user.phone}"`,
//           `"${user.role}"`,
//           `"${user.referralId}"`,
//           `"${user.displayDate}"`,
//           `"${user.status}"`,
//           `"${user.last_login}"`
//         ].join(",")
//       )
//     ].join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     const url = URL.createObjectURL(blob);
//     const timestamp = new Date().toISOString().split("T")[0];

//     link.setAttribute("href", url);
//     link.setAttribute("download", `users_${timestamp}.csv`);
//     link.style.visibility = "hidden";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     Swal.fire({
//       icon: "success",
//       title: "Export Successful",
//       text: `Exported ${filteredStaff.length} users to CSV file.`,
//       timer: 2000,
//       showConfirmButton: false
//     });
//   };

//   // Handle Actions
//   const handleView = (user) => {
//     navigate("/View_Tmanagement", { state: { user } });
//   };

//   const handleEdit = (user) => {
//     navigate("/Edit_Tmanagement", { state: { user } });
//   };

//   const handleDelete = (user_id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Do you really want to delete this user?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios.delete(`${baseurl}/users/${user_id}/`)
//           .then((res) => {
//             if (res.status === 204 || res.status === 200) {
//               setStaff(prev => prev.filter(user => user.id !== user_id));
//               Swal.fire({
//                 icon: "success",
//                 title: "Deleted!",
//                 text: "User has been deleted.",
//                 timer: 2000,
//                 showConfirmButton: false
//               });
//             } else {
//               Swal.fire({
//                 icon: "error",
//                 title: "Failed",
//                 text: "Failed to delete user."
//               });
//             }
//           })
//           .catch((err) => {
//             Swal.fire({
//               icon: "error",
//               title: "Error",
//               text: "Error deleting user, please try again."
//             });
//           });
//       }
//     });
//   };

//   const handleStatusChange = async (userId, newStatus) => {
//     try {
//       await axios.put(`${baseurl}/users/${userId}/`, { status: newStatus });
//       setStaff(prev => prev.map(user => 
//         user.id === userId 
//           ? { ...user, status: newStatus, fullData: { ...user.fullData, status: newStatus } }
//           : user
//       ));
//       Swal.fire({
//         icon: "success",
//         title: "Updated!",
//         text: "Status updated successfully.",
//         timer: 1500,
//         showConfirmButton: false
//       });
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to update status."
//       });
//     }
//   };

//   return (
//     <>
//       <WebsiteNavbar />

//       <div className="staff-page">
//         {/* Header */}
//         <div className="staff-header">
//           <h2>Users</h2>
//         </div>

//         {/* Toolbar - Fixed layout: left=search/filter, right=button */}
//         <div className="staff-toolbar">
//           {/* Left Side: Search and Filter */}
//           <div className="toolbar-left">
//             {/* Role Filter */}
//             <div className="filter-container">
//               <select 
//                 className="role-filter"
//                 value={selectedRole}
//                 onChange={(e) => setSelectedRole(e.target.value)}
//               >
//                 {uniqueRoles.map((role) => (
//                   <option key={role} value={role}>
//                     {mapRole(role)}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Search Box */}
//             <div className="search-box">
//               <input
//                 type="text"
//                 placeholder="Search by name, email, phone, role, date..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <span className="search-icon">🔍</span>
//             </div>
//           </div>

//           {/* Right Side: Export Button */}
//           <div className="toolbar-right">
//             <button 
//               className="export-btn"
//               onClick={exportToExcel}
//             >
//               Export Excel
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="staff-table-wrapper">
//           <table className="staff-table">
//             <thead>
//               <tr>
//                 <th>S.No.</th>
//                 <th>User ID</th>
//                 <th>NAME</th>
//                 <th>EMAIL</th>
//                 <th>MOBILE</th>
//                 <th>ROLE</th>
//                 <th>REFERRAL ID</th>
//                 <th>CREATED AT</th>
//                 <th>STATUS</th>
//                 <th>LAST LOGIN</th>
//                 <th>ACTIONS</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="11" className="no-data">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : paginatedData.length > 0 ? (
//                 paginatedData.map((user, index) => (
//                   <tr key={user.id}>
//                     <td>{getSerialNumber(index)}</td>
//                     <td>{user.id}</td>
//                     <td className="name-cell">{user.name}</td>
//                     <td className="email-cell">{user.email}</td>
//                     <td>{user.phone}</td>
//                     <td>
//                       <span className="role-badge">{user.role}</span>
//                     </td>
//                     <td>{user.referralId}</td>
//                     <td>{user.displayDate}</td>
//                     <td>
//                       <select 
//                         className="status-select"
//                         value={user.status}
//                         onChange={(e) => handleStatusChange(user.id, e.target.value)}
//                         style={{
//                           color: user.status === "active" ? "#10b981" : "#ef4444",
//                           fontWeight: "bold"
//                         }}
//                       >
//                         <option value="active" style={{ color: "#10b981" }}>Active</option>
//                         <option value="inactive" style={{ color: "#ef4444" }}>Inactive</option>
//                       </select>
//                     </td>
//                     <td>{user.last_login}</td>
//                     <td className="actions">
//                       <button 
//                         className="view-btn"
//                         onClick={() => handleView(user.fullData)}
//                         title="View"
//                       >
//                         👁️
//                       </button>
//                       <button 
//                         className="edit-btn"
//                         onClick={() => handleEdit(user.fullData)}
//                         title="Edit"
//                       >
//                         ✏️
//                       </button>
//                       <button 
//                         className="delete-btn"
//                         onClick={() => handleDelete(user.id)}
//                         title="Delete"
//                       >
//                         🗑️
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="11" className="no-data">
//                     No users found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {pageCount > 1 && (
//           <div className="pagination-container">
//             <button
//               className="pagination-btn"
//               disabled={page === 1}
//               onClick={() => setPage(page - 1)}
//             >
//               ← Previous
//             </button>
            
//             <div className="page-numbers">
//               {[...Array(pageCount)].map((_, i) => {
//                 const pageNum = i + 1;
//                 if (pageNum === page || pageNum === page - 1 || pageNum === page + 1) {
//                   return (
//                     <button
//                       key={pageNum}
//                       className={`page-btn ${page === pageNum ? 'active' : ''}`}
//                       onClick={() => setPage(pageNum)}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 }
//                 return null;
//               })}
//             </div>
            
//             <button
//               className="pagination-btn"
//               disabled={page === pageCount}
//               onClick={() => setPage(page + 1)}
//             >
//               Next →
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Add CSS for new elements */}
//       <style jsx="true">{`
//         .staff-toolbar {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//           gap: 15px;
//           flex-wrap: wrap;
//         }
        
//         .toolbar-left {
//           display: flex;
//           align-items: center;
//           gap: 15px;
//           flex: 1;
//           flex-wrap: wrap;
//         }
        
//         .toolbar-right {
//           flex: 0 0 auto;
//         }
        
//         .filter-container {
//           flex: 0 0 auto;
//         }
        
//         .role-filter {
//           padding: 10px 15px;
//           border: 1px solid #ddd;
//           border-radius: 8px;
//           font-size: 14px;
//           background-color: white;
//           min-width: 150px;
//           cursor: pointer;
//         }
        
//         .role-filter:focus {
//           outline: none;
//           border-color: #6C63FF;
//         }
        
//         .search-box {
//           position: relative;
//           flex: 1;
//           min-width: 250px;
//           max-width: 400px;
//         }
        
//         .search-box input {
//           width: 100%;
//           padding: 10px 40px 10px 15px;
//           border: 1px solid #ddd;
//           border-radius: 8px;
//           font-size: 14px;
//           transition: border-color 0.3s;
//         }
        
//         .search-box input:focus {
//           outline: none;
//           border-color: #6C63FF;
//         }
        
//         .search-icon {
//           position: absolute;
//           right: 15px;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #666;
//           pointer-events: none;
//         }
        
//         .export-btn {
//           background-color: #10b981;
//           color: white;
//           border: none;
//           padding: 10px 20px;
//           border-radius: 8px;
//           cursor: pointer;
//           font-size: 14px;
//           transition: background-color 0.3s;
//           white-space: nowrap;
//           min-width: 120px;
//         }
        
//         .export-btn:hover {
//           background-color: #0da271;
//         }
        
//         .staff-table {
//           width: 100%;
//           border-collapse: collapse;
//         }
        
//         .staff-table th {
//           padding: 16px;
//           text-align: left;
//           font-weight: 600;
//           color: #495057;
//           font-size: 14px;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           background-color: #f8f9fa;
//           border-bottom: 2px solid #e9ecef;
//         }
        
//         .staff-table td {
//           padding: 16px;
//           border-bottom: 1px solid #e9ecef;
//           color: #333;
//         }
        
//         .staff-table tr:hover {
//           background-color: #f8f9fa;
//         }
        
//         .status-select {
//           padding: 6px 10px;
//           border-radius: 6px;
//           border: 1px solid #ddd;
//           background: white;
//           font-size: 13px;
//           cursor: pointer;
//           min-width: 100px;
//         }
        
//         .status-select:focus {
//           outline: none;
//           border-color: #6C63FF;
//         }
        
//         .view-btn, .edit-btn, .delete-btn {
//           width: 32px;
//           height: 32px;
//           border-radius: 6px;
//           border: none;
//           cursor: pointer;
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 14px;
//           transition: all 0.2s;
//           margin: 0 2px;
//         }
        
//         .view-btn {
//           background-color: #e7f3ff;
//           color: #1976d2;
//         }
        
//         .view-btn:hover {
//           background-color: #d0e7ff;
//         }
        
//         .edit-btn {
//           background-color: #fff4e5;
//           color: #f57c00;
//         }
        
//         .edit-btn:hover {
//           background-color: #ffe8cc;
//         }
        
//         .delete-btn {
//           background-color: #ffeaea;
//           color: #d32f2f;
//         }
        
//         .delete-btn:hover {
//           background-color: #ffd5d5;
//         }
        
//         .pagination-container {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           margin-top: 30px;
//           gap: 10px;
//         }
        
//         .pagination-btn {
//           padding: 8px 16px;
//           border: 1px solid #ddd;
//           background: white;
//           border-radius: 6px;
//           cursor: pointer;
//           font-size: 14px;
//           transition: all 0.2s;
//         }
        
//         .pagination-btn:hover:not(:disabled) {
//           background-color: #f0f0f0;
//         }
        
//         .pagination-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }
        
//         .page-numbers {
//           display: flex;
//           gap: 5px;
//         }
        
//         .page-btn {
//           width: 36px;
//           height: 36px;
//           border: 1px solid #ddd;
//           background: white;
//           border-radius: 6px;
//           cursor: pointer;
//           font-size: 14px;
//         }
        
//         .page-btn.active {
//           background-color: #6C63FF;
//           color: white;
//           border-color: #6C63FF;
//         }
        
//         .page-btn:hover:not(.active) {
//           background-color: #f0f0f0;
//         }
        
//         .no-data {
//           text-align: center;
//           padding: 40px !important;
//           color: #666;
//           font-style: italic;
//         }
        
//         @media (max-width: 768px) {
//           .staff-toolbar {
//             flex-direction: column;
//             align-items: stretch;
//             gap: 10px;
//           }
          
//           .toolbar-left {
//             flex-direction: column;
//             align-items: stretch;
//             gap: 10px;
//           }
          
//           .filter-container,
//           .search-box {
//             width: 100%;
//           }
          
//           .search-box {
//             max-width: 100%;
//           }
          
//           .role-filter {
//             width: 100%;
//           }
          
//           .toolbar-right {
//             width: 100%;
//           }
          
//           .export-btn {
//             width: 100%;
//           }
          
//           .staff-table-wrapper {
//             overflow-x: auto;
//           }
          
//           .actions {
//             white-space: nowrap;
//           }
//         }
        
//         @media (min-width: 769px) {
//           .toolbar-left {
//             flex-wrap: nowrap;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default UserList;



//===================================================================



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import "./Users.css";

// // ✅ Format date for display (dd/mm/yyyy)
// const formatDateForDisplay = (dateTimeString) => {
//   if (!dateTimeString) return "";
//   try {
//     const datePart = dateTimeString.split(" ")[0];
//     const [day, month, year] = datePart.split("-");
//     return `${day}/${month}/${year}`;
//   } catch (error) {
//     console.error("Error formatting date:", error);
//     return "";
//   }
// };

// // ✅ Format date for search (convert to dd-mm-yyyy for searching)
// const formatDateForSearch = (dateTimeString) => {
//   if (!dateTimeString) return "";
//   try {
//     const datePart = dateTimeString.split(" ")[0];
//     const [day, month, year] = datePart.split("-");
//     return `${day}-${month}-${year}`;
//   } catch (error) {
//     console.error("Error formatting date for search:", error);
//     return "";
//   }
// };

// // ✅ Normalize search query to handle different date formats
// const normalizeSearchQuery = (query) => {
//   if (!query) return "";
  
//   // Convert dd/mm/yyyy to dd-mm-yyyy for searching
//   const datePattern1 = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
//   const datePattern2 = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
  
//   if (datePattern1.test(query)) {
//     return query.replace(/\//g, '-');
//   } else if (datePattern2.test(query)) {
//     return query;
//   }
  
//   return query;
// };

// // ✅ ROLE MAPPING FUNCTION
// const mapRole = (role) => {
//   if (role === "Agent") return "Team";
//   if (role === "Client") return "User";
//   return role;
// };

// const UserList = () => {
//   const navigate = useNavigate();
//   const [staff, setStaff] = useState([]);
//   const [filteredStaff, setFilteredStaff] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedRole, setSelectedRole] = useState("All");
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const rowsPerPage = 5;

//   useEffect(() => {
//     fetchStaff();
//   }, []);

//   const fetchStaff = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseurl}/users/`);
//       const data = res.data.results || res.data || [];
      
//       const transformed = data.map((user) => ({
//         id: user.user_id,
//         first_name: user.first_name,
//         last_name: user.last_name,
//         name: `${user.first_name} ${user.last_name}`,
//         email: user.email,
//         phone: user.phone_number,
//         status: user.status,
//         role: mapRole(user.roles?.[0]?.role_name || ""),
//         referralId: user.referral_id,
//         kycStatus: user.kyc_status,
//         fullData: user,
//         created_at: user.created_at,
//         displayDate: formatDateForDisplay(user.created_at),
//         searchDate: formatDateForSearch(user.created_at),
//         last_login: user.last_login || "Never"
//       }));
      
//       setStaff(transformed);
//       setFilteredStaff(transformed);
//     } catch (err) {
//       console.error("Error fetching staff:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to load staff data",
//         confirmButtonColor: "#6C63FF",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get unique roles for filter
//   const uniqueRoles = ["All", ...new Set(staff.map((user) => user.role).filter(Boolean))];

//   // Apply filters and search
//   useEffect(() => {
//     let result = [...staff];
    
//     // Apply role filter
//     if (selectedRole !== "All") {
//       result = result.filter(user => user.role === selectedRole);
//     }
    
//     // Apply search filter
//     if (searchQuery.trim()) {
//       const normalizedQuery = normalizeSearchQuery(searchQuery.toLowerCase());
      
//       result = result.filter((user) => {
//         const searchableFields = [
//           user.id?.toString() || "",
//           user.first_name?.toLowerCase() || "",
//           user.last_name?.toLowerCase() || "",
//           user.name?.toLowerCase() || "",
//           user.email?.toLowerCase() || "",
//           user.phone?.toString() || "",
//           user.role?.toLowerCase() || "",
//           user.referralId?.toString() || "",
//           user.displayDate?.toLowerCase() || "",
//           user.searchDate?.toLowerCase() || "",
//           user.status?.toLowerCase() || ""
//         ];
        
//         const searchableText = searchableFields.join(" ");
//         return searchableText.includes(normalizedQuery);
//       });
//     }
    
//     // Sort by ID (newest first)
//     result = result.sort((a, b) => b.id - a.id);
//     setFilteredStaff(result);
//     setPage(1); // Reset to first page on filter change
//   }, [staff, selectedRole, searchQuery]);

//   // Pagination
//   const startIndex = (page - 1) * rowsPerPage;
//   const paginatedData = filteredStaff.slice(startIndex, startIndex + rowsPerPage);
//   const pageCount = Math.ceil(filteredStaff.length / rowsPerPage);

//   const getSerialNumber = (index) => startIndex + index + 1;

//   // Export to Excel (CSV)
//   const exportToExcel = () => {
//     if (filteredStaff.length === 0) {
//       Swal.fire({
//         icon: "warning",
//         title: "No Data",
//         text: "There is no data to export.",
//       });
//       return;
//     }

//     const headers = [
//       "S.No",
//       "User ID",
//       "First Name",
//       "Last Name",
//       "Email",
//       "Phone",
//       "Role",
//       "Referral ID",
//       "Created At",
//       "Status",
    
//     ];

//     const csvContent = [
//       headers.join(","),
//       ...filteredStaff.map((user, index) =>
//         [
//           index + 1,
//           user.id,
//           `"${user.first_name}"`,
//           `"${user.last_name}"`,
//           `"${user.email}"`,
//           `"${user.phone}"`,
//           `"${user.role}"`,
//           `"${user.referralId}"`,
//           `"${user.displayDate}"`,
//           `"${user.status}"`,
//         ].join(",")
//       )
//     ].join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     const url = URL.createObjectURL(blob);
//     const timestamp = new Date().toISOString().split("T")[0];

//     link.setAttribute("href", url);
//     link.setAttribute("download", `users_${timestamp}.csv`);
//     link.style.visibility = "hidden";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     Swal.fire({
//       icon: "success",
//       title: "Export Successful",
//       text: `Exported ${filteredStaff.length} users to CSV file.`,
//       timer: 2000,
//       showConfirmButton: false
//     });
//   };

//   // Handle Actions
//   const handleView = (user) => {
//     navigate("/View_Tmanagement", { state: { user } });
//   };

//   const handleEdit = (user) => {
//     navigate("/Edit_Tmanagement", { state: { user } });
//   };

//   const handleDelete = (user_id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Do you really want to delete this user?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios.delete(`${baseurl}/users/${user_id}/`)
//           .then((res) => {
//             if (res.status === 204 || res.status === 200) {
//               setStaff(prev => prev.filter(user => user.id !== user_id));
//               Swal.fire({
//                 icon: "success",
//                 title: "Deleted!",
//                 text: "User has been deleted.",
//                 timer: 2000,
//                 showConfirmButton: false
//               });
//             } else {
//               Swal.fire({
//                 icon: "error",
//                 title: "Failed",
//                 text: "Failed to delete user."
//               });
//             }
//           })
//           .catch((err) => {
//             Swal.fire({
//               icon: "error",
//               title: "Error",
//               text: "Error deleting user, please try again."
//             });
//           });
//       }
//     });
//   };

//   const handleStatusChange = async (userId, newStatus) => {
//     try {
//       await axios.put(`${baseurl}/users/${userId}/`, { status: newStatus });
//       setStaff(prev => prev.map(user => 
//         user.id === userId 
//           ? { ...user, status: newStatus, fullData: { ...user.fullData, status: newStatus } }
//           : user
//       ));
//       Swal.fire({
//         icon: "success",
//         title: "Updated!",
//         text: "Status updated successfully.",
//         timer: 1500,
//         showConfirmButton: false
//       });
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to update status."
//       });
//     }
//   };

//   return (
//     <>
//       <WebsiteNavbar />

//       <div className="staff-page">
//         {/* Header */}
//         <div className="staff-header">
//           <h2>Users</h2>
//         </div>

//         {/* Toolbar - Fixed layout: left=search/filter, right=button */}
//         <div className="staff-toolbar">
//           {/* Left Side: Search and Filter */}
//           <div className="toolbar-left">
//             {/* Role Filter */}
//             <div className="filter-container">
//               <select 
//                 className="role-filter"
//                 value={selectedRole}
//                 onChange={(e) => setSelectedRole(e.target.value)}
//               >
//                 {uniqueRoles.map((role) => (
//                   <option key={role} value={role}>
//                     {mapRole(role)}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Search Box */}
//             <div className="search-box">
//               <input
//                 type="text"
//                 placeholder="Search by name, email, phone, role, date..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <span className="search-icon">🔍</span>
//             </div>
//           </div>

//           {/* Right Side: Export Button */}
//           <div className="toolbar-right">
//             <button 
//               className="export-btn"
//                style={{
//                       backgroundColor: '#273c75',
//                       borderColor: '#273c75',
//                       color: 'white'
//                     }}

              
//               onClick={exportToExcel}
//             >
//               Export Excel
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="staff-table-wrapper">
//           <table className="staff-table">
//             <thead>
//               <tr>
//                 <th>S.No.</th>
//                 <th>User ID</th>
//                 <th>NAME</th>
//                 <th>EMAIL</th>
//                 <th>MOBILE</th>
//                 <th>ROLE</th>
//                 <th>REFERRAL ID</th>
//                 <th>CREATED AT</th>
//                 <th>STATUS</th>
//                 <th>ACTIONS</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="11" className="no-data">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : paginatedData.length > 0 ? (
//                 paginatedData.map((user, index) => (
//                   <tr key={user.id}>
//                     <td>{getSerialNumber(index)}</td>
//                     <td>{user.id}</td>
//                     <td className="name-cell">{user.name}</td>
//                     <td className="email-cell">{user.email}</td>
//                     <td>{user.phone}</td>
//                     <td>
//                       <span className="role-badge">{user.role}</span>
//                     </td>
//                     <td>{user.referralId}</td>
//                     <td>{user.displayDate}</td>
//                     <td>
//                       <select 
//                         className="status-select"
//                         value={user.status}
//                         onChange={(e) => handleStatusChange(user.id, e.target.value)}
//                         style={{
//                           color: user.status === "active" ? "#10b981" : "#ef4444",
//                           fontWeight: "bold"
//                         }}
//                       >
//                         <option value="active" style={{ color: "#10b981" }}>Active</option>
//                         <option value="inactive" style={{ color: "#ef4444" }}>Inactive</option>
//                       </select>
//                     </td>
//                     <td className="actions">
//                       <button 
//                         className="view-btn action-btn"
//                         onClick={() => handleView(user.fullData)}
//                         title="View"
//                       >
//                         👁️
//                       </button>
//                       <button 
//                         className="edit-btn action-btn"
//                         onClick={() => handleEdit(user.fullData)}
//                         title="Edit"
//                       >
//                         ✏️
//                       </button>
//                       <button 
//                         className="delete-btn action-btn"
//                         onClick={() => handleDelete(user.id)}
//                         title="Delete"
//                       >
//                         🗑️
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="11" className="no-data">
//                     No users found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {pageCount > 1 && (
//           <div className="pagination-container">
//             <button
//               className="pagination-btn"
//               disabled={page === 1}
//               onClick={() => setPage(page - 1)}
//             >
//               ← Previous
//             </button>
            
//             <div className="page-numbers">
//               {[...Array(pageCount)].map((_, i) => {
//                 const pageNum = i + 1;
//                 if (pageNum === page || pageNum === page - 1 || pageNum === page + 1) {
//                   return (
//                     <button
//                       key={pageNum}
//                       className={`page-btn ${page === pageNum ? 'active' : ''}`}
//                       onClick={() => setPage(pageNum)}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 }
//                 return null;
//               })}
//             </div>
            
//             <button
//               className="pagination-btn"
//               disabled={page === pageCount}
//               onClick={() => setPage(page + 1)}
//             >
//               Next →
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default UserList;



//=====================================================================

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

const UserList = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [loading, setLoading] = useState(true);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchStaff();
  }, [currentPage, itemsPerPage]);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      // Build query parameters for pagination
      const params = new URLSearchParams({
        page: currentPage,
        page_size: itemsPerPage,
      });
      
      // Add role filter if not "All"
      if (selectedRole !== "All") {
        params.append('role', selectedRole === "Team" ? "Agent" : selectedRole);
      }
      
      // Add search query if exists
      if (searchQuery.trim()) {
        const normalizedQuery = normalizeSearchQuery(searchQuery);
        params.append('search', normalizedQuery);
      }
      
      const res = await axios.get(`${baseurl}/users/?${params.toString()}`);
      
      // Handle different response formats
      let data = [];
      let count = 0;
      
      if (Array.isArray(res.data)) {
        data = res.data;
        count = res.data.length;
      } else if (res.data.results) {
        data = res.data.results || [];
        count = res.data.count || data.length;
      } else {
        data = res.data;
        count = res.data.length || 0;
      }
      
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
      setTotalItems(count);
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

  // Apply filters and search - Now handled server-side in fetchStaff
  useEffect(() => {
    fetchStaff();
  }, [searchQuery, selectedRole]);

  // Calculate pagination values
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  // Export to Excel (CSV)
  const exportToExcel = () => {
    if (staff.length === 0) {
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
    ];

    const csvContent = [
      headers.join(","),
      ...staff.map((user, index) =>
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
      text: `Exported ${staff.length} users to CSV file.`,
      timer: 2000,
      showConfirmButton: false
    });
  };

  // Handle Actions
  const handleView = (user) => {
    navigate(`/admin-view-user/${user.user_id}`, { state: { user } });
  };

  const handleEdit = (user) => {
    navigate(`/admin-edit-user/${user.user_id}`, { state: { user } });
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
              // Refetch data after deletion
              fetchStaff();
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
      // Refetch data to get updated status
      fetchStaff();
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

  // Handle search and filter reset
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleRoleFilterChange = (e) => {
    setSelectedRole(e.target.value);
    setCurrentPage(1); // Reset to first page when filtering
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
                onChange={handleRoleFilterChange}
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
                onChange={handleSearchChange}
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          {/* Right Side: Export Button */}
          <div className="toolbar-right">
            <button 
              className="export-btn"
              style={{
                backgroundColor: '#273c75',
                borderColor: '#273c75',
                color: 'white'
              }}
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
              ) : filteredStaff.length > 0 ? (
                filteredStaff.map((user, index) => (
                  <tr key={user.id}>
                    <td>{startIndex + index}</td>
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
                    <td className="actions">
                      <button 
                        className="view-btn action-btn"
                        onClick={() => handleView(user.fullData)}
                        title="View"
                      >
                        👁️
                      </button>
                      <button 
                        className="edit-btn action-btn"
                        onClick={() => handleEdit(user.fullData)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button 
                        className="delete-btn action-btn"
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
          
          {/* Pagination Controls - Same as first table */}
          {totalItems > 0 && (
            <div className="pagination-container" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              borderTop: '1px solid #eee',
              backgroundColor: '#f8f9fa'
            }}>
              {/* Items per page selector */}
              <div className="items-per-page" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#666' }}>Show:</span>
                <select 
                  value={itemsPerPage} 
                  onChange={handleItemsPerPageChange}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span style={{ fontSize: '14px', color: '#666' }}>
                  of {totalItems} items
                </span>
              </div>
              
              {/* Page navigation */}
              <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* First Page */}
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    background: currentPage === 1 ? '#f8f9fa' : 'white',
                    color: currentPage === 1 ? '#ccc' : '#333',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontSize: '14px'
                  }}
                >
                  ««
                </button>
                
                {/* Previous Page */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    background: currentPage === 1 ? '#f8f9fa' : 'white',
                    color: currentPage === 1 ? '#ccc' : '#333',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontSize: '14px'
                  }}
                >
                  «
                </button>
                
                {/* Page Numbers */}
                {getPageNumbers().map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      background: currentPage === page ? '#273c75' : 'white',
                      color: currentPage === page ? 'white' : '#333',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: currentPage === page ? 'bold' : 'normal'
                    }}
                  >
                    {page}
                  </button>
                ))}
                
                {/* Next Page */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    background: currentPage === totalPages ? '#f8f9fa' : 'white',
                    color: currentPage === totalPages ? '#ccc' : '#333',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontSize: '14px'
                  }}
                >
                  »
                </button>
                
                {/* Last Page */}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    background: currentPage === totalPages ? '#f8f9fa' : 'white',
                    color: currentPage === totalPages ? '#ccc' : '#333',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontSize: '14px'
                  }}
                >
                  »»
                </button>
              </div>
              
              {/* Current page info */}
              <div className="page-info" style={{ fontSize: '14px', color: '#666' }}>
                Page {currentPage} of {totalPages}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserList;