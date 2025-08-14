
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Users } from "lucide-react";

const Privacidade = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow mt-16 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <Shield className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Política de Privacidade
            </h1>
            <p className="text-gray-600">
              Última atualização: Janeiro de 2025
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  1. Informações que Coletamos
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>Coletamos as seguintes informações:</p>
                <h4 className="font-semibold mt-4">Informações Pessoais:</h4>
                <ul className="list-disc pl-6">
                  <li>Nome completo</li>
                  <li>Endereço de email</li>
                  <li>CPF</li>
                  <li>Data de nascimento</li>
                  <li>Endereço</li>
                  <li>Telefone</li>
                </ul>
                <h4 className="font-semibold mt-4">Informações de Uso:</h4>
                <ul className="list-disc pl-6">
                  <li>Progresso nos cursos</li>
                  <li>Tempo de estudo</li>
                  <li>Resultados de avaliações</li>
                  <li>Interações na plataforma</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  2. Como Usamos suas Informações
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>Utilizamos suas informações para:</p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Fornecer e melhorar nossos serviços educacionais</li>
                  <li>Personalizar sua experiência de aprendizado</li>
                  <li>Processar pagamentos e emitir certificados</li>
                  <li>Comunicar sobre cursos e atualizações</li>
                  <li>Cumprir obrigações legais e regulamentares</li>
                  <li>Prevenir fraudes e garantir segurança</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  3. Compartilhamento de Informações
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Não vendemos suas informações pessoais. Podemos compartilhar dados apenas:
                </p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Com prestadores de serviços essenciais (processamento de pagamento, hospedagem)</li>
                  <li>Quando exigido por lei ou autoridades competentes</li>
                  <li>Para proteger nossos direitos legais</li>
                  <li>Com seu consentimento explícito</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Proteção de Dados</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Implementamos medidas de segurança técnicas e organizacionais para 
                  proteger suas informações:
                </p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Criptografia de dados sensíveis</li>
                  <li>Acesso restrito a informações pessoais</li>
                  <li>Monitoramento de segurança contínuo</li>
                  <li>Backups seguros e regulares</li>
                  <li>Treinamento da equipe em proteção de dados</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Seus Direitos (LGPD)</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>De acordo com a LGPD, você tem direito a:</p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Confirmação da existência de tratamento</li>
                  <li>Acesso aos dados</li>
                  <li>Correção de dados incompletos, inexatos ou desatualizados</li>
                  <li>Anonimização, bloqueio ou eliminação</li>
                  <li>Portabilidade dos dados</li>
                  <li>Eliminação dos dados tratados com consentimento</li>
                  <li>Revogação do consentimento</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Cookies e Tecnologias Similares</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Utilizamos cookies para melhorar sua experiência. Consulte nossa 
                  Política de Cookies para mais detalhes sobre os tipos de cookies 
                  que usamos e como controlá-los.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Retenção de Dados</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Mantemos suas informações pelo tempo necessário para cumprir as 
                  finalidades descritas nesta política, exceto quando a lei exigir 
                  um período de retenção mais longo.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Contato do Encarregado de Dados</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Para exercer seus direitos ou esclarecer dúvidas sobre esta política:
                </p>
                <p className="mt-4">
                  <strong>Email:</strong> privacidade@metaeducacao.com.br<br />
                  <strong>Telefone:</strong> (11) 9999-9999<br />
                  <strong>Endereço:</strong> Av. Paulista, 1000 - Bela Vista, São Paulo - SP
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacidade;
