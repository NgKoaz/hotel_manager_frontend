export interface Addon {
    id: number;
    name: string;
    basePrice: number;
    description?: string;
    isActive: boolean;
    isDeleted: boolean;
}