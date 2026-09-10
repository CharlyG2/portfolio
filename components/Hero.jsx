"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { SPRING, EASE } from "@/lib/motion";

const words = ["Product Design", "Design Systems", "UX Research", "UX Writing", "Estrategia de negocio"];

// Síntesis real de dos sistemas de diseño reales (Linear + Stripe), no
// adjetivos: fondo casi negro y un solo acento cromático usado con
// moderación (Linear — #010102, #5e6ad2 solo en marca/CTA, "nunca
// decorativo"), y UNA captura de producto real, grande, enmarcada limpia
// en vez de textura abstracta ("page rhythm leans on product UI
// screenshots framed in dark panels rather than atmospheric color").
// No es el collage rotado que se sacó antes — un marco, una pantalla.
export default function Hero() {
  const ref = useRef(null);
  const [hoverGourves, setHoverGourves] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => setWordIndex((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), SPRING);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), SPRING);

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden pt-28 pb-16"
      style={{ background: "#1A1512" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Un solo acento cromático, muy contenido — no mesh, no textura
          decorativa. Una línea de luz sutil arriba, como borde de vidrio. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(172,81,66,0.5), transparent)" }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-[1fr_1.05fr] items-center gap-10 min-h-[calc(100vh-7rem)]">
        {/* Columna izquierda — nombre y texto, sobre fondo oscuro */}
        <div ref={ref} className="text-left" onMouseEnter={() => setHoverGourves(true)} onMouseLeave={() => setHoverGourves(false)}>
          <motion.span
            className="block font-impact leading-[0.85] whitespace-nowrap"
            style={{ fontSize: "clamp(3.2rem, 9vw, 7rem)", color: "#F7F1E4" }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            Charly
          </motion.span>
          <motion.span
            className="block font-impact leading-[0.85] whitespace-nowrap"
            style={{ fontSize: "clamp(3.2rem, 9vw, 7rem)", color: hoverGourves ? "#D6926E" : "#AC5142" }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          >
            Gourves
          </motion.span>

          <motion.p
            className="font-display text-lg md:text-xl max-w-md mt-6"
            style={{ color: "#B8AE9A" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Convierto procesos de negocio en productos que la gente entiende.
          </motion.p>

          <motion.div
            className="mt-5 h-6 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.span
              key={wordIndex}
              className="font-mono text-xs uppercase tracking-widest inline-block"
              style={{ color: "#AC5142" }}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {words[wordIndex]}
            </motion.span>
          </motion.div>

          <motion.a
            href="#nada-es-definitivo"
            className="relative inline-flex items-center gap-2 font-mono text-xs mt-8 px-3 py-1.5 rounded-full border transition-colors"
            style={{ background: "rgba(247,241,228,0.04)", borderColor: "rgba(247,241,228,0.14)", color: "#9C9082" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#AC5142" }} />
            Santiago, Chile — sigo iterando este portafolio (
            <span style={{ color: "#AC5142" }}>nada es definitivo →</span>)
          </motion.a>
        </div>

        {/* Columna derecha — UNA captura real, enmarcada tipo ventana de
            navegador, no un collage rotado. La técnica de Linear/Stripe:
            producto real, grande, limpio, no textura ni ilustración. */}
        <motion.div
          className="relative hidden md:block"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
        >
          <div
            className="rounded-xl overflow-hidden border"
            style={{ borderColor: "rgba(247,241,228,0.1)", boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)" }}
          >
            {/* barra de ventana, como un browser chrome real */}
            <div className="flex items-center gap-1.5 px-4 py-3" style={{ background: "#221D18" }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#6B6259" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#6B6259" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#6B6259" }} />
            </div>
            <div className="relative w-full" style={{ aspectRatio: "16/10", background: "#FFFDF8" }}>
              <Image
                src="/images/csi-landing.png"
                alt="Captura real del funnel de contratación CSI, uno de mis proyectos en BICE VIDA"
                fill
                className="object-cover object-top"
                sizes="(min-width: 768px) 45vw, 0px"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="relative flex flex-col items-center gap-2 mt-4 md:absolute md:bottom-8 md:left-1/2 md:-translate-x-1/2"
        style={{ color: "#6B6259" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.div>
        <span className="eyebrow">scroll</span>
      </motion.div>
    </section>
  );
}
