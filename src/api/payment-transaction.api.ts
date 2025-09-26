import axios, { AxiosResponse } from "axios";
import { PaymentTransaction } from "@/types/PaymentTransaction";
import { API_URL_V1 } from "./config.api";

export const paymentTransactionApi = {
  async getAll(): Promise<PaymentTransaction[]> {
    const res: AxiosResponse<PaymentTransaction[]> = await axios.get(
      `${API_URL_V1}/payment-transactions`,
      { withCredentials: true }
    );
    return res.data;
  },

  async getOne(id: number): Promise<PaymentTransaction> {
    const res: AxiosResponse<PaymentTransaction> = await axios.get(
      `${API_URL_V1}/payment-transactions/${id}`,
      { withCredentials: true }
    );
    return res.data;
  },

  async create(payload: Partial<PaymentTransaction>): Promise<PaymentTransaction> {
    const res: AxiosResponse<PaymentTransaction> = await axios.post(
      `${API_URL_V1}/payment-transactions`,
      payload,
      { withCredentials: true }
    );
    return res.data;
  },

  async update(id: number, payload: Partial<PaymentTransaction>): Promise<PaymentTransaction> {
    const res: AxiosResponse<PaymentTransaction> = await axios.put(
      `${API_URL_V1}/payment-transactions/${id}`,
      payload,
      { withCredentials: true }
    );
    return res.data;
  },

  async remove(id: number): Promise<{ message: string }> {
    const res: AxiosResponse<{ message: string }> = await axios.delete(
      `${API_URL_V1}/payment-transactions/${id}`,
      { withCredentials: true }
    );
    return res.data;
  },
};
