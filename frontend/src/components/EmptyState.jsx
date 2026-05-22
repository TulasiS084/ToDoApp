import React from 'react';
import { FiInbox } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const EmptyState = () => {
  return (
    <div className='flex flex-col items-center justify-center py-12 text-center'>
      <FiInbox size={64} className='text-gray-300 mb-4' />
      <h3 className='text-2xl font-bold text-gray-700 mb-2'>
        No tasks yet!
      </h3>
      <p className='text-gray-500 mb-6 max-w-md'>
        Create your first task to get started and stay organized.
      </p>
      <Link
        to='/add'
        className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition'
      >
        Create First Task
      </Link>
    </div>
  );
};

export default EmptyState;
