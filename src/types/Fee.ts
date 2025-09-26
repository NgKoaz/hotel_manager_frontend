export interface Fee {
    id: number;
    paymentId: number;
    amount: number;
    description?: string | null;
}