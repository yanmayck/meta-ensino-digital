
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, MessageSquare } from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";

interface DashboardStats {
  totalUsers: number;
  activeCourses: number;
  openTickets: number;
  userRegistrations: { date: string; count: number }[];
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeCourses: 0,
    openTickets: 0,
    userRegistrations: []
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    try {
      // Fetch stats from our API routes
      const [coursesResponse] = await Promise.all([
        fetch('/api/courses')
      ]);

      const coursesData = await coursesResponse.json();

      // Mock statistics for demonstration
      setStats({
        totalUsers: 25,
        activeCourses: coursesData.courses?.length || 0,
        openTickets: 3,
        userRegistrations: [
          { date: '2024-01-15', count: 5 },
          { date: '2024-01-16', count: 8 },
          { date: '2024-01-17', count: 3 },
        ]
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set default stats on error
      setStats({
        totalUsers: 0,
        activeCourses: 0,
        openTickets: 0,
        userRegistrations: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Administrativo</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cursos Ativos</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeCourses}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tickets Abertos</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.openTickets}</div>
            </CardContent>
          </Card>
        </div>

        {/* Registrations Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Cadastros dos Últimos 7 Dias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.userRegistrations.length > 0 ? (
                stats.userRegistrations.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.date}</span>
                    <div className="flex items-center">
                      <div 
                        className="bg-primary h-4 mr-2 rounded"
                        style={{ width: `${(item.count / Math.max(...stats.userRegistrations.map(r => r.count))) * 200}px` }}
                      />
                      <span className="text-sm font-medium">{item.count}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Nenhum cadastro nos últimos 7 dias</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
