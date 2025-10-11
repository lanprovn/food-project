import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from '../context/CartContext.tsx';
import { AuthProvider } from '../context/AuthContext.tsx';
import { ProductProvider } from '../context/ProductContext.tsx';
import { WishlistProvider } from '../context/WishlistContext.tsx';

// Lazy load layouts
const MainLayout = lazy(() => import('../components/layout/MainLayout'));
const POSLayoutNew = lazy(() => import('../components/layout/POSLayoutNew'));

// Lazy load pages for better performance
const MenuPage = lazy(() => import('../pages/MenuPage'));
const POSPage = lazy(() => import('../pages/POSPage'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'));
const OrderSuccessPage = lazy(() => import('../pages/OrderSuccessPage'));

// Loading component
const PageLoader = () => (
  <div className="h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
      <p className="text-gray-600">Đang tải...</p>
    </div>
  </div>
);

const AppRouter: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <AuthProvider>
          <ProductProvider>
            <WishlistProvider>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Redirect root to POS */}
                  <Route path="/" element={<Navigate to="/pos" replace />} />
                  
                  {/* Main Layout Routes */}
                  <Route path="/menu" element={<MainLayout />}>
                    <Route index element={<MenuPage />} />
                  </Route>
                  
                  <Route path="/order-success" element={<MainLayout />}>
                    <Route index element={<OrderSuccessPage />} />
                  </Route>
                  
                  {/* POS Layout Routes */}
                  <Route path="/pos" element={<POSLayoutNew />}>
                    <Route index element={<POSPage />} />
                    <Route path=":id" element={<ProductDetailPage />} />
                  </Route>
                  
                  {/* Checkout Route - Standalone */}
                  <Route path="/checkout" element={<POSLayoutNew />}>
                    <Route index element={<CheckoutPage />} />
                  </Route>
                  
                  {/* Fallback - redirect to POS */}
                  <Route path="*" element={<Navigate to="/pos" replace />} />
                </Routes>
              </Suspense>
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
