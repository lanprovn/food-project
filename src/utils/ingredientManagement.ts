// Ingredient management types and interfaces
export interface IngredientStock {
  id: string;
  name: string;
  unit: string;           // ví dụ: ml, g, cái, bịch...
  currentStock: number;
  minStock: number;
  maxStock: number;
  usedIn: string[];       // danh sách productId sử dụng nguyên liệu này
  lastUpdated: number;
  isActive: boolean;
}

export interface Recipe {
  productId: string;
  ingredients: { ingredientId: string; quantity: number }[];
}

export interface IngredientTransaction {
  id: string;
  ingredientId: string;
  type: 'sale' | 'purchase' | 'adjustment' | 'return';
  quantity: number;
  reason?: string;
  timestamp: number;
  userId?: string;
}

export interface IngredientAlert {
  id: string;
  ingredientId: string;
  type: 'low_stock' | 'out_of_stock' | 'overstock';
  message: string;
  timestamp: number;
  isRead: boolean;
}

export const INGREDIENT_UNITS = [
  'ml', 'g', 'kg', 'lít', 'cái', 'bịch', 'gói', 'hộp', 'chai', 'lon', 'túi', 'miếng', 'phần', 'muỗng', 'thìa'
] as const;

export type IngredientUnit = typeof INGREDIENT_UNITS[number];

// Default ingredient settings
export const DEFAULT_INGREDIENT_SETTINGS = {
  minStock: 10,
  maxStock: 500,
  unit: 'ml' as IngredientUnit,
  isActive: true
};

// Initialize ingredient stock
export const initializeIngredientStock = (id: string, name: string, unit: string, initialStock: number = 100): IngredientStock => {
  return {
    id,
    name,
    unit,
    currentStock: initialStock,
    minStock: DEFAULT_INGREDIENT_SETTINGS.minStock,
    maxStock: DEFAULT_INGREDIENT_SETTINGS.maxStock,
    usedIn: [],
    lastUpdated: Date.now(),
    isActive: DEFAULT_INGREDIENT_SETTINGS.isActive
  };
};

// Deduct ingredient stock when selling products
export const deductIngredientStock = (ingredientId: string, quantity: number): void => {
  try {
    const ingredientData = getIngredientStock(ingredientId);
    if (ingredientData) {
      ingredientData.currentStock = Math.max(0, ingredientData.currentStock - quantity);
      ingredientData.lastUpdated = Date.now();
      saveIngredientStock(ingredientData);
      
      // Create transaction record
      createIngredientTransaction({
        ingredientId,
        type: 'sale',
        quantity: -quantity,
        timestamp: Date.now()
      });
      
      // Check for alerts
      checkIngredientAlerts(ingredientData);
    }
  } catch (error) {
    console.error('Error deducting ingredient stock:', error);
  }
};

// Add ingredient stock when purchasing
export const addIngredientStock = (ingredientId: string, quantity: number, reason?: string): void => {
  try {
    const ingredientData = getIngredientStock(ingredientId);
    if (ingredientData) {
      ingredientData.currentStock += quantity;
      ingredientData.lastUpdated = Date.now();
      saveIngredientStock(ingredientData);
      
      // Create transaction record
      createIngredientTransaction({
        ingredientId,
        type: 'purchase',
        quantity,
        reason,
        timestamp: Date.now()
      });
      
      // Check for alerts
      checkIngredientAlerts(ingredientData);
    }
  } catch (error) {
    console.error('Error adding ingredient stock:', error);
  }
};

// Adjust ingredient stock manually
export const adjustIngredientStock = (ingredientId: string, newQuantity: number, reason?: string): void => {
  try {
    const ingredientData = getIngredientStock(ingredientId);
    if (ingredientData) {
      const oldQuantity = ingredientData.currentStock;
      ingredientData.currentStock = newQuantity;
      ingredientData.lastUpdated = Date.now();
      saveIngredientStock(ingredientData);
      
      // Create transaction record
      createIngredientTransaction({
        ingredientId,
        type: 'adjustment',
        quantity: newQuantity - oldQuantity,
        reason,
        timestamp: Date.now()
      });
      
      // Check for alerts
      checkIngredientAlerts(ingredientData);
    }
  } catch (error) {
    console.error('Error adjusting ingredient stock:', error);
  }
};

// Get ingredient stock
export const getIngredientStock = (ingredientId: string): IngredientStock | null => {
  try {
    const storedData = localStorage.getItem(`ingredient_${ingredientId}`);
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null;
  } catch (error) {
    console.error('Error getting ingredient stock:', error);
    return null;
  }
};

// Save ingredient stock
export const saveIngredientStock = (ingredient: IngredientStock): void => {
  try {
    localStorage.setItem(`ingredient_${ingredient.id}`, JSON.stringify(ingredient));
  } catch (error) {
    console.error('Error saving ingredient stock:', error);
  }
};

// Get all ingredient stocks
export const getAllIngredientStocks = (): IngredientStock[] => {
  try {
    const ingredients: IngredientStock[] = [];
    const keys = Object.keys(localStorage);
    
    keys.forEach(key => {
      if (key.startsWith('ingredient_')) {
        const data = localStorage.getItem(key);
        if (data) {
          ingredients.push(JSON.parse(data));
        }
      }
    });
    
    return ingredients.sort((a, b) => b.lastUpdated - a.lastUpdated);
  } catch (error) {
    console.error('Error getting all ingredient stocks:', error);
    return [];
  }
};

