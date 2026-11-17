"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_EXPO, STAGGER } from "@/lib/motion";

// Portada de la versión rápida. Usa las mismas fuentes que carga
// next/font en el layout (variables --font-*), así no se descargan dos
// veces desde Google Fonts. Mismos acentos que la portada del museo:
// etiqueta en terracota clara y palabra clave en menta.
const TAGS = [
  "Product Design",
  "Design Systems",
  "UX Research",
  "UX Writing",
  "Estrategia de Negocio",
];

const HEADLINE_WORDS = "AI Product Designer y especialista en Design Systems.".split(" ");
const ACCENT_FROM = HEADLINE_WORDS.indexOf("especialista");

const EASE_OUT = EASE_EXPO;

export default function Hero() {
  const reduce = useReducedMotion();
  const [activeTag, setActiveTag] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setActiveTag((i) => (i + 1) % TAGS.length), 2200);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-ink text-paper">
      <div className="flex flex-1 flex-col justify-center px-6 pb-16 pt-28 md:px-16 md:pb-20 md:pt-32">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
          className="mb-7 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#E08A74] md:text-[13px]"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#5FE3D0]" aria-hidden="true" />
          Portafolio · 8+ años en producto digital
        </motion.p>

        {/* Cada línea del nombre sube desde detrás de una máscara, como un
            telón: más editorial que un simple fundido. */}
        <h1 className="m-0 font-impact text-[clamp(56px,11vw,168px)] font-normal leading-[1.04] tracking-[-0.01em] text-paper">
          {["Charly", "Gourves"].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.04em] -mb-[0.04em]">
              <motion.span
                className="block"
                initial={{ y: reduce ? 0 : "105%", opacity: reduce ? 0 : 1 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: EASE_OUT }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <p className="mt-10 max-w-[820px] font-display text-[clamp(20px,3vw,34px)] font-medium leading-[1.35] text-paper md:mt-11">
          {HEADLINE_WORDS.map((word, i) => (
            <span key={i} className="inline-block">
              <motion.span
                initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 + i * (reduce ? 0 : 0.06), ease: EASE_OUT }}
                className={`inline-block pb-[0.08em] ${i >= ACCENT_FROM ? "text-[#5FE3D0]" : ""}`}
              >
                {word}
              </motion.span>
              {i < HEADLINE_WORDS.length - 1 ? " " : ""}
            </span>
          ))}
        </p>

        <ul className="mt-12 flex flex-wrap gap-2.5 md:mt-16" aria-label="Especialidades">
          {TAGS.map((tag, i) => (
            <motion.li
              key={tag}
              initial={{ opacity: 0, y: reduce ? 0 : 10, scale: reduce ? 1 : 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.05 + i * STAGGER, ease: EASE_OUT }}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-xs tracking-[0.04em] transition-colors duration-slow ${
                i === activeTag
                  ? "border-[#5FE3D0]/60 bg-[#5FE3D0]/10 text-[#8FE9DA]"
                  : "border-paper/20 text-paper/70"
              }`}
            >
              {tag}
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3, ease: EASE_OUT }}
        className="px-6 pb-10 font-mono text-xs tracking-[0.03em] text-paper/65 md:px-16"
      >
        Santiago, Chile — <span className="text-[#8FE9DA]">disponible para trabajar</span> ·{" "}
        <a
          href="#contacto"
          className="group text-paper underline underline-offset-[3px] decoration-paper/40 transition-colors hover:text-[#8FE9DA] hover:decoration-[#8FE9DA]"
        >
          conversemos{" "}
          <span aria-hidden="true" className="inline-block transition-transform duration-base group-hover:translate-x-1">
            →
          </span>
        </a>
      </motion.p>
    </section>
  );
}
