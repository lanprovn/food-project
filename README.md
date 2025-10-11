# 🍜 Ocha Việt POS - Hệ thống Order hiện đại

<div align="center">
  <img src="src/assets/img/logo.png" alt="Ocha Việt POS Logo" width="200" height="200">
  
  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0.0-38B2AC.svg)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-7.1.9-646CFF.svg)](https://vitejs.dev/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

## 📋 Tổng quan

**Ocha Việt POS** là hệ thống Point of Sale (POS) hiện đại được thiết kế đặc biệt cho các quán cà phê, nhà hàng và cửa hàng thực phẩm tại Việt Nam. Ứng dụng được xây dựng với React + TypeScript + Tailwind CSS, mang đến trải nghiệm người dùng mượt mà và giao diện chuyên nghiệp.

### ✨ Tính năng nổi bật

- 🎯 **Giao diện hiện đại**: Thiết kế responsive, thân thiện với người dùng
- 🛒 **Quản lý giỏ hàng**: Thêm/sửa/xóa sản phẩm dễ dàng
- 📱 **Responsive Design**: Hoạt động tốt trên desktop, tablet và mobile
- 🏷️ **Quản lý danh mục**: Phân loại sản phẩm theo category
- 💳 **Thanh toán đa dạng**: Hỗ trợ tiền mặt, thẻ, QR code
- 📊 **Theo dõi đơn hàng**: Quản lý và theo dõi trạng thái đơn hàng
- 🔐 **Xác thực người dùng**: Đăng nhập/đăng ký an toàn
- ⚡ **Tốc độ cao**: Sử dụng Vite và lazy loading

## 🚀 Cài đặt và Chạy

### Yêu cầu hệ thống

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0 hoặc **yarn**: >= 1.22.0

### Bước 1: Clone repository

```bash
git clone https://github.com/yourusername/ocha-viet-pos.git
cd ocha-viet-pos
```

### Bước 2: Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### Bước 3: Chạy ứng dụng

```bash
npm run dev
# hoặc
yarn dev
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

### Bước 4: Build cho production

```bash
npm run build
# hoặc
yarn build
```

## 🏗️ Cấu trúc dự án

```
src/
├── components/          # Components React
│   ├── auth/           # Components xác thực
│   ├── cart/           # Components giỏ hàng
│   ├── layout/         # Layout components
│   ├── pos/            # POS-specific components
│   ├── product/        # Product components
│   └── shared/         # Shared components
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── router/             # Routing configuration
├── service/            # API services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── assets/             # Static assets
```

## 🎨 Công nghệ sử dụng

### Frontend Stack
- **React 18.2.0** - UI Framework
- **TypeScript 5.0.0** - Type safety
- **Tailwind CSS 4.0.0** - Styling
- **React Router** - Client-side routing
- **React Hot Toast** - Notifications
- **Heroicons** - Icon library

### Build Tools
- **Vite 7.1.9** - Build tool và dev server
- **PostCSS** - CSS processing
- **ESLint** - Code linting
- **Vitest** - Testing framework

### State Management
- **React Context API** - Global state
- **Custom Hooks** - Local state management

## 📱 Chức năng chính

### 🛒 Hệ thống POS
- **Danh sách sản phẩm**: Hiển thị sản phẩm theo danh mục
- **Chi tiết sản phẩm**: Xem thông tin chi tiết, chọn size, topping
- **Giỏ hàng**: Thêm/sửa/xóa sản phẩm, tính tổng tiền
- **Thanh toán**: Hỗ trợ nhiều phương thức thanh toán

### 👤 Quản lý người dùng
- **Đăng ký**: Tạo tài khoản mới
- **Đăng nhập**: Xác thực người dùng
- **Quản lý profile**: Cập nhật thông tin cá nhân

### 📊 Quản lý đơn hàng
- **Tạo đơn hàng**: Từ giỏ hàng
- **Theo dõi đơn hàng**: Xem trạng thái đơn hàng
- **Lịch sử đơn hàng**: Xem các đơn hàng đã đặt

### 🎨 Giao diện
- **Responsive**: Tối ưu cho mọi thiết bị
- **Dark/Light mode**: Chế độ sáng/tối
- **Animations**: Hiệu ứng mượt mà
- **Accessibility**: Hỗ trợ người khuyết tật

## 🔧 Cấu hình

### Environment Variables
Tạo file `.env.local` trong thư mục gốc:

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Ocha Việt POS
```

### Tailwind CSS
Cấu hình trong `tailwind.config.js`:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f97316', // Orange
        secondary: '#64748b', // Slate
      },
    },
  },
  plugins: [],
}
```

## 🧪 Testing

Dự án sử dụng **Vitest** và **React Testing Library** để đảm bảo chất lượng code và tính ổn định của ứng dụng.

### Chạy Tests

```bash
# Chạy tất cả tests
npm run test

