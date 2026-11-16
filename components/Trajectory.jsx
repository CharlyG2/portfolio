"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Reveal from "./Reveal";

const roles = [
  {
    period: "mar. 2026 — oct. 2026",
    role: "Product Designer",
    place: "BICE VIDA",
    blurb: "Diseño de producto end-to-end en seguros, de discovery a implementación.",
  },
  {
    period: "may. 2023 — mar. 2026",
    role: "UX/UI Designer",
    place: "BICE VIDA",
    blurb: "Diseño UX/UI de productos digitales de seguros de salud y viaje.",
  },
  {
    period: "abr. 2022 — may. 2023",
    role: "UX/UI Designer",
    place: "RedCapital",
    blurb: "Interfaces para productos financieros.",
  },
  {
    period: "nov. 2021 — abr. 2022",
    role: "UX/UI Designer",
    place: "Grupo BIBA",
    blurb: "Investigación y diseño de producto.",
  },
  {
    period: "feb. 2021 — oct. 2021",
    role: "UX/UI Designer",
    place: "Dartel",
    blurb: "Diseño de interfaz para producto digital.",
  },
  {
    period: "may. 2017 — feb. 2021",
    role: "CX Designer",
    place: "Becton Dickinson",
    blurb: "Diseño visual y experiencia de cliente.",
  },
];

export default function Trajectory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.5"],
  });
  // El resorte suaviza la línea: sigue al scroll con un poco de inercia en
  // vez de saltar con cada tick de la rueda del mouse.
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  return (
    <section id="trayectoria" className="py-24 md:py-32 border-t border-line">
      <div className="max-w-content mx-auto px-6 md:px-10 grid md:grid-cols-[0.9fr_1fr] gap-12 md:gap-16">
        <Reveal className="md:sticky md:top-24 self-start">
          <p className="eyebrow text-rust mb-4">trayectoria</p>
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

        <div ref={ref} className="relative pl-8 md:pl-10">
          {/* base track */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-line" />
          {/* animated fill, draws in as you scroll */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-rust origin-top"
            style={{ scaleY: lineScale }}
          />

          <div className="space-y-14 md:space-y-16">
            {roles.map((r, i) => (
              <Reveal key={r.period} delay={0.04} y={16}>
                <div className="relative">
                  <span
                    className={`absolute -left-[38px] md:-left-[46px] top-1 w-3.5 h-3.5 rounded-full ring-4 ring-paper ${
                      i === 0 ? "bg-rust" : "bg-paper border-2 border-rust"
                    }`}
                  />
                  <p className="font-mono text-xs text-muted mb-1.5">
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
