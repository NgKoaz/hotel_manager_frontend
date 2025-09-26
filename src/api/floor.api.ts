import axios, { AxiosResponse } from "axios";
import { Floor } from "@/types/Floor";
import { API_URL_V1 } from "./config.api";

export const floorApi = {
  async getAll(): Promise<Floor[]> {
    const res: AxiosResponse<Floor[]> = await axios.get(
      `${API_URL_V1}/floors`,
      { withCredentials: true }
    );
    return res.data;
  },

  async getById(id: number): Promise<Floor> {
    const res: AxiosResponse<Floor> = await axios.get(
      `${API_URL_V1}/floors/${id}`,
      { withCredentials: true }
    );
    return res.data;
  },

  async create(payload: Partial<Floor>): Promise<Floor> {
    const res: AxiosResponse<Floor> = await axios.post(
      `${API_URL_V1}/floors`,
      payload,
      { withCredentials: true }
    );
    return res.data;
  },

  async update(id: number, payload: Partial<Floor>): Promise<Floor> {
    const res: AxiosResponse<Floor> = await axios.put(
      `${API_URL_V1}/floors/${id}`,
      payload,
      { withCredentials: true }
    );
    return res.data;
  },

  async remove(id: number): Promise<{ message: string }> {
    const res: AxiosResponse<{ message: string }> = await axios.delete(
      `${API_URL_V1}/floors/${id}`,
      { withCredentials: true }
    );
    return res.data;
  },
};
