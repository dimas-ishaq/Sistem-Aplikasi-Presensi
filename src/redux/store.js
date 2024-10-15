import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import photoReducer from './slices/photoSlice';
import userReducer from './slices/userSlice';
import presensiSlice from './slices/presensiSlice';
import presensiHistorySlice from './slices/presensiHistorySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    photo: photoReducer,
    user: userReducer,
    presensi: presensiSlice,
    presensiHistory: presensiHistorySlice
  },
})