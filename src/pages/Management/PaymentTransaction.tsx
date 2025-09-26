import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, Save, X, CreditCard } from "lucide-react";
import { PaymentTransaction } from "@/types/PaymentTransaction";
import { paymentTransactionApi } from "@/api/payment-transaction.api";

const PaymentTransactionPage: React.FC = () => {
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
  const [newTransaction, setNewTransaction] = useState<Partial<PaymentTransaction>>({
    paymentId: 0,
    gatewayTransactionId: 0,
    amount: 0,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Partial<PaymentTransaction>>({});

  const fetchTransactions = async () => {
    try {
      const data = await paymentTransactionApi.getAll();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAdd = async () => {
    if (!newTransaction.paymentId || !newTransaction.gatewayTransactionId || newTransaction.amount === undefined) return;
    try {
      const created = await paymentTransactionApi.create(newTransaction);
      setTransactions((prev) => [...prev, created]);
      setNewTransaction({ paymentId: 0, gatewayTransactionId: 0, amount: 0 });
    } catch (err) {
      console.error("Failed to add transaction", err);
    }
  };

  const handleEdit = (t: PaymentTransaction) => {
    setEditingId(t.id);
    setEditValues({ ...t });
  };

  const handleSave = async (id: number) => {
    try {
      const updated = await paymentTransactionApi.update(id, editValues);
      setTransactions((prev) => prev.map((t) => (t.id === id ? updated : t)));
      setEditingId(null);
      setEditValues({});
    } catch (err) {
      console.error("Failed to update transaction", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await paymentTransactionApi.remove(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Failed to delete transaction", err);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex items-center space-x-2">
        <CreditCard className="h-6 w-6 text-blue-500" />
        <CardTitle>Quản lý Payment Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Form thêm mới */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end mb-4">
          <div>
            <Label>Payment ID</Label>
            <Input
              type="number"
              value={newTransaction.paymentId}
              onChange={(e) =>
                setNewTransaction((prev) => ({ ...prev, paymentId: Number(e.target.value) }))
              }
            />
          </div>
          <div>
            <Label>Gateway Transaction ID</Label>
            <Input
              type="number"
              value={newTransaction.gatewayTransactionId}
              onChange={(e) =>
                setNewTransaction((prev) => ({ ...prev, gatewayTransactionId: Number(e.target.value) }))
              }
            />
          </div>
          <div>
            <Label>Amount</Label>
            <Input
              type="number"
              value={newTransaction.amount}
              onChange={(e) =>
                setNewTransaction((prev) => ({ ...prev, amount: Number(e.target.value) }))
              }
            />
          </div>
          <Button onClick={handleAdd} className="h-10">
            Thêm
          </Button>
        </div>

        {/* Danh sách transactions */}
        <div className="space-y-2">
          {transactions.map((t) => (
            <div key={t.id} className="flex justify-between items-center border-b py-2 gap-2">
              <div className="flex-1">
                {editingId === t.id ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Input
                      type="number"
                      value={editValues.paymentId}
                      onChange={(e) =>
                        setEditValues((prev) => ({ ...prev, paymentId: Number(e.target.value) }))
                      }
                    />
                    <Input
                      type="number"
                      value={editValues.gatewayTransactionId}
                      onChange={(e) =>
                        setEditValues((prev) => ({ ...prev, gatewayTransactionId: Number(e.target.value) }))
                      }
                    />
                    <Input
                      type="number"
                      value={editValues.amount}
                      onChange={(e) =>
                        setEditValues((prev) => ({ ...prev, amount: Number(e.target.value) }))
                      }
                    />
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p>Payment ID: {t.paymentId}</p>
                    <p>Gateway Transaction ID: {t.gatewayTransactionId}</p>
                    <p>Amount: {t.amount}</p>
                    <p>Created At: {t.createdAt}</p>
                  </div>
                )}
              </div>

              <div className="space-x-2">
                {editingId === t.id ? (
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleSave(t.id)}>
                      <Save className="h-4 w-4 mr-1" /> Lưu
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => setEditingId(null)}>
                      <X className="h-4 w-4 mr-1" /> Hủy
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(t)}>
                      <Edit2 className="h-4 w-4 mr-1" /> Sửa
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(t.id)}>
                      <X className="h-4 w-4 mr-1" /> Xóa
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

export default PaymentTransactionPage;
