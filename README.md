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

- 🎯 **Giao diện hiện đại**: Thiết kế responsive với animations và transitions mượt mà
- 🛒 **Quản lý giỏ hàng**: Thêm/sửa/xóa sản phẩm dễ dàng với real-time sync
- 📱 **Responsive Design**: Hoạt động tốt trên desktop, tablet và mobile
- 🏷️ **Quản lý danh mục**: Phân loại sản phẩm theo category với filtering
- 💳 **Thanh toán đa dạng**: Hỗ trợ tiền mặt, thẻ, QR code
- 📊 **Dashboard Doanh Thu**: Theo dõi doanh thu hàng ngày với real-time updates
- 📦 **Quản lý kho**: Hệ thống quản lý tồn kho hoàn chỉnh với cảnh báo và transactions
- 🖥️ **Customer Display**: Màn hình hiển thị cho khách hàng với real-time updates
- 📡 **Order Tracking**: Theo dõi đơn hàng real-time giữa nhân viên và khách hàng
- 🔍 **Tìm kiếm & Lọc**: Tìm kiếm sản phẩm và lọc theo danh mục
- ⚡ **Tốc độ cao**: Sử dụng Vite và lazy loading
- 🔄 **Real-time Sync**: Đồng bộ dữ liệu giữa POS và Customer Display qua BroadcastChannel

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
│   ├── layout/          # Layout components
│   │   ├── MainLayout.tsx
│   │   ├── POSLayoutNew.tsx
│   │   └── CustomerDisplayLayout.tsx
│   ├── pos/             # POS-specific components
│   │   ├── CartPanel.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductModal.tsx
│   │   ├── SidebarCategory.tsx
│   │   └── SidebarCategoryCustomer.tsx
│   ├── stock/           # Stock management components
│   │   ├── StockAdjustModal.tsx
│   │   ├── EmptyState.tsx
│   │   └── SearchBar.tsx
│   ├── shared/          # Shared components
│   │   ├── ButtonFilled.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── InputField.tsx
│   │   ├── StockAlertsPanel.tsx
│   │   └── StockInitializer.tsx
│   └── ui/              # UI components
│       └── Toast.tsx
├── context/             # React Context providers
│   ├── CartContext.tsx
│   ├── ProductContext.tsx
│   └── IngredientContext.tsx
├── hooks/               # Custom React hooks
│   ├── useCart.ts
│   ├── useProducts.ts
│   ├── useDisplaySync.ts
│   └── useOrderTracking.ts
├── pages/               # Page components
│   ├── CheckoutPage.tsx
│   ├── DashboardPage.tsx
│   ├── OrderDisplayPage.tsx
│   ├── OrderSuccessPage.tsx
│   ├── ProductDetailPage.tsx
│   └── StockManagementPage.tsx
├── router/              # Routing configuration
│   └── AppRouter.tsx
├── types/               # TypeScript type definitions
│   ├── cart.ts
│   ├── display.ts
│   └── product.ts
├── utils/               # Utility functions
│   ├── formatPrice.ts
│   ├── stockManagement.ts
│   └── ingredientManagement.ts
└── assets/              # Static assets
    ├── img/
    └── data/
