import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, getNewAccessTokenThunk } from "../api";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: Cookies.get("accessToken") || null,
    isAuthenticated: Cookies.get("accessToken") ? true : false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.accessToken = null;
        state.isAuthenticated = false;
      })
      .addCase(getNewAccessTokenThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNewAccessTokenThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(getNewAccessTokenThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
