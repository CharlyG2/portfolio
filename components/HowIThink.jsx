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
    title: "Cuestiono todo",
    text: "No diseño antes de entender el problema de verdad — ni aunque la fecha de entrega esté encima.",
  },
  {
    n: "02",
    color: SAGE,
    title: "Busco la fricción",
    text: "Ahí es donde se rompe la experiencia de verdad, no en lo que se ve bonito o feo.",
  },
  {
    n: "03",
    color: RUST,
    title: "Diseño con restricciones",
    text: "El producto real tiene negocio, tecnología y plazos — diseñar sin eso es diseñar en el vacío.",
  },
  {
    n: "04",
    color: SAGE,
    title: "Pruebo antes de defender",
    text: "Si los datos contradicen mi idea favorita, gana el dato — mi ego puede esperar.",
  },
  {
    n: "05",
    color: RUST,
    title: "Construyo con quien lo sostiene",
    text: "Si el equipo de desarrollo no lo puede mantener después, no importa qué tan bien se vea.",
  },
  {
    n: "06",
    color: SAGE,
    title: "Nada es definitivo",
    text: "Mido, aprendo, cambio. El lanzamiento es el punto de partida, no la meta.",
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
