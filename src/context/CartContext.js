import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create a Context for the cart
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const clearCart = () => {
    setCartItems([]);
  };


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(item => item.id === product._id);
      if (existingItem) {
        return prevCartItems.map(item =>
          item.id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCartItems, { id: product._id, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const product = products.find(p => p._id === item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  // Calculate the total count of items in the cart
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeItem, getTotalPrice, products, cartCount, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
