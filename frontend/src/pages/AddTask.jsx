import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { useTask } from '../context/TaskContext';

const AddTask = () => {
  const navigate = useNavigate();
  const { addTask } = useTask();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTask = async (taskData) => {
    setIsLoading(true);
    const newTask = await addTask(taskData);
    setIsLoading(false);

    if (newTask) {
      setTimeout(() => navigate('/'), 1000);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8'>
      <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-900'>Create New Task</h1>
          <p className='text-gray-600 mt-2'>Add a new task to your list</p>
        </div>

        <TaskForm onSubmit={handleAddTask} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default AddTask;
