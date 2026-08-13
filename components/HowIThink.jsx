"use client";

import Reveal from "./Reveal";

const steps = [
  {
    n: "01",
    color: "#3D5AFE",
    title: "Entender",
    text: "Antes de abrir Figma, entiendo el problema. Sin eso, cualquier solución es un tiro al aire.",
  },
  {
    n: "02",
    color: "#0EA5A0",
    title: "Enmarcar",
    text: "Conecto lo que necesita el usuario con lo que necesita el negocio — ahí vive la decisión real.",
  },
  {
    n: "03",
    color: "#FFB020",
    title: "Explorar",
    text: "Pruebo varias soluciones. No me caso con la primera idea, aunque me guste.",
  },
  {
    n: "04",
    color: "#F43F5E",
    title: "Validar",
    text: "Testeo con datos, research o feedback real antes de dar algo por bueno.",
  },
  {
    n: "05",
    color: "#FD9047",
    title: "Construir",
    text: "Trabajo codo a codo con developers para que el diseño se vuelva producto de verdad.",
  },
  {
    n: "06",
    color: "#3D5AFE",
    title: "Mejorar",
    text: "Mido, aprendo, itero. Ningún lanzamiento es el final.",
  },
];

export default function HowIThink() {
  return (
    <section id="como-pienso" className="bg-ink py-24 md:py-32 border-t border-white/10">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <Reveal>
          <p className="eyebrow text-white/50 mb-4">cómo pienso</p>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <h2 className="font-display text-2xl md:text-3xl text-white max-w-lg">
              Seis pasos, siempre en el mismo orden.
            </h2>
            <span className="eyebrow text-white/40">
              desliza o arrastra →
            </span>
          </div>
        </Reveal>
      </div>

      <div
        className="overflow-x-auto pb-4 px-6 md:px-10 [scrollbar-width:thin]"
        tabIndex={0}
        role="region"
        aria-label="Las seis etapas de mi proceso de diseño, desplázate horizontalmente"
        style={{ scrollSnapType: "x proximity" }}
      >
        <div className="flex gap-4 max-w-content mx-auto w-max md:w-full">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05} className="shrink-0" >
              <div
                className="w-[240px] md:w-[260px] h-[280px] rounded-2xl border p-6 flex flex-col justify-between shrink-0"
                style={{
                  scrollSnapAlign: "start",
                  borderColor: `${s.color}40`,
                  background: `${s.color}0D`,
                }}
              >
                <span
                  className="font-impact text-5xl"
                  style={{ color: s.color }}
                >
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-xl text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {s.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
