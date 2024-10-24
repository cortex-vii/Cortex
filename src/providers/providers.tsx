'use client'

import { ProfileProvider } from "@/context/profileContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ProfileProvider>{children}</ProfileProvider>;
};
