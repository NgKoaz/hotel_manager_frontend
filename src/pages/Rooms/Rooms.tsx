import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wifi, Coffee, Tv, Wind, Users, Bed, Bath } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Floor } from '@/types/Floor';
import { RoomStatus } from '@/types/RoomStatus';
import { Room } from '@/types/Room';
import { RoomType } from '@/types/RoomType';
import { Amenity } from '@/types/Amenity';
import { formatPrice } from '@/utils/formater.util';
import RoomGrid from './RoomGrid';
import { roomApi } from '@/api/room.api';
import { GetBatchRoomResponse } from '@/api/dto/room';
import { BedType } from '@/types/BedType';
import { RoomTypeImage } from '@/types/RoomTypeImage';
import FilterBar from './FilterBar';



export interface RoomTypeResponse extends RoomType {
  images: RoomTypeImage[];
  amenities: Amenity[];
  bedTypes: BedType[];
}

export interface RoomResponse extends Room {
  __floor__: Floor;
  __roomType__: RoomTypeResponse;
  __roomStatus__: RoomStatus;
}


const amenityIcons: { [key: string]: React.ReactNode } = {
  'WiFi': <Wifi className="h-4 w-4" />,
  'Điều hòa': <Wind className="h-4 w-4" />,
  'TV': <Tv className="h-4 w-4" />,
  'Smart TV': <Tv className="h-4 w-4" />,
  'Minibar': <Coffee className="h-4 w-4" />,
  'Máy pha cà phê': <Coffee className="h-4 w-4" />,
};


const Rooms: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [roomApiRes, setRoomApiRes] = useState<GetBatchRoomResponse>();

  useEffect(() => {
    roomApi.getAll().then(setRoomApiRes).catch(err => console.log(err))
  }, []);

  const filteredRooms = (roomApiRes?.roomTypes ?? [])
    .filter(roomType => {
      console.log("SEarch", searchTerm)
      const matchesSearch =
        roomType.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedType === 'all' || roomType.id.toString() === selectedType;
      const priceNumber = Number(roomType.basePrice);
      const matchesPrice =
        priceRange === 'all' ||
        (priceRange === 'low' && priceNumber <= 2_000_000) ||
        (priceRange === 'medium' && priceNumber > 2_000_000 && priceNumber <= 4_000_000) ||
        (priceRange === 'high' && priceNumber > 4_000_000);

      return matchesSearch && matchesType && matchesPrice;
    }); 

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Danh Sách Phòng</h1>
          <p className="text-lg text-gray-600">Chọn phòng phù hợp với nhu cầu của bạn</p>
        </div>

        <FilterBar
          roomApiRes={roomApiRes}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        {roomApiRes && 
          <RoomGrid
            filteredRoomType={filteredRooms}
            roomApiRes={roomApiRes}
          />
        }
        
        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">Không tìm thấy phòng phù hợp với tiêu chí tìm kiếm.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;


