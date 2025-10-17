import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getLowStockProducts, getOutOfStockProducts, getStockAlerts } from '../utils/stockManagement';

interface OrderSummary {
  id: string;
  timestamp: number;
  total: number;
  items: number;
  customerName?: string;
  products?: {
    name: string;
    quantity: number;
    price: number;
    size?: string | null;
    toppings: string[];
    note?: string | null;
  }[];
}

interface DailySales {
  date: string;
  totalRevenue: number;
  totalOrders: number;
  orders: OrderSummary[];
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [dailySales, setDailySales] = useState<DailySales | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isConnected, setIsConnected] = useState(true);
  const [stockAlerts, setStockAlerts] = useState<any[]>([]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Load daily sales data
  useEffect(() => {
    loadDailySales();
    
    // Listen for storage changes (real-time updates)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && e.key.startsWith('dailySales_')) {
        const today = new Date().toISOString().split('T')[0];
        if (e.key === `dailySales_${today}`) {
          loadDailySales();
        }
      }
    };
    
    // Listen for custom events (for same-tab updates)
    const handleOrderUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      setIsConnected(true);
      loadDailySales();
      
      // Show notification for new order
      if (customEvent.detail) {
        toast.success(`🛒 Đơn hàng mới: ${formatCurrency(customEvent.detail.total)}`, {
          duration: 3000,
          position: 'top-right',
        });
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('orderCompleted', handleOrderUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('orderCompleted', handleOrderUpdate);
    };
  }, []);

  const loadDailySales = () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const storedData = localStorage.getItem(`dailySales_${today}`);
      
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setDailySales(parsedData);
      } else {
        // Initialize empty data for today
        const emptyData: DailySales = {
          date: today,
          totalRevenue: 0,
          totalOrders: 0,
          orders: []
        };
        setDailySales(emptyData);
        localStorage.setItem(`dailySales_${today}`, JSON.stringify(emptyData));
      }
      
      // Load stock alerts
      setStockAlerts(getStockAlerts());
    } catch (error) {
      console.error('Error loading daily sales:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getTopSellingProduct = () => {
    if (!dailySales || dailySales.orders.length === 0) return null;
    
    // Count products from all orders
    const productCount: { [key: string]: { name: string; quantity: number; revenue: number } } = {};
    
    dailySales.orders.forEach(order => {
      if (order.products) {
        order.products.forEach(product => {
          if (productCount[product.name]) {
            productCount[product.name].quantity += product.quantity;
            productCount[product.name].revenue += product.price;
          } else {
            productCount[product.name] = {
              name: product.name,
              quantity: product.quantity,
              revenue: product.price
            };
          }
        });
      }
    });
    
    // Find the product with highest quantity
    let topProduct = null;
    let maxQuantity = 0;
    
    Object.values(productCount).forEach(product => {
      if (product.quantity > maxQuantity) {
        maxQuantity = product.quantity;
        topProduct = product;
      }
    });
    
    return topProduct;
  };

  const getHourlyRevenue = () => {
    if (!dailySales || dailySales.orders.length === 0) return [];
    
    const hourlyData = Array.from({ length: 24 }, (_, hour) => ({
      hour: `${hour.toString().padStart(2, '0')}:00`,
      revenue: 0
    }));

    dailySales.orders.forEach(order => {
      const hour = new Date(order.timestamp).getHours();
      hourlyData[hour].revenue += order.total;
    });

    return hourlyData;
  };

  const resetDailyData = () => {
    const today = new Date().toISOString().split('T')[0];
    const emptyData: DailySales = {
      date: today,
      totalRevenue: 0,
      totalOrders: 0,
      orders: []
    };
    setDailySales(emptyData);
    localStorage.setItem(`dailySales_${today}`, JSON.stringify(emptyData));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                ←
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Doanh Thu Hàng Ngày</h1>
                <p className="text-sm text-gray-500">
                  {currentTime.toLocaleDateString('vi-VN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Thời gian hiện tại</p>
                <p className="text-lg font-mono font-semibold text-indigo-600">
                  {currentTime.toLocaleTimeString('vi-VN')}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-xs text-gray-500">Real-time</span>
              </div>
              <button
                onClick={resetDailyData}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
              >
                🔄
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* Total Revenue */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng Doanh Thu</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(dailySales?.totalRevenue || 0)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                💰
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              📈
              <span className="ml-1">Hôm nay</span>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng Đơn Hàng</p>
                <p className="text-3xl font-bold text-gray-900">
                  {dailySales?.totalOrders || 0}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                🛒
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-600">
              ⏰
              <span className="ml-1">Đã xử lý</span>
            </div>
          </div>

          {/* Average Order Value */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Giá Trị TB/Đơn</p>
                <p className="text-3xl font-bold text-gray-900">
                  {dailySales?.totalOrders > 0 
                    ? formatCurrency(dailySales.totalRevenue / dailySales.totalOrders)
                    : formatCurrency(0)
                  }
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                📊
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-purple-600">
              📈
              <span className="ml-1">Trung bình</span>
            </div>
          </div>

          {/* Top Product */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sản Phẩm Hot</p>
                <p className="text-lg font-bold text-gray-900">
                  {getTopSellingProduct()?.name || 'Chưa có'}
                </p>
                <p className="text-sm text-gray-500">
                  {getTopSellingProduct()?.quantity || 0} đơn • {formatCurrency(getTopSellingProduct()?.revenue || 0)}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                🔥
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-orange-600">
              📅
              <span className="ml-1">Hôm nay</span>
            </div>
          </div>

          {/* Stock Alerts */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cảnh Báo Tồn Kho</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stockAlerts.filter(alert => !alert.isRead).length}
                </p>
                <p className="text-sm text-gray-500">
                  {getOutOfStockProducts().length} hết hàng
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                ⚠️
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-red-600">
              📦
              <span className="ml-1">Cần xử lý</span>
            </div>
          </div>
        </div>

        {/* Charts and Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hourly Revenue Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Doanh Thu Theo Giờ</h3>
            <div className="space-y-3">
              {getHourlyRevenue().map((hour, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 w-16">{hour.hour}</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${dailySales?.totalRevenue > 0 
                            ? (hour.revenue / dailySales.totalRevenue) * 100 
                            : 0}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-20 text-right">
                    {formatCurrency(hour.revenue)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Đơn Hàng Gần Đây</h3>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {dailySales?.orders && dailySales.orders.length > 0 ? (
                dailySales.orders
                  .sort((a, b) => b.timestamp - a.timestamp)
                  .slice(0, 10)
                  .map((order) => (
                    <div key={order.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Đơn #{order.id.slice(-6)}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatTime(order.timestamp)} • {order.customerName}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">
                            {formatCurrency(order.total)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.items} món
                          </p>
                        </div>
                      </div>
                      
                      {/* Product Details */}
                      {order.products && order.products.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="space-y-2">
                            {order.products.map((product, index) => (
                              <div key={index} className="flex justify-between items-start text-xs">
                                <div className="flex-1">
                                  <p className="font-medium text-gray-700">
                                    {product.quantity}x {product.name}
                                  </p>
                                  {product.size && (
                                    <p className="text-gray-500">Size: {product.size}</p>
                                  )}
                                  {product.toppings.length > 0 && (
                                    <p className="text-gray-500">
                                      Topping: {product.toppings.join(', ')}
                                    </p>
                                  )}
                                  {product.note && (
                                    <p className="text-gray-500 italic">Ghi chú: {product.note}</p>
                                  )}
                                </div>
                                <div className="text-right ml-2">
                                  <p className="font-medium text-gray-700">
                                    {formatCurrency(product.price)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-gray-500">Chưa có đơn hàng nào hôm nay</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao Tác Nhanh</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/pos')}
              className="p-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center space-x-2"
            >
              🛒
              <span>Bán Hàng</span>
            </button>
            <button
              onClick={() => navigate('/checkout')}
              className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
            >
              💰
              <span>Thanh Toán</span>
            </button>
            <button
              onClick={() => navigate('/stock-management')}
              className="p-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
            >
              📦
              <span>Tồn Kho</span>
            </button>
            <button
              onClick={loadDailySales}
              className="p-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
            >
              🔄
              <span>Làm Mới</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
