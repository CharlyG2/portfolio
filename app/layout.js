import { Space_Grotesk, Inter, IBM_Plex_Mono, Anton, Fraunces } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import MotionProvider from "@/components/MotionProvider";

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

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

const TITLE = "Charly Gourves — AI Product Designer";
const DESCRIPTION =
  "AI Product Designer y especialista en Design Systems, con más de 8 años en producto digital. Casos con métricas reales: Design System, chatbot con IA, usuarios sintéticos y funnels. Santiago, Chile.";

export const metadata = {
  metadataBase: new URL("https://charly-gourves.vercel.app"),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Charly Gourves",
    locale: "es_CL",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Museo 3D del portafolio de Charly Gourves" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} ${mono.variable} ${impact.variable} ${serif.variable}`}>
      <body className="font-body antialiased">
        <CustomCursor />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
