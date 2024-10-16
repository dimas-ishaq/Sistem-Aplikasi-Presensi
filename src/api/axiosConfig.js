import axios from 'axios';
import Cookies from 'js-cookie';
const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});
instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;


//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Panggil endpoint refresh token (cookie HttpOnly akan otomatis dikirim)
//         const { data } = await instance.get('/refresh', { withCredentials: true });
//         console.log(data)

//         //Simpan accessToken baru
//         Cookies.set('accessToken', data.token, {
//           expires: 3 / (24 * 60), secure: true, sameSite: "strict"
//         });

//         // Perbarui request sebelumnya dengan accessToken yang baru
//         originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

//         return instance(originalRequest);
//       } catch (err) {

//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default instance