"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

// Se mantiene la carga de Google Fonts por <link> como respaldo: los estilos
// apuntan primero a las variables de next/font y después al nombre plano.
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

// Solo se arrastra con mouse: en touch, arrastrar piezas le robaría el
// scroll a la página.
function useCanDrag() {
  const [canDrag, setCanDrag] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanDrag(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return canDrag;
}

const STATS = [
  { value: "89", label: "componentes en producción" },
  { value: "+16%", label: "visitas en viajes" },
  { value: "−12%", label: "abandono en funnel" },
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

// Las piezas del lienzo: pantallas reales de los casos, nombradas como
// frames de Figma. El portafolio se presenta como un archivo de diseño.
const FRAMES = [
  {
    id: "viajes",
    label: "Viajes / Landing",
    src: "/images/viaje-landing-unificada.png",
    className: "left-[4%] top-[14%] w-[52%] aspect-[4/3]",
    rotate: -3,
  },
  {
    id: "csi",
    label: "CSI / Funnel",
    src: "/images/csi-landing.png",
    className: "right-[4%] top-[6%] w-[40%] aspect-[4/3]",
    rotate: 4,
  },
  {
    id: "beliv",
    label: "Beliv / Home",
    src: "/images/beliv-home.png",
    className: "right-[14%] bottom-[6%] w-[24%] aspect-[9/17]",
    rotate: 2,
    selected: true,
  },
];

function CanvasFrame({ frame, index, constraintsRef, canDrag, reduceMotion }) {
  return (
    <motion.div
      className={`absolute ${frame.className} ${canDrag ? "cursor-grab active:cursor-grabbing" : ""}`}
      style={{ zIndex: frame.selected ? 3 : 1 + index }}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 30, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: frame.rotate }}
      transition={{ duration: 0.8, delay: 0.5 + index * 0.12, ease: EASE }}
      drag={canDrag}
      dragConstraints={constraintsRef}
      dragElastic={0.12}
      whileDrag={{ scale: 1.04, rotate: 0, zIndex: 10 }}
    >
      <p className="font-mono text-[10px] text-[#a89c8a] mb-1.5 select-none">
        {frame.label}
      </p>
      <div
        className={`relative w-full h-full rounded-md overflow-hidden bg-surface shadow-[0_24px_50px_-18px_rgba(0,0,0,0.7)] ${
          frame.selected ? "outline outline-2 outline-signal outline-offset-2" : ""
        }`}
      >
        <Image
          src={frame.src}
          alt=""
          fill
          draggable={false}
          className="object-cover object-top pointer-events-none select-none"
          sizes="(min-width: 1024px) 360px, 60vw"
          priority={index === 0}
        />
      </div>
      {frame.selected && (
        <>
          {["-left-[5px] -top-[5px]", "-right-[5px] -top-[5px]", "-left-[5px] -bottom-[5px]", "-right-[5px] -bottom-[5px]"].map((pos) => (
            <span
              key={pos}
              aria-hidden="true"
              className={`absolute ${pos} w-2 h-2 bg-surface border border-signal`}
              style={{ marginTop: pos.includes("top") ? "22px" : 0 }}
            />
          ))}
          <span className="absolute left-1/2 -translate-x-1/2 -bottom-7 font-mono text-[10px] px-1.5 py-0.5 rounded bg-signal text-white whitespace-nowrap select-none">
            360 × 680
          </span>
        </>
      )}
    </motion.div>
  );
}

