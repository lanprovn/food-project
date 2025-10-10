export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  restaurant: string;
  rating: number;
  description?: string;
  discount?: number;
  isAvailable?: boolean;
  stock?: number;
  isPopular?: boolean;
}

export interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  categories: string[];
}

export interface Category {
  id: number;
  name: string;
  image: string;
  description?: string;
  productCount?: number;
}

export interface DiscountItem {
  id: number;
  name: string;
  image: string;
  discount: number;
  daysRemaining: number;
}

export interface ProductContextType {
  products: Product[];
  restaurants: Restaurant[];
  categories: Category[];
  discountItems: DiscountItem[];
  filteredProducts: Product[];
  searchQuery: string;
  selectedCategory: string;
  sortBy: 'name' | 'price' | 'rating' | 'popular';
  isLoading: boolean;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sortBy: 'name' | 'price' | 'rating' | 'popular') => void;
  filterProducts: () => void;
  loadProducts: () => Promise<void>;
}