import { useEffect, useState } from "react";
import axiosInstance from "@/app/services/http/axiosConfig";
import { IProfile } from "@/interfaces/type";
import { useNotification } from "@/context/notification/NotificationContext";

const useProfileForm = () => {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { showToast } = useNotification();

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
      const parsedProfile = JSON.parse(storedProfile);
      if (parsedProfile.avatar) {
        setAvatarPreview(URL.createObjectURL(parsedProfile.avatar));
      }
    }
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (profile) {
      setProfile({ ...profile, [e.target.name]: e.target.value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newAvatar = e.target.files[0];
      if (profile) {
        setProfile({
          ...profile,
          avatar: newAvatar,
          picture: URL.createObjectURL(newAvatar),
        });
      }
      setAvatarPreview(URL.createObjectURL(newAvatar));
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();

    formData.append("first_name", profile.first_name);
    formData.append("last_name", profile.last_name);
    formData.append("phone_number", profile.phone_number);
    formData.append("date_of_birth", profile.date_of_birth);

    if (profile.avatar) {
      formData.append("avatar", profile.avatar);
    }

    try {
      const response = await axiosInstance.put(
        `profiles/${profile.pk}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("profile", JSON.stringify(response.data));
      setProfile(response.data);
      showToast("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);

    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    avatarPreview,
    successMessage,
    errorMessage,
    loading,
    handleProfileChange,
    handleFileChange,
    handleProfileSubmit,
  };
};

export default useProfileForm;
