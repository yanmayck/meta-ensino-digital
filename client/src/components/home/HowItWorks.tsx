
const steps = [
  {
    id: '01',
    title: 'Inscrição Online',
    description:
      'Complete o formulário de inscrição online em poucos minutos. O processo é simples e direto, solicitando apenas os dados necessários para iniciar sua jornada educacional.',
  },
  {
    id: '02',
    title: 'Envio de Documentos',
    description:
      'Envie os documentos necessários para análise. Nossa plataforma segura permite o upload de documentos de forma rápida e protegida.',
  },
  {
    id: '03',
    title: 'Análise e Aprovação',
    description:
      'Nossa equipe analisa seus documentos e histórico escolar para verificar os requisitos e criar um plano de estudos personalizado para você.',
  },
  {
    id: '04',
    title: 'Início dos Estudos',
    description:
      'Após a aprovação, você ganha acesso imediato à plataforma e pode começar seus estudos no mesmo dia. Nossos materiais e aulas estarão disponíveis 24/7.',
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Como Funciona
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
            Em apenas quatro passos simples, você está pronto para iniciar sua jornada educacional e concluir o ensino médio.
          </p>
        </div>

        <div className="mt-16 flow-root">
          <ul className="-mb-8">
            {steps.map((step, stepIdx) => (
              <li key={step.id}>
                <div className="relative pb-8">
                  {stepIdx !== steps.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-meta-600 flex items-center justify-center ring-8 ring-white">
                        <span className="text-white font-semibold text-sm">{step.id}</span>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                        <p className="mt-2 text-gray-500">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Pronto para começar sua jornada?
              </h3>
              <p className="mt-2 text-gray-500 text-base">
                Inscreva-se hoje e dê o primeiro passo para concluir seus estudos!
              </p>
            </div>
            <div className="mt-5 sm:mt-0 sm:ml-6">
              <a
                href="/cadastro"
                className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-meta-600 hover:bg-meta-700"
              >
                Cadastre-se Agora
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
