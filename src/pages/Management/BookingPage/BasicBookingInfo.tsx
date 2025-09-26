import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookingItemTypeEnum } from '@/enums/BookingItemType.enum';
import { BookingStatusEnum } from '@/enums/BookingStatus.enum';
import { PaymentStatusEnum } from '@/enums/PaymentStatus.enum';
import { Booking } from '@/types/Booking';
import { formatDateTime, formatPrice } from '@/utils/formater.util';
import { GetBatchBookingResponse } from '@/api/dto/booking';


type BasicBookingInfoProps = {
  children?: React.ReactNode;
  booking: Booking;
  bookingRes: GetBatchBookingResponse;
};


const getStatusBadge = (status: number) => {
    switch (status) {
        case BookingStatusEnum.PENDING:
            return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 cursor-pointer">Chờ cọc hoặc xác nhận</Badge>;
        case BookingStatusEnum.CONFIRMED:
            return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer">Đã xác nhận</Badge>;
        case BookingStatusEnum.CANCELLED:
            return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 cursor-pointer">Đã hủy</Badge>;
        case BookingStatusEnum.CHECKED_IN:
            return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer">Đã Check-in</Badge>;
        case BookingStatusEnum.CHECKED_OUT:
            return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer">Đã Check-out</Badge>;
        case BookingStatusEnum.NO_SHOW:
            return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 cursor-pointer">Vắng mặt</Badge>;
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
};

const getPaymentBadge = (status: number) => {
    switch (status) {
        case PaymentStatusEnum.PAID:
            return <Badge className="bg-green-100 text-green-700">Đã thanh toán</Badge>;
        case PaymentStatusEnum.PARTIALLY_PAID:
            return <Badge className="bg-yellow-100 text-yellow-700">Đã cọc - Thanh toán một phần</Badge>;
        case PaymentStatusEnum.CONSIDER_REFUND:
            return <Badge className="bg-red-100 text-red-700">Xem xét hoàn trả</Badge>;
        case PaymentStatusEnum.UNPAID:
            return <Badge className="bg-red-100 text-red-700">Chưa thanh toán</Badge>;
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
};
  

const BasicBookingInfo: React.FC<BasicBookingInfoProps> = ({ children, booking, bookingRes }) => {
    const bookingItems = bookingRes.bookingItems.filter(bi => bi.bookingId == booking.id);
    const bookingRooms = bookingItems.filter(bi => bi.itemTypeId == BookingItemTypeEnum.Room);
    const bookingAddons = bookingItems.filter(bi => bi.itemTypeId == BookingItemTypeEnum.Addon);
    const payment = bookingRes.payments.find(p => p.bookingId == booking.id);
    const paymentDiscounts = bookingRes.paymentDiscounts.filter(pd => pd.paymentId == payment.id);
    const paymentTransactions = bookingRes.paymentTransactions.filter(pt => pt.paymentId == payment.id);

    let totalCost = bookingRooms.reduce((sum, br) => {
        return sum + br.unitPrice;
    }, 0)
    totalCost += bookingAddons.reduce((sum, ba) => {
        return sum + ba.unitPrice * ba.quantity;
    }, 0)
    let totalReduce = 0;

    return (
        <Card className="my-4">
            <CardHeader>
                <CardTitle className="text-center">
                    Booking #{booking.id}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* Adults & Children */}
                <div className="text-sm">
                    <p>
                    <strong>Người lớn: {booking.numAdults} - Trẻ em: {booking.numChildren}</strong>
                    </p>
                </div>

                {/* Rooms */}
                <div>
                    <h4 className="font-semibold mb-2">Phòng</h4>
                    <ul className="space-y-1 text-sm">
                    {bookingRooms.filter(ba => ba.bookingId == booking.id).map((br) => {
                        const room = bookingRes.rooms.find(r => r.id == br.itemTypeId);
                        const roomType = bookingRes.roomTypes.find(rt => rt.id == room.roomTypeId);
                        return (
                            <li
                                key={`${br.bookingId}-${br.itemId}-${br.itemTypeId}`}
                                className="flex justify-between border-b pb-1 last:border-none"
                            >
                            <span>
                                {roomType.name} (#{room.roomNumber})
                            </span>
                            <span className="font-medium">{formatPrice(br.unitPrice)}</span>
                            </li>
                        )
                    })}
                    </ul>
                    <Separator />
                </div>

                {/* Addons */}
                { bookingAddons.length > 0 && (
                    <div>
                        <h4 className="font-semibold mb-2">Dịch vụ thêm</h4>
                        <ul className="space-y-1 text-sm">
                        {bookingAddons.filter(ba => ba.bookingId == booking.id).map((ba) => {
                            const addon = bookingRes.addons.find(a => a.id == ba.itemId);                
                            return (
                                <li
                                    key={`${ba.bookingId}-${ba.itemId}`}
                                    className="flex justify-between border-b pb-1 last:border-none"
                                >
                                <span>
                                    {addon.name} × {ba.quantity}
                                </span>
                                <span className="font-medium">
                                    {

                                        formatPrice(ba.quantity * ba.unitPrice)
                                    }
                                </span>
                                </li>
                            )
                        })}
                        </ul>
                        <Separator />
                    </div>
                    
                )}

                {/* Discounts */}
                {paymentDiscounts.length > 0 && (
                    <div>
                        <h4 className="font-semibold mb-2">Giảm giá</h4>
                        <ul className="space-y-1 text-sm">
                            {paymentDiscounts.filter(pd => pd.paymentId == payment.id).map((pd) => {
                                const discount = bookingRes.discounts.find(d => d.id == pd.discountId);

                                let reducedCost = discount.maxAmount;
                                if (discount.percent) {
                                    reducedCost = discount.percent * totalCost / 100;
                                    if (discount.maxAmount && +reducedCost > +discount.maxAmount) {
                                        reducedCost = discount.maxAmount;
                                    }
                                }
                                totalReduce = Number(totalReduce) + Number(reducedCost);

                                return (
                                    <li
                                        key={discount.id}
                                        className="flex justify-between text-red-600"
                                    >
                                        <span>Code: {discount.code}. Giảm {discount.percent ? `${discount.percent}%` : `${discount.maxAmount}` } {discount.percent && discount.maxAmount > 0 ? `tối đa ${formatPrice(discount.maxAmount)}` : ""}</span>
                                        <span>-{formatPrice(reducedCost)}</span>
                                    </li>
                                )
                            })}
                        </ul>
                        <Separator />
                    </div>
                )}

                

                {/* Fee summary */}
                <div className="text-sm space-y-1">
                    <div className="flex justify-between font-bold text-base">
                        <span>Tổng phụ</span>
                        <span className="text-black-400">{formatPrice(totalCost)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-red-400 text-base">
                        <span>Tổng giảm</span>
                        <span className="text-red-400">-{formatPrice(+totalReduce)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                        <span>Tổng phải trả</span>
                        <span className="text-blue-600">{formatPrice(totalCost - totalReduce)}</span>
                    </div>
                </div>

                <Separator />

                {/* Payment */}
                { payment && 
                    ( 
                        <div>
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold mb-2">Giao dịch thanh toán</h4>
                                <div className="flex justify-between items-center text-sm">
                                    {getPaymentBadge(payment.paymentStatusId)}
                                </div>
                            </div>
                            <ul className="space-y-1 text-sm">
                                {paymentTransactions.filter(pt => pt.paymentId == payment.id).length == 0 &&
                                    (
                                        <div className="mx-auto w-fit">
                                            <span className="text-gray-500">Bạn chưa có giao dịch nào</span>
                                        </div>
                                    )
                                }
                                {paymentTransactions?.length > 0 && paymentTransactions.filter(pt => pt.paymentId == payment.id).map((pt) => (
                                    <li
                                    key={pt.id}
                                    className="flex justify-between border-b pb-1 last:border-none"
                                    >
                                    <span>
                                        ({formatDateTime(new Date(pt.createdAt))})
                                    </span>
                                    <span>{formatPrice(pt.amount)}</span>
                                    </li>
                                ))}
                            </ul>
                            {/* {
                                (
                                    <div className="flex justify-between font-medium mt-1">
                                        <span>Số tiền</span>
                                        <span>{formatPrice(payment.paidAmount)}</span>
                                    </div>
                                )
                            } */}
                        </div>
                    )
                }

                {children}
            </CardContent>
        </Card>

    );
};

export default BasicBookingInfo;