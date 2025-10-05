import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Bed, Bath } from "lucide-react";
import { formatPrice } from "@/utils/formater.util";
import { useNavigate } from "react-router-dom";
import { GetBatchRoomResponse } from "@/api/dto/room";
import { RoomType } from "@/types/RoomType";
import RoomGallery from "./RoomGallery";


interface RoomCardProps {
  roomType: RoomType;
  roomApiRes: GetBatchRoomResponse;
}

const RoomCard = ({ roomType, roomApiRes }: RoomCardProps) => {
    const navigate = useNavigate();
    const handleBookRoom = (roomTypeId: number) => {
        navigate(`/booking?roomType=${roomTypeId}`);
    };
    const roomTypeBedTypes = roomApiRes.roomTypeBedTypes.filter(rtbt => rtbt.roomTypeId == roomType?.id);
    const bedTypes = roomApiRes.bedTypes;

    const bedDisplay = roomTypeBedTypes.reduce((str, rtbt, index) => {
        const betType = bedTypes.find(bt => bt.id == rtbt.bedTypeId)
        const newStr = str + `${rtbt.quantity} ${betType.name}` + (index < roomTypeBedTypes.length - 1 ? " + " : "")
        return newStr;
    }, "")

    const images = roomApiRes?.images.filter(img => 
        img.roomTypeId === roomType.id
    )
    const roomTypeAmenities = roomApiRes?.roomTypeAmenities.filter(
        rta => rta.roomTypeId === roomType.id
    )
    const amenities = roomApiRes?.amenities.filter(a =>
        roomTypeAmenities.some(rta => a.id === rta.amenityId)
    );

    return (
        <Card key={roomType.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
            <RoomGallery
                images={images}
            />

            <CardHeader>
                <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="text-lg">{roomType.name}</CardTitle>
                    <CardDescription className="mt-1">{roomType.description}</CardDescription>
                </div>
                <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">{formatPrice(Number(roomType.basePrice))}</div>
                    <div className="text-sm text-gray-500">/đêm</div>
                </div>
                </div>
            </CardHeader>

            {/* CardContent flex-grow để nút luôn ở dưới */}
            <CardContent className="flex flex-col flex-grow justify-between">
                <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>Tối đa {roomType.maxAdults} người lớn, {roomType.maxChildren} trẻ em</span>
                    </div>
                    <div className="flex items-center space-x-2">
                    <Bed className="h-4 w-4 text-gray-400" />
                    <span>{bedDisplay}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                    <Bath className="h-4 w-4 text-gray-400" />
                    <span>{roomType.area} m²</span>
                    </div>
                </div>

                {amenities.length > 0 && (
                    <div>
                    <div className="text-sm font-medium mb-2">Tiện nghi:</div>
                    <div className="flex flex-wrap gap-1">
                        {amenities.slice(0, 4).map((a, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">{a.description || a.name}</Badge>
                        ))}
                        {amenities.length > 4 && (
                        <Badge variant="outline" className="text-xs">+{amenities.length - 4} khác</Badge>
                        )}
                    </div>
                    </div>
                )}
                </div>

                <Button
                    className="w-full mt-4"
                    disabled={'Available' !== 'Available'}
                    onClick={() => handleBookRoom(roomType.id)}
                >
                    {'Available' === 'Available' ? 'Đặt phòng ngay' : 'Hết phòng'}
                </Button>

            </CardContent>
        </Card>
    );
}


export default RoomCard


