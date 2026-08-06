"use client";

import { motion } from "framer-motion";
import HeroCollage from "./HeroCollage";
import Blob from "./Blob";

const headlineParts = [
  { text: "Diseño para que" },
  { text: "las personas", color: "text-signal" },
  { text: "entiendan" },
  { text: "lo que están usando.", color: "text-rose" },
];

export default function Hero() {
  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      <Blob
        color="#3D5AFE"
        opacity={0.12}
        className="pointer-events-none absolute -top-24 -right-24 w-[480px] h-[480px] blur-2xl"
      />
      <Blob
        color="#FFB020"
        opacity={0.14}
        className="pointer-events-none absolute top-1/2 -left-24 w-[320px] h-[320px] blur-2xl"
      />
      <Blob
        color="#0EA5A0"
        opacity={0.12}
        className="pointer-events-none absolute bottom-0 right-1/4 w-[280px] h-[280px] blur-2xl"
      />

      {/* oversized background watermark, signature typographic gesture */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -bottom-16 left-0 right-0 text-center overflow-hidden"
      >
        <span
          className="font-display font-medium text-[22vw] leading-none whitespace-nowrap"
          style={{
            WebkitTextStroke: "1px rgba(11,14,20,0.06)",
            color: "transparent",
          }}
        >
          PRODUCTO
        </span>
      </div>

      <div className="max-w-content mx-auto px-6 md:px-10 relative grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
        <div>
          <motion.p
            className="eyebrow inline-flex items-center gap-2 text-signal mb-6 border border-signal/30 rounded-full px-3 py-1.5 bg-signal/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-signal" />
            product designer
          </motion.p>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-medium leading-[0.98] max-w-xl text-ink">
            {headlineParts.map((part, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-3">
                <motion.span
                  className={`inline-block ${part.color || ""}`}
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
            Seguros, bienestar, viajes — productos distintos, mismo enfoque:
            investigar, simplificar y decidir con datos. Especializado en
            Design Systems, sin quedarme solo ahí.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-x-8 gap-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {[
              { n: "4", l: "productos reales diseñados", color: "text-mint" },
              { n: "89", l: "componentes en producción", color: "text-ink" },
              { n: "-12%", l: "abandono en el mejor caso", color: "text-rose" },
            ].map((s, i) => (
              <div key={s.l} className={i > 0 ? "pl-8 border-l border-line" : ""}>
                <div className={`stat-number text-3xl ${s.color}`}>{s.n}</div>
                <div className="text-xs text-muted max-w-[120px] mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <HeroCollage />
      </div>
    </section>
  );
}
