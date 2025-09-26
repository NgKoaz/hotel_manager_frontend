export interface PaymentTransaction {
    id: number;
    paymentId: number;
    gatewayTransactionId: number;
    amount: number;
    description?: string;
    createdAt: string;
}