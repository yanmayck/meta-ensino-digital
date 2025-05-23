
import DashboardLayout from "@/components/layout/DashboardLayout";
import { BookOpen, Play, Clock, CheckCircle, Lock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Cursos = () => {
  const cursos = [
    {
      id: 1,
      nome: "Matemática",
      descricao: "Álgebra, geometria, trigonometria e matemática aplicada",
      progresso: 85,
      totalAulas: 48,
      aulasAssistidas: 41,
      status: "ativo",
      proximaAula: "Função Quadrática - Parte 2",
      cor: "bg-blue-500"
    },
    {
      id: 2,
      nome: "Português",
      descricao: "Gramática, literatura, redação e interpretação de textos",
      progresso: 72,
      totalAulas: 52,
      aulasAssistidas: 37,
      status: "ativo",
      proximaAula: "Concordância Verbal",
      cor: "bg-green-500"
    },
    {
      id: 3,
      nome: "História",
      descricao: "História geral, do Brasil e contemporânea",
      progresso: 45,
      totalAulas: 40,
      aulasAssistidas: 18,
      status: "ativo",
      proximaAula: "Segunda Guerra Mundial",
      cor: "bg-purple-500"
    },
    {
      id: 4,
      nome: "Física",
      descricao: "Mecânica, termologia, óptica e eletricidade",
      progresso: 30,
      totalAulas: 44,
      aulasAssistidas: 13,
      status: "ativo",
      proximaAula: "Cinemática Escalar",
      cor: "bg-orange-500"
    },
    {
      id: 5,
      nome: "Química",
      descricao: "Química geral, orgânica e inorgânica",
      progresso: 0,
      totalAulas: 46,
      aulasAssistidas: 0,
      status: "bloqueado",
      proximaAula: "Estrutura Atômica",
      cor: "bg-red-500"
    },
    {
      id: 6,
      nome: "Biologia",
      descricao: "Citologia, genética, evolução e ecologia",
      progresso: 0,
      totalAulas: 42,
      aulasAssistidas: 0,
      status: "bloqueado",
      proximaAula: "Características dos Seres Vivos",
      cor: "bg-teal-500"
    }
  ];

  const aulasRecentes = [
    {
      curso: "Matemática",
      titulo: "Função Quadrática - Parte 1",
      duracao: "45 min",
      assistida: true,
      data: "Ontem"
    },
    {
      curso: "Português",
      titulo: "Regência Verbal",
      duracao: "38 min",
      assistida: true,
      data: "2 dias atrás"
    },
    {
      curso: "História",
      titulo: "Primeira Guerra Mundial",
      duracao: "42 min",
      assistida: true,
      data: "3 dias atrás"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Cursos</h1>
          <p className="text-gray-600">Acompanhe seu progresso e continue seus estudos</p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumo do Progresso</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">68%</div>
              <div className="text-sm text-gray-600">Progresso Geral</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">109</div>
              <div className="text-sm text-gray-600">Aulas Assistidas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">165</div>
              <div className="text-sm text-gray-600">Horas de Estudo</div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Todos os Cursos</h2>
            {cursos.map((curso) => (
              <div key={curso.id} className="bg-white rounded-lg shadow">
                <div className={`h-2 ${curso.cor} rounded-t-lg`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <BookOpen className="w-6 h-6 text-gray-400 mr-3" />
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{curso.nome}</h3>
                        <p className="text-sm text-gray-600">{curso.descricao}</p>
                      </div>
                    </div>
                    {curso.status === "bloqueado" && (
                      <Lock className="w-5 h-5 text-gray-400" />
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Progresso</span>
                      <span>{curso.aulasAssistidas}/{curso.totalAulas} aulas</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${curso.cor.replace('bg-', 'bg-').replace('-500', '-400')}`}
                        style={{ width: `${curso.progresso}%` }}
                      />
                    </div>
                    <div className="text-right text-sm text-gray-600 mt-1">
                      {curso.progresso}%
                    </div>
                  </div>

                  {curso.status !== "bloqueado" && (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Próxima aula:</p>
                        <p className="font-medium text-gray-900">{curso.proximaAula}</p>
                      </div>
                      <Button>
                        <Play className="w-4 h-4 mr-2" />
                        Continuar
                      </Button>
                    </div>
                  )}

                  {curso.status === "bloqueado" && (
                    <div className="text-center py-4">
                      <p className="text-gray-500 text-sm mb-2">
                        Este curso será liberado conforme seu progresso
                      </p>
                      <Button variant="outline" disabled>
                        Curso Bloqueado
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Aulas Recentes */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Aulas Recentes</h3>
              </div>
              <div className="p-6 space-y-4">
                {aulasRecentes.map((aula, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">{aula.titulo}</p>
                        <span className="text-xs text-gray-500">{aula.data}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">{aula.curso}</span>
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{aula.duracao}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recursos */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recursos</h3>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-sm font-medium">Material de Apoio</span>
                  </div>
                  <span className="text-xs text-gray-500">23 arquivos</span>
                </button>
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-sm font-medium">Cronograma</span>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-sm font-medium">Avaliações</span>
                  </div>
                  <span className="text-xs text-gray-500">4 pendentes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Cursos;
