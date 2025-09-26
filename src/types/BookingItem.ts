import { BookingItemTypeEnum } from "@/enums/BookingItemType.enum";

export interface BookingItem {
    id: number;
    bookingId: number;
    roomId: number;
    unitPrice: number;
    quantity: number;
    itemTypeId: BookingItemTypeEnum;
    itemId: number;
}