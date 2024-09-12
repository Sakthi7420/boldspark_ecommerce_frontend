import React from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoMdTrash } from "react-icons/io";

const ShoppingCart = () => {
  const { cartItems, removeItem, getTotalPrice, products } = useCart(); // Include `products` if provided in context

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error(
        "Your cart is empty. Please add at least one product to proceed."
      );
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="container mx-auto md:px-60 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Shopping Cart
      </h1>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {cartItems.map((item) => {
            const product = products.find((p) => p._id === item.id); // Use products from context
            return product ? (
              <div
                key={item.id}
                className="flex items-center border-b border-gray-200 p-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="ml-4 flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-gray-600">Price: {product.price}</p>
                  <p className="mt-1 text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-red-600 text-white px-4 py-3 text-xl rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <IoMdTrash />
                </button>
              </div>
            ) : null;
          })}
        </div>
      )}

      {/* Total Price */}
      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Total:</h2>
        <p className="text-xl font-bold text-gray-900">
          ₹
          {getTotalPrice().toLocaleString("en-IN", {
            minimumFractionDigits: 2,
          })}
        </p>
      </div>

      {/* Checkout Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleCheckout}
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
