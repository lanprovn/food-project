import React from 'react';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  showClearFilters?: boolean;
  onClearFilters?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  showClearFilters = false,
  onClearFilters,
}) => {
  return (
    <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 mb-4">{description}</p>
      {showClearFilters && onClearFilters && (
        <button
          onClick={onClearFilters}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Xóa bộ lọc
        </button>
      )}
    </div>
  );
};

