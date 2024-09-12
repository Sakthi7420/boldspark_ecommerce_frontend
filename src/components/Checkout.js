import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode

function Checkout() {
  const { cartItems, getTotalPrice, products, clearCart } = useCart();
  const { user } = useUser(); // Access user context
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    phoneNumber: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      setIsProcessing(false);
      return;
    }

    // Decode the token to get user ID
    let userId;
    try {
      const decoded = jwtDecode(token);
      userId = decoded._id; // Extract userId from decoded token
    } catch (error) {
      console.error('Failed to decode token:', error);
      setIsProcessing(false);
      return;
    }

    // Prepare order data
    const orderData = {
      userId: user.userId, // Use userId from decoded token
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: getProductDetails(item.id).price
      })),
      totalAmount: getTotalPrice(),
      ...formData
    };

    try {
      // Send order data to backend API
      await axios.post('http://localhost:5000/api/orders', orderData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      clearCart();
      toast.success('Order Placed Successfully')
      navigate('/order-confirmation', {
        state: {
          formData,
          totalAmount: getTotalPrice()
        }
      });
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle error (show error message to user)
    } finally {
      setIsProcessing(false);
    }
  };

  const getProductDetails = (itemId) => {
    return products.find(product => product._id === itemId);
  };

  return (
    <div className="container mx-auto md:px-48 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>
      
      {/* Checkout Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">ZIP Code</label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={`px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isProcessing ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </button>
      </form>

      {/* Cart Summary */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
        <ul className="space-y-4">
          {cartItems.map(item => {
            const product = getProductDetails(item.id);
            return product ? (
              <li key={item.id} className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex-grow ml-4">
                  <span className="block text-lg font-semibold">{product.name}</span>
                  <span className="block text-gray-600">Price: ₹{product.price}</span>
                  <span className="block text-gray-600">Quantity: {item.quantity}</span>
                </div>
                <span className="text-lg font-semibold">₹{(product.price * item.quantity)}</span>
              </li>
            ) : null;
          })}
        </ul>
        <p className="mt-4 text-lg font-bold">Total: ₹{getTotalPrice()}</p>
      </div>
    </div>
  );
}

export default Checkout;
