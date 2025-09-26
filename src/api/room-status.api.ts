import axios, { AxiosResponse } from "axios";
import { RoomStatus } from "@/types/RoomStatus";
import { API_URL_V1 } from "./config.api";

const API = axios.create({
  baseURL: API_URL_V1,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const roomStatusApi = {
  async getAll(): Promise<RoomStatus[]> {
    const res: AxiosResponse<RoomStatus[]> = await API.get("/room-statuses");
    return res.data;
  },
};
