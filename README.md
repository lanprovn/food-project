# 🍜 Ocha Việt POS - Hệ thống Order hiện đại

<div align="center">
  <img src="src/assets/img/logo.png" alt="Ocha Việt POS Logo" width="200" height="200">
  
  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC.svg)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF.svg)](https://vitejs.dev/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

## 📋 Tổng quan

**Ocha Việt POS** là hệ thống Point of Sale (POS) hiện đại được thiết kế đặc biệt cho các quán cà phê, nhà hàng và cửa hàng thực phẩm tại Việt Nam. Ứng dụng được xây dựng với React + TypeScript + Tailwind CSS, mang đến trải nghiệm người dùng mượt mà và giao diện chuyên nghiệp.

### ✨ Tính năng nổi bật

- 🎯 **Giao diện hiện đại**: Thiết kế responsive với green tone professional
- 🛒 **Quản lý giỏ hàng**: Thêm/sửa/xóa sản phẩm dễ dàng với real-time sync
- 📱 **Responsive Design**: Hoạt động tốt trên desktop, tablet và mobile
- 🏷️ **Quản lý danh mục**: Phân loại sản phẩm theo category
- 💳 **Thanh toán đa dạng**: Hỗ trợ tiền mặt, thẻ, QR code
- 📊 **Theo dõi đơn hàng**: Quản lý và theo dõi trạng thái đơn hàng
- 🖥️ **Customer Display**: Màn hình hiển thị cho khách hàng với real-time updates
- ⚡ **Tốc độ cao**: Sử dụng Vite và lazy loading
- 🔄 **Real-time Sync**: Đồng bộ dữ liệu giữa POS và Customer Display

## 🚀 Cài đặt và Chạy

### Yêu cầu hệ thống

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0 hoặc **yarn**: >= 1.22.0

### Bước 1: Clone repository

```bash
git clone https://github.com/lanprovn/food-project.git
cd food-project
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
│   ├── layout/          # Layout components (MainLayout, POSLayoutNew)
│   ├── pos/             # POS-specific components (CartPanel, ProductCard, etc.)
│   ├── shared/          # Shared components (ButtonFilled, ErrorBoundary, etc.)
│   └── ui/              # UI components (Toast)
├── context/             # React Context providers (CartContext, ProductContext)
├── hooks/               # Custom React hooks (useCart, useDisplaySync, useProducts)
├── pages/               # Page components (POSPage, CheckoutPage, CustomerDisplayPage, etc.)
├── router/              # Routing configuration (AppRouter)
├── types/               # TypeScript type definitions (cart, display, product)
├── utils/               # Utility functions (formatPrice)
└── assets/              # Static assets (images, CSS, JSON data)
```

## 🎨 Công nghệ sử dụng

### Frontend Stack
- **React 18.2.0** - UI Framework
- **TypeScript 5.0.0** - Type safety
- **Tailwind CSS 3.4.0** - Styling
- **React Router** - Client-side routing
- **React Hot Toast** - Notifications
- **Heroicons** - Icon library

### Build Tools
- **Vite 5.0.0** - Build tool và dev server
- **PostCSS** - CSS processing
- **ESLint** - Code linting
- **Vitest** - Testing framework

### State Management
- **React Context API** - Global state management
- **Custom Hooks** - Local state management
- **BroadcastChannel API** - Real-time communication

## 📱 Chức năng chính

### 🛒 Hệ thống POS (`/pos`)
- **Danh sách sản phẩm**: Hiển thị sản phẩm theo danh mục với sidebar navigation
- **Chi tiết sản phẩm**: Modal hiển thị thông tin chi tiết, chọn size, topping
- **Giỏ hàng**: Panel bên phải với thêm/sửa/xóa sản phẩm, tính tổng tiền
- **Real-time sync**: Đồng bộ dữ liệu với Customer Display ngay lập tức

### 🖥️ Customer Display (`/display`)
- **Professional Design**: Green tone design với clean white cards
- **Real-time Updates**: Hiển thị đơn hàng ngay khi có thay đổi từ POS
- **Order Status**: Theo dõi trạng thái đơn hàng (creating, confirmed, paid, completed)
- **Payment Info**: Hiển thị phương thức thanh toán và trạng thái
- **Responsive Layout**: 70% order items, 30% price summary

### 💳 Thanh toán (`/checkout`)
- **Multiple Payment Methods**: Tiền mặt, thẻ ngân hàng, QR code
- **Customer Info**: Nhập thông tin khách hàng và bàn
- **Order Summary**: Xem lại đơn hàng trước khi thanh toán
- **Success Page**: Trang xác nhận thanh toán thành công

### 📊 Quản lý đơn hàng
- **Order Tracking**: Theo dõi trạng thái đơn hàng real-time
- **Payment Status**: Hiển thị trạng thái thanh toán
- **Order History**: Lưu trữ lịch sử đơn hàng
- **Customer Info**: Quản lý thông tin khách hàng

## 🔄 Real-time Synchronization

Hệ thống sử dụng **BroadcastChannel API** và **localStorage** để đồng bộ dữ liệu giữa POS và Customer Display:

### Cơ chế đồng bộ
- **BroadcastChannel**: Giao tiếp giữa các tab/window
- **localStorage**: Lưu trữ dữ liệu và đồng bộ cross-origin
- **Custom Events**: Cập nhật instant trong cùng tab
- **Storage Events**: Lắng nghe thay đổi localStorage
- **Polling**: Fallback mechanism với interval 50ms

### Data Flow
```
POS Page → CartContext → useDisplaySync → BroadcastChannel/localStorage
                                                      ↓
Customer Display ← useDisplaySync ← BroadcastChannel/localStorage
```

## 🎨 Design System

### Color Palette
- **Primary Background**: Green-50 → Emerald-50 → Teal-50 gradients
- **Cards**: White/80 với green-200/30 borders
- **Text**: Gray-800 (headings), Gray-700 (secondary), Gray-600 (tertiary)
- **Accents**: Emerald-400, Green-400, Teal-400, Lime-400
- **Status Colors**: Green tones cho status indicators

### Typography
- **Headings**: Large, bold với proper hierarchy
- **Body Text**: Clean gray colors cho readability
- **Status Text**: Bold với color coding
- **Professional**: Non-distracting cho customer experience

### Animations
- **Floating Particles**: Green tones với staggered delays
- **Hover Effects**: Scale transforms và shadow changes
- **Progress Bars**: Smooth transitions với green gradients
- **Status Indicators**: Pulse animations cho live feedback

## 🧪 Testing

Dự án sử dụng **Vitest** và **React Testing Library** để đảm bảo chất lượng code.

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
- ✅ **Hooks**: useCart, useProducts
- ✅ **Context**: CartContext, ProductContext
- ✅ **Utilities**: formatPrice

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
        primary: '#10b981', // Emerald
        secondary: '#059669', // Green
      },
    },
  },
  plugins: [],
}
```

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

## 🚀 Quick Start

1. **Clone repository**:
   ```bash
   git clone https://github.com/lanprovn/food-project.git
   cd food-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   - POS System: `http://localhost:3000/pos`
   - Customer Display: `http://localhost:3000/display`
   - Checkout: `http://localhost:3000/checkout`

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
- Maintain real-time sync functionality

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