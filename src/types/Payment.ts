import { PaymentStatusEnum } from "@/enums/PaymentStatus.enum";

export interface Payment {
    id: number;
    bookingId: number;
    bookingAmount: number;
    addingFeeAmount: number;
    refundedAmount: number;
    paidAmount: number;
    paymentStatusId: PaymentStatusEnum;
    updatedAt: string; 
    createdAt: string; 
}
