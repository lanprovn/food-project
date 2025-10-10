import React, { useState } from 'react';
import ButtonFilled from './shared/ButtonFilled';
import InputField from './shared/InputField';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // TODO: Implement contact form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Liên hệ với chúng tôi
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Có câu hỏi hoặc phản hồi? Chúng tôi rất muốn nghe từ bạn. Gửi cho chúng tôi một tin nhắn và chúng tôi sẽ phản hồi sớm nhất có thể.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Thông tin liên hệ</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary p-3 rounded-full">
                  <i className="fas fa-map-marker-alt text-white"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Địa chỉ</h4>
                  <p className="text-gray-600">
                    123 Đường Ẩm Thực<br />
                    Quận 1<br />
                    TP. Hồ Chí Minh, Việt Nam
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary p-3 rounded-full">
                  <i className="fas fa-phone text-white"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Điện thoại</h4>
                  <p className="text-gray-600">+84 123 456 789</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary p-3 rounded-full">
                  <i className="fas fa-envelope text-white"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">info@phoviet.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary p-3 rounded-full">
                  <i className="fas fa-clock text-white"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Giờ làm việc</h4>
                  <p className="text-gray-600">
                    Thứ 2 - Thứ 6: 9:00 - 22:00<br />
                    Thứ 7 - Chủ nhật: 10:00 - 23:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên
                </label>
                <InputField
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nhập họ và tên của bạn"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ email
                </label>
                <InputField
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ email của bạn"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Tin nhắn
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Nhập tin nhắn của bạn"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <ButtonFilled
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
              >
                Gửi tin nhắn
              </ButtonFilled>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
