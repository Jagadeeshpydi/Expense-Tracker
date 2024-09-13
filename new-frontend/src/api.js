import axios from 'axios';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api/', // Ensure this is the correct URL
});

// Request interceptor to add the Authorization header if a token is present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error) // Pass on request errors
);

// Response interceptor to handle responses and errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle unauthorized errors (e.g., token expired)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token'); // Clear expired token
      // Optionally redirect to login or notify the user
      // For example: window.location.href = '/login';
    }
    return Promise.reject(error); // Pass on response errors
  }
);

export default api;
