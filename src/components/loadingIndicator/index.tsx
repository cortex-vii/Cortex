import React from "react";
import loading from "../loadingAi/logo.gif";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface LoadingDialogProps {
  isLoading: boolean;
}

const LoadingIndicator: React.FC<LoadingDialogProps> = ({ isLoading }) => {
  return (
    <AlertDialog open={isLoading}>
      <AlertDialogContent className="bg-white flex flex-col items-center">
        <AlertDialogHeader>
          <AlertDialogTitle>Carregando...</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="flex flex-col items-center">
          <img
            src={loading.src} // Use a logo sorteada
            alt="Loading"
            className="w-28 h-28 object-cover mb-4"
          />
          <p className="leading-7 mt-6">Estamos fazendo a mágica, aguarde...</p>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoadingIndicator;
