import React, { useState, useEffect } from 'react';
import type { Product, Size, Topping } from '../../types/product';
import { useCart } from '../../hooks/useCart';
import { StarIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<Size | undefined>(undefined);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  // Initialize with first size if available
  useEffect(() => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product.sizes, selectedSize]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const calculateTotalPrice = () => {
    const base = product.price;
    const sizePrice = selectedSize?.extraPrice || 0;
    const toppingPrice = selectedToppings.reduce((sum, t) => sum + t.extraPrice, 0);
    return (base + sizePrice + toppingPrice) * quantity;
  };

  const handleAddToCart = () => {
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
    
    onClose();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="pos-heading-2 text-gray-800">Chi tiết món</h2>
          <button
            onClick={onClose}
            className="pos-touch-target p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Product Image and Basic Info */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="md:w-1/2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/src/assets/img/gallery/default-food.png';
                }}
              />
            </div>
            
            <div className="md:w-1/2">
              <h3 className="pos-heading-2 text-gray-800 mb-2">
                {product.name}
              </h3>
              
              <div className="flex items-center mb-3">
                <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="pos-body text-gray-600 font-medium">
                  {product.rating} • {product.restaurant}
                </span>
              </div>
              
              <p className="pos-body text-gray-600 mb-4">
                {product.description}
              </p>
              
              <div className="pos-heading-2 text-primary">
                {formatPrice(product.price)}
              </div>
            </div>
          </div>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h4 className="pos-heading-3 text-gray-800 mb-3">Chọn size</h4>
              <div className="grid grid-cols-3 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 rounded-lg border-2 transition-colors pos-touch-target ${
                      selectedSize?.name === size.name
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="font-semibold pos-body-sm">{size.name}</div>
                    {size.extraPrice > 0 && (
                      <div className="pos-caption text-gray-500">
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
            <div className="mb-6">
              <h4 className="pos-heading-3 text-gray-800 mb-3">Chọn topping</h4>
              <div className="grid grid-cols-2 gap-3">
                {product.toppings.map((topping) => {
                  const isSelected = selectedToppings.some(t => t.name === topping.name);
                  return (
                    <button
                      key={topping.name}
                      onClick={() => handleToppingToggle(topping)}
                      className={`p-3 rounded-lg border-2 transition-colors text-left pos-touch-target ${
                        isSelected
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <div className="font-semibold pos-body-sm">{topping.name}</div>
                      {topping.extraPrice > 0 && (
                        <div className="pos-caption text-gray-500">
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
          <div className="mb-6">
            <h4 className="pos-heading-3 text-gray-800 mb-3">Số lượng</h4>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="pos-touch-target w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600 transition-colors duration-200"
              >
                -
              </button>
              <span className="pos-heading-3 text-gray-800 min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="pos-touch-target w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600 transition-colors duration-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Note */}
          <div className="mb-6">
            <h4 className="pos-heading-3 text-gray-800 mb-3">Ghi chú đặc biệt</h4>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ví dụ: Không cay, ít đường..."
              className="pos-input resize-none"
              rows={3}
            />
          </div>

          {/* Total Price */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center">
              <span className="pos-body-lg font-semibold text-gray-800">Tổng cộng:</span>
              <span className="pos-heading-1 text-primary">
                {formatPrice(calculateTotalPrice())}
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="pos-btn-primary pos-btn-xl w-full"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
