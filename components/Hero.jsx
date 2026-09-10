"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { SPRING, EASE } from "@/lib/motion";
import CyclingWords from "./CyclingWords";
import SystemGraph from "./SystemGraph";

export default function Hero() {
  const ref = useRef(null);
  const [hoverGourves, setHoverGourves] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Inclinación reducida de ±12° a ±5° — el rango anterior, combinado con
  // el overflow visual del line-height apretado del nombre, podía empujar
  // las letras lo suficiente como para volver a solaparse con el párrafo
  // de abajo al mover el mouse. Menos inclinación, mismo gesto, sin el bug.
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), SPRING);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), SPRING);

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
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.045] mix-blend-multiply"
      >
        <filter id="heroGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#heroGrain)" />
      </svg>

      {/* El diagrama de jerarquía atómica que ya usamos en tu caso de
          Design System — no es una foto de producto suelta, es literalmente
          tu forma de pensar (átomo → molécula → organismo → plantilla →
          página) puesta detrás de tu nombre. Un solo elemento de diseño
          real, no una colección de capturas. Opacidad baja: es textura de
          fondo, no compite con el nombre. */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[900px] opacity-[0.08]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        aria-hidden="true"
      >
        <SystemGraph />
      </motion.div>

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
        {/* Reveal real, no solo fade: cada palabra entra recortada por un
            clip-path que se abre de abajo hacia arriba — la animación
            "significa" algo (revela, como abrir una cortina), no es solo
            una opacidad subiendo. Esto es lo que Mat Voyce/RNO1 hacen bien
            y lo que le faltaba a la versión anterior. */}
        <div className="overflow-hidden">
          <motion.span
            className="block font-impact leading-[0.8] whitespace-nowrap"
            style={{ fontSize: "clamp(4rem, 18vw, 16rem)" }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <span style={{ color: "#AC5142" }}>Charly</span>
          </motion.span>
        </div>

<<<<<<< HEAD
        {/* Gourves — el contorno (-webkit-text-stroke) solo funciona en
            navegadores WebKit/Blink. El color por defecto tiene un
            respaldo real (ver .name-outline en globals.css) que nunca
            desaparece, aunque el navegador no soporte el stroke. */}
        <div className="overflow-hidden">
          <motion.span
            className="name-outline block font-impact leading-[0.8] whitespace-nowrap transition-colors duration-500"
            style={{
              fontSize: "clamp(4rem, 18vw, 16rem)",
              ...(hoverGourves ? { color: "#7A2F22" } : {}),
            }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
          >
            Gourves
          </motion.span>
        </div>
      </motion.div>

      {/* pb-20 + mt-32: mucho más margen que antes (pb-8/mt-24). El bug de
          solapamiento volvió a aparecer con el mouse en movimiento — este
          buffer es deliberadamente generoso para que ni la inclinación 3D
          ni el overflow del line-height puedan volver a juntar el nombre
          con el párrafo, bajo ninguna circunstancia de uso real. */}
      <div className="pb-20" />

      <motion.p
        className="relative font-display text-xl md:text-2xl text-ink mt-32 md:mt-40"
=======
        <motion.span
          className="name-outline block font-impact leading-[0.8] whitespace-nowrap transition-colors duration-500"
          style={{
            fontSize: "clamp(4rem, 18vw, 16rem)",
            ...(hoverGourves ? { color: "#7A2F22" } : {}),
          }}
          initial={{ opacity: 0, y: "110%" }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
        >
          Gourves
        </motion.span>
      </motion.div>

      <div className="pb-8" />

      <motion.p
        className="relative font-display text-xl md:text-2xl text-ink mt-24 md:mt-28"
>>>>>>> a8c359f602231035b34119060a93adeee9931d3b
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        Convierto procesos de negocio en productos que la gente entiende.
      </motion.p>

<<<<<<< HEAD
=======
      <div className="relative mt-14 md:mt-16 w-full">
        <HeroCollage />
      </div>

>>>>>>> a8c359f602231035b34119060a93adeee9931d3b
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
