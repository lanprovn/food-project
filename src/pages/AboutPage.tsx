import React from 'react';
import SectionTitle from '../components/shared/SectionTitle';
import ButtonFilled from '../components/shared/ButtonFilled';

const AboutPage: React.FC = () => {
  const stats = [
    { number: '50K+', label: 'Khách hàng hài lòng' },
    { number: '200+', label: 'Món ăn đa dạng' },
    { number: '3', label: 'Thành phố phục vụ' },
    { number: '30\'', label: 'Thời gian giao hàng' },
  ];

  const features = [
    {
      icon: 'fas fa-clock',
      title: 'Giao hàng siêu tốc',
      description: 'Cam kết giao hàng trong 30 phút, đảm bảo món ăn luôn nóng hổi và ngon miệng.',
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'An toàn tuyệt đối',
      description: 'Tuân thủ nghiêm ngặt các tiêu chuẩn vệ sinh an toàn thực phẩm quốc tế.',
    },
    {
      icon: 'fas fa-utensils',
      title: 'Đầu bếp chuyên nghiệp',
      description: 'Đội ngũ đầu bếp giàu kinh nghiệm, chế biến món ăn theo công thức truyền thống.',
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Đặt hàng dễ dàng',
      description: 'Giao diện thân thiện, đặt hàng chỉ với vài thao tác đơn giản trên điện thoại.',
    },
    {
      icon: 'fas fa-headset',
      title: 'Hỗ trợ 24/7',
      description: 'Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi.',
    },
    {
      icon: 'fas fa-tags',
      title: 'Giá cả hợp lý',
      description: 'Mức giá cạnh tranh, phù hợp với túi tiền của mọi đối tượng khách hàng.',
    },
  ];

  const team = [
    {
      name: 'Nguyễn Văn Minh',
      position: 'Giám đốc điều hành',
      image: '/src/assets/img/gallery/food-world.png',
      description: 'Hơn 10 năm kinh nghiệm trong ngành F&B'
    },
    {
      name: 'Trần Thị Lan',
      position: 'Đầu bếp trưởng',
      image: '/src/assets/img/gallery/food-world.png',
      description: 'Chuyên gia ẩm thực Việt Nam'
    },
    {
      name: 'Lê Hoàng Nam',
      position: 'Giám đốc công nghệ',
      image: '/src/assets/img/gallery/food-world.png',
      description: 'Chuyên gia phát triển ứng dụng di động'
    },
    {
      name: 'Phạm Thị Mai',
      position: 'Giám đốc marketing',
      image: '/src/assets/img/gallery/food-world.png',
      description: 'Chuyên gia digital marketing'
    }
  ];

  const timeline = [
    {
      year: '2020',
      title: 'Thành lập',
      description: 'Phở Việt được thành lập với tầm nhìn mang ẩm thực Việt Nam đến gần hơn với mọi người.'
    },
    {
      year: '2021',
      title: 'Mở rộng',
      description: 'Mở rộng dịch vụ đến 3 thành phố lớn: TP.HCM, Hà Nội và Đà Nẵng.'
    },
    {
      year: '2022',
      title: 'Công nghệ',
      description: 'Ra mắt ứng dụng di động với tính năng theo dõi đơn hàng thời gian thực.'
    },
    {
      year: '2023',
      title: 'Phát triển',
      description: 'Đạt mốc 50K+ khách hàng và mở rộng thực đơn lên 200+ món ăn.'
    },
    {
      year: '2024',
      title: 'Tương lai',
      description: 'Kế hoạch mở rộng ra các tỉnh thành khác và phát triển dịch vụ đặt tiệc.'
    }
  ];


  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Về Phở Việt
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Chúng tôi đam mê kết nối mọi người với những món ăn tuyệt vời. Sứ mệnh của chúng tôi là làm cho việc giao đồ ăn 
            trở nên đơn giản, nhanh chóng và thú vị cho tất cả mọi người.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                title="Câu chuyện của chúng tôi"
                subtitle="Phở Việt được thành lập như thế nào"
                className="mb-8"
              />
              <div className="space-y-4 text-gray-600">
                <p>
                  Phở Việt được thành lập vào năm 2020 với một tầm nhìn đơn giản: làm cho việc giao đồ ăn trở nên dễ tiếp cận, 
                  giá cả phải chăng và thú vị cho tất cả mọi người. Những gì bắt đầu như một dịch vụ địa phương nhỏ đã phát triển 
                  thành một nền tảng kết nối hàng nghìn khách hàng với hàng trăm nhà hàng.
                </p>
                <p>
                  Chúng tôi tin rằng những món ăn tuyệt vời nên có sẵn cho tất cả mọi người, bất kể họ sống ở đâu 
                  hoặc lịch trình của họ như thế nào. Đội ngũ của chúng tôi làm việc không mệt mỏi để đảm bảo rằng mỗi đơn hàng 
                  được giao tươi, nóng và đúng giờ.
                </p>
                <p>
                  Ngày nay, chúng tôi tự hào phục vụ khách hàng trên nhiều thành phố, hợp tác với những 
                  nhà hàng địa phương tốt nhất để mang đến cho bạn sự đa dạng tuyệt vời của các món ăn ngon.
                </p>
              </div>
            </div>
            <div>
              <img
                src="/src/assets/img/gallery/hero-header.png"
                alt="Our Story"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="/src/assets/img/gallery/crispy-sandwiches.png"
                alt="Our Mission"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <SectionTitle
                title="Sứ mệnh của chúng tôi"
                subtitle="Điều gì thúc đẩy chúng tôi tiến về phía trước"
                className="mb-8"
              />
              <div className="space-y-4 text-gray-600">
                <p>
                  Sứ mệnh của chúng tôi là cách mạng hóa ngành giao đồ ăn bằng cách cung cấp dịch vụ xuất sắc, 
                  hỗ trợ các doanh nghiệp địa phương và tạo ra trải nghiệm liền mạch cho khách hàng của chúng tôi.
                </p>
                <p>
                  Chúng tôi cam kết với tính bền vững, thực hành kinh doanh công bằng và đóng góp lại cho 
                  cộng đồng mà chúng tôi phục vụ. Mỗi đơn hàng được đặt qua Phở Việt giúp hỗ trợ các 
                  nhà hàng địa phương và nhân viên của họ.
                </p>
                <p>
                  Chúng tôi liên tục đổi mới để cải thiện nền tảng của mình, mở rộng phạm vi và đảm bảo rằng 
                  mọi người có thể thưởng thức những món ăn tuyệt vời bất cứ khi nào họ muốn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            title="Tại sao chọn Phở Việt?"
            subtitle="Chúng tôi cam kết mang đến trải nghiệm giao đồ ăn tốt nhất"
            centered
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mb-6">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-24 h-24 mx-auto object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            title="Gặp gỡ đội ngũ của chúng tôi"
            subtitle="Những con người đứng sau Phở Việt"
            centered
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-semibold">
                  {member.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Sẵn sàng trải nghiệm Phở Việt?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tham gia cùng hàng nghìn khách hàng hài lòng và khám phá những món ăn tuyệt vời từ các nhà hàng yêu thích của bạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonFilled variant="secondary" size="lg">
              Đặt hàng ngay
            </ButtonFilled>
            <ButtonFilled variant="primary" size="lg" className="bg-white text-primary hover:bg-gray-100">
              Tìm hiểu thêm
            </ButtonFilled>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Đội ngũ của chúng tôi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những con người tài năng đang làm việc để mang đến trải nghiệm tốt nhất cho khách hàng
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-orange-600 font-semibold mb-2">{member.position}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hành trình phát triển
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những cột mốc quan trọng trong quá trình phát triển của Phở Việt
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-red-500"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <div className="text-orange-600 font-bold text-lg mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg relative z-10">
                    {item.year.slice(-2)}
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-bullseye text-white text-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sứ mệnh</h3>
              <p className="text-gray-600 leading-relaxed">
                Mang đến cho khách hàng những món ăn ngon nhất với dịch vụ giao hàng nhanh chóng, 
                an toàn và tiện lợi. Chúng tôi cam kết đảm bảo chất lượng thực phẩm và trải nghiệm 
                khách hàng tuyệt vời trong mọi đơn hàng.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-eye text-white text-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tầm nhìn</h3>
              <p className="text-gray-600 leading-relaxed">
                Trở thành nền tảng giao đồ ăn hàng đầu tại Việt Nam, kết nối mọi người với 
                những món ăn ngon từ khắp nơi. Chúng tôi hướng tới việc phát triển cộng đồng 
                ẩm thực và lan tỏa văn hóa ẩm thực Việt Nam ra thế giới.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
