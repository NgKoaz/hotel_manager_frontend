import axios, { AxiosResponse } from "axios";
import { API_URL_V1 } from "./config.api";
import { RoomTypeImage } from "@/types/RoomTypeImage";



export const roomTypeImageApi = {
  async upload(file: File): Promise<{ imageUrl: string }> {
    const formData: FormData = new FormData();
    formData.append("file", file);

    const res: AxiosResponse<{ imageUrl: string }> = await axios.post(
      `${API_URL_V1}/room-type-images/upload`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data;
  },

  async create(payload: Partial<RoomTypeImage>): Promise<RoomTypeImage> {
    const res: AxiosResponse<RoomTypeImage> = await axios.post(
      `${API_URL_V1}/room-type-images`,
      payload,
      { withCredentials: true }
    );
    return res.data;
  },

  async getByRoomType(roomTypeId: number): Promise<RoomTypeImage[]> {
    const res: AxiosResponse<RoomTypeImage[]> = await axios.get(
      `${API_URL_V1}/room-type-images`,
      { params: { roomTypeId }, withCredentials: true }
    );
    return res.data;
  },

  async update(id: number, payload: Partial<RoomTypeImage>): Promise<RoomTypeImage> {
    const res: AxiosResponse<RoomTypeImage> = await axios.put(
      `${API_URL_V1}/room-type-images/${id}`,
      payload,
      { withCredentials: true }
    );
    return res.data;
  },

  async remove(id: number): Promise<{ message: string }> {
    const res: AxiosResponse<{ message: string }> = await axios.delete(
      `${API_URL_V1}/room-type-images/${id}`,
      { withCredentials: true }
    );
    return res.data;
  },
};
