import Link from "next/link";
import MuseumLoader from "@/components/museum/MuseumLoader";

export default function Home() {
  return (
    <main>
      <MuseumLoader />
      <noscript>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center bg-paper">
          <p className="font-serif text-2xl text-ink">
            El museo 3D necesita JavaScript.
          </p>
          <Link href="/express" className="underline text-rust">
            Ver el portafolio completo en modo express
          </Link>
        </div>
      </noscript>
    </main>
  );
}
