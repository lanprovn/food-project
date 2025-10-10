import React, { useState } from 'react';
import ButtonFilled from './shared/ButtonFilled';
import InputField from './shared/InputField';

const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Address:', address, 'Type:', activeTab);
    // TODO: Implement food search functionality
  };

  return (
    <section className="py-20 bg-primary overflow-hidden" id="home">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">
              Bạn có đói không?
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-200 mb-8">
              Chỉ với vài cú nhấp chuột, tìm những món ăn<br className="hidden xl:block" />gần bạn nhất
            </h2>
            
            {/* Search Form */}
            <div className="bg-white rounded-lg p-6 shadow-xl max-w-2xl mx-auto lg:mx-0">
              {/* Tabs */}
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setActiveTab('delivery')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === 'delivery'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <i className="fas fa-motorcycle mr-2"></i>
                  Giao hàng
                </button>
                <button
                  onClick={() => setActiveTab('pickup')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === 'pickup'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <i className="fas fa-shopping-bag mr-2"></i>
                  Tự lấy
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <InputField
                    type="text"
                    placeholder="Nhập địa chỉ của bạn"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    icon={<i className="fas fa-map-marker-alt text-red-500"></i>}
                    className="w-full"
                  />
                </div>
                <ButtonFilled
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  Tìm món ăn
                </ButtonFilled>
              </form>
            </div>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="/src/assets/img/gallery/hero-header.png"
                alt="Food Delivery"
                className="w-full max-w-md lg:max-w-lg xl:max-w-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
