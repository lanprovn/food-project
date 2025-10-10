import React from 'react';
import { useWishlist } from '../hooks/useWishlist';
import ProductGrid from '../components/product/ProductGrid';
import SectionTitle from '../components/shared/SectionTitle';
import ButtonFilled from '../components/shared/ButtonFilled';
import { useNavigate } from 'react-router-dom';

const WishlistPage: React.FC = () => {
  const { items, clearWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleClearWishlist = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm yêu thích?')) {
      clearWishlist();
    }
  };

  const handleContinueShopping = () => {
    navigate('/menu');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <SectionTitle
            title="Danh sách yêu thích"
            subtitle="Các món ăn bạn đã thêm vào yêu thích"
            centered
            className="mb-12"
          />
          
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <i className="fas fa-heart text-6xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Danh sách yêu thích trống</h2>
            <p className="text-gray-600 mb-6">Bạn chưa thêm món ăn nào vào danh sách yêu thích.</p>
            <ButtonFilled variant="primary" size="lg" onClick={handleContinueShopping}>
              <i className="fas fa-utensils mr-2"></i>
              Khám phá thực đơn
            </ButtonFilled>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <SectionTitle
            title="Danh sách yêu thích"
            subtitle={`${items.length} món ăn bạn yêu thích`}
            className="mb-4 md:mb-0"
          />
          
          <div className="flex space-x-4">
            <ButtonFilled
              variant="secondary"
              size="md"
              onClick={handleClearWishlist}
            >
              <i className="fas fa-trash mr-2"></i>
              Xóa tất cả
            </ButtonFilled>
            <ButtonFilled
              variant="primary"
              size="md"
              onClick={handleContinueShopping}
            >
              <i className="fas fa-plus mr-2"></i>
              Thêm món khác
            </ButtonFilled>
          </div>
        </div>

        <ProductGrid
          products={items}
          columns={4}
        />
      </div>
    </div>
  );
};

export default WishlistPage;
