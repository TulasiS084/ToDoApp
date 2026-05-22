import React from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiCheckCircle, FiCircle, FiEye } from 'react-icons/fi';
import { useTask } from '../context/TaskContext';

const TaskCard = ({ task, onDeleteClick }) => {
  const { toggleTaskStatus } = useTask();

  const priorityColor = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800',
  };

  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  const handleToggle = async (e) => {
    e.preventDefault();
    await toggleTaskStatus(task._id);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-5 border-l-4 transition hover:shadow-lg ${
        task.completed ? 'border-l-green-500 opacity-75' : 'border-l-blue-500'
      } ${isOverdue ? 'ring-2 ring-red-200' : ''}`}
    >
      <div className='flex justify-between items-start mb-3'>
        <div className='flex-1'>
          <h3
            className={`font-semibold text-lg ${
              task.completed ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
          >
            {task.title}
          </h3>

          {task.category && (
            <p className='text-sm text-gray-500 mt-1'>
              Category: <span className='font-medium'>{task.category}</span>
            </p>
          )}

          {task.description && (
            <p className='text-sm text-gray-600 mt-2 line-clamp-2'>
              {task.description}
            </p>
          )}
        </div>

        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${priorityColor[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.dueDate && (
        <p
          className={`text-sm mb-3 ${
            isOverdue ? 'text-red-600 font-semibold' : 'text-gray-500'
          }`}
        >
          {isOverdue && '⚠️ '}
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      <div className='flex gap-2 justify-end'>
        <button
          onClick={handleToggle}
          className='p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition'
          title={task.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {task.completed ? (
            <FiCheckCircle size={20} className='text-green-600' />
          ) : (
            <FiCircle size={20} />
          )}
        </button>

        <Link
          to={`/task/${task._id}`}
          className='p-2 hover:bg-gray-100 rounded-lg text-blue-600 transition'
          title='View details'
        >
          <FiEye size={20} />
        </Link>

        <Link
          to={`/edit/${task._id}`}
          className='p-2 hover:bg-gray-100 rounded-lg text-orange-600 transition'
          title='Edit task'
        >
          <FiEdit2 size={20} />
        </Link>

        <button
          onClick={() => onDeleteClick(task._id)}
          className='p-2 hover:bg-gray-100 rounded-lg text-red-600 transition'
          title='Delete task'
        >
          <FiTrash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
