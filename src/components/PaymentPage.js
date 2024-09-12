import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, totalAmount } = location.state || {};
  const { getTotalPrice } = useCart()

  if (!formData || totalAmount === undefined) {
    return <div>Loading...</div>; 
  }

  const amountToPay = totalAmount || getTotalPrice();

  const handlePayment = () => {
    navigate('/paymentsuccess');
  };

  return (
    <div className="container mx-auto md:px-56 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Payment</h1>
      
      {/* Shipping Address */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
        <p className="mb-2"><strong>Name:</strong> {formData.name}</p>
        <p className="mb-2"><strong>Email:</strong> {formData.email}</p>
        <p className="mb-2"><strong>Address:</strong> {formData.address}</p>
        <p className="mb-2"><strong>Phone Number:</strong> {formData.phoneNumber}</p>
        <p className="mb-2"><strong>City:</strong> {formData.city}</p>
        <p className="mb-2"><strong>ZIP Code:</strong> {formData.zip}</p>
        <p className="mb-2"><strong>Total:</strong> ₹ {amountToPay} Only</p>
      </div>

      {/* Payment Gateway Button */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Payment</h2>
        <button
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handlePayment}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
