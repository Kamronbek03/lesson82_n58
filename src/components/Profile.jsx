import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const Profile = () => {
  const studentData = {
    firstName: "Kamronbek",
    lastName: "Allanazarov",
    group: "React-58",
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          <Typography variant="h6">
            First Name: {studentData.firstName}
          </Typography>
          <Typography variant="h6">
            Last Name: {studentData.lastName}
          </Typography>
          <Typography variant="h6">Group: {studentData.group}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
