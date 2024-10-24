import React, { createContext, useContext, useState } from 'react';
import { IProfile } from "@/interfaces/type";

type ProfileContextType = {
  profile: IProfile | null;
  setProfile: (profile: IProfile) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({children}: {children: React.ReactNode}) => {
  const [profile, setProfile] = useState<IProfile | null>(null);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Hook para acessar o contexto do perfil
export const useProfileContext = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};
