import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X, Edit2, Save } from "lucide-react";
import { Discount } from "@/types/Discount";
import { discountApi } from "@/api/discount.api";
import { toast } from "sonner";
import { toDateTimeLocal } from "@/utils/converter.util";



const DiscountPage: React.FC = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [newDiscount, setNewDiscount] = useState<Partial<Discount>>(() => {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
  
    return {
      code: "",
      description: "",
      percent: 0,
      maxAmount: 0,
      validFrom: toDateTimeLocal(now),       // giờ local GMT+7
      validTo: toDateTimeLocal(tomorrow),   // giờ local GMT+7
      usageLimit: 0,
      minOrderAmount: 0,
    };
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Partial<Discount>>({});

  const fetchDiscounts = async () => {
    const data = await discountApi.getAll();
    setDiscounts(data.reverse());
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);


  const validateDiscountDates = (fromStr?: string, toStr?: string): boolean => {
    const now: Date = new Date();
    const from: Date = new Date(fromStr || "");
    const to: Date = new Date(toStr || "");
  
    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      toast.error("Vui lòng nhập ngày hợp lệ");
      return false;
    }
  
    if (to <= now) {
      toast.error("Ngày kết thúc phải ở tương lai");
      return false;
    }
  
    if (from >= to) {
      toast.error("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
      return false;
    }
  
    return true;
  };
  console.log(newDiscount.validTo, (newDiscount.validTo))
  
  const validateDiscountParams = (percent: number, maxAmount: number) => {
    if (!percent && !maxAmount) {
      toast.error("Cài percent hoặc maxAmount trước khi submit!");
      return false;
    }
    return true;
  }

  const handleAdd = async () => {
    if (
      !validateDiscountDates(newDiscount.validFrom, newDiscount.validTo) || 
      !validateDiscountParams(newDiscount.percent, newDiscount.maxAmount)
    ) return;
  
    const created = await discountApi.create(newDiscount);
    setDiscounts((prev) => [...prev, created]);
    setNewDiscount({
      code: "",
      description: "",
      percent: 0,
      maxAmount: 0,
      validFrom: "",
      validTo: "",
      usageLimit: 0,
      minOrderAmount: 0,
    });
  };
  

  const handleEdit = (d: Discount) => {
    setEditingId(d.id);
    setEditValues({ ...d });
  };


  const handleSave = async (id: number) => {
    if (
      !validateDiscountDates(editValues.validFrom, editValues.validTo) || 
      !validateDiscountParams(editValues.percent, editValues.maxAmount)
    ) return;
  
    const updated = await discountApi.update(id, editValues);
    
    setDiscounts((prev) => prev.map((d) => (d.id === id ? updated : d)));
    setEditingId(null);
    setEditValues({});
  };

  const handleDelete = async (id: number) => {
    await discountApi.remove(id);
    setDiscounts((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <Card>
      <CardHeader className="flex items-center space-x-2">
        <Plus className="h-6 w-6 text-green-500" />
        <CardTitle>Quản lý Discount</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Thêm mới */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div>
            <Label>Code</Label>
            <Input
              value={newDiscount.code}
              onChange={(e) =>
                setNewDiscount((prev) => ({ ...prev, code: e.target.value }))
              }
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              value={newDiscount.description}
              onChange={(e) =>
                setNewDiscount((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <Label>Percent (%)</Label>
            <Input
              type="number"
              value={newDiscount.percent}
              onChange={(e) =>
                setNewDiscount((prev) => ({
                  ...prev,
                  percent: Number(e.target.value),
                }))
              }
            />
          </div>
          <div>
            <Label>Max Amount</Label>
            <Input
              type="number"
              value={newDiscount.maxAmount}
              onChange={(e) =>
                setNewDiscount((prev) => ({
                  ...prev,
                  maxAmount: Number(e.target.value),
                }))
              }
            />
          </div>
          <div>
            <Label>Valid From</Label>
            <Input
              type="datetime-local"
              value={newDiscount.validFrom}
              onChange={(e) =>
                setNewDiscount((prev) => ({
                  ...prev,
                  validFrom: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <Label>Valid To</Label>
            <Input
              type="datetime-local"
              value={newDiscount.validTo}
              onChange={(e) =>setNewDiscount((prev) => ({
                  ...prev,
                  validTo: e.target.value,
              }))
              }
            />
          </div>
          <div>
            <Label>Usage Limit</Label>
            <Input
              type="number"
              value={newDiscount.usageLimit}
              onChange={(e) =>
                setNewDiscount((prev) => ({
                  ...prev,
                  usageLimit: Number(e.target.value),
                }))
              }
            />
          </div>
          <div>
            <Label>Min Order Amount</Label>
            <Input
              type="number"
              value={newDiscount.minOrderAmount}
              onChange={(e) =>
                setNewDiscount((prev) => ({
                  ...prev,
                  minOrderAmount: Number(e.target.value),
                }))
              }
            />
          </div>
        </div>
        <Button onClick={handleAdd} className="w-full sm:w-auto">
          Thêm Discount
        </Button>

        {/* Danh sách */}
        <div className="space-y-4">
          {discounts.map((d) => (
            <div
              key={d.id}
              className="border rounded-lg p-4 shadow-sm flex justify-between items-center"
            >
              <div className="flex-1">
                {editingId === d.id ? (
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <Label>Code</Label>
                      <Input
                        value={editValues.code}
                        onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            code: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Input
                        value={editValues.description}
                        onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Percent (%)</Label>
                      <Input
                        type="number"
                        value={editValues.percent}
                        onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            percent: Number(e.target.value),
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Max Amount</Label>
                      <Input
                        type="number"
                        value={editValues.maxAmount}
                        onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            maxAmount: Number(e.target.value),
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Valid From</Label>
                      <Input
                        type="datetime-local"
                        value={toDateTimeLocal(editValues.validFrom)}
                        onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            validFrom: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div>
                      <Label>Valid To</Label>
                      <Input
                        type="datetime-local"
                        value={toDateTimeLocal(editValues.validTo)}
                        onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            validTo: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Usage Limit</Label>
                      <Input
                        type="number"
                        value={editValues.usageLimit}
                        onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            usageLimit: Number(e.target.value),
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Min Order</Label>
                      <Input
                        type="number"
                        value={editValues.minOrderAmount}
                        onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            minOrderAmount: Number(e.target.value),
                          }))
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-4 p-2 border rounded">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Code</label>
                      <p className="font-bold">{d.code}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500">Description</label>
                      <p>{d.description}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500">Percent</label>
                      <p className="text-blue-600">{d.percent}%</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500">Max Amount</label>
                      <p>{d.maxAmount}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500">Valid From</label>
                      <p>{d.validFrom}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500">Valid To</label>
                      <p>{d.validTo}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500">Usage Limit</label>
                      <p>{d.usageLimit}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500">Min Order</label>
                      <p>{d.minOrderAmount}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-x-2 ml-4">
                {editingId === d.id ? (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSave(d.id)}
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
                      onClick={() => handleEdit(d)}
                    >
                      <Edit2 className="h-4 w-4 mr-1" /> Sửa
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(d.id)}
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

export default DiscountPage;
