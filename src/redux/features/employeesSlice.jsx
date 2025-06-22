import { createSlice } from "@reduxjs/toolkit";
import { employeeApi } from "../../services/employee";

const initialState = {
  loading: false,
  employees: [],
  error: "",
};

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
    builder.addMatcher(
      employeeApi.endpoints.getEmployeeById.matchPending,
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      employeeApi.endpoints.getAllEmployees.matchFulfilled,
      (state, action) => {
        state.loading = false;
        state.employees = action.payload;
        state.error = "";
      }
    );
    builder.addMatcher(
      employeeApi.endpoints.getAllEmployees.matchRejected,
      (state, action) => {
        state.loading = false;
        state.employees = [];
        state.error = action.error.message;
      }
    );
  },
});

export const { deleteEmployee, editEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
