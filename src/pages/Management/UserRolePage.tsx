import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { userRoleApi } from "@/api/user-role.api";
import { userApi } from "@/api/user.api";
import { roleApi } from "@/api/role.api";
import { User } from "./UserPage";
import { Role } from "@/types/Role";
import { UserRole } from "@/types/UserRole";

const UserRolePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);

  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [userSearch, setUserSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  const fetchAll = async () => {
    try {
      setUsers(await userApi.getAll());
      setRoles(await roleApi.getAll());
      setUserRoles(await userRoleApi.getAll());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // add user-role
  const handleAdd = async () => {
    if (!selectedUser || !selectedRole) return;
    if (userRoles.find(ur => ur.userId === selectedUser && ur.roleId === selectedRole)) return;

    try {
      const created = await userRoleApi.create({ userId: selectedUser, roleId: selectedRole });
      setUserRoles(prev => [...prev, created]);
      setSelectedUser(null);
      setSelectedRole(null);
      setUserSearch("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (userId: number, roleId: number) => {
    try {
      await userRoleApi.remove(userId, roleId);
      setUserRoles(prev => prev.filter(ur => !(ur.userId === userId && ur.roleId === roleId)));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(userSearch.toLowerCase())
  );

  const grouped = userRoles.reduce((acc: Record<number, UserRole[]>, ur) => {
    if (!acc[ur.userId]) acc[ur.userId] = [];   
    acc[ur.userId].push(ur);                     
    return acc;                                  
  }, {});

  return (
    <Card>
      <CardHeader className="flex items-center space-x-2">
        <Plus className="h-6 w-6 text-green-500" />
        <CardTitle>Quản lý User Role</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Thêm mới */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end mb-4">
          <div>
            <Label>User</Label>
            <Input
              placeholder="Tìm user..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="mb-1"
            />
            <Select
              value={selectedUser ? selectedUser.toString() : ""}
              onValueChange={(val) => setSelectedUser(Number(val))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn user" />
              </SelectTrigger>
              <SelectContent>
                {filteredUsers.map(u => (
                  <SelectItem key={u.id} value={u.id.toString()}>
                    {u.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Role</Label>
            <Select
              value={selectedRole ? selectedRole.toString() : ""}
              onValueChange={(val) => setSelectedRole(Number(val))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map(r => (
                  <SelectItem key={r.id} value={r.id.toString()}>
                    {r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleAdd} className="h-10 mt-2">Thêm</Button>
        </div>

        {/* Danh sách */}
        <div className="space-y-4">
        {Object.entries(grouped).map(([userId, rolesOfUser]) => {
            const user = users.find(u => +u.id === +userId);
            return (
              <div key={userId} className="border p-3 rounded">
                <p className="font-semibold mb-2">{user?.username}</p>
                <div className="space-y-1">
                  {rolesOfUser.map(ur =>  (
                      <div key={`${ur.userId}-${ur.roleId}`} className="flex justify-between items-center">
                        <span>{roles.find(r => +r.id == +ur.roleId).name}</span>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(ur.userId, ur.roleId)}
                        >
                          <X className="h-4 w-4 mr-1" /> Xóa
                        </Button>
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserRolePage;
