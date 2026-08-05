"use client";

import { motion } from "framer-motion";
import SystemGraph from "./SystemGraph";

const headlineParts = [
  { text: "Diseño para que" },
  { text: "las personas", color: "text-signalSoft" },
  { text: "entiendan" },
  { text: "lo que están usando.", color: "text-amber" },
];

export default function Hero() {
  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-20 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #3D5AFE 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, #FFB020 0%, transparent 70%)",
        }}
      />

      {/* oversized background watermark, signature typographic gesture */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -bottom-16 left-0 right-0 text-center overflow-hidden"
      >
        <span
          className="font-display font-medium text-[22vw] leading-none whitespace-nowrap"
          style={{
            WebkitTextStroke: "1px rgba(255,255,255,0.06)",
            color: "transparent",
          }}
        >
          SISTEMA
        </span>
      </div>

      <div className="max-w-content mx-auto px-6 md:px-10 relative grid lg:grid-cols-[1.15fr_0.95fr] gap-14 items-center">
        <div>
          <motion.p
            className="eyebrow text-signalSoft mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="tag-bracket">product design · design systems</span>
          </motion.p>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-medium leading-[0.98] max-w-xl">
            {headlineParts.map((part, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-3">
                <motion.span
                  className={`inline-block ${part.color || "text-paper"}`}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {part.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-6 text-lg text-muted max-w-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Product Designer especializado en Design Systems — investigación,
            sistemas y decisiones con datos aplicados a productos digitales
            complejos.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-x-8 gap-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {[
              { n: "118", l: "componentes diseñados", accent: false },
              { n: "89", l: "en producción", accent: false },
              { n: "100%", l: "consenso en research", accent: true },
            ].map((s, i) => (
              <div key={s.l} className={i > 0 ? "pl-8 border-l border-line" : ""}>
                <div
                  className={`stat-number text-3xl ${
                    s.accent ? "text-amber" : "text-paper"
                  }`}
                >
                  {s.n}
                </div>
                <div className="text-xs text-muted max-w-[120px] mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="dot-grid rounded-2xl border border-line bg-ink2/60 p-8 md:p-10 flex items-center justify-center relative z-10"
        >
          <SystemGraph />
        </motion.div>
      </div>
    </section>
  );
}
