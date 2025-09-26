import axios, { AxiosResponse } from "axios";
import { API_URL_V1 } from "./config.api";
import { RoomTypeBedType } from "@/types/RoomTypeBedType";


export const roomTypeBedTypeApi = {
  async getAll(): Promise<RoomTypeBedType[]> {
    const res: AxiosResponse<RoomTypeBedType[]> = await axios.get(
      `${API_URL_V1}/room-type-bed-types`,
      { withCredentials: true }
    );
    return res.data;
  },

  async getById(roomTypeId: number, bedTypeId: number): Promise<RoomTypeBedType> {
    const res: AxiosResponse<RoomTypeBedType> = await axios.get(
      `${API_URL_V1}/room-type-bed-types/${roomTypeId}/${bedTypeId}`,
      { withCredentials: true }
    );
    return res.data;
  },

  async create(payload: Partial<RoomTypeBedType>): Promise<RoomTypeBedType> {
    const res: AxiosResponse<RoomTypeBedType> = await axios.post(
      `${API_URL_V1}/room-type-bed-types`,
      payload,
      { withCredentials: true }
    );
    return res.data;
  },

  async update(
    roomTypeId: number,
    bedTypeId: number,
    payload: Partial<RoomTypeBedType>
  ): Promise<RoomTypeBedType> {
    const res: AxiosResponse<RoomTypeBedType> = await axios.put(
      `${API_URL_V1}/room-type-bed-types/${roomTypeId}/${bedTypeId}`,
      payload,
      { withCredentials: true }
    );
    return res.data;
  },

  async remove(
    roomTypeId: number,
    bedTypeId: number
  ): Promise<{ message: string }> {
    const res: AxiosResponse<{ message: string }> = await axios.delete(
      `${API_URL_V1}/room-type-bed-types/${roomTypeId}/${bedTypeId}`,
      { withCredentials: true }
    );
    return res.data;
  },
};
