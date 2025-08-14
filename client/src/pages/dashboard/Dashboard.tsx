
import DashboardLayout from "@/components/layout/DashboardLayout";
import { BookOpen, Clock, Trophy, Target, TrendingUp, CheckCircle } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Cursos Concluídos",
      value: "3",
      total: "12",
      icon: Trophy,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      title: "Horas Estudadas",
      value: "127",
      subtitle: "este mês",
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Progresso Geral",
      value: "68%",
      subtitle: "do curso",
      icon: Target,
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      title: "Nota Média",
      value: "8.7",
      subtitle: "nas avaliações",
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-50"
    }
  ];

  const cursosAtivos = [
    {
      nome: "Matemática",
      progresso: 85,
      proximaAula: "Função Quadrática",
      prazo: "2 dias"
    },
    {
      nome: "Português",
      progresso: 72,
      proximaAula: "Concordância Verbal",
      prazo: "5 dias"
    },
    {
      nome: "História",
      progresso: 45,
      proximaAula: "Segunda Guerra Mundial",
      prazo: "1 semana"
    },
    {
      nome: "Física",
      progresso: 30,
      proximaAula: "Cinemática",
      prazo: "3 dias"
    }
  ];

  const atividades = [
    {
      tipo: "Prova",
      disciplina: "Matemática",
      titulo: "Avaliação de Funções",
      prazo: "Hoje, 23:59",
      status: "pendente"
    },
    {
      tipo: "Exercício",
      disciplina: "Português",
      titulo: "Lista de Concordância",
      prazo: "Amanhã, 18:00",
      status: "pendente"
    },
    {
      tipo: "Trabalho",
      disciplina: "História",
      titulo: "Ensaio sobre a Revolução Industrial",
      prazo: "15/12/2024",
      status: "entregue"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Bem-vindo de volta, João! Vamos continuar seus estudos.</p>
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

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Cursos Ativos */}
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

          {/* Atividades Pendentes */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-accent" />
                Atividades Pendentes
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {atividades.map((atividade, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mr-2 ${
                          atividade.tipo === 'Prova' ? 'bg-red-100 text-red-800' :
                          atividade.tipo === 'Exercício' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {atividade.tipo}
                        </span>
                        <span className="text-sm text-gray-500">{atividade.disciplina}</span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{atividade.titulo}</h3>
                      <p className="text-sm text-gray-600">Prazo: {atividade.prazo}</p>
                    </div>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      atividade.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {atividade.status === 'pendente' ? 'Pendente' : 'Entregue'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors">
              <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600">Continuar Estudando</p>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors">
              <Target className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600">Ver Notas</p>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors">
              <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600">Cronograma</p>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
