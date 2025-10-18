import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  IngredientStock,
  IngredientTransaction,
  IngredientAlert,
  getAllIngredientStocks,
  getIngredientTransactions,
  getIngredientAlerts,
  addIngredientStock,
  adjustIngredientStock,
  deductIngredientStock,
  checkIngredientAlerts,
  getLowStockIngredients,
  getOutOfStockIngredients,
  markIngredientAlertAsRead,
  initializeIngredientStock,
  saveIngredientStock
} from '../utils/ingredientManagement';

// Import sample data
import ingredientsData from '../data/ingredients.json';

interface IngredientContextType {
  // State
  ingredients: IngredientStock[];
  transactions: IngredientTransaction[];
  alerts: IngredientAlert[];
  isLoading: boolean;
  
  // Actions
  loadIngredients: () => void;
  addIngredient: (ingredient: Omit<IngredientStock, 'id' | 'lastUpdated'>) => void;
  updateIngredient: (id: string, updates: Partial<IngredientStock>) => void;
  deleteIngredient: (id: string) => void;
  
  // Stock operations
  addStock: (ingredientId: string, quantity: number, reason?: string) => void;
  deductStock: (ingredientId: string, quantity: number) => void;
  adjustStock: (ingredientId: string, newQuantity: number, reason?: string) => void;
  
  // Alerts
  markAlertAsRead: (alertId: string) => void;
  getLowStockIngredients: () => IngredientStock[];
  getOutOfStockIngredients: () => IngredientStock[];
  
  // Statistics
  getStats: () => {
    total: number;
    lowStock: number;
    outOfStock: number;
    unreadAlerts: number;
  };
}

const IngredientContext = createContext<IngredientContextType | undefined>(undefined);

export const useIngredients = () => {
  const context = useContext(IngredientContext);
  if (context === undefined) {
    throw new Error('useIngredients must be used within an IngredientProvider');
  }
  return context;
};

interface IngredientProviderProps {
  children: ReactNode;
}

export const IngredientProvider: React.FC<IngredientProviderProps> = ({ children }) => {
  const [ingredients, setIngredients] = useState<IngredientStock[]>([]);
  const [transactions, setTransactions] = useState<IngredientTransaction[]>([]);
  const [alerts, setAlerts] = useState<IngredientAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize ingredients from sample data
  const initializeIngredients = () => {
    try {
      ingredientsData.ingredients.forEach((ingredientData) => {
        const existingIngredient = localStorage.getItem(`ingredient_${ingredientData.id}`);
        if (!existingIngredient) {
          const ingredient: IngredientStock = {
            id: ingredientData.id,
            name: ingredientData.name,
            unit: ingredientData.unit,
            currentStock: ingredientData.currentStock,
            minStock: ingredientData.minStock,
            maxStock: ingredientData.maxStock,
            usedIn: ingredientData.usedIn,
            lastUpdated: ingredientData.lastUpdated,
            isActive: ingredientData.isActive
          };
          saveIngredientStock(ingredient);
        }
      });
    } catch (error) {
      console.error('Error initializing ingredients:', error);
    }
  };

  // Load all data
  const loadIngredients = () => {
    try {
      setIsLoading(true);
      
      // Initialize ingredients if not exists
      initializeIngredients();
      
      setIngredients(getAllIngredientStocks());
      setTransactions(getIngredientTransactions());
      setAlerts(getIngredientAlerts());
    } catch (error) {
      console.error('Error loading ingredients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add new ingredient
  const addIngredient = (ingredientData: Omit<IngredientStock, 'id' | 'lastUpdated'>) => {
    try {
      const newIngredient = initializeIngredientStock(
        `ingredient_${Date.now()}`,
        ingredientData.name,
        ingredientData.unit,
        ingredientData.currentStock
      );
      
      // Update with provided data
      Object.assign(newIngredient, {
        minStock: ingredientData.minStock,
        maxStock: ingredientData.maxStock,
        usedIn: ingredientData.usedIn,
        isActive: ingredientData.isActive
      });
      
      saveIngredientStock(newIngredient);
      loadIngredients();
    } catch (error) {
      console.error('Error adding ingredient:', error);
    }
  };

  // Update ingredient
  const updateIngredient = (id: string, updates: Partial<IngredientStock>) => {
    try {
      const ingredient = ingredients.find(ing => ing.id === id);
      if (ingredient) {
        const updatedIngredient = { ...ingredient, ...updates, lastUpdated: Date.now() };
        saveIngredientStock(updatedIngredient);
        loadIngredients();
      }
    } catch (error) {
      console.error('Error updating ingredient:', error);
    }
  };

  // Delete ingredient
  const deleteIngredient = (id: string) => {
    try {
      localStorage.removeItem(`ingredient_${id}`);
      loadIngredients();
    } catch (error) {
      console.error('Error deleting ingredient:', error);
    }
  };

  // Add stock
  const addStock = (ingredientId: string, quantity: number, reason?: string) => {
    try {
      addIngredientStock(ingredientId, quantity, reason);
      loadIngredients();
    } catch (error) {
      console.error('Error adding stock:', error);
    }
  };

  // Deduct stock
  const deductStock = (ingredientId: string, quantity: number) => {
    try {
      deductIngredientStock(ingredientId, quantity);
      loadIngredients();
    } catch (error) {
      console.error('Error deducting stock:', error);
    }
  };

  // Adjust stock
  const adjustStock = (ingredientId: string, newQuantity: number, reason?: string) => {
    try {
      adjustIngredientStock(ingredientId, newQuantity, reason);
      loadIngredients();
    } catch (error) {
      console.error('Error adjusting stock:', error);
    }
  };

  // Mark alert as read
  const markAlertAsRead = (alertId: string) => {
    try {
      markIngredientAlertAsRead(alertId);
      loadIngredients();
    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
  };

  // Get statistics
  const getStats = () => {
    const lowStock = getLowStockIngredients().length;
    const outOfStock = getOutOfStockIngredients().length;
    const unreadAlerts = alerts.filter(alert => !alert.isRead).length;
    
    return {
      total: ingredients.length,
      lowStock,
      outOfStock,
      unreadAlerts
    };
  };

  // Load data on mount
  useEffect(() => {
    loadIngredients();
    
    // Listen for ingredient updates
    const handleIngredientUpdate = () => {
      loadIngredients();
    };
    
    window.addEventListener('ingredientAlert', handleIngredientUpdate);
    
    return () => {
      window.removeEventListener('ingredientAlert', handleIngredientUpdate);
    };
  }, []);

  const value: IngredientContextType = {
    ingredients,
    transactions,
    alerts,
    isLoading,
    loadIngredients,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    addStock,
    deductStock,
    adjustStock,
    markAlertAsRead,
    getLowStockIngredients,
    getOutOfStockIngredients,
    getStats
  };

  return (
    <IngredientContext.Provider value={value}>
      {children}
    </IngredientContext.Provider>
  );
};
