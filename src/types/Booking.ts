export interface Booking {
    id: number;
    userId?: number;
    checkinDate?: string; // or Date
    checkoutDate?: string; // or Date
    numChildren?: number;
    numAdults?: number;
    paymentStatusId?: number;
    bookingStatusId: number;
    paidAmount?: number;
    totalAmount?: number;
    updatedAt: string; // or Date
    createdAt: string; // or Date
}
