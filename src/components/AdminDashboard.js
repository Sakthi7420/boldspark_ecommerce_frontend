import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const AdminDashboard = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: '',
    discount: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    } else if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://boldspark-backend.onrender.com/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Error fetching products');
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://boldspark-backend.onrender.com/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Error fetching orders');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!user || !user.token) {
      toast.error('You must be logged in to add a product.');
      return;
    }

    try {
      await axios.post(
        'https://boldspark-backend.onrender.com/api/products',
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            
          },
        }
      );
      toast.success('Product added successfully');
      setNewProduct({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        stock: '',
        discount: ''
      });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error adding product');
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();

    if (!user || !user.token) {
      toast.error('You must be logged in to edit a product.');
      return;
    }

    try {
      await axios.put(
        `https://boldspark-backend.onrender.com/api/products/${editingProduct._id}`,
        editingProduct,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success('Product updated successfully');
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error updating product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!user || !user.token) {
      toast.error('You must be logged in to delete a product.');
      return;
    }

    try {
      await axios.delete(`https://boldspark-backend.onrender.com/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product');
    }
  };

  const handleDeleteOrder = async (id) => {
    if (!user || !user.token) {
      toast.error('You must be logged in to delete an order.');
      return;
    }

    try {
      await axios.delete(`https://boldspark-backend.onrender.com/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      toast.success('Order deleted successfully');
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Error deleting order');
    }
  };

  const handleViewOrders = () => {
    navigate('/order-history'); // Redirect to OrderHistory page
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="flex flex-wrap mb-4">
        <button
          className={`px-4 py-2 mr-2 mb-2 rounded ${activeTab === 'products' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setActiveTab('products')}
        >
          Manage Products
        </button>
        <button
          className={`px-4 py-2 mb-2 rounded ${activeTab === 'orders' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={handleViewOrders}
        >
          View Orders
        </button>
      </div>

      {activeTab === 'products' && (
        <div>
          {/* Add/Edit Product Form */}
          <form onSubmit={editingProduct ? handleEditProduct : handleAddProduct} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['name', 'description', 'price', 'image', 'category', 'stock', 'discount'].map(field => (
                <input
                  key={field}
                  type={field === 'price' || field === 'stock' ? 'number' : 'text'}
                  name={field}
                  placeholder={`Product ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  value={editingProduct ? editingProduct[field] : newProduct[field]}
                  onChange={handleChange}
                  className="border p-2 w-full mb-2"
                />
              ))}
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {editingProduct ? 'Update Product' : 'Add Product'}
            </button>
          </form>

          {/* Product List */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Product List</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {products.map(product => (
                <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-medium">{product.name}</h3>
                    <p className="text-gray-600 font-bold">₹{product.price}</p>
                    <p className="text-gray-600 font-semibold font-serif">{product.category}</p>
                    <div className='mt-1 w-20 bg-green-500 rounded-lg'>
                      <p className="text-white text-center font-semibold">Save {product.discount}%</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div>
          {/* Order List */}
          <h2 className="text-2xl font-semibold mb-4">Order List</h2>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {orders.map(order => (
                <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden p-4">
                  <h3 className="text-lg font-semibold">Order #{order._id}</h3>
                  <p className="text-gray-600">Customer: {order.customerName}</p>
                  <p className="text-gray-600">Total: ₹{order.totalAmount}</p>
                  <p className="text-gray-600">Status: {order.status}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleDeleteOrder(order._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Delete Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
