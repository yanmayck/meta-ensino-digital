
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui implementaria o envio do formulário
    console.log("Formulário enviado:", formData);
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      assunto: "",
      mensagem: ""
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow mt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-accent py-20">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Entre em Contato
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Estamos aqui para esclarecer suas dúvidas e ajudar você a começar
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Informações de Contato */}
                <div>
                  <h2 className="text-3xl font-bold mb-8">Fale Conosco</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Nossa equipe está sempre disponível para ajudar você a dar o próximo passo 
                    em sua jornada educacional. Entre em contato através dos canais abaixo:
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mr-4">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Telefone</h3>
                        <p className="text-gray-600">+55 (11) 4002-8922</p>
                        <p className="text-sm text-gray-500">WhatsApp disponível 24h</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center mr-4">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">E-mail</h3>
                        <p className="text-gray-600">contato@metaeducacao.com.br</p>
                        <p className="text-sm text-gray-500">Resposta em até 24h</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mr-4">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Endereço</h3>
                        <p className="text-gray-600">
                          Rua da Educação, 123<br />
                          Centro - São Paulo/SP<br />
                          CEP: 01234-567
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Horário de Atendimento</h3>
                        <div className="text-gray-600 space-y-1">
                          <p>Segunda a Sexta: 8h às 18h</p>
                          <p>Sábado: 8h às 12h</p>
                          <p>Domingo: Fechado</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp CTA */}
                  <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-lg mb-3 text-green-800">
                      Atendimento Imediato via WhatsApp
                    </h3>
                    <p className="text-green-700 mb-4">
                      Para um atendimento mais rápido, fale conosco pelo WhatsApp. 
                      Nossa equipe responde mensagens 24 horas por dia!
                    </p>
                    <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                      Falar no WhatsApp
                    </button>
                  </div>
                </div>

                {/* Formulário de Contato */}
                <div>
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Envie sua Mensagem</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          id="nome"
                          name="nome"
                          required
                          value={formData.nome}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Seu nome completo"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          E-mail *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="seu@email.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          id="telefone"
                          name="telefone"
                          value={formData.telefone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="(11) 99999-9999"
                        />
                      </div>

                      <div>
                        <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-2">
                          Assunto *
                        </label>
                        <select
                          id="assunto"
                          name="assunto"
                          required
                          value={formData.assunto}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">Selecione um assunto</option>
                          <option value="matricula">Informações sobre Matrícula</option>
                          <option value="cursos">Dúvidas sobre Cursos</option>
                          <option value="pagamento">Questões de Pagamento</option>
                          <option value="suporte">Suporte Técnico</option>
                          <option value="outros">Outros</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                          Mensagem *
                        </label>
                        <textarea
                          id="mensagem"
                          name="mensagem"
                          required
                          rows={5}
                          value={formData.mensagem}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                          placeholder="Descreva sua dúvida ou mensagem..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Enviar Mensagem
                      </button>

                      <p className="text-sm text-gray-600 text-center">
                        * Campos obrigatórios. Responderemos em até 24 horas.
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mapa ou informações adicionais */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Outras Formas de Contato</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold text-lg mb-3">Central de Ajuda</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Acesse nossa base de conhecimento com artigos e tutoriais
                  </p>
                  <button className="text-primary font-semibold hover:underline">
                    Acessar Central de Ajuda
                  </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold text-lg mb-3">Chat Online</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Converse com nossos consultores em tempo real
                  </p>
                  <button className="text-primary font-semibold hover:underline">
                    Iniciar Chat
                  </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold text-lg mb-3">Agendar Reunião</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Agende uma conversa personalizada com nosso time
                  </p>
                  <button className="text-primary font-semibold hover:underline">
                    Agendar Agora
                  </button>
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

export default Contato;
