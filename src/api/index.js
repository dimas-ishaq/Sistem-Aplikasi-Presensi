import axiosInstance from "./axiosConfig";

export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post('/login', {
      username,
      password
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const register = async (name, username, password, role) => {
  try {
    const response = await axiosInstance.post('/register', {
      name,
      username,
      password,
      role
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const logout = async () => {
  try {
    const response = await axiosInstance.get('/logout')
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getStaffLogin = async () => {
  try {
    const response = await axiosInstance.get('/user')
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const addStaffPresensi = async (data) => {
  try {
    const response = await axiosInstance.post('/presensi', data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getStaffPresensi = async () => {
  try {
    const response = await axiosInstance.get('/presensi')
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const updateStaffPresensi = async (data) => {
  try {
    const response = await axiosInstance.put('/presensi', data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getStaffPresensiByUserLogin = async () => {
  try {
    const response = await axiosInstance.get('/presensi/all')
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getNewAccessToken = async () => {
  try {
    const response = await axiosInstance.get('/refresh', { withCredentials: true })
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}