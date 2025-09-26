import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Fee } from '@/types/Fee';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { feeApi } from '@/api/fee.api';
import { toast } from 'sonner';


interface FeeCardProps {
    fee: Fee;
    loadData: () => void;
}


const FeeCard: React.FC<FeeCardProps> = ({ fee, loadData }) => {
    const [isEditting, setIsEditting] = useState<boolean>(false);
    const [amount, setAmount] = useState<number>(fee.amount);
    const [description, setDescription] = useState<string>(fee.description);

    
    const onEditSave = async () => {
        feeApi.update(fee.id, { amount, description })
            .then(data => {
                setIsEditting(false);
                setAmount(data.amount);
                setDescription(data.description);
            })
            .catch(err => toast.error(err.response?.data?.message || "Save bị lỗi"))
    }

    const onDelete = () => {
        feeApi.remove(fee.id)
            .then(data => {
                loadData();
            })
            .catch(err => toast.error(err.response?.data?.message || "Xóa bị lỗi"))
    }

    return (
        <div className="flex items-center gap-2 my-4">
            <div className="">
                <Label>Số tiền phụ phí</Label>
                <Input 
                    type="number" 
                    value={amount} 
                    onChange={e => setAmount(+e.target.value)} 
                    {...(!isEditting && { disabled: true })} 
                />
            </div>

            <div className="flex-grow">
                <Label>Mô tả</Label>
                <Input 
                    type="text" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    {...(!isEditting && { disabled: true })}  
                />
            </div>

            <div className="flex items-center gap-2">
                {isEditting ? (
                    <>
                        <Button onClick={onEditSave}>Lưu</Button>
                        <Button variant="destructive" onClick={() => setIsEditting(false)}>Hủy</Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => setIsEditting(true)}>Sửa</Button>
                        <Button variant="destructive" onClick={onDelete}>Xoá</Button>
                    </>
                )
                }
            </div>
        </div>
    );
    
}

export default FeeCard