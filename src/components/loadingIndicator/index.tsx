import React from "react";
import loading from "../loadingAi/logo.gif";

interface LoadingIndicatorProps {
  isLoading: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ isLoading }) => {
  if (!isLoading) return null; // Retorna null se não estiver carregando

  return (
    <div className="bg-white flex flex-col items-center p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold">Carregando...</h2>
      <img
        src={loading.src}
        alt="Loading"
        className="w-28 h-28 object-cover mb-4"
      />
      <p className="leading-7 mt-6">Estamos fazendo a mágica, aguarde...</p>
    </div>
  );
};

export default LoadingIndicator;
