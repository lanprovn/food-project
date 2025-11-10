import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useProducts } from '../../hooks/useProducts';
import { useIngredients } from '../../context/IngredientContext';
import StockAdjustModal from '../../components/features/stock/StockAdjustModal';
import { StockManagementHeader } from './components/StockManagementHeader';
import { StatsCards } from './components/StatsCards';
import { StockTabs } from './components/StockTabs';
import { StocksTab } from './components/StocksTab';
import { TransactionsTab } from './components/TransactionsTab';
import { AlertsTab } from './components/AlertsTab';
import { IngredientsTab } from './components/IngredientsTab';
import { useStockManagement } from './hooks/useStockManagement';
import { useStockModal } from './hooks/useStockModal';
import { useStockFilters } from './hooks/useStockFilters';
import { markAlertAsRead } from '../../utils/stockManagement';

const StockManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const {
    ingredients,
    alerts: ingredientAlerts,
    markAlertAsRead: markIngredientAlertAsRead,
    getStats: getIngredientStats,
    loadIngredients,
  } = useIngredients();

  const {
    stocks,
    transactions,
    alerts,
    isLoading,
    activeTab,
    setActiveTab,
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
    ingredientStats,
    lowStockCount,
    outOfStockCount,
    unreadAlertsCount,
    unreadIngredientAlertsCount,
    reloadData,
    reloadIngredients,
  } = useStockManagement();

  const {
    filteredStocks,
    filteredIngredients,
    filteredTransactions,
    getCategories,
    getProductInfo,
  } = useStockFilters(stocks, transactions, ingredients, filter, categoryFilter, searchQuery);

  const {
    showModal,
    selectedProduct,
    selectedIngredient,
    forceAdjustMode,
    handleOpenModal,
    handleCloseModal,
    handleConfirm,
  } = useStockModal(reloadData, reloadIngredients);

  const handleMarkAlertAsRead = (alertId: string) => {
    try {
      markAlertAsRead(alertId);
      reloadData();
    } catch (error) {
      console.error('Error marking alert as read:', error);
      toast.error('Không thể đánh dấu cảnh báo đã đọc. Vui lòng thử lại.');
    }
  };

  const handleMarkIngredientAlertAsRead = (alertId: string) => {
    markIngredientAlertAsRead(alertId);
    reloadIngredients();
  };

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
      <StockManagementHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards
          totalProducts={stocks.length}
          inStock={stocks.length - lowStockCount - outOfStockCount}
          lowStock={lowStockCount}
          outOfStock={outOfStockCount}
        />

        <StockTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          stocksCount={stocks.length}
          transactionsCount={transactions.length}
          alertsCount={unreadAlertsCount + unreadIngredientAlertsCount}
          ingredientsCount={ingredientStats.total}
        />

        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="p-6">
            {activeTab === 'stocks' && (
              <StocksTab
                filteredStocks={filteredStocks}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filter={filter}
                setFilter={setFilter}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                lowStockCount={lowStockCount}
                outOfStockCount={outOfStockCount}
                getCategories={getCategories}
                getProductInfo={getProductInfo}
                handleOpenModal={handleOpenModal}
              />
            )}

            {activeTab === 'transactions' && (
              <TransactionsTab
                filteredTransactions={filteredTransactions}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                getProductInfo={getProductInfo}
              />
            )}

            {activeTab === 'alerts' && (
              <AlertsTab
                alerts={alerts}
                ingredientAlerts={ingredientAlerts}
                ingredients={ingredients}
                getProductInfo={getProductInfo}
                handleMarkAlertAsRead={handleMarkAlertAsRead}
                handleMarkIngredientAlertAsRead={handleMarkIngredientAlertAsRead}
              />
            )}

            {activeTab === 'ingredients' && (
              <IngredientsTab
                filteredIngredients={filteredIngredients}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filter={filter}
                setFilter={setFilter}
                ingredientStats={ingredientStats}
                handleOpenModal={handleOpenModal}
              />
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
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default StockManagementPage;
