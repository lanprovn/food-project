// Stock management types and interfaces
export interface ProductStock {
  productId: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  lastUpdated: number;
  isActive: boolean;
}

export interface StockTransaction {
  id: string;
  productId: string;
  type: 'sale' | 'purchase' | 'adjustment' | 'return';
  quantity: number;
  reason?: string;
  timestamp: number;
  userId?: string;
}

export interface StockAlert {
  id: string;
  productId: string;
  type: 'low_stock' | 'out_of_stock' | 'overstock';
  message: string;
  timestamp: number;
  isRead: boolean;
}

export const STOCK_UNITS = [
  'cái', 'kg', 'lít', 'gói', 'hộp', 'chai', 'lon', 'túi', 'miếng', 'phần'
] as const;

export type StockUnit = typeof STOCK_UNITS[number];

// Default stock settings
export const DEFAULT_STOCK_SETTINGS = {
  minStock: 5,
  maxStock: 100,
  unit: 'cái' as StockUnit,
  isActive: true
};

// Initialize product stock
export const initializeProductStock = (productId: string, initialStock: number = 50): ProductStock => {
  return {
    productId,
    currentStock: initialStock,
    minStock: DEFAULT_STOCK_SETTINGS.minStock,
    maxStock: DEFAULT_STOCK_SETTINGS.maxStock,
    unit: DEFAULT_STOCK_SETTINGS.unit,
    lastUpdated: Date.now(),
    isActive: DEFAULT_STOCK_SETTINGS.isActive
  };
};

// Deduct stock when selling
export const deductStock = (productId: string, quantity: number): void => {
  try {
    const stockData = getProductStock(productId);
    if (stockData) {
      stockData.currentStock = Math.max(0, stockData.currentStock - quantity);
      stockData.lastUpdated = Date.now();
      saveProductStock(stockData);
      
      // Create transaction record
      createStockTransaction({
        productId,
        type: 'sale',
        quantity: -quantity,
        timestamp: Date.now()
      });
      
      // Check for alerts
      checkStockAlerts(stockData);
    }
  } catch (error) {
    console.error('Error deducting stock:', error);
  }
};

// Add stock when purchasing
export const addStock = (productId: string, quantity: number, reason?: string): void => {
  try {
    const stockData = getProductStock(productId);
    if (stockData) {
      stockData.currentStock += quantity;
      stockData.lastUpdated = Date.now();
      saveProductStock(stockData);
      
      // Create transaction record
      createStockTransaction({
        productId,
        type: 'purchase',
        quantity,
        reason,
        timestamp: Date.now()
      });
      
      // Check for alerts
      checkStockAlerts(stockData);
    }
  } catch (error) {
    console.error('Error adding stock:', error);
  }
};

// Adjust stock manually
export const adjustStock = (productId: string, newQuantity: number, reason?: string): void => {
  try {
    const stockData = getProductStock(productId);
    if (stockData) {
      const oldQuantity = stockData.currentStock;
      stockData.currentStock = newQuantity;
      stockData.lastUpdated = Date.now();
      saveProductStock(stockData);
      
      // Create transaction record
      createStockTransaction({
        productId,
        type: 'adjustment',
        quantity: newQuantity - oldQuantity,
        reason,
        timestamp: Date.now()
      });
      
      // Check for alerts
      checkStockAlerts(stockData);
    }
  } catch (error) {
    console.error('Error adjusting stock:', error);
  }
};

// Get product stock
export const getProductStock = (productId: string): ProductStock | null => {
  try {
    const storedData = localStorage.getItem(`stock_${productId}`);
    if (storedData) {
      return JSON.parse(storedData);
    }
    
    // Initialize if not exists
    const initialStock = initializeProductStock(productId, 50);
    saveProductStock(initialStock);
    return initialStock;
  } catch (error) {
    console.error('Error getting product stock:', error);
    return null;
  }
};

// Save product stock
export const saveProductStock = (stock: ProductStock): void => {
  try {
    localStorage.setItem(`stock_${stock.productId}`, JSON.stringify(stock));
  } catch (error) {
    console.error('Error saving product stock:', error);
  }
};

// Get all product stocks
export const getAllProductStocks = (): ProductStock[] => {
  try {
    const stocks: ProductStock[] = [];
    const keys = Object.keys(localStorage);
    
    keys.forEach(key => {
      if (key.startsWith('stock_')) {
        const data = localStorage.getItem(key);
        if (data) {
          stocks.push(JSON.parse(data));
        }
      }
    });
    
    return stocks.sort((a, b) => b.lastUpdated - a.lastUpdated);
  } catch (error) {
    console.error('Error getting all product stocks:', error);
    return [];
  }
};

