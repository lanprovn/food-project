import React from 'react';
import ContactSection from '../components/ContactSection';
import SectionTitle from '../components/shared/SectionTitle';

const ContactPage: React.FC = () => {
  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Địa chỉ',
      details: [
        'Trụ sở chính: 123 Nguyễn Huệ, Quận 1, TP.HCM',
        'Chi nhánh Hà Nội: 456 Hoàng Hoa Thám, Ba Đình, Hà Nội',
        'Chi nhánh Đà Nẵng: 789 Lê Duẩn, Hải Châu, Đà Nẵng'
      ]
    },
    {
      icon: 'fas fa-phone',
      title: 'Điện thoại',
      details: [
        'Hotline: 1900 1234',
        'TP.HCM: 028 3822 1234',
        'Hà Nội: 024 3822 5678',
        'Đà Nẵng: 0236 3822 9012'
      ]
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      details: [
        'Hỗ trợ: support@phoviet.vn',
        'Đối tác: partner@phoviet.vn',
        'Tuyển dụng: hr@phoviet.vn'
      ]
    },
    {
      icon: 'fas fa-clock',
      title: 'Giờ làm việc',
      details: [
        'Thứ 2 - Thứ 6: 7:00 - 22:00',
        'Thứ 7 - Chủ nhật: 8:00 - 23:00',
        'Hỗ trợ 24/7 qua hotline'
      ]
    }
  ];

  const faqs = [
    {
      question: 'Làm thế nào để đặt hàng?',
      answer: 'Bạn có thể đặt hàng qua website hoặc ứng dụng di động. Chỉ cần chọn món ăn, thêm vào giỏ hàng và thanh toán.'
    },
    {
      question: 'Thời gian giao hàng là bao lâu?',
      answer: 'Chúng tôi cam kết giao hàng trong 30 phút kể từ khi đơn hàng được xác nhận.'
    },
    {
      question: 'Có phí giao hàng không?',
      answer: 'Phí giao hàng từ 15.000₫ - 25.000₫ tùy theo khoảng cách. Đơn hàng trên 200.000₫ được miễn phí giao hàng.'
    },
    {
      question: 'Có thể hủy đơn hàng không?',
      answer: 'Bạn có thể hủy đơn hàng trong vòng 5 phút sau khi đặt. Sau đó sẽ không thể hủy để đảm bảo chất lượng món ăn.'
    },
    {
      question: 'Thanh toán bằng cách nào?',
      answer: 'Chúng tôi chấp nhận thanh toán bằng tiền mặt, thẻ tín dụng, ví điện tử và chuyển khoản ngân hàng.'
    },
    {
      question: 'Có chương trình khuyến mãi không?',
      answer: 'Có, chúng tôi thường xuyên có các chương trình khuyến mãi, giảm giá và combo đặc biệt.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Chúng tôi rất muốn nghe từ bạn. Gửi cho chúng tôi một tin nhắn và chúng tôi sẽ phản hồi sớm nhất có thể.
          </p>
          <div className="flex items-center justify-center space-x-8 text-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">24/7</div>
              <div className="text-white/80">Hỗ trợ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">5'</div>
              <div className="text-white/80">Phản hồi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">100%</div>
              <div className="text-white/80">Hài lòng</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Thông tin liên hệ
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Liên hệ với chúng tôi qua nhiều kênh khác nhau để được hỗ trợ tốt nhất
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${info.icon} text-white text-xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            title="Câu hỏi thường gặp"
            subtitle="Tìm câu trả lời cho những câu hỏi phổ biến"
            centered
            className="mb-12"
          />
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            title="Tìm chúng tôi"
            subtitle="Ghép thăm văn phòng của chúng tôi hoặc xem chỉ đường"
            centered
            className="mb-12"
          />
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <i className="fas fa-map-marker-alt text-4xl mb-4"></i>
              <p className="text-lg">Bản đồ tương tác sắp ra mắt</p>
              <p className="text-sm">123 Đường Ẩm Thực, Quận 1, TP. Hồ Chí Minh, Việt Nam</p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Hours */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Hỗ trợ khách hàng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <i className="fas fa-phone text-4xl mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Hỗ trợ qua điện thoại</h3>
              <p className="mb-2">+84 123 456 789</p>
              <p className="text-sm">T2-T6: 9:00-22:00</p>
            </div>
            <div>
              <i className="fas fa-envelope text-4xl mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Hỗ trợ qua email</h3>
              <p className="mb-2">support@phoviet.com</p>
              <p className="text-sm">Phản hồi 24/7</p>
            </div>
            <div>
              <i className="fas fa-comments text-4xl mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Chat trực tiếp</h3>
              <p className="mb-2">Có sẵn trên trang web</p>
              <p className="text-sm">T2-T6: 9:00-18:00</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
