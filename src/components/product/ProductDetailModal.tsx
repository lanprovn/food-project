import React from 'react';
import type { Product } from '../../types/product';
import { formatPrice, formatRating } from '../../utils/formatPrice';
import { useCart } from '../../hooks/useCart';
import ButtonFilled from '../shared/ButtonFilled';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { addItem } = useCart();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addItem(product);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-1/2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
              />
            </div>
            
            {/* Content */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-2">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                  <span className="text-primary font-medium">{product.restaurant}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-2">
                    <i className="fas fa-star"></i>
                  </span>
                  <span className="text-primary font-medium">{formatRating(product.rating)}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">
                    <i className="fas fa-tag"></i>
                  </span>
                  <span className="text-gray-700">{product.category}</span>
                </div>
                
                <div className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </div>
                
                {product.description && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Mô tả</h3>
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                )}
              </div>
              
              <ButtonFilled
                onClick={handleAddToCart}
                variant="primary"
                size="lg"
                className="w-full"
              >
                <i className="fas fa-shopping-cart mr-2"></i>
                Thêm vào giỏ
              </ButtonFilled>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailModal;
