// import React, { useEffect, useState } from "react";
// import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { baseurl } from "../../BaseURL/BaseURL";
// import { useNavigate, useParams } from "react-router-dom";
// import "./EditQA.css";

// function EditQA() {
//   const { id } = useParams(); // Get ID from URL
//   const [formData, setFormData] = useState({
//     question: "",
//     answer: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);
//   const navigate = useNavigate();

//   // Fetch existing Q&A data by ID
//   useEffect(() => {
//     const fetchQA = async () => {
//       try {
//         const res = await axios.get(`${baseurl}/responses/${id}/`);
//         setFormData({
//           question: res.data.question,
//           answer: res.data.answer,
//         });
//       } catch (error) {
//         console.error("Error fetching Q&A:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Failed to fetch Q&A data",
//           confirmButtonColor: "#d32f2f",
//         });
//       } finally {
//         setFetching(false);
//       }
//     };
//     fetchQA();
//   }, [id]);

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission (PUT API)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await axios.put(`${baseurl}/responses/${id}/`, formData);

//       Swal.fire({
//         icon: "success",
//         title: "Q&A Updated!",
//         text: "Your Q&A has been updated successfully.",
//         timer: 2000,
//         showConfirmButton: false,
//       }).then(() => {
//         navigate("/admin-chatbot");
//       });
//     } catch (error) {
//       console.error("Error updating Q&A:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Failed!",
//         text: "Unable to update Q&A. Please try again.",
//         confirmButtonColor: "#d32f2f",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetching) {
//     return (
//       <>
//         <AdminNavbar />
//         <div className="loading-container">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <AdminNavbar />
//       <div className="edit-qa-container">
//         {/* Page Title */}
//         <h2 className="edit-qa-title">Edit Q&A</h2>

//         {/* Form */}
//         <div className="edit-qa-form-wrapper">
//           <form onSubmit={handleSubmit}>
//             <div className="row g-3">
//               {/* Question */}
//               <div className="col-md-6">
//                 <label htmlFor="question" className="form-label">
//                   Question *
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="question"
//                   name="question"
//                   value={formData.question}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Answer */}
//               <div className="col-md-6">
//                 <label htmlFor="answer" className="form-label">
//                   Answer *
//                 </label>
//                 <textarea
//                   className="form-control"
//                   id="answer"
//                   name="answer"
//                   value={formData.answer}
//                   onChange={handleChange}
//                   required
//                   rows="1"
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="text-center mt-4">
//               <button
//                 type="submit"
//                 className="btn btn-primary submit-btn"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                     Updating...
//                   </>
//                 ) : (
//                   "Update Q&A"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default EditQA;




import React, { useEffect, useState } from "react";
import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { baseurl } from "../../BaseURL/BaseURL";
import { useNavigate, useParams } from "react-router-dom";

function EditQA() {
  const { id } = useParams(); // Get ID from URL
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  // Fetch existing Q&A data by ID
  useEffect(() => {
    const fetchQA = async () => {
      try {
        const res = await axios.get(`${baseurl}/responses/${id}/`);
        setFormData({
          question: res.data.question || "",
          answer: res.data.answer || "",
        });
      } catch (error) {
        console.error("Error fetching Q&A:", error);
        
        let errorMessage = "Failed to fetch Q&A data";
        if (error.response?.status === 404) {
          errorMessage = "Q&A not found";
        }
        
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
          confirmButtonColor: "#273c75",
        }).then(() => {
          navigate("/admin-chatbot");
        });
      } finally {
        setFetching(false);
      }
    };
    fetchQA();
  }, [id, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (PUT API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.question.trim() || !formData.answer.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in both question and answer fields",
        confirmButtonColor: "#273c75",
      });
      return;
    }
    
    setLoading(true);

    try {
      await axios.put(`${baseurl}/responses/${id}/`, formData);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Q&A updated successfully",
        confirmButtonColor: "#273c75",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/admin-chatbot");
      });
    } catch (error) {
      console.error("Error updating Q&A:", error);
      
      // More detailed error message
      let errorMessage = "Failed to update Q&A";
      if (error.response?.data) {
        if (typeof error.response.data === 'object') {
          errorMessage = Object.values(error.response.data).flat().join(', ');
        } else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        }
      }
      
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonColor: "#273c75",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <>
        <AdminNavbar />
        <div className="container my-4">
          <div className="card p-4 text-center">
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
              <div className="spinner-border text-primary" role="status" style={{ color: "#273c75 !important" }}>
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />

      <div className="container my-4">
        <div className="card p-4">
          <h4 className="text-center mb-4">Edit Q&A</h4>

          <form onSubmit={handleSubmit}>
            {/* Question and Answer in Separate Rows */}
            <div className="row mb-3">
              {/* Question - Full Width */}
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">
                    Question <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter the question"
                    required
                    disabled={loading}
                  />
                  <small className="text-muted">
                    Edit the question that users might ask
                  </small>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              {/* Answer - Full Width */}
              <div className="col-12">
                <div className="mb-1">
                  <label className="form-label">
                    Answer <span className="text-danger">*</span>
                  </label>
                  <textarea
                    name="answer"
                    value={formData.answer}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter the answer"
                    rows="4"
                    required
                    disabled={loading}
                  />
                  <small className="text-muted">
                    Edit the answer to the question
                  </small>
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
                    onClick={() => navigate("/admin-chatbot")}
                    disabled={loading}
                    style={{ minWidth: "120px" }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn"
                    style={{
                      backgroundColor: "#273c75",
                      borderColor: "#273c75",
                      color: "white",
                      minWidth: "180px",
                    }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span 
                          className="spinner-border spinner-border-sm me-2" 
                          role="status" 
                          aria-hidden="true"
                        ></span>
                        Updating...
                      </>
                    ) : (
                      "Update Q&A"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditQA;