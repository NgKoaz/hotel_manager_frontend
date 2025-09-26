import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Settings } from 'lucide-react';
import Profile from './Profile';
import BookingHistoryCard from './BookingHistory/BookingHistory';


const Account: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Danh sách lịch sử Booking của tôi
          </h1>
          <p className="text-lg text-gray-600">
            Xem và quản lý các đặt phòng của bạn
          </p>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-2">
            <TabsTrigger value="bookings" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Lịch sử đặt phòng
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Tài khoản
            </TabsTrigger>
          </TabsList>

          {/* Booking History Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <BookingHistoryCard />
          </TabsContent>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Profile />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;