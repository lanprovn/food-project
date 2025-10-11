import { createContext } from 'react';
import type { WishlistContextType } from '../types/wishlist';

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
