import axios, { AxiosResponse } from "axios";
import { Discount } from "@/types/Discount";
import { API_URL_V1 } from "./config.api";


export const discountApi = {
  async getAll(): Promise<Discount[]> {
    const res: AxiosResponse<Discount[]> = await axios.get(`${API_URL_V1}/discounts/`, { withCredentials: true });
    return res.data;
  },

  async getById(id: number): Promise<Discount> {
    const res: AxiosResponse<Discount> = await axios.get(`${API_URL_V1}/discounts/${id}`, { withCredentials: true });
    return res.data;
  },

  async create(payload: Partial<Discount>): Promise<Discount> {
    const res: AxiosResponse<Discount> = await axios.post(`${API_URL_V1}/discounts/`, payload, { withCredentials: true });
    return res.data;
  },

  async update(id: number, payload: Partial<Discount>): Promise<Discount> {
    const res: AxiosResponse<Discount> = await axios.put(`${API_URL_V1}/discounts/${id}`, payload, { withCredentials: true });
    return res.data;
  },

  async remove(id: number): Promise<{ message: string }> {
    const res: AxiosResponse<{ message: string }> = await axios.delete(`${API_URL_V1}/discounts/${id}`, { withCredentials: true });
    return res.data;
  },
};
