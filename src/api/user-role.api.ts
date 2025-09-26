import axios, { AxiosResponse } from "axios";
import { API_URL_V1 } from "./config.api";
import { UserRole } from "@/types/UserRole";


export const userRoleApi = {
  async getAll(): Promise<UserRole[]> {
    const res: AxiosResponse<UserRole[]> = await axios.get(`${API_URL_V1}/user-roles/`, {
      withCredentials: true,
    });
    return res.data;
  },

  async create(payload: { userId: number; roleId: number }): Promise<UserRole> {
    const res: AxiosResponse<UserRole> = await axios.post(`${API_URL_V1}/user-roles/`, payload, {
      withCredentials: true,
    });
    return res.data;
  },

  async remove(userId: number, roleId: number): Promise<{ message: string }> {
    const res: AxiosResponse<{ message: string }> = await axios.delete(
      `${API_URL_V1}/user-roles/${userId}/${roleId}`,
      { withCredentials: true }
    );
    return res.data;
  },
};
