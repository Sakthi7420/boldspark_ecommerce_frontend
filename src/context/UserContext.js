import React, { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth(); 
  }, []);

  const login = (userData) => {
    if (userData.token) {
      try {
        const decoded = jwtDecode(userData.token);
        console.log('Decoded token:', decoded);
        setUser({ token: userData.token, userId: decoded.id, role: decoded.role });
        setIsAuthenticated(true);
        localStorage.setItem('token', userData.token);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    } else {
      console.error("No token found in userData");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Decoded token on checkAuth:', decoded);
        setUser({ token, userId: decoded.id, role: decoded.role});
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Failed to decode token:', err);
        setUser(null);
        setIsAuthenticated(false);
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
