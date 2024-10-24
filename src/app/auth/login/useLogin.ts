"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/app/services/http/axiosConfig';

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axiosInstance.post('auth/', {
        email,
        password,
      });

      // Armazena os tokens no localStorage ou cookies
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);

      // Requisição para obter os dados do usuário
      const userDetailResponse = await axiosInstance.post(
        'auth/user-detail/',
        { token: response.data.access },
        {
          headers: {
            Authorization: `Bearer ${response.data.access}`,
          },
        }
      );

      localStorage.setItem('profile', JSON.stringify(userDetailResponse.data));
      window.location.assign('/app/dashboard');
    } catch (error: any) {
      // Captura a mensagem de erro detalhada, se disponível
      const errorMessage = 'Falha ao fazer login, verifique as credenciais';
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, successMessage };
};

export default useLogin;
