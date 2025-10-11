import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CartProvider } from '../../context/CartContext.tsx';
import { useCart } from '../../hooks/useCart';

// Mock toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn()
  },
  toast: {
    success: vi.fn()
  }
}));

// Mock uuid
vi.mock('uuid', () => ({
  v4: () => 'mock-uuid-123'
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('useCart Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('provides initial cart state', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('adds item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    const newItem = {
      productId: '1',
      name: 'Cà phê đen',
      image: '/test.jpg',
      basePrice: 25000,
      selectedSize: undefined,
      selectedToppings: [],
      note: '',
      quantity: 1,
      totalPrice: 25000
    };

    act(() => {
      result.current.addToCart(newItem);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].name).toBe('Cà phê đen');
    expect(result.current.totalItems).toBe(1);
    expect(result.current.totalPrice).toBe(25000);
  });

  it('updates quantity when adding existing item', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    const item = {
      productId: '1',
      name: 'Cà phê đen',
      image: '/test.jpg',
      basePrice: 25000,
      selectedSize: undefined,
      selectedToppings: [],
      note: '',
      quantity: 1,
      totalPrice: 25000
    };

    // Add item first time
    act(() => {
      result.current.addToCart(item);
    });

    // Add same item again
    act(() => {
      result.current.addToCart(item);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.totalItems).toBe(2);
    expect(result.current.totalPrice).toBe(50000);
  });

  it('removes item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    const item = {
      productId: '1',
      name: 'Cà phê đen',
      image: '/test.jpg',
      basePrice: 25000,
      selectedSize: undefined,
      selectedToppings: [],
      note: '',
      quantity: 1,
      totalPrice: 25000
    };

    // Add item
    act(() => {
      result.current.addToCart(item);
    });

    expect(result.current.items).toHaveLength(1);

    // Remove item
    act(() => {
      result.current.removeFromCart(result.current.items[0].id);
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('updates item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    const item = {
      productId: '1',
      name: 'Cà phê đen',
      image: '/test.jpg',
      basePrice: 25000,
      selectedSize: undefined,
      selectedToppings: [],
      note: '',
      quantity: 1,
      totalPrice: 25000
    };

    // Add item
    act(() => {
      result.current.addToCart(item);
    });

    const cartItem = result.current.items[0];

    // Update quantity
    act(() => {
      result.current.updateQuantity(cartItem.id, 3);
    });

    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.totalItems).toBe(3);
    expect(result.current.totalPrice).toBe(75000);
  });

  it('clears entire cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    const item1 = {
      productId: '1',
      name: 'Cà phê đen',
      image: '/test.jpg',
      basePrice: 25000,
      selectedSize: undefined,
      selectedToppings: [],
      note: '',
      quantity: 1,
      totalPrice: 25000
    };

    const item2 = {
      productId: '2',
      name: 'Bánh mì',
      image: '/test2.jpg',
      basePrice: 15000,
      selectedSize: undefined,
      selectedToppings: [],
      note: '',
      quantity: 1,
      totalPrice: 15000
    };

    // Add items
    act(() => {
      result.current.addToCart(item1);
      result.current.addToCart(item2);
    });

    expect(result.current.items).toHaveLength(2);

    // Clear cart
    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('calculates total price correctly with multiple items', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    const item1 = {
      productId: '1',
      name: 'Cà phê đen',
      image: '/test.jpg',
      basePrice: 25000,
      selectedSize: undefined,
      selectedToppings: [],
      note: '',
      quantity: 2,
      totalPrice: 50000
    };

    const item2 = {
      productId: '2',
      name: 'Bánh mì',
      image: '/test2.jpg',
      basePrice: 15000,
      selectedSize: undefined,
      selectedToppings: [],
      note: '',
      quantity: 1,
      totalPrice: 15000
    };

    act(() => {
      result.current.addToCart(item1);
      result.current.addToCart(item2);
    });

    expect(result.current.totalPrice).toBe(65000);
    expect(result.current.totalItems).toBe(3);
  });
});
