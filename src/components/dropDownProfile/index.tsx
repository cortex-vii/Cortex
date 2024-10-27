"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HelpCircle, User, LogOut } from "lucide-react";
import SettingsDialog from "./dialog/ProfileSettings";
import { useNotification } from "../../context/notification/NotificationContext";

import { useAuth } from "@/context/authContext/authContext";
import useProfile from "@/hooks/useProfile";

export default function DropDownProfile() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { openLoad } = useNotification();
  const { logout } = useAuth();

  const handleLogout = async () => {
    openLoad();
    logout(); // Chama a função de logout do contexto
  };

  const handleDialogOpen = async () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    console.log("Dialog state before closing:", isDialogOpen);
    setIsDialogOpen(false);
    // Aqui você pode adicionar mais lógica se necessário
  };
  const profile = useProfile();

  // Define o avatar padrão
  let picture = profile?.picture;
  if (picture == "null") {
    picture = "https://github.com/shadcn.png";
  }

  const avatarSrc =
    picture && picture !== "null" ? picture : "https://github.com/shadcn.png";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex gap-4 items-center p-2 hover:bg-gray-100 transition duration-200 rounded-md cursor-pointer">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={avatarSrc}
                alt="User Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            </Avatar>
            {/* Verifica se o perfil existe antes de tentar acessar propriedades */}
            <span className="font-bold">
              {profile?.first_name || "Usuário"}
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-gray-400 font-light">
            {profile?.user_email || "user@example.com"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="mb-2 cursor-pointer"
              onClick={handleDialogOpen}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="mb-2 cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Ajuda e Dúvidas</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <SettingsDialog isOpen={isDialogOpen} onClose={handleDialogClose} />
    </>
  );
}
