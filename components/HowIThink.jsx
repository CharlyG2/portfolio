"use client";

import Reveal from "./Reveal";

// Solo 2 colores — los de la paleta de marca, alternados. Antes había 6
// colores random (azul, verde, ámbar, rosa, naranja) sin relación con el
// resto del sitio. Esto es lo que un reclutador ve como "los colores no
// cuadran" — un sistema real usa pocos colores con una regla, no muchos
// porque sí.
const RUST = "#AC5142";
const SAGE = "#3D5A56";

const steps = [
  {
    n: "01",
    color: RUST,
    title: "Entiendo antes de diseñar",
    text: "Antes de proponer soluciones, me aseguro de entender bien el problema junto al equipo. Hacer las preguntas correctas al inicio ahorra tiempo después.",
  },
  {
    n: "02",
    color: SAGE,
    title: "Busco la fricción",
    text: "Me enfoco en los puntos donde la experiencia se complica para las personas, más allá de lo visual.",
  },
  {
    n: "03",
    color: RUST,
    title: "Diseño con restricciones",
    text: "Considero negocio, tecnología y plazos desde el inicio, para que el diseño sea viable.",
  },
  {
    n: "04",
    color: SAGE,
    title: "Valido antes de defender",
    text: "Pongo a prueba mis ideas con datos y usuarios. Si la evidencia muestra otro camino, lo sigo.",
  },
  {
    n: "05",
    color: RUST,
    title: "Diseño junto a desarrollo",
    text: "Trabajo cerca del equipo técnico para que lo que diseño se pueda construir y mantener en el tiempo.",
  },
  {
    n: "06",
    color: SAGE,
    title: "Nada es definitivo",
    text: "Mido, aprendo y ajusto. El lanzamiento es el punto de partida, no la meta.",
  },
];

export default function HowIThink() {
  return (
    <section id="como-pienso" className="bg-paperSoft py-24 md:py-32 border-t border-line">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <Reveal>
          <p className="eyebrow text-rust mb-4">cómo pienso</p>
          <h2 className="font-display text-2xl md:text-3xl text-ink max-w-lg mb-12">
            Seis pasos, siempre en el mismo orden.
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div
                className="rounded-2xl border p-6 h-full"
                style={{
                  borderColor: `${s.color}40`,
                  background: "#FFFFFF",
                }}
              >
                <span
                  className="font-impact text-4xl"
                  style={{ color: s.color }}
                >
                  {s.n}
                </span>
                <h3 className="font-display text-xl text-ink mt-3 mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
