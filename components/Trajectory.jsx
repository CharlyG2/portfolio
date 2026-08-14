"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";

const roles = [
  {
    period: "2023 — presente",
    role: "Product Designer",
    place: "BICE VIDA",
    blurb: "Lidero el Design System de la compañía y los flujos de seguros de salud y viaje.",
    color: "bg-signal",
  },
  {
    period: "2022 — 2023",
    role: "UI Designer",
    place: "RedCapital",
    blurb: "Interfaces para productos financieros.",
    color: "bg-amber",
  },
  {
    period: "2021 — 2022",
    role: "UX/UI Designer",
    place: "GrupoBIBA",
    blurb: "Investigación y diseño de producto.",
    color: "bg-mint",
  },
  {
    period: "2021",
    role: "UI Designer",
    place: "Dartel",
    blurb: "Diseño de interfaz para producto digital.",
    color: "bg-rose",
  },
  {
    period: "2017 — 2021",
    role: "Visual/CX Designer",
    place: "Becton Dickinson",
    blurb: "Diseño visual y experiencia de cliente.",
    color: "bg-signal",
  },
];

export default function Trajectory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.5"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="trayectoria" className="py-24 md:py-32 border-t border-line">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <Reveal>
          <p className="eyebrow text-signal mb-4">trayectoria</p>
          <h2 className="font-display text-2xl md:text-4xl text-ink leading-snug max-w-2xl">
            De construir interfaces a construir el sistema completo.
          </h2>
          <p className="text-sm md:text-base text-muted mt-4 leading-relaxed max-w-xl">
            Diseño Gráfico Publicitario, certificación Scrum y formación
            continua en UX/UI (IxDF). Ese recorrido me enseñó a mirar más
            allá de la pantalla — cómo se comporta un usuario, qué mueve una
            decisión de negocio, qué hace que un equipo adopte una
            herramienta.
          </p>
          <p className="text-sm md:text-base text-rust mt-4 leading-relaxed max-w-xl font-display">
            Cada rol sumó una pieza distinta: visual, luego interfaz, luego
            investigación — hasta llegar a sistemas completos.
          </p>
        </Reveal>

        <div ref={ref} className="relative mt-16 md:mt-20 pl-8 md:pl-12">
          {/* base track */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-line" />
          {/* animated fill, draws in as you scroll */}
          <motion.div
            className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-signal via-mint to-rose origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-14 md:space-y-16">
            {roles.map((r, i) => (
              <Reveal key={r.place} delay={i * 0.05}>
                <div className="relative">
                  <span
                    className={`absolute -left-[38px] md:-left-[54px] top-1 w-3.5 h-3.5 rounded-full ${r.color} ring-4 ring-white`}
                  />
                  <p className="font-mono text-xs text-mutedLight mb-1.5">
                    {r.period}
                  </p>
                  <h3 className="font-display text-xl md:text-2xl text-ink">
                    {r.role}{" "}
                    <span className="text-muted font-body text-base md:text-lg">
                      — {r.place}
                    </span>
                  </h3>
                  <p className="text-sm text-muted mt-1.5 max-w-md">
                    {r.blurb}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