```

## 🎨 Công nghệ sử dụng

### Frontend Stack
- **React 19.1.1** - UI Framework
- **TypeScript 5.9.3** - Type safety
- **Tailwind CSS 4.1.14** - Styling
- **React Router 7.9.4** - Client-side routing
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
- **BroadcastChannel API** - Real-time cross-tab communication
- **Custom Events** - Real-time in-tab communication

## 📱 Chức năng chính

### 🛒 Hệ thống POS (`/`)
- **Danh sách sản phẩm**: Hiển thị sản phẩm theo danh mục với sidebar navigation
- **Chi tiết sản phẩm**: Modal hiển thị thông tin chi tiết, chọn size, topping, ghi chú
- **Giỏ hàng**: Panel bên phải với thêm/sửa/xóa sản phẩm, tính tổng tiền
- **Real-time sync**: Đồng bộ dữ liệu với Customer Display ngay lập tức
- **Stock Alerts**: Hiển thị cảnh báo tồn kho thấp/hết hàng
- **Animations**: Hover effects, transitions mượt mà
- **Responsive**: Tối ưu cho mọi kích thước màn hình

### 🖥️ Customer Display (`/customer`)
- **Professional Design**: Giao diện chuyên nghiệp với animations
- **Real-time Updates**: Hiển thị đơn hàng ngay khi có thay đổi từ POS
- **Order Status**: Theo dõi trạng thái đơn hàng (creating, confirmed, paid, completed)
- **Payment Info**: Hiển thị phương thức thanh toán và trạng thái
- **Responsive Layout**: Layout tối ưu cho màn hình khách hàng
- **Việt hóa**: Giao diện hoàn toàn bằng tiếng Việt

### 📡 Order Tracking (`/orders`)
- **Real-time Tracking**: Theo dõi đơn hàng đang được tạo bởi nhân viên hoặc khách hàng
- **Dual View**: Nhân viên thấy đơn hàng của khách, khách thấy đơn hàng của nhân viên
- **Status Updates**: Cập nhật trạng thái real-time (creating → paid → preparing → completed)
- **Order Details**: Hiển thị chi tiết sản phẩm, số lượng, giá tiền
- **Auto Cleanup**: Tự động xóa đơn hàng đã hoàn thành sau 30 giây

### 💳 Thanh toán (`/checkout`)
- **Multiple Payment Methods**: Tiền mặt, thẻ ngân hàng, QR code
- **Customer Info**: Nhập thông tin khách hàng và bàn
- **Order Summary**: Xem lại đơn hàng trước khi thanh toán
- **Stock Deduction**: Tự động trừ tồn kho khi thanh toán thành công
- **Ingredient Deduction**: Tự động trừ nguyên liệu theo công thức sản phẩm
- **Order Tracking**: Cập nhật trạng thái đơn hàng sang "paid"

### ✅ Order Success (`/order-success`)
- **Success Confirmation**: Xác nhận đơn hàng đã được ghi nhận
- **Order Details**: Hiển thị chi tiết đơn hàng vừa thanh toán
- **Payment Info**: Thông tin phương thức thanh toán
- **Order ID**: Mã đơn hàng để tra cứu
- **Navigation**: Nút tạo đơn mới hoặc về trang chủ

### 📊 Dashboard Doanh Thu (`/dashboard`)
- **Doanh thu hàng ngày**: Tổng doanh thu, số đơn hàng, giá trị trung bình
- **So sánh hôm qua**: So sánh với ngày hôm qua
- **Sản phẩm bán chạy**: Top sản phẩm với số lượng và doanh thu
- **Biểu đồ doanh thu theo giờ**: Hiển thị doanh thu theo từng giờ trong ngày
- **Thống kê thanh toán**: Phân tích phương thức thanh toán (tiền mặt, thẻ, QR)
- **Đơn hàng gần đây**: Chi tiết các đơn hàng vừa hoàn thành
- **Real-time updates**: Cập nhật ngay khi có đơn hàng mới
- **Auto reset**: Tự động reset khi qua ngày mới
- **Reset Manual**: Nút reset dữ liệu với xác nhận

### 📦 Quản lý kho (`/stock-management`)
- **Tồn kho sản phẩm**: Xem và quản lý tồn kho tất cả sản phẩm
- **Tồn kho nguyên liệu**: Quản lý nguyên liệu và công thức
- **Nhập hàng**: Thêm hàng vào kho với giao dịch và lý do
- **Điều chỉnh**: Điều chỉnh tồn kho với lý do chi tiết
- **Giao dịch**: Lịch sử tất cả giao dịch kho (sản phẩm và nguyên liệu)
- **Cảnh báo**: Quản lý cảnh báo tồn kho thấp/hết hàng
- **Tìm kiếm**: Tìm kiếm sản phẩm/nguyên liệu theo tên
- **Lọc danh mục**: Lọc sản phẩm theo danh mục
- **Empty States**: Hiển thị trạng thái trống khi không có dữ liệu
- **Real-time Updates**: Cập nhật real-time khi có thay đổi

## 🔄 Real-time Synchronization

Hệ thống sử dụng nhiều cơ chế để đồng bộ dữ liệu real-time:

### Cơ chế đồng bộ
- **BroadcastChannel API**: Giao tiếp giữa các tab/window
- **localStorage**: Lưu trữ dữ liệu và đồng bộ cross-tab
- **Custom Events**: Cập nhật instant trong cùng tab
- **Storage Events**: Lắng nghe thay đổi localStorage
- **Polling**: Backup polling cho đảm bảo sync

### Data Flow
```
POS Page → CartContext → BroadcastChannel → localStorage → Custom Events
                                                              ↓
