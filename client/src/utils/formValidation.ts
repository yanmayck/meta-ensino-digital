
import { toast } from "@/hooks/use-toast";

export interface CadastroFormData {
  nome: string;
  email: string;
  telefone: string;
  password: string;
  confirmPassword: string;
  termos: boolean;
}

export const validateCadastroForm = (formData: CadastroFormData): boolean => {
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
