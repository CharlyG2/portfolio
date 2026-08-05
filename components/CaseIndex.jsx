"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";

const cases = [
  {
    slug: "design-system",
    tag: "01",
    status: "completo",
    title: "El Design System de BICE VIDA",
    stat: "89 componentes en producción",
    thumb: "/images/csi-landing.png",
    live: true,
  },
  {
    slug: "landing-viajes",
    tag: "02",
    status: "completo",
    title: "Unificar dos seguros de viaje en una landing",
    stat: "+16% visitas · +2% contratación",
    thumb: "/images/viaje-landing-unificada.png",
    live: true,
  },
  {
    slug: "funnel-csi",
    tag: "03",
    status: "completo",
    title: "Reducir el funnel de contratación CSI",
    stat: "-12% abandono · +2% contratación",
    thumb: null,
    live: true,
  },
  {
    slug: "beliv",
    tag: "04",
    status: "completo",
    title: "Beliv: una app completa en un sprint de 3 días",
    stat: "8+ pantallas · equipo liderado",
    thumb: "/images/beliv-home.png",
    live: true,
  },
  {
    slug: "renovacion-imtt-207",
    tag: "05",
    status: "en construcción",
    title: "Renovación transparente de planes",
    stat: "3 ramas de decisión mapeadas",
    thumb: null,
    live: false,
  },
];

export default function CaseIndex() {
  const [hovered, setHovered] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <section
      id="casos"
      className="py-24 md:py-32 border-t border-line relative"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <div className="max-w-content mx-auto px-6 md:px-10">
        <Reveal>
          <p className="eyebrow text-signalSoft mb-4">casos de estudio</p>
        </Reveal>

        <div className="mt-6">
          {cases.map((c, i) => {
            const Wrapper = c.live ? Link : "div";
            const wrapperProps = c.live ? { href: `/casos/${c.slug}` } : {};
            return (
              <Reveal key={c.slug} delay={i * 0.05}>
                <Wrapper
                  {...wrapperProps}
                  onMouseEnter={() => c.thumb && setHovered(c.slug)}
                  onMouseLeave={() => setHovered(null)}
                  className={`group flex items-baseline gap-4 md:gap-8 py-6 md:py-8 border-b border-line ${
                    c.live ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <span className="font-mono text-xs md:text-sm text-mutedLight w-8 shrink-0">
                    {c.tag}
                  </span>
                  <h3
                    className={`font-display text-2xl sm:text-4xl md:text-5xl leading-none transition-colors ${
                      c.live
                        ? "text-paper group-hover:text-signalSoft"
                        : "text-mutedLight"
                    }`}
                  >
                    {c.title}
                  </h3>
                  <span className="ml-auto hidden sm:flex flex-col items-end shrink-0 text-right">
                    <span
                      className={`font-mono text-[10px] uppercase tracking-widest ${
                        c.live ? "text-amber" : "text-mutedLight"
                      }`}
                    >
                      {c.status}
                    </span>
                    <span className="font-mono text-xs text-mutedLight mt-1">
                      {c.stat}
                    </span>
                  </span>

                  {/* mobile-only inline thumbnail, since cursor-follow doesn't apply on touch */}
                  {c.thumb && (
                    <div className="sm:hidden w-16 h-12 rounded-md overflow-hidden border border-line shrink-0 relative">
                      <Image src={c.thumb} alt="" fill className="object-cover object-top" sizes="64px" />
                    </div>
                  )}
                </Wrapper>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* floating cursor preview, desktop only */}
      <AnimatePresence>
        {hovered &&
          cases
            .filter((c) => c.slug === hovered && c.thumb)
            .map((c) => (
              <motion.div
                key={c.slug}
                className="hidden sm:block pointer-events-none absolute z-20 w-[260px] aspect-[16/10] rounded-lg overflow-hidden border border-line shadow-2xl"
                style={{ left: pos.x + 24, top: pos.y - 90 }}
                initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: -3 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Image
                  src={c.thumb}
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="260px"
                />
              </motion.div>
            ))}
      </AnimatePresence>
    </section>
  );
}
