# 🍜 Ocha Việt POS - Hệ thống POS hiện đại

<div align="center">
  <img src="src/assets/img/logo.png" alt="Ocha Việt POS Logo" width="200" height="200">
  
  [![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.14-38B2AC.svg)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF.svg)](https://vitejs.dev/)
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
- 📊 **Dashboard Doanh Thu**: Theo dõi doanh thu hàng ngày với real-time updates
- 📦 **Quản lý kho**: Hệ thống quản lý tồn kho hoàn chỉnh với cảnh báo
- 🖥️ **Customer Display**: Màn hình hiển thị cho khách hàng với real-time updates
- ⚡ **Tốc độ cao**: Sử dụng Vite và lazy loading
- 🔄 **Real-time Sync**: Đồng bộ dữ liệu giữa POS và Customer Display

## 🚀 Cài đặt và Chạy

### Yêu cầu hệ thống

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0

### Bước 1: Clone repository

```bash
git clone https://github.com/lanprovn/food-project.git
cd food-project
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Chạy ứng dụng

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

### Bước 4: Build cho production

```bash
npm run build
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
├── pages/               # Page components (POSPage, CheckoutPage, DashboardPage, etc.)
├── router/              # Routing configuration (AppRouter)
├── types/               # TypeScript type definitions (cart, display, product)
├── utils/               # Utility functions (formatPrice, stockManagement)
└── assets/              # Static assets (images, CSS, JSON data)
```

## 🎨 Công nghệ sử dụng

### Frontend Stack
- **React 19.1.1** - UI Framework
- **TypeScript 5.9.3** - Type safety
- **Tailwind CSS 4.1.14** - Styling
- **React Router** - Client-side routing
- **React Hot Toast** - Notifications
- **Lucide React** - Icon library

### Build Tools
- **Vite 7.1.7** - Build tool và dev server
- **PostCSS** - CSS processing
- **ESLint** - Code linting
- **Vitest** - Testing framework

### State Management
- **React Context API** - Global state management
- **Custom Hooks** - Local state management
- **localStorage** - Data persistence
- **Custom Events** - Real-time communication

## 📱 Chức năng chính

### 🛒 Hệ thống POS (`/pos`)
- **Danh sách sản phẩm**: Hiển thị sản phẩm theo danh mục với sidebar navigation
- **Chi tiết sản phẩm**: Modal hiển thị thông tin chi tiết, chọn size, topping
- **Giỏ hàng**: Panel bên phải với thêm/sửa/xóa sản phẩm, tính tổng tiền
- **Real-time sync**: Đồng bộ dữ liệu với Customer Display ngay lập tức
- **Stock Alerts**: Hiển thị cảnh báo tồn kho thấp/ hết hàng
- **Stock Management**: Quản lý tồn kho trực tiếp từ POS

### 📊 Dashboard Doanh Thu (`/dashboard`)
- **Doanh thu hàng ngày**: Tổng doanh thu, số đơn hàng, giá trị trung bình
- **Sản phẩm bán chạy**: Top sản phẩm với số lượng và doanh thu
- **Đơn hàng gần đây**: Chi tiết các đơn hàng vừa hoàn thành
- **Cảnh báo tồn kho**: Hiển thị các sản phẩm sắp hết hàng
- **Real-time updates**: Cập nhật ngay khi có đơn hàng mới
- **Auto reset**: Tự động reset khi qua ngày mới

### 📦 Quản lý kho (`/stock-management`)
- **Tồn kho**: Xem và quản lý tồn kho tất cả sản phẩm
- **Nhập hàng**: Thêm hàng vào kho với giao dịch
- **Điều chỉnh**: Điều chỉnh tồn kho với lý do
- **Giao dịch**: Lịch sử tất cả giao dịch kho
- **Cảnh báo**: Quản lý cảnh báo tồn kho thấp/hết hàng
- **Thống kê**: Tổng quan tình trạng kho

### 🖥️ Customer Display (`/display`)
- **Professional Design**: Green tone design với clean white cards
- **Real-time Updates**: Hiển thị đơn hàng ngay khi có thay đổi từ POS
- **Order Status**: Theo dõi trạng thái đơn hàng (creating, confirmed, paid, completed)
- **Payment Info**: Hiển thị phương thức thanh toán và trạng thái
- **Responsive Layout**: 70% order items, 30% price summary
- **Việt hóa**: Giao diện hoàn toàn bằng tiếng Việt

### 💳 Thanh toán (`/checkout`)
- **Multiple Payment Methods**: Tiền mặt, thẻ ngân hàng, QR code
- **Customer Info**: Nhập thông tin khách hàng và bàn
- **Order Summary**: Xem lại đơn hàng trước khi thanh toán
- **Success Page**: Trang xác nhận thanh toán thành công
- **Stock Deduction**: Tự động trừ tồn kho khi thanh toán thành công

## 🔄 Real-time Synchronization

Hệ thống sử dụng **localStorage** và **Custom Events** để đồng bộ dữ liệu:

### Cơ chế đồng bộ
- **localStorage**: Lưu trữ dữ liệu và đồng bộ cross-tab
- **Custom Events**: Cập nhật instant trong cùng tab
- **Storage Events**: Lắng nghe thay đổi localStorage
- **Real-time Updates**: Dashboard và Customer Display cập nhật ngay lập tức

### Data Flow
```
POS Page → CartContext → localStorage → Custom Events
                                 ↓
Dashboard/Customer Display ← localStorage ← Storage Events
```

## 📦 Stock Management System

### Tính năng quản lý kho
- **Product Stock Tracking**: Theo dõi tồn kho hiện tại, tối thiểu, tối đa
- **Stock Operations**: Trừ hàng khi bán, thêm hàng khi nhập, điều chỉnh
- **Stock Transactions**: Ghi lại tất cả giao dịch kho
- **Stock Alerts**: Cảnh báo tồn kho thấp, hết hàng, quá nhiều
- **Auto Initialization**: Tự động khởi tạo tồn kho cho sản phẩm mới

### Cảnh báo tồn kho
- **Low Stock**: Cảnh báo khi tồn kho dưới mức tối thiểu
- **Out of Stock**: Cảnh báo khi hết hàng
- **Overstock**: Cảnh báo khi tồn kho quá cao
- **Real-time Alerts**: Hiển thị cảnh báo ngay lập tức

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
- **Hover Effects**: Scale transforms và shadow changes
- **Progress Bars**: Smooth transitions với green gradients
- **Status Indicators**: Pulse animations cho live feedback
- **Toast Notifications**: Smooth slide-in animations

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
```

### Test Coverage

Dự án có test coverage cho:
- ✅ **Components**: POSPage, CheckoutPage, OrderSuccessPage
- ✅ **Hooks**: useCart, useProducts
- ✅ **Context**: CartContext, ProductContext
- ✅ **Utilities**: formatPrice, stockManagement

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
   - Dashboard: `http://localhost:3000/dashboard`
   - Stock Management: `http://localhost:3000/stock-management`
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