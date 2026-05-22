import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FilterSection from '../components/FilterSection';
import TaskCard from '../components/TaskCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import ConfirmModal from '../components/ConfirmModal';
import { useTask } from '../context/TaskContext';

const Home = () => {
  const { tasks, loading, getTasks, deleteTask } = useTask();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    completed: '',
    priority: '',
    sortBy: 'newest',
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch tasks when filters change
  useEffect(() => {
    const params = {
      search: searchTerm,
      completed: filters.completed,
      priority: filters.priority,
      sortBy: filters.sortBy,
    };

    // Remove empty values
    Object.keys(params).forEach(
      (key) => params[key] === '' && delete params[key]
    );

    getTasks(params);
  }, [searchTerm, filters, getTasks]);

  const handleDeleteClick = (taskId) => {
    setSelectedTaskId(taskId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedTaskId) return;

    setDeleting(true);
    const success = await deleteTask(selectedTaskId);
    setDeleting(false);

    if (success) {
      setDeleteModalOpen(false);
      setSelectedTaskId(null);
    }
  };

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const activeTasks = totalTasks - completedTasks;

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            Your Tasks
          </h1>
          <p className='text-gray-600'>Stay organized and track your progress</p>
        </div>

        {/* Statistics */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
          <div className='bg-white rounded-lg shadow-md p-6 border-t-4 border-t-blue-500'>
            <p className='text-gray-600 text-sm font-medium'>Total Tasks</p>
            <p className='text-3xl font-bold text-gray-900 mt-1'>{totalTasks}</p>
          </div>

          <div className='bg-white rounded-lg shadow-md p-6 border-t-4 border-t-green-500'>
            <p className='text-gray-600 text-sm font-medium'>Completed</p>
            <p className='text-3xl font-bold text-green-600 mt-1'>
              {completedTasks}
            </p>
          </div>

          <div className='bg-white rounded-lg shadow-md p-6 border-t-4 border-t-orange-500'>
            <p className='text-gray-600 text-sm font-medium'>Active</p>
            <p className='text-3xl font-bold text-orange-600 mt-1'>{activeTasks}</p>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
          {/* Filters */}
          <div className='lg:col-span-1'>
            <SearchBar
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='mt-4'>
              <FilterSection filters={filters} onFilterChange={setFilters} />
            </div>
          </div>

          {/* Tasks */}
          <div className='lg:col-span-3'>
            {loading ? (
              <Loader />
            ) : tasks.length === 0 ? (
              <EmptyState />
            ) : (
              <div className='space-y-4'>
                {tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDeleteClick={handleDeleteClick}
                  />
                ))}
              </div>
            )}
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

export default Home;
