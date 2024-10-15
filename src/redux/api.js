import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, logout, getStaffLogin, addStaffPresensi, getStaffPresensi, updateStaffPresensi, getStaffPresensiByUserLogin } from "../api";
import Cookies from "js-cookie";

export const loginThunk = createAsyncThunk("auth/login", async (data) => {
  const response = await login(data.username, data.password);
  const { token } = response;
  Cookies.set("accessToken", token, { expires: 1, secure: true, sameSite: "strict" });
  return response;
});

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  const response = await logout();
  Cookies.remove("accessToken");
  return response;
})

export const getUserLoginThunk = createAsyncThunk("user/getUserLogin", async () => {
  const response = await getStaffLogin();
  return response.data;
})

export const createPresensiThunk = createAsyncThunk("presensi/create", async (data) => {
  const response = await addStaffPresensi(data);
  return response.data;
})

export const getPresensiThunk = createAsyncThunk("presensi/get", async () => {
  const response = await getStaffPresensi();
  return response.data;
})

export const updatePresensiThunk = createAsyncThunk("presensi/update", async (data) => {
  const response = await updateStaffPresensi(data);
  return response.data;
})

export const getPresensiHistoryThunk = createAsyncThunk("presensiHistory/get", async () => {
  const response = await getStaffPresensiByUserLogin();
  return response.data;
})