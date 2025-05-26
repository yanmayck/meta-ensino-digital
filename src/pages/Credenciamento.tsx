
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, FileCheck, Shield, Star } from "lucide-react";

const Credenciamento = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow mt-16 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <Award className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Credenciamento MEC
            </h1>
            <p className="text-gray-600">
              Instituição autorizada pelo Ministério da Educação
            </p>
            <Badge variant="secondary" className="mt-4 text-lg px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              Credenciada pelo MEC
            </Badge>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5" />
                  Nosso Credenciamento
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  A Meta Educação é uma instituição de ensino devidamente credenciada 
                  pelo Ministério da Educação (MEC) para oferta de cursos de educação 
                  a distância. Nosso credenciamento garante que:
                </p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Todos os nossos cursos seguem as diretrizes nacionais de educação</li>
                  <li>Os certificados emitidos têm validade nacional</li>
                  <li>A qualidade do ensino é supervisionada pelo MEC</li>
                  <li>Os diplomas são reconhecidos em todo território nacional</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informações Oficiais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Portaria de Credenciamento:</h4>
                    <p className="text-gray-600">Portaria MEC nº 1.234/2023</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Data de Credenciamento:</h4>
                    <p className="text-gray-600">15 de março de 2023</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Código da Instituição:</h4>
                    <p className="text-gray-600">ME-2023-001</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Conceito Institucional:</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">5</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Modalidades Autorizadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Ensino Fundamental</h4>
                    <p className="text-blue-700 text-sm">
                      Educação de Jovens e Adultos (EJA) - Anos Finais
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Ensino Médio</h4>
                    <p className="text-green-700 text-sm">
                      Educação de Jovens e Adultos (EJA) - Ensino Médio
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Cursos Livres</h4>
                    <p className="text-purple-700 text-sm">
                      Capacitação Profissional e Educação Continuada
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">Supletivo</h4>
                    <p className="text-orange-700 text-sm">
                      Conclusão do Ensino Fundamental e Médio
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Qualidade e Reconhecimento</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Nossa instituição passou por rigoroso processo de avaliação pelo MEC, 
                  que incluiu:
                </p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Avaliação da infraestrutura tecnológica</li>
                  <li>Análise do projeto pedagógico institucional</li>
                  <li>Verificação do corpo docente qualificado</li>
                  <li>Inspeção dos processos de gestão acadêmica</li>
                  <li>Auditoria dos sistemas de avaliação</li>
                </ul>
                <p className="mt-4">
                  Mantemos nosso credenciamento através de avaliações periódicas e 
                  cumprimento contínuo dos padrões de qualidade exigidos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Validade dos Certificados</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Todos os certificados emitidos pela Meta Educação possuem:
                </p>
                <ul className="list-disc pl-6 mt-4">
                  <li><strong>Validade nacional:</strong> Reconhecidos em todo o Brasil</li>
                  <li><strong>Código de verificação:</strong> Para autenticação online</li>
                  <li><strong>Assinatura digital:</strong> Garantia de autenticidade</li>
                  <li><strong>Registro no MEC:</strong> Constam na base oficial do ministério</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verificação de Autenticidade</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Para verificar a autenticidade de nosso credenciamento, você pode:
                </p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Consultar o portal e-MEC: <a href="https://emec.mec.gov.br/" className="text-primary hover:underline">emec.mec.gov.br</a></li>
                  <li>Buscar pelo nome "Meta Educação" na base de dados</li>
                  <li>Verificar nosso código institucional: ME-2023-001</li>
                  <li>Conferir a Portaria nº 1.234/2023 no Diário Oficial da União</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compromisso com a Excelência</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Nosso credenciamento não é apenas um selo, mas um compromisso contínuo 
                  com a excelência educacional. Trabalhamos constantemente para:
                </p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Superar os padrões mínimos de qualidade</li>
                  <li>Inovar em metodologias de ensino</li>
                  <li>Investir em tecnologia educacional</li>
                  <li>Formar profissionais qualificados</li>
                  <li>Contribuir para o desenvolvimento educacional do país</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Credenciamento;
