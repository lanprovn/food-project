import React from 'react';
import { SearchBar } from '../../../../components/common/ui/SearchBar';
import { StockCard } from './StockCard';
import { EmptyState } from '../../../../components/common/ui/EmptyState';
import { FilterButtons } from './FilterButtons';
import { getStockStatus, getStockStatusColor, getStockStatusIcon } from '../../../utils/stockManagement';
import { formatCurrency } from '../utils/stockUtils';
import type { ProductStock } from '../../../utils/stockManagement';
import type { IngredientStock } from '../../../utils/ingredientManagement';
import type { Product } from '../../../types/product';
import type { StockFilter } from '../types';

interface StocksTabProps {
  filteredStocks: ProductStock[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filter: StockFilter;
  setFilter: (filter: StockFilter) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  lowStockCount: number;
  outOfStockCount: number;
  getCategories: () => string[];
  getProductInfo: (id: string) => Product | null;
  handleOpenModal: (product?: ProductStock, ingredient?: IngredientStock, adjustMode?: boolean) => void;
}

export const StocksTab: React.FC<StocksTabProps> = ({
  filteredStocks,
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
  categoryFilter,
  setCategoryFilter,
  lowStockCount,
  outOfStockCount,
  getCategories,
  getProductInfo,
  handleOpenModal,
}) => {
  return (
    <div>
      {/* Search and Filters */}
      <div className="mb-6">
        <div className="mb-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Tìm kiếm sản phẩm theo tên hoặc ID..."
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <FilterButtons
            filter={filter}
            setFilter={setFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            lowStockCount={lowStockCount}
            outOfStockCount={outOfStockCount}
            getCategories={getCategories}
          />
          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
          >
            ➕
            <span>Nhập Hàng</span>
          </button>
        </div>
      </div>

      {/* Empty State */}
      {filteredStocks.length === 0 && (
        <EmptyState
          icon="📦"
          title={
            searchQuery || categoryFilter !== 'all' || filter !== 'all'
              ? 'Không tìm thấy sản phẩm'
              : 'Chưa có sản phẩm nào'
          }
          message={
            searchQuery || categoryFilter !== 'all' || filter !== 'all'
              ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm'
              : 'Bắt đầu bằng cách thêm sản phẩm vào hệ thống'
          }
          showClearButton={searchQuery || categoryFilter !== 'all' || filter !== 'all'}
          onClear={() => {
            setSearchQuery('');
            setCategoryFilter('all');
            setFilter('all');
          }}
        />
      )}

      {/* Stock Cards */}
      {filteredStocks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStocks.map((stock) => {
            const status = getStockStatus(stock);
            const statusColor = getStockStatusColor(status);
            const statusIcon = getStockStatusIcon(status);
            const productInfo = getProductInfo(stock.productId);

            return (
              <StockCard
                key={stock.productId}
                stock={stock}
                productInfo={productInfo}
                status={status}
                statusColor={statusColor}
                statusIcon={statusIcon}
                formatCurrency={formatCurrency}
                onAddStock={() => handleOpenModal(stock)}
                onAdjustStock={() => handleOpenModal(stock, undefined, true)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

