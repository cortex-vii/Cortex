"use client"; // Este arquivo deve ser executado apenas no cliente (navegador)

import { Toaster } from 'react-hot-toast'; // Importa o componente Toaster da biblioteca react-hot-toast

// Define o componente ClientOnlyToaster como um componente funcional React
const ClientOnlyToaster: React.FC = () => {
  return <Toaster />; // Renderiza o componente Toaster
};

export default ClientOnlyToaster; // Exporta o componente para ser utilizado em outros arquivos
