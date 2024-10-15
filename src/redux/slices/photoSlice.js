import { createSlice } from "@reduxjs/toolkit";

const photoSlice = createSlice({
  name: "photo",
  initialState: {
    photo: null
  },
  reducers: {
    setPhoto: (state, action) => {
      state.photo = action.payload
    },
    resetPhoto: (state) => {
      state.photo = null
    }
  },
});
export const { setPhoto, resetPhoto } = photoSlice.actions;
export default photoSlice.reducer;