"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { SPRING, EASE } from "@/lib/motion";

// Único texto del sitio pensado para cambiar seguido — pasa el test de
// "¿podría haberlo escrito cualquier otro Product Designer?": no, porque
// es verificable (van varias vueltas reales de este mismo hero) y no
// repite el cargo con otras palabras.
const STATUS_LINE =
  "ahora mismo: reescribiendo este portafolio por enésima vez. sí, esta línea también cambió como tres veces.";

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
      className="relative bg-paper text-ink min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sin blob, sin gradiente decorativo — color plano, todo el peso lo
          lleva la tipografía (Opción A del brief de diseño). */}

      <motion.p
        className="relative eyebrow text-muted mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Product Design · UX · Design Systems
      </motion.p>

      {/* nombre — único elemento con parallax 3D, jerarquía clara: esto se mueve, el resto se lee */}
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
          style={{ fontSize: "clamp(4rem, 18vw, 16rem)", color: "rgba(43,36,29,0.15)", filter: "blur(2px)" }}
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

      {/* línea de estado — estática, fade-in simple, sin scroll-link */}
      <motion.p
        className="relative font-hand text-2xl md:text-3xl text-rust mt-8 max-w-xl px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {STATUS_LINE}
      </motion.p>

      {/* bloque H1 + subhead, escala tipográfica estándar del sitio */}
      <motion.p
        className="relative font-display font-bold mt-14"
        style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#2B241D" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        Product Designer
      </motion.p>

      <motion.p
        className="relative max-w-2xl leading-relaxed text-muted px-6"
        style={{ fontSize: "clamp(1.125rem, 2vw, 1.375rem)", marginTop: "16px" }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        Convierto procesos de negocio en productos que la gente entiende.
        Investigo, simplifico y construyo sistemas que escalan.
      </motion.p>

      <motion.div
        className="relative mt-14 flex flex-col items-center gap-2 text-mutedLight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
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
