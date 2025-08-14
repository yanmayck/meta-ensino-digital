
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminRoute from "@/components/admin/AdminRoute";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import ComoFunciona from "./pages/ComoFunciona";
import Curriculo from "./pages/Curriculo";
import Depoimentos from "./pages/Depoimentos";
import FAQ from "./pages/FAQ";
import Contato from "./pages/Contato";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/dashboard/DashboardSimple";
import Cursos from "./pages/dashboard/Cursos";
import Notas from "./pages/dashboard/Notas";
import Pagamentos from "./pages/dashboard/Pagamentos";
import Perfil from "./pages/dashboard/Perfil";
import Configuracoes from "./pages/dashboard/Configuracoes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
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
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/" component={Index} />
            <Route path="/sobre" component={Sobre} />
            <Route path="/como-funciona" component={ComoFunciona} />
            <Route path="/curriculo" component={Curriculo} />
            <Route path="/depoimentos" component={Depoimentos} />
            <Route path="/faq" component={FAQ} />
            <Route path="/contato" component={Contato} />
            <Route path="/login" component={Login} />
            <Route path="/cadastro" component={Cadastro} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/dashboard">
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </Route>
            <Route path="/dashboard/cursos">
              <ProtectedRoute>
                <Cursos />
              </ProtectedRoute>
            </Route>
            <Route path="/dashboard/notas">
              <ProtectedRoute>
                <Notas />
              </ProtectedRoute>
            </Route>
            <Route path="/dashboard/pagamentos">
              <ProtectedRoute>
                <Pagamentos />
              </ProtectedRoute>
            </Route>
            <Route path="/dashboard/perfil">
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            </Route>
            <Route path="/dashboard/configuracoes">
              <ProtectedRoute>
                <Configuracoes />
              </ProtectedRoute>
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin">
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </Route>
            <Route path="/admin/users">
              <AdminRoute allowedRoles={['admin']}>
                <UserManagement />
              </AdminRoute>
            </Route>
            
            {/* Legal pages */}
            <Route path="/termos" component={Termos} />
            <Route path="/privacidade" component={Privacidade} />
            <Route path="/cookies" component={Cookies} />
            <Route path="/credenciamento" component={Credenciamento} />
            <Route path="/esqueci-senha" component={EsqueciSenha} />
            
            <Route component={NotFound} />
          </Switch>
        </AuthProvider>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
