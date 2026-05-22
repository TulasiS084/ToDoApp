import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gradient-to-r from-slate-800 to-slate-900 text-gray-300 mt-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div>
            <h3 className='text-lg font-bold text-white'>Todo MERN App</h3>
            <p className='text-sm mt-1'>Manage your tasks efficiently</p>
          </div>

          <div className='mt-4 md:mt-0'>
            <p className='text-sm'>
              &copy; {currentYear} Todo App. All rights reserved.
            </p>
          </div>
        </div>

        <div className='border-t border-gray-700 mt-6 pt-6'>
          <p className='text-xs text-center text-gray-500'>
            Built with React, Node.js, and MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
