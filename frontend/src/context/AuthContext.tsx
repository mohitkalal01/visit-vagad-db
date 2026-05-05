'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_URL;
                const res = await fetch(`${baseUrl}/auth/me`, {
                    credentials: 'include'
                });
                const data = await res.json();
                if (data.success) {
                    setUser(data.data);
                }
            } catch (err) {
                console.error('Auth check failed');
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    const login = (userData: User) => setUser(userData);
    const logout = async () => {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
            await fetch(`${baseUrl}/auth/logout`, { 
                method: 'POST',
                credentials: 'include'
            });
            setUser(null);
            window.location.href = '/';
        } catch (err) {
            console.error('Logout failed');
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
