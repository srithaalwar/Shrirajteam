import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  MenuItem,
} from '@mui/material';

import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
import { baseurl } from './../../BaseURL/BaseURL';

function Category() {
  const [categoryName, setCategoryName] = useState('');
  const [typeName, setTypeName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [allCategories, setAllCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${baseurl}/property-categories/`);
     setAllCategories(res.data.results || []);

    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCreateCategory = async () => {
    if (!categoryName.trim())
      return Swal.fire('Error', 'Please enter a category name', 'error');

    try {
      await axios.post(`${baseurl}/property-categories/`, { name: categoryName });
      Swal.fire('Success', 'Category Created', 'success');
      setCategoryName('');
      fetchCategories();
    } catch (err) {
      Swal.fire('Error', 'Failed to create category', 'error');
    }
  };

  const handleCreateType = async () => {
    if (!selectedCategory || !typeName.trim()) {
      return Swal.fire('Error', 'Please select category and enter type name', 'error');
    }

    try {
      await axios.post(`${baseurl}/property-types/`, {
        category: selectedCategory,
        name: typeName,
      });

      Swal.fire('Success', 'Type Created', 'success');
      setTypeName('');
      setSelectedCategory('');

      navigate("/tablecategory");
    } catch (err) {
      Swal.fire('Error', 'Failed to create type', 'error');
    }
  };

  return (
    <>
      <AdminNavbar />
      <Container maxWidth="sm" sx={{ mt: 4 }}>

        <Typography variant="h5" gutterBottom>
          Create Type Under Category
        </Typography>

        <TextField
          select
          label="Select Category"
          fullWidth
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          sx={{ mb: 2 }}
        >
          {Array.isArray(allCategories) && allCategories.map((cat) => (
            <MenuItem key={cat.property_category_id} value={cat.property_category_id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Type Name"
          fullWidth
          value={typeName}
          onChange={(e) => setTypeName(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3, width: '100%' }}
          onClick={handleCreateType}
        >
          Submit
        </Button>
      </Container>
    </>
  );
}

export default Category;
