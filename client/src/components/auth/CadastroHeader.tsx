
import { Link } from "react-router-dom";

const CadastroHeader = () => {
  return (
    <div className="text-center mb-8">
      <Link to="/" className="inline-block">
        <span className="text-4xl font-display font-bold text-white">
          Meta
        </span>
        <span className="ml-2 text-white/80">Educação</span>
      </Link>
      <p className="text-white/80 mt-2">Crie sua conta</p>
    </div>
  );
};

export default CadastroHeader;
