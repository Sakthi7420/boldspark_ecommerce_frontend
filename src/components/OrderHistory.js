import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import axios from 'axios';

const OrderHistory = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://boldspark-backend.onrender.com/api/orders');
        console.log('Fetched orders:', response.data); 
        
      if(Array.isArray(response.data)){
        setOrders(response.data);
      } else{
        setError('Invalid data format received');
      }
      } catch (error) {
        setError('Error fetching orders.');
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === 'admin') {
      fetchOrders();
    } else {
      setError('You do not have permission to view this page.');
      setLoading(false);
    }
  }, [user]);

  //   fetchOrders();
  // }, []);
  const handleStatusChange = async (orderId, newStatus) => {
    const validStatuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
  
    if (!validStatuses.includes(newStatus)) {
      console.error('Invalid status:', newStatus);
      return;
    }
  
    try {
      await axios.patch(
        `https://boldspark-backend.onrender.com/api/orders/${orderId}/status`,
        { status: newStatus },
      );
      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      setError('Error updating order status.');
      console.error('Error updating order status:', error);
    }
  };
  
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order._id} className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h2 className="text-xl font-semibold mb-2">Order ID: {order._id}</h2>
              <p className="text-gray-600 mb-2">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <div className="mb-2">
                <h3 className="font-semibold">Items:</h3>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index} className="flex items-center justify-between mb-2">
                      <span className="flex-1">{item.productId?.name}</span>
                      <span>{item.quantity} x {item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="font-bold">Total: {order.totalAmount}</p>
              <div className="mt-4">
                <h3 className="font-semibold">Delivery Status:</h3>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="Pending" className='bg-amber-500'>Pending</option>
                  <option value="Shipped" className='bg-orange-600'>Shipped</option>
                  <option value="Delivered" className='bg-green-600'>Delivered</option>
                  <option value="Cancelled" className='bg-red-600'>Cancelled</option>
                </select>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;

