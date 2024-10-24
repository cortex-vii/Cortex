// app/page.tsx ou app/app/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BadgeHelp } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useProfile from "@/hooks/useProfile";
import ButtonReload from "../buttonReload";

export default function Header() {
  const profile = useProfile();

  return (
    <header className="flex justify-between items-center mb-8">
      <div className="w-full mr-4">
        {profile ? (
          <>
            <h1 className="text-2xl font-bold">Olá, {profile.first_name}</h1>
            <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
          </>
        ) : (
          <Alert className="bg-white">
            <AlertDescription>
              Complete o seu perfil nas configurações !😁😎
            </AlertDescription>
          </Alert>
        )}
      </div>
      <div className="flex space-x-4">
        <Button variant="outline">
          <BadgeHelp className="mr-2 h-4 w-4" />
          Ajuda
        </Button>
        <ButtonReload />
      </div>
    </header>
  );
}
