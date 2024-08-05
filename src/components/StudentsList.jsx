import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  setSearch,
  setGroupFilter,
  setCurrentPage,
} from "../features/studentsSlice";

const StudentsList = ({ onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const { list, search, groupFilter, currentPage, itemsPerPage } = useSelector(
    (state) => state.students
  );

  const filteredStudents = list
    .filter((student) =>
      `${student.firstName} ${student.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((student) => (groupFilter ? student.group === groupFilter : true));

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (event) => {
    dispatch(setSearch(event.target.value));
  };

  const handleGroupFilterChange = (event) => {
    dispatch(setGroupFilter(event.target.value));
  };

  const handlePageChange = (event, value) => {
    dispatch(setCurrentPage(value));
  };

  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
      />
      <Select
        value={groupFilter}
        onChange={handleGroupFilterChange}
        displayEmpty
      >
        <MenuItem value="">All Groups</MenuItem>
        <MenuItem value="React-11">React-11</MenuItem>
        <MenuItem value="React-13">React-13</MenuItem>
        <MenuItem value="React-17">React-17</MenuItem>
        <MenuItem value="React-58">React-58</MenuItem>
      </Select>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Group</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedStudents.map((student, index) => (
            <TableRow key={student.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{student.firstName}</TableCell>
              <TableCell>{student.lastName}</TableCell>
              <TableCell>{student.group}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onEdit(student.id)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(student.id)}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={Math.ceil(filteredStudents.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
};

export default StudentsList;
