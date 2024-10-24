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

const axiosConfig = {
  baseURL: API_BASE_URL, // Defina a URL base aqui
  timeout: 10000, // Define um tempo limite para as requisições (opcional)
  headers: {
    "Content-Type": "application/json",
  } as { [key: string]: string }, // permite adicionar qualquer chave ao objeto
};

// Se o token estiver presente, adicione o cabeçalho Authorization
if (token) {
  axiosConfig.headers["Authorization"] = `Bearer ${token}`;
}

const axiosInstance = axios.create(axiosConfig);

// Interceptor de resposta
axiosInstance.interceptors.response.use(
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

/* axios para AI */
export default axiosInstance;

