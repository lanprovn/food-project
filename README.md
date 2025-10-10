# Phở Việt - Website Giao Đồ Ăn

Một website thương mại điện tử hoàn chỉnh về giao đồ ăn được xây dựng bằng React + TypeScript + Tailwind CSS, hoàn toàn bằng tiếng Việt.

## 🌟 Tính năng chính

### 🛒 Giỏ hàng (Cart)
- Thêm, xóa, tăng/giảm số lượng sản phẩm
- Lưu trữ trong localStorage
- Tính toán tổng tiền, phí giao hàng, thuế
- Sidebar cart với animation mượt mà

### 👤 Tài khoản người dùng (Authentication)
- Đăng nhập/Đăng ký với mock data
- Lưu thông tin user vào localStorage
- Hiển thị tên user ở header
- User menu với dropdown

### ❤️ Danh sách yêu thích (Wishlist)
- Thêm/xóa sản phẩm khỏi wishlist
- Lưu trữ trong localStorage
- Hiển thị số lượng ở header
- Trang wishlist riêng biệt

### 🔍 Tìm kiếm và lọc
- Tìm kiếm theo tên món ăn, nhà hàng, danh mục
- Lọc theo danh mục sản phẩm
- Kết quả tìm kiếm real-time

### 📱 Responsive Design
- Hoàn toàn responsive trên mọi thiết bị
- Mobile menu với offcanvas
- Grid layout linh hoạt
- Touch-friendly interface

### 🎨 UI/UX hiện đại
- Gradient buttons với hover effects
- Card hover animations
- Toast notifications
- Loading states
- Smooth transitions

## 🚀 Công nghệ sử dụng

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM 7
- **State Management**: Context API
- **Notifications**: React Hot Toast
- **Icons**: Font Awesome
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 18+ 
- npm 9+

### Cài đặt dependencies
```bash
npm install
```

### Chạy development server
```bash
npm run dev
```

### Build cho production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## 📁 Cấu trúc dự án

```
src/
├── components/
│   ├── auth/           # Components đăng nhập/đăng ký
│   ├── cart/           # Components giỏ hàng
│   ├── home/           # Components trang chủ
│   ├── layout/         # Components layout (Header, Footer, Navbar)
│   ├── product/        # Components sản phẩm
│   ├── shared/         # Components dùng chung
│   └── ui/             # UI components (Modal, Toast, Dropdown)
├── context/            # React Context providers
├── hooks/              # Custom hooks
├── pages/              # Page components
├── router/             # Router configuration
├── service/             # API service (axios instance)
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── assets/              # Static assets (images, data)
```

## 🎯 Tính năng đã hoàn thành

### ✅ Việt hóa hoàn toàn
- Tất cả text đều bằng tiếng Việt
- Định dạng tiền tệ Việt Nam (VND)
- Thông báo lỗi tiếng Việt
- Placeholder và label tiếng Việt

### ✅ Chức năng thương mại điện tử
- Giỏ hàng với localStorage
- Thanh toán với form validation
- Đăng nhập/đăng ký mock
- Tìm kiếm và lọc sản phẩm
- Danh sách yêu thích
- Responsive design

### ✅ UI/UX chuyên nghiệp
- Design system nhất quán
- Animations và transitions
- Toast notifications
- Loading states
- Error handling

### ✅ Tối ưu hiệu suất
- Code splitting
- Lazy loading
- Optimized images
- Efficient state management

## 🔧 Cấu hình

### Environment Variables
Tạo file `.env.local` để cấu hình:
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Phở Việt
```

### Tailwind CSS
Cấu hình trong `tailwind.config.js`:
- Primary color: #F54748 (đỏ cam)
- Secondary color: #FDC55E (vàng nhạt)
- Font family: Poppins, Inter

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Design System

### Colors
- Primary: #F54748 (đỏ cam)
- Secondary: #FDC55E (vàng nhạt)
- Success: #10b981 (xanh lá)
- Error: #ef4444 (đỏ)
- Warning: #f59e0b (cam)

### Typography
- Font family: Poppins, Inter
- Headings: font-weight 600-700
- Body: font-weight 400-500

### Spacing
- Base unit: 4px
- Common spacing: 8px, 16px, 24px, 32px

## 🚀 Deployment

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
npm run build
npm run deploy
```

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👥 Tác giả

- **Phở Việt Team** - *Initial work* - [Phở Việt](https://github.com/phoviet)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React Router](https://reactrouter.com/) - Declarative routing for React
- [React Hot Toast](https://react-hot-toast.com/) - Smoking hot React notifications

## 📞 Liên hệ

- **Email**: info@phoviet.com
- **Phone**: +84 123 456 789
- **Website**: [phoviet.com](https://phoviet.com)

---

⭐ Nếu dự án này hữu ích, hãy cho chúng tôi một star trên GitHub!