import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Edit2, Save, X, Layers, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { floorApi } from "@/api/floor.api";
import { Floor } from "@/types/Floor";

const FloorPage: React.FC = () => {
  const [floors, setFloors] = useState<Floor[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{ name: string; description?: string }>({
    name: "",
    description: "",
  });

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    floorApi
      .getAll()
      .then(setFloors)
      .catch((err) => {
        console.error(err);
        toast.error("Không thể tải danh sách Floor.");
      });
  }, []);

  const handleAdd = async () => {
    if (!newName) {
      toast.error("Tên Floor là bắt buộc.");
      return;
    }
    try {
      const data = await floorApi.create({ name: newName, description: newDescription });
      setFloors((prev) => [...prev, data]);
      setNewName("");
      setNewDescription("");
      toast.success("Thêm Floor thành công!");
    } catch (err) {
      console.error(err);
      toast.error("Không thể thêm Floor.");
    }
  };

  const handleEdit = (floor: Floor) => {
    setEditingId(floor.id);
    setEditValues({ name: floor.name, description: floor.description });
  };

  const handleSave = async (id: number) => {
    try {
      const updated = await floorApi.update(id, editValues);
      setFloors((prev) => prev.map((f) => (f.id === id ? updated : f)));
      setEditingId(null);
      toast.success("Cập nhật thành công!");
    } catch (err) {
      console.error(err);
      toast.error("Không thể cập nhật Floor.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await floorApi.remove(id);
      setFloors((prev) => prev.filter((f) => f.id !== id));
      toast.success(`Xóa Floor #${id} thành công!`);
    } catch (err) {
      console.error(err);
      toast.error("Không thể xóa Floor.");
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center space-x-2">
        <Layers className="h-6 w-6 text-indigo-500" />
        <CardTitle>Quản lý Floor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Thêm mới */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <Label htmlFor="newName">Tên Floor</Label>
            <Input id="newName" value={newName} onChange={(e) => setNewName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="newDesc">Mô tả</Label>
            <Input id="newDesc" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
          </div>
          <Button onClick={handleAdd} className="h-10">
            Thêm Floor
          </Button>
        </div>

        {/* Danh sách */}
        <div className="space-y-2 mt-4">
          {floors.map((f) => (
            <div key={f.id} className="flex justify-between items-center border-b py-2 gap-4">
              <div className="flex-1">
                {editingId === f.id ? (
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={editValues.name}
                      onChange={(e) => setEditValues((prev) => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                      value={editValues.description}
                      onChange={(e) => setEditValues((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                ) : (
                  <>
                    <p className="font-medium">{f.name}</p>
                    {f.description && <p className="text-sm text-gray-500">{f.description}</p>}
                  </>
                )}
              </div>
              <div className="space-x-2">
                {editingId === f.id ? (
                  <>
                    <Button size="sm" variant="outline" onClick={() => handleSave(f.id)}>
                      <Save className="h-4 w-4 mr-1" /> Lưu
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => setEditingId(null)}>
                      <X className="h-4 w-4 mr-1" /> Hủy
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(f)}>
                      <Edit2 className="h-4 w-4 mr-1" /> Sửa
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(f.id)}>
                      <Trash2 className="h-4 w-4 mr-1" /> Xóa
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FloorPage;
