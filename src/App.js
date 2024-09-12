import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductCatalog from './components/ProductCatalog';
import ProductDetails from './components/ProductDetails';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import OrderHistory from './components/OrderHistory';
import AdminDashboard from './components/AdminDashboard';
import HomePage from './components/HomePage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ForgetPassword from './components/ForgetPassword';
import { UserProvider } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentPage from './components/PaymentPage';
import PaymentSuccessPage from './components/PaymentSuccessPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './components/ProfilePage';




function App() {
  return (
    <UserProvider>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<ProductCatalog />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/order-confirmation" element={<PaymentPage />} />
            <Route path="/paymentsuccess" element={<PaymentSuccessPage />} />
        </Route>

      </Routes>
      <Footer/>
      <ToastContainer />
    </Router>
    </UserProvider>
    
  );
}

export default App;

