import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TeachersList = ({ teachers, onEdit, onDelete }) => {
  return (
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
        {teachers.map((teacher, index) => (
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
  );
};

export default TeachersList;
