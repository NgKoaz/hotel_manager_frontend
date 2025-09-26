import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Hotel, Calendar, Users, Star, Wifi, Car, Coffee, Dumbbell } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    { icon: Wifi, title: 'WiFi Miễn Phí', description: 'Internet tốc độ cao' },
    { icon: Car, title: 'Đỗ Xe Miễn Phí', description: 'Bãi đỗ xe an toàn' },
    { icon: Coffee, title: 'Nhà Hàng 24/7', description: 'Ẩm thực đa dạng' },
    { icon: Dumbbell, title: 'Phòng Gym', description: 'Trang thiết bị hiện đại' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Hotel className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">
              Chào Mừng Đến Với Hotel Manager
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Hệ thống quản lý khách sạn hiện đại với AI tư vấn thông minh, 
              mang đến trải nghiệm đặt phòng tuyệt vời nhất cho khách hàng.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/rooms">
                  <Calendar className="mr-2 h-5 w-5" />
                  Xem Phòng
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link
                  to="/booking"
                  className="inline-flex items-center px-4 py-2 border border-white text-blue-600 rounded 
                           "
                >
                  <Users className="mr-2 h-5 w-5" />
                  Đặt Phòng Ngay
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tại Sao Chọn Chúng Tôi?
            </h2>
            <p className="text-lg text-gray-600">
              Dịch vụ chất lượng cao với công nghệ hiện đại
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-lg text-gray-600">Khách Hàng Hài Lòng</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-lg text-gray-600">Phòng Tiện Nghi</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">4.8</div>
              <div className="text-lg text-gray-600 flex items-center justify-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                Đánh Giá Trung Bình
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Sẵn Sàng Đặt Phòng?
          </h2>
          <p className="text-xl mb-8">
            Trải nghiệm dịch vụ AI tư vấn thông minh của chúng tôi
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/booking">
              Đặt Phòng Ngay
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;