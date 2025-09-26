import { feeApi } from '@/api/fee.api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Fee } from '@/types/Fee';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import FeeCard from './FeeCard';



const BookingFeePage = () => {
    const [fees, setFees] = useState<Fee[]>([]);
    const [bookingId, setBookingId] = useState<number>();
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>("");

    const loadData = () => {
        feeApi.getAllByBookingId(bookingId)
            .then(setFees)
            .catch((err) => {
                console.log(err)
                toast.error(err.response.data?.message);
            });
    }

    useEffect(() => {
        if (!bookingId) return;

        const handler = setTimeout(() => {
            loadData()
        }, 500)

        return () => clearTimeout(handler);
    }, [bookingId]);

    const onCreate = () => {
        feeApi.create({ bookingId, amount, description })
            .then((data) => {
                toast.success("Đã tạo thành công");
                loadData();
                setAmount(0);
                setDescription("")
            })
            .catch(err => toast.error(err?.response?.data?.message));
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center">
                    Thêm phụ phí cho booking
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="col-span-1">
                        <Label htmlFor="bookingIdInput">Booking Id</Label>
                        <Input id="bookingIdInput" type="number" value={bookingId} onChange={e => setBookingId(+e.target.value)} />
                    </div>

                    <div className="col-span-1">
                        <Label htmlFor="extraFee">Số tiền phụ phí</Label>
                        <Input id="extraFee" type="number" value={amount} onChange={e => setAmount(+e.target.value)} />
                    </div>

                    <div className="col-span-2">
                        <Label htmlFor="description">Mô tả</Label>
                        <Input id="description" type="text" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                </div>
                <div className="flex justify-end items-end">
                    <Button onClick={onCreate}>
                        Thêm
                    </Button>
                </div>
                {fees?.length > 0 || (
                    <div className="text-center text-gray-500">Không có phụ phí thêm nào</div>
                )}

                {fees?.length > 0 && 
                    fees.map((f) => (
                        <FeeCard key={f.id} fee={f} loadData={loadData} />
                    ))
                }
            </CardContent>
        </Card>
    )
}

export default BookingFeePage