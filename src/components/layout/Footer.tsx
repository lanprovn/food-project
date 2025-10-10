import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    // TODO: Implement newsletter subscription
    setEmail('');
  };

  const cities = [
    ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ'],
    ['Nha Trang', 'Huế', 'Vũng Tàu', 'Quy Nhon', 'Đà Lạt'],
    ['Phú Quốc', 'Hạ Long', 'Sapa', 'Mỹ Tho', 'Rạch Giá'],
    ['Long Xuyên', 'Cao Lãnh', 'Tân An', 'Mỹ Tho', 'Bến Tre'],
    ['Trà Vinh', 'Sóc Trăng', 'Bạc Liêu', 'Cà Mau', 'Kiên Giang'],
  ];

  return (
    <footer className="bg-neutral-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Cities */}
        <div className="py-10 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-6">Các thành phố hàng đầu</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {cities.map((cityGroup, index) => (
              <div key={index}>
                <ul className="space-y-2">
                  {cityGroup.map((city) => (
                    <li key={city}>
                      <Link 
                        to="#" 
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-10 border-b border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company */}
            <div>
              <h4 className="text-base font-semibold text-white mb-4">Về Phở Việt</h4>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Chúng tôi đam mê kết nối mọi người với những món ăn tuyệt vời. 
                Sứ mệnh của chúng tôi là làm cho việc giao đồ ăn trở nên đơn giản, nhanh chóng và thú vị.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt mr-2 text-orange-500"></i>
                  <span>123 Nguyễn Huệ, Q1, TP.HCM</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-phone mr-2 text-orange-500"></i>
                  <span>1900 1234</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-envelope mr-2 text-orange-500"></i>
                  <span>support@phoviet.vn</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-base font-semibold text-white mb-4">Liên hệ</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Hỗ trợ & Giúp đỡ
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Hợp tác với chúng tôi
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Giao hàng cùng chúng tôi
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-base font-semibold text-white mb-4">Pháp lý</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Điều khoản & Điều kiện
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Hoàn tiền & Hủy đơn
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Chính sách bảo mật
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Chính sách Cookie
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-base font-semibold text-white mb-4">Theo dõi chúng tôi</h4>
              <div className="flex space-x-4 mb-6">
                <Link to="#" className="text-gray-400 hover:text-white transition-colors hover-lift">
                  <i className="fab fa-instagram text-xl"></i>
                </Link>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors hover-lift">
                  <i className="fab fa-facebook text-xl"></i>
                </Link>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors hover-lift">
                  <i className="fab fa-twitter text-xl"></i>
                </Link>
              </div>
              
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                Nhận ưu đãi độc quyền và giảm giá trong hộp thư của bạn
              </p>
              
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-red-600 px-4 py-2 rounded-r-lg transition-colors text-sm font-medium"
                >
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-center md:text-left mb-4 md:mb-0 text-sm">
            Bảo lưu mọi quyền &copy; Phở Việt, 2024
          </div>
          <div className="text-gray-400 text-center md:text-right text-sm">
            Được tạo với{' '}
            <i className="fas fa-heart text-primary mx-1"></i>
            bởi{' '}
            <Link 
              to="https://themewagon.com/" 
              target="_blank" 
              className="font-medium hover:text-white transition-colors"
            >
              ThemeWagon
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
