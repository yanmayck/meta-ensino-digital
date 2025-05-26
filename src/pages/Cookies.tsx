
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cookie, Settings, Shield, BarChart } from "lucide-react";

const Cookies = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow mt-16 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <Cookie className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Política de Cookies
            </h1>
            <p className="text-gray-600">
              Última atualização: Janeiro de 2025
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>O que são Cookies?</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Cookies são pequenos arquivos de texto que são armazenados em seu 
                  dispositivo quando você visita um site. Eles nos ajudam a melhorar 
                  sua experiência, lembrar suas preferências e fornecer conteúdo personalizado.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Cookies Essenciais
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Estes cookies são necessários para o funcionamento básico do site e 
                  não podem ser desabilitados:
                </p>
                <ul className="list-disc pl-6 mt-4">
                  <li><strong>Autenticação:</strong> Mantêm você logado durante sua sessão</li>
                  <li><strong>Segurança:</strong> Protegem contra ataques maliciosos</li>
                  <li><strong>Funcionalidade:</strong> Lembram suas preferências de idioma e região</li>
                  <li><strong>Carrinho:</strong> Mantêm os itens em seu carrinho de compras</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Cookies de Análise
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Estes cookies nos ajudam a entender como você usa nosso site para 
                  melhorarmos nossos serviços:
                </p>
                <ul className="list-disc pl-6 mt-4">
                  <li><strong>Google Analytics:</strong> Coleta dados sobre uso do site</li>
                  <li><strong>Hotjar:</strong> Analisa comportamento dos usuários</li>
                  <li><strong>Progresso do curso:</strong> Acompanha seu avanço nos estudos</li>
                  <li><strong>Performance:</strong> Monitora velocidade e erros do site</li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  Você pode desabilitar estes cookies sem afetar a funcionalidade básica do site.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Cookies de Funcionalidade
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Estes cookies permitem que lembremos suas escolhas e personalizemos 
                  sua experiência:
                </p>
                <ul className="list-disc pl-6 mt-4">
                  <li><strong>Preferências:</strong> Lembram configurações de exibição</li>
                  <li><strong>Formulários:</strong> Salvam dados inseridos em formulários</li>
                  <li><strong>Chat:</strong> Mantêm histórico de conversas de suporte</li>
                  <li><strong>Tema:</strong> Lembram se você prefere modo claro ou escuro</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cookies de Terceiros</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Alguns cookies são definidos por serviços de terceiros que aparecem 
                  em nossas páginas:
                </p>
                <ul className="list-disc pl-6 mt-4">
                  <li><strong>YouTube:</strong> Para vídeos incorporados</li>
                  <li><strong>Vimeo:</strong> Para conteúdo de vídeo</li>
                  <li><strong>PayPal/PagSeguro:</strong> Para processamento de pagamentos</li>
                  <li><strong>Zendesk:</strong> Para sistema de suporte</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Como Controlar Cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Você pode controlar e gerenciar cookies de várias maneiras:
                </p>
                <h4 className="font-semibold mt-4">Configurações do Navegador:</h4>
                <ul className="list-disc pl-6">
                  <li>Chrome: Configurações → Privacidade e segurança → Cookies</li>
                  <li>Firefox: Preferências → Privacidade e segurança</li>
                  <li>Safari: Preferências → Privacidade</li>
                  <li>Edge: Configurações → Cookies e permissões de site</li>
                </ul>
                <h4 className="font-semibold mt-4">Ferramentas de Opt-out:</h4>
                <ul className="list-disc pl-6">
                  <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline">Opt-out do Google Analytics</a></li>
                  <li>Configurações de anúncios: <a href="https://www.google.com/settings/ads" className="text-primary hover:underline">Preferências de anúncios do Google</a></li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurar Preferências de Cookies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Você pode ajustar suas preferências de cookies a qualquer momento:
                </p>
                <Button className="w-full sm:w-auto">
                  Gerenciar Preferências de Cookies
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Atualizações desta Política</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Podemos atualizar esta Política de Cookies periodicamente. Quando isso 
                  acontecer, revisaremos a data de "última atualização" no topo desta página. 
                  Recomendamos que você revise esta política regularmente.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contato</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Se você tiver dúvidas sobre nossa Política de Cookies:
                </p>
                <p className="mt-4">
                  <strong>Email:</strong> privacidade@metaeducacao.com.br<br />
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

export default Cookies;
