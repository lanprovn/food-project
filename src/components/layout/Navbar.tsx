import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../shared/InputField';
import ButtonFilled from '../shared/ButtonFilled';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useProducts } from '../../hooks/useProducts';
import UserMenu from '../auth/UserMenu';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { totalItems, setIsCartOpen } = useCart();
  const { isAuthenticated } = useAuth();
  const { setSearchQuery } = useProducts();

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

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/src/assets/img/gallery/logo.svg" 
              alt="Phở Việt Logo" 
              className="h-8 w-8"
            />
            <span className="text-2xl font-bold text-gradient">
              Phở Việt
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700">
                Giao đến: <i className="fas fa-map-marker-alt text-yellow-500 mx-1"></i>
                <span className="font-normal">Vị trí hiện tại</span>
              </p>
              <p className="text-sm text-gray-600">Quận 1, TP. Hồ Chí Minh</p>
            </div>
          </div>

          {/* Search, Cart and Auth */}
          <div className="hidden lg:flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <InputField
                type="search"
                name="search"
                placeholder="Tìm món ăn..."
                icon={<i className="fas fa-search text-primary"></i>}
                className="w-64"
              />
            </form>
            
            {/* Cart Button */}
            <button
              onClick={handleCartClick}
              className="relative p-2 text-gray-600 hover:text-primary transition-colors"
            >
              <i className="fas fa-shopping-cart text-xl"></i>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            
            {/* Auth */}
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <ButtonFilled variant="secondary" size="sm" onClick={handleLoginClick}>
                <i className="fas fa-user mr-2"></i>
                Đăng nhập
              </ButtonFilled>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700">
                  Giao đến: <i className="fas fa-map-marker-alt text-yellow-500 mx-1"></i>
                  <span className="font-normal">Vị trí hiện tại</span>
                </p>
                <p className="text-sm text-gray-600">Quận 1, TP. Hồ Chí Minh</p>
              </div>
              
              <form onSubmit={handleSearchSubmit}>
                <InputField
                  type="search"
                  name="search"
                  placeholder="Tìm món ăn..."
                  icon={<i className="fas fa-search text-primary"></i>}
                  className="w-full"
                />
              </form>
              
              {/* Mobile Cart Button */}
              <button
                onClick={handleCartClick}
                className="flex items-center justify-center space-x-2 text-gray-700 hover:text-primary px-3 py-2 rounded-md text-center"
              >
                <i className="fas fa-shopping-cart"></i>
                <span>Giỏ hàng ({totalItems})</span>
              </button>
              
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Trang chủ
                </Link>
                <Link 
                  to="/menu" 
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Thực đơn
                </Link>
                <Link 
                  to="/about" 
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Giới thiệu
                </Link>
                <Link 
                  to="/contact" 
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Liên hệ
                </Link>
                
                {/* Mobile Auth */}
                {isAuthenticated ? (
                  <div className="px-3 py-2 text-center">
                    <UserMenu />
                  </div>
                ) : (
                  <ButtonFilled variant="secondary" size="sm" className="mx-3" onClick={handleLoginClick}>
                    <i className="fas fa-user mr-2"></i>
                    Đăng nhập
                  </ButtonFilled>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
