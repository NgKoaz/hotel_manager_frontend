import { Addon } from "@/types/Addon";
import { Booking } from "@/types/Booking";
import { BookingItem } from "@/types/BookingItem";
import { Discount } from "@/types/Discount";
import { Payment } from "@/types/Payment";
import { PaymentDiscount } from "@/types/PaymentDiscount";
import { PaymentTransaction } from "@/types/PaymentTransaction";
import { Room } from "@/types/Room";
import { RoomType } from "@/types/RoomType";

export interface GetBatchBookingResponse {
    bookings: Booking[];
    bookingItems: BookingItem[];
    addons: Addon[];
    rooms: Room[];
    payments: Payment[];
    paymentDiscounts: PaymentDiscount[];
    paymentTransactions: PaymentTransaction[];
    discounts: Discount[];
    roomTypes: RoomType[];
}
  