// src/context/notification/NotificationContext.tsx
"use client"; // Este arquivo é apenas para cliente

import React, { createContext, ReactNode, useContext } from "react";
import toast from 'react-hot-toast';
import {  Loader2 } from "lucide-react";
interface NotificationContextValue {
  showToast: (message: string, emoji?: string) => void;
  openLoad: () => void; // Define corretamente
  dismissToast: () => void;
}

export const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const NotificationContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const openToast = (message: string, emoji?: string) => {
    toast(message, {
      icon: emoji,
    });
  };

  const openToastLoader = () => {
    toast(<><Loader2 className="mr-2 h-4 w-4 animate-spin" /></>); // Use um fragmento para envolver o conteúdo
  };

  const dismissLoader = () => {
    toast.dismiss();
  };

  const contextValue: NotificationContextValue = {
    showToast: openToast,
    openLoad: openToastLoader,
    dismissToast: dismissLoader,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used within a NotificationContextProvider");
  }

  return context;
};
