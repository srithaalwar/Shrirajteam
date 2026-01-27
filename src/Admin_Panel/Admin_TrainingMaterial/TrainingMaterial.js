// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import Swal from "sweetalert2";
// import "bootstrap/dist/css/bootstrap.min.css";
// // import "./TrainingMaterial.css";

// function TrainingMaterial() {
//   const [materials, setMaterials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 6;

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchMaterials();
//   }, []);

//   const fetchMaterials = () => {
//     setLoading(true);
//     fetch(`${baseurl}/training-materials/`)
//       .then((res) => res.json())
//       .then((data) => {
//         setMaterials(data?.results || []); // ✅ pagination fix
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   };

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         fetch(`${baseurl}/training-materials/${id}/`, {
//           method: "DELETE",
//         }).then((res) => {
//           if (res.ok) {
//             Swal.fire("Deleted!", "Material deleted.", "success");
//             fetchMaterials();
//           }
//         });
//       }
//     });
//   };

//   const totalPages = Math.ceil(materials.length / itemsPerPage);
//   const paginatedMaterials = materials.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   return (
//     <>
//       <AdminNavbar />

//       <div className="container my-4">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h3 className="fw-bold">Training Materials</h3>
//           <button
//             className="btn "
//             onClick={() => navigate("/admin-addtrainingmaterial")}
// style={{
//     backgroundColor: '#273c75',
//     borderColor: '#273c75',
//     color: 'white'
//   }}

//           >
//             + Add Video
//           </button>
//         </div>

//         {loading ? (
//           <div className="text-center my-5">
//             <div className="spinner-border text-primary" />
//           </div>
//         ) : (
//           <>
//             <div className="row">
//               {paginatedMaterials.map((item) => (
//                 <div className="col-md-4 mb-4" key={item.id}>
//                   <div className="card training-card h-100">
//                     <video
//                       className="card-img-top training-video"
//                       controls
//                       src={`${baseurl}/${item.video}`}
//                     />

//                     <div className="card-body">
//                       <div className="d-flex justify-content-between mb-2">
//                         <small className="text-primary">
//                           Department: {item.department_name || "-"}
//                         </small>
//                         <div>
//                           <button
//                             className="btn btn-sm btn-outline-primary me-2"
//                             onClick={() =>
//                               navigate("/admin-edittrainingmaterial", {
//                                 state: { material: item },
//                               })
//                             }
//                           >
//                             Edit
//                           </button>
//                           <button
//                             className="btn btn-sm btn-outline-danger"
//                             onClick={() => handleDelete(item.id)}
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </div>

//                       <h6>{item.title}</h6>
//                       <p className="text-muted small">
//                         {item.description}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination */}
//             <div className="d-flex justify-content-end mt-3">
//               <ul className="pagination">
//                 {[...Array(totalPages)].map((_, i) => (
//                   <li
//                     key={i}
//                     className={`page-item ${
//                       page === i + 1 ? "active" : ""
//                     }`}
//                   >
//                     <button
//                       className="page-link"
//                       onClick={() => setPage(i + 1)}
//                     >
//                       {i + 1}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// export default TrainingMaterial;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import Swal from "sweetalert2";
// import "bootstrap/dist/css/bootstrap.min.css";
// // import "./TrainingMaterial.css";

// function TrainingMaterial() {
//   const [materials, setMaterials] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDept, setSelectedDept] = useState("all");
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 6;

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchMaterials();
//     fetchDepartments();
//   }, []);

//   const fetchMaterials = () => {
//     setLoading(true);
//     fetch(`${baseurl}/training-materials/`)
//       .then((res) => res.json())
//       .then((data) => {
//         setMaterials(data?.results || []);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   };

//   const fetchDepartments = () => {
//     fetch(`${baseurl}/departments/`)
//       .then((res) => res.json())
//       .then((data) => {
//         setDepartments(data?.results || []);
//       })
//       .catch((err) => {
//         console.error("Error fetching departments:", err);
//         setDepartments([]);
//       });
//   };

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         fetch(`${baseurl}/training-materials/${id}/`, {
//           method: "DELETE",
//         }).then((res) => {
//           if (res.ok) {
//             Swal.fire("Deleted!", "Material deleted.", "success");
//             fetchMaterials();
//           }
//         });
//       }
//     });
//   };

//   // Filter materials based on selected department
//   const filteredMaterials =
//     selectedDept === "all"
//       ? materials
//       : materials.filter(
//           (item) => String(item.department) === String(selectedDept)
//         );

//   // Pagination calculations for filtered materials
//   const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);
//   const paginatedMaterials = filteredMaterials.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   // Reset page to 1 when filter changes
//   useEffect(() => {
//     setPage(1);
//   }, [selectedDept]);

//   return (
//     <>
//       <AdminNavbar />

//       <div className="container my-4">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h3 className="fw-bold">Training Materials</h3>
//           <button
//             className="btn"
//             onClick={() => navigate("/admin-addtrainingmaterial")}
//             style={{
//               backgroundColor: "#273c75",
//               borderColor: "#273c75",
//               color: "white",
//             }}
//           >
//             + Add Video
//           </button>
//         </div>

//         {/* Department Filter Buttons */}
//         <div className="d-flex flex-wrap gap-2 mb-4">
//           <button
//             className={`btn ${
//               selectedDept === "all" ? "btn-primary" : "btn-outline-primary"
//             }`}
//             onClick={() => setSelectedDept("all")}
//           >
//             All
//           </button>

//           {departments.map((dept) => (
//             <button
//               key={dept.id}
//               className={`btn ${
//                 selectedDept === dept.id
//                   ? "btn-primary"
//                   : "btn-outline-primary"
//               }`}
//               onClick={() => setSelectedDept(dept.id)}
//             >
//               {dept.name}
//             </button>
//           ))}
//         </div>

//         {loading ? (
//           <div className="text-center my-5">
//             <div className="spinner-border text-primary" />
//           </div>
//         ) : (
//           <>
//             {/* Filtered count display */}
//             <div className="mb-3">
//               <small className="text-muted">
//                 Showing {filteredMaterials.length} material(s)
//                 {selectedDept !== "all" && " in selected department"}
//               </small>
//             </div>

//             <div className="row">
//               {paginatedMaterials.length === 0 ? (
//                 <div className="col-12">
//                   <div className="alert alert-info text-center">
//                     No training materials found
//                     {selectedDept !== "all" && " for this department"}.
//                   </div>
//                 </div>
//               ) : (
//                 paginatedMaterials.map((item) => (
//                   <div className="col-md-4 mb-4" key={item.id}>
//                     <div className="card training-card h-100">
//                       <video
//                         className="card-img-top training-video"
//                         controls
//                         src={`${baseurl}/${item.video}`}
//                       />

//                       <div className="card-body">
//                         <div className="d-flex justify-content-between mb-2">
//                           <small className="text-primary">
//                             Department: {item.department_name || "-"}
//                           </small>
//                           <div>
//                             <button
//                               className="btn btn-sm btn-outline-primary me-2"
//                               onClick={() =>
//                                 navigate("/admin-edittrainingmaterial", {
//                                   state: { material: item },
//                                 })
//                               }
//                             >
//                               Edit
//                             </button>
//                             <button
//                               className="btn btn-sm btn-outline-danger"
//                               onClick={() => handleDelete(item.id)}
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </div>

//                         <h6>{item.title}</h6>
//                         <p className="text-muted small">{item.description}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>

//             {/* Pagination - Only show if there are materials */}
//             {filteredMaterials.length > 0 && totalPages > 1 && (
//               <div className="d-flex justify-content-end mt-3">
//                 <ul className="pagination">
//                   <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
//                     <button
//                       className="page-link"
//                       onClick={() => setPage(page - 1)}
//                       disabled={page === 1}
//                     >
//                       &laquo;
//                     </button>
//                   </li>
//                   {[...Array(totalPages)].map((_, i) => (
//                     <li
//                       key={i}
//                       className={`page-item ${
//                         page === i + 1 ? "active" : ""
//                       }`}
//                     >
//                       <button
//                         className="page-link"
//                         onClick={() => setPage(i + 1)}
//                       >
//                         {i + 1}
//                       </button>
//                     </li>
//                   ))}
//                   <li
//                     className={`page-item ${
//                       page === totalPages ? "disabled" : ""
//                     }`}
//                   >
//                     <button
//                       className="page-link"
//                       onClick={() => setPage(page + 1)}
//                       disabled={page === totalPages}
//                     >
//                       &raquo;
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// export default TrainingMaterial;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./TrainingMaterial.css";

function TrainingMaterial() {
  const [materials, setMaterials] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const navigate = useNavigate();

  useEffect(() => {
    fetchMaterials();
    fetchDepartments();
  }, []);

  const fetchMaterials = () => {
    setLoading(true);
    fetch(`${baseurl}/training-materials/`)
      .then((res) => res.json())
      .then((data) => {
        setMaterials(data?.results || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const fetchDepartments = () => {
    fetch(`${baseurl}/departments/`)
      .then((res) => res.json())
      .then((data) => {
        setDepartments(data?.results || []);
      })
      .catch((err) => {
        console.error("Error fetching departments:", err);
        setDepartments([]);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${baseurl}/training-materials/${id}/`, {
          method: "DELETE",
        }).then((res) => {
          if (res.ok) {
            Swal.fire("Deleted!", "Material deleted.", "success");
            fetchMaterials();
          }
        });
      }
    });
  };

  // Filter materials based on selected department
  const filteredMaterials =
    selectedDept === "all"
      ? materials
      : materials.filter(
          (item) => String(item.department) === String(selectedDept)
        );

  // Pagination calculations for filtered materials
  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);
  const paginatedMaterials = filteredMaterials.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Reset page to 1 when filter changes
  useEffect(() => {
    setPage(1);
  }, [selectedDept]);

  return (
    <>
      <AdminNavbar />

      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold">Training Materials</h3>
          <button
            className="btn"
            onClick={() => navigate("/admin-addtrainingmaterial")}
            style={{
              backgroundColor: "#273c75",
              borderColor: "#273c75",
              color: "white",
            }}
          >
            + Add Video
          </button>
        </div>

        {/* Department Filter with Horizontal Scroll */}
        <div className="mb-4">
          <h6 className="mb-2 fw-semibold">Filter by Department:</h6>
          <div className="position-relative">
            <div
              className="d-flex overflow-auto pb-2"
              style={{
                scrollbarWidth: 'thin',
                msOverflowStyle: 'auto',
              }}
            >
              <div className="d-flex flex-nowrap gap-2">
                {/* All Departments Button */}
                <button
                  className={`btn flex-shrink-0 ${
                    selectedDept === "all" ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => setSelectedDept("all")}
                >
                  All Departments
                </button>

                {/* Department Buttons */}
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    className={`btn flex-shrink-0 ${
                      selectedDept === dept.id
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setSelectedDept(dept.id)}
                  >
                    {dept.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Optional scroll indicators */}
            <div className="d-none d-md-flex justify-content-between mt-2">
              <small className="text-muted">← Scroll for more departments →</small>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" />
          </div>
        ) : (
          <>
            {/* Filtered count display */}
            <div className="mb-3">
              <small className="text-muted">
                Showing {filteredMaterials.length} material(s)
                {selectedDept !== "all" && 
                  ` in ${departments.find(d => d.id === parseInt(selectedDept))?.name || 'selected'} department`}
              </small>
            </div>

            <div className="row">
              {paginatedMaterials.length === 0 ? (
                <div className="col-12">
                  <div className="alert alert-info text-center">
                    No training materials found
                    {selectedDept !== "all" && " for this department"}.
                  </div>
                </div>
              ) : (
                paginatedMaterials.map((item) => (
                  <div className="col-md-4 mb-4" key={item.id}>
                    <div className="card training-card h-100">
                      <video
                        className="card-img-top training-video"
                        controls
                        src={`${baseurl}/${item.video}`}
                      />

                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-2">
                          <small className="text-primary">
                            Department: {item.department_name || "-"}
                          </small>
                          <div>
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() =>
                                navigate("/admin-edittrainingmaterial", {
                                  state: { material: item },
                                })
                              }
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        <h6>{item.title}</h6>
                        <p className="text-muted small">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination - Only show if there are materials */}
            {filteredMaterials.length > 0 && totalPages > 1 && (
              <div className="d-flex justify-content-end mt-3">
                <ul className="pagination">
                  <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                    >
                      &laquo;
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        page === i + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      page === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setPage(page + 1)}
                      disabled={page === totalPages}
                    >
                      &raquo;
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default TrainingMaterial;