// hooks/useAside.ts
import { useState, useRef, useEffect } from 'react';

const useAside = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);
  const submenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Função para fechar submenu ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(event.target as Node) &&
        openSubmenuIndex !== null
      ) {
        setOpenSubmenuIndex(null); // Fecha o submenu se clicar fora
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSubmenuIndex]);

  return {
    isOpen,
    toggleMenu,
    openSubmenuIndex,
    setOpenSubmenuIndex,
    submenuRef,
  };
};

export default useAside;
