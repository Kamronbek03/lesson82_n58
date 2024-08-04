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

const StudentsList = ({ students, onEdit, onDelete }) => {
  return (
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
        {students.map((student, index) => (
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
  );
};

export default StudentsList;
