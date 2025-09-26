import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit2, Save, X } from "lucide-react";
import { userApi } from "@/api/user.api";

export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  phone?: string;
  isActive?: boolean;
}

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Partial<User>>({});
  const [search, setSearch] = useState<string>("");

  const fetchUsers = async () => {
    try {
      const data = await userApi.getAll();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setEditValues({ ...user });
  };

  const handleSave = async (id: number) => {
    try {
      const updated = await userApi.update(id, editValues);
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
      setEditingId(null);
      setEditValues({});
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await userApi.remove(id);
      setUsers((prev) => prev.map(u => {
        if (u.id == id) {
          u.isActive = false
        }
        return u;
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // filter users theo search
  const filteredUsers = users.filter((u) => {
    const term = search.toLowerCase();
    const combine = u.firstName + " " + u.lastName + " " + u.username + " " + u.email + " " +u.phone
    return (
      (combine.toLowerCase().includes(term) ?? false)
    );
  });

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <CardTitle>Quản lý User</CardTitle>
        <Input
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredUsers.map((u) => (
          <div
            key={u.id}
            className="flex justify-between items-center border-b py-2 gap-2"
          >
            <div className="flex-1 grid grid-cols-6 gap-4 items-center">
              {editingId === u.id ? (
                <>
                  <Input
                    value={editValues.firstName ?? ""}
                    onChange={(e) =>
                      setEditValues((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                  />
                  <Input
                    value={editValues.lastName ?? ""}
                    onChange={(e) =>
                      setEditValues((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                  />
                  <Input
                    value={editValues.username ?? ""}
                    onChange={(e) =>
                      setEditValues((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                  />
                  <Input
                    value={editValues.email ?? ""}
                    onChange={(e) =>
                      setEditValues((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                  <Input
                    value={editValues.phone ?? ""}
                    onChange={(e) =>
                      setEditValues((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                  <select
                    value={editValues.isActive ? 1 : 0}
                    onChange={(e) =>
                      setEditValues((prev) => ({
                        ...prev,
                        isActive: e.target.value === "1",
                      }))
                    }
                    className="border rounded p-1"
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                </>
              ) : (
                <>
                  <p className="truncate" title={u.firstName ?? ""}>
                    {u.firstName}
                  </p>
                  <p className="truncate" title={u.lastName ?? ""}>
                    {u.lastName}
                  </p>
                  <p className="truncate" title={u.username ?? ""}>
                    {u.username}
                  </p>
                  <p className="truncate" title={u.email ?? ""}>
                    {u.email}
                  </p>
                  <p className="truncate" title={u.phone ?? ""}>
                    {u.phone}
                  </p>
                  <p>{u.isActive ? "Active" : "Inactive"}</p>
                </>
              )}
            </div>
            <div className="space-x-2">
              {editingId === u.id ? (
                <>
                  <Button size="sm" variant="outline" onClick={() => handleSave(u.id)}>
                    <Save className="h-4 w-4 mr-1" /> Lưu
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => setEditingId(null)}>
                    <X className="h-4 w-4 mr-1" /> Hủy
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(u)}>
                    <Edit2 className="h-4 w-4 mr-1" /> Sửa
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(u.id)}>
                    Deactive
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        {filteredUsers.length === 0 && <p>Không tìm thấy user nào.</p>}
      </CardContent>
    </Card>
  );
};

export default UserPage;
