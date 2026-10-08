"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { EASE } from "@/lib/motion";

const colorMap = {
  signal: { text: "text-signal", groupHover: "group-hover:text-signal", tag: "bg-signal/10 text-signal", stage: "bg-signal/[0.08]", ring: "group-hover:border-signal/40" },
  mint: { text: "text-mint", groupHover: "group-hover:text-mint", tag: "bg-mint/10 text-mint", stage: "bg-mint/[0.09]", ring: "group-hover:border-mint/40" },
  amber: { text: "text-amber", groupHover: "group-hover:text-amber", tag: "bg-amber/10 text-[#B97A00]", stage: "bg-amber/[0.12]", ring: "group-hover:border-amber/50" },
  rose: { text: "text-rose", groupHover: "group-hover:text-rose", tag: "bg-rose/10 text-rose", stage: "bg-rose/[0.08]", ring: "group-hover:border-rose/40" },
};

// visual: "system" dibuja una hoja de componentes en código (el caso es el
// sistema, no una pantalla); "desktop" y "phone" muestran capturas reales
// que se recorren solas al pasar el mouse.
const cases = [
  {
    slug: "design-system",
    color: "signal",
    role: "Product Designer · BICE VIDA",
    industries: "Insurtech · Design Systems",
    title: "89 componentes, un solo lenguaje: el Design System de BICE VIDA",
    impactStat: "89", impactLabel: "componentes en producción",
    tags: ["Design System", "Liderazgo de equipo", "Figma · Storybook"],
    visual: "system",
  },
  {
    slug: "landing-viajes",
    color: "mint",
    role: "Product Designer · BICE VIDA",
    industries: "Insurtech · Travel",
    title: "Unificar dos seguros de viaje en una landing",
    impactStat: "+16%", impactLabel: "visitas",
    secondaryStat: "+2% contratación",
    tags: ["Landing", "Research", "Conversión"],
    visual: "desktop",
    shots: ["/images/viaje-landing-unificada.png"],
  },
  {
    slug: "funnel-csi",
    color: "amber",
    role: "Product Designer · BICE VIDA",
    industries: "Insurtech · Health",
    title: "Reducir el funnel de contratación CSI",
    impactStat: "-12%", impactLabel: "abandono",
    secondaryStat: "+2% contratación",
    tags: ["Funnel", "UX Laws", "Datos"],
    visual: "desktop",
    shots: ["/images/csi-landing.png"],
    proof: "steps",
  },
  {
    slug: "beliv",
    color: "rose",
    role: "Design Lead (sprint) · BICE VIDA",
    industries: "Wellness · Mobile App",
    title: "Beliv: una app completa en un sprint de 3 días",
    impactStat: "8+", impactLabel: "pantallas en 3 días",
    tags: ["Mobile App", "Design Sprint", "Liderazgo"],
    visual: "phone",
    shots: ["/images/beliv-home.png", "/images/beliv-score.png", "/images/beliv-salud.png"],
  },
];

const bonusCase = {
  slug: "este-portafolio",
  color: "amber",
  title: "Bonus: así se construyó este sitio",
  description: "Con Claude, Cursor y GitHub Desktop, sin escribir una línea de código desde cero.",
};

// Prueba real: los pasos del funnel, tachándose en vivo al pasar el mouse.
function StepsProof({ hovered }) {
  return (
    <p className="font-mono text-xs mt-1" aria-live="polite">
      <span className={hovered ? "line-through text-mutedLight" : "text-muted"}>
        10 pasos
      </span>
      {hovered && <span className="text-[#B97A00] ml-1.5">→ 8 pasos</span>}
    </p>
  );
}

