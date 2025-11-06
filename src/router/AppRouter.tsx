import React, { Suspense, lazy, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from '../context/CartContext.tsx';
import { ProductProvider } from '../context/ProductContext.tsx';
import { IngredientProvider } from '../context/IngredientContext';

// ===== Lazy load layouts =====
const MainLayout = lazy(() => import('../components/layout/MainLayout'));
const POSLayoutNew = lazy(() => import('../components/layout/POSLayoutNew'));

// ===== Lazy load pages =====
const POSPage = lazy(() => import('../pages/POSPage'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'));
const OrderSuccessPage = lazy(() => import('../pages/OrderSuccessPage'));
const CustomerDisplayPage = lazy(() => import('../pages/CustomerDisplayPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const StockManagementPage = lazy(() => import('../pages/StockManagementPage'));

// ===== Loader Component =====
const PageLoader = () => (
  <div className="h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
      <p className="text-gray-600">Đang tải...</p>
    </div>
  </div>
);

// ===== Layout Reset Component =====
function LayoutReset() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.removeAttribute('data-page');
    document.body.setAttribute('data-page', pathname.replace('/', '') || 'home');
    document.body.style.overflow = 'hidden';
  }, [pathname]);

  return null;
}

/**
 * AppRoutes – xử lý toàn bộ định tuyến và tách riêng giao diện hiển thị
 */
function AppRoutes() {
  const location = useLocation();
  const isDisplayPage = location.pathname.startsWith('/display');

  // === CASE 1: Customer Display (full screen, no wrapper) ===
  if (isDisplayPage) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/display" element={<CustomerDisplayPage />} />
          <Route path="*" element={<Navigate to="/display" replace />} />
        </Routes>
      </Suspense>
    );
  }

  // === CASE 2: POS + Pages khác (dùng layout POS/Main) ===
  return (
    <div className="min-h-screen w-full bg-gray-50 overflow-x-hidden">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* POS Layout - Main Page */}
          <Route path="/" element={<POSLayoutNew />}>
            <Route index element={<POSPage />} />
          </Route>

          {/* Product Detail */}
          <Route path="/product/:id" element={<POSLayoutNew />}>
            <Route index element={<ProductDetailPage />} />
          </Route>

          {/* Order success */}
          <Route path="/order-success" element={<MainLayout />}>
            <Route index element={<OrderSuccessPage />} />
          </Route>

          {/* Checkout */}
          <Route path="/checkout" element={<POSLayoutNew />}>
            <Route index element={<CheckoutPage />} />
          </Route>

          {/* Doanh Thu */}
          <Route path="/dashboard" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
          </Route>

          {/* Stock Management */}
          <Route path="/stock-management" element={<MainLayout />}>
            <Route index element={<StockManagementPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

/**
 * AppRouter – bọc provider và router
 */
const AppRouter: React.FC = () => {
  return (
    <Router>
      <LayoutReset />
      <CartProvider>
        <ProductProvider>
          <IngredientProvider>
            <AppRoutes />
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
          </IngredientProvider>
        </ProductProvider>
      </CartProvider>
    </Router>
  );
};

export default AppRouter;
