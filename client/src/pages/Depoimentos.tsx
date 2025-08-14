
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Star, Quote } from "lucide-react";

const Depoimentos = () => {
  const depoimentos = [
    {
      nome: "Maria Silva",
      idade: 35,
      profissao: "Auxiliar Administrativa",
      foto: "/placeholder.svg",
      avaliacao: 5,
      texto: "Sempre sonhei em voltar a estudar, mas com trabalho e família parecia impossível. A Meta Educação me deu essa oportunidade! Os professores são incríveis e o material é muito bem explicado. Consegui concluir o ensino médio e agora estou fazendo faculdade!",
      data: "Concluído em 2023"
    },
    {
      nome: "João Santos",
      idade: 42,
      profissao: "Mecânico",
      foto: "/placeholder.svg",
      avaliacao: 5,
      texto: "Parei de estudar muito cedo para trabalhar e sustentar a família. Com 42 anos, achei que era tarde demais, mas a Meta me mostrou que nunca é tarde! O ambiente virtual é fácil de usar e posso estudar depois do trabalho. Recomendo para todos!",
      data: "Concluído em 2023"
    },
    {
      nome: "Ana Costa",
      idade: 28,
      profissao: "Vendedora",
      foto: "/placeholder.svg",
      avaliacao: 5,
      texto: "Engravidei na adolescência e tive que parar os estudos. Agora, com minha filha já maior, pude retomar. A flexibilidade de horários foi fundamental para conseguir conciliar tudo. Os professores sempre me apoiaram e agora tenho meu diploma!",
      data: "Concluído em 2024"
    },
    {
      nome: "Carlos Oliveira",
      idade: 50,
      profissao: "Porteiro",
      foto: "/placeholder.svg",
      avaliacao: 5,
      texto: "Aos 50 anos, pensei que seria muito difícil voltar a estudar. Mas a plataforma é muito intuitiva e os professores têm muita paciência. Consegui me formar e agora posso ajudar meus filhos com os estudos deles também!",
      data: "Concluído em 2023"
    },
    {
      nome: "Fernanda Lima",
      idade: 31,
      profissao: "Cabeleireira",
      foto: "/placeholder.svg",
      avaliacao: 5,
      texto: "Trabalho muito e tenho horários irregulares. A Meta foi perfeita porque posso estudar de madrugada, nos finais de semana, quando tenho tempo livre. O suporte é excelente e os materiais são muito didáticos. Super recomendo!",
      data: "Concluído em 2024"
    },
    {
      nome: "Roberto Ferreira",
      idade: 45,
      profissao: "Motorista",
      foto: "/placeholder.svg",
      avaliacao: 5,
      texto: "Sempre quis ter um diploma, mas nunca encontrava tempo. Com a Meta, pude estudar até mesmo durante as paradas na estrada, pelo celular. É uma oportunidade única para quem não pode frequentar uma escola tradicional.",
      data: "Concluído em 2023"
    }
  ];

  const renderStars = (avaliacao: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < avaliacao ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow mt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-accent py-20">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Histórias de Sucesso
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Conheça quem transformou sua vida com a Meta Educação
            </p>
          </div>
        </section>

        {/* Estatísticas */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-8">Nossos Números</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-4xl font-bold text-primary mb-2">1,200+</div>
                  <div className="text-gray-600">Alunos Formados</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-4xl font-bold text-accent mb-2">98%</div>
                  <div className="text-gray-600">Taxa de Satisfação</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-4xl font-bold text-green-500 mb-2">4.9</div>
                  <div className="text-gray-600">Avaliação Média</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Depoimentos dos Nossos Alunos</h2>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {depoimentos.map((depoimento, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 relative">
                    <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
                    <div className="flex items-center mb-4">
                      <img
                        src={depoimento.foto}
                        alt={depoimento.nome}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{depoimento.nome}</h3>
                        <p className="text-gray-600 text-sm">{depoimento.idade} anos • {depoimento.profissao}</p>
                        <div className="flex mt-1">
                          {renderStars(depoimento.avaliacao)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                      "{depoimento.texto}"
                    </p>
                    <div className="text-xs text-gray-500 font-medium">
                      {depoimento.data}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Seção */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Sua História de Sucesso Começa Aqui</h2>
              <p className="text-xl text-gray-600 mb-8">
                Junte-se a centenas de pessoas que já transformaram suas vidas através da educação. 
                O próximo depoimento pode ser o seu!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Começar Agora
                </button>
                <button className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                  Falar com Consultor
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Depoimentos;
