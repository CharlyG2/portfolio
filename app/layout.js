import { Space_Grotesk, Inter, IBM_Plex_Mono, Anton } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
});

const impact = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-impact",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Charly Gourves — Product Designer, Design Systems",
  description:
    "Product Designer especializado en Design Systems, con foco en negocio. Casos de estudio reales: seguros, viajes y bienestar.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} ${mono.variable} ${impact.variable}`}>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
