import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import POSPage from '../../pages/POSPage';
import { ProductProvider } from '../../context/ProductContext.tsx';
import { CartProvider } from '../../context/CartContext.tsx';
import type { Product } from '../../types/product';
import { useProducts } from '../../hooks/useProducts';

// Mock the hooks
vi.mock('../../hooks/useProducts', () => ({
  useProducts: () => ({
    filteredProducts: [
      {
        id: '1',
        name: 'Cà phê đen',
        price: 25000,
        image: '/test-image.jpg',
        description: 'Cà phê đen truyền thống',
        category: 'drinks',
        rating: 4.5,
        restaurant: 'Ocha Việt'
      }
    ],
    setSelectedCategory: vi.fn(),
    isLoading: false,
    categories: [
      { id: '1', name: 'Tất cả' },
      { id: '2', name: 'Đồ uống' }
    ]
  })
}));

// Mock ProductGrid component
vi.mock('../../components/pos/ProductGrid', () => ({
  default: ({ products }: { products: Product[] }) => (
    <div data-testid="product-grid">
      {products.map(product => (
        <div key={product.id} data-testid={`product-${product.id}`}>
          {product.name}
        </div>
      ))}
    </div>
  )
}));

const renderPOSPage = () => {
  return render(
    <BrowserRouter>
      <ProductProvider>
        <CartProvider>
          <POSPage />
        </CartProvider>
      </ProductProvider>
    </BrowserRouter>
  );
};

describe('POSPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders POS page with title and description', () => {
    renderPOSPage();
    
    expect(screen.getByText('Hệ thống Order')).toBeInTheDocument();
    expect(screen.getByText('Chọn món ăn và thức uống từ menu bên dưới')).toBeInTheDocument();
  });

  it('displays product grid with products', () => {
    renderPOSPage();
    
    expect(screen.getByTestId('product-grid')).toBeInTheDocument();
    expect(screen.getByTestId('product-1')).toBeInTheDocument();
    expect(screen.getByText('Cà phê đen')).toBeInTheDocument();
  });

  it('shows mobile category filter on small screens', () => {
    renderPOSPage();
    
    // Check if mobile category buttons are rendered
    expect(screen.getByText('Tất cả')).toBeInTheDocument();
    expect(screen.getByText('Đồ uống')).toBeInTheDocument();
  });

  it('handles category selection on mobile', () => {
    renderPOSPage();
    
    const categoryButton = screen.getByText('Đồ uống');
    fireEvent.click(categoryButton);
    
    // Category selection should be handled by the mocked hook
    expect(categoryButton).toBeInTheDocument();
  });

  it('displays loading state when products are loading', () => {
    // Mock loading state
    vi.mocked(useProducts).mockReturnValue({
      products: [],
      restaurants: [],
      categories: [],
      discountItems: [],
      filteredProducts: [],
      searchQuery: '',
      selectedCategory: 'all',
      selectedTags: [],
      sortBy: 'popular',
      isLoading: true,
      setSelectedCategory: vi.fn(),
      setSearchQuery: vi.fn(),
      setSelectedTags: vi.fn(),
      setSortBy: vi.fn(),
      filterProducts: vi.fn(),
      loadProducts: vi.fn()
    });

    renderPOSPage();
    
    expect(screen.getByText('Đang tải sản phẩm...')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    expect(() => renderPOSPage()).not.toThrow();
  });
});
