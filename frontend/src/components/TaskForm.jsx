import React, { useState } from 'react';

const TaskForm = ({ onSubmit, initialData = null, isLoading = false }) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      description: '',
      priority: 'Medium',
      category: '',
      dueDate: '',
    }
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (formData.title.length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className='bg-white rounded-lg shadow-lg p-8'>
      <div className='space-y-6'>
        {/* Title */}
        <div>
          <label htmlFor='title' className='block text-sm font-semibold text-gray-700 mb-2'>
            Task Title *
          </label>
          <input
            type='text'
            id='title'
            name='title'
            value={formData.title}
            onChange={handleChange}
            placeholder='Enter task title'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
            maxLength={100}
          />
          {errors.title && <p className='text-red-500 text-sm mt-1'>{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor='description' className='block text-sm font-semibold text-gray-700 mb-2'>
            Description
          </label>
          <textarea
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Enter task description'
            rows='4'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
            maxLength={500}
          />
          {errors.description && (
            <p className='text-red-500 text-sm mt-1'>{errors.description}</p>
          )}
          <p className='text-xs text-gray-500 mt-1'>
            {formData.description.length}/500
          </p>
        </div>

        {/* Priority and Category */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Priority */}
          <div>
            <label htmlFor='priority' className='block text-sm font-semibold text-gray-700 mb-2'>
              Priority
            </label>
            <select
              id='priority'
              name='priority'
              value={formData.priority}
              onChange={handleChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
            >
              <option value='Low'>Low</option>
              <option value='Medium'>Medium</option>
              <option value='High'>High</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label htmlFor='category' className='block text-sm font-semibold text-gray-700 mb-2'>
              Category
            </label>
            <input
              type='text'
              id='category'
              name='category'
              value={formData.category}
              onChange={handleChange}
              placeholder='e.g., Work, Personal'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
            />
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label htmlFor='dueDate' className='block text-sm font-semibold text-gray-700 mb-2'>
            Due Date
          </label>
          <input
            type='date'
            id='dueDate'
            name='dueDate'
            value={formData.dueDate}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
          />
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50'
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
