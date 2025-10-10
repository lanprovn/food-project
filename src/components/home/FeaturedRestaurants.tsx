import React from 'react';
import type { Restaurant } from '../../types/product';
import SectionTitle from '../shared/SectionTitle';
import ButtonFilled from '../shared/ButtonFilled';

interface FeaturedRestaurantsProps {
  restaurants: Restaurant[];
  className?: string;
}

const FeaturedRestaurants: React.FC<FeaturedRestaurantsProps> = ({
  restaurants,
  className = '',
}) => {
  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          title="Nhà hàng nổi bật"
          centered
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 space-y-2">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                    <i className="fas fa-tag mr-1"></i>
                    20% off
                  </span>
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm block">
                    <i className="fas fa-clock mr-1"></i>
                    {restaurant.deliveryTime}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 rounded-full mr-3 bg-gray-200 flex items-center justify-center">
                    <i className="fas fa-utensils text-gray-600"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{restaurant.name}</h3>
                    <div className="flex items-center">
                      <i className="fas fa-star text-yellow-500 mr-1"></i>
                      <span className="text-primary">{restaurant.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-600">
                    Đang mở cửa
                  </span>
                  <span className="text-sm text-gray-600">
                    Phí giao hàng: {restaurant.deliveryFee.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <ButtonFilled variant="primary" size="lg">
            Xem tất cả <i className="fas fa-chevron-right ml-2"></i>
          </ButtonFilled>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
