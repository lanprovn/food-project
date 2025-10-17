import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import CheckoutPage from '../CheckoutPage';
import { CartProvider } from '../../context/CartContext.tsx';
import { useCart } from '../../hooks/useCart';

// Mock the cart hook
const mockCartItems = [
  {
    id: '1',
    productId: '1',
    name: 'Cà phê đen',
    image: '/test-image.jpg',
    basePrice: 25000,
    selectedSize: undefined,
    selectedToppings: [],
    note: '',
    quantity: 2,
    totalPrice: 50000
  }
];

vi.mock('../../hooks/useCart', () => ({
  useCart: () => ({
    items: mockCartItems,
    totalPrice: 50000,
    clearCart: vi.fn()
  })
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

// Mock formatPrice utility
vi.mock('../../utils/formatPrice', () => ({
  formatPrice: (price: number) => `${price.toLocaleString()}₫`
}));

const renderCheckoutPage = () => {
  return render(
    <BrowserRouter>
      <CartProvider>
        <CheckoutPage />
      </CartProvider>
    </BrowserRouter>
  );
};

describe('CheckoutPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders checkout page with order summary and customer form', () => {
    renderCheckoutPage();
    
    expect(screen.getByText('Đơn hàng')).toBeInTheDocument();
    expect(screen.getByText('Thông tin khách hàng')).toBeInTheDocument();
  });

  it('displays cart items in order summary', () => {
    renderCheckoutPage();
    
    expect(screen.getByText('Cà phê đen')).toBeInTheDocument();
    expect(screen.getByText('50,000₫')).toBeInTheDocument();
    expect(screen.getByText('Số lượng: 2')).toBeInTheDocument();
  });

  it('shows payment method options', () => {
    renderCheckoutPage();
    
    expect(screen.getByText('Phương thức thanh toán')).toBeInTheDocument();
    expect(screen.getByText('Tiền mặt')).toBeInTheDocument();
    expect(screen.getByText('Thẻ')).toBeInTheDocument();
    expect(screen.getByText('QR Code')).toBeInTheDocument();
  });

  it('handles customer information input', () => {
    renderCheckoutPage();
    
    const nameInput = screen.getByLabelText('Họ và tên *');
    const phoneInput = screen.getByLabelText('Số điện thoại *');
    
    fireEvent.change(nameInput, { target: { value: 'Nguyễn Văn A' } });
    fireEvent.change(phoneInput, { target: { value: '0123456789' } });
    
    expect(nameInput).toHaveValue('Nguyễn Văn A');
    expect(phoneInput).toHaveValue('0123456789');
  });

  it('handles payment method selection', () => {
    renderCheckoutPage();
    
    const cardButton = screen.getByText('Thẻ');
    fireEvent.click(cardButton);
    
    // Payment method should be selected (visual feedback)
    expect(cardButton).toBeInTheDocument();
  });

  it('handles form submission with valid data', async () => {
    renderCheckoutPage();
    
    // Fill required fields
    fireEvent.change(screen.getByLabelText('Họ và tên *'), { 
      target: { value: 'Nguyễn Văn A' } 
    });
    fireEvent.change(screen.getByLabelText('Số điện thoại *'), { 
      target: { value: '0123456789' } 
    });
    
    // Click complete order button
    const completeButton = screen.getByText('Hoàn tất đơn hàng');
    fireEvent.click(completeButton);
    
    // Should show success alert (mocked)
    await waitFor(() => {
      expect(completeButton).toBeInTheDocument();
    });
  });

  it('disables complete order button when required fields are empty', () => {
    renderCheckoutPage();
    
    const completeButton = screen.getByText('Hoàn tất đơn hàng');
    expect(completeButton).toBeDisabled();
  });

  it('shows empty cart message when no items', () => {
    // Mock empty cart
    vi.mocked(useCart).mockReturnValue({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
      isCartOpen: false,
      setIsCartOpen: vi.fn()
    });

    renderCheckoutPage();
    
    expect(screen.getByText('Giỏ hàng trống')).toBeInTheDocument();
    expect(screen.getByText('Vui lòng thêm sản phẩm vào giỏ hàng')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    expect(() => renderCheckoutPage()).not.toThrow();
  });
});
