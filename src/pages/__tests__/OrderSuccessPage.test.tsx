import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import OrderSuccessPage from '../OrderSuccessPage';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

const renderOrderSuccessPage = () => {
  return render(
    <BrowserRouter>
      <OrderSuccessPage />
    </BrowserRouter>
  );
};

describe('OrderSuccessPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders success page with checkmark icon', () => {
    renderOrderSuccessPage();
    
    expect(screen.getByText('Đơn hàng đã được ghi nhận!')).toBeInTheDocument();
    expect(screen.getByText(/Cảm ơn bạn đã sử dụng dịch vụ của Ocha Việt/)).toBeInTheDocument();
  });

  it('displays success message and description', () => {
    renderOrderSuccessPage();
    
    expect(screen.getByText('Đơn hàng đã được ghi nhận!')).toBeInTheDocument();
    expect(screen.getByText(/Cảm ơn bạn đã sử dụng dịch vụ của Ocha Việt/)).toBeInTheDocument();
    expect(screen.getByText('Đơn hàng của bạn đang được chuẩn bị.')).toBeInTheDocument();
  });

  it('shows navigation buttons', () => {
    renderOrderSuccessPage();
    
    expect(screen.getByText('Tạo đơn mới')).toBeInTheDocument();
    expect(screen.getByText('Về trang chủ')).toBeInTheDocument();
  });

  it('handles new order button click', () => {
    renderOrderSuccessPage();
    
    const newOrderButton = screen.getByText('Tạo đơn mới');
    fireEvent.click(newOrderButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/pos');
  });

  it('handles go home button click', () => {
    renderOrderSuccessPage();
    
    const goHomeButton = screen.getByText('Về trang chủ');
    fireEvent.click(goHomeButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('has proper styling classes', () => {
    renderOrderSuccessPage();
    
    const container = screen.getByText('Đơn hàng đã được ghi nhận!').closest('div');
    expect(container).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center');
  });

  it('renders without crashing', () => {
    expect(() => renderOrderSuccessPage()).not.toThrow();
  });

  it('has accessible button elements', () => {
    renderOrderSuccessPage();
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    
    buttons.forEach(button => {
      expect(button).toBeInTheDocument();
    });
  });
});
