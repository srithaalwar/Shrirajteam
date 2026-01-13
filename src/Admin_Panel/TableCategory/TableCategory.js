import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Button,
  IconButton,
  Container,
  Pagination,
  Paper,
  Chip,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
import { baseurl } from "./../../BaseURL/BaseURL";

import "./TableCategory.css"; // ✅ scoped CSS

function TableCategory() {
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pageCat, setPageCat] = useState(1);
  const [pageType, setPageType] = useState(1);
  const itemsPerPage = 8;

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchTypes();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get(`${baseurl}/property-categories/`);
    const data = Array.isArray(res.data.results) ? res.data.results : [];
    setCategories(data.sort((a, b) => b.property_category_id - a.property_category_id));
  };

  const fetchTypes = async () => {
    setLoading(true);
    const res = await axios.get(`${baseurl}/property-types/`);
    const data = Array.isArray(res.data.results) ? res.data.results : [];
    setTypes(data.sort((a, b) => b.property_type_id - a.property_type_id));
    setLoading(false);
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Do you want to delete this category?")) return;
    await axios.delete(`${baseurl}/property-categories/${id}/`);
    fetchCategories();
  };

  const handleDeleteType = async (id) => {
    if (!window.confirm("Do you want to delete this property type?")) return;
    await axios.delete(`${baseurl}/property-types/${id}/`);
    fetchTypes();
  };

  const getCategoryName = (id) =>
    categories.find((c) => c.property_category_id === id)?.name || "Unknown";

  const paginate = (data, page) =>
    data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <AdminNavbar />

      <Container maxWidth="xl" className="tc-root">

        {/* PROPERTY CATEGORIES */}
        <Box className="tc-header">
          <h2 className="tc-title">Property Categories</h2>
          <Button
            variant="contained"
            className="tc-add-btn"
            onClick={() => navigate("/propertycategoryform")}
          >
            Add Property Category
          </Button>
        </Box>

        <Paper className="tc-table-card">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="tc-th">S.No</TableCell>
                <TableCell className="tc-th">Category Name</TableCell>
                <TableCell className="tc-th tc-center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginate(categories, pageCat).map((cat, index) => (
                <TableRow key={cat.property_category_id} hover>
                  <TableCell className="tc-td">
                    {(pageCat - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell className="tc-td tc-bold">{cat.name}</TableCell>
                  <TableCell className="tc-center">
                    <IconButton
                      className="tc-delete-btn"
                      onClick={() => handleDeleteCategory(cat.property_category_id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Stack className="tc-pagination">
          <Pagination
            count={Math.ceil(categories.length / itemsPerPage)}
            page={pageCat}
            onChange={(_, v) => setPageCat(v)}
          />
        </Stack>

        {/* PROPERTY TYPES */}
        <Box className="tc-header">
          <h2 className="tc-title">Property Types</h2>
          <Button
            variant="contained"
            className="tc-add-btn"
            onClick={() => navigate("/a-category")}
          >
            Add Property Type
          </Button>
        </Box>

        <Paper className="tc-table-card">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="tc-th">S.No</TableCell>
                <TableCell className="tc-th">Type Name</TableCell>
                <TableCell className="tc-th">Category</TableCell>
                <TableCell className="tc-th tc-center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">Loading...</TableCell>
                </TableRow>
              ) : (
                paginate(types, pageType).map((item, index) => (
                  <TableRow key={item.property_type_id} hover>
                    <TableCell className="tc-td">
                      {(pageType - 1) * itemsPerPage + index + 1}
                    </TableCell>
                    <TableCell className="tc-td tc-bold">{item.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={getCategoryName(item.category)}
                        className="tc-chip"
                        size="small"
                      />
                    </TableCell>
                    <TableCell className="tc-center">
                      <IconButton
                        className="tc-edit-btn"
                        onClick={() =>
                          navigate(`/editcategory/${item.property_type_id}`)
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        className="tc-delete-btn"
                        onClick={() => handleDeleteType(item.property_type_id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>

        <Stack className="tc-pagination">
          <Pagination
            count={Math.ceil(types.length / itemsPerPage)}
            page={pageType}
            onChange={(_, v) => setPageType(v)}
          />
        </Stack>

      </Container>
    </>
  );
}

export default TableCategory;
