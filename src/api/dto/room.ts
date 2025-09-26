import { Addon } from "@/types/Addon";
import { Amenity } from "@/types/Amenity";
import { BedType } from "@/types/BedType";
import { Floor } from "@/types/Floor";
import { Room } from "@/types/Room";
import { RoomStatus } from "@/types/RoomStatus";
import { RoomType } from "@/types/RoomType";
import { RoomTypeAmenity } from "@/types/RoomTypeAmenity";
import { RoomTypeBedType } from "@/types/RoomTypeBedType";
import { RoomTypeImage } from "@/types/RoomTypeImage";

export interface GetBatchRoomResponse {
    rooms: Room[];
    roomTypes: RoomType[];
    roomStatuses: RoomStatus[];
    roomTypeAmenities: RoomTypeAmenity[];
    roomTypeBedTypes: RoomTypeBedType[];
    amenities: Amenity[];
    addons: Addon[];
    bedTypes: BedType[];
    floors: Floor[];
    images: RoomTypeImage[];
}