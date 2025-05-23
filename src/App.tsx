
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
import NotFound from "./pages/NotFound";

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
                <NotFound />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/notas" element={
              <ProtectedRoute>
                <NotFound />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/pagamentos" element={
              <ProtectedRoute>
                <NotFound />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/perfil" element={
              <ProtectedRoute>
                <NotFound />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/configuracoes" element={
              <ProtectedRoute>
                <NotFound />
              </ProtectedRoute>
            } />
            
            {/* Legal pages - placeholder for now */}
            <Route path="/termos" element={<NotFound />} />
            <Route path="/privacidade" element={<NotFound />} />
            <Route path="/cookies" element={<NotFound />} />
            <Route path="/credenciamento" element={<NotFound />} />
            <Route path="/esqueci-senha" element={<NotFound />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
