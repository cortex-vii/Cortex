"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HelpCircle, LayoutDashboard, Menu, X } from "lucide-react";
import logo from "./logo-cortex.png";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import DropDownProfile from "../dropDownProfile";
import creatusLogo from "./icons/creatus.svg";
import useAside from "./useAside"; // Ajuste o caminho conforme necessário

export default function Component() {
  const {
    isOpen,
    toggleMenu,
    openSubmenuIndex,
    setOpenSubmenuIndex,
    submenuRef,
  } = useAside(); // Utilizando o hook

  const MenuItem = ({
    icon,
    text,
    onClick,
    link, // Adicione a propriedade link aqui
  }: {
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
    link?: string;
  }) => (
    <Button
      variant="ghost"
      className="w-full justify-start"
      onClick={() => {
        if (onClick) onClick();
        if (link) toggleMenu(); // Fechar o menu se um link for fornecido
      }}
    >
      {icon}
      {text}
    </Button>
  );

  const menuItems = [
    {
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
      label: "Dashboard",
      link: "/app/dashboard",
      service: "dashboard",
      subItems: [], // Dashboard não tem subitems
    },
    {
      icon: (
        <Image
          src={creatusLogo}
          width={240}
          alt="Creatus Córtex"
          className="mr-2 h-4 w-4"
        />
      ),
      label: "Creatus Córtex",
      link: "creatus-cortex",
      service: "creatus-cortex",
      subItems: [
        {
          label: "Real Creatus",
          link: "/app/creatus/cortex-creatus?service=creatus-cortex",
          description: "Criação de imagens realistas de perfis",
        },
        {
          label: "Creatus Upscale",
          link: "/app/creatus/cortex-upscale",
          description: "Recuperaçã de imagens",
        },
        {
          label: "Córtex AvatarCraft",
          link: "/app/creatus/cortex-avatarcraft",
          description:
            "Criação de avatares personalizados em diversos estilos.",
        },
        {
          label: "Córtex Fantasy",
          link: "/app/creatus/cortex-fantasy",
          description:
            "Geração de cenários fantásticos e personagens em desenho com traços Disney",
        },
        {
          label: "Córtex Artify",
          link: "/app/creatus/cortex-artify",
          description:
            "Transformação de fotos em obras de arte com estilos variados.",
        },
        {
          label: "Córtex MoodMaster",
          link: "/app/creatus/cortex-moodmaster",
          description:
            "Aplicação de filtros sazonais e estilos para atmosferas únicas.",
        },
        {
          label: "Córtex InspiraPic",
          link: "/app/creatus/cortex-inspirapic",
          description:
            "Criação de imagens a partir de palavras-chave para cenas naturais e objetos.",
        },
        {
          label: "Córtex MockUp Magic",
          link: "/app/creatus/cortex-mockup-magic",
          description:
            "Desenvolvimento de designs de produtos com mockups realistas.",
        },
        {
          label: "Córtex MapForge",
          link: "/app/creatus/cortex-mapforge",
          description: "Criação de mapas de fantasia e layouts de cidades.",
        },
        {
          label: "Córtex SerenityScapes",
          link: "/app/creatus/cortex-serenityscapes",
          description:
            "Geração de paisagens relaxantes e inspiradoras para meditação.",
        },
        {
          label: "Córtex Brandly",
          link: "/app/creatus/cortex-brandly",
          description:
            "Desenvolvimento de logotipos e identidades visuais únicas para marcas.",
        },
      ],
    },
  ];

  return (
    <div className="z-40">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white shadow-md transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:z-0`}
      >
        {/* Header do menu lateral */}
        <div className="flex items-center justify-between p-4 mb-8">
          <Image src={logo} alt="logo Córtex" width={120} height={40} />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden z-50" // z-50 garante que o botão fique no topo
            onClick={toggleMenu}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Menu de navegação principal */}
        <Badge className="ml-4 mb-4">Soluções</Badge>
        <nav className="relative px-4 ">
          {menuItems.map((item, index) => (
            <div key={index} className="mb-4 relative ">
              {/* Verifica se há subitems */}
              {item.subItems.length > 0 ? (
                <>
                  <MenuItem
                    icon={item.icon}
                    text={item.label}
                    onClick={() =>
                      setOpenSubmenuIndex(
                        openSubmenuIndex === index ? null : index
                      )
                    }
                  />
                  {openSubmenuIndex === index && (
                    /* Submenu */
                    <div
                      ref={submenuRef} // Ref para detecção de clique fora
                      className={`grid grid-cols-1 md:grid-cols-2 gap-2 p-2 rounded-lg absolute top-0 left-24 bg-white shadow-lg border transition-all duration-300 ease-in-out w-[300px] md:w-[450px] max-h-[600px] overflow-y-auto custom-scrollbar`}
                    >
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          href={subItem.link}
                          key={subIndex}
                          onClick={() => {
                            // Fechar o submenu
                            setOpenSubmenuIndex(
                              openSubmenuIndex === index ? null : index
                            );
                            // Fechar o menu lateral (para mobile)
                            toggleMenu();
                          }}
                        >
                          <div className="flex flex-col rounded-lg hover:bg-gray-200 transition-colors p-4">
                            <div className="flex items-center">
                              {/* Bolinha ao lado do label */}
                              <span className="h-1.5 w-1.5 bg-black rounded-full -ml-2"></span>
                              <span className="text-sm font-semibold ml-1 truncate">
                                {subItem.label}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                              {subItem.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link href={`${item.link}?service=${item.service}`}>
                  <MenuItem
                    icon={item.icon}
                    text={item.label}
                    link={item.link}
                  />
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Rodapé do menu lateral */}
        <div className="absolute bottom-4 space-y-2 w-[calc(100%-2rem)] px-4 -z-10">
          <MenuItem
            icon={<HelpCircle className="mr-2 h-4 w-4" />}
            text="Help"
          />
          <DropDownProfile />
        </div>
      </aside>
      {/* Button to toggle sidebar menu (visible on mobile) */}
      <Button
        variant="outline"
        className={`fixed top-16 left-4 z-50 p-2 rounded-full shadow-lg bg-white transition-transform transform hover:scale-105 md:hidden ${
          isOpen ? "hidden" : "block"
        }`}
        onClick={toggleMenu}
        aria-label="Abrir menu"
      >
        <Menu className="h-5 w-5 text-gray-800" />
      </Button>

      {/* Overlay background when the sidebar is open (visible on mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
