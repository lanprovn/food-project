import React from 'react';

interface ProductTagProps {
  tags: string[];
  maxDisplay?: number;
}

const ProductTag: React.FC<ProductTagProps> = ({ tags, maxDisplay = 3 }) => {
  if (!tags || tags.length === 0) return null;

  const getTagConfig = (tag: string) => {
    const tagConfigs: Record<string, { icon: string; color: string; bgColor: string }> = {
      'hot': { icon: 'fas fa-fire', color: 'text-red-600', bgColor: 'bg-red-50' },
      'cold': { icon: 'fas fa-snowflake', color: 'text-blue-600', bgColor: 'bg-blue-50' },
      'sweet': { icon: 'fas fa-candy-cane', color: 'text-pink-600', bgColor: 'bg-pink-50' },
      'spicy': { icon: 'fas fa-pepper-hot', color: 'text-orange-600', bgColor: 'bg-orange-50' },
      'healthy': { icon: 'fas fa-leaf', color: 'text-green-600', bgColor: 'bg-green-50' },
      'popular': { icon: 'fas fa-star', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
      'new': { icon: 'fas fa-sparkles', color: 'text-purple-600', bgColor: 'bg-purple-50' },
      'discount': { icon: 'fas fa-tag', color: 'text-red-700', bgColor: 'bg-red-100' },
      'vegetarian': { icon: 'fas fa-seedling', color: 'text-green-700', bgColor: 'bg-green-100' },
      'premium': { icon: 'fas fa-crown', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
    };

    return tagConfigs[tag.toLowerCase()] || { 
      icon: 'fas fa-tag', 
      color: 'text-gray-600', 
      bgColor: 'bg-gray-50' 
    };
  };

  const getTagName = (tag: string) => {
    const tagNames: Record<string, string> = {
      'hot': 'Nóng',
      'cold': 'Lạnh',
      'sweet': 'Ngọt',
      'spicy': 'Cay',
      'healthy': 'Tốt cho sức khỏe',
      'popular': 'Phổ biến',
      'new': 'Mới',
      'discount': 'Giảm giá',
      'vegetarian': 'Chay',
      'premium': 'Cao cấp',
    };

    return tagNames[tag.toLowerCase()] || tag;
  };

  const displayedTags = tags.slice(0, maxDisplay);
  const remainingCount = tags.length - maxDisplay;

  return (
    <div className="flex flex-wrap gap-1">
      {displayedTags.map((tag, index) => {
        const config = getTagConfig(tag);
        return (
          <span
            key={index}
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}
          >
            <i className={`${config.icon} mr-1`}></i>
            {getTagName(tag)}
          </span>
        );
      })}
      {remainingCount > 0 && (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
          +{remainingCount}
        </span>
      )}
    </div>
  );
};

export default ProductTag;
