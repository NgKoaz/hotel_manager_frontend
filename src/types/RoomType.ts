export interface RoomType {
    id: number;
    name: string;
    basePrice: number;
    maxAdults: number;
    maxChildren: number;
    area: number;
    description?: string;
    isDeleted: boolean;
}