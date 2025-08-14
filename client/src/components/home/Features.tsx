
import { Check } from 'lucide-react';

const features = [
  {
    title: 'Flexibilidade Total',
    description: 'Estude no seu próprio ritmo, em qualquer lugar e a qualquer momento, adaptando os estudos à sua rotina.',
    icon: (
      <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-meta-100 text-meta-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>
    ),
  },
  {
    title: 'Plataforma Intuitiva',
    description: 'Nossa plataforma é fácil de usar, permitindo que você se concentre no aprendizado sem complicações tecnológicas.',
    icon: (
      <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-meta-100 text-meta-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      </div>
    ),
  },
  {
    title: 'Certificado Reconhecido',
    description: 'Diploma oficial reconhecido pelo MEC, válido em todo o território nacional para continuação dos estudos ou mercado de trabalho.',
    icon: (
      <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-meta-100 text-meta-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>
      </div>
    ),
  },
  {
    title: 'Suporte Contínuo',
    description: 'Instrutores qualificados disponíveis para ajudar com dúvidas e orientar seu percurso educacional sempre que precisar.',
    icon: (
      <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-meta-100 text-meta-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
      </div>
    ),
  },
];

const Features = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Por que escolher a Meta Educação?
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
            Oferecemos uma experiência educacional completa, projetada especialmente para adultos que desejam concluir o ensino médio.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {features.map((feature, index) => (
              <div key={index} className="relative">
                {feature.icon}
                <h3 className="ml-16 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            O que você ganha com a Meta Educação?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Diploma reconhecido pelo MEC',
              'Flexibilidade para estudar quando puder',
              'Acesso a professores qualificados',
              'Material didático digital completo',
              'Suporte técnico e pedagógico',
              'Programa adaptado para adultos',
              'Avaliações online',
              'Plataforma acessível 24/7',
              'Oportunidade de crescimento profissional',
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-accent-500" />
                </div>
                <p className="ml-2 text-gray-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
