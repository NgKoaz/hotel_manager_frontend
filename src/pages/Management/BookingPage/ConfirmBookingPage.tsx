import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { bookingApi } from "@/api/booking.api";
import { GetBatchBookingResponse } from '@/api/dto/booking';
import { BookingStatusEnum } from "@/enums/BookingStatus.enum";
import { Button } from '@/components/ui/button';
import { useEffect, useState } from "react";
import BasicBookingInfo from "./BasicBookingInfo";
import { toast } from "sonner";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PaymentStatusEnum } from '@/enums/PaymentStatus.enum';
import { paymentApi } from '@/api/payment.api';


const selectBookingStatusList = Object.keys(BookingStatusEnum)
    .filter((k) => isNaN(Number(k))) 
    .map((k) => ({
        value: BookingStatusEnum[k as keyof typeof BookingStatusEnum],
        label: k,
    }));


const ConfirmBookingPage: React.FC = () => {
    const [bookingRes, setBookingRes] = useState<GetBatchBookingResponse>(null);
    const [selectedBookingStatus, setSelectedBookingStatus] = 
        useState<BookingStatusEnum | number>(0);
    const [searchBookingId, setSearchBookingId] = useState<number>(0);

    const loadBookings = () => {
        bookingApi.getAll2()
            .then(setBookingRes)
            .catch(console.log);
    }
      
    useEffect(() => {
        loadBookings();
    }, []);
    
    const bookings = bookingRes?.bookings.reverse();
    if (!bookings?.length) return;

    const filteredBookings = bookings.filter(b => 
        b.bookingStatusId == selectedBookingStatus && 
        (!searchBookingId || b.id == searchBookingId)
    )

    const onConfirm = (bookingId: number) => {
        bookingApi.update(bookingId, { bookingStatusId: BookingStatusEnum.CONFIRMED })
            .then(booking => {
                if (booking.bookingStatusId == BookingStatusEnum.CONFIRMED)
                    toast.success("Đã xác nhận Booking");
                else 
                    toast.error("Lỗi không xác định")
                
            })
            .catch(console.log)
        loadBookings();
    }

    const onCancel = async (bookingId: number) => {
        bookingApi.cancel(bookingId)
            .then(data => toast.success(data.message))
            .catch(console.log);
        loadBookings();
    }

    const onCheckin = (bookingId: number) => {
        bookingApi.update(bookingId, { bookingStatusId: BookingStatusEnum.CHECKED_IN })
            .then(booking => {
                if (booking.bookingStatusId == BookingStatusEnum.CHECKED_IN) {
                    toast.success("Đã xác nhận check-in");
                    loadBookings();
                } else toast.error("Lỗi không xác định")
                
            })
            .catch(err => toast.success(err.response.data.message));
        
    }

    const onCheckout = (bookingId: number) => {
        bookingApi.update(bookingId, { bookingStatusId: BookingStatusEnum.CHECKED_OUT })
            .then(booking => {
                if (booking.bookingStatusId as BookingStatusEnum == BookingStatusEnum.CHECKED_OUT) {
                    toast.success("Đã xác nhận check-out");
                    loadBookings();
                } else toast.error("Lỗi không xác định")
            })
            .catch(err => toast.success(err.response.data.message));
    }

    const onNoShow = (bookingId: number) => {
        bookingApi.update(bookingId, { bookingStatusId: BookingStatusEnum.NO_SHOW })
            .then(booking => {
                if (booking.bookingStatusId == BookingStatusEnum.NO_SHOW)
                    toast.success("Đã xác nhận vắng mặt");
                else 
                    toast.error("Lỗi không xác định")
                
            })
            .catch(err => toast.success(err.response.data.message));
        loadBookings();
    }

    const onPay = (bookingId: number) => {
        paymentApi.updatePaymentStatus(
            bookingId,
            PaymentStatusEnum.PAID
        ).then(payment => {
            if (payment.paymentStatusId == PaymentStatusEnum.PAID)
                toast.success("Xác nhận thanh toán thành công");
            else 
                toast.error("Không thành công.")
        })
        .catch(err => toast.success(err.response.data.message));
        
        loadBookings();
    }

    return (
        <div>
            <div className="text-center text-2xl my-4 font-bold">
                Theo dõi trạng thái booking
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <Label>Lọc trạng thái Booking</Label>
                    <Select
                        value={selectedBookingStatus.toString()}
                        onValueChange={(v) => setSelectedBookingStatus(+v as BookingStatusEnum)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Chọn loại phòng" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem key="0" value="0">
                                Chọn trạng thái booking...
                            </SelectItem>
                            {selectBookingStatusList &&
                                selectBookingStatusList.map(s => (
                                    <SelectItem key={s.value} value={s.value.toString()}>
                                        {s.label}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex-1">
                    <Label htmlFor="bookingId">Tìm kiếm bằng booking ID</Label>
                    <Input
                        id="bookingId"
                        type="number"
                        placeholder="Nhập booking ID"
                        value={searchBookingId}
                        onChange={(e) => setSearchBookingId(+e.target.value)}
                        required
                    />
                </div>
            </div>
            <div>
            {filteredBookings.length == 0 && (
                <div className="my-4 text-center text-base text-gray-500">
                    Không có booking nào
                </div>
            )}
            {filteredBookings && filteredBookings.map(b => {
                return (
                    <BasicBookingInfo
                        key={b.id}
                        booking={b}
                        bookingRes={bookingRes}
                    >
                        <div className="flex items-center gap-2 justify-end">
                            {
                                b.bookingStatusId == BookingStatusEnum.PENDING && (
                                    <Button variant="default" onClick={e => onConfirm(b.id)}>Xác nhận</Button>
                                )
                            }
                            {
                                b.bookingStatusId == BookingStatusEnum.CONFIRMED && (
                                    <>
                                        <Button variant="default" onClick={e => onCheckin(b.id)}>Check-in</Button>
                                        <Button variant="default" onClick={e => onNoShow(b.id)}>Vắng mặt</Button>
                                    </>
                                )
                            }
                            {/* {
                                b.bookingStatusId == BookingStatusEnum.CHECKED_IN && 
                            } */}
                            {
                                b.bookingStatusId == BookingStatusEnum.CHECKED_IN && (
                                    <>
                                        <Button className="bg-green-600 hover:bg-green-500" onClick={e => onPay(b.id)}>Thanh toán</Button>
                                        <Button variant="default" onClick={e => onCheckout(b.id)}>Check-out</Button>
                                    </>
                                )
                            }
                            {
                                (b.bookingStatusId == BookingStatusEnum.PENDING ||
                                b.bookingStatusId == BookingStatusEnum.CONFIRMED) && (
                                    <Button variant="destructive" onClick={e => onCancel(b.id)}>Hủy booking</Button>
                                )
                            }
                        </div>
                    </BasicBookingInfo>
                )
            })}
            </div>
        </div>
    )
}

export default ConfirmBookingPage