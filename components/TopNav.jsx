"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Navegación fija arriba, horizontal. Reemplaza a la antigua barra
// vertical de la izquierda (textos girados, difíciles de leer). Mismos
// colores y tipografía mono; la sección visible se marca en rust.
const LINKS = [
  { href: "#como-pienso", label: "Cómo pienso" },
  { href: "#casos", label: "Trabajo" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#cv", label: "CV" },
];

export default function TopNav() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    // Arriba del todo (portada) no hay sección activa
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.5) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(34,29,24,0.92)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderBottom: "1px solid #3a332b",
      }}
    >
      <div className="flex items-center justify-between px-5 md:px-10 h-[56px]">
        <Link
          href="/"
          style={{ fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "15px", color: "#F7F1E4" }}
        >
          CG
        </Link>

        <nav className="flex items-center gap-4 md:gap-9">
          {LINKS.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative py-1 text-[10px] md:text-[12px] transition-colors duration-300 ${isActive ? "text-paper" : "text-[#c9beac] hover:text-paper"}`}
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                }}
              >
                {l.label}
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 -bottom-[3px] h-[2px] transition-transform duration-300 origin-left"
                  style={{ background: "#AC5142", transform: isActive ? "scaleX(1)" : "scaleX(0)" }}
                />
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
