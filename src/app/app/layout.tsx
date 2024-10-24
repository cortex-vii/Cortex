// src/app/app/layout.server.tsx
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import Aside from "@/components/aside";
import Header from "@/components/header";

import { ProtectedRoute } from "@/components/protectedRoute";
import { AuthProvider } from "../../context/authContext/authContext";
import ClientOnlyToaster from "@/context/notification/ClientOnlyToaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Córtex",
  description: "Admin page for the application",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
 
        <AuthProvider>
          <ProtectedRoute>
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
              <Aside />
              <main className="flex-1 h-screen p-4 md:p-8 overflow-y-auto pt-16 md:pt-8">
                <Header />
                {children}
              </main>
            </div>
          </ProtectedRoute>
        </AuthProvider>
 
  );
}
