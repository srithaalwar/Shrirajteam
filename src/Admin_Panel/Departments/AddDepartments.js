import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from '../../BaseURL/BaseURL';

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddDepartments = () => {
  const [deptName, setDeptName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!deptName.trim()) {
      return Swal.fire("Error", "Please enter department name!", "error");
    }

    try {
      await axios.post(`${baseurl}/departments/`, {
        name: deptName.trim(),
      });

      Swal.fire("Success", "Department Created Successfully!", "success");
      setDeptName("");
      navigate("/a-departments");

    } catch (err) {
      Swal.fire("Error", "Failed to add department!", "error");
    }
  };

  return (
    <>
      <AdminNavbar />

      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom textAlign="center" fontWeight="bold">
            Add Department
          </Typography>

          <TextField
            label="Department Name"
            fullWidth
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => navigate("/a-departments")}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default AddDepartments;
