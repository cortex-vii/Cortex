import { useState } from "react";
import axiosInstance from "@/app/services/http/axiosConfig";
import axios from "axios";
import toast from "react-hot-toast";
export function useResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent, token: string, pk: string) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setResponseMessage("");

    // Verifica se as senhas coincidem
    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.put(
        `users/${pk}/password-reset/confirm/`,
        {
          password: newPassword,
          password_confirmation: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token jwt na requisição
          },
        }
      );

      toast.success("Senha alterada com sucesso, você será redirecioando em breve!");
      setSuccess(true);
      setNewPassword(""); // Limpa o campo após o envio
      setConfirmPassword(""); // Limpa o campo de confirmação após o envio
      // Redireciona para a página de login após 3 segundos
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 5000); 
    } catch (err) {
      // Verifica se o erro é um 401
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError(
          "Link expirado. Por favor, solicite uma nova redefinição de senha."
        );
      } else {
        setError("Erro ao redefinir a senha. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    responseMessage,
    success,
    isLoading,
    error,
    handleReset,
  };
}
