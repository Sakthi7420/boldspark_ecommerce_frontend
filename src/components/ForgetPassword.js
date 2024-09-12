import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   // Replace with your API endpoint for requesting a password reset
    //   await axios.post("http://localhost:5000/api/users/forget-password", { email });
    //   toast.success("Password reset link sent to your email");
    //   setEmail(''); // Clear the input field after successful request
    // } catch (err) {
    //   console.error("Error:", err);
    //   toast.error(err.response?.data?.message || "An error occurred");
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100"
    style={{
      backgroundImage: 'url("https://as2.ftcdn.net/v2/jpg/02/16/47/35/1000_F_216473592_NefHePTpMfvYMNjD3UQTUVJy7DFPwqKA.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="w-full max-w-md p-8 border-gray-600 bg-slate-700 rounded-lg shadow-lg">
      <img
          alt="Your Company"
          src="https://www.wallsnapy.com/img_gallery/best-swastik-png-images-1080px-hd-9613257.png"
          className="mx-auto h-20 w-auto cursor-pointer"
        />
        <h2 className="text-2xl font-bold mb-6 text-orange-500 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-orange-500">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-gray-600 hover:bg-slate-800 text-white font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all hover:scale-105"
          >
            Send Reset Link
          </button>
          <div className="mt-4 text-center">
            <Link to="/login" className="text-orange-500 hover:underline">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
