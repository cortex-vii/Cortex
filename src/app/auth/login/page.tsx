"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Importa o hook useRouter para redirecionamento
import axiosInstance from "@/app/services/http/axiosConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useProfileContext } from "@/context/profileContext";
import useLogin from "./useLogin";
import Link from "next/link";

export default function Login() {
  const { setProfile } = useProfileContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Campo de senha
  const [responseMessage, setResponseMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { login, isLoading, error } = useLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password); // Chame a função de login
  };

  return (
    <div className="flex flex-col items-center justify-center  text-gray-400">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Faça Login</CardTitle>
          <CardDescription>Entre com seu email e senha</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button
              type="submit" // Define o tipo do botão como submit
              className="w-full mt-4"
              disabled={isLoading || success}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Validando
                </>
              ) : (
                "Acessar"
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
        </CardContent>
        <div className="mt-4 mb-8 text-center">
          <span className="text-gray-400">Esqueceu sua senha ?</span>
          <Link href="recover" className="text-blue-400 hover:underline ml-1">
            Recuperar
          </Link>
        </div>
      </Card>

      <div className="mt-4 text-center">
        <span className="text-gray-400">Não tem conta ?</span>
        <Link href="register" className="text-blue-400 hover:underline ml-1">
          Cadastre-se
        </Link>
      </div>
    </div>
  );
}
