
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs = [
    {
      categoria: "Matrícula e Documentação",
      perguntas: [
        {
          pergunta: "Quais documentos preciso para me matricular?",
          resposta: "Você precisa enviar: RG, CPF, comprovante de residência, histórico escolar do ensino fundamental (ou declaração de conclusão) e certidão de nascimento ou casamento. Todos os documentos podem ser enviados digitalmente através da nossa plataforma."
        },
        {
          pergunta: "Quanto tempo demora para a análise dos documentos?",
          resposta: "A análise dos documentos é feita em até 48 horas úteis. Você receberá um e-mail confirmando a aprovação da matrícula e poderá acessar imediatamente o ambiente virtual de aprendizagem."
        },
        {
          pergunta: "Posso me matricular a qualquer momento do ano?",
          resposta: "Sim! Oferecemos matrículas durante todo o ano. Nosso sistema é flexível e permite que você comece seus estudos assim que sua matrícula for aprovada."
        }
      ]
    },
    {
      categoria: "Cursos e Metodologia",
      perguntas: [
        {
          pergunta: "O certificado é válido em todo o Brasil?",
          resposta: "Sim, nosso certificado de conclusão do ensino médio é válido em todo território nacional e é reconhecido pelo MEC. Você pode usar para continuar os estudos ou para concursos públicos."
        },
        {
          pergunta: "Quanto tempo leva para concluir o ensino médio?",
          resposta: "O tempo varia de acordo com seu ritmo de estudos. Em média, nossos alunos concluem entre 12 a 18 meses. Você pode estudar no seu próprio ritmo, acelerando ou diminuindo conforme sua disponibilidade."
        },
        {
          pergunta: "Como funcionam as aulas?",
          resposta: "As aulas são 100% online através de videoaulas, material didático digital, exercícios interativos e suporte de professores. Você acessa quando quiser, quantas vezes precisar, de qualquer dispositivo conectado à internet."
        },
        {
          pergunta: "Preciso fazer provas presenciais?",
          resposta: "Algumas avaliações podem ser presenciais conforme exigência legal, mas a maioria das atividades são online. Quando necessário, temos pontos de aplicação em várias cidades para sua comodidade."
        }
      ]
    },
    {
      categoria: "Suporte e Acompanhamento",
      perguntas: [
        {
          pergunta: "Como funciona o suporte pedagógico?",
          resposta: "Temos professores e tutores disponíveis para tirar dúvidas através de chat, e-mail e plantões online. Você também conta com fóruns de discussão e materiais complementares para reforçar o aprendizado."
        },
        {
          pergunta: "E se eu tiver dificuldades com a tecnologia?",
          resposta: "Oferecemos suporte técnico completo e nossa plataforma é muito intuitiva. Temos tutoriais em vídeo, manual do usuário e equipe de suporte disponível para ajudar com qualquer dificuldade técnica."
        },
        {
          pergunta: "Posso estudar pelo celular?",
          resposta: "Sim! Nossa plataforma é totalmente responsiva e funciona perfeitamente em celulares, tablets e computadores. Você pode estudar onde e quando quiser."
        }
      ]
    },
    {
      categoria: "Pagamentos e Valores",
      perguntas: [
        {
          pergunta: "Qual o valor do curso?",
          resposta: "Nossos valores são muito acessíveis e oferecemos várias formas de pagamento. Entre em contato conosco para conhecer as condições especiais e planos de parcelamento disponíveis."
        },
        {
          pergunta: "Posso parcelar o pagamento?",
          resposta: "Sim! Oferecemos parcelamento em até 12x no cartão de crédito e também aceitamos pagamento via boleto bancário. Temos condições especiais para diferentes situações financeiras."
        },
        {
          pergunta: "Existe algum desconto disponível?",
          resposta: "Sim, oferecemos descontos para pagamento à vista, estudantes de baixa renda e em promoções especiais. Consulte nossa equipe comercial para verificar os descontos disponíveis."
        }
      ]
    },
    {
      categoria: "Requisitos Técnicos",
      perguntas: [
        {
          pergunta: "Que tipo de internet preciso?",
          resposta: "Recomendamos uma conexão de pelo menos 2 Mbps para uma experiência ideal. A plataforma funciona com conexões mais lentas, mas pode haver limitações na reprodução de vídeos em alta qualidade."
        },
        {
          pergunta: "Preciso de algum software especial?",
          resposta: "Não! Você só precisa de um navegador atualizado (Chrome, Firefox, Safari ou Edge). Todos os materiais e atividades funcionam diretamente no navegador, sem necessidade de downloads."
        }
      ]
    }
  ];

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow mt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-accent py-20">
          <div className="container mx-auto px-4 text-center text-white">
            <HelpCircle className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Perguntas Frequentes
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Encontre respostas para as principais dúvidas sobre nossos cursos
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {faqs.map((categoria, categoriaIndex) => (
                <div key={categoriaIndex} className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-primary border-b-2 border-primary/20 pb-2">
                    {categoria.categoria}
                  </h2>
                  <div className="space-y-4">
                    {categoria.perguntas.map((faq, faqIndex) => {
                      const globalIndex = categoriaIndex * 100 + faqIndex;
                      const isExpanded = expandedIndex === globalIndex;
                      
                      return (
                        <div key={faqIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
                          <button
                            onClick={() => toggleExpanded(globalIndex)}
                            className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                          >
                            <h3 className="font-semibold text-lg pr-4">{faq.pergunta}</h3>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                            )}
                          </button>
                          {isExpanded && (
                            <div className="px-6 pb-6">
                              <div className="border-t border-gray-200 pt-4">
                                <p className="text-gray-700 leading-relaxed">{faq.resposta}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Não encontrou sua resposta?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Nossa equipe está pronta para esclarecer todas suas dúvidas. 
                Entre em contato conosco!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Falar no WhatsApp
                </button>
                <button className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                  Enviar E-mail
                </button>
              </div>
              <div className="mt-8 p-6 bg-white rounded-lg shadow">
                <h3 className="font-semibold mb-3">Horário de Atendimento</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Segunda a Sexta: 8h às 18h</p>
                  <p>Sábado: 8h às 12h</p>
                  <p>WhatsApp: 24h para mensagens</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
