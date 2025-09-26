import { GetBatchRoomResponse } from '@/api/dto/room';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Discount } from '@/types/Discount';
import { formatPrice } from '@/utils/formater.util';


interface TotalProps {
    nights: number;
    subTotal: number;
    total: number;
    discounts: Discount[];
    discountedList: {discountId: number, amount: number}[];
    roomApiRes: GetBatchRoomResponse
}


const Total: React.FC<TotalProps> = ({ nights, subTotal, total, discounts, discountedList, roomApiRes }) => {
    return (
        <Card>
            <CardHeader>
            <CardTitle>Tổng ước tính</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
            {/* Tổng gốc */}
            <div className="flex justify-between text-lg">
                <span>Tạm tính {nights} đêm</span>
                <span className="font-bold">{roomApiRes && formatPrice(subTotal)}</span>
            </div>

            {/* Danh sách giảm giá */}
            {discountedList.length > 0 && (
                <div className="space-y-1">
                {discountedList.map((discounted) => {
                    const discount = discounts.find(d => d.id === discounted.discountId);
                    return (
                        <div key={discounted.discountId} className="flex justify-between text-sm text-red-600">
                            <span>
                                Giảm {discount.percent}% {Number(discount.maxAmount) != 0 && `tối đa ${formatPrice(discounted.amount)}`}
                            </span>
                            <span>-{formatPrice(discounted.amount)}</span>
                        </div>
                    );
                })}
                </div>
            )}

            <hr />

            {/* Tổng cuối cùng */}
            <div className="flex justify-between text-xl font-bold text-blue-600">
                <span>Tổng cuối:</span>
                <span>{roomApiRes && formatPrice(total)}</span>
            </div>
            </CardContent>
        </Card>          
    )
}

export default Total