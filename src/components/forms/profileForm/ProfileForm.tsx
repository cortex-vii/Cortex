import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import useProfileForm from "./useProfileForm";

export default function ProfileForm() {
  const {
    profile,
    avatarPreview,
    successMessage,
    errorMessage,
    loading,
    handleProfileChange,
    handleFileChange,
    handleProfileSubmit,
  } = useProfileForm();

  if (!profile) return null; // Renderiza algo enquanto o perfil está sendo carregado

  return (
    <form onSubmit={handleProfileSubmit}>
      <div className="space-y-1">
        <Label htmlFor="first_name">Nome</Label>
        <Input
          id="first_name"
          name="first_name"
          value={profile.first_name}
          onChange={handleProfileChange}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="last_name">Sobrenome</Label>
        <Input
          id="last_name"
          name="last_name"
          value={profile.last_name}
          onChange={handleProfileChange}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="phone_number">Telefone</Label>
        <Input
          id="phone_number"
          name="phone_number"
          value={profile.phone_number}
          onChange={handleProfileChange}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="date_of_birth">Data de Nascimento</Label>
        <Input
          id="date_of_birth"
          name="date_of_birth"
          type="date"
          value={profile.date_of_birth}
          onChange={handleProfileChange}
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="avatar">Avatar</Label>
        <div className="flex justify-between items-center space-y-1">
          <img
            className="mt-2 w-20 h-20 object-cover rounded-full"
            src={avatarPreview || profile.picture || "https://github.com/shadcn.png"}
            alt={profile.first_name}
          />
          <div className="relative">
            <Input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button className="mt-2 flex items-center space-x-2 cursor-pointer">
              <Camera className="h-5 w-5 text-white" aria-hidden="true" />
              <span>Escolher Arquivo</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="mt-4" disabled={loading}>
          {loading ? (
            <div className="flex items-center">
              <div className="loader"></div> {/* Spinner */}
              <span className="ml-2">Carregando...</span>
            </div>
          ) : (
            "Salvar Perfil"
          )}
        </Button>
      </div>
      {successMessage && (
        <p className="mt-2 text-green-600">{successMessage}</p>
      )}
      {errorMessage && <p className="mt-2 text-red-600">{errorMessage}</p>}
    </form>
  );
}
