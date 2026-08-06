"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { IconAtom, IconData, IconEye } from "./PrincipleIcon";

const principles = [
  {
    icon: IconAtom,
    bg: "bg-signal",
    title: "Simplificar antes de escalar",
    text: "Un flujo mal resuelto se rompe en cien pantallas distintas. Prefiero resolver bien lo simple antes de construir algo grande encima.",
  },
  {
    icon: IconData,
    bg: "bg-amber",
    title: "Apoyar cada decisión en evidencia",
    text: "Card sorting, analíticas de funnel, tests de usabilidad. Cuando una decisión no tiene evidencia detrás, la trato como una hipótesis a validar.",
  },
  {
    icon: IconEye,
    bg: "bg-rose",
    title: "Que la persona entienda lo que está viendo",
    text: "En seguros, la letra chica destruye confianza. Prefiero una pantalla que explique un cambio con claridad a una que lo esconda bien diseñado.",
  },
];

export default function Principles() {
  return (
    <section className="py-24 md:py-32 border-t border-line">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <Reveal>
          <p className="eyebrow text-signal mb-4">cómo pienso</p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.08}>
                <motion.div
                  className={`${p.bg} rounded-2xl p-7 h-full text-white`}
                  whileHover={{ rotate: i % 2 === 0 ? -1.5 : 1.5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-6">
                    <Icon />
                  </div>
                  <h3 className="font-display text-xl mb-3">{p.title}</h3>
                  <p className="text-sm text-white/85 leading-relaxed">
                    {p.text}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
