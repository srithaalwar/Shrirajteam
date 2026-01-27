// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Training_Material.css";

// function TrainingVideos() {
//   const [materials, setMaterials] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDept, setSelectedDept] = useState("all");

//   const navigate = useNavigate();

//   /* -----------------------------
//      Fetch Training Materials
//   ------------------------------*/





//   useEffect(() => {
//     setLoading(true);

//     fetch(`${baseurl}/training-materials/`)
//       .then((res) => res.json())
//       .then((data) => {
//         // ✅ paginated response
//         setMaterials(data?.results || []);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching training materials:", error);
//         setMaterials([]);
//         setLoading(false);
//       });
//   }, []);

//   /* -----------------------------
//      Fetch Departments (FIXED)
//   ------------------------------*/
//   useEffect(() => {
//     fetch(`${baseurl}/departments/`)
//       .then((res) => res.json())
//       .then((data) => {
//         // ✅ FIX: paginated departments
//         setDepartments(data?.results || []);
//       })
//       .catch((err) => {
//         console.error("Error fetching departments:", err);
//         setDepartments([]);
//       });
//   }, []);

//   /* -----------------------------
//      Filter Materials
//   ------------------------------*/
//   const filteredMaterials =
//     selectedDept === "all"
//       ? materials
//       : materials.filter(
//           (item) => String(item.department) === String(selectedDept)
//         );

//   return (
//     <>
//       <AgentNavbar />

//       <div className="container my-4">
//         <h3 className="mb-4 fw-bold">Training Materials</h3>

//         {/* -----------------------------
//             Department Filter Buttons
//         ------------------------------*/}
//         {/* <div className="d-flex flex-wrap gap-2 mb-4">
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
//         </div> */}

//         {/* Department Filter Buttons */}
// <div className="d-flex flex-wrap gap-2 mb-4">
//   <button
//     className={`custom-btn ${selectedDept === "all" ? "custom-btn-filled" : "custom-btn-outline"}`}
//     onClick={() => setSelectedDept("all")}
//   >
//     All
//   </button>

//   {departments.map((dept) => (
//     <button
//       key={dept.id}
//       className={`custom-btn ${selectedDept === dept.id ? "custom-btn-filled" : "custom-btn-outline"}`}
//       onClick={() => setSelectedDept(dept.id)}
//     >
//       {dept.name}
//     </button>
//   ))}
// </div>

//         {/* -----------------------------
//             Loading State
//         ------------------------------*/}
//         {loading ? (
//           <div className="text-center my-5">
//             <div className="spinner-border text-primary" role="status" />
//           </div>
//         ) : (
//           <div className="row">
//             {filteredMaterials.length === 0 ? (
//               <p className="text-muted fs-6">
//                 No Training Materials Found.
//               </p>
//             ) : (
//               filteredMaterials.map((item) => (
//                 <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
//                   <div className="card training-card h-100">
//                     <video
//                       className="card-img-top training-video"
//                       controls
//                       src={`${baseurl}${item.video}`}
//                     />

//                     <div className="card-body">
//                       <h5 className="card-title fw-semibold">
//                         {item.title}
//                       </h5>
//                       <p className="card-text text-muted small">
//                         {item.description || "No description available"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default TrainingVideos;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Training_Material.css";

function TrainingVideos() {
  const [materials, setMaterials] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState("all");

  const navigate = useNavigate();

  /* -----------------------------
     Fetch Training Materials
  ------------------------------*/
  useEffect(() => {
    setLoading(true);

    fetch(`${baseurl}/training-materials/`)
      .then((res) => res.json())
      .then((data) => {
        setMaterials(data?.results || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching training materials:", error);
        setMaterials([]);
        setLoading(false);
      });
  }, []);

  /* -----------------------------
     Fetch Departments
  ------------------------------*/
  useEffect(() => {
    fetch(`${baseurl}/departments/`)
      .then((res) => res.json())
      .then((data) => {
        setDepartments(data?.results || []);
      })
      .catch((err) => {
        console.error("Error fetching departments:", err);
        setDepartments([]);
      });
  }, []);

  /* -----------------------------
     Filter Materials
  ------------------------------*/
  const filteredMaterials =
    selectedDept === "all"
      ? materials
      : materials.filter(
          (item) => String(item.department) === String(selectedDept)
        );

  return (
    <>
      <AgentNavbar />

      <div className="container my-4">
        <h3 className="mb-4 fw-bold">Training Materials</h3>

        {/* -----------------------------
            Department Filter with Horizontal Scroll
        ------------------------------*/}
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
                  className={`custom-btn flex-shrink-0 ${
                    selectedDept === "all" ? "custom-btn-filled" : "custom-btn-outline"
                  }`}
                  onClick={() => setSelectedDept("all")}
                >
                  All Departments
                </button>

                {/* Department Buttons */}
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    className={`custom-btn flex-shrink-0 ${
                      selectedDept === dept.id ? "custom-btn-filled" : "custom-btn-outline"
                    }`}
                    onClick={() => setSelectedDept(dept.id)}
                  >
                    {dept.name}
                  </button>
                ))}
              </div>
            </div>
            
        
          </div>
          
          {/* Show selected filter info */}
          <div className="mt-2">
            <small className="text-muted">
              {selectedDept === "all" 
                ? `Showing all ${filteredMaterials.length} training materials`
                : `Showing materials for: ${
                    departments.find(d => d.id === parseInt(selectedDept))?.name || "Selected"
                  } (${filteredMaterials.length} items)`
              }
            </small>
          </div>
        </div>

        {/* -----------------------------
            Loading State
        ------------------------------*/}
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : (
          <div className="row">
            {filteredMaterials.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-info text-center">
                  No Training Materials Found
                  {selectedDept !== "all" && " for this department"}.
                </div>
              </div>
            ) : (
              filteredMaterials.map((item) => (
                <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                  <div className="card training-card h-100">
                    <video
                      className="card-img-top training-video"
                      controls
                      src={`${baseurl}${item.video}`}
                    />

                    <div className="card-body">
                      <div className="mb-2">
                        <small className="text-primary fw-semibold">
                          Department: {item.department_name || "Not specified"}
                        </small>
                      </div>
                      <h5 className="card-title fw-semibold">
                        {item.title}
                      </h5>
                      <p className="card-text text-muted small">
                        {item.description || "No description available"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default TrainingVideos;