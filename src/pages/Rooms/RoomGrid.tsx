import { GetBatchRoomResponse } from "@/api/dto/room";
import RoomCard from "./RoomCard";
import { Room } from "@/types/Room";
import { RoomType } from "@/types/RoomType";


interface RoomCardProps {
    filteredRoomType: RoomType[]
    roomApiRes: GetBatchRoomResponse;
}


const RoomGrid: React.FC<RoomCardProps> = ({ filteredRoomType, roomApiRes }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoomType.map((roomType) => (
                <RoomCard
                    key={roomType.id} 
                    roomType={roomType}
                    roomApiRes={roomApiRes}
                />
            ))}
        </div>
    )
}

export default RoomGrid
