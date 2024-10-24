import { useState } from "react";
import axiosInstance from "@/app/services/http/axiosConfig";

export function useRecoverPassword() {
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setResponseMessage("");

    try {
      // Requisição para buscar o CSRF token
      const csrfResponse = await axiosInstance.get("/csrf-token/");
      const csrfToken = csrfResponse.data.csrfToken; // Armazena o CSRF token

      // Envio do e-mail de recuperação
      const response = await axiosInstance.post(
        "/auth/password-reset/send-email/",
        { email },
        {
          headers: {
            "X-CSRFToken": csrfToken, // Adiciona o CSRF token no header da requisição
          },
        }
      );

      setResponseMessage(response.data.message);
      setSuccess(true);
      setEmail(""); // Limpa o campo após o envio
    } catch (err) {
      setError("Erro ao enviar e-mail de recuperação");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    responseMessage,
    success,
    isLoading,
    error,
    handleRecover,
  };
}
