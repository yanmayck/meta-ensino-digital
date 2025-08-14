
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  MessageSquare, 
  LogOut, 
  Menu, 
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { userData, logout } = useAuth();

  const menuItems = [
    { path: "/admin", icon: BarChart3, label: "Dashboard", roles: ['admin', 'analyst'] },
    { path: "/admin/users", icon: Users, label: "Usuários", roles: ['admin'] },
    { path: "/admin/courses", icon: BookOpen, label: "Cursos", roles: ['admin', 'analyst'] },
    { path: "/admin/support", icon: MessageSquare, label: "Suporte", roles: ['admin'] },
  ];

  const allowedMenuItems = menuItems.filter(item => 
    userData && item.roles.includes(userData.role)
  );

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <Link to="/admin" className="flex items-center">
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Meta
              </span>
              <span className="ml-1 text-sm text-gray-500">Admin</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {allowedMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActiveRoute(item.path)
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User section */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-semibold">
                  {userData?.email?.charAt(0).toUpperCase() || 'A'}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  {userData?.email || 'Admin'}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {userData?.role || 'admin'}
                </p>
              </div>
            </div>
            <div className="mt-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="w-full"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            
            {/* Mobile menu content */}
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Meta
                </span>
                <span className="ml-1 text-sm text-gray-500">Admin</span>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {allowedMenuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      isActiveRoute(item.path)
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon className="mr-4 h-6 w-6" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
