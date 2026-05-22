import React from 'react';

const Loader = () => {
  return (
    <div className='flex items-center justify-center py-12'>
      <div className='relative w-12 h-12'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-spin'></div>
        <div className='absolute inset-1 bg-white rounded-full'></div>
      </div>
      <span className='ml-4 text-gray-600 font-medium'>Loading tasks...</span>
    </div>
  );
};

export default Loader;