// Un botón del Design System ciclando sus estados, como en Storybook.
function ComponentChip({ reduceMotion }) {
  const states = ["default", "hover", "disabled"];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setActive((i) => (i + 1) % states.length), 1600);
    return () => clearInterval(id);
  }, [reduceMotion, states.length]);

  const styles = [
    "bg-signal text-white",
    "bg-signalSoft text-white shadow-[0_0_0_4px_rgba(61,90,254,0.25)]",
    "bg-[#3a332b] text-[#7d7366]",
  ];

  return (
    <motion.div
      className="absolute left-[6%] bottom-[8%] z-[4] rounded-lg border border-[#3a332b] bg-[#2a241e]/95 backdrop-blur px-4 py-3 shadow-xl"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.95, ease: EASE }}
    >
      <p className="font-mono text-[10px] text-[#a89c8a] mb-2">
        Button / Primary · <span className="text-[#F7F1E4]">{states[active]}</span>
      </p>
      <span
        className={`inline-block font-body text-xs font-medium px-4 py-2 rounded-md transition-all duration-300 ${styles[active]}`}
      >
        Contratar seguro
      </span>
      <div className="flex gap-1.5 mt-3" aria-hidden="true">
        {["#3D5AFE", "#0EA5A0", "#FFB020", "#F43F5E", "#AC5142"].map((c) => (
          <span key={c} className="w-4 h-4 rounded-full border border-white/10" style={{ background: c }} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  useFontsInjected();
  const reduceMotion = useReducedMotion();
  const canDrag = useCanDrag();
  const canvasRef = useRef(null);

  const wordDelayBase = 0.35;
  const wordStep = reduceMotion ? 0 : 0.06;

  return (
    <section className="relative bg-ink text-paper overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-6 md:px-12 pt-24 md:pt-20 pb-16 md:pb-20 min-h-[100svh] grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-10 items-center">
        {/* Columna de texto */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="eyebrow text-[#D9735F] flex items-center gap-2.5 mb-6"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-mint opacity-60 animate-ping" />
              <span className="relative w-2 h-2 rounded-full bg-mint" />
            </span>
            Product Designer · Design Systems · Santiago
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
            className="text-paper m-0"
            style={{
              fontFamily: "var(--font-impact), 'Anton', sans-serif",
              fontSize: "clamp(56px, 9vw, 136px)",
              lineHeight: 0.98,
              letterSpacing: "-0.01em",
            }}
          >
            Charly
            <br />
            Gourves
          </motion.h1>

          <p
            className="mt-7 max-w-[560px] text-paper"
            style={{
              fontFamily: "var(--font-display), 'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(20px, 2.2vw, 28px)",
              lineHeight: 1.3,
            }}
          >
            {HEADLINE_WORDS.map((word, i) => (
              <span key={i} className="inline-block">
                <motion.span
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: wordDelayBase + i * wordStep, ease: EASE }}
                  className={`inline-block ${word === "entiende." ? "text-[#D9735F]" : ""}`}
                >
                  {word}
                </motion.span>
                {i < HEADLINE_WORDS.length - 1 ? " " : ""}
              </span>
            ))}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href="#casos"
              className="inline-flex items-center gap-2 rounded-full bg-paper text-ink px-6 py-3 text-sm font-medium hover:bg-white transition-colors"
            >
              Ver casos <span aria-hidden="true">↓</span>
            </a>
            <a
              href="/files/charly-gourves-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#5a5045] text-paper px-6 py-3 text-sm font-medium hover:border-paper transition-colors"
            >
              Descargar CV
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-12 grid grid-cols-3 gap-4 max-w-[520px] border-t border-[#3a332b] pt-6"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd
                  className="text-paper"
                  style={{ fontFamily: "var(--font-impact), 'Anton', sans-serif", fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1 }}
                >
                  {s.value}
                </dd>
                <dd className="font-mono text-[11px] text-[#a89c8a] mt-2 leading-snug">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Lienzo: el portafolio presentado como un archivo de diseño */}
        <motion.div
          ref={canvasRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative h-[420px] sm:h-[520px] lg:h-[620px] rounded-2xl border border-[#3a332b] bg-[#1b1713]"
          style={{
            backgroundImage: "radial-gradient(rgba(247,241,228,0.09) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
          aria-label="Pantallas de los casos de estudio"
        >
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2.5 border-b border-[#3a332b] font-mono text-[10px] text-[#8a8072] select-none">
            <span>casos-reales.fig</span>
            <span className="hidden sm:inline">{canDrag ? "arrastra las piezas ✦" : "pantallas reales"}</span>
          </div>
          <div className="absolute inset-0 top-9">
            {FRAMES.map((f, i) => (
              <CanvasFrame
                key={f.id}
                frame={f}
                index={i}
                constraintsRef={canvasRef}
                canDrag={canDrag}
                reduceMotion={reduceMotion}
              />
            ))}
            <ComponentChip reduceMotion={reduceMotion} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
