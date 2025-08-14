
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle, Clock, BookOpen, FileText, GraduationCap, Users } from "lucide-react";

const ComoFunciona = () => {
  const passos = [
    {
      numero: "01",
      titulo: "Cadastro e Documentação",
      descricao: "Crie sua conta e envie os documentos necessários para análise",
      icone: FileText,
      detalhes: [
        "Cadastro simples e rápido",
        "Upload seguro de documentos",
        "Análise em até 48 horas"
      ]
    },
    {
      numero: "02",
      titulo: "Matrícula Aprovada",
      descricao: "Após aprovação dos documentos, sua matrícula é confirmada",
      icone: CheckCircle,
      detalhes: [
        "Confirmação por email",
        "Acesso ao ambiente virtual",
        "Orientação inicial"
      ]
    },
    {
      numero: "03",
      titulo: "Início dos Estudos",
      descricao: "Acesse o ambiente virtual e comece a estudar no seu ritmo",
      icone: BookOpen,
      detalhes: [
        "Plataforma intuitiva",
        "Cronograma flexível",
        "Suporte pedagógico"
      ]
    },
    {
      numero: "04",
      titulo: "Acompanhamento",
      descricao: "Professores e tutores acompanham seu progresso",
      icone: Users,
      detalhes: [
        "Feedback constante",
        "Plantões de dúvidas",
        "Relatórios de progresso"
      ]
    },
    {
      numero: "05",
      titulo: "Avaliações",
      descricao: "Realize avaliações online e presenciais conforme necessário",
      icone: Clock,
      detalhes: [
        "Provas online",
        "Avaliações presenciais",
        "Recuperação disponível"
      ]
    },
    {
      numero: "06",
      titulo: "Conclusão",
      descricao: "Receba seu certificado de conclusão do ensino médio",
      icone: GraduationCap,
      detalhes: [
        "Certificado válido em todo Brasil",
        "Cerimônia de formatura",
        "Suporte pós-conclusão"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow mt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-accent py-20">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Como Funciona
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Descubra como é simples concluir seu ensino médio conosco
            </p>
          </div>
        </section>

        {/* Processo */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Processo Passo a Passo</h2>
            <div className="max-w-6xl mx-auto">
              {passos.map((passo, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center mb-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2 mb-8 md:mb-0">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                          {passo.numero}
                        </div>
                        <passo.icone className="w-8 h-8 text-accent" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{passo.titulo}</h3>
                      <p className="text-gray-600 mb-4">{passo.descricao}</p>
                      <ul className="space-y-2">
                        {passo.detalhes.map((detalhe, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            {detalhe}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-center">
                    <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                      <passo.icone className="w-32 h-32 text-primary" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Metodologia */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Nossa Metodologia</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-4">Ensino Flexível</h3>
                  <p className="text-gray-600">
                    Estude no seu ritmo, com horários flexíveis que se adaptam à sua rotina. 
                    Acesse o conteúdo 24 horas por dia, 7 dias por semana.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-4">Suporte Personalizado</h3>
                  <p className="text-gray-600">
                    Conte com o apoio de professores e tutores especializados em educação 
                    de jovens e adultos, sempre prontos para ajudar.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-4">Material Atualizado</h3>
                  <p className="text-gray-600">
                    Nossos materiais didáticos são constantemente atualizados e seguem 
                    as diretrizes do Ministério da Educação.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-4">Certificação Válida</h3>
                  <p className="text-gray-600">
                    Receba um certificado válido em todo o território nacional, 
                    reconhecido pelo MEC para continuidade dos estudos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Pronto para Começar?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Não perca mais tempo! Inicie sua jornada educacional conosco e transforme seu futuro.
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              Fazer Matrícula Agora
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ComoFunciona;
