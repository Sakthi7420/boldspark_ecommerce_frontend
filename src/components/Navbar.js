import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { CgProfile } from "react-icons/cg";
import { GiShoppingCart } from "react-icons/gi";
import { FaUserShield } from "react-icons/fa";
import Modal from "../components/Modal";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useUser();
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsModalOpen(true); 
  };

  const handleConfirmLogout = () => {
    logout();
    navigate("/");
    setIsModalOpen(false); 
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false); 
  };

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              alt="Your Company"
              src="https://i.pinimg.com/originals/f4/cf/ec/f4cfec4f3b4bbf24798b26aa4a5508f2.png"
              className="h-16 w-auto cursor-pointer"
            />
            <Link to="/" className="text-white font-bold text-lg">
              BoldSpark
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/products"
                  className="text-white px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                >
                  Products
                </Link>
                <Link
                  to="/login"
                  className="text-white px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                >
                  Login
                </Link>
              </>
            ) : user.role === "admin" ? (
              <>
                <Link to="/admin" className="text-white px-2 text-2xl rounded">
                  <FaUserShield />
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="text-white px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/profile" className="text-white px-2 text-2xl rounded">
                  <CgProfile />
                </Link>
                <Link to="/cart" className="text-white px-3 text-3xl relative rounded">
                  <GiShoppingCart />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="text-white px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
        message="Are you sure you want to logout?"
      />
    </>
  );
};

export default Navbar;


