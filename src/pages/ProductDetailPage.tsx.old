import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice, formatRating } from '../utils/formatPrice';
import ButtonFilled from '../components/shared/ButtonFilled';
import RatingStars from '../components/shared/RatingStars';
import NotFoundPage from './NotFoundPage';
import toast from 'react-hot-toast';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addItem } = useCart();

  const product = products.find(p => p.id === parseInt(id || '0'));

  if (!product) {
    return <NotFoundPage />;
  }

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <button onClick={handleGoBack} className="hover:text-primary transition-colors">
              <i className="fas fa-arrow-left mr-1"></i>
              Quay lại
            </button>
            <span>/</span>
            <span>{product.category}</span>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <RatingStars rating={product.rating} size="lg" />
                <span className="text-gray-500">({product.rating} đánh giá)</span>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <i className="fas fa-map-marker-alt text-primary"></i>
                <span className="text-gray-600">{product.restaurant}</span>
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <i className="fas fa-tag text-gray-500"></i>
                <span className="text-gray-600">{product.category}</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">
                {formatPrice(product.price)}
              </div>
              {product.discount && (
                <div className="text-sm text-gray-500">
                  Giảm {product.discount}% từ {formatPrice(product.price / (1 - product.discount / 100))}
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mô tả</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Availability */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={product.isAvailable ? 'text-green-600' : 'text-red-600'}>
                {product.isAvailable ? 'Có sẵn' : 'Hết hàng'}
              </span>
            </div>

            {/* Add to Cart Button */}
            <div className="pt-6">
              <ButtonFilled
                onClick={handleAddToCart}
                variant="primary"
                size="lg"
                className="w-full"
                disabled={!product.isAvailable}
              >
                <i className="fas fa-shopping-cart mr-2"></i>
                {product.isAvailable ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
              </ButtonFilled>
            </div>

            {/* Additional Info */}
            <div className="pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Thời gian chuẩn bị:</span>
                  <span className="ml-2 font-medium">15-20 phút</span>
                </div>
                <div>
                  <span className="text-gray-500">Phí giao hàng:</span>
                  <span className="ml-2 font-medium">Miễn phí</span>
                </div>
                <div>
                  <span className="text-gray-500">Đánh giá:</span>
                  <span className="ml-2 font-medium">{formatRating(product.rating)}/5</span>
                </div>
                <div>
                  <span className="text-gray-500">Danh mục:</span>
                  <span className="ml-2 font-medium">{product.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
