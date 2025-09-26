import axios, { AxiosResponse } from "axios";
import { Role } from "@/types/Role";
import { API_URL_V1 } from "./config.api";

export const roleApi = {
  async getAll(): Promise<Role[]> {
    const res: AxiosResponse<Role[]> = await axios.get(`${API_URL_V1}/roles/`, {
      withCredentials: true,
    });
    return res.data;
  },
};