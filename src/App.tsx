
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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
          {/* These routes will be implemented in future iterations */}
          <Route path="/sobre" element={<NotFound />} />
          <Route path="/como-funciona" element={<NotFound />} />
          <Route path="/curriculo" element={<NotFound />} />
          <Route path="/depoimentos" element={<NotFound />} />
          <Route path="/faq" element={<NotFound />} />
          <Route path="/contato" element={<NotFound />} />
          <Route path="/login" element={<NotFound />} />
          <Route path="/cadastro" element={<NotFound />} />
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
