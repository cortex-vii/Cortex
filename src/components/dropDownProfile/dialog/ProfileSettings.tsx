import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import ProfileForm from "../../forms/profileForm/ProfileForm";
import PasswordForm from "../../forms/passwordForm/PasswordForm";
import EmailForm from "../../forms/emailForm/EmailForm";
import LoadingIndicator from "../../loadingIndicator";
import { Button } from "@/components/ui/button";
import { useProfileSettings } from "./useProfile";
import { X } from "lucide-react";

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsDialog({
  isOpen,
  onClose,
}: SettingsDialogProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { profile, loading, error, handleDeleteAccount } =
    useProfileSettings(isOpen);

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white min-h-[650px] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>Configurações</AlertDialogTitle>
          {/* Botão de fechar "X" no topo */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <X size={18} />
          </button>
        </AlertDialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList className="grid w-full grid-cols-3 gap-1">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="password">Senha</TabsTrigger>
          </TabsList>
          <div className="flex-1 overflow-y-auto">
            <TabsContent value="profile">
              <Card className="border-none shadow-none">
                <CardContent className="space-y-2">
                  {loading ? (
                    <LoadingIndicator isLoading={true} />
                  ) : error ? (
                    <p className="text-red-600">{error}</p>
                  ) : (
                    <>
                      <ProfileForm />
                      <div className="flex justify-start">
                        <a
                          className="mt-8 text-red-600 cursor-pointer hover:text-red-700"
                          onClick={() => setShowDeleteConfirmation(true)}
                        >
                          Apagar Conta
                        </a>
                        {showDeleteConfirmation && (
                          <div className="mt-4 p-4 border border-red-600 bg-red-100 rounded">
                            <p>Tem certeza que deseja apagar sua conta?</p>
                            <div className="mt-2 flex justify-end space-x-2">
                              <Button
                                type="button"
                                className="bg-red-600 text-white"
                                onClick={handleDeleteAccount}
                                disabled={loading}
                              >
                                {loading ? "Apagando..." : "Sim, Apagar Conta"}
                              </Button>
                              <Button
                                type="button"
                                onClick={() => setShowDeleteConfirmation(false)}
                                disabled={loading}
                              >
                                Cancelar
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="email">
              <Card className="border-none shadow-none">
                <CardContent className="space-y-2">
                  <EmailForm email={profile?.user_email || ""} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card className="border-none shadow-none">
                <CardContent className="space-y-2">
                  <PasswordForm />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </AlertDialogContent>
    </AlertDialog>
  );
}
