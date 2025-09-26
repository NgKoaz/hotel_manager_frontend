import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { formatPrice } from "../../utils/formater.util"
import { roomApi } from '@/api/room.api';
import { GetBatchRoomResponse } from '@/api/dto/room';
import { Button } from '@/components/ui/button';


interface BookingRoomProps {
    roomApiRes: GetBatchRoomResponse;
    roomIds: number[];
    roomTypeIdSelected: number;
    setRoomTypeIdSelected: React.Dispatch<React.SetStateAction<number>>;
    roomIdSelected: number;
    setRoomIdSelected: React.Dispatch<React.SetStateAction<number>>;
    addRoom: () => void;
}


const BookingRoom: React.FC<BookingRoomProps> = ({ 
    roomApiRes, 
    roomIds,
    roomTypeIdSelected, 
    setRoomTypeIdSelected,
    roomIdSelected,
    setRoomIdSelected,
    addRoom
}) => { 
    const selectedRoomType = roomApiRes?.roomTypes.find(r => r.id === roomTypeIdSelected);
    const roomsOfType = roomApiRes?.rooms.filter(r => !r.isDeleted && r.roomTypeId === roomTypeIdSelected && !roomIds.includes(r.id));
    const selectedRoomTypeAmenities = roomApiRes?.roomTypeAmenities.filter(rta => rta.roomTypeId == selectedRoomType?.id);
    const floors = roomApiRes?.floors;

    return (
        <div className="border p-4 mb-4 rounded-lg">
            <Label className="mb-1">Loại phòng</Label>
            <Select value={roomTypeIdSelected.toString()} onValueChange={v => setRoomTypeIdSelected(+v)}>
                <SelectTrigger>
                    <SelectValue placeholder="Chọn loại phòng" />
                </SelectTrigger>
                <SelectContent>
                    {roomApiRes && roomApiRes.roomTypes.map(rt => (
                        <SelectItem key={rt.id} value={rt.id.toString()}>
                            {rt.name} - {formatPrice(rt.basePrice)}/đêm
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Hiển thị các phòng thuộc loại đã chọn */}
            {selectedRoomType && (
                <div>
                    <Label className="mb-1">Chọn phòng cụ thể</Label>
                    <Select value={roomIdSelected.toString()} onValueChange={v => setRoomIdSelected(+v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Chọn phòng" />
                        </SelectTrigger>
                        <SelectContent>
                            {roomsOfType.map(r => (
                                <SelectItem key={r.id} value={r.id.toString()}>
                                    Phòng {r.roomNumber} - {floors.find(f => f.id == r.floorId).name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {/* Hiển thị chi tiết loại phòng */}
            {selectedRoomType && (
                <div className="text-sm text-gray-600 mt-2 space-y-1">
                    <div>Giá: {formatPrice(Number(selectedRoomType.basePrice))}/đêm</div>
                    {selectedRoomTypeAmenities?.length > 0 && (
                        <div>Tiện nghi: {
                            selectedRoomTypeAmenities
                                .map(rta => {
                                    const amenity = roomApiRes.amenities.find(a => a.id === rta.amenityId)
                                    return amenity.name
                                })
                                .join(', ')
                            }
                        </div>
                    )}
                </div>
            )}
            <Button className="mt-4" type="button" onClick={addRoom}>Thêm phòng</Button>
        </div>
    );
}

export default BookingRoom