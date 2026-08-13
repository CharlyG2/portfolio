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
          <p className="eyebrow text-white/60 mb-4">cómo pienso</p>
          <h2 className="font-display text-2xl md:text-3xl text-white max-w-lg mb-12">
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
                  background: `${s.color}12`,
                }}
              >
                <span
                  className="font-impact text-4xl"
                  style={{ color: s.color }}
                >
                  {s.n}
                </span>
                <h3 className="font-display text-xl text-white mt-3 mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-white/75 leading-relaxed">
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
