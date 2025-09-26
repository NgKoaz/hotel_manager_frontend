import axios, { AxiosResponse } from "axios";
import { User } from "@/types/User";
import { API_URL_V1 } from "./config.api";

export const userApi = {
  async getAll(): Promise<User[]> {
    const res: AxiosResponse<User[]> = await axios.get(`${API_URL_V1}/users/`, { withCredentials: true });
    return res.data;
  },

  async create(payload: Partial<User>): Promise<User> {
    const res: AxiosResponse<User> = await axios.post(`${API_URL_V1}/users/`, payload, { withCredentials: true });
    return res.data;
  },

  async update(id: number, payload: Partial<User>): Promise<User> {
    const res: AxiosResponse<User> = await axios.put(`${API_URL_V1}/users/${id}`, payload, { withCredentials: true });
    return res.data;
  },

  async remove(id: number): Promise<{ message: string; status: number }> {
    const res: AxiosResponse<{ message: string; status: number }> = await axios.delete(
      `${API_URL_V1}/users/${id}`,
      { withCredentials: true }
    );
    return res.data;
  },
};
