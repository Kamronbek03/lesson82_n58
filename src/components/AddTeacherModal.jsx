import React, { useState } from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";

const AddTeacherModal = ({ open, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [level, setLevel] = useState("");
  const [group, setGroup] = useState("");

  const handleSubmit = () => {
    console.log("Teacher added:", { firstName, lastName, level, group });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style }}>
        <Typography variant="h6">Add Teacher</Typography>
        <TextField
          label="First Name"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label="Level"
          fullWidth
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        <TextField
          label="Group"
          fullWidth
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        />
        <Button onClick={handleSubmit}>Add</Button>
        <Button onClick={onClose}>Cancel</Button>
      </Box>
    </Modal>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default AddTeacherModal;
