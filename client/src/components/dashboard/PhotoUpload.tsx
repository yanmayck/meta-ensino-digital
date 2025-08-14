
import { useState, useRef } from "react";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PhotoUploadProps {
  currentPhoto?: string;
  userName: string;
  onPhotoChange?: (file: File) => void;
  disabled?: boolean;
}

const PhotoUpload = ({ currentPhoto, userName, onPhotoChange, disabled }: PhotoUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Erro",
        description: "Por favor, selecione apenas arquivos de imagem.",
        variant: "destructive"
      });
      return;
    }

    // Validar tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erro", 
        description: "A imagem deve ter no máximo 5MB.",
        variant: "destructive"
      });
      return;
    }

    // Criar preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Simular upload
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      onPhotoChange?.(file);
      toast({
        title: "Sucesso!",
        description: "Foto atualizada com sucesso."
      });
    }, 2000);
  };

  const clearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const displayPhoto = preview || currentPhoto;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        {displayPhoto ? (
          <div className="relative w-32 h-32 rounded-full overflow-hidden">
            <img 
              src={displayPhoto} 
              alt="Foto do perfil" 
              className="w-full h-full object-cover"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        
        {!disabled && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 hover:bg-primary/80 transition-colors"
            disabled={isUploading}
          >
            <Camera className="w-4 h-4" />
          </button>
        )}
      </div>

      {!disabled && (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? 'Enviando...' : 'Alterar Foto'}
          </Button>
          
          {preview && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearPreview}
              disabled={isUploading}
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || isUploading}
      />
    </div>
  );
};

export default PhotoUpload;
