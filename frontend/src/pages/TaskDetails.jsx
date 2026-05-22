import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiEdit2, FiTrash2, FiCheckCircle, FiCircle } from 'react-icons/fi';
import Loader from '../components/Loader';
import ConfirmModal from '../components/ConfirmModal';
import { useTask } from '../context/TaskContext';

const TaskDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getTaskById, deleteTask, toggleTaskStatus } = useTask();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  const handleConfirmDelete = async () => {
    setDeleting(true);
    const success = await deleteTask(id);
    setDeleting(false);

    if (success) {
      setDeleteModalOpen(false);
      setTimeout(() => navigate('/'), 1000);
    }
  };

  const handleToggle = async () => {
    const updated = await toggleTaskStatus(id);
    if (updated) {
      setTask(updated);
    }
  };

  const priorityColor = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800',
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
      <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8'>
        <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>Task Not Found</h2>
            <Link
              to='/'
              className='inline-flex items-center gap-2 text-blue-600 hover:underline'
            >
              <FiArrowLeft /> Go back to tasks
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8'>
      <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Back Button */}
        <Link
          to='/'
          className='inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition'
        >
          <FiArrowLeft size={20} />
          Back to Tasks
        </Link>

        {/* Task Card */}
        <div className='bg-white rounded-lg shadow-lg p-8'>
          <div className='flex justify-between items-start mb-6'>
            <div className='flex-1'>
              <div className='flex items-center gap-4 mb-4'>
                <button
                  onClick={handleToggle}
                  className='p-2 hover:bg-gray-100 rounded-lg transition'
                  title={task.completed ? 'Mark incomplete' : 'Mark complete'}
                >
                  {task.completed ? (
                    <FiCheckCircle size={24} className='text-green-600' />
                  ) : (
                    <FiCircle size={24} className='text-gray-400' />
                  )}
                </button>

                <h1
                  className={`text-3xl font-bold ${
                    task.completed
                      ? 'line-through text-gray-400'
                      : 'text-gray-900'
                  }`}
                >
                  {task.title}
                </h1>
              </div>

              <span
                className={`inline-block text-sm font-semibold px-4 py-2 rounded-full ${
                  priorityColor[task.priority]
                }`}
              >
                {task.priority} Priority
              </span>
            </div>

            <div className='flex gap-2'>
              <Link
                to={`/edit/${task._id}`}
                className='p-3 hover:bg-gray-100 rounded-lg text-orange-600 transition'
                title='Edit task'
              >
                <FiEdit2 size={20} />
              </Link>

              <button
                onClick={() => setDeleteModalOpen(true)}
                className='p-3 hover:bg-gray-100 rounded-lg text-red-600 transition'
                title='Delete task'
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          </div>

          {/* Task Details */}
          <div className='space-y-6 border-t pt-6'>
            {/* Status */}
            <div>
              <h3 className='text-sm font-semibold text-gray-700 mb-2'>Status</h3>
              <p className='text-lg'>
                {task.completed ? (
                  <span className='inline-flex items-center gap-2 text-green-600'>
                    <span className='w-2 h-2 bg-green-600 rounded-full'></span>
                    Completed
                  </span>
                ) : (
                  <span className='inline-flex items-center gap-2 text-blue-600'>
                    <span className='w-2 h-2 bg-blue-600 rounded-full'></span>
                    Active
                  </span>
                )}
              </p>
            </div>

            {/* Description */}
            {task.description && (
              <div>
                <h3 className='text-sm font-semibold text-gray-700 mb-2'>
                  Description
                </h3>
                <p className='text-gray-700 whitespace-pre-wrap'>
                  {task.description}
                </p>
              </div>
            )}

            {/* Category */}
            {task.category && (
              <div>
                <h3 className='text-sm font-semibold text-gray-700 mb-2'>
                  Category
                </h3>
                <p className='text-gray-700'>{task.category}</p>
              </div>
            )}

            {/* Due Date */}
            {task.dueDate && (
              <div>
                <h3 className='text-sm font-semibold text-gray-700 mb-2'>
                  Due Date
                </h3>
                <p className='text-gray-700'>
                  {new Date(task.dueDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            )}

            {/* Timestamps */}
            <div className='grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg'>
              <div>
                <h3 className='text-xs font-semibold text-gray-600 uppercase mb-1'>
                  Created
                </h3>
                <p className='text-sm text-gray-700'>
                  {new Date(task.createdAt).toLocaleDateString()} at{' '}
                  {new Date(task.createdAt).toLocaleTimeString()}
                </p>
              </div>

              <div>
                <h3 className='text-xs font-semibold text-gray-600 uppercase mb-1'>
                  Last Updated
                </h3>
                <p className='text-sm text-gray-700'>
                  {new Date(task.updatedAt).toLocaleDateString()} at{' '}
                  {new Date(task.updatedAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title='Delete Task'
        message='Are you sure you want to delete this task? This action cannot be undone.'
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
        isLoading={deleting}
      />
    </div>
  );
};

export default TaskDetails;
