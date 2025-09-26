import axios, { AxiosResponse } from "axios";
import { API_URL_V1 } from "./config.api";
import { Room } from "@/types/Room";
import { RoomType } from "@/types/RoomType";
import { Floor } from "@/types/Floor";
import { RoomStatus } from "@/types/RoomStatus";
import { RoomTypeImage } from "@/types/RoomTypeImage";
import { RoomTypeAmenity } from "@/types/RoomTypeAmenity";
import { Amenity } from "@/types/Amenity";
import { BedType } from "@/types/BedType";
import { RoomTypeBedType } from "@/types/RoomTypeBedType";
import { Addon } from "@/types/Addon";

export interface RoomApiResponse {
  rooms: Room[];
  roomTypes: RoomType[];
  roomStatuses: RoomStatus[];
  roomTypeAmenities: RoomTypeAmenity[];
  roomTypeBedTypes: RoomTypeBedType[];
  amenities: Amenity[];
  addons: Addon[];
  bedTypes: BedType[];
  floors: Floor[];
  images: RoomTypeImage[];
}

const API = axios.create({
  baseURL: API_URL_V1,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 10000,
});

export const roomApi = {
  // Get all rooms + related data
  async getAll(): Promise<RoomApiResponse> {
    const res: AxiosResponse<RoomApiResponse> = await API.get("/rooms");
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
