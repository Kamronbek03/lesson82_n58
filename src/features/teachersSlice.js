import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch teachers asynchronously
export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    const response = await axios.get("http://localhost:3000/teachers");
    return response.data;
  }
);

// Add a new teacher asynchronously
export const addTeacher = createAsyncThunk(
  "teachers/addTeacher",
  async (newTeacher) => {
    const response = await axios.post(
      "http://localhost:3000/teachers",
      newTeacher
    );
    return response.data;
  }
);

// Define the teachers slice
const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    list: [],
    search: "",
    levelFilter: "",
    currentPage: 1,
    itemsPerPage: 10,
    status: "idle",
    error: null,
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setLevelFilter: (state, action) => {
      state.levelFilter = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.list.push(action.payload); // Add the new teacher to the list
      });
  },
});

// Export actions and reducer
export const { setSearch, setLevelFilter, setCurrentPage } =
  teachersSlice.actions;

export default teachersSlice.reducer;
