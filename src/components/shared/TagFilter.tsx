import React from 'react';

interface TagFilterProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ selectedTags, onTagsChange }) => {
  const availableTags = [
    { id: 'hot', name: 'Nóng', icon: 'fas fa-fire', color: 'bg-red-500' },
    { id: 'cold', name: 'Lạnh', icon: 'fas fa-snowflake', color: 'bg-blue-500' },
    { id: 'sweet', name: 'Ngọt', icon: 'fas fa-candy-cane', color: 'bg-pink-500' },
    { id: 'spicy', name: 'Cay', icon: 'fas fa-pepper-hot', color: 'bg-orange-500' },
    { id: 'healthy', name: 'Tốt cho sức khỏe', icon: 'fas fa-leaf', color: 'bg-green-500' },
    { id: 'popular', name: 'Phổ biến', icon: 'fas fa-star', color: 'bg-yellow-500' },
    { id: 'new', name: 'Mới', icon: 'fas fa-sparkles', color: 'bg-purple-500' },
    { id: 'discount', name: 'Giảm giá', icon: 'fas fa-tag', color: 'bg-red-600' },
    { id: 'vegetarian', name: 'Chay', icon: 'fas fa-seedling', color: 'bg-green-600' },
    { id: 'premium', name: 'Cao cấp', icon: 'fas fa-crown', color: 'bg-yellow-600' },
  ];

  const handleTagToggle = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onTagsChange(selectedTags.filter(tag => tag !== tagId));
    } else {
      onTagsChange([...selectedTags, tagId]);
    }
  };

  const clearAllTags = () => {
    onTagsChange([]);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Lọc theo tags</h3>
        {selectedTags.length > 0 && (
          <button
            onClick={clearAllTags}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
          >
            <i className="fas fa-times mr-1"></i>
            Xóa tất cả
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => handleTagToggle(tag.id)}
            className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
              selectedTags.includes(tag.id)
                ? `${tag.color} text-white shadow-lg`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <i className={`${tag.icon} text-xs`}></i>
            <span>{tag.name}</span>
          </button>
        ))}
      </div>
      
      {selectedTags.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Đã chọn: <span className="font-semibold text-orange-600">{selectedTags.length}</span> tags
          </div>
        </div>
      )}
    </div>
  );
};

export default TagFilter;
