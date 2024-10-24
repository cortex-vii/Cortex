import { useState } from "react";
import axiosInstance from "@/app/services/http/axiosConfig";
import { useNotification } from "@/context/notification/NotificationContext";
import useProfile from "@/hooks/useProfile";

const usePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast, dismissToast, openLoad } = useNotification();
  const profile = useProfile();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "oldPassword") setOldPassword(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmNewPassword") setConfirmNewPassword(value);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {

      const token = localStorage.getItem("accessToken");
      const pk = profile?.pk;
      await axiosInstance.put(
        `users/${pk}/`,
        {
          old_password: oldPassword,
          password: newPassword,
          password_confirmation: confirmNewPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dismissToast();
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      showToast("Senha alterada com sucesso!");
    } catch (error: any) {
      
      const errorResponse = error.response?.data;

    } finally {

      setLoading(false);
    }
  };

  return {
    oldPassword,
    newPassword,
    confirmNewPassword,
    loading,
    handlePasswordChange,
    handlePasswordSubmit,
    setOldPassword,
    setNewPassword,
    setConfirmNewPassword,
  };
};

export default usePasswordForm;
