import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coffee, Hotel, Users, Calendar, Settings, FileText, Percent, Tag, Layers, Bed, Link, Sliders, Image, User, Shield, Star, Eye, BedDouble, CreditCard, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AddonPage from './Management/AddonPage';
import RoomTypePage from './Management/RoomTypePage';
import AmenityPage from './Management/AmenityPage';
import BetTypePage from './Management/BedTypePage';
import DiscountPage from "@/pages/Management/DiscountPage";
import FloorPage from "@/pages/Management/FloorPage";
import RoomPage from "@/pages/Management/RoomPage/RoomPage";
import RoomTypeAmenityPage from "@/pages/Management/RoomTypeAmenityPage";
import RoomTypeImagePage from "@/pages/Management/RoomTypeImagePage";
import UserPage from "@/pages/Management/UserPage";
import UserRolePage from "@/pages/Management/UserRolePage";
import BookingPage from '@/pages/Management/BookingPage/BookingPage';
import RoomTypeBedTypePage from './Management/RoomTypeBedTypePage';
import PaymentTransactionPage from './Management/PaymentTransaction';
import FeePage from './Management/FeePage';
import { useNavigate } from 'react-router-dom';
import { RoleEnum } from '@/enums/Role.enum';
import { toast } from 'sonner';
// import BookingItemPage from './Management/BookingItemPage';

interface Feature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  component: React.FC;
}

const AdminConfigPage: React.FC = () => {
  const { user, isAuthenticated, roleIds, checkedProfile } = useAuth();
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkedProfile) {
      return;
    }
    if (!isAuthenticated) {
      navigate("/login");
    }
    if (roleIds.length == 0 || !roleIds.some(id => id == RoleEnum.Admin || id == RoleEnum.Receptionist)) {
      navigate("/notfoundanything");
    }
  }, [isAuthenticated, roleIds, checkedProfile]);

  // if (!isAuthenticated || user?.role !== 'admin') {
  //   return <Navigate to="/login" />;
  // }

  const features: Feature[] = [
    { id: 'room', name: 'Room', description: 'Quản lý phòng', icon: <Bed className="h-6 w-6 text-blue-700" />, component: RoomPage },
    { id: 'roomType', name: 'Quản lý RoomType', description: 'Thêm, sửa, xóa loại phòng', icon: <Hotel className="h-6 w-6 text-blue-500" />, component: RoomTypePage },
    { id: 'room-type-bed-type', name: 'Quản lý RoomType-BedType', description: 'Thêm, sửa, xóa mối quan hệ RoomType và BedType', icon: <BedDouble className="h-6 w-6 text-indigo-500" />, component: RoomTypeBedTypePage },
    { id: 'bed-type', name: 'Quản lý loại giường', description: 'Thêm, xóa, sửa các loại giường', icon: <FileText className="h-6 w-6 text-orange-500" />, component: BetTypePage },
    { id: 'roomTypeImage', name: 'Quản lý RoomType-Image', description: 'Hình ảnh loại phòng', icon: <Image className="h-6 w-6 text-yellow-600" />, component: RoomTypeImagePage },
    { id: 'roomTypeAmenity', name: 'Quản lý RoomType-Amenity', description: 'Liên kết Loại phòng - Tiện nghi', icon: <Link className="h-6 w-6 text-teal-500" />, component: RoomTypeAmenityPage },
    { id: 'amenity', name: 'Quản lý Amenity', description: 'Tiện nghi của phòng', icon: <FileText className="h-6 w-6 text-orange-500" />, component: AmenityPage },
    { id: 'floor', name: 'Quản lý Floor', description: 'Quản lý tầng', icon: <Layers className="h-6 w-6 text-indigo-500" />, component: FloorPage },
    { id: 'paymentTransaction', name: 'Quản lý Payment Transaction', description: 'Các giao dịch thanh toán', icon: <CreditCard className="h-6 w-6 text-blue-500" />, component: PaymentTransactionPage },
    { id: 'addon', name: 'Quản lý Addon', description: 'Thêm, sửa, xóa tiện ích', icon: <Coffee className="h-6 w-6 text-yellow-500" />, component: AddonPage },
    { id: 'booking', name: 'Booking', description: 'Quản lý Booking', icon: <Calendar className="h-6 w-6 text-purple-500" />, component: BookingPage },
    { id: 'discount', name: 'Discount', description: 'Quản lý giảm giá', icon: <Tag className="h-6 w-6 text-red-500" />, component: DiscountPage },
    { id: 'user', name: 'User', description: 'Quản lý người dùng', icon: <User className="h-6 w-6 text-blue-400" />, component: UserPage },
    { id: 'userRole', name: 'User Role', description: 'Vai trò người dùng', icon: <Shield className="h-6 w-6 text-gray-700" />, component: UserRolePage },
    // { id: 'bookingItem', name: 'Booking Item', description: 'Quản lý các mục đặt phòng', icon: <Coffee className="h-6 w-6 text-yellow-500" />, component: BookingItemPage },
    // { id: 'fineFee', name: 'Fine Fee', description: 'Quản lý phí phạt', icon: <AlertCircle className="h-6 w-6 text-red-500" />, component: FeePage },
  ];
  

  let WidgetComponent = null
  if (selectedFeature) {
    const widget = features.find(f => f.id === selectedFeature);
    WidgetComponent = widget?.component;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

        {!selectedFeature ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <Card key={f.id} className="hover:shadow-lg cursor-pointer transition" onClick={() => setSelectedFeature(f.id)}>
                <CardHeader className="flex items-center space-x-3">
                  {f.icon}
                  <CardTitle>{f.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-sm">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <Button variant="outline" onClick={() => setSelectedFeature(null)}>← Quay lại Dashboard</Button>
            {WidgetComponent && <WidgetComponent />}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminConfigPage;
