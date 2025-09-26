import { format } from "date-fns";


export const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);


export const formatDate = (date?: Date) => date ? format(new Date(date), "dd/MM/yyyy") : "-";



export const formatDateTime = (date?: Date): string =>
    date ? format(new Date(date), "dd/MM/yyyy HH:mm") : "-";
