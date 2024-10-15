import { createSlice } from "@reduxjs/toolkit";
import { getPresensiThunk, createPresensiThunk, updatePresensiThunk } from "../api";

const presensiSlice = createSlice({
  name: "presensi",
  initialState: {
    id: null,
    user_id: null,
    tanggal_checkin: null,
    tanggal_checkout: null,
    foto_checkin: null,
    foto_checkout: null,
    latitude_checkin: null,
    longitude_checkin: null,
    latitude_checkout: null,
    longitude_checkout: null,
    status: null,
    alasan: null,
    durasi_kerja: null,
    verifikasi_checkin: false,
    verifikasi_checkout: false,

  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPresensiThunk.fulfilled, (state, action) => {
        state.id = action.payload?.id;
        state.user_id = action.payload?.user_id;
        state.tanggal_checkin = action.payload?.tanggal_checkin;
        state.tanggal_checkout = action.payload?.tanggal_checkout;
        state.foto_checkin = action.payload?.foto_checkin;
        state.foto_checkout = action.payload?.foto_checkout;
        state.latitude_checkin = action.payload?.latitude_checkin;
        state.longitude_checkin = action.payload?.longitude_checkin;
        state.latitude_checkout = action.payload?.latitude_checkout;
        state.longitude_checkout = action.payload?.longitude_checkout;
        state.status = action.payload?.status;
        state.alasan = action.payload?.alasan;
        state.durasi_kerja = action.payload?.durasi_kerja;
        state.verifikasi_checkin = action.payload?.verifikasi_checkin;
        state.verifikasi_checkout = action.payload?.verifikasi_checkout;
      })
      .addCase(createPresensiThunk.fulfilled, (state, action) => {
        state.id = action.payload?.id;
        state.user_id = action.payload?.user_id;
        state.tanggal_checkin = action.payload?.tanggal_checkin;
        state.tanggal_checkout = action.payload?.tanggal_checkout;
        state.foto_checkin = action.payload?.foto_checkin;
        state.foto_checkout = action.payload?.foto_checkout;
        state.latitude_checkin = action.payload?.latitude_checkin;
        state.longitude_checkin = action.payload?.longitude_checkin;
        state.latitude_checkout = action.payload?.latitude_checkout;
        state.longitude_checkout = action.payload?.longitude_checkout;
        state.status = action.payload?.status;
        state.alasan = action.payload?.alasan;
        state.durasi_kerja = action.payload?.durasi_kerja;
        state.verifikasi_checkin = action.payload?.verifikasi_checkin;
        state.verifikasi_checkout = action.payload?.verifikasi_checkout;
      })
      .addCase(updatePresensiThunk.fulfilled, (state, action) => {
        return {
          ...state,
          tanggal_checkout: action.payload?.tanggal_checkout,
          foto_checkout: action.payload?.foto_checkout,
          latitude_checkout: action.payload?.latitude_checkout,
          longitude_checkout: action.payload?.longitude_checkout,
          verifikasi_checkout: action.payload?.verifikasi_checkout,
        };
      })
  }
})

export default presensiSlice.reducer