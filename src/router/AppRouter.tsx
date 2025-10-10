import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from '../pages/HomePage';
import POSPage from '../pages/POSPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrderSuccessPage from '../pages/OrderSuccessPage';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import { ProductProvider } from '../context/ProductContext';
import { WishlistProvider } from '../context/WishlistContext';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <AuthProvider>
          <ProductProvider>
            <WishlistProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<HomePage />} />
                <Route path="/pos" element={<POSPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                }}
              />
            </WishlistProvider>
          </ProductProvider>
        </AuthProvider>
      </CartProvider>
    </Router>
  );
};

export default AppRouter;
