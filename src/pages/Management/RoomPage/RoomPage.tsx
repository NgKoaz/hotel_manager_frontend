import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Edit2, Save, X, Home } from "lucide-react";
import { roomApi } from "@/api/room.api";
import { GetBatchRoomResponse } from "@/api/dto/room";
import { Room } from "@/types/Room";
import { RoomStatus } from "@/types/RoomStatus";
import { RoomType } from "@/types/RoomType";
import { Floor } from "@/types/Floor";


const RoomPage: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [floors, setFloors] = useState<Floor[]>([]);
    const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
    const [roomStatuses, setRoomStatuses] = useState<RoomStatus[]>([]);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValues, setEditValues] = useState<Partial<Room>>({});

    const [newRoomNumber, setNewRoomNumber] = useState<number>(0);
    const [newFloorId, setNewFloorId] = useState<number>(0);
    const [newRoomTypeId, setNewRoomTypeId] = useState<number>(0);
    const [newRoomStatusId, setNewRoomStatusId] = useState<number>(0);
    const [newViewTypeId, setNewViewTypeId] = useState<number>(0);

  useEffect(() => {
        const fetchData = async () => {
        try {
            const res: GetBatchRoomResponse = await roomApi.getAll();
            setRooms(res.rooms);
            setFloors(res.floors);
            setRoomTypes(res.roomTypes);
            setRoomStatuses(res.roomStatuses);
        } catch (err) {
            console.error(err);
        }
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    try {
      const data = await roomApi.create({
        roomNumber: newRoomNumber,
        floorId: newFloorId,
        roomTypeId: newRoomTypeId,
        roomStatusId: newRoomStatusId,
      });
      setRooms((prev) => [...prev, data]);
      setNewRoomNumber(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (room: Room) => {
    setEditingId(room.id);
    setEditValues({ ...room });
  };

  const handleSave = async (roomId: number) => {
    try {
      const data = await roomApi.update(roomId, editValues);
      setRooms((prev) => prev.map((r) => (r.id === roomId ? data : r)));
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (roomId: number) => {
    try {
      await roomApi.remove(roomId);
      setRooms((prev) => prev.filter((r) => r.id !== roomId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center space-x-2">
        <Home className="h-6 w-6 text-blue-500" />
        <CardTitle>Quản lý Phòng</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Thêm mới */}
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-end">
          <div>
            <Label>Room Number</Label>
            <Input
              type="number"
              value={newRoomNumber}
              onChange={(e) => setNewRoomNumber(Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Floor</Label>
            <select
              value={newFloorId}
              onChange={(e) => setNewFloorId(Number(e.target.value))}
              className="w-full border rounded p-1"
            >
              <option value={0} disabled>-- Chọn tầng --</option>
              {floors.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Room Type</Label>
            <select
              value={newRoomTypeId}
              onChange={(e) => setNewRoomTypeId(Number(e.target.value))}
              className="w-full border rounded p-1"
            >
              <option value={0} disabled>-- Chọn loại phòng --</option>
              {roomTypes.map((rt) => (
                <option key={rt.id} value={rt.id}>
                  {rt.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Status</Label>
            <select
              value={newRoomStatusId}
              onChange={(e) => setNewRoomStatusId(Number(e.target.value))}
              className="w-full border rounded p-1"
            >
              <option value={0} disabled>-- Chọn trạng thái --</option>
              {roomStatuses.map((rs) => (
                <option key={rs.id} value={rs.id}>
                  {rs.name}
                </option>
              ))}
            </select>
          </div>
          <Button onClick={handleAdd} className="h-10">
            Thêm phòng
          </Button>
        </div>

        {/* List */}
        <div className="space-y-2 mt-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div className="flex-1 grid grid-cols-6 gap-4 items-center">
                {editingId === room.id ? (
                  <>
                    <Input
                      type="number"
                      value={editValues.roomNumber}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          roomNumber: Number(e.target.value),
                        }))
                      }
                    />
                    <select
                      value={editValues.floorId ?? 0}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          floorId: Number(e.target.value),
                        }))
                      }
                    >
                      <option value={0} disabled>-- Chọn tầng --</option>
                      {floors.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                    <select
                      value={editValues.roomTypeId ?? 0}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          roomTypeId: Number(e.target.value),
                        }))
                      }
                    >
                      <option value={0} disabled>-- Chọn loại phòng --</option>
                      {roomTypes.map((rt) => (
                        <option key={rt.id} value={rt.id}>
                          {rt.name}
                        </option>
                      ))}
                    </select>
                    <select
                      value={editValues.roomStatusId ?? 0}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          roomStatusId: Number(e.target.value),
                        }))
                      }
                    >
                      <option value={0} disabled>-- Chọn trạng thái --</option>
                      {roomStatuses.map((rs) => (
                        <option key={rs.id} value={rs.id}>
                          {rs.name}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
                    <p>{room.roomNumber}</p>
                    <p>{room.floorId && floors.find(fl => fl.id == room.floorId)?.name}</p>
                    <p>{room.roomTypeId && roomTypes.find(rt => rt.id == room.roomTypeId)?.name}</p>
                    <p>{room.roomStatusId && roomStatuses.find(rs => rs.id == room.roomStatusId)?.name}</p>
                  </>
                )}
              </div>
              <div className="space-x-2">
                {editingId === room.id ? (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSave(room.id)}
                    >
                      <Save className="h-4 w-4 mr-1" /> Lưu
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setEditingId(null)}
                    >
                      <X className="h-4 w-4 mr-1" /> Hủy
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(room)}
                    >
                      <Edit2 className="h-4 w-4 mr-1" /> Sửa
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(room.id)}
                    >
                      Xóa
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomPage;
