import { GetBatchRoomResponse } from '@/api/dto/room'; 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { Room } from '@/types/Room';

interface SelectedRoomProps {
  roomApiRes: GetBatchRoomResponse;
  roomIds: number[];
  setRoomIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const SelectedRoom: React.FC<SelectedRoomProps> = ({ roomApiRes, roomIds, setRoomIds }) => {
  const selectedRooms: Room[] = roomApiRes?.rooms.filter(room => roomIds.includes(room.id)) || [];

  const removeRoom = (index: number) => {
    setRoomIds(roomIds.filter((_, i) => i !== index));
  };

  const getRoomType = (roomTypeId: number) =>
    roomApiRes.roomTypes.find(rt => rt.id === roomTypeId)?.name || "N/A";

  const getFloor = (floorId: number) =>
    roomApiRes.floors.find(f => f.id === floorId)?.name || "N/A";

  const getImage = (roomTypeId: number) =>
    roomApiRes.images.find(img => img.roomTypeId === roomTypeId)?.imageUrl;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {selectedRooms.map((room, i) => (
        <Card key={room.id} className="relative">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Phòng {room.name || i + 1}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeRoom(i)}
              className="absolute top-2 right-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-3">
            {getImage(room.roomTypeId) && (
              <div className="col-span-2">
                <img
                  src={getImage(room.roomTypeId)!}
                  alt="Room"
                  className="rounded-md w-full h-32 object-cover"
                />
              </div>
            )}

            <div>
              <Label>Loại phòng</Label>
              <p>{getRoomType(room.roomTypeId)}</p>
            </div>

            <div>
              <Label>Tầng</Label>
              <p>{getFloor(room.floorId)}</p>
            </div>

            <div>
              <Label>Số giường</Label>
              <p>
                {roomApiRes.roomTypeBedTypes
                  .filter(rtb => rtb.roomTypeId === room.roomTypeId)
                  .map(rtb => {
                    const bt = roomApiRes.bedTypes.find(b => b.id === rtb.bedTypeId);
                    return `${rtb.quantity} x ${bt?.name}`;
                  })
                  .join(", ")}
              </p>
            </div>

            <div>
              <Label>Tiện nghi</Label>
              <p className="truncate">
                {roomApiRes.roomTypeAmenities
                  .filter(rta => rta.roomTypeId === room.roomTypeId)
                  .map(rta => roomApiRes.amenities.find(a => a.id === rta.amenityId)?.name)
                  .join(", ")}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SelectedRoom;
