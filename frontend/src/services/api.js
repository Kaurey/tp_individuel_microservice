import axios from 'axios';

const API_GATEWAY_URL = 'http://localhost:4000/api';

const api = axios.create({
    baseURL: API_GATEWAY_URL,
});

export const loginUser = (credentials) => api.post('/users/login', credentials);
export const registerUser = (userData) => api.post('/users/register', userData);
export const fetchPublications = () => api.get('/publications');
export const createPublication = (data, token) =>
    api.post('/publications', data, {
        headers: { Authorization: `Bearer ${token}` },
    });
export const deletePublication = (id, token) =>
    api.delete(`/publications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
export const updatePublication = (id, data, token) =>
    api.put(`/publications/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });

export default api;
