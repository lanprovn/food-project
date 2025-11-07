import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import type { Size, Topping } from '../types/product';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { StarIcon } from '@heroicons/react/24/solid';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isCustomerDisplay = location.pathname.startsWith('/customer');
  const { products } = useProducts();
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<Size | undefined>(undefined);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  const product = products.find(p => p.id === parseInt(id || '0'));

  // Initialize with first size if available
  useEffect(() => {
    if (product?.sizes && product.sizes.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product?.sizes, selectedSize]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const calculateTotalPrice = () => {
    if (!product) return 0;
    const base = product.price;
    const sizePrice = selectedSize?.extraPrice || 0;
    const toppingPrice = selectedToppings.reduce((sum, t) => sum + t.extraPrice, 0);
    return (base + sizePrice + toppingPrice) * quantity;
  };

  const handleAddToCart = () => {
    if (!product) return;

    const totalPrice = calculateTotalPrice();

    addToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      basePrice: product.price,
      selectedSize,
      selectedToppings,
      note,
      quantity,
      totalPrice,
    });

    // Reset form
    setSelectedSize(product.sizes?.[0] || undefined);
    setSelectedToppings([]);
    setQuantity(1);
    setNote('');
  };

  const handleToppingToggle = (topping: Topping) => {
    setSelectedToppings(prev => {
      const isSelected = prev.some(t => t.name === topping.name);
      if (isSelected) {
        return prev.filter(t => t.name !== topping.name);
      } else {
        return [...prev, topping];
      }
    });
  };

  if (!product) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">❌</div>
          <h2 className="text-xl font-semibold text-gray-600 mb-3">
            Không tìm thấy sản phẩm
          </h2>
          <p className="text-gray-500 mb-6">
            Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <button
            onClick={() => navigate(isCustomerDisplay ? '/customer' : '/')}
            className={`font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${isCustomerDisplay
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white'
              : 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white'
              }`}
          >
            {isCustomerDisplay ? 'Quay lại Menu' : 'Quay lại POS'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mobile Category Filter */}
      <div className="lg:hidden mb-6">
        <div className="flex overflow-x-auto pb-2">
          <button
            onClick={() => { }}
            className="flex-shrink-0 px-4 py-2 rounded-full mr-2 transition-all duration-300 bg-orange-500 text-white"
          >
            Chi tiết sản phẩm
          </button>
        </div>
      </div>

      {/* Product Detail Content */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-lg group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/src/assets/img/gallery/default-food.png';
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4 transition-all duration-300 hover:text-orange-600">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200 transition-all duration-300 hover:shadow-md">
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1 animate-pulse" />
                  <span className="text-gray-600 font-medium">
                    {product.rating} • {product.restaurant}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed transition-all duration-300">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-500 transition-all duration-300 hover:scale-105 inline-block">
                {formatPrice(product.price)}
              </div>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Chọn size</h3>
                <div className="grid grid-cols-3 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${selectedSize?.name === size.name
                        ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md text-gray-700 bg-white'
                        }`}
                    >
                      <div className="font-semibold text-sm">{size.name}</div>
                      {size.extraPrice > 0 && (
                        <div className="text-xs text-gray-500">
                          +{formatPrice(size.extraPrice)}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Topping Selection */}
            {product.toppings && product.toppings.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Chọn topping</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.toppings.map((topping) => {
                    const isSelected = selectedToppings.some(t => t.name === topping.name);
                    return (
                      <button
                        key={topping.name}
                        onClick={() => handleToppingToggle(topping)}
                        className={`p-3 rounded-lg border-2 transition-all duration-300 text-left transform hover:scale-105 relative ${isSelected
                          ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md text-gray-700 bg-white'
                          }`}
                      >
                        <div className="font-semibold text-sm flex items-center justify-between">
                          <span>{topping.name}</span>
                          {isSelected && (
                            <svg className="w-4 h-4 text-orange-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        {topping.extraPrice > 0 && (
                          <div className="text-xs text-gray-500">
                            +{formatPrice(topping.extraPrice)}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Số lượng</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600 transition-all duration-200 hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
                >
                  -
                </button>
                <span className="text-lg font-semibold text-gray-800 min-w-[3rem] text-center transition-all duration-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-orange-100 hover:bg-orange-200 flex items-center justify-center font-bold text-orange-600 transition-all duration-200 hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Note */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Ghi chú đặc biệt</h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ví dụ: Không cay, ít đường..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 resize-none hover:border-gray-400"
                rows={3}
              />
            </div>

            {/* Total Price */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">Tổng cộng:</span>
                <span className="text-2xl font-bold text-orange-500 transition-all duration-300 hover:scale-110 inline-block">
                  {formatPrice(calculateTotalPrice())}
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-4 px-6 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;