import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Asynchronous thunk to fetch students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get("http://localhost:3000/students");
    return response.data;
  }
);

// Asynchronous thunk to add a student
export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (newStudent) => {
    const response = await axios.post(
      "http://localhost:3000/students",
      newStudent
    );
    return response.data;
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    list: [],
    status: "idle",
    error: null,
    search: "",
    groupFilter: "",
    currentPage: 1,
    itemsPerPage: 10,
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setGroupFilter: (state, action) => {
      state.groupFilter = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.list.push(action.payload); // Add new student to the list
      });
  },
});

// Export actions
export const { setSearch, setGroupFilter, setCurrentPage } =
  studentsSlice.actions;

export default studentsSlice.reducer;
