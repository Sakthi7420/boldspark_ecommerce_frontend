import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoEye, IoLogoApple } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );
      toast.success("User registered successfully");

      localStorage.setItem(
        "user",
        JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          userType: "signup", //flag
        })
      );

      navigate("/login");
    } catch (err) {
      console.error("Error:", err);
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: 'url("https://www.ultraimagehub.com/wallpapers/tr:flp-false,gx-0.6,gy-0.5,q-75,rh-3264,rw-5824,th-1080,tw-1920/1242023929955090505.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md p-8 border-2 border-gray-600 bg-slate-700 rounded-lg shadow-lg">
        <img
          alt="Your Company"
          src="https://www.wallsnapy.com/img_gallery/best-swastik-png-images-1080px-hd-9613257.png"
          className="mx-auto h-16 w-auto cursor-pointer "
        />
        <h2 className="text-2xl font-bold mb-6 text-orange-500 text-center mt-2">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-orange-500">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="firstname"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-orange-500">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="lastname"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-orange-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="enter your email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-orange-500">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="enter your password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" // Add padding-right to accommodate the icon
            />
            <div
              className="absolute inset-y-0 right-1 flex items-center pr-2 cursor-pointer mt-5 text-xl"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <IoEye /> : <IoMdEyeOff />}
            </div>
          </div>

          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-orange-500">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="enter your confirmpassword"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" // Add padding-right to accommodate the icon
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-xl"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <IoEye /> : <IoMdEyeOff />}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-800 text-white font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-105 transition-all"
          >
            Sign Up
          </button>
          <p className="mt-4 text-center text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-orange-500 hover:underline">
              Login
            </a>
          </p>

          {/* Horizontal Line with Sign-In Options */}
          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-500" />
            <span className="mx-4 text-gray-500">or</span>
            <hr className="flex-1 border-gray-500" />
          </div>

          {/* Sign-In Buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              className="flex border-2 items-center justify-center w-72 px-3 py-2 bg-white text-black font-bold rounded-md hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={() => alert("Sign in with Google")}
            >
              <FaGoogle className="mr-2 text-lg" />
              Google
            </button>
            <button
              type="button"
              className="flex border-2 items-center justify-center w-72 px-3 py-2 bg-white text-black font-bold rounded-md hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600"
              onClick={() => alert("Sign up with iOS")}
            >
              <IoLogoApple className="mr-2 text-lg" />
              iOS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
