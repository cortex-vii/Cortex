import loading from "../loadingAi/logo.gif";

interface SimpleLoadingIndicatorProps {
  isLoading: boolean;
  width?: string;  // Tamanho opcional para a largura
  height?: string; // Tamanho opcional para a altura
}

const SimpleLoadingIndicator = ({ isLoading, width = 'w-28', height = 'h-28' }: SimpleLoadingIndicatorProps) => {
  if (!isLoading) return null; // Não renderiza nada se não estiver carregando

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75 z-10">
      <img
        src={loading.src} // Use a logo sorteada
        alt="Loading"
        className={`${width} ${height} object-cover mb-4`} // Usando as props para definir o tamanho
      />
    </div>
  );
};

export default SimpleLoadingIndicator;
