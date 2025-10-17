import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  getAllProductStocks,
  getStockTransactions,
  getStockAlerts,
  addStock,
  adjustStock,
  getLowStockProducts,
  getOutOfStockProducts,
  markAlertAsRead,
  getStockStatus,
  getStockStatusColor,
  getStockStatusIcon,
  STOCK_UNITS
} from '../utils/stockManagement';
import { useProducts } from '../hooks/useProducts';

// Import types separately
import type { ProductStock, StockTransaction, StockAlert } from '../utils/stockManagement';
import type { Product } from '../types/product';

const StockManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const [stocks, setStocks] = useState<ProductStock[]>([]);
  const [transactions, setTransactions] = useState<StockTransaction[]>([]);
  const [alerts, setAlerts] = useState<StockAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'stocks' | 'transactions' | 'alerts'>('stocks');
  const [filter, setFilter] = useState<'all' | 'low_stock' | 'out_of_stock'>('all');
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductStock | null>(null);
  const [adjustQuantity, setAdjustQuantity] = useState('');
  const [adjustReason, setAdjustReason] = useState('');

  useEffect(() => {
    loadData();
    
    // Listen for stock updates
    const handleStockUpdate = () => {
      loadData();
    };
    
    window.addEventListener('stockAlert', handleStockUpdate);
    
    return () => {
      window.removeEventListener('stockAlert', handleStockUpdate);
    };
  }, []);

  const loadData = () => {
    try {
      setStocks(getAllProductStocks());
      setTransactions(getStockTransactions());
      setAlerts(getStockAlerts());
    } catch (error) {
      console.error('Error loading stock data:', error);
      toast.error('Lỗi khi tải dữ liệu tồn kho');
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
      day: '2-digit',
      month: '2-digit'
    });
  };

  // Helper function to get product info by ID
  const getProductInfo = (productId: string): Product | null => {
    return products.find(product => product.id === productId) || null;
  };

  const handleAddStock = () => {
    if (!selectedProduct || !adjustQuantity) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const quantity = parseInt(adjustQuantity);
    if (isNaN(quantity) || quantity <= 0) {
      toast.error('Số lượng phải là số dương');
      return;
    }

    try {
      addStock(selectedProduct.productId, quantity, adjustReason || 'Nhập hàng');
      toast.success(`Đã nhập ${quantity} ${selectedProduct.unit} cho sản phẩm ${selectedProduct.productId}`);
      loadData();
      setShowAddStockModal(false);
      setAdjustQuantity('');
      setAdjustReason('');
      setSelectedProduct(null);
    } catch (error) {
      toast.error('Lỗi khi nhập hàng');
    }
  };

  const handleAdjustStock = () => {
    if (!selectedProduct || !adjustQuantity) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const quantity = parseInt(adjustQuantity);
    if (isNaN(quantity) || quantity < 0) {
      toast.error('Số lượng không hợp lệ');
      return;
    }

    try {
      adjustStock(selectedProduct.productId, quantity, adjustReason || 'Điều chỉnh tồn kho');
      toast.success(`Đã điều chỉnh tồn kho thành ${quantity} ${selectedProduct.unit}`);
      loadData();
      setShowAddStockModal(false);
      setAdjustQuantity('');
      setAdjustReason('');
      setSelectedProduct(null);
    } catch (error) {
      toast.error('Lỗi khi điều chỉnh tồn kho');
    }
  };

  const handleMarkAlertAsRead = (alertId: string) => {
    markAlertAsRead(alertId);
    loadData();
  };

  const filteredStocks = stocks.filter(stock => {
    // Validate stock data
    if (!stock || !stock.productId) return false;
    
    if (filter === 'low_stock') return stock.currentStock <= stock.minStock && stock.currentStock > 0;
    if (filter === 'out_of_stock') return stock.currentStock === 0;
    return true;
  });

  const lowStockCount = getLowStockProducts().length;
  const outOfStockCount = getOutOfStockProducts().length;
  const unreadAlertsCount = alerts.filter(alert => !alert.isRead).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu tồn kho...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Quản Lý Tồn Kho</h1>
                <p className="text-sm text-gray-500">
                  Theo dõi và quản lý tồn kho sản phẩm
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center space-x-2"
              >
                📊
                <span>Doanh Thu</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng Sản Phẩm</p>
                <p className="text-3xl font-bold text-gray-900">{stocks.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                📦
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đủ Hàng</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stocks.length - lowStockCount - outOfStockCount}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                ✅
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sắp Hết</p>
                <p className="text-3xl font-bold text-gray-900">{lowStockCount}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                ⚠️
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hết Hàng</p>
                <p className="text-3xl font-bold text-gray-900">{outOfStockCount}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                ❌
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('stocks')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'stocks'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                📦 Tồn Kho ({stocks.length})
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'transactions'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                📋 Giao Dịch ({transactions.length})
              </button>
              <button
                onClick={() => setActiveTab('alerts')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'alerts'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                🔔 Cảnh Báo ({unreadAlertsCount})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Stocks Tab */}
            {activeTab === 'stocks' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setFilter('all')}
                      className={`px-4 py-2 rounded-lg ${
                        filter === 'all' ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      Tất Cả
                    </button>
                    <button
                      onClick={() => setFilter('low_stock')}
                      className={`px-4 py-2 rounded-lg ${
                        filter === 'low_stock' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      Sắp Hết ({lowStockCount})
                    </button>
                    <button
                      onClick={() => setFilter('out_of_stock')}
                      className={`px-4 py-2 rounded-lg ${
                        filter === 'out_of_stock' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      Hết Hàng ({outOfStockCount})
                    </button>
                  </div>
                  <button
                    onClick={() => setShowAddStockModal(true)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                  >
                    ➕
                    <span>Nhập Hàng</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStocks.map((stock) => {
                    const status = getStockStatus(stock);
                    const statusColor = getStockStatusColor(status);
                    const statusIcon = getStockStatusIcon(status);
                    const productInfo = getProductInfo(stock.productId);
                    
                    return (
                      <div key={stock.productId} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                        {/* Product Image */}
                        {productInfo?.image && (
                          <div className="h-32 overflow-hidden">
                            <img
                              src={productInfo.image}
                              alt={productInfo.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/src/assets/img/gallery/default-food.png';
                              }}
                            />
                          </div>
                        )}
                        
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">
                                {productInfo?.name || `Sản phẩm ${stock.productId ? stock.productId.slice(0, 8) : 'Unknown'}...`}
                              </h3>
                              {productInfo ? (
                                <p className="text-sm text-gray-600 mt-1">
                                  {productInfo.restaurant} • {formatCurrency(productInfo.price)}
                                </p>
                              ) : (
                                <p className="text-sm text-gray-500 mt-1">
                                  ID: {stock.productId || 'Unknown'}
                                </p>
                              )}
                            </div>
                            <span className={`text-lg ${statusColor} ml-2`}>
                              {statusIcon}
                            </span>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Tồn kho:</span>
                              <span className={`font-semibold text-lg ${
                                status === 'out_of_stock' ? 'text-red-600' :
                                status === 'low_stock' ? 'text-yellow-600' : 'text-green-600'
                              }`}>
                                {stock.currentStock} {stock.unit}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Tối thiểu:</span>
                              <span className="text-sm">{stock.minStock} {stock.unit}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Tối đa:</span>
                              <span className="text-sm">{stock.maxStock} {stock.unit}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Cập nhật:</span>
                              <span className="text-xs text-gray-500">
                                {stock.lastUpdated ? new Date(stock.lastUpdated).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedProduct(stock);
                                setShowAddStockModal(true);
                              }}
                              className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                            >
                              ➕ Nhập
                            </button>
                            <button
                              onClick={() => {
                                setSelectedProduct(stock);
                                setShowAddStockModal(true);
                              }}
                              className="flex-1 px-3 py-2 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
                            >
                              ✏️ Điều Chỉnh
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div className="space-y-4">
                {transactions.slice(0, 50).filter(transaction => transaction && transaction.productId).map((transaction) => {
                  const productInfo = getProductInfo(transaction.productId);
                  const transactionTypeLabels = {
                    'sale': 'Bán hàng',
                    'purchase': 'Nhập hàng',
                    'adjustment': 'Điều chỉnh',
                    'return': 'Trả hàng'
                  };
                  
                  return (
                    <div key={transaction.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        {productInfo?.image && (
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={productInfo.image}
                              alt={productInfo.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/src/assets/img/gallery/default-food.png';
                              }}
                            />
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-lg">
                                {productInfo?.name || transaction.productId || 'Unknown Product'}
                              </h4>
                              {productInfo && (
                                <p className="text-sm text-gray-600 mt-1">
                                  {productInfo.restaurant} • {formatCurrency(productInfo.price)}
                                </p>
                              )}
                              <div className="flex items-center space-x-4 mt-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  transaction.type === 'sale' ? 'bg-red-100 text-red-800' :
                                  transaction.type === 'purchase' ? 'bg-green-100 text-green-800' :
                                  transaction.type === 'adjustment' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {transactionTypeLabels[transaction.type]}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {formatTime(transaction.timestamp)}
                                </span>
                              </div>
                              {transaction.reason && (
                                <p className="text-sm text-gray-600 mt-2 italic">
                                  "{transaction.reason}"
                                </p>
                              )}
                            </div>
                            
                            <div className="text-right ml-4">
                              <p className={`text-2xl font-bold ${
                                transaction.quantity > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {transaction.quantity > 0 ? '+' : ''}{transaction.quantity}
                              </p>
                              <p className="text-sm text-gray-500">
                                {productInfo ? 'sản phẩm' : 'đơn vị'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Alerts Tab */}
            {activeTab === 'alerts' && (
              <div className="space-y-4">
                {alerts.filter(alert => alert && alert.productId).map((alert) => {
                  const productInfo = getProductInfo(alert.productId);
                  
                  return (
                    <div key={alert.id} className={`rounded-lg p-4 border ${
                      alert.isRead ? 'bg-gray-50 border-gray-200' : 'bg-red-50 border-red-200'
                    }`}>
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        {productInfo?.image && (
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={productInfo.image}
                              alt={productInfo.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/src/assets/img/gallery/default-food.png';
                              }}
                            />
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <span className="text-xl">
                                  {alert.type === 'out_of_stock' ? '❌' : 
                                   alert.type === 'low_stock' ? '⚠️' : '📦'}
                                </span>
                                <div>
                                  <h4 className={`font-semibold text-lg ${
                                    alert.isRead ? 'text-gray-700' : 'text-red-700'
                                  }`}>
                                    {productInfo?.name || alert.productId || 'Unknown Product'}
                                  </h4>
                                  {productInfo && (
                                    <p className="text-sm text-gray-600">
                                      {productInfo.restaurant} • {formatCurrency(productInfo.price)}
                                    </p>
                                  )}
                                </div>
                              </div>
                              
                              <div className={`p-3 rounded-lg ${
                                alert.isRead ? 'bg-gray-100' : 'bg-red-100'
                              }`}>
                                <p className={`font-medium ${
                                  alert.isRead ? 'text-gray-700' : 'text-red-700'
                                }`}>
                                  {alert.message}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                  {formatTime(alert.timestamp)}
                                </p>
                              </div>
                            </div>
                            
                            {!alert.isRead && (
                              <button
                                onClick={() => handleMarkAlertAsRead(alert.id)}
                                className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors flex-shrink-0"
                              >
                                ✓ Đã đọc
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Stock Modal */}
      {showAddStockModal && selectedProduct && (() => {
        const productInfo = getProductInfo(selectedProduct.productId);
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {selectedProduct.currentStock === 0 ? 'Nhập Hàng' : 'Điều Chỉnh Tồn Kho'}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  {productInfo?.image && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={productInfo.image}
                        alt={productInfo.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/src/assets/img/gallery/default-food.png';
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {productInfo?.name || selectedProduct.productId || 'Unknown Product'}
                    </h4>
                    {productInfo && (
                      <p className="text-sm text-gray-600">
                        {productInfo.restaurant} • {formatCurrency(productInfo.price)}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      Tồn kho hiện tại: <span className={`font-semibold ${
                        selectedProduct.currentStock === 0 ? 'text-red-600' :
                        selectedProduct.currentStock <= selectedProduct.minStock ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {selectedProduct.currentStock} {selectedProduct.unit}
                      </span>
                    </p>
                  </div>
                </div>
              
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {selectedProduct.currentStock === 0 ? 'Số lượng nhập' : 'Số lượng mới'}
                  </label>
                  <input
                    type="number"
                    value={adjustQuantity}
                    onChange={(e) => setAdjustQuantity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Nhập số lượng"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lý do (tùy chọn)
                  </label>
                  <input
                    type="text"
                    value={adjustReason}
                    onChange={(e) => setAdjustReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Nhập lý do"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddStockModal(false);
                    setSelectedProduct(null);
                    setAdjustQuantity('');
                    setAdjustReason('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={selectedProduct.currentStock === 0 ? handleAddStock : handleAdjustStock}
                  className="flex-1 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  {selectedProduct.currentStock === 0 ? 'Nhập Hàng' : 'Điều Chỉnh'}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default StockManagementPage;
