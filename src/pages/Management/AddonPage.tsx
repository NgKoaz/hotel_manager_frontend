import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coffee, Edit2, Save, X } from "lucide-react";
import { Addon } from "@/types/Addon";
import { addonApi } from "@/api/addon.api";
import { formatPrice } from "@/utils/formater.util";

const AddonPage: React.FC = () => {
  const [addons, setAddons] = useState<Addon[]>([]);
  const [name, setName] = useState<string>("");
  const [basePrice, setBasePrice] = useState<number>(0);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{ name: string; basePrice: number }>({
    name: "",
    basePrice: 0,
  });

  const getAddons = async () => {
    try {
      const data = await addonApi.getAll();
      setAddons(data);
    } catch (err) {
      console.error("Failed to fetch addons", err);
    }
  };

  useEffect(() => {
    getAddons();
  }, []);

  const handleAdd = async () => {
    if (!name) return;
    try {
      const newAddon = await addonApi.create({
        name,
        basePrice,
        isActive: true,
      });
      setAddons((prev) => [...prev, newAddon]);
      setName("");
      setBasePrice(0);
    } catch (err) {
      console.error("Failed to add addon", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await addonApi.remove(id);
      setAddons((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Failed to delete addon", err);
    }
  };

  const handleEdit = (addon: Addon) => {
    setEditingId(addon.id);
    setEditValues({ name: addon.name, basePrice: addon.basePrice });
  };

  const handleSave = async (id: number) => {
    try {
      const updatedAddon = await addonApi.update(id, editValues);
      setAddons((prev) => prev.map((a) => (a.id === id ? updatedAddon : a)));
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update addon", err);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex items-center space-x-2">
        <Coffee className="h-6 w-6 text-yellow-500" />
        <CardTitle>Quản lý Addon</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Form thêm mới addon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end mb-4">
          <div>
            <Label htmlFor="name">Tên Addon</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="price">Giá (VND)</Label>
            <Input
              id="price"
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(Number(e.target.value))}
            />
          </div>
          <Button onClick={handleAdd} className="h-10">
            Thêm Addon
          </Button>
        </div>

        {/* Danh sách addon */}
        <div className="space-y-2">
          {addons.map((a) => (
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
                      type="number"
                      value={editValues.basePrice}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          basePrice: Number(e.target.value),
                        }))
                      }
                    />
                  </div>
                ) : (
                  <>
                    <p className="font-medium">
                      {a.name} - {formatPrice(a.basePrice)}
                    </p>
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
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setEditingId(null)}
                    >
                      <X className="h-4 w-4 mr-1" /> Hủy
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(a)}>
                      <Edit2 className="h-4 w-4 mr-1" /> Sửa
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(a.id)}
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

export default AddonPage;
