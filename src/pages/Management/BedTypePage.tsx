import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Edit2, Save, X, Tag, Trash2 } from 'lucide-react';
import { bedTypeApi } from '@/api/bed-type.api';
import { BedType } from '@/types/BedType';
import { toast } from 'sonner';

const BedTypePage: React.FC = () => {
  const [bedTypes, setBedTypes] = useState<BedType[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{ name: string; description?: string }>({ name: '', description: '' });

  useEffect(() => {
    bedTypeApi.getAll()
      .then(setBedTypes)
      .catch(err => console.error('Fetch failed:', err));
  }, []);

  const addBedType = async () => {
    if (!name) {
      toast.error("Trường Name là bắt buộc.");
      return;
    }
    try {
      const data = await bedTypeApi.create(name, description);
      setBedTypes(prev => [...prev, data]);
      setName('');
      setDescription('');
      toast.success("Thêm loại giường thành công!");
    } catch (err: any) {
      console.error('Add failed:', err);
      toast.error("Không thể thêm loại giường.");
    }
  };

  const handleEdit = (bedType: BedType) => {
    setEditingId(bedType.id);
    setEditValues({ name: bedType.name, description: bedType.description });
  };

  const handleSave = async (id: number) => {
    try {
      const data = await bedTypeApi.update(id, editValues.name, editValues.description ?? '');
      setEditingId(null);
      setBedTypes(prev => prev.map(a => (a.id === id ? data : a)));
      toast.success("Cập nhật thành công!");
    } catch (err: any) {
      console.error('Update failed:', err);
      toast.error("Không thể cập nhật loại giường.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const data = await bedTypeApi.remove(id);
      setBedTypes(prev => prev.filter(a => a.id !== id));
      toast.success(`Xóa loại giường #${id} thành công!`);
    } catch (err: any) {
      console.error('Delete failed:', err);
      toast.error("Không thể xóa loại giường.");
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center space-x-2">
        <Tag className="h-6 w-6 text-green-500" />
        <CardTitle>Quản lý loại giường</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Thêm mới */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <Label htmlFor="name">Tên loại giường</Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="desc">Mô tả</Label>
            <Input id="desc" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <Button onClick={addBedType} className="h-10">Thêm loại giường</Button>
        </div>

        {/* Danh sách */}
        <div className="space-y-2 mt-4">
          {bedTypes.map(a => (
            <div key={a.id} className="flex justify-between items-center border-b py-2">
              <div className="flex-1">
                {editingId === a.id ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Input
                      value={editValues.name}
                      onChange={e => setEditValues(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                      value={editValues.description}
                      onChange={e => setEditValues(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                ) : (
                  <>
                    <p className="font-medium">{a.name}</p>
                    {a.description && <p className="text-sm text-gray-500">{a.description}</p>}
                  </>
                )}
              </div>

              <div className="space-x-2">
                {editingId === a.id ? (
                  <>
                    <Button size="sm" variant="outline" onClick={() => handleSave(a.id)}>
                      <Save className="h-4 w-4 mr-1" /> Lưu
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => setEditingId(null)}>
                      <X className="h-4 w-4 mr-1" /> Hủy
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(a)}>
                      <Edit2 className="h-4 w-4 mr-1" /> Sửa
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(a.id)}>
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

export default BedTypePage;
