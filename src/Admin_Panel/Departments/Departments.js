import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Container,
  IconButton,
  Pagination,
  Paper,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./../Admin_Navbar/Admin_Navbar";
import { baseurl } from './../../BaseURL/BaseURL';

import "./Departments.css"; // ✅ scoped UI CSS

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

const fetchDepartments = async () => {
  try {
    const res = await axios.get(`${baseurl}/departments/`);

    // ✅ FIX: use res.data.results
    const data = Array.isArray(res.data.results) ? res.data.results : [];

    // ✅ sort newest first
    const sortedDepartments = data.sort((a, b) => b.id - a.id);

    setDepartments(sortedDepartments);
  } catch (err) {
    console.error("Error:", err);
  }
};


  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${name}" department.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${baseurl}/departments/${id}/`);
        Swal.fire({
          title: "Deleted!",
          text: "Department deleted successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        fetchDepartments();
      } catch (err) {
        Swal.fire("Error", "Delete failed", "error");
      }
    }
  };

  const paginate = (data, page) =>
    data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <AdminNavbar />

      <Container maxWidth="xl" className="tc-root">

        {/* HEADER */}
        <Box className="tc-header">
          <h2 className="tc-title">Departments</h2>
          <Button
            variant="contained"
            className="tc-add-btn"
            onClick={() => navigate("/adddepartment")}
          >
            Add Department
          </Button>
        </Box>

        {/* TABLE */}
        <Paper className="tc-table-card">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="tc-th">S.No</TableCell>
                <TableCell className="tc-th">Department Name</TableCell>
                <TableCell className="tc-th tc-center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {departments.length > 0 ? (
                paginate(departments, page).map((dept, index) => (
                  <TableRow key={dept.id} hover>
                    <TableCell className="tc-td">
                      {(page - 1) * itemsPerPage + index + 1}
                    </TableCell>
                    <TableCell className="tc-td tc-bold">
                      {dept.name}
                    </TableCell>
                    <TableCell className="tc-center">
                      <IconButton
                        className="tc-delete-btn"
                        onClick={() => handleDelete(dept.id, dept.name)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No departments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>

        {/* PAGINATION */}
        <Stack className="tc-pagination">
          <Pagination
            count={Math.ceil(departments.length / itemsPerPage)}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </Stack>

      </Container>
    </>
  );
};

export default Departments;
