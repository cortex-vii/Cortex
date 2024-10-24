// components/ImagePreviewDialog.tsx
import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ImagePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string | null;
}

const ImagePreviewDialog: React.FC<ImagePreviewDialogProps> = ({
  open,
  onOpenChange,
  imageUrl,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white p-0 max-w-4xl">
        <div className="relative">
          {/* Botão de fechar */}
          <button
            className="absolute top-2 right-2 text-red-600 hover:text-gray-800 w-8 h-8 text-2xl flex items-center justify-center"
            onClick={() => onOpenChange(false)}
            aria-label="Fechar"
          >
            &times;
          </button>

          <AlertDialogHeader>
            <AlertDialogTitle className="p-4">
              Visualizar Imagem
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="p-0">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Imagem em tamanho maior"
                className="w-full h-auto max-h-[80vh] object-contain" // Use object-contain para evitar cortes
              />
            )}
          </AlertDialogDescription>
        </div>
        <AlertDialogFooter className="p-4 flex justify-between">
          <AlertDialogCancel onClick={() => onOpenChange(false)}>
            Fechar
          </AlertDialogCancel>
          {imageUrl && (
            <a href={imageUrl} download>
              <Button>Download</Button>
            </a>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ImagePreviewDialog;
