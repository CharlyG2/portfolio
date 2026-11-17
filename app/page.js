import Link from "next/link";
import MuseumLoader from "@/components/museum/MuseumLoader";

export default function Home() {
  return (
    <main>
      {/* Resumen en texto para buscadores, vistas previas y lectores de
          pantalla: el museo 3D solo se arma en el navegador. */}
      <div className="sr-only">
        <h1>Charly Gourves — AI Product Designer</h1>
        <p>
          AI Product Designer y especialista en Design Systems, con más de 8 años en producto
          digital. Disponible para trabajar en
          Santiago, modalidad híbrida.
        </p>
        <ul>
          <li><Link href="/casos/design-system">Design System de BICE VIDA: la base que consumen 10 células de producto</Link></li>
          <li><Link href="/casos/landing-viajes">Landing de seguros de viaje: +16% de visitas</Link></li>
          <li><Link href="/casos/funnel-csi">Funnel de contratación CSI: −12% de abandono, validado con usuarios sintéticos generados con IA</Link></li>
          <li><Link href="/casos/beliv">Beliv: app de bienestar en un Design Sprint de 3 días</Link></li>
          <li><Link href="/casos/chatbot">Chatbot con IA: asistente virtual con 1.058 conversaciones en un mes</Link></li>
          <li><Link href="/express">Portafolio en versión rápida</Link></li>
          <li><a href="mailto:gourvestoro@gmail.com">gourvestoro@gmail.com</a></li>
          <li><a href="https://wa.me/56948530754">+56 9 4853 0754</a></li>
          <li><a href="https://linkedin.com/in/charlygourves">linkedin.com/in/charlygourves</a></li>
        </ul>
      </div>
      <MuseumLoader />
      <noscript>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center bg-paper">
          <p className="font-serif text-2xl text-ink">
            El museo 3D necesita JavaScript.
          </p>
          <Link href="/express" className="underline text-rust">
            Ver el portafolio en versión rápida
          </Link>
        </div>
      </noscript>
    </main>
  );
}
