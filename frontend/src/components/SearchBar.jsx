import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ value, onChange, placeholder = 'Search tasks...' }) => {
  return (
    <div className='relative'>
      <FiSearch className='absolute left-3 top-3 text-gray-400' size={20} />
      <input
        type='text'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
      />
    </div>
  );
};

export default SearchBar;
