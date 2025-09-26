import axios, { AxiosResponse } from "axios";
import { BookingItem } from "@/types/BookingItem";
import { BookingItemTypeEnum } from "@/enums/BookingItemType.enum";
import { API_URL_V1 } from "./config.api";

export const bookingItemApi = {
  async getByBooking(bookingId: number): Promise<BookingItem[]> {
    const res: AxiosResponse<BookingItem[]> = await axios.get(
      `${API_URL_V1}/booking-items/${bookingId}`,
      { withCredentials: true }
    );
    return res.data;
  },

  async getByType(bookingId: number, typeId: BookingItemTypeEnum): Promise<BookingItem[]> {
    const res: AxiosResponse<BookingItem[]> = await axios.get(
      `${API_URL_V1}/booking-items/${bookingId}/type/${typeId}`,
      { withCredentials: true }
    );
    return res.data;
  },

  async create(payload: Partial<BookingItem>): Promise<BookingItem> {
    const res: AxiosResponse<BookingItem> = await axios.post(
      `${API_URL_V1}/booking-items`,
      payload,
      { withCredentials: true }
    );
    return res.data;
  },

  async update(bookingId: number, roomId: number, payload: Partial<BookingItem>): Promise<BookingItem> {
    const res: AxiosResponse<BookingItem> = await axios.put(
      `${API_URL_V1}/booking-items/${bookingId}/${roomId}`,
      payload,
      { withCredentials: true }
    );
    return res.data;
  },

  async remove(bookingId: number, roomId: number): Promise<{ message: string }> {
    const res: AxiosResponse<{ message: string }> = await axios.delete(
      `${API_URL_V1}/booking-items/${bookingId}/${roomId}`,
      { withCredentials: true }
    );
    return res.data;
  },
};
