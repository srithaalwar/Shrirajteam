import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Popup import
import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
import { baseurl } from './../../BaseURL/BaseURL';

function AddPropertyCategory() {
  const [formData, setFormData] = useState({ name: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${baseurl}/property-categories/`, formData);

      // SUCCESS SWEETALERT
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Category Created",
        confirmButtonColor: "#6C63FF", // Purple button like screenshot
        confirmButtonText: "OK",
      }).then(() => navigate("/tablecategory")); // Redirect after popup

    } catch (err) {
      console.error("Error posting:", err);

      // ERROR SWEETALERT
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add category",
        confirmButtonColor: "#6C63FF",
      });
    }
  };

  return (
    <>
      <AdminNavbar /> {/* Navbar */}
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
          Add Property Category
        </h2>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Category Name"
            name="name"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            sx={{ mb: 3 }}
          />

          <Box sx={{ textAlign: "center" }}>
            <Button type="submit" variant="contained" color="success">
              Add Category
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
}

export default AddPropertyCategory;
