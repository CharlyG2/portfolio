"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Frase armándose palabra por palabra, técnica real de locomotive.ca
const phrases = [
  "Convierto",
  "Convierto procesos",
  "Convierto procesos de negocio",
  "Convierto procesos de negocio en productos",
  "Convierto procesos de negocio en productos que la gente entiende.",
];

// Ilustración original — piezas de componentes de UI ensamblándose en el
// aire, como bloques de construcción. No es una foto ni el diagrama
// reciclado de rondas anteriores: es una pieza nueva, hecha para este
// hero, que muestra literalmente lo que hace un Design Systems designer
// — tomar piezas sueltas y armar un lenguaje coherente.
function ComponentPieces() {
  const shouldReduceMotion = useReducedMotion();
  const pieces = [
    { x: 40, y: 60, w: 90, h: 34, r: -8, delay: 0.1, label: "Button" },
    { x: 190, y: 20, w: 64, h: 64, r: 6, delay: 0.25, label: null, circle: true },
    { x: 30, y: 150, w: 120, h: 44, r: 4, delay: 0.4, label: "Input" },
    { x: 200, y: 130, w: 56, h: 56, r: -10, delay: 0.55, label: null, square: true },
    { x: 90, y: 230, w: 100, h: 36, r: -3, delay: 0.7, label: "Tag" },
    { x: 220, y: 240, w: 40, h: 40, r: 12, delay: 0.85, label: null, circle: true },
  ];

  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" aria-hidden="true">
      {pieces.map((p, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -30, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: p.r }}
          transition={{ duration: 0.7, delay: 0.6 + p.delay, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.g
            animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
            transition={{ duration: 3.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
          >
            {p.circle ? (
              <circle
                cx={p.x + p.w / 2}
                cy={p.y + p.h / 2}
                r={p.w / 2}
                fill="none"
                stroke="#E8C9B8"
                strokeWidth="2"
              />
            ) : (
              <rect
                x={p.x}
                y={p.y}
                width={p.w}
                height={p.h}
                rx={p.square ? 10 : p.h / 2}
                fill={i % 3 === 0 ? "#AC5142" : "transparent"}
                stroke="#E8C9B8"
                strokeWidth="2"
              />
            )}
            {p.label && (
              <text
                x={p.x + p.w / 2}
                y={p.y + p.h / 2 + 4}
                textAnchor="middle"
                fontSize="11"
                fontFamily="var(--font-mono)"
                fill={i % 3 === 0 ? "#F7F1E4" : "#E8C9B8"}
                letterSpacing="0.02em"
              >
                {p.label}
              </text>
            )}
          </motion.g>
        </motion.g>
      ))}
      {/* líneas conectoras sutiles, como si las piezas fueran parte de un sistema */}
      <motion.line
        x1="130" y1="90" x2="222" y2="55"
        stroke="#E8C9B8" strokeWidth="1" strokeDasharray="3 4" opacity="0.35"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      />
      <motion.line
        x1="150" y1="170" x2="228" y2="155"
        stroke="#E8C9B8" strokeWidth="1" strokeDasharray="3 4" opacity="0.35"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      />
    </svg>
  );
}

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setPhraseIndex(phrases.length - 1);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setPhraseIndex(i);
      if (i >= phrases.length - 1) clearInterval(id);
    }, 450);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  return (
    <section
      className="relative min-h-screen overflow-hidden pt-28 pb-16 flex items-center"
      style={{ background: "#3A1410" }}
    >
      {/* textura de grano fina, para que el color profundo no se sienta
          plano — un solo detalle sutil, no varias capas compitiendo */}
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.05] mix-blend-overlay">
        <filter id="heroGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#heroGrain)" />
      </svg>

      <div className="relative max-w-[1300px] mx-auto px-6 md:px-12 grid md:grid-cols-[1.1fr_0.9fr] items-center gap-12 w-full">
        <div className="text-left">
          <motion.div
            className="font-mono text-xs uppercase tracking-widest mb-6"
            style={{ color: "#E8C9B8" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            Product Designer — Design Systems
          </motion.div>

          <h1
            className="font-serif italic leading-[1.05]"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", color: "#F7F1E4" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="block"
            >
              Charly
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="block"
              style={{ color: "#D98B6E" }}
            >
              Gourves
            </motion.span>
          </h1>

          {/* la frase se arma palabra por palabra — misma técnica de
              locomotive.ca, altura fija para que no salte al crecer */}
          <div className="mt-8 min-h-[4.5rem] md:min-h-[3.5rem]">
            <p
              className="font-display text-lg md:text-xl max-w-lg"
              style={{ color: "#C9B8AE" }}
            >
              {phrases[phraseIndex]}
            </p>
          </div>

          <motion.a
            href="#nada-es-definitivo"
            className="relative inline-flex items-center gap-2 font-mono text-xs mt-8 px-3 py-1.5 rounded-full border transition-colors"
            style={{ background: "rgba(247,241,228,0.05)", borderColor: "rgba(247,241,228,0.16)", color: "#C9B8AE" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.4 }}
          >
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#D98B6E" }} />
            Santiago, Chile — sigo iterando este portafolio (
            <span style={{ color: "#D98B6E" }}>nada es definitivo →</span>)
          </motion.a>
        </div>

        <div className="relative hidden md:block h-[380px]">
          <ComponentPieces />
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "#8A7268" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.6 }}
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          ↓
        </motion.div>
        <span className="eyebrow">scroll</span>
      </motion.div>
    </section>
  );
}
