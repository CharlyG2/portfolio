"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { SPRING, EASE } from "@/lib/motion";
import CyclingWords from "./CyclingWords";
import HeroCollage from "./HeroCollage";

export default function Hero() {
  const ref = useRef(null);
  const [hoverGourves, setHoverGourves] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Un solo gesto de movimiento, no varios compitiendo entre sí: el bloque
  // completo del nombre se inclina en 3D como una sola pieza rígida.
  // Antes "Charly" y "Gourves" se movían en direcciones OPUESTAS entre sí
  // más una sombra fantasma con su propio desplazamiento — eso es lo que
  // se leía como descoordinado/tosco, no como pulido.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), SPRING);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), SPRING);

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
        <motion.span
          className="block font-impact leading-[0.8] whitespace-nowrap"
          style={{ fontSize: "clamp(4rem, 18vw, 16rem)" }}
          initial={{ opacity: 0, y: "110%" }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span style={{ color: "#AC5142" }}>Charly</span>
        </motion.span>

        {/* Gourves — el contorno (-webkit-text-stroke) solo funciona en
            navegadores WebKit/Blink. Antes el color por defecto era
            "transparent" sin ningún respaldo — en un navegador sin soporte,
            la palabra se volvía invisible. Ahora la clase .name-outline
            (ver globals.css) define un color de relleno visible por
            defecto, y solo lo vuelve transparente si el navegador
            confirma soporte real vía @supports. Nunca desaparece. */}
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

      {/* pb-8 en el contenedor del nombre: leading-[0.8] + fuente hasta
          256px hace que las letras (sobre todo descendentes como la "y"
          de Charly) pinten visualmente más abajo de lo que el navegador
          calcula como "alto ocupado" del bloque — por eso el párrafo de
          abajo se estaba solapando. Este padding + el margen generoso del
          párrafo siguiente son el buffer real contra ese overflow visual. */}
      <div className="pb-8" />

      <motion.p
        className="relative font-display text-xl md:text-2xl text-ink mt-24 md:mt-28"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        Convierto procesos de negocio en productos que la gente entiende.
      </motion.p>

      {/* Prueba visual real del trabajo, directo en el hero — no solo
          tipografía y estructura. Capturas reales de Beliv, CSI y viajes,
          con entrada escalonada. Esto ya estaba construido en el repo
          (HeroCollage.jsx) pero nunca se conectó a la página. */}
      <div className="relative mt-14 md:mt-16 w-full">
        <HeroCollage />
      </div>

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
