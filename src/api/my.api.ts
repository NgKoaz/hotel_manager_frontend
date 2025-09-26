// my.api.ts
import axios, { AxiosResponse } from "axios";
import { API_URL_V1 } from "./config.api";
import { Booking } from "@/types/Booking";
import { Addon } from "@/types/Addon";
import { Room } from "@/types/Room";
import { User } from "@/types/User";
import { BookingItem } from "@/types/BookingItem";
import { Payment } from "@/types/Payment";
import { RoomType } from "@/types/RoomType";
import { PaymentDiscount } from "@/types/PaymentDiscount";
import { Discount } from "@/types/Discount";
import { PaymentTransaction } from "@/types/PaymentTransaction";
import { AddonSelected } from "@/pages/Booking/Booking";

export interface MyBookingsResponse {
  bookings: Booking[];
  bookingItems: BookingItem[];
  addons: Addon[];
  rooms: Room[];
  payments: Payment[];
  paymentDiscounts: PaymentDiscount[];
  paymentTransactions: PaymentTransaction[];
  discounts: Discount[];
  roomTypes: RoomType[];
};

export interface ProfileResponse {
  user: User;
  roles: number[];
};


export interface MyBookingRequest {
  checkinDate: string;
  checkoutDate: string;
  numChildren: number;
  numAdults: number;
  roomIds: number[];
  addons?: AddonSelected[];
  discounts?: number[];
}


export const myApi = {
  async getBookings(): Promise<MyBookingsResponse> {
    const res: AxiosResponse<MyBookingsResponse> = await axios.get(
      `${API_URL_V1}/my/bookings`,
      { withCredentials: true }
    );
    return res.data;
  },

  async getProfile(): Promise<ProfileResponse> {
    const res: AxiosResponse<ProfileResponse> = await axios.get(
      `${API_URL_V1}/my/profile`,
      { withCredentials: true }
    );
    return res.data;
  },
  
  createBooking: async (data: MyBookingRequest): Promise<Booking> => {
    const response: AxiosResponse<Booking> = await axios.post(`${API_URL_V1}/my/bookings`, data,
      { withCredentials: true });
    return response.data;
  },

  async cancelBooking(id: number): Promise<{ message: string; status: number }> {
    const res: AxiosResponse<{ message: string; status: number }> =
      await axios.delete(`${API_URL_V1}/my/bookings/${id}`, {
        withCredentials: true,
      });
    return res.data;
  },
};
