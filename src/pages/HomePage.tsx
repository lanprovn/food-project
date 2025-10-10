import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-8">
          Ocha Việt
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Hệ thống POS Order Web
        </p>
        
        <div className="space-y-4">
          <Link
            to="/pos"
            className="block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg text-xl transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Mở hệ thống POS
          </Link>
          
          <Link
            to="/menu"
            className="block bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-lg text-xl transition-colors duration-200"
          >
            Xem menu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
