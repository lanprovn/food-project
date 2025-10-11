import type { Product } from './product';

export interface WishlistItem {
  id: number;
  product: Product;
  addedAt: string;
}

export interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}
