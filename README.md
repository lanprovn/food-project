# Phở Việt - Hệ thống POS Order Web

## 🎯 Tổng quan

Phở Việt là một hệ thống POS (Point of Sale) order web hoàn chỉnh được xây dựng bằng React + TypeScript + Tailwind CSS. Hệ thống cho phép khách hàng tại quán chọn món ăn, tùy chỉnh size, topping, ghi chú đặc biệt, tính giá realtime và thanh toán tại quầy.

## ✨ Tính năng chính

### 🍽️ Hệ thống POS
- **Layout 3 vùng**: Sidebar danh mục, Grid sản phẩm, Panel giỏ hàng
- **Responsive design**: Hoạt động tốt trên desktop và tablet
- **Real-time pricing**: Tính giá tự động theo size, topping và số lượng
- **Cart management**: Quản lý giỏ hàng với localStorage persistence

### 🛍️ Quản lý sản phẩm
- **Size options**: Nhỏ, Vừa, Lớn với giá khác nhau
- **Topping system**: Thêm topping với giá phụ thu
- **Product details**: Ảnh, mô tả, rating, nhà hàng
- **Category filtering**: Lọc theo danh mục sản phẩm

### 💰 Thanh toán
- **Multiple payment methods**: Tiền mặt, QR Code, Thẻ ngân hàng
- **Order confirmation**: Trang xác nhận đơn hàng thành công
- **Customer info**: Thu thập thông tin khách hàng và số bàn

### 🎨 Giao diện người dùng
- **Modern UI**: Thiết kế phẳng với màu sắc dịu nhẹ
- **Animations**: Hiệu ứng hover, transition mượt mà
- **Toast notifications**: Thông báo khi thêm/xóa sản phẩm
- **Loading states**: Trạng thái tải cho các thao tác

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js >= 16.0.0
- npm >= 8.0.0

### Cài đặt dependencies
```bash
npm install
```

### Chạy development server
```bash
npm run dev
```

### Build production
```bash
npm run build
```

## 📁 Cấu trúc dự án

```
src/
├── components/
│   ├── pos/                    # Components cho hệ thống POS
│   │   ├── CartPanel.tsx      # Panel giỏ hàng bên phải
│   │   ├── ProductCard.tsx    # Card sản phẩm
│   │   ├── ProductGrid.tsx    # Grid hiển thị sản phẩm
│   │   ├── ProductModal.tsx   # Modal chi tiết sản phẩm
│   │   └── SidebarCategory.tsx # Sidebar danh mục
│   └── ...
├── context/
│   ├── CartContext.tsx         # Context quản lý giỏ hàng
│   └── ProductContext.tsx     # Context quản lý sản phẩm
├── pages/
│   ├── POSPage.tsx            # Trang chính của hệ thống POS
│   ├── CheckoutPage.tsx       # Trang thanh toán
│   ├── OrderSuccessPage.tsx   # Trang xác nhận đơn hàng
│   └── ...
├── types/
│   ├── cart.ts               # Types cho giỏ hàng
│   └── product.ts            # Types cho sản phẩm
├── assets/
│   └── products.json         # Dữ liệu sản phẩm với size/topping
└── ...
```

## 🎮 Cách sử dụng

### 1. Truy cập hệ thống POS
- Mở trình duyệt và truy cập `http://localhost:3002/pos`
- Hoặc click nút "Mở hệ thống POS" từ trang chủ

### 2. Chọn sản phẩm
- Chọn danh mục từ sidebar bên trái
- Click vào sản phẩm để mở modal chi tiết
- Chọn size, topping, số lượng và ghi chú
- Click "Thêm vào giỏ hàng"

### 3. Quản lý giỏ hàng
- Xem giỏ hàng ở panel bên phải
- Tăng/giảm số lượng hoặc xóa sản phẩm
- Tổng tiền được tính tự động

### 4. Thanh toán
- Click "Thanh toán" để chuyển đến trang checkout
- Nhập thông tin khách hàng
- Chọn phương thức thanh toán
- Hoàn tất đơn hàng

## 🔧 Công nghệ sử dụng

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **State Management**: React Context API
- **Routing**: React Router
- **Build Tool**: Vite
- **Package Manager**: npm

## 📊 Dữ liệu sản phẩm

Hệ thống sử dụng file `src/assets/products.json` chứa:
- Thông tin sản phẩm: tên, giá, ảnh, mô tả
- Size options: Nhỏ, Vừa, Lớn với extraPrice
- Topping options: Các topping với extraPrice
- Categories: Danh mục sản phẩm
- Restaurants: Thông tin nhà hàng

## 🎯 Logic tính giá

```typescript
const basePrice = product.price;
const sizePrice = selectedSize?.extraPrice || 0;
const toppingPrice = selectedToppings.reduce((sum, t) => sum + t.extraPrice, 0);
const totalPrice = (basePrice + sizePrice + toppingPrice) * quantity;
```

## 💾 Lưu trữ dữ liệu

- **Cart persistence**: Giỏ hàng được lưu trong localStorage
- **Session data**: Dữ liệu được giữ qua refresh trang
- **No backend required**: Hoạt động hoàn toàn frontend

## 🔮 Tính năng tương lai

- [ ] Tích hợp backend API
- [ ] Quản lý đơn hàng real-time
- [ ] Báo cáo doanh thu
- [ ] Quản lý kho hàng
- [ ] Hệ thống khuyến mãi
- [ ] Tích hợp payment gateway
- [ ] Mobile app

## 📝 Ghi chú phát triển

- Hệ thống được thiết kế để dễ dàng mở rộng
- Code được viết với TypeScript để đảm bảo type safety
- Component được tách biệt rõ ràng để dễ maintain
- Responsive design hỗ trợ nhiều thiết bị

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Tác giả

**Lan Pro** - [@lanprovn](https://github.com/lanprovn)

## 🙏 Lời cảm ơn

- React team cho framework tuyệt vời
- Tailwind CSS cho utility-first CSS framework
- Heroicons cho icon set đẹp
- Cộng đồng open source

---

⭐ Nếu project này hữu ích, hãy cho một star nhé!