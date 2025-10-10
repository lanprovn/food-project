import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SidebarCart from '../components/layout/SidebarCart';
import HomePage from '../pages/HomePage';
import MenuPage from '../pages/MenuPage';
import CategoryPage from '../pages/CategoryPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import HotDealsPage from '../pages/HotDealsPage';
import PromotionPage from '../pages/PromotionPage';
import StorePage from '../pages/StorePage';
import TrackingPage from '../pages/TrackingPage';
import BookPartyPage from '../pages/BookPartyPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CheckoutPage from '../pages/CheckoutPage';
import WishlistPage from '../pages/WishlistPage';
import NotFoundPage from '../pages/NotFoundPage';
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
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/hot-deals" element={<HotDealsPage />} />
                  <Route path="/promotion" element={<PromotionPage />} />
                  <Route path="/store" element={<StorePage />} />
                  <Route path="/tracking" element={<TrackingPage />} />
                  <Route path="/book-party" element={<BookPartyPage />} />
                  <Route path="/category/:categoryName" element={<CategoryPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
              <SidebarCart />
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
            </div>
            </WishlistProvider>
          </ProductProvider>
        </AuthProvider>
      </CartProvider>
    </Router>
  );
};

export default AppRouter;
