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
import { useRecoverPassword } from "./useRecover";


export default function RecoverPassword() {
  const {
    email,
    setEmail,
    responseMessage,
    success,
    isLoading,
    error,
    handleRecover,
  } = useRecoverPassword();

  return (
    <div className="flex flex-col items-center justify-center text-gray-400">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Recuperação de Senha</CardTitle>
          <CardDescription>Insira seu e-mail para recuperação</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRecover}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                "Enviar E-mail"
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
        <Link href="login" className="text-blue-600 hover:underline ml-1">
          Faça login
        </Link>
      </div>
    </div>
  );
}
