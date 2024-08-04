import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import BadgeIcon from "@mui/icons-material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import AddStudentModal from "./AddStudentModal";
import AddTeacherModal from "./AddTeacherModal";
import Profile from "./Profile";
import StudentsList from "./StudentsList";
import TeachersList from "./TeachersList";
import { mainListItems } from "./ListItems";
import axios from "axios";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentView, setCurrentView] = useState("students");
  const [openAddStudent, setOpenAddStudent] = useState(false);
  const [openAddTeacher, setOpenAddTeacher] = useState(false);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsResponse, teachersResponse] = await Promise.all([
          axios.get("http://localhost:3001/students"),
          axios.get("http://localhost:3001/teachers"),
        ]);
        setStudents(studentsResponse.data);
        setTeachers(teachersResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleBadgeClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (view) => {
    setCurrentView(view);
    handleClose();
  };

  const handleOpenAddStudent = () => {
    setOpenAddStudent(true);
  };

  const handleCloseAddStudent = () => {
    setOpenAddStudent(false);
  };

  const handleOpenAddTeacher = () => {
    setOpenAddTeacher(true);
  };

  const handleCloseAddTeacher = () => {
    setOpenAddTeacher(false);
  };

  const handleEdit = (id) => {
    console.log("Edit", id);
    // Handle edit logic
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      console.log("Delete", id);
      // Handle delete logic
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit" onClick={handleBadgeClick}>
              <BadgeIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleMenuClick("students")}>
                <PeopleIcon />
                Students
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick("teachers")}>
                <PeopleIcon />
                Teachers
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick("profile")}>
                <PersonIcon /> Profile
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">{mainListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {currentView === "students" && (
                <Grid item xs={12}>
                  <Typography variant="h4">Students List</Typography>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton onClick={handleOpenAddStudent} color="primary">
                      Add Student
                    </IconButton>
                  </Box>
                  <StudentsList
                    students={students}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </Grid>
              )}
              {currentView === "teachers" && (
                <Grid item xs={12}>
                  <Typography variant="h4">Teachers List</Typography>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton onClick={handleOpenAddTeacher} color="primary">
                      Add Teacher
                    </IconButton>
                  </Box>
                  <TeachersList
                    teachers={teachers}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </Grid>
              )}
              {currentView === "profile" && (
                <Grid item xs={12}>
                  <Typography variant="h4">Profile</Typography>
                  <Profile />
                </Grid>
              )}
            </Grid>
          </Container>
        </Box>
      </Box>
      <AddStudentModal open={openAddStudent} onClose={handleCloseAddStudent} />
      <AddTeacherModal open={openAddTeacher} onClose={handleCloseAddTeacher} />
    </ThemeProvider>
  );
};

export default Dashboard;
