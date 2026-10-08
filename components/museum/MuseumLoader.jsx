"use client";

import dynamic from "next/dynamic";

// Three.js solo corre en el navegador.
const Museum = dynamic(() => import("./Museum"), { ssr: false });

export default function MuseumLoader() {
  return <Museum />;
}
