// import React, { useState } from "react";
// import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { baseurl } from "../../BaseURL/BaseURL";
// import { useNavigate } from "react-router-dom";
// import "./CreateQA.css";

// function CreateQA() {
//   const [formData, setFormData] = useState({
//     question: "",
//     answer: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission (POST API)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await axios.post(`${baseurl}/responses/`, formData);

//       Swal.fire({
//         icon: "success",
//         title: "Q&A Created!",
//         text: "Your Q&A has been added successfully.",
//         timer: 2000,
//         showConfirmButton: false,
//       }).then(() => {
//         navigate("/admin-chatbot");
//       });

//       setFormData({ question: "", answer: "" });
//     } catch (error) {
//       console.error("Error creating Q&A:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Failed!",
//         text: "Unable to create Q&A. Please try again.",
//         confirmButtonColor: "#d32f2f",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <AdminNavbar />
//       <div className="create-qa-container">
//         {/* Page Title */}
//         <h2 className="create-qa-title">Create New Q&A</h2>

//         {/* Form */}
//         <div className="create-qa-form-wrapper">
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
//                   placeholder="Enter question"
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
//                   placeholder="Enter answer"
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
//                     Adding...
//                   </>
//                 ) : (
//                   "Add Q&A"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default CreateQA;



import React, { useState } from "react";
import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { baseurl } from "../../BaseURL/BaseURL";
import { useNavigate } from "react-router-dom";

function CreateQA() {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (POST API)
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
      await axios.post(`${baseurl}/responses/`, formData);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Q&A created successfully",
        confirmButtonColor: "#273c75",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/admin-chatbot");
      });

      setFormData({ question: "", answer: "" });
    } catch (error) {
      console.error("Error creating Q&A:", error);
      
      // More detailed error message
      let errorMessage = "Failed to create Q&A";
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

  return (
    <>
      <AdminNavbar />

      <div className="container my-4">
        <div className="card p-4">
          <h4 className="text-center mb-4">Create Q&A</h4>

          <form onSubmit={handleSubmit}>
            {/* All Fields in Two Rows for Better Layout */}
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
                    Enter the complete question that users might ask
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
                    Provide a clear and complete answer to the question
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
                        Creating...
                      </>
                    ) : (
                      "Create Q&A"
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

export default CreateQA;