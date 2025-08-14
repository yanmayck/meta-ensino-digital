
import CadastroHeader from "@/components/auth/CadastroHeader";
import CadastroForm from "@/components/auth/CadastroForm";
import CadastroFooter from "@/components/auth/CadastroFooter";

const Cadastro = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-accent flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <CadastroHeader />
        <CadastroForm />
        <CadastroFooter />
      </div>
    </div>
  );
};

export default Cadastro;
