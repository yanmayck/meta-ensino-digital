
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast({
        variant: "destructive",
        title: "Erro de validação",
        description: "E-mail é obrigatório"
      });
      return false;
    }

    if (!formData.password.trim()) {
      toast({
        variant: "destructive",
        title: "Erro de validação",
        description: "Senha é obrigatória"
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
      // Simular autenticação (aqui seria integrado com Supabase)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Verificar se existe usuário cadastrado no localStorage
      const userData = localStorage.getItem('userData');
      
      if (userData) {
        const user = JSON.parse(userData);
        
        // Simular verificação de credenciais (em produção seria verificado no backend)
        if (user.email === formData.email) {
          // Atualizar status de login
          localStorage.setItem('userData', JSON.stringify({
            ...user,
            isLoggedIn: true
          }));

          toast({
            title: "Login realizado com sucesso!",
            description: `Bem-vindo de volta, ${user.nome.split(' ')[0]}!`
          });

          // Redirecionar para dashboard
          navigate('/dashboard');
        } else {
          throw new Error('Credenciais inválidas');
        }
      } else {
        throw new Error('Usuário não encontrado');
      }
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: "E-mail ou senha incorretos"
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
          <p className="text-white/80 mt-2">Acesse sua conta</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
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
                  placeholder="Sua senha"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-600">Lembrar de mim</span>
              </label>
              <Link to="/esqueci-senha" className="text-sm text-primary hover:underline">
                Esqueci minha senha
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Não tem uma conta?{" "}
              <Link to="/cadastro" className="text-primary font-semibold hover:underline">
                Cadastre-se aqui
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center space-y-2">
          <Link to="/" className="block text-white/80 hover:text-white text-sm">
            ← Voltar ao site
          </Link>
          <div className="text-white/60 text-xs">
            <Link to="/termos" className="hover:underline">Termos de Uso</Link>
            {" • "}
            <Link to="/privacidade" className="hover:underline">Política de Privacidade</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
