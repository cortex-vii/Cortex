import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/services/http/axiosConfig";

import useLogin from "../login/useLogin";
import { useNotification } from "@/context/notification/NotificationContext";

interface RegisterParams {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
}

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { showToast, dismissToast, openLoad } = useNotification();
  const { login } = useLogin(); // Renomeado aqui, se necessário

  const register = async ({
    email,
    password,
    passwordConfirmation,
    firstName,
    lastName,
    phoneNumber,
    dateOfBirth,
  }: RegisterParams) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("users/", {
        email,
        password,
        password_confirmation: passwordConfirmation,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        date_of_birth: dateOfBirth,
      });

      // Se o cadastro for bem-sucedido, faça o login
      await login(email, password);
      showToast("Cadastro realizado com sucesso!");
      router.push("/app/dashboard");
    } catch (error:any) {
      // Verifica se o erro possui a estrutura esperada
      if (error.response && error.response.data) {
        const errorData = error.response.data;
            // As mensagens de erro estão vindo do HTTPS
        
      } else {
        showToast("Cadastro falhou. Verifique suas informações.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
};

export default useRegister;
