import React, { useState, useEffect } from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useCart();
  const [orderCount, setOrderCount] = useState(0);
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://boldspark-backend.onrender.com/api/products");
        setProducts(response.data);

        const uniqueCategories = [...new Set(response.data.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);


  useEffect(() => {
    // Filter products based on the search query and selected category
    const filterProducts = () => {
      let filtered = products;

      if (searchQuery) {
        const lowercasedQuery = searchQuery.toLowerCase();
        filtered = filtered.filter((product) => {
          const matchesName = product.name.toLowerCase().includes(lowercasedQuery);
          const matchesPrice = product.price.toString().includes(lowercasedQuery);
          return matchesName || matchesPrice;
        });
      }

      if (selectedCategory) {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [searchQuery, selectedCategory, products]);


  const handleAddToCart = (product) => {
    if (isAuthenticated) {
      addToCart(product);
      setOrderCount(prevCount => prevCount + 1);
      toast.success("Product added to cart successfully!");
    } else {
      toast.error("Please log in to add items to your cart.");
    }
  };

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold mb-6">Product Catalog</h1>
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or price..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-4 py-2 border rounded-md w-full md:w-80"  // Adjust width as needed
      />
  
      {/* Category Filter */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto">
        <label htmlFor="category" className="text-lg font-medium flex items-center">
          Filter by Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-md w-full md:w-64"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
    </div>
  
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {filteredProducts.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform transform hover:scale-105 hover:shadow-lg relative"
        >
          {product.discount && (
            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-br-lg">
              {product.discount}% OFF
            </div>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
            onClick={() => handleViewDetails(product._id)}
          />
          <div className="p-4 flex-1 flex flex-col justify-between">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-1 font-bold">₹{product.price}</p>
            <p className="text-gray-600 mb-4 font-serif font-semibold">
              {product.category}
            </p>
            <div className="-mt-2">
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              className="inline-block px-4 py-2 text-center bg-amber-500 text-white font-semibold rounded-md hover:bg-orange-600 transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default ProductCatalog;


