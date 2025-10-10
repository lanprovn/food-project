import React from 'react';
import type { Category } from '../../types/product';

interface SidebarCategoryProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryName: string) => void;
}

const SidebarCategory: React.FC<SidebarCategoryProps> = ({
  categories,
  selectedCategory,
  onCategorySelect
}) => {
  const getCategoryIcon = (categoryName: string) => {
    const iconMap: { [key: string]: string } = {
      'Cà Phê': '☕',
      'Bánh Ngọt': '🧁',
      'Burger': '🍔',
      'Mì Noodles': '🍜',
      'Sandwich': '🥪',
      'Đồ Uống Lạnh': '🧊',
      'Gà Rán': '🍗',
      'Pizza': '🍕',
      'Trà': '🍵',
      'Thịt Nướng': '🥩',
      'Súp': '🍲'
    };
    return iconMap[categoryName] || '🍽️';
  };

  return (
    <div className="w-80 bg-white shadow-lg border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Danh mục</h2>
        
        {/* All Categories */}
        <button
          onClick={() => onCategorySelect('all')}
          className={`w-full flex items-center justify-between p-4 rounded-lg mb-3 transition-colors duration-200 ${
            selectedCategory === 'all'
              ? 'bg-orange-100 text-orange-700 border-2 border-orange-300'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'
          }`}
        >
          <div className="flex items-center">
            <span className="text-2xl mr-3">🍽️</span>
            <span className="font-semibold">Tất cả món</span>
          </div>
          <span className="text-sm text-gray-500">
            {categories.reduce((sum, cat) => sum + (cat.productCount || 0), 0)}
          </span>
        </button>

        {/* Category List */}
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.name)}
              className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors duration-200 ${
                selectedCategory === category.name
                  ? 'bg-orange-100 text-orange-700 border-2 border-orange-300'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{getCategoryIcon(category.name)}</span>
                <span className="font-semibold">{category.name}</span>
              </div>
              <span className="text-sm text-gray-500">
                {category.productCount || 0}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarCategory;
