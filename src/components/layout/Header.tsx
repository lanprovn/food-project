import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../shared/InputField';
import ButtonFilled from '../shared/ButtonFilled';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useProducts } from '../../hooks/useProducts';
import { useWishlist } from '../../hooks/useWishlist';
import UserMenu from '../auth/UserMenu';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { totalItems, setIsCartOpen } = useCart();
  const { isAuthenticated } = useAuth();
  const { setSearchQuery } = useProducts();
  const { items: wishlistItems } = useWishlist();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get('search') as string;
    setSearchQuery(query);
    navigate('/menu');
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleWishlistClick = () => {
    navigate('/wishlist');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between flex-nowrap max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto whitespace-nowrap h-16 md:h-20 scrollbar-hide">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/src/assets/img/gallery/logo.svg" 
              alt="Foodwagon Logo" 
              className="h-10 w-10"
            />
            <div>
              <span className="text-2xl font-bold text-gradient">
                Phở Việt
              </span>
              <p className="text-xs text-gray-500 -mt-1">Giao đồ ăn nhanh chóng</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-x-6 whitespace-nowrap">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary font-medium transition-colors px-2 py-1 text-sm whitespace-nowrap"
            >
              Trang chủ
            </Link>
            <Link 
              to="/menu" 
              className="text-gray-700 hover:text-primary font-medium transition-colors px-2 py-1 text-sm whitespace-nowrap"
            >
              Thực đơn
            </Link>
            <Link 
              to="/hot-deals" 
              className="text-gray-700 hover:text-primary font-medium transition-colors relative px-2 py-1 text-sm whitespace-nowrap"
            >
              Hot Deals
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">!</span>
            </Link>
            <Link 
              to="/promotion" 
              className="text-gray-700 hover:text-primary font-medium transition-colors px-2 py-1 text-sm whitespace-nowrap"
            >
              Khuyến mãi
            </Link>
            <Link 
              to="/store" 
              className="text-gray-700 hover:text-primary font-medium transition-colors px-2 py-1 text-sm whitespace-nowrap"
            >
              Cửa hàng
            </Link>
            <Link 
              to="/tracking" 
              className="text-gray-700 hover:text-primary font-medium transition-colors px-2 py-1 text-sm whitespace-nowrap"
            >
              Theo dõi
            </Link>
            <Link 
              to="/book-party" 
              className="text-gray-700 hover:text-primary font-medium transition-colors px-2 py-1 text-sm whitespace-nowrap"
            >
              Đặt tiệc
            </Link>
          </div>

          {/* Search */}
          <div className="hidden lg:flex items-center">
            <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-orange-400">
              <i className="fas fa-search text-gray-400 mr-2"></i>
              <input
                type="search"
                name="search"
                placeholder="Tìm món ăn, nhà hàng..."
                className="flex-1 outline-none bg-transparent text-sm text-gray-700"
              />
            </form>
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Wishlist Button */}
            <button
              onClick={handleWishlistClick}
              className="relative p-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 hover-lift"
              title="Danh sách yêu thích"
            >
              <i className="fas fa-heart text-lg"></i>
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {wishlistItems.length}
                </span>
              )}
            </button>
            
            {/* Cart Button */}
            <button
              onClick={handleCartClick}
              className="relative p-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 hover-lift"
              title="Giỏ hàng"
            >
              <i className="fas fa-shopping-cart text-lg"></i>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </button>
            
            {/* Auth */}
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <button
                onClick={handleLoginClick}
                className="ml-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200"
              >
                <i className="fas fa-user"></i>
                Đăng nhập
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-gray-50">
            <div className="px-4 py-6 space-y-6">
              {/* Location */}
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                <i className="fas fa-map-marker-alt text-primary"></i>
                <div>
                  <p className="text-sm font-medium text-gray-700">Giao đến</p>
                  <p className="text-sm text-gray-500">Quận 1, TP.HCM</p>
                </div>
              </div>
              
              {/* Search */}
              <form onSubmit={handleSearchSubmit}>
                <InputField
                  type="search"
                  name="search"
                  placeholder="Tìm món ăn, nhà hàng..."
                  icon={<i className="fas fa-search text-gray-400"></i>}
                  className="w-full"
                />
              </form>
              
              {/* Navigation Links */}
              <div className="space-y-3">
                <Link 
                  to="/" 
                  className="flex items-center space-x-4 text-gray-700 hover:text-primary hover:bg-white px-4 py-4 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fas fa-home w-5"></i>
                  <span>Trang chủ</span>
                </Link>
                <Link 
                  to="/menu" 
                  className="flex items-center space-x-4 text-gray-700 hover:text-primary hover:bg-white px-4 py-4 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fas fa-utensils w-5"></i>
                  <span>Thực đơn</span>
                </Link>
                <Link 
                  to="/hot-deals" 
                  className="flex items-center space-x-4 text-gray-700 hover:text-primary hover:bg-white px-4 py-4 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fas fa-fire w-5"></i>
                  <span>Hot Deals</span>
                  <span className="bg-red-500 text-white text-xs px-1 rounded-full">!</span>
                </Link>
                <Link 
                  to="/promotion" 
                  className="flex items-center space-x-4 text-gray-700 hover:text-primary hover:bg-white px-4 py-4 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fas fa-gift w-5"></i>
                  <span>Khuyến mãi</span>
                </Link>
                <Link 
                  to="/store" 
                  className="flex items-center space-x-4 text-gray-700 hover:text-primary hover:bg-white px-4 py-4 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fas fa-store w-5"></i>
                  <span>Cửa hàng</span>
                </Link>
                <Link 
                  to="/tracking" 
                  className="flex items-center space-x-4 text-gray-700 hover:text-primary hover:bg-white px-4 py-4 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fas fa-truck w-5"></i>
                  <span>Theo dõi</span>
                </Link>
                <Link 
                  to="/book-party" 
                  className="flex items-center space-x-4 text-gray-700 hover:text-primary hover:bg-white px-4 py-4 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fas fa-calendar-alt w-5"></i>
                  <span>Đặt tiệc</span>
                </Link>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleWishlistClick}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-primary hover:bg-white px-3 py-3 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-heart w-5"></i>
                    <span>Danh sách yêu thích</span>
                  </div>
                  {wishlistItems.length > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {wishlistItems.length}
                    </span>
                  )}
                </button>
                
                <button
                  onClick={handleCartClick}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-primary hover:bg-white px-3 py-3 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-shopping-cart w-5"></i>
                    <span>Giỏ hàng</span>
                  </div>
                  {totalItems > 0 && (
                    <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
              
              {/* Auth */}
              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <div className="px-3 py-2">
                    <UserMenu />
                  </div>
                ) : (
                  <ButtonFilled variant="primary" size="sm" className="w-full" onClick={handleLoginClick}>
                    <i className="fas fa-user mr-2"></i>
                    Đăng nhập
                  </ButtonFilled>
                )}
              </div>
            </div>
          </div>
        )}
    </nav>
  );
};

export default Header;
