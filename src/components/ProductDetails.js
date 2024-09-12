import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

function ProductDetails() {
  const { id } = useParams(); // Get productId from URL parameters
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { isAuthenticated } = useUser();
  const { addToCart } = useCart();
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://boldspark-backend.onrender.com/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
        setReviews(data.reviews || []);
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (product) => {
    if (isAuthenticated) {
      addToCart(product);
      navigate("/checkout");
      toast.success("Product added to cart successfully!");
    } else {
      toast.error("Please log in to Buy Products.");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
  <h1 className="text-3xl font-bold text-center mb-6">{product.title}</h1>
  <div className="flex flex-col md:flex-row md:items-start md:justify-center">
    {/* Image Section */}
    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
      <img
        src={product.image}
        alt={product.title}
        className="w-64 h-80 object-cover rounded-lg shadow-md"
      />
    </div>

    {/* Details Section */}
    <div className="flex-1 md:max-w-lg">
      <p className="text-gray-800 mb-4">{product.description}</p>
      <p className="text-xl font-semibold mb-4">
        ₹
        {product.price.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
        })}
      </p>

      {/* Discount Information */}
      {product.discount && (
        <p className="text-red-600 font-bold mb-4">
          {product.discount}% OFF
        </p>
      )}

      {/* Additional Details */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-semibold mb-2">Additional Details</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>7 days Service Centre Replacement</li>
          <li>Free Delivery</li>
          <li>1 Year Warranty Care</li>
        </ul>
      </div>

      <button
        onClick={() => handleAddToCart(product)}
        className="inline-block px-4 py-2 text-center bg-amber-600 text-white font-semibold rounded-md hover:bg-orange-600 transition-colors duration-300"
      >
        Buy Now
      </button>
    </div>
  </div>

  {/* Offers Section */}
  <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-2">Offers</h2>
    <div className="space-y-4">
      {/* Bank Offer */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-md font-semibold mb-2">Bank Offer</h3>
        <p className="text-gray-700">
          Upto ₹1,750.00 discount on select Credit Cards, HDFC Bank Debit Cards
        </p>
      </div>

      {/* No Cost EMI */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-md font-semibold mb-2">No Cost EMI</h3>
        <p className="text-gray-700">
          Upto ₹832.97 EMI interest savings on Amazon Pay ICICI Bank Credit Cards
        </p>
      </div>

      {/* Partner Offers */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-md font-semibold mb-2">Partner Offers</h3>
        <p className="text-gray-700">
          Get GST invoice and save up to 28% on business purchases. Sign up for free.
        </p>
      </div>
    </div>
  </div>
</div>

  );
}

export default ProductDetails;

