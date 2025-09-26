import { myApi } from '@/api/my.api';
import { User } from '@/types/User';
import React, { createContext, useContext, useState, useEffect } from 'react';


interface AuthContextType {
  user: User | null;
  roleIds: number[];
  login: (identifier: string, password: string) => Promise<boolean>;
  register: (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [roleIds, setRoleIds] = useState<number[]>([]);

  useEffect(() => {
    myApi.getProfile()
      .then((data) => {
        setUser(data.user);
        setRoleIds(data.roles);
      })
      .catch(err => {
        console.error(err);
        setUser(null);
        setRoleIds([]);
      });

  }, []);

  
  const login = async (identifier: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
        credentials: 'include', // gửi nhận HttpOnly cookie
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setUser(data.user); 
        console.log("Login", data.user)
        return true;
      } else {
        console.error(data.error);
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const register = async (firstName: string, lastName: string, username: string, email: string, phone: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('http://localhost:3000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, username, email, phone, password }),
        credentials: 'include', // gửi nhận cookie
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setUser(data.user); // lưu user info
        return true;
      } else {
        console.error(data.errors || data.error);
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    // localStorage.removeItem('hotel_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      roleIds,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};