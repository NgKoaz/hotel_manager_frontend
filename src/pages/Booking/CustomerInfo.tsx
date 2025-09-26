import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { RoleEnum } from '@/enums/Role.enum';
import { useEffect } from 'react';


export interface CustomerInfoProps {
    firstName: string;
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    lastName: string;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
    phone: string;
    setPhone: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
}


const CustomerInfo: React.FC<CustomerInfoProps> = ({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phone,
    setPhone,
    email,
    setEmail
}) => {
    const { user, roleIds } = useAuth();
    const isDisabled = !roleIds?.some(id => id == RoleEnum.Receptionist || id == RoleEnum.Admin);
    useEffect(() => {
        if (isDisabled) {
            setFirstName(user?.firstName || "");
            setLastName(user?.lastName || "");
            setPhone(user?.phone || "");
            setEmail(user?.email || "");
        } else {
            setFirstName("");
            setLastName("");
            setPhone("");
            setEmail("");
        }
    }, [user, roleIds]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Thông tin khách hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label>Họ</Label>
                    <Input
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        {...(isDisabled ? { disabled: true } : {})}
                    />
                </div>
                <div>
                    <Label>Tên</Label>
                    <Input 
                        value={firstName} 
                        onChange={e => setFirstName(e.target.value)} 
                        {...(isDisabled && { disabled: true })} 
                    />
                </div>
                
                <div>
                    <Label>Email</Label>
                    <Input 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        {...(isDisabled && { disabled: true })} 
                    />
                </div>
                <div>
                    <Label>Số điện thoại</Label>
                    <Input 
                        value={phone} 
                        onChange={e => setPhone(e.target.value)} 
                        {...(isDisabled && { disabled: true })} 
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default CustomerInfo