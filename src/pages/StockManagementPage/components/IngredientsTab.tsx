import React from 'react';
import { SearchBar } from '../../../../components/common/ui/SearchBar';
import { EmptyState } from '../../../../components/common/ui/EmptyState';
import { IngredientCard } from './IngredientCard';
import { FilterButtons } from './FilterButtons';
import type { IngredientStock } from '../../../utils/ingredientManagement';
import type { ProductStock } from '../../../utils/stockManagement';
import type { StockFilter } from '../types';

interface IngredientsTabProps {
  filteredIngredients: IngredientStock[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filter: StockFilter;
  setFilter: (filter: StockFilter) => void;
  ingredientStats: {
    lowStock: number;
    outOfStock: number;
  };
  handleOpenModal: (product?: ProductStock, ingredient?: IngredientStock, adjustMode?: boolean) => void;
}

export const IngredientsTab: React.FC<IngredientsTabProps> = ({
  filteredIngredients,
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
  ingredientStats,
  handleOpenModal,
}) => {
  return (
    <div>
      <div className="mb-6">
        <div className="mb-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Tìm kiếm nguyên liệu theo tên hoặc ID..."
          />
        </div>

        <FilterButtons
          filter={filter}
          setFilter={setFilter}
          lowStockCount={ingredientStats.lowStock}
          outOfStockCount={ingredientStats.outOfStock}
          showCategoryFilter={false}
        />
      </div>

      {filteredIngredients.length === 0 && (
        <EmptyState
          icon="🥛"
          title={
            searchQuery || filter !== 'all'
              ? 'Không tìm thấy nguyên liệu'
              : 'Chưa có nguyên liệu nào'
          }
          message={
            searchQuery || filter !== 'all'
              ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm'
              : 'Bắt đầu bằng cách thêm nguyên liệu vào hệ thống'
          }
          showClearButton={searchQuery || filter !== 'all'}
          onClear={() => {
            setSearchQuery('');
            setFilter('all');
          }}
        />
      )}

      {filteredIngredients.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIngredients.map((ingredient) => (
            <IngredientCard
              key={ingredient.id}
              ingredient={ingredient}
              onAddStock={() => handleOpenModal(undefined, ingredient)}
              onAdjustStock={() => handleOpenModal(undefined, ingredient, true)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

