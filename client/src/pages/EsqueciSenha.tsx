
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Mail, Shield } from "lucide-react";

const EsqueciSenha = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Erro",
        description: "Por favor, insira seu email.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simular envio de email
    setTimeout(() => {
      setEmailSent(true);
      setIsLoading(false);
      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-accent flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="text-4xl font-display font-bold text-white">
              Meta
            </span>
            <span className="ml-2 text-white/80">Educação</span>
          </Link>
          <p className="text-white/80 mt-2">Recuperar senha</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              {emailSent ? (
                <Mail className="h-6 w-6 text-primary" />
              ) : (
                <Shield className="h-6 w-6 text-primary" />
              )}
            </div>
            <CardTitle className="text-xl">
              {emailSent ? "Email Enviado" : "Esqueceu sua senha?"}
            </CardTitle>
            <p className="text-gray-600 text-sm">
              {emailSent 
                ? "Verifique sua caixa de entrada e siga as instruções para redefinir sua senha."
                : "Digite seu email para receber um link de recuperação de senha."
              }
            </p>
          </CardHeader>

          <CardContent>
            {!emailSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando..." : "Enviar Link de Recuperação"}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">
                    <strong>Email enviado para:</strong> {email}
                  </p>
                  <p className="text-green-700 text-sm mt-2">
                    O link de recuperação é válido por 24 horas.
                  </p>
                </div>

                <div className="text-center space-y-2 text-sm text-gray-600">
                  <p>Não recebeu o email?</p>
                  <button 
                    onClick={() => {
                      setEmailSent(false);
                      setEmail("");
                    }}
                    className="text-primary hover:underline"
                  >
                    Tentar novamente
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t text-center">
              <Link 
                to="/login" 
                className="inline-flex items-center text-sm text-gray-600 hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Voltar ao login
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center space-y-2">
          <Link to="/" className="block text-white/80 hover:text-white text-sm">
            ← Voltar ao site
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EsqueciSenha;
