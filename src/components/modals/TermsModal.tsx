
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

const TermsModal = ({ isOpen, onClose, type }: TermsModalProps) => {
  if (!isOpen) return null;

  const title = type === 'terms' ? 'Termos de Uso' : 'Política de Privacidade';
  
  const termsContent = `
    1. ACEITAÇÃO DOS TERMOS
    Ao acessar e usar a plataforma Meta Educação, você concorda em cumprir estes termos de uso.

    2. USO DA PLATAFORMA
    Você pode usar nossa plataforma para fins educacionais legítimos. É proibido usar para atividades ilegais.

    3. CONTAS DE USUÁRIO
    Você é responsável por manter a confidencialidade de sua conta e senha.

    4. CONTEÚDO
    Todo o conteúdo educacional é protegido por direitos autorais.

    5. LIMITAÇÃO DE RESPONSABILIDADE
    A Meta Educação não se responsabiliza por danos diretos ou indiretos.
  `;

  const privacyContent = `
    1. COLETA DE INFORMAÇÕES
    Coletamos informações que você nos fornece diretamente e automaticamente.

    2. USO DAS INFORMAÇÕES
    Usamos suas informações para fornecer nossos serviços educacionais.

    3. COMPARTILHAMENTO
    Não vendemos ou alugamos suas informações pessoais para terceiros.

    4. SEGURANÇA
    Implementamos medidas de segurança para proteger suas informações.

    5. COOKIES
    Usamos cookies para melhorar sua experiência na plataforma.

    6. SEUS DIREITOS
    Você pode solicitar acesso, correção ou exclusão de seus dados pessoais.
  `;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-gray-700 space-y-4">
          <div className="whitespace-pre-line">
            {type === 'terms' ? termsContent : privacyContent}
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={onClose}>Fechar</Button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
