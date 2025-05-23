
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Future dashboard routes */}
          <Route path="/dashboard/cursos" element={<NotFound />} />
          <Route path="/dashboard/notas" element={<NotFound />} />
          <Route path="/dashboard/pagamentos" element={<NotFound />} />
          <Route path="/dashboard/perfil" element={<NotFound />} />
          <Route path="/dashboard/configuracoes" element={<NotFound />} />
          
          {/* Legal pages - placeholder for now */}
          <Route path="/termos" element={<NotFound />} />
          <Route path="/privacidade" element={<NotFound />} />
          <Route path="/cookies" element={<NotFound />} />
          <Route path="/credenciamento" element={<NotFound />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
