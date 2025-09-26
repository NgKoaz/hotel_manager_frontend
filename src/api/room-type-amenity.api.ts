// room-type-amenity.api.ts
import axios, { AxiosResponse } from "axios";
import { API_URL_V1 } from "./config.api";
import { RoomTypeAmenity } from "@/types/RoomTypeAmenity";
import { RoomType } from "@/types/RoomType";
import { Amenity } from "@/types/Amenity";

export interface RoomTypeAmenityRes extends RoomTypeAmenity {
  roomType: RoomType;
  amenity: Amenity;
}

export const roomTypeAmenityApi = {
  async getAll(): Promise<RoomTypeAmenity[]> {
    const res: AxiosResponse<RoomTypeAmenity[]> = await axios.get(
      `${API_URL_V1}/room-type-amenities`,
      { withCredentials: true }
    );
    return res.data;
  },

  async getById(roomTypeId: number, amenityId: number): Promise<RoomTypeAmenityRes> {
    const res: AxiosResponse<RoomTypeAmenityRes> = await axios.get(
      `${API_URL_V1}/room-type-amenities/${roomTypeId}/${amenityId}`,
      { withCredentials: true }
    );
    return res.data;
  },

  async create(payload: Partial<RoomTypeAmenity>): Promise<RoomTypeAmenityRes> {
    const res: AxiosResponse<RoomTypeAmenityRes> = await axios.post(
      `${API_URL_V1}/room-type-amenities`,
      payload,
      { withCredentials: true }
    );
    return res.data;
  },

  async update(
    roomTypeId: number,
    amenityId: number,
    payload: Partial<RoomTypeAmenityRes>
  ): Promise<RoomTypeAmenityRes> {
    const res: AxiosResponse<RoomTypeAmenityRes> = await axios.put(
      `${API_URL_V1}/room-type-amenities/${roomTypeId}/${amenityId}`,
      payload,
      { withCredentials: true }
    );
    return res.data;
  },

  async remove(roomTypeId: number, amenityId: number): Promise<{ message: string }> {
    const res: AxiosResponse<{ message: string }> = await axios.delete(
      `${API_URL_V1}/room-type-amenities/${roomTypeId}/${amenityId}`,
      { withCredentials: true }
    );
    return res.data;
  }
};
