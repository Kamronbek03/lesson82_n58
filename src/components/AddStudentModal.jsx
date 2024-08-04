import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";

const AddStudentModal = ({ open, onClose, onSave, studentData }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    group: "",
  });

  useEffect(() => {
    if (studentData) {
      setFormData(studentData);
    } else {
      setFormData({ firstName: "", lastName: "", group: "" });
    }
  }, [studentData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (studentData) {
      // Update existing student
      await axios.put(
        `http://localhost:3000/students/${studentData.id}`,
        formData
      );
    } else {
      // Add new student
      const response = await axios.get("http://localhost:3000/students");
      const students = response.data;
      const newId = students.length
        ? Math.max(...students.map((s) => parseInt(s.id))) + 1
        : 1;
      await axios.post("http://localhost:3000/students", {
        ...formData,
        id: newId,
      });
    }
    onSave();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{studentData ? "Edit Student" : "Add Student"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="firstName"
          label="First Name"
          type="text"
          fullWidth
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="lastName"
          label="Last Name"
          type="text"
          fullWidth
          value={formData.lastName}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="group-label">Group</InputLabel>
          <Select
            labelId="group-label"
            name="group"
            value={formData.group}
            onChange={handleChange}
          >
            <MenuItem value="React-11">React-11</MenuItem>
            <MenuItem value="React-13">React-13</MenuItem>
            <MenuItem value="React-17">React-17</MenuItem>
            <MenuItem value="React-58">React-58</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {studentData ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStudentModal;
