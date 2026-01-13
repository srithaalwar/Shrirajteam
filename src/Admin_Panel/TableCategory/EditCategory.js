import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  Grid,
  Box,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
import { baseurl } from './../../BaseURL/BaseURL';
import { useParams, useNavigate } from "react-router-dom";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [typeName, setTypeName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  const TYPE_URL = `${baseurl}/property-types/${id}/`;
  const GET_CATEGORIES = `${baseurl}/property-categories/`;

  useEffect(() => {
    loadCategories();
    loadType();
  }, []);

const loadCategories = async () => {
  try {
    const res = await axios.get(GET_CATEGORIES);

    // ✅ handle both array & paginated responses safely
    const categories = Array.isArray(res.data)
      ? res.data
      : res.data.results || [];

    setAllCategories(categories);
  } catch (err) {
    console.log(err);
    setAllCategories([]);
  }
};


  // Load ONLY Property Type
  const loadType = async () => {
    try {
      const res = await axios.get(TYPE_URL);
      setTypeName(res.data.name);
      setSelectedCategory(res.data.category);
    } catch (err) {
      Swal.fire("Error", "Type not found", "error");
    }
  };

  const handleUpdateType = async () => {
    try {
      await axios.put(TYPE_URL, {
        name: typeName,
        category: selectedCategory,
      });

      Swal.fire("Success", "Property Type Updated Successfully", "success");
      navigate("/tablecategory");
    } catch (err) {
      Swal.fire("Error", "Update Failed", "error");
    }
  };

  return (
    <>
      <AdminNavbar />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Edit Property Type
        </Typography>

        <Box mt={2}>
          <TextField
            select
            fullWidth
            label="Select Category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{ mb: 2 }}
          >
            {Array.isArray(allCategories) &&
  allCategories.map((cat) => (
    <MenuItem
      key={cat.property_category_id}
      value={cat.property_category_id}
    >
      {cat.name}
    </MenuItem>
))}

          
          </TextField>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="Type Name"
                value={typeName}
                onChange={(e) => setTypeName(e.target.value)}
              />
            </Grid>

            <Grid item xs={4}>
              <Button
                variant="contained"
                fullWidth
                sx={{ height: "56px" }}
                onClick={handleUpdateType}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default EditCategory;
