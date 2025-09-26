import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, Users, CreditCard, CheckCircle } from 'lucide-react';
import CustomerInfo from './CustomerInfo';
import { Addon } from '@/types/Addon'; 
import BookingAddon from './BookingAddon';
import CheckInOut from './CheckInOut';
import SelectPeopleSize from './SelectPeopleSize';
import { roomApi, RoomApiResponse } from '@/api/room.api';
import BookingRoom from './BookingRoom';
import SelectedRoom from './SelectedRoom';
import { bookingApi } from '@/api/booking.api';
import DiscountComponent from './DiscountComponent';
import { discountApi } from '@/api/discount.api';
import { Discount } from '@/types/Discount';
import Total from './Total';
import { RoleEnum } from '@/enums/Role.enum';
import { useAuth } from '@/contexts/AuthContext';
import { myApi } from '@/api/my.api';
import { toast } from 'sonner';


export interface AddonSelected {
  id: number;
  quantity: number;
}


const BookingMulti: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [roomTypeIdSelected, setRoomTypeIdSelected] = useState<number>(Number(searchParams.get("roomType")) ?? 0);
  const [roomIdSelected, setRoomIdSelected] = useState<number>(0);
  const [discountsSelected, setDiscountsSelected] = useState<number[]>([]);

  const [roomIds, setRoomIds] = useState<number[]>([]);
  const [addonsSelected, setAddonsSelected] = useState<AddonSelected[]>([]);

  const [checkIn, setCheckIn] = useState<string>(() => {
    const now = new Date();
    now.setHours(14, 0, 0, 0); 
    return now.toISOString().slice(0, 16);
  });

  const [checkOut, setCheckOut] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(12, 0, 0, 0);
    return tomorrow.toISOString().slice(0, 16);
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const [roomApiRes, setRoomApiRes] = useState<RoomApiResponse>();  

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const addons: Addon[] = roomApiRes?.addons || [];

  useEffect(() => {
    roomApi.getAll()
      .then(setRoomApiRes)
      .catch(err => console.error(err));
    
    discountApi.getAll()
      .then(setDiscounts)
      .catch(err => console.error(err));

  }, []);
  
  const roomTypes = roomApiRes?.roomTypes;
  const rooms = roomApiRes?.rooms;
  const calculateNights = () => {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = outDate.getTime() - inDate.getTime();
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 1);
  };
  const nights = calculateNights()

  const discountedList: { discountId: number, amount: number}[] = []
  
  const calculateSubTotal = () => {
    let roomTotal = roomIds.reduce((sum, roomId) => {
      const room = rooms.find(r => r.id === roomId);
      const roomType = roomTypes.find(rt => rt.id == room.roomTypeId);
      return sum + roomType.basePrice * nights;
    }, 0)

    const addonsTotal = addonsSelected.reduce((sum, aid) => {
      const addon = addons.find(a => a.id === +aid);
      return sum + (addon ? addon.basePrice : 0);
    }, 0);

    return roomTotal + addonsTotal;
  }

  const calculateTotal = (subTotal: number) => {
    const discountAmount = discountsSelected.reduce((sum: number, discountId) => {
      const discount = discounts.find(d => d.id === discountId);
      
      let amount = discount.maxAmount;
      if (discount.percent) {
        amount = subTotal * discount.percent / 100.0;
        if (discount.maxAmount && amount > discount.maxAmount) {
          amount = discount.maxAmount;
        }
      }
      discountedList.push({ discountId, amount });
      return Number(sum) + Number(amount);
    }, 0);
    console.log(discountAmount)
    const grandTotal = subTotal - discountAmount;
    return (grandTotal > 0) ? grandTotal : 0;
  };
  const subTotal = calculateSubTotal();
  const total = calculateTotal(subTotal);


  const addRoom = () => {
    if (!roomIdSelected || !roomTypeIdSelected) return;
    setRoomIds([...roomIds, roomIdSelected]);
    setRoomTypeIdSelected(0);
    setRoomIdSelected(0);
  }
  const { roleIds } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // if (!isAuthenticated) {
    //   setError('Vui lòng đăng nhập để đặt phòng');
    //   return;
    // }

    // if (roomsSelected.some(r => !r.roomId)) {
    //   setError('Vui lòng chọn tất cả các phòng');
    //   return;
    // }

    setLoading(true);
    try {
      if (roleIds?.some(id => id == RoleEnum.Admin || id == RoleEnum.Receptionist)) {
        const booking = await bookingApi.createBooking({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          numChildren: children,
          numAdults: adults,
          roomIds: roomIds,
          checkinDate: checkIn,
          checkoutDate: checkOut,
          addons: addonsSelected,
          discounts: discountsSelected
        });
        console.log(booking);
      } else {
        const booking = await myApi.createBooking({
          numChildren: children,
          numAdults: adults,
          roomIds: roomIds,
          checkinDate: checkIn,
          checkoutDate: checkOut,
          addons: addonsSelected,
          discounts: discountsSelected
        });
        console.log(booking);
      }
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      setSuccess(true);
    } catch(err) {
      toast.error(err.response?.data?.message || "Đặt phòng thất bại");
      console.log(err.response.data.message)
    } finally {
      setLoading(false);
    }
  };

  if (success)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="text-center p-12">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Đặt phòng thành công!</h2>
          <Button onClick={() => navigate('/account')}>Xem đặt phòng</Button>
        </Card>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Đặt nhiều phòng</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Customer Info */}
            <CustomerInfo 
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              phone={phone}
              setPhone={setPhone}
              email={email}
              setEmail={setEmail}
            />

            {/* Check-in/out */}
            <CheckInOut 
              checkIn={checkIn}
              setCheckIn={setCheckIn}
              checkOut={checkOut}
              setCheckOut={setCheckOut}
            />

            <SelectPeopleSize 
              adults={adults}
              setAdults={setAdults}
              children={children}
              setChildren={setChildren}
            />

            {/* Rooms */}
            <BookingRoom 
              roomApiRes={roomApiRes}
              roomIds={roomIds}
              roomTypeIdSelected={roomTypeIdSelected}
              setRoomTypeIdSelected={setRoomTypeIdSelected}
              roomIdSelected={roomIdSelected}
              setRoomIdSelected={setRoomIdSelected}
              addRoom={addRoom}
            />
           
            {/* Selected Room */}
            <SelectedRoom 
              roomApiRes={roomApiRes}
              roomIds={roomIds}
              setRoomIds={setRoomIds}
            />

            {/* Addons */}
            {addons?.length > 0 && (
              <BookingAddon
                addons={addons || []}
                addonsSelected={addonsSelected}
                setAddonsSelected={setAddonsSelected}
              />
            )}

            {/* Discount */}
            {discounts?.length > 0 && (
              <DiscountComponent
                discounts={discounts}
                discountsSelected={discountsSelected}
                setDiscountsSelected={setDiscountsSelected}
              />
            )}

            {/* Total */}
            <Total
              nights={nights}
              subTotal={subTotal}
              total={total}
              discounts={discounts}
              discountedList={discountedList}
              roomApiRes={roomApiRes}
            /> 

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Xác nhận đặt phòng'}
            </Button>
          </form>
      </div>
     </div>
  );
};

export default BookingMulti;