// Create ingredient transaction
export const createIngredientTransaction = (transaction: Omit<IngredientTransaction, 'id'>): void => {
  try {
    const newTransaction: IngredientTransaction = {
      ...transaction,
      id: `ING-TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    
    const transactions = getIngredientTransactions();
    transactions.unshift(newTransaction);
    
    // Keep only last 1000 transactions
    if (transactions.length > 1000) {
      transactions.splice(1000);
    }
    
    localStorage.setItem('ingredient_transactions', JSON.stringify(transactions));
  } catch (error) {
    console.error('Error creating ingredient transaction:', error);
  }
};

// Get ingredient transactions
export const getIngredientTransactions = (): IngredientTransaction[] => {
  try {
    const storedData = localStorage.getItem('ingredient_transactions');
    if (storedData) {
      return JSON.parse(storedData);
    }
    return [];
  } catch (error) {
    console.error('Error getting ingredient transactions:', error);
    return [];
  }
};

// Check ingredient alerts
export const checkIngredientAlerts = (ingredient: IngredientStock): void => {
  try {
    const alerts: IngredientAlert[] = getIngredientAlerts();
    
    // Remove existing alerts for this ingredient
    const filteredAlerts = alerts.filter(alert => alert.ingredientId !== ingredient.id);
    
    // Check for new alerts
    if (ingredient.currentStock === 0) {
      filteredAlerts.push({
        id: `ING-ALERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ingredientId: ingredient.id,
        type: 'out_of_stock',
        message: `Nguyên liệu ${ingredient.name} đã hết hàng`,
        timestamp: Date.now(),
        isRead: false
      });
    } else if (ingredient.currentStock <= ingredient.minStock) {
      filteredAlerts.push({
        id: `ING-ALERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ingredientId: ingredient.id,
        type: 'low_stock',
        message: `Nguyên liệu ${ingredient.name} sắp hết hàng (còn ${ingredient.currentStock} ${ingredient.unit})`,
        timestamp: Date.now(),
        isRead: false
      });
    }
    
    // Keep only last 100 alerts
    if (filteredAlerts.length > 100) {
      filteredAlerts.splice(100);
    }
    
    localStorage.setItem('ingredient_alerts', JSON.stringify(filteredAlerts));
    
    // Dispatch alert event
    window.dispatchEvent(new CustomEvent('ingredientAlert', {
      detail: { ingredient, alerts: filteredAlerts }
    }));
  } catch (error) {
    console.error('Error checking ingredient alerts:', error);
  }
};

// Get ingredient alerts
export const getIngredientAlerts = (): IngredientAlert[] => {
  try {
    const storedData = localStorage.getItem('ingredient_alerts');
    if (storedData) {
      return JSON.parse(storedData);
    }
    return [];
  } catch (error) {
    console.error('Error getting ingredient alerts:', error);
    return [];
  }
};

// Mark ingredient alert as read
export const markIngredientAlertAsRead = (alertId: string): void => {
  try {
    const alerts = getIngredientAlerts();
    const alert = alerts.find(a => a.id === alertId);
    if (alert) {
      alert.isRead = true;
      localStorage.setItem('ingredient_alerts', JSON.stringify(alerts));
    }
  } catch (error) {
    console.error('Error marking ingredient alert as read:', error);
  }
};

// Get low stock ingredients
export const getLowStockIngredients = (): IngredientStock[] => {
  return getAllIngredientStocks().filter(ingredient => 
    ingredient.isActive && ingredient.currentStock <= ingredient.minStock
  );
};

// Get out of stock ingredients
export const getOutOfStockIngredients = (): IngredientStock[] => {
  return getAllIngredientStocks().filter(ingredient => 
    ingredient.isActive && ingredient.currentStock === 0
  );
};

// Get ingredient status
export const getIngredientStatus = (ingredient: IngredientStock): 'in_stock' | 'low_stock' | 'out_of_stock' => {
  if (ingredient.currentStock === 0) return 'out_of_stock';
  if (ingredient.currentStock <= ingredient.minStock) return 'low_stock';
  return 'in_stock';
};

// Get ingredient status color
export const getIngredientStatusColor = (status: 'in_stock' | 'low_stock' | 'out_of_stock'): string => {
  switch (status) {
    case 'in_stock': return 'text-green-600';
    case 'low_stock': return 'text-yellow-600';
    case 'out_of_stock': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

// Get ingredient status icon
export const getIngredientStatusIcon = (status: 'in_stock' | 'low_stock' | 'out_of_stock'): string => {
  switch (status) {
    case 'in_stock': return '✅';
    case 'low_stock': return '⚠️';
    case 'out_of_stock': return '❌';
    default: return '❓';
  }
};

// Get recipe by product ID
export const getRecipeByProductId = (productId: string): Recipe | null => {
  try {
    const storedData = localStorage.getItem('recipes');
    if (storedData) {
      const recipes: Recipe[] = JSON.parse(storedData);
      return recipes.find(recipe => recipe.productId === productId) || null;
    }
    return null;
  } catch (error) {
    console.error('Error getting recipe by product ID:', error);
    return null;
  }
};

// Deduct ingredients for a product sale
export const deductIngredientsForProduct = (productId: string, quantity: number = 1): void => {
  try {
    const recipe = getRecipeByProductId(productId);
    if (recipe) {
      recipe.ingredients.forEach(({ ingredientId, quantity: ingredientQuantity }) => {
        const totalQuantity = ingredientQuantity * quantity;
        deductIngredientStock(ingredientId, totalQuantity);
      });
    }
  } catch (error) {
    console.error('Error deducting ingredients for product:', error);
  }
};
