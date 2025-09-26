import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';


const Profile = () => {
    const { user } = useAuth();
    return (
        <Card>
            <CardHeader>
                <CardTitle>Thông Tin Tài Khoản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <div>
                <Label>Họ và tên</Label>
                <Input value={user?.firstName + " " + user?.firstName || ''} disabled />
            </div>
            <div>
                <Label>Email</Label>
                <Input value={user?.email || ''} disabled />
            </div>
            <p className="text-sm text-gray-500">
                Để thay đổi thông tin tài khoản, vui lòng liên hệ bộ phận hỗ trợ.
            </p>
            </CardContent>
        </Card>
    )
}

export default Profile