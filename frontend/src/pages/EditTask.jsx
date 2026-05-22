import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import Loader from '../components/Loader';
import { useTask } from '../context/TaskContext';

const EditTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getTaskById, updateTaskData } = useTask();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      const fetchedTask = await getTaskById(id);
      if (fetchedTask) {
        setTask(fetchedTask);
      }
      setLoading(false);
    };

    fetchTask();
  }, [id, getTaskById]);

  const handleUpdateTask = async (taskData) => {
    setIsUpdating(true);
    const updated = await updateTaskData(id, taskData);
    setIsUpdating(false);

    if (updated) {
      setTimeout(() => navigate('/'), 1000);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8'>
        <Loader />
      </div>
    );
  }

  if (!task) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>Task Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className='text-blue-600 hover:underline'
          >
            Go back to tasks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8'>
      <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-900'>Edit Task</h1>
          <p className='text-gray-600 mt-2'>Update your task details</p>
        </div>

        <TaskForm
          onSubmit={handleUpdateTask}
          initialData={{
            title: task.title,
            description: task.description || '',
            priority: task.priority,
            category: task.category || '',
            dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
          }}
          isLoading={isUpdating}
        />
      </div>
    </div>
  );
};

export default EditTask;
