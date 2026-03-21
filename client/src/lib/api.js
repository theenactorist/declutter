import axios from 'axios';

// The base URL for the Express backend
// If running locally, this will typically be http://localhost:3001/api
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercept requests to inject the JWT token for admin routes
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('declutter_token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
