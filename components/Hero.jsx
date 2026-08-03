"use client";

import { motion } from "framer-motion";
import SystemGraph from "./SystemGraph";

export default function Hero() {
  return (
    <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-20 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #3D5AFE 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #FFB020 0%, transparent 70%)",
        }}
      />
      <div className="max-w-content mx-auto px-6 md:px-10 relative">
        <motion.p
          className="eyebrow text-signalSoft mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="tag-bracket">product design · design systems</span>
        </motion.p>

        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.08] max-w-3xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Diseño para que las personas entiendan lo que están usando.
        </motion.h1>

        <motion.p
          className="mt-6 text-lg text-muted max-w-xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Charly Gourves — Product Designer especializado en Design
          Systems. Hoy trabajo en BICE VIDA, liderando el sistema de la
          compañía y los flujos de contratación de seguros de salud y
          viaje — pero el enfoque de fondo (investigar, simplificar,
          decidir con datos) aplica a cualquier producto digital.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-x-10 gap-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {[
            { n: "118", l: "componentes diseñados (app + web)" },
            { n: "89", l: "componentes en producción" },
            { n: "100%", l: "consenso en research de card sorting" },
          ].map((s) => (
            <div key={s.l}>
              <div className="stat-number text-2xl text-paper">{s.n}</div>
              <div className="text-xs text-muted max-w-[140px] mt-1">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-content mx-auto px-6 md:px-10 mt-20 flex justify-end">
        <SystemGraph />
      </div>
    </section>
  );
}
