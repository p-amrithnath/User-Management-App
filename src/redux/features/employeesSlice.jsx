import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  employees: [],
  error: "",
};

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async () => {
    const response = await axios.get("https://gorest.co.in/public/v2/users");
    return response.data;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
    },
    editEmployee: (state, action) => {
      const index = state.employees.findIndex(
        (employee) => employee.id === action.payload.id
      );
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployees.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.employees = action.payload;
      state.error = "";
    });
    builder.addCase(fetchEmployees.rejected, (state, action) => {
      state.loading = false;
      state.employees = [];
      state.error = action.error.message;
    });
  },
});


export const { deleteEmployee, editEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
