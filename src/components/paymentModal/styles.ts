import { CSSProperties } from "react";

export const modalStyle: CSSProperties = {
  position: "fixed",        // Mantém o modal fixo na tela
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "white",  // Fundo branco sólido
  zIndex: 1000,             // Coloca o modal acima de outros elementos
  display: "flex",          // Alinha o conteúdo do modal
  flexDirection: "column",
  alignItems: "center",     // Centraliza horizontalmente
  justifyContent: "center", // Centraliza verticalmente
  
  
};


export const innerDivStyle: CSSProperties = {
  width: "90%", // Largura da div interna
  maxWidth: "1200px", // Largura máxima da div interna
  margin: "0 auto",
  border: 'none',
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  padding: "12px" // Adiciona uma leve sombra ao modal
};

export const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
};
