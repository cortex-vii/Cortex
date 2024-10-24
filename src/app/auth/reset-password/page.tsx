"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { useResetPassword } from "./useResetPassword";
 // Atualizado para usar useResetPassword

interface ResetPassworProps{
  searchParams:{
    tk: string,
    pk: string
  }
}


export default function ResetPassword({searchParams}: ResetPassworProps) {
  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    responseMessage,
    success,
    isLoading,
    error,
    handleReset, // Atualizado para o novo nome da função
  } = useResetPassword(); // Atualizado para usar o hook de redefinição de senha

  return (
    <div className="flex flex-col items-center justify-center text-gray-400">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Redefinir Senha</CardTitle>
          <CardDescription>Insira sua nova senha</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleReset(e, searchParams.tk, searchParams.pk)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="newPassword">Nova Senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Digite sua nova senha"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirme sua nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando
                </>
              ) : (
                "Redefinir Senha"
              )}
            </Button>
          </form>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {responseMessage && success && (
            <Alert variant="default" className="mt-4">
              <AlertTitle>Sucesso</AlertTitle>
              <AlertDescription>{responseMessage}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      <div className="mt-4 text-center">
        <span>Já tem uma conta?</span>
        <Link href="/auth/login" className="text-blue-600 hover:underline ml-1">
          Faça login
        </Link>
      </div>
    </div>
  );
}
