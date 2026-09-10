"use client";

import Link from "next/link";

// El menú vertical de Omma, ahora como navegación fija de TODO el sitio
// (no solo del hero) — reemplaza a Nav.jsx por completo. Los links usan
// los IDs reales que ya tiene cada sección de la página
// (components/HowIThink.jsx, CaseIndex.jsx, About.jsx, Resume.jsx).
const LINKS = [
  { href: "#como-pienso", label: "Cómo pienso" },
  { href: "#casos", label: "Trabajo" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#cv", label: "CV" },
];

export default function LeftNav() {
  return (
    <>
      {/* Desktop / tablet: barra vertical fija a la izquierda */}
      <div
        className="hidden md:flex fixed top-0 left-0 bottom-0 z-50 flex-col items-center justify-between"
        style={{
          width: "88px",
          background: "#221D18",
          borderRight: "1px solid #3a332b",
          padding: "28px 0",
        }}
      >
        <Link
          href="/"
          style={{ fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "14px", color: "#F7F1E4" }}
        >
          CG
        </Link>

        <nav
          className="flex flex-col items-center gap-7"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "11px",
                letterSpacing: "0.08em",
                color: "#c9beac",
                textDecoration: "none",
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "10px",
            color: "#8a8072",
            writingMode: "vertical-rl",
          }}
        >
          © 2026
        </div>
      </div>

      {/* Mobile: la barra vertical no funciona en pantallas angostas —
          se convierte en una barra superior simple con los mismos links */}
      <div
        className="flex md:hidden fixed top-0 left-0 right-0 z-50 items-center justify-between px-4 py-3"
        style={{ background: "#221D18", borderBottom: "1px solid #3a332b" }}
      >
        <Link
          href="/"
          style={{ fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "14px", color: "#F7F1E4" }}
        >
          CG
        </Link>
        <nav className="flex items-center gap-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "10px",
                letterSpacing: "0.04em",
                color: "#c9beac",
                textDecoration: "none",
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
