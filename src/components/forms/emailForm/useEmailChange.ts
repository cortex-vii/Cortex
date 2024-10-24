import { useState, useEffect } from "react";
import axiosInstance from "@/app/services/http/axiosConfig";
import { useNotification } from "@/context/notification/NotificationContext";
import useProfile from "@/hooks/useProfile";

const useEmailChange = (initialEmail: any) => {
  const [currentEmail, setCurrentEmail] = useState(initialEmail);
  const [newEmail, setNewEmail] = useState(initialEmail);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useNotification();
  const profile = useProfile();

  useEffect(() => {
    setCurrentEmail(initialEmail);
    setNewEmail(initialEmail); // Sincroniza o novo e-mail com o e-mail recebido
  }, [initialEmail]);

  const handleEmailChange = (e: any) => {
    setNewEmail(e.target.value);
  };

  const handleEmailSubmit = async (e: any) => {
    e.preventDefault();

    if (!newEmail) {
      showToast("O e-mail não pode estar vazio.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      const pk = profile?.pk;
      await axiosInstance.put(
        `users/${pk}/`,
        { email: newEmail },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showToast("E-mail alterado com sucesso, aguarde!");
      setCurrentEmail(newEmail);
      setIsEditing(false); // Desativa o modo de edição após salvar
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  return {
    currentEmail,
    newEmail,
    isEditing,
    loading,
    setIsEditing,
    handleEmailChange,
    handleEmailSubmit,
  };
};

export default useEmailChange;
