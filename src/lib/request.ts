import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem('token');
    jwt && (config.headers.Authorization = `Bearer ${jwt}`);
    return config;
  },
  () => {
    return Promise.reject(new Error('request error'));
  }
);

// axiosInstance.interceptors.response.use(
//   // (res) => {
//   //   return Promise.resolve(res.data);
//   // },
//   undefined,
//   (err) => {
//     return Promise.reject(err.response);
//   }
// );

export { axiosInstance };
