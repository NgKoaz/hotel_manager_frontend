import axios, { AxiosResponse } from "axios";
import { Amenity } from "@/types/Amenity";
import { API_URL_V1 } from "./config.api";

export const amenityApi = {
  async getAll(): Promise<Amenity[]> {
    const res: AxiosResponse<Amenity[]> = await axios.get(
      `${API_URL_V1}/amenities`,
      { withCredentials: true }
    );
    return res.data;
  },

  async getById(id: number): Promise<Amenity> {
    const res: AxiosResponse<Amenity> = await axios.get(
      `${API_URL_V1}/amenities/${id}`,
      { withCredentials: true }
    );
    return res.data;
  },

  async create(payload: Partial<Amenity>): Promise<Amenity> {
    const res: AxiosResponse<Amenity> = await axios.post(
      `${API_URL_V1}/amenities`,
      payload,
      { withCredentials: true }
    );
    return res.data;
  },

  async update(id: number, payload: Partial<Amenity>): Promise<Amenity> {
    const res: AxiosResponse<Amenity> = await axios.put(
      `${API_URL_V1}/amenities/${id}`,
      payload,
      { withCredentials: true }
    );
    return res.data;
  },

  async remove(id: number): Promise<{ message: string }> {
    const res: AxiosResponse<{ message: string }> = await axios.delete(
      `${API_URL_V1}/amenities/${id}`,
      { withCredentials: true }
    );
    return res.data;
  },
};