// Hoja de componentes del Design System: botón ciclando estados, input,
// tokens de color y tipografía. Es el entregable del caso, no una ilustración.
function SystemSheet({ hovered }) {
  const states = [
    { name: "default", cls: "bg-signal text-white" },
    { name: "hover", cls: "bg-signalSoft text-white shadow-[0_0_0_3px_rgba(61,90,254,0.2)]" },
    { name: "disabled", cls: "bg-[#E4DBC8] text-mutedLight" },
  ];
  return (
    <div className="absolute inset-0 p-6 md:p-8 grid grid-cols-2 gap-4 content-center" aria-hidden="true">
      <div className="col-span-2 rounded-lg bg-surface border border-line p-4">
        <p className="font-mono text-[10px] text-mutedLight mb-3">Button / Primary</p>
        <div className="flex flex-wrap gap-2">
          {states.map((s, idx) => (
            <motion.span
              key={s.name}
              className={`text-[11px] font-medium px-3 py-1.5 rounded-md ${s.cls}`}
              animate={hovered ? { y: [0, -3, 0] } : { y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: EASE, repeat: hovered ? Infinity : 0, repeatDelay: 1 }}
            >
              {s.name}
            </motion.span>
          ))}
        </div>
      </div>
      <div className="rounded-lg bg-surface border border-line p-4">
        <p className="font-mono text-[10px] text-mutedLight mb-3">Color / Tokens</p>
        <div className="flex gap-1.5">
          {["#3D5AFE", "#0EA5A0", "#FFB020", "#F43F5E", "#221D18"].map((c) => (
            <span key={c} className="w-5 h-5 rounded-full" style={{ background: c }} />
          ))}
        </div>
      </div>
      <div className="rounded-lg bg-surface border border-line p-4">
        <p className="font-mono text-[10px] text-mutedLight mb-1">Type / Display</p>
        <p className="font-display text-3xl text-ink leading-none">Aa</p>
      </div>
      <div className="col-span-2 rounded-lg bg-surface border border-line p-4">
        <p className="font-mono text-[10px] text-mutedLight mb-2">Input / Text</p>
        <div className="rounded-md border border-signal px-3 py-2 text-xs text-muted flex items-center">
          RUT del asegurado
          <span className="ml-0.5 w-px h-3.5 bg-signal animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// Captura de escritorio dentro de una ventana de navegador. Al pasar el
// mouse, la página larga se recorre sola de arriba hacia abajo.
function DesktopShot({ src }) {
  return (
    <div className="absolute inset-x-6 md:inset-x-10 top-8 md:top-10 bottom-0 rounded-t-lg overflow-hidden bg-surface shadow-[0_20px_40px_-20px_rgba(34,29,24,0.45)] border border-line border-b-0">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-line bg-paper">
        {[0, 1, 2].map((i) => (
          <span key={i} className="w-2 h-2 rounded-full bg-line" />
        ))}
      </div>
      <div className="relative h-full">
        <Image
          src={src}
          alt=""
          fill
          className="object-cover object-top group-hover:object-bottom transition-[object-position] duration-[6000ms] ease-in-out"
          sizes="(min-width: 768px) 560px, 90vw"
        />
      </div>
    </div>
  );
}

// Tres pantallas de la app en teléfonos escalonados.
function PhoneShots({ shots }) {
  const layout = [
    "left-[10%] top-[16%] rotate-[-6deg]",
    "left-1/2 -translate-x-1/2 top-[8%] z-10",
    "right-[10%] top-[16%] rotate-[6deg]",
  ];
  return (
    <div className="absolute inset-0">
      {shots.map((src, i) => (
        <div
          key={src}
          className={`absolute ${layout[i]} w-[26%] aspect-[9/19] rounded-[18px] border-[5px] border-ink bg-ink overflow-hidden shadow-[0_24px_40px_-18px_rgba(34,29,24,0.55)] transition-transform duration-500 group-hover:-translate-y-2`}
        >
          <div className="relative w-full h-full rounded-[13px] overflow-hidden">
            <Image src={src} alt="" fill className="object-cover object-top" sizes="180px" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CaseIndex() {
  const [hoveredSlug, setHoveredSlug] = useState(null);

  return (
    <section id="casos" className="py-24 md:py-32 border-t border-line">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <Reveal>
          <p className="eyebrow text-rust mb-4">trabajo</p>
          <h2 className="font-display text-2xl md:text-4xl text-ink max-w-2xl leading-tight">
            Cuatro proyectos, cuatro decisiones de negocio detrás de cada
            pantalla.
          </h2>
        </Reveal>

        <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-6 md:gap-8">
          {cases.map((c, i) => {
            const colors = colorMap[c.color];
            const hovered = hoveredSlug === c.slug;
            return (
              <Reveal key={c.slug} delay={(i % 2) * 0.08}>
                <Link
                  href={`/casos/${c.slug}`}
                  onMouseEnter={() => setHoveredSlug(c.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                  className={`group flex flex-col h-full rounded-2xl border border-line bg-surface overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(34,29,24,0.35)] ${colors.ring}`}
                >
                  <div className={`relative aspect-[4/3] overflow-hidden ${colors.stage}`}>
                    {c.visual === "system" && <SystemSheet hovered={hovered} />}
                    {c.visual === "desktop" && <DesktopShot src={c.shots[0]} />}
                    {c.visual === "phone" && <PhoneShots shots={c.shots} />}
                  </div>

                  <div className="flex flex-col flex-1 p-6 md:p-7">
                    <p className="font-mono text-[11px] text-mutedLight mb-3">
                      {c.role} <span className="mx-1">|</span> {c.industries}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-5">
                      <h3
                        className={`font-display text-xl md:text-2xl text-ink leading-snug transition-colors ${colors.groupHover}`}
                      >
                        {c.title}
                      </h3>
                      <div className="sm:text-right shrink-0">
                        <div
                          className={`font-impact leading-none ${colors.text}`}
                          style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.4rem)" }}
                        >
                          {c.impactStat}
                        </div>
                        <p className="text-xs text-muted mt-1.5 sm:max-w-[130px] sm:ml-auto">
                          {c.impactLabel}
                        </p>
                        {c.secondaryStat && (
                          <p className="text-[11px] text-mutedLight mt-0.5">{c.secondaryStat}</p>
                        )}
                        {c.proof === "steps" && <StepsProof hovered={hovered} />}
                      </div>
                    </div>

                    <div className="mt-auto pt-6 flex items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {c.tags.map((t) => (
                          <span
                            key={t}
                            className={`text-[11px] font-mono px-2.5 py-1 rounded-full ${colors.tag}`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <span
                        className={`shrink-0 w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink transition-all duration-300 group-hover:border-transparent group-hover:bg-ink group-hover:text-paper`}
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* bonus card — separada del grid principal, peso visual menor a propósito */}
        <Reveal delay={0.3}>
          <Link
            href={`/casos/${bonusCase.slug}`}
            className="mt-8 flex items-center gap-4 rounded-xl border border-line px-5 py-4 hover:border-amber/40 transition-colors group max-w-xl"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#B97A00] shrink-0">
              Bonus
            </span>
            <span className="text-sm text-muted group-hover:text-ink transition-colors">
              {bonusCase.title.replace("Bonus: ", "")} — {bonusCase.description}
            </span>
            <span className="ml-auto font-mono text-xs text-[#B97A00] shrink-0">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
