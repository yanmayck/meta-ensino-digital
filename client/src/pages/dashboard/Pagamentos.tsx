
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Download, Eye, CheckCircle, Clock, AlertCircle } from "lucide-react";

const Pagamentos = () => {
  const historicoPagamentos = [
    {
      id: 1,
      curso: "Matemática Básica",
      valor: 149.90,
      data: "15/11/2024",
      status: "Pago",
      metodo: "Cartão de Crédito",
      parcela: "1/3",
      vencimento: "15/11/2024"
    },
    {
      id: 2,
      curso: "Português Fundamental",
      valor: 129.90,
      data: "10/11/2024",
      status: "Pago",
      metodo: "PIX",
      parcela: "À vista",
      vencimento: "10/11/2024"
    },
    {
      id: 3,
      curso: "História do Brasil",
      valor: 139.90,
      data: "05/11/2024",
      status: "Pago",
      metodo: "Boleto",
      parcela: "2/2",
      vencimento: "05/11/2024"
    },
    {
      id: 4,
      curso: "Matemática Básica",
      valor: 149.90,
      data: "15/12/2024",
      status: "Pendente",
      metodo: "Cartão de Crédito",
      parcela: "2/3",
      vencimento: "15/12/2024"
    },
    {
      id: 5,
      curso: "Matemática Básica",
      valor: 149.90,
      data: "15/01/2025",
      status: "Agendado",
      metodo: "Cartão de Crédito",
      parcela: "3/3",
      vencimento: "15/01/2025"
    }
  ];

  const resumoFinanceiro = {
    totalPago: 569.60,
    totalPendente: 149.90,
    totalAgendado: 149.90,
    proximoVencimento: "15/12/2024"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pago':
        return 'bg-green-100 text-green-800';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Agendado':
        return 'bg-blue-100 text-blue-800';
      case 'Vencido':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pago':
        return <CheckCircle className="w-4 h-4" />;
      case 'Pendente':
        return <Clock className="w-4 h-4" />;
      case 'Agendado':
        return <Clock className="w-4 h-4" />;
      case 'Vencido':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pagamentos</h1>
          <p className="text-gray-600">Gerencie seus pagamentos e histórico financeiro.</p>
        </div>

        {/* Resumo Financeiro */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Pago</p>
                  <p className="text-2xl font-bold text-gray-900">R$ {resumoFinanceiro.totalPago.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pendente</p>
                  <p className="text-2xl font-bold text-gray-900">R$ {resumoFinanceiro.totalPendente.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Agendado</p>
                  <p className="text-2xl font-bold text-gray-900">R$ {resumoFinanceiro.totalAgendado.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Próximo Vencimento</p>
                  <p className="text-lg font-bold text-gray-900">{resumoFinanceiro.proximoVencimento}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pagamentos Pendentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-yellow-600" />
              Pagamentos Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {historicoPagamentos.filter(p => p.status === 'Pendente').length > 0 ? (
              <div className="space-y-4">
                {historicoPagamentos.filter(p => p.status === 'Pendente').map((pagamento) => (
                  <div key={pagamento.id} className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{pagamento.curso}</h3>
                        <p className="text-sm text-gray-600">Parcela: {pagamento.parcela}</p>
                        <p className="text-sm text-gray-600">Vencimento: {pagamento.vencimento}</p>
                        <p className="text-sm text-gray-600">Método: {pagamento.metodo}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">R$ {pagamento.valor.toFixed(2)}</p>
                        <Button className="mt-2">
                          Pagar Agora
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">Nenhum pagamento pendente.</p>
            )}
          </CardContent>
        </Card>

        {/* Histórico de Pagamentos */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Pagamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {historicoPagamentos.map((pagamento) => (
                <div key={pagamento.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{pagamento.curso}</h3>
                      <p className="text-sm text-gray-600">Parcela: {pagamento.parcela}</p>
                      <p className="text-sm text-gray-600">Data: {pagamento.data}</p>
                      <p className="text-sm text-gray-600">Método: {pagamento.metodo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">R$ {pagamento.valor.toFixed(2)}</p>
                      <div className="flex items-center justify-end mt-2">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(pagamento.status)}`}>
                          {getStatusIcon(pagamento.status)}
                          <span className="ml-1">{pagamento.status}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Detalhes
                    </Button>
                    {pagamento.status === 'Pago' && (
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Comprovante
                      </Button>
                    )}
                    {pagamento.status === 'Pendente' && (
                      <Button size="sm">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pagar
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Métodos de Pagamento */}
        <Card>
          <CardHeader>
            <CardTitle>Métodos de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <CreditCard className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold">Cartão de Crédito</h3>
                <p className="text-sm text-gray-600">Parcelamento em até 12x</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-semibold">PIX</h3>
                <p className="text-sm text-gray-600">À vista com desconto</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <h3 className="font-semibold">Boleto</h3>
                <p className="text-sm text-gray-600">Vencimento em 3 dias</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Pagamentos;
