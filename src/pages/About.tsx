import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Hotel, MapPin, Phone, Mail, Clock, Star, Users, Award, Wifi, Car, Coffee, Dumbbell, Waves, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const features = [
    { icon: Wifi, title: 'WiFi Miễn Phí', description: 'Internet tốc độ cao trong toàn bộ khách sạn' },
    { icon: Car, title: 'Bãi Đỗ Xe', description: 'Chỗ đỗ xe miễn phí và an toàn' },
    { icon: Coffee, title: 'Nhà Hàng 24/7', description: 'Phục vụ ẩm thực đa dạng suốt ngày đêm' },
    { icon: Dumbbell, title: 'Phòng Gym', description: 'Trang thiết bị thể thao hiện đại' },
    { icon: Waves, title: 'Hồ Bơi', description: 'Hồ bơi ngoài trời với view tuyệt đẹp' },
    { icon: Utensils, title: 'Room Service', description: 'Phục vụ tận phòng 24/7' }
  ];

  const teamMembers = [
    {
      name: 'Nguyễn Văn An',
      position: 'Giám Đốc Điều Hành',
      experience: '15 năm kinh nghiệm trong ngành khách sạn',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Trần Thị Bình',
      position: 'Trưởng Phòng Dịch Vụ',
      experience: '12 năm kinh nghiệm quản lý dịch vụ',
      image: '/images/ServiceManager.jpg'
    },
    {
      name: 'Lê Minh Công',
      position: 'Đầu Bếp Trưởng',
      experience: '10 năm kinh nghiệm ẩm thực quốc tế',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const awards = [
    { year: '2023', title: 'Khách Sạn Tốt Nhất Khu Vực', organization: 'Vietnam Tourism Awards' },
    { year: '2022', title: 'Dịch Vụ Xuất Sắc', organization: 'Hospitality Excellence Awards' },
    { year: '2021', title: 'Khách Sạn Thân Thiện Môi Trường', organization: 'Green Hotel Certification' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Hotel className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Về Chúng Tôi</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Hotel Manager - Hệ thống quản lý khách sạn hiện đại với công nghệ AI tiên tiến, 
            mang đến trải nghiệm lưu trú tuyệt vời nhất cho khách hàng.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Company Info */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Câu Chuyện Của Chúng Tôi</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Được thành lập từ năm 2010, Hotel Manager đã không ngừng phát triển và trở thành 
                  một trong những hệ thống quản lý khách sạn hàng đầu tại Việt Nam.
                </p>
                <p>
                  Chúng tôi tự hào mang đến cho khách hàng không chỉ là nơi lưu trú thoải mái mà còn 
                  là trải nghiệm dịch vụ đẳng cấp với sự hỗ trợ của công nghệ AI thông minh.
                </p>
                <p>
                  Với đội ngũ nhân viên chuyên nghiệp và tận tâm, chúng tôi cam kết mang đến cho 
                  mỗi khách hàng những kỷ niệm đáng nhớ nhất.
                </p>
              </div>
              <div className="mt-6">
                <Button asChild>
                  <Link to="/rooms">Khám Phá Phòng</Link>
                </Button>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop"
                alt="Hotel lobby"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tiện Nghi & Dịch Vụ</h2>
            <p className="text-lg text-gray-600">Trải nghiệm đẳng cấp với đầy đủ tiện nghi hiện đại</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Đội Ngũ Lãnh Đạo</h2>
            <p className="text-lg text-gray-600">Những người dẫn dắt khách sạn đến thành công</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.position}</p>
                  <p className="text-sm text-gray-600">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Giải Thưởng & Chứng Nhận</h2>
            <p className="text-lg text-gray-600">Được ghi nhận bởi các tổ chức uy tín</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <Badge variant="outline" className="mb-2">{award.year}</Badge>
                  <h3 className="font-semibold text-lg mb-2">{award.title}</h3>
                  <p className="text-sm text-gray-600">{award.organization}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16 bg-blue-600 text-white py-16 rounded-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Thành Tựu Của Chúng Tôi</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg">Khách Hàng Hài Lòng</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-lg">Phòng Cao Cấp</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">13+</div>
              <div className="text-lg">Năm Kinh Nghiệm</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 flex items-center justify-center">
                4.8 <Star className="h-8 w-8 text-yellow-400 ml-2" />
              </div>
              <div className="text-lg">Đánh Giá Trung Bình</div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Liên Hệ Với Chúng Tôi</h2>
            <p className="text-lg text-gray-600">Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Địa Chỉ</h3>
                <p className="text-sm text-gray-600">
                  123 Đường ABC, Quận 1<br />
                  TP. Hồ Chí Minh, Việt Nam
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Hotline</h3>
                <p className="text-sm text-gray-600">
                  +84 123 456 789<br />
                  24/7 hỗ trợ khách hàng
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-gray-600">
                  info@hotelmanager.com<br />
                  booking@hotelmanager.com
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Giờ Làm Việc</h3>
                <p className="text-sm text-gray-600">
                  24/7 - Lễ tân<br />
                  6:00 - 22:00 - Nhà hàng
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-blue-600 text-white py-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Sẵn Sàng Đặt Phòng?</h2>
          <p className="text-xl mb-6">
            Trải nghiệm dịch vụ tuyệt vời cùng AI tư vấn thông minh
          </p>
          <div className="space-x-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/rooms">Xem Phòng</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/booking" className="text-white border-white hover:bg-white hover:text-blue-600">
                Đặt Ngay
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;