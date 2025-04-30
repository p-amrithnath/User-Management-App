import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  profile: {},
  error: "",
};

export const fetchprofile = createAsyncThunk(
  "employee/fetchProfile",
  async (id) => {
    const response = await axios.get(
      `https://gorest.co.in/public/v2/users/${id}`
    );
    return response.data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchprofile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchprofile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
      state.error = "";
    });
    builder.addCase(fetchprofile.rejected, (state, action) => {
      state.loading = false;
      state.profile = {};
      state.error = action.error.message;
    });
  },
});

export default profileSlice.reducer;
