import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Hotel, User, LogOut } from 'lucide-react';
import { RoleEnum } from '@/enums/Role.enum';


const UserMenu = ({  }) => {
    const navigate = useNavigate();
    const { user, logout, isAuthenticated, roleIds } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (isAuthenticated) {
        console.log(roleIds)
        let higestAuthorityRoleId = roleIds?.length > 0 ? Math.min(...roleIds) : RoleEnum.Customer;
        const roleName = RoleEnum[higestAuthorityRoleId];

        return (
            <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-400" />
                    <Badge variant="secondary">
                        {roleName}
                    </Badge>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                </Button>
            </div>
        )
    } else {
        return (
            <div className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
                <Link to="/register">Register</Link>
            </Button>
            </div>
        )
    }
}

export default UserMenu