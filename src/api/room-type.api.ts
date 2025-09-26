import axios, { AxiosResponse } from "axios";
import { RoomType } from "@/types/RoomType";
import { API_URL_V1 } from "./config.api";

export const roomTypeApi = {
  async getAll(): Promise<RoomType[]> {
    const res: AxiosResponse<RoomType[]> = await axios.get(`${API_URL_V1}/room-types`, { withCredentials: true });
    return res.data;
  },

  async getById(id: number): Promise<RoomType> {
    const res: AxiosResponse<RoomType> = await axios.get(`${API_URL_V1}/room-types/${id}`, { withCredentials: true });
    return res.data;
  },

  async create(payload: Partial<RoomType>): Promise<RoomType> {
    const res: AxiosResponse<RoomType> = await axios.post(`${API_URL_V1}/room-types`, payload, { withCredentials: true });
    return res.data;
  },

  async update(id: number, payload: Partial<RoomType>): Promise<RoomType> {
    const res: AxiosResponse<RoomType> = await axios.put(`${API_URL_V1}/room-types/${id}`, payload, { withCredentials: true });
    return res.data;
  },

  async softDelete(id: number): Promise<{ message: string }> {
    const res: AxiosResponse<{ message: string }> = await axios.delete(`${API_URL_V1}/room-types/${id}`, { withCredentials: true });
    return res.data;
  }
};
