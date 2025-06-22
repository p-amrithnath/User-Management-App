import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { employeeApi } from "../../services/employee";


const initialState = {
  loading: false,
  profile: {},
  error: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      employeeApi.endpoints.getEmployeeById.matchFulfilled,
      (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = "";
      }
    );
    builder.addMatcher(
      employeeApi.endpoints.getEmployeeById.matchRejected,
      (state, action) => {
        state.loading = false;
        state.profile = {};
        state.error = action.error.message;
      }
    );
    builder.addMatcher(
      employeeApi.endpoints.getEmployeeById.matchPending,
      (state, action) => {
        state.loading = true;
        state.profile = {};
        state.error = "";
      }
    );
  },
});

export default profileSlice.reducer;
