import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Edit2, Save, X, Layers } from 'lucide-react';
import { roomTypeAmenityApi } from '@/api/room-type-amenity.api';
import { roomTypeApi } from '@/api/room-type.api';
import { amenityApi } from '@/api/amenity.api'; 
import { RoomTypeAmenity } from '@/types/RoomTypeAmenity';


interface RoomType { id: number; name: string; }
interface Amenity { id: number; name: string; }

const RoomTypeAmenityPage: React.FC = () => {
  const [roomTypeAmenities, setRoomTypeAmenities] = useState<RoomTypeAmenity[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{ quantity: number }>({ quantity: 1 });

  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);

  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState<number | null>(null);
  const [selectedAmenityId, setSelectedAmenityId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Load roomTypes & amenities
  useEffect(() => {
    roomTypeAmenityApi.getAll()
      .then(setRoomTypeAmenities)
      .catch(console.error);

    roomTypeApi.getAll()
      .then(setRoomTypes)
      .catch(console.error);

    amenityApi.getAll()
      .then(setAmenities)
      .catch(console.error);
  }, []);

  const handleAdd = async () => {
    if (!selectedRoomTypeId || !selectedAmenityId) return;
    try {
      const newAssoc = await roomTypeAmenityApi.create({ roomTypeId: selectedRoomTypeId, amenityId: selectedAmenityId, quantity });
      setRoomTypeAmenities(prev => [...prev, newAssoc]);
      setQuantity(1);
      setSelectedAmenityId(null);
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleEdit = (assoc: RoomTypeAmenity) => {
    setEditingId(assoc.roomTypeId * 1000 + assoc.amenityId);
    setEditValues({ quantity: assoc.quantity || 1 });
  };

  const handleSave = async (assoc: RoomTypeAmenity) => {
    if (!assoc.roomTypeId || !assoc.amenityId) return;
    try {
      const updated = await roomTypeAmenityApi.update(assoc.roomTypeId, assoc.amenityId, editValues);
      setRoomTypeAmenities(prev =>
        prev.map(a => (a.roomTypeId === assoc.roomTypeId && a.amenityId === assoc.amenityId ? updated : a))
      );
      setEditingId(null);
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleDelete = async (assoc: RoomTypeAmenity) => {
    if (!assoc.roomTypeId || !assoc.amenityId) return;
    try {
      await roomTypeAmenityApi.remove(assoc.roomTypeId, assoc.amenityId);
      setRoomTypeAmenities(prev => prev.filter(a => !(a.roomTypeId === assoc.roomTypeId && a.amenityId === assoc.amenityId)));
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center space-x-2">
        <Layers className="h-6 w-6 text-purple-500" />
        <CardTitle>Quản lý RoomType-Amenity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Chọn RoomType */}
        <div>
          <Label>Chọn loại phòng</Label>
          <select value={selectedRoomTypeId ?? ''} onChange={e => setSelectedRoomTypeId(Number(e.target.value))}>
            <option value="">-- Chọn RoomType --</option>
            {roomTypes.map(rt => <option key={rt.id} value={rt.id}>{rt.name}</option>)}
          </select>
        </div>

        {/* Thêm mới */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end">
          <div>
            <Label>Amenity</Label>
            <select value={selectedAmenityId ?? ''} onChange={e => setSelectedAmenityId(Number(e.target.value))}>
              <option value="">Chọn Amenity</option>
              {amenities.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>
          <div>
            <Label>Số lượng</Label>
            <Input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
          </div>
          <Button onClick={handleAdd} className="h-10">Thêm</Button>
        </div>

        {/* Danh sách */}
        <div className="space-y-2 mt-4">
          {roomTypeAmenities?.filter(rta => rta.roomTypeId == selectedRoomTypeId).map(rta => {
            const key = rta.roomTypeId * 1000 + rta.amenityId;
            return (
              <div key={key} className="flex justify-between items-center border-b py-2">
                <div className="flex-1">
                  {editingId === key ? (
                    <div className="grid grid-cols-4 gap-2">
                      <Input type="number" value={editValues.quantity} onChange={e => setEditValues(prev => ({ ...prev, quantity: Number(e.target.value) }))} />
                    </div>
                  ) : (
                    <p>{roomTypes.find(rt => rt.id == rta.roomTypeId).name} - {amenities.find(a => a.id == rta.amenityId).name} | Số lượng: {rta.quantity}</p>
                  )}
                </div>
                <div className="space-x-2">
                  {editingId === key ? (
                    <>
                      <Button size="sm" variant="outline" onClick={() => handleSave(rta)}>
                        <Save className="h-4 w-4 mr-1" /> Lưu
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => setEditingId(null)}>
                        <X className="h-4 w-4 mr-1" /> Hủy
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(rta)}>
                        <Edit2 className="h-4 w-4 mr-1" /> Sửa
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(rta)}>Xóa</Button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomTypeAmenityPage;
