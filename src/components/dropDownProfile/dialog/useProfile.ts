import { useEffect, useState } from "react";
import axiosInstance from "@/app/services/http/axiosConfig";

import { useNotification } from "@/context/notification/NotificationContext";
import { IProfile } from "@/interfaces/type";

export function useProfileSettings(isOpen: any) {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showToast } = useNotification();

  useEffect(() => {
    if (isOpen) {
      const fetchProfileData = async () => {
        setLoading(true);
        setError(null);
        try {
          const token = localStorage.getItem("accessToken");
          const response = await axiosInstance.post(
            "auth/user-detail/",
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProfile(response.data); // Armazena os dados do perfil
        } catch (error) {
          console.error("Erro ao buscar dados do perfil:", error);
          /* setError("Erro ao carregar dados do perfil."); */
        } finally {
          setLoading(false);
        }
      };

      fetchProfileData();
    }
  }, [isOpen]);

  const handleDeleteAccount = async () => {
    if (!profile) return;

    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      const profileString = localStorage.getItem("profile");
      if (profileString) {
        const profile = JSON.parse(profileString);
        const pk = profile.pk;
        await axiosInstance.delete(`users/${profile?.pk}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }
      sessionStorage.clear();
      localStorage.clear();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      showToast("Erro inesperado, entre em contato com o suporte");
      // Trate o erro conforme necessário
    }
  };

  return { profile, loading, error, handleDeleteAccount };
}
