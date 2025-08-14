import DashboardLayout from "@/components/layout/DashboardLayout";
import { BookOpen, Clock, Trophy, Target, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Mock user ID - em produção, isso viria do contexto de autenticação
// Usando um dos IDs reais do banco para testar
const CURRENT_USER_ID = "00ddd7b8-7d40-43fa-a3b0-412075250224";

const Dashboard = () => {
  // Fetch user stats
  const { data: userStatsData, isLoading: statsLoading } = useQuery({
    queryKey: [`/api/users/${CURRENT_USER_ID}/stats`],
    enabled: !!CURRENT_USER_ID,
  });

  // Fetch user enrollments
  const { data: enrollmentsData, isLoading: enrollmentsLoading } = useQuery({
    queryKey: [`/api/users/${CURRENT_USER_ID}/enrollments`],
    enabled: !!CURRENT_USER_ID,
  });

  const stats = userStatsData?.stats ? [
    {
      title: "Cursos Concluídos",
      value: userStatsData.stats.courses.completed.toString(),
      total: userStatsData.stats.courses.total.toString(),
      icon: Trophy,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      title: "Horas Estudadas",
      value: userStatsData.stats.study.totalHours.toString(),
      subtitle: "total",
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Progresso Geral",
      value: `${userStatsData.stats.courses.averageProgress}%`,
      subtitle: "média dos cursos",
      icon: Target,
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      title: "Nota Média",
      value: userStatsData.stats.courses.averageGrade?.toFixed(1) || "0.0",
      subtitle: "nas avaliações",
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-50"
    }
  ] : [];

  const cursosAtivos = enrollmentsData?.enrollments?.filter(enrollment => 
    enrollment.status === 'active'
  ).map(enrollment => ({
    nome: enrollment.title,
    progresso: enrollment.progress_percentage || 0,
    proximaAula: "Próxima aula",
    prazo: "Verificar cronograma"
  })) || [];

  if (statsLoading || enrollmentsLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-96"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
                <div className="h-12 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Bem-vindo de volta! Vamos continuar seus estudos.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    {stat.total && (
                      <span className="text-sm text-gray-500 ml-1">/{stat.total}</span>
                    )}
                  </div>
                  {stat.subtitle && (
                    <p className="text-sm text-gray-500">{stat.subtitle}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cursos Ativos */}
        {cursosAtivos.length > 0 && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-primary" />
                Meus Cursos Ativos
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {cursosAtivos.map((curso, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{curso.nome}</h3>
                    <span className="text-sm text-gray-500">{curso.progresso}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${curso.progresso}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Próxima: {curso.proximaAula}</span>
                    <span className="text-orange-600 font-medium">Prazo: {curso.prazo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;