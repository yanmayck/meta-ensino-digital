
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BookOpen, Clock, Award, CheckCircle } from "lucide-react";

const Curriculo = () => {
  const materias = [
    {
      area: "Linguagens e suas Tecnologias",
      disciplinas: [
        { nome: "Língua Portuguesa", cargaHoraria: "120h", descricao: "Gramática, literatura, redação e interpretação de textos" },
        { nome: "Literatura", cargaHoraria: "80h", descricao: "Literatura brasileira e portuguesa, movimentos literários" },
        { nome: "Inglês", cargaHoraria: "60h", descricao: "Gramática, vocabulário e interpretação de textos em inglês" },
        { nome: "Educação Física", cargaHoraria: "40h", descricao: "Conceitos teóricos sobre saúde e atividade física" },
        { nome: "Arte", cargaHoraria: "40h", descricao: "História da arte, movimentos artísticos e expressões culturais" }
      ],
      cor: "bg-blue-500"
    },
    {
      area: "Matemática e suas Tecnologias",
      disciplinas: [
        { nome: "Matemática", cargaHoraria: "120h", descricao: "Álgebra, geometria, trigonometria e matemática financeira" },
        { nome: "Matemática Aplicada", cargaHoraria: "60h", descricao: "Estatística, probabilidade e análise de dados" }
      ],
      cor: "bg-green-500"
    },
    {
      area: "Ciências da Natureza e suas Tecnologias",
      disciplinas: [
        { nome: "Física", cargaHoraria: "80h", descricao: "Mecânica, termologia, óptica, eletricidade e física moderna" },
        { nome: "Química", cargaHoraria: "80h", descricao: "Química geral, orgânica, inorgânica e físico-química" },
        { nome: "Biologia", cargaHoraria: "80h", descricao: "Citologia, genética, evolução, ecologia e anatomia humana" }
      ],
      cor: "bg-purple-500"
    },
    {
      area: "Ciências Humanas e Sociais Aplicadas",
      disciplinas: [
        { nome: "História", cargaHoraria: "80h", descricao: "História geral, do Brasil e contemporânea" },
        { nome: "Geografia", cargaHoraria: "80h", descricao: "Geografia física, humana, econômica e do Brasil" },
        { nome: "Filosofia", cargaHoraria: "40h", descricao: "História da filosofia, ética e filosofia política" },
        { nome: "Sociologia", cargaHoraria: "40h", descricao: "Sociedade, cultura, movimentos sociais e cidadania" }
      ],
      cor: "bg-orange-500"
    }
  ];

  const totalHoras = materias.reduce((total, area) => 
    total + area.disciplinas.reduce((areaTotal, disciplina) => 
      areaTotal + parseInt(disciplina.cargaHoraria), 0
    ), 0
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow mt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-accent py-20">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Currículo Completo
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Conheça todas as disciplinas do nosso programa de ensino médio
            </p>
          </div>
        </section>

        {/* Resumo */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Estrutura Curricular</h2>
              <p className="text-lg text-gray-600 mb-8">
                Nosso currículo segue as diretrizes da Base Nacional Comum Curricular (BNCC) e 
                está organizado em 4 áreas do conhecimento, totalizando {totalHoras} horas de estudo.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-primary">{materias.length}</h3>
                  <p className="text-gray-600">Áreas do Conhecimento</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <Award className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-accent">
                    {materias.reduce((total, area) => total + area.disciplinas.length, 0)}
                  </h3>
                  <p className="text-gray-600">Disciplinas</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <Clock className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-500">{totalHoras}h</h3>
                  <p className="text-gray-600">Carga Horária Total</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Áreas do Conhecimento */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Áreas do Conhecimento</h2>
            <div className="max-w-6xl mx-auto space-y-8">
              {materias.map((area, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className={`${area.cor} text-white p-6`}>
                    <h3 className="text-2xl font-bold">{area.area}</h3>
                    <p className="text-sm opacity-90 mt-2">
                      {area.disciplinas.length} disciplinas • {' '}
                      {area.disciplinas.reduce((total, disc) => total + parseInt(disc.cargaHoraria), 0)}h total
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="grid gap-4">
                      {area.disciplinas.map((disciplina, idx) => (
                        <div key={idx} className="border-l-4 border-gray-200 pl-4 py-2">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold">{disciplina.nome}</h4>
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                              {disciplina.cargaHoraria}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm">{disciplina.descricao}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Metodologia */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Metodologia de Ensino</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Videoaulas Interativas</h3>
                      <p className="text-gray-600 text-sm">
                        Aulas gravadas por professores especialistas, com qualidade de estúdio
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Material Didático Digital</h3>
                      <p className="text-gray-600 text-sm">
                        Livros digitais, resumos, exercícios e materiais complementares
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Exercícios Práticos</h3>
                      <p className="text-gray-600 text-sm">
                        Listas de exercícios com correção automática e feedback
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Simulados e Provas</h3>
                      <p className="text-gray-600 text-sm">
                        Avaliações regulares para acompanhar o progresso
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Suporte Pedagógico</h3>
                      <p className="text-gray-600 text-sm">
                        Professores e tutores disponíveis para tirar dúvidas
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Cronograma Flexível</h3>
                      <p className="text-gray-600 text-sm">
                        Estude no seu ritmo, respeitando seus horários
                      </p>
                    </div>
                  </div>
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

export default Curriculo;
