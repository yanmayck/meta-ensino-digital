import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';

interface UserData {
  id: string;
  email: string;
  nome?: string | null;
  role: 'user' | 'admin' | 'analyst';
}

interface AuthContextType {
  user: UserData | null;
  login: (email: string) => Promise<{ error?: any }>;
  signUp: (email: string, nome?: string) => Promise<{ error?: any }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string): Promise<{ error?: any }> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error };
      }

      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect based on role
      if (data.user.role === 'admin' || data.user.role === 'analyst') {
        setLocation('/admin');
      } else {
        setLocation('/dashboard');
      }

      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao sistema.",
      });

      return {};
    } catch (error) {
      console.error('Login error:', error);
      return { error: 'Erro interno do servidor' };
    }
  };

  const signUp = async (email: string, nome?: string): Promise<{ error?: any }> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, nome }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error };
      }

      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Sua conta foi criada.",
      });

      setLocation('/dashboard');

      return {};
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: 'Erro interno do servidor' };
    }
  };

  const logout = async (): Promise<void> => {
    setUser(null);
    localStorage.removeItem('user');
    setLocation('/');
    
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  const value = {
    user,
    login,
    signUp,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};