import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Edit2, Save, X, Coffee } from "lucide-react";
import { Amenity } from "@/types/Amenity";
import { amenityApi } from "@/api/amenity.api";

const AmenityPage: React.FC = () => {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{ name: string; description?: string }>({
    name: "",
    description: "",
  });

  // Lấy danh sách amenity
  useEffect(() => {
    amenityApi
      .getAll()
      .then(setAmenities)
      .catch((err) => console.error("Fetch failed", err));
  }, []);

  const handleAdd = async () => {
    if (!name) return;
    try {
      const newAmenity = await amenityApi.create({ name, description });
      setAmenities((prev) => [...prev, newAmenity]);
      setName("");
      setDescription("");
    } catch (err) {
      console.error("Create failed", err);
    }
  };

  const handleEdit = (amenity: Amenity) => {
    setEditingId(amenity.id);
    setEditValues({ name: amenity.name, description: amenity.description });
  };

  const handleSave = async (id: number) => {
    try {
      const updated = await amenityApi.update(id, editValues);
      setAmenities((prev) => prev.map((a) => (a.id === id ? updated : a)));
      setEditingId(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await amenityApi.remove(id);
      setAmenities((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center space-x-2">
        <Coffee className="h-6 w-6 text-blue-500" />
        <CardTitle>Quản lý Amenity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Thêm mới */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <Label htmlFor="name">Tên Amenity</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="desc">Mô tả</Label>
            <Input id="desc" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <Button onClick={handleAdd} className="h-10">
            Thêm Amenity
          </Button>
        </div>

        {/* Danh sách */}
        <div className="space-y-2 mt-4">
          {amenities.map((a) => (
            <div key={a.id} className="flex justify-between items-center border-b py-2 gap-2">
              <div className="flex-1">
                {editingId === a.id ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Input
                      value={editValues.name}
                      onChange={(e) =>
                        setEditValues((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                    <Input
                      value={editValues.description}
                      onChange={(e) =>
                        setEditValues((prev) => ({ ...prev, description: e.target.value }))
                      }
                    />
                  </div>
                ) : (
                  <>
                    <p className="font-medium">{a.name}</p>
                    {a.description && (
                      <p className="text-sm text-gray-500">{a.description}</p>
                    )}
                  </>
                )}
              </div>
              <div className="space-x-2">
                {editingId === a.id ? (
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleSave(a.id)}>
                      <Save className="h-4 w-4 mr-1" /> Lưu
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => setEditingId(null)}>
                      <X className="h-4 w-4 mr-1" /> Hủy
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(a)}>
                      <Edit2 className="h-4 w-4 mr-1" /> Sửa
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(a.id)}>
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

export default AmenityPage;
