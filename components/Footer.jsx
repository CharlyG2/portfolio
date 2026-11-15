import MagneticLink from "./MagneticLink";
import { PROFILE } from "@/lib/profile";

const LINK =
  "inline-flex items-center gap-2 rounded-full px-5 py-3 transition-colors";

export default function Footer() {
  return (
    <footer id="contacto" className="py-24 md:py-32 bg-ink text-paper">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <p className="eyebrow text-[#E08A74] mb-5">contacto</p>
        <p className="font-display text-3xl md:text-5xl max-w-2xl leading-tight">
          Busco mi próximo equipo de producto.
        </p>
        <p className="mt-5 text-base md:text-lg text-paper/75 max-w-xl leading-relaxed">
          Estoy disponible para roles de AI Product Designer, Product Designer y Design Systems
          en Santiago, en modalidad híbrida o la que use tu equipo.
          Escríbeme y conversemos.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 font-mono text-sm">
          <MagneticLink
            href={`mailto:${PROFILE.email}`}
            className={`${LINK} bg-[#5FE3D0] text-ink font-medium hover:bg-[#8FE9DA]`}
          >
            {PROFILE.email} <span aria-hidden="true">→</span>
          </MagneticLink>
          <MagneticLink
            href={PROFILE.linkedin}
            target="_blank"
            className={`${LINK} border border-paper/25 text-paper hover:border-paper hover:bg-paper/10`}
          >
            linkedin.com/in/charlygourves
          </MagneticLink>
          <MagneticLink
            href="https://behance.net/elnido"
            target="_blank"
            className={`${LINK} border border-paper/25 text-paper hover:border-paper hover:bg-paper/10`}
          >
            behance.net/elnido
          </MagneticLink>
        </div>
        <div className="mt-16 pt-6 border-t border-paper/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-paper/60">
          <p>Santiago, Chile — {new Date().getFullYear()}</p>
          <a
            href="/files/charly-gourves-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-paper underline underline-offset-4"
          >
            Descargar CV (PDF)
          </a>
        </div>
      </div>
    </footer>
  );
}
