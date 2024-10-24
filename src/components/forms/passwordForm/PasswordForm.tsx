import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePasswordForm from "./usePasswordForm";


export default function PasswordForm() {
  const {
    oldPassword,
    newPassword,
    confirmNewPassword,
    loading,
    handlePasswordChange,
    handlePasswordSubmit,
  } = usePasswordForm();

  return (
    <form onSubmit={handlePasswordSubmit}>
      <div className="space-y-1">
        <Label htmlFor="oldPassword">Senha Atual</Label>
        <Input
          id="oldPassword"
          name="oldPassword"
          type="password"
          value={oldPassword}
          onChange={handlePasswordChange}
          required
        />
      </div>

      <div className="space-y-1 mt-4">
        <Label htmlFor="newPassword">Nova Senha</Label>
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          value={newPassword}
          onChange={handlePasswordChange}
          required
        />
      </div>

      <div className="space-y-1 mt-4">
        <Label htmlFor="confirmNewPassword">Confirmar Nova Senha</Label>
        <Input
          id="confirmNewPassword"
          name="confirmNewPassword"
          type="password"
          value={confirmNewPassword}
          onChange={handlePasswordChange}
          required
        />
      </div>

      <div className="flex justify-end mt-4">
        <Button type="submit" className="mt-4" disabled={loading}>
          {loading ? (
            <div className="flex items-center">
              <div className="loader"></div> {/* Seu componente de spinner */}
              <span className="ml-2">Carregando...</span>
            </div>
          ) : (
            "Salvar Senha"
          )}
        </Button>
      </div>
    </form>
  );
}
