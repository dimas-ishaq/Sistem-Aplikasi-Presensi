import { createSlice } from "@reduxjs/toolkit";
import { getUserLoginThunk } from "../api";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: null,
    name: null,
    role: null
  },
  reducers: {
    resetUser: (state) => {
      state.username = null;
      state.name = null;
      state.role = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserLoginThunk.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.name = action.payload.name;
        state.role = action.payload.role;
      })
  }
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;