'use client'

// app/axiosConfig.ts
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from './endpoints';

let token = "";

if (typeof window !== "undefined") {
  token = localStorage.getItem("accessToken") || "";
}

const axiosInstanceAi = axios.create({
    baseURL: API_BASE_URL, // Defina a URL base aqui
    timeout: 300000, // Define um tempo limite para as requisições (opcional)
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      // Você pode adicionar mais cabeçalhos aqui, como tokens de autenticação, se necessário
    },
  });
  
  // Interceptor de resposta
  axiosInstanceAi.interceptors.response.use(
    (response) => response,
    (error) => {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data;
  
        const errorMessages = [];
  
        // Itera sobre os campos do objeto de erro
        for (const key in errorResponse) {
          if (errorResponse[key]?.error_code) {
            const errorMessage = errorResponse[key].error_code.error_message;
            errorMessages.push(errorMessage); // Concatenando as mensagens em uma string
          }
        }
  
        // Exibe as mensagens de erro no toast ou uma mensagem padrão
        if (errorMessages.length > 0) {
          toast.error(errorMessages.join("\n"), {
            position: "top-center",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error(
            "Erro de solicitação. Se o erro continuar, entre em contato com o suporte!"
          );
        }
      } else {
        toast.error("Erro ao realizar a operação. Tente novamente.");
      }
  
      // Retorna uma Promise rejeitada para que o erro possa ser tratado onde a requisição foi feita
      return Promise.reject(error);
    }
  );
  
  export default axiosInstanceAi;