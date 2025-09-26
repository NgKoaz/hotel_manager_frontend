import axios, { AxiosResponse } from "axios";
import { Payment } from "@/types/Payment";
import { API_URL_V1 } from "./config.api";
import { PaymentStatusEnum } from "@/enums/PaymentStatus.enum";

export const paymentApi = {
  async getAll(): Promise<Payment[]> {
    const res: AxiosResponse<Payment[]> = await axios.get(`${API_URL_V1}/payments`, { withCredentials: true });
    return res.data;
  },

  async getOne(id: number): Promise<Payment> {
    const res: AxiosResponse<Payment> = await axios.get(`${API_URL_V1}/payments/${id}`, { withCredentials: true });
    return res.data;
  },

  async create(payload: Partial<Payment>): Promise<Payment> {
    const res: AxiosResponse<Payment> = await axios.post(`${API_URL_V1}/payments`, payload, { withCredentials: true });
    return res.data;
  },

  async updatePaymentStatus(bookingId: number, paymentStatusId: PaymentStatusEnum) {
    const res: AxiosResponse<Payment> = await axios.post(`${API_URL_V1}/payments/${bookingId}`, { paymentStatusId }, { withCredentials: true });
    return res.data;
  }

};
