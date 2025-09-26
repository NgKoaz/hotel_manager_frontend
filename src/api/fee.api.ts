import axios, { AxiosResponse } from "axios";
import { Fee } from "@/types/Fee";
import { API_URL_V1 } from "./config.api";


interface CreateFeePayloadRequest {
  bookingId: number;
  amount: number;
  description: string;
}


export const feeApi = {
  async getAllByBookingId(bookingId: number): Promise<Fee[]> {
    const res: AxiosResponse<Fee[]> = await axios.get(`${API_URL_V1}/fees?bookingId=${bookingId}`);
    return res.data;
  },

  async getOne(id: number): Promise<Fee> {
    const res: AxiosResponse<Fee> = await axios.get(`${API_URL_V1}/fees/${id}`);
    return res.data;
  },

  async create(payload: CreateFeePayloadRequest): Promise<Fee> {
    const res: AxiosResponse<Fee> = await axios.post(
      `${API_URL_V1}/fees`,
      payload,
      { withCredentials: true }
    );
    return res.data;
  },

  async update(id: number, payload: Partial<Fee>): Promise<Fee> {
    const res: AxiosResponse<Fee> = await axios.put(
      `${API_URL_V1}/fees/${id}`,
      payload,
      { withCredentials: true }
    );
    return res.data;
  },

  async remove(id: number): Promise<{ message: string }> {
    const res: AxiosResponse<{ message: string }> = await axios.delete(
      `${API_URL_V1}/fees/${id}`,
      { withCredentials: true }
    );
    return res.data;
  },
};
