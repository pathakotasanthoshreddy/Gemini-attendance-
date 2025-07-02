import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface User {
  id: string;
  role: 'admin' | 'student';
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isStudent: boolean;
  loading: boolean;
  login: (username: string, password: string, role: 'admin' | 'student') => Promise<User>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simulate initial auth check (e.g., from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('vcube_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string, role: 'admin' | 'student'): Promise<User> => {
    setLoading(true);
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if ((role === 'admin' && username === 'admin@vcube.com' && password === 'admin@1234') ||
            (role === 'student' && username === 'student' && password === 'student')) {
          const newUser: User = { 
            id: username, 
            role, 
            name: username === 'admin@vcube.com' ? 'Admin User' : 'Student User' 
          };
          setUser(newUser);
          localStorage.setItem('vcube_user', JSON.stringify(newUser));
          toast.success(`Welcome, ${newUser.name}!`);
          resolve(newUser);
        } else {
          toast.error("Invalid credentials.");
          reject(new Error("Invalid credentials"));
        }
        setLoading(false);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vcube_user');
    toast.success("Logged out successfully!");
    navigate('/');
  };

  const isAdmin = user?.role === 'admin';
  const isStudent = user?.role === 'student';
  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isAdmin, isStudent, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};