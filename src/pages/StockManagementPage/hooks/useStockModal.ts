// Stock Modal hook
import { useState } from 'react';
import toast from 'react-hot-toast';
import { addStock, adjustStock } from '../../../utils/stockManagement';
import { useIngredients } from '../../../context/IngredientContext';
import type { ProductStock } from '../../../utils/stockManagement';
import type { IngredientStock } from '../../../utils/ingredientManagement';

export const useStockModal = (
  reloadData: () => void,
  reloadIngredients: () => void
) => {
  const {
    addStock: addIngredientStock,
    adjustStock: adjustIngredientStock,
  } = useIngredients();

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductStock | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientStock | null>(null);
  const [forceAdjustMode, setForceAdjustMode] = useState<boolean | undefined>(undefined);

  const handleAddStock = (quantity: number, reason: string, isAdjustMode: boolean) => {
    if (!selectedProduct) return;

    try {
      if (isAdjustMode) {
        // Adjust stock to exact quantity
        adjustStock(selectedProduct.productId, quantity, reason || 'Điều chỉnh tồn kho');
        toast.success(`Đã điều chỉnh tồn kho thành ${quantity} ${selectedProduct.unit}`);
      } else {
        // Add stock
        addStock(selectedProduct.productId, quantity, reason || 'Nhập hàng');
        toast.success(`Đã nhập ${quantity} ${selectedProduct.unit} cho sản phẩm`);
      }
      
      reloadData();
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error updating stock:', error);
      toast.error('Lỗi khi thực hiện thao tác');
    }
  };

  const handleAddIngredientStock = (quantity: number, reason: string, isAdjustMode: boolean) => {
    if (!selectedIngredient) return;

    try {
      if (isAdjustMode) {
        // Adjust ingredient stock to exact quantity
        adjustIngredientStock(selectedIngredient.id, quantity, reason || 'Điều chỉnh nguyên liệu');
        toast.success(`Đã điều chỉnh tồn kho thành ${quantity} ${selectedIngredient.unit}`);
      } else {
        // Add ingredient stock
        addIngredientStock(selectedIngredient.id, quantity, reason || 'Nhập nguyên liệu');
        toast.success(`Đã nhập ${quantity} ${selectedIngredient.unit} cho nguyên liệu`);
      }
      
      reloadIngredients();
      setSelectedIngredient(null);
    } catch (error) {
      console.error('Error updating ingredient stock:', error);
      toast.error('Lỗi khi thực hiện thao tác');
    }
  };

  const handleOpenModal = (product?: ProductStock, ingredient?: IngredientStock, adjustMode?: boolean) => {
    if (product) {
      setSelectedProduct(product);
      setSelectedIngredient(null);
    } else if (ingredient) {
      setSelectedIngredient(ingredient);
      setSelectedProduct(null);
    }
    setForceAdjustMode(adjustMode);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setSelectedIngredient(null);
    setForceAdjustMode(undefined);
  };

  const handleConfirm = (quantity: number, reason: string, isAdjustMode: boolean) => {
    if (selectedProduct) {
      handleAddStock(quantity, reason, isAdjustMode);
    } else if (selectedIngredient) {
      handleAddIngredientStock(quantity, reason, isAdjustMode);
    }
  };

  return {
    showModal,
    selectedProduct,
    selectedIngredient,
    forceAdjustMode,
    handleOpenModal,
    handleCloseModal,
    handleConfirm,
  };
};

