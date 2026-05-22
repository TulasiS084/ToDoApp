import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiHome } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className='sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <Link to='/' className='flex items-center gap-2 font-bold text-xl hover:opacity-90'>
            <FiHome size={24} />
            Todo App
          </Link>

          <Link
            to='/add'
            className='flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition'
          >
            <FiPlus size={20} />
            Add Task
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
