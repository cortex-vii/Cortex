import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600"],
  subsets: ["latin"],
  style: ["normal"],
});
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata = {
  title: "Currículo Córtex",
  description: "Feita por Córtex",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={poppins.className}>
      <body>
        <Header />
        <section className="app-container">{children}</section>
      </body>
    </html>
  );
}
