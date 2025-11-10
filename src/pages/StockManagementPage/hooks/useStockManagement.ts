// Stock Management hook
import { useState, useEffect } from 'react';
import { useIngredients } from '../../../context/IngredientContext';
import { getAllProductStocks, getStockTransactions, getStockAlerts } from '../../../utils/stockManagement';
import type { ProductStock, StockTransaction, StockAlert } from '../../../utils/stockManagement';
import type { StockTab, StockFilter } from '../types';

export const useStockManagement = () => {
  const {
    ingredients,
    alerts: ingredientAlerts,
    getStats: getIngredientStats,
    loadIngredients,
  } = useIngredients();

  // State
  const [stocks, setStocks] = useState<ProductStock[]>([]);
  const [transactions, setTransactions] = useState<StockTransaction[]>([]);
  const [alerts, setAlerts] = useState<StockAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<StockTab>('stocks');
  const [filter, setFilter] = useState<StockFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load data from localStorage
  const loadData = () => {
    setIsLoading(true);
    try {
      const loadedStocks = getAllProductStocks();
      const loadedTransactions = getStockTransactions();
      const loadedAlerts = getStockAlerts();

      setStocks(loadedStocks);
      setTransactions(loadedTransactions);
      setAlerts(loadedAlerts);
    } catch (error) {
      console.error('Error loading stock data:', error);
      setStocks([]);
      setTransactions([]);
      setAlerts([]);
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

    // Removed localStorage storage event listener - using API only

    const autoRefreshInterval = setInterval(() => {
      loadData();
      loadIngredients();
    }, 5000);

    window.addEventListener('orderCompleted', handleStockUpdate);

    return () => {
      window.removeEventListener('orderCompleted', handleStockUpdate);
      clearInterval(autoRefreshInterval);
    };
  }, [loadIngredients]);

  // Computed values
  const lowStockCount = stocks.filter(s => s.currentStock <= s.minStock && s.currentStock > 0).length;
  const outOfStockCount = stocks.filter(s => s.currentStock === 0).length;
  const unreadAlertsCount = alerts.filter((alert) => !alert.isRead).length;
  const ingredientStats = getIngredientStats();
  const unreadIngredientAlertsCount = ingredientAlerts.filter((alert) => !alert.isRead).length;

  return {
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
    ingredients,
    ingredientAlerts,
    ingredientStats,
    lowStockCount,
    outOfStockCount,
    unreadAlertsCount,
    unreadIngredientAlertsCount,
    reloadData: loadData,
    reloadIngredients: loadIngredients,
  };
};

