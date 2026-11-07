import Link from "next/link";
import MuseumLoader from "@/components/museum/MuseumLoader";

export default function Home() {
  return (
    <main>
      {/* Resumen en texto para buscadores, vistas previas y lectores de
          pantalla: el museo 3D solo se arma en el navegador. */}
      <div className="sr-only">
        <h1>Charly Gourves — Product Designer generalista</h1>
        <p>
          Product Designer generalista con más de 8 años de experiencia,
          incluyendo Design Systems. Disponible para trabajar en
          Santiago, modalidad híbrida.
        </p>
        <ul>
          <li><Link href="/casos/design-system">Design System de BICE VIDA: 89 componentes en producción</Link></li>
          <li><Link href="/casos/landing-viajes">Landing de seguros de viaje: +16% de visitas</Link></li>
          <li><Link href="/casos/funnel-csi">Funnel de contratación CSI: −12% de abandono</Link></li>
          <li><Link href="/casos/beliv">Beliv: app de bienestar en un Design Sprint de 3 días</Link></li>
          <li><Link href="/casos/chatbot">Chatbot con IA: asistente virtual con 611 conversaciones en un mes</Link></li>
          <li><Link href="/express">Portafolio en versión rápida</Link></li>
          <li><a href="mailto:gourvestoro@gmail.com">gourvestoro@gmail.com</a></li>
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
