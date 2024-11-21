import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your NestJS backend's base URL
  timeout: 5000, // Optional: Set a timeout for requests
});

// Interceptor to add token to headers
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor to handle errors globally (Optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle global errors like 401 Unauthorized here
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
