"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/context/authContext/authContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, checkAuth } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth(); // Aguarda a verificação de autenticação
      setLoading(false); // Atualiza o estado de loading após a verificação
    };

    verifyAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Exibir uma mensagem se não autenticado
  }

  return <>{children}</>;
};
