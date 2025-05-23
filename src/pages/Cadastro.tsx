
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, User, Mail, Lock, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Cadastro = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    password: "",
    confirmPassword: "",
    termos: false
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.nome.trim()) {
      toast({
        variant: "destructive",
        title: "Erro de validação",
        description: "Nome completo é obrigatório"
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast({
        variant: "destructive",
        title: "Erro de validação",
        description: "E-mail é obrigatório"
      });
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast({
        variant: "destructive",
        title: "Erro de validação",
        description: "Por favor, insira um e-mail válido"
      });
      return false;
    }

    if (formData.password.length < 6) {
      toast({
        variant: "destructive",
        title: "Erro de validação",
        description: "A senha deve ter pelo menos 6 caracteres"
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro de validação",
        description: "As senhas não coincidem"
      });
      return false;
    }

    if (!formData.termos) {
      toast({
        variant: "destructive",
        title: "Erro de validação",
        description: "Você deve aceitar os termos de uso"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simular criação de conta (aqui seria integrado com Supabase)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Salvar dados básicos no localStorage temporariamente
      localStorage.setItem('userData', JSON.stringify({
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        isLoggedIn: true,
        needsDocumentUpload: true
      }));

      toast({
        title: "Conta criada com sucesso!",
        description: "Agora você precisa enviar seus documentos para análise."
      });

      // Redirecionar para upload de documentos
      navigate('/dashboard');
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao criar conta",
        description: "Tente novamente em alguns instantes"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-accent flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="text-4xl font-display font-bold text-white">
              Meta
            </span>
            <span className="ml-2 text-white/80">Educação</span>
          </Link>
          <p className="text-white/80 mt-2">Crie sua conta</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-mail *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Crie uma senha forte"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Senha *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Confirme sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="termos"
                  checked={formData.termos}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-primary focus:ring-primary mt-1"
                  required
                />
                <span className="ml-2 text-sm text-gray-600">
                  Aceito os{" "}
                  <Link to="/termos" className="text-primary hover:underline">
                    Termos de Uso
                  </Link>{" "}
                  e a{" "}
                  <Link to="/privacidade" className="text-primary hover:underline">
                    Política de Privacidade
                  </Link>
                </span>
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Criando conta..." : "Criar Conta"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Faça login aqui
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center space-y-2">
          <Link to="/" className="block text-white/80 hover:text-white text-sm">
            ← Voltar ao site
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
