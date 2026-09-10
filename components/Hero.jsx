"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { SPRING, EASE } from "@/lib/motion";
import SystemGraph from "./SystemGraph";

const words = ["Product Design", "Design Systems", "UX Research", "UX Writing", "Estrategia de negocio"];

// Composición estructuralmente distinta a la que veníamos usando — no es
// el mismo esqueleto centrado con otro color encima. Dos columnas
// asimétricas: el nombre a la izquierda, grande y pegado al borde, casi
// saliéndose de la pantalla (como Digital Cover / RNO1). A la derecha, el
// SystemGraph deja de ser decoración al 8% de opacidad detrás del nombre
// y pasa a ser protagonista real: grande, armándose en vivo, nodo por
// nodo. Dos elementos con peso, no uno con textura.
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
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), SPRING);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), SPRING);

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
      className="relative bg-paper text-ink min-h-screen overflow-hidden pt-28 pb-16"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mesh gradient — más presente que antes, ancla el costado derecho
          donde vive el diagrama, en vez de estar centrado y disperso. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 78% 30%, rgba(172,81,66,0.5), transparent 45%),
            radial-gradient(circle at 90% 75%, rgba(61,90,86,0.45), transparent 50%)
          `,
        }}
        animate={{ backgroundPosition: ["0% 0%", "4% -3%", "0% 0%"] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.03] mix-blend-multiply"
      >
        <filter id="heroGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#heroGrain)" />
      </svg>

      <div className="relative h-full min-h-[calc(100vh-7rem)] max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-[1.15fr_1fr] items-center gap-8">
        {/* Columna izquierda — el nombre, pegado al borde, no centrado */}
        <motion.div
          ref={ref}
          className="relative overflow-visible cursor-default text-left -ml-1 md:-ml-2"
          style={{
            rotateX: shouldReduceMotion ? 0 : rotateX,
            rotateY: shouldReduceMotion ? 0 : rotateY,
            transformPerspective: 600,
          }}
          onMouseEnter={() => setHoverGourves(true)}
          onMouseLeave={() => setHoverGourves(false)}
        >
          <div className="overflow-hidden">
            <motion.span
              className="block font-impact leading-[0.82] whitespace-nowrap"
              style={{ fontSize: "clamp(3.5rem, 11vw, 9rem)" }}
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <span style={{ color: "#AC5142" }}>Charly</span>
            </motion.span>
          </div>
          <div className="overflow-hidden pb-4">
            <motion.span
              className="name-outline block font-impact leading-[0.82] whitespace-nowrap transition-colors duration-500"
              style={{
                fontSize: "clamp(3.5rem, 11vw, 9rem)",
                ...(hoverGourves ? { color: "#7A2F22" } : {}),
              }}
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
            >
              Gourves
            </motion.span>
          </div>

          <motion.p
            className="font-display text-lg md:text-xl text-ink max-w-md mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Convierto procesos de negocio en productos que la gente entiende.
          </motion.p>

          {/* Una sola palabra a la vez, en línea con la frase — no una fila
              aparte arriba del nombre como antes. Menos piezas apiladas. */}
          <motion.div
            className="mt-4 h-6 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.span
              key={wordIndex}
              className="font-mono text-xs uppercase tracking-widest text-rust inline-block"
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {words[wordIndex]}
            </motion.span>
          </motion.div>

          <motion.a
            href="#nada-es-definitivo"
            className="relative inline-flex items-center gap-2 font-mono text-xs mt-8 px-3 py-1.5 rounded-full border hover:border-rust/50 transition-colors"
            style={{ background: "#FFFDF8", borderColor: "#E4DBC8", color: "#6B6259" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#3D5A56" }} />
            Santiago, Chile — sigo iterando este portafolio (
            <span className="text-rust">nada es definitivo →</span>)
          </motion.a>
        </motion.div>

        {/* Columna derecha — el SystemGraph como protagonista real, no
            textura de fondo al 8%. Grande, opaco, armándose nodo por nodo. */}
        <motion.div
          className="relative hidden md:flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
        >
          <div className="w-full max-w-[520px]">
            <SystemGraph labelClassName="fill-muted" />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="relative flex flex-col items-center gap-2 text-muted mt-4 md:absolute md:bottom-10 md:left-1/2 md:-translate-x-1/2"
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
