import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { roomTypeApi } from "@/api/room-type.api";
import { RoomType } from "@/types/RoomType";


const RoomTypePage: React.FC = () => {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [newRoom, setNewRoom] = useState<Partial<RoomType>>({
    name: "",
    basePrice: 0,
    maxAdults: 0,
    maxChildren: 0,
    area: 0,
    description: ""
  });

  const fetchRoomTypes = async () => {
    try {
      const data = await roomTypeApi.getAll();
      setRoomTypes(data.filter(rt => !rt.isDeleted));
    } catch (err) {
      console.error(err);
      toast.error("Không lấy được danh sách RoomType");
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const handleAdd = async () => {
    if (!newRoom.name || !newRoom.basePrice) return;
    try {
      const created = await roomTypeApi.create(newRoom);
      setRoomTypes(prev => [...prev, created]);
      setNewRoom({
        name: "",
        basePrice: 0,
        maxAdults: 0,
        maxChildren: 0,
        area: 0,
        description: ""
      });
      toast.success("Thêm RoomType thành công");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Lỗi thêm RoomType");
    }
  };

  const handleUpdate = async (id: number, updatedRoom: Partial<RoomType>) => {
    try {
      const updated = await roomTypeApi.update(id, updatedRoom);
      setRoomTypes(prev => prev.map(r => (r.id === id ? updated : r)));
      toast.success("Cập nhật thành công");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Lỗi cập nhật");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Xác nhận xóa RoomType này?")) return;
    try {
      await roomTypeApi.softDelete(id);
      setRoomTypes(prev => prev.filter(r => r.id !== id));
      toast.success("Xóa thành công");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Lỗi xóa RoomType");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>RoomType</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Thêm mới */}
        <div className="grid grid-cols-6 gap-4 items-end">
          <div>
            <Label>Tên</Label>
            <Input
              value={newRoom.name}
              onChange={e =>
                setNewRoom(prev => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div>
            <Label>Giá cơ bản</Label>
            <Input
              type="number"
              value={newRoom.basePrice}
              onChange={e =>
                setNewRoom(prev => ({
                  ...prev,
                  basePrice: Number(e.target.value)
                }))
              }
            />
          </div>
          <div>
            <Label>Max Adults</Label>
            <Input
              type="number"
              value={newRoom.maxAdults}
              onChange={e =>
                setNewRoom(prev => ({
                  ...prev,
                  maxAdults: Number(e.target.value)
                }))
              }
            />
          </div>
          <div>
            <Label>Max Children</Label>
            <Input
              type="number"
              value={newRoom.maxChildren}
              onChange={e =>
                setNewRoom(prev => ({
                  ...prev,
                  maxChildren: Number(e.target.value)
                }))
              }
            />
          </div>
          <div>
            <Label>Diện tích (m²)</Label>
            <Input
              type="number"
              value={newRoom.area}
              onChange={e =>
                setNewRoom(prev => ({
                  ...prev,
                  area: Number(e.target.value)
                }))
              }
            />
          </div>
          <div>
            <Label>Mô tả</Label>
            <Input
              value={newRoom.description}
              onChange={e =>
                setNewRoom(prev => ({
                  ...prev,
                  description: e.target.value
                }))
              }
            />
          </div>
          <Button onClick={handleAdd}>Thêm RoomType</Button>
        </div>

        {/* Danh sách RoomType */}
        <div className="space-y-2 mt-4">
          {/* Header */}
          <div className="grid grid-cols-7 gap-4 font-semibold border-b pb-2">
            <span>Tên</span>
            <span>Giá cơ bản</span>
            <span>Max Adults</span>
            <span>Max Children</span>
            <span>Diện tích (m²)</span>
            <span>Mô tả</span>
            <span>Hành động</span>
          </div>

          {/* Rows */}
          {roomTypes.map(rt => (
            <div
              key={rt.id}
              className="grid grid-cols-7 gap-4 items-center border-b py-2"
            >
              <Input
                value={rt.name}
                onChange={e =>
                  setRoomTypes(prev =>
                    prev.map(r =>
                      r.id === rt.id ? { ...r, name: e.target.value } : r
                    )
                  )
                }
              />
              <Input
                type="number"
                value={rt.basePrice}
                onChange={e =>
                  setRoomTypes(prev =>
                    prev.map(r =>
                      r.id === rt.id
                        ? { ...r, basePrice: Number(e.target.value) }
                        : r
                    )
                  )
                }
              />
              <Input
                type="number"
                value={rt.maxAdults}
                onChange={e =>
                  setRoomTypes(prev =>
                    prev.map(r =>
                      r.id === rt.id
                        ? { ...r, maxAdults: Number(e.target.value) }
                        : r
                    )
                  )
                }
              />
              <Input
                type="number"
                value={rt.maxChildren}
                onChange={e =>
                  setRoomTypes(prev =>
                    prev.map(r =>
                      r.id === rt.id
                        ? { ...r, maxChildren: Number(e.target.value) }
                        : r
                    )
                  )
                }
              />
              <Input
                type="number"
                value={rt.area}
                onChange={e =>
                  setRoomTypes(prev =>
                    prev.map(r =>
                      r.id === rt.id
                        ? { ...r, area: Number(e.target.value) }
                        : r
                    )
                  )
                }
              />
              <Input
                value={rt.description || ""}
                onChange={e =>
                  setRoomTypes(prev =>
                    prev.map(r =>
                      r.id === rt.id
                        ? { ...r, description: e.target.value }
                        : r
                    )
                  )
                }
              />
              <div className="space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUpdate(rt.id, rt)}
                >
                  Sửa
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(rt.id)}
                >
                  Xóa
                </Button>
              </div>
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
};

export default RoomTypePage;
