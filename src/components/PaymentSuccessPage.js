import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="text-green-500 text-6xl mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600">Your payment was processed successfully.</p>
        <Link to={'/products'}>
        <p className='text-md bg-green-600 text-white font-bold text-center rounded-md mt-3 py-2'>Continue Shopping</p>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
