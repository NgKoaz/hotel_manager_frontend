import axios, { AxiosResponse } from "axios";
import { API_URL_V1 } from "./config.api";
import { Room } from "@/types/Room";
import { GetBatchRoomResponse } from "./dto/room";

const API = axios.create({
  baseURL: API_URL_V1,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 10000,
});

export const roomApi = {
  // Get all rooms + related data
  async getAll(): Promise<GetBatchRoomResponse> {
    const res: AxiosResponse<GetBatchRoomResponse> = await API.get("/rooms");
    return res.data;
  },

  async getAll2(): Promise<Room[]> {
    const res: AxiosResponse<Room[]> = await API.get("/rooms?type=2");
    return res.data;
  },

  // Get single room
  async getById(id: number): Promise<Room> {
    const res: AxiosResponse<Room> = await API.get(`/rooms/${id}`);
    return res.data;
  },

  // Create room
  async create(data: {
    roomNumber: number;
    floorId: number;
    roomTypeId: number;
    roomStatusId: number;
  }): Promise<Room> {
    const res: AxiosResponse<Room> = await API.post("/rooms", data);
    return res.data;
  },

  // Update room
  async update(
    id: number,
    data: Partial<{ roomNumber: number; floorId: number; roomTypeId: number; roomStatusId: number }>
  ): Promise<Room> {
    const res: AxiosResponse<Room> = await API.put(`/rooms/${id}`, data);
    return res.data;
  },

  // Soft delete room
  async remove(id: number): Promise<{ message: string }> {
    const res: AxiosResponse<{ message: string }> = await API.delete(`/rooms/${id}`);
    return res.data;
  },
};
