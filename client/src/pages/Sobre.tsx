
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Users, Target, BookOpen, Award } from "lucide-react";

const Sobre = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow mt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-accent py-20">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sobre a Meta Educação
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Transformando vidas através da educação inclusiva e acessível
            </p>
          </div>
        </section>

        {/* Nossa Missão */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Nossa Missão</h2>
              <p className="text-lg text-gray-600 mb-8">
                Na Meta Educação, acreditamos que a educação é um direito fundamental e que nunca é tarde 
                para concluir os estudos. Nossa missão é proporcionar uma segunda chance educacional para 
                adultos que não puderam concluir o ensino médio na idade tradicional.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Nosso Objetivo</h3>
                  <p className="text-gray-600">
                    Facilitar o acesso ao ensino médio para pessoas com mais de 18 anos através de 
                    uma plataforma digital moderna e eficiente.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <BookOpen className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Nossa Metodologia</h3>
                  <p className="text-gray-600">
                    Ensino 100% online com flexibilidade de horários, materiais didáticos 
                    atualizados e suporte pedagógico personalizado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Nossos Valores</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Inclusão</h3>
                <p className="text-gray-600">
                  Acreditamos que todos merecem uma oportunidade de crescer e se desenvolver, 
                  independentemente da idade ou circunstâncias passadas.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Excelência</h3>
                <p className="text-gray-600">
                  Oferecemos ensino de qualidade com metodologias comprovadas e 
                  acompanhamento pedagógico especializado.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Flexibilidade</h3>
                <p className="text-gray-600">
                  Respeitamos o ritmo e as necessidades de cada aluno, oferecendo 
                  horários flexíveis e suporte personalizado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Equipe */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Nossa Equipe</h2>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-gray-600 mb-8">
                Nossa equipe é formada por educadores experientes, especialistas em educação a distância 
                e profissionais de tecnologia comprometidos em oferecer a melhor experiência educacional.
              </p>
              <div className="bg-primary/10 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">Compromisso com a Qualidade</h3>
                <p className="text-gray-600">
                  Todos os nossos professores são licenciados e possuem experiência em educação de jovens 
                  e adultos. Nossa equipe pedagógica desenvolve constantemente novos materiais e 
                  metodologias para garantir o melhor aprendizado.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Sobre;
