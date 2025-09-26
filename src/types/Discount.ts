export interface Discount {
    id: number;
    code?: string;
    description?: string;
    percent: number;
    maxAmount?: number;
    validFrom: string; // ISO date string
    validTo: string;   // ISO date string
    usedCount: number;
    usageLimit: number;
    minOrderAmount: number;
    isDeleted: boolean;
    createdAt: string; // ISO timestamp
  }
  