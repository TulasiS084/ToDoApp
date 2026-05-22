import React from 'react';

const FilterSection = ({
  filters,
  onFilterChange,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <h3 className='font-bold text-lg mb-4 text-gray-800'>Filters</h3>

      <div className='space-y-4'>
        {/* Status Filter */}
        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-2'>
            Status
          </label>
          <select
            name='completed'
            value={filters.completed || ''}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value=''>All Tasks</option>
            <option value='false'>Active</option>
            <option value='true'>Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-2'>
            Priority
          </label>
          <select
            name='priority'
            value={filters.priority || ''}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value=''>All Priorities</option>
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-2'>
            Sort By
          </label>
          <select
            name='sortBy'
            value={filters.sortBy || 'newest'}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='newest'>Newest First</option>
            <option value='oldest'>Oldest First</option>
            <option value='dueDate'>Due Date</option>
          </select>
        </div>

        {/* Reset Button */}
        <button
          onClick={() =>
            onFilterChange({
              completed: '',
              priority: '',
              sortBy: 'newest',
            })
          }
          className='w-full mt-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition'
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
