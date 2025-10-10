import React, { useState } from 'react';
import type { Category } from '../types/product';

interface CategorySectionProps {
  categories: Category[];
  className?: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  categories,
  className = '',
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 6;

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev + itemsPerSlide >= categories.length ? 0 : prev + itemsPerSlide
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev - itemsPerSlide < 0 
        ? Math.max(0, categories.length - itemsPerSlide)
        : prev - itemsPerSlide
    );
  };

  const visibleCategories = categories.slice(
    currentSlide,
    currentSlide + itemsPerSlide
  );

  return (
    <section className={`py-16 overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
          <div className="text-center lg:text-left mb-4 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Tìm kiếm theo món ăn
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-primary transition-colors">
              XEM TẤT CẢ <i className="fas fa-chevron-right ml-2"></i>
            </button>
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <i className="fas fa-chevron-left text-gray-600"></i>
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <i className="fas fa-chevron-right text-gray-600"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {visibleCategories.map((category) => (
            <div
              key={category.id}
              className="text-center cursor-pointer group"
            >
              <div className="relative mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
