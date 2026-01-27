// import React, { useEffect, useState } from "react";
// import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { baseurl } from "../../BaseURL/BaseURL";
// import "./ChatBot.css";

// function Chatbot() {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Pagination states
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`${baseurl}/responses/`);
//         setData(res.data.results || []);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to load data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleCreate = () => {
//     navigate("/admin-createq&a");
//   };

//   // Pagination logic
//   const startIndex = (page - 1) * itemsPerPage;
//   const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);
//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this Q&A?")) {
//       try {
//         await axios.delete(`${baseurl}/responses/${id}/`);
//         setData(data.filter((item) => item.id !== id));
//       } catch (err) {
//         console.error("Error deleting Q&A:", err);
//         alert("Failed to delete Q&A");
//       }
//     }
//   };

//   return (
//     <>
//       <AdminNavbar />
//       <div className="chatbot-container">
//         {/* Header */}
//         <div className="chatbot-header">
//           <h2 className="chatbot-title">Chatbot Q&A Table</h2>
//           <button
//             className="btn btn-primary create-btn"
//             onClick={handleCreate}
//           >
//             Create Q&A
//           </button>
//         </div>

//         {/* Loader / Error */}
//         {loading ? (
//           <div className="text-center my-4">
//             <div className="spinner-border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         ) : error ? (
//           <div className="alert alert-danger text-center" role="alert">
//             {error}
//           </div>
//         ) : (
//           <>
//             <div className="table-responsive">
//               <table className="table table-striped table-hover">
//                 <thead className="table-light">
//                   <tr>
//                     <th scope="col">Question</th>
//                     <th scope="col">Answer</th>
//                     <th scope="col">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {paginatedData.length > 0 ? (
//                     paginatedData.map((item, index) => (
//                       <tr key={index}>
//                         <td>{item.question}</td>
//                         <td>{item.answer}</td>
//                         <td>
//                           <button
//                             className="btn btn-sm btn-outline-primary me-2"
//                             onClick={() => navigate(`/admin-editqa/${item.id}`)}
//                           >
//                             <i className="bi bi-pencil"></i> Edit
//                           </button>
//                           <button
//                             className="btn btn-sm btn-outline-danger"
//                             onClick={() => handleDelete(item.id)}
//                           >
//                             <i className="bi bi-trash"></i> Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="3" className="text-center">
//                         No data available
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {!loading && data.length > 0 && (
//               <nav aria-label="Page navigation" className="mt-3">
//                 <ul className="pagination justify-content-end">
//                   <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
//                     <button
//                       className="page-link"
//                       onClick={() => setPage(page - 1)}
//                     >
//                       Previous
//                     </button>
//                   </li>
//                   {[...Array(totalPages)].map((_, i) => (
//                     <li
//                       key={i}
//                       className={`page-item ${page === i + 1 ? "active" : ""}`}
//                     >
//                       <button
//                         className="page-link"
//                         onClick={() => setPage(i + 1)}
//                       >
//                         {i + 1}
//                       </button>
//                     </li>
//                   ))}
//                   <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
//                     <button
//                       className="page-link"
//                       onClick={() => setPage(page + 1)}
//                     >
//                       Next
//                     </button>
//                   </li>
//                 </ul>
//               </nav>
//             )}
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// export default Chatbot;




import React, { useEffect, useState } from "react";
import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../../BaseURL/BaseURL";
import "./ChatBot.css";
import Swal from "sweetalert2";

function Chatbot() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  // Pagination states
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseurl}/responses/`);
        const results = res.data.results || res.data || [];
        setData(results);
        setFilteredData(results);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* ================= SEARCH ================= */
  const safeToString = (v) => (v ? v.toString() : "");

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredData(data);
      return;
    }

    const q = searchQuery.toLowerCase();
    const filtered = data.filter(
      (item) =>
        safeToString(item.question).toLowerCase().includes(q) ||
        safeToString(item.answer).toLowerCase().includes(q) ||
        safeToString(item.id).includes(q)
    );

    setFilteredData(filtered);
  }, [searchQuery, data]);

  const handleCreate = () => {
    navigate("/admin-createq&a");
  };

  const handleEdit = (id) => {
    navigate(`/admin-editqa/${id}`);
  };

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This Q&A will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${baseurl}/responses/${id}/`);
          const updatedData = data.filter((item) => item.id !== id);
          setData(updatedData);
          setFilteredData(updatedData);
          Swal.fire("Deleted!", "Q&A has been deleted.", "success");
        } catch (err) {
          console.error("Error deleting Q&A:", err);
          Swal.fire("Error!", "Failed to delete Q&A.", "error");
        }
      }
    });
  };

  // Pagination logic
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <AdminNavbar />

      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <h2>Chatbot Q&A</h2>
        </div>

        {/* Toolbar */}
        <div className="page-toolbar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search questions or answers..."
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
            onClick={handleCreate}
          >
            Create Q&A
          </button>
        </div>

        {/* Table */}
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>ID</th>
                <th>QUESTION</th>
                <th>ANSWER</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="no-data">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="no-data error">
                    {error}
                  </td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{item.id}</td>
                    <td className="question-cell">{item.question}</td>
                    <td className="answer-cell">{item.answer}</td>
                    <td className="actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(item.id)}
                      >
                        ✏️
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(item.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No Q&A data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {!loading && !error && filteredData.length > 0 && totalPages > 1 && (
            <div className="pagination-container">
              <div className="pagination-info">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
                {filteredData.length} entries
              </div>
              <div className="pagination-controls">
                <button
                  className="pagination-btn"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  ← Previous
                </button>
                <div className="page-numbers">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      className={`page-number ${page === i + 1 ? "active" : ""}`}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  className="pagination-btn"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Chatbot;