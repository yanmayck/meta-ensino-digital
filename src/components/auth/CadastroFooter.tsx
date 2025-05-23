
import { Link } from "react-router-dom";

const CadastroFooter = () => {
  return (
    <div className="mt-8 text-center space-y-2">
      <Link to="/" className="block text-white/80 hover:text-white text-sm">
        ← Voltar ao site
      </Link>
    </div>
  );
};

export default CadastroFooter;
