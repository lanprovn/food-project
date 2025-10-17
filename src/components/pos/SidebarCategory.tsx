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
    <div className="w-full h-full bg-white overflow-y-auto scrollbar-hide">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Danh mục</h2>
        
        {/* All Categories */}
        <button
          onClick={() => onCategorySelect('all')}
          className={`w-full flex items-center justify-between p-4 rounded-lg mb-3 min-h-[44px] min-w-[44px] transition-all duration-300 ${
            selectedCategory === 'all'
              ? 'bg-[#ff5a3c]/10 text-[#ff5a3c] border-2 border-[#ff5a3c]/20 shadow-sm'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200'
          }`}
        >
          <div className="flex items-center">
            <span className="text-2xl mr-3">🍽️</span>
            <span className="font-semibold text-base">Tất cả món</span>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold leading-none bg-gray-200 text-gray-700">
            {categories.reduce((sum, cat) => sum + (cat.productCount || 0), 0)}
          </span>
        </button>

        {/* Category List */}
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.name)}
              className={`w-full flex items-center justify-between p-4 rounded-lg min-h-[44px] min-w-[44px] transition-all duration-300 ${
                selectedCategory === category.name
                  ? 'bg-[#ff5a3c]/10 text-[#ff5a3c] border-2 border-[#ff5a3c]/20 shadow-sm'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200'
              }`}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{getCategoryIcon(category.name)}</span>
                <span className="font-semibold text-base">{category.name}</span>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold leading-none bg-gray-200 text-gray-700">
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
