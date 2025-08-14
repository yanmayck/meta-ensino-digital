
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Termos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow mt-16 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Termos de Uso
            </h1>
            <p className="text-gray-600">
              Última atualização: Janeiro de 2025
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Aceitação dos Termos</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Ao acessar e usar a plataforma Meta Educação, você concorda em cumprir 
                  estes Termos de Uso e todas as leis e regulamentos aplicáveis. Se você 
                  não concordar com algum destes termos, está proibido de usar este site.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Descrição do Serviço</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  A Meta Educação é uma plataforma de ensino online que oferece cursos 
                  de educação para adultos. Nossos serviços incluem:
                </p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Cursos online com certificação</li>
                  <li>Material didático digital</li>
                  <li>Suporte pedagógico</li>
                  <li>Acompanhamento de progresso</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Cadastro e Conta do Usuário</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Para acessar determinados recursos da plataforma, você deve criar uma conta. 
                  Você é responsável por:
                </p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Fornecer informações precisas e atualizadas</li>
                  <li>Manter a confidencialidade de sua senha</li>
                  <li>Notificar-nos sobre uso não autorizado de sua conta</li>
                  <li>Usar a conta apenas para fins legítimos</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Pagamentos e Reembolsos</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Os pagamentos devem ser feitos conforme os métodos disponibilizados na 
                  plataforma. Reembolsos podem ser solicitados dentro de 7 dias corridos 
                  após a compra, desde que o curso não tenha sido iniciado.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Propriedade Intelectual</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Todo o conteúdo da plataforma, incluindo textos, imagens, vídeos e 
                  materiais didáticos, é protegido por direitos autorais e pertence 
                  à Meta Educação ou seus licenciadores.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Limitação de Responsabilidade</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  A Meta Educação não será responsável por danos indiretos, incidentais 
                  ou consequenciais decorrentes do uso da plataforma. Nossa responsabilidade 
                  total não excederá o valor pago pelo usuário.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Modificações dos Termos</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                  As alterações entrarão em vigor imediatamente após a publicação na plataforma.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Contato</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Para dúvidas sobre estes Termos de Uso, entre em contato conosco:
                </p>
                <p className="mt-4">
                  <strong>Email:</strong> juridico@metaeducacao.com.br<br />
                  <strong>Telefone:</strong> (11) 9999-9999
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

export default Termos;
