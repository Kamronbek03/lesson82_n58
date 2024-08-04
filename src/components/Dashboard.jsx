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
import axios from "axios";
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
  const [open, setOpen] = useState(true);
  const [currentView, setCurrentView] = useState("dashboard");
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [openAddStudent, setOpenAddStudent] = useState(false);
  const [openAddTeacher, setOpenAddTeacher] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editingTeacher, setEditingTeacher] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsResponse, teachersResponse] = await Promise.all([
          axios.get("http://localhost:3000/students"),
          axios.get("http://localhost:3000/teachers"),
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

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleOpenAddStudent = () => {
    setEditingStudent(null);
    setOpenAddStudent(true);
  };

  const handleCloseAddStudent = () => {
    setOpenAddStudent(false);
  };

  const handleOpenAddTeacher = () => {
    setEditingTeacher(null);
    setOpenAddTeacher(true);
  };

  const handleCloseAddTeacher = () => {
    setOpenAddTeacher(false);
  };

  const handleEditStudent = (id) => {
    const student = students.find((s) => s.id === id);
    setEditingStudent(student);
    setOpenAddStudent(true);
  };

  const handleEditTeacher = (id) => {
    const teacher = teachers.find((t) => t.id === id);
    setEditingTeacher(teacher);
    setOpenAddTeacher(true);
  };

  const handleDelete = async (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        if (type === "student") {
          await axios.delete(`http://localhost:3000/students/${id}`);
          setStudents(students.filter((s) => s.id !== id));
        } else if (type === "teacher") {
          await axios.delete(`http://localhost:3000/teachers/${id}`);
          setTeachers(teachers.filter((t) => t.id !== id));
        }
      } catch (error) {
        console.error("Error deleting data", error);
      }
    }
  };

  const refreshData = async () => {
    try {
      const [studentsResponse, teachersResponse] = await Promise.all([
        axios.get("http://localhost:3000/students"),
        axios.get("http://localhost:3000/teachers"),
      ]);
      setStudents(studentsResponse.data);
      setTeachers(teachersResponse.data);
    } catch (error) {
      console.error("Error fetching data", error);
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
                <>
                  <Grid item xs={12}>
                    <Typography variant="h4">Dashboard</Typography>
                    <Typography variant="h6">Students</Typography>
                    <StudentsList
                      students={students}
                      onEdit={handleEditStudent}
                      onDelete={(id) => handleDelete(id, "student")}
                    />
                    <Typography variant="h6">Teachers</Typography>
                    <TeachersList
                      teachers={teachers}
                      onEdit={handleEditTeacher}
                      onDelete={(id) => handleDelete(id, "teacher")}
                    />
                  </Grid>
                </>
              )}
              {currentView === "students" && (
                <Grid item xs={12}>
                  <Typography variant="h4">Students List</Typography>
                  <IconButton onClick={handleOpenAddStudent} color="primary">
                    Add Student
                  </IconButton>
                  <StudentsList
                    students={students}
                    onEdit={handleEditStudent}
                    onDelete={(id) => handleDelete(id, "student")}
                  />
                </Grid>
              )}
              {currentView === "teachers" && (
                <Grid item xs={12}>
                  <Typography variant="h4">Teachers List</Typography>
                  <IconButton onClick={handleOpenAddTeacher} color="primary">
                    Add Teacher
                  </IconButton>
                  <TeachersList
                    teachers={teachers}
                    onEdit={handleEditTeacher}
                    onDelete={(id) => handleDelete(id, "teacher")}
                  />
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
      <AddStudentModal
        open={openAddStudent}
        onClose={handleCloseAddStudent}
        onSave={refreshData}
        studentData={editingStudent}
      />
      <AddTeacherModal
        open={openAddTeacher}
        onClose={handleCloseAddTeacher}
        onSave={refreshData}
        teacherData={editingTeacher}
      />
    </ThemeProvider>
  );
};

export default Dashboard;
