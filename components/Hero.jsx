"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { SPRING, EASE } from "@/lib/motion";
import CyclingWords from "./CyclingWords";

// Único texto pensado para cambiar seguido — vive chico y de bajo
// contraste, al final del stack, no compitiendo con nada.
const STATUS_LINE =
  "ahora mismo: reescribiendo este portafolio por enésima vez.";

export default function Hero() {
  const ref = useRef(null);
  const [hoverGourves, setHoverGourves] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [18, -18]), SPRING);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), SPRING);

  const charlyX = useSpring(useTransform(mx, [-0.5, 0.5], [-26, 26]), SPRING);
  const charlyY = useSpring(useTransform(my, [-0.5, 0.5], [-16, 16]), SPRING);
  const gourvesX = useSpring(useTransform(mx, [-0.5, 0.5], [14, -14]), SPRING);
  const gourvesY = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), SPRING);

  const shadowX = useSpring(useTransform(mx, [-0.5, 0.5], [22, -22]), SPRING);
  const shadowY = useSpring(useTransform(my, [-0.5, 0.5], [22, -22]), SPRING);

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
    // TODO el contenido vive en este único contenedor flex — nada con
    // position: absolute salvo la sombra decorativa del nombre (aria-hidden,
    // nunca texto). pt-24 = colchón fijo bajo el nav; verificado que nada
    // queda cortado en la carga inicial, sin scroll.
    <section
      className="relative bg-paper text-ink min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-24 pb-16"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1 — nombre, el elemento más grande, firma visual con parallax */}
      <motion.div
        ref={ref}
        className="relative overflow-visible w-full cursor-default"
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformPerspective: 500,
        }}
        onMouseEnter={() => setHoverGourves(true)}
        onMouseLeave={() => setHoverGourves(false)}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 font-impact leading-[0.8] whitespace-nowrap select-none pointer-events-none"
          style={{ fontSize: "clamp(4rem, 18vw, 16rem)", color: "rgba(34,29,24,0.15)", filter: "blur(2px)" }}
        >
          <motion.div style={{ x: shadowX, y: shadowY }}>Charly</motion.div>
          <motion.div style={{ x: shadowX, y: shadowY }}>Gourves</motion.div>
        </div>

        <motion.span
          className="block font-impact leading-[0.8] whitespace-nowrap"
          style={{
            fontSize: "clamp(4rem, 18vw, 16rem)",
            x: shouldReduceMotion ? 0 : charlyX,
            y: shouldReduceMotion ? 0 : charlyY,
          }}
          initial={{ opacity: 0, y: "110%" }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span style={{ color: "#AC5142" }}>Charly</span>
        </motion.span>

        <motion.span
          className="block font-impact leading-[0.8] whitespace-nowrap transition-colors duration-500"
          style={{
            fontSize: "clamp(4rem, 18vw, 16rem)",
            WebkitTextStroke: "2px #AC5142",
            color: hoverGourves ? "#AC5142" : "transparent",
            x: shouldReduceMotion ? 0 : gourvesX,
            y: shouldReduceMotion ? 0 : gourvesY,
          }}
          initial={{ opacity: 0, y: "110%" }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
        >
          Gourves
        </motion.span>
      </motion.div>

      {/* 2 — disciplinas, cicla una palabra a la vez, tamaño H2 */}
      <motion.div
        style={{ marginTop: "48px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <CyclingWords />
      </motion.div>

      {/* 3 — una sola frase de posicionamiento, tamaño subhead */}
      <motion.p
        className="relative max-w-2xl leading-relaxed text-muted px-6"
        style={{ fontSize: "clamp(1.125rem, 2vw, 1.375rem)", marginTop: "24px" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        Convierto procesos de negocio en productos que la gente entiende.
      </motion.p>

      {/* 4 — ubicación + estado, el más chico y silencioso de todos */}
      <motion.p
        className="relative font-mono text-xs text-mutedLight mt-8 max-w-md px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        Santiago, Chile — {STATUS_LINE}
      </motion.p>

      {/* scroll cue, sin cambios */}
      <motion.div
        className="relative flex flex-col items-center gap-2 text-mutedLight"
        style={{ marginTop: "48px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
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
