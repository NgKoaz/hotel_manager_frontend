import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { roomTypeImageApi } from "@/api/room-type-image.api";
import { roomTypeApi } from "@/api/room-type.api";
import { RoomTypeImage } from "@/types/RoomTypeImage";
import { RoomType } from "@/types/RoomType";

const RoomTypeImagePage: React.FC = () => {
  const [images, setImages] = useState<RoomTypeImage[]>([]);
  const [roomTypeId, setRoomTypeId] = useState<number>(0);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [newImage, setNewImage] = useState<Partial<RoomTypeImage>>({
    roomTypeId: 0,
    imageUrl: "",
    isPrimary: 1,
    sortOrder: 0,
  });
  const [file, setFile] = useState<File | null>(null);

  const fetchRoomTypes = async () => {
    try {
      const data = await roomTypeApi.getAll();
      setRoomTypes(data.filter(rt => !rt.isDeleted));
    } catch (err) {
      console.error(err);
      toast.error("Không lấy được danh sách RoomType");
    }
  };

  const fetchImages = async () => {
    if (!roomTypeId) return;
    try {
      const data = await roomTypeImageApi.getByRoomType(roomTypeId);
      setImages(data);
    } catch (err) {
      console.error(err);
      toast.error("Không lấy được danh sách ảnh");
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  useEffect(() => {
    fetchImages();
  }, [roomTypeId]);

  const handleUpload = async () => {
    if (!file || !roomTypeId) return toast.error("Chọn file và RoomType trước");
    try {
      const { imageUrl } = await roomTypeImageApi.upload(file);
      const created = await roomTypeImageApi.create({
        ...newImage,
        roomTypeId,
        imageUrl,
      });
      setImages(prev => [...prev, created]);
      setNewImage({ roomTypeId, imageUrl: "", isPrimary: 0, sortOrder: 0 });
      setFile(null);
      toast.success("Upload thành công");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Upload thất bại");
    }
  };

  const handleUpdate = async (id: number, updated: Partial<RoomTypeImage>) => {
    try {
      const data = await roomTypeImageApi.update(id, updated);
      setImages(prev => prev.map(img => (img.id === id ? data : img)));
      toast.success("Cập nhật thành công");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Lỗi cập nhật");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Xác nhận xóa ảnh này?")) return;
    try {
      await roomTypeImageApi.remove(id);
      setImages(prev => prev.filter(img => img.id !== id));
      toast.success("Xóa thành công");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Lỗi xóa");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>RoomTypeImage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filter theo RoomType */}
        <div>
          <Label>RoomType</Label>
          <Select
            value={roomTypeId ? String(roomTypeId) : ""}
            onValueChange={val => setRoomTypeId(Number(val))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn RoomType" />
            </SelectTrigger>
            <SelectContent>
              {roomTypes.map(rt => (
                <SelectItem key={rt.id} value={rt.id.toString()}>
                  {rt.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Upload mới */}
        <div className="grid grid-cols-5 gap-4 items-end">
          <div>
            <Label>Ảnh</Label>
            <Input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
          </div>
          <div>
            <Label>IsPrimary</Label>
            <Input
              type="number"
              value={newImage.isPrimary}
              onChange={e =>
                setNewImage(prev => ({ ...prev, isPrimary: Number(e.target.value) }))
              }
            />
          </div>
          <div>
            <Label>SortOrder</Label>
            <Input
              type="number"
              value={newImage.sortOrder}
              onChange={e =>
                setNewImage(prev => ({ ...prev, sortOrder: Number(e.target.value) }))
              }
            />
          </div>
          <Button onClick={handleUpload}>Upload & Thêm</Button>
        </div>

        {/* Danh sách ảnh */}
        <div className="space-y-2 mt-4">
          {images.map(img => (
            <div
              key={img.id}
              className="grid grid-cols-6 gap-4 items-center border-b py-2"
            >
              <img src={img.imageUrl} alt="" className="h-16 w-16 object-cover" />
              <Input
                type="number"
                value={img.isPrimary}
                onChange={e =>
                  setImages(prev =>
                    prev.map(r =>
                      r.id === img.id ? { ...r, isPrimary: Number(e.target.value) } : r
                    )
                  )
                }
              />
              <Input
                type="number"
                value={img.sortOrder}
                onChange={e =>
                  setImages(prev =>
                    prev.map(r =>
                      r.id === img.id ? { ...r, sortOrder: Number(e.target.value) } : r
                    )
                  )
                }
              />
              <div className="space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUpdate(img.id, img)}
                >
                  Sửa
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(img.id)}
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

export default RoomTypeImagePage;
