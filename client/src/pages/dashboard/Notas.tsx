
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, TrendingUp, Award } from "lucide-react";

const Notas = () => {
  const avaliacoes = [
    {
      id: 1,
      disciplina: "Matemática Básica",
      tipo: "Prova",
      titulo: "Avaliação de Funções",
      data: "15/12/2024",
      nota: 8.5,
      notaMaxima: 10,
      status: "Corrigida",
      feedback: "Excelente desempenho nas questões de função quadrática."
    },
    {
      id: 2,
      disciplina: "Português Fundamental",
      tipo: "Trabalho",
      titulo: "Análise Textual",
      data: "12/12/2024",
      nota: 7.8,
      notaMaxima: 10,
      status: "Corrigida",
      feedback: "Boa interpretação, mas pode melhorar a estrutura argumentativa."
    },
    {
      id: 3,
      disciplina: "História do Brasil",
      tipo: "Exercício",
      titulo: "Lista de Exercícios - República",
      data: "10/12/2024",
      nota: 9.0,
      notaMaxima: 10,
      status: "Corrigida",
      feedback: "Demonstrou conhecimento sólido sobre o período republicano."
    },
    {
      id: 4,
      disciplina: "Física Básica",
      tipo: "Prova",
      titulo: "Avaliação Final",
      data: "08/12/2024",
      nota: 8.2,
      notaMaxima: 10,
      status: "Corrigida",
      feedback: "Curso concluído com sucesso. Parabéns!"
    },
    {
      id: 5,
      disciplina: "Matemática Básica",
      tipo: "Exercício",
      titulo: "Exercícios de Álgebra",
      data: "20/12/2024",
      nota: null,
      notaMaxima: 10,
      status: "Pendente",
      feedback: null
    }
  ];

  const estatisticas = [
    {
      disciplina: "Matemática Básica",
      mediaAtual: 8.5,
      totalAvaliacoes: 5,
      melhorNota: 9.2,
      piorNota: 7.8
    },
    {
      disciplina: "Português Fundamental",
      mediaAtual: 8.1,
      totalAvaliacoes: 4,
      melhorNota: 8.9,
      piorNota: 7.2
    },
    {
      disciplina: "História do Brasil",
      mediaAtual: 8.7,
      totalAvaliacoes: 3,
      melhorNota: 9.0,
      piorNota: 8.2
    },
    {
      disciplina: "Física Básica",
      mediaAtual: 8.2,
      totalAvaliacoes: 6,
      melhorNota: 9.1,
      piorNota: 7.5
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Corrigida':
        return 'bg-green-100 text-green-800';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Em correção':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getNotaColor = (nota: number) => {
    if (nota >= 9) return 'text-green-600';
    if (nota >= 7) return 'text-blue-600';
    if (nota >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notas e Avaliações</h1>
          <p className="text-gray-600">Acompanhe seu desempenho acadêmico e histórico de notas.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Média Geral</p>
                  <p className="text-2xl font-bold text-gray-900">8.4</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Melhor Nota</p>
                  <p className="text-2xl font-bold text-gray-900">9.2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avaliações</p>
                  <p className="text-2xl font-bold text-gray-900">18</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Aprovação</p>
                  <p className="text-2xl font-bold text-gray-900">100%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Estatísticas por Disciplina */}
        <Card>
          <CardHeader>
            <CardTitle>Desempenho por Disciplina</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {estatisticas.map((stat, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{stat.disciplina}</h3>
                    <span className={`text-2xl font-bold ${getNotaColor(stat.mediaAtual)}`}>
                      {stat.mediaAtual.toFixed(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <p>Avaliações: {stat.totalAvaliacoes}</p>
                    </div>
                    <div>
                      <p>Melhor: {stat.melhorNota.toFixed(1)}</p>
                    </div>
                    <div>
                      <p>Menor: {stat.piorNota.toFixed(1)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lista de Avaliações */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Avaliações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {avaliacoes.map((avaliacao) => (
                <div key={avaliacao.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{avaliacao.titulo}</h3>
                      <p className="text-sm text-gray-600">{avaliacao.disciplina}</p>
                      <div className="flex items-center mt-1">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mr-2 ${
                          avaliacao.tipo === 'Prova' ? 'bg-red-100 text-red-800' :
                          avaliacao.tipo === 'Trabalho' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {avaliacao.tipo}
                        </span>
                        <span className="text-sm text-gray-500">{avaliacao.data}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      {avaliacao.nota !== null ? (
                        <div className="flex items-center">
                          <span className={`text-2xl font-bold mr-2 ${getNotaColor(avaliacao.nota)}`}>
                            {avaliacao.nota.toFixed(1)}
                          </span>
                          <span className="text-gray-500">/{avaliacao.notaMaxima}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">Pendente</span>
                      )}
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${getStatusColor(avaliacao.status)}`}>
                        {avaliacao.status}
                      </span>
                    </div>
                  </div>

                  {avaliacao.feedback && (
                    <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-3">
                      <p className="text-sm text-blue-800">
                        <strong>Feedback:</strong> {avaliacao.feedback}
                      </p>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar
                    </Button>
                    {avaliacao.status === 'Corrigida' && (
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
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

export default Notas;
