import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }
    
    return Promise.reject({
      success: false,
      error: 'Network error',
      message: 'Please check your internet connection',
    });
  }
);

export default api;