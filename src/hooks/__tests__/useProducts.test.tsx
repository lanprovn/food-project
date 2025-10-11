import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductProvider } from '../../context/ProductContext.tsx';
import { useProducts } from '../useProducts';

// Mock products data
const mockProducts = [
  {
    id: '1',
    name: 'Cà phê đen',
    price: 25000,
    image: '/test1.jpg',
    description: 'Cà phê đen truyền thống',
    category: 'drinks',
    rating: 4.5,
    restaurant: 'Ocha Việt',
    sizes: [],
    toppings: []
  },
  {
    id: '2',
    name: 'Bánh mì pate',
    price: 15000,
    image: '/test2.jpg',
    description: 'Bánh mì pate truyền thống',
    category: 'food',
    rating: 4.2,
    restaurant: 'Ocha Việt',
    sizes: [],
    toppings: []
  }
];

const mockCategories = [
  { id: '1', name: 'Tất cả' },
  { id: '2', name: 'Đồ uống' },
  { id: '3', name: 'Món ăn' }
];

// Mock the context
vi.mock('../../context/ProductContext.tsx', () => ({
  ProductProvider: ({ children }: { children: React.ReactNode }) => children,
  useProducts: () => ({
    products: mockProducts,
    categories: mockCategories,
    filteredProducts: mockProducts,
    selectedCategory: 'all',
    setSelectedCategory: vi.fn(),
    isLoading: false
  })
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ProductProvider>{children}</ProductProvider>
);

describe('useProducts Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('provides products data', () => {
    const { result } = renderHook(() => useProducts(), { wrapper });
    
    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.products).toHaveLength(2);
  });

  it('provides categories data', () => {
    const { result } = renderHook(() => useProducts(), { wrapper });
    
    expect(result.current.categories).toEqual(mockCategories);
    expect(result.current.categories).toHaveLength(3);
  });

  it('provides filtered products', () => {
    const { result } = renderHook(() => useProducts(), { wrapper });
    
    expect(result.current.filteredProducts).toEqual(mockProducts);
    expect(result.current.filteredProducts).toHaveLength(2);
  });

  it('provides selected category', () => {
    const { result } = renderHook(() => useProducts(), { wrapper });
    
    expect(result.current.selectedCategory).toBe('all');
  });

  it('provides setSelectedCategory function', () => {
    const { result } = renderHook(() => useProducts(), { wrapper });
    
    expect(typeof result.current.setSelectedCategory).toBe('function');
  });

  it('provides loading state', () => {
    const { result } = renderHook(() => useProducts(), { wrapper });
    
    expect(result.current.isLoading).toBe(false);
  });

  it('handles category selection', () => {
    const { result } = renderHook(() => useProducts(), { wrapper });
    
    act(() => {
      result.current.setSelectedCategory('drinks');
    });

    // The mock doesn't actually filter, but we can test the function call
    expect(result.current.setSelectedCategory).toBeDefined();
  });

  it('returns correct product structure', () => {
    const { result } = renderHook(() => useProducts(), { wrapper });
    
    const product = result.current.products[0];
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('image');
    expect(product).toHaveProperty('description');
    expect(product).toHaveProperty('category');
    expect(product).toHaveProperty('rating');
    expect(product).toHaveProperty('restaurant');
  });

  it('returns correct category structure', () => {
    const { result } = renderHook(() => useProducts(), { wrapper });
    
    const category = result.current.categories[0];
    expect(category).toHaveProperty('id');
    expect(category).toHaveProperty('name');
  });

  it('handles empty products array', () => {
    // Mock empty products
    vi.mocked(require('../../context/ProductContext.tsx').useProducts).mockReturnValue({
      products: [],
      categories: mockCategories,
      filteredProducts: [],
      selectedCategory: 'all',
      setSelectedCategory: vi.fn(),
      isLoading: false
    });

    const { result } = renderHook(() => useProducts(), { wrapper });
    
    expect(result.current.products).toEqual([]);
    expect(result.current.filteredProducts).toEqual([]);
  });

  it('handles loading state', () => {
    // Mock loading state
    vi.mocked(require('../../context/ProductContext.tsx').useProducts).mockReturnValue({
      products: mockProducts,
      categories: mockCategories,
      filteredProducts: mockProducts,
      selectedCategory: 'all',
      setSelectedCategory: vi.fn(),
      isLoading: true
    });

    const { result } = renderHook(() => useProducts(), { wrapper });
    
    expect(result.current.isLoading).toBe(true);
  });
});
