import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Edit2, Save, X, BedDouble, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { roomTypeBedTypeApi } from "@/api/room-type-bed-type.api";
import { RoomTypeBedType } from "@/types/RoomTypeBedType";
import { roomTypeApi } from "@/api/room-type.api";
import { bedTypeApi } from "@/api/bed-type.api";

interface RoomType { id: number; name: string }
interface BedType { id: number; name: string }

const RoomTypeBedTypePage: React.FC = () => {
  const [items, setItems] = useState<RoomTypeBedType[]>([]);
  const [editingKey, setEditingKey] = useState<{ roomTypeId: number; bedTypeId: number } | null>(null);
  const [editValues, setEditValues] = useState<{ quantity: number }>({ quantity: 1 });

  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [bedTypes, setBedTypes] = useState<BedType[]>([]);
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState<number | null>(null);
  const [selectedBedTypeId, setSelectedBedTypeId] = useState<number | null>(null);
  const [newQuantity, setNewQuantity] = useState(1);


  useEffect(() => {
    roomTypeApi.getAll().then(setRoomTypes).catch(console.error);
    bedTypeApi.getAll().then(setBedTypes).catch(console.error);
    roomTypeBedTypeApi.getAll()
      .then(setItems)
      .catch(() => toast.error("Không thể tải danh sách RoomType-BedType."));
  }, []);

  const handleAdd = async () => {
    if (!selectedRoomTypeId || !selectedBedTypeId) {
      toast.error("Vui lòng chọn RoomType và BedType.");
      return;
    }
    try {
      const data = await roomTypeBedTypeApi.create({
        roomTypeId: selectedRoomTypeId,
        bedTypeId: selectedBedTypeId,
        quantity: newQuantity,
      });
      setItems(prev => [...prev, data]);
      setSelectedRoomTypeId(null);
      setSelectedBedTypeId(null);
      setNewQuantity(1);
      toast.success("Thêm association thành công!");
    } catch (err) {
      console.error(err);
      toast.error("Không thể thêm association.");
    }
  };

  const handleEdit = (item: RoomTypeBedType) => {
    setEditingKey({ roomTypeId: item.roomTypeId, bedTypeId: item.bedTypeId });
    setEditValues({ quantity: item.quantity });
  };

  const handleSave = async (roomTypeId: number, bedTypeId: number) => {
    try {
      const updated = await roomTypeBedTypeApi.update(roomTypeId, bedTypeId, editValues);
      setItems(prev =>
        prev.map(i =>
          i.roomTypeId === roomTypeId && i.bedTypeId === bedTypeId ? updated : i
        )
      );
      setEditingKey(null);
      toast.success("Cập nhật thành công!");
    } catch (err) {
      console.error(err);
      toast.error("Không thể cập nhật association.");
    }
  };

  const handleDelete = async (roomTypeId: number, bedTypeId: number) => {
    try {
      await roomTypeBedTypeApi.remove(roomTypeId, bedTypeId);
      setItems(prev =>
        prev.filter(i => !(i.roomTypeId === roomTypeId && i.bedTypeId === bedTypeId))
      );
      toast.success("Xóa association thành công!");
    } catch (err) {
      console.error(err);
      toast.error("Không thể xóa association.");
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center space-x-2">
        <BedDouble className="h-6 w-6 text-indigo-500" />
        <CardTitle>Quản lý RoomType-BedType</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Thêm mới */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div>
            <Label>RoomType</Label>
            <select
              value={selectedRoomTypeId ?? ""}
              onChange={e => setSelectedRoomTypeId(Number(e.target.value))}
            >
              <option value="">-- Chọn RoomType --</option>
              {roomTypes.map(rt => (
                <option key={rt.id} value={rt.id}>{rt.name}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>BedType</Label>
            <select
              value={selectedBedTypeId ?? ""}
              onChange={e => setSelectedBedTypeId(Number(e.target.value))}
            >
              <option value="">-- Chọn BedType --</option>
              {bedTypes.map(bt => (
                <option key={bt.id} value={bt.id}>{bt.name}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Số lượng</Label>
            <Input
              type="number"
              value={newQuantity}
              onChange={e => setNewQuantity(Number(e.target.value))}
            />
          </div>
          <Button onClick={handleAdd} className="h-10">
            <Plus className="h-4 w-4 mr-1" /> Thêm
          </Button>
        </div>

        {/* Danh sách */}
        <div className="space-y-2 mt-4">
        {items.filter(i => !selectedRoomTypeId || i.roomTypeId === selectedRoomTypeId).map(i => {
            const roomType = roomTypes.find(rt => rt.id === i.roomTypeId);
            const bedType = bedTypes.find(bt => bt.id === i.bedTypeId);
            const roomTypeName = roomType ? roomType.name : `RoomType#${i.roomTypeId}`;
            const bedTypeName = bedType ? bedType.name : `BedType#${i.bedTypeId}`;

            const key = `${i.roomTypeId}-${i.bedTypeId}`;

        return (
            <div key={key} className="flex justify-between items-center border-b py-2">
            <div className="flex-1">
                <p className="font-medium">
                {roomTypeName} - {bedTypeName}
                </p>
                {editingKey &&
                    editingKey.roomTypeId === i.roomTypeId &&
                    editingKey.bedTypeId === i.bedTypeId ? (
                    <Input
                        type="number"
                        value={editValues.quantity}
                        onChange={e =>
                        setEditValues({ quantity: Number(e.target.value) })
                        }
                    />
                    ) : (
                    <p className="text-sm text-gray-600">Quantity: {i.quantity}</p>
                    )}
                </div>
                <div className="space-x-2">
                    {editingKey &&
                    editingKey.roomTypeId === i.roomTypeId &&
                    editingKey.bedTypeId === i.bedTypeId ? (
                    <>
                        <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSave(i.roomTypeId, i.bedTypeId)}
                        >
                        <Save className="h-4 w-4 mr-1" /> Lưu
                        </Button>
                        <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setEditingKey(null)}
                        >
                        <X className="h-4 w-4 mr-1" /> Hủy
                        </Button>
                    </>
                    ) : (
                    <>
                        <Button size="sm" variant="outline" onClick={() => handleEdit(i)}>
                        <Edit2 className="h-4 w-4 mr-1" /> Sửa
                        </Button>
                        <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(i.roomTypeId, i.bedTypeId)}
                        >
                        <Trash2 className="h-4 w-4 mr-1" /> Xóa
                        </Button>
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

export default RoomTypeBedTypePage;
