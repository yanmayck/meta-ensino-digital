
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import ComoFunciona from "./pages/ComoFunciona";
import Curriculo from "./pages/Curriculo";
import Depoimentos from "./pages/Depoimentos";
import FAQ from "./pages/FAQ";
import Contato from "./pages/Contato";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/dashboard/Dashboard";
import Cursos from "./pages/dashboard/Cursos";
import Notas from "./pages/dashboard/Notas";
import Pagamentos from "./pages/dashboard/Pagamentos";
import Perfil from "./pages/dashboard/Perfil";
import Configuracoes from "./pages/dashboard/Configuracoes";
import NotFound from "./pages/NotFound";
import Termos from "./pages/Termos";
import Privacidade from "./pages/Privacidade";
import Cookies from "./pages/Cookies";
import Credenciamento from "./pages/Credenciamento";
import EsqueciSenha from "./pages/EsqueciSenha";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/curriculo" element={<Curriculo />} />
            <Route path="/depoimentos" element={<Depoimentos />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/cursos" element={
              <ProtectedRoute>
                <Cursos />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/notas" element={
              <ProtectedRoute>
                <Notas />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/pagamentos" element={
              <ProtectedRoute>
                <Pagamentos />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/perfil" element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/configuracoes" element={
              <ProtectedRoute>
                <Configuracoes />
              </ProtectedRoute>
            } />
            
            {/* Legal pages */}
            <Route path="/termos" element={<Termos />} />
            <Route path="/privacidade" element={<Privacidade />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/credenciamento" element={<Credenciamento />} />
            <Route path="/esqueci-senha" element={<EsqueciSenha />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
