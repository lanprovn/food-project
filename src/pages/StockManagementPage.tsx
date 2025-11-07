import React, { useState, useEffect, useMemo } from 'react';
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
} from '../utils/stockManagement';
import { useProducts } from '../hooks/useProducts';
import { useIngredients } from '../context/IngredientContext';
import StockAdjustModal from '../components/stock/StockAdjustModal';
import type { ProductStock, StockTransaction, StockAlert } from '../utils/stockManagement';
import type { IngredientStock } from '../utils/ingredientManagement';
import type { Product } from '../types/product';

const StockManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const {
    ingredients,
    alerts: ingredientAlerts,
    addStock: addIngredientStock,
    adjustStock: adjustIngredientStock,
    markAlertAsRead: markIngredientAlertAsRead,
    getStats: getIngredientStats,
    loadIngredients,
  } = useIngredients();

  // State
  const [stocks, setStocks] = useState<ProductStock[]>([]);
  const [transactions, setTransactions] = useState<StockTransaction[]>([]);
  const [alerts, setAlerts] = useState<StockAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'stocks' | 'transactions' | 'alerts' | 'ingredients'>('stocks');
  const [filter, setFilter] = useState<'all' | 'low_stock' | 'out_of_stock'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductStock | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientStock | null>(null);
  const [forceAdjustMode, setForceAdjustMode] = useState<boolean | undefined>(undefined);

  // Load data
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

  // Effects
  useEffect(() => {
    loadData();
    loadIngredients();

    const handleStockUpdate = () => {
      loadData();
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key &&
        (e.key.startsWith('stock_') ||
          e.key === 'stock_transactions' ||
          e.key === 'stock_alerts' ||
          e.key.startsWith('ingredient_') ||
          e.key === 'ingredient_transactions' ||
          e.key === 'ingredient_alerts')
      ) {
        loadData();
        loadIngredients();
      }
    };

    const autoRefreshInterval = setInterval(() => {
      loadData();
      loadIngredients();
    }, 5000);

    window.addEventListener('stockAlert', handleStockUpdate);
    window.addEventListener('ingredientAlert', handleStockUpdate);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('orderCompleted', handleStockUpdate);

    return () => {
      window.removeEventListener('stockAlert', handleStockUpdate);
      window.removeEventListener('ingredientAlert', handleStockUpdate);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('orderCompleted', handleStockUpdate);
      clearInterval(autoRefreshInterval);
    };
  }, [loadIngredients]);

  // Helper functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
    });
  };

  const getProductInfo = (productId: string): Product | null => {
    return products.find((product) => String(product.id) === productId) || null;
  };

  const getCategories = () => {
    const categories = new Set<string>();
    products.forEach((product) => {
      if (product.category) {
        categories.add(product.category);
      }
    });
    return Array.from(categories).sort();
  };

  // Handlers
  const handleAddStock = (quantity: number, reason: string, isAdjustMode: boolean) => {
    if (!selectedProduct) return;

    try {
      if (isAdjustMode) {
        adjustStock(selectedProduct.productId, quantity, reason || 'Điều chỉnh tồn kho');
        toast.success(`Đã điều chỉnh tồn kho thành ${quantity} ${selectedProduct.unit}`);
      } else {
        addStock(selectedProduct.productId, quantity, reason || 'Nhập hàng');
        toast.success(`Đã nhập ${quantity} ${selectedProduct.unit} cho sản phẩm`);
      }
      loadData();
      setSelectedProduct(null);
    } catch {
      toast.error('Lỗi khi thực hiện thao tác');
    }
  };

  const handleAddIngredientStock = (quantity: number, reason: string, isAdjustMode: boolean) => {
    if (!selectedIngredient) return;

    try {
      if (isAdjustMode) {
        adjustIngredientStock(selectedIngredient.id, quantity, reason || 'Điều chỉnh nguyên liệu');
        toast.success(`Đã điều chỉnh tồn kho thành ${quantity} ${selectedIngredient.unit}`);
      } else {
        addIngredientStock(selectedIngredient.id, quantity, reason || 'Nhập nguyên liệu');
        toast.success(`Đã nhập ${quantity} ${selectedIngredient.unit} cho nguyên liệu`);
      }
      loadIngredients();
      setSelectedIngredient(null);
    } catch {
      toast.error('Lỗi khi thực hiện thao tác');
    }
  };

  const handleOpenModal = (product?: ProductStock, ingredient?: IngredientStock, adjustMode?: boolean) => {
    if (product) {
      setSelectedProduct(product);
      setSelectedIngredient(null);
    } else if (ingredient) {
      setSelectedIngredient(ingredient);
      setSelectedProduct(null);
    }
    setForceAdjustMode(adjustMode);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setSelectedIngredient(null);
    setForceAdjustMode(undefined);
  };

  const handleMarkAlertAsRead = (alertId: string) => {
    markAlertAsRead(alertId);
    loadData();
  };

  const handleMarkIngredientAlertAsRead = (alertId: string) => {
    markIngredientAlertAsRead(alertId);
    loadIngredients();
  };

  // Computed values
  const lowStockCount = getLowStockProducts().length;
  const outOfStockCount = getOutOfStockProducts().length;
  const unreadAlertsCount = alerts.filter((alert) => !alert.isRead).length;
  const ingredientStats = getIngredientStats();
  const unreadIngredientAlertsCount = ingredientAlerts.filter((alert) => !alert.isRead).length;

  // Filtered data
  const filteredStocks = useMemo(() => {
    return stocks.filter((stock) => {
      if (!stock || !stock.productId) return false;

      if (filter === 'low_stock' && !(stock.currentStock <= stock.minStock && stock.currentStock > 0))
        return false;
      if (filter === 'out_of_stock' && stock.currentStock !== 0) return false;

      if (categoryFilter !== 'all') {
        const productInfo = getProductInfo(stock.productId);
        if (!productInfo || productInfo.category !== categoryFilter) return false;
      }

      if (searchQuery.trim()) {
        const productInfo = getProductInfo(stock.productId);
        const searchLower = searchQuery.toLowerCase();
        const matchesName = productInfo?.name.toLowerCase().includes(searchLower);
        const matchesId = stock.productId.toLowerCase().includes(searchLower);
        if (!matchesName && !matchesId) return false;
      }

      return true;
    });
  }, [stocks, filter, categoryFilter, searchQuery, products]);

  const filteredIngredients = useMemo(() => {
    return ingredients.filter((ingredient) => {
      if (!ingredient || !ingredient.id) return false;

      if (filter === 'low_stock' && !(ingredient.currentStock <= ingredient.minStock && ingredient.currentStock > 0))
        return false;
      if (filter === 'out_of_stock' && ingredient.currentStock !== 0) return false;

      if (searchQuery.trim()) {
        const searchLower = searchQuery.toLowerCase();
        const matchesName = ingredient.name.toLowerCase().includes(searchLower);
        const matchesId = ingredient.id.toLowerCase().includes(searchLower);
        if (!matchesName && !matchesId) return false;
      }

      return true;
    });
  }, [ingredients, filter, searchQuery]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      if (!transaction || !transaction.productId) return false;

      if (searchQuery.trim()) {
        const productInfo = getProductInfo(transaction.productId);
        const searchLower = searchQuery.toLowerCase();
        const matchesName = productInfo?.name.toLowerCase().includes(searchLower);
        const matchesId = transaction.productId.toLowerCase().includes(searchLower);
        if (!matchesName && !matchesId) return false;
      }

      return true;
    });
  }, [transactions, searchQuery, products]);

  // Loading state
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
                <p className="text-sm text-gray-500">Theo dõi và quản lý tồn kho sản phẩm</p>
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
              <div className="p-3 bg-blue-100 rounded-full">📦</div>
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
              <div className="p-3 bg-green-100 rounded-full">✅</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sắp Hết</p>
                <p className="text-3xl font-bold text-gray-900">{lowStockCount}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">⚠️</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hết Hàng</p>
                <p className="text-3xl font-bold text-gray-900">{outOfStockCount}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">❌</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('stocks')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'stocks'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                📦 Tồn Kho ({stocks.length})
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'transactions'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                📋 Giao Dịch ({transactions.length})
              </button>
              <button
                onClick={() => setActiveTab('alerts')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'alerts'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                🔔 Cảnh Báo ({unreadAlertsCount + unreadIngredientAlertsCount})
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'ingredients'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                🥛 Nguyên Liệu ({ingredientStats.total})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Stocks Tab */}
            {activeTab === 'stocks' && (
              <div>
                {/* Search and Filters */}
                <div className="mb-6">
                  <div className="relative mb-4">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm kiếm sản phẩm theo tên hoặc ID..."
                      className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                    <svg
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          filter === 'all'
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Tất Cả
                      </button>
                      <button
                        onClick={() => setFilter('low_stock')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          filter === 'low_stock'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Sắp Hết ({lowStockCount})
                      </button>
                      <button
                        onClick={() => setFilter('out_of_stock')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          filter === 'out_of_stock'
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Hết Hàng ({outOfStockCount})
                      </button>

                      {getCategories().length > 0 && (
                        <select
                          value={categoryFilter}
                          onChange={(e) => setCategoryFilter(e.target.value)}
                          className="px-4 py-2 rounded-lg border-2 border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="all">Tất cả danh mục</option>
                          {getCategories().map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                    <button
                      onClick={() => handleOpenModal()}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                    >
                      ➕
                      <span>Nhập Hàng</span>
                    </button>
                  </div>
                </div>

                {/* Empty State */}
                {filteredStocks.length === 0 && (
                  <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      {searchQuery || categoryFilter !== 'all' || filter !== 'all'
                        ? 'Không tìm thấy sản phẩm'
                        : 'Chưa có sản phẩm nào'}
                    </h3>
                    <p className="text-gray-500 mb-4">
                      {searchQuery || categoryFilter !== 'all' || filter !== 'all'
                        ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm'
                        : 'Bắt đầu bằng cách thêm sản phẩm vào hệ thống'}
                    </p>
                    {(searchQuery || categoryFilter !== 'all' || filter !== 'all') && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setCategoryFilter('all');
                          setFilter('all');
                        }}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                      >
                        Xóa bộ lọc
                      </button>
                    )}
                  </div>
                )}

                {/* Stock Cards */}
                {filteredStocks.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStocks.map((stock) => {
                      const status = getStockStatus(stock);
                      const statusColor = getStockStatusColor(status);
                      const statusIcon = getStockStatusIcon(status);
                      const productInfo = getProductInfo(stock.productId);

                      return (
                        <div
                          key={stock.productId}
                          className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                        >
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
                                  {productInfo?.name ||
                                    `Sản phẩm ${stock.productId ? stock.productId.slice(0, 8) : 'Unknown'}...`}
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
                              <span className={`text-lg ${statusColor} ml-2`}>{statusIcon}</span>
                            </div>

                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Tồn kho:</span>
                                <span
                                  className={`font-semibold text-lg ${
                                    status === 'out_of_stock'
                                      ? 'text-red-600'
                                      : status === 'low_stock'
                                        ? 'text-yellow-600'
                                        : 'text-green-600'
                                  }`}
                                >
                                  {stock.currentStock} {stock.unit}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Tối thiểu:</span>
                                <span className="text-sm">
                                  {stock.minStock} {stock.unit}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Tối đa:</span>
                                <span className="text-sm">
                                  {stock.maxStock} {stock.unit}
                                </span>
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleOpenModal(stock)}
                                className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                              >
                                ➕ Nhập
                              </button>
                              <button
                                onClick={() => handleOpenModal(stock, undefined, true)}
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
                )}
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div>
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm kiếm giao dịch theo tên sản phẩm hoặc ID..."
                      className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                    <svg
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {filteredTransactions.length === 0 && (
                  <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
                    <div className="text-6xl mb-4">📋</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      {searchQuery ? 'Không tìm thấy giao dịch' : 'Chưa có giao dịch nào'}
                    </h3>
                    <p className="text-gray-500">
                      {searchQuery
                        ? 'Thử thay đổi từ khóa tìm kiếm'
                        : 'Các giao dịch sẽ xuất hiện ở đây khi có hoạt động tồn kho'}
                    </p>
                  </div>
                )}

                {filteredTransactions.length > 0 && (
                  <div className="space-y-4">
                    {filteredTransactions.slice(0, 50).map((transaction) => {
                      const productInfo = getProductInfo(transaction.productId);
                      const transactionTypeLabels = {
                        sale: 'Bán hàng',
                        purchase: 'Nhập hàng',
                        adjustment: 'Điều chỉnh',
                        return: 'Trả hàng',
                      };

                      return (
                        <div
                          key={transaction.id}
                          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start space-x-4">
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
                                    <span
                                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        transaction.type === 'sale'
                                          ? 'bg-red-100 text-red-800'
                                          : transaction.type === 'purchase'
                                            ? 'bg-green-100 text-green-800'
                                            : transaction.type === 'adjustment'
                                              ? 'bg-blue-100 text-blue-800'
                                              : 'bg-yellow-100 text-yellow-800'
                                      }`}
                                    >
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
                                  <p
                                    className={`text-2xl font-bold ${
                                      transaction.quantity > 0 ? 'text-green-600' : 'text-red-600'
                                    }`}
                                  >
                                    {transaction.quantity > 0 ? '+' : ''}
                                    {transaction.quantity}
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
              </div>
            )}

            {/* Alerts Tab */}
            {activeTab === 'alerts' && (
              <div>
                {alerts.filter((alert) => alert && alert.productId).length === 0 &&
                  ingredientAlerts.filter((alert) => alert && alert.ingredientId).length === 0 && (
                    <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
                      <div className="text-6xl mb-4">🔔</div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        Không có cảnh báo nào
                      </h3>
                      <p className="text-gray-500">Tất cả sản phẩm và nguyên liệu đều đủ hàng!</p>
                    </div>
                  )}

                <div className="space-y-4">
                  {/* Product Alerts */}
                  {alerts.filter((alert) => alert && alert.productId).length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        📦 Cảnh báo sản phẩm
                      </h3>
                      {alerts
                        .filter((alert) => alert && alert.productId)
                        .map((alert) => {
                          const productInfo = getProductInfo(alert.productId);

                          return (
                            <div
                              key={alert.id}
                              className={`rounded-lg p-4 border mb-4 ${
                                alert.isRead
                                  ? 'bg-gray-50 border-gray-200'
                                  : 'bg-red-50 border-red-200'
                              }`}
                            >
                              <div className="flex items-start space-x-4">
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
                                          {alert.type === 'out_of_stock'
                                            ? '❌'
                                            : alert.type === 'low_stock'
                                              ? '⚠️'
                                              : '📦'}
                                        </span>
                                        <div>
                                          <h4
                                            className={`font-semibold text-lg ${
                                              alert.isRead ? 'text-gray-700' : 'text-red-700'
                                            }`}
                                          >
                                            {productInfo?.name || alert.productId || 'Unknown Product'}
                                          </h4>
                                          {productInfo && (
                                            <p className="text-sm text-gray-600">
                                              {productInfo.restaurant} •{' '}
                                              {formatCurrency(productInfo.price)}
                                            </p>
                                          )}
                                        </div>
                                      </div>

                                      <div
                                        className={`p-3 rounded-lg ${
                                          alert.isRead ? 'bg-gray-100' : 'bg-red-100'
                                        }`}
                                      >
                                        <p
                                          className={`font-medium ${
                                            alert.isRead ? 'text-gray-700' : 'text-red-700'
                                          }`}
                                        >
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

                  {/* Ingredient Alerts */}
                  {ingredientAlerts.filter((alert) => alert && alert.ingredientId).length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        🥛 Cảnh báo nguyên liệu
                      </h3>
                      {ingredientAlerts
                        .filter((alert) => alert && alert.ingredientId)
                        .map((alert) => {
                          const ingredient = ingredients.find((ing) => ing.id === alert.ingredientId);

                          return (
                            <div
                              key={alert.id}
                              className={`rounded-lg p-4 border mb-4 ${
                                alert.isRead
                                  ? 'bg-gray-50 border-gray-200'
                                  : 'bg-orange-50 border-orange-200'
                              }`}
                            >
                              <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                                  <span className="text-xl">🥛</span>
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-3 mb-2">
                                        <span className="text-xl">
                                          {alert.type === 'out_of_stock'
                                            ? '❌'
                                            : alert.type === 'low_stock'
                                              ? '⚠️'
                                              : '📦'}
                                        </span>
                                        <div>
                                          <h4
                                            className={`font-semibold text-lg ${
                                              alert.isRead ? 'text-gray-700' : 'text-orange-700'
                                            }`}
                                          >
                                            {ingredient?.name || alert.ingredientId || 'Unknown Ingredient'}
                                          </h4>
                                          {ingredient && (
                                            <p className="text-sm text-gray-600">
                                              Đơn vị: {ingredient.unit}
                                            </p>
                                          )}
                                        </div>
                                      </div>

                                      <div
                                        className={`p-3 rounded-lg ${
                                          alert.isRead ? 'bg-gray-100' : 'bg-orange-100'
                                        }`}
                                      >
                                        <p
                                          className={`font-medium ${
                                            alert.isRead ? 'text-gray-700' : 'text-orange-700'
                                          }`}
                                        >
                                          {alert.message}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                          {formatTime(alert.timestamp)}
                                        </p>
                                      </div>
                                    </div>

                                    {!alert.isRead && (
                                      <button
                                        onClick={() => handleMarkIngredientAlertAsRead(alert.id)}
                                        className="px-4 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition-colors flex-shrink-0"
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
            )}

            {/* Ingredients Tab */}
            {activeTab === 'ingredients' && (
              <div>
                <div className="mb-6">
                  <div className="relative mb-4">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm kiếm nguyên liệu theo tên hoặc ID..."
                      className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                    <svg
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setFilter('all')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        filter === 'all'
                          ? 'bg-indigo-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Tất Cả
                    </button>
                    <button
                      onClick={() => setFilter('low_stock')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        filter === 'low_stock'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Sắp Hết ({ingredientStats.lowStock})
                    </button>
                    <button
                      onClick={() => setFilter('out_of_stock')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        filter === 'out_of_stock'
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Hết Hàng ({ingredientStats.outOfStock})
                    </button>
                  </div>
                </div>

                {filteredIngredients.length === 0 && (
                  <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
                    <div className="text-6xl mb-4">🥛</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      {searchQuery || filter !== 'all'
                        ? 'Không tìm thấy nguyên liệu'
                        : 'Chưa có nguyên liệu nào'}
                    </h3>
                    <p className="text-gray-500 mb-4">
                      {searchQuery || filter !== 'all'
                        ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm'
                        : 'Bắt đầu bằng cách thêm nguyên liệu vào hệ thống'}
                    </p>
                    {(searchQuery || filter !== 'all') && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setFilter('all');
                        }}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                      >
                        Xóa bộ lọc
                      </button>
                    )}
                  </div>
                )}

                {filteredIngredients.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredIngredients.map((ingredient) => {
                      const status =
                        ingredient.currentStock === 0
                          ? 'out_of_stock'
                          : ingredient.currentStock <= ingredient.minStock
                            ? 'low_stock'
                            : 'in_stock';
                      const statusColor =
                        status === 'out_of_stock'
                          ? 'text-red-600'
                          : status === 'low_stock'
                            ? 'text-yellow-600'
                            : 'text-green-600';
                      const statusIcon =
                        status === 'out_of_stock' ? '❌' : status === 'low_stock' ? '⚠️' : '✅';

                      return (
                        <div
                          key={ingredient.id}
                          className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                        >
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">
                                  {ingredient.name}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  Đơn vị: {ingredient.unit}
                                </p>
                              </div>
                              <span className={`text-lg ${statusColor} ml-2`}>{statusIcon}</span>
                            </div>

                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Tồn kho:</span>
                                <span className={`font-semibold text-lg ${statusColor}`}>
                                  {ingredient.currentStock} {ingredient.unit}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Tối thiểu:</span>
                                <span className="text-sm">
                                  {ingredient.minStock} {ingredient.unit}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Tối đa:</span>
                                <span className="text-sm">
                                  {ingredient.maxStock} {ingredient.unit}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Dùng trong:</span>
                                <span className="text-sm">{ingredient.usedIn.length} sản phẩm</span>
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleOpenModal(undefined, ingredient)}
                                className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                              >
                                ➕ Nhập
                              </button>
                              <button
                                onClick={() => handleOpenModal(undefined, ingredient, true)}
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
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stock Adjust Modal */}
      <StockAdjustModal
        isOpen={showModal}
        product={selectedProduct}
        ingredient={selectedIngredient}
        productInfo={selectedProduct ? getProductInfo(selectedProduct.productId) : null}
        forceAdjustMode={forceAdjustMode}
        onClose={handleCloseModal}
        onConfirm={(quantity, reason, isAdjustMode) => {
          if (selectedProduct) {
            handleAddStock(quantity, reason, isAdjustMode);
          } else if (selectedIngredient) {
            handleAddIngredientStock(quantity, reason, isAdjustMode);
          }
        }}
      />
    </div>
  );
};

export default StockManagementPage;
