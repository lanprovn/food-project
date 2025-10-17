# Customer Display - Split Layout Design Guide

## 🎨 **Layout mới đã được thiết kế theo yêu cầu!**

### ✨ **Split Layout - 70% Left / 30% Right:**

**1️⃣ Left Side (70%) - Order Items:**
- ✅ **Customer Info Card**: Hiển thị thông tin khách hàng với avatar và checkmark
- ✅ **Order Items Container**: Danh sách các món đã order với scroll
- ✅ **Responsive Design**: Tự động scroll khi có nhiều items
- ✅ **Modern Cards**: Mỗi item là một card riêng với hover effects

**2️⃣ Right Side (30%) - Price Summary:**
- ✅ **Order Summary Panel**: Khung giá tiền với gradient background
- ✅ **Total Price**: Hiển thị tổng tiền nổi bật
- ✅ **Order Details**: Thời gian order, phương thức thanh toán
- ✅ **Progress Bar**: Thanh tiến trình với gradient fill
- ✅ **Status Badge**: Trạng thái đơn hàng với animation

### 🎯 **Layout Structure:**

```
┌─────────────────────────────────────────────────────────────┐
│                        Header (Full Width)                  │
├─────────────────────────────────┬───────────────────────────┤
│                                 │                           │
│        Left Side (70%)          │    Right Side (30%)       │
│                                 │                           │
│  ┌─────────────────────────┐   │  ┌─────────────────────┐  │
│  │    Customer Info        │   │  │   Order Summary     │  │
│  └─────────────────────────┘   │  │                     │  │
│                                 │  │   Total Price       │  │
│  ┌─────────────────────────┐   │  │                     │  │
│  │                         │   │  │   Order Details     │  │
│  │    Order Items          │   │  │                     │  │
│  │    (Scrollable)         │   │  │   Progress Bar      │  │
│  │                         │   │  │                     │  │
│  │                         │   │  │   Status Badge      │  │
│  └─────────────────────────┘   │  └─────────────────────┘  │
│                                 │                           │
└─────────────────────────────────┴───────────────────────────┘
│                        Footer (Full Width)                  │
└─────────────────────────────────────────────────────────────┘
```

### 🎨 **Design Features:**

**Left Side (70%):**
- **Grid System**: `col-span-7` trong `grid-cols-10`
- **Scrollable Content**: `overflow-y-auto max-h-[calc(100vh-300px)]`
- **Card Layout**: Mỗi item là card riêng với border và hover effects
- **Compact Design**: Smaller images và spacing để fit nhiều items

**Right Side (30%):**
- **Grid System**: `col-span-3` trong `grid-cols-10`
- **Fixed Height**: `h-full flex flex-col` để fill toàn bộ chiều cao
- **Gradient Background**: Dark gradient từ gray → blue → purple
- **Centered Content**: Text và elements được center align

### 🚀 **Technical Implementation:**

**Grid Layout:**
```css
grid grid-cols-10 gap-8 h-full
col-span-7  /* Left side - 70% */
col-span-3  /* Right side - 30% */
```

**Scrollable Container:**
```css
overflow-y-auto max-h-[calc(100vh-300px)]
```

**Flex Layout for Right Panel:**
```css
h-full flex flex-col
mt-auto  /* Push status to bottom */
```

**Responsive Cards:**
```css
space-y-4  /* Vertical spacing between cards */
rounded-xl border border-gray-100
hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50
```

### 🎯 **Content Organization:**

**Left Side Content:**
1. **Customer Info** (nếu có)
   - Avatar với gradient background
   - Customer name và table number
   - Checkmark indicator

2. **Order Items List**
   - Header với item count
   - Scrollable list of items
   - Each item: image, name, options, price, quantity

**Right Side Content:**
1. **Order Summary Header**
   - Title với gradient text
   - Item count

2. **Order Details**
   - Order time với clock icon
   - Payment method (nếu paid)

3. **Total Price**
   - Large gradient text
   - "Total Amount" label

4. **Progress Bar**
   - Status text và percentage
   - Gradient fill bar

5. **Status Badge**
   - Current order status
   - Animated pulse dot

### 🎨 **Visual Hierarchy:**

**Left Side Priority:**
1. Customer Info (top)
2. Order Items (main content)
3. Scrollable area for many items

**Right Side Priority:**
1. Order Summary (header)
2. Total Price (most prominent)
3. Order Details (secondary)
4. Progress Bar (status)
5. Status Badge (bottom)

### 🎯 **Kết quả:**

- ✅ **Perfect Split**: 70% left / 30% right ratio
- ✅ **Scrollable Items**: Handle nhiều items mà không bị overflow
- ✅ **Fixed Price Panel**: Luôn hiển thị tổng tiền và status
- ✅ **Professional Layout**: Clean và organized
- ✅ **Responsive Design**: Works trên mọi screen sizes
- ✅ **Modern UI**: Gradient backgrounds và animations

**Layout giờ đây hoàn hảo cho việc hiển thị order items và price summary!** 🎨✨📱
