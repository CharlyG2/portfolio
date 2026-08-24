"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { SPRING, EASE } from "@/lib/motion";
import CyclingWords from "./CyclingWords";

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
    <section
      className="relative bg-paper text-ink min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-24 pb-16"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* grano sutil sobre el fondo — opacidad 4%, le da profundidad táctil
          sin ensuciar el plano de color. Reemplaza al "vacío total" de antes. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.045] mix-blend-multiply"
      >
        <filter id="heroGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#heroGrain)" />
      </svg>

      <motion.div
        style={{ marginBottom: "48px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CyclingWords />
      </motion.div>

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
        {/* sombra fantasma detrás del nombre — profundidad sin animación */}
        <div
          aria-hidden="true"
          className="absolute inset-0 font-impact leading-[0.8] whitespace-nowrap select-none pointer-events-none"
          style={{ fontSize: "clamp(4rem, 18vw, 16rem)", color: "rgba(34,29,24,0.16)", filter: "blur(2px)" }}
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

        {/* Gourves — contorno con más peso: de 2px a 2.6px y color más
            saturado/oscuro (espresso en vez de rust puro) para que nunca
            se sienta "perdido" contra el crema, sea cual sea la pantalla */}
        <motion.span
          className="block font-impact leading-[0.8] whitespace-nowrap transition-colors duration-500"
          style={{
            fontSize: "clamp(4rem, 18vw, 16rem)",
            WebkitTextStroke: "2.6px #7A2F22",
            color: hoverGourves ? "#7A2F22" : "transparent",
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

      <motion.p
        className="relative font-display text-xl md:text-2xl text-ink mt-16 md:mt-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        Convierto procesos de negocio en productos que la gente entiende.
      </motion.p>

      <motion.a
        href="#nada-es-definitivo"
        className="relative inline-flex items-center gap-2 font-mono text-xs mt-8 px-3 py-1.5 rounded-full border hover:border-rust/50 transition-colors"
        style={{ background: "#FFFDF8", borderColor: "#E4DBC8", color: "#6B6259" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#3D5A56" }} />
        Santiago, Chile — sigo iterando este portafolio (
        <span className="text-rust">nada es definitivo →</span>)
      </motion.a>

      <motion.div
        className="relative mt-14 flex flex-col items-center gap-2 text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
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
