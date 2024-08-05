import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box"; // Add this import
import MuiDrawer from "@mui/material/Drawer";
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
import { fetchStudents } from "../features/studentsSlice";
import { fetchTeachers } from "../features/teachersSlice";
import { MainListItems } from "./ListItems";
import StudentsList from "./StudentsList";
import TeachersList from "./TeachersList";
import Profile from "./Profile";
import AddStudentModal from "./AddStudentModal";
import AddTeacherModal from "./AddTeacherModal";

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
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [currentView, setCurrentView] = useState("dashboard");
  const [openAddStudent, setOpenAddStudent] = useState(false);
  const [openAddTeacher, setOpenAddTeacher] = useState(false);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
  }, [dispatch]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
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
          <List component="nav">
            <MainListItems handleClick={handleViewChange} />
          </List>
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
              {currentView === "dashboard" && (
                <Grid item xs={12}>
                  <Typography variant="h4">Dashboard</Typography>
                  <Typography variant="h6">Students</Typography>
                  <StudentsList />
                  <Typography variant="h6">Teachers</Typography>
                  <TeachersList />
                </Grid>
              )}
              {currentView === "students" && (
                <Grid item xs={12}>
                  <Typography variant="h4">Students List</Typography>
                  <IconButton onClick={handleOpenAddStudent} color="primary">
                    Add Student
                  </IconButton>
                  <StudentsList />
                </Grid>
              )}
              {currentView === "teachers" && (
                <Grid item xs={12}>
                  <Typography variant="h4">Teachers List</Typography>
                  <IconButton onClick={handleOpenAddTeacher} color="primary">
                    Add Teacher
                  </IconButton>
                  <TeachersList />
                </Grid>
              )}
              {currentView === "profile" && (
                <Grid item xs={12}>
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
