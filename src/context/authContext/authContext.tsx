"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import axiosInstance from "@/app/services/http/axiosConfig";
import { useProfileContext } from "../profileContext";
import { IProfile } from "@/interfaces/type";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  logout: () => void;
  checkAuth: () => Promise<void>; // Mudado para Promise<void> para indicar que é uma função assíncrona
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const { setProfile } = useProfileContext();
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (token) {
        const response = await axiosInstance.post(
          "auth/check/",
          { token },
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.status === 200) {
          // Requisição para obter os dados do usuário
          const userDetailResponse = await axiosInstance.post(
            "auth/user-detail/",
            { token: token },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
              },
            }
          );

          localStorage.setItem(
            "profile",
            JSON.stringify(userDetailResponse.data)
          );

          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
