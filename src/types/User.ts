export interface User {
    id: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    phone?: string;
    isActive: boolean;
    lastLogin: number | null;
    createdAt: Date;
}
  