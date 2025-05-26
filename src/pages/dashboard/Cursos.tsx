import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Trophy, Play, FileText, Users, Star } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SkeletonCard, SkeletonStats } from "@/components/ui/skeleton-card";

const Cursos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCourseId, setLoadingCourseId] = useState<number | null>(null);
  const { toast } = useToast();

  const cursosMatriculados = [
    {
      id: 1,
      nome: "Matemática Básica",
      descricao: "Fundamentos de matemática para adultos",
      progresso: 85,
      totalAulas: 20,
      aulasAssistidas: 17,
      proximaAula: "Função Quadrática",
      status: "Em andamento",
      professor: "Prof. Maria Silva",
      nota: 8.5
    },
    {
      id: 2,
      nome: "Português Fundamental",
      descricao: "Gramática e interpretação de texto",
      progresso: 72,
      totalAulas: 24,
      aulasAssistidas: 18,
      proximaAula: "Concordância Verbal",
      status: "Em andamento",
      professor: "Prof. João Santos",
      nota: 7.8
    },
    {
      id: 3,
      nome: "História do Brasil",
      descricao: "Do descobrimento aos dias atuais",
      progresso: 45,
      totalAulas: 16,
      aulasAssistidas: 7,
      proximaAula: "Segunda Guerra Mundial",
      status: "Em andamento",
      professor: "Prof. Ana Costa",
      nota: 9.0
    },
    {
      id: 4,
      nome: "Física Básica",
      descricao: "Conceitos fundamentais de física",
      progresso: 100,
      totalAulas: 18,
      aulasAssistidas: 18,
      proximaAula: "Curso concluído",
      status: "Concluído",
      professor: "Prof. Carlos Lima",
      nota: 8.2
    }
  ];

  const cursosDisponiveis = [
    {
      id: 5,
      nome: "Química Geral",
      descricao: "Introdução aos conceitos químicos",
      duracao: "20 aulas",
      professor: "Prof. Laura Mendes",
      preco: "R$ 149,90"
    },
    {
      id: 6,
      nome: "Geografia do Brasil",
      descricao: "Aspectos físicos e humanos do território brasileiro",
      duracao: "16 aulas",
      professor: "Prof. Roberto Alves",
      preco: "R$ 129,90"
    }
  ];

  const handleContinueCourse = (courseId: number) => {
    setLoadingCourseId(courseId);
    setTimeout(() => {
      setLoadingCourseId(null);
      toast({
        title: "Aula carregada!",
        description: "Redirecionando para a próxima aula...",
      });
    }, 2000);
  };

  const handleEnrollCourse = (courseId: number) => {
    setLoadingCourseId(courseId);
    setTimeout(() => {
      setLoadingCourseId(null);
      toast({
        title: "Matrícula realizada!",
        description: "Bem-vindo ao seu novo curso!",
      });
    }, 2000);
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
          </div>
          <SkeletonStats />
          <SkeletonCard />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Cursos</h1>
          <p className="text-gray-600">Acompanhe seu progresso e continue seus estudos.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Cursos Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Trophy className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Concluídos</p>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Horas Estudadas</p>
                  <p className="text-2xl font-bold text-gray-900">127</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Nota Média</p>
                  <p className="text-2xl font-bold text-gray-900">8.4</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cursos Matriculados */}
        <Card>
          <CardHeader>
            <CardTitle>Cursos Matriculados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {cursosMatriculados.map((curso) => (
                <div key={curso.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{curso.nome}</h3>
                      <p className="text-gray-600 text-sm mb-3">{curso.descricao}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {curso.professor}
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                          {curso.nota}
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      curso.status === 'Concluído' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {curso.status}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progresso: {curso.aulasAssistidas}/{curso.totalAulas} aulas</span>
                      <span className="font-medium">{curso.progresso}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-300" 
                        style={{ width: `${curso.progresso}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm space-y-1">
                      <p className="text-gray-600">
                        <strong>Próxima:</strong> {curso.proximaAula}
                      </p>
                      <p className="text-gray-600">
                        <strong>Nota atual:</strong> {curso.nota}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {curso.status !== 'Concluído' && (
                        <Button 
                          size="sm"
                          onClick={() => handleContinueCourse(curso.id)}
                          disabled={loadingCourseId === curso.id}
                        >
                          {loadingCourseId === curso.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          ) : (
                            <Play className="w-4 h-4 mr-2" />
                          )}
                          {loadingCourseId === curso.id ? 'Carregando...' : 'Continuar'}
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cursos Disponíveis */}
        <Card>
          <CardHeader>
            <CardTitle>Cursos Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {cursosDisponiveis.map((curso) => (
                <div key={curso.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{curso.nome}</h3>
                  <p className="text-gray-600 text-sm mb-4">{curso.descricao}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {curso.duracao}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {curso.professor}
                    </div>
                    <div className="flex items-center">
                      {getRatingStars(4.5)}
                      <span className="ml-2">4.5 (120 avaliações)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{curso.preco}</span>
                    <Button
                      onClick={() => handleEnrollCourse(curso.id)}
                      disabled={loadingCourseId === curso.id}
                      className="min-w-[120px]"
                    >
                      {loadingCourseId === curso.id ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processando...
                        </>
                      ) : (
                        'Matricular-se'
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Cursos;
