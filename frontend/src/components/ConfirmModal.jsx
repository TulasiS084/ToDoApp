import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4'>
        <div className='flex items-center gap-4 mb-4'>
          <FiAlertTriangle size={32} className='text-red-500' />
          <div>
            <h3 className='font-bold text-lg text-gray-800'>{title}</h3>
          </div>
        </div>

        <p className='text-gray-600 mb-6'>{message}</p>

        <div className='flex gap-3 justify-end'>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className='px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50'
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
