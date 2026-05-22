import React, { createContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import {
  fetchAllTasks,
  fetchTaskById,
  createNewTask,
  updateExistingTask,
  toggleTask,
  deleteExistingTask,
} from '../services/api';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all tasks
  const getTasks = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchAllTasks(filters);
      setTasks(response.data.data || []);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch tasks';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get single task
  const getTaskById = useCallback(async (id) => {
    try {
      const response = await fetchTaskById(id);
      return response.data.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch task';
      toast.error(message);
      return null;
    }
  }, []);

  // Add task
  const addTask = useCallback(async (taskData) => {
    setError(null);
    try {
      const response = await createNewTask(taskData);
      setTasks((prev) => [response.data.data, ...prev]);
      toast.success('Task created successfully!');
      return response.data.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create task';
      setError(message);
      toast.error(message);
      return null;
    }
  }, []);

  // Update task
  const updateTaskData = useCallback(async (id, taskData) => {
    setError(null);
    try {
      const response = await updateExistingTask(id, taskData);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? response.data.data : task))
      );
      toast.success('Task updated successfully!');
      return response.data.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update task';
      setError(message);
      toast.error(message);
      return null;
    }
  }, []);

  // Toggle task completion
  const toggleTaskStatus = useCallback(async (id) => {
    setError(null);
    try {
      const response = await toggleTask(id);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? response.data.data : task))
      );
      const status = response.data.data.completed ? 'completed' : 'incomplete';
      toast.success(`Task marked as ${status}!`);
      return response.data.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to toggle task';
      setError(message);
      toast.error(message);
      return null;
    }
  }, []);

  // Delete task
  const deleteTask = useCallback(async (id) => {
    setError(null);
    try {
      await deleteExistingTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success('Task deleted successfully!');
      return true;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete task';
      setError(message);
      toast.error(message);
      return false;
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const value = {
    tasks,
    loading,
    error,
    getTasks,
    getTaskById,
    addTask,
    updateTaskData,
    toggleTaskStatus,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = React.useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within TaskProvider');
  }
  return context;
};
