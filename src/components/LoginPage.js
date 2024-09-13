import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useUser();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://boldspark-backend.onrender.com/api/users/login",
        formData
      );
      
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token); // Save token in localStorage
        login(user); // Update UserContext state

        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Login Successful');

        localStorage.setItem('user', JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          userType: 'login'
        }));

        if (user.role === 'admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/products';
        }
      } else {
        toast.error('No token returned from server');
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100"
    style={{
      backgroundImage: 'url("https://wallpaperaccess.com/full/2593044.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="w-full max-w-md p-8 border-2 border-gray-600 bg-slate-700 rounded-lg shadow-lg">
        <img
          alt="Your Company"
          src="https://i.pinimg.com/originals/f4/cf/ec/f4cfec4f3b4bbf24798b26aa4a5508f2.png"
          className="mx-auto h-16 w-auto cursor-pointer"
        />
        <h2 className="text-2xl font-bold mb-6 text-orange-500 text-center mt-1"> Sign in to your account
        </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-md font-medium text-orange-500">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='enter your email'
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-md font-medium text-orange-500">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder='enter your password'
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div className="flex justify-end mb-4">
              <Link to="/forget-password" className="text-orange-500 hover:underline">Forget password?</Link>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gray-600 hover:bg-slate-800 text-white font-bold rounded-full hover:bg-gray-00 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-105 transition-all"
            >
              Login
            </button>
            <p className="mt-4 text-center text-gray-400">
              Don't have an account? <Link to="/signup" className="text-orange-500 hover:underline">Sign Up</Link>
            </p>
          </form>
      </div>
    </div>
  );
};

export default LoginPage;


