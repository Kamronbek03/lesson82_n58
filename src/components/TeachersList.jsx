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
  setLevelFilter,
  setCurrentPage,
} from "../features/teachersSlice";

const TeachersList = ({ onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const { list, search, levelFilter, currentPage, itemsPerPage } = useSelector(
    (state) => state.teachers
  );

  const filteredTeachers = list
    .filter((teacher) =>
      `${teacher.firstName} ${teacher.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((teacher) => (levelFilter ? teacher.level === levelFilter : true));

  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (event) => {
    dispatch(setSearch(event.target.value));
  };

  const handleLevelFilterChange = (event) => {
    dispatch(setLevelFilter(event.target.value));
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
        value={levelFilter}
        onChange={handleLevelFilterChange}
        displayEmpty
      >
        <MenuItem value="">All Levels</MenuItem>
        <MenuItem value="Junior">Junior</MenuItem>
        <MenuItem value="Middle">Middle</MenuItem>
        <MenuItem value="Senior">Senior</MenuItem>
      </Select>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Group</TableCell>
            <TableCell>Level</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedTeachers.map((teacher, index) => (
            <TableRow key={teacher.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{teacher.firstName}</TableCell>
              <TableCell>{teacher.lastName}</TableCell>
              <TableCell>{teacher.group}</TableCell>
              <TableCell>{teacher.level}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onEdit(teacher.id)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(teacher.id)}
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
        count={Math.ceil(filteredTeachers.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
};

export default TeachersList;