// Create stock transaction
export const createStockTransaction = (transaction: Omit<StockTransaction, 'id'>): void => {
  try {
    const newTransaction: StockTransaction = {
      ...transaction,
      id: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    
    const transactions = getStockTransactions();
    transactions.unshift(newTransaction);
    
    // Keep only last 1000 transactions
    if (transactions.length > 1000) {
      transactions.splice(1000);
    }
    
    localStorage.setItem('stock_transactions', JSON.stringify(transactions));
  } catch (error) {
    console.error('Error creating stock transaction:', error);
  }
};

// Get stock transactions
export const getStockTransactions = (): StockTransaction[] => {
  try {
    const storedData = localStorage.getItem('stock_transactions');
    if (storedData) {
      return JSON.parse(storedData);
    }
    return [];
  } catch (error) {
    console.error('Error getting stock transactions:', error);
    return [];
  }
};

// Check stock alerts
export const checkStockAlerts = (stock: ProductStock): void => {
  try {
    const alerts: StockAlert[] = getStockAlerts();
    
    // Remove existing alerts for this product
    const filteredAlerts = alerts.filter(alert => alert.productId !== stock.productId);
    
    // Check for new alerts
    if (stock.currentStock === 0) {
      filteredAlerts.push({
        id: `ALERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        productId: stock.productId,
        type: 'out_of_stock',
        message: `Sản phẩm ${stock.productId} đã hết hàng`,
        timestamp: Date.now(),
        isRead: false
      });
    } else if (stock.currentStock <= stock.minStock) {
      filteredAlerts.push({
        id: `ALERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        productId: stock.productId,
        type: 'low_stock',
        message: `Sản phẩm ${stock.productId} sắp hết hàng (còn ${stock.currentStock} ${stock.unit})`,
        timestamp: Date.now(),
        isRead: false
      });
    }
    
    // Keep only last 100 alerts
    if (filteredAlerts.length > 100) {
      filteredAlerts.splice(100);
    }
    
    localStorage.setItem('stock_alerts', JSON.stringify(filteredAlerts));
    
    // Dispatch alert event
    window.dispatchEvent(new CustomEvent('stockAlert', {
      detail: { stock, alerts: filteredAlerts }
    }));
  } catch (error) {
    console.error('Error checking stock alerts:', error);
  }
};

// Get stock alerts
export const getStockAlerts = (): StockAlert[] => {
  try {
    const storedData = localStorage.getItem('stock_alerts');
    if (storedData) {
      return JSON.parse(storedData);
    }
    return [];
  } catch (error) {
    console.error('Error getting stock alerts:', error);
    return [];
  }
};

// Mark alert as read
export const markAlertAsRead = (alertId: string): void => {
  try {
    const alerts = getStockAlerts();
    const alert = alerts.find(a => a.id === alertId);
    if (alert) {
      alert.isRead = true;
      localStorage.setItem('stock_alerts', JSON.stringify(alerts));
    }
  } catch (error) {
    console.error('Error marking alert as read:', error);
  }
};

// Get low stock products
export const getLowStockProducts = (): ProductStock[] => {
  return getAllProductStocks().filter(stock => 
    stock.isActive && stock.currentStock <= stock.minStock
  );
};

// Get out of stock products
export const getOutOfStockProducts = (): ProductStock[] => {
  return getAllProductStocks().filter(stock => 
    stock.isActive && stock.currentStock === 0
  );
};

// Get stock status
export const getStockStatus = (stock: ProductStock): 'in_stock' | 'low_stock' | 'out_of_stock' => {
  if (stock.currentStock === 0) return 'out_of_stock';
  if (stock.currentStock <= stock.minStock) return 'low_stock';
  return 'in_stock';
};

// Get stock status color
export const getStockStatusColor = (status: 'in_stock' | 'low_stock' | 'out_of_stock'): string => {
  switch (status) {
    case 'in_stock': return 'text-green-600';
    case 'low_stock': return 'text-yellow-600';
    case 'out_of_stock': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

// Get stock status icon
export const getStockStatusIcon = (status: 'in_stock' | 'low_stock' | 'out_of_stock'): string => {
  switch (status) {
    case 'in_stock': return '✅';
    case 'low_stock': return '⚠️';
    case 'out_of_stock': return '❌';
    default: return '❓';
  }
};