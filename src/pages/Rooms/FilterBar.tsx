import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RoomApiResponse } from '@/api/room.api';
import { SetStateAction } from 'react';


interface FilterBarProps {
  roomApiRes: RoomApiResponse | undefined;
  searchTerm: string;
  setSearchTerm: React.Dispatch<SetStateAction<string>>;
  selectedType: string;
  setSelectedType: React.Dispatch<SetStateAction<string>>;
  priceRange: string;
  setPriceRange: React.Dispatch<SetStateAction<string>>;
}


const FilterBar: React.FC<FilterBarProps> = ({
  roomApiRes,
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  priceRange,
  setPriceRange,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="search">Tìm kiếm</Label>
          <Input
            id="search"
            placeholder="Tìm theo tên phòng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="type">Loại phòng</Label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn loại phòng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              {roomApiRes &&
                Array.from(new Set(roomApiRes.rooms.map(r => r.roomTypeId))).map(id => {
                  const roomType = roomApiRes.roomTypes.find(rt => rt.id === id);
                  return (
                    <SelectItem key={id.toString()} value={id.toString()}>
                      {roomType?.name}
                    </SelectItem>
                  );
              })}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="price">Khoảng giá</Label>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn khoảng giá" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="low">Dưới 2M</SelectItem>
              <SelectItem value="medium">2M - 4M</SelectItem>
              <SelectItem value="high">Trên 4M</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedType('all');
              setPriceRange('all');
            }}
            className="w-full"
          >
            Xóa bộ lọc
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FilterBar