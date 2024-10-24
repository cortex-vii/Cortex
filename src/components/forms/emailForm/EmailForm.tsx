import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useEmailChange from "./useEmailChange";


interface EmailFormProps {
  email?: string;
}

export default function EmailForm({ email }: EmailFormProps) {
  const {
    currentEmail,
    newEmail,
    isEditing,
    loading,
    setIsEditing,
    handleEmailChange,
    handleEmailSubmit,
  } = useEmailChange(email);

  return (
    <form onSubmit={handleEmailSubmit} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          value={isEditing ? newEmail : currentEmail}
          disabled={!isEditing}
          onChange={handleEmailChange}
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="edit-email"
          checked={isEditing}
          onChange={() => setIsEditing((prev) => !prev)}
          className="form-checkbox"
        />
        <Label htmlFor="edit-email">Editar E-mail</Label>
      </div>

      {isEditing && (
        <div className="flex justify-end mt-4">
          <Button type="submit" className="mt-4" disabled={loading}>
            {loading ? "Carregando..." : "Salvar E-mail"}
          </Button>
        </div>
      )}
    </form>
  );
}
