
const testimonials = [
  {
    content:
      "A Meta me ajudou a realizar o sonho de concluir meus estudos mesmo trabalhando em período integral. A flexibilidade e a qualidade do ensino fizeram toda a diferença na minha vida.",
    author: "Ana Silva, 34 anos",
    role: "Formada em 2023",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    content:
      "Depois de 15 anos fora da sala de aula, consegui concluir o ensino médio graças à metodologia da Meta. Hoje estou na faculdade, algo que parecia impossível antes.",
    author: "Carlos Oliveira, 42 anos",
    role: "Formado em 2022",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    content:
      "A plataforma é super intuitiva e os professores estão sempre disponíveis para tirar dúvidas. Concluir o ensino médio na Meta me abriu portas que nunca imaginei.",
    author: "Márcia Santos, 28 anos",
    role: "Formada em 2023",
    imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Histórias de Sucesso
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
            Conheça algumas das histórias de pessoas que transformaram suas vidas através da Meta Educação.
          </p>
        </div>

        <div className="mt-12 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden p-6 flex flex-col transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex-1">
                  <div className="h-3 w-3 text-meta-600">
                    <svg width="40" height="40" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <p className="mt-4 text-base text-gray-600">{testimonial.content}</p>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={testimonial.imageUrl}
                      alt={testimonial.author}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                    <p className="text-xs text-meta-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="/depoimentos"
              className="text-meta-600 hover:text-meta-700 font-medium text-base"
            >
              Ver mais histórias de sucesso →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
