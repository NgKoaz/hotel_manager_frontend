import React, { useState, useEffect } from 'react';
import { Calendar, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConfirmBookingPage from './ConfirmBookingPage';
import BookingFeePage from './BookingFeePage';

const BookingPage: React.FC = () => {
  return (
    <Tabs defaultValue="confirm" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-2">
        <TabsTrigger value="confirm" className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          Theo dõi trạng thái booking
        </TabsTrigger>
        <TabsTrigger value="checkin-out" className="flex items-center">
          <Settings className="mr-2 h-4 w-4" />
          Thêm phụ phí cho booking
        </TabsTrigger>
      </TabsList>

      <TabsContent value="confirm" className="space-y-6">
        <ConfirmBookingPage />
      </TabsContent>

      <TabsContent value="checkin-out" className="space-y-6">
        <BookingFeePage />
      </TabsContent>

      
    </Tabs>     
  );
};

export default BookingPage;

