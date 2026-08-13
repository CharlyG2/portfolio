"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

const stats = [
  { n: "+16%", l: "más visitas", sub: "landing de viajes, primer mes", color: "#0EA5A0" },
  { n: "+2%", l: "más contratación", sub: "en dos casos distintos", color: "#3D5AFE" },
  { n: "−12%", l: "menos abandono", sub: "funnel CSI, primer mes", color: "#F43F5E" },
];

export default function Impact() {
  return (
    <section className="py-24 md:py-32 border-t border-line bg-paperSoft">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <Reveal>
          <p className="eyebrow text-rust mb-4 text-center">impacto real</p>
          <h2 className="font-display text-2xl md:text-3xl text-ink text-center max-w-lg mx-auto mb-16">
            No solo diseño interfaces. Muevo números.
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-8 md:gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.1}>
              <div className="text-center">
                <motion.div
                  className="font-impact"
                  style={{
                    fontSize: "clamp(3.5rem, 9vw, 7rem)",
                    color: s.color,
                    lineHeight: 1,
                  }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {s.n}
                </motion.div>
                <p className="font-display text-lg text-ink mt-2">{s.l}</p>
                <p className="text-xs text-mutedLight mt-1">{s.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
