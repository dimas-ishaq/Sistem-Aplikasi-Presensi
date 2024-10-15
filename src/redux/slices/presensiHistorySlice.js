import { createSlice } from "@reduxjs/toolkit";
import { getPresensiHistoryThunk } from "../api";
const presensiHistorySlice = createSlice({
  name: "presensiHistory",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPresensiHistoryThunk.fulfilled, (state, action) => {
        state = action.payload
        return state
      })
  }
});

export default presensiHistorySlice.reducer