Dashboard/Customer Display/Order Tracking ← localStorage ← Storage Events
```

### Order Tracking Flow
```
Staff/Customer Order → useOrderTracking → BroadcastChannel → localStorage
                                                              ↓
Order Display Page ← subscribeToOrders ← localStorage ← Storage Events
```

## 📦 Stock Management System

### Tính năng quản lý kho
- **Product Stock Tracking**: Theo dõi tồn kho hiện tại, tối thiểu, tối đa
- **Ingredient Stock Tracking**: Quản lý nguyên liệu và công thức
- **Stock Operations**: Trừ hàng khi bán, thêm hàng khi nhập, điều chỉnh
- **Stock Transactions**: Ghi lại tất cả giao dịch kho với timestamp và lý do
- **Stock Alerts**: Cảnh báo tồn kho thấp, hết hàng, quá nhiều
- **Auto Initialization**: Tự động khởi tạo tồn kho cho sản phẩm mới
- **Recipe Management**: Quản lý công thức sản phẩm và trừ nguyên liệu tự động

### Cảnh báo tồn kho
- **Low Stock**: Cảnh báo khi tồn kho dưới mức tối thiểu
- **Out of Stock**: Cảnh báo khi hết hàng
- **Overstock**: Cảnh báo khi tồn kho quá cao
- **Real-time Alerts**: Hiển thị cảnh báo ngay lập tức
- **Alert Panel**: Panel cảnh báo ở góc màn hình

## 🎨 Design System

### Color Palette
- **Primary**: Orange tones (orange-500, orange-600) cho buttons và accents
- **Background**: Gray-50 cho background chính
- **Cards**: White với borders và shadows
- **Text**: Gray-800 (headings), Gray-700 (secondary), Gray-600 (tertiary)
- **Status Colors**: 
  - Green cho success/completed
  - Yellow cho warning/low stock
  - Red cho error/out of stock
  - Blue cho info

### Typography
- **Headings**: Large, bold với proper hierarchy
- **Body Text**: Clean gray colors cho readability
- **Status Text**: Bold với color coding
- **Professional**: Non-distracting cho customer experience

### Animations
- **Hover Effects**: Scale transforms và shadow changes
- **Fade In**: Smooth fade-in animations cho elements
- **Slide In**: Slide animations cho modals và panels
- **Pulse**: Pulse animations cho live feedback
- **Toast Notifications**: Smooth slide-in animations
- **Staggered Animations**: Delayed animations cho lists

## 🛣️ Routes

| Route | Mô tả | Layout |
|-------|-------|--------|
| `/` | POS System - Trang chủ | POSLayoutNew |
| `/product/:id` | Chi tiết sản phẩm | POSLayoutNew |
| `/customer` | Customer Display | CustomerDisplayLayout |
| `/checkout` | Thanh toán | POSLayoutNew |
| `/order-success` | Xác nhận đơn hàng | MainLayout |
| `/dashboard` | Dashboard doanh thu | MainLayout |
| `/stock-management` | Quản lý kho | MainLayout |
| `/orders` | Order Tracking | Standalone |

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

## 🔧 Cấu hình

### Environment Variables
Tạo file `.env.local` trong thư mục gốc (nếu cần):

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Ocha Việt POS
```

### Tailwind CSS
Cấu hình trong `tailwind.config.js` hoặc sử dụng Tailwind CSS v4 với PostCSS.

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
   - POS System: `http://localhost:3000/`
   - Customer Display: `http://localhost:3000/customer`
   - Dashboard: `http://localhost:3000/dashboard`
   - Stock Management: `http://localhost:3000/stock-management`
   - Order Tracking: `http://localhost:3000/orders`
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
- Sử dụng TypeScript với proper types

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
