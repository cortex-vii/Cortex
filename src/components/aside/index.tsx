"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, LayoutDashboard, Menu, X } from "lucide-react";
import logo from "./logo-cortex.png";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import DropDownProfile from "../dropDownProfile";
import creatusLogo from "./icons/creatus.svg";

/* Component */
export default function Component() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const MenuItem = ({
    icon,
    text,
  }: {
    icon: React.ReactNode; // Alterado para React.ReactNode
    text: string;
  }) => (
    <Button variant="ghost" className="w-full justify-start">
      {icon}
      {text}
    </Button>
  );

  const menuItems = [
    {
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
      label: "Dashboard",
      link: "dashboard",
      service: "dashboard",
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
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white shadow-md transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:z-0`}
      >
        {/* Header of the sidebar */}
        <div className="flex items-center justify-between p-4 mb-8">
          <Image src={logo} alt="logo Córtex" width={120} height={40} />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Navigation menu items */}
        <Badge className="ml-4 mb-4">Soluções</Badge>
        <nav className="px-4">
          {menuItems.map((item, index) => (
            <Link
              href={`${item.link}?service=${item.service}`} // Adiciona o serviceId como um parâmetro de consulta
              key={index}
            >
              <div className="mb-4">
                <MenuItem icon={item.icon} text={item.label} />
              </div>
            </Link>
          ))}
        </nav>

        {/* Footer of the sidebar (visible at the bottom) */}
        <div className="absolute bottom-4 space-y-2 w-[calc(100%-2rem)] px-4">
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
        className={`bg-white fixed top-4 left-4 z-50 md:hidden ${
          isOpen ? "hidden" : "block"
        }`}
        onClick={toggleMenu}
        aria-label="Abrir menu"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Overlay background when the sidebar is open (visible on mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
