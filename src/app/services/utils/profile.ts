import { IProfile } from "@/interfaces/type";

export class UserProfile {
  private storageKey: string = 'profile';

  // Armazena o perfil no localStorage
  public setProfile(userDetailResponse: { data: IProfile }): void {
    const profile: IProfile = userDetailResponse.data;
    localStorage.setItem(this.storageKey, JSON.stringify(profile)); // Armazena como string
  }

  // Recupera o perfil do localStorage
  public getProfile(): IProfile | null {
    const profile = localStorage.getItem(this.storageKey);
    return profile ? JSON.parse(profile) : null; // Retorna o perfil ou null se não existir
  }

  // Remove o perfil do localStorage
  public clearProfile(): void {
    localStorage.removeItem(this.storageKey);
  }
}


