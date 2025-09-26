import axios, { AxiosResponse } from "axios";
import { Booking } from "@/types/Booking";
import { API_URL_V1 } from "./config.api";
import { AddonSelected } from "@/pages/Booking/Booking";
import { BookingItem } from "@/types/BookingItem";
import { Addon } from "@/types/Addon";
import { Room } from "@/types/Room";
import { Payment } from "@/types/Payment";
import { PaymentDiscount } from "@/types/PaymentDiscount";
import { PaymentTransaction } from "@/types/PaymentTransaction";
import { Discount } from "@/types/Discount";
import { RoomType } from "@/types/RoomType";


export interface BookingRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkinDate: string;
  checkoutDate: string;
  numChildren: number;
  numAdults: number;
  roomIds: number[];
  addons?: AddonSelected[];
  discounts?: number[];
}


export interface GetAll2BookingResponse {
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

const API = axios.create({
  baseURL: API_URL_V1,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 10000,
});

export const bookingApi = {
  // Create Booking (giữ nguyên)
  createBooking: async (data: BookingRequest): Promise<Booking> => {
    const response: AxiosResponse<Booking> = await API.post("/bookings", data, { withCredentials: true  });
    return response.data;
  },

  // Get all bookings
  getAll: async (): Promise<Booking[]> => {
    const response: AxiosResponse<Booking[]> = await API.get("/bookings");
    return response.data;
  },

  getAll2: async (): Promise<GetAll2BookingResponse> => {
    const response: AxiosResponse<GetAll2BookingResponse> = await API.get("/bookings?type=2");
    return response.data;
  },

  // Get booking by id
  getById: async (id: number): Promise<Booking> => {
    const response: AxiosResponse<Booking> = await API.get(`/bookings/${id}`);
    return response.data;
  },

  // Update booking
  update: async (id: number, data: Partial<Booking>): Promise<Booking> => {
    const response: AxiosResponse<Booking> = await API.put(`/bookings/${id}`, data);
    return response.data;
  },

  // Cancel booking
  cancel: async (bookingId: number): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await API.delete(`/bookings/${bookingId}`);
    return response.data;
  },
};