# Chạy tests với UI
npm run test:ui

# Chạy tests với coverage report
npm run test:coverage

# Chạy tests trong watch mode
npm run test:watch
```

### Test Coverage

Dự án có test coverage cho:

- ✅ **Components**: POSPage, CheckoutPage, OrderSuccessPage
- ✅ **Hooks**: useCart, useProducts, useAppLogger
- ✅ **Context**: AuthContext, CartContext
- ✅ **Utilities**: formatPrice, validation functions

### Test Structure

```
src/
├── components/__tests__/     # Component tests
├── context/__tests__/        # Context tests
├── hooks/__tests__/          # Hook tests
├── pages/__tests__/          # Page tests
└── test/                     # Test setup and utilities
    └── setup.ts             # Test configuration
```

### Viết Tests Mới

```typescript
// Example: Component test
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('handles user interaction', () => {
    const mockHandler = vi.fn();
    render(<MyComponent onClick={mockHandler} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
});
```

## 📊 Monitoring & Analytics

Dự án tích hợp hệ thống monitoring và analytics để theo dõi hiệu suất và lỗi trong production.

### Logging System

```typescript
import { useAppLogger } from './hooks/useAppLogger';

const MyComponent = () => {
  const logger = useAppLogger();

  const handleError = (error: Error) => {
    logger.trackError(error, { component: 'MyComponent' });
  };

  const handleUserAction = () => {
    logger.trackUserAction('button_click', { buttonId: 'submit' });
  };

  return <div>...</div>;
};
```

### Error Tracking

- **Sentry Integration**: Sẵn sàng tích hợp Sentry cho production
- **Console Logging**: Fallback logging cho development
- **Error Boundaries**: React error boundary để catch errors
- **Performance Tracking**: Theo dõi thời gian thực thi operations

### Analytics Events

```typescript
// Track user interactions
logger.trackUserAction('product_added', { productId: '123' });

// Track page views
logger.trackPageView('checkout', { step: 'payment' });

// Track POS events
logger.trackPOSEvent('order_completed', { totalAmount: 50000 });

// Track cart operations
logger.trackCartOperation('add', { productId: '123', quantity: 2 });
```

### Environment Configuration

```env
# .env.local
VITE_SENTRY_DSN=your_sentry_dsn_here
VITE_SENTRY_ENABLED=true
NODE_ENV=production
```

### Monitoring Features

- 🔍 **Error Tracking**: Tự động capture và report errors
- 📈 **Performance Monitoring**: Theo dõi thời gian load và render
- 👤 **User Analytics**: Track user behavior và interactions
- 🛒 **Business Metrics**: Monitor POS operations và sales
- 📱 **Session Tracking**: Theo dõi user sessions và engagement

## 📦 Build và Deploy

### Build cho production
```bash
npm run build
```

### Preview build
```bash
npm run preview
```

### Deploy lên Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy lên Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! Vui lòng làm theo các bước sau:

1. **Fork** repository
2. **Tạo branch** cho feature mới (`git checkout -b feature/AmazingFeature`)
3. **Commit** thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. **Push** lên branch (`git push origin feature/AmazingFeature`)
5. **Mở Pull Request**

### Quy tắc đóng góp
- Tuân thủ coding standards hiện tại
- Viết tests cho code mới
- Cập nhật documentation nếu cần
- Đảm bảo build thành công

## 📄 License

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

## 👥 Tác giả

- **Lan Pro** - *Creator & Developer* - [GitHub](https://github.com/lanprovn)

## 🙏 Lời cảm ơn

- React team cho framework tuyệt vời
- Tailwind CSS team cho utility-first CSS
- Vite team cho build tool nhanh chóng
- Cộng đồng open source Việt Nam

## 📞 Liên hệ

- **Email**: lanprovn@gmail.com
- **GitHub**: https://github.com/lanprovn
- **Project**: https://github.com/lanprovn/food-project

---

<div align="center">
  <p>Được tạo với ❤️ bởi Lan Pro</p>
  <p>© 2024 Ocha Việt POS. All rights reserved.</p>
</div>