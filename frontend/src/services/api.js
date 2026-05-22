import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Task API functions
export const fetchAllTasks = (params) => API.get('/tasks', { params });
export const fetchTaskById = (id) => API.get(`/tasks/${id}`);
export const createNewTask = (taskData) => API.post('/tasks', taskData);
export const updateExistingTask = (id, taskData) => API.put(`/tasks/${id}`, taskData);
export const toggleTask = (id) => API.patch(`/tasks/${id}/toggle`);
export const deleteExistingTask = (id) => API.delete(`/tasks/${id}`);

// Health check
export const checkHealth = () => API.get('/health');

export default API;
