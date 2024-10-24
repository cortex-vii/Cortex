"use client"

import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useRegister from "./useRegister";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Register() {
  const { register, isLoading } = useRegister();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleRegister = async (e: any) => {
    e.preventDefault();
    await register({ email, password, passwordConfirmation, firstName, lastName, phoneNumber, dateOfBirth });
  };

  return (
    <div className="  flex flex-col items-center justify-center  text-gray-400">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Faça Cadastro</CardTitle>
          <CardDescription>Preencha seus dados para se cadastrar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            {/* Campos do formulário */}
            <div className="grid w-full items-center gap-4">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

              <Label htmlFor="first_name">Primeiro Nome</Label>
              <Input id="first_name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

              <Label htmlFor="last_name">Sobrenome</Label>
              <Input id="last_name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

              <Label htmlFor="phone_number">Telefone</Label>
              <Input id="phone_number" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />

              <Label htmlFor="date_of_birth">Data de Nascimento</Label>
              <Input id="date_of_birth" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />

              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

              <Label htmlFor="password_confirmation">Confirme a Senha</Label>
              <Input id="password_confirmation" type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading ? "Registrando..." : "Cadastrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-4 text-center">
        <span className="text-primary">Já tem uma conta ?</span>
        <Link href="login" className="text-blue-600 hover:underline ml-1">
          Entrar
        </Link>
      </div>
    </div>
  );
}
