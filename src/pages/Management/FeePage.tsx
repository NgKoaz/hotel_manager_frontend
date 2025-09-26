import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit2, Save, X, Plus } from "lucide-react";
import { Fee } from "@/types/Fee";
import { feeApi } from "@/api/fee.api";

const FeePage: React.FC = () => {
  const [fees, setFees] = useState<Fee[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Partial<Fee>>({});
  const [newFee, setNewFee] = useState<Partial<Fee>>({
    paymentId: 0,
    amount: 0,
    description: "",
  });

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const data = await feeApi.getAll();
      setFees(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (fee: Fee) => {
    setEditingId(fee.id);
    setEditValues({ ...fee });
  };

  const handleSave = async (id: number) => {
    try {
      const updated = await feeApi.update(id, editValues);
      setFees((prev) => prev.map((f) => (f.id === id ? updated : f)));
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await feeApi.remove(id);
      setFees((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async () => {
    if (!newFee.paymentId) return;
    try {
      const created = await feeApi.create(newFee);
      setFees((prev) => [...prev, created]);
      setNewFee({ paymentId: 0, amount: 0, description: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center space-x-2">
        <Plus className="h-6 w-6 text-green-500" />
        <CardTitle>Quản lý Fee</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tạo mới */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end mb-4">
          <Input
            type="number"
            placeholder="Payment ID"
            value={newFee.paymentId ?? ""}
            onChange={(e) =>
              setNewFee((prev) => ({
                ...prev,
                paymentId: Number(e.target.value),
              }))
            }
          />
          <Input
            type="number"
            placeholder="Số tiền"
            value={newFee.amount ?? ""}
            onChange={(e) =>
              setNewFee((prev) => ({
                ...prev,
                amount: Number(e.target.value),
              }))
            }
          />
          <Input
            placeholder="Mô tả"
            value={newFee.description ?? ""}
            onChange={(e) =>
              setNewFee((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <Button onClick={handleCreate}>Thêm</Button>
        </div>

        {/* Danh sách */}
        <div className="space-y-2">
          {fees.map((f) => (
            <div
              key={f.id}
              className="flex justify-between items-center border-b py-2"
            >
              {editingId === f.id ? (
                <div className="flex-1 grid grid-cols-3 gap-2">
                  <Input
                    type="number"
                    value={editValues.paymentId ?? 0}
                    onChange={(e) =>
                      setEditValues((prev) => ({
                        ...prev,
                        paymentId: Number(e.target.value),
                      }))
                    }
                  />
                  <Input
                    type="number"
                    value={editValues.amount ?? 0}
                    onChange={(e) =>
                      setEditValues((prev) => ({
                        ...prev,
                        amount: Number(e.target.value),
                      }))
                    }
                  />
                  <Input
                    value={editValues.description ?? ""}
                    onChange={(e) =>
                      setEditValues((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>
              ) : (
                <div className="flex-1 grid grid-cols-3 gap-2">
                  <p>{f.paymentId}</p>
                  <p>{f.amount}</p>
                  <p>{f.description}</p>
                </div>
              )}
              <div className="space-x-2">
                {editingId === f.id ? (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSave(f.id)}
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
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(f)}
                    >
                      <Edit2 className="h-4 w-4 mr-1" /> Sửa
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(f.id)}
                    >
                      <X className="h-4 w-4 mr-1" /> Xóa
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

export default FeePage;
