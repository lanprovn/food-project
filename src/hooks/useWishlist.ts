import { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext.ts';
import type { WishlistContextType } from '../types/wishlist';

/**
 * Custom hook to access wishlist context
 * @returns WishlistContextType - Wishlist context value
 * @throws Error if used outside of WishlistProvider
 */
export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};