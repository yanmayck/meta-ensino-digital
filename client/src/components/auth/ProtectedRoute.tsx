
import { useAuth } from '@/hooks/useAuth';
import { useLocation, Redirect } from 'wouter';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const [location] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirecionar para login
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
