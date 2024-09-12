// src/components/Modal.js
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 border-x-4 border-y-4 border-sky-500">
        <h2 className="text-lg font-semibold mb-4 text-center">Confirmation!</h2>
        <p className="text-gray-700 text-center font-bold mb-6">{message}</p>
        <div className="flex justify-center space-x-10">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            No
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
