// src/app/app/layout.server.tsx
import { ReactNode } from "react";
import logo from "../../components/aside/logo.png";
import Image from "next/image";
export const metadata = {
  title: "Córtex",
  description: "Admin page for the application",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="pt-8">
        <Image src={logo} alt="logo Córtex" width={120} height={40} />
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}
