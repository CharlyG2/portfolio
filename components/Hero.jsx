"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Generado en Omma (Spline) con vista previa visual real. Se sacó el
// menú de navegación propio (duplicaba el Nav.jsx global del sitio) —
// todo lo demás, incluida la carga de fuentes, se dejó exactamente como
// Omma lo entregó y probó, después de que cambiarla rompiera Anton.
const FONT_LINKS = [
  "https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;700&family=Inter:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap",
];

function useFontsInjected() {
  useEffect(() => {
    FONT_LINKS.forEach((href) => {
      if (document.querySelector(`link[href="${href}"]`)) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    });
  }, []);
}

const TAGS = [
  "Product Design",
  "Design Systems",
  "UX Research",
  "UX Writing",
  "Estrategia de Negocio",
];

const HEADLINE_WORDS = [
  "Convierto",
  "procesos",
  "de",
  "negocio",
  "en",
  "productos",
  "que",
  "la",
  "gente",
  "entiende.",
];

export default function Hero() {
  useFontsInjected();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const [activeTag, setActiveTag] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgFade = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => {
      setActiveTag((i) => (i + 1) % TAGS.length);
    }, 2200);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  const wordDelayBase = 0.5;
  const wordStep = shouldReduceMotion ? 0 : 0.09;

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        background: "#221D18",
        color: "#F7F1E4",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "45vh",
          pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(247,241,228,0) 0%, #F7F1E4 92%)",
          opacity: bgFade,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "22vh",
          pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(247,241,228,0) 0%, #F7F1E4 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 8vw, 120px)",
          paddingTop: "120px",
          paddingBottom: "80px",
          boxSizing: "border-box",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "clamp(11px, 1.1vw, 13px)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#AC5142",
            marginBottom: "28px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ width: "6px", height: "6px", background: "#AC5142", display: "inline-block" }} />
          Product Designer — Design Systems
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Anton', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(52px, 11vw, 168px)",
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
            margin: 0,
            color: "#F7F1E4",
            textTransform: "none",
          }}
        >
          Charly
          <br />
          Gourves
        </motion.h1>

        <div style={{ marginTop: "44px", maxWidth: "820px" }}>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(20px, 3vw, 34px)",
              lineHeight: 1.35,
              margin: 0,
              color: "#F7F1E4",
            }}
          >
            {HEADLINE_WORDS.map((word, i) => (
              <span key={i} style={{ display: "inline-block", overflow: "visible" }}>
                <motion.span
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: wordDelayBase + i * wordStep, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: "inline-block",
                    color: word === "entiende." ? "#AC5142" : "#F7F1E4",
                    paddingBottom: "0.08em",
                  }}
                >
                  {word}
                </motion.span>
                {i < HEADLINE_WORDS.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          style={{ marginTop: "64px", display: "flex", flexWrap: "wrap", gap: "10px" }}
        >
          {TAGS.map((tag, i) => (
            <span
              key={tag}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "12px",
                letterSpacing: "0.04em",
                padding: "7px 14px",
                border: `1px solid ${i === activeTag ? "#3D5A56" : "#4a4238"}`,
                color: i === activeTag ? "#3D5A56" : "#a89c8a",
                background: i === activeTag ? "rgba(247,241,228,0.08)" : "transparent",
                transition: "all 0.4s ease",
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.9 }}
        style={{
          position: "relative",
          zIndex: 2,
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 8vw, 120px)",
          paddingBottom: "40px",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "12px",
          letterSpacing: "0.03em",
        }}
      >
        <span style={{ color: "#8a8072" }}>
          Santiago, Chile — sigo iterando este portafolio (
          <span style={{ color: "#AC5142" }}>nada es definitivo →</span>)
        </span>
      </motion.div>
    </section>
  );
}
