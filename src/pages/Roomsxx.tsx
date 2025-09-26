import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wifi, Car, Coffee, Tv, Wind, Users, Bed, Bath } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  capacity: number;
  beds: string;
  size: number;
  amenities: string[];
  available: boolean;
  images: string[];
  description: string;
}

const RoomsXX: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const rooms: Room[] = [
    {
      id: '1',
      name: 'Phòng Standard',
      type: 'standard',
      price: 1500000,
      capacity: 2,
      beds: '1 giường đôi',
      size: 25,
      amenities: ['WiFi miễn phí', 'Điều hòa', 'TV', 'Minibar', 'Phòng tắm riêng'],
      available: true,
      images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400'],
      description: 'Phòng tiêu chuẩn với đầy đủ tiện nghi cơ bản, phù hợp cho 2 người.'
    },
    {
      id: '2',
      name: 'Phòng Deluxe',
      type: 'deluxe',
      price: 2500000,
      capacity: 3,
      beds: '1 giường đôi + 1 giường đơn',
      size: 35,
      amenities: ['WiFi miễn phí', 'Điều hòa', 'Smart TV', 'Minibar', 'Ban công', 'Bồn tắm'],
      available: true,
      images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400'],
      description: 'Phòng cao cấp với view đẹp và không gian rộng rãi, phù hợp cho 3 người.'
    },
    {
      id: '3',
      name: 'Suite VIP',
      type: 'suite',
      price: 4000000,
      capacity: 4,
      beds: '1 giường king + 1 sofa bed',
      size: 60,
      amenities: ['WiFi miễn phí', 'Điều hòa', 'Smart TV 55"', 'Minibar', 'Jacuzzi', 'Phòng khách riêng'],
      available: false,
      images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400'],
      description: 'Suite sang trọng với phòng khách riêng và jacuzzi, phù hợp cho 4 người.'
    },
    {
      id: '4',
      name: 'Phòng Standard Plus',
      type: 'standard',
      price: 1800000,
      capacity: 2,
      beds: '1 giường queen',
      size: 30,
      amenities: ['WiFi miễn phí', 'Điều hòa', 'Smart TV', 'Minibar', 'Máy pha cà phê'],
      available: true,
      images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400'],
      description: 'Phòng tiêu chuẩn nâng cấp với không gian thoải mái hơn.'
    },
    {
      id: '5',
      name: 'Phòng Deluxe Premium',
      type: 'deluxe',
      price: 3200000,
      capacity: 4,
      beds: '2 giường đôi',
      size: 45,
      amenities: ['WiFi miễn phí', 'Điều hòa', 'Smart TV', 'Minibar', 'Ban công lớn', 'Bồn tắm + Vòi sen'],
      available: true,
      images: ['https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=400'],
      description: 'Phòng deluxe cao cấp với 2 giường đôi, phù hợp cho gia đình.'
    },
    {
      id: '6',
      name: 'Presidential Suite',
      type: 'suite',
      price: 6000000,
      capacity: 6,
      beds: '1 giường king + 2 giường đơn',
      size: 100,
      amenities: ['WiFi miễn phí', 'Điều hòa', '2 Smart TV', 'Minibar', 'Jacuzzi', 'Phòng khách + Phòng ăn'],
      available: true,
      images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400'],
      description: 'Suite tổng thống với không gian sang trọng nhất, phù hợp cho nhóm lớn.'
    }
  ];

  const amenityIcons: { [key: string]: React.ReactNode } = {
    'WiFi miễn phí': <Wifi className="h-4 w-4" />,
    'Điều hòa': <Wind className="h-4 w-4" />,
    'TV': <Tv className="h-4 w-4" />,
    'Smart TV': <Tv className="h-4 w-4" />,
    'Smart TV 55"': <Tv className="h-4 w-4" />,
    '2 Smart TV': <Tv className="h-4 w-4" />,
    'Minibar': <Coffee className="h-4 w-4" />,
    'Máy pha cà phê': <Coffee className="h-4 w-4" />
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || room.type === selectedType;
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'low' && room.price <= 2000000) ||
                        (priceRange === 'medium' && room.price > 2000000 && room.price <= 4000000) ||
                        (priceRange === 'high' && room.price > 4000000);
    
    return matchesSearch && matchesType && matchesPrice;
  });

  const handleBookRoom = (roomId: string) => {
    navigate(`/booking?room=${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Danh Sách Phòng</h1>
          <p className="text-lg text-gray-600">Chọn phòng phù hợp với nhu cầu của bạn</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Tìm kiếm</Label>
              <Input
                id="search"
                placeholder="Tìm theo tên phòng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="type">Loại phòng</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại phòng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="deluxe">Deluxe</SelectItem>
                  <SelectItem value="suite">Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="price">Khoảng giá</Label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn khoảng giá" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="low">Dưới 2M</SelectItem>
                  <SelectItem value="medium">2M - 4M</SelectItem>
                  <SelectItem value="high">Trên 4M</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('all');
                  setPriceRange('all');
                }}
                className="w-full"
              >
                Xóa bộ lọc
              </Button>
            </div>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={room.available ? 'default' : 'destructive'}>
                    {room.available ? 'Có sẵn' : 'Hết phòng'}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{room.name}</CardTitle>
                    <CardDescription className="mt-1">{room.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatPrice(room.price)}
                    </div>
                    <div className="text-sm text-gray-500">/đêm</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  {/* Room Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{room.capacity} khách</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bed className="h-4 w-4 text-gray-400" />
                      <span>{room.beds}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bath className="h-4 w-4 text-gray-400" />
                      <span>{room.size}m²</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <div className="text-sm font-medium mb-2">Tiện nghi:</div>
                    <div className="flex flex-wrap gap-1">
                      {room.amenities.slice(0, 4).map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          <span className="mr-1">{amenityIcons[amenity]}</span>
                          {amenity}
                        </Badge>
                      ))}
                      {room.amenities.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{room.amenities.length - 4} khác
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Book Button */}
                  <Button 
                    className="w-full mt-4"
                    disabled={!room.available}
                    onClick={() => handleBookRoom(room.id)}
                  >
                    {room.available ? 'Đặt phòng ngay' : 'Hết phòng'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">Không tìm thấy phòng phù hợp với tiêu chí tìm kiếm.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsXX;