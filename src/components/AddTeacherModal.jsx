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

const AddTeacherModal = ({ open, onClose, onSave, teacherData }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    group: "",
    level: "",
  });

  useEffect(() => {
    if (teacherData) {
      setFormData(teacherData);
    } else {
      setFormData({ firstName: "", lastName: "", group: "", level: "" });
    }
  }, [teacherData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (teacherData) {
      // Update existing teacher
      await axios.put(
        `http://localhost:3000/teachers/${teacherData.id}`,
        formData
      );
    } else {
      // Add new teacher
      const response = await axios.get("http://localhost:3000/teachers");
      const teachers = response.data;
      const newId = teachers.length
        ? Math.max(...teachers.map((t) => parseInt(t.id))) + 1
        : 1;
      await axios.post("http://localhost:3000/teachers", {
        ...formData,
        id: newId,
      });
    }
    onSave();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{teacherData ? "Edit Teacher" : "Add Teacher"}</DialogTitle>
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
        <FormControl fullWidth margin="dense">
          <InputLabel id="level-label">Level</InputLabel>
          <Select
            labelId="level-label"
            name="level"
            value={formData.level}
            onChange={handleChange}
          >
            <MenuItem value="Junior">Junior</MenuItem>
            <MenuItem value="Middle">Middle</MenuItem>
            <MenuItem value="Senior">Senior</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {teacherData ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTeacherModal;
