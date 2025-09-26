import axios, { AxiosResponse } from "axios";
import { Addon } from "@/types/Addon";
import { API_URL_V1 } from "./config.api";


export const addonApi = {
  async getAll(): Promise<Addon[]> {
    const res: AxiosResponse<Addon[]> = await axios.get(`${API_URL_V1}/addons`);
    return res.data;
  },

  async create(payload: Partial<Addon>): Promise<Addon> {
    const res: AxiosResponse<Addon> = await axios.post(
      `${API_URL_V1}/addons`,
      payload,
      { withCredentials: true }
    );
    return res.data;
  },

  async update(id: number, payload: Partial<Addon>): Promise<Addon> {
    const res: AxiosResponse<Addon> = await axios.put(
      `${API_URL_V1}/addons/${id}`,
      payload,
      { withCredentials: true }
    );
    return res.data;
  },

  async remove(id: number): Promise<{ message: string; status: number }> {
    const res: AxiosResponse<{ message: string; status: number }> =
      await axios.delete(`${API_URL_V1}/addons/${id}`, { withCredentials: true });
    return res.data;
  },
};
