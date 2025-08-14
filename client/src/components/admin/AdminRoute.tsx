
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'analyst')[];
}

const AdminRoute = ({ children, allowedRoles = ['admin', 'analyst'] }: AdminRouteProps) => {
  const { userData, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!userData || !allowedRoles.includes(userData.role as 'admin' | 'analyst')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Acesso Negado</h1>
          <p className="text-gray-600">Você não tem permissão para acessar esta área.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
