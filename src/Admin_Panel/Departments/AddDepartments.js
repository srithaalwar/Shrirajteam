// import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL';

// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Paper,
//   Typography,
// } from "@mui/material";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// const AddDepartments = () => {
//   const [deptName, setDeptName] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     if (!deptName.trim()) {
//       return Swal.fire("Error", "Please enter department name!", "error");
//     }

//     try {
//       await axios.post(`${baseurl}/departments/`, {
//         name: deptName.trim(),
//       });

//       Swal.fire("Success", "Department Created Successfully!", "success");
//       setDeptName("");
//       navigate("/a-departments");

//     } catch (err) {
//       Swal.fire("Error", "Failed to add department!", "error");
//     }
//   };

//   return (
//     <>
//       <AdminNavbar />

//       <Container maxWidth="sm" sx={{ mt: 4 }}>
//         <Paper sx={{ p: 4 }}>
//           <Typography variant="h5" gutterBottom textAlign="center" fontWeight="bold">
//             Add Department
//           </Typography>

//           <TextField
//             label="Department Name"
//             fullWidth
//             value={deptName}
//             onChange={(e) => setDeptName(e.target.value)}
//             sx={{ mb: 3 }}
//           />

//           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Button
//               variant="outlined"
//               color="error"
//               onClick={() => navigate("/a-departments")}
//             >
//               Cancel
//             </Button>

//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSubmit}
//             >
//               Submit
//             </Button>
//           </Box>
//         </Paper>
//       </Container>
//     </>
//   );
// };

// export default AddDepartments;




import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from '../../BaseURL/BaseURL';

const AddDepartments = () => {
  const [formData, setFormData] = useState({ 
    deptName: "" 
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.deptName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter department name",
        confirmButtonColor: "#6C63FF",
      });
      return;
    }

    setLoading(true);
    
    try {
      await axios.post(`${baseurl}/departments/`, {
        name: formData.deptName.trim(),
      });

      // SUCCESS SWEETALERT
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Department created successfully",
        confirmButtonColor: "#6C63FF",
        confirmButtonText: "OK",
      }).then(() => navigate("/a-departments"));

    } catch (err) {
      console.error("Error posting:", err);
      
      // ERROR SWEETALERT
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.detail || "Failed to add department",
        confirmButtonColor: "#6C63FF",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      
      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <h2>Add Department</h2>
        </div>

        {/* Form Container */}
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                Department Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="deptName"
                value={formData.deptName}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter department name"
                required
                disabled={loading}
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => navigate("/a-departments")}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="primary-btn"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Department"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* CSS styles (can be moved to external CSS) */}
      <style jsx="true">{`
        .page-container {
          // max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .page-header {
          margin-bottom: 30px;
        }
        
        .page-header h2 {
          margin: 0;
          color: #333;
          font-size: 24px;
        }
        
        .form-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          padding: 30px;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .form-group {
          margin-bottom: 25px;
        }
        
        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #333;
          font-size: 14px;
        }
        
        .required {
          color: #d32f2f;
        }
        
        .form-input {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.3s;
          box-sizing: border-box;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #6C63FF;
        }
        
        .form-input:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          margin-top: 30px;
        }
        
        .primary-btn {
          background-color: #6C63FF;
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.3s;
          min-width: 150px;
        }
        
        .primary-btn:hover:not(:disabled) {
          background-color: #5a52d5;
        }
        
        .primary-btn:disabled {
          background-color: #b3b1e1;
          cursor: not-allowed;
        }
        
        .secondary-btn {
          background-color: #f5f5f5;
          color: #333;
          border: 1px solid #ddd;
          padding: 12px 25px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s;
          min-width: 150px;
        }
        
        .secondary-btn:hover:not(:disabled) {
          background-color: #e9e9e9;
        }
        
        .secondary-btn:disabled {
          background-color: #f0f0f0;
          color: #999;
          cursor: not-allowed;
        }
        
        @media (max-width: 768px) {
          .page-container {
            padding: 15px;
          }
          
          .form-container {
            padding: 20px;
          }
          
          .form-actions {
            flex-direction: column;
          }
          
          .primary-btn,
          .secondary-btn {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default AddDepartments;
