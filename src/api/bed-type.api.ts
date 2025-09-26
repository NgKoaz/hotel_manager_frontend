import axios, { AxiosResponse } from "axios";
import { BedType } from "../types/BedType";
import { API_URL_V1 } from "./config.api";


export const bedTypeApi = {
    async getAll(): Promise<BedType[]> {
        const res: AxiosResponse<BedType[]> = await axios.get(`${API_URL_V1}/bed-types`);
        return res.data;
    },

    async create(name: string, description: string =""): Promise<BedType> {
        const res: AxiosResponse<BedType> = await axios.post(
            `${API_URL_V1}/bed-types`, 
            { name, description }, 
            { withCredentials: true }
        );
        return res.data;
    },

    async update(id: number, name: string, description: string): Promise<BedType> {
        const res: AxiosResponse<BedType> = await axios.put(
            `${API_URL_V1}/bed-types/${id}`,
            { name, description },
            { withCredentials: true }
        );
        return res.data;
    },

    async remove(id: number): Promise<{ message: string, status: number }> {
        const res: AxiosResponse<{ message: string, status: number }> 
            = await axios.delete(`${API_URL_V1}/bed-types/${id}`, { withCredentials: true });
        return res.data;
    },
};
